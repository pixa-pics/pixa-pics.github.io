import { CURRENCY_COUNTRIES } from "../utils/constants";
import get_browser_locales from "../utils/locales";
import PouchDB from "pouchdb-core";
import PouchDB_IDB from "pouchdb-adapter-idb";
import PouchDB_memory from "pouchdb-adapter-memory";

const init = () => {

    return new Promise(function(resolve, reject){

        if(!Boolean(window.settings_db)) {

            PouchDB.on("created",  async function(){

                if(Boolean(window._pixa_settings)) {

                    window._pixa_settings = _merge_object({}, _get_default_settings());
                    resolve(_merge_object({}, window._pixa_settings));

                    setTimeout(() => {

                        window.settings_db.post({
                            info: JSON.stringify(_merge_object({}, window._pixa_settings)),
                            timestamp: Date.now(),
                        });
                    }, 100);
                }else {

                    resolve(_merge_object({}, window._pixa_settings));
                }
            });

            try {

                PouchDB.plugin(PouchDB_memory);
                PouchDB.plugin(PouchDB_IDB);
                window.settings_db = new PouchDB("settings_db", {adapter: "idb", view_adapter: "memory", deterministic_revs: true, revs_limit: 1});
            }catch (e) {

                reset_all_databases(function(){

                    window.location.reload();
                });
            }


        }else if(Boolean(window._pixa_settings)){

            resolve(_merge_object({}, window._pixa_settings));
        }else {

            window.settings_db.allDocs({
                include_docs: true,
                descending: false,
                attachments: false,
                binary: false
            }).then(async function (response) {

                let settings_docs = response.rows.map((row) => {
                    return row.doc;
                }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                let settings_doc = settings_docs.splice(0, 1)[0] || null;

                // Choose the first
                if (settings_doc !== null) {

                    window._pixa_settings = _merge_object({}, JSON.parse(settings_doc.info));
                    resolve(_merge_object({}, window._pixa_settings));
                }

            }).catch(function (error) {
                reject(error)
            });
        }
    });

};

const _merge_object = (obj1, obj2) => {

    return Object.assign(obj1, obj2);
};

const _get_default_settings = () => {

    const locales = get_browser_locales()[0].split("-").length === 2 ? get_browser_locales()[0]: "en-US";

    return {
        locales: locales,
        currency: _get_currency_by_locales(locales),
        bdi: 1,
        ret: 5,
        camo: 0,
        sfx_enabled: true,
        jamy_enabled: true,
        voice_enabled: true,
        music_enabled: false,
        activation_enabled: true,
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

const get_settings = (callback_function_info = null, attachment_ids = [], callback_function_attachment = null, UJS = null, POOL = null ) => {

    if(typeof window._pixa_settings !== "undefined" && window._pixa_settings !== null) {

        if(typeof window._pixa_settings.locales !== "undefined" && window._pixa_settings.locales !== null) {

            if(callback_function_info !== null) {

                callback_function_info(null, _merge_object({}, window._pixa_settings));
            }

            if(attachment_ids === [] && callback_function_attachment === null) {

                return null;
            }
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
            response = null;

            let settings_doc = settings_docs.splice(0, 1)[0] || null;
            settings_docs = settings_docs.map((sd, sdi) => {return {_id: sd._id, _rev: sd._rev, _deleted: true, timestamp: 0, data: null, info: null, _attachments: {}}})

            // Choose the first
            if(settings_doc !== null) {

                try {

                    if(Boolean(callback_function_attachment !== null) &&  Boolean(Boolean(attachment_ids.length > 0) || Boolean(attachment_ids === "all"))) {

                        // retrieve a data attachment
                        window.settings_db.get(settings_doc._id, {
                            rev: settings_doc._rev,
                            attachments: true,
                            binary: true
                        }, (error_doc, doc) => {

                            if(!error_doc) {

                                window._pixa_settings = _merge_object({}, JSON.parse(doc.info));
                                if(callback_function_info){ callback_function_info(null, _merge_object({}, window._pixa_settings))}

                                let blobs = {};
                                if(Boolean(doc._attachments)) {

                                    Object.entries(doc._attachments).forEach(([name_id, value]) => {

                                        if(Boolean( attachment_ids === "all") || attachment_ids.includes(name_id)) {

                                            blobs[name_id] = value.data;
                                        }
                                    });

                                    Object.entries(blobs).forEach(([name_id, blob]) => {

                                        blob.arrayBuffer().then((array_buffer) => {

                                            try {

                                                UJS(new Uint8Array(array_buffer), "DECOMPRESS_UINT8A", POOL).then((obj) => {

                                                    callback_function_attachment(null, Object.assign({}, obj));
                                                    obj = null;
                                                });
                                                array_buffer = null;

                                            } catch (e) {

                                                callback_function_attachment("UraniumJS modules not working", null);
                                            }
                                        }).catch((e) => {

                                            callback_function_attachment("DB not working", null);
                                        });
                                        blob = null;
                                    });

                                    let delete_count = 0;
                                    window._pixa_settings.attachment_previews = window._pixa_settings.attachment_previews || {};
                                    attachment_ids.forEach((att_id) => {

                                        if(!Boolean(blobs[att_id])) {

                                            delete window._pixa_settings.attachment_previews[att_id];
                                            delete_count++;
                                        }
                                    });

                                    blobs = null;

                                    if(delete_count > 0) {

                                        window.settings_db.put({
                                            _id: doc._id,
                                            _rev: doc._rev,
                                            info: JSON.stringify(_merge_object({}, window._pixa_settings)),
                                            timestamp: Date.now(),
                                            _attachments: settings_doc._attachments,
                                        }, {force: true}, (err) => {

                                            callback_function_attachment("Empty DB files", null);
                                        });

                                    }
                                }else {

                                    callback_function_attachment("Empty DB files", null);
                                }
                            }else {

                                callback_function_attachment("DB not working", null);
                                if(callback_function_info){ callback_function_info("DB not working", null)}
                            }

                        });

                    }else {

                        window._pixa_settings = _merge_object({}, JSON.parse(settings_doc.info));
                        if(callback_function_info){ callback_function_info(null, _merge_object({}, window._pixa_settings))};

                    }

                } catch (err) {

                    error = err;
                }
            }else {

                window._pixa_settings = _merge_object({}, _get_default_settings());
                if(callback_function_info){ callback_function_info(null, _merge_object({}, window._pixa_settings))};
                window.settings_db.post({
                    info: JSON.stringify(_merge_object({}, window._pixa_settings)),
                    timestamp: Date.now(),
                }, function (){});
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

const set_settings = (info = {}, callback_function_info = () => {}, attachment_array = {}, UJS = null, POOL = null, callback_function_attachment = null) => {

    window.settings_db.allDocs({
        include_docs: true,
        descending: false,
        attachments: Boolean(Object.keys(attachment_array).length > 0),
        binary: Boolean(Object.keys(attachment_array).length > 0)
    }, (error, response) => {

        let settings_docs_undefined = false;

        if(!error) {

            // Get settings docs
            let settings_docs = response.rows.map((row) => {
                return row.doc;
            }).sort((a, b) =>  new Date(b.timestamp) - new Date(a.timestamp));
            response = null;

            let settings_doc = settings_docs.splice(0, 1)[0] || null;
            settings_docs = settings_docs.map((sd, sdi) => {return {_id: sd._id, _rev: sd._rev, _deleted: true, timestamp: 0, data: null, info: null, _attachments: {}}})

            // Choose the first
            if(settings_doc !== null) {

                let pixa_settings = _merge_object(JSON.parse(settings_doc.info), info);
                window._pixa_settings = _merge_object({}, pixa_settings);

                try {

                    if(Object.keys(attachment_array).length > 0) {

                        let attachments_to_process = Object.keys(attachment_array).length;
                        Object.entries(attachment_array).forEach(([name_id, data]) => {

                            if(data !== "delete") {

                                const {id, kb, preview, timestamp } = data;
                                window._pixa_settings.attachment_previews = window._pixa_settings.attachment_previews || {};
                                window._pixa_settings.attachment_previews[name_id] = {id, kb, preview, timestamp};

                                try {

                                    UJS(data, "COMPRESS_OBJECT", POOL).then((with_buffer) => {

                                        settings_doc._attachments = settings_doc._attachments || {};
                                        settings_doc._attachments[name_id] = {
                                            content_type: "application/octet-stream",
                                            data: new Blob([with_buffer], {type : "application/octet-stream"})
                                        };
                                        attachments_to_process--;
                                        if(attachments_to_process === 0) {

                                            continue_push_in_db(settings_doc, settings_docs, callback_function_info);
                                        }

                                    });
                                } catch (e) {

                                    callback_function_info("UraniumJS modules not working", null);
                                    return false;
                                }


                            }else {

                                window.settings_db.removeAttachment(settings_doc._id, name_id, settings_doc._rev, (err, res) => {

                                    let ap = Object.assign({}, window._pixa_settings.attachment_previews);
                                    delete ap[name_id];
                                    window._pixa_settings = Object.assign(window._pixa_settings, {attachment_previews: ap});

                                    attachments_to_process--;
                                    if(attachments_to_process === 0) {

                                        window.settings_db.put({
                                            _id: settings_doc._id,
                                            _rev: settings_doc._rev,
                                            info: JSON.stringify(_merge_object({}, window._pixa_settings)),
                                            timestamp: Date.now(),
                                            _attachments: settings_doc._attachments
                                        }, {force: true}, (err) => {

                                            if(!err) {


                                                if(settings_docs.length > 0) {

                                                    // Delete all others
                                                    Promise.allSettled(settings_docs.map((p) => {

                                                        return window.settings_db.put(p, {force: true});
                                                    })).finally(() => {

                                                        window.settings_db.compact();
                                                    });

                                                    if(callback_function_info !== null) {

                                                        callback_function_info(null, _merge_object({}, window._pixa_settings));
                                                    }
                                                }

                                                if(callback_function_attachment !== null) {

                                                    callback_function_attachment(null, true);
                                                }
                                            }else {

                                                if(callback_function_info !== null) {

                                                    callback_function_info("DB error post", null);
                                                }

                                                if(callback_function_attachment !== null) {

                                                    callback_function_attachment("DB error post", false);
                                                }
                                            }

                                        });
                                    }
                                });
                            }
                        });

                        const continue_push_in_db = (settings_doc, settings_docs, callback_function_info ) => {

                            window.settings_db.put({
                                _id: settings_doc._id,
                                _rev: settings_doc._rev,
                                info: JSON.stringify(_merge_object({}, window._pixa_settings)),
                                timestamp: Date.now(),
                                _attachments: settings_doc._attachments,
                            }, {force: true}, (err) => {

                                if(!err) {

                                    if(callback_function_attachment !== null) {
                                        callback_function_attachment(null, true);
                                    }
                                    if(settings_docs.length > 0) {

                                        // Delete all others
                                        Promise.allSettled(settings_docs.map((p) => {

                                            return window.settings_db.put(p, {force: true});
                                        })).finally(() => {

                                            window.settings_db.compact();
                                        });
                                    }

                                    if(callback_function_info !== null) {

                                        callback_function_info(null, _merge_object({}, window._pixa_settings));
                                    }

                                }else {

                                    if(callback_function_attachment !== null) {
                                        callback_function_attachment(err, false);
                                    }
                                    if(callback_function_info !== null) {

                                        callback_function_info("DB error post", null);
                                    }
                                }
                            });
                        };

                    }else {

                        window.settings_db.put({
                            _id: settings_doc._id,
                            _rev: settings_doc._rev,
                            info: JSON.stringify(_merge_object({}, window._pixa_settings)),
                            timestamp: Date.now(),
                            _attachments: settings_doc._attachments,
                        }, {force: true}, (err) => {

                            if(!err) {

                                if(settings_docs.length > 0) {

                                    // Delete all others
                                    Promise.allSettled(settings_docs.map((p) => {

                                        return window.settings_db.put(p, {force: true});
                                    })).finally(() => {

                                        window.settings_db.compact();
                                    });
                                }

                                if(callback_function_info !== null) {

                                    callback_function_info(null, _merge_object({}, window._pixa_settings));
                                }

                            }else {

                                if(callback_function_info !== null) {

                                    callback_function_info("DB error post", null);
                                }
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
                    window._pixa_settings.attachment_previews = window._pixa_settings.attachment_previews  || {};
                    window._pixa_settings.attachment_previews[name_id] = {id, kb, preview, timestamp};

                    try {

                        UJS(data, "COMPRESS_OBJECT", POOL).then((with_buffer) => {

                            attachments[name_id] = {
                                content_type: "application/octet-stream",
                                data: new Blob([with_buffer], {type : "application/octet-stream"})
                            };
                            blobs_to_add--;

                            if(blobs_to_add === 0) {

                                continue_push_in_db(attachments);
                            }

                        });
                    } catch (e) {

                        callback_function_info("UraniumJS modules not working", null);
                        return false;
                    }

                });

                const continue_push_in_db = (attachments) => {

                    window.settings_db.post({
                        info: JSON.stringify(_merge_object({}, window._pixa_settings)),
                        timestamp: Date.now(),
                        _attachments: attachments
                    }, (err) => {

                        if(err) {

                            callback_function_info("DB post error", null);
                        }else {

                            callback_function_info(null, _merge_object({}, window._pixa_settings));
                        }
                    });
                };

            }else {


                window.settings_db.post({
                    info: JSON.stringify(pixa_settings),
                    timestamp: Date.now(),
                }, (err) => {

                    if(err) {

                        callback_function_info("DB post error", null);
                    }else {

                        callback_function_info(null, _merge_object({}, window._pixa_settings));
                    }

                });

            }
        }else if(error) {

            callback_function_info("unknown error", null);
        }
    });
}

module.exports = {
    init: init,
    reset_all_databases: reset_all_databases,
    get_settings: get_settings,
    set_settings: set_settings
}