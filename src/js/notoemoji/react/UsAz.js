import * as React from "react";

function SvgUsAz(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1000}
      height={666.667}
      {...props}
    >
      <path d="M0 0h1000v666.667H0z" fill="#002868" />
      <path d="M0 0h1000v333.333H0z" fill="#bf0a30" />
      <use
        transform="matrix(-1 0 0 1 1000 0)"
        width={1000}
        height={666.667}
        xlinkHref="#US-AZ_svg__a"
      />
      <use
        transform="matrix(-1 0 0 1 1000 0)"
        width={1000}
        height={666.667}
        xlinkHref="#US-AZ_svg__b"
      />
      <use
        transform="matrix(-1 0 0 1 1000 0)"
        width={1000}
        height={666.667}
        xlinkHref="#US-AZ_svg__c"
      />
      <path d="M0 217.033l500 116.3L0 78.134z" fill="#f0f" />
      <path
        d="M0 217.033l500 116.3L0 78.134z"
        id="US-AZ_svg__a"
        fill="#fed700"
        fillOpacity={1}
        stroke="none"
      />
      <path
        d="M114.6 0L500 333.333 258.7 0z"
        id="US-AZ_svg__b"
        fill="#fed700"
        fillOpacity={1}
        stroke="none"
      />
      <path
        d="M369.8 0L500 333.333 453.1 0z"
        id="US-AZ_svg__c"
        fill="#fed700"
        fillOpacity={1}
        stroke="none"
      />
      <path
        d="M500 166.477L608.368 500 324.657 293.871h350.687L391.632 500z"
        fill="#ce5c17"
      />
    </svg>
  );
}

export default SvgUsAz;
