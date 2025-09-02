import { env } from "@/env";
import { queryWpGraphQl } from "./wpgraphql";

export function getOrders(token: string) {
  const query = `
    query GetOrder {
        orders {
            nodes {
                id
                databaseId
                date
                customer {
                    firstName
                    lastName
                }
                lineItems {
                    nodes {
                        id
                        databaseId
                        product {
                            node {
                                id
                                databaseId
                                name
                                slug
                                sku
                                image {
                                    id
                                    sourceUrl
                                }
                            }
                        }
                        quantity
                        variation {
                            node {
                                id
                                databaseId
                                name
                                sku
                                image {
                                    id
                                    sourceUrl
                                }
                                attributes {
                                    nodes {
                                        name
                                        value
                                    }
                                }
                            }
                        }
                        subtotal
                    }
                }
                shippingLines {
                    nodes {
                        id
                        databaseId
                        methodTitle
                        total
                        totalTax
                    }
                }
                billing {
                    firstName
                    lastName
                    company
                    address1
                    address2
                    city
                    postcode
                    country
                    state
                    phone
                    email
                }
                shipping {
                    firstName
                    lastName
                    company
                    address1
                    address2
                    city
                    postcode
                    country
                    state
                    phone
                    email
                }
                subtotal
                shippingTotal
                shippingTax
                totalTax
                total
                discountTotal
            }
        }
    }
`;
  return queryWpGraphQl(() =>
    fetch(`${env.WOOCOMMERCE_STORE_URL}graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
      }),
    })
  );
}
