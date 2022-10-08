import * as React from "react";

function SvgBw(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={800}
      viewBox="0 0 36 24"
      {...props}
    >
      <path fill="#75aadb" d="M0 0h36v24H0z" />
      <path fill="#fff" d="M0 9h36v6H0z" />
      <path d="M0 10h36v4H0z" />
    </svg>
  );
}

export default SvgBw;
