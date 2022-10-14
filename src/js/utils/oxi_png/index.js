/*
# OxiPNG

- Source: <https://github.com/shssoichiro/oxipng> (Modified)
- Version: v3.0.0
- License: MIT
 */

import * as oxipng from './oxipng';
import {base64_sanitize} from "../img_manipulation"
const oxipng_promise = oxipng.default();

function b64toblob (b64_data_1, pool) {
    return new Promise(function(resolve, reject){

        base64_sanitize(b64_data_1, function(b64_data_2){
            fetch(b64_data_2).then(function(response){
                response.blob().then(function(blob){
                    resolve(blob);
                }).catch(reject);
            }).catch(reject);
        }, pool);
    });
}

function blobtobase64 (blob) {
    return URL.createObjectURL(blob);
}

const oxi_png = (dataurl, level = 0, interlace = false, pool = null) => {

    return new Promise(function(resolve, reject){
        oxipng_promise.then(function (){
            b64toblob(dataurl, pool).then(function(blob){
                blob.arrayBuffer().then(function(array_buffer){
                    resolve(
                        blobtobase64(new Blob([
                            oxipng.optimise(
                                new Uint8Array(array_buffer),
                                level,
                                interlace
                            )
                        ],{type: "image/png"}))
                    );
                }).catch(reject);
            }).catch(reject);
        }).catch(reject);
    });
};

module.exports = {oxi_png}