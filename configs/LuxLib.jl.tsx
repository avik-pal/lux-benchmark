import ChartsContainer from "@/components/ChartsContainer";
import ChartWrapper from "@/components/ChartWrapper";
import { Bar, Line } from "react-chartjs-2";


export function ChartsLuxLib({ suite }: { suite: BenchmarkGroup }) {
  const { scalar, mlp, taylor_expansion, pinn } = suite.data;
  const { forwarddiff: scalar_f, taylordiff: scalar_t } = (scalar as G1).data;
  const { forwarddiff: mlp_f, taylordiff: mlp_t } = (mlp as G1).data;
  const { taylordiff: te_t, taylorseries: te_s } = (taylor_expansion as G0)
    .data;
  const { taylordiff: pinn_t, finitediff: pinn_f } = (pinn as G1).data;
  return (
    <ChartsContainer>
      <ChartWrapper url="https://github.com/LuxDL/LuxLib.jl/blob/main/benchmark/src/groupnorm.jl">
        <Line
          data={{
            labels: Object.keys(scalar_f.data),
            datasets: [
              {
                data: Object.values(scalar_f.data).map((x) => x.time),
                label: "ForwardDiff.jl",
              },
              {
                data: Object.values(scalar_t.data).map((x) => x.time),
                label: "TaylorDiff.jl",
              },
            ],
          }}
          options={{
            scales: {
              x: { title: { text: "Differentiation Order", display: true } },
              y: {
                title: { text: "Time / ns", display: true },
                type: "logarithmic",
              },
            },
            plugins: {
              title: { text: "Scalar function derivatives", display: true },
            },
          }}
        />
      </ChartWrapper>
    </ChartsContainer>
  );
}
