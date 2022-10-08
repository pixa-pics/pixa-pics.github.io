import * as React from "react";

function SvgPe(props) {
  return (
    <svg width={900} height={600} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#D91023" d="M0 0h900v600H0z" />
      <path fill="#fff" d="M300 0h300v600H300z" />
    </svg>
  );
}

export default SvgPe;
