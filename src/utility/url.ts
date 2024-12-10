import { env } from "@/envClient";
import { Product } from "@/types/schema/woocommerce";

export function productUrl(product: Product, variationId?: number) {
  return `${env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}${variationId !== undefined ? `?variationId=${variationId}` : ""}`;
}

export function searchParamsArray(
  searchStr: string
): { key: string; value: string[] }[] {
  const arr: { key: string; value: string[] }[] = [];
  const rawPairs = Array.from(new URLSearchParams(searchStr).entries());

  for (const pair of rawPairs) {
    const key = `${pair[0]}`;
    const value = `${pair[1]}`;
    const match = arr.find((item) => item.key === `${pair[0]}`);
    if (match) match.value.push(`${pair[1]}`);
    else arr.push({ key, value: [value] });
  }

  return arr;
}
