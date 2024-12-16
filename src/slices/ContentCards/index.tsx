import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ContentCards as ContentCardsComponent } from "@/components/sections/ContentCards/ContentCards";
import { convertButton, getBrandColor } from "@/utility/prismic";
import { IMAGE_NOT_FOUND_URL } from "@/constants";

/**
 * Props for `ContentCards`.
 */
export type ContentCardsProps = SliceComponentProps<Content.ContentCardsSlice>;

/**
 * Component for "ContentCards" Slices.
 */
const ContentCards = async ({
  slice,
}: ContentCardsProps): Promise<JSX.Element> => {
  const { card_type, cards, heading, primary_text_color, tiling_background } =
    slice.primary;
  const textColor = await getBrandColor(primary_text_color);
  const cardsConverted = await Promise.all(
    cards.map(async (card) => {
      const button = await convertButton({
        link: card.link,
        button_style: card.button_style,
      });

      return {
        heading: <PrismicRichText field={card.heading} />,
        body: <PrismicRichText field={card.body} />,
        image: {
          src: card.image.url || IMAGE_NOT_FOUND_URL,
          alt: card.image.alt || "image",
        },
        button,
      };
    })
  );

  return (
    <ContentCardsComponent
      heading={<PrismicRichText field={heading} />}
      textColor={textColor}
      cards={cardsConverted}
      tilingBackground={{ src: tiling_background.url }}
      cardType={card_type === "Text Below" ? "text below" : "text overlay"}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default ContentCards;
