import React from "react";
import { HISTORY } from "../utils/constants";
import Lottie from "../components/Lottie";
import {withStyles, Button, Grow, Fade, Backdrop} from "@material-ui/core";
import IconPlay from "@material-ui/icons/PlayArrow";
import actions from "../actions/utils";

import JOYSON from "joyson";
import CrownEmojiSvg from "../notoemoji/react/EmojiU1F451";
import LightingEmojiSvg from "../notoemoji/react/EmojiU26A1";
import ScientistEmojiSvg from "../notoemoji/react/EmojiU1F4681F3Fd200D1F52C";
import ShufflingSpanText from "../components/ShufflingSpanText";

const styles = theme => ({
    bold: {
        fontWeight: "bold",
    },
    backdrop:{
        background: "rgba(1,3,15,0.9)",
        userSelect: "none",
        zIndex: 1,
    },
    revelantText: {
        fontWeight: "bold",
        display: "inline !important",
        color: "#ffffffff",
        filter: "drop-shadow(0px 0px 3px #000080a8)",
        WebkitFilter: "drop-shadow(0px 0px 3px #000080a8)",
    },
    revelantTextDesktop: {
        fontWeight: "bold",
        display: "inline !important",
        color: "#ffffffff",
        filter: "drop-shadow(0px 0px 3px #000080a8)",
        WebkitFilter: "drop-shadow(0px 0px 3px #000080a8)",
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
        WebkitFilter: "drop-shadow(0px 0px 4px lightskyblue) brightness(1)",
        backgroundImage: "linear-gradient(32deg, #6100fd, #5dbff3, #7be2f1, #98ecff, #32c4ff, #6d5bff, #020562)",
        "&:hover": {
            color: "#ffffff",
            filter: "drop-shadow(0px 0px 16px lightskyblue) contrast(1.15) brightness(1.2)",
            WebkitFilter: "drop-shadow(0px 0px 16px lightskyblue) contrast(1.15) brightness(1.2)",
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
        WebkitFilter: "drop-shadow(0px 0px 4px darkgoldenrod)",
        "&:hover": {
            color: "#402303",
            filter: "drop-shadow(0px 0px 16px goldenrod) contrast(1.15) brightness(1.2)",
            WebkitFilter: "drop-shadow(0px 0px 16px goldenrod) contrast(1.15) brightness(1.2)",
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
        right: 32,
        bottom: 32,
        width: "auto",
        height: "auto",
        minWidth: "40vw",
        minHeight: "40vh",
        maxHeight: "60h",
        maxWidth: "60vw",
        filter: "drop-shadow(0px 0px 6px #00000099) drop-shadow(0px 0px 9px #00000066)",
        WebkitFilter: "drop-shadow(0px 0px 6px #00000099) drop-shadow(0px 0px 9px #00000066)",
        willChange: "transform",
        contain: "style size layout",
        position: "absolute",
        display: "relative",
        cursor: "pointer",
        pointerEvents: "all",
        "& > img, & > h2": {
            contain: "paint style layout",
            width: "100%",
            height: "100%",
            filter: "opacity(0.66)",
            transform: "translate3d(0%, -50%, 5px)",
            WebkitFilter: "opacity(0.75)",
            imageRendering: "optimizeSpeed",
            transition: "filter 220ms cubic-bezier(0.4, 0, 0.2, 1) 5ms !important"
        },
        "&:hover > img, &:hover > h2": {
            willChange: "filter",
            filter: "opacity(1)",
            WebkitFilter: "opacity(1)"
        },
        [theme.breakpoints.down("md")]: {
            fontSize: 12,
            minWidth: "70vw",
            minHeight: "70vh",
            maxHeight: "90vh",
            maxWidth: "90vw",
            "& > img, & > h2": {
                transform: "translate3d(0%, calc(45vh - 75%), 5px) !important",
                filter: "opacity(1)",
                WebkitFilter: "opacity(1)",
                transition: "none"
            },
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
        userSelect: "none",
        pointerEvents: "none",
        backgroundSize: "inherit",
        animationFillMode: "both",
        animationName: "$movingbackground",
        animationDuration: "60s",
        animationTimingFunction: "ease-in-out",
        animationDirection: "alternate",
        animationIterationCount: "infinite",
        animationDelay: "75ms",
    },
    "@keyframes movingbackground": {
        "0%": { backgroundPosition: "0% 0%" },
        "25%": { backgroundPosition: "50% 100%" },
        "50%": { backgroundPosition: "100% 50%" },
        "75%": { backgroundPosition: "50% 50%" },
        "100%": { backgroundPosition: "100% 75%" },
    },
    headerContainer: {
        pointerEvents: "none",
        fontWeight: "bold",
        fontFamily: `"Industry Book"`,
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
            _settings: JOYSON.unpack(props.settings),
            _history: HISTORY,
            _image_name_infographics: "",
            _infographics_fadein_time: 300,
            _infographics_in: true,
            _bii3_opacity: 1,
            _join_now_button_update: 0,
            _less_than_960w: true,
            _less_than_690h: true,
            _hundred: null,
            _money: null,
            _camera: null,
            _is_video_open: 0
        };
    };

    componentWillMount() {

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
                style={{ height: '1.5em', width: '1.5em' }}/>
                }, () => {
            this.forceUpdate();
        });

        setTimeout(() => {
            this.setSt4te({
                _hundred: <Lottie
                    id={"hundred"}
                    loop={true}
                    autoplay={true}
                    src="/src/js/lottie/uni.json"
                    style={{ height: '1.5em', width: '1.5em' }}/>
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
                    src="/src/js/lottie/spark.json"
                    style={{  height: '1.5em', width: '1.5em' }}/>
            }, () => {

                this.forceUpdate();
            });
        }, 240);
    }

    setSt4te(st4te, callback) {
        "use strict";
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

        this._updated_dimensions();
        const all_image_name_infographics = ["Ban.png", "Ban.svg", "Sco.png", "Sco.svg", "Bud.png", "Bud.svg"];

        let _image_index = -1;
        let _image_name_infographics;

        const set_new_image_carousel = () => {

            _image_index++;
            _image_index = _image_index % all_image_name_infographics.length;
            _image_name_infographics = _image_index > 0 ? all_image_name_infographics[_image_index]: all_image_name_infographics[0];

            // image  has been loaded
            this.setSt4te({_infographics_in: true, _image_name_infographics, _infographics_fadein_time: 555}, () => {

                this.forceUpdate(() => {

                    setTimeout(() => {

                        this.setSt4te({_infographics_in: false}, () => {

                            this.forceUpdate();
                        });
                    }, 2222);
                });
            });
        };

        set_new_image_carousel();

        let _image_auto_interval = setInterval( set_new_image_carousel, 3333);

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

        this.setSt4te({_settings: JOYSON.unpack(new_props.settings)}, this.forceUpdate);
    }

    componentWillUnmount() {
        try {
            window.removeEventListener("resize", this._updated_dimensions);
        } catch(e) {}

        try {
            actions.stop_sound();
            clearInterval(this.st4te._image_auto_interval);
            clearInterval(this.st4te._button_interval);
        } catch(e) {}
    }

    _go_to_editor = (load_with = "", trigger_activation = false) => {

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
                         backgroundSize: "cover",
                         backgroundColor: "#010728bf",
                         backgroundImage:`radial-gradient(rgb(2 1 15 / 44%) 14%, rgb(1 2 16 / 88%) 57%, rgb(1, 3, 16) 75%), url(/src/images/illusion.jpg)`,
                         backgroundBlendMode: "luminosity",
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
                                         style={{userSelect: "none"}}
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
                        {!_less_than_960w && <Fade in={true} timeout={500}>
                            <p style={{maxWidth: "50%"}}>
                            <span className={classes.revelantText} style={{color: "#ffffff"}}>
                                {!_less_than_690h && <span>NFTs and pixel art are revolutionizing the way we think about digital ownership and creativity.</span>}
                                <br/><br/>
                                <span>Welcome to our revolutionary Pixel Art Editor and NFT Laboratory, where artistic innovation meets the power of blockchain. Prepare to embark on a mesmerizing journey through the cosmos of creativity, where the stars themselves bow to the brilliance of your imagination.</span>
                                <br/><br/>
                                {!_less_than_690h && <span>Create your NFTs collection that can LAST FOR MILLENNIA(S)!</span>}
                            </span>
                            </p>
                        </Fade>}
                        <Fade in={true} timeout={750}>
                            <Button key={_join_now_button_update} className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={() => {this._go_to_editor("", true)}}>
                                <ShufflingSpanText placeholder={_join_now_button_update % 5 ? "START " : "JOIN LAB "} text={_join_now_button_update % 5 ? "START " : "JOIN LAB "} animation_delay_ms={_join_now_button_update === 0 ? 3000: 0} animation_duration_ms={1000} />
                                <ScientistEmojiSvg alt="Laboratory decoration" width={24} height={24} style={{transform: "scale(3.5)", width: 24, height: 24, marginRight: "2em", marginLeft: "2em", filter: "drop-shadow(white 0px 0px 6px)", WebkitFilter: "drop-shadow(white 0px 0px 6px)"}} className="emoji-150" />
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
