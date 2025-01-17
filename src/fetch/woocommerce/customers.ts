import { env } from "@/env";
import { Customer } from "@/types/schema/woocommerce";

const customerFields = `
    id
    databaseId
    username
    email
    firstName
    lastName
    billing {
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
`;

export function getCustomer(token: string) {
  return fetch(`${env.WOOCOMMERCE_STORE_URL}graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
          query GetCustomer {
            customer {
                ${customerFields}
            }
          }
        `,
    }),
  });
}

export function updateCustomer(
  token: string,
  globalId: string,
  customer: Customer
) {
  const { billing, shipping } = customer;
  return fetch(`${env.WOOCOMMERCE_STORE_URL}graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation {
            updateCustomer (
                input: {
                    id: "${globalId}"
                    billing: {
                        company: "${billing.company}"
                        address1: "${billing.address1}"
                        address2: "${billing.address2}"
                        city: "${billing.city}"
                        postcode: "${billing.postcode}"
                        country: ${billing.country}
                        state: "${billing.state}"
                        phone: "${billing.phone}"
                    }
                    shipping: {
                        company: "${shipping.company}"
                        address1: "${shipping.address1}"
                        address2: "${shipping.address2}"
                        city: "${shipping.city}"
                        postcode: "${shipping.postcode}"
                        country: ${shipping.country}
                        state: "${shipping.state}"
                        phone: "${shipping.phone}"
                    }
                }
            ) {
                customer {
                    ${customerFields}
                }    
            }
        }
        `,
    }),
  });
}
