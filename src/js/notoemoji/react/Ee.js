import * as React from "react";

function SvgEe(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={990}
      height={630}
      viewBox="0 0 33 21"
      {...props}
    >
      <path fill="#FFF" d="M0 0h33v21H0z" />
      <path d="M0 0h33v14H0z" />
      <path fill="#0072ce" d="M0 0h33v7H0z" />
    </svg>
  );
}

export default SvgEe;
