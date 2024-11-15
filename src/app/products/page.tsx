import { ProductBrowse } from "@/components/ProductBrowse/ProductBrowse";
import { getCategories } from "@/fetch/woocommerce/categories";
import { validateCategoriesResponse } from "@/types/validation/woocommerce/woocommerce";

export default async function Page() {
  const response = await getCategories();
  const json = await response.json();
  const parsed = validateCategoriesResponse(json);

  return <ProductBrowse categories={parsed} />;
}
