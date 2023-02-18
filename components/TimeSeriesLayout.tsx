import Head from "@/components/Head";
import ProjectHeader from "@/components/ProjectHeader";
import SeriesNavigator from "@/components/SeriesNavigator";
import TimeSeries from "@/components/TimeSeries";
import Switcher, { Mode } from "@/components/Switcher";
import useSWR from "swr";
import { MainWrapper } from "@/components/Layout";
import { configureChartJS } from "@/utils/chart";
import { sortByDateAsc, useBenchmarkData } from "@/utils/data";
import { useRouter } from "next/router";

configureChartJS();

const preprocessData = (data: BenchmarkData) => {
  const tagLookup = new Map<string, BenchmarkUpload>(
    Object.values(data)
      .filter((v) => v.context.tag)
      .map((v) => [v.context.tag, v])
  );
  const tagged = Array.from(tagLookup.values()).sort(sortByDateAsc);
  const branchLookup = new Map<string, BenchmarkUpload[]>();
  for (const v of Object.values(data)) {
    if (!branchLookup.has(v.context.branch)) {
      branchLookup.set(v.context.branch, []);
    }
    branchLookup.get(v.context.branch)!.push(v);
    branchLookup.get(v.context.branch)!.sort(sortByDateAsc);
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
}: {
  name: string;
  series: string;
}) {
  const { data, error } = useBenchmarkData(name);
  const router = useRouter();
  const handler = (s: string) => router.push(`/${name}/series/${s}`);
  return (
    <>
      <Head title={name} />
      <ProjectHeader
        name={name}
        url="https://github.com/JuliaDiff/TaylorDiff.jl"
      />
      <Switcher
        checked={router.pathname.includes('series')}
        onCheckedChange={() => router.push(`/${name}/`)}
      />
      {data && router.isReady ? (
        <Content series={series} handler={handler} {...preprocessData(data)} />
      ) : (
        <MainWrapper>Loading...</MainWrapper>
      )}
    </>
  );
}
