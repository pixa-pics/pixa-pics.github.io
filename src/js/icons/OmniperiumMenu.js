import React from 'react';

export default class OmniperiumMenu extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            _active_path: "m429.99 369.379-91.463 158.418H155.601L64.138 369.379l91.463-158.418h182.926l91.463 158.418z"
        };
    }

    change_active_path = (path, name) => {

        this.setState({
            _active_path: path
        }, () => {

            if(typeof this.props.onHoverPathChange === "function"){
                this.props.onHoverPathChange(name);
            }

            this.forceUpdate();
        })
    };

    click_path = (path) => {

        if(typeof this.props.onPathChange === "function"){
            this.props.onPathChange(path);
        }
    };

    render() {
        const { _active_path } = this.state;
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={1440}
                height={1440}
                style={{
                    isolation: "isolate",
                }}
                viewBox="0 0 1080 1080"
                {...this.props}
            >
                <defs>
                    <clipPath id="a">
                        <path d="M0 0h1080v1080H0z" />
                    </clipPath>
                </defs>
                <g clipPath="url(#a)">
                    <path
                        d="M0 0h1080v1080H0z"
                        style={{
                            fill: "#00000000",
                        }}
                    />
                    <g
                        style={{
                            isolation: "isolate",
                        }}
                    >
                        <g
                            style={{
                                isolation: "isolate",
                            }}
                        >
                            <path
                                fill="#7300FF"
                                fillOpacity={0.29}
                                fillRule="evenodd"
                                d={_active_path}
                                style={{
                                    isolation: "isolate",
                                }}
                            />
                            <g
                                style={{
                                    isolation: "isolate",
                                }}
                            >
                                <radialGradient
                                    id="b"
                                    cx={0.5}
                                    cy={0.5}
                                    r={0.5}
                                    fx={0.5}
                                    fy={0.5}
                                    gradientTransform="matrix(365.852 0 0 316.837 64.138 210.961)"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop
                                        offset="0%"
                                        stopOpacity={0}
                                        style={{
                                            stopColor: "#000",
                                        }}
                                    />
                                    <stop
                                        offset="56.667%"
                                        stopOpacity={0.04}
                                        style={{
                                            stopColor: "#5700f9",
                                        }}
                                    />
                                    <stop
                                        offset="76.25%"
                                        stopOpacity={0.18}
                                        style={{
                                            stopColor: "#5a00ff",
                                        }}
                                    />
                                    <stop
                                        offset="100%"
                                        stopOpacity={0.36}
                                        style={{
                                            stopColor: "#5900ff",
                                        }}
                                    />
                                </radialGradient>
                                <path
                                    onPointerEnter={() => {this.change_active_path("m429.99 369.379-91.463 158.418H155.601L64.138 369.379l91.463-158.418h182.926l91.463 158.418z", "documentation")}}
                                    onClick={() => {this.click_path("documentation")}}
                                    fill="url(#b)"
                                    fillRule="evenodd"
                                    d="m429.99 369.379-91.463 158.418H155.601L64.138 369.379l91.463-158.418h182.926l91.463 158.418z"
                                />
                                <radialGradient
                                    id="c"
                                    cx={0.5}
                                    cy={0.5}
                                    r={0.5}
                                    fx={0.5}
                                    fy={0.5}
                                    gradientTransform="matrix(365.852 0 0 316.837 359.738 41.966)"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop
                                        offset="0%"
                                        stopOpacity={0}
                                        style={{
                                            stopColor: "#000",
                                        }}
                                    />
                                    <stop
                                        offset="56.667%"
                                        stopOpacity={0.04}
                                        style={{
                                            stopColor: "#5700f9",
                                        }}
                                    />
                                    <stop
                                        offset="76.25%"
                                        stopOpacity={0.18}
                                        style={{
                                            stopColor: "#5a00ff",
                                        }}
                                    />
                                    <stop
                                        offset="100%"
                                        stopOpacity={0.36}
                                        style={{
                                            stopColor: "#5900ff",
                                        }}
                                    />
                                </radialGradient>
                                <path
                                    fill="url(#c)"
                                    onPointerEnter={() => {this.change_active_path("m725.59 200.384-91.463 158.419H451.201l-91.463-158.419 91.463-158.418h182.926l91.463 158.418z", "guides")}}
                                    onClick={() => {this.click_path("guides")}}
                                    fillRule="evenodd"
                                    d="m725.59 200.384-91.463 158.419H451.201l-91.463-158.419 91.463-158.418h182.926l91.463 158.418z"
                                />
                                <radialGradient
                                    id="d"
                                    cx={0.5}
                                    cy={0.5}
                                    r={0.5}
                                    fx={0.5}
                                    fy={0.5}
                                    gradientTransform="matrix(365.852 0 0 316.837 656.85 210.961)"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop
                                        offset="0%"
                                        stopOpacity={0}
                                        style={{
                                            stopColor: "#000",
                                        }}
                                    />
                                    <stop
                                        offset="56.667%"
                                        stopOpacity={0.04}
                                        style={{
                                            stopColor: "#5700f9",
                                        }}
                                    />
                                    <stop
                                        offset="76.25%"
                                        stopOpacity={0.18}
                                        style={{
                                            stopColor: "#5a00ff",
                                        }}
                                    />
                                    <stop
                                        offset="100%"
                                        stopOpacity={0.36}
                                        style={{
                                            stopColor: "#5900ff",
                                        }}
                                    />
                                </radialGradient>
                                <path
                                    fill="url(#d)"
                                    onPointerEnter={() => {this.change_active_path("m1022.702 369.379-91.463 158.418H748.313L656.85 369.379l91.463-158.418h182.926l91.463 158.418z", "analytics")}}
                                    onClick={() => {this.click_path("analytics")}}
                                    fillRule="evenodd"
                                    d="m1022.702 369.379-91.463 158.418H748.313L656.85 369.379l91.463-158.418h182.926l91.463 158.418z"
                                />
                                <radialGradient
                                    id="e"
                                    cx={0.5}
                                    cy={0.5}
                                    r={0.5}
                                    fx={0.5}
                                    fy={0.5}
                                    gradientTransform="matrix(365.852 0 0 316.837 656.85 550.475)"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop
                                        offset="0%"
                                        stopOpacity={0}
                                        style={{
                                            stopColor: "#000",
                                        }}
                                    />
                                    <stop
                                        offset="56.667%"
                                        stopOpacity={0.04}
                                        style={{
                                            stopColor: "#5700f9",
                                        }}
                                    />
                                    <stop
                                        offset="76.25%"
                                        stopOpacity={0.18}
                                        style={{
                                            stopColor: "#5a00ff",
                                        }}
                                    />
                                    <stop
                                        offset="100%"
                                        stopOpacity={0.36}
                                        style={{
                                            stopColor: "#5900ff",
                                        }}
                                    />
                                </radialGradient>
                                <path
                                    fill="url(#e)"
                                    onPointerEnter={() => {this.change_active_path("m1022.702 708.893-91.463 158.419H748.313L656.85 708.893l91.463-158.418h182.926l91.463 158.418z", "dashboard")}}
                                    onClick={() => {this.click_path("dashboard")}}
                                    fillRule="evenodd"
                                    d="m1022.702 708.893-91.463 158.419H748.313L656.85 708.893l91.463-158.418h182.926l91.463 158.418z"
                                />
                                <radialGradient
                                    id="f"
                                    cx={0.5}
                                    cy={0.5}
                                    r={0.5}
                                    fx={0.5}
                                    fy={0.5}
                                    gradientTransform="matrix(365.852 0 0 316.837 359.738 723.876)"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop
                                        offset="0%"
                                        stopOpacity={0}
                                        style={{
                                            stopColor: "#000",
                                        }}
                                    />
                                    <stop
                                        offset="56.667%"
                                        stopOpacity={0.04}
                                        style={{
                                            stopColor: "#5700f9",
                                        }}
                                    />
                                    <stop
                                        offset="76.25%"
                                        stopOpacity={0.18}
                                        style={{
                                            stopColor: "#5a00ff",
                                        }}
                                    />
                                    <stop
                                        offset="100%"
                                        stopOpacity={0.36}
                                        style={{
                                            stopColor: "#5900ff",
                                        }}
                                    />
                                </radialGradient>
                                <path
                                    fill="url(#f)"
                                    onPointerEnter={() => {this.change_active_path("m725.59 882.295-91.463 158.418H451.201l-91.463-158.418 91.463-158.419h182.926l91.463 158.419z", "reports")}}
                                    onClick={() => {this.click_path("reports")}}
                                    fillRule="evenodd"
                                    d="m725.59 882.295-91.463 158.418H451.201l-91.463-158.418 91.463-158.419h182.926l91.463 158.419z"
                                />
                                <radialGradient
                                    id="g"
                                    cx={0.5}
                                    cy={0.5}
                                    r={0.5}
                                    fx={0.5}
                                    fy={0.5}
                                    gradientTransform="matrix(365.853 0 0 316.837 64.138 550.475)"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop
                                        offset="0%"
                                        stopOpacity={0}
                                        style={{
                                            stopColor: "#000",
                                        }}
                                    />
                                    <stop
                                        offset="56.667%"
                                        stopOpacity={0.04}
                                        style={{
                                            stopColor: "#5700f9",
                                        }}
                                    />
                                    <stop
                                        offset="76.25%"
                                        stopOpacity={0.18}
                                        style={{
                                            stopColor: "#5a00ff",
                                        }}
                                    />
                                    <stop
                                        offset="100%"
                                        stopOpacity={0.36}
                                        style={{
                                            stopColor: "#5900ff",
                                        }}
                                    />
                                </radialGradient>
                                <path
                                    fill="url(#g)"
                                    onPointerEnter={() => {this.change_active_path("m429.992 708.893-91.463 158.419H155.603L64.138 708.893l91.465-158.418h182.926l91.463 158.418z", "viability")}}
                                    onClick={() => {this.click_path("viability")}}
                                    fillRule="evenodd"
                                    d="m429.992 708.893-91.463 158.419H155.603L64.138 708.893l91.465-158.418h182.926l91.463 158.418z"
                                />
                            </g>
                            <g
                                style={{
                                    isolation: "isolate",
                                }}
                            >
                                <defs>
                                    <filter
                                        id="h"
                                        width="400%"
                                        height="400%"
                                        x="-200%"
                                        y="-200%"
                                        colorInterpolationFilters="sRGB"
                                        filterUnits="objectBoundingBox"
                                    >
                                        <feGaussianBlur
                                            xmlns="http://www.w3.org/2000/svg"
                                            in="SourceGraphic"
                                            stdDeviation={6.87}
                                        />
                                        <feOffset
                                            xmlns="http://www.w3.org/2000/svg"
                                            result="pf_100_offsetBlur"
                                        />
                                        <feFlood
                                            xmlns="http://www.w3.org/2000/svg"
                                            floodColor="#5900FF"
                                            floodOpacity={1}
                                        />
                                        <feComposite
                                            xmlns="http://www.w3.org/2000/svg"
                                            in2="pf_100_offsetBlur"
                                            operator="in"
                                            result="pf_100_dropShadow"
                                        />
                                        <feBlend
                                            xmlns="http://www.w3.org/2000/svg"
                                            in="SourceGraphic"
                                            in2="pf_100_dropShadow"
                                        />
                                    </filter>
                                </defs>
                                <g filter="url(#h)">
                                    <path
                                        fill="#5900FF"
                                        fillOpacity={0.2}
                                        fillRule="evenodd"
                                        d="m725.59 541.34-91.463 158.418H451.201L359.738 541.34l91.463-158.419h182.926L725.59 541.34z"
                                    />
                                </g>
                            </g>
                        </g>
                        <clipPath id="i">
                            <path fill="#FFF" d="M0 2.679h1082.692V1080H0z" />
                        </clipPath>
                        <g clipPath="url(#i)">
                            <g filter="url(#j)">
                                <path
                                    fill="none"
                                    d="m725.589 541.34-91.463 158.418H451.201L359.738 541.34l91.463-158.419h182.925l91.463 158.419z"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="j"
                                    width="400%"
                                    height="400%"
                                    x="-200%"
                                    y="-200%"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        stdDeviation={15.457}
                                    />
                                    <feOffset
                                        xmlns="http://www.w3.org/2000/svg"
                                        result="pf_100_offsetBlur"
                                    />
                                    <feFlood
                                        xmlns="http://www.w3.org/2000/svg"
                                        floodColor="#927FFF"
                                        floodOpacity={1}
                                    />
                                    <feComposite
                                        xmlns="http://www.w3.org/2000/svg"
                                        in2="pf_100_offsetBlur"
                                        operator="in"
                                        result="pf_100_dropShadow"
                                    />
                                    <feBlend
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        in2="pf_100_dropShadow"
                                    />
                                </filter>
                            </defs>
                            <g filter="url(#k)">
                                <path
                                    fill="none"
                                    d="m425.841 369.379-91.463 158.418H151.453L59.99 369.379l91.463-158.418h182.925l91.463 158.418z"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="k"
                                    width="400%"
                                    height="400%"
                                    x="-200%"
                                    y="-200%"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        stdDeviation={15.457}
                                    />
                                    <feOffset
                                        xmlns="http://www.w3.org/2000/svg"
                                        result="pf_100_offsetBlur"
                                    />
                                    <feFlood
                                        xmlns="http://www.w3.org/2000/svg"
                                        floodColor="#927FFF"
                                        floodOpacity={1}
                                    />
                                    <feComposite
                                        xmlns="http://www.w3.org/2000/svg"
                                        in2="pf_100_offsetBlur"
                                        operator="in"
                                        result="pf_100_dropShadow"
                                    />
                                    <feBlend
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        in2="pf_100_dropShadow"
                                    />
                                </filter>
                            </defs>
                            <g filter="url(#l)">
                                <path
                                    fill="none"
                                    d="m725.589 200.384-91.463 158.419H451.201l-91.463-158.419 91.463-158.418h182.925l91.463 158.418z"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="l"
                                    width="400%"
                                    height="400%"
                                    x="-200%"
                                    y="-200%"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        stdDeviation={15.457}
                                    />
                                    <feOffset
                                        xmlns="http://www.w3.org/2000/svg"
                                        result="pf_100_offsetBlur"
                                    />
                                    <feFlood
                                        xmlns="http://www.w3.org/2000/svg"
                                        floodColor="#927FFF"
                                        floodOpacity={1}
                                    />
                                    <feComposite
                                        xmlns="http://www.w3.org/2000/svg"
                                        in2="pf_100_offsetBlur"
                                        operator="in"
                                        result="pf_100_dropShadow"
                                    />
                                    <feBlend
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        in2="pf_100_dropShadow"
                                    />
                                </filter>
                            </defs>
                            <g filter="url(#m)">
                                <path
                                    fill="none"
                                    d="m1022.701 369.379-91.463 158.418H748.312l-91.463-158.418 91.463-158.418h182.926l91.463 158.418z"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="m"
                                    width="400%"
                                    height="400%"
                                    x="-200%"
                                    y="-200%"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        stdDeviation={15.457}
                                    />
                                    <feOffset
                                        xmlns="http://www.w3.org/2000/svg"
                                        result="pf_100_offsetBlur"
                                    />
                                    <feFlood
                                        xmlns="http://www.w3.org/2000/svg"
                                        floodColor="#927FFF"
                                        floodOpacity={1}
                                    />
                                    <feComposite
                                        xmlns="http://www.w3.org/2000/svg"
                                        in2="pf_100_offsetBlur"
                                        operator="in"
                                        result="pf_100_dropShadow"
                                    />
                                    <feBlend
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        in2="pf_100_dropShadow"
                                    />
                                </filter>
                            </defs>
                            <g filter="url(#n)">
                                <path
                                    fill="none"
                                    d="m1022.701 708.893-91.463 158.419H748.312l-91.463-158.419 91.463-158.418h182.926l91.463 158.418z"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="n"
                                    width="400%"
                                    height="400%"
                                    x="-200%"
                                    y="-200%"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        stdDeviation={15.457}
                                    />
                                    <feOffset
                                        xmlns="http://www.w3.org/2000/svg"
                                        result="pf_100_offsetBlur"
                                    />
                                    <feFlood
                                        xmlns="http://www.w3.org/2000/svg"
                                        floodColor="#927FFF"
                                        floodOpacity={1}
                                    />
                                    <feComposite
                                        xmlns="http://www.w3.org/2000/svg"
                                        in2="pf_100_offsetBlur"
                                        operator="in"
                                        result="pf_100_dropShadow"
                                    />
                                    <feBlend
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        in2="pf_100_dropShadow"
                                    />
                                </filter>
                            </defs>
                            <g filter="url(#o)">
                                <path
                                    fill="none"
                                    d="m725.589 882.295-91.463 158.418H451.201l-91.463-158.418 91.463-158.419h182.925l91.463 158.419z"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="o"
                                    width="400%"
                                    height="400%"
                                    x="-200%"
                                    y="-200%"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        stdDeviation={15.457}
                                    />
                                    <feOffset
                                        xmlns="http://www.w3.org/2000/svg"
                                        result="pf_100_offsetBlur"
                                    />
                                    <feFlood
                                        xmlns="http://www.w3.org/2000/svg"
                                        floodColor="#927FFF"
                                        floodOpacity={1}
                                    />
                                    <feComposite
                                        xmlns="http://www.w3.org/2000/svg"
                                        in2="pf_100_offsetBlur"
                                        operator="in"
                                        result="pf_100_dropShadow"
                                    />
                                    <feBlend
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        in2="pf_100_dropShadow"
                                    />
                                </filter>
                            </defs>
                            <g filter="url(#p)">
                                <path
                                    fill="none"
                                    d="m429.991 708.893-91.463 158.419H155.602L64.138 708.893l91.464-158.418h182.926l91.463 158.418z"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="p"
                                    width="400%"
                                    height="400%"
                                    x="-200%"
                                    y="-200%"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        stdDeviation={15.457}
                                    />
                                    <feOffset
                                        xmlns="http://www.w3.org/2000/svg"
                                        result="pf_100_offsetBlur"
                                    />
                                    <feFlood
                                        xmlns="http://www.w3.org/2000/svg"
                                        floodColor="#927FFF"
                                        floodOpacity={1}
                                    />
                                    <feComposite
                                        xmlns="http://www.w3.org/2000/svg"
                                        in2="pf_100_offsetBlur"
                                        operator="in"
                                        result="pf_100_dropShadow"
                                    />
                                    <feBlend
                                        xmlns="http://www.w3.org/2000/svg"
                                        in="SourceGraphic"
                                        in2="pf_100_dropShadow"
                                    />
                                </filter>
                            </defs>
                            <clipPath id="q">
                                <path fill="#FFF" d="M123.981 345.501h235.738v47.754H123.981z" />
                            </clipPath>
                            <g clipPath="url(#q)">
                                <path
                                    fill="#FFF"
                                    fillRule="evenodd"
                                    stroke="#FFF"
                                    strokeOpacity={100}
                                    strokeWidth={0.724}
                                    d="m155.436 376.602 2.74 7.673h2.85l-9.39-25.575h-2.996l-9.389 25.575h2.703l2.74-7.673h10.742zm-.84-2.41h-9.025l4.495-12.607 4.53 12.607zm23.566-13.082v-2.41h-18.341v2.41h7.856v23.165h2.629V361.11h7.856zm20.898 0v-2.41h-18.341v2.41h7.856v23.165h2.631V361.11h7.854zm23.055 23.165-5.7-10.56c3.326-.072 4.897-1.717 4.897-5.114v-4.787c0-3.471-1.645-5.114-5.116-5.114h-12.458v25.575h2.631v-10.56h7.124l5.7 10.56h2.922zm-15.746-12.97V361.11h9.681c1.9 0 2.631.731 2.631 2.631v4.933c0 1.9-.731 2.631-2.631 2.631h-9.681zm21.336 12.97h2.631V358.7h-2.631v25.575zm9.647-25.575v25.575h12.568c3.545 0 5.188-1.643 5.188-7.234 0-4.129-.912-5.408-2.776-5.992 1.498-.621 2.485-1.827 2.485-5.518 0-5.188-1.645-6.831-5.188-6.831h-12.277zm2.63 11.143v-8.733h9.5c1.899 0 2.631.731 2.631 4.385 0 3.653-.732 4.348-2.631 4.348h-9.5zm0 12.021v-9.645h9.791c1.901 0 2.631.73 2.631 4.822 0 4.093-.73 4.823-2.631 4.823h-9.791zm38.546-23.164h-2.629v20.533c0 1.901-.731 2.631-2.631 2.631h-7.382c-1.899 0-2.629-.73-2.629-2.631V358.7h-2.631v20.461c0 3.471 1.644 5.114 5.115 5.114h7.673c3.471 0 5.114-1.643 5.114-5.114V358.7zm22.617 2.41v-2.41h-18.342v2.41h7.856v23.165h2.63V361.11h7.856zm4.676-2.41v25.575h16.187v-2.411h-13.556V372.4h11.437v-2.41h-11.437v-8.88h13.556v-2.41h-16.187zm35.149 7.452h2.631v-2.338c0-3.471-1.644-5.114-5.115-5.114h-7.089c-3.471 0-5.115 1.643-5.115 5.114v2.668c0 3.836 2.412 4.567 5.262 5.225l7.161 1.643c1.791.402 2.631 1.023 2.631 2.961v3.068c0 1.899-.731 2.632-2.631 2.632h-7.235c-1.899 0-2.63-.733-2.63-2.632v-2.814h-2.631v2.596c0 3.471 1.645 5.114 5.116 5.114h7.526c3.471 0 5.116-1.643 5.116-5.114v-3.143c0-3.836-2.413-4.567-5.262-5.225l-7.161-1.645c-1.791-.4-2.631-1.021-2.631-2.959v-2.594c0-1.9.73-2.631 2.631-2.631h6.795c1.901 0 2.631.731 2.631 2.631v2.557z"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </g>
                            <clipPath id="r">
                                <path fill="#FFF" d="M424.786 176.506h235.738v47.754H424.786z" />
                            </clipPath>
                            <g clipPath="url(#r)">
                                <path
                                    fill="#FFF"
                                    fillRule="evenodd"
                                    stroke="#FFF"
                                    strokeOpacity={100}
                                    strokeWidth={0.724}
                                    d="M485.434 189.704h-3.287l-8.55 18.706-8.514-18.706h-3.288v25.576h2.485v-21.666l8.11 17.976h2.375l8.112-17.976v21.666h2.557v-25.576zm7.015 0v25.576h16.186v-2.412H495.08v-9.462h11.436v-2.412H495.08v-8.878h13.555v-2.412h-16.186zm37.706 2.412v-2.412h-18.342v2.412h7.856v23.164h2.631v-23.164h7.855zm4.678 23.164h2.629v-11.874h13.081v11.874h2.631v-25.576h-2.631v11.29h-13.081v-11.29h-2.629v25.576zm37.888 0c3.471 0 5.115-1.645 5.115-5.116v-15.345c0-3.471-1.644-5.115-5.115-5.115h-8.075c-3.471 0-5.116 1.644-5.116 5.115v15.345c0 3.471 1.645 5.116 5.116 5.116h8.075zm-10.56-20.533c0-1.901.731-2.631 2.631-2.631h7.782c1.901 0 2.631.73 2.631 2.631v15.491c0 1.899-.73 2.63-2.631 2.63h-7.782c-1.9 0-2.631-.731-2.631-2.63v-15.491zm22.031-5.043v25.576h12.753c3.471 0 5.114-1.645 5.114-5.116v-15.345c0-3.471-1.643-5.115-5.114-5.115h-12.753zm2.632 23.164v-20.752h9.975c1.899 0 2.631.73 2.631 2.631v15.491c0 1.899-.732 2.63-2.631 2.63h-9.975zm35.331-15.711h2.631v-2.338c0-3.471-1.645-5.115-5.116-5.115h-7.089c-3.47 0-5.113 1.644-5.113 5.115v2.668c0 3.837 2.41 4.567 5.26 5.224l7.162 1.644c1.79.403 2.63 1.024 2.63 2.959v3.069c0 1.901-.731 2.631-2.63 2.631h-7.234c-1.901 0-2.631-.73-2.631-2.631v-2.813h-2.631v2.594c0 3.471 1.644 5.116 5.115 5.116h7.526c3.471 0 5.116-1.645 5.116-5.116v-3.141c0-3.836-2.411-4.568-5.261-5.225l-7.162-1.644c-1.789-.403-2.629-1.024-2.629-2.96V194.6c0-1.9.73-2.631 2.629-2.631h6.796c1.9 0 2.631.731 2.631 2.631v2.557z"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </g>
                            <clipPath id="s">
                                <path fill="#FFF" d="M424.786 504.919h235.738v72.834H424.786z" />
                            </clipPath>
                            <g clipPath="url(#s)">
                                <path
                                    fill="#FFF"
                                    fillRule="evenodd"
                                    stroke="#FFF"
                                    strokeOpacity={100}
                                    strokeWidth={1.085}
                                    d="M465.42 535.897h3.945v-3.506c0-5.206-2.466-7.674-7.672-7.674h-10.632c-5.207 0-7.673 2.468-7.673 7.674v4c0 5.755 3.618 6.851 7.892 7.837l10.743 2.466c2.684.603 3.945 1.535 3.945 4.439v4.604c0 2.85-1.096 3.946-3.945 3.946H451.17c-2.85 0-3.945-1.096-3.945-3.946v-4.22h-3.946v3.892c0 5.206 2.466 7.672 7.672 7.672h11.29c5.207 0 7.673-2.466 7.673-7.672v-4.714c0-5.755-3.617-6.851-7.891-7.837l-10.743-2.466c-2.685-.603-3.946-1.535-3.946-4.439v-3.892c0-2.85 1.096-3.946 3.946-3.946h10.194c2.85 0 3.946 1.096 3.946 3.946v3.836zm25.922 27.184V549.49l13.647-24.773h-4.164l-11.401 20.772-11.4-20.772h-4.274l13.647 24.773v13.591h3.945zm39.624-27.184h3.947v-3.506c0-5.206-2.467-7.674-7.674-7.674h-10.632c-5.206 0-7.672 2.468-7.672 7.674v4c0 5.755 3.617 6.851 7.891 7.837l10.743 2.466c2.685.603 3.946 1.535 3.946 4.439v4.604c0 2.85-1.096 3.946-3.946 3.946h-10.852c-2.85 0-3.946-1.096-3.946-3.946v-4.22h-3.946v3.892c0 5.206 2.466 7.672 7.673 7.672h11.29c5.206 0 7.673-2.466 7.673-7.672v-4.714c0-5.755-3.618-6.851-7.892-7.837l-10.743-2.466c-2.685-.603-3.945-1.535-3.945-4.439v-3.892c0-2.85 1.095-3.946 3.945-3.946h10.194c2.85 0 3.946 1.096 3.946 3.946v3.836zm36.939-7.563v-3.617h-27.512v3.617h11.783v34.747h3.947v-34.747h11.782zm7.016-3.617v38.364h24.278v-3.617h-20.333V545.27h17.155v-3.617h-17.155v-13.319h20.333v-3.617h-24.278zm68.012 0h-4.932l-12.823 28.061-12.77-28.061h-4.934v38.364h3.727v-32.5l12.167 26.965h3.562l12.167-26.965v32.5h3.836v-38.364z"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </g>
                            <clipPath id="t">
                                <path fill="#FFF" d="M721.898 342.904h235.738v52.95H721.898z" />
                            </clipPath>
                            <g clipPath="url(#t)">
                                <path
                                    fill="#FFF"
                                    fillRule="evenodd"
                                    stroke="#FFF"
                                    strokeOpacity={100}
                                    strokeWidth={0.724}
                                    d="M790.986 356.103h-3.288l-8.549 18.706-8.513-18.706h-3.289v25.574h2.485v-21.666l8.112 17.976h2.373l8.112-17.976v21.666h2.557v-25.574zm7.016 0v25.574h16.185v-2.41h-13.554v-9.464h11.435v-2.412h-11.435v-8.878h13.554v-2.41h-16.185zm37.706 2.41v-2.41h-18.341v2.41h7.854v23.164h2.631v-23.164h7.856zm23.055 23.164-5.7-10.559c3.325-.073 4.895-1.717 4.895-5.114v-4.787c0-3.471-1.643-5.114-5.114-5.114h-12.46v25.574h2.631v-10.559h7.124l5.7 10.559h2.924zm-15.748-12.97v-10.194h9.683c1.899 0 2.629.731 2.629 2.631v4.932c0 1.901-.73 2.631-2.629 2.631h-9.683zm21.338 12.97h2.629v-25.574h-2.629v25.574zm21.703 0c3.471 0 5.114-1.789 5.114-5.114v-2.777h-2.629v2.85c0 1.9-.733 2.631-2.631 2.631h-7.308c-1.9 0-2.631-.731-2.631-2.631v-15.492c0-1.9.731-2.631 2.631-2.631h7.308c1.898 0 2.631.731 2.631 2.631v2.85h2.629v-2.777c0-3.471-1.643-5.114-5.114-5.114h-7.6c-3.471 0-5.116 1.643-5.116 5.114v15.346c0 3.325 1.645 5.114 5.116 5.114h7.6zm24.772-18.122h2.631v-2.338c0-3.471-1.645-5.114-5.116-5.114h-7.088c-3.471 0-5.116 1.643-5.116 5.114v2.668c0 3.836 2.412 4.566 5.262 5.225l7.161 1.642c1.791.403 2.631 1.024 2.631 2.961v3.069c0 1.899-.73 2.631-2.631 2.631h-7.235c-1.899 0-2.629-.732-2.629-2.631v-2.814h-2.631v2.595c0 3.471 1.644 5.114 5.115 5.114h7.527c3.471 0 5.115-1.643 5.115-5.114v-3.142c0-3.837-2.412-4.567-5.262-5.225l-7.161-1.645c-1.791-.401-2.631-1.022-2.631-2.959v-2.594c0-1.901.731-2.631 2.631-2.631h6.796c1.9 0 2.631.73 2.631 2.631v2.557z"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </g>
                            <clipPath id="u">
                                <path fill="#FFF" d="M725.589 657.348h235.738v103.079H725.589z" />
                            </clipPath>
                            <g
                                fill="#FFF"
                                fillRule="evenodd"
                                stroke="#FFF"
                                strokeOpacity={100}
                                strokeWidth={0.724}
                                clipPath="url(#u)"
                            >
                                <path
                                    d="M778.401 696.124c3.471 0 5.116-1.791 5.116-5.116v-2.776h-2.631v2.85c0 1.899-.731 2.629-2.631 2.629h-7.307c-1.899 0-2.631-.73-2.631-2.629v-15.493c0-1.899.732-2.63 2.631-2.63h7.307c1.9 0 2.631.731 2.631 2.63v2.85h2.631v-2.776c0-3.471-1.645-5.116-5.116-5.116h-7.6c-3.471 0-5.114 1.645-5.114 5.116v15.345c0 3.325 1.643 5.116 5.114 5.116h7.6zm23.567 0c3.471 0 5.115-1.645 5.115-5.116v-15.345c0-3.471-1.644-5.116-5.115-5.116h-8.075c-3.471 0-5.116 1.645-5.116 5.116v15.345c0 3.471 1.645 5.116 5.116 5.116h8.075zm-10.56-20.535c0-1.899.731-2.63 2.631-2.63h7.782c1.901 0 2.631.731 2.631 2.63v15.493c0 1.899-.73 2.629-2.631 2.629h-7.782c-1.9 0-2.631-.73-2.631-2.629v-15.493zm38.4-5.042v21.631l-13.444-21.631h-2.924v25.577h2.484v-21.959l13.665 21.959h2.704v-25.577h-2.485zm25.504 2.412v-2.412h-18.341v2.412h7.854v23.165h2.631v-23.165h7.856zm23.055 23.165-5.7-10.56c3.325-.072 4.895-1.717 4.895-5.115v-4.786c0-3.471-1.643-5.116-5.114-5.116h-12.46v25.577h2.631v-10.56h7.124l5.7 10.56h2.924zm-15.748-12.972v-10.193h9.683c1.899 0 2.629.731 2.629 2.63v4.934c0 1.898-.73 2.629-2.629 2.629h-9.683zm33.87 12.972c3.471 0 5.114-1.645 5.114-5.116v-15.345c0-3.471-1.643-5.116-5.114-5.116h-8.075c-3.471 0-5.115 1.645-5.115 5.116v15.345c0 3.471 1.644 5.116 5.115 5.116h8.075zm-10.559-20.535c0-1.899.73-2.63 2.631-2.63h7.782c1.899 0 2.631.731 2.631 2.63v15.493c0 1.899-.732 2.629-2.631 2.629h-7.782c-1.901 0-2.631-.73-2.631-2.629v-15.493zm22.031-5.042v25.577h15.273v-2.413h-12.642v-23.164h-2.631zm-106.12 46.26v-2.413H783.5v2.413h7.854v23.164h2.631v-23.164h7.856zm16.771 23.164c3.471 0 5.114-1.645 5.114-5.116V719.51c0-3.471-1.643-5.116-5.114-5.116h-8.074c-3.471 0-5.116 1.645-5.116 5.116v15.345c0 3.471 1.645 5.116 5.116 5.116h8.074zm-10.559-20.533c0-1.901.731-2.631 2.631-2.631h7.782c1.899 0 2.631.73 2.631 2.631v15.491c0 1.899-.732 2.629-2.631 2.629h-7.782c-1.9 0-2.631-.73-2.631-2.629v-15.491zm43.478 20.533 6.905-25.577h-2.776l-5.443 22.215-6.139-22.215h-2.411l-6.139 22.215-5.444-22.215h-2.85l6.905 25.577h2.815l5.918-21.448 5.919 21.448h2.74zm11.509-25.577v25.577h16.187v-2.413h-13.556v-9.462h11.437v-2.412h-11.437v-8.877h13.556v-2.413H863.04zm40.081 25.577-5.699-10.56c3.324-.072 4.895-1.717 4.895-5.115v-4.786c0-3.471-1.643-5.116-5.114-5.116h-12.46v25.577h2.631v-10.56h7.126l5.699 10.56h2.922zm-15.747-12.97v-10.194h9.683c1.9 0 2.631.73 2.631 2.631v4.932c0 1.898-.731 2.631-2.631 2.631h-9.683z"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </g>
                            <clipPath id="v">
                                <path fill="#FFF" d="M118.472 657.348h255.052v103.079H118.472z" />
                            </clipPath>
                            <g
                                fill="#FFF"
                                fillRule="evenodd"
                                stroke="#FFF"
                                strokeOpacity={100}
                                strokeWidth={0.724}
                                clipPath="url(#v)"
                            >
                                <path
                                    d="M186.75 670.547h-2.703l-7.599 22.69-7.453-22.69h-2.85l8.805 25.577h2.995l8.805-25.577zm4.604 25.577h2.631v-25.577h-2.631v25.577zm23.42-7.673 2.74 7.673h2.85l-9.389-25.577h-2.996l-9.39 25.577h2.703l2.741-7.673h10.741zm-.84-2.412h-9.024l4.494-12.605 4.53 12.605zm11.034-15.492v25.577h12.569c3.544 0 5.188-1.645 5.188-7.235 0-4.128-.914-5.407-2.777-5.991 1.498-.621 2.485-1.828 2.485-5.518 0-5.188-1.643-6.833-5.188-6.833h-12.277zm2.631 11.144v-8.732h9.499c1.901 0 2.631.731 2.631 4.384 0 3.654-.73 4.348-2.631 4.348h-9.499zm0 12.02v-9.645h9.792c1.9 0 2.631.731 2.631 4.823 0 4.092-.731 4.822-2.631 4.822h-9.792zm21.045 2.413h2.631v-25.577h-2.631v25.577zm9.645-25.577v25.577h15.273v-2.413H260.92v-23.164h-2.631zm20.242 25.577h2.631v-25.577h-2.631v25.577zm25.649-23.165v-2.412h-18.342v2.412h7.857v23.165h2.631v-23.165h7.854zm13.593 23.165v-9.062l9.096-16.515h-2.776l-7.6 13.847-7.6-13.847h-2.85l9.099 16.515v9.062h2.631zm-168.456 18.27h-3.289l-8.55 18.707-8.513-18.707h-3.289v25.577h2.485v-21.666l8.112 17.976h2.375l8.11-17.976v21.666h2.559v-25.577zm20.789 17.904 2.74 7.673h2.85l-9.39-25.577h-2.996l-9.389 25.577h2.703l2.74-7.673h10.742zm-.84-2.412h-9.025l4.493-12.605 4.532 12.605zm27.402-15.492v21.631l-13.446-21.631H180.3v25.577h2.484v-21.959l13.665 21.959h2.704v-25.577h-2.485zm23.274 17.904 2.74 7.673h2.85l-9.389-25.577h-2.997l-9.389 25.577h2.703l2.741-7.673h10.741zm-.84-2.412h-9.024l4.492-12.605 4.532 12.605zm25.32-7.964h2.63v-2.412c0-3.471-1.643-5.116-5.114-5.116h-7.856c-3.471 0-5.116 1.645-5.116 5.116v15.345c0 3.471 1.645 5.116 5.116 5.116h7.856c3.471 0 5.114-1.645 5.114-5.116v-8.147h-9.316v2.41h6.686v5.811c0 1.899-.732 2.629-2.631 2.629h-7.563c-1.9 0-2.631-.73-2.631-2.629v-15.491c0-1.901.731-2.631 2.631-2.631h7.563c1.899 0 2.631.73 2.631 2.631v2.484zm8.915-7.528v25.577h16.185v-2.413h-13.556v-9.462h11.437v-2.412h-11.437v-8.877h13.556v-2.413h-16.185zm45.342 0h-3.289l-8.55 18.707-8.512-18.707h-3.288v25.577h2.485v-21.666l8.11 17.976h2.375l8.112-17.976v21.666h2.557v-25.577zm7.014 0v25.577h16.187v-2.413h-13.556v-9.462h11.437v-2.412h-11.437v-8.877h13.556v-2.413h-16.187zm38.072 0v21.631l-13.445-21.631h-2.924v25.577h2.485v-21.959l13.665 21.959h2.703v-25.577h-2.484zm25.504 2.413v-2.413h-18.342v2.413h7.855v23.164h2.631v-23.164h7.856z"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </g>
                            <clipPath id="w">
                                <path fill="#FFF" d="M424.786 858.417h255.052v47.754H424.786z" />
                            </clipPath>
                            <g clipPath="url(#w)">
                                <path
                                    fill="#FFF"
                                    fillRule="evenodd"
                                    stroke="#FFF"
                                    strokeOpacity={100}
                                    strokeWidth={0.724}
                                    d="M430.767 871.614v25.576h12.751c3.471 0 5.115-1.644 5.115-5.115V876.73c0-3.471-1.644-5.116-5.115-5.116h-12.751zm2.631 23.164v-20.752h9.973c1.901 0 2.631.731 2.631 2.631v15.492c0 1.899-.73 2.629-2.631 2.629h-9.973zm21.593 2.412h2.63v-25.576h-2.63v25.576zm23.383-18.122h2.631v-2.338c0-3.471-1.644-5.116-5.115-5.116h-7.089c-3.471 0-5.115 1.645-5.115 5.116v2.666c0 3.836 2.412 4.569 5.262 5.225l7.161 1.645c1.791.402 2.631 1.023 2.631 2.959v3.069c0 1.9-.731 2.631-2.631 2.631h-7.234c-1.9 0-2.631-.731-2.631-2.631v-2.813h-2.631v2.594c0 3.471 1.645 5.115 5.116 5.115h7.526c3.471 0 5.116-1.644 5.116-5.115v-3.141c0-3.838-2.413-4.569-5.262-5.225l-7.161-1.645c-1.791-.402-2.631-1.023-2.631-2.959v-2.594c0-1.901.73-2.631 2.631-2.631h6.795c1.901 0 2.631.73 2.631 2.631v2.557zm24.625-5.042v-2.412h-18.341v2.412h7.856v23.164h2.631v-23.164h7.854zm23.055 23.164-5.7-10.559c3.325-.072 4.897-1.717 4.897-5.116v-4.785c0-3.471-1.644-5.116-5.115-5.116h-12.459v25.576h2.63v-10.559h7.125l5.7 10.559h2.922zm-15.747-12.97v-10.194h9.682c1.901 0 2.631.731 2.631 2.631v4.932c0 1.899-.73 2.631-2.631 2.631h-9.682zm38.839-12.606h-2.631v20.535c0 1.899-.731 2.629-2.631 2.629h-7.38c-1.9 0-2.631-.73-2.631-2.629v-20.535h-2.631v20.461c0 3.471 1.645 5.115 5.116 5.115h7.672c3.471 0 5.116-1.644 5.116-5.115v-20.461zm6.614 0v25.576h2.631v-9.938h9.864c3.324 0 5.115-1.789 5.115-5.115v-5.407c0-3.325-1.791-5.116-5.115-5.116H555.76zm2.631 13.228v-10.816h9.717c1.717 0 2.631.913 2.631 2.631v5.554c0 1.717-.914 2.631-2.631 2.631h-9.717zm36.171-10.816v-2.412H576.22v2.412h7.855v23.164h2.631v-23.164h7.856zm4.676 23.164h2.631v-25.576h-2.631v25.576zm22.178 0c3.471 0 5.115-1.644 5.115-5.115V876.73c0-3.471-1.644-5.116-5.115-5.116h-8.075c-3.471 0-5.114 1.645-5.114 5.116v15.345c0 3.471 1.643 5.115 5.114 5.115h8.075zm-10.56-20.533c0-1.9.731-2.631 2.631-2.631h7.782c1.901 0 2.631.731 2.631 2.631v15.492c0 1.899-.73 2.629-2.631 2.629h-7.782c-1.9 0-2.631-.73-2.631-2.629v-15.492zm38.402-5.043v21.631l-13.447-21.631h-2.922v25.576h2.485v-21.958l13.663 21.958h2.705v-25.576h-2.484zm23.236 7.454h2.631v-2.338c0-3.471-1.645-5.116-5.115-5.116h-7.089c-3.471 0-5.114 1.645-5.114 5.116v2.666c0 3.836 2.411 4.569 5.261 5.225l7.16 1.645c1.791.402 2.631 1.023 2.631 2.959v3.069c0 1.9-.73 2.631-2.631 2.631h-7.233c-1.9 0-2.631-.731-2.631-2.631v-2.813h-2.631v2.594c0 3.471 1.645 5.115 5.116 5.115h7.526c3.471 0 5.115-1.644 5.115-5.115v-3.141c0-3.838-2.412-4.569-5.262-5.225l-7.16-1.645c-1.79-.402-2.631-1.023-2.631-2.959v-2.594c0-1.901.732-2.631 2.631-2.631h6.795c1.901 0 2.631.73 2.631 2.631v2.557z"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </g>
                            <clipPath id="x">
                                <path fill="#FFF" d="M175.974 772.6h140.058v31.003H175.974z" />
                            </clipPath>
                            <g clipPath="url(#x)">
                                <path
                                    fill="#6B26FF"
                                    fillRule="evenodd"
                                    d="M209.48 786.085h1.754v-1.608c0-2.314-1.098-3.41-3.41-3.41h-5.237c-2.315 0-3.411 1.096-3.411 3.41v10.23c0 2.315 1.096 3.41 3.411 3.41h5.237c2.312 0 3.41-1.095 3.41-3.41v-5.432h-6.211v1.607h4.457v3.874c0 1.267-.488 1.754-1.754 1.754h-5.042c-1.267 0-1.754-.487-1.754-1.754v-10.327c0-1.268.487-1.754 1.754-1.754h5.042c1.266 0 1.754.486 1.754 1.754v1.656zm14.298 12.032c2.313 0 3.41-1.095 3.41-3.41v-10.23c0-2.314-1.097-3.41-3.41-3.41h-5.383c-2.315 0-3.411 1.096-3.411 3.41v10.23c0 2.315 1.096 3.41 3.411 3.41h5.383zm-7.04-13.688c0-1.268.487-1.754 1.754-1.754h5.188c1.266 0 1.754.486 1.754 1.754v10.327c0 1.267-.488 1.754-1.754 1.754h-5.188c-1.267 0-1.754-.487-1.754-1.754v-10.327zm26.526-3.362h-1.803l-5.067 15.126-4.969-15.126h-1.898l5.869 17.05h1.998l5.87-17.05zm3.069 0v17.05h10.792v-1.607h-9.038v-6.309h7.624v-1.608h-7.624v-5.918h9.038v-1.608h-10.792zm26.721 17.05-3.8-7.039c2.216-.049 3.264-1.145 3.264-3.411v-3.19c0-2.314-1.095-3.41-3.41-3.41h-8.305v17.05h1.752v-7.039h4.75l3.799 7.039h1.95zm-10.499-8.647v-6.795h6.455c1.266 0 1.754.486 1.754 1.754v3.287c0 1.268-.488 1.754-1.754 1.754h-6.455zm25.139-8.403v14.419l-8.964-14.419h-1.949v17.05h1.656v-14.639l9.11 14.639h1.803v-17.05h-1.656z"
                                />
                            </g>
                            <clipPath id="y">
                                <path fill="#FFF" d="M472.629 930.498h140.058v31.003H472.629z" />
                            </clipPath>
                            <g clipPath="url(#y)">
                                <path
                                    fill="#6B26FF"
                                    fillRule="evenodd"
                                    d="m498.729 950.902 1.828 5.115h1.899l-6.259-17.05h-1.998l-6.26 17.05h1.803l1.826-5.115h7.161zm-.559-1.608h-6.016l2.995-8.403 3.021 8.403zm7.356 6.723h1.754v-7.721h7.624v-1.608h-7.624v-6.114h9.036v-1.607h-10.79v17.05zm14.054 0h1.754v-7.721h7.624v-1.608h-7.624v-6.114h9.036v-1.607h-10.79v17.05zm14.054-17.05v17.05h10.792v-1.607h-9.038v-6.309h7.624v-1.608h-7.624v-5.919h9.038v-1.607h-10.792zm22.312 17.05c2.315 0 3.411-1.193 3.411-3.41v-1.852h-1.754v1.901c0 1.265-.487 1.754-1.754 1.754h-4.872c-1.266 0-1.754-.489-1.754-1.754v-10.328c0-1.267.488-1.754 1.754-1.754h4.872c1.267 0 1.754.487 1.754 1.754v1.899h1.754v-1.85c0-2.314-1.096-3.41-3.411-3.41h-5.066c-2.313 0-3.411 1.096-3.411 3.41v10.23c0 2.217 1.098 3.41 3.411 3.41h5.066zm17.83-15.443v-1.607h-12.227v1.607h5.236v15.443h1.754v-15.443h5.237zm12.032 3.362h1.754v-1.559c0-2.314-1.095-3.41-3.41-3.41h-4.725c-2.313 0-3.41 1.096-3.41 3.41v1.778c0 2.557 1.607 3.045 3.508 3.483l4.774 1.095c1.193.268 1.754.682 1.754 1.973v2.047c0 1.266-.487 1.754-1.754 1.754h-4.823c-1.266 0-1.754-.488-1.754-1.754v-1.875h-1.754v1.729c0 2.314 1.097 3.41 3.41 3.41h5.018c2.315 0 3.411-1.096 3.411-3.41v-2.094c0-2.559-1.608-3.045-3.508-3.485l-4.774-1.096c-1.194-.267-1.754-.681-1.754-1.972v-1.729c0-1.268.488-1.754 1.754-1.754h4.531c1.266 0 1.752.486 1.752 1.754v1.705z"
                                />
                            </g>
                            <clipPath id="z">
                                <path fill="#FFF" d="M773.432 772.6H913.49v31.003H773.432z" />
                            </clipPath>
                            <g clipPath="url(#z)">
                                <path
                                    fill="#6B26FF"
                                    fillRule="evenodd"
                                    d="M807.243 781.067h-2.191l-5.7 12.472-5.676-12.472h-2.192v17.05h1.657v-14.444l5.406 11.985h1.584l5.407-11.985v14.444h1.705v-17.05zm13.031 17.05c2.314 0 3.41-1.095 3.41-3.41v-10.23c0-2.314-1.096-3.41-3.41-3.41h-5.382c-2.314 0-3.41 1.096-3.41 3.41v10.23c0 2.315 1.096 3.41 3.41 3.41h5.382zm-7.038-13.688c0-1.268.486-1.754 1.752-1.754h5.19c1.266 0 1.752.486 1.752 1.754v10.327c0 1.267-.486 1.754-1.752 1.754h-5.19c-1.266 0-1.752-.487-1.752-1.754v-10.327zm25.6-3.362v14.419l-8.964-14.419h-1.949v17.05h1.656v-14.639l9.11 14.639h1.803v-17.05h-1.656zm6.332 17.05h1.754v-17.05h-1.754v17.05zm17.1-15.442v-1.608H850.04v1.608h5.237v15.442h1.754v-15.442h5.237zm11.18 15.442c2.315 0 3.41-1.095 3.41-3.41v-10.23c0-2.314-1.095-3.41-3.41-3.41h-5.383c-2.315 0-3.411 1.096-3.411 3.41v10.23c0 2.315 1.096 3.41 3.411 3.41h5.383zm-7.04-13.688c0-1.268.487-1.754 1.754-1.754h5.188c1.268 0 1.754.486 1.754 1.754v10.327c0 1.267-.486 1.754-1.754 1.754h-5.188c-1.267 0-1.754-.487-1.754-1.754v-10.327zm26.94 13.688-3.799-7.039c2.217-.049 3.264-1.145 3.264-3.411v-3.19c0-2.314-1.096-3.41-3.41-3.41h-8.306v17.05h1.752v-7.039h4.751l3.799 7.039h1.949zm-10.499-8.647v-6.795h6.456c1.266 0 1.754.486 1.754 1.754v3.287c0 1.268-.488 1.754-1.754 1.754h-6.456z"
                                />
                            </g>
                            <clipPath id="A">
                                <path fill="#FFF" d="M753.108 405.839H926.43v31.003H753.108z" />
                            </clipPath>
                            <g clipPath="url(#A)">
                                <path
                                    fill="#6B26FF"
                                    fillRule="evenodd"
                                    d="M774.38 414.307h-2.192l-5.699 12.471-5.676-12.471h-2.192v17.05h1.656v-14.445l5.407 11.986h1.584l5.407-11.986v14.445h1.705v-17.05zm4.676 0v17.05h10.792v-1.608h-9.038v-6.309h7.624v-1.607h-7.624v-5.919h9.038v-1.607h-10.792zm23.652 11.934 1.827 5.116h1.9l-6.26-17.05h-1.996l-6.26 17.05h1.802l1.827-5.116h7.16zm-.56-1.607h-6.016l2.996-8.403 3.02 8.403zm16.222-5.358h1.754v-1.559c0-2.315-1.096-3.41-3.41-3.41h-4.725c-2.313 0-3.411 1.095-3.411 3.41v1.778c0 2.558 1.608 3.045 3.508 3.482l4.774 1.098c1.194.267 1.754.682 1.754 1.973v2.045c0 1.267-.486 1.754-1.754 1.754h-4.823c-1.265 0-1.754-.487-1.754-1.754v-1.875h-1.754v1.728c0 2.315 1.098 3.411 3.411 3.411h5.018c2.314 0 3.41-1.096 3.41-3.411v-2.094c0-2.557-1.607-3.045-3.508-3.482l-4.774-1.098c-1.193-.268-1.754-.682-1.754-1.973v-1.728c0-1.266.488-1.754 1.754-1.754h4.532c1.266 0 1.752.488 1.752 1.754v1.705zm17.66-4.969h-1.754v13.688c0 1.268-.487 1.754-1.753 1.754h-4.92c-1.268 0-1.754-.486-1.754-1.754v-13.688h-1.754v13.639c0 2.315 1.096 3.411 3.41 3.411h5.114c2.315 0 3.411-1.096 3.411-3.411v-13.639zm16.661 17.05-3.799-7.04c2.215-.049 3.264-1.144 3.264-3.41v-3.19c0-2.315-1.098-3.41-3.411-3.41h-8.307v17.05h1.754v-7.04h4.751l3.799 7.04h1.949zm-10.499-8.647v-6.796h6.456c1.266 0 1.754.487 1.754 1.754v3.288c0 1.267-.488 1.754-1.754 1.754h-6.456zm14.226-8.403v17.05h10.79v-1.608h-9.036v-6.309h7.624v-1.607h-7.624v-5.919h9.036v-1.607h-10.79zm14.468 0v17.05h8.501c2.314 0 3.41-1.096 3.41-3.411v-10.229c0-2.315-1.096-3.41-3.41-3.41h-8.501zm1.754 15.442v-13.835h6.649c1.268 0 1.754.487 1.754 1.754v10.327c0 1.268-.486 1.754-1.754 1.754h-6.649zm20.242-15.442v17.05h8.378c2.363 0 3.459-1.096 3.459-4.823 0-2.752-.609-3.606-1.852-3.994 1-.414 1.657-1.219 1.657-3.678 0-3.46-1.096-4.555-3.458-4.555h-8.184zm1.754 7.428v-5.821h6.333c1.265 0 1.754.487 1.754 2.922 0 2.436-.489 2.899-1.754 2.899h-6.333zm0 8.014v-6.43h6.528c1.266 0 1.752.486 1.752 3.215s-.486 3.215-1.752 3.215h-6.528zm19.51 1.608v-6.04l6.065-11.01h-1.85l-5.067 9.231-5.067-9.231h-1.9l6.065 11.01v6.04h1.754z"
                                />
                            </g>
                            <clipPath id="B">
                                <path fill="#FFF" d="M442.993 239.782h199.325v31.003H442.993z" />
                            </clipPath>
                            <g clipPath="url(#B)">
                                <path
                                    fill="#6B26FF"
                                    fillRule="evenodd"
                                    d="m464.187 260.186 1.828 5.114h1.899l-6.26-17.051h-1.997l-6.26 17.051h1.803l1.826-5.114h7.161zm-.559-1.61h-6.017l2.996-8.403 3.021 8.403zm16.223-5.358h1.754v-1.558c0-2.315-1.098-3.411-3.411-3.411h-4.725c-2.314 0-3.41 1.096-3.41 3.411v1.777c0 2.559 1.607 3.045 3.506 3.485l4.776 1.096c1.193.267 1.752.681 1.752 1.972v2.046c0 1.267-.487 1.754-1.752 1.754h-4.825c-1.266 0-1.752-.487-1.752-1.754v-1.876h-1.754v1.729c0 2.315 1.096 3.411 3.41 3.411h5.017c2.314 0 3.41-1.096 3.41-3.411v-2.094c0-2.557-1.608-3.045-3.506-3.483l-4.776-1.095c-1.193-.27-1.752-.684-1.752-1.973v-1.731c0-1.266.486-1.754 1.752-1.754h4.532c1.265 0 1.754.488 1.754 1.754v1.705zm15.149 0h1.754v-1.558c0-2.315-1.095-3.411-3.41-3.411h-4.725c-2.315 0-3.41 1.096-3.41 3.411v1.777c0 2.559 1.607 3.045 3.508 3.485l4.773 1.096c1.194.267 1.754.681 1.754 1.972v2.046c0 1.267-.488 1.754-1.754 1.754h-4.822c-1.268 0-1.754-.487-1.754-1.754v-1.876h-1.754v1.729c0 2.315 1.096 3.411 3.41 3.411h5.018c2.315 0 3.411-1.096 3.411-3.411v-2.094c0-2.557-1.608-3.045-3.509-3.483l-4.773-1.095c-1.194-.27-1.754-.684-1.754-1.973v-1.731c0-1.266.486-1.754 1.754-1.754h4.529c1.268 0 1.754.488 1.754 1.754v1.705zm14.347 12.082c2.315 0 3.411-1.096 3.411-3.411V251.66c0-2.315-1.096-3.411-3.411-3.411h-5.383c-2.313 0-3.41 1.096-3.41 3.411v10.229c0 2.315 1.097 3.411 3.41 3.411h5.383zm-7.039-13.689c0-1.266.488-1.754 1.754-1.754h5.188c1.267 0 1.754.488 1.754 1.754v10.327c0 1.268-.487 1.754-1.754 1.754h-5.188c-1.266 0-1.754-.486-1.754-1.754v-10.327zm22.726 13.689c2.315 0 3.41-1.194 3.41-3.411v-1.85h-1.754v1.899c0 1.268-.486 1.754-1.754 1.754h-4.871c-1.266 0-1.754-.486-1.754-1.754v-10.327c0-1.266.488-1.754 1.754-1.754h4.871c1.268 0 1.754.488 1.754 1.754v1.9h1.754v-1.851c0-2.315-1.095-3.411-3.41-3.411h-5.067c-2.314 0-3.41 1.096-3.41 3.411v10.229c0 2.217 1.096 3.411 3.41 3.411h5.067zm7.356 0h1.754v-17.051h-1.754V265.3zm15.613-5.114 1.828 5.114h1.899l-6.26-17.051h-1.997l-6.26 17.051h1.803l1.826-5.114h7.161zm-.559-1.61h-6.018l2.996-8.403 3.022 8.403zm15.71-8.719v-1.608h-12.227v1.608h5.237V265.3h1.754v-15.443h5.236zm3.118-1.608V265.3h10.79v-1.608h-9.036v-6.309h7.624v-1.608h-7.624v-5.918h9.036v-1.608h-10.79zm14.468 0V265.3h8.501c2.314 0 3.41-1.096 3.41-3.411V251.66c0-2.315-1.096-3.411-3.41-3.411h-8.501zm1.754 15.443v-13.835h6.651c1.266 0 1.752.488 1.752 1.754v10.327c0 1.268-.486 1.754-1.752 1.754h-6.651zm30.911-13.835v-1.608h-12.228v1.608h5.237V265.3h1.754v-15.443h5.237zm11.18 15.443c2.313 0 3.409-1.096 3.409-3.411V251.66c0-2.315-1.096-3.411-3.409-3.411h-5.383c-2.315 0-3.41 1.096-3.41 3.411v10.229c0 2.315 1.095 3.411 3.41 3.411h5.383zm-7.039-13.689c0-1.266.486-1.754 1.754-1.754h5.188c1.265 0 1.754.488 1.754 1.754v10.327c0 1.268-.489 1.754-1.754 1.754H619.3c-1.268 0-1.754-.486-1.754-1.754v-10.327z"
                                />
                            </g>
                            <clipPath id="C">
                                <path fill="#FFF" d="M155.191 405.839h173.322v31.003H155.191z" />
                            </clipPath>
                            <g clipPath="url(#C)">
                                <path
                                    fill="#6B26FF"
                                    fillRule="evenodd"
                                    d="M171.119 414.307v17.05h10.79v-1.608h-9.036v-6.309h7.624v-1.607h-7.624v-5.919h9.036v-1.607h-10.79zm25.381 0v14.419l-8.964-14.419h-1.949v17.05h1.656v-14.638l9.111 14.638h1.802v-17.05H196.5zm15.515 11.934 1.828 5.116h1.899l-6.26-17.05h-1.997l-6.26 17.05h1.803l1.826-5.116h7.161zm-.56-1.607h-6.017l2.997-8.403 3.02 8.403zm7.356-10.327v17.05h8.379c2.364 0 3.459-1.096 3.459-4.823 0-2.752-.609-3.606-1.851-3.994 1-.414 1.656-1.219 1.656-3.678 0-3.46-1.096-4.555-3.459-4.555h-8.184zm1.754 7.428v-5.821h6.334c1.266 0 1.752.487 1.752 2.922 0 2.436-.486 2.899-1.752 2.899h-6.334zm0 8.014v-6.43h6.528c1.267 0 1.754.486 1.754 3.215s-.487 3.215-1.754 3.215h-6.528zm14.03-15.442v17.05h10.182v-1.608h-8.428v-15.442h-1.754zm13.495 0v17.05h10.79v-1.608h-9.036v-6.309h7.624v-1.607h-7.624v-5.919h9.036v-1.607h-10.79zm14.468 0v17.05h8.501c2.315 0 3.41-1.096 3.41-3.411v-10.229c0-2.315-1.095-3.41-3.41-3.41h-8.501zm1.754 15.442v-13.835h6.649c1.268 0 1.754.487 1.754 1.754v10.327c0 1.268-.486 1.754-1.754 1.754h-6.649zm20.242-15.442v17.05h8.378c2.363 0 3.459-1.096 3.459-4.823 0-2.752-.609-3.606-1.851-3.994.999-.414 1.656-1.219 1.656-3.678 0-3.46-1.096-4.555-3.458-4.555h-8.184zm1.752 7.428v-5.821h6.335c1.266 0 1.752.487 1.752 2.922 0 2.436-.486 2.899-1.752 2.899h-6.335zm0 8.014v-6.43h6.528c1.268 0 1.754.486 1.754 3.215s-.486 3.215-1.754 3.215h-6.528zm19.512 1.608v-6.04l6.065-11.01h-1.852l-5.065 9.231-5.067-9.231h-1.9l6.065 11.01v6.04h1.754z"
                                />
                            </g>
                            <path
                                fill="#9FA7FF"
                                d="M135.822 308.424v19.183h9.562c2.605 0 3.837-1.233 3.837-3.836v-11.509c0-2.604-1.232-3.838-3.837-3.838h-9.562zm1.972 17.374v-15.564h7.481c1.424 0 1.973.547 1.973 1.973v11.618c0 1.426-.549 1.973-1.973 1.973h-7.481zm25.594 1.809c2.604 0 3.836-1.233 3.836-3.836v-11.509c0-2.604-1.232-3.838-3.836-3.838h-6.055c-2.605 0-3.837 1.234-3.837 3.838v11.509c0 2.603 1.232 3.836 3.837 3.836h6.055zm-7.919-15.4c0-1.426.547-1.973 1.973-1.973h5.836c1.426 0 1.973.547 1.973 1.973v11.618c0 1.426-.547 1.973-1.973 1.973h-5.836c-1.426 0-1.973-.547-1.973-1.973v-11.618zm25.566 15.4c2.603 0 3.837-1.343 3.837-3.836v-2.084h-1.973v2.138c0 1.426-.549 1.973-1.973 1.973h-5.481c-1.424 0-1.973-.547-1.973-1.973v-11.618c0-1.426.549-1.973 1.973-1.973h5.481c1.424 0 1.973.547 1.973 1.973v2.138h1.973v-2.083c0-2.604-1.234-3.838-3.837-3.838h-5.699c-2.604 0-3.837 1.234-3.837 3.838v11.509c0 2.493 1.233 3.836 3.837 3.836h5.699zm21.402-19.183h-1.973v15.401c0 1.426-.549 1.973-1.973 1.973h-5.536c-1.424 0-1.973-.547-1.973-1.973v-15.401h-1.973v15.347c0 2.603 1.234 3.836 3.837 3.836h5.755c2.602 0 3.836-1.233 3.836-3.836v-15.347zm22.689 0h-2.466l-6.413 14.031-6.385-14.031h-2.466v19.183h1.863v-16.25l6.084 13.483h1.781l6.083-13.483v16.25h1.919v-19.183zm5.261 0v19.183h12.14v-1.809H232.36v-7.097h8.578v-1.808h-8.578v-6.659h10.167v-1.81h-12.14zm28.554 0v16.224l-10.085-16.224h-2.192v19.183h1.864v-16.469l10.248 16.469h2.028v-19.183h-1.863zm19.127 1.81v-1.81h-13.756v1.81h5.892v17.373h1.973v-17.373h5.891zm11.235 11.618 2.055 5.755h2.138l-7.043-19.183h-2.247l-7.042 19.183h2.027l2.055-5.755h8.057zm-.63-1.808h-6.768l3.37-9.455 3.398 9.455zm17.675-9.81v-1.81h-13.756v1.81h5.892v17.373h1.972v-17.373h5.892zm3.506 17.373h1.975v-19.183h-1.975v19.183zm16.635 0c2.602 0 3.836-1.233 3.836-3.836v-11.509c0-2.604-1.234-3.838-3.836-3.838h-6.057c-2.602 0-3.836 1.234-3.836 3.838v11.509c0 2.603 1.234 3.836 3.836 3.836h6.057zm-7.92-15.4c0-1.426.549-1.973 1.973-1.973h5.837c1.425 0 1.973.547 1.973 1.973v11.618c0 1.426-.548 1.973-1.973 1.973h-5.837c-1.424 0-1.973-.547-1.973-1.973v-11.618zm28.8-3.783v16.224l-10.083-16.224h-2.194v19.183h1.864v-16.469l10.249 16.469h2.027v-19.183h-1.863z"
                            />
                            <path
                                fill="#9FA7FF"
                                fillRule="evenodd"
                                d="M518.589 136.693h1.973v-1.81c0-2.602-1.233-3.836-3.837-3.836h-5.891c-2.603 0-3.837 1.234-3.837 3.836v11.509c0 2.604 1.234 3.836 3.837 3.836h5.891c2.604 0 3.837-1.232 3.837-3.836v-6.11h-6.988v1.809h5.015v4.357c0 1.424-.549 1.972-1.973 1.972h-5.673c-1.424 0-1.973-.548-1.973-1.972v-11.619c0-1.425.549-1.973 1.973-1.973h5.673c1.424 0 1.973.548 1.973 1.973v1.864zm19.812-5.646h-1.973v15.401c0 1.424-.548 1.972-1.972 1.972h-5.537c-1.424 0-1.973-.548-1.973-1.972v-15.401h-1.973v15.345c0 2.604 1.234 3.836 3.837 3.836h5.755c2.602 0 3.836-1.232 3.836-3.836v-15.345zm4.959 19.181h1.973v-19.181h-1.973v19.181zm7.235-19.181v19.181h9.563c2.604 0 3.836-1.232 3.836-3.836v-11.509c0-2.602-1.232-3.836-3.836-3.836h-9.563zm1.973 17.373v-15.564h7.481c1.425 0 1.973.548 1.973 1.973v11.619c0 1.424-.548 1.972-1.973 1.972h-7.481zm16.195-17.373v19.181h12.139v-1.808h-10.166v-7.096h8.576v-1.81h-8.576v-6.658h10.166v-1.809h-12.139zm26.361 5.59h1.973v-1.754c0-2.602-1.232-3.836-3.837-3.836h-5.315c-2.603 0-3.837 1.234-3.837 3.836v2.002c0 2.876 1.808 3.423 3.946 3.917l5.371 1.234c1.344.301 1.973.767 1.973 2.22v2.301c0 1.426-.549 1.973-1.973 1.973H588c-1.426 0-1.973-.547-1.973-1.973v-2.109h-1.974v1.944c0 2.604 1.234 3.836 3.838 3.836h5.644c2.604 0 3.836-1.232 3.836-3.836v-2.357c0-2.876-1.808-3.425-3.946-3.918l-5.371-1.233c-1.342-.301-1.973-.767-1.973-2.22v-1.946c0-1.424.549-1.973 1.973-1.973h5.097c1.426 0 1.973.549 1.973 1.973v1.919zm190.448 181.379 2.056 5.755h2.136l-7.041-19.183h-2.248l-7.043 19.183h2.029l2.055-5.755h8.056zm-.631-1.808h-6.768l3.371-9.455 3.397 9.455zm20.552-11.62v16.224l-10.083-16.224h-2.194v19.183h1.864v-16.469l10.249 16.469h2.027v-19.183h-1.863zm17.456 13.428 2.055 5.755h2.138l-7.043-19.183h-2.247l-7.042 19.183h2.027l2.055-5.755h8.057zm-.63-1.808h-6.769l3.371-9.455 3.398 9.455zm8.275-11.62v19.183h11.455v-1.809h-9.482v-17.374h-1.973zm18.907 19.183v-6.795l6.824-12.388h-2.082l-5.7 10.386-5.699-10.386h-2.138l6.823 12.388v6.795h1.972zm21.978-17.373v-1.81h-13.757v1.81h5.892v17.373h1.973v-17.373h5.892zm3.508 17.373h1.973v-19.183h-1.973v19.183zm16.277 0c2.603 0 3.837-1.343 3.837-3.836v-2.084h-1.973v2.138c0 1.426-.549 1.973-1.973 1.973h-5.481c-1.426 0-1.973-.547-1.973-1.973v-11.618c0-1.426.547-1.973 1.973-1.973h5.481c1.424 0 1.973.547 1.973 1.973v2.137h1.973v-2.082c0-2.604-1.234-3.838-3.837-3.838h-5.699c-2.605 0-3.837 1.234-3.837 3.838v11.509c0 2.493 1.232 3.836 3.837 3.836h5.699zm18.579-13.593h1.973v-1.752c0-2.604-1.234-3.838-3.836-3.838h-5.316c-2.604 0-3.837 1.234-3.837 3.838v2c0 2.877 1.808 3.425 3.946 3.919l5.37 1.232c1.343.301 1.974.767 1.974 2.22v2.301c0 1.426-.548 1.973-1.974 1.973h-5.425c-1.425 0-1.973-.547-1.973-1.973v-2.109h-1.973v1.946c0 2.602 1.234 3.836 3.836 3.836h5.646c2.602 0 3.836-1.234 3.836-3.836v-2.357c0-2.878-1.809-3.425-3.947-3.918l-5.37-1.234c-1.343-.302-1.973-.768-1.973-2.219v-1.946c0-1.426.547-1.973 1.973-1.973h5.097c1.424 0 1.973.547 1.973 1.973v1.917zM761.525 614.919V634.1h9.563c2.604 0 3.836-1.234 3.836-3.836v-11.509c0-2.604-1.232-3.836-3.836-3.836h-9.563zm1.972 17.373v-15.565h7.481c1.426 0 1.973.549 1.973 1.973v11.619c0 1.425-.547 1.973-1.973 1.973h-7.481zm26.142-3.947 2.056 5.755h2.137l-7.043-19.181h-2.247l-7.043 19.181h2.029l2.055-5.755h8.056zm-.629-1.808h-6.769l3.37-9.453 3.399 9.453zm18.248-6.028h1.975v-1.754c0-2.604-1.234-3.836-3.838-3.836h-5.316c-2.602 0-3.836 1.232-3.836 3.836v2c0 2.877 1.809 3.425 3.946 3.919l5.371 1.234c1.343.301 1.973.765 1.973 2.218v2.303c0 1.424-.547 1.973-1.973 1.973h-5.425c-1.426 0-1.973-.549-1.973-1.973v-2.111h-1.973v1.946c0 2.602 1.232 3.836 3.836 3.836h5.644c2.605 0 3.837-1.234 3.837-3.836v-2.357c0-2.876-1.808-3.425-3.946-3.918l-5.371-1.233c-1.342-.303-1.973-.767-1.973-2.22v-1.946c0-1.424.548-1.973 1.973-1.973h5.097c1.425 0 1.972.549 1.972 1.973v1.919zM814 634.1h1.973v-8.906h9.81v8.906h1.973v-19.181h-1.973v8.467h-9.81v-8.467H814V634.1zm19.018-19.181V634.1h9.427c2.658 0 3.89-1.234 3.89-5.425 0-3.097-.685-4.057-2.082-4.495 1.124-.466 1.863-1.37 1.863-4.137 0-3.892-1.234-5.124-3.892-5.124h-9.206zm1.973 8.358v-6.55h7.124c1.426 0 1.973.549 1.973 3.289s-.547 3.261-1.973 3.261h-7.124zm0 9.015v-7.235h7.344c1.425 0 1.973.549 1.973 3.618s-.548 3.617-1.973 3.617h-7.344zm25.182 1.808c2.605 0 3.837-1.234 3.837-3.836v-11.509c0-2.604-1.232-3.836-3.837-3.836h-6.056c-2.603 0-3.836 1.232-3.836 3.836v11.509c0 2.602 1.233 3.836 3.836 3.836h6.056zm-7.918-15.4c0-1.424.547-1.973 1.973-1.973h5.836c1.426 0 1.973.549 1.973 1.973v11.619c0 1.425-.547 1.973-1.973 1.973h-5.836c-1.426 0-1.973-.548-1.973-1.973V618.7zm26.47 9.645 2.056 5.755h2.137l-7.043-19.181h-2.247l-7.043 19.181h2.028l2.056-5.755h8.056zm-.629-1.808h-6.769l3.37-9.453 3.399 9.453zm22.058 7.563-4.274-7.92c2.493-.054 3.671-1.288 3.671-3.836v-3.589c0-2.604-1.234-3.836-3.836-3.836h-9.344V634.1h1.973v-7.92h5.342l4.276 7.92h2.192zm-11.81-9.728v-7.645h7.261c1.425 0 1.973.549 1.973 1.973v3.7c0 1.424-.548 1.972-1.973 1.972h-7.261zm16.003-9.453V634.1h9.563c2.604 0 3.836-1.234 3.836-3.836v-11.509c0-2.604-1.232-3.836-3.836-3.836h-9.563zm1.973 17.373v-15.565h7.48c1.426 0 1.973.549 1.973 1.973v11.619c0 1.425-.547 1.973-1.973 1.973h-7.48zm-740.67-15.565v-1.808h-13.756v1.808h5.891V634.1h1.973v-17.373h5.892zm11.234 11.618 2.056 5.755h2.137l-7.042-19.181h-2.248l-7.041 19.181h2.027l2.055-5.755h8.056zm-.629-1.808h-6.769l3.37-9.453 3.399 9.453zm20.853 7.563h2.302l-7.509-11.455 6.907-7.726h-2.439l-9.866 11.261v-11.261h-1.973V634.1h1.973v-5.398l4.11-4.604 6.495 10.002zm4.822-19.181V634.1h12.14v-1.808h-10.167v-7.098h8.578v-1.808h-8.578v-6.659h10.167v-1.808h-12.14zm33.185 13.426 2.056 5.755h2.137l-7.043-19.181h-2.247l-7.041 19.181h2.027l2.055-5.755h8.056zm-.629-1.808h-6.769l3.37-9.453 3.399 9.453zm16.934 7.563c2.604 0 3.836-1.343 3.836-3.836v-2.082h-1.973v2.137c0 1.425-.547 1.973-1.973 1.973h-5.481c-1.424 0-1.972-.548-1.972-1.973V618.7c0-1.424.548-1.973 1.972-1.973h5.481c1.426 0 1.973.549 1.973 1.973v2.137h1.973v-2.082c0-2.604-1.232-3.836-3.836-3.836h-5.7c-2.602 0-3.836 1.232-3.836 3.836v11.509c0 2.493 1.234 3.836 3.836 3.836h5.7zm20.058-17.373v-1.808h-13.756v1.808h5.892V634.1h1.973v-17.373h5.891zm3.508 17.373h1.973v-19.181h-1.973V634.1zm16.633 0c2.604 0 3.836-1.234 3.836-3.836v-11.509c0-2.604-1.232-3.836-3.836-3.836h-6.055c-2.604 0-3.836 1.232-3.836 3.836v11.509c0 2.602 1.232 3.836 3.836 3.836h6.055zm-7.918-15.4c0-1.424.547-1.973 1.973-1.973h5.836c1.425 0 1.972.549 1.972 1.973v11.619c0 1.425-.547 1.973-1.972 1.973h-5.836c-1.426 0-1.973-.548-1.973-1.973V618.7zm28.8-3.781v16.222l-10.085-16.222h-2.192V634.1h1.864v-16.469l10.248 16.469h2.028v-19.181h-1.863zm17.427 5.59h1.973v-1.754c0-2.604-1.232-3.836-3.837-3.836h-5.316c-2.602 0-3.836 1.232-3.836 3.836v2c0 2.877 1.81 3.425 3.946 3.919l5.371 1.234c1.344.301 1.973.765 1.973 2.218v2.303c0 1.424-.547 1.973-1.973 1.973h-5.425c-1.426 0-1.973-.549-1.973-1.973v-2.111h-1.973v1.946c0 2.602 1.233 3.836 3.837 3.836h5.644c2.604 0 3.836-1.234 3.836-3.836v-2.357c0-2.876-1.808-3.425-3.946-3.918l-5.371-1.233c-1.342-.303-1.973-.767-1.973-2.22v-1.946c0-1.424.549-1.973 1.973-1.973h5.097c1.426 0 1.973.549 1.973 1.973v1.919zm171.196 212.148-4.274-7.918c2.493-.056 3.672-1.288 3.672-3.836v-3.591c0-2.602-1.233-3.836-3.837-3.836h-9.344v19.181h1.973v-7.918h5.345l4.274 7.918h2.191zm-11.81-9.728v-7.644h7.262c1.426 0 1.973.548 1.973 1.973v3.699c0 1.425-.547 1.972-1.973 1.972h-7.262zm16.003-9.453v19.181h12.14v-1.808H507.29v-7.097h8.578v-1.809h-8.578v-6.658h10.167v-1.809h-12.14zm16.278 0v19.181h1.973v-7.452h7.398c2.495 0 3.836-1.343 3.836-3.836v-4.057c0-2.493-1.341-3.836-3.836-3.836h-9.371zm1.973 9.92v-8.111h7.289c1.287 0 1.972.685 1.972 1.973v4.165c0 1.288-.685 1.973-1.972 1.973h-7.289zm24.745 9.261c2.602 0 3.836-1.232 3.836-3.836v-11.509c0-2.602-1.234-3.836-3.836-3.836h-6.057c-2.602 0-3.836 1.234-3.836 3.836v11.509c0 2.604 1.234 3.836 3.836 3.836h6.057zm-7.92-15.399c0-1.425.548-1.973 1.972-1.973h5.838c1.424 0 1.973.548 1.973 1.973v11.618c0 1.425-.549 1.973-1.973 1.973h-5.838c-1.424 0-1.972-.548-1.972-1.973v-11.618zm30.308 15.399-4.276-7.918c2.495-.056 3.673-1.288 3.673-3.836v-3.591c0-2.602-1.234-3.836-3.836-3.836h-9.346v19.181h1.974v-7.918h5.343l4.274 7.918h2.194zm-11.811-9.728v-7.644h7.261c1.425 0 1.974.548 1.974 1.973v3.699c0 1.425-.549 1.972-1.974 1.972h-7.261zm27.731-7.644v-1.809h-13.756v1.809h5.892v17.372h1.973v-17.372h5.891zm13.538 3.781h1.973v-1.754c0-2.602-1.234-3.836-3.837-3.836h-5.316c-2.604 0-3.838 1.234-3.838 3.836v2.002c0 2.876 1.81 3.423 3.948 3.918l5.37 1.233c1.343.301 1.972.767 1.972 2.22v2.301c0 1.426-.547 1.973-1.972 1.973h-5.426c-1.424 0-1.973-.547-1.973-1.973v-2.109h-1.972v1.944c0 2.604 1.232 3.836 3.836 3.836h5.644c2.604 0 3.838-1.232 3.838-3.836v-2.357c0-2.876-1.81-3.424-3.947-3.917l-5.37-1.234c-1.344-.301-1.973-.767-1.973-2.22v-1.944c0-1.426.547-1.975 1.973-1.975h5.097c1.424 0 1.973.549 1.973 1.975v1.917z"
                            />
                        </g>
                        <defs>
                            <filter
                                id="D"
                                width="400%"
                                height="400%"
                                x="-200%"
                                y="-200%"
                                colorInterpolationFilters="sRGB"
                                filterUnits="objectBoundingBox"
                            >
                                <feGaussianBlur
                                    xmlns="http://www.w3.org/2000/svg"
                                    in="SourceGraphic"
                                    stdDeviation={6.87}
                                />
                                <feOffset
                                    xmlns="http://www.w3.org/2000/svg"
                                    result="pf_100_offsetBlur"
                                />
                                <feFlood
                                    xmlns="http://www.w3.org/2000/svg"
                                    floodColor="#5900FF"
                                    floodOpacity={1}
                                />
                                <feComposite
                                    xmlns="http://www.w3.org/2000/svg"
                                    in2="pf_100_offsetBlur"
                                    operator="in"
                                    result="pf_100_dropShadow"
                                />
                                <feBlend
                                    xmlns="http://www.w3.org/2000/svg"
                                    in="SourceGraphic"
                                    in2="pf_100_dropShadow"
                                />
                            </filter>
                        </defs>
                        <g filter="url(#D)">
                            <path
                                fill="#5900FF"
                                fillRule="evenodd"
                                d="M549.763 358.803v24.118h84.364l35.183 60.94 22.906-13.225-35.366-61.257 91.463-158.418h182.926l91.463 158.418-91.463 158.418H748.313l-47.68-82.583-22.906 13.226 47.863 82.9-34.266 59.348 21 12.123 35.989-62.336h182.926l91.463 158.418-91.463 158.419H748.313L656.85 708.893l47.057-81.504-20.999-12.123-48.781 84.492h-84.364v24.118h84.364l91.463 158.419-91.463 158.418H451.201l-91.463-158.418 91.463-158.419h81.729v-24.118h-81.729l-39.083-67.695-19.863 11.469 37.737 65.361-91.463 158.419H155.603L64.138 708.893l91.465-158.418h182.926l45.309 78.478 19.864-11.467-43.964-76.146 44.548-77.16-24.883-14.366-45.024 77.983H151.454L59.991 369.379l91.463-158.418h182.925l91.463 158.418-38.023 65.858 24.883 14.365 38.499-66.681h81.729v-24.118h-81.729l-91.463-158.419 91.463-158.418h182.926l91.463 158.418-91.463 158.419h-84.364zm0 30.853h-94.67L367.51 541.34l42.023 72.778.111-.064 8.416 14.579-.109.062 37.142 64.328h175.149l87.566-151.683-87.566-151.684h-80.479zm148.288 37.612.682-.394 8.416 14.578-.683.395 45.732 79.225h175.149l87.583-151.7-87.583-151.683H752.198l-87.566 151.683 33.419 57.896zM386.421 646.9l-.271.157-8.417-14.579.271-.155-43.369-75.11H159.486L71.92 708.897l87.566 151.683h175.149l87.583-151.683-35.797-61.997zm331.387 235.395-87.566 151.683H455.093L367.51 882.295l87.583-151.684h175.149l87.566 151.684zm297.122-173.398L927.347 860.58H752.198l-87.566-151.683 87.566-151.684h175.149l87.583 151.684zM717.808 200.384l-87.566 151.684H455.093L367.51 200.384l87.583-151.683h175.149l87.566 151.683zM418.06 369.372l-87.566 151.7H155.345l-87.582-151.7 87.582-151.683h175.149l87.566 151.683z"
                            />
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}
