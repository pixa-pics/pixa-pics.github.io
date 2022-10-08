import * as React from "react";

function SvgNe(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={700} height={600} {...props}>
      <path fill="#0DB02B" d="M0 0h700v600H0z" />
      <path fill="#FFF" d="M0 0h700v400H0z" />
      <path fill="#e05206" d="M0 0h700v200H0z" />
      <circle cx={350} cy={300} r={85} fill="#e05206" />
    </svg>
  );
}

export default SvgNe;
