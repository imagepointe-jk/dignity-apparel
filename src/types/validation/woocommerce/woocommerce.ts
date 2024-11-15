import {
  DEFAULT_PRODUCTS_PAGE_SIZE,
  MAX_PRODUCTS_PAGE_SIZE,
} from "@/constants";
import {
  Category,
  pageInfoSchema,
  productSchema,
} from "@/types/schema/woocommerce";
import { clamp } from "@/utility/misc";
import sanitizeHtml from "sanitize-html";

function pullProductData(productJson: any) {
  return {
    id: productJson.databaseId,
    name: productJson.name,
    sku: productJson.sku,
    slug: productJson.slug,
    imageUrl: productJson.image?.sourceUrl || "",
    descriptionSanitized: sanitizeHtml(productJson.description || ""),
    sizeUpcharges: {
      upcharge2x: productJson.sizeCharges?.upcharge2x,
      upcharge3x: productJson.sizeCharges?.upcharge3x,
      upcharge4x: productJson.sizeCharges?.upcharge4x,
    },
    variations:
      productJson.variations?.nodes.map((item: any) => {
        return {
          id: item.databaseId,
          name: item.name,
          imageUrl: item.image?.sourceUrl || "",
          attributes: item.attributes.nodes,
        };
      }) || [],
  };
}

export function validateWooCommerceSingleProductResponse(productJson: any) {
  return productSchema.parse(pullProductData(productJson));
}

export function validateWooCommerceProductsResponse(json: any) {
  return {
    pageInfo: pageInfoSchema.parse({
      hasNextPage: json.data.products.pageInfo.hasNextPage,
      hasPreviousPage: json.data.products.pageInfo.hasPreviousPage,
      startCursor: json.data.products.pageInfo.startCursor,
      endCursor: json.data.products.pageInfo.endCursor,
    }),
    products: (json.data.products.nodes as any[])
      .filter((item) => productSchema.safeParse(pullProductData(item)).success)
      .map((item: any) => validateWooCommerceSingleProductResponse(item)),
  };
}

export function validateCategoriesResponse(json: any) {
  //WooGraphQL returns duplicate subcategory results; they appear at the same level as categories in addition to nested within the categories.
  //first look through to see which categories are actually children, then go back through and build the correct structure based on that.
  const childIds: number[] = [];
  for (const category of json.data.productCategories.edges) {
    for (const child of category.node.children.nodes) {
      childIds.push(child.databaseId);
    }
  }

  const categories: Category[] = [];
  for (const categoryJson of json.data.productCategories.edges) {
    const isChild = childIds.includes(categoryJson.node.databaseId);
    if (isChild) continue;

    const category: Category = {
      id: categoryJson.node.databaseId,
      name: categoryJson.node.name,
      slug: categoryJson.node.slug,
      subcategories: (categoryJson.node.children.nodes as any[]).map(
        (child) => ({
          id: child.databaseId,
          name: child.name,
          slug: child.slug,
        })
      ),
    };
    categories.push(category);
  }

  return categories;
}

export function validatePagination(pagination: {
  before: string | null;
  after: string | null;
  first: number | null;
  last: number | null;
}): {
  before: string | null;
  after: string | null;
  first: number | null;
  last: number | null;
} {
  const { after, before, first, last } = pagination;
  //only allow "first after", "last before", or "first" as valid queries
  if (typeof first === "number" && !isNaN(first)) {
    const clampedFirst = clamp(first, 1, MAX_PRODUCTS_PAGE_SIZE);
    if (after !== null) {
      return {
        first: clampedFirst,
        after,
        before: null,
        last: null,
      };
    }
    return {
      first: clampedFirst,
      after: null,
      before: null,
      last: null,
    };
  }
  if (before !== null && typeof last === "number" && !isNaN(last)) {
    const clampedLast = clamp(last, 1, MAX_PRODUCTS_PAGE_SIZE);
    return {
      last: clampedLast,
      before,
      first: null,
      after: null,
    };
  }

  //fallback if invalid query provided
  return {
    first: DEFAULT_PRODUCTS_PAGE_SIZE,
    last: null,
    before: null,
    after: null,
  };
}
