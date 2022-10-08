import * as React from "react";

function SvgBh(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1500}
      height={900}
      viewBox="0 0 150 90"
      {...props}
    >
      <path d="M0 0h150v90H0" fill="#fff" />
      <path
        fill="#ce1126"
        d="M150 0H37l23 9-23 9 23 9-23 9 23 9-23 9 23 9-23 9 23 9-23 9h113"
      />
    </svg>
  );
}

export default SvgBh;
