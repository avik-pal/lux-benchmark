import useSWR from "swr";
const host = "https://benchmark-data.tansongchen.workers.dev/";

async function get<T>(key: string) {
  const response = await fetch(key);
  const data = await response.json();
  return data as T;
}

export async function getBenchmarkData(key: string) {
  const response = await fetch(host + key);
  const data = await response.json();
  return data as BenchmarkData;
}

export const useBenchmarkData = (name: string) => {
  return useSWR(host + name, async (key) => await get<BenchmarkData>(key));
};

const epoch = (s: string) => new Date(s).getTime();

export const sortByDateDsc = (a: BenchmarkUpload, b: BenchmarkUpload) =>
  epoch(b.context.datetime) - epoch(a.context.datetime);

export const sortByDateAsc = (a: BenchmarkUpload, b: BenchmarkUpload) =>
  epoch(a.context.datetime) - epoch(b.context.datetime);
