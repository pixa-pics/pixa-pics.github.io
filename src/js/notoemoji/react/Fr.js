import * as React from "react";

function SvgFr(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={900} height={600} {...props}>
      <path fill="#ED2939" d="M0 0h900v600H0z" />
      <path fill="#fff" d="M0 0h600v600H0z" />
      <path fill="#002395" d="M0 0h300v600H0z" />
    </svg>
  );
}

export default SvgFr;
