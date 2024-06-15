var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
        throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
};
var _currentLine;
var fn = new Intl.Collator(0, { numeric: 1 }).compare;
function semiver(a, b, bool) {
    a = a.split(".");
    b = b.split(".");
    return fn(a[0], b[0]) || fn(a[1], b[1]) || (b[2] = b.slice(2).join("."), bool = /[.-]/.test(a[2] = a.slice(2).join(".")), bool == /[.-]/.test(b[2]) ? fn(a[2], b[2]) : bool ? -1 : 1);
}
const HOST_URL = "host";
const UPLOAD_URL = "upload";
const LOGIN_URL = "login";
const CONFIG_URL = "config";
const API_INFO_URL = "info";
const RUNTIME_URL = "runtime";
const SLEEPTIME_URL = "sleeptime";
const SPACE_FETCHER_URL = "https://gradio-space-api-fetcher-v2.hf.space/api";
const QUEUE_FULL_MSG = "This application is currently busy. Please try again. ";
const BROKEN_CONNECTION_MSG = "Connection errored out. ";
const CONFIG_ERROR_MSG = "Could not resolve app config. ";
const SPACE_STATUS_ERROR_MSG = "Could not get space status. ";
const API_INFO_ERROR_MSG = "Could not get API info. ";
const SPACE_METADATA_ERROR_MSG = "Space metadata could not be loaded. ";
const INVALID_URL_MSG = "Invalid URL. A full URL path is required.";
const UNAUTHORIZED_MSG = "Not authorized to access this space. ";
const INVALID_CREDENTIALS_MSG = "Invalid credentials. Could not login. ";
const MISSING_CREDENTIALS_MSG = "Login credentials are required to access this space.";
const NODEJS_FS_ERROR_MSG = "File system access is only available in Node.js environments";
const ROOT_URL_ERROR_MSG = "Root URL not found in client config";
const FILE_PROCESSING_ERROR_MSG = "Error uploading file";
function resolve_root(base_url, root_path, prioritize_base) {
    if (root_path.startsWith("http://") || root_path.startsWith("https://")) {
        return prioritize_base ? base_url : root_path;
    }
    return base_url + root_path;
}
async function get_jwt(space, token, cookies) {
    try {
        const r = await fetch(`https://huggingface.co/api/spaces/${space}/jwt`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...cookies ? { Cookie: cookies } : {}
            }
        });
        const jwt = (await r.json()).token;
        return jwt || false;
    } catch (e) {
        return false;
    }
}
function map_names_to_ids(fns) {
    let apis = {};
    fns.forEach(({ api_name, id }) => {
        if (api_name)
            apis[api_name] = id;
    });
    return apis;
}
async function resolve_config(endpoint) {
    var _a;
    const headers = this.options.hf_token ? { Authorization: `Bearer ${this.options.hf_token}` } : {};
    headers["Content-Type"] = "application/json";
    if (typeof window !== "undefined" && window.gradio_config && location.origin !== "http://localhost:9876" && !window.gradio_config.dev_mode) {
        const path = window.gradio_config.root;
        const config = window.gradio_config;
        let config_root = resolve_root(endpoint, config.root, false);
        config.root = config_root;
        return { ...config, path };
    } else if (endpoint) {
        const config_url = join_urls(endpoint, CONFIG_URL);
        const response = await this.fetch(config_url, {
            headers,
            credentials: "include"
        });
        if ((response == null ? void 0 : response.status) === 401 && !this.options.auth) {
            throw new Error(MISSING_CREDENTIALS_MSG);
        } else if ((response == null ? void 0 : response.status) === 401 && this.options.auth) {
            throw new Error(INVALID_CREDENTIALS_MSG);
        }
        if ((response == null ? void 0 : response.status) === 200) {
            let config = await response.json();
            config.path = config.path || "";
            config.root = endpoint;
            (_a = config.dependencies) == null ? void 0 : _a.forEach((dep, i) => {
                if (dep.id === void 0) {
                    dep.id = i;
                }
            });
            return config;
        } else if ((response == null ? void 0 : response.status) === 401) {
            throw new Error(UNAUTHORIZED_MSG);
        }
        throw new Error(CONFIG_ERROR_MSG);
    }
    throw new Error(CONFIG_ERROR_MSG);
}
async function resolve_cookies() {
    const { http_protocol, host } = await process_endpoint(
        this.app_reference,
        this.options.hf_token
    );
    try {
        if (this.options.auth) {
            const cookie_header = await get_cookie_header(
                http_protocol,
                host,
                this.options.auth,
                this.fetch,
                this.options.hf_token
            );
            if (cookie_header)
                this.set_cookies(cookie_header);
        }
    } catch (e) {
        throw Error(e.message);
    }
}
async function get_cookie_header(http_protocol, host, auth, _fetch, hf_token) {
    const formData = new FormData();
    formData.append("username", auth == null ? void 0 : auth[0]);
    formData.append("password", auth == null ? void 0 : auth[1]);
    let headers = {};
    if (hf_token) {
        headers.Authorization = `Bearer ${hf_token}`;
    }
    const res = await _fetch(`${http_protocol}//${host}/${LOGIN_URL}`, {
        headers,
        method: "POST",
        body: formData,
        credentials: "include"
    });
    if (res.status === 200) {
        return res.headers.get("set-cookie");
    } else if (res.status === 401) {
        throw new Error(INVALID_CREDENTIALS_MSG);
    } else {
        throw new Error(SPACE_METADATA_ERROR_MSG);
    }
}
function determine_protocol(endpoint) {
    if (endpoint.startsWith("http")) {
        const { protocol, host, pathname } = new URL(endpoint);
        if (host.endsWith("hf.space")) {
            return {
                ws_protocol: "wss",
                host,
                http_protocol: protocol
            };
        }
        return {
            ws_protocol: protocol === "https:" ? "wss" : "ws",
            http_protocol: protocol,
            host: host + (pathname !== "/" ? pathname : "")
        };
    } else if (endpoint.startsWith("file:")) {
        return {
            ws_protocol: "ws",
            http_protocol: "http:",
            host: "lite.local"
            // Special fake hostname only used for this case. This matches the hostname allowed in `is_self_host()` in `js/wasm/network/host.ts`.
        };
    }
    return {
        ws_protocol: "wss",
        http_protocol: "https:",
        host: endpoint
    };
}
const parse_and_set_cookies = (cookie_header) => {
    let cookies = [];
    const parts = cookie_header.split(/,(?=\s*[^\s=;]+=[^\s=;]+)/);
    parts.forEach((cookie) => {
        const [cookie_name, cookie_value] = cookie.split(";")[0].split("=");
        if (cookie_name && cookie_value) {
            cookies.push(`${cookie_name.trim()}=${cookie_value.trim()}`);
        }
    });
    return cookies;
};
const RE_SPACE_NAME = /^[a-zA-Z0-9_\-\.]+\/[a-zA-Z0-9_\-\.]+$/;
const RE_SPACE_DOMAIN = /.*hf\.space\/{0,1}$/;
async function process_endpoint(app_reference, hf_token) {
    const headers = {};
    if (hf_token) {
        headers.Authorization = `Bearer ${hf_token}`;
    }
    const _app_reference = app_reference.trim().replace(/\/$/, "");
    if (RE_SPACE_NAME.test(_app_reference)) {
        try {
            const res = await fetch(
                `https://huggingface.co/api/spaces/${_app_reference}/${HOST_URL}`,
                { headers }
            );
            const _host = (await res.json()).host;
            return {
                space_id: app_reference,
                ...determine_protocol(_host)
            };
        } catch (e) {
            throw new Error(SPACE_METADATA_ERROR_MSG);
        }
    }
    if (RE_SPACE_DOMAIN.test(_app_reference)) {
        const { ws_protocol, http_protocol, host } = determine_protocol(_app_reference);
        return {
            space_id: host.replace(".hf.space", ""),
            ws_protocol,
            http_protocol,
            host
        };
    }
    return {
        space_id: false,
        ...determine_protocol(_app_reference)
    };
}
const join_urls = (...urls) => {
    try {
        return urls.reduce((base_url, part) => {
            base_url = base_url.replace(/\/+$/, "");
            part = part.replace(/^\/+/, "");
            return new URL(part, base_url + "/").toString();
        });
    } catch (e) {
        throw new Error(INVALID_URL_MSG);
    }
};
function transform_api_info(api_info, config, api_map) {
    const transformed_info = {
        named_endpoints: {},
        unnamed_endpoints: {}
    };
    Object.keys(api_info).forEach((category) => {
        if (category === "named_endpoints" || category === "unnamed_endpoints") {
            transformed_info[category] = {};
            Object.entries(api_info[category]).forEach(
                ([endpoint, { parameters, returns }]) => {
                    var _a, _b, _c, _d;
                    const dependencyIndex = ((_a = config.dependencies.find(
                        (dep) => dep.api_name === endpoint || dep.api_name === endpoint.replace("/", "")
                    )) == null ? void 0 : _a.id) || api_map[endpoint.replace("/", "")] || -1;
                    const dependencyTypes = dependencyIndex !== -1 ? (_b = config.dependencies.find((dep) => dep.id == dependencyIndex)) == null ? void 0 : _b.types : { continuous: false, generator: false, cancel: false };
                    if (dependencyIndex !== -1 && ((_d = (_c = config.dependencies.find((dep) => dep.id == dependencyIndex)) == null ? void 0 : _c.inputs) == null ? void 0 : _d.length) !== parameters.length) {
                        const components = config.dependencies.find((dep) => dep.id == dependencyIndex).inputs.map(
                            (input) => {
                                var _a2;
                                return (_a2 = config.components.find((c) => c.id === input)) == null ? void 0 : _a2.type;
                            }
                        );
                        try {
                            components.forEach((comp, idx) => {
                                if (comp === "state") {
                                    const new_param = {
                                        component: "state",
                                        example: null,
                                        parameter_default: null,
                                        parameter_has_default: true,
                                        parameter_name: null,
                                        hidden: true
                                    };
                                    parameters.splice(idx, 0, new_param);
                                }
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    const transform_type = (data, component, serializer, signature_type) => ({
                        ...data,
                        description: get_description(data == null ? void 0 : data.type, serializer),
                        type: get_type(data == null ? void 0 : data.type, component, serializer, signature_type) || ""
                    });
                    transformed_info[category][endpoint] = {
                        parameters: parameters.map(
                            (p) => transform_type(p, p == null ? void 0 : p.component, p == null ? void 0 : p.serializer, "parameter")
                        ),
                        returns: returns.map(
                            (r) => transform_type(r, r == null ? void 0 : r.component, r == null ? void 0 : r.serializer, "return")
                        ),
                        type: dependencyTypes
                    };
                }
            );
        }
    });
    return transformed_info;
}
function get_type(type, component, serializer, signature_type) {
    switch (type == null ? void 0 : type.type) {
        case "string":
            return "string";
        case "boolean":
            return "boolean";
        case "number":
            return "number";
    }
    if (serializer === "JSONSerializable" || serializer === "StringSerializable") {
        return "any";
    } else if (serializer === "ListStringSerializable") {
        return "string[]";
    } else if (component === "Image") {
        return signature_type === "parameter" ? "Blob | File | Buffer" : "string";
    } else if (serializer === "FileSerializable") {
        if ((type == null ? void 0 : type.type) === "array") {
            return signature_type === "parameter" ? "(Blob | File | Buffer)[]" : `{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}[]`;
        }
        return signature_type === "parameter" ? "Blob | File | Buffer" : `{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}`;
    } else if (serializer === "GallerySerializable") {
        return signature_type === "parameter" ? "[(Blob | File | Buffer), (string | null)][]" : `[{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}, (string | null))][]`;
    }
}
function get_description(type, serializer) {
    if (serializer === "GallerySerializable") {
        return "array of [file, label] tuples";
    } else if (serializer === "ListStringSerializable") {
        return "array of strings";
    } else if (serializer === "FileSerializable") {
        return "array of files or single file";
    }
    return type == null ? void 0 : type.description;
}
function handle_message(data, last_status) {
    const queue = true;
    switch (data.msg) {
        case "send_data":
            return { type: "data" };
        case "send_hash":
            return { type: "hash" };
        case "queue_full":
            return {
                type: "update",
                status: {
                    queue,
                    message: QUEUE_FULL_MSG,
                    stage: "error",
                    code: data.code,
                    success: data.success
                }
            };
        case "heartbeat":
            return {
                type: "heartbeat"
            };
        case "unexpected_error":
            return {
                type: "unexpected_error",
                status: {
                    queue,
                    message: data.message,
                    stage: "error",
                    success: false
                }
            };
        case "estimation":
            return {
                type: "update",
                status: {
                    queue,
                    stage: last_status || "pending",
                    code: data.code,
                    size: data.queue_size,
                    position: data.rank,
                    eta: data.rank_eta,
                    success: data.success
                }
            };
        case "progress":
            return {
                type: "update",
                status: {
                    queue,
                    stage: "pending",
                    code: data.code,
                    progress_data: data.progress_data,
                    success: data.success
                }
            };
        case "log":
            return { type: "log", data };
        case "process_generating":
            return {
                type: "generating",
                status: {
                    queue,
                    message: !data.success ? data.output.error : null,
                    stage: data.success ? "generating" : "error",
                    code: data.code,
                    progress_data: data.progress_data,
                    eta: data.average_duration
                },
                data: data.success ? data.output : null
            };
        case "process_completed":
            if ("error" in data.output) {
                return {
                    type: "update",
                    status: {
                        queue,
                        message: data.output.error,
                        stage: "error",
                        code: data.code,
                        success: data.success
                    }
                };
            }
            return {
                type: "complete",
                status: {
                    queue,
                    message: !data.success ? data.output.error : void 0,
                    stage: data.success ? "complete" : "error",
                    code: data.code,
                    progress_data: data.progress_data,
                    changed_state_ids: data.success ? data.output.changed_state_ids : void 0
                },
                data: data.success ? data.output : null
            };
        case "process_starts":
            return {
                type: "update",
                status: {
                    queue,
                    stage: "pending",
                    code: data.code,
                    size: data.rank,
                    position: 0,
                    success: data.success,
                    eta: data.eta
                }
            };
    }
    return { type: "none", status: { stage: "error", queue } };
}
const map_data_to_params = (data, api_info) => {
    const parameters = Object.values(api_info.named_endpoints).flatMap(
        (values) => values.parameters
    );
    if (Array.isArray(data)) {
        if (data.length > parameters.length) {
            console.warn("Too many arguments provided for the endpoint.");
        }
        return data;
    }
    const resolved_data = [];
    const provided_keys = Object.keys(data);
    parameters.forEach((param, index) => {
        if (data.hasOwnProperty(param.parameter_name)) {
            resolved_data[index] = data[param.parameter_name];
        } else if (param.parameter_has_default) {
            resolved_data[index] = param.parameter_default;
        } else {
            throw new Error(
                `No value provided for required parameter: ${param.parameter_name}`
            );
        }
    });
    provided_keys.forEach((key) => {
        if (!parameters.some((param) => param.parameter_name === key)) {
            throw new Error(
                `Parameter \`${key}\` is not a valid keyword argument. Please refer to the API for usage.`
            );
        }
    });
    resolved_data.forEach((value, idx) => {
        if (value === void 0 && !parameters[idx].parameter_has_default) {
            throw new Error(
                `No value provided for required parameter: ${parameters[idx].parameter_name}`
            );
        }
    });
    return resolved_data;
};
async function view_api() {
    if (this.api_info)
        return this.api_info;
    const { hf_token } = this.options;
    const { config } = this;
    const headers = { "Content-Type": "application/json" };
    if (hf_token) {
        headers.Authorization = `Bearer ${hf_token}`;
    }
    if (!config) {
        return;
    }
    try {
        let response;
        if (semiver((config == null ? void 0 : config.version) || "2.0.0", "3.30") < 0) {
            response = await this.fetch(SPACE_FETCHER_URL, {
                method: "POST",
                body: JSON.stringify({
                    serialize: false,
                    config: JSON.stringify(config)
                }),
                headers,
                credentials: "include"
            });
        } else {
            const url = join_urls(config.root, API_INFO_URL);
            response = await this.fetch(url, {
                headers,
                credentials: "include"
            });
        }
        if (!response.ok) {
            throw new Error(BROKEN_CONNECTION_MSG);
        }
        let api_info = await response.json();
        if ("api" in api_info) {
            api_info = api_info.api;
        }
        if (api_info.named_endpoints["/predict"] && !api_info.unnamed_endpoints["0"]) {
            api_info.unnamed_endpoints[0] = api_info.named_endpoints["/predict"];
        }
        return transform_api_info(api_info, config, this.api_map);
    } catch (e) {
        "Could not get API info. " + e.message;
    }
}
async function upload_files(root_url, files, upload_id) {
    var _a;
    const headers = {};
    if ((_a = this == null ? void 0 : this.options) == null ? void 0 : _a.hf_token) {
        headers.Authorization = `Bearer ${this.options.hf_token}`;
    }
    const chunkSize = 1e3;
    const uploadResponses = [];
    let response;
    for (let i = 0; i < files.length; i += chunkSize) {
        const chunk = files.slice(i, i + chunkSize);
        const formData = new FormData();
        chunk.forEach((file) => {
            formData.append("files", file);
        });
        try {
            const upload_url = upload_id ? `${root_url}/${UPLOAD_URL}?upload_id=${upload_id}` : `${root_url}/${UPLOAD_URL}`;
            response = await this.fetch(upload_url, {
                method: "POST",
                body: formData,
                headers,
                credentials: "include"
            });
        } catch (e) {
            throw new Error(BROKEN_CONNECTION_MSG + e.message);
        }
        if (!response.ok) {
            const error_text = await response.text();
            return { error: `HTTP ${response.status}: ${error_text}` };
        }
        const output = await response.json();
        if (output) {
            uploadResponses.push(...output);
        }
    }
    return { files: uploadResponses };
}
async function upload(file_data, root_url, upload_id, max_file_size) {
    let files = (Array.isArray(file_data) ? file_data : [file_data]).map(
        (file_data2) => file_data2.blob
    );
    const oversized_files = files.filter(
        (f) => f.size > (max_file_size || Infinity)
    );
    if (oversized_files.length) {
        throw new Error(
            `File size exceeds the maximum allowed size of ${max_file_size} bytes: ${oversized_files.map((f) => f.name).join(", ")}`
        );
    }
    return await Promise.all(
        await this.upload_files(root_url, files, upload_id).then(
            async (response) => {
                if (response.error) {
                    throw new Error(response.error);
                } else {
                    if (response.files) {
                        return response.files.map((f, i) => {
                            const file = new FileData({
                                ...file_data[i],
                                path: f,
                                url: root_url + "/file=" + f
                            });
                            return file;
                        });
                    }
                    return [];
                }
            }
        )
    );
}
async function prepare_files(files, is_stream) {
    return files.map(
        (f) => new FileData({
            path: f.name,
            orig_name: f.name,
            blob: f,
            size: f.size,
            mime_type: f.type,
            is_stream
        })
    );
}
class FileData {
    constructor({
                    path,
                    url,
                    orig_name,
                    size,
                    blob,
                    is_stream,
                    mime_type,
                    alt_text
                }) {
        __publicField(this, "path");
        __publicField(this, "url");
        __publicField(this, "orig_name");
        __publicField(this, "size");
        __publicField(this, "blob");
        __publicField(this, "is_stream");
        __publicField(this, "mime_type");
        __publicField(this, "alt_text");
        __publicField(this, "meta", { _type: "gradio.FileData" });
        this.path = path;
        this.url = url;
        this.orig_name = orig_name;
        this.size = size;
        this.blob = url ? void 0 : blob;
        this.is_stream = is_stream;
        this.mime_type = mime_type;
        this.alt_text = alt_text;
    }
}
class Command {
    constructor(command, meta) {
        __publicField(this, "type");
        __publicField(this, "command");
        __publicField(this, "meta");
        __publicField(this, "fileData");
        this.type = "command";
        this.command = command;
        this.meta = meta;
    }
}
const is_node = typeof process !== "undefined" && process.versions && process.versions.node;
function update_object(object, newValue, stack) {
    while (stack.length > 1) {
        const key2 = stack.shift();
        if (typeof key2 === "string" || typeof key2 === "number") {
            object = object[key2];
        } else {
            throw new Error("Invalid key type");
        }
    }
    const key = stack.shift();
    if (typeof key === "string" || typeof key === "number") {
        object[key] = newValue;
    } else {
        throw new Error("Invalid key type");
    }
}
async function walk_and_store_blobs(data, type = void 0, path = [], root = false, endpoint_info = void 0) {
    if (Array.isArray(data)) {
        let blob_refs = [];
        await Promise.all(
            data.map(async (_, index) => {
                var _a;
                let new_path = path.slice();
                new_path.push(String(index));
                const array_refs = await walk_and_store_blobs(
                    data[index],
                    root ? ((_a = endpoint_info == null ? void 0 : endpoint_info.parameters[index]) == null ? void 0 : _a.component) || void 0 : type,
                    new_path,
                    false,
                    endpoint_info
                );
                blob_refs = blob_refs.concat(array_refs);
            })
        );
        return blob_refs;
    } else if (globalThis.Buffer && data instanceof globalThis.Buffer || data instanceof Blob) {
        return [
            {
                path,
                blob: new Blob([data]),
                type
            }
        ];
    } else if (typeof data === "object" && data !== null) {
        let blob_refs = [];
        for (const key of Object.keys(data)) {
            const new_path = [...path, key];
            const value = data[key];
            blob_refs = blob_refs.concat(
                await walk_and_store_blobs(
                    value,
                    void 0,
                    new_path,
                    false,
                    endpoint_info
                )
            );
        }
        return blob_refs;
    }
    return [];
}
function skip_queue(id, config) {
    var _a, _b;
    let fn_queue = (_b = (_a = config == null ? void 0 : config.dependencies) == null ? void 0 : _a.find((dep) => dep.id == id)) == null ? void 0 : _b.queue;
    if (fn_queue != null) {
        return !fn_queue;
    }
    return !config.enable_queue;
}
function post_message(message, origin) {
    return new Promise((res, _rej) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = ({ data }) => {
            channel.port1.close();
            res(data);
        };
        window.parent.postMessage(message, origin, [channel.port2]);
    });
}
function handle_file(file_or_url) {
    if (typeof file_or_url === "string") {
        if (file_or_url.startsWith("http://") || file_or_url.startsWith("https://")) {
            return {
                path: file_or_url,
                url: file_or_url,
                orig_name: file_or_url.split("/").pop() || "unknown",
                meta: { _type: "gradio.FileData" }
            };
        }
        if (is_node) {
            return new Command("upload_file", {
                path: file_or_url,
                name: file_or_url,
                orig_path: file_or_url
            });
        }
    } else if (typeof File !== "undefined" && file_or_url instanceof File) {
        return {
            path: file_or_url instanceof File ? file_or_url.name : "blob",
            orig_name: file_or_url instanceof File ? file_or_url.name : "unknown",
            // @ts-ignore
            blob: file_or_url instanceof File ? file_or_url : new Blob([file_or_url]),
            size: file_or_url instanceof Blob ? file_or_url.size : Buffer.byteLength(file_or_url),
            mime_type: file_or_url instanceof File ? file_or_url.type : "application/octet-stream",
            // Default MIME type for buffers
            meta: { _type: "gradio.FileData" }
        };
    } else if (file_or_url instanceof Buffer) {
        return new Blob([file_or_url]);
    } else if (file_or_url instanceof Blob) {
        return file_or_url;
    }
    throw new Error(
        "Invalid input: must be a URL, File, Blob, or Buffer object."
    );
}
function handle_payload(resolved_payload, dependency, components, type, with_null_state = false) {
    if (type === "input" && !with_null_state) {
        throw new Error("Invalid code path. Cannot skip state inputs for input.");
    }
    if (type === "output" && with_null_state) {
        return resolved_payload;
    }
    let updated_payload = [];
    let payload_index = 0;
    for (let i = 0; i < dependency.inputs.length; i++) {
        const input_id = dependency.inputs[i];
        const component = components.find((c) => c.id === input_id);
        if ((component == null ? void 0 : component.type) === "state") {
            if (with_null_state) {
                if (resolved_payload.length === dependency.inputs.length) {
                    const value = resolved_payload[payload_index];
                    updated_payload.push(value);
                    payload_index++;
                } else {
                    updated_payload.push(null);
                }
            } else {
                payload_index++;
                continue;
            }
            continue;
        } else {
            const value = resolved_payload[payload_index];
            updated_payload.push(value);
            payload_index++;
        }
    }
    return updated_payload;
}
async function handle_blob(endpoint, data, api_info) {
    const self = this;
    await process_local_file_commands(self, data);
    const blobRefs = await walk_and_store_blobs(
        data,
        void 0,
        [],
        true,
        api_info
    );
    const results = await Promise.all(
        blobRefs.map(async ({ path, blob, type }) => {
            if (!blob)
                return { path, type };
            const response = await self.upload_files(endpoint, [blob]);
            const file_url = response.files && response.files[0];
            return {
                path,
                file_url,
                type,
                name: blob instanceof File ? blob == null ? void 0 : blob.name : void 0
            };
        })
    );
    results.forEach(({ path, file_url, type, name }) => {
        if (type === "Gallery") {
            update_object(data, file_url, path);
        } else if (file_url) {
            const file = new FileData({ path: file_url, orig_name: name });
            update_object(data, file, path);
        }
    });
    return data;
}
async function process_local_file_commands(client2, data) {
    var _a, _b;
    const root = ((_a = client2.config) == null ? void 0 : _a.root) || ((_b = client2.config) == null ? void 0 : _b.root_url);
    if (!root) {
        throw new Error(ROOT_URL_ERROR_MSG);
    }
    await recursively_process_commands(client2, data);
}
async function recursively_process_commands(client2, data, path = []) {
    for (const key in data) {
        if (data[key] instanceof Command) {
            await process_single_command(client2, data, key);
        } else if (typeof data[key] === "object" && data[key] !== null) {
            await recursively_process_commands(client2, data[key], [...path, key]);
        }
    }
}
async function process_single_command(client2, data, key) {
    var _a, _b;
    let cmd_item = data[key];
    const root = ((_a = client2.config) == null ? void 0 : _a.root) || ((_b = client2.config) == null ? void 0 : _b.root_url);
    if (!root) {
        throw new Error(ROOT_URL_ERROR_MSG);
    }
    try {
        let fileBuffer;
        let fullPath;
        if (typeof process !== "undefined" && process.versions && process.versions.node) {
            const fs = await import("final-fs");
            const path = await import("path");
            fullPath = path.resolve(process.cwd(), cmd_item.meta.path);
            fileBuffer = await fs.readFile(fullPath);
        } else {
            throw new Error(NODEJS_FS_ERROR_MSG);
        }
        const file = new Blob([fileBuffer], { type: "application/octet-stream" });
        const response = await client2.upload_files(root, [file]);
        const file_url = response.files && response.files[0];
        if (file_url) {
            const fileData = new FileData({
                path: file_url,
                orig_name: cmd_item.meta.name || ""
            });
            data[key] = fileData;
        }
    } catch (error) {
        console.error(FILE_PROCESSING_ERROR_MSG, error);
    }
}
async function post_data(url, body, additional_headers) {
    const headers = { "Content-Type": "application/json" };
    if (this.options.hf_token) {
        headers.Authorization = `Bearer ${this.options.hf_token}`;
    }
    try {
        var response = await this.fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { ...headers, ...additional_headers },
            credentials: "include"
        });
    } catch (e) {
        return [{ error: BROKEN_CONNECTION_MSG }, 500];
    }
    let output;
    let status;
    try {
        output = await response.json();
        status = response.status;
    } catch (e) {
        output = { error: `Could not parse server response: ${e}` };
        status = 500;
    }
    return [output, status];
}
async function predict(endpoint, data) {
    let data_returned = false;
    let status_complete = false;
    let dependency;
    if (!this.config) {
        throw new Error("Could not resolve app config");
    }
    if (typeof endpoint === "number") {
        dependency = this.config.dependencies.find((dep) => dep.id == endpoint);
    } else {
        const trimmed_endpoint = endpoint.replace(/^\//, "");
        dependency = this.config.dependencies.find(
            (dep) => dep.id == this.api_map[trimmed_endpoint]
        );
    }
    if (dependency == null ? void 0 : dependency.types.continuous) {
        throw new Error(
            "Cannot call predict on this function as it may run forever. Use submit instead"
        );
    }
    return new Promise(async (resolve, reject) => {
        const app = this.submit(endpoint, data, null, null, true);
        let result;
        for await (const message of app) {
            if (message.type === "data") {
                if (status_complete) {
                    resolve(result);
                }
                data_returned = true;
                result = message;
            }
            if (message.type === "status") {
                if (message.stage === "error")
                    reject(message);
                if (message.stage === "complete") {
                    status_complete = true;
                    if (data_returned) {
                        resolve(result);
                    }
                }
            }
        }
    });
}
async function check_space_status(id, type, status_callback) {
    let endpoint = type === "subdomain" ? `https://huggingface.co/api/spaces/by-subdomain/${id}` : `https://huggingface.co/api/spaces/${id}`;
    let response;
    let _status;
    try {
        response = await fetch(endpoint);
        _status = response.status;
        if (_status !== 200) {
            throw new Error();
        }
        response = await response.json();
    } catch (e) {
        status_callback({
            status: "error",
            load_status: "error",
            message: SPACE_STATUS_ERROR_MSG,
            detail: "NOT_FOUND"
        });
        return;
    }
    if (!response || _status !== 200)
        return;
    const {
        runtime: { stage },
        id: space_name
    } = response;
    switch (stage) {
        case "STOPPED":
        case "SLEEPING":
            status_callback({
                status: "sleeping",
                load_status: "pending",
                message: "Space is asleep. Waking it up...",
                detail: stage
            });
            setTimeout(() => {
                check_space_status(id, type, status_callback);
            }, 1e3);
            break;
        case "PAUSED":
            status_callback({
                status: "paused",
                load_status: "error",
                message: "This space has been paused by the author. If you would like to try this demo, consider duplicating the space.",
                detail: stage,
                discussions_enabled: await discussions_enabled(space_name)
            });
            break;
        case "RUNNING":
        case "RUNNING_BUILDING":
            status_callback({
                status: "running",
                load_status: "complete",
                message: "",
                detail: stage
            });
            break;
        case "BUILDING":
            status_callback({
                status: "building",
                load_status: "pending",
                message: "Space is building...",
                detail: stage
            });
            setTimeout(() => {
                check_space_status(id, type, status_callback);
            }, 1e3);
            break;
        default:
            status_callback({
                status: "space_error",
                load_status: "error",
                message: "This space is experiencing an issue.",
                detail: stage,
                discussions_enabled: await discussions_enabled(space_name)
            });
            break;
    }
}
const RE_DISABLED_DISCUSSION = /^(?=[^]*\b[dD]iscussions{0,1}\b)(?=[^]*\b[dD]isabled\b)[^]*$/;
async function discussions_enabled(space_id) {
    try {
        const r = await fetch(
            `https://huggingface.co/api/spaces/${space_id}/discussions`,
            {
                method: "HEAD"
            }
        );
        const error = r.headers.get("x-error-message");
        if (!r.ok || error && RE_DISABLED_DISCUSSION.test(error))
            return false;
        return true;
    } catch (e) {
        return false;
    }
}
async function get_space_hardware(space_id, hf_token) {
    const headers = {};
    if (hf_token) {
        headers.Authorization = `Bearer ${hf_token}`;
    }
    try {
        const res = await fetch(
            `https://huggingface.co/api/spaces/${space_id}/${RUNTIME_URL}`,
            { headers }
        );
        if (res.status !== 200)
            throw new Error("Space hardware could not be obtained.");
        const { hardware } = await res.json();
        return hardware.current;
    } catch (e) {
        throw new Error(e.message);
    }
}
async function set_space_timeout(space_id, timeout, hf_token) {
    const headers = {};
    if (hf_token) {
        headers.Authorization = `Bearer ${hf_token}`;
    }
    const body = {
        seconds: timeout
    };
    try {
        const res = await fetch(
            `https://huggingface.co/api/spaces/${space_id}/${SLEEPTIME_URL}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json", ...headers },
                body: JSON.stringify(body)
            }
        );
        if (res.status !== 200) {
            throw new Error(
                "Could not set sleep timeout on duplicated Space. Please visit *ADD HF LINK TO SETTINGS* to set a timeout manually to reduce billing charges."
            );
        }
        const response = await res.json();
        return response;
    } catch (e) {
        throw new Error(e.message);
    }
}
const hardware_types = [
    "cpu-basic",
    "cpu-upgrade",
    "cpu-xl",
    "t4-small",
    "t4-medium",
    "a10g-small",
    "a10g-large",
    "a10g-largex2",
    "a10g-largex4",
    "a100-large",
    "zero-a10g",
    "h100",
    "h100x8"
];
async function duplicate(app_reference, options) {
    const { hf_token, private: _private, hardware, timeout, auth } = options;
    if (hardware && !hardware_types.includes(hardware)) {
        throw new Error(
            `Invalid hardware type provided. Valid types are: ${hardware_types.map((v) => `"${v}"`).join(",")}.`
        );
    }
    const { http_protocol, host } = await process_endpoint(
        app_reference,
        hf_token
    );
    let cookies = null;
    if (auth) {
        const cookie_header = await get_cookie_header(
            http_protocol,
            host,
            auth,
            fetch
        );
        if (cookie_header)
            cookies = parse_and_set_cookies(cookie_header);
    }
    const headers = {
        Authorization: `Bearer ${hf_token}`,
        "Content-Type": "application/json",
        ...cookies ? { Cookie: cookies.join("; ") } : {}
    };
    const user = (await (await fetch(`https://huggingface.co/api/whoami-v2`, {
        headers
    })).json()).name;
    const space_name = app_reference.split("/")[1];
    const body = {
        repository: `${user}/${space_name}`
    };
    if (_private) {
        body.private = true;
    }
    let original_hardware;
    try {
        if (!hardware) {
            original_hardware = await get_space_hardware(app_reference, hf_token);
        }
    } catch (e) {
        throw Error(SPACE_METADATA_ERROR_MSG + e.message);
    }
    const requested_hardware = hardware || original_hardware || "cpu-basic";
    body.hardware = requested_hardware;
    try {
        const response = await fetch(
            `https://huggingface.co/api/spaces/${app_reference}/duplicate`,
            {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            }
        );
        if (response.status === 409) {
            try {
                const client2 = await Client.connect(`${user}/${space_name}`, options);
                return client2;
            } catch (error) {
                console.error("Failed to connect Client instance:", error);
                throw error;
            }
        } else if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        const duplicated_space = await response.json();
        await set_space_timeout(`${user}/${space_name}`, timeout || 300, hf_token);
        return await Client.connect(
            get_space_reference(duplicated_space.url),
            options
        );
    } catch (e) {
        throw new Error(e);
    }
}
function get_space_reference(url) {
    const regex = /https:\/\/huggingface.co\/spaces\/([^/]+\/[^/]+)/;
    const match = url.match(regex);
    if (match) {
        return match[1];
    }
}
class TextLineStream extends TransformStream {
    /** Constructs a new instance. */
    constructor(options = { allowCR: false }) {
        super({
            transform: (chars, controller) => {
                chars = __privateGet(this, _currentLine) + chars;
                while (true) {
                    const lfIndex = chars.indexOf("\n");
                    const crIndex = options.allowCR ? chars.indexOf("\r") : -1;
                    if (crIndex !== -1 && crIndex !== chars.length - 1 && (lfIndex === -1 || lfIndex - 1 > crIndex)) {
                        controller.enqueue(chars.slice(0, crIndex));
                        chars = chars.slice(crIndex + 1);
                        continue;
                    }
                    if (lfIndex === -1)
                        break;
                    const endIndex = chars[lfIndex - 1] === "\r" ? lfIndex - 1 : lfIndex;
                    controller.enqueue(chars.slice(0, endIndex));
                    chars = chars.slice(lfIndex + 1);
                }
                __privateSet(this, _currentLine, chars);
            },
            flush: (controller) => {
                if (__privateGet(this, _currentLine) === "")
                    return;
                const currentLine = options.allowCR && __privateGet(this, _currentLine).endsWith("\r") ? __privateGet(this, _currentLine).slice(0, -1) : __privateGet(this, _currentLine);
                controller.enqueue(currentLine);
            }
        });
        __privateAdd(this, _currentLine, "");
    }
}
_currentLine = new WeakMap();
function stream$1(input) {
    let decoder = new TextDecoderStream();
    let split2 = new TextLineStream({ allowCR: true });
    return input.pipeThrough(decoder).pipeThrough(split2);
}
function split(input) {
    let rgx = /[:]\s*/;
    let match = rgx.exec(input);
    let idx = match && match.index;
    if (idx) {
        return [
            input.substring(0, idx),
            input.substring(idx + match[0].length)
        ];
    }
}
function fallback(headers, key, value) {
    let tmp = headers.get(key);
    if (!tmp)
        headers.set(key, value);
}
async function* events(res, signal) {
    if (!res.body)
        return;
    let iter = stream$1(res.body);
    let line, reader = iter.getReader();
    let event;
    for (; ; ) {
        if (signal && signal.aborted) {
            return reader.cancel();
        }
        line = await reader.read();
        if (line.done)
            return;
        if (!line.value) {
            if (event)
                yield event;
            event = void 0;
            continue;
        }
        let [field, value] = split(line.value) || [];
        if (!field)
            continue;
        if (field === "data") {
            event || (event = {});
            event[field] = event[field] ? event[field] + "\n" + value : value;
        } else if (field === "event") {
            event || (event = {});
            event[field] = value;
        } else if (field === "id") {
            event || (event = {});
            event[field] = +value || value;
        } else if (field === "retry") {
            event || (event = {});
            event[field] = +value || void 0;
        }
    }
}
async function stream(input, init) {
    let req = new Request(input, init);
    fallback(req.headers, "Accept", "text/event-stream");
    fallback(req.headers, "Content-Type", "application/json");
    let r = await fetch(req);
    if (!r.ok)
        throw r;
    return events(r, req.signal);
}
async function open_stream() {
    let {
        event_callbacks,
        unclosed_events,
        pending_stream_messages,
        stream_status,
        config,
        jwt
    } = this;
    const that = this;
    if (!config) {
        throw new Error("Could not resolve app config");
    }
    stream_status.open = true;
    let stream2 = null;
    let params = new URLSearchParams({
        session_hash: this.session_hash
    }).toString();
    let url = new URL(`${config.root}/queue/data?${params}`);
    if (jwt) {
        url.searchParams.set("__sign", jwt);
    }
    stream2 = this.stream(url);
    if (!stream2) {
        console.warn("Cannot connect to SSE endpoint: " + url.toString());
        return;
    }
    stream2.onmessage = async function(event) {
        let _data = JSON.parse(event.data);
        if (_data.msg === "close_stream") {
            close_stream(stream_status, that.abort_controller);
            return;
        }
        const event_id = _data.event_id;
        if (!event_id) {
            await Promise.all(
                Object.keys(event_callbacks).map(
                    (event_id2) => event_callbacks[event_id2](_data)
                )
            );
        } else if (event_callbacks[event_id] && config) {
            if (_data.msg === "process_completed" && ["sse", "sse_v1", "sse_v2", "sse_v2.1", "sse_v3"].includes(
                config.protocol
            )) {
                unclosed_events.delete(event_id);
            }
            let fn2 = event_callbacks[event_id];
            if (typeof window !== "undefined" && typeof document !== "undefined") {
                setTimeout(fn2, 0, _data);
            } else {
                fn2(_data);
            }
        } else {
            if (!pending_stream_messages[event_id]) {
                pending_stream_messages[event_id] = [];
            }
            pending_stream_messages[event_id].push(_data);
        }
    };
    stream2.onerror = async function() {
        await Promise.all(
            Object.keys(event_callbacks).map(
                (event_id) => event_callbacks[event_id]({
                    msg: "unexpected_error",
                    message: BROKEN_CONNECTION_MSG
                })
            )
        );
    };
}
function close_stream(stream_status, abort_controller) {
    if (stream_status) {
        stream_status.open = false;
        abort_controller == null ? void 0 : abort_controller.abort();
    }
}
function apply_diff_stream(pending_diff_streams, event_id, data) {
    let is_first_generation = !pending_diff_streams[event_id];
    if (is_first_generation) {
        pending_diff_streams[event_id] = [];
        data.data.forEach((value, i) => {
            pending_diff_streams[event_id][i] = value;
        });
    } else {
        data.data.forEach((value, i) => {
            let new_data = apply_diff(pending_diff_streams[event_id][i], value);
            pending_diff_streams[event_id][i] = new_data;
            data.data[i] = new_data;
        });
    }
}
function apply_diff(obj, diff) {
    diff.forEach(([action, path, value]) => {
        obj = apply_edit(obj, path, action, value);
    });
    return obj;
}
function apply_edit(target, path, action, value) {
    if (path.length === 0) {
        if (action === "replace") {
            return value;
        } else if (action === "append") {
            return target + value;
        }
        throw new Error(`Unsupported action: ${action}`);
    }
    let current = target;
    for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
    }
    const last_path = path[path.length - 1];
    switch (action) {
        case "replace":
            current[last_path] = value;
            break;
        case "append":
            current[last_path] += value;
            break;
        case "add":
            if (Array.isArray(current)) {
                current.splice(Number(last_path), 0, value);
            } else {
                current[last_path] = value;
            }
            break;
        case "delete":
            if (Array.isArray(current)) {
                current.splice(Number(last_path), 1);
            } else {
                delete current[last_path];
            }
            break;
        default:
            throw new Error(`Unknown action: ${action}`);
    }
    return target;
}
function readable_stream(input, init = {}) {
    const instance = {
        close: () => {
            throw new Error("Method not implemented.");
        },
        onerror: null,
        onmessage: null,
        onopen: null,
        readyState: 0,
        url: input.toString(),
        withCredentials: false,
        CONNECTING: 0,
        OPEN: 1,
        CLOSED: 2,
        addEventListener: () => {
            throw new Error("Method not implemented.");
        },
        dispatchEvent: () => {
            throw new Error("Method not implemented.");
        },
        removeEventListener: () => {
            throw new Error("Method not implemented.");
        }
    };
    stream(input, init).then(async (res) => {
        instance.readyState = instance.OPEN;
        try {
            for await (const chunk of res) {
                instance.onmessage && instance.onmessage(chunk);
            }
            instance.readyState = instance.CLOSED;
        } catch (e) {
            instance.onerror && instance.onerror(e);
            instance.readyState = instance.CLOSED;
        }
    }).catch((e) => {
        console.error(e);
        instance.onerror && instance.onerror(e);
        instance.readyState = instance.CLOSED;
    });
    return instance;
}
function submit(endpoint, data, event_data, trigger_id, all_events) {
    var _a;
    try {
        let fire_event = function(event) {
            if (all_events || events_to_publish[event.type]) {
                push_event(event);
            }
        }, close = function() {
            done = true;
            while (resolvers.length > 0)
                resolvers.shift()({
                    value: void 0,
                    done: true
                });
        }, push = function(data2) {
            if (done)
                return;
            if (resolvers.length > 0) {
                resolvers.shift()(data2);
            } else {
                values.push(data2);
            }
        }, push_error = function(error) {
            push(thenable_reject(error));
            close();
        }, push_event = function(event) {
            push({ value: event, done: false });
        }, next = function() {
            if (values.length > 0)
                return Promise.resolve(values.shift());
            if (done)
                return Promise.resolve({ value: void 0, done: true });
            return new Promise((resolve) => resolvers.push(resolve));
        };
        const { hf_token } = this.options;
        const {
            fetch: fetch2,
            app_reference,
            config,
            session_hash,
            api_info,
            api_map,
            stream_status,
            pending_stream_messages,
            pending_diff_streams,
            event_callbacks,
            unclosed_events,
            post_data: post_data2,
            options
        } = this;
        const that = this;
        if (!api_info)
            throw new Error("No API found");
        if (!config)
            throw new Error("Could not resolve app config");
        let { fn_index, endpoint_info, dependency } = get_endpoint_info(
            api_info,
            endpoint,
            api_map,
            config
        );
        let resolved_data = map_data_to_params(data, api_info);
        let websocket;
        let stream2;
        let protocol = config.protocol || "ws";
        const _endpoint = typeof endpoint === "number" ? "/predict" : endpoint;
        let payload;
        let event_id = null;
        let complete = false;
        let last_status = {};
        let url_params = typeof window !== "undefined" && typeof document !== "undefined" ? new URLSearchParams(window.location.search).toString() : "";
        const events_to_publish = ((_a = options == null ? void 0 : options.events) == null ? void 0 : _a.reduce(
            (acc, event) => {
                acc[event] = true;
                return acc;
            },
            {}
        )) || {};
        async function cancel() {
            const _status = {
                stage: "complete",
                queue: false,
                time: /* @__PURE__ */ new Date()
            };
            complete = _status;
            fire_event({
                ..._status,
                type: "status",
                endpoint: _endpoint,
                fn_index
            });
            let reset_request = {};
            let cancel_request = {};
            if (protocol === "ws") {
                if (websocket && websocket.readyState === 0) {
                    websocket.addEventListener("open", () => {
                        websocket.close();
                    });
                } else {
                    websocket.close();
                }
                reset_request = { fn_index, session_hash };
            } else {
                close_stream(stream_status, that.abort_controller);
                close();
                reset_request = { event_id };
                cancel_request = { event_id, session_hash, fn_index };
            }
            try {
                if (!config) {
                    throw new Error("Could not resolve app config");
                }
                if ("event_id" in cancel_request) {
                    await fetch2(`${config.root}/cancel`, {
                        headers: { "Content-Type": "application/json" },
                        method: "POST",
                        body: JSON.stringify(cancel_request)
                    });
                }
                await fetch2(`${config.root}/reset`, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(reset_request)
                });
            } catch (e) {
                console.warn(
                    "The `/reset` endpoint could not be called. Subsequent endpoint results may be unreliable."
                );
            }
        }
        const resolve_heartbeat = async (config2) => {
            await this._resolve_hearbeat(config2);
        };
        async function handle_render_config(render_config) {
            if (!config)
                return;
            let render_id = render_config.render_id;
            config.components = [
                ...config.components.filter((c) => c.props.rendered_in !== render_id),
                ...render_config.components
            ];
            config.dependencies = [
                ...config.dependencies.filter((d) => d.rendered_in !== render_id),
                ...render_config.dependencies
            ];
            const any_state = config.components.some((c) => c.type === "state");
            const any_unload = config.dependencies.some(
                (d) => d.targets.some((t) => t[1] === "unload")
            );
            config.connect_heartbeat = any_state || any_unload;
            await resolve_heartbeat(config);
            fire_event({
                type: "render",
                data: render_config,
                endpoint: _endpoint,
                fn_index
            });
        }
        this.handle_blob(config.root, resolved_data, endpoint_info).then(
            async (_payload) => {
                var _a2;
                let input_data = handle_payload(
                    _payload,
                    dependency,
                    config.components,
                    "input",
                    true
                );
                payload = {
                    data: input_data || [],
                    event_data,
                    fn_index,
                    trigger_id
                };
                if (skip_queue(fn_index, config)) {
                    fire_event({
                        type: "status",
                        endpoint: _endpoint,
                        stage: "pending",
                        queue: false,
                        fn_index,
                        time: /* @__PURE__ */ new Date()
                    });
                    post_data2(
                        `${config.root}/run${_endpoint.startsWith("/") ? _endpoint : `/${_endpoint}`}${url_params ? "?" + url_params : ""}`,
                        {
                            ...payload,
                            session_hash
                        }
                    ).then(([output, status_code]) => {
                        const data2 = output.data;
                        if (status_code == 200) {
                            fire_event({
                                type: "data",
                                endpoint: _endpoint,
                                fn_index,
                                data: handle_payload(
                                    data2,
                                    dependency,
                                    config.components,
                                    "output",
                                    options.with_null_state
                                ),
                                time: /* @__PURE__ */ new Date(),
                                event_data,
                                trigger_id
                            });
                            if (output.render_config) {
                                handle_render_config(output.render_config);
                            }
                            fire_event({
                                type: "status",
                                endpoint: _endpoint,
                                fn_index,
                                stage: "complete",
                                eta: output.average_duration,
                                queue: false,
                                time: /* @__PURE__ */ new Date()
                            });
                        } else {
                            fire_event({
                                type: "status",
                                stage: "error",
                                endpoint: _endpoint,
                                fn_index,
                                message: output.error,
                                queue: false,
                                time: /* @__PURE__ */ new Date()
                            });
                        }
                    }).catch((e) => {
                        fire_event({
                            type: "status",
                            stage: "error",
                            message: e.message,
                            endpoint: _endpoint,
                            fn_index,
                            queue: false,
                            time: /* @__PURE__ */ new Date()
                        });
                    });
                } else if (protocol == "ws") {
                    const { ws_protocol, host } = await process_endpoint(
                        app_reference,
                        hf_token
                    );
                    fire_event({
                        type: "status",
                        stage: "pending",
                        queue: true,
                        endpoint: _endpoint,
                        fn_index,
                        time: /* @__PURE__ */ new Date()
                    });
                    let url = new URL(
                        `${ws_protocol}://${resolve_root(
                            host,
                            config.path,
                            true
                        )}/queue/join${url_params ? "?" + url_params : ""}`
                    );
                    if (this.jwt) {
                        url.searchParams.set("__sign", this.jwt);
                    }
                    websocket = new WebSocket(url);
                    websocket.onclose = (evt) => {
                        if (!evt.wasClean) {
                            fire_event({
                                type: "status",
                                stage: "error",
                                broken: true,
                                message: BROKEN_CONNECTION_MSG,
                                queue: true,
                                endpoint: _endpoint,
                                fn_index,
                                time: /* @__PURE__ */ new Date()
                            });
                        }
                    };
                    websocket.onmessage = function(event) {
                        const _data = JSON.parse(event.data);
                        const { type, status, data: data2 } = handle_message(
                            _data,
                            last_status[fn_index]
                        );
                        if (type === "update" && status && !complete) {
                            fire_event({
                                type: "status",
                                endpoint: _endpoint,
                                fn_index,
                                time: /* @__PURE__ */ new Date(),
                                ...status
                            });
                            if (status.stage === "error") {
                                websocket.close();
                            }
                        } else if (type === "hash") {
                            websocket.send(JSON.stringify({ fn_index, session_hash }));
                            return;
                        } else if (type === "data") {
                            websocket.send(JSON.stringify({ ...payload, session_hash }));
                        } else if (type === "complete") {
                            complete = status;
                        } else if (type === "log") {
                            fire_event({
                                type: "log",
                                log: data2.log,
                                level: data2.level,
                                endpoint: _endpoint,
                                fn_index
                            });
                        } else if (type === "generating") {
                            fire_event({
                                type: "status",
                                time: /* @__PURE__ */ new Date(),
                                ...status,
                                stage: status == null ? void 0 : status.stage,
                                queue: true,
                                endpoint: _endpoint,
                                fn_index
                            });
                        }
                        if (data2) {
                            fire_event({
                                type: "data",
                                time: /* @__PURE__ */ new Date(),
                                data: handle_payload(
                                    data2.data,
                                    dependency,
                                    config.components,
                                    "output",
                                    options.with_null_state
                                ),
                                endpoint: _endpoint,
                                fn_index,
                                event_data,
                                trigger_id
                            });
                            if (complete) {
                                fire_event({
                                    type: "status",
                                    time: /* @__PURE__ */ new Date(),
                                    ...complete,
                                    stage: status == null ? void 0 : status.stage,
                                    queue: true,
                                    endpoint: _endpoint,
                                    fn_index
                                });
                                websocket.close();
                            }
                        }
                    };
                    if (semiver(config.version || "2.0.0", "3.6") < 0) {
                        addEventListener(
                            "open",
                            () => websocket.send(JSON.stringify({ hash: session_hash }))
                        );
                    }
                } else if (protocol == "sse") {
                    fire_event({
                        type: "status",
                        stage: "pending",
                        queue: true,
                        endpoint: _endpoint,
                        fn_index,
                        time: /* @__PURE__ */ new Date()
                    });
                    var params = new URLSearchParams({
                        fn_index: fn_index.toString(),
                        session_hash
                    }).toString();
                    let url = new URL(
                        `${config.root}/queue/join?${url_params ? url_params + "&" : ""}${params}`
                    );
                    if (this.jwt) {
                        url.searchParams.set("__sign", this.jwt);
                    }
                    stream2 = this.stream(url);
                    if (!stream2) {
                        return Promise.reject(
                            new Error("Cannot connect to SSE endpoint: " + url.toString())
                        );
                    }
                    stream2.onmessage = async function(event) {
                        const _data = JSON.parse(event.data);
                        const { type, status, data: data2 } = handle_message(
                            _data,
                            last_status[fn_index]
                        );
                        if (type === "update" && status && !complete) {
                            fire_event({
                                type: "status",
                                endpoint: _endpoint,
                                fn_index,
                                time: /* @__PURE__ */ new Date(),
                                ...status
                            });
                            if (status.stage === "error") {
                                stream2 == null ? void 0 : stream2.close();
                                close();
                            }
                        } else if (type === "data") {
                            event_id = _data.event_id;
                            let [_, status2] = await post_data2(`${config.root}/queue/data`, {
                                ...payload,
                                session_hash,
                                event_id
                            });
                            if (status2 !== 200) {
                                fire_event({
                                    type: "status",
                                    stage: "error",
                                    message: BROKEN_CONNECTION_MSG,
                                    queue: true,
                                    endpoint: _endpoint,
                                    fn_index,
                                    time: /* @__PURE__ */ new Date()
                                });
                                stream2 == null ? void 0 : stream2.close();
                                close();
                            }
                        } else if (type === "complete") {
                            complete = status;
                        } else if (type === "log") {
                            fire_event({
                                type: "log",
                                log: data2.log,
                                level: data2.level,
                                endpoint: _endpoint,
                                fn_index
                            });
                        } else if (type === "generating") {
                            fire_event({
                                type: "status",
                                time: /* @__PURE__ */ new Date(),
                                ...status,
                                stage: status == null ? void 0 : status.stage,
                                queue: true,
                                endpoint: _endpoint,
                                fn_index
                            });
                        }
                        if (data2) {
                            fire_event({
                                type: "data",
                                time: /* @__PURE__ */ new Date(),
                                data: handle_payload(
                                    data2.data,
                                    dependency,
                                    config.components,
                                    "output",
                                    options.with_null_state
                                ),
                                endpoint: _endpoint,
                                fn_index,
                                event_data,
                                trigger_id
                            });
                            if (complete) {
                                fire_event({
                                    type: "status",
                                    time: /* @__PURE__ */ new Date(),
                                    ...complete,
                                    stage: status == null ? void 0 : status.stage,
                                    queue: true,
                                    endpoint: _endpoint,
                                    fn_index
                                });
                                stream2 == null ? void 0 : stream2.close();
                                close();
                            }
                        }
                    };
                } else if (protocol == "sse_v1" || protocol == "sse_v2" || protocol == "sse_v2.1" || protocol == "sse_v3") {
                    fire_event({
                        type: "status",
                        stage: "pending",
                        queue: true,
                        endpoint: _endpoint,
                        fn_index,
                        time: /* @__PURE__ */ new Date()
                    });
                    let hostname = "";
                    if (typeof window !== "undefined" && typeof document !== "undefined") {
                        hostname = (_a2 = window == null ? void 0 : window.location) == null ? void 0 : _a2.hostname;
                    }
                    let hfhubdev = "dev.spaces.huggingface.tech";
                    const origin = hostname.includes(".dev.") ? `https://moon-${hostname.split(".")[1]}.${hfhubdev}` : `https://huggingface.co`;
                    const is_iframe = typeof window !== "undefined" && typeof document !== "undefined" && window.parent != window;
                    const is_zerogpu_space = dependency.zerogpu && config.space_id;
                    const zerogpu_auth_promise = is_iframe && is_zerogpu_space ? post_message("zerogpu-headers", origin) : Promise.resolve(null);
                    const post_data_promise = zerogpu_auth_promise.then((headers) => {
                        return post_data2(
                            `${config.root}/queue/join?${url_params}`,
                            {
                                ...payload,
                                session_hash
                            },
                            headers
                        );
                    });
                    post_data_promise.then(async ([response, status]) => {
                        if (status === 503) {
                            fire_event({
                                type: "status",
                                stage: "error",
                                message: QUEUE_FULL_MSG,
                                queue: true,
                                endpoint: _endpoint,
                                fn_index,
                                time: /* @__PURE__ */ new Date()
                            });
                        } else if (status !== 200) {
                            fire_event({
                                type: "status",
                                stage: "error",
                                message: BROKEN_CONNECTION_MSG,
                                queue: true,
                                endpoint: _endpoint,
                                fn_index,
                                time: /* @__PURE__ */ new Date()
                            });
                        } else {
                            event_id = response.event_id;
                            let callback = async function(_data) {
                                try {
                                    const { type, status: status2, data: data2 } = handle_message(
                                        _data,
                                        last_status[fn_index]
                                    );
                                    if (type == "heartbeat") {
                                        return;
                                    }
                                    if (type === "update" && status2 && !complete) {
                                        fire_event({
                                            type: "status",
                                            endpoint: _endpoint,
                                            fn_index,
                                            time: /* @__PURE__ */ new Date(),
                                            ...status2
                                        });
                                    } else if (type === "complete") {
                                        complete = status2;
                                    } else if (type == "unexpected_error") {
                                        console.error("Unexpected error", status2 == null ? void 0 : status2.message);
                                        fire_event({
                                            type: "status",
                                            stage: "error",
                                            message: (status2 == null ? void 0 : status2.message) || "An Unexpected Error Occurred!",
                                            queue: true,
                                            endpoint: _endpoint,
                                            fn_index,
                                            time: /* @__PURE__ */ new Date()
                                        });
                                    } else if (type === "log") {
                                        fire_event({
                                            type: "log",
                                            log: data2.log,
                                            level: data2.level,
                                            endpoint: _endpoint,
                                            fn_index
                                        });
                                        return;
                                    } else if (type === "generating") {
                                        fire_event({
                                            type: "status",
                                            time: /* @__PURE__ */ new Date(),
                                            ...status2,
                                            stage: status2 == null ? void 0 : status2.stage,
                                            queue: true,
                                            endpoint: _endpoint,
                                            fn_index
                                        });
                                        if (data2 && ["sse_v2", "sse_v2.1", "sse_v3"].includes(protocol)) {
                                            apply_diff_stream(pending_diff_streams, event_id, data2);
                                        }
                                    }
                                    if (data2) {
                                        fire_event({
                                            type: "data",
                                            time: /* @__PURE__ */ new Date(),
                                            data: handle_payload(
                                                data2.data,
                                                dependency,
                                                config.components,
                                                "output",
                                                options.with_null_state
                                            ),
                                            endpoint: _endpoint,
                                            fn_index
                                        });
                                        if (data2.render_config) {
                                            await handle_render_config(data2.render_config);
                                        }
                                        if (complete) {
                                            fire_event({
                                                type: "status",
                                                time: /* @__PURE__ */ new Date(),
                                                ...complete,
                                                stage: status2 == null ? void 0 : status2.stage,
                                                queue: true,
                                                endpoint: _endpoint,
                                                fn_index
                                            });
                                        }
                                    }
                                    if ((status2 == null ? void 0 : status2.stage) === "complete" || (status2 == null ? void 0 : status2.stage) === "error") {
                                        if (event_callbacks[event_id]) {
                                            delete event_callbacks[event_id];
                                        }
                                        if (event_id in pending_diff_streams) {
                                            delete pending_diff_streams[event_id];
                                        }
                                    }
                                } catch (e) {
                                    console.error("Unexpected client exception", e);
                                    fire_event({
                                        type: "status",
                                        stage: "error",
                                        message: "An Unexpected Error Occurred!",
                                        queue: true,
                                        endpoint: _endpoint,
                                        fn_index,
                                        time: /* @__PURE__ */ new Date()
                                    });
                                    if (["sse_v2", "sse_v2.1", "sse_v3"].includes(protocol)) {
                                        close_stream(stream_status, that.abort_controller);
                                        stream_status.open = false;
                                        close();
                                    }
                                }
                            };
                            if (event_id in pending_stream_messages) {
                                pending_stream_messages[event_id].forEach(
                                    (msg) => callback(msg)
                                );
                                delete pending_stream_messages[event_id];
                            }
                            event_callbacks[event_id] = callback;
                            unclosed_events.add(event_id);
                            if (!stream_status.open) {
                                await this.open_stream();
                            }
                        }
                    });
                }
            }
        );
        let done = false;
        const values = [];
        const resolvers = [];
        const iterator = {
            [Symbol.asyncIterator]: () => iterator,
            next,
            throw: async (value) => {
                push_error(value);
                return next();
            },
            return: async () => {
                close();
                return next();
            },
            cancel
        };
        return iterator;
    } catch (error) {
        console.error("Submit function encountered an error:", error);
        throw error;
    }
}
function thenable_reject(error) {
    return {
        then: (resolve, reject) => reject(error)
    };
}
function get_endpoint_info(api_info, endpoint, api_map, config) {
    let fn_index;
    let endpoint_info;
    let dependency;
    if (typeof endpoint === "number") {
        fn_index = endpoint;
        endpoint_info = api_info.unnamed_endpoints[fn_index];
        dependency = config.dependencies.find((dep) => dep.id == endpoint);
    } else {
        const trimmed_endpoint = endpoint.replace(/^\//, "");
        fn_index = api_map[trimmed_endpoint];
        endpoint_info = api_info.named_endpoints[endpoint.trim()];
        dependency = config.dependencies.find(
            (dep) => dep.id == api_map[trimmed_endpoint]
        );
    }
    if (typeof fn_index !== "number") {
        throw new Error(
            "There is no endpoint matching that name of fn_index matching that number."
        );
    }
    return { fn_index, endpoint_info, dependency };
}
class Client {
    constructor(app_reference, options = { events: ["data"] }) {
        __publicField(this, "app_reference");
        __publicField(this, "options");
        __publicField(this, "config");
        __publicField(this, "api_info");
        __publicField(this, "api_map", {});
        __publicField(this, "session_hash", Math.random().toString(36).substring(2));
        __publicField(this, "jwt", false);
        __publicField(this, "last_status", {});
        __publicField(this, "cookies", null);
        // streaming
        __publicField(this, "stream_status", { open: false });
        __publicField(this, "pending_stream_messages", {});
        __publicField(this, "pending_diff_streams", {});
        __publicField(this, "event_callbacks", {});
        __publicField(this, "unclosed_events", /* @__PURE__ */ new Set());
        __publicField(this, "heartbeat_event", null);
        __publicField(this, "abort_controller", null);
        __publicField(this, "stream_instance", null);
        __publicField(this, "view_api");
        __publicField(this, "upload_files");
        __publicField(this, "upload");
        __publicField(this, "handle_blob");
        __publicField(this, "post_data");
        __publicField(this, "submit");
        __publicField(this, "predict");
        __publicField(this, "open_stream");
        __publicField(this, "resolve_config");
        __publicField(this, "resolve_cookies");
        this.app_reference = app_reference;
        if (!options.events) {
            options.events = ["data"];
        }
        this.options = options;
        this.view_api = view_api.bind(this);
        this.upload_files = upload_files.bind(this);
        this.handle_blob = handle_blob.bind(this);
        this.post_data = post_data.bind(this);
        this.submit = submit.bind(this);
        this.predict = predict.bind(this);
        this.open_stream = open_stream.bind(this);
        this.resolve_config = resolve_config.bind(this);
        this.resolve_cookies = resolve_cookies.bind(this);
        this.upload = upload.bind(this);
    }
    fetch(input, init) {
        const headers = new Headers((init == null ? void 0 : init.headers) || {});
        if (this && this.cookies) {
            headers.append("Cookie", this.cookies);
        }
        return fetch(input, { ...init, headers });
    }
    stream(url) {
        this.abort_controller = new AbortController();
        this.stream_instance = readable_stream(url.toString(), {
            signal: this.abort_controller.signal
        });
        return this.stream_instance;
    }
    async init() {
        var _a;
        if ((typeof window === "undefined" || !("WebSocket" in window)) && !global.WebSocket) {
            const ws = await import("./wrapper-CviSselG.js");
            global.WebSocket = ws.WebSocket;
        }
        try {
            if (this.options.auth) {
                await this.resolve_cookies();
            }
            await this._resolve_config().then(
                ({ config }) => this._resolve_hearbeat(config)
            );
        } catch (e) {
            throw Error(e);
        }
        this.api_info = await this.view_api();
        this.api_map = map_names_to_ids(((_a = this.config) == null ? void 0 : _a.dependencies) || []);
    }
    async _resolve_hearbeat(_config) {
        if (_config) {
            this.config = _config;
            if (this.config && this.config.connect_heartbeat) {
                if (this.config.space_id && this.options.hf_token) {
                    this.jwt = await get_jwt(
                        this.config.space_id,
                        this.options.hf_token,
                        this.cookies
                    );
                }
            }
        }
        if (_config.space_id && this.options.hf_token) {
            this.jwt = await get_jwt(_config.space_id, this.options.hf_token);
        }
        if (this.config && this.config.connect_heartbeat) {
            const heartbeat_url = new URL(
                `${this.config.root}/heartbeat/${this.session_hash}`
            );
            if (this.jwt) {
                heartbeat_url.searchParams.set("__sign", this.jwt);
            }
            if (!this.heartbeat_event) {
                this.heartbeat_event = this.stream(heartbeat_url);
            }
        }
    }
    static async connect(app_reference, options = {
        events: ["data"]
    }) {
        const client2 = new this(app_reference, options);
        await client2.init();
        return client2;
    }
    close() {
        var _a;
        (_a = this.heartbeat_event) == null ? void 0 : _a.close();
    }
    static async duplicate(app_reference, options = {
        events: ["data"]
    }) {
        return duplicate(app_reference, options);
    }
    async _resolve_config() {
        const { http_protocol, host, space_id } = await process_endpoint(
            this.app_reference,
            this.options.hf_token
        );
        const { status_callback } = this.options;
        let config;
        try {
            config = await this.resolve_config(`${http_protocol}//${host}`);
            if (!config) {
                throw new Error(CONFIG_ERROR_MSG);
            }
            return this.config_success(config);
        } catch (e) {
            if (space_id && status_callback) {
                check_space_status(
                    space_id,
                    RE_SPACE_NAME.test(space_id) ? "space_name" : "subdomain",
                    this.handle_space_success
                );
            } else {
                if (status_callback)
                    status_callback({
                        status: "error",
                        message: "Could not load this space.",
                        load_status: "error",
                        detail: "NOT_FOUND"
                    });
                throw Error(e);
            }
        }
    }
    async config_success(_config) {
        this.config = _config;
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            if (window.location.protocol === "https:") {
                this.config.root = this.config.root.replace("http://", "https://");
            }
        }
        if (this.config.auth_required) {
            return this.prepare_return_obj();
        }
        try {
            this.api_info = await this.view_api();
        } catch (e) {
            console.error(API_INFO_ERROR_MSG + e.message);
        }
        return this.prepare_return_obj();
    }
    async handle_space_success(status) {
        if (!this) {
            throw new Error(CONFIG_ERROR_MSG);
        }
        const { status_callback } = this.options;
        if (status_callback)
            status_callback(status);
        if (status.status === "running") {
            try {
                this.config = await this._resolve_config();
                if (!this.config) {
                    throw new Error(CONFIG_ERROR_MSG);
                }
                const _config = await this.config_success(this.config);
                return _config;
            } catch (e) {
                if (status_callback) {
                    status_callback({
                        status: "error",
                        message: "Could not load this space.",
                        load_status: "error",
                        detail: "NOT_FOUND"
                    });
                }
                throw e;
            }
        }
    }
    async component_server(component_id, fn_name, data) {
        var _a;
        if (!this.config) {
            throw new Error(CONFIG_ERROR_MSG);
        }
        const headers = {};
        const { hf_token } = this.options;
        const { session_hash } = this;
        if (hf_token) {
            headers.Authorization = `Bearer ${this.options.hf_token}`;
        }
        let root_url;
        let component = this.config.components.find(
            (comp) => comp.id === component_id
        );
        if ((_a = component == null ? void 0 : component.props) == null ? void 0 : _a.root_url) {
            root_url = component.props.root_url;
        } else {
            root_url = this.config.root;
        }
        let body;
        if ("binary" in data) {
            body = new FormData();
            for (const key in data.data) {
                if (key === "binary")
                    continue;
                body.append(key, data.data[key]);
            }
            body.set("component_id", component_id.toString());
            body.set("fn_name", fn_name);
            body.set("session_hash", session_hash);
        } else {
            body = JSON.stringify({
                data,
                component_id,
                fn_name,
                session_hash
            });
            headers["Content-Type"] = "application/json";
        }
        if (hf_token) {
            headers.Authorization = `Bearer ${hf_token}`;
        }
        try {
            const response = await this.fetch(`${root_url}/component_server/`, {
                method: "POST",
                body,
                headers,
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error(
                    "Could not connect to component server: " + response.statusText
                );
            }
            const output = await response.json();
            return output;
        } catch (e) {
            console.warn(e);
        }
    }
    set_cookies(raw_cookies) {
        this.cookies = parse_and_set_cookies(raw_cookies).join("; ");
    }
    prepare_return_obj() {
        return {
            config: this.config,
            predict: this.predict,
            submit: this.submit,
            view_api: this.view_api,
            component_server: this.component_server
        };
    }
}
async function client(app_reference, options = {
    events: ["data"]
}) {
    return await Client.connect(app_reference, options);
}
async function duplicate_space(app_reference, options) {
    return await Client.duplicate(app_reference, options);
}
export {
    Client,
    FileData,
    client,
    duplicate_space as duplicate,
    handle_file,
    predict,
    prepare_files,
    submit,
    upload,
    upload_files
};