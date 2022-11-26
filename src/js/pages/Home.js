import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY } from "../utils/constants";

import Lottie from "../components/Lottie";

import {Button, Grow} from "@material-ui/core";
import actions from "../actions/utils";

import CrownEmojiSvg from "../notoemoji/react/EmojiU1F451";
import LightingEmojiSvg from "../notoemoji/react/EmojiU26A1";
import GlassesEmojiSvg from "../notoemoji/react/EmojiU1F97D";
import JacketEmojiSvg from "../notoemoji/react/EmojiU1F97C";
import BrainplodeEmojiSvg from "../notoemoji/react/EmojiU1F92F";
import DiamondEmojiSvg from "../notoemoji/react/EmojiU1F48E";
import ScientistEmojiSvg from "../notoemoji/react/EmojiU1F4681F3Fd200D1F52C";
import ShufflingSpanText from "../components/ShufflingSpanText";

const styles = theme => ({
    bold: {
        fontWeight: "bold",
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
        imageRendering: "initial",
        boxShadow: "none !important",
        pointerEvents: "auto",
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
        },
    },
    homeCTAsendit: {
        imageRendering: "initial",
        boxShadow: "none !important",
        pointerEvents: "auto",
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
        transform: "translateZ(10px)",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        position: "absolute",
        padding: 64,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        },
    },
    backgroundImageWrapper: {
        pointerEvents: "auto",
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
            pointerEvents: "none",
            filter: "opacity(0.66)",
            webkitFilter: "opacity(0.75)",
            transform: "translateZ(10px)",
            imageRendering: "optimizeSpeed",
            transition: "filter cubic-bezier(0.4, 0, 0.2, 1) 625ms !important"
        },
        "&:hover > img, &:hover > h2": {
            pointerEvents: "none",
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
        pointerEvents: "none",
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
        animationDuration: "75s",
        animationTimingFunction: "ease-in",
        animationDirection: "alternate",
        animationIterationCount: "infinite",
        animationDelay: "75ms",
    },
    "@keyframes movingbackground": {
        "0%": { backgroundPosition: "100% 0%" },
        "100%": { backgroundPosition: "0% 0%" },
    },
    headerContainer: {
        transform: "translateZ(10px)",
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
            pointerEvents: "auto",
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
        pointerEvents: "none",
        whiteSpace: "break-spaces",
        maxWidth: "1200px",
        fontWeight: "bold",
        fontSize: "64px",
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
    titleh2: {
        pointerEvents: "none",
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
        pointerEvents: "auto",
        position: "fixed",
        bottom: 28,
        color: "white",
    },
    subtitleButton: {
        pointerEvents: "auto",
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
        this.state = {
            classes: props.classes,
            _settings: JSON.parse(props.settings),
            _history: HISTORY,
            _image_name_infographics: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/BAMAAAClcQ3sAAAAGFBMVEXW0V9HcEyT20Ec3TvJ54Vl4jsMTTsUgzwRvmmfAAAAA3RSTlP+AP4fKUUfAAAC30lEQVRIx62VS2/iMBDHh0p1rqm0H4BlKb2u1sG5VmRIrwiwe7Vixb5GpU2//o4fAcKy7B46hzzkX/7zisfwcNty+FoAAG4CeWY7uAHkmUPVQE46k+uAnSHWGnprT8Q5kDUzIqwt6AJXgJzNpoj4svcXfQ04zOa09kwqiG5yBWgCgOFSXwEgAKt/AkFmXn//G4D/B8wuAX/LQxnwR/BzEQPcf04BXAAWBMy2YyBnRvYamJRUpKc5rqXUkDoSgLtWSql0RjfEqsBH+arvUkeCc0bSz1JNnZeo3pFosOTNDoDxga+kIx9yvn5fy61eLOUc6y4Bra8dPqrOu6reSUDSE32lR0CS2H1I6RY+GkQ5OQdQqm0bAPXW+nxCRyIQ3ii7Rnn5oIQjgJTlxktQpkr6WPYj4FMG26+l7gk4CqCKwAOLgNxKwVpxEtiLAVjSKlXOyJ22hzalQAXVyUVP69xnaD8Es09RYEXvqQ7Q+hKvvBNhtPa43PmLggiQhy2lEEw59pEi2pl6E4BvbMcLrLg30WaMggl24NiGGPIF58vHsF62zIDhyeZFfQSSWWYPryw+k1deQwDYsC42TnCtnX/+Sb8OpyBCkMO67rmptGLByXLHj4AZHBjeVIJpO0hGFw8pLNE5LgoUnR2+4EOzVFhv2KEggDcLrRLgUi8y/4UF+wsJqERmN9FJmXpBedjebjKzr8oCV1y75KSH487K3BQYx8rQ+OGClVoZn9XkuDdpF4HjyM2SgFIb5SdZGFSn3R1yMXyPPl/u4OnttPWCsQMBh5jw1JQa4GI+hHp+xvQ046q7CogI9BTQS3vp4gwQwMxybQH+AIa2TcHST9S3cBlksrLLqbqF370n4N6cA37q8KI+V8jNuQuqS2/4sHEi0J8BocbW6BGQURBllOljglaPB6njpY0/sJ7EGnXjaZ9ZR8MylOE0I0dHEvXUBy/05Ma5CQvbwM2D9eLs/Oqj+RrwG72PT1nIsLsmAAAAAElFTkSuQmCC",
            _infographics_fadein_time: 0,
            _infographics_in: true,
            _bii3_opacity: 1,
            _join_now_button_update: 0,
            _brainplode: <BrainplodeEmojiSvg style={{ height: '1.5em', width: '1.5em' }}/>,
            _diamond: <DiamondEmojiSvg style={{ height: '1.5em', width: '1.5em' }}/>,
            _camera: null
        };
    };

    componentWillMount() {

        actions.trigger_page_render_complete();
        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 300);

        this.setState({
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
            this.setState({
                _brainplode: <Lottie
                    id={"brainplode"}
                    loop={true}
                    autoplay={true}
                    initialSegment={[27, 174]}
                    src="/src/js/notoemoji/lottie/1f92f.json"
                    style={{ height: '1.5em', width: '1.5em' }}/>
            }, () => {

                this.forceUpdate();
            });
        }, 250);

        setTimeout(() => {
            this.setState({
                _diamond: <Lottie
                    id={"diamond"}
                    loop={true}
                    autoplay={true}
                    src="/src/js/notoemoji/lottie/1f48e.json"
                    style={{ height: '1.5em', width: '1.5em' }}/>
            }, () => {

                this.forceUpdate();
            });
        }, 500);
    }

    componentDidMount() {

        const all_image_name_infographics = ["Luck.png", "Luck.svg", "Mat.png", "Mat.svg", "Lips.png", "Lips.svg", "Nuclear.png", "Nuclear.svg", "Pyramid.png", "Pyramid.svg"];

        let _image_index = -1;
        let _image_name_infographics = all_image_name_infographics[_image_index];

        let _image_auto_interval = setInterval( () => {

            _image_index++;
            _image_index = _image_index % parseInt(all_image_name_infographics.length-1);
            _image_name_infographics = all_image_name_infographics[_image_index] || all_image_name_infographics[0];

            // image  has been loaded
            this.setState({_infographics_in: true, _image_name_infographics, _infographics_fadein_time: 300}, () => {

                this.forceUpdate(() => {

                    setTimeout(() => {

                        this.setState({_infographics_in: false}, () => {

                            this.forceUpdate();
                        });
                    }, 4000);
                });
            });

        }, 4500);

        const _button_interval = setInterval(() => {

            this.setState({_join_now_button_update: this.state._join_now_button_update+1}, () => {

                this.forceUpdate();
            });
        }, 24 * 1000);

        this.setState({_image_auto_interval, _button_interval});
    }

    componentWillReceiveProps(new_props){

        this.setState({_settings: JSON.parse(new_props.settings)}, this.forceUpdate);
    }

    componentWillUnmount() {

        try {
            actions.stop_sound();
            clearInterval(this.state._image_auto_interval);
            clearInterval(this.state._button_interval);
        } catch(e) {

        }
    }

    _go_to_editor = (load_with = "") => {

        window.dispatchEvent(new Event("home-action-tryeditor"));

        if(load_with.length > 0) {

            if(load_with.startsWith("data:image/png;base64,")){

                actions.load_with(load_with);
            }else {

                fetch(load_with).then((resp) => {

                    resp.blob().then((blob) => {

                        new Promise(function(resolve, _) {
                            var reader = new FileReader();
                            reader.onload = function(){ resolve(reader.result)};
                            reader.onerror = function(){ var u = URL.createObjectURL(blob); resolve(u);};
                            reader.readAsDataURL(blob);
                        }).then((base64) => {

                            actions.load_with(base64);
                        });
                    });
                });
            }

        }else {

            actions.load_with();
        }
    };

    _handle_speed_dial_action = (event, action) => {

        if(action === "share") {

            window.dispatchEvent(new Event("home-action-tryshare"));
            actions.trigger_share();
        }
    };

    render() {

        const { classes, _brainplode, _diamond, _camera, _infographics_fadein_time, _infographics_in, _selected_locales_code } = this.state;
        let { _image_name_infographics, _join_now_button_update, _settings } = this.state;
       
        let first_image = false;

        if(_image_name_infographics.startsWith("data:image/png;base64,")) {

            first_image = true;
        }else {

            _image_name_infographics = `/src/images/gallery/${_image_name_infographics}`;
        }
        return (
            <div style={{
                height: "100%",
                overflow: "hidden",
                position: "relative",
                contentVisibility: "visible",
            }}>
                <div className={"pixelated "+classes.movingBackground} style={{
                    display: "flex",
                    willChange: "backgroundPosition",
                    transform: "translateZ(10px)",
                    backgroundImage:`url("data:image/png;base64,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")`,
                    backgroundSize:  "cover",
                    backgroundPosition: "100% 0%",
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
                            <div className={classes.backgroundImageWrapper} onClick={() => {this._go_to_editor(_image_name_infographics.replace(".svg", ".png"))}}>
                                <img src={_image_name_infographics}
                                     alt="Image demo."
                                     style={first_image ? {aspectRatio: "1/1"}: {}}
                                     className={(first_image ? " pixelated ": _image_name_infographics.endsWith(".png") ? "pixelated ": " speed ").toString()}
                                />
                            </div>
                        </Grow>}
                        <h2 className={classes.backgroundImageInfo} style={{filter: "drop-shadow(#ffffff44 0px 0px 4px)", color: "#ffffff", backgroundColor: "#1bcb1866", padding: 16, textAlign: "center", borderRadius: "4px"}}>
                            <span style={{color: "#ffffff", fontSize: "0.75em"}}>REAL INFINITE "SVG" RENDERING...</span>
                            <br/>
                            <span style={{fontSize: "1em", color: "#22ff00", filter: "drop-shadow(0px 0px 4px darkgreen)"}}>TRY IT RIGHT «NOW»!</span>
                        </h2>
                    </div>
                    <div className={classes.headerContainer} style={{textShadow: "0px 0px 9px #57bbff"}}>
                        <h1 className={classes.titleh1}>
                            <span className={classes.revelantText} style={{color: "#ffffff", backgroundColor: "black"}}>From PICS {_camera} into PIXELARTS {_brainplode} and NFTs {_diamond}.</span>
                        </h1>
                        <h2 className={classes.titleh2} style={{color: "#000639"}}>
                            <span className={classes.revelantTextDesktop} style={{color: "#fff", backgroundColor: "black"}}>Get the MAXIMA of PRIVACY fashionably for real and for the ONLINE-SELF...</span>
                            <br/>
                            <span className={classes.revelantTextDesktopBelow}>Use effects immediately in the laboratory? Yes or No?</span>
                        </h2>
                        <h2 className={classes.titleh2} style={{color: "#000639"}}>
                            <JacketEmojiSvg alt="scientist-jacket-tweemoji" className="emoji-150"/>
                            <span className={classes.revelantText} style={{color: "#fff", backgroundColor: "black"}}> WHILE DRAWING/EDITING</span>
                            <span className={classes.revelantText} style={{color: "#fff", backgroundColor: "black"}}> you can use 55+ tools for pixel art within 7 panels</span>
                        </h2>
                        <h2 className={classes.titleh2} style={{color: "#000639"}}>
                            <GlassesEmojiSvg alt="scientist-jacket-tweemoji" style={{verticalAlign: "middle"}} className="emoji-150"/>
                            <span className={classes.revelantText} style={{color: "#fff", backgroundColor: "black"}}> RENDER UNLIMITED PIXEL ART </span>
                            <span className={classes.revelantText} style={{color: "#fff", backgroundColor: "black"}}>in 4K Ultra HD images</span>
                        </h2>
                        <Button key={_join_now_button_update} className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={this._go_to_editor}>
                            <ShufflingSpanText placeholder={_join_now_button_update % 5 ? "START " : "JOIN LAB "} text={_join_now_button_update % 5 ? "START " : "JOIN LAB "} animation_delay_ms={_join_now_button_update === 0 ? 3000: 0} animation_duration_ms={1000} />
                            <ScientistEmojiSvg alt="Laboratory decoration" width={24} height={24} style={{transform: "scale(3.5)", width: 24, height: 24, marginRight: "2em", marginLeft: "2em", filter: "drop-shadow(white 0px 0px 6px)", webkitFilter: "drop-shadow(white 0px 0px 6px)"}} className="emoji-150" />
                            <ShufflingSpanText placeholder={_join_now_button_update % 5 ? " SOON" : " NOW"} text={_join_now_button_update % 5 ? " NOW" : " SOON"} app="..." animation_delay_ms={_join_now_button_update === 0 ? 3000: 500} animation_duration_ms={1000} />
                        </Button>
                        <p className={classes.subtitleButton}><span><CrownEmojiSvg alt="king-crown-tweemoji" className="emoji"/> Free For Everyone <LightingEmojiSvg alt="sky-lightning-tweemoji" className="emoji"/> Forever Open-Source</span></p>
                        <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary" onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                            <ShufflingSpanText placeholder={_join_now_button_update % 3 ? "SEND IT" : "SHARE NOW"} text={_join_now_button_update % 3 ? "SEND IT" : "SHARE NOW"} animation_delay_ms={_join_now_button_update === 0 ? 3000: 750} animation_duration_ms={750} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
