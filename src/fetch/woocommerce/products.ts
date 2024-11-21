import { env } from "@/env";
import { queryWpGraphQl } from "./wpgraphql";

function conditionalStr(condition: boolean, str: string) {
  return condition ? str : "";
}

function buildProductFields(params?: {
  variations?: boolean;
  sizeCharges?: boolean;
}) {
  return `
    id
    databaseId
    name
    sku
    slug
    image {
      sourceUrl
    }
    ...on Product {
      productCategories {
        edges {
          node {
            databaseId
            name
          }
        }
      }
      productTags {
        edges {
          node {
            databaseId
            name
          }
        }
      } 
    }
    ${conditionalStr(
      params?.sizeCharges !== false,
      `sizeCharges {
        upcharge2x
        upcharge3x
        upcharge4x
      }`
    )}
    description
    ${conditionalStr(
      params?.variations !== false,
      `...on VariableProduct {
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
      }`
    )}
`;
}

export async function getProductBySku(sku: string) {
  const query = `
  query GetProductBySku($sku: ID!) {
    product(id: $sku, idType: SKU) {
      ${buildProductFields()}
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
      ${buildProductFields()}
    }
  }
`;

  return queryWpGraphQl(() =>
    fetch("https://dawholesale.unionwebstores.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${env.WORDPRESS_APPLICATION_USERNAME}:${env.WORDPRESS_APPLICATION_PASSWORD}`)}`,
      },
      body: JSON.stringify({
        query,
        variables: { slug },
      }),
    })
  );
}

export async function getProducts() {
  const query = `
  query GetProducts {
    products {
      nodes {
        ${buildProductFields()}
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
    }),
  });
}

export async function queryProducts(params: {
  search: string | null;
  category: string | null;
  before: string | null;
  after: string | null;
  first: number | null;
  last: number | null;
}) {
  const { category, search, before, after, first, last } = params;

  const query = `
  query QueryProducts($searchTerm: String, $category: String, $first: Int, $last: Int, $after: String, $before: String) {
    products(first: $first, last: $last, after: $after, before: $before, where: { search: $searchTerm, category: $category }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
        nodes {
          ${buildProductFields({ sizeCharges: false })}
        }
    }
  }
`;

  return queryWpGraphQl(() =>
    fetch("https://dawholesale.unionwebstores.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${env.WORDPRESS_APPLICATION_USERNAME}:${env.WORDPRESS_APPLICATION_PASSWORD}`)}`,
      },
      body: JSON.stringify({
        query,
        variables: { searchTerm: search, category, before, after, first, last },
      }),
    })
  );
}
