import * as React from "react";

function SvgUa(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={800}
      {...props}
    >
      <path fill="#005BBB" d="M0 0h1200v800H0z" />
      <path fill="#FFD500" d="M0 400h1200v400H0z" />
    </svg>
  );
}

export default SvgUa;
