import { env } from "@/envClient";

export async function searchProducts(search: string) {
  return fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/products/?search=${search}`);
}
