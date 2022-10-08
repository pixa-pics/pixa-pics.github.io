import * as React from "react";

function SvgCd(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={800} height={600} {...props}>
      <path d="M0 0h800v600H0z" fill="#007fff" />
      <path
        d="M36 120h84l26-84 26 84h84l-68 52 26 84-68-52-68 52 26-84-68-52zM750 0L0 450v150h50l750-450V0h-50"
        fill="#f7d618"
      />
      <path d="M800 0L0 480v120l800-480V0" fill="#ce1021" />
    </svg>
  );
}

export default SvgCd;
