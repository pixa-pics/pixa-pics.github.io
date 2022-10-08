import * as React from "react";

function SvgMy(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={2800}
      height={1400}
      {...props}
    >
      <path d="M0 0h2800v1400H0z" fill="#cc0001" />
      <path id="MY_svg__a" d="M0 1300h2800v100H0z" fill="#fff" />
      <use transform="translate(0 -200)" xlinkHref="#MY_svg__a" />
      <use transform="translate(0 -400)" xlinkHref="#MY_svg__a" />
      <use transform="translate(0 -600)" xlinkHref="#MY_svg__a" />
      <use transform="translate(0 -800)" xlinkHref="#MY_svg__a" />
      <use transform="translate(0 -1000)" xlinkHref="#MY_svg__a" />
      <use transform="translate(0 -1200)" xlinkHref="#MY_svg__a" />
      <path d="M0 0h1400v800H0z" fill="#010066" />
      <path
        d="M576 100c-166.146 0-301 134.406-301 300s134.854 300 301 300c60.027 0 115.955-17.564 162.927-47.783-27.353 9.44-56.71 14.602-87.271 14.602-147.327 0-266.897-119.172-266.897-266.01 0-146.837 119.57-266.01 266.897-266.01 32.558 0 63.746 5.815 92.602 16.468C696.217 118.91 638.305 100 576 100z"
        fill="#fc0"
      />
      <path
        d="M1075.175 556.178l-126.792-66.152 37.488 135.388-84.803-113.254-26.457 137.845L848.59 512.08l-85.163 113 37.916-135.277-126.999 65.771 94.344-105.834-143.685 5.518 132.086-55.432-131.909-55.829 143.663 5.948-94.006-106.117 126.792 66.152-37.488-135.388 84.803 113.254L875.4 150.001l26.02 137.924 85.163-112.999-37.918 135.278 127-65.772-94.344 105.835 143.685-5.517-132.086 55.431 131.909 55.83-143.666-5.951z"
        fill="#fc0"
      />
    </svg>
  );
}

export default SvgMy;
