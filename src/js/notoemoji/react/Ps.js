import * as React from "react";

function SvgPs(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={600}
      viewBox="0 0 6 3"
      {...props}
    >
      <path fill="#007A3D" d="M0 0h6v3H0z" />
      <path fill="#FFF" d="M0 0h6v2H0z" />
      <path d="M0 0h6v1H0z" />
      <path fill="#CE1126" d="M0 0l2 1.5L0 3z" />
    </svg>
  );
}

export default SvgPs;