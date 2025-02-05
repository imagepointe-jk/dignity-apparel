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

export function removeFromCart(key: string) {
  return fetch(`${window.location.origin}/api/cart/${key}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
