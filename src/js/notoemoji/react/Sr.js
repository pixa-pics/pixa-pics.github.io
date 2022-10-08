import * as React from "react";

function SvgSr(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={900} height={600} {...props}>
      <path fill="#377e3f" d="M0 0h900v600H0z" />
      <path fill="#fff" d="M0 120h900v360H0z" />
      <path fill="#b40a2d" d="M0 180h900v240H0z" />
      <path
        d="M450 191.459l70.534 217.082-184.661-134.164h228.254L379.466 408.541z"
        fill="#ecc81d"
      />
    </svg>
  );
}

export default SvgSr;
