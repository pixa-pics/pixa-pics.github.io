import dispatcher from "../dispatcher";

// Functions enabling events to be dispatched and received elsewhere in the code with data


function jamy_update(state_of_mind = "shocked", duration = 2500) {

    dispatcher.dispatch({
        type: "JAMY_UPDATE",
        data: {
            state_of_mind,
            duration
        }
    });
}

function trigger_sfx(name, volume = 1, pack = "md") {

    dispatcher.dispatch({
        type: 'TRIGGER_SFX',
        data: {
            pack,
            name,
            volume
        }
    });
}

function trigger_music(name, volume = 0.75, pack = "redeclipse") {

    dispatcher.dispatch({
        type: 'TRIGGER_MUSIC',
        data: {
            pack,
            name,
            volume
        }
    });
}

function stop_sound() {

    dispatcher.dispatch({
        type: 'STOP_SOUND',
        data: {}
    });
}

function trigger_share() {

    dispatcher.dispatch({
        type: 'TRIGGER_SHARE',
        data: {}
    });
}

function trigger_vocal(name, volume = 1, pack = "gg") {

    dispatcher.dispatch({
        type: 'TRIGGER_VOCAL',
        data: {
            pack,
            name,
            volume
        }
    });
}

function trigger_snackbar(message = "", auto_hide_duration = 3500) {

    dispatcher.dispatch({
        type: "SNACKBAR",
        data: {
            message,
            auto_hide_duration
        }
    });
}

function trigger_login_update() {

    dispatcher.dispatch({
        type: "LOGIN_UPDATE",
        data: {}
    });
}

function trigger_settings_update() {

    dispatcher.dispatch({
        type: "SETTINGS_UPDATE",
        data: {}
    });
}

function trigger_loading_update(percent) {

    dispatcher.dispatch({
        type: "LOADING_UPDATE",
        data: {percent}
    });
}

function trigger_page_render_complete() {

    dispatcher.dispatch({
        type: "PAGE_RENDER_COMPLETE",
        data: {}
    });
}

module.exports = {
    stop_sound: stop_sound,
    jamy_update: jamy_update,
    trigger_sfx: trigger_sfx,
    trigger_music: trigger_music,
    trigger_share: trigger_share,
    trigger_snackbar: trigger_snackbar,
    trigger_login_update: trigger_login_update,
    trigger_settings_update: trigger_settings_update,
    trigger_loading_update: trigger_loading_update,
    trigger_page_render_complete: trigger_page_render_complete,
};
