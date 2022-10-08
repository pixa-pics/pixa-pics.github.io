import * as React from "react";

function SvgGr(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={600}
      height={400}
      viewBox="0 0 27 18"
      {...props}
    >
      <path fill="#0D5EAF" d="M0 0h27v18H0z" />
      <path
        fill="none"
        strokeWidth={2}
        stroke="#FFF"
        d="M5 0v11M0 5h10m0-2h17M10 7h17M0 11h27M0 15h27"
      />
    </svg>
  );
}

export default SvgGr;
