import { Hero as HeroComponent } from "@/components/Hero/Hero";
import { convertButton } from "@/utility/prismic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = async ({ slice }: HeroProps): Promise<JSX.Element> => {
  const { background_image, buttons, heading, subtext } = slice.primary;
  const buttonPrimary = await convertButton(buttons[0]);
  const buttonSecondary = buttons[1]
    ? await convertButton(buttons[1])
    : undefined;

  return (
    <HeroComponent
      alignment={"center"}
      heading={`${heading}`}
      buttonPrimary={buttonPrimary}
      buttonSecondary={buttonSecondary}
      subtext={`${subtext}`}
      bgImageUrl={background_image.url || ""}
    />
  );
};

export default Hero;
