import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function QuotationMark({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      style={style}
      className={className}
      viewBox="0 0 111 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6245 80L0.69869 70.2183C10.131 59.3887 16.0699 48.559 18.8646 37.7293C8.38428 37.7293 0 28.9956 0 18.5153C0 8.73362 8.03494 0 19.214 0C32.4891 0 40.524 11.8777 40.524 27.9476C40.524 41.9214 34.5852 53.7991 13.6245 80ZM83.4935 80L70.5677 70.2183C80 59.3887 85.9389 48.559 88.7336 37.7293C78.2533 37.7293 69.869 28.9956 69.869 18.5153C69.869 8.73362 77.9039 0 89.083 0C102.358 0 110.393 11.8777 110.393 27.9476C110.393 41.9214 104.454 53.7991 83.4935 80Z"
        fill="currentcolor"
      />
    </svg>
  );
}
