"use client";

import { ReactNode } from "react";
import styles from "@/styles/sections/CarouselReviews.module.css";
import { StarRating } from "@/components/global/StarRating/StarRating";
import Link from "next/link";
import { CardSlider } from "@/components/global/CardSlider/CardSlider";

type Props = {
  heading: ReactNode;
  reviews: {
    id: string | number;
    rating: number;
    body: ReactNode;
    link?: {
      label: string;
      href: string;
    };
    fullName?: string;
    companyName?: string;
  }[];
};
export function CarouselReviews({ heading, reviews, ...rest }: Props) {
  return (
    <section {...rest}>
      <div className={`${styles["main"]} x-wide-container`}>
        {heading}
        <CardSlider
          cardContainerClassName={styles["card-container"]}
          dataset={reviews}
          createCard={(review) => (
            <div className={styles["card"]}>
              <StarRating
                stars={review.rating}
                containerClassName={styles["stars"]}
              />
              <div className="body-1">
                <div className={styles["body-container"]}>{review.body}</div>

                {review.link && (
                  <Link
                    href={review.link.href}
                    className={styles["read-more-link"]}
                  >
                    {review.link.label || "Read More"}
                  </Link>
                )}
              </div>
              {(review.companyName || review.fullName) && (
                <div>
                  {review.fullName && (
                    <div className="body-1-semi-bold">{review.fullName}</div>
                  )}
                  {review.companyName && (
                    <div className={`${styles["company-name"]} body-3`}>
                      {review.companyName}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        />
      </div>
    </section>
  );
}
