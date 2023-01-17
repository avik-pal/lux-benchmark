interface Env {
  BENCHMARK: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { searchParams } = new URL(context.request.url);
  const key = searchParams.get('repo');
  const value = await context.env.BENCHMARK.get(key);
  return new Response(value);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { searchParams } = new URL(context.request.url);
  const key = searchParams.get('repo');
  const value = await context.request.json() as Record<string, any>;
  await context.env.BENCHMARK.put(key, JSON.stringify(value));
  return new Response(JSON.stringify({ success: true }));
}
