import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function YouTube({ size, className, style }: Props) {
  return (
    <svg
      height={size ? `${size}px` : "24px"}
      className={className}
      style={style}
      viewBox="0 0 42 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.1336 4.69062C40.6413 2.85429 39.2236 1.39721 37.4121 0.898204C34.1435 0 21.0098 0 21.0098 0C21.0098 0 7.87623 0 4.60759 0.898204C2.79606 1.39721 1.37834 2.83433 0.886076 4.69062C0 8.02395 0 15.01 0 15.01C0 15.01 0 21.976 0.886076 25.3293C1.37834 27.1657 2.79606 28.6228 4.60759 29.1218C7.87623 30.02 21.0098 30.02 21.0098 30.02C21.0098 30.02 34.1435 30.02 37.4121 29.1218C39.2236 28.6228 40.6413 27.1856 41.1336 25.3293C42.0197 21.996 42.0197 15.01 42.0197 15.01C42.0197 15.01 42.0197 8.04391 41.1336 4.69062ZM16.6976 21.3373V8.68263L27.685 15.01L16.6976 21.3373Z"
        fill="currentcolor"
      />
    </svg>
  );
}
