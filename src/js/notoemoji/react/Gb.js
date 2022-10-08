import * as React from "react";

function SvgGb(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 30"
      width={1200}
      height={600}
      {...props}
    >
      <clipPath id="GB_svg__a">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <path d="M0 0v30h60V0z" fill="#00247d" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth={6} />
      <path
        d="M0 0l60 30m0-30L0 30"
        clipPath="url(#GB_svg__a)"
        stroke="#cf142b"
        strokeWidth={4}
      />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth={10} />
      <path d="M30 0v30M0 15h60" stroke="#cf142b" strokeWidth={6} />
    </svg>
  );
}

export default SvgGb;
