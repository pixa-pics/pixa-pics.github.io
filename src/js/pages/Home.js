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
        animationTimingFunction: "linear",
        animationDirection: "alternate",
        animationIterationCount: "infinite",
        animationDelay: "75ms",
    },
    "@keyframes movingbackground": {
        "0%": { backgroundPosition: "50% 0%" },
        "100%": { backgroundPosition: "50% 100%" },
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
