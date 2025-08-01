import { ProductPage } from "@/components/ProductPage/ProductPage";
import { getProductBySlug } from "@/get/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };
export default async function Page(props: Props) {
  const params = await props.params;

  const { slug } = params;

  try {
    const product = await getProductBySlug(slug);
    if (!product) throw new Error(`Product with slug ${slug} not found.`);

    return (
      <div>
        <ProductPage product={product} />
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  try {
    const product = await getProductBySlug(slug);
    if (!product) throw new Error(`Product with slug ${slug} not found.`);

    return {
      title: `${product.name} - Dignity Apparel`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Product Not Found - Dignity Apparel",
    };
  }
}
