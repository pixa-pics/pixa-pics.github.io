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
