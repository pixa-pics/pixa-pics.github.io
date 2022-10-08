import * as React from "react";

function SvgTz(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={900}
      height={600}
      viewBox="0 0 72 48"
      {...props}
    >
      <path d="M0 48V0h72z" fill="#1eb53a" />
      <path d="M0 48h72V0z" fill="#00a3dd" />
      <path d="M0 48L72 0" stroke="#fcd116" strokeWidth={19} />
      <path d="M0 48L72 0" stroke="#000" strokeWidth={13} />
    </svg>
  );
}

export default SvgTz;
