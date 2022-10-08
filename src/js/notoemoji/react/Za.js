import * as React from "react";

function SvgZa(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="0 0 9 6"
      {...props}
    >
      <clipPath id="ZA_svg__c">
        <path d="M0 0l4.5 3L0 6" id="ZA_svg__b" />
      </clipPath>
      <clipPath id="ZA_svg__a">
        <path d="M0 0h9v6H0z" />
      </clipPath>
      <g clipPath="url(#ZA_svg__a)">
        <path d="M0 0v6h9V0z" fill="#002395" />
        <path d="M0 0v3h9V0z" fill="#de3831" />
        <g strokeWidth={2} stroke="#fff">
          <path d="M0 0l4.5 3L0 6m4.5-3H9" id="ZA_svg__d" />
          <use
            xlinkHref="#ZA_svg__b"
            stroke="#ffb612"
            clipPath="url(#ZA_svg__c)"
          />
        </g>
        <use
          xlinkHref="#ZA_svg__d"
          fill="none"
          stroke="#007a4d"
          strokeWidth={1.2}
        />
      </g>
    </svg>
  );
}

export default SvgZa;
