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
        "0%": { backgroundPosition: "45% 50%" },
        "25%": { backgroundPosition: "60% 90%" },
        "50%": { backgroundPosition: "45% 20%" },
        "75%": { backgroundPosition: "60% 90%" },
        "100%": { backgroundPosition: "45% 50%" },
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
