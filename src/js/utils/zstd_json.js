import {ZstdInit as ZstdInitWasm, ZstdSimple as ZstdSimpleWasm} from "@oneidentity/zstd-js/wasm";
import {ZstdInit as ZstdInitAsm, ZstdSimple as ZstdSimpleAsm} from "@oneidentity/zstd-js/asm";
import {cbor} from "./cbor";

const ZSTD = (uint8a_or_obj, mode = "COMPRESS_OBJECT", pool = null) => {

    if(Boolean(ZstdSimpleWasm) || Boolean(ZstdSimpleWasm)) {

        try {

            return new Promise(function(resolve){
                (async () => {
                    await ZstdInitWasm();

                    if (mode === "COMPRESS_OBJECT") {
                        //  JS -> buffer -> ui8a -> compressed ui8a
                        cbor(uint8a_or_obj).then(function(serialized_buffer){

                            var uint8a_serialized = new Uint8ClampedArray(serialized_buffer);
                            var uint8a_serialized_compressed = ZstdSimpleWasm.compress(uint8a_serialized);
                            console.log(uint8a_serialized.length, uint8a_serialized_compressed.length)
                            resolve(uint8a_serialized_compressed)
                        });


                    } else if (mode === "DECOMPRESS_UINT8A") {
                        // compressed ui8a -> ui8a decompressed -> buffer -> JS
                        var uint8a_serialized = ZstdSimpleWasm.decompress(uint8a_or_obj);
                        console.log(uint8a_or_obj.length, uint8a_serialized.length)
                        cbor(uint8a_serialized).then(function(obj){
                            resolve(obj);
                        });
                    }
                })();
            });

        } catch(e){
            try {

                return new Promise(function(resolve){
                    (async () => {
                        await ZstdInitAsm();

                        if (mode === "COMPRESS_OBJECT") {
                            //  JS -> json_str -> ui8a -> compressed ui8a
                            resolve(ZstdSimpleAsm.compress(text_encoder.encode(JSON.stringify(uint8a_or_obj, null, 0)), 3, true));

                        } else if (mode === "DECOMPRESS_UINT8A") {
                            // ui8a decompressed -> ui8a -> json_str -> JS
                            resolve(JSON.parse(text_decoder.decode(ZstdSimpleAsm.decompress(uint8a_or_obj, 3, true))));
                        }
                    })();
                });

            } catch(e){}
        }

    }

    return Promise.reject();
};

module.exports = { ZSTD }