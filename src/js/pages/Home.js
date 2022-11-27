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
