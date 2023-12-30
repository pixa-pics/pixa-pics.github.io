/* MIT License, Copyright (c) 2023 Affolter Matias */
function initConstants(radius) {
    const CONSTANTS = new Float32Array(18);
    CONSTANTS[0] = Math.ceil(radius / 16) / 2 - 0.5; // LINE_WIDTH
    CONSTANTS[1] = 2 * Math.PI / 6; // A
    CONSTANTS[2] = radius; // R
    CONSTANTS[3] = radius * 2; // D
    CONSTANTS[4] = Math.sin(CONSTANTS[1]); // SIN(A)
    CONSTANTS[5] = Math.cos(CONSTANTS[1]); // COS(A)
    CONSTANTS[6] = CONSTANTS[2] * Math.cos(CONSTANTS[1] * 0); // rcosai 0
    CONSTANTS[7] = CONSTANTS[2] * Math.cos(CONSTANTS[1] * 1); // rcosai 1
    CONSTANTS[8] = CONSTANTS[2] * Math.cos(CONSTANTS[1] * 2); // rcosai 2
    CONSTANTS[9] = CONSTANTS[2] * Math.cos(CONSTANTS[1] * 3); // rcosai 3
    CONSTANTS[10] = CONSTANTS[2] * Math.cos(CONSTANTS[1] * 4); // rcosai 4
    CONSTANTS[11] = CONSTANTS[2] * Math.cos(CONSTANTS[1] * 5); // rcosai 5

    CONSTANTS[12] = CONSTANTS[2] * Math.sin(CONSTANTS[1] * 0); // rsinai 1
    CONSTANTS[13] = CONSTANTS[2] * Math.sin(CONSTANTS[1] * 1); // rsinai 2
    CONSTANTS[14] = CONSTANTS[2] * Math.sin(CONSTANTS[1] * 2); // rsinai 3
    CONSTANTS[15] = CONSTANTS[2] * Math.sin(CONSTANTS[1] * 3); // rsinai 4
    CONSTANTS[16] = CONSTANTS[2] * Math.sin(CONSTANTS[1] * 4); // rsinai 5
    CONSTANTS[17] = CONSTANTS[2] * Math.sin(CONSTANTS[1] * 5); // rsinai 6
    return CONSTANTS;
}

function createCanvasWithFallback(width, height) {
    // Attempt to create an OffscreenCanvas
    var canvas;
    if (typeof OffscreenCanvas !== 'undefined') {
        canvas = new OffscreenCanvas(width, height);
    }else {
        // Fallback to regular HTML canvas element if OffscreenCanvas is not available
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
    }

    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return ctx;
}

function createObjectURLFromCanvas(canvas, callback) {
    // Convert the canvas to a Blob
    canvas.toBlob(function(blob) {
        // Create an object URL for the Blob
        const url = URL.createObjectURL(blob);

        // Call the callback function with the URL
        callback(url);
    });
}

