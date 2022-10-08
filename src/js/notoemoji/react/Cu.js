import * as React from "react";

function SvgCu(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={800}
      height={400}
      fill="#fff"
      {...props}
    >
      <path fill="#002a8f" d="M0 0h800v400H0" />
      <path d="M0 80h800v80H0v80h800v80H0" />
      <path fill="#cf142b" d="M346.4 200L0 0v400" />
      <path d="M115.5 140l35.35 108.5-92.5-67h114.2l-92.5 67" />
    </svg>
  );
}

export default SvgCu;
