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

const styles = theme => ({
    root: {
        "& .emoji": {
            width: "2em",
            height: "1.5em",
        },
        maxHeight: "calc(100% - 64px)",
        [theme.breakpoints.down("xs")]: {
            maxHeight: "calc(100% - 56px)",
        },
        backgroundImage: "linear-gradient(to bottom, #4c56e057 60%, #e2cc18ab 90%), radial-gradient(farthest-corner at 75% 75%, rgb(255 234 63) 5%, rgb(73 247 255) 50%, rgb(5 11 60) 90%)",
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
            backdropFilter: "saturate(2) brightness(1.5)",
            backgroundImage: "linear-gradient(to bottom right, #8190ff8a, #fcffb7a3)",
        }
    },
    homeCTAuseit: {
        color: "#000",
        backgroundImage: "linear-gradient(64deg, goldenrod, blanchedalmond, gold, darkgoldenrod, blanchedalmond, goldenrod, blanchedalmond)",
        fontWeight: "bold",
        minWidth: "min(320px, calc(100% - 32px))",
        lineHeight: "1.25em",
        marginTop: "48x",
        borderRadius: "4px",
        "&:hover": {
            color: "#000",
        },
        zIndex: 7,
        filter: "invert(1)",
        [theme.breakpoints.down("sm")]: {
            marginTop: "0px"
        },
    },
    homeCTAsendit: {
        color: "#000",
        backgroundImage: "linear-gradient(64deg, goldenrod, blanchedalmond, gold, darkgoldenrod, blanchedalmond, goldenrod, blanchedalmond)",
        fontWeight: "bold",
        borderRadius: "12px",
        lineHeight: "3em",
        position: "fixed",
        minWidth: 128,
        zIndex: 7,
        bottom: 32,
        right: 32,
        "&:hover": {
            color: "#000",
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
        filter: "contrast(0.8) brightness(1.2)",
        width: "max(90vh, 90%)",
        right: "calc(min(-36vh, -36%) + 128px)",
        top: "calc(max(36vh, 36%) + 128px)",
        transform: "translate(calc(min(-45vh, -45%) / 2), calc(min(-45vh, -45%) / 2))",
        zIndex: 3,
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
        color: "#000000dd",
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(-4)
        },
        zIndex: 5,
    },
    title: {
        whiteSpace: "break-spaces",
        fontSize: 48,
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 32,
            lineHeight: "normal",
        },
    },
    titleSubTitle: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 16,
            display: "none",
        },
    },
    blue: {
        //color: theme.palette.primary.actionLighter,
        color: "#061482",
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
                            <span style={{fontSize: "1.314em"}}><span style={{color: "white", fontWeight: "bold"}}>PIXA.PICS : </span>Load a matrix of pixels.<br />Then, draw, and vectorize art.</span><br />
                            <span className={classes.titleSubTitle} style={{fontSize: ".618em"}}>Make potential (un)limited everywhere <img src={ANGELEMOJI} className="emoji"/>.</span>
                        </h1>
                        <h2 className={classes.subtitle}>
                            AEON'S of the <span className={classes.blue}>raster/matrix</span> and <span className={classes.blue}>vector</span> regarding the universes of graphics, <br/>
                            You can draw and edit on (size) limited pixel art and use it to generate infinite paintings.<br />
                            Made with <img className={"emoji pulse"} src={HEARTHEMOJI}/>, it has been designed to be : For Everyone - For Free - Forever Open-Source <img src={EARTHEMOJI} className={"emoji"}/>.<br />
                        </h2>
                        <Button className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            OPEN PIXEL LAB.
                        </Button>
                    </div>
                </div>
                <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary"onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                    SHARE IT
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
