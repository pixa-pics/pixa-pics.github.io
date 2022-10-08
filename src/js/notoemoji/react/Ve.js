import * as React from "react";

function SvgVe(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="0 0 180 120"
      {...props}
    >
      <defs>
        <g id="VE_svg__d" transform="translate(0 -36)">
          <g id="VE_svg__c">
            <g id="VE_svg__b">
              <path
                d="M0-5v5h3z"
                fill="#fff"
                transform="rotate(18 0 -5)"
                id="VE_svg__a"
              />
              <use xlinkHref="#VE_svg__a" transform="scale(-1 1)" />
            </g>
            <use xlinkHref="#VE_svg__b" transform="rotate(72)" />
          </g>
          <use xlinkHref="#VE_svg__b" transform="rotate(-72)" />
          <use xlinkHref="#VE_svg__c" transform="rotate(144)" />
        </g>
      </defs>
      <path d="M0 0h180v120H0z" fill="#cf142b" />
      <path d="M0 0h180v80H0z" fill="#00247d" />
      <path d="M0 0h180v40H0z" fill="#fc0" />
      <g transform="translate(90 84)">
        <g id="VE_svg__f">
          <g id="VE_svg__e">
            <use xlinkHref="#VE_svg__d" transform="rotate(10)" />
            <use xlinkHref="#VE_svg__d" transform="rotate(30)" />
          </g>
          <use xlinkHref="#VE_svg__e" transform="rotate(40)" />
        </g>
        <use xlinkHref="#VE_svg__f" transform="rotate(-80)" />
      </g>
    </svg>
  );
}

export default SvgVe;
