import ChartsContainer from "./ChartsContainer";
import TimeSeriesChart from "./TimeSeriesChart";

interface Props {
  data: BenchmarkUpload[];
  filter: (bc: string[]) => boolean;
}

function isLeaf(thing: BenchmarkGroup | TrialEstimate): thing is TrialEstimate {
  return "time" in thing;
}

export default function TimeSeries({ data, filter }: Props) {
  const breadcrumbMap = new Map<string, {
    contexts: BenchmarkContext[],
    series: TrialEstimate[]
  }>();

  const visit = (breadcrumb: string[], context: BenchmarkContext, thing: BenchmarkGroup | TrialEstimate) => {
    if (isLeaf(thing)) {
      if (!filter(breadcrumb)) return;
      const path = breadcrumb.join(".");
      if (!breadcrumbMap.has(path)) {
        breadcrumbMap.set(path, { contexts: [], series: [] });
      }
      const lists = breadcrumbMap.get(path)!;
      lists.contexts.push(context);
      lists.series.push(thing);
    } else {
      for (const [key, value] of Object.entries(thing)) {
        breadcrumb.push(key);
        visit(breadcrumb, context, value);
        breadcrumb.pop()
      }
    }
  }
  for (const { context, suite } of data) {
    visit([], context, suite);
  }
  
  return <ChartsContainer>
    { Array.from(breadcrumbMap.entries()).map(([ breadcrumb, { contexts, series }]) => <TimeSeriesChart key={breadcrumb} breadcrumb={breadcrumb} contexts={contexts} series={series}/>) }
  </ChartsContainer>
}