const host = "https://benchmark-data.tansongchen.workers.dev/";

export async function getBenchmark(key: string) {
  const response = await fetch(host + key);
  const data = (await response.json()) as Benchmark[];
  return data.sort(sortByDateAsc);
}

export const preprocessData = (data: Benchmark[]) => {
  const tagLookup = new Map<string, Benchmark>(
    data.filter((v) => v.tag).map((v) => [v.tag!, v])
  );
  const tagged = Array.from(tagLookup.values());
  const branchLookup = new Map<string, Benchmark[]>();
  for (const v of data) {
    if (!branchLookup.has(v.branch)) {
      branchLookup.set(v.branch, []);
    }
    branchLookup.get(v.branch)!.push(v);
  }
  return { tagLookup, tagged, branchLookup };
};

const epoch = (s: string) => new Date(s).getTime();

export const sortByDateDsc = (a: Benchmark, b: Benchmark) =>
  epoch(b.datetime) - epoch(a.datetime);

export const sortByDateAsc = (a: Benchmark, b: Benchmark) =>
  epoch(a.datetime) - epoch(b.datetime);
