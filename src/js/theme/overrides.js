const overrides = {
    MuiCssBaseline: {
        "@global": {
            html: {
                overflow: "overlay",
                overscrollBehavior: "none",
                textRendering: "optimizespeed",
                touchAction: "none",
                fontFamily: `"Jura"`,
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
                margin: "0 !important",
                minWidth: "min(100%, 736px)",
            },
            ".MuiDialog-paperFullScreen": {
            },
            ".MuiDrawer-paperAnchorBottom": {
                clipPath: "polygon(calc(32px) 0, calc(200px) 0, calc(200px) calc(16px), calc(100% - 100px) calc(16px), calc(100% - 76px) 0, 100% 0, 100% 100%, 0 100%, 0 calc(16px))",
            },
            ".MuiFab-root.MuiFab-extended": {
                borderRadius: 4,
                background: "#020529",
            },
            ".MuiFab-root.MuiFab-extended:hover": {
                background: "#100d4e",
            },
            ".MuiButtonBase-root.MuiFab-root": {
                borderRadius: 4,
                background: "#020529",
            },
            ".MuiButtonBase-root.MuiFab-root:hover": {
                background: "#100d4e",
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
