import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TwoThirdsImageText as TwoThirdsImageTextComponent } from "@/components/sections/TwoThirdsImageText/TwoThirdsImageText";
import { IMAGE_NOT_FOUND_URL } from "@/constants";

import type { JSX } from "react";

/**
 * Props for `TwoThirdsImageText`.
 */
export type TwoThirdsImageTextProps =
  SliceComponentProps<Content.TwoThirdsImageTextSlice>;

/**
 * Component for "TwoThirdsImageText" Slices.
 */
const TwoThirdsImageText = ({
  slice,
}: TwoThirdsImageTextProps): JSX.Element => {
  const {
    slice_id,
    heading,
    image,
    image_caption,
    sections,
    text_color,
    tiling_background,
  } = slice.primary;

  return (
    <TwoThirdsImageTextComponent
      id={slice_id}
      heading={<PrismicRichText field={heading} />}
      image={{
        src: image.url || IMAGE_NOT_FOUND_URL,
        alt: image.alt || "image",
        caption: image_caption || undefined,
      }}
      textColor={text_color === "Normal" ? "normal" : "white"}
      tilingBackground={{ src: tiling_background.url }}
      sections={sections.map((section) => ({
        title: <PrismicRichText field={section.title} />,
        body: <PrismicRichText field={section.body} />,
      }))}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default TwoThirdsImageText;
