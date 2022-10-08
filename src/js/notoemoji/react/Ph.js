import * as React from "react";

function SvgPh(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={450}
      viewBox="0 0 180 90"
      {...props}
    >
      <path fill="#0038a8" d="M0 0h180v90H0z" />
      <path fill="#ce1126" d="M0 45h180v45H0z" />
      <path d="M77.942 45L0 90V0" fill="#fff" />
      <g transform="translate(28 45)" fill="#fcd116">
        <circle r={9} />
        <g id="PH_svg__d">
          <g id="PH_svg__c">
            <g id="PH_svg__b">
              <path d="M-1 0l.062.062L0 0l-.938-.062z" transform="scale(19)" />
              <path
                id="PH_svg__a"
                d="M-.884.116l.05.05L0 0z"
                transform="scale(19.2381)"
              />
              <use xlinkHref="#PH_svg__a" transform="scale(1 -1)" />
            </g>
            <use xlinkHref="#PH_svg__b" transform="rotate(45)" />
          </g>
          <use xlinkHref="#PH_svg__c" transform="rotate(90)" />
        </g>
        <use xlinkHref="#PH_svg__d" transform="rotate(180)" />
        <g transform="translate(-2.02)">
          <g id="PH_svg__f" transform="translate(37.962)">
            <path
              id="PH_svg__e"
              d="M5 0L1.618 1.176l-.073 3.58-2.163-2.854-3.427 1.037L-2 0z"
            />
            <use xlinkHref="#PH_svg__e" transform="scale(1 -1)" />
          </g>
          <use xlinkHref="#PH_svg__f" transform="rotate(120)" />
          <use xlinkHref="#PH_svg__f" transform="rotate(-120)" />
        </g>
      </g>
    </svg>
  );
}

export default SvgPh;
