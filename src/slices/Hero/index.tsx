import { Hero as HeroComponent } from "@/components/Hero/Hero";
import { BRAND_COLOR } from "@/constants";
import { getBrandColor, getPrismicLinkUrl } from "@/utility/prismic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Simplify } from "../../../prismicio-types";

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

async function convertButton(
  button: Simplify<Content.HeroSliceDefaultPrimaryButtonsItem> | undefined
) {
  if (!button) {
    return {
      href: "",
      label: "Link",
      mainColor: BRAND_COLOR,
    };
  }

  const mainColor = await getBrandColor(button.primary_color);
  const secondaryColor = await getBrandColor(button.secondary_color);

  return {
    href: getPrismicLinkUrl(button.link),
    label: button.link.text || "Link",
    mainColor,
    secondaryColor,
  };
}
