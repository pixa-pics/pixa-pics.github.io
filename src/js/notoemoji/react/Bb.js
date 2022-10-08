import * as React from "react";

function SvgBb(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1500}
      height={1000}
      viewBox="0 0 24000 16000"
      {...props}
    >
      <path fill="#00267f" d="M0 0h24000v16000H0z" />
      <path fill="#ffc726" d="M8000 0h8000v16000H8000z" />
      <path
        id="BB_svg__a"
        fill="#000"
        d="M12000 4124c-260 709-525 1447-1092 2012 176-58 484-110 682-105v2982l-842 125c-30-3-40-50-40-114-81-926-300-1704-552-2509-18-110-337-530-91-456 30 4 359 138 307 74-448-464-1103-798-1739-897-56-14-89 14-39 79 844 1299 1550 2832 1544 4651 328 0 1123-194 1452-194v2104h415l95-5876z"
      />
      <use xlinkHref="#BB_svg__a" transform="matrix(-1 0 0 1 24000 0)" />
    </svg>
  );
}

export default SvgBb;
