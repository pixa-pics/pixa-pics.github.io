import * as React from "react";

function SvgHu(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={600}
      viewBox="0 0 6 3"
      {...props}
    >
      <path fill="#436F4D" d="M0 0h6v3H0z" />
      <path fill="#FFF" d="M0 0h6v2H0z" />
      <path fill="#CD2A3E" d="M0 0h6v1H0z" />
    </svg>
  );
}

export default SvgHu;
