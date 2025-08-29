import { CartArea } from "./CartArea/CartArea";
import { Metadata } from "next";
import Link from "next/link";
import { env } from "@/env";
import { getLoggedInCart } from "@/utility/woocommerce";

export default async function Page() {
  try {
    const cart = await getLoggedInCart();
    return (
      <>
        <CartArea cart={cart} />
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
