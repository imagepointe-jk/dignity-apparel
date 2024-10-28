import styles from "@/styles/ContainedImage.module.css";
import { CSSProperties, ReactNode } from "react";

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
