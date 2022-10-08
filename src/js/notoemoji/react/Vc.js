import * as React from "react";

function SvgVc(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={450}
      height={300}
      viewBox="0 0 72 48"
      {...props}
    >
      <path fill="#009e60" d="M0 0h72v48H0z" />
      <path fill="#fcd116" d="M0 0h54v48H0z" />
      <path fill="#0072c6" d="M0 0h18v48H0z" />
      <path
        d="M32 34l4 8 4-8-4-8zm-5-10l4 8 4-8-4-8zm10 0l4 8 4-8-4-8z"
        fill="#009e60"
      />
    </svg>
  );
}

export default SvgVc;
