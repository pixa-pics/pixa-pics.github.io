import * as React from "react";

function SvgKw(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={600}
      viewBox="0 0 12 6"
      {...props}
    >
      <path fill="#007a3d" d="M0 0h12v2H0z" />
      <path fill="#fff" d="M0 2h12v2H0z" />
      <path fill="#ce1126" d="M0 4h12v2H0z" />
      <path d="M0 0l3 2v2L0 6z" />
    </svg>
  );
}

export default SvgKw;
