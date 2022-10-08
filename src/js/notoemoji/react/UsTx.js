import * as React from "react";

function SvgUsTx(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1080}
      height={720}
      {...props}
    >
      <path fill="#fff" d="M0 0h1080v720H0z" />
      <path fill="#bf0a30" d="M0 360h1080v360H0z" />
      <path fill="#002868" d="M0 0h360v720H0z" />
      <g transform="translate(180 360)" fill="#fff">
        <g id="US-TX_svg__b">
          <path
            id="US-TX_svg__a"
            d="M0-135V0h67.5"
            transform="rotate(18 0 -135)"
          />
          <use xlinkHref="#US-TX_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#US-TX_svg__b" transform="rotate(72)" />
        <use xlinkHref="#US-TX_svg__b" transform="rotate(144)" />
        <use xlinkHref="#US-TX_svg__b" transform="rotate(216)" />
        <use xlinkHref="#US-TX_svg__b" transform="rotate(288)" />
      </g>
    </svg>
  );
}

export default SvgUsTx;
