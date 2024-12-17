import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Dyeing({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      className={className}
      style={style}
      viewBox="0 0 70 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.2221 0.44165C15.6023 0.44165 -0.179505 17.3708 0.688992 37.9399C1.45823 56.2168 15.9084 71.2831 33.5182 72.1673C53.3861 73.1631 69.7965 56.7233 69.7965 36.3259C69.7965 15.9286 54.3125 0.44165 35.2221 0.44165ZM36.7523 69.3601C18.489 70.2529 3.35238 55.0922 3.35238 36.3259C3.35238 17.5597 17.6536 3.24028 35.2221 3.24028C52.7905 3.24028 67.9107 18.9418 67.0587 37.897C66.306 54.7231 52.9642 68.5703 36.7523 69.3601ZM53.5929 12.8638L49.9204 16.6754L46.2479 12.8638L42.5754 16.6754L38.9029 12.8638L35.2304 16.6754L31.5579 12.8638L27.8853 16.6754L24.2129 12.8638L20.5404 16.6754L16.8678 12.8638L11.4584 18.4782L14.3285 21.4571L11.4584 24.4361L14.3285 27.4064L11.4584 30.3853L14.3285 33.3642L11.4584 36.3345L14.3285 39.3134L11.4584 42.2838L14.3285 45.2541L11.4584 48.233L14.3285 51.2033L11.4584 54.1822L16.8678 59.7967L20.5404 55.985L24.2129 59.7967L27.8853 55.985L31.5579 59.7967L35.2304 55.985L38.9029 59.7967L42.5754 55.985L46.2479 59.7967L49.9204 55.985L53.5929 59.7967L58.9941 54.1822L56.1322 51.2033L58.9941 48.233L56.1322 45.2541L58.9941 42.2838L56.1322 39.3134L58.9941 36.3345L56.1322 33.3642L58.9941 30.3853L56.1322 27.415L58.9941 24.4446L56.1322 21.4657L58.9941 18.4868L53.5929 12.8724V12.8638ZM56.7029 24.4275L53.841 27.3978L56.7029 30.3767L53.841 33.3556L56.7029 36.3259L53.841 39.3049L56.7029 42.2752L53.841 45.2455L56.7029 48.2244L53.841 51.1947L56.7029 54.1737L53.5929 57.4101L49.9204 53.5985L46.2479 57.4101L42.5754 53.5985L38.9029 57.4101L35.2304 53.5985L31.5579 57.4101L27.8853 53.5985L24.2129 57.4101L20.5404 53.5985L16.8678 57.4101L13.7495 54.1737L16.6197 51.1947L13.7495 48.2244L16.6197 45.2455L13.7495 42.2752L16.6197 39.3049L13.7495 36.3259L16.6197 33.3556L13.7495 30.3767L16.6197 27.3978L13.7495 24.4275L16.6197 21.4486L13.7495 18.4696L16.8678 15.2332L20.5404 19.0448L24.2129 15.2332L27.8853 19.0448L31.5579 15.2332L35.2304 19.0448L38.9029 15.2332L42.5754 19.0448L46.2479 15.2332L49.9204 19.0448L53.5929 15.2332L56.7029 18.4696L53.841 21.4486L56.7029 24.4275ZM35.2221 20.2982L26.4296 35.8194C24.5437 39.1503 24.4362 43.2109 26.1566 46.6792C27.8026 49.9929 30.7473 52.079 34.2461 52.4052C34.5686 52.431 34.8995 52.4481 35.2304 52.4481H35.3544C35.6853 52.4481 36.0161 52.431 36.3305 52.4052C39.7714 52.0876 42.7904 49.95 44.4033 46.6877C46.1155 43.2195 45.9997 39.1675 44.1056 35.8452L35.2221 20.2896V20.2982ZM42.9558 45.9237C41.5745 48.7138 39.1096 50.465 36.1816 50.7398C35.9086 50.7655 35.6274 50.7827 35.3462 50.7827H35.2221C34.9409 50.7827 34.6596 50.7655 34.3784 50.7398C31.4503 50.465 28.9689 48.7138 27.5876 45.9151C26.1235 42.962 26.2063 39.5109 27.8192 36.6693L35.2221 23.6033L42.6994 36.7037C44.3124 39.5281 44.4033 42.9705 42.9476 45.9151L42.9558 45.9237Z"
        fill="currentcolor"
      />
    </svg>
  );
}
