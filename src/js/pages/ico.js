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
    },
    litepaper: {
        aspectRatio: "163 / 220",
        width: 300,
        cursor: "pointer",
        "@media (max-width: 915px)": {
            width: "100%",
        }
    },
    pitchdeck: {
        aspectRatio: "733 / 441",
        width: 536,
        cursor: "pointer",
        "@media (max-width: 915px)": {
            width: "100%",
        }
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
                            <p>Take advantage of our exclusive pre-seed offers and discounts:</p>
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
                            <p><b>Stay updated and engaged with the latest developments and news from Pixagram! We offer multiple channels to keep you informed and connected:</b></p>
                            <br/>
                            <div style={{display: "float", position: "relative", margin: "16px 0px 32px 0px", height: 32}}>
                                <div style={{float: "left", display: "flow-root"}}>
                                    <Tooltip title={"Stay tuned with Pixa on LinkedIn!"}>
                                        <Button size={"large"} startIcon={<LinkedIn/>} onClick={() => this._open_link("https://www.linkedin.com/company/pixagram-blockchain/")} style={{marginRight: 12, backgroundColor: "#0077B5", color: "white"}} color={"secondary"} variant={"contained"}>Blog</Button>
                                    </Tooltip>
                                    <span>Visit our blog for in-depth articles, updates, and insights about Pixagram’s journey and innovations.</span>
                                    <br/>
                                    <br/>
                                    <Tooltip title={"Chat with us on Telegram after validation!"}>
                                        <Button  size={"large"} startIcon={<Telegram/>} onClick={() => this._open_link("https://t.me/+eziqKfod9gQ3YTJk")} style={{marginRight: 12, backgroundColor: "#0088cc", color: "white"}} color={"secondary"} variant={"contained"}>Chat</Button>
                                    </Tooltip>
                                    <span>Join our Telegram chat to interact with the Pixagram community, ask questions, and share your thoughts.</span>
                                    <br/>
                                    <br/>
                                    <Tooltip title={"See our livestream on Mathiew's YouTube channel!"}>
                                        <Button  size={"large"} startIcon={<YouTube/>} onClick={() => this._open_link("https://www.youtube.com/watch?v=Oa0d0uVi4f4&list=PLai3U8-WIK0FwmzgFS9TbjzhYz5R_aRRn")} style={{marginRight: 12, backgroundColor: "#FF0000", color: "white"}} color={"secondary"} variant={"contained"}>Livestreams</Button>
                                    </Tooltip>
                                    <span>Tune in to our YouTube livestreams for live updates, announcements, and special events.</span>
                                    <br/>
                                    <br/>
                                </div>
                            </div>


                        </div>
                    </Fade>
                    <Fade in timeout={1300}>
                        <div>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Tokenomics</h3>
                            <ul style={{lineHeight: "2em"}}>
                                <li><b>Height Times Cheaper Than STEEM & HIVE:</b> Leveraging similar technology to Steem and Hive, Pixagram offers a unique economic model designed to maximize returns.</li>
                                <li><b>Projected Profits:</b> Based on our initial projections, Pixagram could demonstrate profits up to eight times the initial input.</li>
                                <li><b>Development Timeline:</b> Our plugin for the trading post (pixel artwork) is expected to launch within a year, driving the token price around $0.30.</li>
                            </ul>
                        </div>
                    </Fade>
                    <Fade in timeout={1450}>
                        <div className={classes.founders}>
                            <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Meet The Co-Founders</h3>
                            <p>Book a call with us at any time! <a href={"mailto:omnibus@pixagram.io"} target={"_blank"}>omnibus@pixagram.io</a>. Or contact us on <a href={"https://www.linkedin.com/company/pixagram-blockchain/"} target={"_blank"}>LinkedIn</a>.</p>
                            <div style={{display: "inline-flex", marginTop: 32, verticalAlign: "bottom", textAlign: "center"}}>
                                <div>
                                    <Tooltip title={"A strategic thinker and innovator from Switzerland."}>
                                        <img className={"pixelated"} src={"data:image/png;base64,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"} onClick={() => this._open_link("https://www.linkedin.com/in/matias-affolter/")}/>
                                    </Tooltip>
                                    <b>Matias Affolter 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"A strategic thinker and innovator from Switzerland."}>
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
                                    <Tooltip title={"A smart marketing expert from Switzerland."}>
                                        <img className={"pixelated"} src={_eve} onClick={(e) => {this._edit(_eve)}}/>
                                    </Tooltip>
                                    <b style={{cursor: "pointer"}} onClick={() => this._open_link("https://www.linkedin.com/in/evdokia-bobrova/")}>Eve B. 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"A dedicated strategist in marketing."}>
                                        <img className={"pixelated"} src={_ania}  onClick={(e) => {this._edit(_ania)}}/>
                                    </Tooltip>
                                    <b style={{cursor: "pointer"}} onClick={() => this._open_link("https://www.linkedin.com/in/annakarolinawisniewska/")}>Ania W. 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"A serious and professional legal advisor."}>
                                        <img className={"pixelated"} src={_mailinda} onClick={(e) => {this._edit(_mailinda)}}/>
                                    </Tooltip>
                                    <b style={{cursor: "pointer"}} onClick={() => this._open_link("https://www.linkedin.com/in/mailinda-pilavi-kropf/")}>Esq. Mailinda P-K. 🇨🇭 </b>
                                </div>
                                <div>
                                    <Tooltip title={"A friendly and approachable economist."}>
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
                                <img className={classes.litepaper} src={"/src/images/ico/litepaper.png"} onClick={() => this._open_link("https://drive.google.com/file/d/1bx-14zE2EYt4fpycxr84sMWDa_JaYliW/view")}/>
                            </Tooltip>
                            <Tooltip title={"10 Minutes Reading Presentation PDF | 10 Mo"}>
                                <img className={classes.pitchdeck} src={"/src/images/ico/pitchdeck.png"} onClick={() => this._open_link("https://drive.google.com/file/d/1nIpVDSxgViEn183Kyr3SvLBlFmaaOzwe/view")}/>
                            </Tooltip>
                        </div>
                    </Fade>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Marketplace);
