import * as React from "react";

function SvgBo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1100}
      height={750}
      {...props}
    >
      <path fill="#007934" d="M0 0h1100v750H0z" />
      <path fill="#F9E300" d="M0 0h1100v500H0z" />
      <path fill="#D52B1E" d="M0 0h1100v250H0z" />
    </svg>
  );
}

export default SvgBo;
