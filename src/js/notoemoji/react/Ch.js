import * as React from "react";

function SvgCh(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1000}
      height={1000}
      viewBox="0 0 32 32"
      {...props}
    >
      <path fill="red" d="M0 0h32v32H0z" />
      <path fill="#fff" d="M6 13h20v6H6z" />
      <path fill="#fff" d="M13 6h6v20h-6z" />
    </svg>
  );
}

export default SvgCh;
