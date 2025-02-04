import { CartQuantityUpdate } from "@/types/schema/woocommerce";

export function updateCart(cartUpdate: CartQuantityUpdate) {
  return fetch(`${window.location.origin}/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartUpdate),
  });
}
