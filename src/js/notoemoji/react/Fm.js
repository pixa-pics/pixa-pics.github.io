import * as React from "react";

function SvgFm(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={760}
      height={400}
      viewBox="-19 -10 38 20"
      {...props}
    >
      <path fill="#75b2dd" d="M-19-10h38v20h-38z" />
      <g id="FM_svg__c" transform="translate(0 -6)" fill="#fff">
        <g id="FM_svg__b">
          <path id="FM_svg__a" d="M0-2v2h1" transform="rotate(18 0 -2)" />
          <use xlinkHref="#FM_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#FM_svg__b" transform="rotate(72)" />
        <use xlinkHref="#FM_svg__b" transform="rotate(144)" />
        <use xlinkHref="#FM_svg__b" transform="rotate(216)" />
        <use xlinkHref="#FM_svg__b" transform="rotate(288)" />
      </g>
      <use xlinkHref="#FM_svg__c" transform="rotate(90)" />
      <use xlinkHref="#FM_svg__c" transform="rotate(180)" />
      <use xlinkHref="#FM_svg__c" transform="rotate(270)" />
    </svg>
  );
}

export default SvgFm;
