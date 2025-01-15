import { VideoSection } from "@/components/sections/VideoSection/VideoSection";
import { getBrandColor } from "@/utility/prismic";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

/**
 * Component for "Video" Slices.
 */
const Video = async ({ slice }: VideoProps): Promise<JSX.Element> => {
  const { slice_id } = slice.primary;
  const primaryColor = await getBrandColor(slice.primary.primary_text_color);
  const headingColor = await getBrandColor(slice.primary.heading_color);

  return (
    <VideoSection
      id={slice_id}
      headingNode={<PrismicRichText field={slice.primary.heading} />}
      headingColor={headingColor}
      bodyText={<PrismicRichText field={slice.primary.body_text} />}
      textColor={primaryColor}
      embedCode={slice.primary.video.html || ""}
      tilingBackground={{ src: slice.primary.tiling_background.url }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default Video;
