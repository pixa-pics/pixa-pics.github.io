import * as React from "react"

function Scifist(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width={133.333}
            height={133.333}
            {...props}
        >
            <defs>
                <clipPath id="prefix__a">
                    <path d="M0 0h100v100H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#prefix__a)">
                <path
                    d="M36.836 33.034l-6.505 11.268H43.34m13.319 0h13.01l-6.505-11.268m-6.505-11.267L50 10.233l-6.66 11.534M12.357 72.653L5.851 83.92h13.01m13.319 0h13.01l-6.505-11.267M32.18 61.386l-6.659-11.534-6.66 11.534m42.454 11.267L54.81 83.92h13.01m13.318 0h13.011l-6.506-11.267m-6.505-11.267l-6.659-11.534-6.659 11.534m-30.984-1.008l-6.505-11.267H43.34m13.319 0h13.01l-6.505 11.267m-6.505 11.267L50 83.18l-6.66-11.535"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    strokeWidth={1.628}
                    stroke={props.color}
                    strokeMiterlimit={2.613}
                />
            </g>
        </svg>
    )
}

export default Scifist