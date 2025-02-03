import { env } from "@/env";

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
