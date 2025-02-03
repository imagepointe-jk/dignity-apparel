import { getCart } from "@/fetch/woocommerce/cart";
import { validateCart } from "@/types/validation/woocommerce/woocommerce";
import { cookies } from "next/headers";
import { CartArea } from "./CartArea/CartArea";

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
        <h1>Cart</h1>
        <CartArea cart={cartParsed} />
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>Something went wrong.</div>;
  }
}
