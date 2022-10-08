import * as React from "react";

function SvgCl(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1500}
      height={1000}
      viewBox="-4 -4 24 16"
      {...props}
    >
      <path d="M20 12H-4V-4h24z" fill="#d52b1e" />
      <path d="M4 4h16v-8H-4z" fill="#fff" />
      <path d="M4 4h-8v-8h8z" fill="#0039a6" />
      <g id="CL_svg__c">
        <g id="CL_svg__b">
          <path
            d="M0-2v2h1z"
            fill="#fff"
            transform="rotate(18 0 -2)"
            id="CL_svg__a"
          />
          <use xlinkHref="#CL_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#CL_svg__b" transform="rotate(72)" />
      </g>
      <use xlinkHref="#CL_svg__b" transform="rotate(-72)" />
      <use xlinkHref="#CL_svg__c" transform="rotate(144)" />
    </svg>
  );
}

export default SvgCl;
