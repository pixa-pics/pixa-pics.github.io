import { CURRENCY_COUNTRIES } from "../utils/constants";

import PouchDB from "pouchdb";
import get_browser_locales from "../utils/locales";
window.settings_db = new PouchDB("settings_db", {deterministic_revs: false, revs_limit: 0, auto_compaction: false});

function _merge_object(obj1, obj2){

    let merged_object = obj1 || {};

    for (let attrname in obj2) {

        if(typeof obj2[attrname] !== "undefined") {

            if(typeof obj2[attrname] === "object") {

                merged_object[attrname] = {...obj2[attrname]};
            }else {

                merged_object[attrname] = obj2[attrname];
            }

        }
    }

    return merged_object;
}

function _get_default_settings() {

    const locales = get_browser_locales()[0].split("-").length === 2 ? get_browser_locales()[0]: "en-US";

    return {
        locales,
        pixel_arts: [],
        currency: _get_currency_by_locales(locales),
        sfx_enabled: false,
        jamy_enabled: false,
        fees: 1,
        panic: false,
        enable_3d: false,
        onboarding: true,
        help: {
            topup: true,
            mixer: true,
            swap: true
            }
    };
}

function _get_currency_by_locales(locales) {

    const country = locales.split("-").length === 2 ? locales.split("-")[1] : "US";
    let currency = "USD";

    Object.entries(CURRENCY_COUNTRIES).forEach(entry => {
        const [key, value] = entry;
        if(value.includes(country)) {
            currency = key;
        }
    });

    return currency;
}

function reset_all_databases(callback_function) {

    delete window._wcr_settings;

    Promise.all([
        window.settings_db.destroy(),
    ]).then(function (){

        callback_function();
    });
}

function get_settings(callback_function) {

    if(typeof window._wcr_settings !== "undefined") {

        callback_function(null, window._wcr_settings);
        return;
    }

    window.settings_db.allDocs({
        include_docs: true
    }, function(error, response) {

        let settings_docs_undefined = false;

        if(!error) {

            // Get settings docs
            const settings_docs = response.rows.map(function (row) {

                return row.doc;
            });

            // Choose the first
            if(typeof settings_docs[0] !== "undefined") {

                if(settings_docs[0].data !== "undefined") {

                    window._wcr_settings = JSON.parse(settings_docs[0].data);

                    callback_function(null, window._wcr_settings);
                }

                if(settings_docs.length > 1) {

                    // Delete all others
                    settings_docs.splice(0, 1);
                    window.settings_db.bulkDocs(settings_docs.map((sd) => {delete sd.data; return {_id: sd._id, _rev: sd._rev, _deleted: true, timestamp: 0, data: null}}), {force: true});
                }

            }else {
                settings_docs_undefined = true;
            }
        }

        if(settings_docs_undefined || error){

            window._wcr_settings = _get_default_settings();

            window.settings_db.post({
                data: JSON.stringify(window._wcr_settings)
            });

            callback_function(null, window._wcr_settings);
        }
    });
}

function set_settings(settings, callback_function) {

    let settings_doc_undefined = false;

    function cache_callback_function(error, response) {

        if(!error) {

            // Get settings docs
            const settings_docs = response.rows.map(function (row) {

                return row.doc;
            });

            // Choose the first
            if(typeof settings_docs[0] !== "undefined") {

                if(settings_docs[0].data !== "undefined") {

                    window._wcr_settings = _merge_object(
                        JSON.parse(settings_docs[0].data),
                        settings);

                    window.settings_db.put({
                        _id: settings_docs[0]._id,
                        _rev: settings_docs[0]._rev,
                        timestamp: Date.now(),
                        data: JSON.stringify(window._wcr_settings)
                    }, {force: true});

                    callback_function(null, window._wcr_settings);
                }

                // Delete all others
                settings_docs.splice(0, 1);
                window.settings_db.bulkDocs(settings_docs.filter((sd) => !sd._deleted).map((sd) => {return {_id: sd._id, _rev: sd._rev, _deleted: true, timestamp: 0, data: null}}), {force: true});

            }else {

                settings_doc_undefined = true;
            }
        }

        // Create new
        if(error || settings_doc_undefined) {

            const default_all_settings = _get_default_settings();

            window._wcr_settings = _merge_object(default_all_settings, settings);

            window.settings_db.post({
                data: JSON.stringify(window._wcr_settings)
            });


            callback_function(null, window._wcr_settings);
        }
    }

    window.settings_db.allDocs({
        include_docs: true
    }, cache_callback_function);
}

module.exports = {
    reset_all_databases: reset_all_databases,
    get_settings: get_settings,
    set_settings: set_settings
}
