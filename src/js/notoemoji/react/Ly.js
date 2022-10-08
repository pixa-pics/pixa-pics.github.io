import * as React from "react";

function SvgLy(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={960} height={480} {...props}>
      <path fill="#239e46" d="M0 0h960v480H0z" />
      <path d="M0 0h960v360H0z" />
      <path fill="#e70013" d="M0 0h960v120H0z" />
      <circle cx={480} cy={240} r={60} fill="#fff" />
      <circle cx={492.132} cy={240} r={52.132} />
      <path
        d="M509.175 240l80.7-26.221L540 282.426v-84.852l49.875 68.647z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgLy;
