import {png_quant} from "./png_quant";
import {oxi_png} from "./oxi_png";


const png = (dataurl, level, interlace, quality_min, quality_max, speed, pool = null) => {

    return new Promise(function(resolve, reject){

        oxi_png(dataurl, level, interlace).then(resolve).catch(function(e){
            console.log("OXI-PNG Failed over WebAssembly... Using PNG-QUANT instead :D");
            png_quant(dataurl, quality_min, quality_max, speed, pool).then(resolve).catch(reject);
        })
    });
};

module.exports = {png}