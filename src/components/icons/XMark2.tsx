import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function XMark2({ className, size, style }: Props) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size ? `${size}px` : "24px"}
      className={className}
      style={style}
    >
      <path
        d="M9.07069 9.47528C8.63165 9.90818 7.9202 9.90818 7.4821 9.47528L5.00044 6.67849L2.51879 9.47435C2.07975 9.90725 1.3683 9.90725 0.930192 9.47435C0.491152 9.04145 0.491152 8.33994 0.930192 7.90797L3.51201 5.00041L0.929256 2.09101C0.490215 1.65811 0.490215 0.95753 0.929256 0.524628C1.3683 0.0917256 2.07881 0.0917256 2.51785 0.524628L5.00044 3.32234L7.4821 0.524628C7.92114 0.0917256 8.63165 0.0917256 9.07069 0.524628C9.50974 0.95753 9.50974 1.65903 9.07069 2.09101L6.48887 5.00041L9.07069 7.90797C9.50974 8.34087 9.50974 9.04237 9.07069 9.47528Z"
        fill="currentcolor"
      />
    </svg>
  );
}
