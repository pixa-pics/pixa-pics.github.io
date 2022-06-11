import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY, UTC_OFFSET_PER_COUNTRIES } from "../utils/constants";

import {Button, Fade, Grow} from "@material-ui/core";
import actions from "../actions/utils";

import EarthEmojiSvg from "../twemoji/react/1F30E";
import StarEmojiSvg from "../twemoji/react/2B50";
import CrownEmojiSvg from "../twemoji/react/1F451";
import LightingEmojiSvg from "../twemoji/react/26A1";
import LuckEmojiSvg from "../twemoji/react/2618";
import DNAEmojiSvg from "../twemoji/react/1F9Ec";
import LabopsEmojiSvg from "../twemoji/react/1F9Eb";
import GlassesEmojiSvg from "../twemoji/react/1F97D";
import JacketEmojiSvg from "../twemoji/react/1F97C";
import DangerEmoji from "../twemoji/react/26A0";

const styles = theme => ({
    root: {
        pointerEvents: "none",
        height: "100%",
        overflow: "hidden",
        position: "relative",
    },
    bold: {
        fontWeight: "bold",
    },
    stepPoints: {
        color: "#008eff",
        filter: "drop-shadow(0px 0px 6px #2196f3)",
        display: "inline-block",
        transformOrigin: "left",
        fontWeight: "bold",
        fontSize: "200%",
        [theme.breakpoints.down("sm")]: {
            fontSize: "150%",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "100%",
        },
    },
    revelantText: {
        color: "#008eff",
        filter: "drop-shadow(0px 0px 6px #2196f3)",
    },
    insideRoot: {
        pointerEvents: "none",
        backgroundSize: "auto 120%",
        contain: "size style paint layout",
        animation: "$slide 32s ease-out alternate infinite",
        animationFillMode: "both",
        "@global": {
            "@keyframes slide": {
                "0%": {backgroundPosition: "30% 0%"},
                "100%": {backgroundPosition: "70% 0%"},
            }
        },
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        imageRendering: "optimizespeed",
        position: "absolute",
        width: "100%",
        height: "100%",
        right: 0,
        bottom: 0,
    },
    homeCTAuseit: {
        pointerEvents: "auto",
        contain: "style paint layout",
        fontWeight: "bold",
        transform: "translateY(0px) scale(1)  !important",
        fontSize: "1.314rem",
        minWidth: "min(320px, calc(100% - 32px))",
        borderRadius: "8px",
        marginTop: "48x",
        color: "#ffffff",
        textShadow: "0px 0px 4px white",
        filter: "drop-shadow(0px 0px 4px skyblue) brightness(1)",
        backgroundImage: "linear-gradient(32deg, #6100fd, #5dbff3, #7be2f1, #98ecff, #32c4ff, #6d5bff, #020562)",
        "&:hover": {
            color: "#ffffff",
            filter: "drop-shadow(0px 0px 16px lightskyblue) brightness(1.1)",
            transform: "translateY(-3.4px) scale(1.1)  !important",
        },
        transition: "color, filter, transform cubic-bezier(0.4, 0, 0.2, 1) 175ms !important",
        [theme.breakpoints.down("md")]: {
            minWidth: "auto",
            position: "fixed",
            fontSize: "1rem",
            bottom: 72,
        },
    },
    homeCTAsendit: {
        pointerEvents: "auto",
        contain: "style paint layout",
        transform: "translateY(0px) scale(1)  !important",
        color: "#6f440d",
        backgroundImage: "linear-gradient(-32deg, goldenrod, #fff9f0, gold, darkgoldenrod, #fff8aa, goldenrod, blanchedalmond)",
        filter: "drop-shadow(0px 0px 4px darkgoldenrod)",
        "&:hover": {
            color: "#402303",
            filter: "drop-shadow(0px 0px 16px goldenrod) brightness(1.1)",
            transform: "translateY(-3.4px) scale(1.1)  !important",
        },
        transformOrigin: "center",
        transition: "color, filter, transform cubic-bezier(0.4, 0, 0.2, 1) 175ms !important",
        fontWeight: "bold",
        fontSize: "21px",
        borderRadius: "12px",
        lineHeight: "2em",
        position: "fixed",
        maxWidth: 274,
        bottom: 48,
        right: 48,
        [theme.breakpoints.down("md")]: {
            fontSize: "12px",
            borderRadius: ".5em",
            lineHeight: "1.75em",
            maxWidth: 188,
            bottom: 24,
            right: 24,
        },
    },
    backgroundImage: {
        pointerEvents: "none",
        contain: "size style paint layout",
        contentVisibility: "auto",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        "& > img": {
            opacity: ".75",
            imageRendering: "optimizespeed",
        },
        "& > img.aspect-ratio-one": {
            aspectRatio: "1",
        },
        padding: 64,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        },
    },
    backgroundImageImage: {
        right: "max(9vw, 9vh)",
        bottom: "max(12vw, 12vh)",
        width: "min(47.5vw, 47.5vh)",
        filter: "drop-shadow(0px 0px 12px #00000066)",
        position: "fixed",
        display: "relative",
        transform: "translate(min(50vh, 50%), min(50vh, 50%))",
        "h2&": {
            right: "max(12vw, 12vh)",
            bottom: "max(12vw, 12vh)",
            transform: "scale(0.75)",
            transformOrigin: "right bottom",
        },
        "h3&": {
            display: "none",
        },
        [theme.breakpoints.down("md")]: {
            "& ": {
                fontSize: 12,
                right: "max(6vw, 6vh)",
                bottom: "max(18vw, 18vh)",
                width: "min(60vw, 40vh)",
            },
            "h2&": {
                display: "none",
            },
            "h3&": {
                display: "inherit",
                bottom: "180px",
                right: "32px",
                transform: "scale(0.75)",
                transformOrigin: "right bottom",
            },
        },
    },
    card: {
        margin: theme.spacing(1, 2)
    },
    headerContainer: {
        fontFamily: `"Jura"`,
        position: "absolute",
        padding: "0px 48px",
        height: "100%",
        width: "100%",
        [theme.breakpoints.down("md")]: {
            padding: "8px 24px",
            "& blockquote": {
                fontSize: "10px",
            }
        },
        "& blockquote": {
            fontSize: "14px",
            display: "none",
        },
        [theme.breakpoints.down("sm")]: {
            "& blockquote": {
                fontSize: "8px",
            }
        }
    },
    titleh1: {
        whiteSpace: "break-spaces",
        maxWidth: "1200px",
        fontWeight: "bold",
        fontSize: "36px",
        "& sup": {
            fontSize: "0.33em",
            opacity: "0.66",
            fontWeight: "bold",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "24px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "18px",
            "& sup": {
                fontSize: "0.5em",
                opacity: "0.77",
                fontWeight: "bold",
            },
        },
    },
    titleh2: {
        whiteSpace: "break-spaces",
        fontWeight: "normal",
        fontSize: "21px",
        maxWidth: "900px",
        "& sup": {
            fontSize: "0.33em",
            opacity: "0.66",
            fontWeight: "bold",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "16px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "10px",
            "& sup": {
                fontSize: "0.66em",
                opacity: "1",
                fontWeight: "bold",
            },
        },
    },
    titleSubTitle: {
        position: "fixed",
        bottom: 28,
        color: "white",
    },
    subtitle: {
        "&, & > span": {
            color: "inherit",
            filter: "drop-shadow(rgba(0, 0, 0, .14) 0px 0px 7px) drop-shadow(rgba(0, 0, 0, .7) 0px 0px 14px) contrast(1.25)",
            opacity: "1",
            fontSize: 14,
            lineHeight: "1.75em",
            marginBottom: "56px",
            "& .emoji": {
                width: "2em",
                transform: "scale(1.25)"
            },
            fontWeight: "normal",
            [theme.breakpoints.down("sm")]: {
                fontSize: 10,
                display: "none",
                lineHeight: "1.75em",
            },
        }
    },
    subtitleButton: {
        color: "#44cb16",
        fontWeight: "bold",
        fontSize: "12px",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
});


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            settings: props.settings,
            ...JSON.parse(props.settings),
            _history: HISTORY,
            _image_name_infographics: "Luck.png",
            _infographics_fadein_time: 0,
            _infographics_in: true,
            _bii3_opacity: 1,
        };
    };

    componentDidMount() {

        actions.trigger_page_render_complete();
        actions.trigger_loading_update(0);

        const all_image_name_infographics = ["Luck.png", "Luck.svg", "Mica.png", "Mica.svg", "Parrot.png", "Parrot.svg", "Mat.png", "Mat.svg", "Lips.png", "Lips.svg", "Nuclear.png", "Nuclear.svg", "Pyramid.png", "Pyramid.svg"];

        let _image_index = -1;
        let _image_name_infographics = all_image_name_infographics[_image_index];

        let _image_auto_interval = setInterval(async () => {

            _image_index++;
            _image_index = _image_index % parseInt(all_image_name_infographics.length-1);
            _image_name_infographics = all_image_name_infographics[_image_index] || all_image_name_infographics[0];

            // image  has been loaded
            this.setState({_infographics_in: true, _image_name_infographics, _infographics_fadein_time: 500}, () => {

                this.forceUpdate(() => {

                    setTimeout(() => {

                        this.setState({_infographics_in: false}, () => {

                            this.forceUpdate();
                        });
                    }, 5000);
                });
            });

        }, 5500)

        this.setState({_image_auto_interval}, () => {

            this.forceUpdate(() => {

                actions.trigger_loading_update(100)
            })
        });
    }

    componentWillReceiveProps(new_props){

        if(new_props.settings !== this.state.settings) {

            this.setState({settings: new_props.settings, ...JSON.parse(new_props.settings)}, ()  => {

                this.forceUpdate();
            });
        }
    }

    shouldComponentUpdate() {

        return false;
    }

    componentWillUnmount() {

        try {
            actions.stop_sound();
            clearInterval(this.state._image_auto_interval);
        } catch(e) {

        }
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

    _toggle_bii3_opacity = () => {

        this.setState({_bii3_opacity: this.state._bii3_opacity === 0 ? 1 : 0}, () => {

            this.forceUpdate();
        });
    };

    render() {

        const { classes, _bii3_opacity, _image_name_infographics, _infographics_fadein_time, _infographics_in, _selected_locales_code } = this.state;

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

        const cc = (_selected_locales_code || "en_US").split("-")[1];
        const THEME_DAY = is_day(cc);
        const IS_EVENING = is_evening(cc);
        const IS_LATE_EVENING = is_late_evening(cc);

        let bi =  THEME_DAY ?
            "url(/src/images/illustrations/Fuji-day.svg)":
            "url(/src/images/illustrations/Indo-night.svg)";
        let bf = THEME_DAY ? "saturate(1.25)": "brightness(0.75)";
        if(
            THEME_DAY === null ||
            IS_EVENING === null ||
            IS_LATE_EVENING === null
        ) {
            bi = null;
            bf = null;
        }

        return (
            <div className={classes.root}>
                <div className={classes.insideRoot} style={{
                    contentVisibility: Boolean(bi)? "visible": "hidden",
                    backgroundImage: bi,
                }}>
                    <div className={classes.backgroundImage} style={{
                        backdropFilter: bf
                    }}>
                        {_image_name_infographics.length >= 1 && <Grow in={_infographics_in} exit={!_infographics_in} timeout={{ enter: _infographics_fadein_time, exit: _infographics_fadein_time }}><img src={`/src/images/gallery/${_image_name_infographics}`} alt="Image demo." className={String(_image_name_infographics === "Luck.png" ? " aspect-ratio-one ": "") + " pixelated " + classes.backgroundImageImage}/></Grow>}
                        <h2 className={classes.backgroundImageImage} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff", backgroundColor: THEME_DAY && !IS_EVENING ? "#ffffff99": "#00651080", padding: 16, textAlign: "center", border: "8px solid #00ff0054", borderRadius: "16px"}}>RENDER REAL "SVG" SHAPES!<br/><span style={{fontSize: "0.75em"}}>Use (6x) "xBRZ" instead of default pixelated rendering of (16x, 32x, 48x).</span></h2>
                        <h3 className={classes.backgroundImageImage} onClick={this._toggle_bii3_opacity} style={{borderRadius: "16px", zIndex: 90, opacity: _bii3_opacity, color: THEME_DAY && !IS_EVENING ? "#000": "#fff", border: "4px solid #980000", backgroundColor: THEME_DAY && !IS_EVENING ? "#ffffffcc": "#000000cc", padding: 16, textAlign: "center"}}>RENDER REAL "SVG" SHAPES!<br/><span style={{fontSize: "0.75em"}}>Use (6x) "xBRZ" instead of default pixelated rendering of (16x, 32x, 48x).</span> <span style={{fontSize: "0.5em"}}>CLICK TO CLOSE</span></h3>
                    </div>
                </div>
                <div className={classes.headerContainer} style={{color: THEME_DAY && !IS_EVENING? "#000": "#fff", contentVisibility: "auto"}}>
                    <h1 className={classes.titleh1} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <span className={classes.stepPoints}>1 >></span><DangerEmoji alt="scientific-danger-tweemoji" style={{verticalAlign: "baseline"}} className="emoji-150"/>
                        <span className={classes.revelantText}>«PIXA.PICS» lovely minima-arts</span><span> from real-life pictures to enhance privacy for NFTs.</span><br/>
                    </h1>
                    <h2 className={classes.titleh2} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <span><span className={classes.bold}>Apply effects in laboratory? Yes?</span> Essential lab operations gives the <span className={classes.bold}><span className={classes.revelantText}>MAXIMA of PRIVACY</span></span> in a fashion not only looking great for the <span className={classes.bold}>ONLINE SELF-IMAGE</span>...</span>
                    </h2>
                    <h2 className={classes.titleh2} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <span><span className={classes.stepPoints}>2 >></span> <JacketEmojiSvg alt="scientist-jacket-tweemoji" className="emoji-150"/> <span className={classes.bold}><span className={classes.revelantText}> WHILE DRAWING/EDITING</span></span> a <span className={classes.bold}>MINIMA-ART</span>, you can use <span className={classes.bold}>55+ tools in 7 panels for pixel art</span>, options in layers, filters, selections, shapes, effects,... <DNAEmojiSvg alt="scientific-DNA-tweemoji" className="emoji-150"/> to process it with LAB-OPS!</span>
                    </h2>
                    <h2 className={classes.titleh2} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <span><span className={classes.stepPoints}>3 >></span> <GlassesEmojiSvg alt="scientist-jacket-tweemoji" style={{verticalAlign: "middle"}} className="emoji-150"/> <span className={classes.bold}><span className={classes.revelantText}> RENDER UNLIMITED PIXEL ART</span></span> in <span className={classes.bold}>4K<sup> Ultra HD</sup> images</span> or in <span className={classes.bold}>humanized ∞ %<sup> Scalable</sup> shapes</span> of vectors using <LabopsEmojiSvg alt="laboratory-noidea-tweemoji" style={{verticalAlign: "bottom"}} className="emoji-150"/>its PIXEL-MATRIX to get it majestically in SVG.</span>
                    </h2>
                    <h3 className={classes.subtitle} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <StarEmojiSvg alt="space-star-tweemoji"className="emoji"/> <span>IMAGINE tremendous (x6 svg, x32 png) <span>PIXEL ART</span> based on your images.</span>
                        <br />
                        <LuckEmojiSvg alt="nature-luck-tweemoji" className="emoji"/> <span>A few aspects just missing from your online-self for NFTs, CAN IT PAY OFF?</span>
                        <br />
                        <DNAEmojiSvg alt="scientific-dna-tweemoji" className="emoji"/> <span>Your own <span>FREELY GIVEN</span> elaborate WEB-APP makes pixel-perfect ultra-simplifications!</span>
                        <br />
                    </h3>
                    <Fade in={true} timeout={0}>
                        <Button className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={this._go_to_editor}>
                            100% FREE <img src="/src/images/infographics/Wardenclyffe.png" alt="Laboratory decoration" width={24} height={24} style={{transform: "scale(3.5)", width: 24, height: 24, marginRight: "1.5em", marginLeft: "1.5em", filter: "drop-shadow(white 0px 0px 6px)"}} className="emoji-150" /> RUN NOW!
                        </Button>
                    </Fade>
                    <Fade in={true} timeout={0}>
                        <p className={classes.subtitleButton}><span><EarthEmojiSvg alt="whole-earth-tweemoji" className="emoji"/> For Everyone <CrownEmojiSvg alt="king-crown-tweemoji" className="emoji"/> For Free <LightingEmojiSvg alt="sky-lightning-tweemoji" className="emoji"/> Forever Open-Source...</span></p>
                    </Fade>
                    <Fade in={true} timeout={0}>
                        <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary" onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                            SHARE NOW
                        </Button>
                    </Fade>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
