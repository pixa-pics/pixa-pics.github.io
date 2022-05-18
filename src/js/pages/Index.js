import React, { Suspense } from "react";
import { withStyles } from "@material-ui/core";

import {Snackbar, CssBaseline, IconButton, Toolbar} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import AppToolbar from "../components/AppToolbar";
import AppDrawer from "../components/AppDrawer";

import dispatcher from "../dispatcher";
import actions from "../actions/utils";

import Home from "./Home";
import Settings from "./Settings";
import Unknown from "./Unknown";
const Pixel = React.lazy(() => import("../pages/Pixel"));


const PAGE_COMPONENTS = (name, pathname, lc = "en_US") => {

    switch (name) {
        case "home":
            return <Home lc={lc} />;
        case "pixel":
            return <Suspense fallback={<div/>}><Pixel /></Suspense>;
        case "unknown":
            return <Unknown />;
        case "settings":
            return <Settings />;
    }
};

import JamyAngry from "../icons/JamyAngry";
import JamyAnnoyed from "../icons/JamyAnnoyed";
import JamyFlirty from "../icons/JamyFlirty";
import JamyHappy from "../icons/JamyHappy";
import JamySad from "../icons/JamySad";
import JamyShocked from "../icons/JamyShocked";
import JamySuspicious from "../icons/JamySuspicious";

import api from "../utils/api";
import sound_api from "../utils/sound-api";
import { update_meta_title } from "../utils/meta-tags";
import { PAGE_ROUTES, HISTORY } from "../utils/constants";
import ShareDialog from "../components/ShareDialog";

