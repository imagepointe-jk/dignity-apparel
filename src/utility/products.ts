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
  const withImages: {
    variationId: number;
    name: string;
    displayName: string;
    productImageUrl: string;
    hexCode?: string;
    swatchImageUrl?: string;
  }[] = [];
  const seenColors: string[] = [];
  for (const variation of product.variations) {
    const color = variation.attributes.find(
      (att) => att.name === "pa_color"
    )?.value;
    if (!color || seenColors.includes(color)) continue;
    seenColors.push(color);
    const match = colorSwatches.find((swatch) => swatch.name === color);
    if (!match) {
      withImages.push({
        variationId: -1,
        name: color,
        displayName: "UNKNOWN COLOR",
        productImageUrl: variation.imageUrl,
        hexCode: "000000",
      });
      continue;
    }

    withImages.push({
      name: color,
      displayName: match.displayName,
      productImageUrl: variation.imageUrl,
      variationId: variation.id,
      hexCode: match.hexCode,
      swatchImageUrl: match.imageUrl,
    });
  }

  return withImages;
}

export function getColorStockAmounts(product: Product, colorName: string) {
  const variationsWithColor = product.variations.filter(
    (variation) => getVariationColorName(variation) === colorName
  );
  sortBySize(variationsWithColor, (item) => getVariationSize(item));
  return variationsWithColor.map((variation) => ({
    size: getVariationSize(variation),
    stock: variation.stockQuantity,
  }));
}

export function getVariationColorName(variation: ProductVariation) {
  return (
    variation.attributes.find((att) => att.name === "pa_color")?.value ||
    "UNKNOWN COLOR"
  );
}

export function getVariationColorDisplayName(variation: ProductVariation) {
  const unformattedName =
    variation.attributes.find((att) => att.name === "pa_color")?.value ||
    "UNKNOWN COLOR";
  const match = colorSwatches.find((swatch) => swatch.name === unformattedName);
  return match?.displayName || "UNKNOWN COLOR";
}

function getVariationSize(variation: ProductVariation) {
  return (
    variation.attributes.find((att) => att.name === "pa_size")?.value ||
    "UNKNOWN SIZE"
  );
}

export function deduplicateColorVariations(product: Product) {
  const seenColors: string[] = [];
  const deduplicated: ProductVariation[] = [];
  for (const variation of product.variations) {
    const color = variation.attributes.find(
      (att) => att.name === "pa_color"
    )?.value;
    if (!color || seenColors.includes(color)) continue;
    seenColors.push(color);
    deduplicated.push(variation);
  }
  return deduplicated;
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

function sortBySize<T>(items: T[], getItemSize: (item: T) => string) {
  function getSizeValue(size: string) {
    switch (size) {
      case "s":
        return 1;
      case "m":
        return 2;
      case "l":
        return 3;
      case "xl":
        return 4;
      case "2xl":
        return 5;
      case "3xl":
        return 6;
      case "4xl":
        return 7;
      default:
        return 1;
    }
  }
  items.sort((a, b) => {
    const sizeA = getItemSize(a);
    const sizeB = getItemSize(b);
    const valueA = getSizeValue(sizeA.toLocaleLowerCase());
    const valueB = getSizeValue(sizeB.toLocaleLowerCase());
    return valueA - valueB;
  });
}
