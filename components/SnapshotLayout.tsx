import { FunctionComponent, PropsWithChildren, useState } from "react";
import Head from "@/components/Head";
import ProjectHeader from "@/components/ProjectHeader";
import ContextNavigator from "@/components/ContextNavigator";
import TimeSeries from "@/components/TimeSeries";
import Switcher, { Mode } from "@/components/Switcher";
import { MainWrapper } from "@/components/Layout";
import { configureChartJS } from "@/utils/chart";
import { useBenchmarkData } from "@/utils/data";
import { useRouter } from "next/router";

const isCommit = (id: string) => {
  return id.length == 40;
}

configureChartJS();

export default function SnapshotLayout({ name, id, Charts }: PropsWithChildren<{
  name: string,
  id: string,
  Charts: FunctionComponent<{ suite: BenchmarkGroup }>
}>) {
  const { data, error } = useBenchmarkData(name);
  const router = useRouter();
  const epoch = (s: string) => new Date(s).getTime();
  const sortByDate = (a: BenchmarkUpload, b: BenchmarkUpload) =>
  epoch(b.context.datetime) - epoch(a.context.datetime);

  if (!data || !router.isReady) return <div></div>;
  const tagLookup = new Map<string, BenchmarkUpload>(
    Object.values(data)
      .filter((v) => v.context.tag)
      .map((v) => [v.context.tag, v])
  );
  const branchLookup = new Map<string, BenchmarkUpload[]>();
  for (const v of Object.values(data)) {
    if (!branchLookup.has(v.context.branch)) {
      branchLookup.set(v.context.branch, []);
    }
    branchLookup.get(v.context.branch)!.push(v);
    branchLookup.get(v.context.branch)!.sort(sortByDate);
  }
  const result = isCommit(id)
    ? data[`${name}#${id}`]
    : branchLookup.get(id)![0];
  const { tag, branch } = result.context;
  return (
    <>
      <Head title={name} />
      <ProjectHeader
        name={name}
        url="https://github.com/JuliaDiff/TaylorDiff.jl"
      />
      <Switcher
        checked={router.pathname.includes('series')}
        onCheckedChange={() => router.push(`/${name}/series/default`)}
      />
      <ContextNavigator
        tag={tag}
        branch={branch}
        commit={result.context.commit}
        setCommit={s => router.push(`/${name}/${s}`)}
        tagLookup={tagLookup}
        branchLookup={branchLookup}
      />
      <MainWrapper>
        <Charts suite={result.suite} />
      </MainWrapper>
    </>
  );
}
