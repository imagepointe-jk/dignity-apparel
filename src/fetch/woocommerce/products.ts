import { env } from "@/env";

export async function searchProductBySku(sku: string) {
  const headers = new Headers();
  headers.append(
    "Authorization",
    `Basic ${btoa(`${env.WOOCOMMERCE_API_KEY}:${env.WOOCOMMERCE_API_SECRET}`)}`
  );

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  return await fetch(
    `${env.WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/products?search=${sku}`,
    requestOptions
  );
}
