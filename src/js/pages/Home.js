import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY } from "../utils/constants";

import {Button, Fade, Grow} from "@material-ui/core";
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
        color: "#6f440d",
        backgroundImage: "linear-gradient(-32deg, goldenrod, #fff9f0, gold, darkgoldenrod, #fff8aa, goldenrod, blanchedalmond)",
        fontWeight: "inherit",
        minWidth: "min(320px, calc(100% - 32px))",
        transform: "translateY(0px) scale(1)  !important",
        lineHeight: "1.25em",
        marginTop: "48x",
        borderRadius: "4px",
        "&:hover": {
            color: "#402303",
            filter: "drop-shadow(0px 0px 16px goldenrod) brightness(1.1)",
            transform: "translateY(-3.4px) scale(1.1)  !important",
        },
        zIndex: 7,
        filter: "drop-shadow(0px 0px 3px darkgoldenrod)",
        transition: "all .25s ease-in-out 0s !important",
        [theme.breakpoints.down("sm")]: {
            marginTop: "0px",
        },
    },
    homeCTAsendit: {
        color: "#fff",
        backgroundImage: "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTcsN0gxMVY5SDdBMywzIDAgMCwwIDQsMTJBMywzIDAgMCwwIDcsMTVIMTFWMTdIN0E1LDUgMCAwLDEgMiwxMkE1LDUgMCAwLDEgNyw3TTE3LDdBNSw1IDAgMCwxIDIyLDEySDIwQTMsMyAwIDAsMCAxNyw5SDEzVjdIMTdNOCwxMUgxNlYxM0g4VjExTTE3LDEySDE5VjE1SDIyVjE3SDE5VjIwSDE3VjE3SDE0VjE1SDE3VjEyWiIgZmlsbD0iI2ZmZmZmZjMzIi8+PC9zdmc+Cg==), linear-gradient(32deg, #6100fd, #5dbff3, #7be2f1, #f4fdff, #32c4ff, #6d5bff, #020562)",
        filter: "drop-shadow(0px 0px 3px skyblue) brightness(1)",
        transform: "translateY(0px) scale(1) !important",
        transformOrigin: "center",
        transition: "all .25s ease-in-out 0s !important",
        fontWeight: "bold",
        fontSize: "26px",
        borderRadius: "64px",
        lineHeight: "3em",
        position: "fixed",
        width: 128,
        height: 128,
        zIndex: 7,
        bottom: 32,
        right: 32,
        "&:hover": {
            color: "#fff",
            filter: "drop-shadow(0px 0px 16px lightskyblue) brightness(1.1)",
            transform: "translateY(-12.8px) scale(1.1)  !important",
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
        right: "max(33%, 33vh)",
        bottom: "min(33%, 33vh)",
        width: "max(75%, 66vh)",
        zIndex: 3,
        position: "absolute",
        transform: "translate(min(50vh, 50%), min(50vh, 50%))",
        "&": {
            animation: "$slide 14s linear infinite",
            "@global": {
                "@keyframes slide": {
                    "0%": {transform: "translate(calc(-70px + min(50vh, 50%)), calc(-50px + min(50vh, 50%)))"},
                    "20%": {transform: "translate(calc(+30px + min(50vh, 50%)), calc(-10px + min(50vh, 50%)))"},
                    "40%": {transform: "translate(calc(+50px + min(50vh, 50%)), calc(50px + min(50vh, 50%)))"},
                    "60%": {transform: "translate(calc(+90px + min(50vh, 50%)), calc(30px + min(50vh, 50%)))"},
                    "80%": {transform: "translate(calc(00px + min(50vh, 50%)), calc(-30px + min(50vh, 50%)))"},
                    "100%": {transform: "translate(calc(-70px + min(50vh, 50%)), calc(-50px + min(50vh, 50%)))"},
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
                    <Fade in={true} timeout={100}><img src="/src/images/fun.svg" className={classes.backgroundImageImage}/></Fade>
                    <div className={classes.headerContainer}>
                        <h1 className={classes.title}>
                            <Fade in={true} timeout={200}><span style={{fontSize: "1.314em"}}><span style={{color: "white", fontWeight: "bold"}}>PIXA.PICS : </span>Load a matrix of pixels.<br />Then, draw, and vectorize art.</span></Fade><br />
                            <Fade in={true} timeout={350}><span className={classes.titleSubTitle} style={{fontSize: ".618em"}}>Make potential (un)limited everywhere <img src={ANGELEMOJI} className="emoji"/>.</span></Fade>
                        </h1>
                        <Fade in={true} timeout={700}>
                            <h2 className={classes.subtitle}>
                                AEON'S of the <span className={classes.blue}>raster/matrix</span> and <span className={classes.blue}>vector</span> regarding the universes of graphics, <br/>
                                You can draw and edit on (size) limited pixel art and use it to generate infinite paintings.<br />
                                Made with <img className={"emoji pulse"} src={HEARTHEMOJI}/>, it has been designed to be : For Everyone - For Free - Forever Open-Source <img src={EARTHEMOJI} className={"emoji"}/>.<br />
                            </h2>
                        </Fade>
                        <Fade in={true} timeout={1050}>
                            <Button className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            OPEN PIXEL LAB.
                            </Button>
                        </Fade>
                    </div>
                </div>
                <Grow in={true} timeout={1400}>
                    <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary"onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                        SHARE
                    </Button>
                </Grow>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
