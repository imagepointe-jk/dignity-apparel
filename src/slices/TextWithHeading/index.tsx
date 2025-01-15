import { TextWithHeading as TextWithHeadingComponent } from "@/components/sections/TextWithHeading/TextWithHeading";
import { getBrandColor } from "@/utility/prismic";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextWithHeading`.
 */
export type TextWithHeadingProps =
  SliceComponentProps<Content.TextWithHeadingSlice>;

/**
 * Component for "TextWithHeading" Slices.
 */
const TextWithHeading = async ({
  slice,
}: TextWithHeadingProps): Promise<JSX.Element> => {
  const {
    slice_id,
    body,
    heading,
    primary_text_color,
    subheading,
    tiling_background,
  } = slice.primary;
  const textColor = await getBrandColor(primary_text_color);

  return (
    <TextWithHeadingComponent
      id={slice_id}
      heading={<PrismicRichText field={heading} />}
      subheading={<PrismicRichText field={subheading} />}
      body={<PrismicRichText field={body} />}
      textColor={textColor}
      tilingBackground={{ src: tiling_background.url }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default TextWithHeading;
