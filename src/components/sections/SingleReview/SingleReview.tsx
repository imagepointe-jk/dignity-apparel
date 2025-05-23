import { WithTilingBackground } from "@/types/schema/misc";
import { ReactNode } from "react";
import styles from "@/styles/sections/SingleReview.module.css";
import { StarRating } from "@/components/global/StarRating/StarRating";
import { bgImage } from "@/utility/misc";
import { QuotationMark } from "@/components/icons/QuotationMark";

type Props = {
  id?: string | null;
  heading: ReactNode;
  rating: number;
  body: ReactNode;
  reviewerName: string;
  companyName?: string;
  textColor?: string;
} & WithTilingBackground;
export function SingleReview({
  id,
  heading,
  rating,
  body,
  reviewerName,
  companyName,
  tilingBackground,
  textColor,
  ...rest
}: Props) {
  return (
    <section
      id={id ? id : undefined}
      style={{ ...bgImage(tilingBackground?.src) }}
      {...rest}
    >
      <div
        className={`${styles["main"]} x-wide-container`}
        style={{ color: textColor }}
      >
        {heading}
        <div className={styles["review-container"]}>
          <StarRating
            stars={rating}
            containerClassName={styles["stars-container"]}
          />
          <div className={`${styles["body-text-container"]} metropolis-24`}>
            {body}
            <QuotationMark
              size={80}
              className={`${styles["quote-mark"]} ${styles["quote-mark-left"]}`}
            />
            <QuotationMark
              size={80}
              className={`${styles["quote-mark"]} ${styles["quote-mark-right"]}`}
            />
          </div>
        </div>
        <div className={styles["names-container"]}>
          <div className="metropolis-19 bold">{reviewerName}</div>
          {companyName && (
            <div className={`${styles["company-name"]} metropolis-19`}>
              {companyName}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
