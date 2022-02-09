import * as React from "react"

function JamyFlirty(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
                isolation: "isolate",
            }}
            viewBox="0 0 640 640"
            width="640pt"
            height="640pt"
            {...props}
        >
            <defs>
                <clipPath id="prefix__a">
                    <path d="M0 0h640v640H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#prefix__a)">
                <path
                    d="M71 24h498c26.492 0 48 21.508 48 48v496c0 26.492-21.508 48-48 48H71c-26.492 0-48-21.508-48-48V72c0-26.492 21.508-48 48-48z"
                    fill="#fff"
                />
                <path
                    d="M75 39h490c19.869 0 36 16.131 36 36v490c0 19.869-16.131 36-36 36H75c-19.869 0-36-16.131-36-36V75c0-19.869 16.131-36 36-36z"
                    fill="#181063"
                />
                <circle
                    vectorEffect="non-scaling-stroke"
                    cx={186}
                    cy={255}
                    r={80}
                    fill="#FFF"
                />
                <path
                    d="M534 255c0 44.153-35.847 80-80 80s-80-35.847-80-80"
                    fill="#FFF"
                />
            </g>
        </svg>
    )
}

export default JamyFlirty;