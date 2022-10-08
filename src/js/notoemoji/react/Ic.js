import * as React from "react";

function SvgIc(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={600} height={400} {...props}>
      <path fill="#fc0" d="M0 0h600v400H0z" />
      <path fill="#0768a9" d="M0 0h400v400H0z" />
      <path fill="#fff" d="M0 0h200v400H0z" />
    </svg>
  );
}

export default SvgIc;
