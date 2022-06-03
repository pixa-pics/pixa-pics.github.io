import pool from "../utils/worker-pool";

function base64png_to_xbrz_svg (base64png, callback_function_for_image, callback_function_for_svg, pal= [], using = "xbrz", optimize_render_size = false) {

    let image = new Image();
    image.onload = () => {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const {width, height} = image;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        const image_data = ctx.getImageData(0, 0, width, height);

        const process_svg = (image_data, scale) => {

            import("../utils/image_tracer").then(({image_tracer}) => {

                image_tracer( image_data, {

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
                    strokewidth : 3,
                    linefilter : true,
                    scale : 1,
                    roundcoords : 0,
                    viewbox : true,
                    desc : false,
                    lcpr : 0,
                    qcpr : 0,

                    // Blur
                    blurradius : 0,
                    blurdelta : 20

                }, pool).then((svg_source) => {

                    if(optimize_render_size) {

                        import("svgo/dist/svgo.browser").then(({optimize}) => {

                            let data = optimize(svg_source, {
                                // optional but recommended field
                                path: 'path-to.svg',
                                // all config fields are also available here
                                multipass: true,
                                plugin: ["mergePaths"],
                            }).data;

                            callback_function_for_svg("data:image/svg+xml;base64," + window.btoa(data));
                        });
                    }else {

                        callback_function_for_svg("data:image/svg+xml;base64," + window.btoa(svg_source));
                    }
                });
            });
        }

        if(using === "omniscale") {

            const first_scale_size = 6;
            const third_canvas = document.createElement("canvas");

            import("../utils/omniscale").then(({omniscale}) => {

                omniscale(image_data, first_scale_size, pool).then((second_image_data) => {

                    third_canvas.width = second_image_data.width;
                    third_canvas.height = second_image_data.height;
                    let third_canvas_ctx = third_canvas.getContext("2d");
                    third_canvas_ctx.putImageData(second_image_data, 0, 0);
                    const base64_out = third_canvas_ctx.canvas.toDataURL("image/png");

                    if(optimize_render_size) {

                        import("../utils/png_quant").then(({png_quant}) => {

                            png_quant(base64_out, 60, 70, 8, pool).then((base64_out_second) => {

                                callback_function_for_image(base64_out_second);
                            });
                        });
                    }else {

                        callback_function_for_image(base64_out);
                    }

                    process_svg(second_image_data, first_scale_size);
                });
            });

        }else {

            const first_scale_size = 6;
            const third_canvas = document.createElement("canvas");

            import("../utils/xBRZ").then(({xbrz}) => {

                xbrz(image_data, first_scale_size, pool).then((second_image_data) => {

                    third_canvas.width = second_image_data.width;
                    third_canvas.height = second_image_data.height;
                    let third_canvas_ctx = third_canvas.getContext("2d");
                    third_canvas_ctx.putImageData(second_image_data, 0, 0);
                    const base64_out = third_canvas_ctx.canvas.toDataURL("image/png");

                    if(optimize_render_size) {

                        import("../utils/png_quant").then(({png_quant}) => {

                            png_quant(base64_out, 60, 70, 8, pool).then((base64_out_second) => {

                                callback_function_for_image(base64_out_second);
                            });
                        });
                    }else {

                        callback_function_for_image(base64_out);
                    }

                    process_svg(second_image_data, first_scale_size);
                });
            });
        }
    };
    image.src = base64png;
}

module.exports = {base64png_to_xbrz_svg};


