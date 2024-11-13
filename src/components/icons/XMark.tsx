import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function XMark({ size, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ? `${size}px` : "24px"}
      viewBox="0 -960 960 960"
      width={size ? `${size}px` : "24px"}
      className={className}
      fill="undefined"
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}
