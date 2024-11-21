import { Product, ProductVariation } from "@/types/schema/woocommerce";

type ColorSwatch = {
  name: string;
  displayName: string;
  hexCode?: string;
  imageUrl?: string;
};
const colorSwatches: ColorSwatch[] = [
  {
    name: "black",
    displayName: "Black",
    hexCode: "000000",
  },
  {
    name: "red",
    displayName: "Red",
    hexCode: "cd2527",
  },
  {
    name: "charcoal",
    displayName: "Charcoal",
    hexCode: "5c5c5c",
  },
  {
    name: "navy",
    displayName: "Navy",
    hexCode: "483370",
  },
  {
    name: "purple",
    displayName: "Purple",
    hexCode: "483370",
  },
  {
    name: "white",
    displayName: "White",
    hexCode: "f3f5f7",
  },
  {
    name: "safety-orange",
    displayName: "Safety Orange",
    hexCode: "f36523",
  },
  {
    name: "safety-yellow",
    displayName: "Safety Yellow",
    hexCode: "cddd2a",
  },
  {
    name: "royal",
    displayName: "Royal",
    hexCode: "005eab",
  },
  {
    name: "storm-grey-heather",
    displayName: "Storm Grey Heather",
    hexCode: "737373",
  },
  {
    name: "safety-green",
    displayName: "Safety Green",
    hexCode: "cddd2a",
  },
  {
    name: "heather-charcoal",
    displayName: "Heather Charcoal",
    imageUrl:
      "https://dawholesale.unionwebstores.com/wp-content/uploads/sites/118/2024/11/heather-charcoal.png",
  },
  {
    name: "heather-military-green",
    displayName: "Heather Military Green",
    imageUrl:
      "https://dawholesale.unionwebstores.com/wp-content/uploads/sites/118/2024/11/heather-military-green.png",
  },
];

export function getSwatchesWithImages(product: Product) {
  const colorVariations = product.variations.filter(
    (variation) => !!variation.attributes.find((att) => att.name === "pa_color")
  );
  const withImages = colorVariations.map((variation) => {
    const attribute = variation.attributes.find(
      (att) => att.name === "pa_color"
    )!; //due to the filter above we already know this will be present
    const match = colorSwatches.find(
      (swatch) => swatch.name === attribute.value
    );
    if (!match)
      return {
        name: "UNKNOWN COLOR",
        imageUrl: variation.imageUrl,
        hexCode: "000000",
      };

    return {
      name: match.displayName,
      productImageUrl: variation.imageUrl,
      hexCode: match.hexCode,
      swatchImageUrl: match.imageUrl,
    };
  });

  return withImages;
}

export function getVariationColorName(variation: ProductVariation) {
  const unformattedName =
    variation.attributes.find((att) => att.name === "pa_color")?.value ||
    "UNKNOWN COLOR";
  const match = colorSwatches.find((swatch) => swatch.name === unformattedName);
  return match?.displayName || "UNKNOWN COLOR";
}

//get an array of categories representing all the categories the given products are in, with no duplicates
//also includes the products in the category
export function getRepresentedCategories(products: Product[]) {
  const categories: {
    id: number;
    slug: string;
    name: string;
    products: Product[];
  }[] = [];
  for (const product of products) {
    for (const category of product.categories) {
      const match = categories.find((item) => item.slug === category.slug);
      if (!match) {
        categories.push({ ...category, products: [product] });
      } else {
        match.products.push(product);
      }
    }
  }
  return categories;
}
