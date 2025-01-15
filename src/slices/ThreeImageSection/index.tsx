import { ThreeImageSection as ThreeImageSectionComponent } from "@/components/sections/ThreeImageSection/ThreeImageSection";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { convertButton, getBrandColor } from "@/utility/prismic";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ThreeImageSection`.
 */
export type ThreeImageSectionProps =
  SliceComponentProps<Content.ThreeImageSectionSlice>;

/**
 * Component for "ThreeImageSection" Slices.
 */
const ThreeImageSection = async ({
  slice,
}: ThreeImageSectionProps): Promise<JSX.Element> => {
  const {
    slice_id,
    body,
    heading,
    link,
    link_button_style,
    primary_image,
    primary_text_color,
    secondary_image_1,
    secondary_image_2,
    subheading,
    tiling_background,
  } = slice.primary;
  const button = await convertButton({ link, button_style: link_button_style });
  const textColor = await getBrandColor(primary_text_color);

  return (
    <ThreeImageSectionComponent
      id={slice_id}
      heading={<PrismicRichText field={heading} />}
      subheading={<PrismicRichText field={subheading} />}
      body={<PrismicRichText field={body} />}
      primaryImage={{
        src: primary_image.url || IMAGE_NOT_FOUND_URL,
        alt: primary_image.alt || "image",
      }}
      secondaryImage1={{
        src: secondary_image_1.url || IMAGE_NOT_FOUND_URL,
        alt: secondary_image_1.alt || "image",
      }}
      secondaryImage2={{
        src: secondary_image_2.url || IMAGE_NOT_FOUND_URL,
        alt: secondary_image_2.alt || "image",
      }}
      button={button}
      textColor={textColor}
      tilingBackground={{ src: tiling_background.url }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default ThreeImageSection;
