import * as React from "react";

function SvgSt(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={2800}
      height={1400}
      {...props}
    >
      <path fill="#12ad2b" d="M0 0h2800v1400H0z" />
      <path fill="#ffce00" d="M0 400h2800v600H0z" />
      <path d="M0 0v1400l700-700" fill="#d21034" />
      <g id="ST_svg__c" transform="translate(1400 700)" fill="#000">
        <g id="ST_svg__b">
          <path id="ST_svg__a" d="M0-200V0h100" transform="rotate(18 0 -200)" />
          <use xlinkHref="#ST_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#ST_svg__b" transform="rotate(72)" />
        <use xlinkHref="#ST_svg__b" transform="rotate(144)" />
        <use xlinkHref="#ST_svg__b" transform="rotate(216)" />
        <use xlinkHref="#ST_svg__b" transform="rotate(288)" />
      </g>
      <use xlinkHref="#ST_svg__c" x={700} />
    </svg>
  );
}

export default SvgSt;
