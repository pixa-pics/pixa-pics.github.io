import * as React from "react";

function SvgSg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={4320}
      height={2880}
      {...props}
    >
      <path fill="#ed2939" d="M0 0h4320v1440H0z" />
      <path
        fill="#fff"
        d="M0 1440h4320v1440H0zm1481.678-720a541.5 541.5 0 11-1083 0 541.5 541.5 0 111083 0z"
      />
      <path
        fill="#ed2939"
        d="M1651.835 720a511.735 511.735 0 11-1023.47 0 511.735 511.735 0 111023.47 0z"
      />
      <path
        fill="#fff"
        id="SG_svg__a"
        d="M1007.195 733.064l-73.56-56.43-73.542 56.457 28.313-90.994-73.795-56.092 91.06.193 27.934-91.123 27.964 91.113 91.06-.226-73.777 56.119 28.343 90.983z"
      />
      <use xlinkHref="#SG_svg__a" transform="translate(577.189)" />
      <use xlinkHref="#SG_svg__a" transform="translate(288.889 -214.211)" />
      <use xlinkHref="#SG_svg__a" transform="translate(108 342.749)" />
      <use xlinkHref="#SG_svg__a" transform="translate(469.189 342.749)" />
    </svg>
  );
}

export default SvgSg;
