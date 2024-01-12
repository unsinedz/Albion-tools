export default async function <T>(operation: () => Promise<T> | T) {
  const startTime = Date.now();

  const data = await operation();

  const endTime = Date.now();
  let delta = endTime - startTime;
  delta /= 1e3;

  return { data, elapsedSeconds: delta };
}
