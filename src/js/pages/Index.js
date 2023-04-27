"use strict";
import React, { Suspense } from "react";
import JSLoader from "../utils/JSLoader";
import { withStyles } from "@material-ui/core";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";

import CloseIcon from "@material-ui/icons/Close";

import AppToolbar from "../components/AppToolbar";
import AppDrawer from "../components/AppDrawer";
import ShareDialog from "../components/ShareDialog";

import dispatcher from "../dispatcher";
import actions from "../actions/utils";

import Home from "./Home";
const Pixel = React.lazy(() => import("../pages/Pixel"));
const Unknown = React.lazy(() => import("../pages/Unknown"));
const Settings = React.lazy(() =>  import("../pages/Settings"));

import JamyAngry from "../icons/JamyAngry";
import JamyAnnoyed from "../icons/JamyAnnoyed";
import JamyFlirty from "../icons/JamyFlirty";
import JamyHappy from "../icons/JamyHappy";
import JamySad from "../icons/JamySad";
import JamyShocked from "../icons/JamyShocked";
import JamySuspicious from "../icons/JamySuspicious";

import api from "../utils/api";
import { update_meta_title } from "../utils/meta-tags";
import {PAGE_ROUTES, UTC_OFFSET_PER_COUNTRIES} from "../utils/constants";
import ActivateLab from "../components/ActivateLab";

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
        position: "absolute",
        contain: "size paint style layout",
        width: "calc(100vw - 64px)",
        marginLeft: 64,
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

