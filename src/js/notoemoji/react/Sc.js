import * as React from "react";

function SvgSc(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={900} height={450} {...props}>
      <path d="M0 450h900V0H0z" fill="#d62828" />
      <path d="M0 450V0h600z" fill="#fcd856" />
      <path d="M0 450V0h300z" fill="#003f87" />
      <path d="M0 450h900V150z" fill="#fff" />
      <path d="M0 450h900V300z" fill="#007a3d" />
    </svg>
  );
}

export default SvgSc;
