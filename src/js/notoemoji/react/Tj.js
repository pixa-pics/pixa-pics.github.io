import * as React from "react";

function SvgTj(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1200}
      height={600}
      viewBox="0 0 1400 700"
      {...props}
    >
      <path fill="#060" d="M0 0h1400v700H0z" />
      <path fill="#fff" d="M0 0h1400v500H0z" />
      <path fill="#c00" d="M0 0h1400v200H0z" />
      <g fill="#f8c300">
        <path d="M672 340.7a12.5 12.5 0 0123.3 5.9v50h9.4v-50a12.5 12.5 0 0123.3-5.9 29.5 29.5 0 10-56 0" />
        <path
          d="M678.7 327.65a20 20 0 0121.3 9.55 20 20 0 0121.3-9.55 21.5 21.5 0 00-42.6 0"
          fill="#fff"
        />
        <path
          id="TJ_svg__a"
          d="M695.3 376.627a38 38 0 01-63.845 24.316 39.5 39.5 0 01-59.734 17.467c3.65 36.426 58.252 28.989 62.32-6.429 17.154 30.115 54.873 21.49 65.91-15.4z"
        />
        <use xlinkHref="#TJ_svg__a" transform="matrix(-1 0 0 1 1400 0)" />
        <path
          id="TJ_svg__b"
          d="M658.84 441.31c-7.618 16.446-22.845 19.271-36.164 5.995 0 0 5.354-3.783 11.086-4.826-1.075-4.574 1.13-10.902 4.235-14.324 3.258 2.227 7.804 6.689 8.96 11.874 8.03-1.04 11.883 1.282 11.883 1.282z"
        />
        <use xlinkHref="#TJ_svg__b" transform="rotate(9.37 700 804)" />
        <use xlinkHref="#TJ_svg__b" transform="rotate(18.74 700 804)" />
        <path
          d="M603 478a340 340 0 01194 0"
          fill="none"
          strokeWidth={16}
          stroke="#f8c300"
        />
        <g transform="translate(700 380)">
          <g transform="translate(0 -140)">
            <path
              id="TJ_svg__c"
              transform="scale(.00005)"
              d="M0-513674l301930 929245-790463-574305h977066l-790463 574305z"
            />
          </g>
          <g id="TJ_svg__d">
            <use xlinkHref="#TJ_svg__c" transform="translate(-70 -121.244)" />
            <use xlinkHref="#TJ_svg__c" transform="translate(-121.244 -70)" />
            <use xlinkHref="#TJ_svg__c" transform="translate(-140)" />
          </g>
          <use xlinkHref="#TJ_svg__d" transform="scale(-1 1)" />
        </g>
      </g>
    </svg>
  );
}

export default SvgTj;
