import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY, UTC_OFFSET_PER_COUNTRIES } from "../utils/constants";

import {Button, Fade, Grow} from "@material-ui/core";
import actions from "../actions/utils";

import get_svg_in_b64 from "../utils/svgToBase64";

import AngelEmojiSvg from "../twemoji/react/1F607";
const ANGELEMOJI = get_svg_in_b64(<AngelEmojiSvg />);
import HearthEmojiSvg from "../twemoji/react/2665";
const HEARTHEMOJI = get_svg_in_b64(<HearthEmojiSvg />);
import EarthEmojiSvg from "../twemoji/react/1F30E";
const EARTHEMOJI = get_svg_in_b64(<EarthEmojiSvg />);

const SUBTITLE_STILL = Boolean(Date.now() % 14 >= 1);
let THEME_DAY = null;
let IS_EVENING = null;
let IS_LATE_EVENING = null;

const styles = theme => ({
    root: {
        contain: "strict",
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
        bottom: 0
    },
    homeCTAuseit: {
        color: "#6f440d",
        backgroundImage: "linear-gradient(-32deg, goldenrod, #fff9f0, gold, darkgoldenrod, #fff8aa, goldenrod, blanchedalmond)",
        fontWeight: "inherit",
        minWidth: "min(320px, calc(100% - 32px))",
        transform: "translateY(0px) scale(1)  !important",
        fontSize: "1.314rem",
        marginTop: "48x",
        borderRadius: "8px",
        "&:hover": {
            color: "#402303",
            filter: "drop-shadow(0px 0px 16px goldenrod) brightness(1.1)",
            transform: "translateY(-3.4px) scale(1.1)  !important",
        },
        zIndex: 7,
        filter: "drop-shadow(0px 0px 4px darkgoldenrod)",
        transition: "all .25s ease-in-out 0s !important",
        [theme.breakpoints.down("sm")]: {
            marginTop: "0px",
            minWidth: "auto",
        },
    },
    homeCTAsendit: {
        color: "#fff",
        textShadow: "0px 0px 6px white",
        "&:hover": {

            filters: "drop-shadow(0px 0px 8px lightskyblue)",
        },
        backgroundImage: "linear-gradient(32deg, #6100fd, #5dbff3, #7be2f1, #98ecff, #32c4ff, #6d5bff, #020562)",
        filter: "drop-shadow(0px 0px 3px skyblue) brightness(1)",
        transform: "translateY(0px) scale(1) !important",
        transformOrigin: "center",
        transition: "all .25s ease-in-out 0s !important",
        fontWeight: "bold",
        fontSize: "21px",
        borderRadius: "12px",
        lineHeight: "3em",
        position: "fixed",
        width: 128,
        zIndex: 7,
        bottom: 32,
        right: 32,
        [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
            borderRadius: ".5em",
            lineHeight: "1.5em",
            width: 64,
            bottom: 24,
            right: 24,
        },
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "&:after": {
            content: "''",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            position: "absolute",
            backdropFilter: "contrast(1.2) brightness(1.4) saturate(0.6)",
        },
        position: "relative",
        backgroundPosition: "0% 25vh",
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
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        padding: 64,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        },
    },
    backgroundImageImage: {
        right: "max(25vw, 25vh)",
        bottom: "min(25vw, 25vh)",
        width: "max(50vw, 50vh)",
        zIndex: 3,
        position: "fixed",
        transform: "translate(min(50vh, 50%), min(50vh, 50%))",
        animation: "$fun 56s linear infinite",
        "@global": {
            "@keyframes fun": {
                "0%": {transform: "translate(calc(-70px + min(50vh, 50%)), calc(-50px + min(50vh, 50%)))"},
                "20%": {transform: "translate(calc(+30px + min(50vh, 50%)), calc(-10px + min(50vh, 50%)))"},
                "40%": {transform: "translate(calc(+50px + min(50vh, 50%)), calc(50px + min(50vh, 50%)))"},
                "60%": {transform: "translate(calc(+90px + min(50vh, 50%)), calc(30px + min(50vh, 50%)))"},
                "80%": {transform: "translate(calc(00px + min(50vh, 50%)), calc(-30px + min(50vh, 50%)))"},
                "100%": {transform: "translate(calc(-70px + min(50vh, 50%)), calc(-50px + min(50vh, 50%)))"},
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
    },
    subtitle: {
        fontSize: 24,
        lineHeight: "1.5em",
        "& .emoji": {
            width: "2em",
            transform: "scale(1.5)"
        },
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 16,
            display: "none",
        },
    },
    subtitleButton: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    blue: {
        //color: theme.palette.primary.actionLighter,
        fontWeight: 600,
    },
});


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            lc: props.lc,
            _history: HISTORY,
        };
    };

    componentDidMount() {

        function get_now_hours24_with_locale(lc) {

            const offset = UTC_OFFSET_PER_COUNTRIES[lc];
            const d = new Date(Date.now());
            const utc = d.getTime() - (d.getTimezoneOffset() * 60 * 1000);
            const d2 = new Date(utc + (60 * 60 * 1000 * offset));

            return d2.getHours();
        }

        function is_day(lc) {

            const h = get_now_hours24_with_locale(lc);
            return Boolean(h < 20 && h > 8);
        }

        function is_evening(lc) {

            const h = get_now_hours24_with_locale(lc);
            return Boolean(h < 20 && h > 17.5);
        }

        function is_late_evening(lc) {

            const h = get_now_hours24_with_locale(lc);
            return Boolean(h < 22.5 && h > 20);
        }

        THEME_DAY = is_day(this.state.lc);
        IS_EVENING = is_evening(this.state.lc);
        IS_LATE_EVENING = is_late_evening(this.state.lc);

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 250);

        actions.trigger_music(`track_${navigator.onLine ? Math.ceil(Math.random() * 12).toString(10).padStart(2, "0"): "12"}`);
    }

    componentWillUnmount() {

        actions.stop_sound();
    }

    _go_to_url = (event, url) => {

        const { _history } = this.state;
        _history.push(url);
    };

    _handle_speed_dial_action = (event, action) => {

        if(action === "share") {

            actions.trigger_share();
        }
    };

    _open_link = (event, url) =>{

        window.open(url);
    };

    render() {

        const { classes, _quote } = this.state;

        return (
            <div className={classes.root} style={{
                backgroundImage: THEME_DAY ?
                                    IS_EVENING ?
                                        "linear-gradient(rgb(186 151 255 / 47%) 10%, transparent 33%), radial-gradient(at 10% 10%, rgb(164 82 191 / 68%) 14%, rgb(170 97 255 / 64%) 28%, rgba(0, 72, 255, 0.1) 50%, rgb(191 49 49 / 97%)), url(/src/images/illustrations/Tropical-sunset.svg)" :
                                        "linear-gradient(to bottom, #2367ffcc 10%, transparent 33%), radial-gradient(farthest-corner at 10% 10%, rgb(109 215 232) 14%, rgb(97 197 255) 28%, rgb(0 72 255 / 10%) 50%, rgb(210 92 23 / 97%)), url(/src/images/illustrations/Egypt-day.svg)" :
                                    IS_LATE_EVENING ?
                                        "linear-gradient(to bottom, #020082a3 10%, #04020200 33%), radial-gradient(farthest-corner at 10% 10%, #00000077 14%, rgb(158 170 255 / 44%) 28%, rgb(0 0 0 / 10%) 50%, rgb(0 0 0 / 88%)), url(/src/images/illustrations/Fuji-sunset.svg)":
                                        "linear-gradient(to bottom, #020082a3 10%, #04020200 33%), radial-gradient(farthest-corner at 10% 10%, #00000077 14%, rgb(158 170 255 / 44%) 28%, rgb(0 0 0 / 10%) 50%, rgb(0 0 0 / 88%)), url(/src/images/illustrations/China-night.svg)",
            }}>
                <div className={classes.insideRoot}>
                    <div className={classes.backgroundImage} style={{
                        backgroundSize: THEME_DAY ? "175%": "50%",
                        backgroundColor: THEME_DAY ? IS_EVENING ? "#15151526": "#ff880033": "#353b693b",
                        backgroundImage: THEME_DAY ?
                            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MTYgNDI2IiB3aWR0aD0iMTIyMS4zMzMiIGhlaWdodD0iNTY4IiB4bWxuczp2PSJodHRwczovL3ZlY3RhLmlvL25hbm8iPjxkZWZzPjxjbGlwUGF0aCBpZD0iQSI+PHBhdGggZD0iTTAgMGg5MTZ2NDI2SDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI0EpIj48ZyBmaWxsPSIjZmZlNzdjIj48cGF0aCBkPSJNNjM2LjgwNyA0MjUuOTZINDAuOTU3bDIxNC4xNy0zMDYuMjJMMzM4Ljg3NyAwbDYzLjc1IDkxLjE0IDIzNC4xOCAzMzQuODJoMHoiLz48cGF0aCBkPSJNNjEwLjc3OSAxMTUuOTZsLTIxNi44MjMgMzEwaDQzMy42NDZsLTIxNi44MjMtMzEwLTIxNi44MjMgMzEwaDQzMy42NDZsLTIxNi44MjMtMzEwaDB6Ii8+PC9nPjxnIGZpbGw9IiNmZmZlYjciPjxwYXRoIGQ9Ik0zMzguODc3IDBsNC45MyA4NS45Ni0xNi4yOTEgMTIzLjY5NXMxMzQuNTY3IDcwLjg0OCAxMzQuOTI5IDc0LjA3NmwtMjguMzQ3IDk0LjA2NSAyMDIuNzA5IDQ4LjE2NEwzMzguODc3IDB6bTI3MS45MDIgMTE1Ljk2bDM1LjM1MSA4My4xNzggNjIuNjc3IDEyNS44MjIgMzcuMTAyIDE4Ljk2OS0yLjI2NyAzMy4yNDcgODMuOTYgNDguNzg0LTIxNi44MjMtMzEweiIvPjwvZz48cGF0aCBkPSJNOTE1IDQyNS45NkgxYTEgMSAwIDEgMSAwLTJoOTE0YTEgMSAwIDEgMSAwIDJ6IiBmaWxsPSIjY2NjIi8+PGcgZmlsbD0iIzFmMWE1OSI+PHBhdGggZD0iTTUzOC43NjMgMTE2LjU4N2wxMi43OTUtMTAuMjMzYy05Ljk0LTEuMDk3LTE0LjAyNCA0LjMyNC0xNS42OTYgOC42MTUtNy43NjUtMy4yMjQtMTYuMjE4IDEuMDAxLTE2LjIxOCAxLjAwMWwyNS42IDkuMjk0Yy0xLjI5Mi0zLjQ0OS0zLjU0LTYuNDU5LTYuNDgxLTguNjc3em0xNi41ODMtNzkuNzU4bDEyLjc5NS0xMC4yMzRjLTkuOTM5LTEuMDk2LTE0LjAyNCA0LjMyNS0xNS42OTUgOC42MTUtNy43NjUtMy4yMjQtMTYuMjE5IDEuMDAyLTE2LjIxOSAxLjAwMmwyNS42IDkuMjkzYy0xLjI5MS0zLjQ0OS0zLjUzOS02LjQ1OS02LjQ4MS04LjY3Nmgwem0yOTEuMzc1IDE3MC41MDhsMTIuNzk1LTEwLjIzNGMtOS45NC0xLjA5Ni0xNC4wMjQgNC4zMjUtMTUuNjk2IDguNjE1LTcuNzY1LTMuMjI0LTE2LjIxOCAxLjAwMi0xNi4yMTggMS4wMDJsMjUuNiA5LjI5M2MtMS4yOTItMy40NDktMy41NC02LjQ1OS02LjQ4MS04LjY3Nmgwem0tMTUuOTU3IDMzLjA0bDEyLjc5NS0xMC4yMzRjLTkuOTQtMS4wOTYtMTQuMDI0IDQuMzI1LTE1LjY5NSA4LjYxNS03Ljc2Ni0zLjIyNC0xNi4yMTkgMS4wMDItMTYuMjE5IDEuMDAybDI1LjYgOS4yOTNhMTkuMzcgMTkuMzcgMCAwIDAtNi40ODEtOC42NzZoMHpNMTI0LjExOSAzNi44MjlsMTIuNzk1LTEwLjIzNGMtOS45NC0xLjA5Ni0xNC4wMjQgNC4zMjUtMTUuNjk1IDguNjE1QzExMy40NTMgMzEuOTg2IDEwNSAzNi4yMTIgMTA1IDM2LjIxMmwyNS42IDkuMjkzYTE5LjM3IDE5LjM3IDAgMCAwLTYuNDgxLTguNjc2aDB6bS01NSA5Ny41MDhsMTIuNzk1LTEwLjIzNGMtOS45NC0xLjA5Ni0xNC4wMjQgNC4zMjUtMTUuNjk1IDguNjE1QzU4LjQ1MyAxMjkuNDk0IDUwIDEzMy43MiA1MCAxMzMuNzJsMjUuNiA5LjI5M2ExOS4zNyAxOS4zNyAwIDAgMC02LjQ4MS04LjY3Nmgwem01NzguMzU1LTEzLjU1NmwxMi43OTUtMTAuMjMzYy05Ljk0LTEuMDk3LTE0LjAyNCA0LjMyNC0xNS42OTUgOC42MTUtNy43NjYtMy4yMjUtMTYuMjE5IDEuMDAxLTE2LjIxOSAxLjAwMWwyNS42IDkuMjk0YTE5LjM4IDE5LjM4IDAgMCAwLTYuNDgxLTguNjc3aDB6Ii8+PC9nPjwvZz48L3N2Zz4=)":
                            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1OTAgNTc1IiB3aWR0aD0iNzg2LjY2NyIgaGVpZ2h0PSI3NjYuNjY3IiB4bWxuczp2PSJodHRwczovL3ZlY3RhLmlvL25hbm8iPjxkZWZzPjxjbGlwUGF0aCBpZD0iQSI+PHBhdGggZD0iTTAgMGg1OTB2NTc1SDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI0EpIj48Y2lyY2xlIHZlY3Rvci1lZmZlY3Q9Im5vbi1zY2FsaW5nLXN0cm9rZSIgY3g9IjQzMS40MTgiIGN5PSI4OC43MjMiIHI9Ijg4LjIwMSIgZmlsbD0iI2MxYmRmZiIvPjxwYXRoIGQ9Ik01ODguNTMgMzMwLjk0MXEtMS4xNDUtNS45MTMtMi4zNTgtMTEuNjY2bC0uMDEyLS4wMTF2LS4wMDFjLTEwLjIzMS00OC41NDctMjQuMDE3LTg4LjM1Ni00MC4zNDQtMTIwLjgyN2wtNDMuMjYtMTQuODggMzIuNjA4LTQuNjZjMy4yNTctMzcuNDg2IDMuMTEyLTY5LjAzNC00My4xNDctNTUuNTU0bC03OS40NTggOS4wODEgNTkuOTc1LTI1LjcwNGMtMTY4Ljc3NS0xODAuNjU1LTI4Ni45NjEtNzAuMTMxLTI5NC4wOTggNC42MTQtNS40MDEgMi44Ni04LjgxOSA0Ljg3Ny05LjkxMyA1LjUyNi0uMDExIDAtLjAxMSAwLS4wMjIuMDEybC0uMzU0LjIxNiAyMi4zNTQgMTEuNjFoLjAxMmwzOTYuOTkyIDIwNi4yMDkgMS4wMjUtMy45NjV6IiBmaWxsPSIjNmM2M2ZmIi8+PGcgZmlsbD0iIzNmM2Q1NiI+PHBhdGggZD0iTTU4OC41MyAzMzAuOTQxcS43NjktMy4wNTkgMS40Ny02LjEyOWwtMy44MjgtNS41MzctLjAxMi0uMDExdi0uMDAxQzQ4Ny4yNzYgMjk4LjA0OCA0MTEuODU1IDQxLjU0NCAxNzkuMjkgMTEyLjUzaC0uMDExcS01LjM2NyAyLjAxNi0xMC43NTYgNC4zMjljLS4wMTEgMC0uMDExIDAtLjAyMi4wMTJxLTQuOTA1IDIuMTAyLTkuODIyIDQuNDY2bC00Ljk3OSAyLjQzOC00LjMyOSAyLjIzM3MtOC4yMjYgMi4wNjItMTcuNDQzIDkuODMzYy0xOC4xMDUgMTUuMjktNDAuMDQ4IDUyLjY0OS0xMC45NzIgMTM5Ljg3NyAwIDAgMjUuODE3IDcyLjI2OCAxMi45MDggMTA1LjgzMy0xMi45MDggMzMuNTQyIDY3LjEzIDcyLjI1NyA5MC4zMzkgMC0xOC4wMTYtODQuODc1IDE5LjgxNS0xNDUuMzg2IDMwLjk5LTE0MS45NzMgNDUuNzI3LTEzLjI4NiA1OC45NDQgNDYuOTA1IDI0LjA3NCAxMTIuNzAzIDMyLjgxNyAxMC45MDIgNTIuNjk2IDI3LjYyNiA3LjIxMiA2OC41NTVsMi4wMjggNy4wNDFjMjkuNjM2IDYuNTE0IDY2LjE2OCAxOC44NjkgNDAuOCA5OS41NTUgMjQuMTAxIDIuNTM1IDMzLjE4NyAxOS43ODEgMzEuMzc4IDQ3LjU2OCAxNS40NDItNS4wMTggNzUuNDY4LTE0My40MTcgOTAuMDM1LTE1MC41OSA4OS44MDgtNDQuMTYyIDExMS4xMzEgNy4yMzIgMTM2Ljc4NS04OS41MDRsMS4wMjUtMy45NjV6Ii8+PHBhdGggZD0iTTE1Ny4xMDQgMTUxLjgyMWwtMTAuMzI1LTg1LjE3OCA0My44OCA2MS45NDctMzMuNTU1IDIzLjIzMWgweiIvPjxwYXRoIGQ9Ik0xMzQuNjA1IDE1Ny45NTdMMTI0LjI4IDcyLjc3OWw0My44OCA2MS45NDctMzMuNTU1IDIzLjIzMWgweiIvPjwvZz48cGF0aCBkPSJNMTEyLjEzIDIzNy4zMjhMMS44ODMgOTQuMDI3YzU1LjE1NyAxNi4zMjUgMTA3LjM5MiAzNS40MzUgMTExLjY1NiAxMDAuMjYybC0xLjQwOSA0My4wMzl6IiBmaWxsPSIjNmM2M2ZmIi8+PC9nPjwvc3ZnPg==)",
                    }}>
                        <Fade in={true} timeout={600}><img src={THEME_DAY ? "/src/images/fun.svg": "/src/images/rocket_boy.svg"} className={classes.backgroundImageImage}/></Fade>
                    </div>
                </div>
                <div className={classes.headerContainer} style={{color: THEME_DAY ? "#000000dd": "#ffffffdd"}}>
                    <h1 className={classes.title} style={{color: THEME_DAY ? "#000": "#fff"}}>
                        <Fade in={true} timeout={700}><span style={{fontSize: "1.314em"}}><span style={{color: "white", fontWeight: "bold", filter: "drop-shadow(0px 0px 7px white)"}}>PIXA.PICS! </span>Anything to pixel art;<br />Then, draw and vectorize it.</span></Fade><br />
                        <Fade in={true} timeout={850}><span className={classes.titleSubTitle} style={{fontSize: ".618em"}}>Make potential possible. <img src={ANGELEMOJI} className="emoji"/></span></Fade>
                    </h1>
                    <Fade in={true} timeout={1200}>
                            <h2 className={classes.subtitle}>
                                <span  style={{color: THEME_DAY ? "#0d1fac": "#ffd910", fontWeight: "bold"}}>Based on your images,</span> is there many harmful details lacking <b>our <img src={HEARTHEMOJI} className="emoji pulse2"/> simplicity</b>? <br />
                            </h2>
                    </Fade>
                    <Fade in={true} timeout={1500}>
                        <Button className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            OPEN EDITOR
                        </Button>
                    </Fade>
                    <Fade in={true} timeout={2000}>
                        <p className={classes.subtitleButton} style={{color: THEME_DAY ? "#d8ab06": "#ffe66b", fontWeight: "bold", fontSize: "12px"}}><img style={{filter: "sepia(1)"}} src={EARTHEMOJI} className="emoji"/> <span>For Everyone – For Free – Forever Open-Source!</span></p>
                    </Fade>
                    <Grow in={true} timeout={1900}>
                        <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary" onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                            SHARE
                        </Button>
                    </Grow>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
