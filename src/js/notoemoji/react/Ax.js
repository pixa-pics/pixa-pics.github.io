import * as React from "react";

function SvgAx(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={520}
      height={340}
      viewBox="0 0 260 170"
      {...props}
    >
      <path fill="#0053A5" d="M0 0h260v170H0z" />
      <g fill="#FFCE00">
        <path d="M80 0h50v170H80z" />
        <path d="M0 60h260v50H0z" />
      </g>
      <g fill="#D21034">
        <path d="M95 0h20v170H95z" />
        <path d="M0 75h260v20H0z" />
      </g>
    </svg>
  );
}

export default SvgAx;
