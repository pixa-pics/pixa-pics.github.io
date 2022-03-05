import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY } from "../utils/constants";

import {Button} from "@material-ui/core";
import actions from "../actions/utils";

import AngelEmojiSvg from "../twemoji/react/1F607";
const ANGELEMOJI = get_svg_in_b64(<AngelEmojiSvg />);
import HearthEmojiSvg from "../twemoji/react/2665";
const HEARTHEMOJI = get_svg_in_b64(<HearthEmojiSvg />);
import EarthEmojiSvg from "../twemoji/react/1F30D";
const EARTHEMOJI = get_svg_in_b64(<EarthEmojiSvg />);

import get_svg_in_b64 from "../utils/svgToBase64";

const styles = theme => ({
    root: {
        maxHeight: "calc(100% - 64px)",
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
            backgroundImage: "radial-gradient(#ffffffa2 14%, transparent 66%)",
            zIndex: 1,
        }
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundImage: "radial-gradient(ellipse, #f0f8ffee, #ffffff00 100%), url(/src/images/background.svg)",
        position: "relative",
        backgroundSize: "150%",
        backgroundPosition: "0% 25vh",
        "&": {
            animation: "$slide 56s linear infinite",
            "@global": {
                "@keyframes slide": {
                    "0%": {backgroundPosition: "-150% 20vh"},
                    "20%": {backgroundPosition: "-50% 25vh"},
                    "40%": {backgroundPosition: "50% 30vh"},
                    "60%": {backgroundPosition: "150% 35vh"},
                    "80%": {backgroundPosition: "225% 30vh"},
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
        width: "max(100vh, 100%)",
        left: "calc(max(-42vh, -42%) - 256px)",
        top: "calc(64% - 128px)",
        transform: "translate(25%, -50%)",
        zIndex: 1,
        "&": {
            animation: "$slide 14s linear infinite",
            "@global": {
                "@keyframes slide": {
                    "0%": {transform: "translate(calc(25vw - 25vh + 0%), -50%)"},
                    "20%": {transform: "translate(calc(25vw - 25vh + 0%), -50%)"},
                    "40%": {transform: "translate(calc(25vw - 25vh + 7%), -50%)"},
                    "60%": {transform: "translate(calc(25vw - 25vh + 14%), -50%)"},
                    "80%": {transform: "translate(calc(25vw - 25vh + 14%), -50%)"},
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
        textShadow: "3px 6px 9px azure",
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
                            <span><span className={classes.blue}>PIXA.PICS</span> - to pixel art, then draw.</span><br />
                            <span>Make potential (un)limited</span><br />
                            <span><img src={ANGELEMOJI} className="emoji"/> everywhere.</span>
                        </h1>
                        <h2 className={classes.subtitle}>
                            At the horizon of both <span className={classes.blue}>matrix</span> and <span className={classes.blue}>vectorial</span> universe, <br/>
                            discover an unprecedented industrial and educative purpose.<br />
                            Made with <img className={"emoji pulse"} src={HEARTHEMOJI}/>, it is designed to be - forever open-source & for everyone. <img src={EARTHEMOJI} className={"emoji"}/>.<br />
                        </h2>
                        <Button variant={"contained"} size={"large"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            Start using it
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
