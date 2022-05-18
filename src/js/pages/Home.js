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
import StarEmojiSvg from "../twemoji/react/2B50";
const STAREMOJI = get_svg_in_b64(<StarEmojiSvg />);
import CrownEmojiSvg from "../twemoji/react/1F451";
const CROWNEMOJI = get_svg_in_b64(<CrownEmojiSvg />);
import LightingEmojiSvg from "../twemoji/react/26A1";
const LIGHTINGEMOJI = get_svg_in_b64(<LightingEmojiSvg />);
import LuckEmojiSvg from "../twemoji/react/2618";
const LUCKTWEMOJI = get_svg_in_b64(<LuckEmojiSvg />);
import DNAEmojiSvg from "../twemoji/react/1F9Ec";
const DNAEMOJI = get_svg_in_b64(<DNAEmojiSvg />);
import LabopsEmojiSvg from "../twemoji/react/1F9Eb";
const LABOPSEMOJI = get_svg_in_b64(<LabopsEmojiSvg />);
import GlassesEmojiSvg from "../twemoji/react/1F97D";
const GLASSESEMOJI = get_svg_in_b64(<GlassesEmojiSvg />);
import JacketEmojiSvg from "../twemoji/react/1F97C";
const JACKETEMOJI = get_svg_in_b64(<JacketEmojiSvg />);
import DangerEmoji from "../twemoji/react/26A0";
const DANGEREMOJI = get_svg_in_b64(<DangerEmoji />);
import BacteryObserveEmoji from "../twemoji/react/1F52C";
const BACTERYOBSERVEEMOJI = get_svg_in_b64(<BacteryObserveEmoji />);
import CEmojiSvg from "../twemoji/react/1F4681F3Fb200D1F52C";
const CEMOJI = get_svg_in_b64(<CEmojiSvg />);
import LabEmojiSvg from "../twemoji/react/1F9Ea";

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
        lineHeight: "2em",
        position: "fixed",
        width: 224,
        zIndex: 7,
        bottom: 32,
        right: 32,
        [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
            borderRadius: ".5em",
            lineHeight: "1.25em",
            width: 152,
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
            backdropFilter: "brightness(1.0) contrast(1.1) saturate(1.2) blur(1.5px)",
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
        bottom: "max(25vw, 25vh)",
        width: "max(47.5vw, 47.5vh)",
        filter: "opacity(.8) contrast(1.2)",
        zIndex: 3,
        position: "fixed",
        transform: "translate(min(50vh, 50%), min(50vh, 50%))",
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
    titleh1: {
        whiteSpace: "break-spaces",
        fontWeight: "bold",
        fontSize: "48px",
        filter: "drop-shadow(0px 0px 3px #4dceff66) drop-shadow(0px 0px 9px #26229799)  drop-shadow(0px 0px 21px #1a188599)",
        "& sup": {
            fontSize: "0.33em",
            opacity: "0.66",
            fontWeight: "bold",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "26px",
            "& sup": {
                fontSize: "0.5em",
                opacity: "0.77",
                fontWeight: "bold",
            },
        },
    },
    titleh2: {
        whiteSpace: "break-spaces",
        fontWeight: "bold",
        fontSize: "32px",
        filter: "drop-shadow(0px 0px 3px #4dceff66) drop-shadow(0px 0px 9px #26229799)  drop-shadow(0px 0px 21px #1a188599)",
        "& sup": {
            fontSize: "0.33em",
            opacity: "0.66",
            fontWeight: "bold",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "19px",
            "& sup": {
                fontSize: "0.5em",
                opacity: "0.77",
                fontWeight: "bold",
            },
        },
    },
    titleSubTitle: {
        position: "fixed",
        bottom: 32,
        color: "white",
    },
    subtitle: {
        "&, & > span": {
            opacity: "0.88",
            fontSize: 24,
            lineHeight: "1.75em",
            marginBottom: "56px",
            "& .emoji": {
                width: "2em",
                transform: "scale(1.25)"
            },
            fontWeight: "normal",
            [theme.breakpoints.down("sm")]: {
                fontSize: 16,
                display: "none",
                lineHeight: "1.5em",
            },
        }
    },
    subtitleButton: {
        filter: "drop-shadow(0px 0px 2px #ffffff) drop-shadow(0px 0px 3px #98ebfe) drop-shadow(0px 0px 6px #5783ff) drop-shadow(0px 0px 12px #1a1885)",
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
            return Boolean(h < 22 && h > 6);
        }

        function is_evening(lc) {

            const h = get_now_hours24_with_locale(lc);
            return Boolean(h < 22 && h > 21);
        }

        function is_late_evening(lc) {

            const h = get_now_hours24_with_locale(lc);
            return Boolean(h < 23 && h > 22);
        }

        THEME_DAY = is_day(this.state.lc);
        IS_EVENING = is_evening(this.state.lc);
        IS_LATE_EVENING = is_late_evening(this.state.lc);

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
            actions.trigger_snackbar(`Hello, "Jamy" is my name here, many calls me an emoji, while some also hate letting me keys showing you hints.`, 10000);
            setTimeout(() => {

                actions.jamy_update("happy", 2500);

                setTimeout(() => {

                    actions.trigger_snackbar(`It's looking good seeing you on https://pixa.pics/ with all your passions able to being visually-enhanced looking at art, anonymize pixel art!`, 6000);
                    setTimeout(() => {

                        actions.jamy_update("suspicious", 2500);


                    }, 6000);


                }, 10000);

            }, 12500);


        }, 250);
    }

    componentWillUnmount() {

        actions.stop_sound();
    }

    _go_to_editor = () => {

        window.dispatchEvent(new Event("home-action-tryeditor"));
        const { _history } = this.state;
        _history.push("/pixel");
    };

    _handle_speed_dial_action = (event, action) => {

        if(action === "share") {

            window.dispatchEvent(new Event("home-action-tryshare"));
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
                                        "url(/src/images/illustrations/Itsukishima.svg)" :
                                        "url(/src/images/illustrations/Egypt-day.svg)" :
                                        "url(/src/images/illustrations/China-night.svg)",
            }}>
                <div className={classes.insideRoot}>
                    <div className={classes.backgroundImage} style={{
                        backgroundSize: THEME_DAY ? "175%": "50%",
                        backgroundColor: THEME_DAY ? IS_EVENING ? "#48004900": "#4c4c2600": "#21214200",
                        }}>
                        <Fade in={true} timeout={337.5}><img src={"/src/images/Pixagrail.svg"} className={classes.backgroundImageImage}/></Fade>
                    </div>
                </div>
                <div className={classes.headerContainer} style={{color: THEME_DAY && !IS_EVENING? "#ffffffdd": "#ffffffdd"}}>
                    <h1 className={classes.titleh1} style={{color: THEME_DAY && !IS_EVENING ? "#ffffffe9": "#ffffffe9"}}>
                        <span style={{fontSize: "1.117em"}}>
                            <Fade in={true} timeout={112.5}><span>
                                <span style={{color: "white", fontWeight: "bold", filter: "drop-shadow(0px 0px 7px white)"}}>1) PIXA.PICS? </span>
                            </span></Fade>
                            <Fade in={true} timeout={125}><span>
                                <span><img src={CEMOJI} className="emoji-150"/> <span style={{textDecoration: "underline"}}>Get pics into pixel art!</span> <img src={BACTERYOBSERVEEMOJI} className="emoji-150"/> #Adventures</span><br/>
                            </span></Fade>
                        </span>
                    </h1>
                    <h2 className={classes.titleh2} style={{color: THEME_DAY && !IS_EVENING ? "#ffffffe9": "#ffffffe9"}}>
                        <span style={{fontSize: "1.117em", fontStyle: "italic"}}>
                            <Fade in={true} timeout={337.5}><span>
                                <span>
                                    <b>2) Progress logically, <span style={{textDecoration: "underline"}}>modifying</span> <img src={JACKETEMOJI} className="emoji-150"/> visionarily easily, a sanitized pic's minima?! </b><br/>
                                    <span>3) Looks trendy? <span style={{textDecoration: "underline"}}>Render</span> <img style={{verticalAlign: "middle"}}  src={GLASSESEMOJI} className="emoji-150"/> 4K<sup> HD Images</sup> or humanized ∞<sup> Scalable</sup> shapes from pixels <img src={LABOPSEMOJI} style={{verticalAlign: "bottom"}} className="emoji-150"/> lab ops.</span>
                                </span>
                            </span></Fade>
                        </span>
                    </h2>
                    <Fade in={true} timeout={225}>
                            <h3 className={classes.subtitle} style={THEME_DAY && !IS_EVENING ? {textShadow: "#cddc39c4 0px 0px 3px, #ffc107 0px 0px 5px", color: "white", filter: "drop-shadow(0px 0px 4px #ffd808) drop-shadow(0px 0px 8px #c69608)"}: {textShadow: "0px 0px 3px #3bb4ff, 0px 0px 5px #5548dc", color: "white"}}>
                                <img src={STAREMOJI} className="emoji-150"/> <span style={{fontWeight: "bold"}}>IMAGINE tremendous (x6 svg, x32 png) <span>PIXEL ART</span> based on your images.</span>
                                <br />
                                <img src={LUCKTWEMOJI} className="emoji-150"/> <span><b>A few aspects just missing from your online-self for NFTs, CAN IT PAY OFF?</b></span>
                                <br />
                                <img src={DNAEMOJI} className="emoji-150"/> <span><b>Your own <span>FREELY GIVEN</span> elaborate WEB-APP makes pixel-perfect ultra-simplifications!</b></span>
                                <br />
                                <span style={{fontSize: "0.618em"}}><b><span>FUNCTIONAL</span> powerful lists containing 44+ TOOLS make drawing, selection, layers, crop, colorizing, very perfect locally running secure on your CPUs offline.</b></span>
                                <br />
                            </h3>
                    </Fade>
                    <Fade in={true} timeout={450}>
                        <Button className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={this._go_to_editor}>
                            IN LAB? <LabEmojiSvg style={{width: "2em", height: "1.6em"}} /> YES PIXELATE!
                        </Button>
                    </Fade>
                    <Fade in={true} timeout={575}>
                        <p className={classes.subtitleButton} style={{color: THEME_DAY && !IS_EVENING ? "#fff": "#fff", fontWeight: "bold", fontSize: "11px"}}><span><img src={EARTHEMOJI} className="emoji-150"/> For Everyone <img src={CROWNEMOJI} className="emoji-150"/> For Free <img src={LIGHTINGEMOJI} className="emoji-150"/> Forever Open-Source...</span></p>
                    </Fade>
                    <Grow in={true} timeout={337.5}>
                        <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary" onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                            DARE LATER<br/>
                            SHARE NOW
                        </Button>
                    </Grow>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
