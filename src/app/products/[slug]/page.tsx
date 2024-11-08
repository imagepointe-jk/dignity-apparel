import { getProductBySlug } from "@/fetch/woocommerce/products";
import { validateWooCommerceSingleProductResponse } from "@/types/validation/woocommerce/woocommerce";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };
export default async function Page({ params: { slug } }: Props) {
  try {
    const productResponse = await getProductBySlug(slug);
    const json = await productResponse.json();
    const parsed = validateWooCommerceSingleProductResponse(json.data.product);

    return (
      <>
        <h1>{parsed.name}</h1>
        <div>{parsed.sku}</div>
      </>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
