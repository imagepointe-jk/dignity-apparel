import { env } from "@/env";
import { queryWpGraphQl } from "./wpgraphql";
import { ProductQueryParams } from "@/types/schema/woocommerce";

function conditionalStr(condition: boolean, str: string) {
  return condition ? str : "";
}

function buildProductFields(params?: {
  variations?: boolean;
  sizeCharges?: boolean;
  additionalInfo?: boolean;
  additionalSettings?: boolean;
}) {
  return `
    id
    databaseId
    name
    sku
    slug
    menuOrder
    image {
      sourceUrl
    }
    ...on Product {
      link
      productCategories {
        edges {
          node {
            databaseId
            name
            slug
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
      globalAttributes {
          edges {
              node {
                  name
                  terms {
                      edges {
                          node {
                              slug
                          }
                      }
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
    ${conditionalStr(
      params?.additionalInfo !== false,
      `additionalProductInformation {
        materialDescription
        careInformation
      }`
    )}
    ${conditionalStr(
      params?.additionalSettings !== false,
      `additionalProductSettings {
        linkTextOverride
        linkUrlOverride
      }`
    )}
    }
    description
    shortDescription
    ${conditionalStr(
      params?.variations !== false,
      `...on VariableProduct {
        variations(first: 1000) {
          nodes {
            id
            databaseId
            name
            status
            image {
              sourceUrl
            }
            stockQuantity
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

//this should ONLY be called through a "get" function that also caches the result
export async function queryProducts(params: ProductQueryParams) {
  const {
    category,
    search,
    availability,
    fabricType,
    fabricWeight,
    features,
    fit,
    before,
    after,
    first,
    last,
  } = params;

  const query = `
  query QueryProducts(
      $searchTerm: String, 
      $category: String, 
      ${conditionalStr(!!availability, "$availability: String,")}
      $fabricWeight: [String], 
      $fabricType: [String],
      $features: [String],
      ${conditionalStr(!!fit, "$fit: String,")}
      $first: Int, 
      $last: Int, 
      $after: String, 
      $before: String
    ) {
    products(
      first: $first, 
      last: $last, 
      after: $after, 
      before: $before, 
      where: { 
        search: $searchTerm, 
        category: $category, 
        status: "PUBLISH",
        taxonomyFilter: {
          filters: [
            ${conditionalStr(
              !!availability,
              `
            {
              taxonomy: PA_AVAILABILITY,
              terms: [
                $availability,
              ]
            },
              `
            )}
            {
              taxonomy: PA_FABRIC_WEIGHT,
              terms: $fabricWeight
            },
            {
              taxonomy: PA_FABRIC_TYPE,
              terms: $fabricType
            },
            {
              taxonomy: PA_FEATURES,
              terms: $features
            },
            ${conditionalStr(
              !!fit,
              `
            {
              taxonomy: PA_FIT,
              terms: [
                $fit,
              ]
            }
              `
            )}
          ],
          relation: AND
        } 
      }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
        nodes {
          ${buildProductFields()}
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
        variables: {
          searchTerm: search,
          category,
          availability,
          fabricType,
          fabricWeight,
          features,
          fit,
          before,
          after,
          first,
          last,
        },
      }),
    })
  );
}
