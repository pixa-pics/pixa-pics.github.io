import * as React from "react"

function HiveProfileOverlaySvg(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
                isolation: "isolate",
            }}
            viewBox="0 0 auto auto"
            width="4081pt"
            height="1418pt"
            {...props}
        >
            <defs>
                <clipPath id="prefix__a">
                    <path d="M0 0h4081v1418H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#prefix__a)">
                <path fill="none" d="M0 0h4081v1418H0z" />
                <clipPath id="prefix__b">
                    <path fill={props.color} d="M0 0h4081v1418H0z" />
                </clipPath>
                <g clipPath="url(#prefix__b)">
                    <linearGradient
                        id="prefix__c"
                        x1={0.146}
                        y1={0.146}
                        x2={0.854}
                        y2={0.854}
                        gradientTransform="matrix(1120 0 0 433 82 985)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="8.333%" stopColor={"#cdffa7"} />
                        <stop offset="28.75%" stopColor={"#ffe695"} />
                        <stop offset="29.167%" stopColor={"#a6fffe"} />
                        <stop offset="65%" stopColor={"#ffa7fe"} />
                        <stop offset="100%" stopColor={"#9394ff"} />
                    </linearGradient>
                    <mask id="prefix__d" x="-200%" y="-200%" width="400%" height="400%">
                        <rect x="-200%" y="-200%" width="400%" height="400%" fill={props.color} />
                        <path d="M580.948 985L1202 1418H82V985h498.948z" />
                    </mask>
                    <path
                        d="M580.948 985L1202 1418H82V985h498.948z"
                        fill="url(#prefix__c)"
                    />
                    <path
                        d="M580.948 985L1202 1418H82V985h498.948z"
                        fill="url(#prefix__c)"
                        mask="url(#prefix__d)"
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={2}
                        stroke="#000"
                        strokeOpacity={100}
                        strokeLinecap="square"
                        strokeMiterlimit={3}
                    />
                    <linearGradient
                        id="prefix__e"
                        x1={0.146}
                        y1={0.854}
                        x2={0.854}
                        y2={0.146}
                        gradientTransform="matrix(-1116 0 0 433 4034 985)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="8.333%" stopColor={"#ffffb3"} />
                        <stop offset="28.75%" stopColor={"#98fff7"} />
                        <stop offset="29.167%" stopColor={"#ca7fff"} />
                        <stop offset="65%" stopColor={"#9cb8ff"} />
                        <stop offset="100%" stopColor={"#ff9ac7"} />
                    </linearGradient>
                    <mask id="prefix__f" x="-200%" y="-200%" width="400%" height="400%">
                        <rect x="-200%" y="-200%" width="400%" height="400%" fill={props.color} />
                        <path d="M3536.834 985L2918 1418h1116V985h-497.166z" />
                    </mask>
                    <path
                        d="M3536.834 985L2918 1418h1116V985h-497.166z"
                        fill="url(#prefix__e)"
                    />
                    <path
                        d="M3536.834 985L2918 1418h1116V985h-497.166z"
                        fill="url(#prefix__e)"
                        mask="url(#prefix__f)"
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={2}
                        stroke="#000"
                        strokeOpacity={100}
                        strokeLinecap="square"
                        strokeMiterlimit={3}
                    />
                    <path
                        d="M3154.292 1188.787L3409.991 985l96.478-35h303.526l113.822-110V489l20.596-17h50.949l18.429-17v-74l-17.345-17h-52.033l-20.596-18V226l-113.822-107h-508.406l-11.925 10v29l-11.924 9h-34.689l-10.84-9v-29l-10.84-10v4l-1956.069-3.31-408.686.144-9.911 9.166v29l-10.814 9h-34.603l-11.895-9v-29l-11.895-10H270.34L156.797 226v120l-20.546 18H84.346l-17.302 17v74l18.383 17h50.824l20.546 17v351L270.34 950h302.781l96.241 35 283.08 226.165L1294 1212l929-926 193-3-1030.695 1030H1870l111-79.213h1116.829l27.337-21.787H2056v-23.213h1098.292zM528.566 33H3586.1v46.75H528.566V33zm0 1008.947l312.384 191.84 10.75 58.526-54.038 47.91-516.867 6.575-102.043-58.073-38.337-160.917 101.988-81.16 286.163-4.701zM3586.1 1048l-306.202 188.183-10.52 57.383 52.996 46.954 506.743 6.278 100.025-56.969 37.534-157.776-100.017-79.538L3586.1 1048zM885 283v133h409l371 372 96-98-409-407H885zm2336.371 1135H4081V0H0v1418h3221.371z"
                        fillRule="evenodd"
                        fill={props.color}
                    />
                </g>
                <path
                    d="M2522.136 709l-.505 132.511h-414.73l-375.391 377.604-99.146-100.906L2047.768 709h474.368z"
                    fill={props.color}
                />
                <path
                    d="M1667.882 417.374h-121.477l121.477 121.594 121.477 121.595 121.477-121.595 121.477-121.594h-121.477l-121.477 121.594-121.477-121.594z"
                    fillRule="evenodd"
                    fill={props.color}
                />
            </g>
        </svg>
    )
}

export default HiveProfileOverlaySvg
