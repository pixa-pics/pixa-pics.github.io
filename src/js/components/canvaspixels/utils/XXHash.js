import {xxHash32} from "js-xxhash";
import xxHash from "xxhash-wasm";

const XXHash = {

    _get_32_js: function() {

        return Object.assign({}, {
            // Compute properties
            xxh_f: xxHash32,
            xxh_v: "32",
            xxh_t: "js",
            xxh_tt: Date.now()
        });
    },
    _get_64_wasm: function() {

        return new Promise(function(resolve, reject){

            try {

                xxHash().then(({h64Raw}) => {

                    const test = h64Raw(Uint8Array.from(Buffer.from(Array.of(3, 69, 777, 666))));
                    resolve(Object.assign({}, {
                        xxh_f: h64Raw,
                        xxh_v: "64",
                        xxh_t: "wasm",
                        xxh_tt: Date.now()
                    }));
                }).catch(function(e){

                    reject();
                });

            } catch (e) {

                reject();
            }
        });
    },

    new: function(){

        const alphabet_58 = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        const base_58 = BigInt(alphabet_58.length); // base is the length of the alphabet (58 in this case)

        let cs_32 = this._get_32_js;
        let cs_64 = this._get_64_wasm;

        let s = cs_32();
        cs_64().then(function(r){
            s = r;
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
            bigint_that: function(array) {

                return BigInt(s.xxh_f(new Uint8Array(array.buffer || Buffer.from(array))));
            },
            base58_that: function (array) {
                let num = this.bigint_that(array);
                let encoded = "";
                let remainder = 0;

                while (num) {
                    remainder = parseInt(num % base_58);
                    num = num / base_58;
                    encoded = alphabet_58[remainder].toString() + encoded;
                }

                return encoded;
            }
        };
    }
};

module.exports = XXHash;