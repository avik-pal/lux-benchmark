import useSWR from "swr";

async function post<T>(key: string) {
  return (await (
    await fetch(key, { method: "POST", body: JSON.stringify({}) })
  ).json()) as T;
}

export const useBenchmarkData = (name: string) => {
  return useSWR(
    `/${name}`,
    async (key) => await post<BenchmarkData>(key)
  );
}
