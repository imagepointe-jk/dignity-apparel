import styles from "@/styles/global/ContainedImage.module.css";
import { CSSProperties, ReactNode } from "react";

//wrapper for an image that stops any part of the image from overflowing.
type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  containerClassName?: string;
  containerStyle?: CSSProperties;
  children?: ReactNode;
};
export function ContainedImage({
  containerClassName,
  containerStyle,
  children,
  ...props
}: Props) {
  return (
    <div
      className={`${styles["main"]} ${containerClassName || ""}`}
      style={containerStyle}
    >
      <img {...props} />
      {children}
    </div>
  );
}
