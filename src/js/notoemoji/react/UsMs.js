import * as React from "react";

function SvgUsMs(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="0 0 1107 738"
      {...props}
    >
      <defs>
        <clipPath id="US-MS_svg__a">
          <path d="M0 0h60.5v60.5H0z" />
        </clipPath>
        <path
          id="US-MS_svg__b"
          transform="scale(3)"
          fill="#fff"
          d="M0-1L.588.809-.952-.309H.952L-.588.809z"
        />
      </defs>
      <path fill="#bf0a30" d="M0 0h1107v738H0z" />
      <g clipPath="url(#US-MS_svg__a)" transform="scale(8)">
        <path stroke="#fff" strokeWidth={12} d="M0 0l60 60M0 60L60 0" />
        <path stroke="#002868" strokeWidth={9} d="M0 0l60 60M0 60L60 0" />
        <g id="US-MS_svg__c">
          <use xlinkHref="#US-MS_svg__b" x={6} y={6} />
          <use xlinkHref="#US-MS_svg__b" x={14} y={14} />
          <use xlinkHref="#US-MS_svg__b" x={22} y={22} />
          <use xlinkHref="#US-MS_svg__b" x={38} y={38} />
          <use xlinkHref="#US-MS_svg__b" x={46} y={46} />
          <use xlinkHref="#US-MS_svg__b" x={54} y={54} />
        </g>
        <use xlinkHref="#US-MS_svg__c" transform="scale(-1 1)" x={-60} />
        <use xlinkHref="#US-MS_svg__b" x={30} y={30} />
      </g>
      <path fill="#fff" d="M480 0h627v492H0v-12h480z" />
      <path fill="#002868" d="M492 0h615v246H492z" />
    </svg>
  );
}

export default SvgUsMs;
