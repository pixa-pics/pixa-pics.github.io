import * as React from "react"

function HexGrid(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 150 172"
            width={200}
            height={229.3}
            {...props}
        >
            <defs>
                <clipPath id="a">
                    <path d="M0 0h150v172H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#a)" fill="none">
                <path d="M0 0h150v172H0z" />
                <g stroke={props.color} strokeLinecap="square" strokeMiterlimit={3}>
                    <path
                        d="m75 102.4-48 28m48-28 48 28m-48-84v56m0 28v42M0 3.5v56l48 28M0 87v56l48 28M150 3.5v56l-48 28m48 0v56l-48 28M75 .3v15.2l-48 28m96 0-48-28"
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={1}
                    />
                    <path
                        d="m27 43.4 48-28 48 28M0 87.4v56l48 28m102-84v56l-48 27.5"
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={3}
                    />
                </g>
                <circle
                    vectorEffect="non-scaling-stroke"
                    cx={75}
                    cy={103.5}
                    r={7}
                    fill={props.color}
                />
            </g>
        </svg>
    )
}

export default HexGrid
