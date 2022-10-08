import * as React from "react";

function SvgAt(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={900} height={600} {...props}>
      <path fill="#ed2939" d="M0 0h900v600H0z" />
      <path fill="#fff" d="M0 200h900v200H0z" />
    </svg>
  );
}

export default SvgAt;
