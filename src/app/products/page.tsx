import { ProductBrowse } from "@/components/ProductBrowse/ProductBrowse";
import { getAttributes } from "@/fetch/woocommerce/attributes";
import { getCategories } from "@/fetch/woocommerce/categories";
import {
  validateAttributesResponse,
  validateCategoriesResponse,
} from "@/types/validation/woocommerce/woocommerce";
import { Metadata } from "next";

export default async function Page() {
  try {
    const categoriesResponse = await getCategories();
    console.log("1");
    const categoriesJson = await categoriesResponse.json();
    console.log("2");
    const categoriesParsed = validateCategoriesResponse(categoriesJson);
    console.log("3");
    const attributesResponse = await getAttributes();
    console.log("4");
    const attributesJson = await attributesResponse.json();
    console.log("5");
    const attributesParsed = validateAttributesResponse(attributesJson);
    console.log("6");

    return (
      <div className="x-wide-container">
        <ProductBrowse
          categories={categoriesParsed}
          attributes={attributesParsed}
        />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error.</div>;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Products - Dignity Apparel",
  };
}
