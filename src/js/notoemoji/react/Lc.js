import * as React from "react";

function SvgLc(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={600}
      viewBox="0 0 600 300"
      {...props}
    >
      <path fill="#6Cf" d="M0 0h600v300H0z" />
      <path fill="#FFF" d="M200 274l100-14 100 14L300 27z" />
      <path d="M213.5 274l86.5-14 86.5 14L300 60z" />
      <path fill="#FCD116" d="M200 274h200L300 150z" />
    </svg>
  );
}

export default SvgLc;
