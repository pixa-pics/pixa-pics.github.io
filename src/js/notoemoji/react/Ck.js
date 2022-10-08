import * as React from "react";

function SvgCk(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={600}
      height={300}
      {...props}
    >
      <clipPath id="CK_svg__a">
        <path d="M0 0v75h350v75h-50zm300 0H150v200H0v-50z" />
      </clipPath>
      <path fill="#00247d" d="M0 0h600v300H0z" />
      <path d="M0 0l300 150m0-150L0 150" stroke="#fff" strokeWidth={30} />
      <path
        d="M0 0l300 150m0-150L0 150"
        stroke="#cf142b"
        strokeWidth={20}
        clipPath="url(#CK_svg__a)"
      />
      <path d="M150 0v200M0 75h350" stroke="#fff" strokeWidth={50} />
      <path d="M150 0v200M0 75h350" stroke="#cf142b" strokeWidth={30} />
      <path d="M300 0v150H0v150h600V0z" fill="#00247d" />
      <g transform="translate(450 150)">
        <g id="CK_svg__d" transform="translate(0 -102)" fill="#fff">
          <g id="CK_svg__c">
            <path
              id="CK_svg__b"
              d="M0-22.5V0h12"
              transform="rotate(18 0 -22.5)"
            />
            <use xlinkHref="#CK_svg__b" transform="scale(-1 1)" />
          </g>
          <use xlinkHref="#CK_svg__c" transform="rotate(72)" />
          <use xlinkHref="#CK_svg__c" transform="rotate(144)" />
          <use xlinkHref="#CK_svg__c" transform="rotate(216)" />
          <use xlinkHref="#CK_svg__c" transform="rotate(288)" />
        </g>
        <g id="CK_svg__e">
          <use xlinkHref="#CK_svg__d" transform="rotate(24)" />
          <use xlinkHref="#CK_svg__d" transform="rotate(48)" />
          <use xlinkHref="#CK_svg__d" transform="rotate(72)" />
          <use xlinkHref="#CK_svg__d" transform="rotate(96)" />
          <use xlinkHref="#CK_svg__d" transform="rotate(120)" />
          <use xlinkHref="#CK_svg__d" transform="rotate(144)" />
          <use xlinkHref="#CK_svg__d" transform="rotate(168)" />
        </g>
        <use xlinkHref="#CK_svg__e" transform="rotate(168)" />
      </g>
    </svg>
  );
}

export default SvgCk;