function generateFinalImageData(originalImageData, radius, object_url) {
    "use strict";
    if (radius <= 2 || radius >= 32) {
        throw new Error("Invalid radius value. Must within 2 and 32");
    }

    var fr = Math.fround;

    return new Promise(function (resolve, reject){

        const CONSTANTS = initConstants(radius);
        const lineWidth = CONSTANTS[0];
        const a = CONSTANTS[1];
        const r = CONSTANTS[2];
        const d = CONSTANTS[3];
        const sina = CONSTANTS[4];
        const cosa = CONSTANTS[5];

        const rcosai0 = CONSTANTS[6];
        const rcosai1 = CONSTANTS[7];
        const rcosai2 = CONSTANTS[8];
        const rcosai3 = CONSTANTS[9];
        const rcosai4 = CONSTANTS[10];
        const rcosai5 = CONSTANTS[11];

        const rsinai0 = CONSTANTS[12];
        const rsinai1 = CONSTANTS[13];
        const rsinai2 = CONSTANTS[14];
        const rsinai3 = CONSTANTS[15];
        const rsinai4 = CONSTANTS[16];
        const rsinai5 = CONSTANTS[17];

        // Create an intermediate canvas to draw hexagon onto it
        const ctx = createCanvasWithFallback(
            originalImageData.width * d - (Math.floor(originalImageData.width/2)*r),// Hexagons are taking 1x Diameter less 1/2 radius of width
            originalImageData.height * (d * Math.sin(a)) + (originalImageData.width % 2 === 0 ? d: r) // Hexagons are taking a height that is computed differently
        );
        const canvas = ctx.canvas;

        function getUint32(data, index) {
            "use strict";
            return (data[index] << 24) | (data[index+1] << 16) | (data[index+2] << 8) | data[index+3] | 0;
        }

        function uint32ToHex(uint32) {
            "use strict";
            uint32 = (uint32 | 0) >>> 0;
            return "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
        }

        function getColor(data, w, x, y) {
            "use strict";
            let index = (y * w + x | 0) << 2; // Compute the index (within the data where 4 elements gives a color
            return uint32ToHex(getUint32(data, index));
        }

        function drawHexagon(ctx, x, y, color) {
            "use strict";
            // Define the style of painting on our canvas context
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.beginPath();
            // Draw all intersections in a new path
            ctx.lineTo(x + rcosai0, y + rsinai0);
            ctx.lineTo(x + rcosai1, y + rsinai1);
            ctx.lineTo(x + rcosai2, y + rsinai2);
            ctx.lineTo(x + rcosai3, y + rsinai3);
            ctx.lineTo(x + rcosai4, y + rsinai4);
            ctx.lineTo(x + rcosai5, y + rsinai5);
            // Close the path and fill the area
            ctx.closePath(); ctx.stroke(); ctx.fill();
        }

        function drawGrid(ctx, data, width, height, sizeX, sizeY) {
            "use strict";
            let posX = 0, posY = 0;
            // When we return to a new line, if we have an odd number of column
            // We end up going to the bottom from a higher y coordinate (ZIGZAG in Y)
            let RorD = sizeX % 2 === 1 ? r: d; // Must go once or twice to the bottom

            // As long as we have column to then change y coordinate to the new lower line
            for (let y = r; posY < sizeY; y += RorD * sina) {
                posX = 0;
                for (
                    let x = r, j = 0; // Reset cursor x
                    posX < sizeX; // As long as we still have some column in line
                    // Do the zigzag magic between hexagon of a line
                    x += r * (1 + cosa),
                        y += (-1) ** j++ * r * sina
                ) {
                    // Get the hexadecimal HTML5 color and draw the shape
                    drawHexagon(ctx, x, y, getColor(data, sizeX, posX, posY));
                    posX++; // Update current coordinate X
                }
                posY++; // Update current coordinate Y
            }
        }

        // Paint our new image into our working canvas
        drawGrid(ctx, originalImageData.data, canvas.width, canvas.height, originalImageData.width, originalImageData.height);

        // Paint the working canvas into a new one with a ratio that is not distorted
        // Since hexagon are placed asymmetrically in columns and lines, we have to flatten the height a bit
        const canvas2 = document.createElement("canvas");
        canvas2.width = canvas.width; // The width doesn't change
        // Yet we apply the same mathematical operation of the one used for the width yet for the height
        canvas2.height = originalImageData.height * d - (Math.floor(originalImageData.height/2)*r);
        const ctx2 = canvas2.getContext('2d');
        //ctx2.imageSmoothingEnabled = false;

        // Draw the image with a correct ratio
        ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, ctx2.canvas.width, ctx2.canvas.height);
        // Return the new image data
        if(!object_url){
            resolve(ctx2.getImageData(0, 0, ctx2.canvas.width, ctx2.canvas.height))
        }else {

            createObjectURLFromCanvas(ctx2.canvas, resolve);
        }

    });
}

// This function return a promise that return the up scaled image data
function hexagonrender(image_data, scale, object_url) {
    "use strict";
    return new Promise( function(resolve, reject){
        "use strict";
        resolve(generateFinalImageData(image_data, scale, object_url));
    });
}

module.exports = { hexagonrender: hexagonrender };