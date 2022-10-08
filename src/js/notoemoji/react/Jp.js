import * as React from "react";

function SvgJp(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={900} height={600} {...props}>
      <path fill="#fff" d="M0 0h900v600H0z" />
      <circle fill="#bc002d" cx={450} cy={300} r={180} />
    </svg>
  );
}

export default SvgJp;
