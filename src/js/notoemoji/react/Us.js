import * as React from "react";

function SvgUs(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1235}
      height={650}
      viewBox="0 0 7410 3900"
      {...props}
    >
      <path fill="#b22234" d="M0 0h7410v3900H0z" />
      <path
        d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
        stroke="#fff"
        strokeWidth={300}
      />
      <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
      <g fill="#fff">
        <g id="US_svg__d">
          <g id="US_svg__c">
            <g id="US_svg__e">
              <g id="US_svg__b">
                <path
                  id="US_svg__a"
                  d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                />
                <use xlinkHref="#US_svg__a" y={420} />
                <use xlinkHref="#US_svg__a" y={840} />
                <use xlinkHref="#US_svg__a" y={1260} />
              </g>
              <use xlinkHref="#US_svg__a" y={1680} />
            </g>
            <use xlinkHref="#US_svg__b" x={247} y={210} />
          </g>
          <use xlinkHref="#US_svg__c" x={494} />
        </g>
        <use xlinkHref="#US_svg__d" x={988} />
        <use xlinkHref="#US_svg__c" x={1976} />
        <use xlinkHref="#US_svg__e" x={2470} />
      </g>
    </svg>
  );
}

export default SvgUs;
