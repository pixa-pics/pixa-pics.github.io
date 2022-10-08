import * as React from "react";

function SvgNa(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="0 0 90 60"
      {...props}
    >
      <path d="M90 0H0v60z" fill="#003580" />
      <path d="M0 60h90V0z" fill="#009543" />
      <path d="M0 60L90 0" stroke="#fff" strokeWidth={20} />
      <path d="M0 60L90 0" stroke="#d21034" strokeWidth={15} />
      <g fill="#ffce00" transform="translate(18 16.341)">
        <g id="NA_svg__b">
          <path id="NA_svg__a" d="M0 10l1.553-4.204h-3.106z" />
          <use xlinkHref="#NA_svg__a" transform="rotate(90)" />
          <use xlinkHref="#NA_svg__a" transform="rotate(180)" />
          <use xlinkHref="#NA_svg__a" transform="rotate(270)" />
        </g>
        <use xlinkHref="#NA_svg__b" transform="rotate(30)" />
        <use xlinkHref="#NA_svg__b" transform="rotate(60)" />
        <circle r={5.5} stroke="#003580" />
      </g>
    </svg>
  );
}

export default SvgNa;
