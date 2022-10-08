import * as React from "react";

function SvgBi(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={500}
      height={300}
      {...props}
    >
      <defs>
        <use id="BI_svg__f" xlinkHref="#BI_svg__a" x={250} y={106} />
        <g id="BI_svg__a" fill="#1eb53a">
          <g id="BI_svg__e">
            <g id="BI_svg__d">
              <g id="BI_svg__c">
                <path
                  id="BI_svg__b"
                  d="M0-20V0h20"
                  transform="rotate(30 0 -20)"
                />
                <use xlinkHref="#BI_svg__b" transform="scale(-1 1)" />
              </g>
              <use xlinkHref="#BI_svg__c" transform="rotate(120)" />
              <use xlinkHref="#BI_svg__c" transform="rotate(240)" />
            </g>
            <use xlinkHref="#BI_svg__d" transform="rotate(180)" />
          </g>
          <use xlinkHref="#BI_svg__e" fill="#ce1126" transform="scale(.82)" />
        </g>
      </defs>
      <path d="M0 0h500L0 300h500z" fill="#ce1126" />
      <path d="M0 0v300L500 0v300z" fill="#1eb53a" />
      <path d="M0 0l500 300m0-300L0 300" stroke="#fff" strokeWidth={40} />
      <circle cx={250} cy={150} r={85} fill="#fff" />
      <use xlinkHref="#BI_svg__f" />
      <use xlinkHref="#BI_svg__f" transform="rotate(120 250 150)" />
      <use xlinkHref="#BI_svg__f" transform="rotate(240 250 150)" />
    </svg>
  );
}

export default SvgBi;
