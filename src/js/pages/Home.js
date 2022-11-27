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
        backdropFilter: "blur(0px) saturate(0.9) brightness(1.075)",
        "&:hover": {
            backdropFilter: "blur(8px) saturate(0.9) brightness(1.075)",
        },
        transition: "backdrop-filter ease-out 800ms",
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
        "0%": { backgroundPosition: "40% 0%" },
        "25%": { backgroundPosition: "60% 25%" },
        "50%": { backgroundPosition: "40% 50%" },
        "75%": { backgroundPosition: "60% 25%" },
        "100%": { backgroundPosition: "40% 0%" },
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
            <div className={"pixelated "+classes.movingBackground}
                 style={{
                 overflow: "hidden",
                 position: "relative",
                 display: "flex",
                 transform: "translateZ(10px)",
                 backgroundImage:`url("data:image/png;base64,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")`,
                 backgroundSize:  "cover",
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
        );
    }
}

export default withStyles(styles)(Home);
