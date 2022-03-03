import { CURRENCY_COUNTRIES } from "../utils/constants";

import PouchDB from "pouchdb";
import get_browser_locales from "../utils/locales";
window.settings_db = new PouchDB("settings_db", {deterministic_revs: false, revs_limit: 1});
import pool from "../utils/worker-pool";
import { LZP3 } from "./lzp3_json";

const _merge_object = (obj1, obj2) => {

    return {...obj1, ...obj2};
};

const _get_default_settings = () => {

    const locales = get_browser_locales()[0].split("-").length === 2 ? get_browser_locales()[0]: "en-US";

    return {
        locales: locales,
        currency: _get_currency_by_locales(locales),
        manual_warning_enabled: true,
        sfx_enabled: true,
        jamy_enabled: true,
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
};

const _get_currency_by_locales = (locales) => {

    const country = locales.split("-").length === 2 ? locales.split("-")[1] : "US";
    let currency = "USD";

    Object.entries(CURRENCY_COUNTRIES).forEach(entry => {
        const [key, value] = entry;
        if(value.includes(country)) {
            currency = key;
        }
    });

    return currency;
};

const reset_all_databases = (callback_function) => {

    delete window._pixa_settings;

    Promise.all([
        window.settings_db.destroy(),
    ]).then(() => {

        callback_function();
    });
}

const get_settings = (callback_function_info = null, callback_function_data = null) => {

    if(typeof window._pixa_settings !== "undefined" && window._pixa_settings !== null) {

        if(typeof window._pixa_settings.locales !== "undefined" && window._pixa_settings.locales !== null && callback_function_data === null) {

            callback_function_info(null, {...window._pixa_settings});
            return;
        }
    }

    window.settings_db.allDocs({
        include_docs: true,
    }, (error, response) => {

        let settings_docs_undefined = false;

        if(!error) {

            // Get settings docs
            let settings_docs = response.rows.map((row) => {
                return row.doc;
            }).sort((a, b) =>  new Date(b.timestamp) - new Date(a.timestamp));

            // Choose the first
            if(typeof settings_docs[0] !== "undefined") {

                try {

                    const pixa_settings = JSON.parse(settings_docs[0].info);
                    window._pixa_settings = {...pixa_settings};
                    callback_function_info && callback_function_info(null, {...pixa_settings});

                    if(callback_function_data !== null) {

                        // retrieve a data attachment
                        window.settings_db.get(settings_docs[0]._id, {
                            rev: settings_docs[0]._rev,
                            attachments: true,
                            binary: true
                        }).then((doc) => {

                            const blob = doc._attachments["data.txt"].data;
                            blob.arrayBuffer().then((array_buffer) => {

                                const uint8a = new Uint8Array(array_buffer);
                                LZP3(uint8a, "DECOMPRESS_UINT8A", (obj) => {

                                    callback_function_data(null, {...obj});
                                }, pool);

                            })

                        }).catch((e) => {

                            error = e;
                        });

                    }

                } catch (err) {

                    error = err;
                }
            }else {

                settings_docs_undefined = true;
            }
        }

        if(settings_docs_undefined){

            const pixa_settings = _get_default_settings();

            window.settings_db.post({
                info: JSON.stringify(pixa_settings),
                timestamp: Date.now(),
            }).then((response) => {

                window._pixa_settings = {...pixa_settings};
                callback_function_info(null, {...pixa_settings});
            });
        }else if(error) {

            callback_function_info(error, null);
        }
    });
}

const set_settings = (info = {}, data = {}, callback_function_info = () => {}, callback_function_data = () => {}) => {

    window.settings_db.allDocs({
        include_docs: true
    }, (error, response) => {

        let settings_docs_undefined = false;

        if(!error) {

            // Get settings docs
            let settings_docs = response.rows.map((row) => {
                return row.doc;
            }).sort((a, b) =>  new Date(b.timestamp) - new Date(a.timestamp));

            // Choose the first
            if(typeof settings_docs[0] !== "undefined") {

                try {

                    const pixa_settings = _merge_object(JSON.parse(settings_docs[0].info), info);

                    if(JSON.stringify(data).length > 100) {

                        // Create a data attachment
                        LZP3(data, "COMPRESS_OBJECT", (uint8a) => {

                            window.settings_db.put({
                                _id: settings_docs[0]._id,
                                _rev: settings_docs[0]._rev,
                                info: JSON.stringify(pixa_settings),
                                timestamp: Date.now(),
                                _attachments: {
                                    "data.txt": {
                                        content_type: "application/octet-stream",
                                        data: new Blob([uint8a], {type : "application/octet-stream"})
                                    }
                                }
                            }, {force: true}).then((response) => {

                                if(settings_docs.length > 1) {

                                    // Delete all others
                                    settings_docs.splice(0, 1);
                                    window.settings_db.bulkDocs(settings_docs.map((sd) => {return {_id: sd._id, _rev: sd._rev, _deleted: true, timestamp: 0, data: null, info: null}}), {force: true});
                                }

                                window._pixa_settings = {...pixa_settings};
                                callback_function_info(null, {...pixa_settings});
                                callback_function_data(null, {...data});
                            });

                        }, pool);
                    }else {

                        window.settings_db.get(settings_docs[0]._id, {
                            rev: settings_docs[0]._rev,
                            attachments: true,
                            binary: true
                        }).then((doc) => {

                            window.settings_db.put({
                                _id: doc._id,
                                _rev: doc._rev,
                                _attachments: doc._attachments,
                                info: JSON.stringify(pixa_settings),
                                timestamp: Date.now(),
                            }, {force: true}).then((response) => {

                                if(settings_docs.length > 1) {

                                    // Delete all others
                                    settings_docs.splice(0, 1);
                                    window.settings_db.bulkDocs(settings_docs.map((sd) => {return {_id: sd._id, _rev: sd._rev, _deleted: true, timestamp: 0, data: null, info: null}}), {force: true});
                                }

                                window._pixa_settings = {...pixa_settings};
                                callback_function_info(null, {...pixa_settings});
                                callback_function_data(null, {...data});
                            });

                        });

                    }

                } catch (err) {

                    error = err;
                }
            }else {

                settings_docs_undefined = true;
            }
        }

        if(settings_docs_undefined){

            const pixa_settings = _get_default_settings();

            if(Object.keys(data).length > 0) {

                // Create a data attachment
                LZP3(data, "COMPRESS_OBJECT", (uint8a) => {

                    window.settings_db.post({
                        info: JSON.stringify(pixa_settings),
                        timestamp: Date.now(),
                        _attachments: {
                            "data.txt": {
                                content_type: "application/octet-stream",
                                data: new Blob([uint8a], {type : "application/octet-stream"})
                            }
                        }
                    }).then((response) => {

                        window._pixa_settings = {...pixa_settings};
                        callback_function_info(null, {...pixa_settings});
                        callback_function_data(null, {...data});

                    });

                }, pool);
            }else {

                window.settings_db.post({
                    info: JSON.stringify(pixa_settings),
                    timestamp: Date.now(),
                }).then((response) => {

                    window._pixa_settings = {...pixa_settings};
                    callback_function_info(null, {...pixa_settings});

                });

            }
        }else if(error) {

            callback_function_info(error, null);
        }
    });
}

module.exports = {
    reset_all_databases: reset_all_databases,
    get_settings: get_settings,
    set_settings: set_settings
}
