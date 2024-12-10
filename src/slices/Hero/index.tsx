import { Hero as HeroComponent } from "@/components/Hero/Hero";
import { convertButton } from "@/utility/prismic";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = async ({ slice }: HeroProps): Promise<JSX.Element> => {
  const { background_image, buttons, heading, subtext } = slice.primary;
  const buttonPrimary = await convertButton({
    button_style: buttons[0]?.button_style,
    link: buttons[0]?.link,
  });
  const buttonSecondary = buttons[1]
    ? await convertButton({
        button_style: buttons[1]?.button_style,
        link: buttons[1]?.link,
      })
    : undefined;

  return (
    <HeroComponent
      alignment={"center"}
      heading={`${heading}`}
      buttonPrimary={buttonPrimary}
      buttonSecondary={buttonSecondary}
      subtextNode={<PrismicRichText field={subtext} />}
      bgImageUrl={background_image.url || ""}
    />
  );
};

export default Hero;
