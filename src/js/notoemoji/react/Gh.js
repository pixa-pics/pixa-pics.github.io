import * as React from "react";

function SvgGh(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={450} height={300} {...props}>
      <path fill="#006b3f" d="M0 0h450v300H0z" />
      <path fill="#fcd116" d="M0 0h450v200H0z" />
      <path fill="#ce1126" d="M0 0h450v100H0z" />
      <path d="M225 100l32.492 100-85.065-61.803h105.146L192.508 200z" />
    </svg>
  );
}

export default SvgGh;
