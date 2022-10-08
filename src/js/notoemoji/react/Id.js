import * as React from "react";

function SvgId(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={450}
      height={300}
      viewBox="0 0 3 2"
      {...props}
    >
      <path fill="#FFF" d="M0 0h3v2H0z" />
      <path fill="red" d="M0 0h3v1H0z" />
    </svg>
  );
}

export default SvgId;
