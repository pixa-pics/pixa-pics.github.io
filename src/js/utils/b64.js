import {B64chromium} from "chromium-base64";
var b64 = new B64chromium();
module.exports = {
    bytesToBase64: b64.bytesToBase64.bind(b64),
    base64ToBytes: b64.base64ToBytes.bind(b64)
};