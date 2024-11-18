import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Knitted({ size, className, style }: Props) {
  return (
    <svg
      height={size ? `${size}px` : "24px"}
      className={className}
      style={style}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.6052 25.0001L49.4929 21.1123C50.1747 20.4305 50.1747 19.3262 49.4929 18.6444L47.0363 16.1878C46.3546 15.506 45.2502 15.506 44.5684 16.1878L40.6807 20.0756L37.7677 17.1626L41.6554 13.2748C42.3372 12.593 42.3372 11.4887 41.6554 10.8069L39.1988 8.35029C38.5171 7.66853 37.4127 7.66853 36.7309 8.35029L32.8432 12.2381L29.9302 9.32505L33.8179 5.43729C34.4997 4.75552 34.4997 3.65117 33.8179 2.9694L31.3613 0.51279C30.6796 -0.168977 29.5752 -0.168977 28.8934 0.51279L25.0057 4.40055L21.1179 0.51279C20.4361 -0.168977 19.3318 -0.168977 18.65 0.51279L16.1934 2.9694C15.5116 3.65117 15.5116 4.75552 16.1934 5.43729L20.0812 9.32505L17.1682 12.2381L13.2804 8.35029C12.5986 7.66853 11.4943 7.66853 10.8125 8.35029L8.35591 10.8069C7.67414 11.4887 7.67414 12.593 8.35591 13.2748L12.2437 17.1626L9.33067 20.0756L5.4429 16.1878C4.76114 15.506 3.65679 15.506 2.97502 16.1878L0.518405 18.6444C-0.163362 19.3262 -0.163362 20.4305 0.518405 21.1123L4.40617 25.0001L0.518405 28.8878C-0.163362 29.5696 -0.163362 30.6739 0.518405 31.3557L2.97502 33.8123C3.31309 34.1504 3.76384 34.3251 4.20896 34.3251C4.65408 34.3251 5.10484 34.156 5.4429 33.8123L9.33067 29.9246L12.2437 32.8376L8.35591 36.7253C7.67414 37.4071 7.67414 38.5114 8.35591 39.1932L10.8125 41.6498C11.1506 41.9879 11.6013 42.1626 12.0465 42.1626C12.4916 42.1626 12.9423 41.9935 13.2804 41.6498L17.1682 37.7621L20.0812 40.6751L16.1934 44.5628C15.5116 45.2446 15.5116 46.3489 16.1934 47.0307L18.65 49.4873C18.9881 49.8254 19.4388 50.0001 19.884 50.0001C20.3291 50.0001 20.7798 49.831 21.1179 49.4873L25.0057 45.5996L28.8934 49.4873C29.2315 49.8254 29.6823 50.0001 30.1274 50.0001C30.5725 50.0001 31.0233 49.831 31.3613 49.4873L33.8179 47.0307C34.4997 46.3489 34.4997 45.2446 33.8179 44.5628L29.9302 40.6751L32.8432 37.7621L36.7309 41.6498C37.069 41.9879 37.5198 42.1626 37.9649 42.1626C38.41 42.1626 38.8608 41.9935 39.1988 41.6498L41.6554 39.1932C42.3372 38.5114 42.3372 37.4071 41.6554 36.7253L37.7677 32.8376L40.6807 29.9246L44.5684 33.8123C44.9065 34.1504 45.3573 34.3251 45.8024 34.3251C46.2475 34.3251 46.6983 34.156 47.0363 33.8123L49.4929 31.3557C50.1747 30.6739 50.1747 29.5696 49.4929 28.8878L45.6052 25.0001ZM45.8024 17.4217L48.259 19.884L44.3712 23.7717L41.909 21.3095L45.8024 17.4217ZM37.9649 9.5786L40.4215 12.0408L28.6962 23.7661L26.234 21.3039L37.9649 9.5786ZM32.8375 27.9131L29.9245 25.0001L32.8375 22.0871L35.7505 25.0001L32.8375 27.9131ZM29.147 31.6093L18.3965 20.8587L20.8587 18.3965L31.6092 29.147L29.147 31.6093ZM22.087 32.8376L25 29.9246L27.913 32.8376L25 35.7506L22.087 32.8376ZM17.1625 27.9131L14.2495 25.0001L17.1625 22.0871L20.0755 25.0001L17.1625 27.9131ZM27.913 17.1626L25 20.0756L22.087 17.1626L25 14.2495L27.913 17.1626ZM30.1217 1.7411L32.5784 4.20335L28.6906 8.09111L26.2283 5.62886L30.1217 1.7411ZM19.884 1.7411L31.6092 13.4664L29.147 15.9286L17.4217 4.19771L19.884 1.7411ZM9.57858 12.0352L12.0408 9.5786L15.9286 13.4664L13.4663 15.9286L9.57858 12.0352ZM21.3095 10.5534L23.7717 13.0156L13.0212 23.7661L10.559 21.3039L21.3095 10.5534ZM4.19769 32.5784L1.74108 30.1161L5.62884 26.2284L8.09109 28.6906L4.19769 32.5784ZM1.74108 19.8784L4.20333 17.4217L15.9286 29.147L13.4663 31.6093L1.74108 19.8784ZM12.0352 40.4215L9.57858 37.9593L21.3038 26.234L23.7661 28.6962L12.0352 40.4215ZM19.8783 48.259L17.4217 45.7968L21.3095 41.909L23.7717 44.3713L19.8783 48.259ZM30.1217 48.259L18.3965 36.5337L20.8587 34.0715L32.584 45.8024L30.1217 48.259ZM40.4215 37.9649L37.9592 40.4215L34.0715 36.5337L36.5337 34.0715L40.4215 37.9649ZM28.6906 39.4468L26.2283 36.9845L36.9789 26.234L39.4411 28.6962L28.6906 39.4468ZM45.7967 32.5784L34.0715 20.8531L36.5337 18.3909L48.259 30.1218L45.7967 32.5784Z"
        fill="currentcolor"
      />
    </svg>
  );
}
