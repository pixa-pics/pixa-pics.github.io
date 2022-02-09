import * as React from "react"

function JamyAngry(props) {
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
                <path
                    d="M242.553 311.584c-31.221 31.221-81.916 31.221-113.137 0-31.221-31.221-31.221-81.916 0-113.137M510.584 198.447c31.221 31.221 31.221 81.916 0 113.137-31.221 31.221-81.916 31.221-113.137 0"
                    fill="#FFF"
                />
            </g>
        </svg>
    )
}

export default JamyAngry;