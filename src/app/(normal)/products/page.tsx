import { ProductBrowse } from "@/components/ProductBrowse/ProductBrowse";
import { getAttributes } from "@/get/attributes";
import { getCategories } from "@/get/categories";
import { Metadata } from "next";

export default async function Page() {
  const categories = await getCategories();
  const attributes = await getAttributes();

  return (
    <div className="x-wide-container">
      <ProductBrowse categories={categories} attributes={attributes} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Products - Dignity Apparel",
  };
}
