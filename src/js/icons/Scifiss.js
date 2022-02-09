import * as React from "react"

function Scifiss(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
                isolation: "isolate",
            }}
            viewBox="0 0 16 84"
            width="16pt"
            height={112}
            {...props}
        >
            <defs>
                <clipPath id="prefix__a">
                    <path d="M0 0h16v84H0z" />
                </clipPath>
            </defs>
            <g fill={props.color} clipPath="url(#prefix__a)">
                <path
                    d="M2.124 0h6.309L-.104 8.537V2.228L2.124 0zm12.617 0H16v5.05L-.104 21.155v-6.309L14.741 0zM-.104 40.08L16 23.976v6.308L-.104 46.389V40.08zm0-12.617L16 11.358v6.309L-.104 33.772v-6.309zm0 38.332L16 49.69v6.309L-.104 72.103v-6.308zm0-12.617L16 37.073v6.309L-.104 59.486v-6.308zm7.567 30.284L16 74.925v6.308l-2.228 2.229H7.463zm-7.567-5.05L16 62.307v6.309L1.155 83.462H-.104v-5.05z"
                    fillRule="evenodd"
                />
            </g>
        </svg>
    )
}

export default Scifiss