import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { StandardSection2 as StandardSection2Component } from "@/components/sections/StandardSection2/StandardSection2";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { convertButton, getBrandColor } from "@/utility/prismic";

/**
 * Props for `StandardSection2`.
 */
export type StandardSection2Props =
  SliceComponentProps<Content.StandardSection2Slice>;

/**
 * Component for "StandardSection2" Slices.
 */
const StandardSection2 = async ({
  slice,
}: StandardSection2Props): Promise<JSX.Element> => {
  const {
    body,
    button_links,
    heading,
    image,
    image_location,
    primary_text_color,
    subtext,
    tiling_background,
  } = slice.primary;
  const convertedButtons = await Promise.all(
    button_links.map((link) =>
      convertButton({ link: link.link, button_style: link.style })
    )
  );
  const textColor = await getBrandColor(primary_text_color);

  return (
    <StandardSection2Component
      headingNode={<PrismicRichText field={heading} />}
      subtextNode={<PrismicRichText field={subtext} />}
      bodyTextNode={<PrismicRichText field={body} />}
      buttons={convertedButtons}
      img={{ src: image.url || IMAGE_NOT_FOUND_URL, alt: image.alt }}
      horzReversed={image_location === "Left"}
      textColor={textColor}
      tilingBackground={{ src: tiling_background.url }}
    />
  );
};

export default StandardSection2;
