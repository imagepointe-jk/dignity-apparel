import { getProductBySlug } from "@/fetch/woocommerce/products";
import { validateWooCommerceSingleProductResponse } from "@/types/validation/woocommerce/woocommerce";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FeaturedProducts as FeaturedProductsComponent } from "@/components/sections/FeaturedProducts/FeaturedProducts";
import { getBrandColor } from "@/utility/prismic";

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
  const responses = await Promise.all(
    slice.primary.product_slugs.map((item) =>
      getProductBySlug(item.slug || "").catch(() => {
        console.error(`Error fetching product with slug ${item.slug}`);
        return null;
      })
    )
  );
  const jsons = await Promise.all(
    responses.map((response) => (response === null ? null : response.json()))
  );
  const parsed = jsons.map((json) => {
    try {
      return validateWooCommerceSingleProductResponse(json.data.product);
    } catch (error) {
      if (error) {
      } //we don't need the error
      return null;
    }
  });
  const nonNullParsed = parsed.filter((item) => item !== null);
  const textColor = await getBrandColor(slice.primary.primary_text_color);

  return (
    <FeaturedProductsComponent
      headingNode={<PrismicRichText field={slice.primary.heading} />}
      tilingBackground={{ src: slice.primary.tiling_background.url }}
      primaryTextColor={textColor.replace("#", "")}
      products={nonNullParsed}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default FeaturedProducts;
