const host = "https://benchmark-data.tansongchen.workers.dev/";

export async function getBenchmark(key: string) {
  const response = await fetch(host + key);
  const data = (await response.json()) as Benchmark[];
  return data.sort(sortByDateDsc);
}

const epoch = (s: string) => new Date(s).getTime();

export const sortByDateDsc = (a: Benchmark, b: Benchmark) =>
  epoch(b.datetime) - epoch(a.datetime);

export const sortByDateAsc = (a: Benchmark, b: Benchmark) =>
  epoch(a.datetime) - epoch(b.datetime);
