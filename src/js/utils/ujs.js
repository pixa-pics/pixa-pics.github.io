import UraniumJS from "uraniumjs/UraniumJS";
import UraniumCompressJS from "uraniumjs/UraniumCompressJS";
import SuperJSONatural from "superjsonatural";

UraniumJS.enrichFunctionCalls = UraniumCompressJS.UraniumJSEnrichFunctionCalls;
UraniumJS.depleteFunctionCalls = UraniumCompressJS.UraniumJSDepleteFunctionCalls;
var SJSON = new SuperJSONatural();

const UJS = (uint8a_or_obj, mode = "COMPRESS_OBJECT", pool = null) => {

    return new Promise(function(resolve, reject){

        if (mode === "COMPRESS_OBJECT") {

            uint8a_or_obj = SJSON.pack(uint8a_or_obj);
            uint8a_or_obj = UraniumJS.withinEnrich(uint8a_or_obj);
            resolve(new Uint8ClampedArray(uint8a_or_obj.buffer));


        } else if (mode === "DECOMPRESS_UINT8A") {

            uint8a_or_obj = UraniumJS.withinDeplete(uint8a_or_obj);
            uint8a_or_obj = SJSON.unpack(uint8a_or_obj);
            resolve(uint8a_or_obj);

        }
    });

};

module.exports = { UJS }