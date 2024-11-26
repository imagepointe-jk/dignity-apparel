import { env } from "@/envClient";
import { Product } from "@/types/schema/woocommerce";

export function productUrl(product: Product, variationId?: number) {
  return `${env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}${variationId !== undefined ? `?variationId=${variationId}` : ""}`;
}
