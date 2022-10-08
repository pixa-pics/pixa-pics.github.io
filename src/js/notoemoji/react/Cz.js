import * as React from "react";

function SvgCz(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={900} height={600} {...props}>
      <path fill="#d7141a" d="M0 0h900v600H0z" />
      <path fill="#fff" d="M0 0h900v300H0z" />
      <path d="M450 300L0 0v600z" fill="#11457e" />
    </svg>
  );
}

export default SvgCz;
