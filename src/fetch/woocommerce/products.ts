import { env } from "@/env";

export async function getProductBySku(sku: string) {
  const query = `
  query GetProductBySku($sku: ID!) {
    product(id: $sku, idType: SKU) {
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
`;

  return fetch("https://dawholesale.unionwebstores.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${env.WORDPRESS_APPLICATION_USERNAME}:${env.WORDPRESS_APPLICATION_PASSWORD}`)}`,
    },
    body: JSON.stringify({
      query,
      variables: { sku },
    }),
  });
}

export async function getProductBySlug(slug: string) {
  const query = `
  query GetProductBySku($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      sku
      slug
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
`;

  return fetch("https://dawholesale.unionwebstores.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${env.WORDPRESS_APPLICATION_USERNAME}:${env.WORDPRESS_APPLICATION_PASSWORD}`)}`,
    },
    body: JSON.stringify({
      query,
      variables: { slug },
    }),
  });
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

export async function searchProducts(search: string) {
  const query = `
  query SearchProducts($searchTerm: String!) {
    products(where: { search: $searchTerm }) {
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

  return fetch("https://dawholesale.unionwebstores.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${env.WORDPRESS_APPLICATION_USERNAME}:${env.WORDPRESS_APPLICATION_PASSWORD}`)}`,
    },
    body: JSON.stringify({
      query,
      variables: { searchTerm: search },
    }),
  });
}
