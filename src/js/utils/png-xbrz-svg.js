import {scaleImage} from "../utils/xbrz/xBRZ";
import ImageTracer from "../utils/imagetracer";
import { optimize } from "svgo/dist/svgo.browser.js";

function base64png_to_xbrz_svg (base64png, callback_function) {

    let image = new Image();
    image.onload = () => {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const canvasScale = document.createElement('canvas');
        const ctxScale = canvasScale.getContext('2d');

        const srcImage = new Image();
        srcImage.onload = () => {
            const {width, height} = srcImage;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(srcImage, 0, 0, width, height);
            const imageData = ctx.getImageData(0, 0, width, height);
            const buffer = Array.from(imageData.data);
            let source = [];
            for (let i = 0, len = buffer.length; i < len; i += 4) {
                const r = buffer[i];
                const g = buffer[i + 1];
                const b = buffer[i + 2];
                const a = buffer[i + 3];
                const pixel = a << 24 | r << 16 | g << 8 | b;
                source.push(pixel)
            }
            const scaleSize = 6;
            let target = new Array(width * scaleSize * height * scaleSize);
            target.fill(0);
            scaleImage(scaleSize, source, target, width, height, 0, height);

            let bufferScale = [];
            for (let i = 0, len = target.length; i < len; ++i) {
                const pixel = target[i];
                const a = (pixel >> 24) & 0xff;
                const r = (pixel >> 16) & 0xff;
                const g = (pixel >> 8) & 0xff;
                const b = (pixel) & 0xff;
                bufferScale.push(r);
                bufferScale.push(g);
                bufferScale.push(b);
                bufferScale.push(a);
            }

            const widthScale = width * scaleSize;
            const heightScale = height * scaleSize;
            canvasScale.width = widthScale;
            canvasScale.height = heightScale;
            const imgScaleBuffer = new Uint8ClampedArray(bufferScale);
            const imgScaleData = new ImageData(imgScaleBuffer, widthScale, heightScale);

            let imagetracer = new ImageTracer();
            let svgstr = imagetracer.imagedataToSVG( imgScaleData, {

                // Tracing
                corsenabled : false,
                ltres : 1,
                qtres : 1,
                pathomit : 18,
                rightangleenhance : false,

                // Color quantization
                colorsampling : 2,
                numberofcolors : 128,
                mincolorratio : 0,
                colorquantcycles : 1,

                // Layering method
                layering : 0,

                // SVG rendering
                strokewidth : 6,
                linefilter : false,
                scale : 3,
                roundcoords : 1,
                viewbox : false,
                desc : false,
                lcpr : 0,
                qcpr : 0,

                // Blur
                blurradius : 0,
                blurdelta : 20

            } );

            svgstr = optimize(svgstr, {
                // optional but recommended field
                path: 'path-to.svg',
                // all config fields are also available here
                multipass: true,
            }).data;

            const svg_base64 = "data:image/svg+xml;base64," + window.btoa(svgstr);

            let svgImage = new Image();
            svgImage.onload = () => {

                const svgCanvas = document.createElement("canvas");
                svgCanvas.width = svgImage.width;
                svgCanvas.height = svgImage.height;
                const svgCtx = svgCanvas.getContext("2d");
                svgCtx.drawImage(svgImage, 0, 0, svgImage.width, svgImage.height);
                const png_base64 = svgCanvas.toDataURL("image/png");

                callback_function(svg_base64, png_base64);

            }
            svgImage.src = svg_base64;

        }
        srcImage.src = base64png;
    };
    image.src = base64png;
}

module.exports = {base64png_to_xbrz_svg};


