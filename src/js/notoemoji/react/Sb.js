import * as React from "react";

function SvgSb(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={800}
      height={400}
      {...props}
    >
      <path d="M0 400V0h800z" fill="#0051ba" />
      <path d="M0 400h800V0z" fill="#215b33" />
      <path d="M0 400L800 0" stroke="#fcd116" strokeWidth={36} />
      <g transform="translate(140 120)">
        <g id="SB_svg__d" fill="#fff">
          <g id="SB_svg__c">
            <g id="SB_svg__b">
              <path
                id="SB_svg__a"
                d="M0-40V0h20z"
                transform="rotate(18 0 -40)"
              />
              <use xlinkHref="#SB_svg__a" transform="scale(-1 1)" />
            </g>
            <use xlinkHref="#SB_svg__b" transform="rotate(72)" />
          </g>
          <use xlinkHref="#SB_svg__b" transform="rotate(-72)" />
          <use xlinkHref="#SB_svg__c" transform="rotate(144)" />
        </g>
        <g id="SB_svg__f" transform="rotate(40.6)">
          <use
            id="SB_svg__e"
            xlinkHref="#SB_svg__d"
            x={-104}
            transform="rotate(-40.6 -104 0)"
          />
          <use xlinkHref="#SB_svg__e" x={208} />
        </g>
        <use xlinkHref="#SB_svg__f" transform="scale(-1 1)" />
      </g>
    </svg>
  );
}

export default SvgSb;
