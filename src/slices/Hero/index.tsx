import { Content, Query } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Hero as HeroComponent } from "@/components/Hero/Hero";
import { getPrismicLinkUrl, getPrismicObjId } from "@/utility/prismic";
import { createClient } from "@/prismicio";
import { Simplify } from "../../../prismicio-types";
import { BRAND_COLOR } from "@/constants";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = async ({ slice }: HeroProps): Promise<JSX.Element> => {
  const { background_image, buttons, heading, subtext } = slice.primary;
  const client = createClient();
  const response = await client.getByType("brand_color");
  const buttonPrimary = convertButton(buttons[0], response);
  const buttonSecondary = buttons[1]
    ? convertButton(buttons[1], response)
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

function convertButton(
  button: Simplify<Content.HeroSliceDefaultPrimaryButtonsItem> | undefined,
  brandColorsResponse: Query<Content.BrandColorDocument<string>>
) {
  if (!button) {
    return {
      href: "",
      label: "Link",
      mainColor: BRAND_COLOR,
    };
  }

  const mainColorMatch = brandColorsResponse.results.find(
    (color) => color.id === getPrismicObjId(button.primary_color)
  );
  const secondaryColorMatch = brandColorsResponse.results.find(
    (color) => color.id === getPrismicObjId(button.secondary_color)
  );

  return {
    href: getPrismicLinkUrl(button.link),
    label: button.link.text || "Link",
    mainColor: mainColorMatch ? `${mainColorMatch.data.color}` : "",
    secondaryColor: secondaryColorMatch
      ? `${secondaryColorMatch.data.color}`
      : "",
  };
}
