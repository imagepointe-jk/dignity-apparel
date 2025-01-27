import { env } from "@/env";
import { queryWpGraphQl } from "./wpgraphql";

export function getCategories() {
  const query = `
    query GetCategories {
        productCategories {
            edges {
                node {
                    id
                    databaseId
                    name
                    slug
                    children {
                        nodes {
                            id
                            databaseId
                            name
                            slug
                        }
                    }
                }
            }
        }
    }
`;
  return queryWpGraphQl(() =>
    fetch(`${env.WOOCOMMERCE_STORE_URL}graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${env.WORDPRESS_APPLICATION_USERNAME}:${env.WORDPRESS_APPLICATION_PASSWORD}`)}`,
      },
      body: JSON.stringify({
        query,
      }),
    })
  );
}
