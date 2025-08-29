import { env } from "@/env";
import { createClient } from "redis";

export const redis = await createClient({
  url: env.REDIS_URL,
})
  .on("error", (err) => console.error(`Redis Error: ${err}`))
  .connect();

//tries to get the specified cached data from redis, then parses and returns it.
//if it wasn't found, it will be fetched and cached before returning, so it will be available next time.
export async function getMaybeCachedData<T>(params: {
  key: string;
  validationFn: (input: any) => T;
  fetchFn: () => Promise<Response>;
  debug?: {
    resourceName?: string;
  };
}) {
  const { fetchFn, key, validationFn, debug } = params;
  const cachedJson = await redis.get(key);
  if (cachedJson) {
    const parsed = validationFn(JSON.parse(cachedJson));
    return parsed;
  }

  const response = await fetchFn();
  if (!response.ok) {
    throw new Error(
      `Failed to get ${debug?.resourceName || "UNKNOWN_RESOURCE"}`
    );
  }

  const json = await response.json();
  const parsed = validationFn(json);
  await redis.setEx(key, env.SIMPLE_CACHE_TIME / 1000, JSON.stringify(json));

  return parsed;
}
