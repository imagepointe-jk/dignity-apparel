import { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};
export function StarHalf({ size, className, style }: Props) {
  return (
    <svg
      height={size}
      className={className}
      style={style}
      viewBox="0 0 85.952888 81.745918"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs id="defs1" />
      <g id="layer1" transform="translate(195.31211,-23.125203)">
        <path
          id="path2"
          style={{ fill: "currentcolor", stroke: "000000", strokeWidth: 0 }}
          d="m -72.332231,23.125203 -11.523328,29.327926 -31.452861,1.896525 24.331849,20.021517 -7.915796,30.499949 26.560136,-16.952972 26.560652,16.952972 -7.915795,-30.499949 24.331848,-20.021517 -31.452861,-1.896525 z m 0.167948,10.275342 8.843905,22.50767 24.601599,1.484147 -19.031397,15.660543 6.193421,23.855392 -20.775476,-13.261723 -0.17415,0.111104 z"
          transform="translate(-80.00369)"
        />
      </g>
    </svg>
  );
}
