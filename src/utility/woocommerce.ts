import { getCart } from "@/fetch/woocommerce/cart";
import { getOrders } from "@/fetch/woocommerce/orders";
import {
  validateCart,
  validateOrders,
} from "@/types/validation/woocommerce/woocommerce";
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

export async function getLoggedInOrders() {
  const cookieStore = await cookies();
  const token = `${cookieStore.get("wp_jwt_auth")?.value}`;
  const ordersResponse = await getOrders(token);
  if (!ordersResponse.ok)
    throw new Error(`Orders response status ${ordersResponse.status}`);

  const ordersJson = await ordersResponse.json();
  const ordersParsed = validateOrders(ordersJson);
  return ordersParsed;
}
