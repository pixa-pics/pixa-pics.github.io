import * as React from "react";

function SvgSo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="0 0 81 54"
      {...props}
    >
      <path fill="#4189DD" d="M0 0h81v54H0z" />
      <g transform="matrix(13 0 0 13 40.5 27)">
        <g id="SO_svg__b">
          <path
            id="SO_svg__a"
            fill="#FFF"
            transform="rotate(18 3.157 -.5)"
            d="M0 0v1h.5z"
          />
          <use xlinkHref="#SO_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#SO_svg__b" transform="rotate(72)" />
        <use xlinkHref="#SO_svg__b" transform="rotate(-72)" />
        <use xlinkHref="#SO_svg__b" transform="rotate(144)" />
        <use xlinkHref="#SO_svg__b" transform="rotate(-144)" />
      </g>
    </svg>
  );
}

export default SvgSo;
