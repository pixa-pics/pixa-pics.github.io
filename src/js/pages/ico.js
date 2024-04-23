import React from "react";
import {Button, Tooltip, withStyles} from "@material-ui/core";
import actions from "../actions/utils";
import FileDownload from "../icons/FileDownload";
import Fade from "@material-ui/core/Fade";
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
                display: "block !important",
            },
            "& > div > div:first-child": {
                marginRight: "0",
            },
            "& > div > div": {
                display: "block !important",
                width: "100%"
            }
        },
        "& img": {
            width: "100%",
            minWidth: 400,
            marginBottom: 8,
            height: "auto",
        },
        "& > div": {
            maxWidth: "100%",
            marginBottom: 0,
        },
        "& > div > div": {
            margin: "16px !important",
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
        background: "radial-gradient(circle 78px at 10% 50%, rgb(239 255 33) 0%, rgb(61 255 0) 100.7%)",
        color: "#000",
        filter: "drop-shadow(0px 0px 0px #33e52e) drop-shadow(0px 0px 0px #33e52e)",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            background: "radial-gradient(circle 78px at 10% 50%, rgb(160 255 15) 0%, rgb(61 255 0) 100.7%)",
            color: "#000",
            filter: "drop-shadow(0px 0px 3px #07ff00) drop-shadow(0px 0px 5px #07ff00)",
        }
    },
    whiteButton: {
        background: "radial-gradient(circle 78px at 10% 50%, #fff 0%, #ddd 100.7%)",
        color: "#000",
        filter: "drop-shadow(0px 0px 0px #fff) drop-shadow(0px 0px 0px #ddd)",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            background: "radial-gradient(circle 78px at 10% 50%, #fff 100%, #ddd 200%)",
            color: "#000",
            filter: "drop-shadow(0px 0px 3px #fff) drop-shadow(0px 0px 5px #ddd)",
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
        color: "chartreuse"
    },
    icoProgressBar: {
        borderRadius: "4px",
        contain: "paint size style layout",
        "@global": {
            "@keyframes ICOProgressBufferFlux": {
                "0%":  { left: "-60%", background: "linear-gradient(to right, rgba(0, 255, 0, 0), rgba(0, 255, 0, .5))"},
                "100%": { left: "130%", background: "linear-gradient(to right, rgba(0, 255, 0, 0), rgba(0, 255, 0, .7))"}
            }
        },
        height: "24px",
        width: "100%",
        margin: "36px 0 24px 0",
        backgroundColor: "#072a00",
        position: "relative",
        "&::before": {
            content: "''",
            position: "absolute",
            height: "24px",
            width: "30%",
            background: "rgba(0, 255, 0, 0)",
            animation: "$ICOProgressBufferFlux 1.2s linear infinite 2.4s"
        }
    },
    icoProgressBuffer: {
        borderRadius: "4px",
        backgroundColor: "#00ff00",
        boxShadow: "0px 0px 12px #00ff00",
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
            _settings: JSON.parse(props.settings),
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
                var amountToRaiseUSD = 0.0;
                var roundNames = [];
                JSON.parse(text).forEach((obj) => {
                    console.log(obj)
                    roundNames.push(obj.RoundName);
                    amountRaisedUSD += obj.AmountRaisedUSDCents / 100;
                    amountToRaiseUSD += obj.AmountToRaiseUsdCents / 100;
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
                                <h1 style={{fontSize: "48px", fontWeight: "bold", marginTop: 0, backgroundImage: "radial-gradient(circle 477px at 1.4% 94.3%, rgb(0 231 255) 0%, rgb(73 255 0) 33.2%, rgb(230 255 0) 54.2%, rgb(239 255 0) 68.1%, rgb(255 65 65) 82%, rgb(255 0 198) 93.9%)", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text"}}>Onboard the ICO</h1>
                            </Fade>
                            <Fade in timeout={500}>
                                <h2 style={{marginTop: "24px", color: "rgb(211, 255, 224)"}}>Pixa.Market is a social media blockchain NFT platform working exclusively with 1000x more lightweight images as it is pixel-art. Our current target of timespan for NFTs is beyond 1,000 years.</h2>
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
                        <h3 style={{fontSize: "44px", textAlign: "center", fontWeight: "bold"}}>
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
                                    <Button style={{backgroundColor: "#29ff29"}} className={classes.firstButton} startIcon={<AttachMoney/>} onClick={() => this._open_link("https://openfund.com/d/Pixagram")} color={"primary"} variant={"contained"}>BUY NOW</Button>
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
                            <p>Book a call with us at any time! <a href={"mailto:business@pixa.market"} target={"_blank"}>business@pixa.market</a>. Or contact us on <a href={"https://www.linkedin.com/company/pixagram-blockchain/"} target={"_blank"}>LinkedIn</a>.</p>
                            <div style={{display: "inline-flex", marginTop: 32, verticalAlign: "bottom", textAlign: "center"}}>
                                <div>
                                    <Tooltip title={" 🇨🇭 I make software."}>
                                        <img className={"pixelated"} src={"data:image/png;base64,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"} onClick={() => this._open_link("https://www.linkedin.com/in/matias-affolter/")}/>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip title={" 🇨🇦 I do mathematics."}>
                                        <img className={"pixelated"} src={"data:image/png;base64,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"} onClick={() => this._open_link("https://www.linkedin.com/in/mathiew-estepho-b7078894/")}/>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </Fade>
                    <Fade in timeout={1600}>
                        <div>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Meet The Team & Partners</h3>
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
                    <Fade in timeout={1800}>
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
