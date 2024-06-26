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
            gap: "32px",
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
                gap: "16px",
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
            gap: "24px",
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
            roundNames: []
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

    _edit = () => {
        actions.load_with("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAuCAMAAACPpbA7AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURScID1QYFK9bRgEiUQAAAHw1JOivfQVEACNfBwApByNShhYgQOqhewcNIEGCFX29QczglfTCnfr/5fRfOggAAAKSSURBVEjHfZSLgqsgDEQDBETFtnv//2PvTAKK7W7jdqtySCaPIsvNqtmum9KWZTWbAPmgwe28zL7ytfPgdNv2A6brbHee8LPqAXAz58e2Hcd6tze+Hjuk7wDxQYz9LYLxBvqXHgfVHLi0J6JfecjZdkf7jj953uh+XCzv3gXJKIttWLqO6Fa4Qa/izP59A9lWpJQScZUWR9e8JKM+fcO/zp/WYiS/XC2b+NerktcyWzz0NjCzf6sPRQ+Y0VSv9pDvuVx87DG8QHiqVzvN/8ieL6KXRkKJInarsU4KTM8Ywc7Dq+Sfkkdh52E8+fXkC5Ku5aeUyu+Y45xflV7XnkTO0VP9GfUhf+HLxVvQmHOb+fbVP6w53+wP/1q51Xv8Xk4+t0Ywx5gNz7ku7/WZ+WXxeYjR5TzO0e3179y1IbZzgJrzdYRYBr9O50DlBg4z8efjcfI+P+vtcHjAZARoTV6vJ4xveyB5PzCqRmk2/6VJ1sf8a7L5fD9gNJsYfCRmDR/8TfwiETwnTThwGcGm5vb5n/FM/9INPF78yncciqkn0NgzPAV51Ps8DD6Yx0zOcUwTo4Xwya+gA5yFRD4GP1ByToF75JMPtgA+7fG0lFIOSELiiDHmMwSIgBbwG0bO8Za2FCzpO8/sgEt2PrH67AFuE9+hDNwR2HzieMpukiEhbRvHAed5cj6KrwbyK/KHSD6yOM53Mx5Z0R0TlKd4poSxAH43rMNb2u21dIdQZu7FeOQreSecUg8DHi0Mtoy7zjMfimIDxPkteQQq1+BiTh6toocgGsjPCaCJ2vkswccKXzYw4DV0KSMF592hhLHDt/C580M+eVvq63LxZup6JiM/EPV7vXb9wQePryc5Bbrjkwaz/zAjMdVs/8MtAAAAAElFTkSuQmCC");
    }


    //endIcon={<img style={{marginRight: 4}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURUdwTLVsThMTJ2I0NjogMotDNS0ZKuQtOFwlU5AqZkF9xYQAAAABdFJOUwBA5thmAAAAZklEQVQI12NgAAIXBwYIcBSBshJFxSCMFMMwMM1S7mwEptPcSxRAWhxFjWYUAfmBgqLGKu0KDK6CgoKBRk0QhqDRJAaGVDADqDg5UFBQFKSbyVRQMNgJZIyysbEJyBgGJiUlJSAFAOMzD0qzCfbZAAAAAElFTkSuQmCC"/>}
    render() {
        const { classes } = this.state;
        const { amountRaisedUSD, amountToRaiseUSD, roundNames } = this.state;

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
                                        <img className={"pixelated"} src={"data:image/png;base64,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"} onClick={() => this._open_link("https://www.linkedin.com/in/evdokia-bobrova/")}/>
                                    </Tooltip>
                                    <b>Eve B. 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"I think about the marketing."}>
                                        <img className={"pixelated"} src={"data:image/png;base64,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"} onClick={() => this._open_link("https://www.linkedin.com/in/annakarolinawisniewska/")}/>
                                    </Tooltip>
                                    <b>Ania W. 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"I think about the legislations."}>
                                        <img className={"pixelated"} src={"data:image/png;base64,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"} onClick={() => this._open_link("https://www.linkedin.com/in/mailinda-pilavi-kropf/")}/>
                                    </Tooltip>
                                    <b>Esq. Mailinda P-K. 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"I think about the fundraising."}>
                                        <img className={"pixelated"} src={"data:image/png;base64,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"} onClick={() => this._open_link("https://www.linkedin.com/in/profkarenwendt/")}/>
                                    </Tooltip>
                                    <b>Dr. Karen W. 🇨🇭 </b>
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
                                        <td>Marketing beast.</td>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td className={classes.name}>Sabrina B.</td>
                                        <td onClick={() => {window.open("https://noma.pro/")}} className={classes.link}>Noma.pro</td>
                                        <td>Strategist & Coach</td>
                                        <td>Serious as fuck.</td>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td className={classes.name}>Mathieu M.</td>
                                        <td onClick={() => {window.open("https://noma.pro/")}} className={classes.link}>Noma.pro</td>
                                        <td>Economist & Analyst</td>
                                        <td>Smart like a dolphin.</td>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td className={classes.name}>Arnaud D.</td>
                                        <td onClick={() => {window.open("https://agartha.ch/")}} className={classes.link}>Agartha.ch</td>
                                        <td>Fundraising Expert</td>
                                        <td>A hype engineer.</td>
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
