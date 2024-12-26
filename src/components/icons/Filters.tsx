import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Filters({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      className={className}
      style={style}
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9.75C6 9.33579 6.33579 9 6.75 9H11.25C11.6642 9 12 9.33579 12 9.75C12 10.1642 11.6642 10.5 11.25 10.5H6.75C6.33579 10.5 6 10.1642 6 9.75Z"
        fill="currentcolor"
      />
      <path
        d="M3 5.25C3 4.83579 3.33579 4.5 3.75 4.5H14.25C14.6642 4.5 15 4.83579 15 5.25C15 5.66421 14.6642 6 14.25 6H3.75C3.33579 6 3 5.66421 3 5.25Z"
        fill="currentcolor"
      />
      <path
        d="M0 0.75C0 0.335786 0.335786 0 0.75 0H17.25C17.6642 0 18 0.335786 18 0.75C18 1.16421 17.6642 1.5 17.25 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75Z"
        fill="currentcolor"
      />
    </svg>
  );
}
