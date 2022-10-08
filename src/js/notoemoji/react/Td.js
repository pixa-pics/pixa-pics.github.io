import * as React from "react";

function SvgTd(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={450} height={300} {...props}>
      <path fill="#C60C30" d="M0 0h450v300H0z" />
      <path fill="#FECB00" d="M0 0h300v300H0z" />
      <path fill="#002664" d="M0 0h150v300H0z" />
    </svg>
  );
}

export default SvgTd;
