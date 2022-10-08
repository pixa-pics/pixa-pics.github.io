import * as React from "react";

function SvgCw(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="0 0 54 36"
      {...props}
    >
      <path fill="#002b7f" d="M0 0h54v36H0z" />
      <path d="M0 22.5h54V27H0z" fill="#f9e814" />
      <g fill="#fff" id="CW_svg__d">
        <g id="CW_svg__c">
          <g id="CW_svg__b">
            <path d="M12 8v4h2z" transform="rotate(18 12 8)" id="CW_svg__a" />
            <use xlinkHref="#CW_svg__a" x={-24} transform="scale(-1 1)" />
          </g>
          <use xlinkHref="#CW_svg__b" transform="rotate(72 12 12)" />
        </g>
        <use xlinkHref="#CW_svg__b" transform="rotate(-72 12 12)" />
        <use xlinkHref="#CW_svg__c" transform="rotate(144 12 12)" />
      </g>
      <use xlinkHref="#CW_svg__d" x={-4} y={-4} transform="scale(.75)" />
    </svg>
  );
}

export default SvgCw;
