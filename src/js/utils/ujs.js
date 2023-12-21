import UraniumJS from "uraniumjs/UraniumJS";
import UraniumCompressJS from "uraniumjs/UraniumCompressJS";
import JOYSON from "joyson";

UraniumJS.enrichFunctionCalls = UraniumCompressJS.UraniumJSEnrichFunctionCalls;
UraniumJS.depleteFunctionCalls = UraniumCompressJS.UraniumJSDepleteFunctionCalls;

const UJS = (uint8a_or_obj, mode = "COMPRESS_OBJECT", pool = null) => {

    return new Promise(function(resolve, reject){

        if (mode === "COMPRESS_OBJECT") {

            resolve(new Uint8ClampedArray(UraniumJS.withinEnrich(JOYSON.pack(uint8a_or_obj)).buffer));


        } else if (mode === "DECOMPRESS_UINT8A") {

            resolve(JOYSON.unpack(UraniumJS.withinDeplete(uint8a_or_obj)));

        }
    });

};

module.exports = { UJS }