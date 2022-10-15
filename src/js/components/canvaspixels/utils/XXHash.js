import XXHashJS from "../../../utils/xxhash";
import XXHashWASM from "xxhash-wasm";

const XXHash = {
    _get_64_js() {

        return {
            // Compute properties
            xxh_f: {create64(seed){return XXHashJS.h64(seed)}},
            xxh_v: "64",
            xxh_t: "js",
            xxh_tt: Date.now()
        };
    },
    _get_64_wasm() {

        return new Promise(function(resolve, reject){

            try {

                XXHashWASM().then(function(hasher){

                    resolve({
                        xxh_f: {create64(seed){return hasher.create64(BigInt(seed))}} ,
                        xxh_v: "64",
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

        const alphabet_58 = Uint8Array.from("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ".split("").map(function(v){return v.charCodeAt(0)}));
        const base_58 = BigInt(alphabet_58.length); // base is the length of the alphabet (58 in this case)

        let cs_64_js = this._get_64_js;
        let cs_64_wasm = this._get_64_wasm;

        let s = cs_64_js();
        cs_64_wasm().then(function(r){
            s = r;
        }).catch(function(e){
            s = cs_64_js();
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
            int_that: function(array_buffer) {
                "use strict";

                return s.xxh_f.create64(0xFADE).update(new Uint8ClampedArray(typeof array_buffer === "string" ? Buffer.from(array_buffer): "buffer" in array_buffer ? array_buffer.buffer.slice(0, array_buffer.buffer.byteLength): array_buffer.slice(0, array_buffer.byteLength))).digest();
            },
            base58_that: function (array_buffer) {
                "use strict";
                let c = 0;
                let num = BigInt(this.int_that(array_buffer));
                let encoded = new Uint8Array(12);
                let remainder = BigInt(0);

                while (num > 0) {
                    remainder = num % base_58;
                    num = num / base_58;
                    encoded[c] = alphabet_58[parseInt(remainder.toString())];
                    c = (c + 1)|0;
                }

                return String.fromCharCode.apply(null, encoded);
            }
        };
    }
};

module.exports = XXHash;