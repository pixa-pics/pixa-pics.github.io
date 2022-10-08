import * as React from "react";

function SvgNl(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={900}
      height={600}
      viewBox="0 0 9 6"
      {...props}
    >
      <path fill="#21468B" d="M0 0h9v6H0z" />
      <path fill="#FFF" d="M0 0h9v4H0z" />
      <path fill="#AE1C28" d="M0 0h9v2H0z" />
    </svg>
  );
}

export default SvgNl;
