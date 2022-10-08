import * as React from "react";

function SvgPr(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="0 0 45 30"
      {...props}
    >
      <path fill="#ED0000" d="M0 0h45v30H0z" />
      <path stroke="#FFF" strokeWidth={6} d="M0 9h45M0 21h45" />
      <path fill="#0050F0" d="M0 0l25.98 15L0 30z" />
      <g fill="#FFF" transform="matrix(5 0 0 5 8.66 15)">
        <g id="PR_svg__b">
          <path
            id="PR_svg__a"
            transform="rotate(18 3.157 -.5)"
            d="M0 0v1h.5z"
          />
          <use xlinkHref="#PR_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#PR_svg__b" transform="rotate(72)" />
        <use xlinkHref="#PR_svg__b" transform="rotate(-72)" />
        <use xlinkHref="#PR_svg__b" transform="rotate(144)" />
        <use xlinkHref="#PR_svg__b" transform="rotate(-144)" />
      </g>
    </svg>
  );
}

export default SvgPr;
