import React from "react";
import JOYSON from "joyson";
import withStyles from "@material-ui/core/styles/withStyles";
import actions from "../actions/utils";
import FileDownload from "../icons/FileDownload";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import LinkedIn from "../icons/LinkedIn";
import Telegram from "../icons/Telegram";
import Badge from "@material-ui/core/Badge"
import Lottie from "../components/Lottie";
import YouTube from "@material-ui/icons/YouTube";
import AttachMoney from "@material-ui/icons/AttachMoney";

const styles = theme => ({
    root: {
        textAlign: "left",
        overflow: "overlay",
        maxHeight: "100%",
        paddingTop: 32,
        paddingBottom: 32,
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100%",
        fontWeight: "initial",
        "& a": {
            color: "#ddefff"
        },
        "& a:visited": {
            color: "#bcdcff"
        },
        "& a:hover": {
            color: "#ffffff"
        },
        "@media (max-width: 520px)": {
            "& ol": {
                display: "block !important",
                "& li": {
                    width: "100% !important",
                    margin: "12px 0px 0px 0px !important"
                }
            },
        },
        "& ol": {
            display: "flex",
            "& li": {
                width: "calc(33% - 16px)",
                margin: 8,
                color: "#c0c0c0",
                transition: "color 225ms cubic-bezier(0.4, 0, 0.2, 1)"
            }
        },
        "& ol li:hover": {
            color: "#ffffff"
        },
        "& h3": {
            margin: "32px 0px 16px 0px"
        }
    },
    text: {
        minWidth: "836px",
        width: "100%",
        maxWidth: "836px",
        margin: "auto",
        "@media (max-width: 948px)": {
            margin: "36px",
            minWidth: "0",
            maxWidth: "calc(100% - 72px)",
            "& img.main": {
                display: "none"
            }
        },
        "@media (max-width: 520px)": {
            margin: "16px",
            maxWidth: "calc(100% - 32px)",
        },
        "& img.main": {
            width: "400px",
            height: "400px",
            marginLeft: "32px",
            cursor: "pointer",
            padding: 12,
            borderRadius: 8,
            backgroundColor: "#ffffff",
            boxShadow: "rgb(255 255 255 / 32%) 0px 4px 8px 2px, rgb(255 255 255 / 16%) 0px 4px 5px 5px, rgb(255 255 255 / 4%) 0px 1px 10px 14px",
            maxWidth: "100%",
            maxHeight: "100%",
        }
    },
    video: {
        "@media (max-width: 875px)": {
            display: "none"
        }
    },
    tableWrapper: {
        maxWidth: "100%",
        position: "relative",
        overflowX: "overlay",
    },
    styledBadgeConnectedA: {
        "& .MuiBadge-badge": {
            color: "#00e93d",
            marginRight: -20,
            marginTop: 8,
            backgroundColor: "#00d707",
            boxShadow: `0 0 0 2px ${theme.palette.secondary.dark}`,
            "&::after": {
                position: "absolute",
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                animation: "$rippleA 1.2s infinite ease-in-out",
                border: "1px solid currentColor",
                content: "\"\"",
            }
        },
        "@global": {
            "@keyframes rippleA": {
                "0%": {
                    transform: "scale(.8)",
                    opacity: 1,
                },
                "100%": {
                    transform: "scale(2.4)",
                    opacity: 0,
                },
            }
        }
    },
    table: {
        fontSize: "16px",
        minWidth: "max-content",
        "& tr": {
            "&:hover th": {
                backgroundColor: "rgba(255,255,255,0.36)",
            },
            "& th": {
                backgroundColor: "#ffffff3d",
                padding: "4px 16px 4px 12px",
                transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
            },
            "& td": {
                padding: "4px 16px 4px 12px",
                marginRight: 24
            }
        }
    },
    founders: {
        textAlign: "left",
        "@media (max-width: 420px)": {
            "& > div": {
                display: "grid !important",
                gridTemplateColumns: "repeat(1, 1fr) !important",
                gap: "0px",
                padding: "0"
            },
            "& > div > div": {
                marginBottom: "16px",
            }
        },
        "& img": {
            width: "100%",
            marginBottom: 8,
            height: "auto",
            transform: "scale(1)",
            transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: "8px",
            cursor: "pointer"
        },
        "& img:hover": {
            transform: "scale(1.05)",
            transition: "all .6s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        "& > div": {
            display: "grid !important",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
            padding: "0"
        },
        "& > div > div": {
            marginBottom: "16px",
        }
    },
    advisors: {
        textAlign: "left",
        "@media (max-width: 420px)": {
            "& > div": {
                display: "grid !important",
                gridTemplateColumns: "repeat(2, 1fr) !important",
                gap: "8px",
                padding: "0"
            },
            "& > div > div": {
                marginBottom: "16px",
            }
        },
        "& img": {
            width: "100%",
            marginBottom: 8,
            height: "auto",
            transform: "scale(1)",
            borderRadius: "4px",
            transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer"
        },
        "& img:hover": {
            transform: "scale(1.05)",
            transition: "all .6s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        "& > div": {
            display: "grid !important",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
            padding: "0"
        },
        "& > div > div": {
            marginBottom: "16px",
        }
    },
    actionButtonICO: {
        margin: "32px 0px 48px 0px",
        fontSize: "21px",
        background: "radial-gradient(ellipse farthest-corner at right bottom, #ffffff 0%, #fff2a3 15%, #ffea37 30%, #ffdf58c4 40%, #ffd14ea8 50%, #ffbc0073 60%, #c78e2700 80%), radial-gradient(ellipse farthest-corner at left top, #fff5a9 0%, #ffff78 15%, #ffe8a7 25%, #ffcd15 62.5%, #5f3900 100%)",
        color: "#000000",
        filter: "drop-shadow(0px 0px 1px #fff8a599) drop-shadow(0px 0px 3px #ffd04566) brightness(.75) contrast(.85) saturate(1.5) brightness(.95)",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            filter: "drop-shadow(0px 0px 4px #fff8a599) drop-shadow(0px 0px 12px #ffd04566) brightness(.85) contrast(1.4) saturate(.88) brightness(1.1)",
        },
        height: 64,
    },
    buttons: {
        boxSizing: "border-box",
        "& button:last-child": {
            "@media (max-width: 395px)": {
                marginLeft: "0 !important",
                marginTop: 12
            }
        },
        "& button": {
            "@media (max-width: 275px)": {
                marginLeft: "0 !important",
                marginTop: 12
            }
        }
    },
    firstButton: {
        background: "radial-gradient(circle 78px at 10% 50%, rgb(76 63 255) 0%, #2f2f8c 100.7%)",
        color: "rgb(160,193,255)",
        filter: "drop-shadow(0px 0px 0px #4C3FFFFF) drop-shadow(0px 0px 0px #2f2f8c)",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            background: "radial-gradient(circle 78px at 10% 50%, rgb(76 63 255) 0%, #2f2f8c 100.7%)",
            color: "rgb(255,255,255)",
            filter: "drop-shadow(0px 0px 2px #4C3FFFFF) drop-shadow(0px 0px 7px #2f2f8c)",
        }
    },
    whiteButton: {
        background: "radial-gradient(circle 78px at 10% 50%, #fff 0%, #A0C1FFFF 100.7%)",
        color: "#000",
        filter: "drop-shadow(0px 0px 0px #fff) drop-shadow(0px 0px 0px #A0C1FFFF)",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            background: "radial-gradient(circle 78px at 10% 50%, #fff 100%, #A0C1FFFF 200%)",
            color: "#000",
            filter: "drop-shadow(0px 0px 3px #fff) drop-shadow(0px 0px 5px #A0C1FFFF)",
        }
    },
    tableGreenActive: {
        color: "#00ff00",
        backgroundColor: "#072a00",
        cursor: "pointer",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            color: "#4eff4e",
            textShadow: "0px 0px 12px lightgreen",
            backgroundColor: "#0c4600",
        }
    },
    tableWhite: {
        color: "#ffffff",
        backgroundColor: "#171717",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            color: "#ffffff",
            backgroundColor: "#282828",
        }
    },
    tableOrange: {
        color: "#ff5c03",
        backgroundColor: "#2f1200",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            color: "#ff6718",
            backgroundColor: "#571f00",
        }
    },
    tableRed: {
        color: "#c20000",
        backgroundColor: "#280000",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            color: "#ff1515",
            backgroundColor: "#500000",
        }
    },
    link: {
        textDecoration: "underline",
        cursor: "pointer"
    },
    name: {
        textShadow: "0px 0px 2px 4px white"
    },
    icoState: {
        color: "#8aa6ff"
    },
    icoProgressBar: {
        borderRadius: "4px",
        contain: "paint size style layout",
        "@global": {
            "@keyframes ICOProgressBufferFlux": {
                "0%":  { left: "-60%", background: "linear-gradient(90deg, rgba(255,255,255,0) 10%, #76a2ffc9 110%)"},
                "100%": { left: "130%", background: "linear-gradient(90deg, rgba(255,255,255,0) 10%, #76a2ffc9 110%)"}
            }
        },
        height: "24px",
        width: "100%",
        margin: "36px 0 24px 0",
        backgroundColor: "#000a42",
        position: "relative",
        "&::before": {
            content: "''",
            position: "absolute",
            height: "24px",
            width: "30%",
            background: "rgba(255,255,255,0)",
            animation: "$ICOProgressBufferFlux 1.2s linear infinite 2.4s"
        }
    },
    icoProgressBuffer: {
        borderRadius: "4px",
        backgroundColor: "#76a2ffc9",
        boxShadow: "0px 0px 12px #1937ff",
        height: "100%",
        width: "0%",
        transition: "width 1.7s cubic-bezier(1, 0, 0.65, 0.85)"
    },
    icoProgressText: {
        textAlign: "center",
        fontSize: "24px",
        lineHeight: "56px"
    }
});

