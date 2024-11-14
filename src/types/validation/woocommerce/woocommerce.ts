import { productSchema } from "@/types/schema/woocommerce";
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
  return (json.data.products.nodes as any[])
    .filter((item) => productSchema.safeParse(pullProductData(item)).success)
    .map((item: any) => validateWooCommerceSingleProductResponse(item));
}