const styles = theme => ({
    root: {
        overflow: "overlay",
        height: "100%",
        width: "100vw",
    },
    carouselImage: {
        padding: 32,
        maxWidth: "100%",
    },
    content: {
        position: "relative",
        contain: "size paint style layout",
        width: "calc(100% - 256px)",
        marginLeft: 256,
        height: "calc(100% - 64px)",
        [theme.breakpoints.down("xs")]: {
            height: "calc(100% - 56px)",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginLeft: 0,
        }
    },
    snackbar: {
        "& .MuiSnackbarContent-root	": {
            backgroundColor: theme.palette.primary.actionDarker,
            zIndex: "9630 !important"
        }
    },
    snackbarSuccess: {
        "& .MuiSnackbarContent-root	": {
            backgroundColor: "#06230e"
        }
    },
    snackbarWarning: {
        "& .MuiSnackbarContent-root	": {
            backgroundColor: "#202306"
        }
    },
    snackbarError: {
        "& .MuiSnackbarContent-root	": {
            backgroundColor: "#230606"
        }
    },
    jamyContainer: {
        display: "initial",
        height: "auto",
        width: "auto",
    },
    jamy: {
        height: 24,
        width: "auto",
        marginRight: 12,
        verticalAlign: "middle",
    },
});

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            _history: props.history,
            pathname: props.history.location.pathname,
            _intervals: [],
            _jamy_state_of_mind: "shocked",
            _unlisten: null,
            _language: null,
            _logged_account: null,
            _snackbar_open: false,
            _snackbar_message: "",
            _snackbar_auto_hide_duration: 1975,
            _sfx_enabled: true,
            _music_enabled: false,
            _jamy_enabled: true,
            _vocal_enabled: false,
            _onboarding_enabled: false,
            _onboarding_autoplay_enabled: true,
            _onboarding_showed_once_in_session: false,
            _selected_locales_code: null,
            _selected_currency: null,
            _know_if_logged: false,
            _loaded_progress_percent: 100,
            _know_the_settings: false,
            /*is_online: true,*/
            classes: props.classes,
            _width: 0,
            _height: 0,
            _database_attempt: 0,
            _is_share_dialog_open: false,
            _has_played_index_music_counter: 0,
        };
    };
    
    componentWillReceiveProps(new_props) {

        const new_pathname = new_props.history.location.pathname;
        const old_pathname = this.state.pathname;

        if(old_pathname !== new_pathname) {

            this._set_new_pathname_or_redirect(new_pathname);
        }
    }

    _update_dimensions = () => {

        let w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            _width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            _height = w.innerHeight|| documentElement.clientHeight || body.clientHeight;

        this.setState({_width, _height});
    };

    componentDidMount() {

        this.state._history.listen((location, action) => {
            // location is an object like window.location
            this._set_new_pathname_or_redirect(location.location.pathname);
        });
        this._update_settings();
        dispatcher.register(this._handle_events.bind(this));
        window.addEventListener("resize", this._update_dimensions);
        this._update_dimensions();

        /*setInterval(() => {

            const { is_online } = this.state;
            if(navigator.onLine !== is_online){

                this.setState({is_online: navigator.onLine});
                actions.trigger_snackbar(
            navigator.onLine ? t("sentences.online"): t("sentences.offline"),
                    navigator.onLine ? 3500: 10500
                );
                actions.jamy_update(navigator.onLine ? "happy": "sad");
            }
        }, 1000);*/

        // Make Jamy blink every 32 sec in average.
        let intervals = [];

        const interval = setInterval(() => {

            if(!Math.floor(Math.random() * 32)) {

                const { _jamy_state_of_mind } = this.state;

                this.setState({_jamy_state_of_mind: "suspicious"}, () => {

                    setTimeout(() => {

                        if(this.state._jamy_state_of_mind === "suspicious") {

                            this.setState({_jamy_state_of_mind});
                        }

                    }, 75);

                });

            }

        }, 1000);

        intervals.push(interval);
        this.setState({_intervals: intervals});
    }

    componentWillUnmount() {

        this.state._intervals.forEach((itrvl) => {

            clearInterval(itrvl);
        });
        window.removeEventListener("resize", this._update_dimensions);
    }

    _trigger_sound = (category, pack, name, volume, global) => {

        sound_api.play_sound(category, pack, name, volume, global);
    };


    _stop_sound = () => {

        sound_api.stop_sound();
    };

    _handle_events(event) {

        const { _sfx_enabled, _music_enabled } = this.state;
        let global = null;

        // Make different actions send from a dispatcher bounded to this function
        switch(event.type) {

            case "TRIGGER_SFX":
                global = false;
                if(_sfx_enabled) { this._trigger_sound("sfx", event.data.pack, event.data.name, event.data.volume, global); }
                break;

            case "TRIGGER_MUSIC":
                global = true;
                if(_music_enabled) { this._trigger_sound("music", event.data.pack, event.data.name, event.data.volume, global); }
                break;

            case "STOP_SOUND":
                this._stop_sound();
                break;

            case "TRIGGER_SHARE":
                this._handle_share_dialog_open();
                break;

            case "SNACKBAR":
                this._trigger_snackbar(event.data.message, event.data.auto_hide_duration);
                break;

            case "JAMY_UPDATE":
                this._update_jamy(event.data.state_of_mind, event.data.duration);
                break;

            case "SETTINGS_UPDATE":
                this._update_settings();
                break;

            case "LOADING_UPDATE":
                this.setState({_loaded_progress_percent: event.data.percent});
                break;
        }
    }

    _process_settings_query_result = (error, settings) => {

        if(!error && typeof settings !== "undefined") {

            const was_music_enabled = Boolean(this.state._music_enabled);
            // Set new settings from query result
            const _sfx_enabled = typeof settings.sfx_enabled !== "undefined" ? settings.sfx_enabled: true;
            const _music_enabled = typeof settings.music_enabled !== "undefined" ? settings.music_enabled: false;
            const _jamy_enabled = typeof settings.jamy_enabled !== "undefined" ? settings.jamy_enabled: true;
            const _selected_locales_code =  typeof settings.locales !== "undefined" ? settings.locales: "en-US";
            const _language = _selected_locales_code.split("-")[0];
            const _selected_currency = typeof settings.currency !== "undefined" ? settings.currency: "USD";
            const _onboarding_enabled = typeof settings.onboarding !== "undefined" ? settings.onboarding: true;

            document.documentElement.lang = _language;
            document.body.setAttribute("style", "");
            this.setState({ _onboarding_enabled, _sfx_enabled, _music_enabled, _jamy_enabled, _selected_locales_code, _language, _selected_currency, _know_the_settings: true, _has_played_index_music_counter: parseInt((!this.state._know_the_settings && _music_enabled) ? 1: this.state._has_played_index_music_counter )});

            setTimeout(async() => {

                if(_music_enabled === true && was_music_enabled === false) {

                    this._should_play_music_pathname(this.state.pathname);
                }
            }, 125);

        }else {

            if(this.state._database_attempt > 3) {

                api.reset_all_databases(function(){

                    window.location.reload();
                });
            }else {

                setTimeout(() => {

                    this.setState({_database_attempt: this.state._database_attempt + 1}, () => {

                        this._update_settings();
                    });
                }, 150);
            }
        }
    };

    _update_settings = () => {

        // Call the api to get results of current settings and send it to a callback function
        api.get_settings(this._process_settings_query_result);
    };

    _set_new_pathname_or_redirect = (new_pathname) => {
        
        const { _history } = this.state;

        if(new_pathname === "/index.html") {

            _history.push("/");
        }else {

            // Set pathname
            this.setState({pathname: new_pathname});

            setTimeout(async() => {

                this._should_play_music_pathname(this.state.pathname);
            }, 125);

            // set meta title
            this._set_meta_title(new_pathname);
            actions.trigger_sfx("navigation_transition-right", .25);
        }
    };

    _should_play_music_pathname = (pathname = "") => {

        const { _music_enabled } = this.state;
        if(_music_enabled && pathname.match(/\/$/)) {

            const { _has_played_index_music_counter } = this.state;
            actions.trigger_music(`track_${Boolean(navigator.onLine && _has_played_index_music_counter > 0) ? Math.ceil(Math.random() * 12).toString(10).padStart(2, "0"): "09"}`);

            setTimeout(async() => {

                const { pathname } = this.state;
                if(_music_enabled && pathname.match(/\/$/)) {

                    actions.trigger_snackbar("I play music from an open-source game soundtrack https://www.redeclipse.net/ for you. Ho my little diddy you could give a look at what they've done.", 4000)
                }
            }, 6000);
            this.setState({_has_played_index_music_counter: _has_played_index_music_counter+1})
        }else if(_music_enabled && pathname.match(/\/(pixel)$/)) {

            actions.trigger_music(`Tesla_Numbers_15m_session`, 1, "tesla");

            setTimeout(async() => {

                const { pathname } = this.state;
                if(_music_enabled && pathname.match(/\/(pixel)$/)) {

                    actions.trigger_snackbar("I play music from the generously visionary creator of mine, the one, the (no-emoji) only, Nikola Tesla, bringing the dangerous AC to the whole earth!", 4000)
                }
            }, 9000);

        }else {

            actions.stop_sound();
        }

    };

    _set_meta_title = (pathname) => {

        pathname = pathname.replace("/", "").replace(/\//g, " > ");
        update_meta_title("PIXA | " + pathname);
    };

    _update_jamy = (state_of_mind, duration) => {

        this.setState({_jamy_state_of_mind: state_of_mind}, () => {

            setTimeout(() => {

                this.setState({_jamy_state_of_mind: "shocked"}, () => {

                    setTimeout(() => {

                        this.setState({_jamy_state_of_mind: "suspicious"}, () => {

                            setTimeout(() => {

                                this.setState({_jamy_state_of_mind: "shocked"});

                            }, 75);

                        });

                    }, 750);

                });
            }, duration);
        });
    }

    _trigger_snackbar = (_snackbar_message, _snackbar_auto_hide_duration) => {

        const { _snackbar_open } = this.state;

        if(_snackbar_open) {

            this.setState({_snackbar_open: false}, () => {

                setTimeout(() => {

                    this.setState({_snackbar_message, _snackbar_auto_hide_duration, _snackbar_open: true});
                }, 500);
            });
        }else {

            this.setState({_snackbar_message, _snackbar_auto_hide_duration, _snackbar_open: true});
        }
    };

    _close_snackbar = (event, reason) => {

        if (reason === "clickaway") {
            return;
        }

        this.setState({_snackbar_open: false});
    };

    shouldComponentUpdate() {

        return true;
    }

    _handle_share_dialog_close = () => {

        this.setState({_is_share_dialog_open: false});
        actions.trigger_sfx("state-change_confirm-down");
        actions.jamy_update("suspicious");
    };

    _handle_share_dialog_open = () => {

        this.setState({_is_share_dialog_open: true});
        actions.trigger_sfx("hero_decorative-celebration-02");
        actions.jamy_update("happy");
    };

    render() {

        const { pathname, classes, _selected_locales_code } = this.state;
        const { _snackbar_open, _snackbar_message, _snackbar_auto_hide_duration } = this.state;
        const { _language, _is_share_dialog_open } = this.state;
        const { _logged_account, _know_if_logged, _loaded_progress_percent, _know_the_settings, _jamy_state_of_mind, _jamy_enabled, _music_enabled } = this.state;

        const JAMY = {
            angry: <JamyAngry className={classes.jamy} />,
            annoyed: <JamyAnnoyed className={classes.jamy} />,
            flirty: <JamyFlirty className={classes.jamy} />,
            happy: <JamyHappy className={classes.jamy} />,
            sad: <JamySad className={classes.jamy} />,
            shocked: <JamyShocked className={classes.jamy} />,
            suspicious: <JamySuspicious className={classes.jamy} />,
        }

        // This is the custom router
        let page_component = null;
        let page_name = "";

        for(let i = 0; i < PAGE_ROUTES.length; i++) {

            const page_route = PAGE_ROUTES[i];

            if(pathname.match(page_route.page_regex)){

                page_name = page_route.page_name;
                page_component = PAGE_COMPONENTS(page_name, pathname, (_selected_locales_code || "en-US").split("-")[1]);
            }
        }

        if(!_language) {

            return null;
        }

        return (
            <div>
                <div className={classes.root}>
                    <CssBaseline />
                    <Snackbar
                        className={classes.snackbar}
                        open={_snackbar_open}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        message={<div>
                            {_jamy_enabled ? <span className={classes.jamyContainer}>{JAMY[_jamy_state_of_mind]}</span>: null}
                            <span>{_snackbar_message.toString()}</span>
                        </div>}
                        action={
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this._close_snackbar}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                        autoHideDuration={_snackbar_auto_hide_duration}
                        onClose={this._close_snackbar}
                    />
                    <AppToolbar
                        loaded_progress_percent={_loaded_progress_percent}
                        know_if_logged={_know_if_logged}
                        know_the_settings={_know_the_settings}
                        logged_account={_logged_account}
                        pathname={pathname}
                        music_enabled={_music_enabled}
                        jamy_enabled={_jamy_enabled}
                        jamy_state_of_mind={_jamy_state_of_mind}/>
                    <AppDrawer
                        pathname={pathname}
                        logged_account={_logged_account}/>
                    <Toolbar />
                    <main className={classes.content}>
                        {page_component}
                    </main>
                </div>
                <ShareDialog
                    open={_is_share_dialog_open}
                    onClose={this._handle_share_dialog_close}/>
            </div>
        );
    }
}

export default withStyles(styles)(Index);
