import * as React from "react";

function SvgVn(props) {
  return (
    <svg
      width={900}
      height={600}
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#da251d" d="M0 0h30v20H0z" />
      <path fill="#ff0" d="M15 4l-3.53 10.85 9.24-6.7H9.29l9.24 6.7z" />
    </svg>
  );
}

export default SvgVn;