// startIcon={<img style={{marginLeft: 4}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPBAMAAADNDVhEAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURUdwTP/LPGI0Nv+iADogMhoQF/T/m9FpCv99ALlQJ68UySgAAAABdFJOUwBA5thmAAAAUUlEQVQI12NgUFJgAAEWwSQw7SlsBhaIFDYGC4Q3QmjWCkEhsIKIcgcwzRoC08qUlgKm1YwzQVJMwsaSASAThQ3LwbSgRClY3qM9AGKVKwMDAKz7C7yd/uyrAAAAAElFTkSuQmCC"/>}

class Marketplace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            playCallback: null,
            _settings: JOYSON.unpack(props.settings),
            amountRaisedUSD: 0.0,
            amountToRaiseUSD: 0.0,
            roundNames: [],
            _eve: "data:image/png;base64,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",
            _ania: "data:image/png;base64,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",
            _mailinda: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAMAAAC4XpwXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABdUExURUdwTDQJa/3QpQQBGexMddE1ZeHEx1AQd/WEe/tee5JLvFYfBG0rDHAxEO3q7Ozp7EMYAv2yk6mXybqlzDEFAf3rxbQpcoIUFIAqoZ8ca/uwPatHUlFAgLZ6mHUgP+so73wAAAAKdFJOUwD////+/v7+/v5f1+LGAAAKyUlEQVRo3rWaiWKbOBCGKyQsMMKAjxzt7r7/Y+6cOjji1BC1TWLX4dM/MxqNjl/h19MWQuihwTdrbejpRd9bbvBTB+3XTzVh94Fh0hdEdsrvfwzPkrX1wguB8N048hs/JJ/gfUjwPm8/jA8kMpTic6eHkfg/gmcnwxfoAdoA4dEToj8I/njnQ4hzmGXSCQ694bhHfrL+sXDbd5YpnaIVnnyR4e2h8CABDg8O9IqhMtYS/yfwArcxuXTF6FvBQ6+Oky7x3euI68ImnobegeLZwYHzWy89eIY/THwQB4vpU2q3rbN1THyKh8RjeXAcZniAd5rfVPSfEJyr67fPz7fPN2loFRCPqekYesD82lEHQFcU3jQVtOnWYKtjeyM8xEV3jHiKtc7yZCIjrKuy1nBroSEf8COkAQyUQ6T36HdWT/HWdc1UXYbLUPJb4VuaESgNHZJjOavIF4j2MFUDwIe5fsQ7MD7NukfROYZiD5oJlAN7WJqf5dPnDqFbSe+SVDv8A7BhBi/wb0Sn3zpAuhW/S7ADCp1+qbbwLP4wOo8fjvZGlM+k53iX6HYvPaj6pHzh9QxPtrecnI6gk99F/VRtSp+LP4Buxerid8pvm/Qk3kFs9vsdb8nuQcyuKS5LNOt413VHOJ7osZxTyJZ2aYAnen8AHUzfz7P7U7o7kG5L6d8Q78bxgBFPdC2e49P7vmmG4bGNh08fRpciSh+NS4qZLeZoS/jdBY5NcIV1NL0tnFGwp1s7HkUvYq6j0X6JGldkT9BacvxOfFa5dyniLujy6Q3LqKwDMNTxlWtvN6KL5/fRrV1UU9a5f1IZaVulW/v2KZ92Yyfid9LDjO4+rIkFdO1gdCu9zipronf90ZavmmL58PnZNjz4m7fsbQ/0sdtZV2erdKVPTgmn08na6+dnw/jmXwuvB3yfx/vY7cRToimnmGlSOgw86MkJ6DTrgPQTdwrhI4Ud4vetY6rHQ+k40qZGTc+j/gTvVCge6NH2dYTv2UmgSb2uIx01TjGdodd1yq8qKOVb51qLyyumU+2/k36rayf0rJYECwCr4QUV4GlqaxrHjfCd3Ycnt7d15YJafm1uw/fgH9GlIZ1mg9106yoHtu+m9aKK37kgvWly/AF0m9Gnar6AEnOodvcTdEhv4PnQEH5WTKsxknYp7+r6QPrE6zemDws40ptIp6x7FN0CvcL9Ara9TLBq+Pi9cRGOeEdJai89sPiK6FO1NH7sBZk+jshI/7WTTjO4hSTXTOuBz28gvTqY3sf6YVL1VQz8qeElrdBdkt443ejYQ+eq/MHzS8TrhMOmHi40zTRt5vZGtll2zHGJDvj2wbaP/InobSzv85BP9NfTfNodfTweQM/w+G3K/BzXsPqD7mjuc7sso/5Uzj3ouZM2lQqzSktxlmXaYwyfTj9+k/fl2cJW7fVbi/NaYrt2t+H18CfSh7Q32ORwlI8FVkbXiN8nvcvp/83xyefOZXaHkbc/5mQxxvTfv0V8RdJcCUf8/T5z+y7pv2QlKnQ1PWWSVNTgcHt/v9/DnVtBtwfQ+6jdXlQojyzKc+/YQpAOsNvZ8N2+Yj6jSxlbjO970UJdh5y+T/oavc3xTXW/18PAU/6A6RYsUBh+55nEnF6Kr8DhNW4dMh/kB4aPcpKzL9cEpmf4Pws8thr59T1KH2VvE1abZhd9nIlv53hA1jUH3rtKH3n5ZaC9Kh8yHdLHSOez17agB4w15OLfKH0U6TvwRB9LOuJL8WD2mrW/a8SPspIgujevGR9oo9D7dBwJ5f1lhmfLB4U3vIhS7UA3r80xI4rvcjrhZzt1d810TSld6a+IJ1gIa/Q5vnJZjp3BPdLNK4anqCd8eIZPc1y0u9C9eZ1ueedL8bxrCqjHY+1koJAuhie6eSXVJfF6y0bWlW4pn/swZob3Jjr+VfpMfK/iV/Einc9x2OyvRX2+9WYzPNOndT5L5x1tMftuOh9widHp0W0D+Hbh/cZF6UJ/ccQns/Mtnuzsm/Zip6Zd8GFap42qaPjod/8KHcnw20s80KfG0dFb5DusY0n6kv6X2iM6nM9nw/qzuc6xeIS7ePAvM7LQzQ7LK9yfsXlvSX/cq28dLidaVt/Gk+cwbtD/Dq+p4iytF/MrHumVnHpqo7Tczeg85P6OPmOjeDOGuDIj009UWZd0LEWi38Nr2iVJns8lXe+ahIye42mngC64MR7shGR492+CntgZWPs/jnI0FiTqab/Azeh8N8LGOxKB6d/M9Jygk2YvyRLEEz3hJ8ZLc7w91cdLD/wDvUd0+112CRc80208G3TTVKiP9OzWG5/Gmm/ReWI6z1rEc86Lt9uc4FvGu5SQungHjMpxjronpT3Hmi+wBX9cim/4yLctbzvgHTz6FCv3xshs//Uo834mWzvjM9Pn4mkpifme8ZqM+cqvDTwI9Prvl4FnzMfH3OqmaKMNacCHKF5tn00FQkS6Xtt4Si8TzNnP8fLgeK0xige6o5seqfInPIpP9/DMV/goll0tjl/gwxjpJF7wrmrb8pIfFcQ53T6lE5+/ecpwMdkwfQxIV9u3WeDhDMuHdNeEtzHtPxOfO1tM7ulPjh/pSJqDz0O+a9XzLZ4SIv40DLfbLbsFmvBf1barwRZTTUZXOEy7IL6Rqw6xpoblPOLhd/WGdUcBaL4cdduxntNHNSMmgSA75gmPX4YL0eH/yfq9Wt98Jf78LbzN4D7wgQG7Pm7RDmR7pPuUcA0JR7p9Tt/kZ2x8+nLjUumMN3rPVHI9PsGv0/3Zf0O+sTr5oLbmQUVlRsc9FKIbH/l8DZYn2nW6nSf6b9CDjY6PO/ODaL8aX+KVvrqeJiJ+Ush+A++j3Un8bZqtZgB+vWXiyfsUf0/pke+38R8Z3djrlB1WVNOEu2dXFH9V8YInG/itGi9aHD7EgA26jU+FH+z1Crh4XjDR3uH1Uor3SPeS7tZrvCzgYlRvhX2ig/jhInuVumN5Je3J86w+0dcGfTHeKP426MRP+q+oXhp1BF7PPe+9EZsb+tUlnuNcZ1cR+MWoJ+mMvxSN6Fe0wjWn8/6N/ZKuE6x0cgPPWUyee0P1Ih+5+ILtMZg8RGgHhVxgVukY58rjrpotOv73h8TG7XRj8xObZPPLpXjLAbAUT9LTNpe61/iNqLMf0fO30+l0vdIoQ/YN6GyMhfhEN5vjPV9/ebPgEz1lPGOuQB90n/52RbrGQKIn8RQzM3xMsDl/1frU/yznQNwB/sSOv2IQDjIMoBsL8UZ3s4p8b1J+z/YZhW/n+I+czuJj2Inb6dUp2l6nXBlztpxtONy5pDcm6aee2tIIBZzEDxr1mOlEOp2VXFc8L8OvsHxezub8lKE26SYf8sNNfyB8IV7iTp4+H3FSz5b2X8X7ufgMHwc/Jf0l3tjF0kqYMtw40SheJodZ2BfiZwmPAh4v2V8uK+LX6GZZU+jRyiL6vxRfmGDV84vVRVzIbOE3ptkofljRTm1LfElfLabiiJuN/Ofiyes86maDLts/X2SbIqHHmIt+9x9bnh+W9EuZbwvx/Fihz8pJX6rn/KxTjP++eFQfxdtMuy8KDesX1bSVuc7q5oduAPoV8TTNDevibUY3kZ7bHp+W75rESU6WITxQabagmnMmfjXubhL2xi7pRuoHTrgsLW7WnIs0G33FzvtnU3yh/SIJeI2e/TrA/we19AcIsHT3xgAAAABJRU5ErkJggg==",
            _karen: "data:image/png;base64,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"
        };
    }

    componentWillMount() {

        actions.trigger_loading_update(0);
        actions.trigger_page_render_complete();
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 300);
    }

    componentDidMount = () => {

        fetch("https://openfund.com/api/v0/funding-rounds?username=Pixagram").then((result) => {
            result.text().then((text) => {
                var amountRaisedUSD = 0.0;
                var amountToRaiseUSD = 60000.0;
                var roundNames = [];
                JSON.parse(text).forEach((obj) => {
                    console.log(obj)
                    roundNames.push(obj.RoundName);
                    amountRaisedUSD += obj.AmountRaisedUSDCents / 100;
                    //amountToRaiseUSD = obj.AmountToRaiseUsdCents / 100;
                });

                this.setState({amountRaisedUSD, amountToRaiseUSD, roundNames}, () => {
                    this.forceUpdate();
                })
            });
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return false;
    }

    _open_link = (url) =>{
        window.open(url);
    };

    _edit = (b64) => {
        actions.load_with(b64);
    }


    //endIcon={<img style={{marginRight: 4}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURUdwTLVsThMTJ2I0NjogMotDNS0ZKuQtOFwlU5AqZkF9xYQAAAABdFJOUwBA5thmAAAAZklEQVQI12NgAAIXBwYIcBSBshJFxSCMFMMwMM1S7mwEptPcSxRAWhxFjWYUAfmBgqLGKu0KDK6CgoKBRk0QhqDRJAaGVDADqDg5UFBQFKSbyVRQMNgJZIyysbEJyBgGJiUlJSAFAOMzD0qzCfbZAAAAAElFTkSuQmCC"/>}
    render() {
        const { classes } = this.state;
        const { amountRaisedUSD, amountToRaiseUSD, roundNames, _eve, _ania, _mailinda, _karen } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.text}>
                    <div style={{display: "flex"}}>
                        <div>
                            <Fade in timeout={400}>
                                <h1 style={{fontSize: "56px", fontWeight: "bold", marginTop: 0, color: "white", textShadow: "rgb(255 255 255 / 56%) 0px 0px 2px, rgb(255 161 225 / 56%) 0px 0px 8px, rgb(82 46 255) 0px 0px 12px, rgb(4 41 255) 0px 0px 24px"}}>Initial Coin Offering</h1>
                            </Fade>
                            <Fade in timeout={500}>
                                <h2 style={{marginTop: "24px", color: "#bdbdbd"}}>Pixa.Market is a social media blockchain NFT platform working exclusively with 1000x more lightweight images as it is pixel-art. Our current target of timespan for NFTs is beyond 1,000 years.</h2>
                            </Fade>
                            <Fade in timeout={600}>
                                <div style={{marginTop: 32}}>
                                    <Tooltip title={"10 Minutes Reading Presentation PDF | 3 Mo"}>
                                        <Button  size={"large"} style={{marginRight: 16}} className={classes.whiteButton} startIcon={<FileDownload/>} onClick={() => this._open_link("https://drive.google.com/file/d/1nIpVDSxgViEn183Kyr3SvLBlFmaaOzwe/view")} color={"primary"} variant={"contained"}>Pitch-Deck</Button>
                                    </Tooltip>
                                    <Tooltip title={"20 Minutes Reading A4 PDF | 3 Mo"}>
                                        <Button  size={"large"} className={classes.whiteButton} startIcon={<FileDownload/>} onClick={() => this._open_link("https://drive.google.com/file/d/1bx-14zE2EYt4fpycxr84sMWDa_JaYliW/view")} color={"primary"} variant={"contained"}>Lite-Paper</Button>
                                    </Tooltip>
                                </div>
                            </Fade>
                        </div>
                        <Fade in timeout={700}>
                            <video className={classes.video} width="480" height="320" controls>
                                <source src="/src/videos/demo.mp4" type="video/mp4"/>
                            </video>
                        </Fade>
                    </div>
                    <div style={{marginTop: 32}}>
                        <h3 style={{fontSize: "34px", textAlign: "center", fontWeight: "bold"}}>
                            <span>{roundNames[0]}</span>
                        </h3>
                        <div className={classes.icoState}>
                            <div className={classes.icoProgressBar}>
                                <span style={{position: "absolute", left: `calc(${Math.round(amountRaisedUSD/amountToRaiseUSD*100)}% + 8px)`}}>{Math.round(amountRaisedUSD/amountToRaiseUSD*100)}%</span>
                                <span style={{position: "absolute", right: 8}}>100%</span>
                                <div className={classes.icoProgressBuffer} style={{width: (Math.round(amountRaisedUSD/amountToRaiseUSD*100))+"%"}}></div>
                            </div>
                            <div className={classes.icoProgressText}>
                                <span style={{marginRight: 32}}>
                                    <span>{Math.round(amountRaisedUSD/1000*100)/100}</span>
                                    <span>K / </span>
                                    <span>{Math.round(amountToRaiseUSD/1000*100)/100}</span>K USD
                                </span>
                                <Tooltip title={"Buy our utility token on openfund.com"}>
                                    <Button  size={"large"}  style={{backgroundColor: "#33acff"}} className={classes.firstButton} startIcon={<AttachMoney/>} onClick={() => this._open_link("https://openfund.com/d/Pixagram")} color={"primary"} variant={"contained"}>BUY NOW</Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <Fade in timeout={800}>
                        <div>
                            <div style={{fontSize: "18px"}}>
                                <p style={{marginTop: 24, fontSize: "21px", fontWeight: "bold", color: "#fff"}}>You can use it for the following advantages:</p>
                                <ol>
                                    <li>Make money without investing anything else but a few minutes of your spare time.</li>
                                    <li>Possess someone else unique life story as a digital experience lasting forever.</li>
                                    <li>Trade the best in-class or rarest artworks and keep your friends up to date.</li>
                                </ol>
                            </div>
                        </div>
                    </Fade>
                    <Fade in timeout={1000}>
                        <div>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>
                                <span>Price & Discount</span>
                            </h3>
                            <div className={classes.tableWrapper}>
                                <table className={classes.table}>
                                    <tr>
                                        <th>Round's Name</th>
                                        <th>Price</th>
                                        <th>Discount</th>
                                        <th>Quantity</th>
                                        <th>Value</th>
                                        <th>State</th>
                                    </tr>
                                    <tr className={classes.tableGreenActive} onClick={() => this._open_link("https://openfund.com/d/Pixagram")}>
                                        <td>
                                            <Badge className={classes.styledBadgeConnectedA} overlap="circular" badgeContent=" " variant="dot">
                                                <span>Pre-Seed</span>
                                            </Badge>
                                        </td>
                                        <td>$ 0.03</td>
                                        <td>50.0% Off</td>
                                        <td>2 Millions</td>
                                        <td>$ 60,000</td>
                                        <td>Open</td>
                                    </tr>
                                    <tr className={classes.tableOrange}>
                                        <td>Seed</td>
                                        <td>$ 0.035</td>
                                        <td>41.6% Off</td>
                                        <td>4 Millions</td>
                                        <td>$ 140,000</td>
                                        <td>Readying</td>
                                    </tr>
                                    <tr className={classes.tableRed}>
                                        <td>Community</td>
                                        <td>$ 0.04</td>
                                        <td>33.3% Off</td>
                                        <td>10 Millions</td>
                                        <td>$ 400,000</td>
                                        <td>Not Open</td>
                                    </tr>
                                    <tr className={classes.tableRed}>
                                        <td>Strategic</td>
                                        <td>$ 0.05</td>
                                        <td>16.6% Off</td>
                                        <td>10 Millions</td>
                                        <td>$ 500,000</td>
                                        <td>Not Open</td>
                                    </tr>
                                    <tr className={classes.tableRed}>
                                        <td>Other</td>
                                        <td>$ 0.06</td>
                                        <td>No Discount</td>
                                        <td>1 to 10 Millions</td>
                                        <td>$ 60-600 k</td>
                                        <td>Not Open</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </Fade>
                    <Fade in timeout={1200}>
                        <div className={classes.buttons}>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>
                                <span>Stay Tuned Using Our Links</span>
                            </h3>
                            <div style={{display: "float", position: "relative", margin: "16px 0px 32px 0px", height: 32}}>
                                <div style={{float: "left", display: "flow-root"}}>
                                    <Tooltip title={"Stay tuned with Pixa on LinkedIn!"}>
                                        <Button size={"large"} startIcon={<LinkedIn/>} onClick={() => this._open_link("https://www.linkedin.com/company/pixagram-blockchain/")} style={{marginRight: 12, backgroundColor: "#0077B5", color: "white"}} color={"secondary"} variant={"contained"}>Blog</Button>
                                    </Tooltip>
                                    <Tooltip title={"Chat with us on Telegram after validation!"}>
                                        <Button  size={"large"} startIcon={<Telegram/>} onClick={() => this._open_link("https://t.me/+eziqKfod9gQ3YTJk")} style={{marginRight: 12, backgroundColor: "#0088cc", color: "white"}} color={"secondary"} variant={"contained"}>Chat</Button>
                                    </Tooltip>
                                    <Tooltip title={"See our livestream on Mathiew's YouTube channel!"}>
                                        <Button  size={"large"} startIcon={<YouTube/>} onClick={() => this._open_link("https://www.youtube.com/watch?v=Oa0d0uVi4f4&list=PLai3U8-WIK0FwmzgFS9TbjzhYz5R_aRRn")} style={{marginRight: 12, backgroundColor: "#FF0000", color: "white"}} color={"secondary"} variant={"contained"}>Livestreams</Button>
                                    </Tooltip>
                                </div>
                                <div style={{float: "right"}}>
                                </div>
                            </div>


                        </div>
                    </Fade>
                    <Fade in timeout={1300}>
                        <div>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Tokenomics</h3>
                            <h4 style={{fontSize: "22px", fontWeight: "bold", marginTop: "12px", marginBottom: "8px"}}>Height Times Cheaper Than STEEM & HIVE</h4>
                            <p>Steem <a href={"https://steem.com/SteemWhitePaper.pdf"} target="_blank">(WHITEPAPER HERE)</a> and Hive (The same technology used by Pixa) have the same parameters regarding the coin inflation and supply with a similar wind, Pixa could demonstrate around a profits of eight times the initial input.</p>
                            <p>The time Pixa develop its own plugin for trading post (pixel artwork) is set to around one years, then it should be more or less driven by the same force behind the market which set the token price at around $ 0.30.</p>
                        </div>
                    </Fade>
                    <Fade in timeout={1450}>
                        <div className={classes.founders}>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Meet The Co-Founders</h3>
                            <p>Book a call with us at any time! <a href={"mailto:omnibus@pixagram.io"} target={"_blank"}>omnibus@pixagram.io</a>. Or contact us on <a href={"https://www.linkedin.com/company/pixagram-blockchain/"} target={"_blank"}>LinkedIn</a>.</p>
                            <div style={{display: "inline-flex", marginTop: 32, verticalAlign: "bottom", textAlign: "center"}}>
                                <div>
                                    <Tooltip title={"I make software."}>
                                        <img className={"pixelated"} src={"data:image/png;base64,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"} onClick={() => this._open_link("https://www.linkedin.com/in/matias-affolter/")}/>
                                    </Tooltip>
                                    <b>Matias Affolter 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"I do mathematics."}>
                                        <img className={"pixelated"} src={"data:image/png;base64,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"} onClick={() => this._open_link("https://www.linkedin.com/in/mathiew-estepho-b7078894/")}/>
                                    </Tooltip>
                                    <b>Mathiew Estepho 🇨🇦 </b>
                                </div>
                            </div>
                        </div>
                    </Fade>
                    <Fade in timeout={1600}>
                        <div className={classes.advisors}>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Meet The Advisors</h3>
                            <p>Book a call with us at any time! <a href={"mailto:omnibus@pixagram.io"} target={"_blank"}>omnibus@pixagram.io</a>. Or contact us on <a href={"https://www.linkedin.com/company/pixagram-blockchain/"} target={"_blank"}>LinkedIn</a>.</p>
                            <div style={{display: "inline-flex", marginTop: 32, verticalAlign: "bottom", textAlign: "center"}}>
                                <div>
                                    <Tooltip title={"I think about the marketing."}>
                                        <img className={"pixelated"} src={_eve} onClick={(e) => {this._edit(_eve)}}/>
                                    </Tooltip>
                                    <b style={{cursor: "pointer"}} onClick={() => this._open_link("https://www.linkedin.com/in/evdokia-bobrova/")}>Eve B. 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"I think about the marketing."}>
                                        <img className={"pixelated"} src={_ania}  onClick={(e) => {this._edit(_ania)}}/>
                                    </Tooltip>
                                    <b style={{cursor: "pointer"}} onClick={() => this._open_link("https://www.linkedin.com/in/annakarolinawisniewska/")}>Ania W. 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"I think about the legislations."}>
                                        <img className={"pixelated"} src={_mailinda} onClick={(e) => {this._edit(_mailinda)}}/>
                                    </Tooltip>
                                    <b style={{cursor: "pointer"}} onClick={() => this._open_link("https://www.linkedin.com/in/mailinda-pilavi-kropf/")}>Esq. Mailinda P-K. 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"I think about the fundraising."}>
                                        <img className={"pixelated"} src={_karen} onClick={(e) => {this._edit(_karen)}}/>
                                    </Tooltip>
                                    <b style={{cursor: "pointer"}} onClick={() => this._open_link("https://www.linkedin.com/in/profkarenwendt/")}>Dr. Karen W. 🇨🇭 </b>
                                </div>
                            </div>
                        </div>
                    </Fade>
                    <Fade in timeout={1800}>
                        <div>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Partners</h3>
                            <div className={classes.tableWrapper}>
                                <table className={classes.table}>
                                    <tr>
                                        <th>Name</th>
                                        <th>Company</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td className={classes.name}>Sergey G.</td>
                                        <td onClick={() => {window.open("https://crynet.io/")}} className={classes.link}>Crynet.io</td>
                                        <td>Marketing Expert</td>
                                        <td>Smart.</td>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td className={classes.name}>Sabrina B.</td>
                                        <td onClick={() => {window.open("https://noma.pro/")}} className={classes.link}>Noma.pro</td>
                                        <td>Strategist & Coach</td>
                                        <td>Serious.</td>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td className={classes.name}>Mathieu M.</td>
                                        <td onClick={() => {window.open("https://noma.pro/")}} className={classes.link}>Noma.pro</td>
                                        <td>Economist & Analyst</td>
                                        <td>Diligent.</td>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td className={classes.name}>Arnaud D.</td>
                                        <td onClick={() => {window.open("https://agartha.ch/")}} className={classes.link}>Agartha.ch</td>
                                        <td>Fundraising Expert</td>
                                        <td>Friendly.</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </Fade>
                    <Fade in timeout={2000}>
                        <div>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Have Fun! <Lottie
                                id={"coins"}
                                hover={true}
                                autoplay={true}
                                loop={true}
                                src="/src/js/notoemoji/lottie/1f61c.json"
                                style={{height: "2em", width: "2em", transform: "translateY(25%)"}}/></h3>
                        </div>
                    </Fade>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Marketplace);
