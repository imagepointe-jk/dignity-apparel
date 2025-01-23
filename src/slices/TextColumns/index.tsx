import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TextColumns as TextColumnsComponent } from "@/components/sections/TextColumns/TextColumns";

import type { JSX } from "react";

/**
 * Props for `TextColumns`.
 */
export type TextColumnsProps = SliceComponentProps<Content.TextColumnsSlice>;

/**
 * Component for "TextColumns" Slices.
 */
const TextColumns = ({ slice }: TextColumnsProps): JSX.Element => {
  const {
    columns,
    heading,
    subheading,
    slice_id,
    tiling_background,
    text_color,
  } = slice.primary;

  return (
    <TextColumnsComponent
      id={slice_id}
      tilingBackground={{ src: tiling_background.url }}
      heading={<PrismicRichText field={heading} />}
      subheading={<PrismicRichText field={subheading} />}
      textColor={text_color === "Normal" ? "normal" : "white"}
      columns={columns.map((column) => ({
        title: <PrismicRichText field={column.title} />,
        body: <PrismicRichText field={column.body} />,
      }))}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default TextColumns;
