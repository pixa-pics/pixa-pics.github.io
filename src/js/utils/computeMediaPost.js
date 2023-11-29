import {SIMDopeColors, SIMDopeColor} from "simdope";
import {base64_to_bitmap, bitmap_to_imagedata} from "./img_manipulation";
function getImageDataFromBase64(base64) {
    "use strict";
    return new Promise(function(resolve, reject){

        base64_to_bitmap(base64, function(bitmap){
            bitmap_to_imagedata(bitmap, 999999999, function(image_data){

                let new_pxls = new Uint16Array(image_data.width * image_data.height);
                let colorsuint32 = new Uint32Array(image_data.data.buffer);
                let uint32colorssorted = new SIMDopeColors(colorsuint32.buffer).get_deduplicated_sorted_uint32a();

                for (let i = 0; i < colorsuint32.length; i += 1) {

                    new_pxls[i|0] = uint32colorssorted.indexOf(colorsuint32[i|0]);
                }

                var sd = new SIMDopeColor(new ArrayBuffer(4));
                var sdc = new SIMDopeColors(uint32colorssorted.buffer);
                var hexs = new Array(uint32colorssorted.length);
                for(var i = 0; i < uint32colorssorted.length; i++){
                    hexs[i] = sdc.get_use_element(i, sd).hex;
                }

                resolve({
                    colors: hexs,
                    width: image_data.width,
                    height: image_data.height,
                    ...getIdealDimension(image_data.width, image_data.height)
                });
            });
        })
    });
}

function getIdealDimension(width, height, zoom, padding = [32, 32, 32, 32]){
    var wx = window.innerWidth;
    var wy = window.innerHeight;

    if(wx < 800){
        wx -= 0;
        wy -= 56;
    }else {
        wx -= 384;
        wx -= 64;
        wy -= 64;
    }

    var wr = wx/wy;
    var r = width/height;
    var finalWidth = 0, finalHeight = 0;

    if(r < wr){
        finalHeight = wy - (padding[0]+padding[2]);
        finalWidth = finalHeight * r;
    }else {
        finalWidth = wx - (padding[1]+padding[3]);
        finalHeight = finalWidth / r;
    }

    finalHeight *= zoom;
    finalWidth *= zoom;

    var maxLeft = -finalWidth / 2;
    var maxRight = wx + finalWidth / 2;



    return {
        finalWidth: Math.round(finalWidth),
        finalHeight: Math.round(finalHeight),
        width,
        height,
        marginLeft: Math.round((wx-finalWidth) / 2) + (padding[0]-padding[2]),
        marginTop: Math.round((wy-finalHeight) / 2) + (padding[1]-padding[3]),
    };
}

module.exports = {
    getImageDataFromBase64
}