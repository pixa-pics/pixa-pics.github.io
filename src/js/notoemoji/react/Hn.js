import * as React from "react";

function SvgHn(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1000}
      height={500}
      viewBox="0 0 72 36"
      {...props}
    >
      <path d="M0 0h72v36H0z" fill="#0073cf" />
      <path d="M0 12h72v12H0z" fill="#fff" />
      <g id="HN_svg__c" transform="matrix(2 0 0 2 36 18)" fill="#0073cf">
        <g id="HN_svg__b">
          <path
            id="HN_svg__a"
            transform="rotate(18 3.157 -.5)"
            d="M0 0v1h.5z"
          />
          <use xlinkHref="#HN_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#HN_svg__b" transform="rotate(72)" />
        <use xlinkHref="#HN_svg__b" transform="rotate(-72)" />
        <use xlinkHref="#HN_svg__b" transform="rotate(144)" />
        <use xlinkHref="#HN_svg__b" transform="rotate(-144)" />
      </g>
      <use xlinkHref="#HN_svg__c" transform="translate(10 -3.2)" />
      <use xlinkHref="#HN_svg__c" transform="translate(10 2.8)" />
      <use xlinkHref="#HN_svg__c" transform="translate(-10 -3.2)" />
      <use xlinkHref="#HN_svg__c" transform="translate(-10 2.8)" />
    </svg>
  );
}

export default SvgHn;
