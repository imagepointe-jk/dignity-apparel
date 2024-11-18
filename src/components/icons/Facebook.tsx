import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Facebook({ size, className, style }: Props) {
  return (
    <svg
      height={size ? `${size}px` : "24px"}
      className={className}
      style={style}
      viewBox="0 0 20 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.52792 42H13.2589V20.8129H19.3503L20 13.7243H13.2589V9.68776C13.2589 8.01406 13.6041 7.36428 15.269 7.36428H19.9797V0H13.9492C7.47208 0 4.52792 2.77637 4.52792 8.07314V13.7243H0V20.9114H4.52792V42Z"
        fill="currentcolor"
      />
    </svg>
  );
}
