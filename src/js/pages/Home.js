import React from "react";
import { HISTORY } from "../utils/constants";
import Lottie from "../components/Lottie";
import {withStyles, Button, Grow, Fade, Backdrop} from "@material-ui/core";
import IconPlay from "@material-ui/icons/PlayArrow";
import actions from "../actions/utils";

import CrownEmojiSvg from "../notoemoji/react/EmojiU1F451";
import LightingEmojiSvg from "../notoemoji/react/EmojiU26A1";
import HundredEmojiSvg from "../notoemoji/react/EmojiU1F4Af";
import MoneyEmojiSvg from "../notoemoji/react/EmojiU1F4B8";
import ScientistEmojiSvg from "../notoemoji/react/EmojiU1F4681F3Fd200D1F52C";
import ShufflingSpanText from "../components/ShufflingSpanText";

const styles = theme => ({
    bold: {
        fontWeight: "bold",
    },
    backdrop:{
        background: "rgba(1,3,15,0.9)",
        zIndex: 1,
    },
    revelantText: {
        fontWeight: "bold",
        display: "inline !important",
        color: "#ffffffff",
        filter: "drop-shadow(0px 0px 3px #000080a8)",
        webkitFilter: "drop-shadow(0px 0px 3px #000080a8)",
    },
    revelantTextDesktop: {
        fontWeight: "bold",
        display: "inline !important",
        color: "#ffffffff",
        filter: "drop-shadow(0px 0px 3px #000080a8)",
        webkitFilter: "drop-shadow(0px 0px 3px #000080a8)",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    revelantTextDesktopBelow: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    homeCTAuseit: {
        pointerEvents: "auto",
        imageRendering: "initial",
        boxShadow: "none !important",
        fontWeight: "bold",
        transform: "translateY(0px) scale(1)  !important",
        fontSize: "1.314rem",
        minWidth: "min(320px, calc(100% - 32px))",
        borderRadius: "4px",
        marginTop: "72px",
        marginLeft: "auto",
        marginRight: "auto",
        color: "#ffffff",
        textShadow: "0px 0px 4px white",
        filter: "drop-shadow(0px 0px 4px lightskyblue) brightness(1)",
        webkitFilter: "drop-shadow(0px 0px 4px lightskyblue) brightness(1)",
        backgroundImage: "linear-gradient(32deg, #6100fd, #5dbff3, #7be2f1, #98ecff, #32c4ff, #6d5bff, #020562)",
        "&:hover": {
            color: "#ffffff",
            filter: "drop-shadow(0px 0px 16px lightskyblue) contrast(1.15) brightness(1.2)",
            webkitFilter: "drop-shadow(0px 0px 16px lightskyblue) contrast(1.15) brightness(1.2)",
            transform: "translateY(-3.4px) scale(1.15)  !important",
        },
        transition: "color, filter, transform cubic-bezier(0.4, 0, 0.2, 1) 125ms !important",
        [theme.breakpoints.down("md")]: {
            marginTop: "0px",
            marginLeft: "0",
            marginRight: "0",
            minWidth: "auto",
            position: "fixed",
            fontSize: "1rem",
            bottom: 72,
            right: 24,
        },
    },
    homeCTAsendit: {
        pointerEvents: "auto",
        imageRendering: "initial",
        boxShadow: "none !important",
        transform: "translateY(0px) scale(1)  !important",
        color: "#6f440d",
        backgroundImage: "linear-gradient(-32deg, goldenrod, #fff9f0, gold, darkgoldenrod, #fff8aa, goldenrod, blanchedalmond)",
        filter: "drop-shadow(0px 0px 4px darkgoldenrod)",
        webkitFilter: "drop-shadow(0px 0px 4px darkgoldenrod)",
        "&:hover": {
            color: "#402303",
            filter: "drop-shadow(0px 0px 16px goldenrod) contrast(1.15) brightness(1.2)",
            webkitFilter: "drop-shadow(0px 0px 16px goldenrod) contrast(1.15) brightness(1.2)",
            transform: "translateY(-3.4px) scale(1.15)  !important",
        },
        transformOrigin: "center",
        transition: "color, filter, transform cubic-bezier(0.4, 0, 0.2, 1) 125ms !important",
        fontWeight: "bold",
        fontSize: "21px",
        borderRadius: "4px",
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
    backgroundImageContainer: {
        willChange: "backgroundPosition",
        width: "100%",
        height: "100%",
        position: "absolute",
        padding: 64,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        },
        animationFillMode: "both",
    },
    backgroundImageWrapper: {
        right: "max(9vw, 9vh)",
        bottom: "max(12vw, 12vh)",
        width: "min(47.5vw, 47.5vh)",
        filter: "drop-shadow(0px 0px 6px #00000099) drop-shadow(0px 0px 9px #00000066)",
        webkitFilter: "drop-shadow(0px 0px 6px #00000099) drop-shadow(0px 0px 9px #00000066)",
        contain: "paint style layout",
        position: "absolute",
        display: "relative",
        transform: "translate(min(50vh, 50%), min(50vh, 50%))",
        cursor: "pointer",
        "& > img, & > h2": {
            userSelect: "none",
            width: "100%",
            height: "100%",
            filter: "opacity(0.66)",
            webkitFilter: "opacity(0.75)",
            transform: "translateZ(10px)",
            imageRendering: "optimizeSpeed",
            transition: "filter cubic-bezier(0.4, 0, 0.2, 1) 625ms !important"
        },
        "&:hover > img, &:hover > h2": {
            filter: "opacity(1)",
            webkitFilter: "opacity(1)",
            transition: "filter cubic-bezier(0.4, 0, 0.2, 1) 125ms !important"
        },
        [theme.breakpoints.down("md")]: {
            fontSize: 12,
            right: "max(6vw, 6vh)",
            bottom: "max(18vw, 18vh)",
            width: "min(60vw, 40vh)",
        },
    },
    backgroundImageInfo: {
        position: "absolute",
        "h2&": {
            right: "max(9vw, 9vh)",
            bottom: "max(12vw, 12vh)",
            transformOrigin: "right bottom",
        },
        [theme.breakpoints.down("md")]: {
            "h2&": {
                display: "none",
                bottom: "180px",
                right: "32px",
                transformOrigin: "right bottom",
            },
        },
    },
    card: {
        margin: theme.spacing(1, 2)
    },
    movingBackground: {
        animationFillMode: "both",
        animationName: "$movingbackground",
        animationDuration: "120s",
        animationTimingFunction: "linear",
        animationDirection: "alternate",
        animationIterationCount: "infinite",
        animationDelay: "75ms",
    },
    "@keyframes movingbackground": {
        "0%": { backgroundPosition: "40% 20%" },
        "25%": { backgroundPosition: "60% 45%" },
        "50%": { backgroundPosition: "40% 70%" },
        "75%": { backgroundPosition: "60% 45%" },
        "100%": { backgroundPosition: "40% 20%" },
    },
    headerContainer: {
        pointerEvents: "none",
        fontWeight: "bold",
        fontFamily: `"Jura"`,
        position: "absolute",
        padding: "0px 48px",
        height: "100%",
        width: "100%",
        [theme.breakpoints.down("md")]: {
            "& > span": {display: "none"},
            padding: "8px 24px",
            "& blockquote": {
                fontSize: "18px",
            }
        },
        "& blockquote": {
            fontSize: "24px",
            "& > span": {display: "none"},
        },
        [theme.breakpoints.down("sm")]: {
            "& > span": {display: "none"},
            "& blockquote": {
                fontSize: "16px",
            }
        }
    },
    titleh1: {
        whiteSpace: "break-spaces",
        maxWidth: "1200px",
        fontWeight: "bold",
        fontSize: "64px",
        verticalAlign: "text-bottom",
        "& sup": {
            fontSize: "0.3em",
            opacity: "0.6",
            fontWeight: "bold",
        },
        [theme.breakpoints.down("md")]: {
            "& > span": {display: "none"},
            fontSize: "52px",
        },
        [theme.breakpoints.down("sm")]: {
            "& > span": {display: "none"},
            fontSize: "40px",
            "& sup": {
                fontSize: "0.5em",
                opacity: "0.8",
                fontWeight: "bold",
            },
        },
    },
    playVideoButton: {
        color: "#f2f2ff",
        textShadow: "0px 0px 0px #fff",
        transition: "all cubic-bezier(0.4, 0, 0.2, 1) 225ms !important",
        pointerEvents: "initial",
        "&:hover": {
            color: "#fff",
            textShadow: "0px 0px 6px #fff",
            transition: "all cubic-bezier(0.4, 0, 0.2, 1) 350ms !important",
        }
    },
    titleh2: {
        whiteSpace: "break-spaces",
        fontWeight: "normal",
        fontSize: "21px",
        maxWidth: "900px",
        "& sup": {
            fontSize: "0.3em",
            opacity: "0.6",
            fontWeight: "bold",
        },
        [theme.breakpoints.down("md")]: {
            display: "none"
        },
    },
    titleSubTitle: {
        position: "fixed",
        bottom: 28,
        color: "white",
    },
    subtitleButton: {
        color: "#ebc22a",
        fontWeight: "bold",
        fontSize: "14px",
        [theme.breakpoints.down("sm")]: {
            "& > span": {display: "none"},
        },
    },
});


class Home extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            classes: props.classes,
            _settings: JSON.parse(props.settings),
            _history: HISTORY,
            _image_name_infographics: "data:image/png;base64,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",
            _infographics_fadein_time: 300,
            _infographics_in: true,
            _bii3_opacity: 1,
            _join_now_button_update: 0,
            _less_than_960w: true,
            _less_than_690h: true,
            _hundred: <HundredEmojiSvg style={{ transform: "translateZ(10px)", height: '1.5em', width: '1.5em' }}/>,
            _money: <MoneyEmojiSvg style={{ transform: "translateZ(10px)", height: '1.5em', width: '1.5em' }}/>,
            _camera: null,
            _is_video_open: 0
        };
    };

    componentWillMount() {

        this._updated_dimensions();
        window.addEventListener("resize", this._updated_dimensions);
        actions.trigger_page_render_complete();
        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 300);

        this.setSt4te({
            _camera: <Lottie
                id={"camera"}
                className={"fade-in-500-500"}
                loop={true}
                autoplay={true}
                src="/src/js/lottie/camera.json"
                style={{ transform: "translateZ(10px)", height: '1.5em', width: '1.5em' }}/>
                }, () => {
            this.forceUpdate();
        });

        setTimeout(() => {
            this.setSt4te({
                _hundred: <Lottie
                    id={"hundred"}
                    loop={true}
                    autoplay={true}
                    src="/src/js/notoemoji/lottie/1f4af.json"
                    style={{ transform: "translateZ(10px)", height: '1.5em', width: '1.5em' }}/>
            }, () => {

                this.forceUpdate();
            });
        }, 120);

        setTimeout(() => {
            this.setSt4te({
                _money: <Lottie
                    id={"money"}
                    loop={true}
                    autoplay={true}
                    src="/src/js/notoemoji/lottie/1f4b8.json"
                    style={{ transform: "translateZ(10px)", height: '1.5em', width: '1.5em' }}/>
            }, () => {

                this.forceUpdate();
            });
        }, 240);
    }

    setSt4te(st4te, callback) {

        let keys = Object.keys(st4te);
        let keys_length = keys.length | 0;
        let key = "";

        for (let i = 0; (i|0) < (keys_length|0); i = (i+1|0)>>>0) {

            key = keys[i].toString();
            this.st4te[key] = st4te[key];
        }

        if(typeof callback === "function") {

            callback();
        }
    }


    componentDidMount() {

        const all_image_name_infographics = ["Whohigh.png", "Whohigh.svg", "Axip.png", "Axip.svg", "Statue.png", "Statue.svg", "Astro.png", "Astro.svg", "Businesswoman2.png", "Businesswoman2.svg",  "Businesswoman.png", "Businesswoman.svg"];

        let _image_index = -1;
        let _image_name_infographics;

        const set_new_image_carousel = () => {

            _image_index++;
            _image_index = _image_index % all_image_name_infographics.length;
            _image_name_infographics = _image_index > 0 ? all_image_name_infographics[_image_index]: all_image_name_infographics[0];

            // image  has been loaded
            this.setSt4te({_infographics_in: true, _image_name_infographics, _infographics_fadein_time: 300}, () => {

                this.forceUpdate(() => {

                    setTimeout(() => {

                        this.setSt4te({_infographics_in: false}, () => {

                            this.forceUpdate();
                        });
                    }, 4000);
                });
            });
        };

        set_new_image_carousel();

        let _image_auto_interval = setInterval( set_new_image_carousel, 4500);

        const _button_interval = setInterval(() => {

            this.setSt4te({_join_now_button_update: this.st4te._join_now_button_update+1}, () => {

                this.forceUpdate();
            });
        }, 50 * 1000);

        this.setSt4te({_image_auto_interval, _button_interval});
    }

    _updated_dimensions = () => {

        let documentElement = document.documentElement,
            body = document.body || document.getElementsByTagName('body')[0],
            _window_width = window.innerWidth || documentElement.clientWidth || body.clientWidth,
            _window_height = window.innerHeight|| documentElement.clientHeight || body.clientHeight;

        const _less_than_960w = Boolean(_window_width < 960);
        const _less_than_690h = Boolean(_window_height < 690);
        const update = this.st4te._less_than_960w !== _less_than_960w || this.st4te._less_than_690h !== _less_than_690h;

        if(update){
            this.setSt4te({_less_than_960w, _less_than_690h}, () => {
                this.forceUpdate();
            })
        }
    }

    componentWillReceiveProps(new_props){

        this.setSt4te({_settings: JSON.parse(new_props.settings)}, this.forceUpdate);
    }

    componentWillUnmount() {

        window.removeEventListener("resize", this._updated_dimensions);

        try {
            actions.stop_sound();
            clearInterval(this.st4te._image_auto_interval);
            clearInterval(this.st4te._button_interval);
        } catch(e) {

        }
    }

    _go_to_editor = (load_with = "", trigger_activation = false) => {

        window.dispatchEvent(new Event("home-action-tryeditor"));

        if (load_with.startsWith("data:image/png;base64,")) {

            actions.load_with(load_with, trigger_activation);
        } else {

            if (load_with.length > 0) {

                fetch(load_with).then((resp) => {

                    resp.blob().then((blob) => {

                        new Promise(function (resolve, _) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                resolve(reader.result)
                            };
                            reader.onerror = function () {
                                var u = URL.createObjectURL(blob);
                                resolve(u);
                            };
                            reader.readAsDataURL(blob);
                        }).then((base64) => {

                            actions.load_with(base64, trigger_activation);
                        });
                    });
                });

            } else {

                actions.load_with(load_with, trigger_activation)
            }
        }
    };

    _handle_speed_dial_action = (event, action, number) => {

        if(action === "share") {

            window.dispatchEvent(new Event("home-action-tryshare"));
            actions.trigger_share();
        }else if (action === "presentation") {
            window.dispatchEvent(new Event("home-action-trypresentation"));
            actions.trigger_presentation(number);
        }
    };

    _handle_video_close = () => {

        this.setSt4te({_is_video_open: 0}, () => {

            this.forceUpdate();
        });
    }
    _handle_video_open = (video_n = 1) => {

        this.setSt4te({_is_video_open: video_n}, () => {

            this.forceUpdate();
        });
    }

    render() {

        const { classes, _hundred, _money, _camera, _infographics_fadein_time, _infographics_in } = this.st4te;
        let { _image_name_infographics, _join_now_button_update, _less_than_960w, _less_than_690h, _is_video_open } = this.st4te;
       
        let first_image = false;

        if(_image_name_infographics.startsWith("data:image/png;base64,")) {

            first_image = true;
        }else {

            _image_name_infographics = `/src/images/gallery/${_image_name_infographics}`;
        }
        return (
            <React.Fragment>
                <div className={" "+classes.movingBackground}
                     style={{
                         overflow: "hidden",
                         position: "relative",
                         display: "flex",
                         backgroundColor: "#0c0f32",
                         backgroundImage:`radial-gradient(#071b62 11%,#071b62 55%,#010310 77%), url(data:image/png;base64,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)`,
                         backgroundSize:  "cover",
                         backgroundBlendMode: "soft-light",
                         backgroundPosition: "50% 100%",
                         backgroundRepeat: "no-repeat",
                         width: "100%",
                         height: "100%",
                         right: 0,
                         bottom: 0,
                     }}>
                    <div className={classes.backgroundImageContainer}>
                        {_image_name_infographics.length >= 1 &&
                            <Grow
                                in={_infographics_in}
                                exit={!_infographics_in}
                                timeout={{ enter: _infographics_fadein_time, exit: _infographics_fadein_time }}>
                                <div className={classes.backgroundImageWrapper} onClick={() => {this._go_to_editor(_image_name_infographics.replace(".svg", ".png"), true)}}>
                                    <img src={_image_name_infographics}
                                         alt="Image demo."
                                         style={first_image ? {aspectRatio: "1/1"}: {}}
                                         className={(first_image ? " pixelated ": _image_name_infographics.endsWith(".png") ? "pixelated ": " speed ").toString()}
                                    />
                                </div>
                            </Grow>}
                        <Fade in={true} timeout={750}>
                            <h2 className={classes.backgroundImageInfo} style={{filter: "drop-shadow(#ffffff44 0px 0px 4px)", color: "#ffffff", backgroundColor: "rgba(0,103,255,0.4)", padding: 16, textAlign: "center", borderRadius: "4px"}}>
                                <span style={{color: "#ffffff", fontSize: "0.75em"}}>RENDER ANYTHING IN "SVG"...</span>
                                <br/>
                                <span style={{fontSize: "1em", color: "#a0c1ff", filter: "drop-shadow(0px 0px 4px darkgreen)"}}>TRY IT RIGHT «NOW»!</span>
                            </h2>
                        </Fade>
                    </div>
                    <div className={classes.headerContainer} style={{textShadow: "0px 0px 9px #57bbff"}}>
                        <Fade in={true} timeout={250}>
                            <h1 className={classes.titleh1}>
                                <span className={classes.revelantText} style={{color: "#ffffff"}}>From PICS {_camera} to PIXELARTS {_hundred}<br/>and NFTs {_money}</span>
                            </h1>
                        </Fade>
                        <Fade in={true} timeout={250}>
                            <Button className={classes.playVideoButton} type="text" startIcon={<IconPlay/>} onClick={(event) => {this._handle_speed_dial_action(event, "presentation", 1)}}>Intro</Button>
                        </Fade>
                        <Fade in={true} timeout={500}>
                            <Button className={classes.playVideoButton} type="text" startIcon={<IconPlay/>} onClick={(event) => {this._handle_speed_dial_action(event, "presentation", 2)}}>About</Button>
                        </Fade>
                        {_less_than_960w && <Fade in={true} timeout={500}>
                            <p style={{maxWidth: "50%"}}>
                            <span className={classes.revelantText} style={{color: "#ffffff"}}>
                                <span>Unlock your full creative potential and turn your pixel art into valuable collectibles with the world's best NFTs and pixel art web editor. </span>
                                {!_less_than_690h && <span>NFTs and pixel art are revolutionizing the way we think about digital ownership and creativity.</span>}
                            </span>
                            </p>
                        </Fade>}
                        {!_less_than_960w && <Fade in={true} timeout={500}>
                            <p style={{maxWidth: "50%"}}>
                            <span className={classes.revelantText} style={{color: "#ffffff"}}>
                                <span>NFTs and pixel art are revolutionizing the way we think about digital ownership and creativity.</span>
                                <br/><br/>
                                <span>By combining the uniqueness and scarcity of traditional collectibles with the limitless potential of digital media, NFTs are opening up new avenues for artists and creators to express themselves and connect with audiences around the world. And pixel art, with its bold lines, bright colors, and playful forms, is the perfect medium to showcase the beauty and versatility of NFTs.</span>
                                <br/><br/>
                                <span>Create your NFT collection today!</span>
                            </span>
                            </p>
                        </Fade>}
                        <Fade in={true} timeout={750}>
                            <Button key={_join_now_button_update} className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={() => {this._go_to_editor("", true)}}>
                                <ShufflingSpanText placeholder={_join_now_button_update % 5 ? "START " : "JOIN LAB "} text={_join_now_button_update % 5 ? "START " : "JOIN LAB "} animation_delay_ms={_join_now_button_update === 0 ? 3000: 0} animation_duration_ms={1000} />
                                <ScientistEmojiSvg alt="Laboratory decoration" width={24} height={24} style={{transform: "scale(3.5)", width: 24, height: 24, marginRight: "2em", marginLeft: "2em", filter: "drop-shadow(white 0px 0px 6px)", webkitFilter: "drop-shadow(white 0px 0px 6px)"}} className="emoji-150" />
                                <ShufflingSpanText placeholder={_join_now_button_update % 5 ? " SOON" : " NOW"} text={_join_now_button_update % 5 ? " NOW" : " SOON"} app="..." animation_delay_ms={_join_now_button_update === 0 ? 3000: 500} animation_duration_ms={1000} />
                            </Button>
                        </Fade>
                        <Fade in={true} timeout={1000}>
                            <p className={classes.subtitleButton}><span><CrownEmojiSvg alt="king-crown-tweemoji" className="emoji"/> Free For Everyone <LightingEmojiSvg alt="sky-lightning-tweemoji" className="emoji"/> Forever Open-Source</span></p>
                        </Fade>
                        <Fade in={true} timeout={1000}>
                            <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary" onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                                <ShufflingSpanText placeholder={_join_now_button_update % 3 ? "SEND IT" : "SHARE NOW"} text={_join_now_button_update % 3 ? "SEND IT" : "SHARE NOW"} animation_delay_ms={_join_now_button_update === 0 ? 3000: 750} animation_duration_ms={750} />
                            </Button>
                        </Fade>
                    </div>
                </div>
                <Backdrop className={classes.backdrop} open={_is_video_open > 0} onClick={this._handle_video_close}>
                    {_is_video_open === 1 && (
                        <iframe style={{width: "min(1280px, calc(100% - 96px))", height: "auto", aspectRatio: "16/9"}}
                                width="1280" height="720" src="https://www.youtube-nocookie.com/embed/U77EWqamAgE"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    )}
                    {_is_video_open === 2 && (
                        <iframe style={{width: "min(1280px, calc(100% - 96px))", height: "auto", aspectRatio: "16/9"}}
                                width="1280" height="720" src="https://www.youtube-nocookie.com/embed/5FkqNhdoRPE"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    )}
                </Backdrop>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Home);
