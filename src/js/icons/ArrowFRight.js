import * as React from "react"

const ArrowFRight = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1080 1080"
        width={1440}
        height={1440}
        {...props}
    >
        <defs>
            <clipPath id="a">
                <path d="M0 0h1080v1080H0z" />
            </clipPath>
        </defs>
        <g clipPath="url(#a)">
            <path fill={props.color} d="M291.1 511.3 113.2 373.9v274.7l177.9-137.3zm225.2 0L338.4 373.9v274.7l177.9-137.3zm225.3 0L563.7 373.9v274.7l177.9-137.3zm225.2 0L788.9 373.9v274.7l177.9-137.3z" />
        </g>
    </svg>
)

export default ArrowFRight
