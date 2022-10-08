import * as React from "react";

function SvgUz(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={500}
      height={250}
      {...props}
    >
      <path fill="#1eb53a" d="M0 0h500v250H0z" />
      <path fill="#0099b5" d="M0 0h500v125H0z" />
      <path fill="#ce1126" d="M0 80h500v90H0z" />
      <path fill="#fff" d="M0 85h500v80H0z" />
      <circle cx={70} cy={40} r={30} fill="#fff" />
      <circle cx={80} cy={40} r={30} fill="#0099b5" />
      <g fill="#fff" transform="translate(136 64)">
        <g id="UZ_svg__e">
          <g id="UZ_svg__d">
            <g id="UZ_svg__c">
              <g id="UZ_svg__b">
                <path id="UZ_svg__a" d="M0-6v6h3" transform="rotate(18 0 -6)" />
                <use xlinkHref="#UZ_svg__a" transform="scale(-1 1)" />
              </g>
              <use xlinkHref="#UZ_svg__b" transform="rotate(72)" />
            </g>
            <use xlinkHref="#UZ_svg__b" transform="rotate(-72)" />
            <use xlinkHref="#UZ_svg__c" transform="rotate(144)" />
          </g>
          <use xlinkHref="#UZ_svg__d" y={-24} />
          <use xlinkHref="#UZ_svg__d" y={-48} />
        </g>
        <use xlinkHref="#UZ_svg__e" x={24} />
        <use xlinkHref="#UZ_svg__e" x={48} />
        <use xlinkHref="#UZ_svg__d" x={-48} />
        <use xlinkHref="#UZ_svg__d" x={-24} />
        <use xlinkHref="#UZ_svg__d" x={-24} y={-24} />
      </g>
    </svg>
  );
}

export default SvgUz;
