import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function FlagDA({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      viewBox="0 0 61 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      <path
        d="M60.6089 24.2278H0V21.538H60.6089V24.2278ZM0 32.3102V35H60.6667V32.3102H0ZM23.6183 18.8417H0V0H23.6119H60.6346V2.68981H24.9536V5.37963H60.6346V8.06944H24.9536V10.7593H60.6346V13.4491H24.9536V16.1389H60.6346V18.8287H23.6119L23.6183 18.8417ZM14.9965 16.1519L11.0035 10.9991L7.00395 16.1583H14.9965V16.1519ZM20.5432 9.37222C20.5432 7.51204 19.9012 5.81389 18.8612 4.58241C17.8212 3.35093 16.396 2.59259 14.8232 2.59259H4.37185V13.8704L11.0099 5.31481L18.3156 14.7389C19.6765 13.4944 20.5496 11.55 20.5496 9.37222H20.5432ZM60.6089 26.9241H0V29.6139H60.6089V26.9241Z"
        fill="currentcolor"
      />
    </svg>
  );
}
