import * as React from "react";

function SvgKe(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      {...props}
    >
      <defs>
        <path
          id="KE_svg__a"
          d="M-1 55.426h2V-38c2-2 2-5 2-8 0-2 0-10-3-18.663C-3-56-3-48-3-46c0 3 0 6 2 8z"
          strokeMiterlimit={10}
          transform="rotate(30)"
        />
      </defs>
      <path fill="#fff" d="M0 0h900v600H0z" />
      <path d="M0 0h900v180H0z" />
      <path fill="#b00" d="M0 210h900v180H0z" />
      <path fill="#060" d="M0 420h900v180H0z" />
      <g transform="matrix(3.75 0 0 3.75 450 300)">
        <g id="KE_svg__b">
          <use xlinkHref="#KE_svg__a" />
          <use xlinkHref="#KE_svg__a" fill="#fff" />
        </g>
        <use xlinkHref="#KE_svg__b" transform="scale(-1 1)" />
        <path
          d="M-19 24c3 8 13 24 19 24s16-16 19-24v-48C16-32 6-48 0-48s-16 16-19 24z"
          fill="#b00"
        />
        <path
          id="KE_svg__c"
          d="M19 24c3-8 5-16 5-24s-2-16-5-24c-3 8-5 16-5 24s2 16 5 24z"
          fill="#000"
        />
        <use xlinkHref="#KE_svg__c" transform="scale(-1 1)" />
        <g fill="#fff">
          <ellipse rx={4} ry={6} />
          <path id="KE_svg__d" d="M1 5.85s4 8 4 21-4 21-4 21z" />
          <use xlinkHref="#KE_svg__d" transform="scale(-1)" />
          <use xlinkHref="#KE_svg__d" transform="scale(-1 1)" />
          <use xlinkHref="#KE_svg__d" transform="scale(1 -1)" />
        </g>
      </g>
    </svg>
  );
}

export default SvgKe;
