import {
  DEFAULT_PRODUCTS_PAGE_SIZE,
  MAX_PRODUCTS_PAGE_SIZE,
} from "@/constants";
import {
  attributeSchema,
  cartQuantityUpdateSchema,
  cartSchema,
  Category,
  customerSchema,
  pageInfoSchema,
  orderLineItemSchema,
  orderSchema,
  productSchema,
  orderShippingLineSchema,
} from "@/types/schema/woocommerce";
import { clamp } from "@/utility/misc";
import sanitizeHtml from "sanitize-html";

function pullProductData(productJson: any) {
  return {
    id: productJson.databaseId,
    name: productJson.name,
    sku: productJson.sku,
    slug: productJson.slug,
    link: productJson.link,
    menuOrder: productJson.menuOrder || 0,
    imageUrl: productJson.image?.sourceUrl || "",
    descriptionSanitized: sanitizeHtml(productJson.description || ""),
    shortDescriptionSanitized: sanitizeHtml(productJson.shortDescription || ""),
    sizeUpcharges: {
      upcharge2x: productJson.sizeCharges?.upcharge2x,
      upcharge3x: productJson.sizeCharges?.upcharge3x,
      upcharge4x: productJson.sizeCharges?.upcharge4x,
    },
    additionalProductInformation: {
      careInformationSanitized: sanitizeHtml(
        productJson.additionalProductInformation?.careInformation || ""
      ),
      materialDescription:
        productJson.additionalProductInformation?.materialDescription,
    },
    additionalProductSettings: {
      linkTextOverride: productJson.additionalProductSettings?.linkTextOverride,
      linkURLOverride: productJson.additionalProductSettings?.linkUrlOverride,
    },
    categories:
      productJson.productCategories?.edges.map((item: any) => ({
        id: item.node.databaseId,
        name: item.node.name,
        slug: item.node.slug,
      })) || [],
    tags:
      productJson.productTags?.edges.map((item: any) => ({
        id: item.node.databaseId,
        name: item.node.name,
      })) || [],
    globalAttributes:
      productJson.globalAttributes?.edges.map((item: any) => ({
        name: item.node.name,
        terms: item.node.terms.edges.map((item: any) => ({
          slug: item.node.slug,
        })),
      })) || [],
    variations:
      productJson.variations?.nodes.map((item: any) => {
        return {
          id: item.databaseId,
          name: item.name,
          imageUrl: item.image?.sourceUrl || "",
          attributes: item.attributes.nodes,
          stockQuantity: item.stockQuantity,
          price: item.price || "$0.00",
        };
      }) || [],
  };
}

export function validateWooCommerceSingleProductResponse(productJson: any) {
  return productSchema.parse(pullProductData(productJson));
}

export function validateWooCommerceProductsGraphQLResponse(json: any) {
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

export function validateWooCommerceProducts(json: any) {
  if (!Array.isArray(json)) return [];
  return (json as any[]).map((item: any) => productSchema.parse(item));
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

export function validateAttributesResponse(json: any) {
  if (!Array.isArray(json)) return [];
  return (json as any[]).map((item) => attributeSchema.parse(item));
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

export function validateCustomer(json: any) {
  return customerSchema.parse(json);
}

export function validateCart(json: any) {
  const nodes = json.data?.cart?.contents?.nodes;

  return cartSchema.parse({
    items: Array.isArray(nodes)
      ? nodes.map((node) => {
          return {
            key: node.key,
            product: node.product.node,
            quantity: node.quantity || 0,
            subtotal: node.subtotal,
            variation: {
              id: node.variation.node.id,
              databaseId: node.variation.node.databaseId,
              stockQuantity: node.variation.node.stockQuantity || 0,
              price: node.variation.node.price || "0",
              image: node.variation.node.image,
              lowStockAmount: node.variation.node.lowStockAmount || 0,
              weight: node.variation.weight || "0",
              attributes: node.variation.attributes,
            },
          };
        })
      : [],
    subtotal: json.data.cart.subtotal,
    subtotalTax: json.data.cart.subtotalTax,
  });
}

export function validateOrders(json: any) {
  const nodes = json.data?.orders?.nodes;
  if (!Array.isArray(nodes)) return [];

  return nodes.map((node) => {
    const lineItems = node.lineItems?.nodes;
    const shippingLines = node.shippingLines?.nodes;
    return orderSchema.parse({
      id: node.id,
      databaseId: node.databaseId,
      date: new Date(node.date),
      customer: {
        firstName: node.customer.firstName,
        lastName: node.customer.lastName,
      },
      subtotal: node.subtotal,
      shippingTotal: node.shippingTotal,
      shippingTax: node.shippingTax,
      totalTax: node.totalTax,
      total: node.total,
      discountTotal: node.discountTotal,
      shippingLines: Array.isArray(shippingLines)
        ? shippingLines.map((line) =>
            orderShippingLineSchema.parse({
              id: line.id,
              databaseId: line.databaseId,
              methodTitle: line.methodTitle,
            })
          )
        : [],
      lineItems: Array.isArray(lineItems)
        ? lineItems.map((item) =>
            orderLineItemSchema.parse({
              id: item.id,
              databaseId: item.databaseId,
              product: {
                id: item.product.node.id,
                databaseId: item.product.node.databaseId,
                name: item.product.node.name,
                slug: item.product.node.slug,
                sku: item.product.node.sku,
                image: {
                  id: item.product.node.image.id,
                  sourceUrl: item.product.node.image.sourceUrl,
                },
              },
              quantity: item.quantity,
              variation: {
                id: item.variation.node.id,
                databaseId: item.variation.node.databaseId,
                name: item.variation.node.name,
                sku: item.variation.node.sku,
                image: {
                  id: item.variation.node.image.id,
                  sourceUrl: item.variation.node.image.sourceUrl,
                },
              },
              subtotal: item.subtotal,
            })
          )
        : [],
    });
  });
}

export function validateCartQuantityUpdate(json: any) {
  return cartQuantityUpdateSchema.parse(json);
}
