import ChartsContainer from "@/components/ChartsContainer";
import ChartWrapper from "@/components/ChartWrapper";
import { Bar, Line } from "react-chartjs-2";


export function ChartsLuxLib({ suite }: { suite: BenchmarkGroup }) {
  const { groupnorm } = suite.data;
  const { "Flux CPU": gn_f_cpu, "LuxLib CPU": gn_luxlib_cpu } = (groupnorm as G1).data;
  return (
    <ChartsContainer>
      <ChartWrapper url="https://github.com/LuxDL/LuxLib.jl/blob/main/benchmark/src/groupnorm.jl">
        <Bar
          data={{
            labels: ["Time"],
            datasets: [
              {
                data: Object.values(gn_f_cpu.data).map((x) => x.time),
                label: "Flux.jl CPU",
              },
              {
                data: Object.values(gn_luxlib_cpu.data).map((x) => x.time),
                label: "LuxLib.jl CPU",
              },
            ],
          }}
          options={{
            scales: {
              y: {
                title: { text: "Time / ns", display: true },
              },
            },
            plugins: {
              title: { text: "Group Normalization", display: true },
            },
          }}
        />
      </ChartWrapper>
    </ChartsContainer>
  );
}
