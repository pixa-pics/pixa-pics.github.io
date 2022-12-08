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
                 backgroundImage:`url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAADhCAMAAABfslpSAAABCFBMVEX///8AAKEAIIQkNKcOJJMjAMlRA9QAAFciU6UAAHjMPdgABL1jGbwGANEKDo+jGNYTUKuZBdMwCnFLGMZ5B90HINcPDMbOBqO1B8NLAFMKPLQgAGMMCGYAF6MAAMkJDMw4RppTA3JPC9alDnm+AWUOS6MfC7eEA20mJtoANM4DOJI4DZZpBmsAAL0AFXwASMCjAX6XAqcACdUGAdrCJJXEFbocAN4HD9hFCWsnHMsbE9i4DXoiE5YDANkHAE8UDHojAEAJB3zNAGcXAGXIAIQBNI4LAFEEAHrHD4YbD6XOMJsAGHELD+HAAEEIAN0LAGMDJ4IDBYAADF0DAGXUAF0ADGkAAFHLAE3ompOqAAAgAElEQVR42sxZDVPbuBZFthVZSHbybKzBKLYJeZjQxN1CtiGwJJBhF4aZznY67///l3eunQ+gtM2+KfOqkPhLtqV77j33XLEjpKAmpYiave801myuGGN0B5O4i+4UTGLj1Rcdz5EsFCL0fKF7pWCGyUjWvehndQseUSmlxrliSgl81Tm+FxdJliTYMUFyenrqJ6f4BFeDS89rXo8uVX7x6SLx/aq6HAz8weBqUgR04+lp5jlBfqXGk2B27nkHvh/HZXx47Yt6gPRayVj9t5lpKNfzf96cA/HrtJ1Q3NFWW51qGi0dDOnn8x0NPfS8xvoPVnBeX2261MaWtd3RqbEBzToMjTJJxaR3cPzu+EC8846PRXf5NinDjVE8Ud/oXddn3gsny5K18XAlE1mW4e3SgcnfOQ6uK1UpZlQVBEYVxhR8YIrJZBJM8vw8AUgHRR4En8Z/z87VoxuWpuTDCG39+ubVX54i0ux3xU10H8FRuy8N1F38CijBXhZDTXtR1JsLz/H9jn/d2L7ehKyJIIn4GNoomtupwKYvECFyXpt7PpSR6Mp6hqHwXIqk8No9JpTeO38dAKYtmhcijNa2q43nvAd4dXz+5XgHXpadBxXhxCqmqjyv1EVRYRsEiMRxXgDSXM1UEOTnY4WRPDLOS0LpGUvAT9iLVy/kjRDRdBrhY6Pn11z5K6AUc6tD6XnuZRw6mRcOkoskOc2UcAziyHU7h3Bnja2P5qJpKYYj4rBez2r7sY/51c5fPw67ZvnkVWQ6752XnvsNmMT3DYKQElUlGUUgODVsXhmy+qmMOFQBMTWejQO0GVsguuO4Rim6efKch5oCqLtgVREqYG4qYBfZYRy3bMtKw0piyWX7/4Pk7Jzto5Wq4Hv7uuGrMfICHJXHNYljMoXruY7n1zCFLA6HWmqMPWZW2pNRVPNZMxtj3KTT6dR46NeA0N5bzqYKkOdyFTQtZo+sPOI8iqy1z5iM8lOeo+ssGI/Hs/NJgBsrxvEpOT+K+VErFqJkCsfs8p5oDyAuunM4p97G4X56LGmth7GXJLu77TIMlTDMDC4SwymFK1VWcDiD3ATOJ5QwytLtSbvXOuKaa9vvj36fdlfKAHSXZcji61h6qTvu/3jDqYCj4V05MWDTEF9mGA8Jpaj78DS/AKUAya06Qq/xbDZD6CGzBcSm8DcCURChqoqjs7XibhpFeP6dWETzm4YHu91586zo7eGSOyQPMsV0uweuVwqxVKiYc84UhVHMFfMcxwXlK4B0aUrNWy5pDdnmrZb98CHtn/TtKnMZ5+A35LWvUMqyhhBv+284FTJu9RSlCRNyGJOVBYy6WHZaqzm41RDikrDJoTCbOwucAII4Q8fjgMU85mWZWuL4Iab4H1JAMgJgoH5hcdZ23z6WoIQLxfc/8oIhforCQAGz2Ki84AJDRnwhrYcH4DHf88u41LrFWtYORYvtpWf644m9s6uAQcQglSUJ2aGr187rIb6Wfjd9a5Bg3PGsxmg8mQVGlNaCxORCzBuZIEygNjelq8qg/m12WIMXxddsUnFqLb5uAWiRW8NiZjDvOZB6ldrFdql4e5QQEq39fYtcRCiZAiY9HWie12VMpXisVDLwnIHrHYrD6yPe0naP9yRJB3sW9aOG8CiP4w4RZsUgqY2mnxgwXApwEc3fDqVVXgJMlG+CKzgaACKU+IbqKvUEpal8BWu5DEdSISrgfBKsITpqtsjYacyknst5H2JkqQpfl+xy+BOmvGP/tf/n/lmL6spKFWGDUiJjlVch/EYh5M0g9DuhCxF2WMaxBoUwEJ4c2dEo/RA9UkF1I7sPsAALiyIZXMjn6kFuPGoq3zSWSDnAxJRqyMaTpVX5ZK0a4Ijj7zk6HkIif5aToBgHpKKConnIVTCZ1DvlFTNWs5u7+66wi0bjUmHyOkzPlD1j4f+E0sn+/r/PVEELAerc1NLThIoGg9DmVQGhAxbr+Hg8ZN7jgFsLAkjtyKZWR/1UP9RscfM5ErUiNMV5jZJwn4HUlItSb4OSvY9+1KV7v3j5pAe8CCBUsG0dBhBuFAQTfIjzakIjsT5Wr/HRfL48qPKAkhswygmsnPNa8HJVsGIVU1B+wGpuxf3Ukud15XSxkHfy7oeEDj9imyqtnsg2FtmJWSu1DGylBiYBNaCKNWUJ/cCwxzBxE3veJTNIoZ4xRtghKGRoe/BdLj9LS1Ug6btoqjHGUMvYmObFi8aQMjTm0HUJpZvus8LlWy2aN6sFkdX37ut8gR726fHNkDBCGCBxBH8DI/pSJO219iBy8IvAt/MRcsnam6mYF9BuUaRv05NUT7uRXcHGSB8WxPgACDHK1xFFsVRyibNiiKynEUM9G53c38y1mL9GFfL5Sgd7ErW1e8+3EB87mqFG0gNVQoFfxWWMmslAiz6S/E5C411ekgpkRpZhHbCoBct6EmJT8NHKGArBsqkzZfhifOHaZaX45izs8Cl5Lbdd0X2xzLbeyql9Mn8ZRUNWnTelUmuCVHvUarXxAUbU9lrt9PdR2h/11/f0cPUk/WN027+b9vt/nIzSu94t4mGtr8kzORJzWdqaWQq2RAmHKKkaWdFKda99cpKOEFP39zb6AUqLjdOxgDcD38Jzd5brBl8a03z5iuxrxbo53Bw8e71cXf0HyZ5EhQnXy53hV9XVs3E0vQq1egVDvEMI1OeJaSE/kRcblALgw1EptNs6jg8Jpbhsn7WjdrQb3Rz6nQx0nLnubrm7u+vvDo0e9nRPoFYXsViuOpCrAwaFVGtCl5bNDmj5ZUDaAQBJ4CNboP6WTnvp2clo1L22w8Oa5fkmXKKvXLN/u96F2mQNLWyF0taKsVlc835Ssq8R3yqZYhpNaq6qfI0SzDW4OOfLfIOGBEICnAqlFj862osHqPCufHfAzaUfw9L+rr9sif+0ocYIQ4ZeyDzw8FyZwh34SGZI05VRxutkrnd63Mk6mUNZoSIAifHjWMa05em0u5QJiJVS8VWuu126+MZ9U7txU/hUtaV6+PrU03W35zHjebjkHP9DQF6HFbM73MIxuuRoLi3xdet/XlQbR42Zm3wCFSE3ypKhOoUygAInGd2UTBOVJys8YsDk+d9uTKgQrq3q0j7LTg86vpW8TEsdt3fdU1qd/60DPB3B9X+ZtxautJUu2kkyGaZ5AAkGyQQwIMHy0Kqr1qpVFB+rq3fd2+/7/z/mnnMm4W2rVrtu2ioiIWH2nHP23ueUA1XErs2YYgGWJ8wi08TklZ5OgiDjhewIRqfpqAvoXWTrHwwLyPIevZQvR8mAY/AIgE/BKIdVXiWrsJs/DzUK3gROs0zLBy4CJcr396IHJAv4MaUYMpOXRShTKJrO1udjouHOVxRMxyCYWmfOHpmPJbMJWSraCsMZKM0PB/GgRBZy6UNskv1FCNGB3yPTD/vbIUvPP5F70qz0SqWDEiwty6AyQ6pmLK8AQEm+mJjCA6iuF4tZSbrBJDCfWAmS56BkGKs/xwNhvDCzWYN4YOxTUBRF0ilK0WN8G7gayjeqNpkTsXHbcUC40bNftE9N1Si7gndIU2p2MZDTsLhHbVA5+cG9M9A3IVQPLCC87FDJDzGjoaPcdjjcCEO3BNfVbza3SpXKQaVS6pWaY+RHbHpeFv779zsaWFbclCZR8JAX7dBsntYgsqkpSr0f3Xx05w2u5OJlqvYJ0WDcDQZ3g5fhBOcudz2RMBex9PCIOHWwmwAvzIrmAQPBzTCp8S3dS/jm+6C2hSlN4U6D6Yje0T/6vNUCrUTuqXeMhR4rPULUYawzt3lOTv6CJYaIDOatQTgdqtHWh1JJSChwECaie96dykZDcOC7caXCeOZgjiN+C3foROGewyAVxkvVlZre+VZatzawX/ImKAFMFvzdfxFK3434bhAvs8YcJekmm1AikGTRg0dMsO3njCMmItZu+zzTa+E2IGUGIplMgutRQEXLaW9toUWKMHl/gTRXdufM5iBrbBXypYMRmbsXus2oL3YhSBZD9ELstpnqdtNAdRsP+kYEyg2f+W1fMPL7mC9BSgNky4ooEPf3q9zu7qCoGT6Eu3wTlDDdycfdMzH3Fjb+Xl5dLMNQvJkpN6OUz1Nckp0RhnZI+YU8eodjtqElSBvT5GonCdDxvCSxBSg1PyB5OPmK7gPqT4ikTofbKeU8nsm0MFVwvaHe9bAyVYx56wOoN7AQR1+PA7+LdvTWIlIKNwf7xMo3G9MZbUWCSHm95hUZcWWGkjajn4lSspFxy42+rr/EvGYoyWLnb5BEIph0V9oV0lWJ5qfrGU9RtqCdK4NpMFQhJH2Opi8sXMa8lie1oBZyKFxxFSTa+nE1So5zdNRCV8fjDg/hRQ3StI20RigxIM8gfDtC6dZvDHwg3u/1NCmC0HAw17Fxa8xyVPIPXYCEOPkzZJgv5zvv6ZX6BUrmHePmqozBqu371gLZ0vcLXDV/2f396pXjeIF3a3xk9RMs3mV3VGAcaW/i2lWkaC3LykeQROQXIihkTMGez6AyA3V7+AYMjtlAbTPf5GEEcSJF0xIW3OKe/8U3i/2TzxhRl7nVGkMZc8YhF6yDILll931NJ7ox521sGAGsCTXjF/fcDJgFvv/KLYiXeuKskMqRb0AIc6p7DvYwTF/fd7KT370Pn/2RTbO/P6s6fkGFyvVP2L+ZezI+iwrLld6vGYn8EaMtAew2CzkLxTRDlMIUO28iQ5dh6MsIdKcT7ZUqccWKS9YO0GhzljPp8gDREfXugIdjaQL2UMv9IbtW1v0HbGPANdBqlMGDn2CndTYmNFPMjvNfmElZQEnOKHOvpC3A3HR5SHRY5e0TSTv1yPmF7eOzduR4rQgKPftm9no9YrF5dWOFl6/fmTmfmxomH+UyBBQEMf8Sor8tHFzRDJ1+UIm0eawI0KlQOxJDZxih1tXGWK40jGbzM/nZ3gn8OT45i3g68/Fs94x3QKSGPHT5SeiqIHCv5al6ndad8WdQgvRcuaBeFnkFc9G0aOLlk0Ji/5HcakGyh9MZJHOqFwZKpWKISM7b2fqBaX3Qg3z6kjTOCOXbG8MzDgM9kwI7g0BquGFOyH1/bInccg8UTXoGS30BgRmPjIfjv78e75253HaHONrhpvjFDjt2J+QqZdJOJ0EqErXWS5luhkxe4k2r+40gSuP/bzp2M+N4xqD3dOvHMH7yK/lT6+5hwXD6oc0jhH/m7erhKod0LP3gMB149NjzZF7Y2XD9Cg6NPWiUgOVt7UHgQGyaED5QjcqQ+KIzh9dqyhVBGgxF0AhEukh9AuFeY/fhYfEz3AN/VcnppN/t7p53RwHymgRnA4o+pxsElkz+CEp/4khWrHS5EUhNcn1SkL7Q42bcd/S83ViLFUDJXvHGpq6g+a2WnseDQ3eETsK9sFPjHXd72962PcerVQ/7adAYnQZTdyg7wBSLW7oPAqEgOpc7qvAEZMfRx3p9d7d+LrvCVdL95xRuNm8NuSM3eFuK8e76WYbSUx3v3zPLc4K/ih7CNJ6phGDlKmSpAYv+SpNbNJ6SDyzU7Op2fgBajKtOrZbZtlKqgSNAc70TyCsIkEBKNp8kV6NApaN+v37bl0oqLpRK4bvkIBLcnJSPJpNcwCyc+AaxZBhxbG5uXD13lZNndpo2WUSbxBdmQ0BpQVqt7QwGRQ0oHsbSccs7aeU+Q7VaoFS1UeRyMvbslIcKh1GwialBou62UtO8gP6D09mNw/7H29ubev2mgWN6jAM2oSsk54CVGIrhZXB/6k4KW4XeyVxWKkU2lEhFjXlWeQFKg9h8pSkR8bswCfkIeGOKpUdQopkFKkwYS6ht81DyDrdpgBe+2tWaB4SPo+0KgSSzECByi10R4KQdaO5pfv9KTlXa79Zv6zdw1BsMeOvYBXSyhgwV4AwwuRTTSi1lkMtgiZPkKH037uLYiBEm03yWth2809kNUBq8HkuRUv4GTlI+9pYQS958OmLNYEJvp+WADiCQWp4eymrzal0HUrVarkIQlauEXxhKHqLiLuQbDq9OMViwDkqZNvDonu/WbxCnev0QOU0bQqmTcVcOOW9AxQK+gf9XY210I7GMgblqWscHsXGXq/DnrLbxzhJoVGEsPeG85G1Q+t/TXsqWMl6wtjSSvFJPjyG3vBbOffO2x8vbeShVq7Vyh9m1GtM5D5h1OrShMDEPmYoMBYreDsGLEKX9fv/j7k395va2DihJ4TljlgJ5B5S44kpJcQkB5wZrg0ByR5QG8Sr77cWDolWXo2Q8MZaAf0d+sfrGj0Utv7YK1zKRifZTfrWu8rejZ/016InMUHpQp+vXZN54DCyuPYaDJsU93s44VqXD6nYVYPJqAJzC+uSiao74EJaayWwMtQm5v3dsE0a1tNHvpw34+hGY3S2hVIaqBLEqUqVCOGs4zFKoSu7lCA65WoMCMaj8Wtn0etbGArxWl4ymdbaXzPoMeXc2zkE2vssln9CyIKNaprCwnZW8vkZ4tMVMdSly2vOMt4IS1W7Idi1nTAcFE9cTebaycZ4EogdnV7ChQQXLCWW5UT50ZTkt2yGnAaROtYYj/kgN4MDqRUE1gX9ANTrY/0hV+dCu2oeNj5AQIdr65w09sns1zYS6vwQBfI+MHu5p8ov9J1djaQDBZqzniXelg3gnk6s9dAJkQ/7EX8GTP0jWJg+vDhL+3w7Q10ttdTH3oJ2281jGo7IF9AGCiCJprOsSLHibdFMKj09oGoKeDqk1eHh72Ng9dNPt/jbkQI84vM0RXqhV2IPk2Hj5l5hr4U5TW8IFNuCWDTsCorh9oYma+EjQ5p2Tx7HNPV29a932nv//X+7MAAat6ev0nkNXUytEhI+Z+Wbmm80NHJMBnFUSWyHYYWqladpsHDYatxCwDhuPVLMR/1GxulqLex8zqvWjeh6eDeMfqzPpraMWxVys4pRQOjg6qOQ3AyD4lP/7/oimYRgpUkryEv2E6Xb25/+wAVXV9YXOWqWm1YO/yY64Z8/L7MHeKg9lxoRIOSs3kzs6gXaDrXiNyqzAwbWRFlDBdaRxNK3mu7OzP8azWAFDv7BMmlLTRARecaQJEzysaWMR3dQGEK0GJtVuY0QJ/qZnh4eH8S0ku+8UNb8gh+ISIp2y+JSrZ7Fur4dnY/pmnvGFc3itZ4ootR9IbVJCCftges7z8j36J2R8bGNHJVR1qg4tFl/qgnTW6fxVlFr4yByw4sM56lczabCfp7nbKOXJJH+JbnBDwYocqjFhcZfMy3FwdGxgChTSmYiZZpmBaUHAenc2HMeJSAAF0xqYWWsKDtSuvcAM7Ml1pJmkZHaRVQwATIhVVhpCBibT29vbYTM+P3+nqISlOKrnwZ0CTODwZlw8DYdDlU927fPSe2zp5PQIxTdoG1txCaHJC6x5XXTBTj6yF5TYYus3yB3q3m6DqX6czy19i07Ej68ftMDePSTYRzqF1Rytf8VDHyHQ7czfwlvDoRjO7uNZPFRqNp6pe1ISA6uWQUWbe9iEJX3QgedEEM6wur5ppkPCFNaklE1Zk83G2eMQQxDcXeFKd6AJLdBGPEDjE4kI6tdIJ2CHawXARhysuOKUCs5x3Of5AUGfVRvNroaIunnb0H9+sO0/i3HWb9oSWNIpeTx4ULfs4A0Bs6d6ivdj8/Jb/o1GAI+PX5dGADsrPiRel7/qlvpWX5Cf1VsdsEv9qPhWbbHGfR3UiHSYUWGQEbQffGFDYjo8xPLaeKxE/NYXom9UKkx7MI6OKrn0p9JqdVhHrzNN26CEjYwgqMrQqqXAtcdJcg4plXTRUUbGQKqQg9mJiHl9ZoCVQSyqWRJu/mQOPpNbhJKTeVmHtDPg8rC3k6lW3LmrlXOR757NhXSodbDYw5F/TbW1Q83p122p17u8rOcPlIEMAdwvo+YtK1WkN8XYBTw2p6cHlUXxvtfHZN0jNValcuxFUcRG4pqN5Pn5eVXKBNzTSAiDgGE0YVqZyrt+f6OKPDYz2kDabsuayWpVyLSG4eWsOQQu0ExTZVIIU1imE9z4gMFkGqxlLGwphDUYBZhURRyBBjc5nd6hyAEnhuwtMpq3On6i0EZ6b/ZP1cSxwn0JKH20Wzr1oBaLhZ21MV76opy//NRRWtXJdgD5L+IkYx3wZJ3uarn8tykdNwSEJJiF8Cb162DS69WjSu8yqtd77CAQhlHdyI7rNC12QTXy0ArB6gI0iRpQ6XSGCdVZE+h1KqZ3mkDFuBJrLnycqJjG0hxVhWHKqFIIPSMVT33/+dnnyv/VI1l88Q93LvSP+vtFFn0AKb5ZT8W279q8CEMZT6BLzxYl0IEnYEqgvz/BNR9smrS6rJuBcxMEwWQiJ2Bp9Xor0zZGvfrlJLqJKnJkGIGIjBG7FlKEYTZ+QSVyjEx5DzetpeQB4UVoTYVljiZGH5ylUTWMkRh9EMDXpJKi2q9uDPP9SeWDMDEOrmkZDz2P5j+szf4b+ks/kdJS1NnlExv9XU5JPJx0Z+z4tJKbvu4DMc3kPBHktUvYVsuLS3OwWjorp+tcX16P6jeXy/qyU192L3vuzc3EvZlUA/M6GkyuIRONRL9vEUyhZeb45BvAJdCqBjTqYuEMjCliyafqidsDsCkOEU/G8VujX5aVG8ge6Euzo5ODU/yW74909neixL6nIKhn7h+O+6gX7fTvaubuKb4hdY6i/IT4qS1iaGWGQV1cz5ljNnTRXdYv65rs9a7NGwj5vQh7Gl0TKw80U9tDXT/mR0C3AjM0HcerZzHJzdhDGSar3x9kej0g55awLATNTnx7muA2nVa5EElsG/2jF5SqoRWgJBwvFbIHMPYTdvQLXN/HjST/Wyixouqw505/KpDD7NZjKGor0q8XzT//IZQymSgS7PwqP3vgv+oHO2QETkalvI5XR9J/UImwrpZpfTG6IR4mzsE6aGzOcnVhkdbYlRakQUsqOwBgwCFcp4RULZTVfpRs/p/GAn8CPLHJVRyLBJhjoOSoupZG4faqbxuNcbqZqdbvXp7tvxqUmL1P6r1vfonxV89q6C+lIm/nCL1URPrhVgXw/pwS3XHSVD7x7eY7/wyHeD0HtUzeFC9HMvtlAZqs8e4sexPH+c1ZrRw7gts9AKuam5ZEHR7VusMBmVMYvng8KUUxMWgBACNyjMksmdEYQIjzakoofF2D92MBKdrw9g9I2JIcJfX8K+uZ+nbVIUepEJhmfabdFay+dsP3m8uC6T/hn8EyC5TaeSMNh/AFjsvyP/Ol2ka2sD06LelCpIarQpWWb9AgaDmrLq4mMO9qHHhBzQWm4Q5CaZVyWrPs9SDBrW1AssyoYgwIQpGO02ZakzVUxYapibOFkDWpeCZsX7x925QyzdQp/v2+1VOeftL94e3bh5LNcTII0mIamd45449PWvyXzPabXYqdXAJrhvlb3qZji9Cg5lgpX6DwRPPhFhEFnGVQoj5w2X05G61w4zpUozMtbM1ac/SCphVuxi1oBOOmzCFqZT4RGFYNthTLqZBHyVoN4Kmq/EjIbZW4699Vq820KKSqtf2KzuanYGK6/iUhePO0foSPfC4+9ek1K/xuqseyQd32q2Fo+1nL9Ax4Cgg9Hvm78nUStSDA5l2PGSKh3xOFTLLUjkG9GDbU51ocnzdoa4K7gg2QC0PNAiph4YoNA4CKWEQhfA0zB5i7QSmbteb4bAz5U2Z4YWhqYEpW6AIll0mcXPlVSw5jmmg3ZyRTv/fz/KEEzZeNHf59IO2JS6YZEzSbgXJUT2+P6RPtMvKS3u6Jp0LsIGpDnmIr9fDVet6mW5Ylq3dEWbjRbj/47TKeHoSiLpEEYHc0dme/8jBRxRNhcmJq2jUaaaPWBMpgEXGA+4+dixW8zBYpgj8hwFYc4Ob0r1ZrNvJN4cQUoCtzXwnHAzPnyVqZSTKO43QmRDpMOPfHOETTvrpKrq4gzb268n3lrxVeCQqcIZo8tPF62gZ/yGpirL0Rpz/vGsQeac6bvBzOaHlHu1jdc/dIg+p6rIMlve2+TvvB20EUctG1P53SYTrfWwVeF4/ZPWUaOrIS5j094FJ2qu2XnkJcw2HlkmCy+1UVFS5PgUQdHGPSeNckS0LRUNcVwOyA2kFKRAitCKXffkMhmGuZFy42lggjqvBhHSJHyffcroN1VktqQsPdmqUSCIqBGc/Gj2Bv43GKa2WpeBwnao3twnj2mMzA3K5QNuGrGHuJKMJtPz8/c9g59Y220Y59nocWP/FJi19utb7G8fJJC5JfdE2/aGDvqg6AQmkeF9ylqk5SGFFGQApkWdmz6cz4cv1Tnmx6Y+07VsnK1wctZgBGV0rZ/gPbtb7P2dooX9NEzHGgBVegnCe/N2O4yQASuDwIbCiWBLPJlmhwtR4wPvd/tF2LctpYErUsJCGhB0JCRggQEjHCRsTINi8nYLx2ksnO1tbO/v/HbJ++AgPOJOOqWfmFMVDJPbe7T3ef29SC0YPykHKYUuel0AFdo2L6UoI0UwIppv+pqhP58IkiOjgHwE4QdK9w0aenUMUSCnKc3p6TKOnuBr6G0VBj0TvIou5EEPIRaxzrWmRqhG6DftH/elYLGNZk5PLnJwrEi9uedNRhk9CuJixVCXPJ6M7wXj8qwB3KHKWddP+t7DoaJAfpQbvME29u6owSuYsTclu+8M+knKUZWWLwWviPl4zswaFlVBwciPYvsGAp+n+e7qGtZ03KCjnMCzRODbOCYCqybDAlhF5mQGmoUPqlgIYTwXslhkQ33JSJOUc0cBKVj7PRb2L+lwBf3Q0Dw5QdWCs7z8gs75aUoZ+aCaas/ipgnR3vx/Vd3Isrn+3h7WKxqJ1IQ3pcJJBMpUf+AjDpg8aPNSasQ2UH2nnTUo52Ug4inZVL46Ds0jfkpblE1U5+fDxI3Tq7oR9/Xr9Ax4APLgEm9eXDb4MQxkQ7HKovpXVRlHtbMZEzSWnZx6DgpIrVJ++ViB/ZdIKfbTwAACAASURBVDbNyKj8Ffq0vuITH3fptRzmFuKgDRRjOGTIQ6Q4qFmpYu2vO9ap3/0bt3uWMpkofIM+51a5PRBFYyTk764QoVgTaF3ts70ilIITAQ+F79qa+FbEEtJ1rQwrb4RGQs1Tm4gWy+n0uDAvn1Rp1y+PZy70q7JpmjJmU3UehYwJ00ietK+bji6mPeJKTqfscenBKuVdQOki/HQRJhAcEwVnYV5r5iq+QwvrGfqQe7XE3QDS2pqLmkMRFuS/CKUpXcDIVIfcdBfiowItJgIJVVsFrrQkIRaPl+jRAyeQt1CYsx4sHEWkxG0t/kk8zcgS/0IMB6a1IVdKPNiW/qrU6uz4fyuxrMW2V83YPl0JYEgoaY1vPJrWkvQfsUuxOWB54qZ58tf98U29272qH6Fk0GXmXNfsy+2bywpP+8bQjWfEMnPssYCfWCXOW2SJ/uoRawKkGiZxqbOL7NM/Tdtvua6l+NjDKS026qxe6uMYhkc7n2me5dO3VLBw10eGS5mSS+EGuW7Kqhb1ogBQrRYMqlDDVhgqrZeXPPJwhJ5p6LM2TiJm4UTO4eHHLDH8pusH0aDUv7+u2XvyqbOTymcc3AbcXXz7Gpj7taafZAygGhaPA6RA+KN0jhBdTyQihVrCp05LJmLmS3t/xlKUVI9Q6tOHmDmDj4osVykFMMOIArNbUKDd7YN8ucnDcKm/biDojnvEH9bEFS4upi9TzyvTnfQhVSkLdSGZNJV0KE/ih9Ed1/XYS4HkcYQhkODLoCovMvKQHEoUdzYrWjN6OuXIYWubTz9RXP3w4dOgU5EC4Ywbz3nyzJx7r2ti0vb0U5niewRYZ0dodJu45NrpiUVWPmBM450E62BCiJPCIqN7k7bS3ycTHPNGnupRytMTmlRPDLEQ7E8jWzqdMyNgkyvtG0aQYKNtuUzyKEXPYVixxe7pbJbLMKRvxC7hYXmI5/xfI7naBEjo6YVO6owsVAuIcPm+4/KlOiMy1OZVNRY5lDVPmWmXKLFT81X0bVsoDYH7tdyLmVO0HMc1oiIZm9tBMsjvL6aDMabaPD1S3hCGZkmmX1dN/lWr9l2VibNjNVwF5ehKrXfSqP/9+vxjxQ7It9IqmY9sDxgIyBPeGqdVK5w+ai6abbtr27UgsIPgIdBsmWs/4Pt2YGt072q0alfrN68WVa9322Q+cr8O4UP3pn7eliX5+xOfOKEYIsXNqiLR9m1slln0TP7lWXsajzWlNllTnLesxVUTQlayBZiC46WiqYTCt4MvR02bi26T0BzBkMjfWbtuILO10qJYUu4K9qa0VGJ7RQtjU1Und4xtloXZ9LdpPpZ2o17DPCrVgXtmKsZC/3C2H2b26J1G4yfls8OURqBkizu4WURAACn5bVRDcemc5ySIl6IwT2mrQgFjTL8+NcxdBULvUFgcUgSRgB1t/e+e59Gj8fq09zxtCJgqlaos25Wrm/oVzsnW+eoG3wN7ZPS9VZdQusJnHe1aen2IFmmLxKPAsoaNhp7ng4ycDJ8kGjNV812ui6qO4RgmCqhKCgA4aSVP5jqO2TeIPygPShPjvejuOWzpqJhXokRUwRWT9Zg9UI7cmjkIS2o+wMf9/f1s1nLMrRk+dyIIkPNlTuQUQqdNqd7oADK5IcpE/D4f33bFZDibMm9/HfuzKyq95hsHN4UtlQe78MMsz3Rg+D3/LEugwI9i+R82rbXMOaitReMxISAFq/38EHR6xBt8SMOxuItexTP79KR6BbSmArkdX3iZ3cnoSpd9wLm2O8F+0NIgOLWxNy6TRFq7MLu4+MQ5VxSaSZIgtbR8rjbgy/ENuEe0Kebqw8NIFetvGitZMb3+gzOqjryHucKe7rjm6volTqjliVyIe+1cxXBUJ2pNE9oe92FSFEaRDe4Hg0FGn9n0ngwsy/KEANuGub4h69osYWAdrKdJq/+oR+FYe0Y6+HXTyIkM4e0ank/MTd8Xjjb6QQXm7LA0oR+lPHx4vNsVhvdqXqxzwduE2EdTDOnBlfMuQdBuX7UrQSUgt92Uq5VDQ358fMTbkfzBddU9xbfFYVqb/CQZ2crGRAG6uvSYb8SeyEGu+ASzY3qqwdegiCDkUYhU0zafUSQiR4eYghqcQf7OZ5mDQxlNShflOOkKo9eq/VE1iIPqyDGO++oiCRK2hFsFBTSBEmenauRGGFyZKkoRZdtkGw6cglDKGlG0DZebzSAckFVvt9s8C5Ms0qJs0xEUVIg+nyKkESHTniTMifnQtyRq/LJ1UFYtzz7+LMBVajX79Km2FN+iRKSfBkNxLp143V7kWpqoEKR1OnLjUWscFWcBDg46YyqgBsZBuz2O41sMya3x7HXFN+PFglbI9UdxPzU9z3QcBiB1yLvxoReK9QV5NYXcF6E0YyDdkrIpKy+VqwRwNZW9fvpQrTqpYToud45UVn1zWVzdhaVUUQ967vgtchTVU3xdsdD/0DVCI0ThzlT3g/CSRjmcd6M/I05jPkHj6S1b0KFF1J/0xw6XLP8+dUpwVEm9bp9rcYyxGwclnP+ea+02/NhnHWMaDriHjSourXqMqWj6CbeRtCHG+NYUz4S2vttt1gKchMCYGpQMF7e3t4vbuTW/WxNGrnp7G/vKyJMJHB8tVlzCtgwTuFnzWmqgsmPMCmZ09BgC01TlvjEjK3RM0/CMaornMeHzj8JReaXzdP5qaIooWDio43HJQF/q8oYYXpgnilfu1K+D7f9ZfHX2Dtp+fv3l+rIbN5uLOD7YJL+fX7cvr+lb/RJ16Zp1MGDlI5QRdlyz4329aTdFRpImimkqXi2OPTMdr4gtMHuni3jmArR/vb4jug8JN7Y8UeeDYtohSEbVQKS35oorCqWCd7t+qhImPsTGxO/oSzT/yr+6quuqpyD5XPp5NSa0odBhUi3HMsGekLQlHwZ5kih4G6NrHoL0t8yy/0mh8j1KL5w5FCgdnjM6/891u92+Pv9yXb20uch0d5xrCavaH84Hjr14woofWgHTGy4CcmTD4Oqqtrsm5PZqC7xHT29ioV2H5ez1gFK5suSy9hAhxVJNTkKPUTJVimaOC0I2Y30lPOcrSoJu+ydXehSuMP6QTQnuD1kuBPnR/eCeNtgYWrwvlUr/79FN/vnIiKf/MXct2mkjSRShV9oIyQgZ0ZYxFhKIgEyk+BEnxFi2iTO7c2bn7Jkz8/+fslXVEoiXbeydPatJ4rHpYUjfrq7bVbeq99PjKT+OFV1Bur4KXv/4OJdBoC1cPK/sMvHGD4Tiog5r2xtjCQrQdaVT6y5gAgP7/KWGKIExOWlD2JLWKIQlYB9XJZQODINCBZpAqS0gQBqR+poFBOPqyjrQGtrChpYwbTy5Q1qAhJakilythjH1+GmsBxiNje27X/GEIp/97XLT16NEN14d95FIA0q7ehdTaeuz4nUGR92uipWVw9o3TcNiiJo0AJhqX1sCJnJOFJgDNDFDh4kATb2o545CE3kCy5Ap9oconR1Y+FPHaVMSTyAADspRU4rAwbbXwOMqvtIuw0TEGw1sFSTHUJsFSggQcT0g76iixNIOWAARR7ETu9Hv9P8LlFhe09pVqh+PP3YAps5RdXfOtNs1X9C0tLr18y9H55J0Wj8nwqA2gUf0DANLwCSpZWDhHsEk+jdgzFmtC5QooYr0wVDlZdhCaeVlRqS6a4D14VkWTKg3aKRWz4B9DLMPZGVw9nEKz6SRINl1RQm70yiiEBqwSYrCUugcrMmiIHpP8wyMpapOm2cezMsNf/xfSLdfg5LJihORjhVmaE2d6k5ETeWo1nlZgEfRW7p3DEN+TQAJrMEejw0GGBuWRo2I4RflampFwrtBLomiAzCnRlPOo7PDr11RRIuk/kung53FYaQFE4unJRJ0oZWlbYQPg3S5V6KtrbxNCpSAdvTynS+Fs5LHcd1okuF5mGNVz/048jNMpXPGdPa3t87bxy/9mstXsSptV4fQLR948/YERaGjQuXlhza/U8zliGMnrX/BznIyjdXKzW8aen0yM8eXTj+f17AHMpgcOjCg4w3i3mgvcArO3RnGlJxrkfy+WqBUtNNz/N6CPWBM0NNUR1KZZ7HmQFaZASdT27t5jE8wQzF7/j4z9m4QK3u9w+SFD/LXiW6XLwT480+9+IF8Ju4XEMc65XUgVSq47pHQLX8idiRV2xgq1CjttO0UQQRMsqJbWh9JzuzM2HzhtQ+PI87tm7x/i+fdv5Viv9WWMBOwaFK6ThVLeb/V10xZSMFOZMNYtgz5MfnRB6rK8qw3w6CszO7u9BPluP/KCdGoJraESb7Ee1uGEoANEUgAC0BxKhbxVbaiBIzj4K0oVYLI932PkYDjZFZumlcOmy07ff1k70SJsMCowqHIlp7BF9kbWymP/DGjC2hJzddRjJsgtmXbhP+lFxsw1/CfTYQ2STkuaN/KsppMJoX5dcxSE0N4u9fOB0YtLq67JVsikU5P2zK2fl3/13X9FjuJX/dgL+tR4GCLgVoacErwVm9GqZKmCY8vMx7E3Me7fr3HjPsZSnZEhwgOL8EfGUor4e/7NJvl6Z3Z7pzG7gNQRZax1jaXIMiy3Jep74Yiy2Pje9PEG2px4R1Qm9QzAvGTogRJYMMruoxImfAVlZXmM8kuOPku92dF6b9+Ps6xD+vt8ntJozTqNpQqtW/f4Dw8HALHPxoOj4b12un5lmGLCNDbUaqEbvTLFJsJRNPQTZIoCZKEc913k+lvbuI+uDx8CMOABzOd+UEGXGNm28AJecx5FE3jHZ5jndY/oaRKr4wUvdXCGDZMNrArZfHI1CZFH+jjcZFkyHOph31Aa3p5YMgIIpga/HlHNzU/sxxKB2FYAXtMh66jeGn5/RE2EWrV1K2D8yIMUn4BRLe3F9tG9bC0CX+/A6W5CzjNozCZI1rzEICK/NTgbjsFeNyHhySch5E7RUGEHfCIGcwwvDhJEkDVzXaxr3yTjIMZhaqzwMDttKKIAr2iXCmHSG/B7oRfUVc3Bm+yACqXKAA39bFbEgx7tGcn+1UGsn2mA4sxpFoZNd3Dyy22jz7JG2uTGBno+NZBjnZ93RsOt/m2Vz9umFJaWGvHIQdTSlHPl6V8fhW5czdCTZ+bui5HLVdHGlhNLNb14shebn47ySBj4POw0wcLLxGkUaUolFgsdlPCf8vl+yf33/XBo6mffD/rfyiJSWSm/04k448ZJqv2ZDF7TQfloFZR0nVu7EI6l+4hSLc7QKpQQgIPRO9AKZoTRFojvUzSOcn4fM79S/ef8/n8AVD6ZRrwq5xugfk7eEnf+HXzAxsCfPhbvGmD3mBS2aJNXpRMTlCqTwzAiP1csXOfk0u2SCCx/U4HzKvsj5JU8lPiNtx49w5JoiW6znTHkP+KX6IwhtVoR+0IpRDgbDifa9LVPASPBHueG2WXj0VnAabHHkZTlWVFJlseQ4/7G1Ld2umppPOpYI/YHw8192tOZDL6dJgLGfNK/LO1NK7I/gLPuyt60yLdQ5ti22/IZG/a7vJZZyWURPbKDp6DFaVfOy0pJ/PvRAlM6QpPyCk4JOADCRE7l7rmROEDmJKLpdPi1g7idjc6Hn6VPhA82PDGi+tGiw5RxfNvzIze1vHStkWvqYqyNYwwmVQnHTSiyWbFFKwMKsBQhEmJcIMgHC3mzZ5uWLyS7z0ejZQ+6bZI5LAGwboxzmYzOpetDzFJcof16RfYZka340ewa+43B2x9C0UZ2vk6SJiWdZy1RPo7UErhtG0dHFylcz4Nwzlhxa88lT/8FvKHMAky2OKkc4naquCTZcaNYcuKfu+POePZDcNe2UzWf/z41F/VM+LNuzCtfFrMTGVUxfOQOdnIJWEOabJSMj3BAmXkFH1qMbVUQZh6p2p+MGWpqRo2iyN/aZWd0eiw5NA+TdZB0j9sNl3xfl9HiSa+dnF7el7HW8pIR0rqKtvHLM8aTHgF1u0qSKLgr9zqodA7NEjjpTXWEcQC3GtVNTBuhClEbELAS5GOhtWwHCdFzTJPEoCF857HMh4C9wsi134MArrtG+9Fo79Vs8noptUs8Agfz/bYjP3EW1EOV0XE4FNhXrOwWO3VCk5ySzk6ahovRaDAdmutgXSO0dfi58C+FaWDGXZ9AL/UevNE96MoNjHxIlRc+caZPxsg7aovXBlEqiQAqI65W+xxLLziGO9wFJqDtTMWDF0FaQmCU4JKBMFFea11IK+i1MO4IDACDwzEd3qNNC0fg1PKTDYamh8FccSRlUfJFI66MWOzmRdlMAvc/slSXjRGls/KamS2Qzo59lVECTaVOLovlPiVwlldqOMFecBU3z9MoA5lD6O0AE0sC1/ec4Vx104V9USKSfoIOKWgIje+tJpyU/6Y99Xq94HmvwIkURdaNTdR0uWx1xx/lYbDbhdbBdySOMb0vYFkfjfAnNiatzu9XQMJA+B5XabIz4o5LkGnWgcboiKUelmo6v96oGpe6pW2SOzARonGyMUCAOQPWRYHUWw/znTDn0+jMEo82FhcTmB0Oh/FPnGzq6dtoSun6wgEgE+R2PTw/qV7EnbXtYVUAQ1hs2F07ota1DC/oBlYctupjrBi10SBw2esgtW/Uz8nGS9O/HBIStWPsEUevmBJpmgApyAJYSvUumwrmOatXdfw4/k6Htl03/DgAz0Xsl0oHbQlVo5AYg9XpHmlHY97vgesoW1doZa2zafcMEwdT0XGuGlp7pyHgFuQJG7okRRHTNrTuOhWXjo0lQrAhOifqiVgwQdhthJtLYgatgLdViVdWuxlUxWF7yMMMolmVNKXWk01W12lI/rwoWp2oghysRq7E202ttX/Ki3wfiUusIoS5XM/n9aAY8Y+euA7O479505hIr0uMhOOyHc4loBsr6g4t7LlN57nP8LhU2tadBOXAdSgKQ2GA3XgAR4aXjQMXioK4AFfgg3aRPVDjJd6UwzgxF5RPNyXLAzGXtRhubtZTovXcIAZUrZVpJtr0uVqIfOH2R+tvgMN6pTiRVUqKNOVdUvCEuBNoETrpeVAeD+w2BI16AJt6qo9VFIGBqxgG/7BLgz/Ye1au9Lmmqi5XzhwICExISCElHALahQqeGl1VWvVbz7//7+8MyegSSAI+OLqcnVVKJ7NzNlz21NE8Z00SukHeKw9M6xx2pYIMOsXzhL1zkBXRXuM+zE8Noxqa07N95AB4+w/02gosQ1tzFg8ZaOYwmd3CrZX3ZWRyfb/LrOtyw/waC26TRJGfAKNuBb4bhkdAJBHWT0d9oZyvzOPknfNpvgbbh0De8hTL8xn4cygxIVtSQoHpkx8gtfA3CXefO4bnjIuqFA5RSjV90OpFqc8HuChGZomLMv69oT7o0lS3Ef39uz7WnolEhDr0smES1bjCJWvJN8xOTSZpE/2qLc62AxKuGZ21AOOzvNPT6fKhyLv8tspXzhOvXRaO6SFlBfFaK62Mq2aovHD5xm5qDbz7GQqlUMVKBlcnexGvueDvxmH3W5BHXHtgXNjSCf2C5FoP4WSCf9rKHIVYThsWaoNSAgSDaYES23igyYKTWEZt1ZuK1xos6V67Fhuv15LnjezAjYMKDV6PYHpa2FkzCf4f/jC009oD8/dvSSlTpz9SYZ/npOZhGzyx/ADQ+PTZUH5QzOyHgMJcBPtjRoxtzi8NEQO23uBd9SegaybQimI5rgTnd3zJXauofN4fJ+QLg1v66aBHBkOSVRMKWSKlM0D+42KUOLRmBp2U1kuLustXdHB1cZND8PQPluU2hdcUtKsZH7mAcdQ4rQtlS8HV2ZZusY+MdePcYyyJnVlGnzB8GS6uqB0fcYWyOyJEnG8rIlrnM2VIWxlsyL/nd+43uTkcoJjRFXcIg0UlyVq7FCSx6IIzDUw/q8oJao24Oqaa1dOKvmzU7lC25IFJ+IHp2lb1sXVlZUnGYbixbPZ4zSFUr38U/p5LSx0i8qYFajHnht7XryN49UpqdNlf5dDdR0Nqkb39HgkHS8l73tycbISC4lu3AoOPd/hjdLCfPVZVdANXKsehmOgEgYEkr8OGAQsRokfPfG9Rk+Yry05+sCJPx31Nl5MYqYtAzgOoFn0i38oRFUWdrdduisZRs7aboUxGRtuJo2AXardWs1cELmOsngyfKfbLpQ6NampU8brWGqHub1jZz+UzDHJvnMUSyyXUiNDuCujXOaQH7AZR4g6Jbt9OWEM7sGYLis82r79KkdFkdET3ExPHSObuGn+Fj43dW8uzf4yPE95YP73/eH+732/3w8io/A3h6sJF66YnBnK8Bu2sxZhs5kPG2KxTAKNqaI4sVySqNS22z+lWHZyjCEbrdalgW7rJsAjUXx6XKtBMCrPUq+KsgMOpdjdspCwvXmGk1EzHZtlZzEtw73nkxRK8J4qVunurpRVuWCqDlyrxZ9Vz87OUN3/4uoChfQM3Hq/aah2lz6wI6Bjb/ko6CONmqYTvWqvVzhyw0pSqmhxnEYin6D4Clw3gd8/P//xI7hPhTLmnxzTC3E5GFyvC1M6ydW4O0JDFeyWKKrV1InXdNrVdRMOGdUlMbMq1eW87VCaqyixlCp1cPICcwVwSQHR+/yBGY5BxTSOHSpLylQHlPQZYKTrMeBFPYnUY5fO081efhRRoghAfTTsFO+Iyi0EtAN7YFXVnjoCW4Lok5DVCIoWkYI+sMJuvve3T1viR2KjwbwX39gyb4G68YV9emJLhI/OxUmpFNZjoaN2JIjwcKHKzeNjoCl2CpXO7yxMoRZKE8ksoXJuFiSrtBCHg3wCcAzXipA0PtLGcIja1UTKNXJRWc/BxIg3m0ujAAXVYzaykXmODsajx7Fbd1xE6XUmgy3JOvZZUooxjBalcg/n0+lr8DpVhIdOU2DDs7+auHBrtffohWXIVF2eCCorWwZ6Y/PxGoQUHfoHSqxbC5gCotQbFdshLuEubD8RlRFqPrUGFxcSNgZLY4/TXNQhubkJ/gCFSzUmGM3fu10DUrktLcrtgZVFaSAs6t3rsLiXDgeg8dD1La2Y7iyeUSflXnUHPDNYU1/uU8DoUXexwqc7NZSVn+ng3apVq5ri+n9/g+e5ZRWfDdGhpj0/42A9XFzJSUb/aOvTOTVUsLZqb2s/T/ZeAlY1Gj01cn1ab+JmNd4iS4OwqqqWqGQNhHEogI0/j90IbiSc3za855QtVV60nRof6lJ3QUxhIVRzKA0G14PWcHhUXC53MFst63JxqgcVUVzn4N5WxvHeWCOiiOXX9YmjZ+TppfLdkgFGx2xR+Yp6VXvJWP6u0qlHIx4XAp7mYQX2wO/cGJQU+KpnlijycHE2qkMu6YQBHh0EUeAq+Uz416fASeWBZU/aFREpbepDbBJSN9slqwgkcIc484ezYXIhSrN+33Xk+BsouZqB64ZZzmf9RFoap1GUSFzeSdNop5hFK7SlBruRgHirqpgl471edccoFtcmMctmG5t40RKxmCsiOUtyiGv1iq8O4YUVZ5ms8ZU1HC5SvonQmBJawLyx2tftQoybyA4U+ER4AfBu3ndsKZiTedS8VToIUkKqktUwq5OmLgchLvvb/bFf2AZS1LSYgeLokx2o+VYWuK3sw2YPcc3MaZqrH+XKRV/BRIRGA4U6RMuqXgBKg9Q/+QhTbXOsIwGXrnclHNsjP+Vyd7D51X2A2XfN7/TjzUkU+YYhdISO2ElaUsGPtHgrafVpSZRcXixniY+P86C8v2v7TGdsnYw5SB/2iwSRtktT3untbQM4Y/VseHaGFd9hin7Mg4gEEMRsPH70c5R1kreFQbdtisLmz4DQMYlJhO94PD8I5lOPeL7m4fhzBXUqWtawtNQ0o9LlUkRbmx67a1Oz7297nN77ntPPvdFohNtYD0dpl95J9plCYbZWiS12aqUL5ngKf7SNDESnpKubuoQF8vJPWxAgdtlkTdgQr+pE73wDpddg+to/do/dG3cKbDbwozGnWpa9qhBxZdasBfAE/1yt+WsajZVDH29HD7t3/vOjEaIkiMCmxe+jpBTTp4/2TFu0kAqJSg5CLt1H+QFS7BDbFISFWcYZ2OuJbJ5Yw6tNKLEuavg6HKWp+9q/wQ7+H+crrMKFNUguqAkbr1+6ux9ztKdp9I3hmCNV3dmUTp8aANKoAdbU3FbI2tB8sbnbYRtIyERw18WySSCVmoGYHgyM29AL6Tpw4cSyrIOdUJ2IegWMqWKv/aSgGaRTGVeIcjBIsUOd/szFr5v+9DiYIk5ToLNEMxW7fH3H8kStluIes9ZHJu33YBDjUJTU3V0eQMQDUsAKbvdDaQs7FMXWFQpb8nlPXVmpmINZpTyeiFvO1Ba3Xv1BUkeI4wBGutDRBbWhDkVbVdZ+lEpdt26qpqkeOmcmO/EM/sSPDoTH/Sm4vn/9mxtmUTjg2f15ecKV2kNr4Dz+0j7u8yjwDtusgCj19mJvqO6wnUbs+UbEVtvaWLtK5nOSinUmw8i6P1FhBam6Fvs+qt0mWw5c2o+pTGcOF8qhIjKF5R4K92JnLYlD4vtal4QLSmQOQDLHAktT6FnJS5rSKNURb3w+6V6bqOzfLdOaTDHfW2ObvwEtF765s/P+Tb/vOR4pD8pcosE0nd3i9F6ilu8H8wPp154o4YIgMKgvqoH7rueuLEX6cvHhstjOI4PImS5XQX/CnQBIpuu5mu+ylb+y7EexU2OSNtgfLHwK98JfBEJD/d6VML8LXyHcSwIRdPUTJPaET62P5QOVFeGbuShdt0vt/xF3LWxpK01Y2E02u2yTkJhIElISU+6pogeOUGyLTx/s7f//n29mNwgq3tvvhKLVqtS8O7MzOzPv+6nhI1FBC9v5ZqbGCWuL/RaAtCyQldz/pNo660z+knR4Ohyq/pGkX7Rfvy+9CCWEKY4354YPiG/y9ssw0n2S1Kaetycb51e3D/q9SBPmpLWGUeMyyqNxnq9yAxsgTLMohGiiXAyeqU5vFr1igAAAIABJREFUbIR4cjyG3SqKitxIJPGNY9/HOUfmsmxLlS3cLlV2IwK6AUkAxIgSEqVeIAmTYSCJ6xkaU9M0lUi7qUYvJqtJhCw6G2UmBAmJGpWn4PPiLdHDCzamDUybY9kHjgufj5Lix+tcaCknflvMeVuySnbO9nkSrSSv2SG4QlIDIyqj6Fue5IYEkAxDjptS8TmYs9avykbwRmdWlqGcYySj0pA+sXuGGfoSAEqF3Ew6El+gEhYpz/ywQ8T2ytRbnwSW1dC8H2BJM8Ux7phqNr7ZVC6v6Ofcf2foRoH5kcPADZzrZv7XW9JrdQFP7nZR3nZ2L6CpQF3khmFcQgzU/paUJQ4GawKQm5HvKzmXhN4spVyCX0mYzX6C25O5zJ1IGjKPznLfHyeG5BVlmnOmR7mtyoERcGei31pNJo4hLzPf7Dsbehy9GRGSujZb2HmtRjJmbRnDAB/N7wYPtEGlG2wY1XPzd86ThCXfjE5DHbDy79ERGE86DKr6ROKx16P0phH39gPhXfue3Na+/YoQbCpPIillWUAMW6DktScTeLal6tBTY7tkI5xY6W+ucGRI3UOJb6Wcz5nHxj4AESIBXtZ0lJZzPshcRRlQkbMhUKsil5EEy8INyDmWOLGT6c3IWsDLkEVA8HsMrERp8o4Z4K3/iqV45c+O1TCo8Q+OF3z+5zO8e/9ODfTWPp5/Pq9WatnK02Ha+Mj+wPVnlVBvKFcvr9r3Y26rGgBBVlBGul1yxWDR9iC/WCSlSihk1PtJib6HOB2fZbiCM6UO7MbMz5EY1JlBcAA3UYrcKXG/B29mgfdXTTskc4mYqV7w1uEggK/yfc23RkQPgBE9Gt9sQzaJR0TP0andB4yF+H4mTFP1fuPu00J5IAzgIDQoyqgfgbmPE87tb0xq5vQtO0aNNc4v3je0fynUXMuddflt/uXL/wWlRwtXFDaL+58jVZK6E7qpNmfI+Ti1A3AKDRt8Gmw1WUZRGYiGYdjrGcpHtaSjNZ3dNLXl2D+TEGu3DjkNAxJaSENE/JANz9PUHXZdKwgEgKUb95uKnAOJH5BN5V8wCFfcZTC32oTJrGKsFIMBkkM1seOh1TpS6gmqd++oNWtNl1PIXcEWr/GA25uTO6ecql/tvNEYrSuQ9ngpnvTLa/73UaKPi/7t4Qjh/Pb7JMcVhjQgmEmklEFI3WCSYqlGUVhIxfQKO72UPQJmo8Pp0y5aCvPPij7EVMkiDBmJ3YVEHmyCg1Lwk+Ar/R6JLYaEhe8MHAKDgJz4h5BpSmKJ+xghxjqbgrTJ8WnQ8QfSmekIW5G0qe4UeMmKvghilRX/gvh8vfd72rXOxXv790jVKpb7jabM86dRurobfr3YlugrFT/ppgNsVVTjHWBLp6cprcf1YWr76ud6/Ds2xTMwMMhBTSN3mptkBpldMlRzRsk+o+Yzkg7dwM2EIQ0RWinAVJM9oyewAP9JtA4XQWYcNyF3MsHl9ZxsD0JWJrbJK4TaNDg3jB5SKetsFR6qhwgwilqFzKZnTh55ZXvfaTMm2p2Lj5uq3/JBzxbNn2xw9cbtv7Av1Sk/eaJe2AXL0UlWUuhvqddHp4DSCZ5+05CoUEhiewWJh+kQ29lItslX8LIF1nJgK8ojn49tfxC4gR4FtROaWgwCc59YNLNoQ3bIQjiLcPBvU1F6mUQ3T+xecSYcy5fb3BUuO2gMjI5z2DJRFaiJXO8brGZnxRS2pklUeiu2p+nHZo366bAKRK+XxfXDhnL95P28p8f0x1B6otECDxAq1jxciScnFHvHsM6HohZDNlZkyzLDjNnSMhfBQFg3xKyumvqEYNDpmybkpbxXI1aonCEFtzXIwp7vQHSBn0glJDa+FEhe7AjzeDEIF4vsjqBGmtWE4SO3V5UYYT41CIOO0ZwdNatmZUi6EGfR6pvg9o6iH2U5l543vuWYsEMbErj0YqgmFK94OVk+qXvF+UsI2f5MjDd6jqeMq5XmMcC0zigkfIBPrLACK9I94imANgzQlk5TV2TSgXAbIz3HsbAomic9SJH4OEkWeHJAXMAoZUEa12qm8EMZZmhegdGAYA+bulBE3V8MAMAs29mV3OGplfWkHMCW5etkiEiILBeLC8hYZzpLhagbnq3DqnevNTmKCogeSlaxlnmlnH5V8ycoK0qHbkOh1s6n1XDY9fWj/Tx3og9a/8so1WP+DJSqjhlvytX/x35Oz68P5oER3k5T6aJX4zkPkTgUOyqHNI3TBqXWOK+lki+I4gd914FdzDEPIQ0dLABNbEDe4eiBeNB6d2wA/rotTMFkW1ZoDBafjptNjZJzKJQ9OQ42Lvdn4POKkufl/EuVLGIdgiqZ8jTYnDHw6Mck2SSy+xZ0/X72OMJG2Uf2jPafsSX6DOM9SSunWFzzNnsmzQ1mTULEuxWGca1n8MRoBOlra0NVcAeu7tXFWpQ0TO2fOg9Msa48dFX0y+fL6aM34yTcW76prx8Lng8eKvu8+gTioS5l2LB3vfIzbwenir9l53aaNQOiNiMMDt6GEkZ4b+jGw2NinJPHATwwJMgT9VlktFx9beuBLLolC3zOmdkjuocPzVzsoLSmanbifnGvOqu2Q+yYVNcJkk4sl95uYHGTWKR093Wfe9G7HcjCl4mUD4yUvQilN9TTuZevyjkfww7ps0WIK/C7+r36HyZJKeWqSCTH9v+yjMpVNOdle3fxorZw+xkVn0014MFzPKW2h3WfOK7jHC+vMVWs2z2e3kzxntRHN5TRhCz70fYQD6lWLPpIH8RTF0bklO5sYlMV7DkHb0fpDT9iWRT9aOkVcuxIPFsSqB/M2kkx+dAvIGKPlv0j9fgxAdym/bK/ypUSiSJuQM1l72sbTU6NrKLuUrutpJl2Z2a+qPuOd/lgf0GPjmiMylkbu4J7fULTNADEMoIKPRUGYCpkFHe3YpmA0oeJbG8Xh6bbu71Y7JesWtRyYnK37x43ld5/i1LhCfFrKvVcAYCUs1zC05mcTXN4LKfTo/5sMoM3ABkgNS3BsC7ZJUFNXm889+ZzL/G0coyHlMRK9VoLRW8a7C494lX/cLBe31npdbZer+ujUT1OF2py/DcOM3XjdRfTmNN1l2TeV7IZgB5REp/uqMbFllX05/DKOJMbIwkEEj2oLmc9nItt6S/bASSqgOzcoAKjNfu/RaniT5VCl+rxNN0a4GQihozqpF40Z+asiRMbLTGZiTOBTJAEUYKEi8jxDQRwkeqDufqDH1aXp1H1DuIQaVLYWLEQXPHv3+H2YmgZEyu1Kiv4fVJfo+JIHLvDYWxllJIu0lPWEVPidl2wpgooMKvNi7hdPDiltEsZtodBGlsH3Oo0fNH96NR+str/mLvWpraRJYpmRuhpWbGQKigWEqakawlsLwYC9qWK4gO1lex+YP//n7l9RrI9ks3TN5V1qMQPTMwc9bv7dKqw615c/MwyEf4LUOosCKXYrs+DcXPrj4PxiIIx3T0/v3ZdWZyyf9pu5mbIoXD5Rbf6Lv2RcDw0Z5cpN3p4wDM7KBZ2ES2woch6uJe4FAUOmASKDpixWI5gPMU5myaSs0NUT0zS9JO6E/hvzHyG6BQo5TnBWWGGKaOrDfxfOSeJy82cvM2nmOUfO48EijfSVY0n63L/MpTod5eqeByub7g75iFd7iL2uSlRAbEqnQuOCHc2SEh5RIkmUyDi0pLQa2hCDOw+hIIC+vth191g7BlgQefJSWyrnsIh9HzSY7kJYjU4CEY1ZX4up5hmaIxo9J8ELa7YNKogjfSIffA8yDP0isIpihG4Us7OMACGKb3fi1JN8uhvBMnf9LjQEUDnlGVIf1a30CeVY3KkM836THKcRyXhMn1c2NBVVSVWEJnyu8jo098HqBIUQdf7bgdDDI1DOeOtgIre/JQTDpjLwFvZFO169EPxIfLqOa8YfcEk1bwsMSilqjZIpAjJUMXrLi/Sn1yQU8niDcWK4GLhieIcuzrr9Kt+2L/5+XtRKsOQQqSZbA1E8dG2SZPZ2RN0f1wfQsz5GiMfu95meVzSO2Ysp6u5MvNKXsO18lnBVjXIPUumDXlZ03vjg3Wz76u3BOEx2/SLV/XYE2vErapqA8YleRRB+IRdGCR1GDM0pKcJp7zFLwTPoCHPEd56xG3QUBhsUHrkoMMcfCs0LQrkbhmy0n17R5Ca4WW+WEDzlk56O5v52/bDF0G2hdLmZWd++/chOQFHNhbW3Rwh20oPjr70Ly+Pvx73XdcI6KL2NOfECSE3JV1SsRicXVy4x+6dtVp3OjTEkN/TIchByymTDHXzOSEmC6nDAVd9X9nlCKQkcNOmdWDVqsqqg/eUizpzNaQCY5+ES215zWP4eyvgjIpJTrYKaQ8LnbBDLv3Fjvs2rGu/iVivbBJk/JivcLRZf36zsCT3TxE26+aO+qNx8LV7xDCPAQ/0YCGx0FMnTPwtlGyemH6jmpLWj6ifPFmGf49Gco79sC/33NLdL5Ls2L68uTk7O5V0UJ4XJolDBiOcX8lP7v5xIWdUhg8NqZqlmo66sX3Sm8/DZlbm7tvLnYxWa/D88cF6I9vqrcirve7CboMpHjwT5FjELKLod7rx5+U8IUxaLWjwCeN2VoFJ/hx5lGtZqqncZrMNQVth/4gWygwLlgke9rsokacSBIeubLJDO9b3nhPe+jOlVIFwIclsxApbKK22D5jm1fx2rINl5QjQkDcNnravN1++Xt5c3FzaAflagqJ9LSWNR98+vy1DbPk9dQ0B8gD8WOMH/b4PzYnVYet9YBUatlLOV1R4j682cKtrRqy3cuKWtzt1gUXQTH2IFj0k43lrDHsKYZI2DYO7T1W8Nf5C3yEYWGDVd0EKFZT0wyhylMGJnj466qskHPLIg6xwA5K1UcF9M7wN096V40Se14AUpWFS1vSkWYOd/3m75MHkEO4m1FiSWJf/ORc/eMJKPGLY9h4twMm52luFO0HheY7XnPz5yzm7Yc3Tjg3Z3r6Vi7anwSRKUlzUzamSM6lOX5DbYLCtyQr6DabNCLGiT8laKvQOTlR40a1y3S+x/MDt2CXBbawXweK+QJDtKce30hWuqxXJ0imClIQIAEFoYrOfhXt4D4GUJH8OVexpp/0iTJdFis2tjuc4PdBhpldXzjjSHjdEKQTearvydmZ1vaRvsIJVxO0N3Z9oZWCtPDuIVnKj2by9G016YQukWuojg4mV95hJyDKVhKM0eTwPlTePC6zs+9aRJfvUPYwk21cUcvJ2T3pOupwnuVmWdJyTcRAsnQRc9oZtc98PbRKHPXw8DXXKxE/l1F+/H3pOOHdCUOBZWr1G2cGSQ0/7Z4ODs9oF++ht5VXp+1cq0moOLjbbOXHhfUKYRLsr2YCfLfdlbDpcFbIJcX7f1Row97LtB0TJrO5ltofw8rgKKLSUEMqJhsVIH43HW96DzbOCBIkcOCNNQ7qYoxPyH8hjhjBFAQ+jlO6RDCA96rCRPdkDpZikMqH/RjM0t9+PtBXpqmFtKhAYCNxwfJL3oG2aFjXd6va2tJ9Af9Xu3tbWyU8/R7KGYRacmUAKduVj0T/bTETW0AM1MoacYTB8LGy4Q5AQDTpRbTuJ3luOoygdbbvRdPgLciK0hR+RPz1OyTotxogs8TGSMlz2JA9LAqVH2AWLPVBKyBepXbG769OtIsEO1w0orUl0sbhDe0nl7awvbdYtGM/Vi5ZHTcZu3PgdhVqk+KBXcNzmquxkJmKXDaY4issWFQrWcwktJ9uhtROpcRQZ1j+WSqniwPrsiJeQgaFwRteXvROySSCBnCdJGJKX7peC7NR3x4/xNEWhJG17ZYj8ptXm+I/j98wsWBvBkn0p2sfU1xolJt7V0rJy7mSo1hRh2dZsmD9F8TA2V2HlbHe6WxY0JZQMizWYBxfZ6JTUo3uuElcfpCfOUt/WeA1OruDjkR5EvPShkebkMSekWgmdNMsWcPVkGDU2Scj2GFE3myWjZ2fvodswuiTCn+fHs/YxTJ16vFyfjrbIKqfY5wWQKGLi1n1Wi5F022WbT3sC1hDZg9FiXls6PafQ0x0oZUVGkqSl44Vs0F8skPP0/YLHTiLSpWf6ZK7AxOLPsJ/N3yNHtDr907NfvQT1DU+88uN1/ffj5mkq4/MSWnE2m71YLhei0Yq+wEpy3jk4Vw7UGUGkyJJ2qE8cT+xCiRfjBQ+bJGgSkTNOkqQH6Zw+CUlWirxRZCp7N8afRgmxejzl0vFi7FehI6LGKos3O8L58IXxqOFrY1PeFBEewtpXUDrAZpMaJVbfa72KbfIsc12uuvFaYFG8utiBkkZ++KSIQk+mmevywUTXtdt5iP7KMBVkKZ0Qvvnqdmh/M/rnTfcsYqCwnIdXo6NDFGED9Fyi5dwGU9u1ymEoI5HHwT0F5TI0/zwQnve6fWGvdKe0tejwBZB2NVgwNYdAX3Gl5nsOulrGrB2HWc7J6zDbTkZMnzFmBr/wVAqUNMq4pu3wHsxovFws9EIDA0FMfh7FmBTNZqFflmhA9iYp8hJhqJbuCItrVFzR+VXOCFuCat7rg2yqj2TeITaw08NvN8fXxxv2WIFe3sEAfa1MxPsIk2BvugHWe3MP0fbV8rjTkontTmSRtPOanUpNXYq6B6qdvhQm64p8cNfKW/Q0PbDUtRbr6Qmuf18EdXern/ZI3yVlpHuJoA9Ql4MWEWm7XE3BIuknq6i26dt+Gfrzq7nbA98h1ivJwacbgAS+gJ+n/ZZd4nfW1Kut8C+9iXd3TT4Md6QfgDP3Os9VT8+dqyNREz7vr+vMEgmS4Z7eGSox8mQycXTL24kSCZKk05ukvTQ96TlRlJR+mSRl0z7j5/ZWkjxyBxQRN83o5LvPCRpdAmSDWbQenD2+Oe5f2y3vQRm8mLK30zfi02pxKsTBJx07gVLIM6m9FkoCVRK2lifgSHYp76D0Lphms7qqITKbT9WotjzpTcjJ+71VQPB4Dl8s7ezQasz4NErg9zHE/UcSC2KTuquYIXjX1tHTorZIDUpTTCl1T+hdJWvB8lmcS09gqpKCpbqjaYu9UPL3RukBs79KVlO8fm2jK2EPF+NAeOJDsG5S11X38pCi8yRLrX81yhrCpdb0Dt55GYu4hAFB0Rr+H1M0nuGQ72iyvRIHcgbX30uWHmzjWqnkiLeM+h4YkY8nxP/Z1jFDVC+3sr6vuXUqYh/1cNlY4Od51dKZMj24xxE7mMBxktleKFmu9d+1VZK9DqVv/iL/gf2PtivtSlxbopKckJFMEJIAMQSMjM08yNRqq7fV16u/vP//X17VOQkyid62H72WrYhTdmo6tWvXRSxtD+jIaTHyfy1wdGzbRyidZ/PTP71PIeoHEofHtv/aGs88Lr/l8+Gy+bW4JE7kOuvzQXUr0nEsDKX/p7MHLlmDQPbNFpvmB331r/yUfZRQJIecvQQQkzhGLumbdLPH30TpmzATlgun+RWUZHHi26KPqrnJ/QzxV0qOYEVt2zA/GAfnRHn9qbTu4Pr1TnpM8lHa8jWU/sO1CXcOJPB4cSl+Y5fEfzNDg4JXDRbC5RdQur+rd8V/5Ep9lWwm08QSFNM0GEeiSFUEbPs7uEWc7tTxjofSnC7z+8x522GZfBGcyD2w6jEhHBx5Mk6s/A2UmBD2OzCRhHdEDy/YiXr/0OPhEgnzCzmeZLZK5heyBxFAQjIAEbsR1E36fYe/Rv0q5OAXr2VRS2KGLd7y7NS/jdstHcpqQx3r3fql+B4JYjt/oV8EJ2yGQ17409FKmKc/BenkGBskgzFXeoq3W/Iq6a2AtXHffBsRoB0oOs5RrYhMoaPfj4M/ngXUcY/I5Uj9c5epazw7wgiIoZlmyQz6ZkviW6jYrArFb/nd687heFfAyAO0lgmCgF/scoD0Q694cJSQuVDf3c5zbGS9P26QnLLqElZcYNsxlZyX5XsuZffhTg20lm2vN/nfvtH4NinS2xOPFJDHIFd4SpU4UttYi7jEUxdxd18pVcG3I/sBO6fF+Vyl/BKHTof5q/p9R7SrEp/IKOmkCA6sWMQ9kZfqZuNk5Mx1TdA6RWx1O2pG4Tn4DVpOKy8EZqg7OKkbmnM1VOehGmrMmugG2h5HORKpWTBe0frcdeEOV1WMDmyJQx6s9KG3/Hn/ZZh0UuIpZSymTK/KLSG8nFZlKDgvwmf2yanVTkfj+TYOq5tcq1UqBeDmO5osVqs7vLtEWQqlqCqV2xtxjb2mjt+17bu7yPfv7ir35cjOC0sVLrezFGQIHQ915KbyVUUiuLq0UY8eGB8ko0IFnRvNxYyeNxYh3Y8ZOE6odFB2E5vjUTkDCUGeBzNaU4Bl+0bsYDiiLAjaZyPbXQkftmg51FzlDqzg28G2e/iz25RTRw5dpE5r2grLaL6/u+JHBD+5P/v3joor4dtrAIaPCYm5GFBCxRB5Wx5jVnvIIK52qhoOIvR0IpWCUt8kMrnV+HjnJcgJRNMLxPVaL9u2Bg+4+IZytfIHq9WkXp/gOPV0OjWEnGBotYJVGK7q9YHvNya3RKtK/o8r98pddW2623exFISCISCjSygLqnCtFUmr1a8OUe6SqtpogJKIc9CZJKGzy2VZQ7kEGRkCYESAEsrscqyPYH8EksRxBxtKIS7p+v16vR3OtTvre0j9eU1jcok6+6bFa5T70bSOll8IoSrKt2mXKj0FZ5UDQikTfg8lW3/P7uDVPJ3PIajM+ZJ/SMMedqb6ElIi+vteDH8HHtKahS4ii4eTgpc1z4s7QDK+PwQvxdD8brfRneC03qrx46oxcN3GlTu4i1x8RAK+0Jt6nvvo4g70wZ3oN7oaiQY/Vo0VNsozuh5aXmPgeY8Df2hZNUH+GWnll4WioG7sJW6UFaNyyuMajccpxQRPYuneU0ob5QKCQ+zU6d2ed0K9dpuaE3fUq63YES4D2GGf9LaiQZktO0nU1xWmzQnPreW35ggDgfpNPROGakb/JPMCFeVwXtDkOJP+BK7C9NoIbQGhzE2/vwdTFZf7GXkeB+/MwFleF8M54ZlWFF96axm9vk5xvZVlGUpB0xTDmw4eUfRJ8T3Pf3x8dF0P5awVRfMoYq5n0G2OUX2q5SXZj8TytZ4JIPI1DSubHQ4Hg+nQygoY0PUXlJTQM2ouVJFDF+GO8BcZN9RfXmYOozabhBSD0chxMp85D8CxlBOnAl/NAdLEjIodiNznEwt8MU7sxrj1i6amPcJjBc2DpzAx25YOUZKa+Vo+3wSIWhDaF7Va3mGxqHU5Vr9pKUx0aNJAfV1DCEO+KVA2ZbZgGdlUCcqqFQo1eFUN4JlangsG5Q2HWXCEBi+xoQEhD2DgAjqIYv7UKhQE351MXpnkThm1F438i8h16/XXSf2uLOOCQoHtI0GnV8Zbn1L/kdQKhqdmTpGLDpPv013Yz6EEltKGu54/IU247TVxOwyjz0DVTk7N+zFAwY4/zRKBhMDEG7DVMonJDon2JLjARTYXPOlLLafZbKKQKgAWbH6Nm9sX6hm4q2sFuM6/xuNZ6DibUW02HqNc/nI2YxBkc+NNLkf33hqFrOclFoUTsQDz1MVn0CFa8PSk4YOzdBtdePP6ykYRJ6urQaRFmi12G4Mr+MTzpO5rUZ02nbqNlTtxf1zho5zG5hPRuVLRz1c27SeMJvJn+0vIXW3H7WOUUuPkuC1QtCiOPz64YGeTvZil3CZLuE3IJCAqoaoPK173kzwMOODuUBNXcsKmw0sKVCrSCPLqectM2Q85QClXC8ez5lIdzS7nc0cd/fo1H49zs1xuhorgs9kYMJqFANIyiwtSE8dnWVMKE7w/xXWpCn4iKyCIQ3+Kz06ZTp73OMxedyCvl6PBI/ti1x82fDx4yMjd1eT1eeKuACz7+K69eThHSdjvBPWofX1e4SYdJDvj+hhIyEJ+irkTRdZ7+T1UfSR1gjgX0E9OHCTzcABpm3GbEIWCgHB0yAWyFj0QWddcUkfL0SWEAdQEc+jIHu7BHc0dZzxD1fZcCI/ZTAWzqrEd0uAE0wsNcCmuBXmFO50o3tBzhy6u3pxiIJvSF4C3pChZVnaGXz2CqJVADIEtC98TzFQwJhP3GQzs6tmmXo2eeKV/8L7MLs3XT0XyEi4WQXi//1lcOicZlgxHl96Gmzj5vC+lhMn0gx5VzWMsBfN4lG/bD2/jGkuIXmYqvEsybfpuEJhzpKUUF1DWzOFfq9/CuSEUAp/N8wIY0WwszH7nfv+mVxlRShwegkCveNbAaXLFzXqACpgaRC2vUPCosdHZQFQsB6cJ5pjbZNEQwcQApWwBUKoVhNy4rNWv3OfnZzdBCaus7RUp7wgc/kwmlfQTKXmPlNo6I1xeHF1/+YM1FZUDThFUytxuACP7jcvz/BrAk0IB3wVbNATHqWNTeu+RKBriCgseN40CwGaVR8KzE8TJkV+wgPJ/vgSLWTaXTYhvKUojNZwJ4PMAJlQu3oDzQ5cnvMUlyPxcuhR6odCsz/XoFmLUnczSDwHHLNUAKwBGv8foQA1AyaMgWYWs8LsmQAUmiN3V68p9he8JKD3QfQ8huU9yA2ZK/xWxRJbTkFWk9kSp5xU6FoMLENoYP1Dn9aKyB0AFELh9z13CbR+bFX5/cXEcc29iYiJXhPJpn7zEnTsMSRWM6HBqyTRjJH31pfdhwmOGqlIsXvMlQjdYBNjVx+muPvZ2g2DkNOeX4WguCADCMkShvc14hE5vPFKXNQFQGm9Gow08xrlNDj/OoVlAsoHGAX4M3pKF0MTnChi0UC0P11qgSHlWqKHyoUJFDiHZ8DwDhfQKBWvoTY2sMMO9CpaFyxDrq+fn1YqeZDSgzFMUPNWoQ717043gSSjf/K4N6SBgdI8pPl++wRW4Nvg/0o65Eh3+khh0F7fbc042pVyh+9HZaJRt75kNieOSVL3dP3eg4+nF3TmlfWDo50Vbi8r2iQzxf3xdDVebyhYVgSBhLZhfAAAgAElEQVQwQGTCLClJEFIJkVirpiYgVrt8993lXV2+9f7/n3l7D9Ha9r47dpmGQExmc87ZZz72YVB6pWbO+dlPgzx/Y0neBlnw1PFAbrl0H+zuA/iLqAgTFZD3+K7g8ka4fbuanGIMXK7vb3wf6NmTYO7DJV5/B0T314QouL8dHmBdfAAbzP0k8GFrNxpC1tw6PrZf7gNANpmICh8QvF4bIDVdr0YRCDwLpkYnURmQQXpOvFku7pbr9c55ynSBO88rFqJYF4+P6XL58XOaPqZFmhXLjx/vFnd3m9gUGzpJKsUfOqyghM7Wi8isc2t60D+8yQpZpmWemmmaFoBa3wQipjjUw36ygRuoTTPesdCQEK8l1hmH3i2W1Plw+J5uCqrv4Hwh1rvdv6c/D99aZ79Tg39A6dQTlMxzXbsynqkMzptCURfX//BjcHbmhKHQogTDddGoFMidbLuyR1HZ5bZhV8nWt32QCfA+e1SWxINS7kF5W/p+wp25owmPvox4CgxtABFOkjuiRky9IupZR9TvBZJlOSrh64Kgvi1BH+2SZWOMockC2ZdkfTO7HI2y9VVEX/en+6ebpVdXVycnn08cw1mj49Mi/qp72jr/tE+KqT1zsF43ZtwMY7TCE2LJis3Lz8vPuuHZOhtG0HGlZcUC7AVnpMVyvQOkegh7fOroBdPWdJDQiX8Mpze0YH29O53G6Y5oPQySpf30h+r+Ly7t/8M0PFKeghGFdUwcFSpLmdvZ7I9XV8mP4jT9M5KvvaXmOXfoOXG/AFpRVRRRRjfDjUQXMBpj7s/tKAoQaK79m+vt6vLoOiFvv3kJgiiAAd4iCs0vYGnB/TWXv2pOjxa8TBDlkFPj7O/zuR9Qrt+ORrlPQ7zfm+l3WugLj8xzH0jltGT8zbnW+NfWd3yyWHzGz2LjncbOXumuF0NydnogxDRudKWCPsuaIm6qRjayN/vQ6mOnELvFIs2yjEN8jYkTe1GkKd4nexpGqvh2VdakxRV9Mf7KhlrFYe9UFU5omlhEPYfSdoBMDC0SsuLjAhZp/mYu3t/Kfg/qkPo397Edjqtc+aYBnBSXg6v6ejVM7Y7PwjyfJb5QsySYX/hD4HN8XeEAkBpVJDgYECqlYPS5n8/nF3mOnh1FdgeScX+z5WzRan7P/bGGs3BdYfjz7Wq1AgZwnFRezoNAawNcBMIGOOhsGCYH0F03Kga6QDu1bdwFPncmGnaeSynZLS0+MbgNADP4JkYl6S/v7j7i37+QIW+Ay3qj219ocILNQd9bZuP0KgxbqaQUlCjpq56iEUC0dZ6bpnlu8ZXwQmsmyZEpR7LiPLH7HFZV3Xa5ZFiNQHZOvgwjKLARMdGVLgHJsVDAJapUJaQQMhKllr2NSjw9/RUR759g0io91DYylQqlXfmdEVp6DPyScz0aJU3qcfTZtA4/GKG/tVYU8T269tEsdRjOkjrqZxbw5RZldKCh0LXZ1dq1OaCE5Kr2qfq7urANzXgX4ZOwLELj+LlhIADCZN29MgOnZbVjc1/rsOwehzn2Xq9wCLXz//Zt2DcIBvAQ44iixD1cnvPkfHuIp08IMghha+3Flkvqe6QIX4/68GKZZg8Hz6Fp8q5yq6qSopJtZeqq02eWsmYAp8tVJ+knorpOjhLTpAQSLqkqEC3VAaSuLumay1E0mURiQIn7xZFTHCOgTkoZSVkneVei5fatBE2qzfeebfwLSN7g936Ca39Ymvgs9FvCxA3lSBPO9oz1pmekiGCICHWUK2PURR6ZIS/Qs4njmculi+dcNG5upk7M3vMvkP+GKreKzVo5mSs2evJudgj6funsd7vClgqt6Kl7+tMf2jh/hNb16yv/+fqWDb2mMtOHqQvPkz5O4Xo4VvRA/ky5UNLrB6rvZo3jApC40A2BW+yaXbGGw8JTOK2i2FEfTxdloYYtC+3GwpRUZGs4MaM1v2qltnle33aw9BzkiIk87MlKapWMh/0LSd3W3EfiRYDJe98QXsGKkOmJqrtFWAZYnU74Ea4l7KHl8PbMsjhcx0mKRLy7/heUKFeM56YUJ1dLj3cDvr4rqkwqwzHgCriIZ6zryrhPi+VwYz+l4LWzc6ZVlzoahiQ3brHIONcAV3UxD258J/uSDa57vdYhe7xiaau94vcG3Pl1kAdZ97me6Q+56sByPliHjZ7p41Vn50gGuDJv/JoyTuN4vSH9Nt+a9eOxEV5vKkvPxnBWqCgEgRqigqmP6VNBvg52Oo16gAsDknGBAE9cwdzBD5o1+jdsEUcUPGmXAK9umytKinX4NQjBJR0QKEtaSkS3R5Ugji1Tv4+V32hqpSxLuwM8jLg4m2wL/89lpfSMAxwMgFpVYpCNjk6Ohffb2JA5icjxouPJuhhl0kTuYojexpsZMOotPdFsRi/mV3I0GraxwgpCeG9apmW4b+PS6cIJ/WC+RfS+CebZgkxWC7XHO51jzmDeeH1+79OWsscBJcWBnrE2WeYyr+P13LWGZO+DXgRwpCshM9sBbLqT30E0NLIwq+dcWW+K1mrheaiNjoCiTMYbXqGB04rpLI1oHRTTaQMygKcZaGC8Ew3IBAIIoG7iQlS2CivR1nBs/pYNRsRQVHfK73KilJcEScquRrfBnJjufSFeESsQRFFbS7vrunzbdfB1iGNd3rLUFAgSjgB/vXOcW8lPPRY6kpFHgRnzNwo+Aeadz3B3RWbrIV67TWXLMDQ4Oqv9HWLNRUDSC+gM61NfvM4GzA7PQsN+264vIgcB3Pdv7uedHWUDCt/200WWHuj1LwCg734V7lPqcOarD5/DvjX1Bzt0nQaggUPyFjg1LWeK3jzUixoZ0tHTWp/QNHebxS+GpC3FY4kiVircv6RYP8Bkf2rANECnGiROaOs9Hj3+SAN+0CjqF0r82G3bVhX6IA/yNk86P6/xrb7nXacYjyQYBD0X3g637agEqlFNa5rUdUQxLMEy2eAH9VGikrbTYzTAp61FjYxjVNp5OQGkNtgK4/L7YoniC9ux+VNEOkXOeKKze5spx9UEKFFDRoa2RGK0j2zoWjQpfS5JoWhtttmHmv9y87ysWNMOISuzy4knTAcWjQ8TjdqHnVgXOy9l7h+LylodXV4aeY4v1KTrBRKZLFvAFznOIHN0dNQ3ZLOLDXISsUNnNowSMY6IjUcGtdmwCvgeMXY4D3Pa4y89ScnaXmC80Rt+QAjn1ftndTvgaZ0OIFkHll5/dGg9h6pNFEBAP+Q24ABAsr1Okm23resO/2zfbwEQYK8BvJScZ5vcAifb3vo+6Ciw7KivGHQtfvvgvYd6FgLHYIPbVuXXdcJhT9zoqrXDmqSEvLQ2W5Za2tfX8U64LGH8nlLAxK5OhmHnW8UBUtsQ8MWm+z/GrrU5bWSJGjRCCIkRlkAsrwhwIgtjY4c4GGRtnJSzleeH/f+/5p7TI/Gws1VXqV3bgB/M0XSffsxpLnzqF6ZaCL90U3P8KPFMKP4UctFNWqVG3bY0CkcFiBXeYq3RGtV26WbeDebzrOkUn55nY+ez2Lt0ctv01jpdgqieB4OLa8BUcTj4Px41pIrxlsnt0RZcQDIvoQOUft636GIsi8N2jSwhtpe1FAVGcusW3f1U5kwRw3q1y9SwlJ5Rx8bRPFIHSnGPX4Foz5NkxzhRkQfBisRenCSwcWB5SdK2/SVV4Tw+EXty4c16D3B/HGq1w/conShC4lHsoX6oPtJb7EDmdwnifcSXjtZw+QgpPKw4QpQsa+JWGk4rmIKPDQroLsz2MMixP+Evzhdr5Pi9jcgNYNI9Fxxk1xt2ql7lpuelM3u9N2yfQufL2LAAXWPaU1R+arX2m3X0/hKf2O8/ztLYe2BJf1TKnwhKix4/sVN/MNtuw+ejdDTIxW2z1HFfiaCfOXCnHWs5WyKwUaYdZSLriMh6JV5ILB1sHaVIFPuEhhUqSozj8N1QWWbrsUlKvVMlRoRbeogoNaXJlNSVKlNxhnrWKSnJ18WsKbCdkio2cdnsp5hZBaV5J/3KPGlxtS//uWUyLxyvfl0N39XVL6U0dq1khOvyw784sJ22cH14yumBb39ka0OzuWagcyt6qECpLwVUkBMyj7nv+r4DjH0EYco0WNYXw9vmjW2PjmrX4xGTlJJ1Fgi0dkWn7sO6o53r967beP8ZT8Eg70ewsbcjnixqInjC7xuJAmo16ksTgQW7pFy37qzUStUnghLbhNyq00FRoLZugBCkylVVpvFL5Isn1UYx/ynAZA2H6o/XGb8d4dcvddB6Uuqo4sfxLqtDf/mKayxC42AxsarXtTnubsrjq1JPiCJeV2Wanm+Epw6JqaPGrSfnnflNvG/ibE0bmNnRziozRHSr/q7TyYwCXQncx6+gjJwS0oga3chupAA2reH/Rdlmiv0KKk4I12tv/9eX2Q5fFlzagriRfj+IPE0g+xPWNcf9wJZA8gyYUcfz1pM1FZwYVMUeeX4JfBiCP/TKeti/6t86o1fXfdVDoCh8VS7/5LRGoPklG8ZVXWu1N2vlvnp5GTt4VqFTfoyF+Q+Zl1NGfFCKCvv+PB6cV+Yp/FDR4MLSOwXsypiD2FYcA6iuhiVIbD9TclZObhd15SIIxXN4gfSh6B3iMDi1PD8cHU9nIzueDKsc3z6A8lk3gNNEwPQ+uHjPKY4c4hgI9ZiwpaXTjFLHuZFRpONDxQzGtVLRcnf4wk5II2JHB+fstEOEy5EvzYMyghGI0LFAU5yMShprDvFZGIkFd2y51Tf5LzL+FyN3n4+Qok+Z20Qk2rpvCce4J5eguvhyOmXCTJJC/glSJYhnRQVSiVNcqllHVvn4sAOUqDap9Jgvc/VYFQUzmvBhP+IaSGEkrXoD+uoniyWq+vAfc/SJRAa8c0naXxz99qHhmRYopeUlds2DU5OJmi3w2qAb+Nm01WqdojQHSAi1vC4LdKB7fvAXoDIzgXtwiRYYdJrCmVCK6dAPwlyf3ncfWKlbE5VArUBAXO46d/sNkZRXGj0JlxaLZHJo99yvf83kLWEPJbbyjypt7uPoJUovzj7Lne2CTfoWhZwlR/fz/v6x//Nn+Wl5mTQ4fAP7GkO/gBU8SwBL4MdwGjF/EN5TPJGANUniw6YjYaAXiaQE7TPdx4xfmm+yuRliacv00VlECSjeDw8PbNHBw13w9Gi5jAzsscy4znqknczpIl6K803USMA6WE1juQyEvkG94xfZvaARMDDLuud4HdUYED/jHvC4/dKM5t/qgD7HlMDx7NQwnJpkWSclANhH7Q9/J+KH1UU1MXsLA81sHxa/duPR9dx21sn+eH4lQog42CuxJqDjkyGao/7g9MjLyD06N0G7Z/6EMLwWsveIf0ylfu+zPRAfjmDahla49O8vLsaO5V/4umBFXcW4oRFXGdC/6Jg8jeS7l5hd1+shpP2NINA0tjGELa95Yy4gmatrgwUn2okpVAzbBIDmc1ZeuLpwI5kNBp8h6DJJC9Y90xT8MUPQSw0uBskShPHvGb5KwzbklyV5twH8u3Zw3m57PQlmVeRnXjbBUlfIYI/W+GniJW0PdwAJhQyU9dZtT0vJontdGcVQeuZu1g89ZiRgNADYm+RlkwcgLvcke2Ec1/903DEX9gfjE5hmZp6ZW80el6+eR7NrqRvcX4ezx8f+/vra/95/7AtG3/vYX4/f2WIWyrhlcMwzmeqiSSQ5bt4CD9M6YaIgj/MeNxHwy5PfDwzV8ySycbMegSSFzIbA1O0OlvDdMUeHibfABgNUc6pb4KLwLaJlGz9FJD1BEUgD2nmMaAnwNJnW7jSxWxG/ZH9KiVNVF5tmet61N0Cp2/XWD0ZcT8V+mu8U0zqS+uathbgBl9IEzfFutHA2RtdeT5x51Dq0XhnFOngjxBmItfSi03nTK8vUh/YCEI+07JCGX/q0dY9LneHj4JRAbLeGRa2OsXZHA0TJ3C4cAnTZf/uWTem43j4+3n3nburffxfY8Mzj3eDz5eMdkTuzDEW0nuipdBz92O1MECv3dw1hbLrL4zJr9yCJu0w201wSd0QJNg040QTuEwYtHxFvt2vP2+3G+V9dI6i64xCIZMPiKGsacyYtAArzVielv8j6YwkQAQcj+h1cINxdGPgqq6RzdeFHQ7ZNYM+Qjmmqz9DYgILqih+rie49rB94P7IsdZCDYX4cZl1TgXcIisOhV71FydFetQPr+rDTpPYQQtbYuBuyw9HLAw6mmXrfueN+LkM4131+FlJ4ce1+xjUAcJeImj9dMKbmA3dv+1/vWIcdDGaXd5dESdhf4UjuNYp+WIqZ2OJHurMRqme7KMHqErVmVo5wwErnSbZh76Hkt+d2Hif5Q/b3po1/G9kMuNnTaj/YQMnG47SWc5q/0j46kfQFM730EhW/9adquiF6YCrpErF8EQSZ4YVRDaGK9mXuXwL2kGLRi9noqXjRgL2YJL1cdgMoMFa6fryeWHXdW68BDuOhSWfRMazqpZIDQ9JhU8lwgys67asr1zlQ8erkwmsBiMpAut+qR+4uT/i7C5ROjqm4ADQMBwNYSJlQYPkh3ziZ2tJZbrGnCvh7eHxLIuolZy4DP+aEFxMZo+2kjinp32gtb6cHl9D+0M7tTQ7O5tm6ZlqvmtNGEMw3QGkDjgbPQoDYHtyFueOeYgrwD5D8F0qtFgjgcjnlMNs4B0XZZeUsWj+I8jyxEzslEhezsDh2KyROw3rPOF8qTd8uVtrg5E6lUWblUD9/gd3EELUuM4iw1EVx1Jz6zRFVZ5GEQSwxZRLh5FxrXHquVzLD4/1s1Odx+Ywprxyh9Py6y2o0ms2wt87AgK3iaRn5S3gpIBPOtliF5YyI+WTrOgzJ0UIx0fgbp8ZGOqo6U0C/xuxPUqvF2EmRvUnobEr3H8cRixe2NErN5SP2EyxiIIlaO4heGbg/VmurKdrBuRSXKMJVg69vt9ee3Z3vsI263eRNO0kYAqX+vUFJL/WPNE804lINn5TIkqsWVZLflUcQHNFAWYk6lxxgwW6q3won2++IVRWuiNj5P4LuSj+dqFysjof/qZctvfvXsmu5YoH/jwDlJ/iy2VmoC0QzfmQJMrPlFnsKXodHlZYpIp1Cgh7gVtAX72NlkwpSJo2gXA2T34Mh7GVxBosPozAte0l62c7fRREdHUu+fpTBowWm/2E+3+QRD1H8RxfK691UnqXwTfvkZNLzPnzAJt1FLKkA7XyTxHaq3dHd7H+MXQ13mloWDUEkCkoEBa2JRKBoBjMF42e0jS91WtM3eW/N//8zs/e5mJj32llDmiwQsHo359x9vu7BvPTo8ju1uk5hbzUP+nklrebxxDFUfC7Lp5nNq9lpVhPQuWZP6uvTlWtK9845g0jHJpQ1/TQX6p+V84/vxOd97Z7IoLKYTjv2ff8fFSnv1k6xt/gmV9tnmFtDV+K49tDuZ1kfh+YW+PgkTPQTwor1n5m1QuGpnDPJuCLNssgEpejoXVq3RNY/3HZAFDuc08CzaSVhE7T0i/Fawladi/9ze4UJCpNm1cVtaA3Ch0a1urA6HVl7/2L67wVmyYZlFJn/zFipO7GLVquwNVCWVhFnMOdWK4+337AZkTzT9rsVyEwrxDvdXpqlpf+2BgMr5j9dnP89qbvJZTnOy7U5lYBWam+I/F6BdlQLN70rkTwC1v97feCX3juYzrLfzGHmNjktRRlrbvgjsd0hn3fPy3yw8a3HDgB+LdviY+tqHSLlsfi99P5ckw/d3n58q1hmOzM8efqHY9so9gtlK6IxIxHCGjsS6/hFLvhPUbJlTcHIgDjZoQ48GlF1QZRuxeu3AEDWdDAwHCbbmV5m2sN+v59V1oOG0e52232VyYQPcKMAaApKJZPTYRWFnSmLbS6b0gvxZK11WLu6flG5eqtnbZaVE4+SZEqfl/jIpB0is/DZ5e9LrXQRHeH+8o10oz+JN7E69W11ssB1rVyTPP5yPOLO2RB8Ab/86CDTjINN4mJYOEMvg6KwGeCzfcgQNBORdOmny3TX3dIJ/uoA9PltlDJkxreIF3vI+PTq6Vzs9vItCUXaKAHGmzE5/Vj/KU34O0plk2ZYYSHnIRDB5h3sWw9s3xpMFUxeZA2YurpwhFamlmUseA2DlpAmo9qfDPE11g5MOlu8Z3ZtZ7t987dav/8VgxfHjhh7eB7Mf6nl0SU2v4rr0p8rDjab3raiQ0Zt8XFJdinMULaFxhTn4pbHx627ioMcVhAsn81m0u/3dhI2+W7uJjnu2IBsJ8ko5kySkQC4PZZmgxmsesxJAbVzXYgYDrG5qzMQ29Qhv+U2KphWgD8FXWSOc3QpN589vheuy3TfX5v2bJVJqlGl+SiGr35zbE5Idx2FrfnmtvP9TuXD25q2Hy+g8uy004loa4GJ6z+jcnSPv4fK1ulxBT3BHKcTD5/+qrARNj7fP0jXqstP04gNLsBkPE+DpZdqllEWk9EHEi2MDKRp6/mSjDibzeeHw8aWhJ1eL8hhntBhM+926916PrFXK9vu2zDArtxc1S7N6M2ZxRipfDYa7nqTXtxj49NRjFGPJxPJCeaWB4na9ofZBnDlPD10swlTUjdJ8hQE+ySOYSpNmGXUGyV5eWM82wHTXZ+21Ai38e4zQLGlHCk4JkyoZUlwUczpej4CJXTCtp99bqm/3T7rapcpds8+UxB9Ju2Nmx4eRD9dr7d4ol4d7fQI+ufHvC5dZ8PJTsdLYRZ7eKb/Kkb1izKFiEC9QkUwb5jAEXY6l9e6F/o+SH9IN9AgXIrO+zSwsMdE1mHTnPS82rPpgXg2Gp7BVIia+dV049EOY59WHdgh8zoI7JCpHpkO0OJ8NIwL+doOTsOy5KhPVvFss8njouvMZgdxwXH0koR/8mAGycA/SMchODw9AQBughAEKTkkT4n4EvJE3m/DvUAukJcPciUegv2L3Lnf7/F+BJs38C0Oh8NZq9VOU0hQyy6IiFSjyi/zS1r04+D5Tdcp2TqHm3FdSEszE5erLwmAzcfHUvNZUI7PkqpnPpbBD4kr1nD+mqGL2yb0j7gaPkn/lrpM5PrNX3Vd/VSuABWbC+tsB6n7+vgWHBJoNcUfNLWmy8H9AGBVLi9DGt2s6wdKLrgcFIiLT0p2ziL+mqr25wKZRlr63WrfdDXF/EkzUjll6ciqmUwlkyCim3MFfklTyGS+6Pd6u/7X3RCj3qvhP2DZJnPxMfwJZIS5jwqlJxl57ijgnuRkfoTm8OMQBGXFp0KXlwXBxB5OZoG8gncKDpAlWCySFckdWJ1yoLyldtUpT6QGZiU/TdOoGj1EdhrZNsR/VrczqHPT5q4HBesN7e0WjDBWerKS2fUfsxn0K5hIUyNVzCiea90/6r+bNyDKOO3NhfhiPxstRugkAoinps2sE0hgyLzN68r5zdpmNH295Fo114OpxqoLzEu+w6V3NdNlRDmt9ewUgp0ynrQ9Kb6rmc1lyNyj99T3xPZnTKM32ql87d2I+Y3O85FkSFBJwu9/crEhzCKTkSixQBABTnuCAHHYJE9yYpPzxCFIXpIyA1/pw3wkhxv8JC8vL7gRB5tc6UAihgtw6mxs0IGqgSWN16X3buyt1yl0fppRKliqEDHRkdEd+gwc2qfgtayqouMbr8mAYjSr82hqaUYXun3ehX6XdKCACV/duRMt8EKe7IMYU7ApgqBLEvLpNrfX4zB8WCyWRreryljnXSnhWlh+CvLODiPnHy+z1IYs+Yo4qpX0LrDra7aHCzppFVDV7GFNs6YdzdDe9dIhPJa1DKfWCYE75deaBS0ZWu0uS8wrbm/fvzIf7VNL52Sv9tXdDSFML5QDJQwKgpxEIBHA9vkogJBRA8omU5NcQ10ZbOZUcAJY4cxyzGKESlx5qrTijD1wLCj4MXVFJ4Ri74SppqV40deaHRip1hiPoxcaxy0S75tyzAG7RrSQ+vygO7edwLj/fG+o4ZVsEuwFRctmEUk1bDFba85Ze6YtoammXpkmecyFVQrvYfxgLAaQpTl/AlUq2a7eP8DUIi28/seF5aXsb2Qtl7dlnTShAkpkFOB8Wq+maVDJjMJgDoMR8UqeZbA18EDMXyfQnFBubTBlLv7ndnf3HTC4DERd1VbmL4xQMEOXj3450eyVR5sITEBJ1AEkBVNO8rqVopRsNiyRliqITUKhmtd/JFLsMhJ5U7ujM+NeKrUleoRZ2GLbgfGazyhNnJAGDWCCZSMpYA/Mf1zQbxqxhAfyFN23Vf1bELSr8zng+9xol1GTebUVzINg1IpaDkbbMOx5EbAqvygw499b9wZUGRjtkSEwSgtTmEWV4M+tspByLrWUkNmBJgUC/evbO82I7u4MFQk/bkxjNq07FmUataEKaGs49j9c+2UTqldTUgsH9EC+LQ1E04ieVAkkhcxuuh+0uy6T+kxZK8Re/aqe+Orxy7D3Kh1Jt5sLHE8vLxCKfQnZy5FRqO11/4mXCYQMMh0BVuxQ4BQ8zyD5ITO2BoNFY2Cx/pTmpqxHIjAtpzhc650lFSLd4bh6AfEBjW5zcRJn7ESy0oVTNeqBMwxaD9YCr8j49opR0apW+1L3GBTNWtbtJpDmwlk2rOl9IwIqzoltBE53o/uNPxqNiCgpkJiIF0CWWlXM6lUGgjVNC427O+ajsBmsMqQ/MeVIu7sbgJ6UWgn6TqsObe6kTQXSf5Tr2mocu10q2FSz0g9qbZFr5qZNpwMoC6sZWk26aCf2r305fUxLx4mGo7vfCyh7RfcoN4HgkexfkZKZaX+KW578bFMzWH4GRkzdMZ1yeY8Bnk6ARDf5h4r4DES29M5tx6qs/RAc+JjujdnogY0g6ksvakG/VRdVgNTHLGTcWdM/jLbUo7ZpTGJsC5u6DlTLaG/iXq9wJGjaoERC6Z3GLOr+g3jQBSVRdnO1EgODVJYVWTf/ZexqmBLHsqjJC4bwIGBiEkkIAZlAAHEUFAR1pZX+mnFqZ3gdTakAABJTSURBVKu6av//P9l77ksg2k7X0lb70Sh2bu7nO+dcIXmtnOfFFAAS4MLpAXUziHj8jpkV6gYyS+xLrX59gUD13VaD6jy6JaCxF0M229IxtYvjeD8lYp+y6YfKnPJi/fNumJcogishLylb5MYpanJ6BCplBXjK6LfnvGhAwlGlBD7/yEaj4nFEhgAPiowhODvBKCIlI1HJ7QGjSebSBYV3I/MrfjYHoH/TeORa4vSkmSy5CDxfnjdr5E5nu9Huepis6Gcu+fSo2aQ+VMMigmtyt/om0er3N6P7OjWeK8pLVCuKMv2FCkDDaywWFPGwJhaE8bMTlCInOHOkyt+gasdHcPbdWRJDowm/PdwIMHGMSXsU4Cg5aTgBpxajXQxdMMUqtuBQYJ/vN+TaFkTPDcsuwqERj1nWLBy3xjrzj+s3zn7qtp9856vJTId6YuR4hC4u5ND55uFMOQ986C/2JYqB+Np97iVXOeNyVPYk6pHxR/VW6nEUe+h+MD81hFdlYp2B3ZQCzbwhJuB6eK0qpSY0k/SPY7AsVpTFsQ1ik5fqCdAiXMrhANinxqqS1E+jY7pXzo6bfIg0uEUFQdem/m13SzWlXCyoKT2vrLPSap46IEFQnyFfQphEwmPEkOvKSvO8Sb4+w620mq8yisUS1BYpMUBkdg3ZKWy1xt4mqdh2ZoRiAJBIh4rwB9vS9nkFuNr529UPsb4XUbAsO2GAJN1q5qVuGWIQ3IEA/MXpAEll+DYy1cPdXWRG1tS5Q9fRv7gYoRIIBiM0ooP6xYXipPc/mRG+jMtO/ekN5hP06KPpouffcxke3A+YYsbcdbS4jHsI7u+BRSczHiUx+lSbfKfF80/MsI18PJqPDij2U1La8NIpLxSbzK2JZcV1m8fLTPW/TO9z60x7vPmDuj+PstfxyeCsPzUr500Tjb9Pljo7Gdq6UxvcmLYP0iPoAOLNoflt38uWjcclBVBVlBxDcoG8UGSee3xOViHXibFKDraaJV0q6BqYYo+Vhgfw4uPVSsamb1QfphY1cU/O1IzqU2ZsUscqIcXlS5nDlD+pBkpV4qBLg6q7YieRyqy6AToYNpM6jhAPkMl4scx/v/S3TnvbZr7RCPpr7StqdbdU7SGSdTCTdqZkoou7jhNFTzjR22635HpTxlLol2bHsaKI6kMHqlI55IhuKOeCynP0yxf9Ld9knz4diappCB+Q+7GXSd9YeSIE348KvbVvGGsjDancowpYrQYbGxnd1BXyHZe6/9fN+RJNcEbOsvY32XKZudNacyoEuU/UH/Spv9Q0viul951R9JqpP0X1eqVLYStx3VqvvDAOSMhkw6O3Bss6nVBpB07UKdTWaq4vN5J9aUP9AqBBVCxIzFrjcayw4vh7PPfGEPugphqLbaz61HHqznfTot/JklQRWLY2UyppHYf8o6xDoqeAoUjmRc9gSH0P9NUL2RJbKZpYkTW6GX27v7Kugt0g6u+uMFVtb6muew62uXYNtbtXFpMELHK3dpSXNV/Nr+bXIoCWNnKrE3lruy3cWr3mUXWPgQ1bBiPwhMvHST2Dmowko7hBruS6drYe64ZOZZDtVmRiWhgWYZ0xhQBbYL3ceGzE8/Vas+0HALLV/nQO4xIgKY0qLYDaGMWoSRhC+pvyESD3TMcJDmCV9Ix6uFSoHE/Xa3cNAgEYzXKmzRpoGhr02YyePqNEP2YBUXYoasbBQcrrt6kC1SkpGQnaMsDirB9pldZh56Zq6fA3eopsaJrCSMYMtLQNNW7gfZkqqWFA/tvVllJN0L7A4IHi1GjElemoraD2Vns0eEHzQc0rPW3XV6/49bCIW1mp/1MTVpawObrcI5IvPyucsvkwBR8N6baFL0wwNRMAEqdp2Aon6sgRkp660spWMHFdbXrG8I5JjOFeC6mkmlMoutB1mHXnySYpn9MKhkauE2Wl49PcSpXzdj+i2NirJo2EahJNMl+DSkky0Aw8cQ34b3IBW/mQP3V9SEFklB2taX9IdfhwOqRvq8gZGDwa+t5GZci8DzJ0F3OI1Vho9AWbWnkN94/uzeh+mknwoRfdLjXA1OpjvlcB4+QRlJPT6+ur4BpZZxQNVIf4bTAoIHZtc+8Lt9/2wDtAXtXF+I9VtoTzoRTnYc9FeqnAFBN1bJzjk/2HB9HRQbKYTMAUVaBx/SCjrAQjIHGzR2IAOWtfXjIvqjgpU4CBp4fO29GKZQ41hm8b76EN9aq36YJhr+YcQPJR2AbDk2LzsEJXCuDFCkNjFLYY3OdCFKcVx1psqFSn1PvqZiVh16QINls8PlL7t6nIxTJpbM4bSZcakEcyAkTAxjN8liiw5WrlsXrRmN6t5mjxqVGR3ddGY76gn7KgW4OS8PUuGO2CH8HVbfCsTNPe2+OPdr5/gh7Kv4Kr9huNp5KRrKn1yz0XasOFccDrFxe94wijhECxf6FKzpD+CZ83pX+nk1aPktkbBo6J0wt+GV9RQUzRan2gFEB2qnstKvZ9MEMz4a8zHqCL3oNIfAi3ChCsTF/4LC1crYas4F8sXMV7r9pi9FKaFiJHfEyMh3yEBBEW0cmkKxfUC2QQAIP4zYqfQkUjjLNYQDKj0V2QBResW7ToNrhN7CrhosYMxVG/TaU1BbKgfb973u2Cq1F7gLCGOQJ9Mnopoba2VAAOfp4tab8UmTyo65YN8259T+mDX2rj/fnn1GEHZMkaZdUQIlLqI71gfei+f8Dzkw9M0vemqt3UXTvG5NcDjVGAHtlLGVQ5jkWVbN9jrDulQtBzGPLBrxfu5eFTVUaAqfU5TEUa2zKZY6MZbPC6wPzOW1HBsVgk0OCAv5DbSMkHVPQBunj5KrGznmxE7QJ1b5ClPIEq1Fku9LVEMxcEf1GL+uPHj13wrR21b6M6QAg404v+9fJSCvZ8kb5Eam/8m5mt9n9ouRa+pDrwQkOI2THF9f/Ft4ZhWgb9pIoBGqYFdYPVjuA3n/c0D7Y3c2boNRgpYehp62fwUKhoi7BSWLVDWxv6kn6iIXRFg/JZZjmnjPP5PfVK4e9KtLJVcNpVkL6kIsiW8y7FLUmBjrymu9qg8sjNwqJsLDaD8Qv9TW9sIwilQJES8FxqBVnOMFekPM0Hlf99RpwjK+2CKDbjEH1n0fXmhcEhI+fvO4c1xFSh+NbH2CE9d5zcPY5yXB1vRDMOTuUbb7zpQ/3BtDBTq0dWSt/xo9JwcslWKnKdXvURGMGGompW/SKHy1qyEgNbqB9Y+2AvipYxHK4z5jVyAk31QnJZB4EO90XIqq8gDuZ7F5CaWsZ64yFA+p7EiS7bSVFQX1dyBdwRuVcX/8ZWQnSjkEhhjuJhsuDHYwO645QdyYWOm7nUYYUlQmu14PnHc5GEatXYjss5gIX5ywVCYazBmwMQq6SxBUVPdcUv/86xyzmA+UilDb+4lCr/GH+a/iVPvv45Xk7Cgxv0ar3wYKWeEl+ZpGbZalUGt0H8H9xPBRiDZ/2sh8eMe93oKXkVapE3w8g1mDNMtSbgtgAwfeJykhyW/yMpb7+guCaozhOg6lKC4tExODdkHsS1boIPXbfBqelVziXVk0MMmWCix0eory0gvQbJtUcMfdG3aRb1QM+7qN68HgyAXwNmgpV8bnfQ28XhXzCafnyoYR24Zmo5g9NUhx1vnYeqLgXrA/VSEUFzJqaKeIbhdPKrKRzzgbXxWPaVlbGMp86T8WFyA5+29e7iooJg7hjFTJEyC7dIQmw4FA9gAaqyAroVYYhlCe+rCMFYPlHrKeUhr1Jp1uogzomp6Nx9wQTAceAl5EgpVMomLWp6RYizJpFl9LbOFLSsAJlRC5x5K5kcJxVqv+abTbKQCVUQXekyJ0vJhUAz77X7v86uhrlNI4haHDKcfTm5R0UGIUUgIpANSZuE1qhiJLvOZKJOp/n//6b79kCSlWQmE5xMEiQRdMft7cd7b1nfsDtQBRkM4qKIYk0Bxs5jEe2EHR3/yvdqTuxA687Ik8IgBWjbT58sNHXKBV2Zl1NeO4+GhQgF59JpE4stb1E0xhjI1hhxXEJYJnYtZVmtyrJp6Leqs9pYJItqFKt26LiqDM2V6dXwaPCmnZgetvYl3e0ZVlIknUV1naOrAM6NdmzwRe4EbkfsjEuPQEiGYk7+sx5PzoDiawgVMknmKrgUEOsQIs+HpVeWpS4FvsLET24mPtBlN3D4OFWM6sqanMNwqMazHgl4P/7NJz9uvhj+ugAt/vYGhg7x8fUb8trIm3v1Jy2lD1Yp7UOnmPbixX8UP1McThshCM8Gag8wym7fISWtIOpkttHmIbMLo0KiLjWYgcYACRSZpwfLstBkHrgMKT2akDh+KDjTmhUVzUEDqhJ4m5kSpqPbCAOBdY1ZwnnUClOWzMma0uDHi/MwBITcNCpxpYk6YWxPt124BeCo5ypvZ/MWN0d3Gotq6XcsbM+FS90KyBgKujtumaDotmifoRtTwDjP3HL0NQbvKHicLxZXOePfgsWi3ClRapGEaGckoLCLH2xvqDXdCv8WUe+bUInhC6ymNc02yyXdz8NBNBqFyCX7ghN3+zDPR4AXIfhCjAbJLHB+1C+X8eXicji0sirysWyY7gDwGS2iKksr4wqVxhFAYnFabKIoi0yUFshnR00TQSWIDhlFRUa/yFhWEc3Zk4xj4CTIH8w2f3PRD3FUU6k6OxwsS5chY6sU1D7MRYi0EAtEGTHVmh08utc8DIbh2G1zLy+VZWzxeRqbFchWeTgE0GsluKPIsQmPD5EtKEAhN+iyNMT4X/KswtXojxHmgqFjVivFV2TeE/+uD2iTc8JSJ/MzBm69UjnD/vB5EfjCivRg/XFHPkxVYgWH8NRrPGGsrSBaVdKbV4HKRpWpM0PhOvgKaQTB7w2jQQrI6JPJaTj92dAAVxTdVF1VAaJoafSQpoaWSGOaJss2KGW+LMBage4WTU+0ORRgC7oYTJedQVpqD79//Pj65evPn19C/pNBdwXwJ1EGXVcU1Td1hWt1c4RTdHP1pq7rlC4dexfa3YPH7Oo9fTVXQ5cD7mE4nAc0DXOGFS2C9RqyGiEHpaEGGXbNPEHg8IR7c5o/wJ4+1qG3p8eVpXdQ4w2Cv8hRSlNvn7ZCiAOYKxFQ4kM7hEAlXwGOFTlpt+MwvwS/WmhfjOlD5Pkl5AACTbaH/AcsKHwHZ91J9zCyXRnFKRU904P7+Wp1TTayiWjoafgaGu04peEuacCLqH4oS1gosL+m3hebWEO/GTIw3OcHI40dZCu30sT8eQOoA52t8Eeaxg/4k0t6kT2AZaUPeNvYNMCFdacLiHywvhpdpWGaCwCbCLJgxHbAuuIp4fenEevglGV+0VNFacx1FwQztwrO3iBEngZwvfIINvYYPh2yLhUyCuxzT5adCri4ssSZnX4s3amiy7RMe9dty+gv1LHwNgXtUJesxj91rUDEVecEGUHLBtot83A4evfuMlAuC4j7rp5r6bYKUoYaq4m18X5j+8oCJG0IfjfnkDmxeA3ld4o13k6zetqY6c46xy3Ie/avjDDC488uWau7NLU8uGZYZttjYx07ZCVwwrHc9m/aohwYSWl42JkmtvVkTy6TW55I2q0iQ7P9aYsXgQCMDSvhye1T/OQ9noGUpPyCnl0XfQtN/Y3ejYwrpGnbC3NUIdDeMwd7SVGmYyNKjlOQG4KBdL12inHC6NGI03/YTln+xSUPxNQVWZ62qdylSEvaCkqVAoN56uclSbl+/55CHZlW7+SAHgsfPcsmDo2/ljoPcCuOnZol9iXHm90BmKk9aSmYDGO4vp+N71/h30LV/M2cY7+bToyBQ9EpK7laZZcf6qjy/TfFfR33uTQ7zUh8CJtOnPUvdDAP7SAP0bc17auSF9/qLOd1WvF9IyVXi5azrnSwHz2ZHPg4naw7lH5wTju2ek3hKwQ8eCxcwaR9R+r2saMAb4q03Mkmm9ovFacRQPbJqUZrEqzgSR9iXcfpguhOIl3m9lvMoBQwsS8M6IWZPHYmoFdnt+P79yyVV0SW+yDPe3chU3OWBf2JjgVW2aZ/dvVp8f2tPS8O+iiCyUWuNUm9HywPwkHPpW9od7/40Y6nLUiN6JPuoB/ckmdJeM/bBx6uxS0Y3Y7F4+3IvbchHUtis+YBNM68qMCAxKDd076gnnOg98H1h+EwdE/byVnFIVvgYR0HiyPhtlp3N7fnaTG6C5RwrZ7h63TLQvNfd4FAuenV4LR74s/MEtld5ygjdEdjM0X5RrM9cRzH/ZHjOzpE/wOD9RejBHZK0wAAAABJRU5ErkJggg==")`,
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
