import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Arrow3({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      className={className}
      style={style}
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.749999 8.5C0.749999 9.10406 1.23969 9.59375 1.84375 9.59375L14.5157 9.59375L9.82035 14.2891C9.39321 14.7162 9.39321 15.4088 9.82035 15.8359C10.2475 16.263 10.94 16.263 11.3671 15.8359L17.9296 9.2734C18.3568 8.84627 18.3568 8.15374 17.9296 7.7266L11.3671 1.1641C10.94 0.736967 10.2475 0.736967 9.82035 1.1641C9.39321 1.59124 9.39321 2.28376 9.82035 2.7109L14.5157 7.40625L1.84375 7.40625C1.23969 7.40625 0.749999 7.89594 0.749999 8.5Z"
        fill="currentcolor"
      />
    </svg>
  );
}
