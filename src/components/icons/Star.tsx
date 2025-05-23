import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function Star({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      className={className}
      style={style}
      viewBox="0 0 76.590065 72.841484"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs id="defs1" />
      <g id="layer1" transform="translate(110.62714,-28.04787)">
        <path
          style={{ fill: "currentcolor", stroke: "000000", strokeWidth: 0 }}
          id="path1"
          d="m -72.332106,28.047871 10.26785,26.133297 28.027183,1.689674 -21.681302,17.840939 7.053899,27.177569 -23.667632,-15.106986 -23.667633,15.106986 7.053901,-27.17757 -21.6813,-17.84094 28.027182,-1.689673 z"
        />
      </g>
    </svg>
  );
}
