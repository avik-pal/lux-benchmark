import ProjectHeader from "@/components/ProjectHeader";
import TimeSeries from "@/components/TimeSeries";
import { MainWrapper } from "@/components/Layout";
import { configureChartJS } from "@/utils/chart";
import { useNavigate } from "react-router-dom";
import { preprocessData } from "@/utils/data";

configureChartJS();

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
