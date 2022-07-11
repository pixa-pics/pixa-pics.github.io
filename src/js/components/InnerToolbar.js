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

const styles = theme => ({
    "@keyframes innerToolbarCyberPunkAnimation": {
        "0%": { opacity: "1", transform: "translateX(-20%)"},
        "100%": { opacity: "1", transform: "translateX(70%)"}
    },
    root: {
        display: "flex",
        position: "relative",
        width: "100%",
    },
    innerToolbar: {
        contain: "size style layout paint",
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
        boxShadow: "inset 0px 0px 12px #00185d, inset 0px 0px 24px #1a43bb",
        backgroundColor: theme.palette.secondary.main, // #030435
        backgroundPosition: `${parseInt(Math.random() * 100)}% ${parseInt(Math.random() * 100)}%`,
        backgroundSize: "auto 175%",
        "&:hover": {
            backgroundColor: theme.palette.secondary.lighter,
        },
        color: "#d7dbff",
        "&::before": {
            display: "inline-block",
            top: 0,
            left: 0,
            "content": "\"\"",
            position: "absolute",
            contain: "size style paint layout",
            contentVisibility: "auto",
            height: 40,
            width: "60%",
            background: "linear-gradient(to right, transparent, rgb(155 163 220 / 44%), transparent)",
            animation: "$innerToolbarCyberPunkAnimation 7.7s linear alternate infinite 200ms",
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
            background: "linear-gradient(90deg, #0056ce 0%, #0056ce 100%)",
            zIndex: -1,
        },
        zIndex: 1,
        marginBottom: -2,
        height: 2,
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
    ret: {
        maxHeight: "1em",
        marginLeft: "1em",
        marginRight: "1em",
        verticalAlign: "middle",
        transform: "scale(2)"
    }
});

class InnerToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pathname: props.pathname,
            camo: props.camo,
            ret: props.ret,
            logged_account: props.logged_account,
            know_if_logged: props.know_if_logged,
            loaded_progress_percent: props.loaded_progress_percent,
            music_enabled: props.music_enabled,
            classes: props.classes,
            _is_info_bar_active: false,
            _history: HISTORY,
            _rets: [""],
            _cams: [""],
        };
    };

    componentDidMount() {

        this._load_accessories();
    }

    _load_accessories = () => {

        if(this.state.ret >= 1 || this.state.camo >= 1) {

            import("../utils/custom_toolbar").then(({RETS, CAMS}) => {

                this.setState({_rets: RETS, _cams: CAMS});
            });
        };

    }

    componentWillReceiveProps(new_props) {

        const state = {
            ...new_props,
            _is_info_bar_active: new_props.pathname.includes("pixel") ? this.state._is_info_bar_active: false
        };

        this.setState(state, () => {

            this._load_accessories();
        });
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

    _trigger_canvas_action = (name) => {

        actions.trigger_canvas_action(name);
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

        let { _cams, camo, _rets, ret } = this.state;
        _cams = _cams || [""];
        _rets = _rets || [""];
        camo = camo || 0;
        ret = ret || 0;

        const ret_e = Boolean(parseInt(ret) > 0 && parseInt(ret) < _rets.length) ? <img className={classes.ret} src={_rets[parseInt(ret)]}/>: null;


        let pathname_splitted = pathname.split("/");
        pathname_splitted.shift();

        const pathame_items = pathname_splitted.map((element, index, array) => {

            let link_to = "/";
            for (let i = 0; i <= index; i++) {

                link_to += array[i] + (i === index ? "": "/");
            }


            return element === "" ? null: <Fade in={know_if_logged}  key={index}><a key={index} onClick={() => {this._go_to(link_to)}} className={classes.link} >&nbsp;►&nbsp;{element}</a></Fade>;
        });

        const usrnm = (know_if_logged ? logged_account ? logged_account.name: t( "components.inner_toolbar.guest"): "");

        const tip_items = [
            <Fade in={true}><a key="tip-legend" onClick={() => {this._trigger_tip(`We know it musts be working as intended, tips are in chronological order while asterisks means mandatory for completion.`)}} className={classes.link}>&nbsp;0-5&nbsp;STEPS&nbsp;›&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-contrast" onClick={() => {this._trigger_canvas_action("contrast")}} className={classes.link}>&nbsp;1)&nbsp;Contrasts&nbsp;→&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-colors" onClick={() => {this._trigger_canvas_action("palette")}} className={classes.link}>&nbsp;2)&nbsp;Palette*&nbsp;→&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-smooth" onClick={() => {this._trigger_canvas_action("smooth")}} className={classes.link}>&nbsp;3)&nbsp;Smooth&nbsp;→&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-filters" onClick={() => {this._trigger_canvas_action("filter")}} className={classes.link}>&nbsp;4)&nbsp;Filters&nbsp;→&nbsp;</a></Fade>,
            <Fade in={true}><a key="tip-export" onClick={() => {this._trigger_canvas_action("render")}} className={classes.link}>&nbsp;5)&nbsp;Render*&nbsp;</a></Fade>,
        ];

        return (
            <div className={classes.root}>
                <Button className={classes.innerToolbar} style={Boolean(parseInt(camo) > 0 && parseInt(camo) < _cams.length) ? {backgroundImage: `url("${_cams[parseInt(camo)]}")`}: {}} disableFocusRipple>
                    <span className={classes.innerToolbarTextWrapperContainer}>
                        <span className={classes.innerToolbarTextWrapper}>
                            <div className={classes.innerToolbarProgress}>
                                <LinearProgress
                                    color="primary"
                                    variant="determinate"
                                    role="progressbar" aria-valuenow={loaded_progress_percent} aria-valuemin="0" aria-valuemax="100"
                                    aria-label={"main-progressbar-left"}
                                    className={navigator.onLine ? classes.linearProgressVisible: classes.linearProgressVisibleOffline}
                                    value={100 - loaded_progress_percent}
                                    style={{transform: "rotate(-180deg)", WebkitTransform: "rotate(-180deg)"}}/>
                                <LinearProgress
                                    color="primary"
                                    variant="determinate"
                                    role="progressbar" aria-valuenow={loaded_progress_percent} aria-valuemin="0" aria-valuemax="100"
                                    aria-label={"main-progressbar-right"}
                                    className={navigator.onLine ? classes.linearProgressVisible: classes.linearProgressVisibleOffline}
                                    value={100 - loaded_progress_percent} />
                            </div>
                            <span className={classes.innerToolbarText} style={pathname.includes("gallery") ? {width: "calc(100% - 36px)", overflow: "overlay"}: {}}>
                                {!_is_info_bar_active && <Fade in={know_if_logged}><a className={classes.link} onClick={() => {this._go_to(logged_account ? "/": "/")}}>{(usrnm ? ret_e: null)}{usrnm}</a></Fade>}
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
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(InnerToolbar);
