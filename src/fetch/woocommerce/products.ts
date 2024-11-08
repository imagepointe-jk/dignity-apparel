import { env } from "@/env";

export async function searchProductBySku(sku: string) {
  const headers = new Headers();
  headers.append(
    "Authorization",
    `Basic ${btoa(`${env.WOOCOMMERCE_API_KEY}:${env.WOOCOMMERCE_API_SECRET}`)}`
  );

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  return await fetch(
    `${env.WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/products?search=${sku}`,
    requestOptions
  );
}

export async function getProducts() {
  const query = `
  query GetProducts {
    products {
      nodes {
        id
        databaseId
        name
        sku
        image {
          sourceUrl
        }
        ...on VariableProduct {
          variations {
            nodes {
              id
              databaseId
              name
              image {
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
        }
      }
    }
  }
`;

  // const variables = { id: productId };

  return fetch("https://dawholesale.unionwebstores.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${env.WORDPRESS_APPLICATION_USERNAME}:${env.WORDPRESS_APPLICATION_PASSWORD}`)}`,
    },
    body: JSON.stringify({
      query,
      // variables,
    }),
  });

  // const result = await response.json();

  // if (result.errors) {
  //   console.error("GraphQL errors:", result.errors);
  //   return null;
  // }

  // return result.data;
}
