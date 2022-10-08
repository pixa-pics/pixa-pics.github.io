import * as React from "react";

function SvgGw(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1200}
      height={600}
      viewBox="-2 -3 12 6"
      {...props}
    >
      <path fill="#fcd116" d="M-2-3h12v6H-2z" />
      <path fill="#009e49" d="M-2 0h12v3H-2z" />
      <path fill="#ce1126" d="M-2-3h4v6h-4z" />
      <g id="GW_svg__b">
        <path
          id="GW_svg__a"
          d="M0-1v1h.5"
          transform="rotate(18 0 -1)"
          fill="#000"
        />
        <use xlinkHref="#GW_svg__a" transform="scale(-1 1)" />
      </g>
      <use xlinkHref="#GW_svg__b" transform="rotate(72)" />
      <use xlinkHref="#GW_svg__b" transform="rotate(144)" />
      <use xlinkHref="#GW_svg__b" transform="rotate(216)" />
      <use xlinkHref="#GW_svg__b" transform="rotate(288)" />
    </svg>
  );
}

export default SvgGw;
