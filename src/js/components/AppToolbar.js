import React from "react";
import {Fade, withStyles} from "@material-ui/core";

import Lottie from "../components/Lottie";
import { t } from "../utils/t";

import {AppBar, Toolbar, Divider, SwipeableDrawer, ListItemIcon, ListItemText, IconButton, MenuItem, Menu, Tooltip} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import SecurityIcon from "@material-ui/icons/Security";

import api  from "../utils/api";
import { HISTORY } from "../utils/constants";
import InnerToolbar from "../components/InnerToolbar";
import DrawerContent from "../components/DrawerContent";
import actions from "../actions/utils";

import JamyAngry from "../icons/JamyAngry";
import JamyAnnoyed from "../icons/JamyAnnoyed";
import JamyFlirty from "../icons/JamyFlirty";
import JamyHappy from "../icons/JamyHappy";
import JamySad from "../icons/JamySad";
import JamyShocked from "../icons/JamyShocked";
import JamySuspicious from "../icons/JamySuspicious";

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        contain: "layout paint style",
        transform: "translateZ(0px)",
    },
    swipeableDrawer: {
        width: 256,
        flexShrink: 0,
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    drawerPaper: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        width: 256,
        backgroundSize: "calc(100% + 96px)",
        contain: "layout paint size style",
    },
    drawerButton: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    accountButton: {
        marginLeft: theme.spacing(1),
    },
    accountButtonHidden: {
        marginLeft: theme.spacing(1),
        opacity: 0
    },
    drawerToolbarSpacer: {
        minWidth: 256 - theme.spacing(2+2),
        height: 64,
        lineHeight: "64px",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
        marginRight: theme.spacing(1),
        cursor: "pointer",
        overflow: "hidden",
    },
    swipeableDrawerToolbar: {
        height: 64,
        lineHeight: "64px",
        marginRight: theme.spacing(1),
        cursor: "pointer"
    },
    appLogo: {
        verticalAlign: "middle",
        marginRight: theme.spacing(1)
    },
    appTitle: {
        verticalAlign: "middle",
        fontWeight: "bold",
        fontFamily: `"Jura"`,
        userSelect: "none",
    },
    swipeableDrawerAppTitle: {
        verticalAlign: "middle",
        fontWeight: "bold",
        fontFamily: `"Jura"`,
        userSelect: "none",
    },
    jamyContainer: {
        display: "initial",
        height: "calc(100% - 36px)",
        width: "auto",
    },
    jamy: {
        height: "calc(100% - 36px)",
        width: "auto",
        marginRight: theme.spacing(1),
        verticalAlign: "middle",
        animationFillMode: "both",
        animation: "$jamy",
        animationDuration: "24s",
        animationIterationCount: "infinite",
        "@global": {
            "@keyframes jamy": {
                "0%": {
                    transform: "translateY(0px)",
                },
                "48%": {
                    transform: "translateY(0px)",
                },
                "49%": {
                    transform: "translateY(-50px)",
                },
                "50%": {
                    transform: "translateY(-99999999999999999999999px)",
                },
                "51%": {
                    transform: "translateY(50px)",
                },
                "52%": {
                    transform: "translateY(0px)",
                },
                "100%": {
                    transform: "translateY(0px)",
                },
            }
        }
    },
    logo: {
        height: "calc(100% - 18px)",
        marginRight: theme.spacing(1),
        verticalAlign: "middle",
    },
    drawerPrivacyHint: {
        position: "fixed",
        bottom: 0,
        left: 0,
        padding: 8,
        color: "#fff",
        userSelect: "none",
        transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 700ms",
        opacity: .777,
        "& > p": {
            opacity: 0,
            transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 1750ms",
            fontWeight: "bold",
            paddingBottom: 12,
        }
    },
    drawerPrivacyHintHidden: {
        position: "fixed",
        bottom: 0,
        left: 0,
        padding: 8,
        color: "#fff",
        userSelect: "none",
        transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 700ms",
        opacity: 0,
        "& > p": {
            opacity: 0,
            transition: "opacity cubic-bezier(0.4, 0, 0.2, 1) 1750ms",
        }
    },
    presentation: {
        contain: "layout paint size style",
        contentVisibility: "auto",
        position: "fixed",
        bottom: 0,
        left: 0,
        padding: 0,
        margin: 0,
        width: 256,
        height: 256,
        "&::after": {
            content: "''",
            background: `${theme.palette.secondary.dark} !important`,
            position: "absolute",
            right: 0,
            top: 0,
            width: "25%",
            height: "15%"
        },
    },
    presentationInnerOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        padding: 0,
        margin: 0,
        width: 256,
        height: 256,
        "&::before": {
            content: "''",
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: 0,
            margin: 0,
            width: 256,
            height: 256,
            background: "linear-gradient(to top, #010310 5%, #01073057 15%, #0022ff14 25%, transparent)"
        }
    },
    donateButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        "&:hover, &": {
            backgroundColor: "#fabd28",
            color: "#0725b1",
            fontWeight: "bold",
        },
        margin: "0px 32px 64px 32px",
        width: "calc(100% - 64px)"
    }
});

