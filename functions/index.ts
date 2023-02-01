export const onRequestPut: PagesFunction<Env> = async (context) => {
  const upload = await context.request.json() as BenchmarkUpload;
  const { name, commit } = upload;
  const key = `${name}#${commit}`;
  await context.env.BENCHMARK.put(key, JSON.stringify(upload));
  return new Response(JSON.stringify({ success: true }));
}
