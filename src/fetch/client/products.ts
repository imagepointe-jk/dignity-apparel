import { env } from "@/envClient";

export async function queryProducts(params: {
  search: string | null;
  category: string | null;
  before: string | null;
  after: string | null;
  first: number | null;
  last: number | null;
}) {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.append("search", params.search);
  if (params.category) searchParams.append("category", params.category);
  if (params.before) searchParams.append("before", params.before);
  if (params.after) searchParams.append("after", params.after);
  if (params.first) searchParams.append("first", `${params.first}`);
  if (params.last) searchParams.append("last", `${params.last}`);

  return fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/products/?${searchParams}`);
}
