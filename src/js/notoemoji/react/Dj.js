import * as React from "react";

function SvgDj(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={600}
      height={400}
      viewBox="0 0 15 10"
      {...props}
    >
      <path d="M0 0h15v10H0z" fill="#6ab2e7" />
      <path d="M0 5h15v5H0z" fill="#12ad2b" />
      <path d="M0 0v10l4.33-2.5L8.66 5 4.33 2.5 0 0z" fill="#fff" />
      <path
        d="M3.314 3.75l.31.955H4.63l-.813.59.31.955-.812-.59-.812.59.31-.955L2 4.705h1.004l.31-.955z"
        fill="#d7141a"
      />
    </svg>
  );
}

export default SvgDj;
