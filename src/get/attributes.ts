import { env } from "@/env";
import { getMaybeCachedData } from "./redis";
import { validateAttributesResponse } from "@/types/validation/woocommerce/woocommerce";
import { fetchAttributes } from "@/fetch/woocommerce/attributes";

export async function getAttributes() {
  return getMaybeCachedData({
    key: env.REDIS_ATTRIBUTES_CACHE_KEY,
    fetchFn: fetchAttributes,
    validationFn: validateAttributesResponse,
    debug: {
      resourceName: "attributes",
    },
  });
}
