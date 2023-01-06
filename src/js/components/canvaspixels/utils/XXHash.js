import XXHashJS from "../../../utils/xxhash";
import XXHashWASM from "xxhash-wasm";

const XXHash = {
    _get_64_js() {

        return {
            // Compute properties
            xxh_f: {create64: function(seed){return XXHashJS.h64(seed); }},
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
                        xxh_f: {create64: function(seed){return hasher.create64(BigInt(seed))}} ,
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

        const alphabet_58 = Uint8Array.from("#&0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(function(v){return v.charCodeAt(0)}));
        const base_58 = BigInt(alphabet_58.length); // base is the length of the alphabet (58 in this case)
        let encoded = new Uint8Array(12);
        let bigInt = BigInt(0);

        let cs_64_js = this._get_64_js;
        let cs_64_wasm = this._get_64_wasm;

        let s = cs_64_js();
        let hash_func = s.xxh_f.create64(0xFADE);
        cs_64_wasm().then(function(r){
            s = r;
            hash_func = s.xxh_f.create64(0xFADE);
        }).catch(function(e){
            s = cs_64_js();
            hash_func = s.xxh_f.create64(0xFADE);
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

                bigInt = hash_func.update(
                    (array_buffer instanceof Uint8Array || array_buffer instanceof Uint8ClampedArray) ?
                        array_buffer:
                        new Uint8Array(
                            typeof array_buffer === "string" ?
                                Buffer.from(array_buffer):
                                "buffer" in array_buffer ?
                                    array_buffer.buffer:
                                    array_buffer
                        )
                ).digest();
                hash_func = s.xxh_f.create64(0xFADE);
                return bigInt;
            },
            base58_that: function (array_buffer) {
                "use strict";
                let c = 0;
                let num = BigInt(this.int_that(array_buffer));
                let remainder = 0;

                while (num > 0) {
                    remainder = Number(num % base_58) & 0xFFFF;
                    num = num / base_58;
                    encoded[c|0] = (alphabet_58[(remainder|0) & 0xFFFF] | 0) & 0xFFFF;
                    c = (c + 1 | 0) & 0xF;
                }

                return String.fromCharCode.apply(null, encoded);
            }
        };
    }
};

module.exports = XXHash;