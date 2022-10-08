import * as React from "react";

function SvgUsOh(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={520}
      height={320}
      viewBox="0 0 26 16"
      {...props}
    >
      <defs>
        <clipPath id="US-OH_svg__d">
          <path d="M0 16V0l26 3-6 5 6 5z" />
        </clipPath>
        <g
          id="US-OH_svg__e"
          fill="#fff"
          transform="translate(3.944) scale(.625)"
        >
          <g id="US-OH_svg__c">
            <g id="US-OH_svg__b">
              <path
                id="US-OH_svg__a"
                d="M1 0H0v.5z"
                transform="rotate(18 1 0)"
              />
              <use xlinkHref="#US-OH_svg__a" transform="scale(1 -1)" />
            </g>
            <use xlinkHref="#US-OH_svg__b" transform="rotate(72)" />
          </g>
          <use xlinkHref="#US-OH_svg__b" transform="rotate(-72)" />
          <use xlinkHref="#US-OH_svg__c" transform="rotate(144)" />
        </g>
      </defs>
      <g fill="#fff" stroke="#c1133d" clipPath="url(#US-OH_svg__d)">
        <path d="M26 3L0 0v16l26-3" strokeWidth={4} />
        <path d="M0 8h26" strokeWidth={2} />
      </g>
      <path d="M0 0v16l16-8z" fill="#001c5a" />
      <g transform="translate(4.944 8)">
        <circle r={3} fill="#fff" />
        <circle r={2} fill="#c1133d" />
        <use xlinkHref="#US-OH_svg__e" x={4} />
        <g id="US-OH_svg__f">
          <use xlinkHref="#US-OH_svg__e" />
          <use xlinkHref="#US-OH_svg__e" x={2} transform="rotate(-9.65)" />
          <use xlinkHref="#US-OH_svg__e" x={2} transform="rotate(9.65)" />
        </g>
        <g id="US-OH_svg__g">
          <use xlinkHref="#US-OH_svg__e" transform="rotate(63.435)" />
          <use xlinkHref="#US-OH_svg__e" transform="rotate(92.576)" />
          <use xlinkHref="#US-OH_svg__f" transform="rotate(121.717)" />
          <use xlinkHref="#US-OH_svg__e" transform="rotate(150.859)" />
        </g>
        <use xlinkHref="#US-OH_svg__e" transform="rotate(180)" />
        <use xlinkHref="#US-OH_svg__g" transform="scale(1 -1)" />
      </g>
    </svg>
  );
}

export default SvgUsOh;
