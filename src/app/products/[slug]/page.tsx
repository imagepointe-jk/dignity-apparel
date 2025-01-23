import { ProductPage } from "@/components/ProductPage/ProductPage";
import { getProductBySlug } from "@/fetch/woocommerce/products";
import { validateWooCommerceSingleProductResponse } from "@/types/validation/woocommerce/woocommerce";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };
export default async function Page(props: Props) {
  const params = await props.params;

  const {
    slug
  } = params;

  try {
    const productResponse = await getProductBySlug(slug);
    const json = await productResponse.json();
    const parsed = validateWooCommerceSingleProductResponse(json.data.product);

    return (
      <div>
        <ProductPage product={parsed} />
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const {
    slug
  } = params;

  try {
    const productResponse = await getProductBySlug(slug);
    const json = await productResponse.json();
    const parsed = validateWooCommerceSingleProductResponse(json.data.product);

    return {
      title: `${parsed.name} - Dignity Apparel`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Product Not Found - Dignity Apparel",
    };
  }
}
