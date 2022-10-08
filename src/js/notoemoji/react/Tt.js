import * as React from "react";

function SvgTt(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={800}
      height={480}
      viewBox="0 0 30 18"
      {...props}
    >
      <path fill="#da1a35" d="M0 0h30v18H0z" />
      <path fill="#FFF" d="M0 0l20.825 18H30L9.175 0z" />
      <path d="M1.53 0l20.824 18h6.117L7.646 0z" />
    </svg>
  );
}

export default SvgTt;
