import * as React from "react";

function SvgAg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={690}
      height={460}
      viewBox="0 0 138 92"
      {...props}
    >
      <path fill="#fff" d="M0 0h138v92H0z" />
      <path d="M0 0h138v46H0z" />
      <g transform="translate(69 36)">
        <g id="AG_svg__b">
          <path id="AG_svg__a" d="M-30 0L0-5.742V5.742z" fill="#fcd116" />
          <use xlinkHref="#AG_svg__a" transform="rotate(22.5)" />
          <use xlinkHref="#AG_svg__a" transform="rotate(45)" />
        </g>
        <use xlinkHref="#AG_svg__b" transform="rotate(67.5)" />
        <use xlinkHref="#AG_svg__b" transform="rotate(135)" />
      </g>
      <path fill="#0072c6" d="M0 36h138v20H0z" />
      <path d="M0 0v92h138V0L69 92z" fill="#ce1126" />
    </svg>
  );
}

export default SvgAg;
