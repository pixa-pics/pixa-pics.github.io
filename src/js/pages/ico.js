import React from "react";
import {Button, Tooltip, withStyles} from "@material-ui/core";
import actions from "../actions/utils";
import FileDownload from "../icons/FileDownload";
import Fade from "@material-ui/core/Fade";
import Icon from "@material-ui/core/Icon";
import LinkedIn from "../icons/LinkedIn";
import Telegram from "../icons/Telegram";
import Badge from "@material-ui/core/Badge"
import Lottie from "../components/Lottie";
import YouTube from "@material-ui/icons/YouTube";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
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
            boxShadow: "rgb(249 249 0 / 32%) 0px 4px 8px 2px, rgb(255 155 0 / 32%) 0px 4px 5px 5px, rgb(175 75 0 / 32%) 0px 1px 10px 14px",
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
        backgroundColor: "#94ff92",
        color: "#000",
        filter: "drop-shadow(0px 0px 0px #33e52e) drop-shadow(0px 0px 0px #33e52e)",
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            backgroundColor: "#07ff00",
            color: "#000",
            filter: "drop-shadow(0px 0px 3px #07ff00) drop-shadow(0px 0px 5px #07ff00)",
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

        fetch("https://openfund.com/api/v0/funding-rounds?username=PixaMarket").then((result) => {
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
        actions.load_with("data:image/png;base64,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");
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
                                <h1 style={{fontSize: "48px", fontWeight: "bold", marginTop: 0}}>Onboard the Pixa's Initial Coin Offering (ICO)</h1>
                            </Fade>
                            <Fade in timeout={500}>
                                <h2 style={{marginTop: "24px", color: "#c2d5fe"}}>Pixa.Market is a social media blockchain NFT platform working exclusively with 1000x more lightweight images as it is pixel-art. Our current target of timespan for NFTs is beyond 1,000 years.</h2>
                            </Fade>
                            <Fade in timeout={600}>
                                <div style={{marginTop: 32}}>
                                    <Tooltip title={"10 Minutes Reading Presentation PDF | 3 Mo"}>
                                        <Button style={{marginRight: 16}} className={classes.firstButton} startIcon={<FileDownload/>} onClick={() => this._open_link("https://drive.google.com/file/d/1nIpVDSxgViEn183Kyr3SvLBlFmaaOzwe/view")} color={"primary"} variant={"contained"}>Pitch-Deck</Button>
                                    </Tooltip>
                                    <Tooltip title={"20 Minutes Reading A4 PDF | 3 Mo"}>
                                        <Button className={classes.firstButton} startIcon={<FileDownload/>} onClick={() => this._open_link("https://drive.google.com/file/d/1bx-14zE2EYt4fpycxr84sMWDa_JaYliW/view")} color={"primary"} variant={"contained"}>Lite-Paper</Button>
                                    </Tooltip>
                                </div>
                            </Fade>
                        </div>
                        <Fade in timeout={700}>
                            <Tooltip title={"Click on the image to start editing it!"}>
                                <img onClick={this._edit} className={"pixelated main"} src="data:image/png;base64,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" />
                            </Tooltip>
                        </Fade>
                    </div>
                    <div>
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
                                    <Button className={classes.firstButton} startIcon={<AttachMoney/>} onClick={() => this._open_link("https://openfund.com/d/PixaMarket")} color={"primary"} variant={"contained"}>BUY NOW</Button>
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
                                    <tr className={classes.tableGreenActive} onClick={() => this._open_link("https://openfund.com/d/PixaMarket")}>
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
                                        <Button startIcon={<LinkedIn/>} onClick={() => this._open_link("https://www.linkedin.com/company/pixamarket/")} style={{marginRight: 12, backgroundColor: "#0077B5", color: "white"}} color={"secondary"} variant={"contained"}>Blog</Button>
                                    </Tooltip>
                                    <Tooltip title={"Chat with us on Telegram after validation!"}>
                                        <Button startIcon={<Telegram/>} onClick={() => this._open_link("https://t.me/+eziqKfod9gQ3YTJk")} style={{marginRight: 12, backgroundColor: "#0088cc", color: "white"}} color={"secondary"} variant={"contained"}>Chat</Button>
                                    </Tooltip>
                                    <Tooltip title={"See our livestream on Mathiew's YouTube channel!"}>
                                        <Button startIcon={<YouTube/>} onClick={() => this._open_link("https://www.youtube.com/watch?v=Oa0d0uVi4f4&list=PLai3U8-WIK0FwmzgFS9TbjzhYz5R_aRRn")} style={{marginRight: 12, backgroundColor: "#FF0000", color: "white"}} color={"secondary"} variant={"contained"}>Livestreams</Button>
                                    </Tooltip>
                                    <Tooltip title={"Benefits from our airdrop and stay tuned with Deso via diamondapp!"}>
                                        <Button startIcon={<MonetizationOn/>} onClick={() => this._open_link("https://diamondapp.com/posts/85b27fef8b73f46032ae301dd4516b0e97b324aed8bf15e1fd469194d1d5934e")} style={{marginRight: 12, backgroundColor: "#ffffff", color: "black"}} color={"secondary"} variant={"contained"}>Airdrops</Button>
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
                            <p>Steem and Hive (The same technology used by Pixa) have the same parameters regarding the coin inflation and supply with a similar wind, Pixa could demonstrate around a profits of eight times the initial input.</p>
                            <p>The time Pixa develop its own plugin for trading post (pixel artwork) is set to around one years, then it should be more or less driven by the same force behind the market which set the token price at around $ 0.30.</p>
                        </div>
                    </Fade>
                    <Fade in timeout={1450}>
                        <div className={classes.founders}>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Meet The Co-Founders</h3>
                            <p>Book a call with us at any time! <a href={"mailto:business@pixa.market"} target={"_blank"}>business@pixa.market</a>. Or contact us on <a href={"https://www.linkedin.com/company/pixamarket/"} target={"_blank"}>LinkedIn</a>.</p>
                            <div style={{display: "inline-flex", marginTop: 32, verticalAlign: "bottom", textAlign: "center"}}>
                                <div>
                                    <Button startIcon={<Icon><LinkedIn/></Icon>} onClick={() => this._open_link("https://www.linkedin.com/in/matias-affolter/")} style={{backgroundColor: "#359415", color: "#fff"}} color={"secondary"} variant={"contained"}>Matias Affolter 🇨🇭</Button>
                                    <Tooltip title={"I make software. (Often available)"}>
                                        <img src={"src/images/ico/Matias.png"}/>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Button startIcon={<Icon><LinkedIn/></Icon>} onClick={() => this._open_link("https://www.linkedin.com/in/mathiew-estepho-b7078894/")} style={{backgroundColor: "#0f6206", color: "#fff"}} color={"secondary"} variant={"contained"}>Mathiew Estepho 🇨🇦</Button>
                                    <Tooltip title={"I make math video. (Sometimes available)"}>
                                        <img src={"src/images/ico/Mathiew.png"}/>
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
