import ProjectHeader from "@/components/ProjectHeader";
import SeriesNavigator from "@/components/SeriesNavigator";
import TimeSeries from "@/components/TimeSeries";
import Switcher, { Mode } from "@/components/Switcher";
import { MainWrapper } from "@/components/Layout";
import { configureChartJS } from "@/utils/chart";
import { sortByDateAsc, useBenchmarkData } from "@/utils/data";
import { useNavigate } from "react-router-dom";

configureChartJS();

const preprocessData = (data: BenchmarkData) => {
  const sorted = Object.values(data).sort(sortByDateAsc);
  (window as any).logging_sorted = sorted;
  const tagLookup = new Map<string, BenchmarkUpload>(
    sorted.filter((v) => v.context.tag).map((v) => [v.context.tag, v])
  );
  const tagged = Array.from(tagLookup.values());
  const branchLookup = new Map<string, BenchmarkUpload[]>();
  for (const v of sorted) {
    if (!branchLookup.has(v.context.branch)) {
      branchLookup.set(v.context.branch, []);
    }
    branchLookup.get(v.context.branch)!.push(v);
  }
  return { tagLookup, tagged, branchLookup };
};

const Content = ({
  series,
  tagged,
  branchLookup,
  handler,
}: {
  series: string;
  tagged: BenchmarkUpload[];
  branchLookup: Map<string, BenchmarkUpload[]>;
  handler: (s: string) => void;
}) => {
  return (
    <>
      <SeriesNavigator
        allSeries={Array.from(branchLookup.keys()).concat(["tagged"])}
        series={series}
        handler={handler}
      />
      <MainWrapper>
        <TimeSeries
          data={series === "tagged" ? tagged : branchLookup.get(series)!}
        />
      </MainWrapper>
    </>
  );
};

export default function TimeSeriesLayout({
  name,
  series,
  data
}: {
  name: string;
  series: string;
  data: BenchmarkData
}) {
  const navigate = useNavigate();
  const handler = (s: string) => navigate(`/${name}/series/${s}`);
  return (
    <>
      <ProjectHeader
        name={name}
        url="https://github.com/JuliaDiff/TaylorDiff.jl"
      />
      <Switcher
        checked={true}
        onCheckedChange={() => navigate(`/${name}/`)}
      />
      {data ? (
        <Content series={series} handler={handler} {...preprocessData(data)} />
      ) : (
        <MainWrapper>Loading...</MainWrapper>
      )}
    </>
  );
}
