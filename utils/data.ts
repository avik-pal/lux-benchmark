import useSWR from "swr";

async function post<T>(key: string) {
  return (await (
    await fetch(key, { method: "POST", body: JSON.stringify({}) })
  ).json()) as T;
}

export const useBenchmarkData = (name: string) => {
  return useSWR(`/${name}`, async (key) => await post<BenchmarkData>(key));
};

const epoch = (s: string) => new Date(s).getTime();

export const sortByDateDsc = (a: BenchmarkUpload, b: BenchmarkUpload) =>
  epoch(b.context.datetime) - epoch(a.context.datetime);

export const sortByDateAsc = (a: BenchmarkUpload, b: BenchmarkUpload) =>
  epoch(a.context.datetime) - epoch(b.context.datetime);
