import * as React from "react";

function SvgUsCo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1800}
      height={1200}
      {...props}
    >
      <path fill="#102e82" d="M0 0h1800v1200H0z" />
      <path fill="#FFF" d="M0 400h1800v400H0z" />
      <path d="M1130.81 750a400 400 0 110-300L760 600z" fill="#BF2C34" />
      <circle cx={760} cy={600} r={200} fill="#F6D047" />
    </svg>
  );
}

export default SvgUsCo;
