import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Arrow({ size, className, style }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ? `${size}px` : "50px"}
      viewBox="200 -720 500 500"
      width={size ? `${size}px` : "50px"}
      fill="undefined"
      style={style}
      className={className}
    >
      <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
  );
}
