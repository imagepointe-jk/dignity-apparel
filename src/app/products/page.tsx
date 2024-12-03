import { ProductBrowse } from "@/components/ProductBrowse/ProductBrowse";
import { getCategories } from "@/fetch/woocommerce/categories";
import { validateCategoriesResponse } from "@/types/validation/woocommerce/woocommerce";
import { Metadata } from "next";

export default async function Page() {
  const response = await getCategories();
  const json = await response.json();
  const parsed = validateCategoriesResponse(json);

  return (
    <div className="x-wide-container">
      <ProductBrowse categories={parsed} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Products - Dignity Apparel",
  };
}
