import React from "react";
import { withStyles } from "@material-ui/core";

import { t } from "../utils/t";
import { HISTORY } from "../utils/constants";

import {Fade, Button, LinearProgress, IconButton} from "@material-ui/core";

import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import api from "../utils/api";
import actions from "../actions/utils";
import {parse} from "@ungap/structured-clone/cjs/json";

const styles = theme => ({
    "@keyframes innerToolbarCyberPunkAnimation": {
        "0%": { left: "-20%"},
        "100%": { left: "70%"}
    },
    root: {
        display: "flex",
        position: "relative",
        width: "100%",
    },
    innerToolbar: {
        cursor: "pointer",
        height: 40,
        lineHeight: "40px",
        borderRadius: 4,
        display: "flex",
        position: "relative",
        width: "100%",
        overflow: "auto",
        textTransform: "none",
        textAlign: "inherit",
        padding: 0,
        boxShadow: "inset 0px 0px 24px #ffffff54",
        backgroundColor: theme.palette.secondary.main, // #030435
        backgroundImage: `url("data:image/png;base64,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")`,
        backgroundPosition: `${parseInt(Math.random() * 100)}%, ${parseInt(Math.random() * 100)}%`,
        backgroundSize: "inherit",
        "&:hover": {
            backgroundColor: theme.palette.secondary.lighter,
        },
        color: "#d7dbff",
        "&::before": {
            display: "flex",
            top: 0,
            left: "-30%",
            "content": "\"\"",
            position: "absolute",
            height: 40,
            width: "60%",
            background: "linear-gradient(to right, transparent, rgb(155 163 220 / 44%), transparent)",
            animation: "$innerToolbarCyberPunkAnimation 7.7s linear alternate infinite",
        },
        backColor: "rgba(108,114,183,0.18)",
        //boxShadow: "inset 0px 0px 6px #475db3ab, inset 0px 0px 24px #838fdc61, inset 0px 0px 48px #cbd4ff40",
        "&::-webkit-scrollbar": {
            display: "none"
        }
    },
    link: {
        color: "#d7dbff",
        textDecoration: "none",
        height: "100%",
        lineHeight: "100%",
        display: "inline-block",
        fontSize: "15px"
    },
    linkIcon: {
        color: "#7479b4",
        marginLeft: 8,
        textDecoration: "none",
        height: "100%",
        lineHeight: "100%",
        display: "inline-block",
        fontSize: "12px"
    },
    innerToolbarTextWrapperContainer: {
        position: "absolute",
        width: "100%",
        top: 0,
    },
    innerToolbarTextWrapper: {
        position: "absolute",
        width: "100%"
    },
    innerToolbarInput: {
        position: "relative",
        width: "100%",
        display: "block",
    },
    innerToolbarText: {
        whiteSpace: "nowrap",
        position: "relative",
        width: "100%",
        display: "block",
        textShadow: `0px 0px ${theme.spacing(1)}px ${theme.palette.secondary.light}`,
        "& > *:first-child": {
            marginLeft: theme.spacing(1),
        },
        "& > *:last-child": {
            marginRight: theme.spacing(1),
        },
    },
    innerToolbarProgress: {
        position: "inherit",
        display: "flex",
        width: "100%",
    },
    linearProgressVisible: {
        "& .MuiLinearProgress-barColorPrimary": {
            background: "linear-gradient(90deg, rgb(52 58 103) 0%, rgb(31 36 80) 100%)",
            zIndex: -1,
        },
        zIndex: 1,
        marginBottom: -3,
        height: 3,
        backgroundColor: "transparent",
        width: "50%",
        display: "flex",
    },
    linearProgressVisibleOffline: {
        "& .MuiLinearProgress-barColorPrimary": {
            background: `linear-gradient(90deg, ${theme.palette.primary.actionRed} 0%, ${"rgb(155 163 220 / 0%)"} 100%);`,
            zIndex: -1,
        },
        zIndex: 1,
        marginBottom: -3,
        height: 3,
        backgroundColor: "transparent",
        width: "50%",
        display: "flex",
    },
    infoIcon: {
        right: 0,
        top: 0,
        height: "100%",
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.primary.contrastText,
        zIndex: 2,
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 0, 1, 1),
        paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
        "input&::placeholder": {
            color: "#d7dbff",
            opacity: .666,
            fontSize: "15px"
        }
    },
});

class InnerToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pathname: props.pathname,
            logged_account: props.logged_account,
            know_if_logged: props.know_if_logged,
            loaded_progress_percent: props.loaded_progress_percent,
            music_enabled: props.music_enabled,
            classes: props.classes,
            _is_info_bar_active: false,
            _history: HISTORY,
        };
    };

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(new_props) {

        const state = {
            ...new_props,
            _is_info_bar_active: new_props.pathname.includes("pixel") ? this.state._is_info_bar_active: false
        };

        this.setState(state);
    }

    _toggle_info_bar_activation = () => {

        let { _is_info_bar_active } = this.state;
        if(!_is_info_bar_active) {

            window.dispatchEvent(new Event("art-action-gethelp"));
        }
        this.setState({_is_info_bar_active: !_is_info_bar_active});
    };

    _trigger_tip = (text) => {

        actions.trigger_snackbar(text, 60 * 1000);
        actions.trigger_sfx("navigation_selection-complete-celebration");
    };

    _go_to = (url) => {

        const { _history } = this.state;
        _history.push(url);
    };

    _on_settings_changed = () => {

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 250);

        actions.trigger_settings_update();
    }

    _handle_music_enabled_switch_change = () => {

        const checked = Boolean(this.state.music_enabled);

        if(checked){

            actions.trigger_sfx("ui_lock");
            actions.stop_sound();
        }else {

            actions.trigger_sfx("ui_unlock");
        }

        const settings = { music_enabled: !checked };
        this.setState({music_enabled: !checked});
        api.set_settings(settings,  this._on_settings_changed);
    };

    render() {

        const { classes, pathname, logged_account, know_if_logged, loaded_progress_percent, _is_info_bar_active, music_enabled } = this.state;

        let pathname_splitted = pathname.split("/");
        pathname_splitted.shift();

        const pathame_items = pathname_splitted.map((element, index, array) => {

            let link_to = "/";
            for (let i = 0; i <= index; i++) {

                link_to += array[i] + (i === index ? "": "/");
            }


            return element === "" ? null: <Fade in={know_if_logged}  key={index}><a key={index} onClick={() => {this._go_to(link_to)}} className={classes.link} >&nbsp;›&nbsp;{element}</a></Fade>;
        });

        const tip_items = [
            <Fade in={true}><a key="tip-legend" onClick={() => {this._trigger_tip(`(?) Aware it musts be working as intended, tips are to be used left to right in chronological order while asterisks means mandatory for completion.`)}} className={classes.link}>&nbsp;STEPS / HINTS&nbsp;›&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-deepai" onClick={() => {this._trigger_tip(`(?) DeepAI.org (remote) system (2nd tab) in editing area, can add colors to monochromatic images and upscale it if ONLY you choose to. AI doesn't mean results can't be wrong but algorithms are absolute.`)}} className={classes.link}>&nbsp;+AI&nbsp;→&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-contrast" onClick={() => {this._trigger_tip("(?) In photography, darkest and lightest tones looks better if they are more distant from each other. Double-tap or Right-click around the movable and drawing card area to open the context-menu containing the related tools.")}} className={classes.link}>&nbsp;+Contrasts&nbsp;→&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-colors" onClick={() => {this._trigger_tip("(?) For a pixel art to get nice, your palette needs to contain less colors than 8-128 for greatness. Double-tap or Right-click around the movable and drawing card area to open the context-menu containing the related tools.")}} className={classes.link}>&nbsp;-Colours*&nbsp;→&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-smooth" onClick={() => {this._trigger_tip(`(?) For a pixel art to get neat, you can raid the "smooth" functionality available in menu on double-tap or right-click. All your pixel should live with similar neighbors 6/8 because in towns that isn't thought "smooth or fancy" algorithmic raids will adopts neighbour's color for lonely pixel repainting.`)}} className={classes.link}>&nbsp;+Smoother&nbsp;→&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-filters" onClick={() => {this._trigger_tip(`(?) In popular social media around pictures, it is popular to let colors being moved from given properties to other ones, creating sometimes colourful effects looking regularized. 7 Sections in the panel of editing contains one called "Filters" (7/7) to apply an adjustable color correction strength out of 21+ preview.`)}} className={classes.link}>&nbsp;+Filters&nbsp;→&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-export" onClick={() => {this._trigger_tip(`(?) The nostalgia caused by legendary video games had let remastering find faithful solutions in saving fan's eyes on yet 2x or 3x up-scaled screen resolution using original visuals while up-scaled with intelligent rules only to cover just more precisely the same area while seeking beauty out of changes regarding pixel's neighbour tiny house. The 2nd panel section about "Images" let you export and multiply from up to 32x with crisp-edge your artwork before download, more impressively if it empathize no more than 128 colors, also by 6x creating very cool near-human shapes which the application reads to save resulting shapes by colors in a file that scales up to employ every living pixel on screen / printing unit on paper that aren't disabled.`)}} className={classes.link}>&nbsp;+Render*&nbsp;</a></Fade>,
        ];

        return (
            <div className={classes.root}>
                <Button className={classes.innerToolbar} style={pathname.split("/")[1] === "gallerybutnotnowatleast" ? {backgroundBlendMode: "difference", backgroundImage: `linear-gradient(-9deg, rgb(163 238 244) 5%, rgb(101 125 255) 43%, rgb(198 5 247 / 95%) 100%), url(data:image/png;base64,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)`}: {}} disableFocusRipple>
                    <span className={classes.innerToolbarTextWrapperContainer}>
                        <span className={classes.innerToolbarTextWrapper}>
                            <div className={classes.innerToolbarProgress}>
                                <LinearProgress
                                    color="primary"
                                    variant="determinate"
                                    aria-progressbar-name={"main-progressbar-left"}
                                    className={navigator.onLine ? classes.linearProgressVisible: classes.linearProgressVisibleOffline}
                                    value={100 - loaded_progress_percent}
                                    style={{transform: "rotate(-180deg)", webkitTransform: "rotate(-180deg)"}}/>
                                <LinearProgress
                                    color="primary"
                                    variant="determinate"
                                    aria-progressbar-name={"main-progressbar-right"}
                                    className={navigator.onLine ? classes.linearProgressVisible: classes.linearProgressVisibleOffline}
                                    value={100 - loaded_progress_percent} />
                            </div>
                            <span className={classes.innerToolbarText} style={pathname.includes("gallery") ? {width: "calc(100% - 36px)", overflow: "overlay"}: {}}>
                                {!_is_info_bar_active && <Fade in={know_if_logged}><a className={classes.link} onClick={() => {this._go_to(logged_account ? "/": "/")}}>{know_if_logged ? logged_account ? logged_account.name: t( "components.inner_toolbar.guest"): ""} </a></Fade>}
                                {!_is_info_bar_active && pathame_items}
                                {_is_info_bar_active && tip_items}
                            </span>
                        </span>
                    </span>
                </Button>
                <IconButton aria-label="main-account-button" style={pathname.includes("/pixel") ? {}: {display: "none"}} className={classes.infoIcon} onClick={this._toggle_info_bar_activation}>
                    {_is_info_bar_active ? <CloseIcon />: <InfoIcon />}
                </IconButton>
                <IconButton aria-label="current-page-options-button" style={pathname === "/" ? {}: {display: "none"}} className={classes.infoIcon} onClick={this._handle_music_enabled_switch_change}>
                    {music_enabled ? <VolumeOffIcon />: <VolumeUpIcon />}
                    {music_enabled ? <span className={classes.linkIcon}> RedEclipse - Ωst</span>: <span className={classes.linkIcon}> MUSIC?!</span>}
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(InnerToolbar);
