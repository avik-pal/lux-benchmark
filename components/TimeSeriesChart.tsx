import {
  Chart,
  LineController,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Colors,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

import ChartWrapper from "./ChartWrapper";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);
Chart.register(Colors, Legend, Title, Tooltip);

interface Props {
  breadcrumb: string,
  contexts: BenchmarkContext[],
  series: TrialEstimate[]
}

export default function TimeSeriesChart({ breadcrumb, contexts, series }: Props) {
  const slug = breadcrumb;
  const commits = contexts.map(x => x.commit.slice(0, 7));
  const times = series.map(x => x.time / 1000);
  return <ChartWrapper url="https://github.com/JuliaDiff/TaylorDiff.jl/blob/main/benchmark/scalar.jl">
    <Line
      data={{
        labels: commits,
        datasets: [
          { data: times, label: "Time" },
        ],
      }}
      options={{
        scales: {
          x: { title: { text: "Commit", display: true } },
          y: { title: { text: "Time / μs", display: true }, min: 0, max: Math.round(Math.max(...times) * 1.2) },
        },
        plugins: {
          title: { text: slug, display: true },
        },
      }}
    />
  </ChartWrapper>
}