import * as React from "react";

function SvgTl(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={450}
      viewBox="-3 -6 24 12"
      {...props}
    >
      <path d="M21 6V-6H-3V6z" fill="#dc241f" />
      <path d="M-3-6V6L9 0z" fill="#ffc726" />
      <path d="M-3-6V6l8-6z" />
      <g transform="rotate(-26.565)">
        <g id="TL_svg__c">
          <g id="TL_svg__b">
            <path
              d="M0-2.1V0h1z"
              fill="#fff"
              transform="rotate(18 0 -2.1)"
              id="TL_svg__a"
            />
            <use xlinkHref="#TL_svg__a" transform="scale(-1 1)" />
          </g>
          <use xlinkHref="#TL_svg__b" transform="rotate(72)" />
        </g>
        <use xlinkHref="#TL_svg__b" transform="rotate(-72)" />
        <use xlinkHref="#TL_svg__c" transform="rotate(144)" />
      </g>
    </svg>
  );
}

export default SvgTl;
