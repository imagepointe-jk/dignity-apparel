import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Star({ size, className, style }: Props) {
  return (
    <svg
      height={size ? `${size}px` : "24px"}
      className={className}
      style={style}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17.6811L19.416 22L17.448 13.86L24 8.38316L15.372 7.67684L12 0L8.628 7.67684L0 8.38316L6.552 13.86L4.584 22L12 17.6811Z"
        fill="currentcolor"
      />
    </svg>
  );
}
