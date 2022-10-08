import * as React from "react";

function SvgIl(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={660}
      height={480}
      viewBox="0 0 220 160"
      {...props}
    >
      <defs>
        <path
          id="IL_svg__a"
          stroke="#0038b8"
          strokeWidth={5.5}
          fillOpacity={0}
          d="M0-29.141l-25.237 43.712h50.474z"
        />
      </defs>
      <path fill="#fff" d="M0 0h220v160H0z" />
      <path fill="#0038b8" d="M0 15h220v25H0zm0 105h220v25H0z" />
      <use xlinkHref="#IL_svg__a" transform="translate(110 80)" />
      <use xlinkHref="#IL_svg__a" transform="rotate(180 55 40)" />
    </svg>
  );
}

export default SvgIl;
