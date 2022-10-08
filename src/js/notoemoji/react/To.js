import * as React from "react";

function SvgTo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={960}
      height={480}
      viewBox="0 0 96 48"
      {...props}
    >
      <g fill="#C10000">
        <path d="M0 0h96v48H0z" />
        <path fill="#fff" d="M0 0h40v24H0z" />
        <path d="M17 3h6v18h-6z" />
        <path d="M11 9h18v6H11z" />
      </g>
    </svg>
  );
}

export default SvgTo;
