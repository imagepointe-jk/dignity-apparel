import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { CarouselReviews as CarouselReviewsComponent } from "@/components/sections/CarouselReviews/CarouselReviews";
import { getPrismicLinkUrl } from "@/utility/prismic";

/**
 * Props for `CarouselReviews`.
 */
export type CarouselReviewsProps =
  SliceComponentProps<Content.CarouselReviewsSlice>;

/**
 * Component for "CarouselReviews" Slices.
 */
const CarouselReviews = ({ slice }: CarouselReviewsProps): JSX.Element => {
  const { slice_id, heading, reviews } = slice.primary;
  //prismic doesn't provide a uid per repeatable group item.
  //assume that there won't be two reviews from the same person, and use the index as a fallback.
  const reviewsWithId = reviews.map((review, i) => ({
    ...review,
    id: review.reviewer_name || i,
  }));

  return (
    <CarouselReviewsComponent
      id={slice_id}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      heading={<PrismicRichText field={heading} />}
      reviews={reviewsWithId.map((item) => {
        const link = getPrismicLinkUrl(item.read_more_link);

        return {
          id: item.id,
          rating: item.rating ? +item.rating : 0,
          body: <PrismicRichText field={item.body} />,
          link: link
            ? {
                label: item.read_more_link.text || "Read More",
                href: link,
              }
            : undefined,
          fullName: item.reviewer_name || undefined,
          companyName: item.company_name || undefined,
        };
      })}
    />
  );
};

export default CarouselReviews;
