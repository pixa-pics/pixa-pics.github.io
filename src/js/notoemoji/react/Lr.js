import * as React from "react";

function SvgLr(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1140}
      height={600}
      viewBox="0 0 209 110"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path fill="#bf0a30" d="M0 0h209v110H0z" />
      <path
        d="M0 15h209M0 35h209M0 55h209M0 75h209M0 95h209"
        stroke="#fff"
        strokeWidth={10}
      />
      <path fill="#002868" d="M0 0h50v50H0z" />
      <g transform="matrix(15 0 0 15 25 25)">
        <g id="LR_svg__b">
          <path
            id="LR_svg__a"
            fill="#fff"
            transform="rotate(18 3.157 -.5)"
            d="M0 0v1h.5z"
          />
          <use xlinkHref="#LR_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#LR_svg__b" transform="rotate(72)" />
        <use xlinkHref="#LR_svg__b" transform="rotate(-72)" />
        <use xlinkHref="#LR_svg__b" transform="rotate(144)" />
        <use xlinkHref="#LR_svg__b" transform="rotate(-144)" />
      </g>
    </svg>
  );
}

export default SvgLr;
