import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { CardsSection1 as CardsSection1Component } from "@/components/sections/CardsSection1/CardsSection1";
import { convertButton, getPrismicLinkUrl } from "@/utility/prismic";

import type { JSX } from "react";

/**
 * Props for `CardsSection1`.
 */
export type CardsSection1Props =
  SliceComponentProps<Content.CardsSection1Slice>;

/**
 * Component for "CardsSection1" Slices.
 */
const CardsSection1 = async ({
  slice,
}: CardsSection1Props): Promise<JSX.Element> => {
  const slice_id = slice.primary.slice_id;
  const cards = await Promise.all(
    slice.primary.cards.map(async (card) => {
      const button = getPrismicLinkUrl(card.button)
        ? await convertButton({
            link: card.button,
            button_style: card.button_style,
          })
        : undefined;

      return {
        image: { src: card.image.url || "", alt: card.image.alt || "" },
        headingNode: <PrismicRichText field={card.heading} />,
        bodyNode: <PrismicRichText field={card.body} />,
        button,
      };
    })
  );

  return (
    <CardsSection1Component
      id={slice_id}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      tilingBackground={{ src: slice.primary.tiling_background.url }}
      cards={cards}
    />
  );
};

export default CardsSection1;
