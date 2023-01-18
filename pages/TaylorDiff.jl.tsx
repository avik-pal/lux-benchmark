import { Chart, BarController, LineController, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Colors, LogarithmicScale, Title } from "chart.js";
import type { FontSpec } from "chart.js"
import { Bar, Line } from "react-chartjs-2";
import useSWR from 'swr';
import { Wrapper } from '@/components/Wrapper';
import { useState } from 'react';
import Head from "@/components/Head";

Chart.register(BarController, LineController, CategoryScale, LinearScale, LogarithmicScale, BarElement, LineElement, PointElement);
Chart.register(Colors, Legend, Title, Tooltip);

Chart.defaults.aspectRatio = 1.2;
Chart.defaults.plugins.title.display = true;
(Chart.defaults.plugins.title.font as FontSpec).size = 20;

async function post<T>(key: string) {
  return await (await fetch(key, { method: 'POST', body: JSON.stringify({}) })).json() as T;
}

type Suite = {
  scalar: G1,
  mlp: G1,
  taylor_expansion: G0,
  pinn: G1
}

const id = 'TaylorDiff.jl';

const Charts = ({ suite }: { suite: Suite }) => {
  const {
    scalar: { forwarddiff: scalar_f, taylordiff: scalar_t },
    mlp: { forwarddiff: mlp_f, taylordiff: mlp_t },
    taylor_expansion: { taylordiff: te_t, taylorseries: te_s },
    pinn: { taylordiff: pinn_t, finitediff: pinn_f }
  } = suite;
  console.log(Object.entries(scalar_f));
  return <div style={{display: "flex", flexWrap: 'wrap', justifyContent: 'space-around'}}>
    <Wrapper url='https://github.com/JuliaDiff/TaylorDiff.jl/blob/main/benchmark/scalar.jl'><Line data={{
      labels: Object.keys(scalar_f),
      datasets: [
        { data: Object.values(scalar_f).map(x => x.time), label: "ForwardDiff.jl" },
        { data: Object.values(scalar_t).map(x => x.time), label: "TaylorDiff.jl" }
      ]
    }} options={{
      scales: {
        x: { title: { text: "Differentiation Order", display: true } },
        y: {
          title: { text: "Time / ns", display: true },
          type: 'logarithmic'
        }
      },
      plugins: { title: { text: "Scalar function derivatives", display: true } }
    }}/></Wrapper>
    <Wrapper url='https://github.com/JuliaDiff/TaylorDiff.jl/blob/main/benchmark/mlp.jl'><Line data={{
      labels: Object.keys(mlp_f),
      datasets: [
        { data: Object.values(mlp_f).map(x => x.time), label: "ForwardDiff.jl" },
        { data: Object.values(mlp_t).map(x => x.time), label: "TaylorDiff.jl" }
      ]
    }} options={{
      scales: {
        x: { title: { text: "Differentiation Order", display: true } },
        y: {
          title: { text: "Time / ns", display: true },
          type: 'logarithmic'
        }
      },
      plugins: { title: { text: "Multi-layer Perceptron derivatives", display: true } }
    }}/></Wrapper>
    <Wrapper url='https://github.com/JuliaDiff/TaylorDiff.jl/blob/main/benchmark/taylor_expansion.jl'><Bar data={{
      labels: ['Time'],
      datasets: [
        { data: [te_s].map(x => x.time / 1000), label: "TaylorSeries.jl" },
        { data: [te_t].map(x => x.time / 1000), label: "TaylorDiff.jl" },
      ],
    }} options={{
      scales: {
        y: {
          title: { text: "Time / μs", display: true },
        }
      },
      plugins: { title: { text: "Single variable Taylor expansion", display: true } }
    }}/></Wrapper>
    <Wrapper url='https://github.com/JuliaDiff/TaylorDiff.jl/blob/main/benchmark/pinn.jl'><Bar data={{
      labels: Object.keys(pinn_f),
      datasets: [
        { data: Object.values(pinn_f).map(x => x.time / 1000), label: "FiniteDifferences.jl" },
        { data: Object.values(pinn_t).map(x => x.time / 1000), label: "TaylorDiff.jl" },
      ],
    }} options={{
      scales: {
        y: {
          title: { text: "Time / μs", display: true },
          // type: 'logarithmic',
        }
      },
      plugins: { title: { text: "PINN", display: true } }
    }}/></Wrapper>
  </div>
}

export default function TaylorDiff_jl() {
  const { data, error } = useSWR(`/${id}`, async key => await post<BenchmarkData>(key));
  const [ branch, setBranch ] = useState('');
  const [ commit, setCommit ] = useState('');
  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  const id_branch = branch ? `${id}#${branch}` : data[id];
  const id_branch_commit = commit ? `${id}#${branch}#${commit}` : data[id_branch];
  const results = JSON.parse(data[id_branch_commit]) as BenchmarkResults;
  const suite = results.benchmarkgroup as Suite;
  const allBranches = Object.keys(data).filter(s => s.split('#').length == 2).map(s => s.split('#')[1]).sort();
  const allCommits = Object.keys(data).filter(s => s.startsWith(id_branch + '#')).map(s => s.split('#')[2]).sort();
  return <>
    <Head title='TaylorDiff.jl' />
    <main style={{maxWidth: '1440px', margin: 'auto'}}>
      <h1 style={{textAlign: 'center'}}><a href="https://github.com/JuliaDiff/TaylorDiff.jl" target="_blank" rel='noreferrer'>TaylorDiff.jl</a> Benchmarks</h1>
      <div style={{display: 'flex'}}>
        <div className='context-picker'>
          <span>Branch</span>
          <select name="Branch" onChange={event => setBranch(event.target.value)}>
            { allBranches.map(s => <option key={s}>{s}</option>) }
          </select>
        </div>
        <div className='context-picker'>
          <span>Commit</span>
          <select name="Commit" onChange={event => setCommit(event.target.value)}>
            { allCommits.map(s => <option key={s}>{s}</option>) }
          </select>
        </div>
      </div>
      <Charts suite={suite}/>
    </main>
  </>
}