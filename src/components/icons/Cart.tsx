import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Cart({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      className={className}
      style={style}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 1C0 0.447715 0.447715 0 1 0H4C4.45887 0 4.85885 0.312297 4.97014 0.757464L5.78078 4H29C29.2975 4 29.5795 4.13245 29.7695 4.36136C29.9595 4.59028 30.0377 4.8919 29.9829 5.18429L26.9829 21.1843C26.8942 21.6573 26.4812 22 26 22H24H10H8C7.51878 22 7.10581 21.6573 7.01713 21.1843L4.02262 5.2136L3.21922 2H1C0.447715 2 0 1.55228 0 1ZM6.20493 6L8.82993 20H25.1701L27.7951 6H6.20493ZM10 22C7.79086 22 6 23.7909 6 26C6 28.2091 7.79086 30 10 30C12.2091 30 14 28.2091 14 26C14 23.7909 12.2091 22 10 22ZM24 22C21.7909 22 20 23.7909 20 26C20 28.2091 21.7909 30 24 30C26.2091 30 28 28.2091 28 26C28 23.7909 26.2091 22 24 22ZM10 24C11.1046 24 12 24.8954 12 26C12 27.1046 11.1046 28 10 28C8.89543 28 8 27.1046 8 26C8 24.8954 8.89543 24 10 24ZM24 24C25.1046 24 26 24.8954 26 26C26 27.1046 25.1046 28 24 28C22.8954 28 22 27.1046 22 26C22 24.8954 22.8954 24 24 24Z"
        fill="currentcolor"
      />
    </svg>
  );
}
