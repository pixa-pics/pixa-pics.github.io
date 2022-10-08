import * as React from "react";

function SvgKn(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={750}
      height={500}
      {...props}
    >
      <path d="M750 0H0v500" fill="#009e49" />
      <path d="M0 500h750V0" fill="#ce1126" />
      <path d="M0 500L750 0" stroke="#fcd116" strokeWidth={210} />
      <path d="M0 500L750 0" stroke="#000" strokeWidth={150} />
      <g id="KN_svg__c" transform="rotate(-33.69 514.716 -777.095)" fill="#fff">
        <g id="KN_svg__b">
          <path id="KN_svg__a" d="M0-70V0h35" transform="rotate(18 0 -70)" />
          <use xlinkHref="#KN_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#KN_svg__b" transform="rotate(72)" />
        <use xlinkHref="#KN_svg__b" transform="rotate(144)" />
        <use xlinkHref="#KN_svg__b" transform="rotate(216)" />
        <use xlinkHref="#KN_svg__b" transform="rotate(288)" />
      </g>
      <use xlinkHref="#KN_svg__c" transform="translate(-285 190)" />
    </svg>
  );
}

export default SvgKn;
