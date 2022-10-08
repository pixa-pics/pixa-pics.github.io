import * as React from "react";

function SvgUsAk(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1416}
      height={1000}
      {...props}
    >
      <defs>
        <g id="US-AK_svg__c" fill="#ffb612">
          <g id="US-AK_svg__b">
            <path
              id="US-AK_svg__a"
              transform="rotate(18 3.157 -.5)"
              d="M0 0v1h.5z"
            />
            <use xlinkHref="#US-AK_svg__a" transform="scale(-1 1)" />
          </g>
          <use xlinkHref="#US-AK_svg__b" transform="rotate(72)" />
          <use xlinkHref="#US-AK_svg__b" transform="rotate(-72)" />
          <use xlinkHref="#US-AK_svg__b" transform="rotate(144)" />
          <use xlinkHref="#US-AK_svg__b" transform="rotate(-144)" />
        </g>
      </defs>
      <path fill="#0F204B" d="M0 0h1416v1000H0z" />
      <use xlinkHref="#US-AK_svg__c" transform="matrix(52 0 0 52 1158 182)" />
      <use
        id="US-AK_svg__d"
        xlinkHref="#US-AK_svg__c"
        transform="matrix(31 0 0 31 229 396)"
      />
      <use xlinkHref="#US-AK_svg__d" x={167} y={62} />
      <use xlinkHref="#US-AK_svg__d" x={250} y={151} />
      <use xlinkHref="#US-AK_svg__d" x={334} y={244} />
      <use xlinkHref="#US-AK_svg__d" x={584} y={333} />
      <use xlinkHref="#US-AK_svg__d" x={323} y={375} />
      <use xlinkHref="#US-AK_svg__d" x={511} y={437} />
    </svg>
  );
}

export default SvgUsAk;
