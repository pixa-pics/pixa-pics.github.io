import * as React from "react";

function SvgGn(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={450}
      height={300}
      viewBox="0 0 3 2"
      {...props}
    >
      <path fill="#ce1126" d="M0 0h3v2H0z" />
      <path fill="#fcd116" d="M1 0h2v2H1z" />
      <path fill="#009460" d="M2 0h1v2H2z" />
    </svg>
  );
}

export default SvgGn;
