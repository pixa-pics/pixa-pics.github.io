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
        enable_3d: false,
        onboarding: true,
        attachment_previews: {},
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

const get_settings = (callback_function_info = null, attachment_ids = [], callback_function_attachment = null) => {

    if(typeof window._pixa_settings !== "undefined" && window._pixa_settings !== null) {

        if(typeof window._pixa_settings.locales !== "undefined" && window._pixa_settings.locales !== null && !attachment_ids.length) {

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

                    if(callback_function_attachment !== null) {

                        // retrieve a data attachment
                        window.settings_db.get(settings_docs[0]._id, {
                            rev: settings_docs[0]._rev,
                            attachments: Boolean(attachment_ids.length || attachment_ids === "all"),
                            binary: Boolean(attachment_ids.length || attachment_ids === "all")
                        }).then((doc) => {

                            const pixa_settings = JSON.parse(doc.info);
                            window._pixa_settings = {...pixa_settings};
                            if(callback_function_info){ callback_function_info(null, {...pixa_settings})};

                            let blobs = [];
                            Object.entries(doc._attachments).forEach(([name_id, value]) => {

                                if(attachment_ids === "all" || attachment_ids.includes(name_id)) {

                                    blobs[name_id] = value.data;
                                }
                            });

                            Object.entries(blobs).forEach(([name_id, blob]) => {

                                blob.arrayBuffer().then((array_buffer) => {

                                    const uint8a = new Uint8Array(array_buffer);
                                    LZP3(uint8a, "DECOMPRESS_UINT8A", (obj) => {

                                        callback_function_attachment(null, obj);
                                    }, pool);

                                });
                            });

                        }).catch((e) => {

                            error = e;
                        });

                    }else {

                        const pixa_settings = JSON.parse(settings_docs[0].info);
                        window._pixa_settings = {...pixa_settings};
                        if(callback_function_info){ callback_function_info(null, {...pixa_settings})};

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

                if(callback_function_info !== null) {

                    callback_function_info(null, {...pixa_settings});
                }
            });
        }else if(error) {

            callback_function_info(error, null);
        }
    });
}

const set_settings = (info = {}, callback_function_info = () => {}, attachment_array = {}) => {

    window.settings_db.allDocs({
        include_docs: true,
        attachments: Boolean(Object.keys(attachment_array).length),
        binary: Boolean(Object.keys(attachment_array).length)
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

                    if(Object.keys(attachment_array).length >= 1) {

                        let pixa_settings = _merge_object(JSON.parse(settings_docs[0].info), info);

                        let blobs_to_add = Object.keys(attachment_array).length;
                        Object.entries(attachment_array).forEach(([name_id, data]) => {

                            const {id, kb, preview, timestamp } = data;
                            pixa_settings.attachment_previews = pixa_settings.attachment_previews || {};
                            pixa_settings.attachment_previews[name_id] = {id, kb, preview, timestamp};


                            console.log(blobs_to_add);
                            LZP3(data, "COMPRESS_OBJECT", (uint8a) => {

                                settings_docs[0]._attachments = settings_docs[0]._attachments || {};
                                settings_docs[0]._attachments[name_id] = {
                                    content_type: "application/octet-stream",
                                    data: new Blob([uint8a], {type : "application/octet-stream"})
                                };
                                blobs_to_add--;
                                console.log(settings_docs[0]._attachments)
                                if(blobs_to_add === 0) {

                                    continue_push_in_db(settings_docs, pixa_settings);
                                }

                            }, pool);
                        });

                        const continue_push_in_db = (settings_docs, pixa_settings ) => {

                            window.settings_db.put({
                                _id: settings_docs[0]._id,
                                _rev: settings_docs[0]._rev,
                                info: JSON.stringify(pixa_settings),
                                timestamp: Date.now(),
                                _attachments: settings_docs[0]._attachments,
                            }, {force: true}).then((response) => {

                                if(settings_docs.length > 1) {

                                    // Delete all others
                                    settings_docs.splice(0, 1);
                                    window.settings_db.bulkDocs(settings_docs.map((sd) => {return {_id: sd._id, _rev: sd._rev, _deleted: true, timestamp: 0, data: null, info: null}}), {force: true});
                                }

                                window._pixa_settings = {...pixa_settings};
                                callback_function_info(null, {...pixa_settings});
                            });
                        };

                    }else {

                        let pixa_settings = _merge_object(JSON.parse(settings_docs[0].info), info);

                        window.settings_db.get(settings_docs[0]._id, {
                            rev: settings_docs[0]._rev,
                        }).then((doc) => {

                            window.settings_db.put({
                                _id: doc._id,
                                _rev: doc._rev,
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

            if(Object.keys(attachment_array).length > 0) {

                let attachments = {};
                let blobs_to_add = attachment_array.length;
                Object.entries(attachment_array).forEach(([name_id, data]) => {

                    let pixa_settings = _get_default_settings();
                    const {id, kb, preview, timestamp } = data;
                    pixa_settings.attachment_previews = pixa_settings.attachment_previews  || {};
                    pixa_settings.attachment_previews[name_id] = {id, kb, preview, timestamp};

                    LZP3(data, "COMPRESS_OBJECT", (uint8a) => {

                        attachments[name_id] = {
                            content_type: "application/octet-stream",
                            data: new Blob([uint8a], {type : "application/octet-stream"})
                        };
                        blobs_to_add--;

                        if(blobs_to_add === 0) {

                            continue_push_in_db(attachments, pixa_settings);
                        }

                    }, pool);
                });

                const continue_push_in_db = (attachments, pixa_settings) => {

                    window.settings_db.post({
                        info: JSON.stringify(pixa_settings),
                        timestamp: Date.now(),
                        _attachments: attachments
                    }).then((response) => {

                        window._pixa_settings = {...pixa_settings};
                        callback_function_info(null, {...pixa_settings});
                    });
                };

            }else {

                let pixa_settings = _get_default_settings();

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
