import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY } from "../utils/constants";

import {Button, Fade, Grow} from "@material-ui/core";
import actions from "../actions/utils";

import get_svg_in_b64 from "../utils/svgToBase64";


import DrawEmojiSvg from "../twemoji/react/270F";
const DRAWEMOJI = get_svg_in_b64(<DrawEmojiSvg />);
import EditEmojiSvg from "../twemoji/react/1F9Ea";
const EDITEMOJI = get_svg_in_b64(<EditEmojiSvg />);
import AngelEmojiSvg from "../twemoji/react/1F607";
const ANGELEMOJI = get_svg_in_b64(<AngelEmojiSvg />);
import HearthEmojiSvg from "../twemoji/react/2665";
const HEARTHEMOJI = get_svg_in_b64(<HearthEmojiSvg />);

const styles = theme => ({
    root: {
        contain: "strict",
        maxHeight: "calc(100% - 64px)",
        [theme.breakpoints.down("xs")]: {
            maxHeight: "calc(100% - 56px)",
        },
        backgroundImage: "linear-gradient(to bottom, #2367ffcc 10%, transparent 33%), radial-gradient(farthest-corner at 10% 10%, rgb(109 215 232) 14%, rgb(97 197 255) 28%, rgb(0 72 255 / 10%) 50%, rgb(210 92 23 / 97%)), url(data:image/png;base64,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)",
        backgroundSize: "cover",
        imageRendering: "pixelated",
        "&:not(br)": {
            imageRendering: "crisp-edge",
        },
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
        }
    },
    insideRoot: {
        position: "absolute",
        width: "100%;",
        height: "100%",
        right: 0,
        bottom: 0,
        "& .emoji": {
            width: "2em",
            height: "1.5em",
        },
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
            minWidth: "auto",
        },
    },
    homeCTAsendit: {
        color: "#fff",
        backgroundImage: "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTcsN0gxMVY5SDdBMywzIDAgMCwwIDQsMTJBMywzIDAgMCwwIDcsMTVIMTFWMTdIN0E1LDUgMCAwLDEgMiwxMkE1LDUgMCAwLDEgNyw3TTE3LDdBNSw1IDAgMCwxIDIyLDEySDIwQTMsMyAwIDAsMCAxNyw5SDEzVjdIMTdNOCwxMUgxNlYxM0g4VjExTTE3LDEySDE5VjE1SDIyVjE3SDE5VjIwSDE3VjE3SDE0VjE1SDE3VjEyWiIgZmlsbD0iI2ZmZmZmZjMzIi8+PC9zdmc+Cg==), linear-gradient(32deg, #6100fd, #5dbff3, #7be2f1, #f4fdff, #32c4ff, #6d5bff, #020562)",        filter: "drop-shadow(0px 0px 3px skyblue) brightness(1)",
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
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
            borderRadius: "32px",
            lineHeight: "1.5em",
            width: 64,
            height: 64,
            bottom: 24,
            right: 24,
        },
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#ff880033",
        backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MTYgNDI2IiB3aWR0aD0iMTIyMS4zMzMiIGhlaWdodD0iNTY4IiB4bWxuczp2PSJodHRwczovL3ZlY3RhLmlvL25hbm8iPjxkZWZzPjxjbGlwUGF0aCBpZD0iQSI+PHBhdGggZD0iTTAgMGg5MTZ2NDI2SDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI0EpIj48ZyBmaWxsPSIjZmZlNzdjIj48cGF0aCBkPSJNNjM2LjgwNyA0MjUuOTZINDAuOTU3bDIxNC4xNy0zMDYuMjJMMzM4Ljg3NyAwbDYzLjc1IDkxLjE0IDIzNC4xOCAzMzQuODJoMHoiLz48cGF0aCBkPSJNNjEwLjc3OSAxMTUuOTZsLTIxNi44MjMgMzEwaDQzMy42NDZsLTIxNi44MjMtMzEwLTIxNi44MjMgMzEwaDQzMy42NDZsLTIxNi44MjMtMzEwaDB6Ii8+PC9nPjxnIGZpbGw9IiNmZmZlYjciPjxwYXRoIGQ9Ik0zMzguODc3IDBsNC45MyA4NS45Ni0xNi4yOTEgMTIzLjY5NXMxMzQuNTY3IDcwLjg0OCAxMzQuOTI5IDc0LjA3NmwtMjguMzQ3IDk0LjA2NSAyMDIuNzA5IDQ4LjE2NEwzMzguODc3IDB6bTI3MS45MDIgMTE1Ljk2bDM1LjM1MSA4My4xNzggNjIuNjc3IDEyNS44MjIgMzcuMTAyIDE4Ljk2OS0yLjI2NyAzMy4yNDcgODMuOTYgNDguNzg0LTIxNi44MjMtMzEweiIvPjwvZz48cGF0aCBkPSJNOTE1IDQyNS45NkgxYTEgMSAwIDEgMSAwLTJoOTE0YTEgMSAwIDEgMSAwIDJ6IiBmaWxsPSIjY2NjIi8+PGcgZmlsbD0iIzFmMWE1OSI+PHBhdGggZD0iTTUzOC43NjMgMTE2LjU4N2wxMi43OTUtMTAuMjMzYy05Ljk0LTEuMDk3LTE0LjAyNCA0LjMyNC0xNS42OTYgOC42MTUtNy43NjUtMy4yMjQtMTYuMjE4IDEuMDAxLTE2LjIxOCAxLjAwMWwyNS42IDkuMjk0Yy0xLjI5Mi0zLjQ0OS0zLjU0LTYuNDU5LTYuNDgxLTguNjc3em0xNi41ODMtNzkuNzU4bDEyLjc5NS0xMC4yMzRjLTkuOTM5LTEuMDk2LTE0LjAyNCA0LjMyNS0xNS42OTUgOC42MTUtNy43NjUtMy4yMjQtMTYuMjE5IDEuMDAyLTE2LjIxOSAxLjAwMmwyNS42IDkuMjkzYy0xLjI5MS0zLjQ0OS0zLjUzOS02LjQ1OS02LjQ4MS04LjY3Nmgwem0yOTEuMzc1IDE3MC41MDhsMTIuNzk1LTEwLjIzNGMtOS45NC0xLjA5Ni0xNC4wMjQgNC4zMjUtMTUuNjk2IDguNjE1LTcuNzY1LTMuMjI0LTE2LjIxOCAxLjAwMi0xNi4yMTggMS4wMDJsMjUuNiA5LjI5M2MtMS4yOTItMy40NDktMy41NC02LjQ1OS02LjQ4MS04LjY3Nmgwem0tMTUuOTU3IDMzLjA0bDEyLjc5NS0xMC4yMzRjLTkuOTQtMS4wOTYtMTQuMDI0IDQuMzI1LTE1LjY5NSA4LjYxNS03Ljc2Ni0zLjIyNC0xNi4yMTkgMS4wMDItMTYuMjE5IDEuMDAybDI1LjYgOS4yOTNhMTkuMzcgMTkuMzcgMCAwIDAtNi40ODEtOC42NzZoMHpNMTI0LjExOSAzNi44MjlsMTIuNzk1LTEwLjIzNGMtOS45NC0xLjA5Ni0xNC4wMjQgNC4zMjUtMTUuNjk1IDguNjE1QzExMy40NTMgMzEuOTg2IDEwNSAzNi4yMTIgMTA1IDM2LjIxMmwyNS42IDkuMjkzYTE5LjM3IDE5LjM3IDAgMCAwLTYuNDgxLTguNjc2aDB6bS01NSA5Ny41MDhsMTIuNzk1LTEwLjIzNGMtOS45NC0xLjA5Ni0xNC4wMjQgNC4zMjUtMTUuNjk1IDguNjE1QzU4LjQ1MyAxMjkuNDk0IDUwIDEzMy43MiA1MCAxMzMuNzJsMjUuNiA5LjI5M2ExOS4zNyAxOS4zNyAwIDAgMC02LjQ4MS04LjY3Nmgwem01NzguMzU1LTEzLjU1NmwxMi43OTUtMTAuMjMzYy05Ljk0LTEuMDk3LTE0LjAyNCA0LjMyNC0xNS42OTUgOC42MTUtNy43NjYtMy4yMjUtMTYuMjE5IDEuMDAxLTE2LjIxOSAxLjAwMWwyNS42IDkuMjk0YTE5LjM4IDE5LjM4IDAgMCAwLTYuNDgxLTguNjc3aDB6Ii8+PC9nPjwvZz48L3N2Zz4=)",
        "&:after": {
            content: "''",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            position: "absolute",
            backdropFilter: "blur(0px) contrast(1.2) brightness(1.4) saturate(0.6)",
            animation: "$blur-in 56s linear infinite",
            "@global": {
                "@keyframes blur-in": {
                    "0%": {backdropFilter: "blur(14px) contrast(1.2) brightness(1.4) saturate(0.6)"},
                    "50%": {backdropFilter: "blur(0px) contrast(1.2) brightness(1.4) saturate(0.6)"},
                    "100%": {backdropFilter: "blur(14px) contrast(1.2) brightness(1.4) saturate(0.6)"},
                }
            },
        },
        position: "relative",
        backgroundSize: "175%",
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
        position: "fixed",
        transform: "translate(min(50vh, 50%), min(50vh, 50%))",
        animation: "$fun 56s linear infinite",
        "@global": {
            "@keyframes fun": {
                "0%": {filter: "saturate(.75) blur(0px)", transform: "translate(calc(-70px + min(50vh, 50%)), calc(-50px + min(50vh, 50%)))"},
                "20%": {filter: "saturate(.87) blur(6px)", transform: "translate(calc(+30px + min(50vh, 50%)), calc(-10px + min(50vh, 50%)))"},
                "40%": {filter: "saturate(1) blur(12px)", transform: "translate(calc(+50px + min(50vh, 50%)), calc(50px + min(50vh, 50%)))"},
                "60%": {filter: "saturate(1) blur(12px)", transform: "translate(calc(+90px + min(50vh, 50%)), calc(30px + min(50vh, 50%)))"},
                "80%": {filter: "saturate(.87) blur(6px)", transform: "translate(calc(00px + min(50vh, 50%)), calc(-30px + min(50vh, 50%)))"},
                "100%": {filter: "saturate(.75) blur(0px)", transform: "translate(calc(-70px + min(50vh, 50%)), calc(-50px + min(50vh, 50%)))"},
            }
        },
    },
    card: {
        margin: theme.spacing(1, 2)
    },
    headerContainer: {
        fontFamily: `"Jura"`,
        position: "absolute",
        margin: "0px 48px",
        color: "#000000dd",
        [theme.breakpoints.down("sm")]: {
            margin: "8px 24px"
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
        position: "fixed",
        bottom: 32,
        color: "white",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    subtitle: {
        fontSize: 24,
        lineHeight: "1.2em",
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
                <div className={classes.insideRoot}>
                    <div className={classes.backgroundImage}>
                        <Fade in={true} timeout={100}><img src="/src/images/fun.svg" className={classes.backgroundImageImage}/></Fade>
                    </div>
                </div>
                <div className={classes.headerContainer}>
                    <h1 className={classes.title}>
                        <Fade in={true} timeout={200}><span style={{fontSize: "1.314em"}}><span style={{color: "white", fontWeight: "bold"}}>PIXA.PICS : </span>Load a matrix of pixels.<br />Then, draw, and vectorize art.</span></Fade><br />
                        <Fade in={true} timeout={350}><span className={classes.titleSubTitle} style={{fontSize: ".618em"}}>Make potential (un)limited everywhere <img src={ANGELEMOJI} className="emoji"/>.</span></Fade>
                    </h1>
                    <Fade in={true} timeout={700}>
                        <h2 className={classes.subtitle}>
                            NOW AEONS of the <span className={classes.blue}>raster-matrix</span> and <span className={classes.blue}>vector</span> universes of visual art, <br/>
                            for <img className={"emoji"} style={{width: "2em"}} src={DRAWEMOJI}/>DRAWING and TO <img className={"emoji"} style={{width: "2em"}} src={EDITEMOJI}/>EDIT (small) limited pixel art +generate paintings zooming up to ∞.<br />
                            Made with <img style={{width: "3em"}} className={"emoji pulse2"} src={HEARTHEMOJI}/>, it has been designed to be : <span style={{color: "#d8ab06", fontWeight: "bold"}}>For Everyone - For Free - Forever Open-Source!</span><br />
                        </h2>
                    </Fade>
                    <Fade in={true} timeout={1050}>
                        <Button className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            OPEN PIXEL LAB.
                        </Button>
                    </Fade>
                    <Grow in={true} timeout={1400}>
                        <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary"onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                            SHARE
                        </Button>
                    </Grow>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
