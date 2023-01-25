import UraniumJS from "uraniumjs/UraniumJS";
import UraniumCompressJS from "uraniumjs/UraniumCompressJS";
import SuperJSONatural from "superjsonatural";

UraniumJS.enrichFunctionCalls = UraniumCompressJS.UraniumJSEnrichFunctionCalls;
UraniumJS.depleteFunctionCalls = UraniumCompressJS.UraniumJSDepleteFunctionCalls;
UraniumJS.JSONX = new SuperJSONatural();

const UJS = (uint8a_or_obj, mode = "COMPRESS_OBJECT", pool = null) => {

    return new Promise(function(resolve, reject){

        if (mode === "COMPRESS_OBJECT") {

            uint8a_or_obj = UraniumJS.utils.onlyCharPrintable(UraniumJS.utils.onlyCharParsable(UraniumJS.JSONX.stringify(uint8a_or_obj)));
            uint8a_or_obj = UraniumJS.UTFX.toUint8Array(uint8a_or_obj);
            uint8a_or_obj = UraniumJS.withinEnrich(uint8a_or_obj);
            resolve(new Uint8ClampedArray(uint8a_or_obj.buffer));


        } else if (mode === "DECOMPRESS_UINT8A") {

            uint8a_or_obj = UraniumJS.withinDeplete(uint8a_or_obj);
            uint8a_or_obj = UraniumJS.UTFX.fromUint8Array(uint8a_or_obj);
            uint8a_or_obj = UraniumJS.JSONX.parse(UraniumJS.utils.onlyCharParsable(UraniumJS.utils.onlyCharPrintable(uint8a_or_obj)));
            resolve(uint8a_or_obj);

        }
    });

};

module.exports = { UJS }