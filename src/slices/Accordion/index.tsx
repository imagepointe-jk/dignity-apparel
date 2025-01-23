import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Accordion as AccordionComponent } from "@/components/sections/Accordion/Accordion";

import type { JSX } from "react";

/**
 * Props for `Accordion`.
 */
export type AccordionProps = SliceComponentProps<Content.AccordionSlice>;

/**
 * Component for "Accordion" Slices.
 */
const Accordion = ({ slice }: AccordionProps): JSX.Element => {
  const { slice_id, content_color, heading, sections, tiling_background } =
    slice.primary;

  return (
    <AccordionComponent
      id={slice_id}
      contentColor={content_color === "Normal" ? "normal" : "white"}
      heading={<PrismicRichText field={heading} />}
      sections={sections.map((section) => ({
        title: section.title || "Details",
        body: <PrismicRichText field={section.body} />,
      }))}
      tilingBackground={{ src: tiling_background.url }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default Accordion;
