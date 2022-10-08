import * as React from "react";

function SvgSn(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      {...props}
    >
      <path fill="#00853f" d="M0 0h900v600H0z" />
      <path fill="#fdef42" d="M300 0h600v600H300z" />
      <path fill="#e31b23" d="M600 0h300v600H600z" />
      <g transform="translate(450 300)" fill="#00853f">
        <g id="SN_svg__b">
          <path id="SN_svg__a" d="M0-100V0h50z" transform="rotate(18 0 -100)" />
          <use xlinkHref="#SN_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#SN_svg__b" transform="rotate(72)" />
        <use xlinkHref="#SN_svg__b" transform="rotate(144)" />
        <use xlinkHref="#SN_svg__b" transform="rotate(216)" />
        <use xlinkHref="#SN_svg__b" transform="rotate(288)" />
      </g>
    </svg>
  );
}

export default SvgSn;
