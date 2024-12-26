import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Envelope({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      className={className}
      style={style}
      viewBox="0 0 24 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.0743781 2.33316C0.377595 0.997255 1.57234 0 3 0H21C22.4277 0 23.6224 0.997255 23.9256 2.33316L12 9.62104L0.0743781 2.33316ZM0 4.04563V14.7009L8.70479 9.36522L0 4.04563ZM10.1421 10.2436L0.287807 16.2838C0.768906 17.2984 1.80252 18 3 18H21C22.1975 18 23.2311 17.2984 23.7122 16.2838L13.8579 10.2436L12 11.379L10.1421 10.2436ZM15.2952 9.36522L24 14.7009V4.04563L15.2952 9.36522Z"
        fill="currentcolor"
      />
    </svg>
  );
}
