import * as React from "react";

function SvgTg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={809}
      height={500}
      {...props}
    >
      <path fill="#006a4e" d="M0 0h809v500H0z" />
      <path fill="#ffce00" d="M0 100h809v100H0zm0 200h809v100H0z" />
      <path fill="#d21034" d="M0 0h300v300H0z" />
      <g transform="translate(150 150)" fill="#fff">
        <g id="TG_svg__b">
          <path id="TG_svg__a" d="M0-95V0h50" transform="rotate(18 0 -95)" />
          <use xlinkHref="#TG_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#TG_svg__b" transform="rotate(72)" />
        <use xlinkHref="#TG_svg__b" transform="rotate(144)" />
        <use xlinkHref="#TG_svg__b" transform="rotate(216)" />
        <use xlinkHref="#TG_svg__b" transform="rotate(288)" />
      </g>
    </svg>
  );
}

export default SvgTg;
