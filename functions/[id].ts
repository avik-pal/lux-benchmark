export const onRequestPost: PagesFunction<Env> = async (context) => {
  const prefix = context.params.id as string;
  const { keys } = await context.env.BENCHMARK.list({ prefix });
  const result: Record<string, any> = {};
  for (const key of keys) {
    result[key.name] = JSON.parse(await context.env.BENCHMARK.get(key.name));
  }
  return new Response(JSON.stringify(result));
}
