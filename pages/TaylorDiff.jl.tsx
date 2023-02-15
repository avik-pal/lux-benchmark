import {
  Chart,
  BarController,
  LineController,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Colors,
  LogarithmicScale,
  Title,
} from "chart.js";
import type { FontSpec } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { sortByDate, useBenchmarkData } from "@/utils/data";
import { useState } from "react";
import styled from "styled-components";
import Head from "@/components/Head";
import ProjectHeader from "@/components/ProjectHeader";
import ChartWrapper from "@/components/ChartWrapper";
import SeriesNavigator from "@/components/SeriesNavigator";
import ContextNavigator from "@/components/ContextNavigator";
import ChartsContainer from "@/components/ChartsContainer";
import TimeSeries from "@/components/TimeSeries";
import Switcher from "@/components/Switcher";

enum Mode {
  Snapshot,
  TimeSeries,
}

Chart.register(
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  LineElement,
  PointElement
);
Chart.register(Colors, Legend, Title, Tooltip);

Chart.defaults.aspectRatio = 1.2;
Chart.defaults.plugins.title.display = true;
(Chart.defaults.plugins.title.font as FontSpec).size = 20;

const name = "TaylorDiff.jl",
  defaultBranch = "main";

const Charts = ({ suite }: { suite: BenchmarkGroup }) => {
  const { scalar, mlp, taylor_expansion, pinn } = suite.data;
  const { forwarddiff: scalar_f, taylordiff: scalar_t } = (scalar as G1).data;
  const { forwarddiff: mlp_f, taylordiff: mlp_t } = (mlp as G1).data;
  const { taylordiff: te_t, taylorseries: te_s } = (taylor_expansion as G0)
    .data;
  const { taylordiff: pinn_t, finitediff: pinn_f } = (pinn as G1).data;
  return (
    <ChartsContainer>
      <ChartWrapper url="https://github.com/JuliaDiff/TaylorDiff.jl/blob/main/benchmark/scalar.jl">
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
};

const MainWrapper = styled.main`
  max-width: 1440px;
  margin: auto;
`;

export default function TaylorDiff_jl() {
  const { data, error } = useBenchmarkData(name);
  const [mode, setMode] = useState(Mode.Snapshot);
  const [commit, setCommit] = useState("");
  const [series, setSeries] = useState(defaultBranch);
  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  const tagLookup = new Map<string, BenchmarkUpload>(
    Object.values(data)
      .filter((v) => v.context.tag)
      .map((v) => [v.context.tag, v])
  );
  const tagged = Array.from(tagLookup.values()).sort(sortByDate);
  const branchLookup = new Map<string, BenchmarkUpload[]>();
  for (const [k, v] of Object.entries(data)) {
    if (!branchLookup.has(v.context.branch)) {
      branchLookup.set(v.context.branch, []);
    }
    branchLookup.get(v.context.branch)!.push(v);
  }
  const result = commit
    ? data[`${name}#${commit}`]
    : branchLookup.get(defaultBranch)![0];
  const { tag, branch } = result.context;
  return (
    <>
      <Head title={name} />
      <ProjectHeader
        name={name}
        url="https://github.com/JuliaDiff/TaylorDiff.jl"
      />
      <Switcher
        checked={mode === Mode.TimeSeries}
        onCheckedChange={() => setMode(1 - mode)}
      />
      {mode === Mode.Snapshot ? (
        <>
          <ContextNavigator
            tag={tag}
            branch={branch}
            commit={commit}
            setCommit={setCommit}
            tagLookup={tagLookup}
            branchLookup={branchLookup}
          />
          <MainWrapper>
            <Charts suite={result.suite} />
          </MainWrapper>
        </>
      ) : (
        <>
          <SeriesNavigator
            allSeries={Array.from(branchLookup.keys()).concat(["tagged"])}
            series={series}
            setSeries={setSeries}
          />
          <MainWrapper>
            <TimeSeries
              data={
                series === "tagged"
                  ? tagged
                  : branchLookup.get(series)!.sort(sortByDate)
              }
              filter={(bc) => !"12356789".includes(bc[bc.length - 1])}
            />
          </MainWrapper>
        </>
      )}
    </>
  );
}
