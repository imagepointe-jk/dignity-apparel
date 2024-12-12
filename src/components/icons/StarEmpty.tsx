import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function StarEmpty({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      className={className}
      style={style}
      viewBox="0 0 85.952667 81.74585"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs id="defs1" />
      <g id="layer1" transform="translate(286.27521,-23.125659)">
        <path
          style={{
            fill: "none",
            stroke: "currentcolor",
            strokeWidth: 3.6,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
          id="path3"
          d="m -72.332106,28.047871 10.26785,26.133297 28.027183,1.689674 -21.681302,17.840939 7.053899,27.177569 -23.667632,-15.106986 -23.667633,15.106986 7.053901,-27.17757 -21.6813,-17.84094 28.027182,-1.689673 z"
          transform="translate(-170.96679)"
        />
      </g>
    </svg>
  );
}
