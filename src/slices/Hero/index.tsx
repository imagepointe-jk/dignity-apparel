import { Hero as HeroComponent } from "@/components/Hero/Hero";
import { convertButton } from "@/utility/prismic";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import type { JSX } from "react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = async ({ slice }: HeroProps): Promise<JSX.Element> => {
  const {
    slice_id,
    background_image,
    buttons,
    heading,
    subtext,
    body,
    background_video_url,
    layout,
    background_overlay_opacity,
    section_height,
  } = slice.primary;
  const buttonPrimary = buttons[0]
    ? await convertButton({
        button_style: buttons[0].button_style,
        link: buttons[0].link,
      })
    : undefined;
  const buttonSecondary = buttons[1]
    ? await convertButton({
        button_style: buttons[1].button_style,
        link: buttons[1].link,
      })
    : undefined;

  return (
    <HeroComponent
      id={slice_id}
      alignment={
        layout === "Left" ? "left" : layout === "Centered" ? "center" : "right"
      }
      heading={`${heading}`}
      buttonPrimary={buttonPrimary}
      buttonSecondary={buttonSecondary}
      subtextNode={<PrismicRichText field={subtext} />}
      body={<PrismicRichText field={body} />}
      bgImageUrl={background_image.url || ""}
      bgVideoUrl={background_video_url || undefined}
      overlayNormalized={
        background_overlay_opacity === "50%"
          ? 0.5
          : background_overlay_opacity === "95%"
            ? 0.95
            : 0
      }
      heightOverride={section_height || undefined}
    />
  );
};

export default Hero;
