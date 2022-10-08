import * as React from "react";

function SvgBf(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      {...props}
    >
      <path fill="#009e49" d="M0 0h900v600H0z" />
      <path fill="#ef2b2d" d="M0 0h900v300H0z" />
      <g transform="translate(450 300)" fill="#fcd116">
        <g id="BF_svg__b">
          <path id="BF_svg__a" d="M0-100V0h50" transform="rotate(18 0 -100)" />
          <use xlinkHref="#BF_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#BF_svg__b" transform="rotate(72)" />
        <use xlinkHref="#BF_svg__b" transform="rotate(144)" />
        <use xlinkHref="#BF_svg__b" transform="rotate(216)" />
        <use xlinkHref="#BF_svg__b" transform="rotate(288)" />
      </g>
    </svg>
  );
}

export default SvgBf;
