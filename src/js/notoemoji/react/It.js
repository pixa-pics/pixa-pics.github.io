import * as React from "react";

function SvgIt(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1500}
      height={1000}
      viewBox="0 0 3 2"
      {...props}
    >
      <path fill="#009246" d="M0 0h3v2H0z" />
      <path fill="#fff" d="M1 0h2v2H1z" />
      <path fill="#ce2b37" d="M2 0h1v2H2z" />
    </svg>
  );
}

export default SvgIt;
