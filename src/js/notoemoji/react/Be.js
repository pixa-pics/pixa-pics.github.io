import * as React from "react";

function SvgBe(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={450} height={390} {...props}>
      <path fill="#ED2939" d="M0 0h450v390H0z" />
      <path fill="#FAE042" d="M0 0h300v390H0z" />
      <path d="M0 0h150v390H0z" />
    </svg>
  );
}

export default SvgBe;
