import * as React from "react";

function SvgMw(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="-225 -114 450 300"
      {...props}
    >
      <path d="M-225-114h450v300h-450z" />
      <g fill="#CE1126">
        <circle r={64.5} />
        <path d="M-225-14h450V86h-450z" />
        <g id="MW_svg__e">
          <g id="MW_svg__d">
            <g id="MW_svg__c">
              <g id="MW_svg__b">
                <path
                  id="MW_svg__a"
                  d="M0-102c-2.2 0-3 3.3-3 6.5 0 8 1 12 3 23.5 2.04-11.5 3-15.6 3-23.5 0-3.3-1-6.5-3-6.5"
                />
                <use transform="rotate(5)" xlinkHref="#MW_svg__a" />
              </g>
              <use transform="rotate(10)" xlinkHref="#MW_svg__b" />
            </g>
            <use transform="rotate(20)" xlinkHref="#MW_svg__c" />
          </g>
          <use transform="rotate(40)" xlinkHref="#MW_svg__d" />
        </g>
        <use transform="rotate(-80)" xlinkHref="#MW_svg__e" />
      </g>
      <path d="M-225-21.5h450v7.5h-450z" />
      <path fill="#339E35" d="M-225 86h450v100h-450z" />
    </svg>
  );
}

export default SvgMw;
