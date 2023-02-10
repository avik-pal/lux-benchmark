export const onRequestPost: PagesFunction<Env> = async (context) => {
  const name = context.params.id as string;
  const { keys } = await context.env.BENCHMARK.list({ prefix: name });
  const result: Record<string, any> = {};
  for (const key of keys) {
    result[key.name] = JSON.parse(await context.env.BENCHMARK.get(key.name));
  }
  return new Response(JSON.stringify(result));
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const name = context.params.id as string;
  const upload = await context.request.json() as BenchmarkUpload;
  const { commit } = upload.context;
  const key = `${name}#${commit}`;
  await context.env.BENCHMARK.put(key, JSON.stringify(upload));
  return new Response(JSON.stringify({ success: true }));
}
