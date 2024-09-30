import { FunctionComponent, PropsWithChildren } from "react";
import ProjectHeader from "@/components/ProjectHeader";
import ContextNavigator from "@/components/ContextNavigator";
import { MainWrapper } from "@/components/Layout";
import { configureChartJS } from "@/utils/chart";
import { useNavigate } from "react-router-dom";
import { sortByDateDsc } from "@/utils/data";

const isCommit = (id: string) => {
  return id.length == 40;
};

configureChartJS();

export default function SnapshotLayout({
  name,
  id,
  Charts,
  data,
}: PropsWithChildren<{
  name: string;
  id: string;
  Charts: FunctionComponent<{ result: BenchmarkGroup[] }>;
  data: Benchmark[];
}>) {
  const navigate = useNavigate();
  const tagLookup = new Map<string, Benchmark>(
    data.filter((v) => v.tag).map((v) => [v.tag, v])
  );
  const branchLookup = new Map<string, Benchmark[]>();
  for (const v of Object.values(data)) {
    if (!branchLookup.has(v.branch)) {
      branchLookup.set(v.branch, []);
    }
    branchLookup.get(v.branch)!.push(v);
    branchLookup.get(v.branch)!.sort(sortByDateDsc);
  }
  const result = isCommit(id)
    ? data.find((v) => v.commit == id)!
    : branchLookup.get(id)![0];
  const { tag, branch } = result;
  return (
    <>
      <ProjectHeader
        name={name}
        url="https://github.com/JuliaDiff/TaylorDiff.jl"
        mode="snapshot"
      />
      <ContextNavigator
        tag={tag}
        branch={branch}
        commit={result.commit}
        setCommit={(s) => navigate(`/${name}/commit/${s}`)}
        tagLookup={tagLookup}
        branchLookup={branchLookup}
      />
      <MainWrapper>
        <Charts result={result.result} />
      </MainWrapper>
    </>
  );
}
