import * as React from "react";

function SvgMh(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={570}
      height={300}
      {...props}
    >
      <path fill="#003893" d="M0 0h570v300H0z" />
      <path d="M0 295.2V288L570 35v87.4z" fill="#fff" />
      <path d="M0 290.4v-4.8L570 4.8v58.8z" fill="#dd7500" />
      <g fill="#fff" transform="translate(109.536 109.536)">
        <g id="MH_svg__b">
          <path d="M0-93L5.59 0H-5.59z" />
          <path
            id="MH_svg__a"
            d="M0-66.588L6.824 0H-6.824z"
            transform="rotate(15)"
          />
          <use xlinkHref="#MH_svg__a" transform="rotate(15)" />
          <use xlinkHref="#MH_svg__a" transform="rotate(30)" />
          <use xlinkHref="#MH_svg__a" transform="rotate(45)" />
          <use xlinkHref="#MH_svg__a" transform="rotate(60)" />
        </g>
        <use xlinkHref="#MH_svg__b" transform="rotate(90)" />
        <use xlinkHref="#MH_svg__b" transform="rotate(180)" />
        <use xlinkHref="#MH_svg__b" transform="rotate(270)" />
      </g>
    </svg>
  );
}

export default SvgMh;
