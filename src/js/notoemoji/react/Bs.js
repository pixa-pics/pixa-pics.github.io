import * as React from "react";

function SvgBs(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={600} height={300} {...props}>
      <path fill="#00778B" d="M0 0h600v300H0z" />
      <path fill="#FFC72C" d="M0 100h600v100H0z" />
      <path d="M0 0v300l259.808-150z" />
    </svg>
  );
}

export default SvgBs;
