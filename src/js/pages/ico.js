import React from "react";
import {Button, withStyles} from "@material-ui/core";
import actions from "../actions/utils";
import FileDownload from "../icons/FileDownload";

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
        }
    },
    text: {
        minWidth: "900px",
        width: "100%",
        maxWidth: "900px",
        margin: "auto",
        "@media (max-width: 948px)": {
            margin: "24px",
            minWidth: "0",
            maxWidth: "calc(100% - 48px)",
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
            boxShadow: "rgb(0 123 255 / 17%) 0px 4px 8px 2px, rgb(0 6 255 / 32%) 0px 4px 5px 5px, rgb(61 0 175 / 34%) 0px 1px 10px 14px",
            maxWidth: "100%",
            maxHeight: "100%"
        }
    },
    table: {
        "& tr": {
            "& th": {
                padding: 4
            },
            "& td": {
                padding: 4,
                marginRight: 24
            }
        }
    },
    founders: {
        textAlign: "left",
        "@media (max-width: 520px)": {
            "& img": {
                width: "calc(100% - 64px)",
                display: "flex"
            },
            "& > div > div:first-child": {
                marginRight: "0",
            }
        },
        "& img": {
            width: "100%",
            aspectRatio: "1 / 1",
            marginBottom: 32,
            maxWidth: 300,
        },
        "& > div": {
            maxWidth: "calc(100% - 64px)",
            marginBottom: 0,
        },
        "& > div > div:first-child": {
            marginRight: "32px",
        }
    }
});

class Marketplace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            _settings: JSON.parse(props.settings)
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

    render() {
        const { classes } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.text}>
                    <div style={{display: "flex"}}>
                        <div>
                            <h1 style={{fontSize: "48px", fontWeight: "bold"}}>Onboard the Pixa's Initial Coin Offering (ICO)</h1>
                            <h2 style={{marginTop: "24px", color: "#c2d5fe"}}>Pixa.Market is a social media blockchain NFT platform working exclusively with 1000x more lightweight images as it is pixel-art. Our current target of timespan for NFTs is beyond 1,000 years.</h2>
                            <div style={{marginTop: 32}}>
                                <Button startIcon={<FileDownload/>} onClick={() => this._open_link("https://drive.google.com/file/d/1bx-14zE2EYt4fpycxr84sMWDa_JaYliW/view")} color={"primary"} variant={"contained"}>Lite-Paper</Button>
                                <Button startIcon={<FileDownload/>} onClick={() => this._open_link("https://drive.google.com/file/d/1nIpVDSxgViEn183Kyr3SvLBlFmaaOzwe/view")} style={{marginLeft: 8}} color={"primary"} variant={"contained"}>Pitch-Deck</Button>
                            </div>
                        </div>
                        <img onClick={this._edit} className={"pixelated main"} src="data:image/png;base64,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" />
                    </div>
                    <div>
                        <div style={{fontSize: "18px"}}>
                            <p style={{fontWeight: "bold", color: "#fff"}}>You can use it for the following advantages:</p>
                            <ol style={{fontWeight: "initial", color: "#d9ffd2"}}>
                                <li>Make money without investing anything else but a few minutes of your spare time.</li>
                                <li>Possess someone else unique life story as a digital experience lasting forever.</li>
                                <li>Trade the best in-class or rarest artworks and keep your friends up to date.</li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Price & Discount</h3>
                        <table className={classes.table}>
                            <tr>
                                <th>Round's Name</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Quantity</th>
                                <th>Value</th>
                            </tr>
                            <tr style={{color: "#00ff00"}}>
                                <td>Pre-Seed</td>
                                <td>$ 0.03</td>
                                <td>50.0% Off</td>
                                <td>2 Millions</td>
                                <td>$ 60,000</td>
                            </tr>
                            <tr style={{color: "#ffffff"}}>
                                <td>Seed</td>
                                <td>$ 0.035</td>
                                <td>41.6% Off</td>
                                <td>4 Millions</td>
                                <td>$ 140,000</td>
                            </tr>
                            <tr style={{color: "#ffffff"}}>
                                <td>Community</td>
                                <td>$ 0.04</td>
                                <td>33.3% Off</td>
                                <td>10 Millions</td>
                                <td>$ 400,000</td>
                            </tr>
                            <tr style={{color: "#ffffff"}}>
                                <td>Strategic</td>
                                <td>$ 0.05</td>
                                <td>16.6% Off</td>
                                <td>10 Millions</td>
                                <td>$ 500,000</td>
                            </tr>
                            <tr style={{color: "#ffffff"}}>
                                <td>Other</td>
                                <td>$ 0.06</td>
                                <td>No Discount</td>
                                <td>1 to 10 Millions</td>
                                <td>$ 60-600 k</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Links</h3>
                        <Button onClick={() => this._open_link("https://openfund.com/d/PixaMarket")} style={{marginLeft: 0, backgroundColor: "#0d6b00", color: "#fff"}} color={"secondary"} variant={"contained"}>OpenFund</Button>
                        <Button onClick={() => this._open_link("https://www.linkedin.com/company/pixamarket/")} style={{marginLeft: 8}} color={"secondary"} variant={"contained"}>LinkedIn</Button>
                    </div>
                    <div>
                        <h3 style={{fontSize: "44px", fontWeight: "bold"}}>800% Forecasting</h3>
                        <p>Steem and Hive (The same technology used by Pixa) with the same parameters regarding coin inflation could demonstrate around a profits of eight times the initial input.</p>
                        <p>The time Pixa develop its own plugin for trading post (pixel artwork) is set to one or two years, then it should be more or less driven by the same force behind the market.</p>
                    </div>
                    <div className={classes.founders}>
                        <h3 style={{fontSize: "44px", fontWeight: "bold"}}>E-Meet Our Co-Founders</h3>
                        <p>Book a call with us at any time! <a href={"mailto:business@pixa.market"} target={"_blank"}>business@pixa.market</a>. Or contact us on <a href={"https://www.linkedin.com/company/pixamarket/"} target={"_blank"}>LinkedIn</a>.</p>
                        <div style={{display: "inline-flex", marginBottom: 32, verticalAlign: "bottom", textAlign: "center"}}>
                            <div>
                                <img src={"src/images/ico/Matias.png"}/>
                                <Button onClick={() => this._open_link("https://www.linkedin.com/in/matias-affolter/")} style={{backgroundColor: "#201594", color: "#fff"}} color={"secondary"} variant={"contained"}>Matias Affolter 🇨🇭</Button>
                            </div>
                            <div>
                                <img src={"src/images/ico/Mathiew.png"}/>
                                <Button onClick={() => this._open_link("https://www.linkedin.com/in/mathiew-estepho-b7078894/")} style={{backgroundColor: "#100662", color: "#fff"}} color={"secondary"} variant={"contained"}>Mathiew Estepho 🇨🇦</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Marketplace);
