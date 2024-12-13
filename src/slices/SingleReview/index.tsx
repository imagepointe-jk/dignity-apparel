import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { SingleReview as SingleReviewComponent } from "@/components/sections/SingleReview/SingleReview";
import { getBrandColor } from "@/utility/prismic";

/**
 * Props for `SingleReview`.
 */
export type SingleReviewProps = SliceComponentProps<Content.SingleReviewSlice>;

/**
 * Component for "SingleReview" Slices.
 */
const SingleReview = async ({
  slice,
}: SingleReviewProps): Promise<JSX.Element> => {
  const {
    body,
    company_name,
    heading,
    rating,
    reviewer_name,
    tiling_background,
    primary_text_color,
  } = slice.primary;
  const textColor = await getBrandColor(primary_text_color);

  return (
    <SingleReviewComponent
      heading={<PrismicRichText field={heading} />}
      rating={rating || 0}
      body={<PrismicRichText field={body} />}
      reviewerName={reviewer_name || "Dignity Apparel Customer"}
      companyName={company_name || undefined}
      tilingBackground={{ src: tiling_background.url }}
      textColor={textColor}
    />
  );
};

export default SingleReview;
