import { ProductBrowse } from "@/components/ProductBrowse/ProductBrowse";
import { getAttributes } from "@/fetch/woocommerce/attributes";
import { getCategories } from "@/fetch/woocommerce/categories";
import {
  validateAttributesResponse,
  validateCategoriesResponse,
} from "@/types/validation/woocommerce/woocommerce";
import { Metadata } from "next";

export default async function Page() {
  const categoriesResponse = await getCategories();
  const categoriesJson = await categoriesResponse.json();
  const categoriesParsed = validateCategoriesResponse(categoriesJson);
  const attributesResponse = await getAttributes();
  const attributesJson = await attributesResponse.json();
  const attributesParsed = validateAttributesResponse(attributesJson);

  return (
    <div className="x-wide-container">
      <ProductBrowse
        categories={categoriesParsed}
        attributes={attributesParsed}
      />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Products - Dignity Apparel",
  };
}
