import { FunctionComponent, PropsWithChildren } from "react";
import ProjectHeader from "@/components/ProjectHeader";
import ContextNavigator from "@/components/ContextNavigator";
import { MainWrapper } from "@/components/Layout";
import { configureChartJS } from "@/utils/chart";
import { useNavigate } from "react-router-dom";
import { preprocessData } from "@/utils/data";

configureChartJS();

export default function SnapshotLayout({
  name,
  specifier,
  Charts,
  data,
}: PropsWithChildren<{
  name: string;
  specifier: SnapshotSpecifier;
  Charts: FunctionComponent<{ result: BenchmarkGroup[] }>;
  data: Benchmark[];
}>) {
  const navigate = useNavigate();
  const { tagLookup, branchLookup } = preprocessData(data);
  const benchmark =
    "commit" in specifier
      ? data.find((v) => v.commit == specifier.commit)
      : "branch" in specifier
      ? branchLookup.get(specifier.branch)?.[0]
      : "tag" in specifier
      ? tagLookup.get(specifier.tag)
      : branchLookup.get("main")?.at(-1);
  if (!benchmark) {
    return <div>Not found</div>;
  }
  const { tag, branch, commit, datetime, result } = benchmark;
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
        commit={commit}
        datetime={datetime}
        navigate={(s) => navigate(`/${name}` + s)}
        tagLookup={tagLookup}
        branchLookup={branchLookup}
      />
      <MainWrapper>
        <Charts result={result} />
      </MainWrapper>
    </>
  );
}
