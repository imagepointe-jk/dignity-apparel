import { ProductPage } from "@/components/ProductPage/ProductPage";
import { getProductBySlug } from "@/fetch/woocommerce/products";
import { validateWooCommerceSingleProductResponse } from "@/types/validation/woocommerce/woocommerce";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { inspect } from "util";

type Props = { params: { slug: string } };
export default async function Page({ params: { slug } }: Props) {
  try {
    const productResponse = await getProductBySlug(slug);
    const json = await productResponse.json();
    console.log(inspect(json, false, null));
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

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
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
