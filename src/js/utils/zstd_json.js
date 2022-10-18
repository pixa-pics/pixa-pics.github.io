import {ZstdInit as ZstdInitWasm, ZstdSimple as ZstdSimpleWasm} from "@oneidentity/zstd-js/wasm";
import {ZstdInit as ZstdInitAsm, ZstdSimple as ZstdSimpleAsm} from "@oneidentity/zstd-js/asm";
import {worker_cbor} from "./cbor";

const ZSTD = (uint8a_or_obj, mode = "COMPRESS_OBJECT", pool = null) => {

    if(Boolean(ZstdSimpleWasm) || Boolean(ZstdSimpleWasm)) {

        try {

            return new Promise(function(resolve){
                (async () => {
                    await ZstdInitWasm();

                    if (mode === "COMPRESS_OBJECT") {
                        //  JS -> buffer -> ui8a -> compressed ui8a
                        worker_cbor(uint8a_or_obj).then(function(buffer){
                            resolve(ZstdSimpleWasm.compress(new Uint8Array(buffer)));
                        });


                    } else if (mode === "DECOMPRESS_UINT8A") {
                        // compressed ui8a -> ui8a decompressed -> buffer -> JS
                        worker_cbor(ZstdSimpleWasm.decompress(uint8a_or_obj).buffer).then(function(js){
                            resolve(js);
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