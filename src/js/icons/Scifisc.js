import * as React from "react"

function Scifisc(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1280 1280"
            width={1706.7}
            height={1706.7}
            {...props}
        >
            <defs>
                <clipPath id="A">
                    <path d="M0 0h1280v1280H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#A)">
                <path fillOpacity={0} d="M0 0h1280v1280H0z" />
                <path
                    d="m460.5 120-19.5-4-155 106-30.3 17.7-2.2 1.3 2.5 4.3 2.2-1.3L640 21l382.7 223.3 2.2 1.3 2.5-4.3-2.2-1.3-29.8-17.4L840 116l-20 4.2L640 15 460.5 120zm-30.3 1131.8 2.2 1.2-2.5 4.3-2.2-1.2L41 1035.8l2-446v-2.5h5v2.5l-2 443 384.2 219zm801.3-662v-2.5h5v2.5l2.5 445.2-387.3 221.3-2.2 1.2-2.5-4.3 2.2-1.2 384.8-220-2.5-442.2z"
                    fillRule="evenodd"
                    fill={props.color}
                />
                <path
                    d="M640 264v445L257 933m383-224 384 224"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    strokeWidth={2}
                    stroke={props.color}
                    strokeLinecap="square"
                    strokeMiterlimit={3}
                />
                <g fill={props.color}>
                    <path
                        d="M600 599.8a10 10 0 1 1 20 0 10 10 0 1 1-20 0zm0 30a10 10 0 1 1 20 0 10 10 0 1 1-20 0zm0 30a10 10 0 1 1 20 0 10 10 0 1 1-20 0zm0 30a10 10 0 1 1 20 0 10 10 0 1 1-20 0zm-63 53.7a10 10 0 1 1-10-17.3 10 10 0 0 1 10 17.3zm26-15a10 10 0 1 1-10-17.3 10 10 0 1 1 10 17.3zm26-15a10 10 0 1 1-10-17.3 10 10 0 0 1 10 17.3zM754 726a10 10 0 1 1-10 17.3 10 10 0 0 1 10-17.3zm-26-15a10 10 0 1 1-10 17.3 10 10 0 0 1 10-17.3zm-26-15a10 10 0 1 1-10 17.3 10 10 0 0 1 10-17.3zm-26-15a10 10 0 1 1-10 17.3 10 10 0 0 1 10-17.3zm-15-81.3a10 10 0 1 1 20 0 10 10 0 1 1-20 0zm0 30a10 10 0 1 1 20 0 10 10 0 1 1-20 0zm0 30a10 10 0 1 1 20 0 10 10 0 1 1-20 0zm-93.5 138.7a10 10 0 1 1-10-17.3 10 10 0 1 1 10 17.3zm26-15a10 10 0 1 1-10-17.3 10 10 0 0 1 10 17.3zm26-15a10 10 0 1 1-10-17.3 10 10 0 1 1 10 17.3zm26-15a10 10 0 1 1-10-17.3 10 10 0 1 1 10 17.3zm78 27.7a10 10 0 1 1-10 17.3 10 10 0 1 1 10-17.3zm-26-15a10 10 0 1 1-10 17.3 10 10 0 1 1 10-17.3zm-26-15a10 10 0 1 1-10 17.3 10 10 0 1 1 10-17.3z"
                        fillRule="evenodd"
                        fillOpacity={0.3}
                    />
                    <path fillOpacity={0.2} d="M640.5 779.8 795.2 868H485.8z" />
                </g>
                <g clipPath="url(#B)">
                    <text
                        transform="translate(485.8 877.5)"
                        fontFamily="Open Sans"
                        fontSize={7}
                        fill="#fff"
                    >
                        {`DATATARGET: @${props.username || "null"}`}
                    </text>
                </g>
                <defs>
                    <clipPath id="B">
                        <path transform="translate(485.8 870)" d="M0 0h305.2v9.5H0z" />
                    </clipPath>
                </defs>
                <path fill={props.color} d="M485.8 879.5H504v1h-18.2z" />
                <path d="M434.2 1114h460.3v-65h-508v37.3l47.7 27.7z" fillOpacity={0.3} />
                <g clipPath="url(#C)">
                    <text
                        transform="translate(420.5 1089.3)"
                        fontFamily="Open Sans"
                        fontSize={20}
                        fill="#fff"
                    >
                        {"OPN: BLACKOPS - Declassified Artistic Situation"}
                    </text>
                </g>
                <defs>
                    <clipPath id="C">
                        <path transform="translate(420.5 1067.9)" d="M0 0h440v27.2H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}

export default Scifisc;