const overrides = {
    MuiCssBaseline: {
        "@global": {
            html: {
                overflow: "overlay",
                overscrollBehavior: "none",
                textRendering: "optimizespeed",
                touchAction: "none",
                fontFamily: `"Noto Sans"`,
                height: "100%",
            },
            body: {
                backgroundColor: "#FAFAFA",
                height: "100%",
                overflow: "overlay",
                overscrollBehavior: "none",
            },
            "body > #app": {
                height: "100%",
            },
            "body > #app > div": {
                height: "100%",
            },
            blockquote: {
                color: "#666"
            },
            "h1 > p, h2 > p, h3 > p, h4 > p, h5 > p, h6 > p": {
                margin: 0,
            },
            "canvas":{
                imageRendering: "optimizespeed",
            },
            ".pixelated": {
                imageRendering: "pixelated",
                "& *": {
                    imageRendering: "crisp-edges",
                }
            },
            ".emoji": {
                verticalAlign: "middle",
                height: "1em",
                width: "1em",
                "&.bounce": {
                    animation: "$bounce 1.2s cubic-bezier(0.280, 0.840, 0.420, 1) infinite 1s",
                    "@global": {
                        "@keyframes bounce": {
                            "0%": {transform: "scale(1,1) translateY(0)"},
                            "10%": {transform: "scale(1.1,.9) translateY(0)"},
                            "30%": {transform: "scale(.9,1.1) translateY(-40px)"},
                            "50%": {transform: "scale(1.05,.95) translateY(0)"},
                            "57%": {transform: "scale(1,1) translateY(-3px)"},
                            "64%": {transform: "scale(1,1) translateY(0)"},
                            "100%": {transform: "scale(1,1) translateY(0)"},
                        }
                    }
                },
                "&.pulse": {
                    animation: "$pulse 1.8s cubic-bezier(0.280, 0.840, 0.420, 1) infinite 1s",
                    "@global": {
                        "@keyframes pulse": {
                            "0%": {transform: "scale(.9)"},
                            "10%": {transform: "scale(1)"},
                            "30%": {transform: "scale(.9)"},
                            "50%": {transform: "scale(1)"},
                            "57%": {transform: "scale(.9)"},
                            "64%": {transform: "scale(1)"},
                            "100%": {transform: "scale(.9)"},
                        }
                    }
                }
            },
            ".highlighted": {
                backgroundColor: "#e8ecfe",
            },
            "p img": {
                width: "100%",
            },
            'p img[alt~="emoji"]': {
                width: "1em",
                verticalAlign: "middle",
            },
            "*::-webkit-scrollbar": {
                width: "8px"
            },
            "*::-webkit-scrollbar-track": {
                backgroundColor: "transparent"
            },
            "*::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(124,124,124,.3)",
                borderRadius: 8
            },
            ".MuiAvatar-root": {
                contain: "paint",
                contentVisibility: "auto",
            },
            ".MuiTableSortLabel-root.MuiTableSortLabel-root.MuiTableSortLabel-active": {
                color: "inherit"
            },
            ".MuiDialogActions-root": {
                borderTop: "1px solid #e5e5e5",
                backgroundColor: "#e8ecfe",
                "& > .MuiButton-root": {
                    color: "#3729c1",
                }
            },
            ".MuiDialog-paper": {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, calc(100% - 0px) 100%, calc(100% - 0px) calc(100% - 0px), calc(100% - 48px) calc(100% - 0px), calc(100% - 64px) 100%, 16px 100%, 0px calc(100% - 16px))",
                "& .MuiDialogActions-root": {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, calc(100% - 8px) 100%, calc(100% - 8px) calc(100% - 8px), calc(100% - 48px) calc(100% - 8px), calc(100% - 64px) 100%, 16px 100%, 0px calc(100% - 16px))",
                },
                "&::before": {
                    zIndex: -1,
                    content: "''",
                    background: "#100d4e",
                    transform: "translate(-8px, 0)",
                    width: 64,
                    height: 8,
                    position: "absolute",
                    right: -4,
                    bottom: 0,
                }
            },
            ".MuiDialog-paperFullScreen": {
                clipPath: "none",
                "& .MuiDialogActions-root": {
                    clipPath: "none",
                },
                "&::before": {
                    content: "none",
                }
            },
            ".MuiDrawer-paperAnchorBottom": {
                clipPath: "polygon(calc(32px) 0, calc(200px) 0, calc(200px) calc(16px), calc(100% - 100px) calc(16px), calc(100% - 76px) 0, 100% 0, 100% 100%, 0 100%, 0 calc(16px))",
            },
            ".MuiFab-root.MuiFab-extended": {
                borderRadius: 8,
                background: "#01022f",
            },
            ".MuiFab-root.MuiFab-extended:hover": {
                background: "#2e3671",
            },
            ".MuiButtonBase-root.MuiFab-root": {
                borderRadius: 8,
                background: "#01022f",
            },
            ".MuiButtonBase-root.MuiFab-root:hover": {
                background: "#2e3671",
            },
            ".MuiFab-root.MuiFab-extended::after": {
                position: "absolute",
                borderRadius: 8,
                content: "''",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                boxShadow: "inset 0px 0px 8px #475db3ab, inset 0px 0px 12px #838fdc61, inset 0px 0px 24px #cbd4ff40",
            },
            ".MuiButtonBase-root.MuiFab-root::after": {
                position: "absolute",
                borderRadius: 8,
                content: "''",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                boxShadow: "inset 0px 0px 8px #475db3ab, inset 0px 0px 12px #838fdc61, inset 0px 0px 24px #cbd4ff40",
            },
            ".MuiButtonBase-root.MuiChip-root": {
                borderRadius: 4,
            },
            ".MuiSvgIcon-root.MuiChip-deleteIcon": {
                color: "rgba(0, 0, 0, .36)"
            },
            ".MuiTooltip-popper .MuiTooltip-tooltip": {
                backgroundColor: "#100d4e",
            },
            "svg": {
                fontFamily: "Open Sans !important"
            },
            ".MuiBackdrop-root": {
                backgroundColor: "rgba(6, 14, 35, .5)",
                backdropFilter: "blur(9px)",
                transform: "opacity(1)",
                animation: "$fadeBlur 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                "@global": {
                    "@keyframes fadeBlur": {
                        "0%": {
                            backdropFilter: "blur(9px)",
                            transform: "opacity(0)",
                        },
                        "100%": {
                            backdropFilter: "blur(9px)",
                            transform: "opacity(1)",
                        },
                    }
                }
            },
            ".MuiFormGroup-row": {
                flexWrap: "wrap",
                alignContent: "stretch",
                justifyContent: "space-between",
            }
        },
    },
}

module.exports = overrides;
