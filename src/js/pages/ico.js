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
            _mailinda: "data:image/png;base64,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",
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

    render() {
        const { classes } = this.state;
        const { amountRaisedUSD, amountToRaiseUSD, roundNames, _eve, _ania, _mailinda, _karen } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.text}>
                    <Fade in timeout={400}>
                        <h1 style={{fontSize: "56px", fontWeight: "bold", marginTop: 0, color: "white", textShadow: "rgb(255 255 255 / 56%) 0px 0px 2px, rgb(255 161 225 / 56%) 0px 0px 8px, rgb(82 46 255) 0px 0px 12px, rgb(4 41 255) 0px 0px 24px"}}>Initial Coin Offering of Pixagram</h1>
                    </Fade>
                    <div style={{display: "flex"}}>
                        <div>
                            <Fade in timeout={500}>
                                <h2 style={{marginTop: "24px", color: "#bdbdbd"}}>Pixagram is a social media blockchain NFT platform working exclusively with 1000x more lightweight images as it is pixel-art. Our current target of timespan for NFTs is beyond 1,000 years.</h2>
                            </Fade>
                            <Fade in timeout={600}>
                                <div style={{marginTop: 32}}>
                                    <Tooltip title={"10 Minutes Reading Presentation PDF | 10 Mo"}>
                                        <Button  size={"large"} style={{marginRight: 16}} className={classes.whiteButton} startIcon={<FileDownload/>} onClick={() => this._open_link("https://drive.google.com/file/d/1nIpVDSxgViEn183Kyr3SvLBlFmaaOzwe/view")} color={"primary"} variant={"contained"}>Pitch-Deck</Button>
                                    </Tooltip>
                                    <Tooltip title={"20 Minutes Reading A4 PDF | 5 Mo"}>
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
                    <Fade in timeout={2500}>
                        <div style={{display: "inline-block"}}>
                            <Tooltip title={"20 Minutes Reading A4 PDF | 5 Mo"}>
                                <img style={{aspectRatio: "163 / 220", maxWidth: 400, cursor: "pointer"}} src={"/src/images/ico/litepaper.png"} onClick={() => this._open_link("https://drive.google.com/file/d/1bx-14zE2EYt4fpycxr84sMWDa_JaYliW/view")}/>
                            </Tooltip>
                            <Tooltip title={"10 Minutes Reading Presentation PDF | 10 Mo"}>
                                <img style={{aspectRatio: "733 / 441", maxWidth: 400, cursor: "pointer"}} src={"/src/images/ico/pitchdeck.png"} onClick={() => this._open_link("https://drive.google.com/file/d/1nIpVDSxgViEn183Kyr3SvLBlFmaaOzwe/view")}/>
                            </Tooltip>
                        </div>
                    </Fade>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Marketplace);
