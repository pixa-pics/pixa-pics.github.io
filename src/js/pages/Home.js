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
        backdropFilter: "blur(8px)",
        willChange: "backgroundPosition",
        transition: "backdrop-filter linear 160ms 40ms",
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
