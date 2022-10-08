import * as React from "react";

function SvgNc(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={450}
      {...props}
    >
      <path fill="#009543" d="M0 0h900v450H0z" />
      <path fill="#ed4135" d="M0 0h900v300H0z" />
      <path fill="#0035ad" d="M0 0h900v150H0z" />
      <circle
        stroke="#000"
        strokeWidth={5}
        fill="#fae600"
        cx={300}
        cy={225}
        r={147.48}
      />
      <path
        stroke="#000"
        strokeWidth={6}
        d="M275 247h50m-50-37h50M300 78v252"
      />
      <path d="M240.62 360.419c60.191 24.58 116.608 1.51 116.608 1.51s-21.297-23.048-32.214-32.047c-10.653-8.778-41.991-8.431-52.685 0-8.924 7.038-34.52 32.97-31.709 30.537z" />
      <ellipse cx={300} cy={293} rx={16.5} ry={24} />
      <ellipse cx={300} cy={228.5} rx={20} ry={12.66} />
      <circle cx={300} cy={170} r={20} />
      <path d="M324 95.5c-.006-.013 1.733 2.87-1.913 9.436-17.426 31.383-34.913 32.061-38.232 34.764-3.658 2.978-5.202 2.774-5.202 2.774.261-2.688.504-13.679.695-14.738 2.645-14.663 24.796-14.461 42.132-29.476 2.708-2.345 2.514-2.773 2.514-2.773z" />
      <path
        d="M265.5 163s3.914 11.23 4.5 22.5c.935 17.997 18.18 18.5 30 18.5v-10c-8.859 0-16.553-1.317-23-14.5-3.18-6.503-11.5-16.5-11.5-16.5zm-.5 145s6.296-7.765 13.662-25.975C282.505 272.525 291.612 267 300 267v-14c-19.028 0-28.15 7.055-29.113 17.363C268.91 291.541 265 308 265 308z"
        id="NC_svg__a"
      />
      <use xlinkHref="#NC_svg__a" transform="matrix(-1 0 0 1 600 0)" />
    </svg>
  );
}

export default SvgNc;
