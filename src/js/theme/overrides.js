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
            "body.loaded": {
                fontFamily: `"Jura"`,
                fontSize: "auto !important",
                position: "fixed",
                overflow: "hidden",
                backgroundColor: "#FAFAFA",
                height: "100%",
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
                verticalAlign: "inherit",
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
                },
                "&.pulse2": {
                    animation: "$pulse2 1.8s cubic-bezier(0.280, 0.840, 0.420, 1) infinite 1s",
                    "@global": {
                        "@keyframes pulse2": {
                            "0%": {transform: "scale(1.9)"},
                            "10%": {transform: "scale(2)"},
                            "30%": {transform: "scale(1.9)"},
                            "50%": {transform: "scale(2)"},
                            "57%": {transform: "scale(1.9)"},
                            "64%": {transform: "scale(2)"},
                            "100%": {transform: "scale(1.9)"},
                        }
                    }
                }
            },
            ".emoji-150": {
                verticalAlign: "inherit",
                height: "1em",
                width: "2.5em",
                transform: "scale(1.5)",
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
                zIndex: "1",
                borderRadius: 8
            },
            ".MuiAvatar-root": {
                contain: "paint style layout",
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
            ".MuiTooltip-popper.green .MuiTooltip-tooltip": {
                backgroundColor: '#98ff7c88',
                color: '#98ff7c)',
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
