import { env } from "@/env";
import { CartQuantityUpdate } from "@/types/schema/woocommerce";

export function getCart(token: string) {
  return fetch(`${env.WOOCOMMERCE_STORE_URL}graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        query GetCart {
            cart {
                contents {
                    nodes {
                        key
                        product {
                            node {
                                id
                                databaseId
                                name
                                slug
                                sku
                            }
                        }
                        quantity
                        subtotal
                        variation {
                            attributes {
                                name
                                value
                            }
                            node {
                                id
                                databaseId
                                stockQuantity
                                price
                                image {
                                    guid
                                }
                                lowStockAmount
                                weight
                            }
                        }
                    }
                }
                subtotal
                subtotalTax
            }
        }
        `,
    }),
  });
}

export function updateCartQuantities(
  token: string,
  updateData: CartQuantityUpdate
) {
  return fetch(`${env.WOOCOMMERCE_STORE_URL}graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
                mutation UpdateCart {
                    updateItemQuantities (
                        input: {
                            items: [${updateData.items.map((item) => `{key: "${item.key}", quantity: ${item.quantity}}`).join()}]
                        }
                    ) {
                        cart {
                            contents {
                                nodes {
                                    key
                                    quantity
                                }
                            }
                            subtotal
                        }    
                    }
                }
            `,
    }),
  });
}

export function removeFromCart(token: string, key: string) {
  return fetch(`${env.WOOCOMMERCE_STORE_URL}graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
                mutation RemoveFromCart {
                    removeItemsFromCart (
                        input: {
                            keys: [
                                "${key}"
                            ]
                        }
                    ) {
                        cartItems {
                            key
                        }    
                    }
                }
            `,
    }),
  });
}
