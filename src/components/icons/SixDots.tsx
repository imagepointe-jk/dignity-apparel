import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function SixDots({ className, size, style }: Props) {
  return (
    <svg
      height={size ? `${size}px` : "24px"}
      className={className}
      style={style}
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 21C6.5 22.65 5.15 24 3.5 24C1.85 24 0.5 22.65 0.5 21C0.5 19.35 1.85 18 3.5 18C5.15 18 6.5 19.35 6.5 21ZM3.5 9C1.85 9 0.5 10.35 0.5 12C0.5 13.65 1.85 15 3.5 15C5.15 15 6.5 13.65 6.5 12C6.5 10.35 5.15 9 3.5 9ZM3.5 0C1.85 0 0.5 1.35 0.5 3C0.5 4.65 1.85 6 3.5 6C5.15 6 6.5 4.65 6.5 3C6.5 1.35 5.15 0 3.5 0ZM12.5 6C14.15 6 15.5 4.65 15.5 3C15.5 1.35 14.15 0 12.5 0C10.85 0 9.5 1.35 9.5 3C9.5 4.65 10.85 6 12.5 6ZM12.5 9C10.85 9 9.5 10.35 9.5 12C9.5 13.65 10.85 15 12.5 15C14.15 15 15.5 13.65 15.5 12C15.5 10.35 14.15 9 12.5 9ZM12.5 18C10.85 18 9.5 19.35 9.5 21C9.5 22.65 10.85 24 12.5 24C14.15 24 15.5 22.65 15.5 21C15.5 19.35 14.15 18 12.5 18Z"
        fill="currentcolor"
      />
    </svg>
  );
}
