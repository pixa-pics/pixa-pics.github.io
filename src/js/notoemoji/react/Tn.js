import * as React from "react";

function SvgTn(props) {
  return (
    <svg
      height={800}
      viewBox="-60 -40 120 80"
      width={1200}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="#e70013">
        <path d="M-60-40H60v80H-60z" />
        <circle fill="#fff" r={20} />
        <path d="M0-15A15 15 0 00-15 0 15 15 0 000 15a15 15 0 0012.102-6.165A12 12 0 014 12 12 12 0 01-8 0 12 12 0 014-12a12 12 0 018.101 3.167A15 15 0 000-15z" />
        <path d="M-5 0l16.281-5.29L1.22 8.56V-8.56L11.28 5.29z" />
      </g>
    </svg>
  );
}

export default SvgTn;
