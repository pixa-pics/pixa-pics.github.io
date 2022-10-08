import * as React from "react";

function SvgKr(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="-36 -24 72 48"
      {...props}
    >
      <path fill="#fff" d="M-36-24h72v48h-72z" />
      <g transform="rotate(-56.31)">
        <g id="KR_svg__b">
          <path
            id="KR_svg__a"
            d="M-6-25H6m-12 3H6m-12 3H6"
            stroke="#000"
            strokeWidth={2}
          />
          <use xlinkHref="#KR_svg__a" y={44} />
        </g>
        <path stroke="#fff" d="M0 17v10" />
        <circle fill="#cd2e3a" r={12} />
        <path
          fill="#0047a0"
          d="M0-12A6 6 0 000 0a6 6 0 010 12 12 12 0 010-24z"
        />
      </g>
      <g transform="rotate(-123.69)">
        <use xlinkHref="#KR_svg__b" />
        <path stroke="#fff" d="M0-23.5v3M0 17v3.5m0 3v3" />
      </g>
    </svg>
  );
}

export default SvgKr;
