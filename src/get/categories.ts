import { env } from "@/env";
import { getMaybeCachedData } from "./redis";
import { validateCategoriesResponse } from "@/types/validation/woocommerce/woocommerce";
import { fetchCategories } from "@/fetch/woocommerce/categories";

export async function getCategories() {
  return getMaybeCachedData({
    key: env.REDIS_CATEGORIES_CACHE_KEY,
    fetchFn: fetchCategories,
    validationFn: validateCategoriesResponse,
    debug: {
      resourceName: "categories",
    },
  });
}
