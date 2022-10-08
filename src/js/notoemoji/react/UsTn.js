import * as React from "react";

function SvgUsTn(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={500}
      height={300}
      viewBox="0 0 240 144"
      {...props}
    >
      <path fill="#c00" d="M0 0h222v144H0z" />
      <path fill="#fff" d="M222 0h3v144h-3z" />
      <path fill="#002d65" d="M225 0h15v144h-15z" />
      <g transform="translate(111 72)">
        <circle r={39} fill="#fff" />
        <circle r={36} fill="#002d65" />
        <g id="US-TN_svg__c" transform="rotate(18 -58.402 -9.25)" fill="#fff">
          <g id="US-TN_svg__b">
            <path
              id="US-TN_svg__a"
              d="M0-17V0h8.5"
              transform="rotate(18 0 -17)"
            />
            <use xlinkHref="#US-TN_svg__a" transform="scale(-1 1)" />
          </g>
          <use xlinkHref="#US-TN_svg__b" transform="rotate(72)" />
          <use xlinkHref="#US-TN_svg__b" transform="rotate(144)" />
          <use xlinkHref="#US-TN_svg__b" transform="rotate(216)" />
          <use xlinkHref="#US-TN_svg__b" transform="rotate(288)" />
        </g>
        <use xlinkHref="#US-TN_svg__c" transform="rotate(120)" />
        <use xlinkHref="#US-TN_svg__c" transform="rotate(240)" />
      </g>
    </svg>
  );
}

export default SvgUsTn;
