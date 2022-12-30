import JSLoader from "./JSLoader";


const png = (dataurl, level, interlace, quality_min, quality_max, speed, pool = null) => {

    return new Promise(function(resolve, reject){

        JSLoader( () => import("../utils/oxi_png")).then(({oxi_png}) => {

            oxi_png(dataurl, level, interlace).catch(function(e){
                console.log("OXIPNG Failed to proceed... Using PNG-QUANT instead!");
                JSLoader( () => import("../utils/png_quant")).then((png_quant) => {

                    resolve(png_quant.default(dataurl, quality_min, quality_max, speed, pool));
                });
            }).then(resolve).catch(reject);
        });
    });
};

module.exports = {png}