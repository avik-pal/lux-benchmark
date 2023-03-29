import { FunctionComponent, PropsWithChildren } from "react";
import ProjectHeader from "@/components/ProjectHeader";
import ContextNavigator from "@/components/ContextNavigator";
import Switcher, { Mode } from "@/components/Switcher";
import { MainWrapper } from "@/components/Layout";
import { configureChartJS } from "@/utils/chart";
import { useNavigate } from "react-router-dom";

const isCommit = (id: string) => {
  return id.length == 40;
}

configureChartJS();

export default function SnapshotLayout({ name, id, Charts, data }: PropsWithChildren<{
  name: string,
  id: string,
  Charts: FunctionComponent<{ suite: BenchmarkGroup }>,
  data: BenchmarkData,
}>) {
  const navigate = useNavigate();
  const epoch = (s: string) => new Date(s).getTime();
  const sortByDate = (a: BenchmarkUpload, b: BenchmarkUpload) =>
  epoch(b.context.datetime) - epoch(a.context.datetime);

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
      <ProjectHeader
        name={name}
        url="https://github.com/LuxDL/Lux.jl"
      />
      <Switcher
        checked={false}
        onCheckedChange={() => navigate(`/${name}/series`)}
      />
      <ContextNavigator
        tag={tag}
        branch={branch}
        commit={result.context.commit}
        setCommit={s => navigate(`/${name}/commit/${s}`)}
        tagLookup={tagLookup}
        branchLookup={branchLookup}
      />
      <MainWrapper>
        <Charts suite={result.suite} />
      </MainWrapper>
    </>
  );
}
