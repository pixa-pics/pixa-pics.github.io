import * as React from "react";

function SvgNu(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={600}
      height={300}
      viewBox="0 0 120 60"
      {...props}
    >
      <clipPath id="NU_svg__a">
        <path d="M0 0v15h70v15H60zm0 30v10h30V0h30z" />
      </clipPath>
      <path fill="#002868" d="M0 0h120v60H0z" />
      <g stroke="#cf142b" strokeWidth={6}>
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" />
        <path
          d="M0 0l60 30m0-30L0 30"
          clipPath="url(#NU_svg__a)"
          strokeWidth={4}
        />
        <path d="M30 0v40M0 15h70" stroke="#fff" strokeWidth={10} />
        <path d="M30 0v40M0 15h70" />
      </g>
      <path d="M60 0h60v60H0V30h60z" fill="#fcd116" />
      <g transform="translate(30 15)">
        <g transform="scale(5.1039)">
          <circle r={1} fill="#002868" />
          <path
            id="NU_svg__b"
            d="M0-513674l301930 929245-790463-574305h977066l-790463 574305"
            fill="#fcd116"
            transform="scale(0)"
          />
        </g>
        <use xlinkHref="#NU_svg__b" transform="matrix(3 0 0 3 -17.5 .29)" />
        <use xlinkHref="#NU_svg__b" transform="matrix(3 0 0 3 17.5 .29)" />
        <use xlinkHref="#NU_svg__b" transform="matrix(3 0 0 3 0 10.29)" />
        <use xlinkHref="#NU_svg__b" transform="matrix(3 0 0 3 0 -9.71)" />
      </g>
    </svg>
  );
}

export default SvgNu;
