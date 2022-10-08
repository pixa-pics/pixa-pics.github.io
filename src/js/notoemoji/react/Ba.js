import * as React from "react";

function SvgBa(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={800}
      height={400}
      viewBox="0 0 16 8"
      {...props}
    >
      <path fill="#002395" d="M0 0h16v8H0z" />
      <path d="M4.24 0h8v8z" fill="#fecb00" />
      <g id="BA_svg__b">
        <path
          d="M2.353.525L2.8-.85 3.247.525l-1.17-.85h1.446z"
          fill="#fff"
          id="BA_svg__a"
        />
        <use xlinkHref="#BA_svg__a" x={1} y={1} />
        <use xlinkHref="#BA_svg__a" x={2} y={2} />
      </g>
      <use xlinkHref="#BA_svg__b" x={3} y={3} />
      <use xlinkHref="#BA_svg__b" x={6} y={6} />
    </svg>
  );
}

export default SvgBa;
