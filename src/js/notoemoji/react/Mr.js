import * as React from "react";

function SvgMr(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={600}
      width={900}
      viewBox="-72 -28 144 96"
      {...props}
    >
      <path fill="#cd2a3e" d="M-72-28H72v96H-72z" />
      <path fill="#006233" d="M-72-13.6H72v67.2H-72z" />
      <path
        d="M30 2.92c-.08 16.496-13.488 29.84-30 29.84S-29.92 19.416-30 2.92a30.973 30.973 0 00-1.008 7.84c0 17.12 13.872 31.008 31.008 31.008S31.008 27.896 31.008 10.76A30.88 30.88 0 0030 2.92z"
        className="MR_svg__st1"
        fill="#ffc400"
      />
      <path
        d="M0-9.24L-2.694-.949h-8.719l7.053 5.126-2.693 8.291L0 7.344l7.053 5.124L4.36 4.177l7.053-5.125H2.694z"
        fill="#ffc400"
      />
    </svg>
  );
}

export default SvgMr;
