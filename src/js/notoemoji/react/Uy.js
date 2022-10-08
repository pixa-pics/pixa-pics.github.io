import * as React from "react";

function SvgUy(props) {
  return (
    <svg
      width={900}
      height={600}
      viewBox="-5 -5 27 18"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path fill="#fff" d="M-5-5h27v18H-5z" />
      <path
        d="M5-3h17v2H5zm0 4h17v2H5zM-5 5h27v2H-5zm0 4h27v2H-5z"
        fill="#0038a8"
      />
      <g
        transform="scale(.11)"
        fill="#fcd116"
        stroke="#7B3F00"
        strokeMiterlimit={20}
        strokeWidth={0.6}
      >
        <g id="UY_svg__c" stroke="#7B3F00">
          <g id="UY_svg__b">
            <g id="UY_svg__a" stroke="#7B3F00">
              <path
                d="M1.5 9L6 12c-8 13 1 15-6 21 3-7-3-5-3-17"
                strokeLinecap="square"
                transform="rotate(22.5)"
              />
              <path
                d="M-2.057 8.89l-1.982 1.375.088.053c-3.384 5.577-3.959 9.866-4.452 13.183-.247 1.659-.47 3.08-1.037 4.298a5.658 5.658 0 01-1.626 2.073c6.266-2.982.49-8.145 12.018-16.489z"
                fill="#7B3F00"
                strokeLinecap="square"
                strokeWidth={0.273}
              />
              <path
                d="M0 11c-2 13 4.5 17 0 22"
                fill="none"
                transform="rotate(22.5)"
              />
              <path d="M0 0h-6l6 33L6 0H0v33" />
              <path d="M0 0h6-6v33L6 0" fill="#7B3F00" stroke="none" />
            </g>
            <use transform="rotate(45)" xlinkHref="#UY_svg__a" />
          </g>
          <use transform="rotate(90)" xlinkHref="#UY_svg__b" />
        </g>
        <use transform="rotate(180)" xlinkHref="#UY_svg__c" />
        <circle r={11} />
      </g>
      <g transform="scale(.011)" fill="#7B3F00">
        <g id="UY_svg__d">
          <path d="M81-44c-7 8-11-6-36-6S16-35 12-38s21-21 29-22 31 7 40 16m-29 9c7 6 1 19-6 19S26-28 32-36" />
          <path d="M19-26c1-12 11-14 27-14s23 12 29 15c-7 0-13-10-29-10s-16 0-27 10m3 2c4-6 9 6 20 6s17-3 24-8-10 12-21 12-26-6-23-10" />
          <path d="M56-17c13-7 5-17 0-19 2 2 10 12 0 19M0 43c6 0 8-2 16-2s27 11 38 7c-23 9-14 3-54 3h-5m63 6c-4-7-3-5-11-16 8 6 10 9 11 16M0 67c25 0 21-5 54-19-24 3-29 11-54 11h-5m5-29c7 0 9-5 17-5s19 3 24 7c1 1-3-8-11-9S25 9 16 7c0 4 3 3 4 9 0 5-9 5-11 0 2 8-4 8-9 8" />
        </g>
        <use transform="scale(-1 1)" xlinkHref="#UY_svg__d" />
        <path d="M0 76c-5 0-18 3 0 3s5-3 0-3" />
      </g>
    </svg>
  );
}

export default SvgUy;
