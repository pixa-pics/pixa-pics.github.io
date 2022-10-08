import * as React from "react";

function SvgFo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1100}
      height={800}
      viewBox="0 0 22 16"
      {...props}
    >
      <path fill="#FFF" d="M0 0h22v16H0z" />
      <g fill="#0065BD">
        <path d="M6 0h4v16H6z" />
        <path d="M0 6h22v4H0z" />
      </g>
      <g fill="#ED2939">
        <path d="M7 0h2v16H7z" />
        <path d="M0 7h22v2H0z" />
      </g>
    </svg>
  );
}

export default SvgFo;
