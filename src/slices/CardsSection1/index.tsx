import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { CardsSection1 as CardsSection1Component } from "@/components/sections/CardsSection1/CardsSection1";
import { getBrandColor, getPrismicLinkUrl } from "@/utility/prismic";

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
  const cards = await Promise.all(
    slice.primary.cards.map(async (card) => {
      const bgColor = await getBrandColor(card.button_primary_color);
      const textColor = await getBrandColor(card.button_secondary_color);

      return {
        image: { src: card.image.url || "", alt: card.image.alt || "" },
        heading: `${card.heading}`,
        bodyNode: <PrismicRichText field={card.body} />,
        button: {
          href: getPrismicLinkUrl(card.button),
          label: card.button.text || "Link",
          bgColor,
          textColor,
        },
      };
    })
  );

  return (
    <CardsSection1Component
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      cards={cards}
    />
  );
};

export default CardsSection1;
