import * as React from "react";

function SvgUsDc(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={800}
      height={400}
      {...props}
    >
      <path fill="#fff" d="M0 0h800v400H0z" />
      <g id="US-DC_svg__c" transform="translate(200 60)" fill="#e81b39">
        <g id="US-DC_svg__b">
          <path
            id="US-DC_svg__a"
            d="M0-40V0h20z"
            transform="rotate(18 0 -40)"
          />
          <use xlinkHref="#US-DC_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#US-DC_svg__b" transform="rotate(72)" />
        <use xlinkHref="#US-DC_svg__b" transform="rotate(144)" />
        <use xlinkHref="#US-DC_svg__b" transform="rotate(216)" />
        <use xlinkHref="#US-DC_svg__b" transform="rotate(288)" />
      </g>
      <use xlinkHref="#US-DC_svg__c" x={200} />
      <use xlinkHref="#US-DC_svg__c" x={400} />
      <path id="US-DC_svg__d" fill="#e81b39" d="M0 120h800v80H0z" />
      <use xlinkHref="#US-DC_svg__d" y={120} />
    </svg>
  );
}

export default SvgUsDc;
