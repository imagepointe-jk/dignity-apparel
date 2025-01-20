import { StandardSection1 as StandardSection1Component } from "@/components/sections/StandardSection1/StandardSection1";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import {
  convertButton,
  getBrandColor,
  getPrismicLinkUrl,
} from "@/utility/prismic";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StandardSection1`.
 */
export type StandardSection1Props =
  SliceComponentProps<Content.StandardSection1Slice>;

/**
 * Component for "StandardSection1" Slices.
 */
const StandardSection1 = async ({
  slice,
}: StandardSection1Props): Promise<JSX.Element> => {
  const {
    slice_id,
    body,
    button_link,
    button_style,
    heading,
    image,
    image_location,
    subtext,
    tiling_background,
    primary_text_color,
  } = slice.primary;
  const convertedButton = getPrismicLinkUrl(button_link)
    ? await convertButton({
        button_style,
        link: button_link,
      })
    : undefined;
  const textColor = await getBrandColor(primary_text_color);

  return (
    <StandardSection1Component
      id={slice_id}
      tilingBackground={{ src: tiling_background.url }}
      headingNode={<PrismicRichText field={heading} />}
      subtextNode={<PrismicRichText field={subtext} />}
      bodyTextNode={<PrismicRichText field={body} />}
      img={{ src: image.url || IMAGE_NOT_FOUND_URL, alt: image.alt }}
      buttonPrimary={convertedButton}
      horzReversed={image_location === "Left"}
      textColor={textColor}
    />
  );
};

export default StandardSection1;
