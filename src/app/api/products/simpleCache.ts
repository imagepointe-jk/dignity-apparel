//This implementation solves two problems:
//1. Reduces reliance on our very slow WooCommerce server
//2. Allows for filtering/sorting that might not be possible with WPGraphQL
//It's not scalable, but it was implemented when we only had 20-30 products and had no plans to significantly increase that any time soon.
//Hopefully once we need a more scalable solution we will have already moved away from WooCommerce.
//! It does not currently support pagination.

import { env } from "@/env";
import { queryProducts } from "@/fetch/woocommerce/products";
import { Product, ProductQueryParams } from "@/types/schema/woocommerce";
import { validateWooCommerceProductsGraphQLResponse } from "@/types/validation/woocommerce/woocommerce";
import { createClient } from "redis";

const redis = await createClient({
  url: env.REDIS_URL,
})
  .on("error", (err) => console.error(`Redis Error: ${err}`))
  .connect();

export async function getCachedProducts(
  forceUpdateCache?: boolean
): Promise<Product[]> {
  if (!forceUpdateCache) {
    const cachedProductsJson = await redis.get(env.REDIS_CACHE_KEY);
    if (cachedProductsJson) {
      const parsed = validateWooCommerceProductsGraphQLResponse(
        JSON.parse(cachedProductsJson)
      );
      return parsed.products;
    }
  }

  const response = await queryProducts({
    before: null,
    after: null,
    first: 999,
    last: null,
    availability: null,
    category: null,
    fabricType: [],
    fabricWeight: [],
    features: [],
    fit: null,
    search: null,
  });
  const json = await response.json();
  const parsed = validateWooCommerceProductsGraphQLResponse(json);
  await redis.setEx(
    env.REDIS_CACHE_KEY,
    env.SIMPLE_CACHE_TIME / 1000,
    JSON.stringify(json)
  );

  return parsed.products;
}

export async function queryCachedProducts(
  params: ProductQueryParams
): Promise<Product[]> {
  const products = await getCachedProducts();
  const {
    availability,
    category,
    fabricType,
    fabricWeight,
    features,
    fit,
    search,
  } = params;

  const filtered = products.filter((product) => {
    const categoryCheck =
      !category || !!product.categories.find((cat) => cat.slug === category);
    const availabilityCheck = checkAvailability(product, availability);
    const fabricTypeCheck = checkAttribute(
      product,
      fabricType,
      "pa_fabric-type"
    );
    const fabricWeightCheck = checkAttribute(
      product,
      fabricWeight,
      "pa_fabric-weight"
    );
    const featuresCheck = checkAttribute(product, features, "pa_features");
    const fitCheck = checkAttribute(product, fit ? [fit] : [], "pa_fit");
    const searchCheck = checkTextSearch(product, search);

    return (
      categoryCheck &&
      availabilityCheck &&
      fabricTypeCheck &&
      fabricWeightCheck &&
      featuresCheck &&
      fitCheck &&
      searchCheck
    );
  });

  filtered.sort((a, b) => a.menuOrder - b.menuOrder);

  return filtered;
}

function checkAvailability(product: Product, availability: string | null) {
  return (
    !availability ||
    !!product.globalAttributes.find((attr) => {
      return (
        attr.name === "pa_availability" &&
        !!attr.terms.find((term) => term.slug === availability)
      );
    })
  );
}

function checkAttribute(
  product: Product,
  allowedStrings: string[],
  attributeName: string,
  compareFn?: (termSlug: string) => boolean
) {
  return (
    allowedStrings.length === 0 ||
    !!allowedStrings.find((str) => {
      const relevantAttr = product.globalAttributes.find(
        (attr) => attr.name === attributeName
      );
      if (!relevantAttr) return false;
      return !!relevantAttr.terms.find((term) => {
        if (compareFn) return compareFn(term.slug);
        else return term.slug === str;
      });
    })
  );
}

function checkTextSearch(product: Product, search: string | null) {
  if (!search) return true;

  const searchTerms = search.split(" ");
  const termWithMatch = searchTerms.find((term) => {
    if (
      product.descriptionSanitized
        .toLocaleLowerCase()
        .includes(term.toLocaleLowerCase())
    )
      return true;
    if (
      product.shortDescriptionSanitized
        .toLocaleLowerCase()
        .includes(term.toLocaleLowerCase())
    )
      return true;
    if (product.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
      return true;
    if (
      !!product.categories.find((cat) =>
        cat.name.toLocaleLowerCase().includes(term)
      )
    )
      return true;
    if (
      !!product.tags.find((tag) =>
        tag.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      )
    )
      return true;
  });

  return !!termWithMatch;
}