class AppToolbar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            classes: props.classes,
            pathname: props.pathname,
            language: props.language,
            camo: props.camo,
            ret: props.ret,
            logged_account: props.logged_account,
            loaded_progress_percent: props.loaded_progress_percent,
            know_the_settings: props.know_the_settings,
            jamy_state_of_mind: props.jamy_state_of_mind,
            jamy_enabled: props.jamy_enabled,
            music_enabled: props.music_enabled,
            count_presentation_open: props.count_presentation_open,
            presentation_n: props.presentation_n,
            _history: HISTORY,
            _presentation_open: props.count_presentation_open > 0,
            _swipeable_app_drawer_open: false,
            _account_menu_anchor_element: null,
            _look_much_jamy: false,
            _look_very_much_jamy: false,
            _jamy_mouse_hover: false,
            _jamy_mouse_hover_click: 0,
            _click_much_jamy: false,
            _is_pre_reset: false,
            _explosion: null,
            _logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAXCAMAAABUMB2pAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUdwTM8gNGYm6NaEj+///IEMPZe2wwAAALELMsnk6OuhpA/ghUoGKbLt7/dRTgRMpCoBgwahkvPDxN3193CGk/rX1RYCK6HP3AjQ4rz/yZCgsNNpsAgAAAABdFJOUwBA5thmAAABFElEQVQoz4WTi26DMAxF40DsOGl4tmu7///Q2XltqoBdQZDg6PraMsZ0kcpcSb6D6oIjwn3jiRXzJxjh+BizBu/BAx0zosem5waKHVC0j7+Sku6Aohi5IdPILPX8ZzBa3u+5QZtAkktVsNot2TWu3YpFPnt5rUneO30sbG2cOwMs7wGql0JC0WK+1jhr9p0DZycxci5jSt4KJE5cFQJoJpcvudXGNCfuFE+ayDn10lKlOWNihQIHAEY1aKqTIGvtit2JcVBEWpfzdmvQYlfboTBNQ2nbkCB9pPR6IRYqfCP6yugg/4zcWsSCoTLQoI9tSiljmEudLBTd0xNxEKqEPtvMe0pDeuam6WrHteX/fgVz/rP8ADUeDr4tHJI9AAAAAElFTkSuQmCC"
        };
    };

    setSt4te(st4te, callback) {

        let keys = Object.keys(st4te);
        let keys_length = keys.length | 0;
        let key = "";

        for (let i = 0; (i|0) < (keys_length|0); i = (i+1|0)>>>0) {

            key = keys[i].toString();
            this.st4te[key] = st4te[key];
        }

        if(typeof callback === "function") {

            callback();
        }
    }

    componentDidMount() {

        this.setSt4te({
            _explosion: <Lottie
                onClick={this._exit_to_app}
                id={"explosion"}
                loop={true}
                autoplay={true}
                src="/src/js/notoemoji/lottie/1f4a5.json"
                style={{ transform: "translateZ(10px)", height: '150px', width: '150px', cursor: "pointer" }}/>
        });
        this._updated_dimensions();
        window.addEventListener("resize", this._updated_dimensions);
    }

    componentWillUnmount() {

        window.removeEventListener("resize", this._updated_dimensions);
    }

    _updated_dimensions = () => {

        let documentElement = document.documentElement,
            body = document.body || document.getElementsByTagName('body')[0],
            _window_width = window.innerWidth || documentElement.clientWidth || body.clientWidth,
            _window_height = window.innerHeight|| documentElement.clientHeight || body.clientHeight;

        const _less_than_960w = Boolean(_window_width < 960);
        const update = this.st4te._less_than_960w !== _less_than_960w;
        if(update){
            this.setSt4te({_less_than_960w}, () => {
                this.forceUpdate();
            })
        }
    }

    componentWillReceiveProps(new_props) {

        const reopen_presentation = this.st4te.count_presentation_open !== new_props.count_presentation_open && new_props.count_presentation_open > 0;
        const update = Boolean(
            new_props.pathname !== this.st4te.pathname ||
            new_props.language !== this.st4te.language ||
            new_props.know_the_settings !== this.st4te.know_the_settings ||
            new_props.jamy_state_of_mind !== this.st4te.jamy_state_of_mind ||
            new_props.jamy_enabled !== this.st4te.jamy_enabled ||
            new_props.music_enabled !== this.st4te.music_enabled ||
            new_props.presentation_n !== this.st4te.presentation_n ||
            reopen_presentation
        );

        this.setSt4te({...new_props, _presentation_open: (this.st4te._presentation_open || reopen_presentation), _swipeable_app_drawer_open: (this.st4te._swipeable_app_drawer_open || reopen_presentation)}, () => {

            if(update) {

                this.forceUpdate();
            }
        });
    }

    _handle_open_swipeable_app_drawer = () => {

        this.setSt4te({_swipeable_app_drawer_open: true}, ( ) => {

            this.forceUpdate();
        });
        actions.trigger_sfx("navigation_transition-left");
    };

    _handle_close_swipeable_app_drawer = () => {

        this.setSt4te({_swipeable_app_drawer_open: false, _presentation_open: false}, ( ) => {

            this.forceUpdate();
        });
        actions.trigger_sfx("navigation_transition-left");
    };

    _open_account_menu = (event) => {

        this.setSt4te({_account_menu_anchor_element: event.currentTarget}, ( ) => {

            this.forceUpdate();
        });
    };

    _close_account_menu = () => {

        this.setSt4te({_account_menu_anchor_element: null, _is_pre_reset: false}, ( ) => {

            this.forceUpdate();
        });
    };

    _open_home = () => {

        const { _history, jamy_enabled, pathname } = this.st4te;

        if(jamy_enabled && (pathname === "" || pathname === "/")){

            actions.trigger_presentation(navigator.onLine ? Math.round(Math.random()*11+3): 3);
        }else {

            _history.push("/");
        }
    };

    _open_settings = () => {

        window.dispatchEvent(new Event("menu-action-settings"));
        const { _history } = this.st4te;
        _history.push("/settings");
    };

    _exit_to_app = () => {

        api.reset_all_databases(function(){

            window.location.reload();
        });
    };

    _handle_jamy_mouse_enter = () => {

        this.setSt4te({_jamy_mouse_hover: true, _jamy_mouse_hover_click: 0, _look_much_jamy: false, _look_very_much_jamy: false, _click_much_jamy: false}, () => {

            setTimeout(() => {

                this._show_look_much_jamy();

            }, 8000);

            setTimeout(() => {

                this.setSt4te({_jamy_mouse_hover: false});

            }, 4000);
        });
    };

    _handle_jamy_mouse_leave = () => {

        this.setSt4te({_jamy_mouse_hover: false, _jamy_mouse_hover_click: 0, _look_much_jamy: false, _look_very_much_jamy: false, _click_much_jamy: false });
    };

    _show_look_much_jamy = () => {

        if(this.st4te._jamy_mouse_hover) {

            this.setSt4te({_look_much_jamy: true}, () => {

                actions.jamy_update("suspicious", 7000);
                actions.trigger_snackbar(t( "sentences.the longer you look the shiner i get"));
                setTimeout(() => {

                    if(this.st4te._jamy_mouse_hover) {

                        this.setSt4te({_look_very_much_jamy: true}, () => {

                            actions.jamy_update("happy", 4000);
                            actions.trigger_snackbar(t( "sentences.take a picture it last longer"));
                        });
                    }
                }, 7100);

                setTimeout(() => {

                    this.setSt4te({_jamy_mouse_hover: false});

                }, 4000);

            });
        }
    };

    _show_click_much_jamy = () => {

        if(this.st4te._jamy_mouse_hover) {

            this.setSt4te({_click_much_jamy: true}, () => {

                actions.jamy_update("angry", 6000);
                actions.trigger_snackbar(t( "sentences.stop bitchslapping me"));
                setTimeout(() => {

                    this.setSt4te({_click_much_jamy: false});
                }, 6000);
            });
        }
    };

    _handle_jamy_mouse_click = () => {

        const click = this.st4te._jamy_mouse_hover_click + 1;
        this.setSt4te({_jamy_mouse_hover_click: click});

        if(click >= 16 && this.st4te._jamy_mouse_hover) {

            this._show_click_much_jamy();
        }
    };

    _pre_reset_toggle = () => {

        this.setSt4te({_is_pre_reset: !this.st4te._is_pre_reset}, () => {

            this.forceUpdate();
        });
    };

    _resume_video = () => {

        this.setSt4te({_presentation_open: true}, () => {

            this.forceUpdate(() => {

                var video = document.getElementById("presentation-video");
                video.play();
            });
        });
    };

    _resume_video2 = () => {

        this.setSt4te({_presentation_open: true}, () => {

            this.forceUpdate(() => {

                var video = document.getElementById("presentation-video-2");
                video.play();
            });
        });
    };

    render() {

        const { classes, ret, camo, _logo, _is_pre_reset, presentation_n, _presentation_open, pathname, language, loaded_progress_percent, know_the_settings, _less_than_960w, _swipeable_app_drawer_open, _account_menu_anchor_element, logged_account, jamy_state_of_mind, jamy_enabled, music_enabled, _explosion , _jamy_mouse_hover} = this.st4te;

        const JAMY = {
            angry: <JamyAngry className={classes.jamy} />,
            annoyed: <JamyAnnoyed className={classes.jamy} />,
            flirty: <JamyFlirty className={classes.jamy} />,
            happy: <JamyHappy className={classes.jamy} />,
            sad: <JamySad className={classes.jamy} />,
            shocked: <JamyShocked className={classes.jamy} />,
            suspicious: <JamySuspicious className={classes.jamy} />,
        }

        var bottom_el = null;
        switch(presentation_n) {

            case 1:
                bottom_el = _presentation_open && <div className={classes.presentation} onClick={this._resume_video}>
                    <video id="presentation-video" width="256" height="256" style={{aspectRatio: "1", transform: "translateZ(10px)"}} autoPlay>
                        <source src="/src/videos/presentation.mp4" type="video/mp4"/>
                    </video>
                    <div className={classes.presentationInnerOverlay + " arrival "}></div>
                </div>; break;
            case 2:
                bottom_el =  _presentation_open && <div className={classes.presentation} onClick={this._resume_video2}>
                    <video id="presentation-video" width="256" height="256" autoPlay style={{aspectRatio: "1", transform: "translateZ(10px)"}}>
                        <source src="/src/videos/presentation2.mp4" type="video/mp4"/>
                    </video>
                    <div className={classes.presentationInnerOverlay + " arrival "}></div>
                </div>; break;
            default:
                bottom_el = presentation_n >= 3 && presentation_n <= 13 ?
                    _presentation_open && <div className={classes.presentation} onClick={this._resume_video2}>
                        <video id="presentation-video" width="256" height="256" autoPlay style={{aspectRatio: "1", transform: "translateZ(10px)"}}>
                            <source src={"/src/videos/joke"+(presentation_n-2)+".mp4"} type="video/mp4"/>
                        </video>
                        <div className={classes.presentationInnerOverlay + " arrival "}></div>
                        _presentation_open && </div>:
                    <Fade in={true} timeout={600}>
                        <div className={classes.drawerPrivacyHint}>
                            <h4 style={{color: "#ffffffff", marginBottom: 0}}>Give them a mask and they're being starting to speak the truth...</h4>
                        </div>
                    </Fade>
        }

        return (
            <div>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.drawerButton} color="inherit" aria-label="menu" onClick={this._handle_open_swipeable_app_drawer}>
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.drawerToolbarSpacer} onClick={this._open_home}>
                            {
                                know_the_settings ?
                                    jamy_enabled ?
                                        <div className={classes.jamyContainer}
                                            onMouseEnter={this._handle_jamy_mouse_enter}
                                            onMouseLeave={this._handle_jamy_mouse_leave}
                                            onClick={this._handle_jamy_mouse_click}>
                                            <Tooltip
                                                title={t( "sentences.hey i am jamy")}
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                placement="right"
                                                open={_jamy_mouse_hover}>
                                                <div className={classes.jamyContainer}>
                                                    {JAMY[jamy_state_of_mind]}
                                                </div>
                                            </Tooltip>
                                        </div>:
                                        <img src={_logo} className={"pixelated " + classes.logo} />
                                    : null
                            }
                            <span className={classes.appTitle}>PIXA.PICS</span>
                        </div>
                        <InnerToolbar ret={ret} camo={camo} know_if_logged={true} music_enabled={music_enabled} logged_account={logged_account} pathname={pathname} loaded_progress_percent={loaded_progress_percent}/>
                        <IconButton className={classes.accountButton}
                                    edge="end"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={this._open_account_menu}>
                            <AccountCircleIcon/>
                        </IconButton>
                        <Menu anchorEl={_account_menu_anchor_element}
                            anchorOrigin={{ vertical: "top", horizontal: "right"}}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "right",}}
                            open={Boolean(_account_menu_anchor_element)}
                            onClose={this._close_account_menu} >
                            <MenuItem onClick={this._open_settings}>
                                <ListItemIcon>
                                    <SettingsIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={t( "words.settings", {FLC: true})}/>
                            </MenuItem>
                            <div>
                                <Divider />
                                {_is_pre_reset ? _explosion: null}
                                {_is_pre_reset ? <Divider />: null}
                                <MenuItem onClick={this._pre_reset_toggle}>
                                    <ListItemIcon>
                                        <SecurityIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={_is_pre_reset ?  t( "words.cancel", {TUC: true}): t( "words.reset", {TUC: true})}/>
                                </MenuItem>
                            </div>
                        </Menu>
                    </Toolbar>
                </AppBar>
                {_less_than_960w && <SwipeableDrawer
                    keepMounted={true}
                    disablePortal={true}
                    transitionDuration={{enter: 125, exit: 75}}
                    anchor="left"
                    classes={{root: classes.swipeableDrawer, paper: classes.drawerPaper}}
                    open={_swipeable_app_drawer_open || _presentation_open}
                    onOpen={this._handle_open_swipeable_app_drawer}
                    onClose={this._handle_close_swipeable_app_drawer}>
                    <Toolbar className={classes.appBar}>
                        <div className={classes.swipeableDrawerToolbar} onClick={this._open_home}>
                            <div className={classes.drawerToolbarSpacer} onClick={this._open_home}>
                                <span className={classes.appTitle}>PIXA.PICS</span>
                            </div>
                            {
                                jamy_enabled ?
                                    <div className={classes.jamyContainer}
                                         onMouseEnter={this._handle_jamy_mouse_enter}
                                         onMouseLeave={this._handle_jamy_mouse_leave}
                                         onClick={this._handle_jamy_mouse_click}>
                                        <Tooltip
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            placement="right"
                                            open={_jamy_mouse_hover}
                                            title={t( "sentences.hey i am jamy")}>
                                            <div className={classes.jamyContainer}>
                                                {JAMY[jamy_state_of_mind]}
                                            </div>
                                        </Tooltip>
                                    </div>:
                                    <img src={_logo} className={"pixelated " + classes.logo} />
                            }
                            <span className={classes.swipeableDrawerAppTitle}>HTTPS://PIXA.PICS/</span>
                        </div>
                    </Toolbar>
                    <DrawerContent logged_account={logged_account} language={language}/>
                    { _presentation_open ?
                        bottom_el:
                        <div className={_swipeable_app_drawer_open ? classes.drawerPrivacyHint: classes.drawerPrivacyHintHidden}>
                            <h4 style={{color: "#ffffffff", marginBottom: 0}}>Give them a mask and they're being starting to speak the truth...</h4>
                        </div>
                    }
                </SwipeableDrawer>}
            </div>
        );
    }
}

export default withStyles(styles)(AppToolbar);
