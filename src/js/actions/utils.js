import dispatcher from "../dispatcher";

// Functions enabling events to be dispatched and received elsewhere in the code with data
function jamy_update(state_of_mind = "shocked", duration = 2500) {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "JAMY_UPDATE",
            data: { state_of_mind, duration }
        });
    }else {

        setTimeout(() => {

            jamy_update(state_of_mind, duration);
        }, 10);
    }
}

function trigger_sfx(name, volume = 1, pack = "md") {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "TRIGGER_SFX",
            data: { pack, name, volume}
        });
    }else {

        setTimeout(() => {

            trigger_sfx(name, volume, pack);
        }, 10);
    }
}

function trigger_voice(name, volume = 1, pack = "cn") {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "TRIGGER_VOICE",
            data: { pack, name, volume}
        });
    }else {

        setTimeout(() => {

            trigger_sfx(name, volume, pack);
        }, 10);
    }
}

function trigger_music(name, volume = 0.75, pack = "redeclipse") {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "TRIGGER_MUSIC",
            data: { pack, name, volume}
        });
    }else {

        setTimeout(() => {

            trigger_music(name, volume, pack);
        }, 10);
    }
}

function stop_sound() {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "STOP_SOUND",
            data: {}
        });
    }else {

        setTimeout(() => {

            stop_sound();
        }, 10);
    }
}

function trigger_share() {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "TRIGGER_SHARE",
            data: {}
        });
    }else {

        setTimeout(() => {

            trigger_share();
        }, 10);
    }
}

function trigger_vocal(name, volume = 1, pack = "gg") {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "TRIGGER_VOCAL",
            data: { pack, name, volume}
        });
    }else {

        setTimeout(() => {

            trigger_vocal(name, volume, pack);
        }, 10);
    }
}

function trigger_snackbar(message = "", auto_hide_duration = 3500) {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "SNACKBAR",
            data: { message, auto_hide_duration }
        });
    }else {

        setTimeout(() => {

            trigger_snackbar(message, auto_hide_duration);
        }, 10);
    }
}

function trigger_login_update() {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "LOGIN_UPDATE",
            data: {}
        });
    }else {

        setTimeout(() => {

            trigger_login_update();
        }, 10);
    }
}

function trigger_settings_update() {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "SETTINGS_UPDATE",
            data: {}
        });
    }else {

        setTimeout(() => {

            trigger_settings_update();
        }, 10);
    }
}

function trigger_loading_update(percent) {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "LOADING_UPDATE",
            data: {percent}
        });
    }else {

        setTimeout(() => {

            trigger_loading_update(percent);
        }, 10);
    }
}

function trigger_page_render_complete() {

    if(!dispatcher.isDispatching()) {

        dispatcher.dispatch({
            type: "PAGE_RENDER_COMPLETE",
            data: {}
        });
    }else {

        setTimeout(() => {

            trigger_page_render_complete();
        }, 10);
    }
}

module.exports = {
    stop_sound: stop_sound,
    jamy_update: jamy_update,
    trigger_sfx: trigger_sfx,
    trigger_voice: trigger_voice,
    trigger_music: trigger_music,
    trigger_share: trigger_share,
    trigger_snackbar: trigger_snackbar,
    trigger_login_update: trigger_login_update,
    trigger_settings_update: trigger_settings_update,
    trigger_loading_update: trigger_loading_update,
    trigger_page_render_complete: trigger_page_render_complete
    };