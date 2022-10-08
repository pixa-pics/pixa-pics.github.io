import * as React from "react";

function SvgCn(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={900}
      height={600}
      viewBox="0 0 30 20"
      {...props}
    >
      <defs>
        <path
          id="CN_svg__a"
          d="M0-1L.588.809-.952-.309H.952L-.588.809z"
          fill="#ffde00"
        />
      </defs>
      <path fill="#de2910" d="M0 0h30v20H0z" />
      <use xlinkHref="#CN_svg__a" transform="matrix(3 0 0 3 5 5)" />
      <use xlinkHref="#CN_svg__a" transform="rotate(23.036 .093 25.536)" />
      <use xlinkHref="#CN_svg__a" transform="rotate(45.87 1.273 16.18)" />
      <use xlinkHref="#CN_svg__a" transform="rotate(69.945 .996 12.078)" />
      <use xlinkHref="#CN_svg__a" transform="rotate(20.66 -19.689 31.932)" />
    </svg>
  );
}

export default SvgCn;
