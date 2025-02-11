import { getCart } from "@/fetch/woocommerce/cart";
import { validateCart } from "@/types/validation/woocommerce/woocommerce";
import { cookies } from "next/headers";
import { CartArea } from "./CartArea/CartArea";
import { Metadata } from "next";
import Link from "next/link";
import { env } from "@/env";

export default async function Page() {
  const cookieStore = await cookies();
  const token = `${cookieStore.get("wp_jwt_auth")?.value}`;

  try {
    const cartResponse = await getCart(token);
    if (!cartResponse.ok)
      throw new Error(`Cart response status ${cartResponse.status}`);

    const cartJson = await cartResponse.json();
    const cartParsed = validateCart(cartJson);

    return (
      <>
        <CartArea cart={cartParsed} />
        <Link href={`${env.WOOCOMMERCE_STORE_URL}/checkout`}>Checkout</Link>
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>Something went wrong.</div>;
  }
}

export function generateMetadata(): Metadata {
  return {
    title: "Cart - Dignity Apparel",
  };
}
