import styles from "@/styles/global/FlexibleImage.module.css";
//Eventually this should take the place of both CoveredImage and ContainedImage.

type Props = {
  src?: string | null;
  alt?: string | null;
  containerClassName?: string;
  behavior?: "cover" | "contain" | "full-size";
};
export function FlexibleImage({
  src,
  alt,
  containerClassName,
  behavior,
}: Props) {
  return (
    <div
      className={`${styles["main"]} ${containerClassName || ""} ${behavior ? styles[behavior] : ""}`}
    >
      <img src={src || ""} alt={alt || "image"} />
    </div>
  );
}
