export const onRequestPut: PagesFunction<Env> = async (context) => {
  const value = await context.request.json() as BenchmarkResults;
  const id = value.name;
  const branch = value.benchmarkconfig.id;
  const commit = value.commit.slice(0, 7);
  const key = `${id}#${branch}#${commit}`;
  const alias = `${id}#${branch}`;
  await context.env.BENCHMARK.put(key, JSON.stringify(value));
  await context.env.BENCHMARK.put(alias, key);
  return new Response(JSON.stringify({ success: true }));
}
