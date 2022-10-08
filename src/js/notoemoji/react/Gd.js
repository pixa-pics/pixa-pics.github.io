import * as React from "react";

function SvgGd(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={600}
      height={360}
      viewBox="0 0 500 300"
      {...props}
    >
      <defs>
        <g id="GD_svg__c">
          <g id="GD_svg__b">
            <path
              id="GD_svg__a"
              d="M0-1v1h.5"
              transform="rotate(18 0 -1)"
              fill="#fcd116"
            />
            <use xlinkHref="#GD_svg__a" transform="scale(-1 1)" />
          </g>
          <use xlinkHref="#GD_svg__b" transform="rotate(72)" />
          <use xlinkHref="#GD_svg__b" transform="rotate(144)" />
          <use xlinkHref="#GD_svg__b" transform="rotate(216)" />
          <use xlinkHref="#GD_svg__b" transform="rotate(288)" />
        </g>
      </defs>
      <path fill="#ce1126" d="M0 0h500v300H0z" />
      <path fill="#007a5e" d="M42 42h416v216H42z" />
      <path d="M42 42h416L42 258h416z" fill="#fcd116" />
      <circle cx={250} cy={150} r={36} fill="#ce1126" />
      <use xlinkHref="#GD_svg__c" transform="matrix(33 0 0 33 250 150)" />
      <use xlinkHref="#GD_svg__d" x={-100} />
      <use
        id="GD_svg__d"
        xlinkHref="#GD_svg__c"
        transform="matrix(19.5 0 0 19.5 250 21)"
      />
      <use xlinkHref="#GD_svg__d" x={100} />
      <use xlinkHref="#GD_svg__d" x={-100} y={258} />
      <use xlinkHref="#GD_svg__d" y={258} />
      <use xlinkHref="#GD_svg__d" x={100} y={258} />
      <path
        d="M67.749 150.41c4.504 8.39 13.265 17.52 20.916 20.73.123-8.52-2.9-19.44-7.034-28.14l-13.882 7.41z"
        fill="#ce1126"
      />
      <path
        d="M60.112 121.63c6.529 13.61-16.933 46.08 22.156 53.69-4.822-6.58-7.931-17.44-6.755-26.16 8.201 3.12 16.83 12.25 20.317 19.23 10.23-37.15-26.24-34.89-35.718-46.76z"
        fill="#fcd116"
      />
    </svg>
  );
}

export default SvgGd;
