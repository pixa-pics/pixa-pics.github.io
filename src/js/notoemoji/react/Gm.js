import * as React from "react";

function SvgGm(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={600}
      height={400}
      viewBox="0 0 27 18"
      {...props}
    >
      <path d="M0 0h27v18H0" fill="#3A7728" />
      <path d="M0 0h27v11H0" fill="#0C1C8C" />
      <path d="M0 0h27v6H0" fill="#CE1126" />
      <path d="M0 6.5h27m0 5H0" stroke="#FFF" />
    </svg>
  );
}

export default SvgGm;
