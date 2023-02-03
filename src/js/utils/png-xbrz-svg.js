import pool from "../utils/worker-pool";
import JSLoader from "./JSLoader";
import depixelize from "../utils/depixelize/index";

const base64png_to_xbrz_svg = (base64png, callback_function_for_image, callback_function_for_svg, pal= [], using = "xbrz", optimize_render_size = false, download_svg = false) => {

    let image = new Image();
    image.onload = () => {

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        const {width, height} = image;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        let image_data = ctx.getImageData(0, 0, width, height);

        const process_svg = (image_data, scale) => {

            if(download_svg) {

                JSLoader( () => import("../utils/image_tracer")).then(({image_tracer}) => {

                    image_tracer(image_data, {

                        // Palette
                        pal: pal.map((c) => {

                            const r = parseInt(c.slice(1, 3), 16);
                            const g = parseInt(c.slice(3, 5), 16);
                            const b = parseInt(c.slice(5, 7), 16);
                            const a = parseInt(c.slice(7, 9), 16);

                            return {r, g, b, a};
                        }),

                        // Tracing
                        corsenabled : false,
                        ltres : scale,
                        qtres : scale,
                        pathomit : scale,
                        rightangleenhance : false,

                        // Color quantization
                        colorsampling : 2,
                        numberofcolors : 512,
                        mincolorratio : 0,
                        colorquantcycles : 1,

                        // Layering method
                        layering : 0,

                        // SVG rendering
                        strokewidth : Math.ceil(scale/2),
                        linefilter : true,
                        scale : 1,
                        roundcoords : 2,
                        viewbox : true,
                        desc : false,
                        lcpr : 0,
                        qcpr : 0,

                        // Blur
                        blurradius : scale,
                        blurdelta : scale*4

                    }, pool).then((svg_source) => {

                        if(optimize_render_size) {

                            JSLoader( () => import("svgo/dist/svgo.browser")).then(({optimize}) => {

                                svg_source = optimize(svg_source, {
                                    // optional but recommended field
                                    path: 'path-to.svg',
                                    // all config fields are also available here
                                    multipass: true,
                                    mergePaths: true,
                                    mergeStyles: true,
                                    collapseGroups: true,
                                    reusePaths: true,
                                    plugin: ["multipass", "mergePaths", "collapseGroups", "reusePaths", "mergeStyles"],
                                }).data;

                                callback_function_for_svg("data:image/svg+xml;base64," + window.btoa(svg_source), scale);

                            });
                        }else {

                            callback_function_for_svg("data:image/svg+xml;base64," + window.btoa(svg_source), scale);
                        }
                    });
                });
            }else {

                callback_function_for_svg("", 0);
            }
        }

        if(using === "depixelize") {

            const first_scale_size = 10;

            var results = depixelize(image_data, download_svg);
            var second_image_data = results[0];
            var svg_string = results[1];
            let third_canvas = document.createElement("canvas");
            third_canvas.width = second_image_data.width;
            third_canvas.height = second_image_data.height;
            let third_canvas_ctx = third_canvas.getContext("2d");
            third_canvas_ctx.putImageData(second_image_data, 0, 0);
            let base64_out = third_canvas_ctx.canvas.toDataURL("image/png");

            if(download_svg) {

                if(optimize_render_size) {

                    JSLoader( () => import("svgo/dist/svgo.browser")).then(({optimize}) => {

                        svg_string = optimize(svg_string, {
                            // optional but recommended field
                            path: 'path-to.svg',
                            // all config fields are also available here
                            multipass: true,
                            plugin: ["mergePaths"],
                        }).data;

                        callback_function_for_svg("data:image/svg+xml;base64," + window.btoa(svg_string), first_scale_size);

                    });
                }else {

                    callback_function_for_svg("data:image/svg+xml;base64," + window.btoa(svg_string), first_scale_size);

                }
            }

            if(optimize_render_size) {

                JSLoader( () => import("./png_quant")).then(({png_quant}) => {

                    png_quant(base64_out, 70, 80, 5, pool).then((base64_out_second) => {

                        callback_function_for_image(base64_out_second, first_scale_size, second_image_data.width, second_image_data.height);
                    });
                });
            }else {

                callback_function_for_image(base64_out, first_scale_size, second_image_data.width, second_image_data.height);
            }

        }else if(using === "omniscale") {

            JSLoader( () => import("../utils/omniscale")).then(({omniscale}) => {

                const first_scale_size = 8;

                omniscale(image_data, first_scale_size, pool).then((second_image_data) => {

                    let third_canvas = document.createElement("canvas");
                    third_canvas.width = second_image_data.width;
                    third_canvas.height = second_image_data.height;
                    let third_canvas_ctx = third_canvas.getContext("2d");
                    third_canvas_ctx.putImageData(second_image_data, 0, 0);
                    let base64_out = third_canvas_ctx.canvas.toDataURL("image/png");
                    process_svg(second_image_data, first_scale_size);

                    if(optimize_render_size) {

                        JSLoader( () => import("./png_quant")).then(({png_quant}) => {

                            png_quant(base64_out, 70, 80, 5, pool).then((base64_out_second) => {

                                callback_function_for_image(base64_out_second, first_scale_size, second_image_data.width, second_image_data.height);
                            });
                        });
                    }else {

                        callback_function_for_image(base64_out, first_scale_size, second_image_data.width, second_image_data.height);
                    }

                });
            });

        }else if(using === "hqnx") {

            JSLoader( () => import("../utils/hqnx")).then(({hqnx}) => {

                const first_scale_size = 4;

                hqnx(image_data, first_scale_size, pool).then((second_image_data) => {

                    let third_canvas = document.createElement("canvas");
                    third_canvas.width = second_image_data.width;
                    third_canvas.height = second_image_data.height;
                    let third_canvas_ctx = third_canvas.getContext("2d");
                    third_canvas_ctx.putImageData(second_image_data, 0, 0);
                    let base64_out = third_canvas_ctx.canvas.toDataURL("image/png");
                    process_svg(second_image_data, first_scale_size);

                    if(optimize_render_size) {

                        JSLoader( () => import("./png_quant")).then(({png_quant}) => {

                            png_quant(base64_out, 70, 80, 5, pool).then((base64_out_second) => {

                                callback_function_for_image(base64_out_second, first_scale_size, second_image_data.width, second_image_data.height);
                            });
                        });
                    }else {

                        callback_function_for_image(base64_out, first_scale_size, second_image_data.width, second_image_data.height);
                    }

                });
            });

        }else if(using === "epx") {

            JSLoader( () => import("../utils/EPX")).then(({epx}) => {

                const first_scale_size = 4;

                epx(image_data, first_scale_size, pool).then((second_image_data) => {

                    let third_canvas = document.createElement("canvas");
                    third_canvas.width = second_image_data.width;
                    third_canvas.height = second_image_data.height;
                    let third_canvas_ctx = third_canvas.getContext("2d");
                    third_canvas_ctx.putImageData(second_image_data, 0, 0);
                    let base64_out = third_canvas_ctx.canvas.toDataURL("image/png");
                    process_svg(second_image_data, first_scale_size);

                    if(optimize_render_size) {

                        JSLoader( () => import("./png_quant")).then(({png_quant}) => {

                            png_quant(base64_out, 70, 80, 5, pool).then((base64_out_second) => {

                                callback_function_for_image(base64_out_second, first_scale_size, second_image_data.width, second_image_data.height);
                            });
                        });
                    }else {

                        callback_function_for_image(base64_out, first_scale_size, second_image_data.width, second_image_data.height);
                    }

                });
            });

        }else {

            JSLoader( () => import("../utils/xBRZ")).then((xbrz) => {

                const first_scale_size = 6;
                xbrz.default(image_data, first_scale_size, pool).then((second_image_data) => {

                    let third_canvas = document.createElement("canvas");
                    third_canvas.width = second_image_data.width;
                    third_canvas.height = second_image_data.height;
                    let third_canvas_ctx = third_canvas.getContext("2d");
                    third_canvas_ctx.putImageData(second_image_data, 0, 0);
                    let base64_out = third_canvas_ctx.canvas.toDataURL("image/png");
                    process_svg(second_image_data, first_scale_size);

                    if(optimize_render_size) {

                        JSLoader( () => import("./png_quant")).then(({png_quant}) => {

                            png_quant(base64_out, 70, 80, 5, pool).then((base64_out_second) => {

                                callback_function_for_image(base64_out_second, first_scale_size, second_image_data.width, second_image_data.height);
                            });
                        });
                    }else {

                        callback_function_for_image(base64_out, first_scale_size, second_image_data.width, second_image_data.height);
                    }
                });
            });
        }
    };
    image.src = base64png;
};

module.exports = {base64png_to_xbrz_svg};


