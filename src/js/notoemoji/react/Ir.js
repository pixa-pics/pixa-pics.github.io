import * as React from "react";

function SvgIr(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={630}
      height={360}
      {...props}
    >
      <path fill="#da0000" d="M0 0h630v360H0z" />
      <path fill="#fff" d="M0 0h630v240H0z" />
      <path fill="#239f40" d="M0 0h630v120H0z" />
      <g transform="translate(8.4 100.4)">
        <g id="IR_svg__e">
          <g id="IR_svg__c" fill="none" stroke="#fff" strokeWidth={2}>
            <path
              id="IR_svg__b"
              d="M0 1h26M1 10V5h8v4h8V5h-5M4 9h2m20 0h-5V5h8m0-5v9h8V0m-4 0v9"
              transform="scale(1.4)"
            />
            <path id="IR_svg__a" d="M0 7h9m1 0h9" transform="scale(2.8)" />
            <use xlinkHref="#IR_svg__a" y={120} />
            <use xlinkHref="#IR_svg__b" y={145.2} />
          </g>
          <g id="IR_svg__d">
            <use xlinkHref="#IR_svg__c" x={56} />
            <use xlinkHref="#IR_svg__c" x={112} />
            <use xlinkHref="#IR_svg__c" x={168} />
          </g>
        </g>
        <use xlinkHref="#IR_svg__d" x={168} />
        <use xlinkHref="#IR_svg__e" x={392} />
      </g>
      <g fill="#da0000" transform="matrix(45 0 0 45 315 180)">
        <g id="IR_svg__f">
          <path d="M-.548.836A.912.912 0 00.329-.722 1 1 0 01-.548.836" />
          <path d="M.618.661A.764.764 0 00.422-.74 1 1 0 01.618.661M0 1l-.05-1L0-.787a.31.31 0 00.118.099V-.1l-.04.993zM-.02-.85L0-.831a.144.144 0 00.252-.137A.136.136 0 010-.925" />
        </g>
        <use xlinkHref="#IR_svg__f" transform="scale(-1 1)" />
      </g>
    </svg>
  );
}

export default SvgIr;
