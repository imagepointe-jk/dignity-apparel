import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { VideoCards as VideoCardsComponent } from "@/components/sections/VideoCards/VideoCards";
import { convertButton, getBrandColor } from "@/utility/prismic";

import type { JSX } from "react";

/**
 * Props for `VideoCards`.
 */
export type VideoCardsProps = SliceComponentProps<Content.VideoCardsSlice>;

/**
 * Component for "VideoCards" Slices.
 */
const VideoCards = async ({ slice }: VideoCardsProps): Promise<JSX.Element> => {
  const {
    slice_id,
    card_background_color,
    cards,
    heading,
    primary_text_color,
    tiling_background,
  } = slice.primary;
  const cardBgColor = await getBrandColor(card_background_color);
  const textColor = await getBrandColor(primary_text_color);
  const convertedCards = await Promise.all(
    cards.map(async (card) => {
      const button = await convertButton({
        link: card.link,
        button_style: card.button_style,
      });
      return {
        embedCode: card.video.html || "",
        heading: <PrismicRichText field={card.heading} />,
        body: <PrismicRichText field={card.body} />,
        button,
      };
    })
  );

  return (
    <VideoCardsComponent
      id={slice_id}
      heading={<PrismicRichText field={heading} />}
      textColor={textColor}
      cardBgColor={cardBgColor}
      cards={convertedCards}
      tilingBackground={{ src: tiling_background.url }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default VideoCards;
