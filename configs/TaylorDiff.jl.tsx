import ChartsContainer from "@/components/ChartsContainer";
import ChartWrapper from "@/components/ChartWrapper";
import { Bar, Line } from "react-chartjs-2";

export function Charts({ result }: { result: BenchmarkGroup[] }) {
  const [pinn, mlp, scalar, taylor_expansion] = result;
  const [scalar_f, scalar_t] = (scalar as G1).data;
  const [mlp_f, mlp_t] = (mlp as G1).data;
  const [te_t, te_s] = (taylor_expansion as G0).data;
  const [pinn_t, pinn_f] = (pinn as G1).data;
  return (
    <ChartsContainer>
      <ChartWrapper url="https://github.com/JuliaDiff/TaylorDiff.jl/blob/main/benchmark/scalar.jl">
        <Line
          data={{
            labels: scalar_f.data.map((x) => x.name),
            datasets: [
              {
                data: scalar_f.data.map((x) => x.time),
                label: "ForwardDiff.jl",
              },
              {
                data: scalar_t.data.map((x) => x.time),
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
      <ChartWrapper url="https://github.com/JuliaDiff/TaylorDiff.jl/blob/main/benchmark/mlp.jl">
        <Line
          data={{
            labels: Object.keys(mlp_f.data),
            datasets: [
              {
                data: Object.values(mlp_f.data).map((x) => x.time),
                label: "ForwardDiff.jl",
              },
              {
                data: Object.values(mlp_t.data).map((x) => x.time),
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
              title: {
                text: "Multi-layer Perceptron derivatives",
                display: true,
              },
            },
          }}
        />
      </ChartWrapper>
      <ChartWrapper url="https://github.com/JuliaDiff/TaylorDiff.jl/blob/main/benchmark/taylor_expansion.jl">
        <Bar
          data={{
            labels: ["Time"],
            datasets: [
              {
                data: [te_s].map((x) => x.time / 1000),
                label: "TaylorSeries.jl",
              },
              {
                data: [te_t].map((x) => x.time / 1000),
                label: "TaylorDiff.jl",
              },
            ],
          }}
          options={{
            scales: {
              y: {
                title: { text: "Time / μs", display: true },
              },
            },
            plugins: {
              title: {
                text: "Single variable Taylor expansion",
                display: true,
              },
            },
          }}
        />
      </ChartWrapper>
      <ChartWrapper url="https://github.com/JuliaDiff/TaylorDiff.jl/blob/main/benchmark/pinn.jl">
        <Bar
          data={{
            labels: Object.keys(pinn_f.data),
            datasets: [
              {
                data: Object.values(pinn_f.data).map((x) => x.time / 1000),
                label: "FiniteDifferences.jl",
              },
              {
                data: Object.values(pinn_t.data).map((x) => x.time / 1000),
                label: "TaylorDiff.jl",
              },
            ],
          }}
          options={{
            scales: {
              y: {
                title: { text: "Time / μs", display: true },
              },
            },
            plugins: { title: { text: "PINN", display: true } },
          }}
        />
      </ChartWrapper>
    </ChartsContainer>
  );
}
