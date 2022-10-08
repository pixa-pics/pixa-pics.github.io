import * as React from "react";

function SvgUsAl(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={600} height={400} {...props}>
      <path fill="#fff" d="M0 0h600v400H0z" />
      <path d="M0 0l600 400M0 400L600 0" stroke="#b10021" strokeWidth={68} />
    </svg>
  );
}

export default SvgUsAl;
