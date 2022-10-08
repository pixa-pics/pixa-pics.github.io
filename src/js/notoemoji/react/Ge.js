import * as React from "react";

function SvgGe(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="0 0 300 200"
      {...props}
    >
      <defs>
        <g id="GE_svg__c">
          <clipPath id="GE_svg__a">
            <path d="M-109 104a104 104 0 000-208h218a104 104 0 000 208z" />
          </clipPath>
          <path
            id="GE_svg__b"
            d="M-55 74a55 55 0 01110 0V-74a55 55 0 01-110 0z"
            clipPath="url(#GE_svg__a)"
          />
          <use xlinkHref="#GE_svg__b" transform="rotate(90)" />
        </g>
      </defs>
      <path d="M0 0h300v200H0z" fill="#fff" />
      <path d="M130 0v80H0v40h130v80h40v-80h130V80H170V0h-40z" fill="red" />
      <use
        xlinkHref="#GE_svg__c"
        transform="translate(64.45 39.45)"
        fill="red"
      />
      <use
        xlinkHref="#GE_svg__c"
        transform="translate(235.55 160.55)"
        fill="red"
      />
      <use
        xlinkHref="#GE_svg__c"
        transform="translate(235.55 39.45)"
        fill="red"
      />
      <use
        xlinkHref="#GE_svg__c"
        transform="translate(64.45 160.55)"
        fill="red"
      />
    </svg>
  );
}

export default SvgGe;
