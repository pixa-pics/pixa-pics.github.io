import * as React from "react";

function SvgWs(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={2880}
      height={1440}
      {...props}
    >
      <defs>
        <path id="WS_svg__a" d="M0 0l.309.951L-.5.363h1l-.809.588z" />
      </defs>
      <path fill="#ce1126" d="M0 0h2880v1440H0z" />
      <path fill="#002b7f" d="M0 0h1440v720H0z" />
      <g fill="#fff">
        <use xlinkHref="#WS_svg__a" transform="matrix(160 0 0 160 720 30)" />
        <use xlinkHref="#WS_svg__a" transform="matrix(160 0 0 160 500 210)" />
        <use xlinkHref="#WS_svg__a" transform="matrix(150 0 0 150 945 180)" />
        <use
          xlinkHref="#WS_svg__a"
          transform="matrix(100 0 0 100 830 364.894)"
        />
        <use
          xlinkHref="#WS_svg__a"
          transform="matrix(200 0 0 200 720 499.789)"
        />
      </g>
    </svg>
  );
}

export default SvgWs;
