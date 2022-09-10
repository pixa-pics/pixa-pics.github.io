import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY, UTC_OFFSET_PER_COUNTRIES } from "../utils/constants";

import {Button, Grow} from "@material-ui/core";
import actions from "../actions/utils";

import CrownEmojiSvg from "../twemoji/react/1F451";
import LightingEmojiSvg from "../twemoji/react/26A1";
import GlassesEmojiSvg from "../twemoji/react/1F97D";
import JacketEmojiSvg from "../twemoji/react/1F97C";
import ShufflingSpanText from "../components/ShufflingSpanText";

const styles = theme => ({
    bold: {
        fontWeight: "bold",
    },
    stepPoints: {
        color: "#ffffffff",
        display: "inline !important",
        filter: "drop-shadow(0px 0px 6px #2196f3)",
        webkitFilter: "drop-shadow(0px 0px 6px #2196f3)",
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
        fontWeight: "bold",
        display: "inline !important",
        color: "#ffffffff",
        filter: "drop-shadow(0px 0px 3px #000080a8)",
        webkitFilter: "drop-shadow(0px 0px 3px #000080a8)",
    },
    homeCTAuseit: {
        imageRendering: "initial",
        boxShadow: "none !important",
        pointerEvents: "auto",
        fontWeight: "bold",
        transform: "translateY(0px) scale(1)  !important",
        fontSize: "1.314rem",
        minWidth: "min(320px, calc(100% - 32px))",
        borderRadius: "12px",
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
        fontSize: "36px",
        "& sup": {
            fontSize: "0.3em",
            opacity: "0.6",
            fontWeight: "bold",
        },
        [theme.breakpoints.down("md")]: {
            "& > span": {display: "none"},
            fontSize: "36px",
        },
        [theme.breakpoints.down("sm")]: {
            "& > span": {display: "none"},
            fontSize: "32px",
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
            "& > span": {display: "none"},
            fontSize: "24px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "18px",
            "& > span": {display: "none"},
            "& sup": {
                fontSize: "0.6em",
                opacity: "1",
                fontWeight: "bold",
            },
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


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            settings: props.settings,
            ...JSON.parse(props.settings),
            _history: HISTORY,
            _image_name_infographics: "data:image/png;base64,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",
            _infographics_fadein_time: 0,
            _infographics_in: true,
            _bii3_opacity: 1,
            _join_now_button_update: 0,
        };
    };

    componentWillMount() {

        actions.trigger_page_render_complete();
        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 300);
    }

    componentDidMount() {

        const all_image_name_infographics = ["Mica.png", "Mica.svg", "Luck.png", "Luck.svg", "Mat.png", "Mat.svg", "Lips.png", "Lips.svg", "Nuclear.png", "Nuclear.svg", "Pyramid.png", "Pyramid.svg"];

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

    _open_link = (event, url) =>{

        window.open(url);
    };

    _toggle_bii3_opacity = () => {

        this.setState({_bii3_opacity: this.state._bii3_opacity === 0 ? 1 : 0}, () => {

            this.forceUpdate();
        });
    };

    render() {

        const { classes, _bii3_opacity, _infographics_fadein_time, _infographics_in, _selected_locales_code } = this.state;
        let { _image_name_infographics, _join_now_button_update } = this.state;

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
                <div style={{
                    backgroundAttachment: "fixed",
                    backgroundImage: THEME_DAY ?
                        `url("data:image/png;base64,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")`:
                        `url("data:image/svg+xml,%3Csvg viewBox='0 0 630 354' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2309254C' stroke='%2309254C' stroke-width='3' d='m1 0 5 1 6 9-6 2v-1L5 6H0l1-6Zm240 0 5 1q2 9-3 11h-5l3-12Zm156 0 11 1v17l-6 1v1q-9-5-5-20Zm222 0 5 1-2 5h-4l1-6ZM15 12l2 5-1-1-4-1 3-3Zm239 12 2 2 2 23-6 16 19 13q6-8 22-6l3 4 41 2 10 6-5 1-1 3-20 14-5 11h-2l-5-17-6 5-6-11-21 16q-8 8-6 27l8 11h-4l-10-17v-9l9-14 9-4-1-9 7-1-1-4-11-2-17 6-13-30-4-1-2-6 3 1 3-1 8-29Zm67 60-3 4 4 2 2-3-3-3Zm-92-58 5 15h-1l-4-15ZM51 36l2 5-2 1-3-3 3-3Zm329 0 4 4v2l-6-3 2-3Zm22 4-1 4-2 4-3-1 6-7Zm-17 8 5 1 2 11-2 1v12l8 17 2 2 2 29-1-1-4 2-3-25 2-1-1-6-5 1 2 5-1-1h-2l-8-16-3-1-5 4-1 8-6-3v-3l-5-2 7-8 16-9-1-5-5-3 1-3h5l1-6ZM99 66l3 3v3l-6-2 3-4Zm380 1-5 8v3l-6-3 1-3 10-5ZM120 78v3l-4 2v-3l4-2Zm44 1 6 5-2 1v1l-4-7Zm188 5 6 2 2 3 1-4 2 5h-2l-13 2 2 4 8 6-3 1-12-4-1-3 10-12Zm-109 1 1 1 2 5-8 16h-2l-2-5 9-17Z'/%3E%3Cpath fill='%2309254C' stroke='%2309254C' stroke-width='3' d='m276 90 4 1-14 5v-1l10-5Zm96 5 11 7h-5l-11-5 5-2Zm-185 5 5 3 5 10-1-1-12-9 2-1 1-2Zm259 1 1 2-9 9 8-11Zm-91 7 3 2 2 4h-5v-6Zm-203 1 4 3v2l-6-2 2-3Zm233 3 6 14 1 1-6 4-1-19Zm47 0 1 2h2l1 1-4 2v3l-6-3 1-3 5-2Zm-227 8 13 12-2 1v1l-11-14Zm33 0 2 1 1 5 2 1-3 6 6 14-11 5-1-2-5-2 9-28Zm9 1 5 11h-2l-5-6h1l1-5Zm156 4 5 2 1 6-2 1-1 3h-2l-1-12Zm18 0 4 1h1l-3 5-5 1-4-5 7-2Zm-72 7 5 4 1 2 7 1-13 6v-13Zm26 0 3 6h-2l-3-4 2-2Zm-90 1 2 2-1 2-3-1 2-3Zm129 0v6l-3 5-3 2-6 15 1 1-5-1 4-9 3-1 9-18Zm27 5 3 3-2 3-3-4 2-2Zm-42 1 1 1 1 2-4 2v-1l2-4Zm-116 9 5 13h-1l-4-13Zm33 2 2 1-1 3-4-1 3-3Zm-103 2 3 2v2l-4-2 1-2Zm210 0 1 1 2 4-1-1-4 1v-1l2-4Zm-75 2q-3 14 4 20l2 2-2 9-6-5-6 11-21-10q12 1 16-4l6-12h1l6-11Zm-113 1 11 9 2 2 9 6q-2 14 5 19l3 1 5-3-1-2 2-1 5 4 2 2 4 1-3 5-8 4-1 13 7 1 5-3 1-3 17 8 10 16 2 2q2 8-3 10l-8-3-15-21-10 9 5 7-4 2q-9-8-8-24l-11 4v2l-6 1v4l-5-8-11-3h-2l-11-6-1 7-4-1-2 1q-3-14 4-18l17-12 3-18-5-1h-3l2-4v-2l1-7Zm13 19-2 5 5 1 1-4-4-2Zm-6 18-2 3-11 6 5 9 18 6v-5l-8-1-4-5 15-2 3-9-16-2Zm148-32 1 2 4 1-8 5-13 21-1-2-1 6 8 11 12 1-8 7 1 4-7 2v15l-3-5h-3l-2-5 2-1q4-23-8-30l-4-1 2-3 9-5 7-11-12-4 4-6 20-2Zm37 1 3 3 2 5-3 4-9 5q8 3 6 16h-1v-2l-4 1-9-1-4 3 6-9-9-11 7 5h2l-1-6 1-3-1-3h1l1-2 4 2 3-1 4-2 1-4Z'/%3E%3Cpath fill='%2309254C' stroke='%2309254C' stroke-width='3' d='m210 162 13 1-1 6 4 4 8 2-1 3-11 2v-1l-8-11-4 3 1 3 4 3-2 3-3 2 1 4-1 6-4-1-7-20 11-9Zm79 5 3 3 6 9 13 2q-6 7-22 5v-19Zm258 1 1 1-2 3 2 2h-8l1-3 6-3Zm-276 6 7 6h-1l-7-3 1-3Zm308 18 3 3-2 3-4-2 3-4Zm-35 1 1 1-8 10-3-3 10-8Zm-144 5 2 1 1 5 11-1v13l-5 10q1-11-4-15l-2-1-1 3-5-2 4-1-5-3 4-9Zm-204 6 2 1-3 5h-3l4-6Zm168 0 2 1v13h-4l-2 5 5 9-11 6 5 6-2 1-8-8q6-4 5-15l-3-6q-7 13-27 14l1 11-1 4 1 1-7-3 14-25 32-14Zm63 5 4 1h1v7l-4-1-2 1 1-8Z'/%3E%3Cpath fill='%2309254C' stroke='%2309254C' stroke-width='3' d='m402 217 2 11 4-1v4l-3 2v1l-2-3-12-6 5-4 3 1 3-5Zm81 5 3 3-2 3-4-2 3-4Zm-254 6 5 4 4 12-3 4-6-20Zm-201 6 2 1-4 8-2 1-2 8-4-2 10-16Zm23 0 3 3v3l-6-2 3-4Zm341 0-1 2 2 4 2 2-4 6-1-12 2-2Zm-169 5 5 5q2 12-5 16l-4-13 3-1 1-7Zm149 5 1 1-2 5-12 2 3-4 10-4Zm-117 2 3 3 2 3h-6l-2-3 3-3Zm169 1 2 6-5 1-1-1 4-6Zm-157 5 16 1-4 5-12-6Zm145 0 2 1-3 5 2 1-8 5-3-2 10-10Zm-165 4 3 2-3 1 10 5-11 3 1 3 4 3q-7 11-27 9v-1l4-2-1-2 2-4 6 3 8-5 3-11v-2l1-2Zm212 2 3 3-3 9-3-9 3-3Zm78 0 3 3-2 3-4-2 3-4Zm-273 6 6 4 2 2 4-2 6 14h-5l-2-4-4-2h-2l-5 2 1 4h-3l-4-11 6-2v-5Zm42 0 4 2 2 7-10 5-1 3-1-5-6 2 2 4 4 3 1-2q8 9 6 29h-3l-4-5-1-19-11-9-1-3 1-4v-2q13 3 18-3v-3Zm15 0h46l10 6-2 1q6 2 1 5-9-11-33-6 2 13-4 17l-9 3-5 6-1-2 7-18 5-1-1-5q-13 2-17-3l3-3Zm60 6 9 4v4l-9-8Zm23 0 5 1-1 4 1 1-7-1 2-5Zm34 0 12 3v9h-14l2-10v-2Zm93 2 6 5 2 5-3 2-1 3-1-5-5 1-1-6 3-5Zm-347 4 4 1-2 3 2 2-7-2 3-4Zm32 6 5 1-5 3 1 2 10 1-2 5-15 6v-6l-6-1h2l4-2v-3h-2l8-6Zm152 2 2 1v1h-3l1-2Zm-236 4 30 1 2 3 17 3-1 4 1 1-7 1-1 3q-16 5-24 18l-40 20H78q-7 8-24 6l-5-2 1-2 33-11 1-3-3-5-8-3 7-8 52-26Zm-9 24-3 4 4 2 2-3-3-3Zm-21 6-4 2-1 2 5 2 12-2v-1l-12-3Zm361-30h12q4 7 18 6l22 15-2 3h-20q-5-7-18-6l-13-8 1-10Zm-82 2 3 2v2l-4-2 1-2Zm-92 3 4 1h1l-2 5-4-2 1-4Zm-92 1 7 4 1 2 3 1-12 5-3-3 5-6-1-3Zm60 1-1 2-4 6-7 2-3-1 1-2 14-7Zm82 0 8 8-1 2-9-7 2-3Zm-17 11 7 4 1 15-13 21-5 2-6-3v-14l12-23 4-2Zm-1 6-9 12 2 17h2l2-9 3-2q5-4 3-16l-3-2Zm30 1 1 1 1 2-2 1-2-2 2-2Zm174 17q15-2 21 6h19l22 10 1 8h-23l-7-10-18-2-18-9 3-3Z'/%3E%3Cpath fill='%23040416' stroke='%23040416' stroke-width='3' d='m8 0 4 1 5 11-5 1 1 3 5 3 1 5 11 1 7 9 7 2 8-5 8 5v-3L47 22l-5-8-7-2-10 5-1-4 6-3V8l-9-2-2-5 59-1 3 5 5 1 3-2 2-4 113 1v20l-17 6-7 35 5 7-11 6 6 12-3 2-4-1-5-8-4-1-2-5-4-1-2-5-4-1 1-2-5-11-2 1-2 7 6 7h1l5 6h1l5 6h1l6 7 3 2 1 3-1 2-9-5-1 4 12 8 9-11 6 6 1 3h-2l-2-4-6 1 2 17 16 18h-2l-8-5-2 1v-2l-21 12q-16-4-21 4l5 11-11 6 1 1q15 1 22 11l-34 18-1 23 3 3 8 2-5 9 4 6-4 10 3 4 6-5v-2l7-5 1-2 1 2v-7l-6-9 2-1 10 9-6 14-10 7-2 7 3 3q18 1 27 11v11l-13 7v1l-30 1 1-2v-2l-13-2-10 5-7-8-2-15-10 9q10 6 12 21l-6 9-21 9 1 1-10 5-36 1v2l-11 6-1 6-5 2-1-5H0l1-24 5 3h1l6 7 11 2v-3l-4-2 1-2-15-27-6-2L1 24l5-2v-4H0l1-6h11L8 0Zm103 30-3 4 10 8 2-3-9-9Zm-62 6v6l5-1-2-4-3-1Zm8 6-3 6h4l2-5-3-1Zm42 12-3 6h6v-3l-3-3Zm-2 12-1 6 17 12 10-5 2 2-5 9h6l6-11q-4-8-17-7l-3-6-7 5-3-4-5-1Zm38 18-3 4 4 2 2-3-3-3Zm14 12-2 1-3 4 1 7 7-4 7 2 2 5v1l-10-4-1 6 11 6 13-2v-1l-9-8v-1l-3-5-13-7Zm-44 6-3 4 4 2 2-3-3-3Zm12 6-3 4 4 2 2-3-3-3Zm-40 12-4 2-1 2 5 2 7-2v-1l-7-3Zm100 0-3 4 4 2 2-3-3-3Zm-84 6-3 4 4 2 2-3-3-3Zm14 6-4 2-1 2 16 8 2-4-1-5-12-3Zm22 12-3 4 4 2 2-3-3-3Zm-6 18-3 4 4 2 2-3-3-3Zm12 6-3 4 4 2 2-3-3-3Zm-82 6-5 3 9 9 21-8v-1q-8-7-25-3Zm-6 12-4 2-13 21v10l-6 9h6v-2l6-4v18l-6 1 1 5 11-2 1-4 4 2-5 9 3 1 4 16 4 2 7-2 12-25-15-9-3-5-3-1-3 2v-28l4-4q14-3 19 4l-5 6 5 2 5-1 8-14q-7-6-23-3l-9-4 2-1-7-1Zm-26 12-3 5 2 13h2l2-4-2-13-1-1Zm60 12-3 5v45l2 4h2l2-4v-45l-2-4-1-1Zm-54 24q-11 3-9 18h9l4 10 4 2 7-2-6-9-2-1-4-2-4-5 4-10-3-1Zm96 18-3 4 4 2 2-3-3-3Zm-104 6 1 12h2l2-11-5-1Zm50 6-3 4 12 8v-3l-9-9Zm36 0-3 5 2 7h2l2-3-2-8-1-1Zm24 0-3 4 9 14 3-2-8-15-1-1Zm30 6-3 4 4 2 2-3-3-3Zm-84 12-3 4 4 2 2-3-3-3ZM464 0l15 1-7 10-7-5-1-6Zm23 0 59 1 3 5h1l3-6 64 1-5 9q5 8 18 9v257l-11 3q-2 25-19 36l-15 9h-8l-23-11-2-4-2-8-5-1-5 3 3 3 3 1-3 5h-5l-9-9-2 1-11-14-26-2-9-6-1 4 2 2-13-1-3-11-4 3v3h-3l-5-11-10-3v-2l-7-2-5 3 1 1 3 2h-6l-3-7q9-8 6-28l5 3 9 20h1l2-7-12-23h-6l1-14 3 2 2 4 1 2h3l2-14 4-4h8l16 12 8-5v17l-6 1-3 5h-3l-2-18-2 1-2 25 9 10h3l9-11 1 4-4 5 8 2 3-2 1-21-6-1 1-12h5l-10-15 4-6-17-3-3 11-22-11 1-3 3-1 6 4 3-12 10-2 4-8 5-1 8 5 2-3-8-14-8-3-1-5 5-8-5-6q6-4 5-14l-18-1-2-6h-3l17-28 4-2 1-3-3-2 4-1 7-12h5l6-15-23-29 15-10 3-12Zm50 12-9 10 4 2 8-9-3-3Zm62 0-4 2-7 13-12 6 8 8 16-7v-3l-6-1 12-15-7-3Zm12 6-4 2-3 5-4 2 1 3q12 1 17-6v-3l-7-3Zm-86 12-3 4 4 2 2-3-3-3Zm-12 6-3 4 4 2 2-3-3-3Zm48 0-21 21 5 6-5 7 4 2 7-9h2l11-12-2-14-1-1Zm16 6-1 4 4 2 2-3-5-3Zm-64 30-3 4 4 2 2-3-3-3Zm18 0-8 10-7 5 9 9 3-2-5-7 1-3 4-2 6-7-3-3Zm0 12-3 4 6 2v-5l-3-1Zm-52 12-2 1-9 14 3 3 6-5 6 5 3-2-5-7 5-3v-3l-7-3Zm16 6-3 4 4 2 2-3-3-3Zm12 12-3 5q-3 16 5 22l-5 7 5 2 5-1 2-3-5-12 5-11-9-9Zm90 18-3 4 4 2 2-3-3-3Zm-42 6-3 4 4 2 2-3-3-3Zm-60 12-3 5 2 7h2l2-4-2-7-1-1Zm18 12-3 4 4 2 2-3-3-3Zm44 0-16 8-7 8v56l-6 9 4 6-10 25 4 2 2-4v16h8l-2 3 1 3h11q1-13-6-17l6-1 12-16q-2-14 3-19l21-23v-25l-26-1-10-11-5-1-1-2 24-6 1-4q15-2 21 6l8-9-4-3h-33Zm-56 6-3 4 4 2 2-3-3-3Zm-30 12-3 4 4 2 2-3-3-3Zm120 36-3 6h4l2-3-3-3Zm-130 36-2 1-3 17h4l1-3h2l5-7-1-5-6-3Zm40 12-9 11 2 7h2l8-15-3-3Zm84 6-3 4 2 8h2l2-4-2-7-1-1Zm-62 18-1 4 6 2v-3l-5-3ZM628 6l2 1v4l-5-2 1-2 2-1Z'/%3E%3Cpath fill='%23040416' stroke='%23040416' stroke-width='3' d='m37 18 9 6v4l-3 1-1-3-4-1-2-4 1-3Zm512 37 2 2-1 2-3-1 2-3Zm-104 77 5 4v2l-5-1v-5Zm99 66h23l3 4q4 15-3 20l1 1-14 12-2 23-11-1-1-55 4-4Zm-119 37 1 1v4h-6l1-3 4-2Zm-259 5 2 1-2 9-6 2-2-3 8-9Zm-18 6 2 1-3 5h-3l4-6Zm25 7 5 2 5 9 3 1-3 5h-3l-8-12h-3l2-4 2-1Zm371 11 1 1-2 5h-3l2-5 2-1Zm-186 6 2 6h-2l-3-4 3-2Zm28 6 4 4v1l-4-1v-4Zm7 6 17 1-2 5-15-6Zm-215 6q11-3 14 4v2h-20l6-6Zm79 0 4 1 3 5 1-2 1 2-2 1v1l-5-3-2-5Zm164 0 2 1 2 5-5 3v3l-5-2 6-10Zm22 1 5 2 1 3-20 10-2-1 12-12 4-2Zm-80 7 1 1 1 3h-1l-1-4Zm94 4 4 2 1 10h-2q-6-2-3-12Zm168 0 5 1v5l-6-3 1-3Z'/%3E%3Cpath fill='%23040416' stroke='%23040416' stroke-width='3' d='m387 302 7 4 5 7 6 11h1l3-11 40 28v-2l-10-11 19-9 8 5 12-11 1 3-5 10 6 13-3 1q-5-6-16-4l-11 9 5 9h-4l-3-6-4 1v5h-6l-8-12-4 3 5 9h-10l-3-11-10-4-14-26-7-1-3-8 3-2Zm24 22-3 4 4 2 2-3-3-3Zm42 6-3 4 4 2 2-3-3-3Zm-212-24 4 2 1 4h-5v-6Zm21 0 2 1-3 5h-3l4-6Zm-36 6 2 1v4l-4-1 2-4Zm261 0 4 2 2 2 3 2 5 6 9-6v3l-6 7 4 2 12-11 3 5 9-6h8l4 3-1 3-10 4v1l-17 4v3l-11-3-17-11-1-10Zm138 0 5 1v23l-22-8-2-6 19-10Zm-250 1 18 18 14 23h-4l-18-27-2 1-10-13 2-2Zm-269 5 2 4-3 1h-2l1-4 2-1Zm59 2 1 1 5 9q5-8 21-6l5 4-10 13 9 7 2-3-3-7 23-13 8 5 3-6 4 1-23 29h-24q2-13-6-16l-13-2-7 5-2-3 7-18Zm40 22-1 6h4l2-3-5-3Zm99-18 2 1-2 5h-4l4-6Zm-53 1-1 2-7 15h-3l7-15 4-2Zm41 11 8 1v11l-4 1-2 5h-6q-2-13 4-18Zm232 0 3 2 1 3h-1l-3-1v-4Zm-31 6 14 7 2 5h-10l-6-12Zm38 0 14 2 2 2 11 5v3h-12l-2-5-13-7Z'/%3E%3Cpath fill='%23040416' stroke='%23040416' stroke-width='3' d='m171 343 1 4-4 7h-6l3-5v-2l6-4Zm294 0 3 3v2l-5-2 2-3Zm-330 1 3 2v8h-6l1-9 2-1Zm11 0 2 1-1 3h-3l2-4Zm86 4 2 1v5h-5l3-6Z'/%3E%3Cpath fill='%23040C2B' stroke='%23040C2B' stroke-width='3' d='m14 0 4 1 6 10 2 1-3 2-2 3-2 1 4 1-4 2-3-8 2-1-4-12Zm209 0 5 1v18l-6 11q3 21-6 31l6 11q-2 15 5 22-13 5-11 26l-17-9-2 1-5-10h-3l3-1 1-5 10-3 1-3-6-12 6-9q-8-3-6-15 8-25 24-39l-5-6 6-9Zm198 0 17 1 3 12 25 25 7 20-5 8 11 1-11 6 2 5-2 1h-2l-20 18-1 3-11 9-1 3-4 2-3 1 3 5h3l1-3 21-16-10 11-6 12 4 2 6-5 2 11-6 1 2 5 3 3-5 3v-1l-1-5-4 1 1 5-2 1 4 11 12 6 2-3-6-9 3-5 1 1 13 20-2 1-7-3-2 4 5 1 1 3h-1l-1-3-4 3 2 2-8 1 6 13-2-2-4 1v1l-3-1-5 4-3-1 5-16-5-9-13-5-2-9-2 1-2 12-6-8h2l4-2v-4l-5 2-1-8 6-9-1-3 9 1-2 11 2 1-1 2 5 6 6 3v-3l-7-9h1l6-12-3-5-2 1-1-2-4 2-1 3-2-11-5 2v4l-6-3 6-12-5-6 10-6q0-13 7-18-9-5-6-21l8-10 10-5-9-20-14-4-6-12 6-9Zm38 42-3 4 4 2 2-3-3-3Zm-21 18-2 1-4 5q-1 15 7 21l5 3 7-3 11-14-24-13ZM615 6l-2 3 5 6-6-5 3-4Zm9 0 1 1-1 3 6 3v5l-9-1 2-3-4-5 5-3Zm-87 7 2 2-2 3h-3l3-5ZM38 14l7 5 2 4-1-1-9-6 1-2Zm564 0 3 2-11 14h6l1-3 11-3v3l-12 4v2l-16 7-5-8 9-4 2-7 2 2 2-4 1 2 7-7ZM1 18l5 1v2l-5 2v-5Zm201 6 2 1-3 5h-3l4-6ZM31 26l2 4-3-2 1-2Zm17 4v3l-7 2-1-1 2-3 1 2 5-3Zm508 12 2 1 4 9-1 2h-3l-2-6-4 3v3l-6 3 3 3 2 1-7 10-3-1 5-7-5-6 15-15ZM99 55l3 3v2h-6l3-5Zm48 1 1 1v2h-2l1-3Zm-36 10 3 3-5 6 1 1 3-6-1-3-7 5-2-3 3 2 5-5Zm41 1 6 5q-2 5-5 0l-1-5Zm-32 5 6 4v2l-5 2-1-2h-2l1-2-1-2 2-2Zm411 0 3 3-5 6 4-5-1-3-6 5 5-6Zm-416 2-2 3h-2l4-3Zm48 1q5 3-1 6l-2-3h4l-1-3Z'/%3E%3Cpath fill='%23040C2B' stroke='%23040C2B' stroke-width='3' d='m417 79 2 2-1 2-3-1 2-3Zm105 3v5l2 3-2 1v1l-5-5 5-5Zm-387 2 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm40 2 2 3-5 1 2 2q-6-3 1-6Zm285 3 4 1-7 9-2-2 5-8Zm66 0 2 4-3 2-2-3 3 2 1-2-1-3Zm-135 6 5 4-1 12-2 1-9-10 6-1 1-6Zm91 2 4 2v2h-6l2-4Zm-332 2 1 2 1 1-7 5-1-2 6-6Zm31 1 15 13 20 22 2 2 4 1 6 20-7 3 1-2v-4l-9-4v-2l-9 4q9 3 3 7l-20 15-1-2h-2l8-8-1-2-5-2-5 4-1 3 3 5-3 1 1 5 5-3-4 5-2 5 4 5h2l3-5 2 2-2 3-3 1 3 5 3 1q-8 6-6 24l3 4h1l6-11 2 1 2 23 4-1 1-17 10 9-5 9 6 1q5 21-6 26l17 9h-16l-2-4-12-2-18 7-1-1 12-12h8l1-2 5 2 5-10v-2h1v-6l-5 2-1-2-11-6-1 4 5 6-5 4v-2h-6q2-16-5-21l-16-3-3 2q3-15-3-20l-3 8-11-2-1 2h-4l-1 3-1-5h-2l6-11 7-4 1-2-2-1 1-2-2-4-2 3 2 3h-3l-5-2 7-8 16-2 1-2 2 1 6-5-3 4 1 2 4-3 1-2-2-1 1-2-2-4-3 2q1-13-5-17 8-7 6-24l4-1 6 8q-7 5-5 20h4l8-6 1-8 3 2 8-6 3-5 3 3 1 2 3-1 2-5-29-37Zm-13 97-4 2-1 2 5 2 5-2v-1l-5-3Zm84-96v3l-5 3v-1l3-4 2-1Zm109 6 2 1 3 7-4-3-1-5Zm110 0-2 3 2 2 3-2-2 3-4-2 3-4Zm13 0 2 4-3 2-2-3 3 2 1-2-1-3Zm-321 1 10 8-7 3v-1l1-3-6-2 2-5Zm182 6 7 5 6-5 2 2 1-2 5 14q-2 5-12 3l-10-7-2-5 3-5Zm108 0 2 2-1 2-1-4Z'/%3E%3Cpath fill='%23040C2B' stroke='%23040C2B' stroke-width='3' d='m177 121 2 2-1 2-3-1 2-3Zm102 0 2 2-1 2-3-1 2-3Zm187 0 2 6-3 4-3 1-1-1 1-4-2-1 6-5Zm-7 5-2 3v1l-1-1 3-3Zm-150 1 1 1 8 19-6 7 7 2 5-3 1-5 5 2v-12l-2-5-3 2-1-3 3-5 18 11 3-5v20l-6 11-12-8-6 4 5 6-11 2-16-13-2-17 9-11Zm30 17-3 4 4 2 2-5-3-1Zm-192-4 3 2v2l-4-1 1-3Zm12 5 2 2-1 2-3-1 2-3Zm400 17h29l5 4-2 2-27 1v1l-5-8Zm-154 6 9 7v5l-9-6-2-4 2-2Zm96 1 2 2-1 2-3-1 2-3Zm-443 5 7 3v1l-7 2-2-3 2-3Zm478 3 3 2h1l1 1 1 1-5 4-3-6 2-2Zm-65 3 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm73 6 4 5h-10l6-5Zm-494 1q9 6 26 6l2 5-3 5h-3v-4l-21-2-3 2v-2l-5 2-1-2 8-10Zm419 4 7 1-2 5-6-3 1-3Zm-37 1 1 5 11 4-1 12-4 2-6-3 4-7-11-2 6-11Zm137 5 6 4 1 15-3 4-4 1 1-2-1-22Zm-88 6 5 4-1 3-4 2-1-3h-5l4-3 2-3Zm-460 1 3 3-2 6h-2l-2-6 3-3Zm400 5 5 4v10l-5-2-3 11-4-2v-3l-5 2-1-1 6-11 6-4 1-4Zm48 0 5 1-2 4-4-2 1-3Zm14 6 3 3-2-2-3 2 2-3Zm-441 1 1 19-2 4-4 1 4 2-5 3v-1l-1-4 2-4 4 2v-1l-5-10 6-11Zm39 0 3 3v10l-3-2-3 2 3-13Zm384 1 1 1 2 5-2-2-3 2-1-1 3-5Zm-437 4 2 1v5h-6l4-6Zm198 0 2 1 2 5-2 1v1l-6-2 4-6Zm-87 1 4 9-6 2-1-2 2-1 1-8Zm396 3 3 2 2-1 2 31h10l1-2 3 2 2-1-3 7-7 2-1 3-1-5h-2l1-4-9-2-2 7 4 4 2-1 1 2 5 1v5l-6 1 4 10-9 7-1-2 6-7-1-3h1l-6-10-3-1-2 3-1-10q11-12 7-38Zm-54 1 4 1h2l1 1-5 4-4-5 2-1Zm-429 1 2 1 1 6h-1l-6-1 4-6Zm209 1 3 3v2l-5-2 2-3Zm-105 1 1 10 1 1-2 17-4-1-2-11h-2l2-3-1-3h1l6-10Zm307 1 4 2h1l1 1 1 1-5 4-2-8Zm-90 3 4 3-2 3h-3l1-6Zm20 0 5 1-2 4 4 3-1 4h-3l-1-6h-2l-2-4 2-2Zm17 0 2 2 2 13-8 3-2-3 6-15Zm19 0 3 3-2-2-1-1Zm48 1 3 3-3 8h-3l3-11Zm12 0 1 1 2 5-5 7-1-2h-2l2-1 3-10Zm-355 2 6 4-6 3-2-5 2-2Zm293 1 3 2 2-1v9l-7-8h1l1-2Zm-369 2 7 4 1 3-2 4-4-2-2-9Zm198 0 8 4 1 2 7 6h-10l-5-6-4 1-1-1 4-6Zm26 0 12 7-3 5h-8l4-2v-2l-10-5 5-3Zm159 1 1 1 2 4h-2l-1-5Zm-294 5-5 6-3-1h2l6-5Zm280 4 3 6-4 10 2 4h-5q-6-3 1-6l3-14Zm-396 2 5 1 5 8-6 2-3-1-1-10Zm29 1v6l-7 9h-3l-2-10h2l8-1 2-4Zm63 0 2 2-1 2-3-1 2-3Zm336 1 3 2v3l-4-1-2 1 3-5Zm-288 4 3 3-2-2-1-1Zm227 0 4 1 1 5h-3l-2-6Zm-229 4 5 2 1-2 3 6-9 10v-16Zm82 2 7 4 1 2-1 2-7-8Zm35 0 10 1q-2 7-13 5l-1-2 4-4Zm-265 1 1 1v2h-2l1-3Zm108 1 1 1v2h-2l1-3Zm-24 4 2 2-1-1-2 1 1-2Zm260 0 7 4 3 7h1l2-8-1-3 9 6-2 1 3 4 3 1 1-2 3 2-4 1 21 11 7-12 9 1-1 2 7 3 12-6 17 16 2 2 28 14-2-2-4 1 3 10 9 5v2l-22-7 4-8-3-3-8 6-8-18-5 1v1l-6-2-2-5 2-1-2-5-5-1-16 12-4-5 3-1-2-6-4 1-6 9q5 7 17 8v-2l13-4-1 2-2 3-8 4 1 1 14 8 2-3-5-6 8-3 9 12-24 9 10 13h-1l-13-9-6-8-5-11-3 1v5l-10-5-4-7-4 3 5 3h-2l-3 1 3 4h1l1-3 1 4-2 4h-2l-10-15 2-3 4 2 2-3-17-15-1 2h-3v-2l-9 4q3 10 17 9l-5 2q12 31 36 51h-11l-4-11-6-1q-7-20-23-30l-4 3 22 32 5 2 2 5h-16l-4-12-3 1v7h-4l-2 4-25-1-1-4-2 1-2 4h-6l6-15-5-6 16-6 5-8 7-3v-2l-17-2 6-12-5-9 10-13v-2h1l1-2 5 2v-3l-1-3Zm1 12-4 2-1 2 10 2-1-1 2-1v-1l-3-1 2-1-5-1Zm1 12-1 3 2 2-2-1-2-3-4 2 9 9 3-5-2-1-1-1 2-1-4-4Zm44-24 3 3-2 3-4-2 3-4Zm-252 1 2 2-1 2-3-1 2-3Zm99 3v8l-4 2-1 3-1-2-6 4 1 5 9-5 4 5 4 4 1 2 5-2-5-7-2 1-1-3 18-6 2 3 1 20 3 2 2 4q-17-4-24 4l10 13 3 1 5-3 1-3 11-6 3 6 3-2v3l-18 29-19-1-1-4-2 1-2 4h-18v-8l18-25-3-3-5 7-8 6-14 23h-12l29-40v-2h1l-2-6h2l10-6 1-4-2-1-14 7-1-2-18 14v4l-5-2 5-9-3-1-24 30 1 1-4 2 5 7-2 1-7-8 10-12-11-5 3-4h2l-2-6-4 1-1 3-6 2v-4l-5-2-5 3 1 1 3 2-9 1-8 18 3 5 15-6 6 4v14h-6l-2-12-15 10-1 2h-6l-3-12q-14-2-18 6l-3 6H84l4-5 8-1-2-5q21 3 29-6v-2q32-7 51-29h12l2 4 5 2 7-5 1-2 15-7 1 2 9-6 2-5-3-1 3-5 1 4 3-5h9l17-8Zm16 14-3 5 5 1v-5l-2-1Zm-72 18-4 4 1 2 2-1 3-4-2-1Zm59 0-3 6h4l2-5-3-1Zm-108 18-3 6h3l3-5-3-1Zm430-50 3 2h1l-1 4h-2l-1-6Zm-450 2 4 3-1 2-4-2 1-3Z'/%3E%3Cpath fill='%23040C2B' stroke='%23040C2B' stroke-width='3' d='m271 277 3 2-1 3h-3l1-5Zm194 0 4 11h-1l-8-5 2-1 3-5Zm-368 5 4 3-2 3 2 1-4 2v-9Zm23 0 5 4-12 3-1-1 8-6Zm43 0 4 1-11 5v-1l1-2 6-3Zm11 6 2 1-5 4-2-2 5-3Zm343 4 7 8-7-3v-5Zm-418 2-3 4-1 6-32 14v-1l31-17 2-4 3-2Zm-92 6 8 1 1 4-4 2 2 3 10 6 1 2 34 1-28 17q-22-3-30 6l-1-5 6-3 1 2 5-2 3-8 9-4v-4l-15-6-2-12Zm282 0 5 1-2 4h-2l-1-5Zm256 1 1 3-3 2-2-3 3 2 1-2v-2Zm76 1 2 2 1 3-3 5 1 1-8 3-8-4 4-6 2 1 3 5 6-10Zm-384 4 1 1-7 6 6-7Zm76 0 4 1-4 9-4 2h-5l2-3-1-3 7-1 1-5Z'/%3E%3Cpath fill='%23040C2B' stroke='%23040C2B' stroke-width='3' d='m239 311 3 2-11 10-2-4-1 4-3-4h-2l5-1 1-5 2 4 8-6Zm271 1 5 1-14 10-4-5 13-6Zm96 6 3 11 21 8v17h-12q3-13-3-17l-26-12 11-1 2-4 4-2Zm-493 2v2h-1l1-2Zm432 3 1 1-3 6h-10l2-3 10-4Zm-37 1 2 1-2 4-3-1 3-4Zm15 6-1 2 2 4-2 1v2l-5-2 4-1-4-2 6-4Zm-60 6 32 13 2 5h-22l-9-12-4 3 6 9h-5l-7-14 7-4Zm35 0h13l33 15 1 3h-22l-4-6-3 1v5h-6l-6-10-11-4 5-4Zm-195 1 3 2-2 1-2 7 4 7h-5l-3-5 2-1 3-11Zm243 5 11 6h-4l-7-3v-3Zm-482 6 7 1-5 3v2h-6l4-6Z'/%3E%3Cpath fill='%23040923' stroke='%23040923' stroke-width='3' d='m79 0 11 1-3 4-3 1-5-3V0Zm126 0 17 1-5 9 5 6q-19 15-24 45l6 9-6 9 6 12-3 4-9 2v4l-8-11-3 2-1-2h-2l2-6-5-9 11-6q-8-3-6-15l6-11q-3-14 4-18l14-4 1-21Zm-3 24-4 6h3l3-5-2-1ZM439 0l24 2 8 10 6-5 4-7 5 1q1 12-7 15l-11 6q16 10 23 30l-5 14-6 1-12-1 5-9-7-19-25-25-2-13Zm108 0 5 1-2 4h-2l-1-5ZM21 5l8 4-2 3-4-1-2-6Zm15 7 3 2-2 1 5 6-3-3-3 1 2 6-1-1-6 2-1-2H18l2-4 3-1-4-1 4-3 1-2 1 5 11-6Zm501 0 3 3-2 3 1-2-1-3-3 2 2-3Zm63 0 3 2-8 7-1-3h-2l8-6Zm5 2 1 2-11 11 10-13Zm-71 2 1 2 1 1-5 4-2-2 5-5ZM17 17l1 1h-1v-1Zm595 1 6 4v2l-5 2-1-2-6 1 2-5 4-2ZM49 22l11 14h-2l-7-6-3 2v-2l-5 3-1-2-2 4-6-4 8-3 1 2 5-3 1-5Zm62 9 8 8-1 2-9-7 2-3Zm414 0 2 2-1 2-3-1 2-3Zm53 1 6 8 1 1h-1l-8-7 2-2Z'/%3E%3Cpath fill='%23040923' stroke='%23040923' stroke-width='3' d='m42 35 1 1h-1v-1Zm471 2 2 2-1 2-3-1 2-3Zm48 0 1 1 2 12-2 1-4-9h-2l5-5ZM58 42l2 1-3 5h-3l4-6Zm401 0 3 3-2 3-4-2 3-4Zm96 0-14 15 5 7-5 6 3 1 5-4-6 5-3-3 5-6-5-6 15-15Zm22 0 4 3-1 2-4-2 1-3Z'/%3E%3Cpath fill='%23040923' stroke='%23040923' stroke-width='3' d='m555 48 3 3 1 3 1 1-7 7-3-2 2-3-1-3h1l3-6ZM99 54l3 3-2-2-3 2 2-3Zm450 0-2 3 2 3-3-2 3-4Zm-402 1 1 1h-1v-1Zm-1 2 1 2h1l1-2 4 9-3 2-6-9 2-2Zm11 12q5 3-1 6l-2-3h4l-1-3Zm-43 1 1 2 4 1-8 3 3-6Zm399 3 2 2-1 2-3-1 2-3Zm-386 3 5 3-6 11h-6l6-9-1-3h1l1-2Zm342 2 3 3-3 5h-2l2-8Zm53 3q6 3 1 6l2 3-3-2 2-3q-3-6-7 2l5 6-6-5 6-7Zm10 3 2 1v5l-5-2 3-4Zm-369 6 9 6 2-1 1 1 1 1-2 5-12-9 1-3Zm-13 6 2 1-7 8-1-3 4-5 2-1Zm330 0 3 2-3 2 1 2 1 1-2 3 2 2-2 1v1l-3-2-3 2v-2h-2l6-11 2-1Zm-24 2 1 3-7 13 6 3 1 3 17 1-6 15 5 6-5 9 4 4 7 5 6 12-2 1-9-5-5 4-4 7-9 2v4l-6-10 12-3-1-4h-5l4-6 6 5 1-2-13-20-2 1-2 5 6 9-3 2-13-7-2-10 11-4-1-3h2l-2-5 2-1-2-11-7 5-3-3 18-25Zm-3 17 1 4 1-2-2-2Zm13 6-7 5-3 4 6 2 3-1 3-4-2-6Zm-309-21 5 3 2 5-4 1 1-2-8-4-6 5 9-6 1-2Zm-52 3 2 2-1 2-3-1 2-3Zm76 0 29 36-3 5h-3l-2-5-4 3v2l-5 3-1-3-6 1v11l-11 6-1-12 5-9-8-7 9-4 1 6 11 2v-5l-6-1 3-5 9 5v-3l-16-16-1-10Zm314 0 2 2-1 2-3-1 2-3Zm-378 6 2 2-1 2-3-1 2-3Zm45 2-1 2h-2l3-2Zm345 4 8 8-5 10 6 12-3 4-3 1-5-2 5-7q-9-5-6-21l3-5Zm-429 5 5 3v1l-5 2-5-2 1-2 4-2Z'/%3E%3Cpath fill='%23040923' stroke='%23040923' stroke-width='3' d='m177 120 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm-84 6 2 2-1 2-3-1 2-3Zm341 0 3 3 1 3-6 11h-6l3-12 3-2 2-3Zm-326 5 11 4 1 3-2 4-15-7 1-2 4-2Zm220 1 2 17h-3q-6-3-3-14l4-3Zm269 0 2 2-1 2-3-1 2-3Zm-429 3v15l-5 9q7 4 5 17l-6 9q-19-3-23 9l1 1 10 3-3 4-8 5-3 8-9-3-1-21 4-5 32-16q-7-10-23-11l1-2 10-5-6-10 2-1 2 2h2l-1-4h-2l21-4Zm-9 9-2 3 3 1 1-2-2-2Zm396-6 2 2-1 2-3-1 2-3Zm-426 6 2 2-1 2-3-1 2-3Zm288 5 3 1-2 5-4-1 3-5Zm78 1 1 1 2 5-2 4h-2l-2-5 3-5Zm63 11 5 10-5 2v-1l-1-5h-7l8-6Zm-435 1 2 2-1 2-3-1 2-3Zm390 0 2 2-1 2-3-1 2-3Zm-12 5 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm77-1 12 1-5 4-7-5Z'/%3E%3Cpath fill='%23040923' stroke='%23040923' stroke-width='3' d='m135 169 2 2-1 2-3-1 2-3Zm-81 5 3 1-2 3 6 2 4-2-2-3 10-1 4 3v1l-20 7-8-8 5-3Zm127 0 5 1-3 5h-3l1-6Zm-9 6 2 1-3 4-2 1-1-2 4-4Zm371 0 3 1 8 11h-5l-6-4-7 5-1 3-1-14h1l2 3 6-5Zm-495 6 5 1-9 7-2 23-5 10-1-5-5 2-1-2h-2q2-23 16-34l4-2Zm391 0 2 1-2 3 3 1 3-2-1 3 22 12 3-9 5 3 3-6 8 3-4 8 1 1-3 2-2 3-2 1 4 1-8 5-2-3 3 2 2-4-5-1-1 2q-5-10-21-8l-3 2-1-6-11-2 3-10 4-2Zm-363 6 7 3-8 14-3 1-5-2 5-6 1 2 3-1 2-5-2-6Zm-55 7 1 1 2 7-2-2-3 2-1-3 3-5Zm466 9 5 8-6 1v1l-3-2-3 2 2-6 4-2 1-2Zm-406 3 1 1 2 7-2-2-3 2-1-3 3-5Zm363 2v4l-3 5h-3l-2-5 4-2 4-2Zm-423 1 1 1h-1v-1Zm125 2 10 3v5l-10-8Zm-8 1v14h-1l-4-6 5-8Zm327 0 1 1h-1v-1Zm126 0 2 2-2 3h-3l3-5Zm-446 3 5 13h-1l-4-13Zm276 2 5 3 1 1 4 1h1l1 1 5 1 12 24-2 4h-2l-4-10 2-1-2-5-2 1v1l-3-7-4-2-1 2-3-2-2 4-1-4-6 4 1 2 11 9-1 6-7-9-2 1-2 8-7 3 1-2v-4h-5l5-3-3-14 3-1 1-3 3 2 3-11Zm-256 6q13-2 18 6l4 18 5 1 6 11h-8l-12 12v1l-14 5v-1l14-12 1-2 1 1 1 2 5-3v-3l-4-1-5-10-3-1-5 4-1 2 2 1-2 7-29-11-1-4 3 1 3-2 1 2 5-2 4 8h2q-4-14 3-18h1l5-12Zm0 12-8 10 2 2 6-1 3-10-3-1Zm310-12 9 5 8-5v11h-1l-1-4-4 3v7l-2 1v-3l-1-3-3 2-2-7-2 1-2 10 2 1-2 5-10-7-2-7 3 1 9-7 1-4Zm-438 1 5 10 1-3 1 4-2 1-1 3v-2l-4-1 4-1-5-3 1-8Zm18 4 16 10-5 16-7 9-5 2-3-1 7-6 3-14 3 2 2-5-3-5-6-1-2-7Zm479 2v18l-5 10-1-5 4-10-3-5 5-8Zm-394 4-4 7-1-2 5-3v-2Zm352 2v6l-3 4-3 1-1-1 7-10Zm-467 3 5 7 2 1-2 1v4l-3-5h-4l2-8Zm182 2 3 1v5l-6-3 3-3Zm-84 6 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm339-1 5 4 1 3-5 7-2-12h-2l3-2Zm-443 6 5 1-1 8-1-2-2 1v1l-1-9Zm17 5 1 1h-1v-1Zm45 0 1 1h-1v-1Zm357 1 6 4 1 2h-7l-5-2 1-2 4-2Zm112 0 4 1-8 7v-2h-3l3-5 1 4 3-5Zm-481 1 9 9v2l-11-8 2-3Zm24 0 1 1 4 16-2 1v4l-11-14 8-8Zm12 0 1 1 2 6-2-2-3 1-1-1 3-5Zm24 0 1 1h-1v-1Zm372 0 2 2-7 14h-2l-2-5 9-11Zm27 0v6l-2 4-3-1 5-9Zm-400 2 1 2h1l1-2 7 13-3 2-2-3 3 2 1-2-4-3-1 2-6-9 2-2Zm-107 1 1 1h-1v-1Z'/%3E%3Cpath fill='%23040923' stroke='%23040923' stroke-width='3' d='m159 270 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm201-1 6 3v3l-6-2v-4Zm225 0 1 1h-1v-1Zm-480 5 1 1h-1v-1Zm483 0v2h-1l1-2Zm-123 1 1 2-4 1 3-3Zm159 0 6 1v23l-6 1 3 5 3 1v5l-7 1-1-2 2-5-2-4-3 2-4 8-3-6h-2l12-29 2-1Zm-39 4 1 1h-1v-1ZM1 282l9 8 4 10-8 1 1 6-3-1H0l1-24Zm99 0 3 6 16-6v1l-7 5v1l-16 7v-1l2-5 3-1-2-1 2-3-1-3Zm312 0 5 1-6 11-8-5 5-1 4-6Zm69 0 7 6h-4l-3-6Zm-406 1 2 2-1 2-3-1 2-3Zm177 2 1 3 5 3-2-2-9 5-1-5 6-4Zm293 0 1 9h-8l6-7 1-2Zm-271 3 2 1v5l-5-1 3-5Zm111 0 17 15-2 3-5-2-10-16Zm138 0 5 4v2l-6-3 1-3Zm-258 3 2 3-4-1 2-2Zm155 0-5 6 3 3h2l3-6 4 6 1 1v3l3 2h-5l-12-8 6-7Zm-197 3 2 1-8 5-1-2 7-4Zm225 0 3 6 5 3 4 9h2l1-9 6 15 1 1-5 4-8-4 5-1-9-12-8 3 5 7-3 2-14-8 1-2 9-5 1-2-5-1 9-6Zm-85 1 2 2-1-1-1-1Zm-2 1 3 4h2v-2l6 3-3 5-8-10Zm-121 4 1 4 5 4-2-2-4 1v4l-2-5-8 7v2l-2-3-5 3 4 3-4 1 4 3 1 1 1-4 2 4 13-11 1 3-29 39h-6l24-29-5-1-3 5-10-5-19 13-2-1 13-13 11-17 3 1-5 9 5 2 1-5 17-13Zm306 0 5 4 3 9-1-1h-9l2-5-2-1 2-3v-3Zm-529 3 4 9-2 1-7-4 1-3 3-1 1-2Zm511 1 8 8h-1l-5-2-2-6Zm-450 2 5 1-11 6 2-5 4-2Zm124 0 2 1-3 4-2 1-1-2 4-4Zm203 0 6 6-3 1v4l-2-4 1-2-5-2 3-3Zm201 4 1 2 8 5-8 4-1-3-6 4v2h-14l20-14Zm-219 1 8 5 17 26 7 4 1 7h-1l-32-42Zm-200 1 5 3v3l-5 3 1 1 3 2q-14-2-20 5l-5-10h-2q16 2 22-4l1-3Zm188 0 19 19-18-18-3 2 8 9-9-8 3-4Zm46 0 3 2 11 16h-2l-15-11 2-1 1-6Zm56 0 3 3-2 3 1-2-1-3-6 5 5-6Zm39 0 14 7-7 5-3-6-9 8-1-2h-2l2-5-2-1-7 6-4-7 4 6 15-11Zm-204 3v3l-5 10-1-4-6 3 1 3 5-1v9h-1l-2-1-2 4-1-5-9 1 7-8 6-11 8-3Zm-204 3 4 3v1l-4 2v-6Zm147 0 3 3-18 25v8h-6v-6l-3 1 7-8 2-4 1 5 5-3 5-13q-6-4 4-8Zm221 3 2 3 20 6 1-2 10 8q-12-2-16 4l2 2-3 1 2 5h-2l-13-6 1-6-6-13 2-2Zm69 0v2l-2 1 2-3Zm-140 1 1 1h-1v-1Zm-252 2 3 1-3 5h-3l3-6Z'/%3E%3Cpath fill='%23040923' stroke='%23040923' stroke-width='3' d='m507 324-2 3 2 2 3-2-2 3-4-2 3-4Zm-345 1v6l-4 6h-2l6-12Zm249 0 2 2-1 2-3-1 2-3Zm-213 1v2l-9 8 9-10Zm241 0 8 10-9-8 1-2Zm-54 2 13 20h-2l-5-3-8-15 2-2ZM1 330l5 1-2 5H0l1-6Zm452 1 2 2-1 2-3-1 2-3Zm65 1v2l3 2-4 1 5 2 1-2 3 4 2 1 1-2 3 2-3 1 10 5h-5l-23-11 5-1 2-4Zm-325 6 5 8-3 2-8-8h1l7 7 2-1-4-8Zm-31 1-2 3h-2l4-3Zm287 0v2h-1l1-2Zm-268 1q6 3 5 14h-5v-14Zm275 0 6 14h-5l-6-9 5-5Zm-371 2 11 3v3l-11 4-1 2H66l2-4 17-8Zm53 0 11 3-2-2-3 2 1 3 5-1v7h-11l-1-12Zm33 0 1 1-3 2 2-3Zm34 0 4 3-2 3h-3l1-6Zm174 0 3 2 2 10h-5v-12Zm22 0 6 4 1 7h-1l-6-11Zm64 0 6 6 3 6h-5l-7-9 3-3Zm0 1-2 3 5 2v-2l-3-3Zm85-1 8 4v3l-1-2-7-5Zm-262 1v11h-5v-1l5-10Zm141 0 7 7 2 4h-5l-6-9 2-2Zm-296 1-1 2v8h-6l7-10Zm30 3-1 4v3h-6l4-5 3-2Zm10 0 1 1v6h-6l5-7Zm125 1 2 6h-5v-1l3-5Zm147 0 3 2 2 4h-5v-6Zm72 0 3 2 2 4h-5v-6Z'/%3E%3Cpath fill='%2304061E' stroke='%2304061E' stroke-width='3' d='m549 5 1 1h-1V5Zm-83 1 6 5 5-4-6 5-5-6ZM30 8v2l-3 2 3-4Zm504 7-5 6 2 2 6-5-5 6-4-2 6-7Zm-64 5 14 17-16-15 2-2ZM49 21l11 12-11-11-3 3 1 3q-4-3 2-7Zm2 9 6 6-5-5-4 3 3-4Zm60 0 9 9-2 3-10-8 3-4Zm0 1-2 3 9 7 1-2-8-8Zm414-1 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm-12 5 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm48-1 1 1-6 5 5-6Zm19 6 2 4-3 2-2-3 3 2 1-2-1-3Zm-90 6 2 4-3 2 2-3-1-3Zm72 5-9 10-1-2 10-8Zm-415 1 1 1h-1v-1Zm403 0 2 4-3 2 2-3-1-3Zm-37 18 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm-338 1 2 4-3-2 1-2Zm-51 4 2 4-6 5 5-6-1-3Zm407 6-2 3 2 3-3-2 3-4Zm-365 6 6 5 2-1-3 2-5-6Zm17 0 6 6-5-5-3 2 2-3Zm-78 12 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm378-1-2 3 2 3-3-2 3-4Zm12 0 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm-378 5 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm360-1 3 3-2-2-3 2 2-3Zm30 6 9 9-2 3 1-2-7-9-1-1Zm-434 8v2h-1l1-2Zm11 0v2h-1l1-2Zm9 4 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm379 4-3 4 5 7-3 2 2-3-5-6 4-4Zm39 0v2h-1l1-2Zm86 1 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm-494 1v2h-1l1-2Zm404 3 3 5-5 6-1-1 5-6-2-4Zm48 1 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm-440 2 3 3h-1l-2-3Zm14 3 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm340 4v2h-1l1-2Zm26 1 1 1h-1v-1Zm-356 8v2h-1l1-2Zm356 3 1 1h-1v-1Zm-372 1 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm390-1 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm-378 5 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm339-1 1 1h-1v-1Zm10 0 2 4-3 2-2-3 3 2 1-2-1-3Zm107 0-5 6-4-2 3 1 6-5Zm-542 8 8 9 3-2-2 3-10-8 1-2Zm29 0v2h-1l1-2Zm6 18v2l-3 2 3-4Zm402 0v2l-3 2 3-4Zm-465 4 1 1h-1v-1Zm50 2-4 7v1l-1-1 5-7Zm391 0 4 3 2-1-3 2-3-4Zm20 1 1 3-2-1 1-2Zm-401 9 1 1h-1v-1Zm-60 5 1 1h-1v-1Zm444 1 1 1h-1v-1Zm126 0 3 3-2 3 1-2-1-3-3 2 2-3Zm-456 6-2 3 4 6h-1l-4-6 3-3Zm348 18 1 2-4 1 3-3Zm48 0-2 3 2 3-3-2 3-4Zm-459 2v2l-3 2 3-4Zm-41 7 2 3-4-1 2-2Zm127 0 1 3-2-1 1-2Zm16 3 1 1h-1v-1Zm273 5 1 1h-1v-1Zm-20 6v2h-1l1-2Zm-358 1 9 9-8-8-3 2 8 9-9-8 3-4Zm24 0 1 1-9 8 8 9-9-8 9-10Zm12 0 1 1h-1v-1Zm24 0 1 1h-1v-1Zm372 0 3 3-2 3 1-2-1-3-7 6 6-7Zm-68 2v2h-1l1-2Zm-412 3 1 1h-1v-1Zm504 1-2 3 2 2 1 1h-1l-3-3 3-3Zm-30 11 1 1h-1v-1Zm90 0 1 1h-1v-1Zm-510 1 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm369 5 1 1h-1v-1Zm12 30 1 1h-1v-1Zm15 0-5 6-4-2 3 1 6-5Zm48 0 3 3-2-2-9 8 8-9Zm-354 1 1 1h-1v-1Zm-62 1v2h-1l1-2Zm302 3 1 1h-1v-1Zm-189 1 1 1h-1v-1Zm195 0 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm-237 2-2 3h-2l4-3Zm49 0 3 2 2-1-3 2-2-3Zm162 0 3 4-5-2 2-2Zm68 3 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm-293 4-2 3v1l-1-1 3-3Zm297 3-6 7 2 3-3-2 7-8Zm23 1-1 2h-2l3-2Zm-272 3 2 4-3 2 2-3-1-3Zm221 0 7 7-6-6-3 2 2 3-3-2 3-4Zm-293 1 2 2-1-1-1-1Zm10 0 1 1-2 1 1-2Zm3 2v2l-2 1 2-3Zm24 0v2l-3 2 3-4Z'/%3E%3Cpath fill='%23061437' stroke='%23061437' stroke-width='3' d='m229 0 11 1-3 11 1 1-8 6-2 13 15 28 3 1v7q10 7 13 22l23-6 6 4v2h-13l-23 12 2 1-2 1v-2l-5 4-1 2 2 1-2 17h-6v-6l-4 1-2 17-6 10 6 3v11h-11l5-3q-8-9-6-27l-17-12-1 3 12 12-21-20 4-4 17 9q-2-21 11-27l-5-8q2-18-6-25l6-11V30q9-9 7-30Zm14 84-9 17 2 7h2l8-16-2-7-1-1ZM409 0l11 1-5 9 9 13 13 5q0 12 7 17l-16 11-2 17 6 9-9 19-8 4 5 7-6 11 3 3-3 1 3 5 3 3q-9 5-6 22l6 9q-3 5-6-1v-3l-6 1v1l-6-4 9-16h1l2-11-6-1v-6l-6-2V95l-2-5-4-2-6-16V61l4-1 3-13 3 1 8-16v-7l-6-4 1-3h5l1-18Zm8 79-2 3 3 1 1-2-2-2ZM625 0l5 1v5l-11 3 4 6-3 1-7-7 5-8 1 5 5-1 1-5Zm-33 18 2 1-2 4-2-3 2-2ZM36 24l5 3v1l-7 2-3-3 5-3Z'/%3E%3Cpath fill='%23061437' stroke='%23061437' stroke-width='3' d='m438 60 24 13-11 14-7 3-5-3q-8-6-7-21l4-5 2-1Zm-327 7 2 2-5 6 5 2 5-4 1 4-1 2-4 2 1 3h-1l-14-11 2-1 1-2 3 2 5-5Zm47 6 6 5q-3 5-6-1v-4Zm373 0 2 2-6 7-3 1-1-1 8-9Zm-154 6 5 2 8 21h-5l-23-11 1-2-2-5-1 4-2-3 2-1 1-2 5 3 3 5h3l3-10 2-1Zm91 1v5l-3 5h-5l8-10Zm-125 4 7 1-8 13 3 3 17 7-2 1q7 2 6 14l-3-2-2-6-1 2-3-2-6 5-6-5-3 6 8 9 13 2 3-2-3 8h-9l-2-6-5 2-2 4-18-11-4 27-5 2-1-1 1-4-2-1-3 4-1-1 6-9-8-17-8 7-2 17 14 15 11 2 4-2-5-6 7-4 11 9h-2l-6 13-33 2-5-2-4-10-4-2q2-17-6-22l-9-6-3-17 7-16 20-14 6 11 6-5 6 17h1l15-21 11-5 1-4Zm12 24v6h5l-2-5-3-1Zm-76 13-2 3 3 1 1-2-2-2Zm6 11-3 4 4 2 2-3-3-3ZM135 85l2 2-1 2-3-1 2-3Zm40 3 5 3-3 5h-3l-2-5 2-1 1-2Zm348 2 4 3-1 2-4-2 1-3Zm-67 4v3l-13 15-5 3-4-1 13-11v-2l9-7Zm-303 3 3 3v2h-6l3-5Zm232 8 9 7 2-1v12l-5 3-6-21Zm87 3 2 1-2 4-3-1 3-4Zm9 0 4 3-1 2-4-2 1-3Zm-324 3 10 5-2 4-11-5 2-1 1-3Zm29 15v12l-1-1-5-2 2-7 4-2Zm244 0 2 1-3 5h-7l3-2 1-2 1 3 3-5Zm30 0 2 1-1 4-4-1 3-4Zm-273 18 5 1-2 5-4-2 1-4Z'/%3E%3Cpath fill='%23061437' stroke='%23061437' stroke-width='3' d='m339 144 3 1-2 5-4-2 3-4Zm90 0 9 9v3l-9-5-2-5 2-2Zm-219 6 3 1-2 3 5 2v-4l6 5-2 5q-18-2-22 9l9 21h3l1-6 9-6 14-2v-4h-6l1-3 11-3v12l-12 15-11 6-1 21h6l1-12 11 7v13l-6-4v-4l-6 4 1 2 6 3q7 6 6 21 9-2 11 4v2q-16-2-22 5l-1-2q7-5 5-18l-1-3h1v-6l-6 1v11h-6v-6h-6l5-9-14-9-3 2v-8l-4 2-4 9h-2l-2-17 6-11-6-3v-4l-4-1-2-5 18-21 11-6-3-7 4-2Zm-21 37-3 5h3l2-3-2-2Zm6 17-3 6h4l2-5-3-1Zm-9-42 6 4-8 8-2-1-2-5 4-5 2-1Zm245 0 10 6 3 13-3 5-8 4q-8 7-7 23l-5-3-6 9-1-2-2-19h-4l4-6 8 1 1 5h3l2-13-5-7 10-6 1-5-1-5Zm119 6 2 1v5l-5-2 3-4Zm-90 1 1 3-3 1v-3l2-1Zm80 3 1 2 4 1-7 4-2-3 4-4Zm-369 2 2 5-9 6 4-7 3-4Zm300 7 2 2-1 2-3-1 2-3Zm-20 5 4 2-1 3-4-2 1-3Zm-304 6 2 5h-3l-1-3 2-2Zm391 0 6 1-9 6-1-1 4-6Zm8 0 31 1-1 4 5 1h1v19l-21 23-5 18-4-2q-4-27 14-32l9-5 1-15-3-5-29-1 2-4v-2Zm-501 6 3 1v17h-6q-4-14 3-18Zm123 0 5 3v1l-5 2-5-2 1-2 4-2Zm372 4v24l-3 2-3-2v-22h2l4-2Zm-107 2 5 4-6 5 1-9Z'/%3E%3Cpath fill='%23061437' stroke='%23061437' stroke-width='3' d='m241 208 11 3v5l-14-5 2-1 1-2Zm149 0v5l-1 2-2 1-3-3 6-5Zm7 0 3 2h-3v-2Zm-238 2q7 7 3 25l-3 5h-3v-27l3-3Zm238 1 5 3-3 8h-3l1-11Zm-255 5 6 17-10 7-4-2 2-4 7-2-5-10 4-6Zm123 0 5 3q-2 16 7 21l5-2-5-7 9-8 17 22 7 1 2-1v4q-7 5-20 3l2-3v-3l-12-6-5 3 10 6v1l-14 2-9-6-1-4-7-2-3 5-1-22 6-1 1-3 6-3Zm-4 13-2 3 5 2v-2l-3-3Zm90-12 3 11-6 10 10 8 2-3-3-7 9-4-5-11 3-4 3 5 5 4 1 2 2 1 3 8-3-3-3 1 1 5 1 1-1 3-4 2-12 6-15 1v2l-4 1-20-7 1-5 11 2v-5l-6-1 3-12q20 3 24-11Zm132 0 3 3v3l-4-1-2 1 3-6Zm-56 5 5 1-2 4-4-2 1-3Zm38 0 3 3-1 8-5-2 3-9Zm-422 6 5 1 1 6-1 4 6 1 1-5 5 18-3 5h-3v-6l-6 1v4l-6-7 5-9-3-2-1-11Zm38 0 3 3v28l-2 4h-2l-2-32 3-3Zm330 0 3 1v5l-5 1-4-1 3-2 3-4Zm-12 6 2 2 1 6h-1l-5-3 3-5Zm30 1 3 3-3 2-2-2 2-3Zm-281 5 2 4-9 7-1-2 8-9Zm45 0 11 7 3 5 2 2-5 10-6-2-6-7 5-6-4-9Zm203 1 1 5 3 1-8 4-1-2 5-8Zm88 5 2 1-2 4-3-1 3-4Zm-81 4 7 3-8 7 1-10Zm137 8 6 4-6 4-1 3-4-2-1-3h2l4-1v-5Zm-369 1 3 3v2l-5-1 2-4Zm45 2v9l-1-1-5-2 6-6Zm34 3 8 10-21 8v-1l14-7-1-4h-4l4-6Zm4 0 10 3-2 3-4-1-1-3-3-2Zm26 0 5 1-3 11 6 1 9 11 3 3q-3 15 3 21l3 3-2 3-4 3-2 3-4-2v-4l-12 7-1 3-5 2-5-3-7-11q5-6 18-4l1 6h5l-3-12h-3v-20l-2-3q-8 8-27 5v-1l3-5h2l1-4 2 4 13-1 1-3 2 4h5l-6-14 4-4Zm9 24 1 12-2 1 2 4h2l2-4-2-1 2-11-5-1Zm8-24 9 3-14 3 5-6Zm-96 6 9 4v1l-9-5Zm17 0 10 4v2l-10-6Zm125 0 12 1-1 3 5 4-10 14 5 9-6 11 2 1-1 3 2 2 2-1-1-4 9-1 4 3v1l-10 6-4 7-14 4 5 7-6 14-31-1-3-9 3-5 1 1 1 6 7 2 8-6q11-9 8-31l-2-4-7-1-4 1 1-2h-2l6-5 2-4 6-4 3-4 8-2 2-16Zm-4 24-3 4 10 8 2-3-9-9Zm111-24 5 4 9 12 3 2-5 1v8l-17-14 5-1v-12Zm-345 1 2 2-1 2h-2l-1-2 2-2Zm480 0 1 1 1 3-2 1-2-2 2-3Zm-212 3 4 2h1l-2 5h-2l-1-7Zm-193 2 2 1-2 3 11 4 1 6-2-2q-15-3-21 3l2 3h-2l-7-3v-3h-5l23-12Zm43 6 8 1-2 4-1-4-3 5h-9l1-3 6-3Zm143 0 5 1-5 2 1 1 4 2h-5l-5-2 1-2 4-2Zm62 0 15 1-11 5-6-3 2-3Zm110 0 2 4-4 2-1-1 3-5Zm-166 2v2h-1l1-2Zm-258 4 16 1-51 25-7 7 1 1 9 5 1 5-1 2-34 11 1 1 14 3-3 5H0l2-13q8-8 29-5l11-9 54-24 4-9 14-6Zm94 0 2 1v2l-4 2-1-2 3-3Zm170 0 3 1-2 3 5 2 1-2 10 13h-1l-7-3 2-1q-14 1-17-9l6-4Zm99 0h34l5 4 4 7 6 3 6 9 21 1 23 12h13l28 16 1 14h-29l-3-11-20-7h-19l-9-5 6-2 2-5-3-5-15-1-14-6 2-3-6-7-33-14Zm-290 6 10 3-5 7 7 2h1l-3 4-5 2-6-3v-3h-12q-14 18-39 24v-1l39-25 1-4h11l1-6Z'/%3E%3Cpath fill='%23061437' stroke='%23061437' stroke-width='3' d='m265 294 5 3-2 3h-4l1-6Zm102 0 4 4-2 1-2-5Zm177 7 1 3-2 1-2-2 3-2Zm-307 6 1 1 1 3-8 6-1-3 7-7Zm254 4 18 2-11 5-6-3-1-4Zm-317 1 6 4-6 2-5-2 1-2 4-2Zm229 0 3 2v3h-2l-1-5Zm-280 1 2 2-1 2-3-1 2-3Zm-20 5-1 2 1 4-1-1-4-1 1-2 4-2Zm19 17-1 4-10 3v-1l11-6Zm406 1 10 6h-4l-6-3v-3Zm-449 6 4 1-14 5v-1l10-5Zm480 5 2 2 2 5h-4v-7Zm-183 1 2 6h-5v-1l3-5Zm-115 1 1 1 2 4h-5v-1l2-4Zm84 0 1 1 2 4h-5v-1l2-4Z'/%3E%3Cpath fill='%23071B3F' stroke='%23071B3F' stroke-width='3' d='m378 78 1 1h-1v-1Zm-135 6 1 1h-1v-1Zm54 6 1 2-11 8 10-10Zm93 5 1 1h-1v-1Zm-81 1 1 2-6 4h-2l7-6Zm75 5v2h-1l1-2Zm-147 6 1 1h-1v-1Zm78 6 1 1h-1v-1Zm-30 19 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm-54 11-2 3 2 3-3-2 3-4Zm87 9-1 2h-2l3-2Zm-113 11-6 7 2 3-3-2 7-8Zm344 4-2 3 2 3-3-2 3-4Zm-198 48 1 2-11 8 10-10Zm13 0 2 3-4-1 2-2Zm-3 5v2h-1l1-2Zm-76 1 12 12-11-11-9 8 5 7-3 2 2-3-5-6 9-9Zm79 6 2 4h-1l-1-4Zm-13 6-2 3 8 8 2-1-5-6 2-1 4 6-2 3-10-8 3-4Zm43 11-3 4v1l-1-1 4-4Zm-168 12-3 4v1l-1-1 4-4Zm-43 19-2 3v1l-1-1 3-3Zm184 8v2h-1l1-2Zm4 0v2h-1l1-2Zm163 3 1 1h-1v-1Zm-338 7 2 4-5 6 2 2-3-3 5-6-1-3Zm143 0 9 9-2 3-10-8 3-4Zm0 1-2 3 9 7 1-2-8-8Zm-50 2 3 2 2-1-3 2-2-3Zm-47 5v2h-1l1-2Zm268 0 6 8-3 2 2-3-5-7Zm-264 3 1 1h-1v-1Zm75 1-2 3-1-2 3-1Zm-198 6 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm228-1 1 1-2 1 1-2Zm-272 2-6 7v1l-1-1 7-7Zm274 2-1 2h-2l3-2Zm-255 4v2h-1l1-2Zm16 0v2h-1l1-2Zm-30 9v2h-1l1-2Zm-35 15v2h-1l1-2Z'/%3E%3Cpath fill='%231B5B75' stroke='%231B5B75' stroke-width='3' d='m247 0 4 1-4 7V0Zm144 0 5 1v13q-8-3-5-14ZM254 13l10 9 2 2 16-6q8 6 6 24h-6l-6-3-1-2v-2l-2-4-2 1-1-2-5 1-2-7-5-2-2-4-4 16-2-4-4-2 8-15Zm-20 3v3l-3 5h-2l5-8Zm148 2 2 7-1-1-8 6-3 13-11-9 1-2 16-9 4-5Zm26 10v2l-5 10-1-4 6-8Zm-173 9 7 10 4-2v3l-2 6q-9-5-9-17Zm144 20 2 3-4-1 2-2Zm-88 4 3 3 2 2 4 4 1 2h-4l-4-6h-7l5-5Zm45 5 2 1-12 5v-1l10-5Zm8 0 14 6h-4l-10-6Zm118 16 1 2 1 1-8 7v-2h-2l8-8Zm-12 12 1 2 1 1-6 4v-1l4-6Zm-267 2 3 3v3l-6-2 3-4Zm182 0 11 6h-3l-8-6Zm-113 10 1 2 5 1v6l-10-2 4-7Zm184 2 2 1v2l-4 2v-1l2-4Zm-42 18 2 1-8 16h-2l-2-6 3 1 3-1v-5h-5l9-6Zm-129 2 5 15h-1l-2-5-8 2-1-2 2-4 4-2 1-4Zm-13 16 2 1-1 3-4 2h-7l10-6Zm123 7 1 4-4 3v-2l-6 4-9 14-3-8h2l4 1 4-11 11-5Zm-130 5 7 4 1 2h-1l-7-6Zm19 0 5 1-11 5v-1l2-3 4-2Zm132 6v2h-1l1-2Zm159 6 3 3-2 3-4-2 3-4Zm-152 2 5 10-1-1-5-2-1-2 2-5Zm-154 4 3 3-2 3-4-2 3-4Zm28 7 3 5 8-2-1 2v1l-8 5-3-4-4-1 4-1 1-5Zm56 11 14 1-8 3-6-4Zm21 0 6 3v5l-1-2-5-3v-3Zm-61 12 19 10v3l-12-3-1-4-6-6Zm43 0 11 1-28 12-1-3 18-10Zm-96 12 9 7 3 12-1-1-5 1v-3l-1-4 1-4-6-5v-3Zm165 0 3 3-2 3-3 1-1-4 3-3Zm24 0 3 3-2 3-4-2 3-4Zm-116 11 4 1h1l-3 6-2-7Zm72 0 1 2 4 3v9l-9-1-3 2 1-9 4 1 2-7Zm16 20 1 1-2 10-4-2v-4h-4l9-5Zm-146 5 9 3-2 3-4-2v-2l-3-2Zm-4 5 11 7h-3l-11-5 3-2Zm165 0v2l-9 5 2-3 7-4Zm-181 1 5 3-2 3-3 2-1-2h-2l3-6Zm53 0 2 1-2 4 2 1h-9l3-4 4-2Zm132 4 2 8 4 4-3 8h-11l2-5v-2l-1-4 3-5 3-1 1-3Zm-109 2 8 1-1 3 4 2-9 1-2-7Zm58 0 14 6h-4l-10-6Zm-164 12 7 1-4 5-3-6Zm62 0 3 3-2 3-4-2 3-4Zm264 6 3 1-2 5-4-2 3-4Zm-240 6 3 3-2 3-4-2 3-4Zm27 28 1 2 5-1v2l-8 17-4-2q-2-14 6-18Z'/%3E%3Cpath fill='%2371B9A8' stroke='%2371B9A8' stroke-width='3' d='m271 0 5 1-2 9-5 2-1-2 3-10Zm18 0 5 1 3 10 40 1 4-3 2-9 17 1 2 11 14 1-15 5-7-3V6l-18 12-23 6-22-12-2-12Zm-43 10 1 2 5-2v5l-11 3-1-2 6-3-2-1 2-2Zm61 20 10 1-16 7-1-1 3-5 4-2Zm13 0 15 9v2l-4 3-6-11-5-3Zm65 4 5 3-1 4h-4v-7Zm-114 8 4 1-9 6-2 5v8l-6-2 7-15 6-3Zm59 14v4l-2 4-8 2v-1l8-5 2-4Zm40 4 2 2 2 4-15 5-9-4q14 1 20-7Zm7 0 6 2v3l-5 1v-1l-1-5Zm-95 34v5l-11 6-1 3-5 1v-1l5-8 1 2 11-8Zm-19 45 1 5h-5l-1-2 5-3Zm106 0 2 1 1 4-11 6-1-2 3-5 6-4Zm21 33 1 2 3 1-9 5-1-2 6-6Zm-14 14 4 1-2 4 6 5-1 7h-4l-5-14 2-3Zm22 1 3 1-2 4h-3l2-5Zm-83 1 21 8-3 8-16 5-9-4q16 2 22-4l-1-3-11-3-1-3-5 2-1 2-10 3-1-3 15-8Zm-58 5-1 2-4 6-4 2-2-4 11-6Zm129 48 3 1v3h-4l1-4Zm-76 11 3 1-1 7-5-3 1-4 2-1Zm63 0 1 1-2 9 2 2-8-3 1-6 6-3Zm-49 4v5l-7 3 3-4 3-1 1-3Zm65 1 7 5v2l-8-5 1-2Zm-70 13 5 4v10q-8-3-5-14Zm-7 11v6l-4 1-2-5 6-2Zm-5 8 7 11h2l2-4 3-1 3-6v5l-6 9-3 1-6-4-2-11Zm14 24 2 1v3l-4 1-1-2 3-3Z'/%3E%3Cpath fill='%23388B8D' stroke='%23388B8D' stroke-width='3' d='m366 23 1 1h-1v-1Zm-78 30v2h-1l1-2Zm-12 18 1 1h-1v-1Zm-87 61 1 1h-1v-1Zm-2 2v2h-1l1-2Zm5 0v2h-1l1-2Zm-3 3 1 1h-1v-1Zm194 90 1 3-2-1 1-2Zm-47 45v2h-1l1-2Zm-41 6v2h-1l1-2Z'/%3E%3Cpath fill='%234AA09A' stroke='%234AA09A' stroke-width='3' d='m277 0 11 1q-1 12 8 15l16 8h7l22-8 12-10 3 10 11 2 6-4-1 2-2 6-5 1-14-5q-12 5-9 24l8 1-2 21 4 2-2 1-8-4V48l-10 7-1 3-1-13 6-4-7-9-23-2-5 4-1 16-6-8V29l-6-17-17 6-9-5 13-4 2-9Zm103 0 4 1v6l-3-1-1-6ZM241 12l4 1-5 3 1 2 11-3v3l-6 12 3 1 2 4-7 1-3-1-3-11h-4l1-9 6-3Zm147 0 8 3h1l5 9-6 1-5 13-2-3-5-2q-4-17 4-21Zm-21 30 4 2 6 16h-1l-9-18Zm-84 4 4 10-5 10h-2l3-20Zm-25 10 1 4 5 3 2 3h-10l-3-1 1-4 2-1 2-4Zm43 0 6 8 3 2h-6l-3-1v-9Zm78 2 1 2h-2l1-2Zm-98 9 1 1v1l-5 2-1-1 5-3Zm79 4 1 1h-1v-1Zm1 21 6 8 16 4 1 13-5 3-1-6-4 1-7 19-1-20h2l4-1v-9l-5-2-1 2-1-2h1l-6-3 1-7Zm-173 41 3 1v3h-4l1-4Zm184 5 6 4v8q-6 7-20 6l-3-1-1-7 8-5-2 5 1 2 8-6-3 4 1 2h5l-2-5 2-1v-6Zm-114 2 1 4 1 1-2 5h6l1-8 5 8-11 5-3-5h-3l5-10Zm127 10 5 4v2h-6l1-6Zm-159 12 7 2-2 4-8-1 1-4 2-1Zm171 0 2 1 3 11-5 2-1-2h-4l4-2v-4h-2l3-6Zm-13 14 1 4 6-4-1 2 1 2 1 1-2 11h4l2-4 1 4 1 1-13 7-4-7 3-1v-6h-8l8-10Zm-113 4 5 4v1l-6-2 1-3Zm127 1 3 1 1 5-1-1-4 1-1-3 2-3Zm-97 11 2 1-3 10 1 1-18-1 1-4 17-7Zm-59 1 3 1 3 4-2 1 1 5h-3l-3-1-1-7 2-3Zm95 3 11 3v2l-14 3v-1l3-7Zm-34 8 14 6h-4l-10-6Zm77 13 3 1v3h-4l1-4Zm12 0 3 1v3l-6 1 2-3 1-2Zm-13 9 3 2v1l1 1v3h-4v-7Zm-134 21 1 1v6l-5-3 2-3 2-1Zm79 5 5 2v3l-4 3-1-8Zm42 4 3 8h-5l-3-1 1-4 4-3Zm-59 1 5 4 1 3-1-1-6-2 1-4Zm-52 1q13-2 17 6h-7l-10-6Zm139 0 3 3 3 4 1 1v3l-10 1-11-5 10-1 1-3 5 3v-2l-2-4Zm-162 6 2 1-1 4h-4l1-4 2-1Zm84 6 2 2-1 4h-9l5-3 1-2 2-1Zm16 1 3 1v3h-4l1-4Zm-34 5 2 1v5l-5-1 1-4 2-1Zm99 0 4 2v3h-4v-5Z'/%3E%3Cpath fill='%2363B2A6' stroke='%2363B2A6' stroke-width='3' d='M336 39v2l-2 1v-1h1l1-2Zm51 2 1 1h-1v-1Zm-3 21v2h-1l1-2Zm-14 76 2 2v1l-1-2-1-1Zm28 48 4 2v1l-1-2-4 1v1l-1-1 2-2Zm-151 15v2h-1l1-2Zm134 2 1 1h-1v-1Zm6 37 1 1h-1v-1Zm-2 2v2h-1l1-2Zm5 0v2h-1l1-2Zm-3 3 1 1h-1v-1Zm-80 9 1 3 1 1h-1l-1-4Zm17 60v2h-1l1-2Z'/%3E%3Cpath fill='%23247881' stroke='%23247881' stroke-width='3' d='m385 0 5 1 2 11-8 3v4l-3-1-5 6-16 9 8 9-2 1 2 5h-1q-7-9-25-6-3-20 10-24l15 6 4-3 2-6 11-4 1-11ZM1 6l4 2v3l-4 1V6Zm254 6 22 6 10-5 7 17v13q8 7 8 23h24l3-2 11-16 2 1 2 15 3 2q-16-2-23 6h-21l-5-6-4-2-2-4-9 8-1-2 6-12-6-10-14-2q4-10 8-3l1 1 11 2V29l-6-11-15 6-9-10-3-2Zm-21 8 1 4 3 2 4 10 9 1-4 9-2-1-3 1-13-20 3-2 2-4Zm169 2 4 4-8 16h-10l8-18h5l1-2Z'/%3E%3Cpath fill='%23247881' stroke='%23247881' stroke-width='3' d='m267 30 3 1-3 5h-3l3-6Zm125 19 3 1v3h-4l1-4Zm75 30-1 2-1 3h-3l1-3 4-2Zm-13 11 2 1-3 5h-3l4-6Zm-183 6 1 1q-10 2-8 17l2 1-2 17h-6v-24h-6l4-6 15-6Zm90 3 4 3-2 1 3 9h-1l-5-8-4-1 4-1 1-3Zm15 15 2 1 1 5 5-2 2 14 4 1-2 5q-3-7-14-6l-1 3 1 3-20 10 2 8 6 1-3 10-4-2-2 1q-7-5-5-18l2-3 14-7 2-4 3-1 7-19Zm46 7 3 1v3h-4l1-4Zm-12 12 3 1-2 4h-3l2-5Zm-145 5 2 1 6 11 9 4v2q-17-3-24 3l-2 3-4-2v-2l-11-3 3-5 8-2 1 3-1 3 5 2 3-1 10-5-5-12Z'/%3E%3Cpath fill='%23247881' stroke='%23247881' stroke-width='3' d='m379 142 13 8 10-6v6l-5 11 1 1h-8l-1-5 1-4-5-3-1 6 2 1-10 5-3-1 4-8-2-1 1-2h2l1-8Zm-117 2 2 4-3 2q-6-3 1-6Zm107 1 3 3-5 2-1-2 3-3Zm40 17 4 2 1 4h-2l-3-6Zm-9 12 2 7-1-1-5 2-3 10-3-8 10-10Zm-131 1 2 3 5 3v1l-5-2-1 3 5 3h-13l-3-1 6-8 4-2Zm-55 5 2 1-2 4h-3l1-4 2-1Zm64 0 9 2v3l-7 1-2-6Zm125 2 3 5 1 1-11 13-12 3v-1l2-3 16-10 1-8Zm-96 4q19-3 27 6l-2 1-17-6-32 12v-1l3-6q15 2 21-6Zm42 6 5 3 3 3 2 2-1 2-14 2v-1l4-2v-3h-7l2-3 6-3Zm-52 12 23 6 14-6v1l-16 8q3 12-2 15l-4-2v-14l-15-8Zm98 7 1 6-1-1-5 2-3 4-3 2v5l-1-2-5-2 1-4 4 1 1-4v-2h6l1-3 4-2Zm-157 5 2 7-1-1-4 1-1-3 2-3 2-1Zm170 5v4l-1 2h-4l-1-2 6-4Zm-173 6 4 1h2l5 1-3 5 1 1-4 2 2 3h2l2-4 1 4 5-1-1 2-2 5-2 1h-2l-5 3 1 2h-3l-3-1 4-8-4-16Zm156 1 4 2-2 4h-3l1-6Zm-191 1 3 1 1 7-1 2h-4l-1-7 2-3Zm182 11 3 1-1 4 1 1-6-1 3-5Zm-350 1 3 1v3h-4l1-4Zm232 11 10 6-1 2 2 3h-2l-10-5 1-4v-2Zm37 0 6 1-1 8 5 3h-4l-7-3-1-3-5 2v1l-4 2 1-6 10-5Zm29 0 12 7-1 4-9-4-11 5v-1l9-6v-5Zm37 0 3 1-10 7 1 4h-9l-3-1 1-4 17-7Zm14 0 15 1 1 5v2l-16-8Zm44 1-1 2-3 7-4 2 1 1-4 2v3h-13l1-4v-2q12 2 15-5v-2l8-4Zm-185 5 5 2-5 7-6 3v-1l4-5 2-1v-5Zm-7 1-2 5-3 2 1 4h-9l-3-1 1-4 15-6Zm142 5 14 6h-4l-10-6Zm-161 12 7 2v3l-10 1-1-2 4-4Zm188 0 12 1-3 5h-10l1-4v-2Zm-95 20 6 8 3 2-4 1v1q-8-2-5-12Z'/%3E%3Cpath fill='%2321717D' stroke='%2321717D' stroke-width='3' d='M6 8v2H5l1-2Zm402 18v2l-4 3 4-5Zm-47 6 8 10-9-8 1-2Zm-109 2v2h-1l1-2Zm-14 8 5 5h-1l-4-5Zm155 6 1 1h-1v-1Zm-2 2v2h-1l1-2Zm5 0v2h-1l1-2Zm-3 3 1 1h-1v-1Zm-102 7 3 3-2-2-6 5 5-6Zm132 60 1 1h-1v-1Zm-2 2v2h-1l1-2Zm5 0v2h-1l1-2Zm-3 3 1 1h-1v-1Zm-12 7 1 1h-1v-1Zm-148 6 1 1h-1v-1Zm-11 9 1 2-4 1 3-3Zm124 8-3 4v1l-1-1 4-4Zm-165 27v2h-1l1-2Zm77 0v2h-1l1-2Zm54 13-1 2h-2l3-2Zm63 32 1 1h-1v-1Zm-204 1 1 1h-1v-1Zm0 11 1 1h-1v-1Zm-168 1 1 1h-1v-1Zm348 0-2 3v1l-1-1 3-3Zm-350 2v2h-1l1-2Zm5 0v2h-1l1-2Zm-3 3 1 1h-1v-1Zm316 15v2h-1l1-2Zm71 1 1 2-3 1 1 1 1-4Zm-203 5v2h-1l1-2Zm5 12v2h-1l1-2Z'/%3E%3Cpath fill='%2386D5C1' stroke='%2386D5C1' stroke-width='3' d='M384 8v2h-1l1-2Zm-66 22 1 1h-1v-1Zm-52 24 1 1-2 1v1l-1-1 2-2Zm109 5 3 6-3 1-2-3 4 2v-2l-2-4Zm-93 33v2l-6 5 6-7Zm67 0v2h-1l1-2Zm-83 16 3 1-4 1v1l-1-1 2-2Zm103 5 1 1h-1v-1Zm12 73-2 3 1 2 1 1h-1l-2-3 3-3Zm-67 6 4 2 1 2-2-1v-2l-4 1-1 2v-1l2-3Zm-12 6 1 1-2 1v2l-1-2 2-2Zm26 0 2 2-1 2v-3l-1-1Zm-109 18 1 1h-1v-1Zm-2 2v2h-1l1-2Zm5 0v2h-1l1-2Zm-3 3 1 1h-1v-1Zm18 1 1 1h-1v-1Zm-2 2v2h-1l1-2Zm5 0v2h-1l1-2Zm-3 3 1 1h-1v-1Zm12 7 1 1h-1v-1Zm3 2v2h-1l1-2Zm72 18v2l-1 3v-3l1-2Zm-5 6-3 4h-2l5-4Zm-7 19v2l-4 1v-1h3l1-2Zm9 15-2 3-1-2 3-1Z'/%3E%3Cpath fill='%23ECF4DE' stroke='%23ECF4DE' stroke-width='3' d='m357 90 1 1h-1v-1Zm-50 110v2h-1l1-2Zm8 52 1 1h-1v-1Zm-2 2v2h-1l1-2Zm5 0v2h-1l1-2Zm-3 3 1 1h-1v-1Z'/%3E%3Cpath fill='%23124566' stroke='%23124566' stroke-width='3' d='m256 18 5 6 3 2 1 10 5-2 2-3 3 3 1 2-9 6 1 1-8 6-5 11-2 1v-1q9-10 5-31l-2-5h-4l4-6Zm-27 5v2h-1l1-2Zm152 1 3 2v12l-5-2-1 4 6 2h2l12 1-2 6-4-1h-2l-6 1v5l-6 1v3q-8-6-6-22l9-12Zm21 15 1 2-4 1 3-3Zm-11 14 4 1h1l-3 5-2-6ZM257 66l21 6q2-8 15-6l4 6h34l12-6q5 7 19 6 4-7 18-6l-2 3-18 12v3q-16 2-22-6h-37l-7-3v-3q-17-2-25 5l-12-11Zm-88 18 2 1 2 4-1-1-4-1 1-3Zm152 1 2 2-1 2-3-1 2-3Zm39 5 10 6-3 1-4-1-2-5-1-1Zm31 0 4 2 1 4h-2l-3-1v-5Zm-126 6 4 1-16 8 1-2 1-2 10-5Zm179 4 1 2 1 1-8 7v-2h-2l8-8Zm-196 11 2 3 8 2 1 16 4 1-5 3-3 8-9 4v-1l-5-16 3-4 8 5v-3q-7-4-6-16l2-2Zm151 10 2 1 4 16h1l2-4 1 4 1 1-7 13-1-8h-2l1-3-1-3-2 1-2 5 2 1-8 5-16-11 4-1-2-5 3-1 5 4 3 7h1l8-16-2-1 5-5Zm-182 11 4 2v3h-4v-5Z'/%3E%3Cpath fill='%23124566' stroke='%23124566' stroke-width='3' d='m271 140 2 4 8 2 7 17v18l-1-1h-7l-9-6-10 6-2 6 10 2-1 2-5 1-3-1-4-21-10-4v-3l-11-7 3-5 4-1v3l-1 4q4 7 18 6 7-8 23-6l-2-6-8-1-1-9Zm101 16 1 6-7 3 1 3 10 4-7 12-10 5 1 3 8 7q6 7 3 23h-2l-3-1-1-17-19 6-21 13q-10 7-8 27l4 2h-13v-1l3-1v-16h-3l-9-18-17-6-1 3-8 3-3-1-1-10 3-5 7-2 2-5-3-1 8-5 1-2 14 1 16-6 20 12h-2q-9-9-30-6l-22 8-2 9q13 0 18 9l3 4 9 2q-3 13 3 16l5-18 40-16-2-8h-18l6-11 6 5 2-11-3-1-3-13 4 3 5 10 11-16 4-2Zm16 0q5 3-1 6h-8l9-6Zm34 1 3 1 1 7-5 2-1-7 2-3Zm-21 5 12 9v2l-9-5-1 2-2-8Zm-6 1 1 2-11 11-1-1 7-10 4-2Zm-172 4 9 2-5 3v1l-3-1-1-5Zm-10 2 8 8v2l-4 3-1-2h-2l2-3-6-3 3-5Zm182 6 1 1-3 4h-3l1-3 4-2Zm8 2 5 3 1-2 4 10-5 10 3 1 2 4-10 1-1-6h-2l8-10-4-3-1-8Z'/%3E%3Cpath fill='%23124566' stroke='%23124566' stroke-width='3' d='m373 188 5 12-3-2-2-10Zm-127 4 10 1-7 4-3-5Zm176 1 3 1-2 3h-2l1-4Zm-165 2 1 1-2 6-7 2v-1l7-5 1-3Zm-17 1 1 8-1 6h-6l-4-9 10-5Zm159 2-3 4v9l-5 2-1-5 3-4h-2l8-6Zm29 7 3 1v3h-4l1-4Zm-25 6 3 2 2 5-2-2-3 2v-7Zm-359 6 3 1 1 7-1 2h-4l-1-7 2-3Zm197 2 5 5-1 4h-5l1-9Zm146 3 5 1-1 3 3 2-4 1v2l-5-2-1-4 3-3Zm-186 1 2 1 1 5-1-1-4 1-1-3 3-3Zm195 5 12 7-5 14-3-4 2-10-8-1 2-4v-2Zm-172 7 3 1 1 4h-2l-3-1 1-4Zm20 0 1 1-2 4-1-4 2-1Zm134 3 2 8 10-1v7h-21v-1l3-1 6-12Zm-126 3v11h-3l-3-3 6-8Zm74 0 3 1 1 4h-2l-3-1 1-4Zm-108 6 2 2 2 15-5 1-1-15 2-3Zm-169 5 4 2v3h-4v-5Zm237 0 13 1-27 16-4-4 7-1-2-5 10-4 1-2 2-1Zm57 0 22 1-17 7 1 4h-23v-1l7-4 9 4v-4l-3-1 3-2 1-4Zm82 3 1 1-5 10-1-2 5-9Zm-128 3 8 6h-14l1-2 5-4Zm-51 4v2l-6 9-7 2-9-4q16 1 22-9Zm77 7 8 2-1 4v2l-5 15-2-23Zm64 1 15 1v5l-6 1 1 5-1-1-6-2v-7l-3-2Zm37 0 13 2 1 7q-3 6-14 3l2-3-2-9Zm-227 1 11 5-4 1 4 5 2-1 1 1 3 1-10 8 1 3 5 1-1 4-4 1-1-4-11-3-1-11-5-2 2-3v-2l8-4Zm87 0 3 1v3h-4l1-4Zm-62 5 5 2-1 2-4 2v-6Zm82 0 4 1-2 15-5-11 3-5Zm-5 6 1 1v1l-1-2Zm-117 13 3 1v3h-4l1-4Zm125 9 4 7h-3l-1-7Zm-23 9 3 1v3h-4l1-4Zm40 6v5l-3 6h-3l6-11Zm-11 15 3 2 2-1-2 5h-2l-1-6Z'/%3E%3Cpath fill='%2335949B' stroke='%2335949B' stroke-width='3' d='m287 12 1 1h-1v-1Zm112 168 1 1h-1v-1Zm-116 20v2h-1l1-2Zm110 16 1 1h-1v-1Zm-9 2v2h-1l1-2Zm-3 3 1 1h-1v-1Zm3 9v2h-1l1-2Zm-3 3 1 1h-1v-1Zm-51 21v2h-1l1-2Zm31 6v2h-1l1-2Zm-132 6v2h-1l1-2Zm173 0v2h-1l1-2Zm-171 3 1 1h-1v-1Zm100 3v2h-1l1-2Zm71 6v2h-1l1-2Zm-3 3 1 1h-1v-1Z'/%3E%3Cpath fill='%230E4362' stroke='%230E4362' stroke-width='3' d='m270 77 1 1h-1v-1Zm51 7 3 3-2 3-4-2 3-4Zm0 1-2 3 3 1 1-2-2-2Zm73 5 2 2v1l-1-2-1-1Zm5 30 3 2v1l-1-2-4 2 2-3Zm-155 6 5 6-7-4 2-2Zm-3 5v2h-1l1-2Zm-19 3v2h-1l1-2Zm-3 3 1 1h-1v-1Zm186 0 1 1h-1v-1Zm-6 1 1 1h-1v-1Zm-162 12-2 3 1 2 7 7-6-6-3-1 3-5Zm168 0-2 3-1-2 3-1Zm17 6 4 2v1l-1-2-4 1v1l-1-1 2-2Zm-209 12 9 9-1 3h-2l2-1-7-10-3 2 2-3Zm199 0 2 5-2 1v-1h1l-1-5Zm-183 2-1 2v1l-1-1 2-2Z'/%3E%3Cpath fill='%230E4362' stroke='%230E4362' stroke-width='3' d='m214 174 2 4-3 2 2-3-1-3Zm132 6 6 6h-1l-7-4 2-2Zm68 5v2h-1l1-2Zm-146 1 2 2-1 2v-3l-1-1Zm69 3 3 3h-1l-2-3Zm-73 2 1 1h-1v-1Zm158 1 3 1-4 1v2l-1-2 2-2Zm-10 11 1 1h-1v-1Zm17 1 1 1h-1v-1Zm-2 2 1 3h3l1-3v3l-4 1-1-4Zm-156 7 1 2 1 1h-1l-1-3Zm-226 3 1 1h-1v-1Zm0 11 1 1h-1v-1Zm180 7 1 1h-1v-1Zm-2 2 1 3 1 1h-1l-1-4Zm103 4 2 1-3 1 1 3 1 1h-1l-2-4 2-2Zm-42 12 1 1-2 1-3 4 2-3 2-3Zm142 1v2h-1l1-2Zm-372 1v2h-1l1-2Zm-3 3 1 1h-1v-1Zm217 7 4 5 4-2-2 3-4-1-2-5Zm-70 6 1 1h-1v-1Zm87 0 3 2-1 4h-3l3-1v-4l-2-1Zm151 0 2 2v1l-1-2-1-1Zm-153 2v2h-1l1-2Zm-95 3-1 4 2 3-3-2 2-3v-2Zm46 0 1 1h-1v-1Zm-8 1 2 2-1 2v-3l-1-1Zm75 5v2h-1l1-2Zm-119 13 2 1-3 1 1 3 2 1h-2l-2-4 2-2Zm4 2v2h-1l1-2Zm24 1v2l-2 1v-1h1l1-2Zm97 12 1 2 2 1h-2l-1-3Zm-22 3 1 1h-1v-1Zm-2 2v2h-1l1-2Zm5 0v2h-1l1-2Zm-3 3 1 1h-1v-1Zm30 23 1 1h-1v-1Z'/%3E%3Cpath fill='%23F3F8E7' stroke='%23F3F8E7' stroke-width='3' d='m259 0 11 1-3 11h-15l7-12Zm36 0 41 1q2 9-3 11h-32l-5-2-1-10Zm66 0 17 1q2 9-3 11l-14-1V0Zm-57 36h23l3 4q2 14-3 20l-12 5-12-5q-5-7-3-20l4-4Zm-31 8 6 5 3 11-3 6h-6l-4-12h-4l6-9 2-1Zm83 0 8 4 2 4-9 14-9-3q-2-15 8-19Zm0 47 3 1 1 9h-1l-5-2 2-8Zm-46 107 13 2-2 4-14-1 1-4 2-1Zm4 55 3 1v3h-4l1-4Zm2 23 2 1q3 16-3 22h-2l-1-19 4-4Z'/%3E%3Cpath fill='%23C7E7D1' stroke='%23C7E7D1' stroke-width='3' d='m274 43 5 5-4-4-1-1Zm39 20 3 2 2-1-3 2-2-3Z'/%3E%3Cpath fill='%23A3E2CC' stroke='%23A3E2CC' stroke-width='3' d='m253 0 4 1-8 11h-3l7-12Zm84 0 5 1-2 9-5 2 1-2 1-10Zm42 2 3 5 1 1v3l-6 1 1-2 1-8Zm-62 29 9 5h-17v-1l8-4Zm35 11 4 1-7 9-1-6 4-4Zm-76 1 6 3v6l-6-9Zm89 5 4 1 8 16h-2l-4-5-12 6 5-6 2-9-1-3Zm-97 6 5 12 7 1-5 3v1l-9-4-2-4 2-8 2-1Zm37 6 9 6h-1l-8-6Zm20 0 1 1-9 5 2-3 6-3Zm27 30 3 1-1 7-5-3 1-4 2-1Zm-71 1v3l-10 7-1-1 3-5 8-4Zm86 12 5 3-1 7h-4v-10Zm-101 6 3 1-2 4h-3l2-5Zm128 59 2 1v2l-5 2-1-1 4-4Zm-12 18 2 1v5l-5-1 3-5Zm-68 7 3 1 2 2 3 2h-13v-1l4-2 1-2Zm-10 5 3 1-1 4 1 1-6-1 1-4 2-1Zm20 0 5 2-1 2-5 2 1-2v-4Zm-106 19 3 1v3h-4l1-4Zm18 6 3 1v3h-4l1-4Zm12 12 3 1v3l-4 1-1-2 2-3Zm-1 17 11 4v2l-12-3 1-3Zm71 0 5 2-2 4 1 1-8 4-2-5h2l4-1v-5Zm58 0 12 6 2 4v2q-14 4-18-3l4-9Zm-66 24 4 1-3 4h-4l3-5Zm9 2 5 10-5 8v-18Zm-12 9 4 1h1v8l-5-9Z'/%3E%3C/svg%3E")`,
                    backgroundSize: THEME_DAY ? "cover": "cover",
                    backgroundPosition: THEME_DAY ? "right top": "middle center",
                    backgroundRepeat: "no-repeat",
                    imageRendering: "optimizespeed",
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    right: 0,
                    bottom: 0,
                }}>
                    <div className={classes.backgroundImageContainer} style={{
                        backdropFilter: THEME_DAY ?
                            "blur(8px) saturate(0.66) contrast(1.33)":
                            "brightness(0.6) saturate(1.2) hue-rotate(25deg) blur(6px)",
                        webkitBackdropFilter: THEME_DAY ?
                            "blur(8px) saturate(0.66) contrast(1.33)":
                            "brightness(0.6) saturate(1.2) hue-rotate(25deg) blur(6px)"
                    }}>
                        {_image_name_infographics.length >= 1 &&
                        <Grow
                            in={_infographics_in}
                            exit={!_infographics_in}
                            timeout={{ enter: _infographics_fadein_time, exit: _infographics_fadein_time }}>
                            <div className={classes.backgroundImageWrapper} onClick={() => {this._go_to_editor(_image_name_infographics.replace(".svg", ".png"))}}>
                                <img src={_image_name_infographics}
                                     alt="Image demo."
                                     style={first_image ? {aspectRatio: "143/114"}: {}}
                                     className={String(first_image ? " pixelated ": _image_name_infographics.endsWith(".png") ? "pixelated ": " speed ")}
                                />
                            </div>
                        </Grow>}
                        <h2 className={classes.backgroundImageInfo} style={{filter: "drop-shadow(#ffffff44 0px 0px 4px)", color: "#ffffff", backgroundColor: "#1bcb1866", padding: 16, textAlign: "center", borderRadius: "12px"}}>
                            <span style={{color: "#ffffff", fontSize: "0.75em"}}>REAL INFINITE "SVG" RENDERING...</span>
                            <br/>
                            <span style={{fontSize: "1em", color: "#22ff00", filter: "drop-shadow(0px 0px 4px darkgreen)"}}>TRY IT RIGHT «NOW»!</span>
                        </h2>
                    </div>
                </div>
                <div className={classes.headerContainer} style={{color: THEME_DAY && !IS_EVENING? "#ffffffff": "#fff"}}>
                    <h1 className={classes.titleh1} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAXCAMAAABUMB2pAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUdwTM8gNGYm6NaEj+///IEMPZe2wwAAALELMsnk6OuhpA/ghUoGKbLt7/dRTgRMpCoBgwahkvPDxN3193CGk/rX1RYCK6HP3AjQ4rz/yZCgsNNpsAgAAAABdFJOUwBA5thmAAABFElEQVQoz4WTi26DMAxF40DsOGl4tmu7///Q2XltqoBdQZDg6PraMsZ0kcpcSb6D6oIjwn3jiRXzJxjh+BizBu/BAx0zosem5waKHVC0j7+Sku6Aohi5IdPILPX8ZzBa3u+5QZtAkktVsNot2TWu3YpFPnt5rUneO30sbG2cOwMs7wGql0JC0WK+1jhr9p0DZycxci5jSt4KJE5cFQJoJpcvudXGNCfuFE+ayDn10lKlOWNihQIHAEY1aKqTIGvtit2JcVBEWpfzdmvQYlfboTBNQ2nbkCB9pPR6IRYqfCP6yugg/4zcWsSCoTLQoI9tSiljmEudLBTd0xNxEKqEPtvMe0pDeuam6WrHteX/fgVz/rP8ADUeDr4tHJI9AAAAAElFTkSuQmCC"}
                             alt="pixa-pics-logo" style={{height: "1.25em", width: "auto", verticalAlign: "baseline", margin:"8px 32px 0px 16px"}} className="pixelated shiny emoji-150"/>
                        <span className={classes.stepPoints} style={{color: THEME_DAY && !IS_EVENING ? "#fff": "#008eff"}}>1 </span>
                        <ShufflingSpanText className={classes.revelantText} style={{color: THEME_DAY && !IS_EVENING ? "#fff": "#008eff"}} pre=" «" key={Boolean(_join_now_button_update % 11)} placeholder="PIXA.PICS" text="PIXA.PICS" app="» " animation_delay_ms={_join_now_button_update === 0 ? 4500: 0} animation_duration_ms={1500}/>
                        <span className={classes.revelantText} style={{color: THEME_DAY && !IS_EVENING ? "#fff": "#008eff"}}> From the REAL-LIFE to PIXEL ART and NFTs.</span>
                    </h1>
                    <h2 className={classes.titleh2} style={{color: THEME_DAY && !IS_EVENING ? "#ffffffff": "#fff"}}>
                        <span className={classes.revelantText} style={{color: THEME_DAY && !IS_EVENING ? "#ffffff": "#008eff"}}>Get the MAXIMA of PRIVACY fashionably for real and for the ONLINE-SELF...</span>
                        <br/>
                        <span>Use effects immediately in the laboratory? Yes or No?</span>
                    </h2>
                    <h2 className={classes.titleh2} style={{color: THEME_DAY && !IS_EVENING ? "#ffffffff": "#fff"}}>
                        <span className={classes.stepPoints} style={{color: THEME_DAY && !IS_EVENING ? "#ffffff": "#008eff"}}>2 > </span>
                        <JacketEmojiSvg alt="scientist-jacket-tweemoji" className="emoji-150"/>
                        <span className={classes.revelantText} style={{color: THEME_DAY && !IS_EVENING ? "#ffffff": "#008eff"}}> WHILE DRAWING/EDITING</span>
                        <span> an ARTWORK in MINIMA, </span>
                        <span className={classes.revelantText}> you can use 55+ tools for pixel art within 7 panels</span>
                        <span> such as : layer's option, filters, selections, shapes, and effects.</span>
                    </h2>
                    <h2 className={classes.titleh2} style={{color: THEME_DAY && !IS_EVENING ? "#ffffffff": "#fff"}}>
                        <span className={classes.stepPoints} style={{color: THEME_DAY && !IS_EVENING ? "#ffffff": "#008eff"}}>3 >></span>
                        <GlassesEmojiSvg alt="scientist-jacket-tweemoji" style={{verticalAlign: "middle"}} className="emoji-150"/>
                        <span className={classes.revelantText} style={{color: THEME_DAY && !IS_EVENING ? "#ffffff": "#008eff"}}> RENDER UNLIMITED PIXEL ART </span>
                        <span className={classes.revelantText}>in 4K<sup> Ultra HD</sup> images</span>
                        <span> or in </span>
                        <span>humanized ∞ %<sup> Scalable</sup> shapes </span>
                        <span> of vectors using its PIXEL-MATRIX to get it majestically in SVG.</span>
                    </h2>
                    <Button key={_join_now_button_update} className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={this._go_to_editor}>
                        <ShufflingSpanText placeholder={_join_now_button_update % 5 ? "START " : "JOIN LAB "} text={_join_now_button_update % 5 ? "START " : "JOIN LAB "} animation_delay_ms={_join_now_button_update === 0 ? 3000: 0} animation_duration_ms={1000} />
                            <img src="data:image/png;base64,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" alt="Laboratory decoration" width={24} height={24} style={{transform: "scale(3.5)", width: 24, height: 24, marginRight: "2em", marginLeft: "2em", filter: "drop-shadow(white 0px 0px 6px)", webkitFilter: "drop-shadow(white 0px 0px 6px)"}} className="emoji-150" />
                        <ShufflingSpanText placeholder={_join_now_button_update % 5 ? " SOON" : " NOW"} text={_join_now_button_update % 5 ? " SOON" : " NOW"} app="!" animation_delay_ms={_join_now_button_update === 0 ? 3000: 500} animation_duration_ms={1000} />
                    </Button>
                    <p className={classes.subtitleButton}><span><CrownEmojiSvg alt="king-crown-tweemoji" className="emoji"/> Free For Everyone <LightingEmojiSvg alt="sky-lightning-tweemoji" className="emoji"/> Forever Open-Source</span></p>
                    <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary" onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                        <ShufflingSpanText pre="[ " app="! ]" placeholder={_join_now_button_update % 3 ? "SEND IT" : "SHARE NOW"} text={_join_now_button_update % 3 ? "SEND IT" : "SHARE NOW"} animation_delay_ms={_join_now_button_update === 0 ? 3000: 750} animation_duration_ms={750} />
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
