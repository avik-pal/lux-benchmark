import { Chart, BarController, LineController, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Colors, LogarithmicScale, Title } from "chart.js";
import type { FontSpec } from "chart.js"
import { Bar, Line } from "react-chartjs-2";
import useSWR from 'swr';
import { Wrapper } from '@/components/Wrapper';
import { useState, PropsWithChildren } from 'react';
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

const name = 'TaylorDiff.jl', defaultBranch = 'main';

const Charts = ({ suite }: { suite: Suite }) => {
  const {
    scalar: { forwarddiff: scalar_f, taylordiff: scalar_t },
    mlp: { forwarddiff: mlp_f, taylordiff: mlp_t },
    taylor_expansion: { taylordiff: te_t, taylorseries: te_s },
    pinn: { taylordiff: pinn_t, finitediff: pinn_f }
  } = suite;
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

const ContextPicker = ({ name, current, handler, children }: PropsWithChildren<{ name: string, current: string, handler: (s: string) => void}>) => <div className='context-picker'>
  <span>{name}</span>
  <select name={name} value={current} onChange={event => handler(event.target.value)}>
    { children }
  </select>
</div>

export default function TaylorDiff_jl() {
  const { data, error } = useSWR(`/${name}`, async key => await post<BenchmarkData>(key));
  const [ commit, setCommit ] = useState('');
  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  const epoch = (s: string) => (new Date(s)).getTime();
  const tagLookup = new Map<string, string>(Object.values(data).filter(v => v.context.tag).map(v => [v.context.tag, v.context.commit]));
  const branchLookup = new Map<string, BenchmarkUpload[]>();
  for (const [k, v] of Object.entries(data)) {
    branchLookup.set(v.context.branch, (branchLookup.get(v.context.branch) || []).concat([v]).sort((a, b) => epoch(a.context.datetime) - epoch(b.context.datetime)));
  }
  const result = commit ? data[`${name}#${commit}`] : branchLookup.get(defaultBranch)![0];
  const { tag, branch } = result.context;
  return <>
    <Head title='TaylorDiff.jl' />
    <header>
      <h1 style={{textAlign: 'center'}}><a href="https://github.com/JuliaDiff/TaylorDiff.jl" target="_blank" rel='noreferrer'>TaylorDiff.jl</a> Benchmarks</h1>
    </header>
    <main style={{maxWidth: '1440px', margin: 'auto'}}>
      <div style={{display: 'flex'}}>
        <ContextPicker name="Tag" current={tag} handler={t => t && setCommit(tagLookup.get(t)!)}>
          { Array.from(tagLookup.keys()).concat(['']).map(s => <option key={s} value={s}>{s}</option>) }
        </ContextPicker>
        <ContextPicker name="Branch" current={branch} handler={b => setCommit(branchLookup.get(b)![0].context.commit)}>
          { Array.from(branchLookup.keys()).map(s => <option key={s} value={s}>{s}</option>) }
        </ContextPicker>
        <ContextPicker name="Commit" current={commit} handler={setCommit}>
          { branchLookup.get(branch)!.map(v => v.context.commit).map(s => <option key={s} value={s}>{s.slice(0, 7)}</option>) }
        </ContextPicker>
      </div>
      <Charts suite={result.suite as Suite}/>
    </main>
  </>
}