import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function CheckMark({ size, className, style }: Props) {
  return (
    <svg
      height={size ? `${size}px` : "24px"}
      className={className}
      style={style}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.62706 15.4903L1.93746 9.58203L0 11.5798L7.62706 19.5L24 2.49776L22.0762 0.5L7.62706 15.4903Z"
        fill="currentcolor"
      />
    </svg>
  );
}
