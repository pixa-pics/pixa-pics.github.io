import * as React from "react";

function SvgTw(props) {
  return (
    <svg
      width={900}
      height={600}
      viewBox="-60 -40 240 160"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <rect x={-60} y={-40} width="100%" height="100%" fill="#fe0000" />
      <rect x={-60} y={-40} width="50%" height="50%" fill="#000095" />
      <path
        id="TW_svg__a"
        d="M8 0L0 30-8 0l8-30M0 8l30-8L0-8l-30 8"
        fill="#fff"
      />
      <use xlinkHref="#TW_svg__a" transform="rotate(30)" />
      <use xlinkHref="#TW_svg__a" transform="rotate(60)" />
      <circle r={17} fill="#000095" />
      <circle r={15} fill="#fff" />
    </svg>
  );
}

export default SvgTw;
