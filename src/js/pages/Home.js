import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY } from "../utils/constants";

import {Button} from "@material-ui/core";
import actions from "../actions/utils";

import get_svg_in_b64 from "../utils/svgToBase64";

import AngelEmojiSvg from "../twemoji/react/1F607";
const ANGELEMOJI = get_svg_in_b64(<AngelEmojiSvg />);
import HearthEmojiSvg from "../twemoji/react/2665";
const HEARTHEMOJI = get_svg_in_b64(<HearthEmojiSvg />);
import EarthEmojiSvg from "../twemoji/react/1F30D";
const EARTHEMOJI = get_svg_in_b64(<EarthEmojiSvg />);
import SendToAFriend from "../icons/SendToAFriend";
const SENDTOAFRIEND = get_svg_in_b64(<SendToAFriend />)

const styles = theme => ({
    root: {
        maxHeight: "calc(100% - 64px)",
        backgroundImage: "radial-gradient(circle at 0% 0%, #242e9454, #ffffff)",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        "&::after": {
            content: `""`,
            position: "absolute",
            width: "100%;",
            height: "100%",
            right: 0,
            bottom: 0,
            zIndex: 1,
            backgroundImage: "radial-gradient(ellipse at max(25%, 25vh) max(75vh, 75%), #ffffff 14%, #ffffff00 75%)",
            animation: "$radial 5s ease-in-out infinite",
            "@global": {
                "@keyframes radial": {
                    "0%": {filter: "opacity(.7)"},
                    "20%": {filter: "opacity(.6)"},
                    "40%": {filter: "opacity(.8)"},
                    "60%": {filter: "opacity(.9)"},
                    "80%": {filter: "opacity(.6)"},
                    "100%": {filter: "opacity(.7)"},
                }
            },
        }
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundImage: "url(/src/images/background.svg)",
        position: "relative",
        backgroundSize: "150%",
        backgroundPosition: "0% 25vh",
        "&": {
            animation: "$slide 56s linear infinite",
            "@global": {
                "@keyframes slide": {
                    "0%": {backgroundPosition: "-150% 25vh"},
                    "20%": {backgroundPosition: "-50% 25vh"},
                    "40%": {backgroundPosition: "50% 25vh"},
                    "60%": {backgroundPosition: "150% 25vh"},
                    "80%": {backgroundPosition: "225% 25vh"},
                    "100%": {backgroundPosition: "300% 25vh"},
                }
            },
        },
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        padding: 64,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        },
    },
    backgroundImageImage: {
        position: "absolute",
        width: "max(90vh, 90%)",
        right: "calc(min(-36vh, -36%) + 128px)",
        top: "calc(max(36vh, 36%) + 128px)",
        transform: "translate(calc(min(-45vh, -45%) / 2), calc(min(-45vh, -45%) / 2))",
        zIndex: 1,
        "&": {
            animation: "$slide 14s linear infinite",
            "@global": {
                "@keyframes slide": {
                    "0%": {transform: "translate(calc(25vw - 25vh - 7%), -50%)"},
                    "20%": {transform: "translate(calc(25vw - 25vh - 14%), -50%)"},
                    "40%": {transform: "translate(calc(25vw - 25vh + 7%), -50%)"},
                    "60%": {transform: "translate(calc(25vw - 25vh + 14%), -50%)"},
                    "80%": {transform: "translate(calc(25vw - 25vh + 21%), -50%)"},
                    "100%": {transform: "translate(calc(25vw - 25vh + 7%), -50%)"},
                }
            },
        },
    },
    card: {
        margin: theme.spacing(1, 2)
    },
    headerContainer: {
        fontFamily: `"Jura"`,
        position: "absolute",
        marginTop: theme.spacing(-2),
        color: "#000000",
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(-4)
        },
        zIndex: 2,
    },
    title: {
        fontSize: 56,
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 36,
        },
    },
    subtitle: {
        fontSize: 32,
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 24,
            display: "none",
        },
    },
    blue: {
        //color: theme.palette.primary.actionLighter,
        color: "#0f177f",
        fontWeight: 600,
    },
});


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            _history: HISTORY,
        };
    };

    componentDidMount() {

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 250);
    }

    _go_to_url = (event, url) => {

        const { _history } = this.state;
        _history.push(url);
    };

    _handle_speed_dial_action = (event, action) => {

        switch (action) {

            case "share":
                actions.trigger_share();
                break;
        }
    };

    _open_link = (event, url) =>{

        window.open(url);
    };

    render() {

        const { classes, _quote } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.backgroundImage}>
                    <img src="/src/images/fun.svg" className={classes.backgroundImageImage}/>
                    <div className={classes.headerContainer}>
                        <h1 className={classes.title}>
                            <span><span className={classes.blue}>PIXA.PICS</span> - to pixel art matrix, then draw, then vectorize.</span><br />
                            <span>Make potential (un)limited</span><br />
                            <span><img src={ANGELEMOJI} className="emoji"/> everywhere.</span>
                        </h1>
                        <h2 className={classes.subtitle}>
                            AEONS of the <span className={classes.blue}>raster/matrix</span> and <span className={classes.blue}>vector</span> universe, <br/>
                            You can do limited pixel art and infinite paintings.<br />
                            Made with <img className={"emoji pulse"} src={HEARTHEMOJI}/>, designed to be : forever open-source - forever free - for everyone. <img src={EARTHEMOJI} className={"emoji"}/>.<br />
                        </h2>
                        <Button variant={"contained"} size={"large"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            Start using it
                        </Button>
                    </div>
                </div>
                <img onClick={(event) => {this._handle_speed_dial_action(event, "share")}} src={SENDTOAFRIEND} style={{zIndex: 2, position: "absolute", right: 16, bottom: 16, width: 220, cursor: "pointer"}}/>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
