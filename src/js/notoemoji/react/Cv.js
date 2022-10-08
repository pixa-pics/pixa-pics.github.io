import * as React from "react";

function SvgCv(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={510}
      height={300}
      {...props}
    >
      <path fill="#003893" d="M0 0h510v300H0z" />
      <path fill="#fff" d="M0 150h510v75H0z" />
      <path fill="#cf2027" d="M0 175h510v25H0z" />
      <g fill="#f7d116" transform="translate(191.25 187.5)">
        <g id="CV_svg__d">
          <g id="CV_svg__c" transform="translate(0 -75)">
            <g id="CV_svg__b">
              <path
                id="CV_svg__a"
                d="M0-15V0h7.5"
                transform="rotate(18 0 -15)"
              />
              <use xlinkHref="#CV_svg__a" transform="scale(-1 1)" />
            </g>
            <use xlinkHref="#CV_svg__b" transform="rotate(72)" />
            <use xlinkHref="#CV_svg__b" transform="rotate(144)" />
            <use xlinkHref="#CV_svg__b" transform="rotate(216)" />
            <use xlinkHref="#CV_svg__b" transform="rotate(288)" />
          </g>
          <use xlinkHref="#CV_svg__c" y={150} />
        </g>
        <use xlinkHref="#CV_svg__d" transform="rotate(72)" />
        <use xlinkHref="#CV_svg__d" transform="rotate(144)" />
        <use xlinkHref="#CV_svg__d" transform="rotate(216)" />
        <use xlinkHref="#CV_svg__d" transform="rotate(288)" />
      </g>
    </svg>
  );
}

export default SvgCv;
