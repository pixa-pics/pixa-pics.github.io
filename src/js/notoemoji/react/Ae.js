import * as React from "react";

function SvgAe(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={600}
      viewBox="0 0 12 6"
      {...props}
    >
      <path fill="#00732f" d="M0 0h12v2H0z" />
      <path fill="#fff" d="M0 2h12v2H0z" />
      <path d="M0 4h12v2H0z" />
      <path fill="red" d="M0 0h3v6H0z" />
    </svg>
  );
}

export default SvgAe;
