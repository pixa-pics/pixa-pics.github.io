import {scaleImage} from "../utils/xbrz/xBRZ";
import {hqx_scale} from "../utils/hqx";
import {omniscale} from "../utils/omniscale";
import {imagedataToSVG} from "../utils/imagetracer";
import { optimize } from "svgo/dist/svgo.browser";

function base64png_to_xbrz_svg (base64png, callback_function_for_jpeg, callback_function_for_svg, pal= [], using = "xbrz") {

    let image = new Image();
    image.onload = () => {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const canvas_scale = document.createElement('canvas');
        const second_canvas_scale = document.createElement('canvas');
        let second_scale_size = 3;
        const src_image = new Image();
        src_image.onload = () => {

            const {width, height} = src_image;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(src_image, 0, 0, width, height);
            const image_data = ctx.getImageData(0, 0, width, height);
            let final_img_scale_data = null;
            let final_scale_size = 0;

            if(using === "hqx") {

                final_scale_size = 4;
                second_scale_size = 5;
                const second_img_scale = hqx_scale(src_image, final_scale_size);

                second_canvas_scale.width = width * final_scale_size;
                second_canvas_scale.height = height * final_scale_size;
                let second_canvas_ctx = second_canvas_scale.getContext("2d");
                second_canvas_ctx.drawImage(second_img_scale, 0, 0, width * final_scale_size, height * final_scale_size);
                final_img_scale_data = second_canvas_ctx.getImageData(0, 0, width * final_scale_size, height * final_scale_size);

            }else if(using === "omniscale") {

                final_scale_size = 10;
                second_scale_size = 2;
                const second_img_scale = omniscale(image_data, final_scale_size);

                second_canvas_scale.width = width * final_scale_size;
                second_canvas_scale.height = height * final_scale_size;
                let second_canvas_ctx = second_canvas_scale.getContext("2d");
                second_canvas_ctx.putImageData(second_img_scale, 0, 0);
                final_img_scale_data = second_canvas_ctx.getImageData(0, 0, width * final_scale_size, height * final_scale_size);

            }else {

                const buffer = Array.from(image_data.data);
                let source = [];
                for (let i = 0, len = buffer.length; i < len; i += 4) {
                    const r = buffer[i];
                    const g = buffer[i + 1];
                    const b = buffer[i + 2];
                    const a = buffer[i + 3];
                    const pixel = a << 24 | r << 16 | g << 8 | b;
                    source.push(pixel)
                }

                // First scaling algorithm (xBRZ)
                let scale_size = 6;
                second_scale_size = 3;
                final_scale_size = scale_size;
                let target = new Array(width * scale_size * height * scale_size);
                target.fill(0);
                scaleImage(scale_size, source, target, width, height, 0, height);

                let buffer_scale = [];
                for (let i = 0, len = target.length; i < len; ++i) {
                    const pixel = target[i];
                    const a = (pixel >> 24) & 0xff;
                    const r = (pixel >> 16) & 0xff;
                    const g = (pixel >> 8) & 0xff;
                    const b = (pixel) & 0xff;
                    buffer_scale.push(r);
                    buffer_scale.push(g);
                    buffer_scale.push(b);
                    buffer_scale.push(a);
                }

                const width_scale = width * scale_size;
                const height_scale = height * scale_size;
                canvas_scale.width = width_scale;
                canvas_scale.height = height_scale;
                const img_scale_buffer = new Uint8ClampedArray(buffer_scale);
                const img_scale_data = new ImageData(img_scale_buffer, width_scale, height_scale);
                final_img_scale_data = img_scale_data;
            }

            const second_width_scale = width * final_scale_size * second_scale_size;
            const second_height_scale = height * final_scale_size * second_scale_size;

            const second_buffer = Array.from(final_img_scale_data.data);
            let source = [];
            for (let i = 0, len = second_buffer.length; i < len; i += 4) {
                const r = second_buffer[i];
                const g = second_buffer[i + 1];
                const b = second_buffer[i + 2];
                const a = second_buffer[i + 3];
                const pixel = a << 24 | r << 16 | g << 8 | b;
                source.push(pixel)
            }

            let second_target = new Array(second_width_scale * second_height_scale);
            second_target.fill(0);
            scaleImage(second_scale_size, source, second_target, final_img_scale_data.width, final_img_scale_data.height, 0, final_img_scale_data.height);

            let second_buffer_scale = [];
            for (let i = 0, len = second_target.length; i < len; ++i) {
                const pixel = second_target[i];
                const a = (pixel >> 24) & 0xff;
                const r = (pixel >> 16) & 0xff;
                const g = (pixel >> 8) & 0xff;
                const b = (pixel) & 0xff;
                second_buffer_scale.push(r);
                second_buffer_scale.push(g);
                second_buffer_scale.push(b);
                second_buffer_scale.push(a);
            }

            second_canvas_scale.width = second_width_scale;
            second_canvas_scale.height = second_height_scale;
            const second_img_scale_buffer = new Uint8ClampedArray(second_buffer_scale);
            const second_img_scale_data = new ImageData(second_img_scale_buffer, second_width_scale, second_height_scale);

            let second_canvas_ctx = second_canvas_scale.getContext("2d");
            second_canvas_ctx.putImageData(second_img_scale_data, 0, 0);
            let jpeg_base64 = null;
            let webp_base64 = null;

            try {

                //webp_base64 = second_canvas_ctx.canvas.toDataURL("image/webp", 0.75);
                jpeg_base64 = second_canvas_ctx.canvas.toDataURL("image/jpeg", 0.75);
            }catch (e) {


            }

            callback_function_for_jpeg(jpeg_base64, webp_base64);

            imagedataToSVG( final_img_scale_data, {

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
                ltres : final_scale_size,
                qtres : final_scale_size,
                pathomit : final_scale_size,
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

            }, (svg_source) => {

                let data = optimize(svg_source, {
                    // optional but recommended field
                    path: 'path-to.svg',
                    // all config fields are also available here
                    multipass: true,
                    plugin: ["mergePaths"],
                }).data;

                callback_function_for_svg("data:image/svg+xml;base64," + window.btoa(data), width * final_scale_size, height * final_scale_size);
            } );

        }
        src_image.src = base64png;
    };
    image.src = base64png;
}

module.exports = {base64png_to_xbrz_svg};


