import * as React from "react";

function SvgMm(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1800}
      height={1200}
      viewBox="0 0 18 12"
      {...props}
    >
      <path fill="#FECB00" d="M0 0h18v6H0z" />
      <path fill="#EA2839" d="M0 6h18v6H0z" />
      <path fill="#34B233" d="M0 4h18v4H0z" />
      <g transform="translate(9 6.422) scale(4.422)">
        <path id="MM_svg__a" fill="#FFF" d="M-.325 0L0-1l.325 1z" />
        <use xlinkHref="#MM_svg__a" transform="rotate(-144)" />
        <use xlinkHref="#MM_svg__a" transform="rotate(-72)" />
        <use xlinkHref="#MM_svg__a" transform="rotate(72)" />
        <use xlinkHref="#MM_svg__a" transform="rotate(144)" />
      </g>
    </svg>
  );
}

export default SvgMm;
