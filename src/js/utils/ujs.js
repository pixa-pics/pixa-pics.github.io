import UraniumJS from "uraniumjs/UraniumJS.min.js";
import UraniumCompressJS from "uraniumjs/UraniumCompressJS.min.js";
import SuperJSONatural from "superjsonatural";

UraniumJS.enrichFunctionCalls = UraniumCompressJS.UraniumJSEnrichFunctionCalls;
UraniumJS.depleteFunctionCalls = UraniumCompressJS.UraniumJSDepleteFunctionCalls;
var SJSON = new SuperJSONatural();

const UJS = (uint8a_or_obj, mode = "COMPRESS_OBJECT", pool = null) => {

    return new Promise(function(resolve, reject){

        if (mode === "COMPRESS_OBJECT") {

            resolve(new Uint8ClampedArray(UraniumJS.withinEnrich(SJSON.pack(uint8a_or_obj)).buffer));


        } else if (mode === "DECOMPRESS_UINT8A") {

            resolve(SJSON.unpack(UraniumJS.withinDeplete(uint8a_or_obj)));

        }
    });

};

module.exports = { UJS }