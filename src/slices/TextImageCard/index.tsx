import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TextImageCard as TextImageCardComponent } from "@/components/sections/TextImageCard/TextImageCard";
import { convertButton, getPrismicLinkUrl } from "@/utility/prismic";
import { IMAGE_NOT_FOUND_URL } from "@/constants";

/**
 * Props for `TextImageCard`.
 */
export type TextImageCardProps =
  SliceComponentProps<Content.TextImageCardSlice>;

/**
 * Component for "TextImageCard" Slices.
 */
const TextImageCard = async ({
  slice,
}: TextImageCardProps): Promise<JSX.Element> => {
  const {
    slice_id,
    body,
    button,
    button_style,
    heading,
    image,
    subheading,
    tiling_background,
  } = slice.primary;
  const convertedButton = getPrismicLinkUrl(button)
    ? await convertButton({ link: button, button_style })
    : undefined;

  return (
    <TextImageCardComponent
      id={slice_id}
      body={<PrismicRichText field={body} />}
      heading={<PrismicRichText field={heading} />}
      image={{
        src: image.url || IMAGE_NOT_FOUND_URL,
        alt: image.alt || "image",
      }}
      link={convertedButton}
      subheading={<PrismicRichText field={subheading} />}
      tilingBackground={{ src: tiling_background.url }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default TextImageCard;
