import * as React from "react";

function SvgNo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1100}
      height={800}
      {...props}
    >
      <path fill="#ef2b2d" d="M0 0h1100v800H0z" />
      <path fill="#fff" d="M300 0h200v800H300z" />
      <path fill="#fff" d="M0 300h1100v200H0z" />
      <path fill="#002868" d="M350 0h100v800H350z" />
      <path fill="#002868" d="M0 350h1100v100H0z" />
    </svg>
  );
}

export default SvgNo;
