import React from "react";
import {Button, withStyles} from "@material-ui/core";
import actions from "../actions/utils";

const styles = theme => ({
    root: {
        textAlign: "left",
        overflow: "overlay",
        maxHeight: "100%",
        padding: 32,
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100%",
        fontWeight: "initial",
    },
    text: {
        width: "800px",
        margin: "auto",
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

    render() {
        const { classes } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.text}>
                    <div>
                        <div>
                            <h1 style={{fontSize: "48px", fontWeight: "bold"}}>Onboard the Pixa's Initial Coin Offering (ICO)</h1>
                            <h2 style={{marginTop: "24px", color: "#c2d5fe"}}>Pixa.Market is a social media blockchain NFT platform working exclusively with 1000x more lightweight images as it is pixel-art. Our current target of timespan for NFTs is beyond 1,000 years.</h2>
                        </div>
                        <div style={{fontSize: "18px"}}>
                            <p style={{fontWeight: "bold", color: "#fff"}}>You can use it for the following advantages:</p>
                            <ul style={{fontWeight: "initial", color: "#cafec2"}}>
                                <li>Make money without investing anything else but a few minutes of your spare time.</li>
                                <li>Possess someone else unique life story as a digital experience lasting forever.</li>
                                <li>Trade the best in-class or rarest artworks and keep your friends up to date.</li>
                            </ul>
                        </div>
                        <div style={{marginTop: 24}}>
                            <Button onClick={() => this._open_link("https://drive.google.com/file/d/1bx-14zE2EYt4fpycxr84sMWDa_JaYliW/view")} color={"primary"} variant={"contained"}>Lite-Paper</Button>
                            <Button onClick={() => this._open_link("https://drive.google.com/file/d/1nIpVDSxgViEn183Kyr3SvLBlFmaaOzwe/view")} style={{marginLeft: 8}} color={"primary"} variant={"contained"}>Pitch-Deck</Button>
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
                            <tr style={{color: "#ffea00"}}>
                                <td>Seed</td>
                                <td>$ 0.035</td>
                                <td>41.6% Off</td>
                                <td>4 Millions</td>
                                <td>$ 140,000</td>
                            </tr>
                            <tr style={{color: "#ff6a00"}}>
                                <td>Community</td>
                                <td>$ 0.04</td>
                                <td>33.3% Off</td>
                                <td>10 Millions</td>
                                <td>$ 400,000</td>
                            </tr>
                            <tr style={{color: "#ff3c00"}}>
                                <td>Strategic</td>
                                <td>$ 0.05</td>
                                <td>16.6% Off</td>
                                <td>10 Millions</td>
                                <td>$ 500,000</td>
                            </tr>
                            <tr style={{color: "#ff0000"}}>
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
                        <Button onClick={() => this._open_link("https://openfund.com/d/PixaMarket")} style={{marginLeft: 0}} color={"secondary"} variant={"contained"}>OpenFund</Button>
                        <Button onClick={() => this._open_link("https://www.linkedin.com/company/pixamarket/")} style={{marginLeft: 8}} color={"secondary"} variant={"contained"}>LinkedIn</Button>
                    </div>
                    <div>
                        <h3 style={{fontSize: "44px", fontWeight: "bold"}}>Forecasting</h3>
                        <p>Steem and Hive (The same technology used by Pixa) with the same parameters regarding coin inflation demonstrate around a profits of 800%.</p>
                        <p>The time Pixa develop its own plugin for trading post (pixel artwork) is set to one or two years, then it should be more or less driven by the same force behind the market.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Marketplace);
