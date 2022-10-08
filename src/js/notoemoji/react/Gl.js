import * as React from "react";

function SvgGl(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={900}
      height={600}
      viewBox="0 0 18 12"
      {...props}
    >
      <path fill="#fff" d="M0 0h18v12H0z" />
      <path fill="#d00c33" d="M0 6h18v6H0zm3 0a4 4 0 008 0 4 4 0 00-8 0" />
    </svg>
  );
}

export default SvgGl;
