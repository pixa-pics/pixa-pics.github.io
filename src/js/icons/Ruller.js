import * as React from "react"

function Ruller(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 5760 240"
            width={5760}
            height={240}
            {...props}
        >
            <defs>
                <clipPath id="prefix__a">
                    <path d="M0 0h4319v180H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#prefix__a)">
                <path
                    d="M0 1h6v179H0V1zm16 0h6v179h-6V1zm158 134h6v45h-6v-45zm16 0h6v45h-6v-45zm155 0h6v45.5h-6V135zm16 0h6v45.5h-6V135zm156 0h6v45.5h-6V135zm16 0h6v45.5h-6V135zm158-.5h6V180h-6v-45.5zm16 0h6V180h-6v-45.5zM864 1h6v179h-6V1zm16 0h6v179h-6V1zm158 134h6v45h-6v-45zm16 0h6v45h-6v-45zm155 0h6v45.5h-6V135zm16 0h6v45.5h-6V135zm156 0h6v45.5h-6V135zm16 0h6v45.5h-6V135zm158-.5h6V180h-6v-45.5zm16 0h6V180h-6v-45.5zM1727 0h6v179h-6V0zm16 0h6v179h-6V0zm158 134h6v45h-6v-45zm16 0h6v45h-6v-45zm155 0h6v45.5h-6V134zm16 0h6v45.5h-6V134zm156 0h6v45.5h-6V134zm16 0h6v45.5h-6V134zm158-.5h6V179h-6v-45.5zm16 0h6V179h-6v-45.5zM2590 1h6v179h-6V1zm16 0h6v179h-6V1zm158 134h6v45h-6v-45zm16 0h6v45h-6v-45zm155 0h6v45.5h-6V135zm16 0h6v45.5h-6V135zm156 0h6v45.5h-6V135zm16 0h6v45.5h-6V135zm158-.5h6V180h-6v-45.5zm16 0h6V180h-6v-45.5zM3454 1h6v179h-6V1zm16 0h6v179h-6V1zm158 134h6v45h-6v-45zm16 0h6v45h-6v-45zm155 0h6v45.5h-6V135zm16 0h6v45.5h-6V135zm156 0h6v45.5h-6V135zm16 0h6v45.5h-6V135zm158-.5h6V180h-6v-45.5zm16 0h6V180h-6v-45.5z"
                    fillRule="evenodd"
                    fill={props.color || "#fff"}
                />
            </g>
        </svg>
    )
}

export default Ruller