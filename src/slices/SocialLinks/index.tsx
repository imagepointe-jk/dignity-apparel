import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { SocialLinks as SocialLinksComponent } from "@/components/sections/SocialLinks/SocialLinks";
import { getPrismicLinkUrl } from "@/utility/prismic";

/**
 * Props for `SocialLinks`.
 */
export type SocialLinksProps = SliceComponentProps<Content.SocialLinksSlice>;

/**
 * Component for "SocialLinks" Slices.
 */
const SocialLinks = ({ slice }: SocialLinksProps): JSX.Element => {
  const { slice_id, content_color, social_links, tiling_background } =
    slice.primary;

  return (
    <SocialLinksComponent
      id={slice_id}
      contentColor={content_color === "Normal" ? "normal" : "white"}
      linkUrls={social_links.map((link) => getPrismicLinkUrl(link.link))}
      tilingBackground={{ src: tiling_background.url }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default SocialLinks;
