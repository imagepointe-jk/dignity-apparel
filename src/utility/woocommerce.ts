import { getCart } from "@/fetch/woocommerce/cart";
import { validateCart } from "@/types/validation/woocommerce/woocommerce";
import { cookies } from "next/headers";

export async function getLoggedInCart() {
  const cookieStore = await cookies();
  const token = `${cookieStore.get("wp_jwt_auth")?.value}`;
  const cartResponse = await getCart(token);
  if (!cartResponse.ok)
    throw new Error(`Cart response status ${cartResponse.status}`);

  const cartJson = await cartResponse.json();
  const cartParsed = validateCart(cartJson);
  return cartParsed;
}
