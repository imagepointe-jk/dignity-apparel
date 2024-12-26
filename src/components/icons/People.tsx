import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function People({ size, className, style }: Props) {
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
        d="M10.5 18C10.5 18 9 18 9 16.5C9 15 10.5 10.5 16.5 10.5C22.5 10.5 24 15 24 16.5C24 18 22.5 18 22.5 18H10.5Z"
        fill="currentcolor"
      />
      <path
        d="M16.5 9C18.9853 9 21 6.98528 21 4.5C21 2.01472 18.9853 0 16.5 0C14.0147 0 12 2.01472 12 4.5C12 6.98528 14.0147 9 16.5 9Z"
        fill="currentcolor"
      />
      <path
        d="M7.82454 18C7.61334 17.5739 7.5 17.0687 7.5 16.5C7.5 14.4668 8.51858 12.3758 10.4039 10.9199C9.57914 10.6561 8.61764 10.5 7.5 10.5C1.5 10.5 0 15 0 16.5C0 18 1.5 18 1.5 18H7.82454Z"
        fill="currentcolor"
      />
      <path
        d="M6.75 9C8.82107 9 10.5 7.32107 10.5 5.25C10.5 3.17893 8.82107 1.5 6.75 1.5C4.67893 1.5 3 3.17893 3 5.25C3 7.32107 4.67893 9 6.75 9Z"
        fill="currentcolor"
      />
    </svg>
  );
}
