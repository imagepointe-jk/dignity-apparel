import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Arrow2({ size, className, style }: Props) {
  return (
    <svg
      height={size ? `${size}px` : "24px"}
      className={className}
      style={style}
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.3222 0.621868L11.9893 8.87092L3.65638 0.621868C2.81879 -0.207289 1.46577 -0.207289 0.628188 0.621868C-0.209396 1.45103 -0.209396 2.79043 0.628188 3.61959L10.4859 13.3781C11.3235 14.2073 12.6765 14.2073 13.5141 13.3781L23.3718 3.61959C24.2094 2.79043 24.2094 1.45103 23.3718 0.621868C22.5342 -0.186029 21.1597 -0.207289 20.3222 0.621868Z"
        fill="currentcolor"
      />
    </svg>
  );
}
