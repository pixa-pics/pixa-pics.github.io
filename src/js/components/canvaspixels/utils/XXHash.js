import XXH from "xxhashjs";
import xxHash from "xxhash-wasm";

const XXHash = {

    _get_32_js: function() {

        return {
            // Compute properties
            xxh_f: XXH.h32,
            xxh_v: "32",
            xxh_t: "js",
            xxh_tt: Date.now()
        };
    },
    _get_32_wasm: function() {

        return new Promise(function(resolve, reject){

            try {

                xxHash().then(({create32}) => {

                    parseInt(create32(0xFADE).update(new Uint8Array(Buffer.from(Array.of(3, 69, 777, 666)))).digest());
                    resolve({
                        xxh_f: create32,
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

    new: function(){

        const alphabet_58 = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        const base_58 = alphabet_58.length; // base is the length of the alphabet (58 in this case)

        let cs_32_js = this._get_32_js;
        let cs_32_wasm = this._get_32_wasm;

        let s = cs_32_js();
        cs_32_wasm().then(function(r){
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
            int_that: function(array) {

                return s.xxh_f(0xFADE).update(new Uint8Array(array.buffer || Buffer.from(array))).digest();
            },
            base58_that: function (array) {
                let num = this.int_that(array);
                let encoded = new Array(5);
                let remainder = 0;
                let chain = 0;

                while (num && chain < 5) {
                    remainder = parseInt(num % base_58);
                    num = num / base_58;
                    encoded[chain] = alphabet_58[remainder].toString();
                    chain++;
                }

                return encoded.join("");
            }
        };
    }
};

module.exports = Object.create(XXHash);