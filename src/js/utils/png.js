import {png_quant} from "./png_quant";
import {oxi_png} from "./oxi_png";


const png = (dataurl, level, interlace, quality_min, quality_max, speed, pool = null) => {

    return new Promise(function(resolve, reject){

        oxi_png(dataurl, level, interlace).catch(function(e){
            console.log("OXIPNG Failed to proceed... Using PNG-QUANT instead!");
            return png_quant(dataurl, quality_min, quality_max, speed, pool)
        }).then(resolve).catch(reject);
    });
};

module.exports = {png}