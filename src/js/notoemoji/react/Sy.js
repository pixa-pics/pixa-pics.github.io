import * as React from "react";

function SvgSy(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="0 0 180 120"
      {...props}
    >
      <path d="M0 0h180v120H0z" />
      <path fill="#fff" d="M0 0h180v80H0z" />
      <path fill="#ce1126" d="M0 0h180v40H0z" />
      <g id="SY_svg__d" fill="#007a3d">
        <g id="SY_svg__c">
          <g id="SY_svg__b">
            <path d="M54 47v13h8" transform="rotate(18 54 47)" id="SY_svg__a" />
            <use xlinkHref="#SY_svg__a" x={-108} transform="scale(-1 1)" />
          </g>
          <use xlinkHref="#SY_svg__b" transform="rotate(72 54 60)" />
        </g>
        <use xlinkHref="#SY_svg__b" transform="rotate(-72 54 60)" />
        <use xlinkHref="#SY_svg__c" transform="rotate(144 54 60)" />
      </g>
      <use xlinkHref="#SY_svg__d" x={72} />
    </svg>
  );
}

export default SvgSy;
