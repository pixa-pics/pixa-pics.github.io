import * as React from "react";

function SvgBg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1000}
      height={600}
      viewBox="0 0 5 3"
      {...props}
    >
      <path fill="#fff" d="M0 0h5v3H0z" />
      <path fill="#00966E" d="M0 1h5v2H0z" />
      <path fill="#D62612" d="M0 2h5v1H0z" />
    </svg>
  );
}

export default SvgBg;
