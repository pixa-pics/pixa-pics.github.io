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
import LightningEmojiSvg from "../twemoji/react/26A1";
const LIGHTNINGEMOJI = get_svg_in_b64(<LightningEmojiSvg />);
import StarEmojiSvg from "../twemoji/react/2B50";
const STAREMOJI = get_svg_in_b64(<StarEmojiSvg />);

const SUBTITLE_STILL = Boolean(Date.now() % 14 >= 1);
let THEME_DAY = null;
let IS_EVENING = null;
let IS_LATE_EVENING = null;

const styles = theme => ({
    root: {
        contain: "size style paint layout",
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
        fontWeight: "bold",
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
            backdropFilter: "contrast(1.2) brightness(1.4) saturate(0.6) blur(4px)",
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
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
            fontSize: 32,
            lineHeight: "bold",
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
            actions.trigger_snackbar(`AWESOME, thanks! Choosing https://pixa.pics/ PASSIONATELY means KEEP enjoying it on PC 4x GREATER than on mobile NEVERTHELESS!`, 10000);
            setTimeout(() => {

                actions.jamy_update("happy", 2500);

                setTimeout(() => {

                    actions.trigger_snackbar(`Looking good seeing you on PIXA.PICS & Good looking at being very happy with ART <3!`, 6000);
                    setTimeout(() => {

                        actions.jamy_update("suspicious", 2500);

                        setTimeout(() => {

                            actions.trigger_snackbar(`Why don't we go right to the laboratory testing any powerful functionalities we have?`, 6000);

                            setTimeout(() => {

                                actions.jamy_update("happy", 1500);
                            }, 3000);

                        }, 6000);


                    }, 6000);


                }, 10000);

            }, 1250);


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
                filter: "revert",
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
                        backgroundColor: THEME_DAY ? IS_EVENING ? "#4800493b": "#FF89003b": "#1f25563b",
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
                                <span style={{color: THEME_DAY ? "#0d1fac": "#ffd910", fontWeight: "bold"}}>Based on your favourite images <img src={STAREMOJI} className="emoji"/></span>
                                <br />
                                <span>Is a lot of detail lacking in <b>advanced <img src={HEARTHEMOJI} className="emoji pulse2"/> ultra-simplification?</b></span>
                                <br />
                            </h2>
                    </Fade>
                    <Fade in={true} timeout={1500}>
                        <Button className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            [ ENTER NOW / EDIT ]
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
