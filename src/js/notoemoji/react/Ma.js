import * as React from "react";

function SvgMa(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={900} height={600} {...props}>
      <path fill="#c1272d" d="M0 0h900v600H0z" />
      <path
        d="M450 224.315l-44.467 136.87 116.401-84.559h-143.87l116.403 84.559z"
        fill="none"
        stroke="#006233"
        strokeWidth={14.63}
      />
    </svg>
  );
}

export default SvgMa;
