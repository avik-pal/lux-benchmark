import ProjectHeader from "@/components/ProjectHeader";
import TimeSeries from "@/components/TimeSeries";
import { MainWrapper } from "@/components/Layout";
import { configureChartJS } from "@/utils/chart";
import { sortByDateAsc } from "@/utils/data";
import { useNavigate } from "react-router-dom";

configureChartJS();

const preprocessData = (data: Benchmark[]) => {
  const sorted = data.sort(sortByDateAsc);
  (window as any).logging_sorted = sorted;
  const tagLookup = new Map<string, Benchmark>(
    sorted.filter((v) => v.tag).map((v) => [v.tag, v])
  );
  const tagged = Array.from(tagLookup.values());
  const branchLookup = new Map<string, Benchmark[]>();
  for (const v of sorted) {
    if (!branchLookup.has(v.branch)) {
      branchLookup.set(v.branch, []);
    }
    branchLookup.get(v.branch)!.push(v);
  }
  return { tagLookup, tagged, branchLookup };
};

export default function TimeSeriesLayout({
  name,
  series,
  data
}: {
  name: string;
  series: string;
  data: Benchmark[]
}) {
  const navigate = useNavigate();
  const handler = (s: string) => navigate(`/${name}/series/${s}`);
  return (
    <>
      <ProjectHeader
        name={name}
        url="https://github.com/JuliaDiff/TaylorDiff.jl"
        mode="series"
      />
      {data ? (
        <TimeSeries series={series} handler={handler} {...preprocessData(data)} />
      ) : (
        <MainWrapper>Loading...</MainWrapper>
      )}
    </>
  );
}
