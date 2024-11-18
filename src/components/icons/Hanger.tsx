import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Hanger({ size, className, style }: Props) {
  return (
    <svg
      height={size ? `${size}px` : "24px"}
      className={className}
      style={style}
      viewBox="0 0 59 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.3893 16.5145V15.8113C29.4851 13.6217 30.6199 11.6133 32.4471 10.404C34.7912 8.77388 35.3665 5.55618 33.7417 3.21749C32.1115 0.873469 28.8938 0.298119 26.5551 1.92295C25.1434 2.90318 24.3123 4.52268 24.339 6.23807M53.0798 37.1418H5.70402C3.10429 37.1418 1 35.0375 1 32.4378C1 30.6052 2.04948 28.9324 3.70628 28.1387L29.3946 16.5091L55.0296 28.1387C56.6864 28.9324 57.7359 30.6052 57.7359 32.4378C57.7359 35.0162 55.6636 37.1152 53.0851 37.1418H53.0798Z"
        stroke="currentcolor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
