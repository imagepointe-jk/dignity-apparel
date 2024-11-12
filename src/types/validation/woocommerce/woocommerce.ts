import { productSchema } from "@/types/schema/woocommerce";

export function validateWooCommerceSingleProductResponse(productJson: any) {
  return productSchema.parse({
    id: productJson.databaseId,
    name: productJson.name,
    sku: productJson.sku,
    slug: productJson.slug,
    imageUrl: productJson.image?.sourceUrl || "",
    variations: productJson.variations.nodes.map((item: any) => {
      return {
        id: item.databaseId,
        name: item.name,
        imageUrl: item.image?.sourceUrl || "",
        attributes: item.attributes.nodes,
      };
    }),
  });
}

export function validateWooCommerceProductsResponse(json: any) {
  return (json.data.products.nodes as any[]).map((item: any) =>
    validateWooCommerceSingleProductResponse(item)
  );
}
