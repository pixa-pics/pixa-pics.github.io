import XXH from "../../../utils/llxxhashjs/index";
import xxHash from "xxhash-wasm";

const XXHash = {
    _get_32_js() {

        return {
            // Compute properties
            xxh_f: {create32(seed){return XXH.h32(seed)}},
            xxh_v: "32",
            xxh_t: "js",
            xxh_tt: Date.now()
        };
    },
    _get_32_wasm() {

        return new Promise(function(resolve, reject){

            try {

                xxHash().then(function(create){

                    resolve({
                        xxh_f: create,
                        xxh_v: "32",
                        xxh_t: "wasm",
                        xxh_tt: Date.now()
                    });
                }).catch(function(e){

                    reject();
                });

            } catch (e) {

                reject();
            }
        });
    },
    new(){

        const alphabet_58 = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        const base_58 = alphabet_58.length; // base is the length of the alphabet (58 in this case)

        let cs_32_js = this._get_32_js;
        let cs_32_wasm = this._get_32_wasm;

        let s = cs_32_js();
        cs_32_wasm().then(function(r){
            s = r;
        }).catch(function(e){
            s = cs_32_js();
        });

        return {
            // Methods
            get_info: function() {
                return Object.assign({}, {
                    version: s.xxh_v,
                    type: s.xxh_t,
                    timestamp: s.xxh_tt
                });
            },
            int_that: function(buffer) {
                "use strict";

                return (s.xxh_f.create32(0xFADE).update(new Uint8ClampedArray(buffer)).digest() | 0) >>> 0;
            },
            base58_that: function (array_buffer) {
                "use strict";
                let num = this.int_that(typeof array_buffer === "string" ? Buffer.from(array_buffer): "buffer" in array_buffer ? array_buffer.buffer: array_buffer);
                let encoded = "";
                let remainder = 0;
                let chain = 0;

                while (num > 0) {
                    remainder = (num % base_58 | 0) >>> 0;
                    num = (num / base_58 | 0) >>> 0;
                    encoded = encoded + alphabet_58.charAt(remainder);
                    chain = (chain+1|0) >>> 0;
                }

                return encoded;
            }
        };
    }
};

module.exports = XXHash;