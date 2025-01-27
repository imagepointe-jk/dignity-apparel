import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { IconCards as IconCardsComponent } from "@/components/sections/IconCards/IconCards";
import {
  convertButton,
  getBrandColor,
  getPrismicLinkUrl,
} from "@/utility/prismic";
import { IMAGE_NOT_FOUND_URL } from "@/constants";

import type { JSX } from "react";

/**
 * Props for `IconCards`.
 */
export type IconCardsProps = SliceComponentProps<Content.IconCardsSlice>;

/**
 * Component for "IconCards" Slices.
 */
const IconCards = async ({ slice }: IconCardsProps): Promise<JSX.Element> => {
  const {
    slice_id,
    background_behavior,
    background_image,
    background_overlay_opacity,
    body,
    button,
    button_style,
    cards,
    heading,
    icon_details_text_color,
    primary_text_color,
    subheading,
  } = slice.primary;
  const buttonUrl = getPrismicLinkUrl(button);
  const convertedButton = buttonUrl
    ? await convertButton({
        link: button,
        button_style,
      })
    : undefined;
  const iconDetailTextColor = await getBrandColor(icon_details_text_color);
  const convertedCards = cards.map((card) => {
    const linkUrl = getPrismicLinkUrl(card.link);

    return {
      image: card.image.url
        ? {
            src: card.image.url || IMAGE_NOT_FOUND_URL,
            alt: card.image.alt || "image",
          }
        : undefined,
      title: <PrismicRichText field={card.title} />,
      detailText: <PrismicRichText field={card.detail_text} />,
      link: linkUrl
        ? {
            label: card.link.text || "Learn More",
            href: linkUrl,
          }
        : undefined,
    };
  });

  return (
    <IconCardsComponent
      id={slice_id}
      bgImage={{
        src: background_image.url || undefined,
        behavior:
          background_behavior === "Fill"
            ? "fill"
            : background_behavior === "Parallax"
              ? "parallax"
              : "tile",
        overlayOpacity: background_overlay_opacity || 0,
      }}
      primaryTextColor={primary_text_color === "Black" ? "black" : "white"}
      iconDetailTextColor={iconDetailTextColor}
      heading={<PrismicRichText field={heading} />}
      subheading={<PrismicRichText field={subheading} />}
      body={<PrismicRichText field={body} />}
      cards={convertedCards}
      button={convertedButton}
    />
  );
};

export default IconCards;
