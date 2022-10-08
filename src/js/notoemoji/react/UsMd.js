import * as React from "react";

function SvgUsMd(props) {
  return (
    <svg
      viewBox="0 0 360 240"
      width={750}
      height={500}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path
          id="US-MD_svg__a"
          transform="scale(.24)"
          d="M0 215a32 32 0 0032-32v-16h31a32 32 0 000-64H32V32h199v31a32 32 0 0064 0V32h28a32 32 0 0032-32H0z"
        />
      </defs>
      <g id="US-MD_svg__c">
        <path d="M0 0h180v120H0z" />
        <path
          fill="#EAAB00"
          d="M0 120V20l30 20v80h30V0h30v120h30V0h30v120h30v-20L30 0v40l120 80z"
        />
      </g>
      <g id="US-MD_svg__b">
        <path fill="#fff" d="M180 0h180v120H180z" />
        <path fill="#981E32" d="M270 0h90v60H180v60h90z" />
        <g transform="translate(270 60)">
          <use fill="#981E32" xlinkHref="#US-MD_svg__a" />
          <use fill="#fff" transform="scale(-1 1)" xlinkHref="#US-MD_svg__a" />
          <use fill="#fff" transform="scale(1 -1)" xlinkHref="#US-MD_svg__a" />
          <use fill="#981E32" transform="scale(-1)" xlinkHref="#US-MD_svg__a" />
        </g>
      </g>
      <use x={-180} y={120} xlinkHref="#US-MD_svg__b" />
      <use x={180} y={120} xlinkHref="#US-MD_svg__c" />
    </svg>
  );
}

export default SvgUsMd;
