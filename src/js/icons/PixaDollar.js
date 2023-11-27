import * as React from "react"
const PixaDollar = (props) => (
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
            <path fill="currentColor" d="M10.111 20.889V15.611H8V13.5H16.972q1.531 0 2.613-1.082t1.082-2.612q0-1.531-1.082-2.613t-2.613-1.082H10.111V4h6.861q2.428 0 4.117 1.689t1.689 4.117q0 2.427-1.689 4.116-1.689 1.689-4.117 1.689h-4.75V20.889h3.167a1.056 1.056 0 0 1 0 2.111H8v-2.111h2.111ZM4.897 12.418v-.85H3V9.869h3.794V8.17H3.759q-.323 0-.541-.244Q3 7.682 3 7.321V3.922q0-.361.218-.605t.541-.244h1.138v-.85h1.518v.85h1.897v1.699H4.518v1.699h3.035q.322 0 .54.244.219.245.219.606v3.398q0 .361-.219.605-.218.244-.54.244H6.415v.85H4.897Z" />
        </g>
    </svg>
)
export default PixaDollar
