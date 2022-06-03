import { CURRENCY_COUNTRIES } from "../utils/constants";

import PouchDB from "pouchdb";
import get_browser_locales from "../utils/locales";
window.settings_db = new PouchDB("settings_db", {deterministic_revs: false, revs_limit: 0});
import pool from "../utils/worker-pool";

const _merge_object = (obj1, obj2) => {

    return Object.assign({}, {...obj1, ...obj2});
};

const _get_default_settings = () => {

    const locales = get_browser_locales()[0].split("-").length === 2 ? get_browser_locales()[0]: "en-US";

    return {
        locales: locales,
        currency: _get_currency_by_locales(locales),
        ret: 0,
        camo: 0,
        manual_warning_enabled: true,
        sfx_enabled: true,
        jamy_enabled: true,
        enable_3d: false,
        music_enabled: false,
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

const get_settings = (callback_function_info = null, attachment_ids = [], callback_function_attachment = null, LZP3 = null ) => {

    if(typeof window._pixa_settings !== "undefined" && window._pixa_settings !== null) {

        if(typeof window._pixa_settings.locales !== "undefined" && window._pixa_settings.locales !== null && callback_function_attachment === null && !Boolean(Boolean(attachment_ids === "all" || attachment_ids.length > 0))) {

            callback_function_info(null, _merge_object({}, window._pixa_settings));
            return;
        }
    }

    window.settings_db.allDocs({
        include_docs: true,
        descending: false,
        attachments: false,
        binary: false
    }, (error, response) => {

        if(!error) {

            // Get settings docs
            let settings_docs = response.rows.map((row) => {
                return row.doc;
            }).sort((a, b) =>  new Date(b.timestamp) - new Date(a.timestamp));

            // Choose the first
            if(typeof settings_docs[0] !== "undefined") {

                try {

                    if(Boolean(callback_function_attachment) &&  Boolean(Boolean(attachment_ids.length > 0) || Boolean(attachment_ids === "all"))) {

                        // retrieve a data attachment
                        window.settings_db.get(settings_docs[0]._id, {
                            rev: settings_docs[0]._rev,
                            attachments: Boolean(attachment_ids.length > 0) || Boolean(attachment_ids === "all"),
                            binary: Boolean(attachment_ids.length > 0) || Boolean( attachment_ids === "all")
                        }).then((doc) => {

                            const pixa_settings = JSON.parse(doc.info);
                            window._pixa_settings = _merge_object({}, pixa_settings);
                            if(callback_function_info){ callback_function_info(null, _merge_object({}, window._pixa_settings))};

                            let blobs = [];
                            Object.entries(doc._attachments).forEach(([name_id, value]) => {

                                if(Boolean( attachment_ids === "all") || attachment_ids.includes(name_id)) {

                                    blobs[name_id] = value.data;
                                }
                            });

                            Object.entries(blobs).forEach(([name_id, blob]) => {

                                blob.arrayBuffer().then((array_buffer) => {

                                    const uint8a = new Uint8Array(array_buffer);

                                    try {

                                        LZP3(uint8a, "DECOMPRESS_UINT8A", pool).then((obj) => {

                                            callback_function_attachment(null, obj);
                                        });

                                    } catch (e) {

                                        callback_function_attachment("LZP3 not working", null);
                                        return false;
                                    }
                                }).catch((e) => {

                                    callback_function_attachment("DB not working", null);
                                    return false;
                                });
                            });

                        }).catch((e) => {

                            callback_function_attachment("Missing in our database, unholy PouchDB when you don't get your files...", null);
                            return false;
                        });

                    }else {

                        const pixa_settings = JSON.parse(settings_docs[0].info);
                        window._pixa_settings = _merge_object({}, pixa_settings);
                        if(callback_function_info){ callback_function_info(null, _merge_object({}, window._pixa_settings))};

                    }

                } catch (err) {

                    error = err;
                }
            }else {

                const pixa_settings = _get_default_settings();
                window._pixa_settings = _merge_object({}, pixa_settings);

                window.settings_db.post({
                    info: JSON.stringify(pixa_settings),
                    timestamp: Date.now(),
                }), () => {

                    if(callback_function_info !== null) {

                        callback_function_info(null, _merge_object({}, window._pixa_settings));
                    }
                };
            }
        }


        if (error){

            if(callback_function_info !== null) {

                callback_function_info(error, null);
            }

            if(callback_function_attachment !== null) {

                callback_function_attachment("DB Error", null);
                return false;
            }
        }
    });
}

const set_settings = (info = {}, callback_function_info = () => {}, attachment_array = {}, LZP3 = null) => {

    window.settings_db.allDocs({
        include_docs: true,
        descending: false,
        attachments: true,
        binary: true
    }, (error, response) => {

        let settings_docs_undefined = false;

        if(!error) {

            // Get settings docs
            let settings_docs = response.rows.map((row) => {
                return row.doc;
            }).sort((a, b) =>  new Date(b.timestamp) - new Date(a.timestamp));

            // Choose the first
            if(typeof settings_docs[0] !== "undefined") {

                let pixa_settings = _merge_object(JSON.parse(settings_docs[0].info), info);
                window._pixa_settings = _merge_object({}, pixa_settings);

                try {

                    if(Object.keys(attachment_array).length >= 1) {

                        let attachments_to_process = Object.keys(attachment_array).length;
                        Object.entries(attachment_array).forEach(([name_id, data]) => {

                            if(data !== "delete") {

                                const {id, kb, preview, timestamp } = data;
                                pixa_settings.attachment_previews = pixa_settings.attachment_previews || {};
                                pixa_settings.attachment_previews[name_id] = {id, kb, preview, timestamp};

                                try {

                                    LZP3(data, "COMPRESS_OBJECT", pool).then((uint8a) => {

                                        settings_docs[0]._attachments = settings_docs[0]._attachments || {};
                                        settings_docs[0]._attachments[name_id] = {
                                            content_type: "application/octet-stream",
                                            data: new Blob([uint8a], {type : "application/octet-stream"})
                                        };
                                        attachments_to_process--;
                                        if(attachments_to_process === 0) {

                                            continue_push_in_db(settings_docs, pixa_settings, callback_function_info);
                                        }

                                    });
                                } catch (e) {

                                    callback_function_info("LZP3 not working", null);
                                    return false;
                                }


                            }else {

                                pixa_settings.attachment_previews = pixa_settings.attachment_previews  || {};
                                delete pixa_settings.attachment_previews[name_id];

                                window.settings_db.removeAttachment(settings_docs[0]._id, name_id, settings_docs[0]._rev).then((result) => {

                                    attachments_to_process--;
                                    if(attachments_to_process === 0) {

                                        continue_push_in_db(settings_docs, pixa_settings, callback_function_info);
                                    }
                                });
                            }
                        });

                        const  continue_push_in_db = (settings_docs, pixa_settings, callback_function_info ) => {

                            window.settings_db.put({
                                _id: settings_docs[0]._id,
                                _rev: settings_docs[0]._rev,
                                info: JSON.stringify(pixa_settings),
                                timestamp: Date.now(),
                                _attachments: settings_docs[0]._attachments,
                            }, {force: true}).then((response) => {

                                if(callback_function_info !== null) {

                                    callback_function_info(null, _merge_object({}, window._pixa_settings));
                                }

                                if(settings_docs.length > 1) {

                                    // Delete all others
                                    settings_docs.splice(0, 1);
                                    window.settings_db.bulkDocs(settings_docs.map((sd) => {return {_id: sd._id, _rev: sd._rev, _deleted: true, timestamp: 0, data: null, info: null, _attachments: {}}}), {force: true});
                                }

                                window.settings_db.compact();
                                window.settings_db.viewCleanup();
                            });
                        };

                    }else {

                        window.settings_db.put({
                            _id: settings_docs[0]._id,
                            _rev: settings_docs[0]._rev,
                            info: JSON.stringify(pixa_settings),
                            _attachments: settings_docs[0]._attachments,
                            timestamp: Date.now(),
                        }, {force: true}).then((response) => {

                            if(callback_function_info !== null) {

                                callback_function_info(null, _merge_object({}, window._pixa_settings));
                            }

                            if(settings_docs.length > 1) {

                                // Delete all others
                                settings_docs.splice(0, 1);
                                window.settings_db.bulkDocs(settings_docs.map((sd) => {return {_id: sd._id, _rev: sd._rev, _deleted: true, timestamp: 0, data: null, info: null, _attachments: {}}}), {force: true});
                            }
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

            let pixa_settings = _merge_object(window._pixa_settings, info);
            pixa_settings = _merge_object(_get_default_settings(), pixa_settings);
            window._pixa_settings = _merge_object({}, pixa_settings);


            if(Object.keys(attachment_array).length > 0) {

                let attachments = {};
                let blobs_to_add = attachment_array.length;
                Object.entries(attachment_array).forEach(([name_id, data]) => {

                    const {id, kb, preview, timestamp } = data;
                    pixa_settings.attachment_previews = pixa_settings.attachment_previews  || {};
                    pixa_settings.attachment_previews[name_id] = {id, kb, preview, timestamp};

                   try {

                        LZP3(data, "COMPRESS_OBJECT", pool).then((uint8a) => {

                            attachments[name_id] = {
                                content_type: "application/octet-stream",
                                data: new Blob([uint8a], {type : "application/octet-stream"})
                            };
                            blobs_to_add--;

                            if(blobs_to_add === 0) {

                                continue_push_in_db(attachments, pixa_settings);
                            }

                        });
                    } catch (e) {

                        callback_function_info("LZP3 not working", null);
                        return false;
                    }

                });

                const continue_push_in_db = (attachments, pixa_settings) => {

                    window.settings_db.post({
                        info: JSON.stringify(pixa_settings),
                        timestamp: Date.now(),
                        _attachments: attachments
                    }).then((response) => {

                        callback_function_info(null, _merge_object({}, window._pixa_settings));
                        window.settings_db.compact();
                        window.settings_db.viewCleanup();
                    });
                };

            }else {


                window.settings_db.post({
                    info: JSON.stringify(pixa_settings),
                    timestamp: Date.now(),
                }).then((response) => {

                    callback_function_info(null, _merge_object({}, pixa_settings));

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
