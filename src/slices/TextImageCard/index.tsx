import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TextImageCard as TextImageCardComponent } from "@/components/sections/TextImageCard/TextImageCard";
import { convertButton } from "@/utility/prismic";
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
    body,
    button,
    button_style,
    heading,
    image,
    subheading,
    tiling_background,
  } = slice.primary;
  const convertedButton = await convertButton({ link: button, button_style });

  return (
    <TextImageCardComponent
      body={<PrismicRichText field={body} />}
      heading={<PrismicRichText field={heading} />}
      image={{
        src: image.url || IMAGE_NOT_FOUND_URL,
        alt: image.alt || "image",
      }}
      link={convertedButton}
      subheading={<PrismicRichText field={subheading} />}
      tilingBackground={{ src: tiling_background.url }}
    />
  );
};

export default TextImageCard;
