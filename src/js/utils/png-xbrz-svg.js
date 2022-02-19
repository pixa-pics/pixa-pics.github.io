import {scaleImage} from "../utils/xbrz/xBRZ";
import {imagedataToSVG} from "../utils/imagetracer";
import { optimize } from "svgo/dist/svgo.browser";

function base64png_to_xbrz_svg (base64png, callback_function_for_jpeg, callback_function_for_svg, pal= []) {

    let image = new Image();
    image.onload = () => {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const canvas_scale = document.createElement('canvas');
        const ctx_scale = canvas_scale.getContext('2d');

        const src_image = new Image();
        src_image.onload = () => {
            const {width, height} = src_image;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(src_image, 0, 0, width, height);
            const image_data = ctx.getImageData(0, 0, width, height);
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
            let scale_size = 6;
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

            let jpeg_canvas = document.createElement("canvas");
            jpeg_canvas.width = img_scale_data.width;
            jpeg_canvas.height = img_scale_data.height;

            let svgCtx = jpeg_canvas.getContext("2d");
            svgCtx.putImageData(img_scale_data, 0, 0);
            let jpeg_base64 = jpeg_canvas.toDataURL("image/jpeg", 0.75);
            let png_base64 = jpeg_canvas.toDataURL("image/png");
            let webp_base64 = null;

            try {
                webp_base64 = jpeg_canvas.toDataURL("image/webp", 0.75);
            }catch (e) {}

            callback_function_for_jpeg(jpeg_base64, webp_base64, png_base64);

            imagedataToSVG( img_scale_data, {

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
                ltres : scale_size,
                qtres : scale_size,
                pathomit : scale_size,
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

                callback_function_for_svg("data:image/svg+xml;base64," + window.btoa(data), img_scale_data.width, img_scale_data.height);
            } );

        }
        src_image.src = base64png;
    };
    image.src = base64png;
}

module.exports = {base64png_to_xbrz_svg};