class Index extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            _history: props.history,
            _load_with: "",
            _intervals: [],
            _jamy_state_of_mind: "shocked",
            _unlisten: null,
            _snackbar_open: false,
            _snackbar_message: "",
            _snackbar_auto_hide_duration: 1975,
            classes: props.classes,
            _database_attempt: 0,
            _is_share_dialog_open: 0,
            _is_activatelab_dialog_open: 0,
            _count_presentation_open: 0,
            _datasyncserviceworkerallfiles: 0,
            _history_unlisten: function(){},
            _did_mount: false,
            _page_routes: PAGE_ROUTES
        };
        this.settings = {
            _unset: true,
            _language: "en",
            _theme_day: false,
            _ret: 0,
            _camo: 0,
            _bdi: 0,
            _sfx_enabled: true,
            _voice_enabled: true,
            _music_enabled: false,
            _jamy_enabled: true,
            _selected_locales_code: null,
            _activation_enabled: true,
            _know_if_logged: false,
            _know_the_settings: false,
            _has_played_index_music_counter: 0,
            _presentation_n: 0,
        };
        this.pathname = "";
        this._page_component = null;
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

    componentWillMount() {
        "use strict";
        this._update_settings();
        dispatcher.register(this._handle_events.bind(this));
        const _history_unlisten = this.st4te._history.listen((location, action) => {
            // location is an object like window.location
            this._set_new_pathname_or_redirect(location.location.pathname);
        });
        this._set_new_pathname_or_redirect(this.st4te._history.location.pathname);
        this.setSt4te({_did_mount: true, _history_unlisten});
    }

    componentDidMount() {
        "use strict";
        setTimeout(() => {

            // Make Jamy blink every 32 sec in average.
            const intervals = [
                setInterval(async() => {

                    const { is_online } = this.st4te;
                    if(navigator.onLine !== is_online){

                        this.setSt4te({is_online: navigator.onLine}, () => {

                            this.forceUpdate();
                        });
                        actions.jamy_update(navigator.onLine ? "happy": "sad");
                    }
                }, 1000),
                setInterval(async() => {

                    if(!Math.floor(Math.random() * 32)) {

                        const { _jamy_state_of_mind } = this.st4te;

                        this.setSt4te({_jamy_state_of_mind: "suspicious"}, () => {

                            this.forceUpdate(() => {

                                setTimeout(() => {

                                    if(this.st4te._jamy_state_of_mind === "suspicious") {

                                        this.setSt4te({_jamy_state_of_mind}, () => {

                                            this.forceUpdate();
                                        });
                                    }

                                }, 75);

                            });

                        });

                    }

                }, 1000)
            ];

            this.setSt4te({_intervals: intervals});
        }, 5000);

        setTimeout(() => {

            if(this.pathname === "/" || this.pathname === "") {
                actions.trigger_snackbar("Hey there, I am Jamy!", 2000)
            }

        }, 9000);
    }

    componentWillUnmount() {

        try {
            this.st4te._history_unlisten();
            this.st4te._intervals.forEach((itrvl) => {

                clearInterval(itrvl);
            });
        } catch(e) {}
    }

    _get_page_component(name, settings, load_with = ""){

        switch (name) {
            case "home":
                return <Home settings={settings} />;
            case "pixel":

                return <Suspense fallback={<div/>}><Pixel load_with={load_with} settings={settings}/></Suspense>;
            case "unknown":

                return <Suspense fallback={<div/>}><Unknown /></Suspense>;
            case "settings":

                return <Suspense fallback={<div/>}><Settings settings={settings} /></Suspense>;
        }
    }

    _trigger_sound = (category, pack, name, volume, global) => {

        JSLoader( () => import("../utils/sound-api")).then((sound_api) => {

            sound_api.play_sound(category, pack, name, volume, global);
        });
    }

    _stop_sound = () => {

        JSLoader( () => import("../utils/sound-api")).then((sound_api) => {

            sound_api.stop_sound();
        });
    }

    _handle_events = (event) => {

        const { _history, _did_mount } = this.st4te;
        const { _sfx_enabled, _voice_enabled, _music_enabled, _know_the_settings } = this.settings;

        // Make different actions send from a dispatcher bounded to this function
        if(_know_the_settings && _did_mount) {

            switch (event.type) {

                case "TRIGGER_SFX":
                    if (_sfx_enabled) {
                        this._trigger_sound("sfx", event.data.pack, event.data.name, event.data.volume, false);
                    }
                    break;

                case "LOAD_WITH":
                    this.setSt4te({_load_with: event.data.b64}, () => {
                        if(event.data.activation) {
                            this._handle_labactivate_dialog_open();
                        }else {
                            this.forceUpdate(() => {
                                _history.push("/pixel");
                            })
                        }
                    });
                    break;

                case "TRIGGER_VOICE":
                    if (_voice_enabled) {
                        this._trigger_sound("voice", event.data.pack, event.data.name, event.data.volume, false);
                    }
                    break;

                case "TRIGGER_MUSIC":
                    if (_music_enabled) {
                        this._trigger_sound("music", event.data.pack, event.data.name, event.data.volume, true);
                    }
                    break;

                case "STOP_SOUND":
                    this._stop_sound();
                    break;

                case "TRIGGER_SHARE":
                    this._handle_share_dialog_open();
                    break;

                case "TRIGGER_PRESENTATION":
                    this.setSt4te({_presentation_n: event.data.number})
                    this._handle_presentation_open();
                    break;

                case "SNACKBAR":
                    this._trigger_snackbar(event.data.message, event.data.auto_hide_duration);
                    break;

                case "JAMY_UPDATE":
                    this._update_jamy(event.data.state_of_mind, event.data.duration);
                    break;

                case "SETTINGS_UPDATE":

                    if (_know_the_settings) {

                        this._update_settings();
                    }
                    break;

                case "LOADING_UPDATE":
                    this.setSt4te({_loaded_progress_percent: event.data.percent}, () => {

                        this.forceUpdate();
                    });
                    break;

                case "PAGE_RENDER_COMPLETE":

                    if (this.st4te._datasyncserviceworkerallfiles === 0) {

                        const time = 7777 * 10;
                        this.setSt4te({_datasyncserviceworkerallfiles: Date.now() + time});
                        setTimeout(() => {
                            fetch("data:,all").then(function (r) {
                            })
                        }, time);
                    }
                    break;
            }
        }else {

            setTimeout(this._handle_events, 30, event);
        }
    }

    _process_settings_query_result = (error, settings) => {

        "use strict";

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

        if(!Boolean(error) && Boolean(settings.locales)) {

            const was_music_enabled = Boolean(this.settings._music_enabled);
            const was_the_settings_known = Boolean(this.settings._know_the_settings);

            const _sfx_enabled = Boolean(typeof settings.sfx_enabled !== "undefined" ? settings.sfx_enabled: true);
            const _activation_enabled = Boolean(typeof settings.activation_enabled !== "undefined" ? settings.activation_enabled: true);
            const _music_enabled = Boolean(typeof settings.music_enabled !== "undefined" ? settings.music_enabled: false);
            const _voice_enabled = Boolean(typeof settings.voice_enabled !== "undefined" ? settings.voice_enabled: false);
            const _jamy_enabled = Boolean(typeof settings.jamy_enabled !== "undefined" ? settings.jamy_enabled: true);
            const _selected_locales_code =  typeof settings.locales !== "undefined" ? settings.locales: "en-US";
            const _language = _selected_locales_code.split("-")[0];
            const _ret = parseInt(typeof settings.ret !== "undefined" ? settings.ret: 0);
            const _camo = parseInt(typeof settings.camo !== "undefined" ? settings.camo: 0);
            const _bdi = parseInt(typeof settings.bdi !== "undefined" ? settings.bdi: 0);
            const _theme_day = is_day(_selected_locales_code.split("-")[1]);

            let force_update = Boolean(_selected_locales_code !== this.settings._selected_locales_code);
            this.settings =  { _unset: false, _activation_enabled, _theme_day, _language, _ret, _camo, _bdi, _voice_enabled, _sfx_enabled, _music_enabled, _jamy_enabled, _selected_locales_code, _know_the_settings: true, _has_played_index_music_counter: parseInt(Boolean(!this.settings._know_the_settings && _music_enabled) ? 1: Boolean(this.settings._has_played_index_music_counter) )};
            if(!was_the_settings_known) {

                this.forceUpdate(function(){document.body.setAttribute("class", "loaded");});
                this._set_analytics( 50);
            }else if(force_update){
                this.forceUpdate();
            }

        }else {
            setTimeout(this._update_settings, 5);
        }
    };

    _set_analytics = (wait = 0) => {

        // MATOMO TAG MANAGER (ADDON)
        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});

        // Just for us to count download by type just sending "+1"
        window.addEventListener('art-download-raster1', () => { _mtm.push({'event': 'art-download-raster1'}); });
        window.addEventListener('art-download-raster2', () => { _mtm.push({'event': 'art-download-raster2'}); });
        window.addEventListener('art-download-raster4', () => { _mtm.push({'event': 'art-download-raster4'}); });
        window.addEventListener('art-download-raster6', () => { _mtm.push({'event': 'art-download-raster6'}); });
        window.addEventListener('art-download-raster8', () => { _mtm.push({'event': 'art-download-raster8'}); });
        window.addEventListener('art-download-raster12', () => { _mtm.push({'event': 'art-download-raster12'}); });
        window.addEventListener('art-download-raster24', () => { _mtm.push({'event': 'art-download-raster24'}); });
        window.addEventListener('art-download-vectoromni', () => { _mtm.push({'event': 'art-download-vectoromni'}); });
        window.addEventListener('art-download-vectorxbrz', () => { _mtm.push({'event': 'art-download-vectorxbrz'}); });
        window.addEventListener('art-download-vectorhqnx', () => { _mtm.push({'event': 'art-download-vectorhqnx'}); });
        window.addEventListener('art-download-vectorepx', () => { _mtm.push({'event': 'art-download-vectorepx'}); });

        // Error on upload and button type leading upload
        window.addEventListener('art-upload-browsererror', () => { _mtm.push({'event': 'art-upload-browsererror'}); });
        window.addEventListener('art-upload-dialog', () => { _mtm.push({'event': 'art-upload-dialog'}); });
        window.addEventListener('art-upload-drawer', () =>{ _mtm.push({'event': 'art-upload-drawer'}); });
        window.addEventListener('art-import-drawer', () => { _mtm.push({'event': 'art-import-drawer'}); });

        // Actions (Button accessed, only a few...)
        window.addEventListener('home-action-tryeditor', () => { _mtm.push({'event': 'home-action-tryeditor'}); });
        window.addEventListener('home-action-tryshare', () => { _mtm.push({'event': 'home-action-tryshare'}); });
        window.addEventListener('menu-action-tryeditor', () => { _mtm.push({'event': 'menu-action-tryeditor'}); });
        window.addEventListener('menu-action-settings', () => { _mtm.push({'event': 'menu-action-settings'}); });

        // Editor, few key interactions
        window.addEventListener('art-action-gethelp', () => { _mtm.push({'event': 'art-action-gethelp'}); });

        var _paq = window._paq = window._paq || [];
        _paq.push(["setDoNotTrack", true]);
        _paq.push(["disableCookies"]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        _paq.push(['setTrackerUrl', 'https://app.friendlyanalytics.ch/matomo.php']);
        _paq.push(['setSiteId', '77']);

        setTimeout(function(){

            /*let element_a = document.getElementById("matomo-container") || null;
            let append_a = false;

            if(element_a === null) {
                append_a = true;
                element_a = document.createElement("script");
            }

            element_a.setAttribute("id", "matomo-container");
            element_a.setAttribute("async", "true");
            element_a.setAttribute("src", "https://app.friendlyanalytics.ch/js/container_jRxgodNd.js");

            let element_b = document.getElementById("matomo-analytics") || null;
            let append_b = false;

            if(element_b === null) {
                append_b = true;
                element_b = document.createElement("script");
            }

            element_b.setAttribute("id", "matomo-analytics");
            element_a.setAttribute("async", "true");
            element_b.setAttribute("src", "https://app.friendlyanalytics.ch/matomo.js");

            if(append_a) {document.head.appendChild(element_a);}
            if(append_b) {document.head.appendChild(element_b);}*/

        }, wait);
    }

    _update_settings = async () => {

        // Call the api to get results of current settings and send it to a callback function
        api.get_settings(this._process_settings_query_result);
    }

    _set_new_pathname_or_redirect = (neo_pathname) => {

        const { _history, _page_routes, _load_with, _did_mount } = this.st4te;

        const new_pathname = String(neo_pathname || _history.location.pathname);
        const old_pathname = String(this.pathname);

        if(new_pathname === "/index.html") {

            _history.push("/");
        }else if(new_pathname !== old_pathname || Boolean(new_pathname === "" && old_pathname === "")) {

            // Set pathname
            this._set_meta_title(new_pathname);
            this._should_play_music_pathname(new_pathname);

            for(let i = 0; i < _page_routes.length; i++) {
                const page_route = _page_routes[i];
                if(new_pathname.match(page_route.page_regex)){
                    this._page_component = this._get_page_component(page_route.page_name, JSON.stringify(this.settings), _load_with);
                }
            }

            this.pathname = new_pathname;
            this.forceUpdate();
        }
    };

    _should_play_music_pathname = (pathname = "/") => {

        if(pathname.match(/\/(pixel)$/)) {

            let random = Math.ceil(Math.random()*3.0)
            if(random === 1) {

                actions.trigger_music(`Tesla_Numbers_15m_session`, 0.75, "tesla");
            }else if(random === 2) {

                actions.trigger_music("Decagon-Solfeggio_963Hz_15m", 0.75, "solfeggio");
            }else if(random === 3) {

                actions.trigger_music("Pi_Number_Decagon_in_A_15m", 0.75, "pi");
            }
        }else if(pathname.match(/(\/)?$/)) {

            const { _has_played_index_music_counter } = this.settings;
            actions.trigger_music(`track_${Boolean(navigator.onLine && _has_played_index_music_counter > 0) ? Math.ceil(Math.random() * 12).toString(10).padStart(2, "0"): "09"}`, 1, "redeclipse");
            this.settings = Object.assign(this.settings, {_has_played_index_music_counter: _has_played_index_music_counter+1});
        }else {

            actions.stop_sound();
        }

    }

    _set_meta_title = (pathname) => {

        pathname = pathname.replace("/", "").replace(/\//g, " > ");
        update_meta_title("PIXA | " + pathname);
    }

    _update_jamy = (state_of_mind, duration) => {

        const jamy_states = [
            {som: state_of_mind, dur: 0},
            {som: "shocked", dur: duration},
            {som: "suspicious", dur: duration+750},
            {som: "shocked", dur: duration+750+75}
        ];

        jamy_states.forEach((js) => {

            setTimeout(() => {

                this.setSt4te({_jamy_state_of_mind: js.som}, () => {

                    this.forceUpdate();
                });
            }, js.dur)
        });
    }

    _trigger_snackbar = (_snackbar_message, _snackbar_auto_hide_duration) => {

        const { _snackbar_open } = this.st4te;

        if(_snackbar_open) {

            this.setSt4te({_snackbar_open: false}, () => {

                this.forceUpdate(() => {

                    setTimeout(() => {

                        this.setSt4te({_snackbar_message, _snackbar_auto_hide_duration, _snackbar_open: true}, () => {

                            this.forceUpdate();
                        });
                    }, 500);
                });
            });
        }else {

            this.setSt4te({_snackbar_message, _snackbar_auto_hide_duration, _snackbar_open: true}, () => {

                this.forceUpdate();
            });
        }
    };

    _close_snackbar = (event, reason) => {

        if (reason === "clickaway") {
            return;
        }

        this.setSt4te({_snackbar_open: false}, () => {
            this.forceUpdate();
        });
    };

    _handle_share_dialog_close = () => {

        this.setSt4te({_is_share_dialog_open: -Math.abs(this.st4te._is_share_dialog_open)}, () => {

            this.forceUpdate();
        });
        actions.trigger_sfx("state-change_confirm-down");
        actions.jamy_update("suspicious");
    };

    _handle_labactivate_dialog_close = () => {

        setTimeout(() => {

            this.setSt4te({_is_activatelab_dialog_open: -Math.abs(this.st4te._is_activatelab_dialog_open)}, () => {
                this.forceUpdate(() => {
                    this.st4te._history.push("/pixel");
                });
            });
        }, 400);

        actions.trigger_sfx("labactive");
        actions.jamy_update("angry");
    };

    _handle_share_dialog_open = () => {

        this.setSt4te({_is_share_dialog_open: Math.abs(this.st4te._is_share_dialog_open)+1}, () => {

            this.forceUpdate();
        });
        actions.trigger_sfx("hero_decorative-celebration-02");
        actions.jamy_update("happy");
    };

    _handle_labactivate_dialog_open = () => {

        if(this.settings._activation_enabled){
            this.setSt4te({_is_activatelab_dialog_open: Math.abs(this.st4te._is_activatelab_dialog_open)+1}, () => {

                api.set_settings({activation_enabled: false}, this._update_settings)
                this.forceUpdate();
            });
            actions.trigger_sfx("hero_decorative-celebration-02");
            actions.jamy_update("happy");
        }else {

            this.forceUpdate(() => {
                this.st4te._history.push("/pixel");
            });
        }

    };

    _handle_presentation_open = () => {

        this.setSt4te({_count_presentation_open: this.st4te._count_presentation_open+1}, () => {
            this.forceUpdate();
        });
        actions.jamy_update("happy");
    };

    render() {

        const { classes } = this.st4te;
        const { _snackbar_open, _snackbar_message, _snackbar_auto_hide_duration } = this.st4te;
        const {  _is_share_dialog_open, _count_presentation_open, _is_activatelab_dialog_open, _presentation_n } = this.st4te;
        const { _know_if_logged, _loaded_progress_percent, _jamy_state_of_mind } = this.st4te;
        const {_ret, _camo, _bdi, _music_enabled, _jamy_enabled, _language, _know_the_settings} = this.settings;

        const JAMY = {
            angry: <JamyAngry className={classes.jamy} />,
            annoyed: <JamyAnnoyed className={classes.jamy} />,
            flirty: <JamyFlirty className={classes.jamy} />,
            happy: <JamyHappy className={classes.jamy} />,
            sad: <JamySad className={classes.jamy} />,
            shocked: <JamyShocked className={classes.jamy} />,
            suspicious: <JamySuspicious className={classes.jamy} />,
        };

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <AppToolbar
                        ret={_ret}
                        camo={_camo}
                        language={_language}
                        count_presentation_open={_count_presentation_open}
                        presentation_n={_presentation_n}
                        loaded_progress_percent={_loaded_progress_percent}
                        know_if_logged={_know_if_logged}
                        know_the_settings={_know_the_settings}
                        pathname={this.pathname}
                        music_enabled={_music_enabled}
                        jamy_enabled={_jamy_enabled}
                        jamy_state_of_mind={_jamy_state_of_mind}/>
                    <AppDrawer
                        bdi={_bdi}
                        count_presentation_open={_count_presentation_open}
                        presentation_n={_presentation_n}
                        know_the_settings={_know_the_settings}
                        language={_language}/>
                    <Toolbar />
                    <main className={classes.content}>
                        {_know_the_settings && this._page_component}
                    </main>
                </div>
                <Snackbar
                    className={classes.snackbar}
                    open={_snackbar_open}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    message={<div>
                        {_jamy_enabled ? <span className={classes.jamyContainer}>{JAMY[_jamy_state_of_mind]}</span>: null}
                        <span>{_snackbar_message}</span>
                    </div>}
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this._close_snackbar}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                    autoHideDuration={_snackbar_auto_hide_duration}
                    onClose={this._close_snackbar}
                />
                {_language && <ShareDialog
                    open={_is_share_dialog_open > 0}
                    keep_open={_is_share_dialog_open > 3 ? 0: _is_share_dialog_open > 2 ? 5: _is_share_dialog_open > 1 ? 10: _is_share_dialog_open > 0 ? 15: 15}
                    onClose={this._handle_share_dialog_close}/>}
                {_language && <ActivateLab
                    open={_is_activatelab_dialog_open > 0}
                     onClose={this._handle_labactivate_dialog_close}/>}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Index);