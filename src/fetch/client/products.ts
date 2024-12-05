import { env } from "@/envClient";

export async function queryProducts(params: {
  search: string | null;
  category: string | null;
  availability?: string | null;
  fabricType?: string[];
  fabricWeight?: string[];
  features?: string[];
  fit?: string | null;
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
  if (params.availability)
    searchParams.append("availability", `${params.availability}`);
  if (params.fabricType)
    for (const el of params.fabricType) {
      searchParams.append("fabric-type", el);
    }
  if (params.fabricWeight)
    for (const el of params.fabricWeight) {
      searchParams.append("fabric-weight", el);
    }
  if (params.features)
    for (const el of params.features) {
      searchParams.append("feature", el);
    }
  if (params.fit) searchParams.append("fit", params.fit);

  return fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/products/?${searchParams}`);
}
