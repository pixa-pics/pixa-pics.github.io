import * as React from "react";

function SvgGg(props) {
  return (
    <svg
      width={900}
      height={600}
      viewBox="0 0 36 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0h36v24h-72z" fill="#fff" />
      <path d="M21 0v9h15v6H21v9h-6v-9H0V9h15V0z" fill="#e8112d" />
      <path
        d="M9 14l1-1h7v7l-1 1h4l-1-1v-7h7l1 1v-4l-1 1h-7V4l1-1h-4l1 1v7h-7l-1-1z"
        fill="#f9dd16"
      />
    </svg>
  );
}

export default SvgGg;
