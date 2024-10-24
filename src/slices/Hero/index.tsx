import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      style={{
        backgroundImage: `url("${slice.primary.background_image.url}")`,
      }}
    >
      <h1>
        <PrismicRichText field={slice.primary.heading} />
      </h1>
      <p>
        <PrismicRichText field={slice.primary.body} />
      </p>
      <div>
        <PrismicNextLink field={slice.primary.button_link}>
          <>{slice.primary.button_link.text || "Link"}</>
        </PrismicNextLink>
      </div>
    </section>
  );
};

export default Hero;
