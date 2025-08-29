import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FeaturedProducts as FeaturedProductsComponent } from "@/components/sections/FeaturedProducts/FeaturedProducts";
import { getBrandColor } from "@/utility/prismic";

import type { JSX } from "react";
import { getCachedProducts } from "@/get/products";

/**
 * Props for `FeaturedProducts`.
 */
export type FeaturedProductsProps =
  SliceComponentProps<Content.FeaturedProductsSlice>;

/**
 * Component for "FeaturedProducts" Slices.
 */
const FeaturedProducts = async ({
  slice,
}: FeaturedProductsProps): Promise<JSX.Element> => {
  const slice_id = slice.primary.slice_id;
  const products = await getCachedProducts();
  const filtered = slice.primary.product_slugs
    .map((item) => products.find((product) => product.slug === item.slug))
    .filter((product) => product !== undefined);
  const textColor = await getBrandColor(slice.primary.primary_text_color);

  return (
    <FeaturedProductsComponent
      id={slice_id}
      headingNode={<PrismicRichText field={slice.primary.heading} />}
      tilingBackground={{ src: slice.primary.tiling_background.url }}
      primaryTextColor={textColor.replace("#", "")}
      products={filtered}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default FeaturedProducts;
