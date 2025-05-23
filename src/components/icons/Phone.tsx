import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Phone({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.82716 0.766614C3.94033 -0.346558 5.77724 -0.232196 6.74375 1.01045L9.4343 4.46974C9.92805 5.10456 10.1025 5.93113 9.90747 6.71134L9.08657 9.99494C8.99991 10.3416 9.10148 10.7083 9.35415 10.961L13.039 14.6459C13.2917 14.8985 13.6584 15.0001 14.0051 14.9134L17.2887 14.0925C18.0689 13.8975 18.8954 14.072 19.5303 14.5657L22.9895 17.2563C24.2322 18.2228 24.3466 20.0597 23.2334 21.1728L21.6825 22.7237C20.5729 23.8333 18.9133 24.3205 17.3666 23.7767C13.5263 22.4266 9.92158 20.2161 6.85273 17.1473C3.78389 14.0784 1.57342 10.4737 0.223257 6.63337C-0.320524 5.08669 0.166695 3.42708 1.27627 2.3175L2.82716 0.766614Z"
        fill="currentcolor"
      />
    </svg>
  );
}
