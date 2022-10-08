import * as React from "react";

function SvgGbSct(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1000}
      height={600}
      viewBox="0 0 5 3"
      {...props}
    >
      <defs>
        <clipPath id="GB-SCT_svg__a">
          <path d="M0 0h5v3H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#GB-SCT_svg__a)">
        <path fill="#0065BD" d="M0 0h50v30H0z" />
        <path
          d="M0 0l5 3M0 3l5-3"
          fill="none"
          stroke="#fff"
          strokeWidth={0.6}
        />
      </g>
    </svg>
  );
}

export default SvgGbSct;
