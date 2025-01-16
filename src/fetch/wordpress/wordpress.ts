import { env } from "@/env";

export function getUser(token: string, globalId: string) {
  return fetch(`${env.WOOCOMMERCE_STORE_URL}graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
              query getUser {
                  user(id:"${globalId}") {
                      id
                      databaseId
                      email
                      name
                    }
                  }
              `,
    }),
  });
}
