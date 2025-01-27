import styles from "@/styles/global/FlexibleImage.module.css";
import { ReactNode } from "react";

type Props = {
  src?: string | null;
  alt?: string | null;
  containerClassName?: string;
  imageClassName?: string;
  behavior?: "cover" | "contain" | "full-size";
  children?: ReactNode;
};
export function FlexibleImage({
  src,
  alt,
  containerClassName,
  imageClassName,
  behavior,
  children,
}: Props) {
  return (
    <div
      className={`${styles["main"]} ${containerClassName || ""} ${behavior ? styles[behavior] : ""}`}
    >
      <img src={src || ""} alt={alt || "image"} className={imageClassName} />
      {children}
    </div>
  );
}
