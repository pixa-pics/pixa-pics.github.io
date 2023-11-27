import * as React from "react"
const PixaCoin = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        style={{
            isolation: "isolate",
        }}
        viewBox="0 0 24 24"
    >
        <defs>
            <clipPath id="a">
                <path d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
        <g clipPath="url(#a)">
            <path fill="currentColor" d="M7.124 19.389V14.111H5.013V12H13.985q1.531 0 2.613-1.082t1.082-2.612q0-1.531-1.082-2.613t-2.613-1.082H7.124V2.5h6.861q2.428 0 4.117 1.689t1.689 4.117q0 2.427-1.689 4.116-1.689 1.689-4.117 1.689h-4.75V19.389h3.167a1.056 1.056 0 0 1 0 2.111H5.013v-2.111h2.111Z" />
            <path
                d="M5.01 8.81h8.25a1 1 0 0 1 1 .999v.112a1 1 0 0 1-1 .999H5.01V8.81ZM5.01 5.68h8.25a1 1 0 0 1 1 .999v.112a1 1 0 0 1-1 .999H5.01V5.68Z"
                fill="currentColor"
                style={{
                    stroke: "none",
                    strokeMiterlimit: 10,
                }}
            />
        </g>
    </svg>
)
export default PixaCoin
