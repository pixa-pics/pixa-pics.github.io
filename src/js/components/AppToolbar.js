import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { t } from "../utils/t";

import {Fade, AppBar, Toolbar, Divider, SwipeableDrawer, ListItemIcon, ListItemText, IconButton, MenuItem, Menu, Tooltip} from "@material-ui/core";

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
        zIndex: theme.zIndex.drawer + 1
    },
    swipeableDrawer: {
        width: 256,
        flexShrink: 0,
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    drawerPaper: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        width: 256
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
        fontFamily: `"Share Tech Mono"`,
        userSelect: "none",
    },
    swipeableDrawerAppTitle: {
        verticalAlign: "middle",
        fontWeight: "bold",
        fontFamily: `"Share Tech Mono"`,
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
    }
});

class AppToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            pathname: props.pathname,
            panic_mode: props.panic_mode,
            logged_account: props.logged_account,
            loaded_progress_percent: props.loaded_progress_percent,
            know_the_settings: props.know_the_settings,
            jamy_state_of_mind: props.jamy_state_of_mind,
            jamy_enabled: props.jamy_enabled,
            _history: HISTORY,
            _swipeable_app_drawer_open: false,
            _account_menu_anchor_element: null,
            _look_much_jamy: false,
            _look_very_much_jamy: false,
            _jamy_mouse_hover: false,
            _jamy_mouse_hover_click: 0,
            _click_much_jamy: false
        };
    };

    componentWillReceiveProps(new_props) {

        this.setState({...new_props});
    }

    _handle_open_swipeable_app_drawer = () => {
        
        this.setState({_swipeable_app_drawer_open: true});
        actions.trigger_sfx("navigation_transition-left");
    };

    _handle_close_swipeable_app_drawer = () => {

        this.setState({_swipeable_app_drawer_open: false});
        actions.trigger_sfx("navigation_transition-left");
    };

    _open_account_menu = (event) => {
      
        this.setState({_account_menu_anchor_element: event.currentTarget});
    };

    _close_account_menu = () => {

        this.setState({_account_menu_anchor_element: null});
    };

    _open_home = () => {

        const { _history } = this.state;
        _history.push("/");
    };

    _open_settings = () => {

        const { _history } = this.state;
        _history.push("/settings");
    };

    _exit_to_app = () => {

        api.reset_all_databases(function(){

            window.location.reload();
        });
    };

    _handle_jamy_mouse_enter = () => {

        this.setState({_jamy_mouse_hover: true, _jamy_mouse_hover_click: 0, _look_much_jamy: false, _look_very_much_jamy: false, _click_much_jamy: false}, () => {

            setTimeout(() => {

                this._show_look_much_jamy();

            }, 8000);
        });
    };

    _handle_jamy_mouse_leave = () => {

        this.setState({_jamy_mouse_hover: false, _jamy_mouse_hover_click: 0, _look_much_jamy: false, _look_very_much_jamy: false, _click_much_jamy: false });
    };

    _show_look_much_jamy = () => {

        if(this.state._jamy_mouse_hover) {

            this.setState({_look_much_jamy: true}, () => {

                actions.jamy_update("suspicious", 7000);
                actions.trigger_snackbar(t( "sentences.the longer you look the shiner i get"));
                setTimeout(() => {

                    if(this.state._jamy_mouse_hover) {

                        this.setState({_look_very_much_jamy: true}, () => {

                            actions.jamy_update("happy", 4000);
                            actions.trigger_snackbar(t( "sentences.take a picture it last longer"));
                        });
                    }

                }, 7100)
            });
        }
    };

    _show_click_much_jamy = () => {

        if(this.state._jamy_mouse_hover) {

            this.setState({_click_much_jamy: true}, () => {

                actions.jamy_update("angry", 6000);
                actions.trigger_snackbar(t( "sentences.stop bitchslapping me"));
                setTimeout(() => {

                    this.setState({_click_much_jamy: false});
                }, 6000)
            });
        }
    };

    _handle_jamy_mouse_click = () => {

        const click = this.state._jamy_mouse_hover_click + 1;
        this.setState({_jamy_mouse_hover_click: click});

        if(click >= 16 && this.state._jamy_mouse_hover) {

            this._show_click_much_jamy();
        }
    };

    render() {

        const { classes, pathname, loaded_progress_percent, know_the_settings, _swipeable_app_drawer_open, _account_menu_anchor_element, logged_account, jamy_state_of_mind, jamy_enabled } = this.state;

        const JAMY = {
            angry: <JamyAngry className={classes.jamy} />,
            annoyed: <JamyAnnoyed className={classes.jamy} />,
            flirty: <JamyFlirty className={classes.jamy} />,
            happy: <JamyHappy className={classes.jamy} />,
            sad: <JamySad className={classes.jamy} />,
            shocked: <JamyShocked className={classes.jamy} />,
            suspicious: <JamySuspicious className={classes.jamy} />,
        }

        return (
            <div>

                <SwipeableDrawer
                    keepMounted={true}
                    anchor="left"
                    className={classes.swipeableDrawer}
                    classes={{paper: classes.drawerPaper}}
                    open={_swipeable_app_drawer_open}
                    onOpen={this._handle_open_swipeable_app_drawer}
                    onClose={this._handle_close_swipeable_app_drawer}>
                        <Toolbar className={classes.appBar}>
                            <div className={classes.swipeableDrawerToolbar} onClick={this._open_home}>
                                <span className={classes.swipeableDrawerAppTitle}>PIXA.PICS</span>
                            </div>
                        </Toolbar>
                        <DrawerContent logged_account={logged_account} pathname={pathname} onClose={this._handle_close_swipeable_app_drawer}/>
                </SwipeableDrawer>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.drawerButton} color="inherit" aria-label="menu" onClick={this._handle_open_swipeable_app_drawer}>
                            <MenuIcon />
                        </IconButton>
                        <Fade in={know_the_settings}>
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
                                                    aria-label="Jamy">
                                                    <div className={classes.jamyContainer}>
                                                        {JAMY[jamy_state_of_mind]}
                                                    </div>
                                                </Tooltip>
                                            </div>:
                                            <img src={"/src/images/logo-transparent.png"} className={classes.logo} />
                                        : null
                                }
                                <span className={classes.appTitle}>PIXA.PICS</span>
                            </div>
                        </Fade>
                        <InnerToolbar know_if_logged={true} logged_account={logged_account} pathname={pathname} loaded_progress_percent={loaded_progress_percent}/>
                        <Fade in>
                            <IconButton className={classes.accountButton}
                                        edge="end"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={this._open_account_menu}>
                                <AccountCircleIcon/>
                            </IconButton>
                        </Fade>
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
                                <MenuItem onClick={this._exit_to_app}>
                                    <ListItemIcon>
                                        <SecurityIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={t( "words.reset", {TUC: true})}/>
                                </MenuItem>
                            </div>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(AppToolbar);
