import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Person({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      className={className}
      style={style}
      viewBox="0 0 26 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.6667 26V23.3333C23.6667 21.9188 23.1048 20.5623 22.1046 19.5621C21.1044 18.5619 19.7479 18 18.3334 18H7.66671C6.25222 18 4.89567 18.5619 3.89547 19.5621C2.89528 20.5623 2.33337 21.9188 2.33337 23.3333V26M18.3334 7.33333C18.3334 10.2789 15.9456 12.6667 13 12.6667C10.0545 12.6667 7.66671 10.2789 7.66671 7.33333C7.66671 4.38781 10.0545 2 13 2C15.9456 2 18.3334 4.38781 18.3334 7.33333Z"
        stroke="currentcolor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
