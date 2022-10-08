import * as React from "react";

function SvgPa(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={450}
      height={300}
      viewBox="0 0 36 24"
      {...props}
    >
      <path fill="#fff" d="M0 0h36v24H0z" />
      <g fill="#005293">
        <g id="PA_svg__c" transform="translate(9 6)">
          <g id="PA_svg__b">
            <path id="PA_svg__a" d="M0-3v3h1.5z" transform="rotate(18 0 -3)" />
            <use xlinkHref="#PA_svg__a" transform="scale(-1 1)" />
          </g>
          <use xlinkHref="#PA_svg__b" transform="rotate(72)" />
          <use xlinkHref="#PA_svg__b" transform="rotate(144)" />
          <use xlinkHref="#PA_svg__b" transform="rotate(216)" />
          <use xlinkHref="#PA_svg__b" transform="rotate(288)" />
        </g>
        <path d="M0 12h18v12H0z" />
      </g>
      <g fill="#d21034">
        <path d="M18 0h18v12H18z" />
        <use xlinkHref="#PA_svg__c" x={18} y={12} />
      </g>
    </svg>
  );
}

export default SvgPa;
