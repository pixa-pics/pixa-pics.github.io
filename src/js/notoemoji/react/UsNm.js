import * as React from "react";

function SvgUsNm(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={800}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path fill="gold" d="M0 0h1200v800H0z" />
      <g transform="translate(600 400)" stroke="#bf0a30">
        <path
          id="US-NM_svg__a"
          d="M157.344 38.281h-314.688M191.375 12.75h-382.75m382.75-25.5h-382.75m348.719-25.531h-314.688"
          strokeWidth={17}
          strokeLinecap="round"
        />
        <use transform="rotate(90)" xlinkHref="#US-NM_svg__a" />
        <circle fill="gold" r={64.313} strokeWidth={10.625} />
      </g>
    </svg>
  );
}

export default SvgUsNm;
