import * as React from "react";

function SvgMg(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={900} height={600} {...props}>
      <path fill="#007E3A" d="M0 0h900v600H0z" />
      <path fill="#FC3D32" d="M0 0h900v300H0z" />
      <path fill="#FFF" d="M0 0h300v600H0z" />
    </svg>
  );
}

export default SvgMg;
