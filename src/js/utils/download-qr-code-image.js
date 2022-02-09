import ReactDOMServer from 'react-dom/server'
import QRCode from "qrcode.react";
import React from "react";
import svg64 from "svg64";

function download_qr_code_image(text_string, size_px = 512, level="M", name= "WCR", render_as = "png", include_margin = true) {


    const svg_string = ReactDOMServer.renderToString(<QRCode
        includeMargin={include_margin}
        level={level}
        size={size_px}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        renderAs={"svg"}
        value={text_string}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    />);

    const svg_string_base64 = svg64(svg_string);

    if(render_as === "svg") {

        // Download svg image
        const a = document.createElement("a");
        a.href = svg_string_base64;
        a.target = '_blank';
        a.download = name + ".svg";
        a.click();

    }else {

        // create canvas in memory(not in DOM)
        let canvas = document.createElement('canvas');
        // get canvas context for drawing on canvas
        let context = canvas.getContext('2d');
        // set canvas size
        canvas.width = size_px;
        canvas.height = size_px;
        // create image in memory(not in DOM)
        let image = new Image();
        // later when image loads run this
        image.onload = function () { // async (happens later)
            // clear canvas
            context.clearRect(0, 0, size_px, size_px);
            // draw image with SVG data to canvas
            context.drawImage(image, 0, 0, size_px, size_px);
            // snapshot canvas as png
            const png_string_base64 = canvas.toDataURL("image/png");

            // Download png image
            const a = document.createElement("a");
            a.href = png_string_base64;
            a.target = '_blank';
            a.download = name + ".png";
            a.click();

        }; // end async
        // start loading SVG data into in memory image
        image.src = svg_string_base64;

    }

}

module.exports = download_qr_code_image;