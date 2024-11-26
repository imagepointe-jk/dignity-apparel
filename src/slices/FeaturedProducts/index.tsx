import { getProductBySlug } from "@/fetch/woocommerce/products";
import { validateWooCommerceSingleProductResponse } from "@/types/validation/woocommerce/woocommerce";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FeaturedProducts as FeaturedProductsComponent } from "@/components/sections/FeaturedProducts/FeaturedProducts";

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
    slice.primary.product_slugs.map((item) => getProductBySlug(item.slug || ""))
  );
  const jsons = await Promise.all(responses.map((response) => response.json()));
  const parsed = jsons.map((json) =>
    validateWooCommerceSingleProductResponse(json.data.product)
  );

  return (
    <FeaturedProductsComponent
      products={parsed}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default FeaturedProducts;