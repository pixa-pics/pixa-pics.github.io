import * as React from "react";

function SvgCaNl(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1000}
      height={500}
      {...props}
    >
      <path d="M0 0h1000v500H0z" fill="#fff" />
      <path d="M30 280v170l310-170zm370 30v160H110z" fill="#002373" />
      <path d="M460 300v170h510z" fill="#cd0019" />
      <path d="M480 330v120h370z" fill="#fff" />
      <path d="M460 220h490l25 30-25 30H460l30-30z" fill="#cd0019" />
      <path d="M490 230h450l20 20-20 20H490l20-20z" fill="#f8d80e" />
      <path d="M30 220V50l310 170zm370-30V30H110z" fill="#002373" />
      <path d="M460 200V30h510z" fill="#cd0019" />
      <path d="M480 170V50h370z" fill="#fff" />
    </svg>
  );
}

export default SvgCaNl;
