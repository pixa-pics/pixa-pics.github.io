import * as React from "react";

function SvgGa(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={400} height={300} {...props}>
      <path fill="#3a75c4" d="M0 0h400v300H0z" />
      <path fill="#fcd116" d="M0 0h400v200H0z" />
      <path fill="#009e60" d="M0 0h400v100H0z" />
    </svg>
  );
}

export default SvgGa;
