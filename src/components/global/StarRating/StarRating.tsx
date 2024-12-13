import { Star } from "@/components/icons/Star";
import { StarEmpty } from "@/components/icons/StarEmpty";
import { StarHalf } from "@/components/icons/StarHalf";
import styles from "@/styles/global/StarRating.module.css";

//visual star rating. handles range 0-5 with 0.5 increments (0, 0.5, 1, etc.)
type Props = {
  stars: number;
  containerClassName?: string;
};
export function StarRating({ stars, containerClassName }: Props) {
  const starsArr = Array.from({ length: 5 }, (_, i) => {
    if (i < stars && i + 1 > stars) return "half";
    if (i + 1 > stars) return "empty";
    return "full";
  });

  return (
    <div
      className={`${styles["main"]} ${containerClassName || ""}`}
      aria-label={`${stars} out of 5 stars`}
    >
      {starsArr.map((item, i) =>
        item === "full" ? (
          <Star key={i} size={20} />
        ) : item === "half" ? (
          <StarHalf size={20} key={i} />
        ) : (
          <StarEmpty size={20} key={i} />
        )
      )}
    </div>
  );
}
