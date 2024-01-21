import snappyJS from "snappyjs";
import JOYSON from "joyson";

const UJS = (uint8a_or_obj, mode = "COMPRESS_OBJECT", pool = null) => {

    return new Promise(function(resolve, reject){

        if (mode === "COMPRESS_OBJECT") {

            resolve(new Uint8ClampedArray(snappyJS.compress(JOYSON.pack(uint8a_or_obj)).buffer));


        } else if (mode === "DECOMPRESS_UINT8A") {

            resolve(JOYSON.unpack(snappyJS.uncompress(uint8a_or_obj)));

        }
    });

};

module.exports = { UJS }