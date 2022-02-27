import * as React from "react"

const SensitiveData = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 900 200"
        width={1200}
        height={266.667}
        {...props}
    >
        <defs>
            <clipPath id="A">
                <path d="M0 0h900v200H0z" />
            </clipPath>
            <style>
                {
                    '@font-face{font-family:"Saira";src:url(data:application/font-woff;charset=utf-8;base64,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) format("woff");font-weight:400;font-style:normal}'
                }
            </style>
        </defs>
        <g clipPath="url(#A)">
            <path
                d="M44 140.041H17v52l765-2 101-101v-48H782"
                fill="none"
                vectorEffect="non-scaling-stroke"
                strokeWidth={8}
                stroke={"#3012a8"}
                strokeLinecap="square"
                strokeMiterlimit={3}
            />
            <path
                d="M138.122 7.959h705.622v67.227l-93.353 93.456H43.529v-64.851l94.593-95.832z"
                fill={"#1a1a1a"}
            />
            <g clipPath="url(#B)">
                <text
                    transform="translate(236.3 126.491)"
                    fontFamily="Saira"
                    fontSize={20}
                    fill={"#e6e6e6"}
                >
                    {"IT USES DATA TRANSMISSION OVER THE NETWORK..."}
                </text>
            </g>
            <defs>
                <clipPath id="B">
                    <path transform="translate(236.3 103.791)" d="M0 0h503.7v31.48H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#C)">
                <text
                    transform="translate(232 92.01)"
                    fontFamily="Saira"
                    fontWeight={500}
                    fontSize={66}
                    fill={"#e6e6e6"}
                >
                    {"BE CAUTIOUS!"}
                </text>
            </g>
            <defs>
                <clipPath id="C">
                    <path transform="translate(232 7.959)" d="M0 0h443v122.165H0z" />
                </clipPath>
            </defs>
            <path
                d="m117.881 126.51 42.649-73.94 42.65 73.94h-85.299z"
                fill={"#6449ce"}
            />
            <path
                d="m160.53 59.902 36.454 62.993h-72.803l36.349-62.993zm0-14.56-48.948 84.782h97.897L160.53 45.342zm-3.717 66.607c0-2.478 1.859-4.337 4.131-4.337s4.13 1.859 4.13 4.337-1.859 4.337-4.13 4.337-4.131-1.859-4.131-4.337zm1.136-27.366-.207-6.299h6.506l-.206 6.299-.93 19.001h-4.234l-.929-19.001z"
                fill={"#e6e6e6"}
            />
        </g>
    </svg>
)

export default SensitiveData
