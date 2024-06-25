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
            transform: "scale(1.0)",
            filter: "grayscale(1)",
            transition: "all 175ms cubic-bezier(0.4, 0, 0.2, 1) !important",
            "&:hover": {
                transform: "scale(1.05)",
                filter: "grayscale(0)"
            }
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
                                        <Button style={{marginRight: 16}} className={classes.whiteButton} startIcon={<FileDownload/>} onClick={() => this._open_link("https://drive.google.com/file/d/1nIpVDSxgViEn183Kyr3SvLBlFmaaOzwe/view")} color={"primary"} variant={"contained"}>Pitch-Deck</Button>
                                    </Tooltip>
                                    <Tooltip title={"20 Minutes Reading A4 PDF | 3 Mo"}>
                                        <Button className={classes.whiteButton} startIcon={<FileDownload/>} onClick={() => this._open_link("https://drive.google.com/file/d/1bx-14zE2EYt4fpycxr84sMWDa_JaYliW/view")} color={"primary"} variant={"contained"}>Lite-Paper</Button>
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
                                    <Button style={{backgroundColor: "#33acff"}} className={classes.firstButton} startIcon={<AttachMoney/>} onClick={() => this._open_link("https://openfund.com/d/Pixagram")} color={"primary"} variant={"contained"}>BUY NOW</Button>
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
                                        <Button startIcon={<LinkedIn/>} onClick={() => this._open_link("https://www.linkedin.com/company/pixagram-blockchain/")} style={{marginRight: 12, backgroundColor: "#0077B5", color: "white"}} color={"secondary"} variant={"contained"}>Blog</Button>
                                    </Tooltip>
                                    <Tooltip title={"Chat with us on Telegram after validation!"}>
                                        <Button startIcon={<Telegram/>} onClick={() => this._open_link("https://t.me/+eziqKfod9gQ3YTJk")} style={{marginRight: 12, backgroundColor: "#0088cc", color: "white"}} color={"secondary"} variant={"contained"}>Chat</Button>
                                    </Tooltip>
                                    <Tooltip title={"See our livestream on Mathiew's YouTube channel!"}>
                                        <Button startIcon={<YouTube/>} onClick={() => this._open_link("https://www.youtube.com/watch?v=Oa0d0uVi4f4&list=PLai3U8-WIK0FwmzgFS9TbjzhYz5R_aRRn")} style={{marginRight: 12, backgroundColor: "#FF0000", color: "white"}} color={"secondary"} variant={"contained"}>Livestreams</Button>
                                    </Tooltip>
                                </div>
                                <div style={{float: "right"}}>
                                </div>
                            </div>


                        </div>
                    </Fade>
                    <Fade in timeout={1300}>
                        <div>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Tokenomics (800% Potential ROI)</h3>
                            <p>Steem and Hive (The same technology used by Pixa) have the same parameters regarding the coin inflation and supply with a similar wind, Pixa could demonstrate around a profits of eight times the initial input.</p>
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
                            </div>
                        </div>
                    </Fade>
                    <Fade in timeout={1800}>
                        <div>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Advisors</h3>
                            <div className={classes.tableWrapper}>
                                <table className={classes.table}>
                                    <tr>
                                        <th>Name</th>
                                        <th>Title</th>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td onClick={() => {window.open("https://www.linkedin.com/in/profkarenwendt/")}} className={classes.link}>Dr. Karen W.</td>
                                        <td>Fundraising Advisor</td>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td onClick={() => {window.open("https://www.linkedin.com/in/mailinda-pilavi-kropf/")}} className={classes.link}>Esq. Mailinda P-K.</td>
                                        <td>Legal Advisor</td>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td onClick={() => {window.open("https://www.linkedin.com/in/evdokia-bobrova/")}} className={classes.link}>Evdokia B.</td>
                                        <td>Marketing Advisor</td>
                                    </tr>
                                    <tr className={classes.tableWhite}>
                                        <td onClick={() => {window.open("https://www.linkedin.com/in/annakarolinawisniewska/")}} className={classes.link}>Ania W.</td>
                                        <td>Marketing Advisor</td>
                                    </tr>
                                </table>
                            </div>
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
