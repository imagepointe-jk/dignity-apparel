import {
  Product,
  ProductBrowseURLParams,
  ProductVariation,
} from "@/types/schema/woocommerce";

type ColorSwatch = {
  name: string;
  displayName: string;
  order: number;
  hexCode?: string;
  imageUrl?: string;
};
const colorSwatches: ColorSwatch[] = [
  {
    name: "black",
    displayName: "Black",
    hexCode: "000000",
    order: 1,
  },
  {
    name: "red",
    displayName: "Red",
    hexCode: "cd2527",
    order: 2,
  },
  {
    name: "charcoal",
    displayName: "Charcoal",
    hexCode: "5c5c5c",
    order: 3,
  },
  {
    name: "navy",
    displayName: "Navy",
    hexCode: "262d38",
    order: 4,
  },
  {
    name: "purple",
    displayName: "Purple",
    hexCode: "483370",
    order: 5,
  },
  {
    name: "white",
    displayName: "White",
    hexCode: "f3f5f7",
    order: 6,
  },
  {
    name: "safety-orange",
    displayName: "Safety Orange",
    hexCode: "f36523",
    order: 7,
  },
  {
    name: "safety-yellow",
    displayName: "Safety Yellow",
    hexCode: "cddd2a",
    order: 8,
  },
  {
    name: "royal",
    displayName: "Royal",
    hexCode: "005eab",
    order: 9,
  },
  {
    name: "storm-grey-heather",
    displayName: "Storm Grey Heather",
    hexCode: "737373",
    order: 10,
  },
  {
    name: "safety-green",
    displayName: "Safety Green",
    hexCode: "cddd2a",
    order: 11,
  },
  {
    name: "heather-charcoal",
    displayName: "Heather Charcoal",
    imageUrl:
      "https://wholesale.dignityapparel.com/wp-content/uploads/sites/118/2024/11/heather-charcoal.png",
    order: 12,
  },
  {
    name: "heather-military-green",
    displayName: "Heather Military Green",
    imageUrl:
      "https://wholesale.dignityapparel.com/wp-content/uploads/sites/118/2024/11/heather-military-green.png",
    order: 13,
  },
  {
    name: "sand",
    displayName: "Sand",
    hexCode: "d19e6c",
    order: 14,
  },
  {
    name: "storm",
    displayName: "Storm",
    hexCode: "6265AA",
    order: 15,
  },
  {
    name: "carbon",
    displayName: "Carbon",
    hexCode: "a3a3a3",
    order: 16,
  },
  {
    name: "onyx",
    displayName: "Onyx",
    hexCode: "000000",
    order: 17,
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
    order: number;
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
        order: 0,
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
      order: match.order,
    });
  }
  withImages.sort((a, b) => a.order - b.order);

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
      if (category.slug === "uncategorized") continue;
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
      case "small":
        return 1;
      case "medium":
        return 2;
      case "large":
        return 3;
      case "xl":
        return 4;
      case "2xl":
        return 5;
      case "3xl":
        return 6;
      case "4xl":
        return 7;
      case "5xl":
        return 8;
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

export function validateBrowseSearchParams(
  searchParams: URLSearchParams
): ProductBrowseURLParams {
  function get(param: string) {
    return searchParams.get(param);
  }

  function getAll(param: string) {
    return searchParams.getAll(param);
  }

  const search = get("search");
  const category = get("category");
  const before = get("before");
  const after = get("after");
  const first = get("first");
  const last = get("last");
  const availability = get("availability");
  const fabricType = getAll("fabric-type");
  const fabricWeight = getAll("fabric-weight");
  const features = getAll("feature");
  const fit = get("fit");

  return {
    search,
    category,
    before: before ? decodeURIComponent(before) : null,
    after: after ? decodeURIComponent(after) : null,
    first: first ? +first : null,
    last: last ? +last : null,
    availability:
      availability === "made-to-order"
        ? "made-to-order"
        : availability === "in-stock"
          ? "in-stock"
          : null,
    "fabric-type": fabricType,
    "fabric-weight": fabricWeight,
    features,
    fit: fit === "mens" ? "mens" : fit === "womens" ? "womens" : "unisex",
  };
}

export function abbreviateSize(size: string) {
  if (["small", "medium", "large"].includes(size.toLocaleLowerCase())) {
    return size.substring(0, 1);
  }
  return size;
}

//some products have sizes (e.g. apparel) but some don't (e.g. blankets)
export function isSizedProduct(product: Product) {
  return !!product.variations.find((variation) =>
    variation.attributes.find((attr) => attr.name === "pa_size")
  );
}
