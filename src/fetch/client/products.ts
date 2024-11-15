import { env } from "@/envClient";

export async function queryProducts(params: {
  search: string | null;
  category: string | null;
}) {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.append("search", params.search);
  if (params.category) searchParams.append("category", params.category);

  return fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/products/?${searchParams}`);
}
