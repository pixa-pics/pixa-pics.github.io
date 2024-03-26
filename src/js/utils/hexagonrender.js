/* MIT License, Copyright (c) 2023 Affolter Matias
function initConstants(radius) {
    var fr = Math.fround;
    const CONSTANTS = new Float32Array(18);
    CONSTANTS[0] = fr(Math.ceil(radius / 16) / 2 + 0.5); // LINE_WIDTH
    CONSTANTS[1] = fr(2 * Math.PI / 6); // A
    CONSTANTS[2] = fr(radius); // R
    CONSTANTS[3] = fr(radius * 2); // D
    CONSTANTS[4] = fr(Math.sin(CONSTANTS[1])); // SIN(A)
    CONSTANTS[5] = fr(Math.cos(CONSTANTS[1])); // COS(A)
    CONSTANTS[6] = fr(CONSTANTS[2] * Math.cos(CONSTANTS[1] * 0)); // rcosai 0
    CONSTANTS[7] = fr(CONSTANTS[2] * Math.cos(CONSTANTS[1] * 1)); // rcosai 1
    CONSTANTS[8] = fr(CONSTANTS[2] * Math.cos(CONSTANTS[1] * 2)); // rcosai 2
    CONSTANTS[9] = fr(CONSTANTS[2] * Math.cos(CONSTANTS[1] * 3)); // rcosai 3
    CONSTANTS[10] = fr(CONSTANTS[2] * Math.cos(CONSTANTS[1] * 4)); // rcosai 4
    CONSTANTS[11] = fr(CONSTANTS[2] * Math.cos(CONSTANTS[1] * 5)); // rcosai 5

    CONSTANTS[12] = fr(CONSTANTS[2] * Math.sin(CONSTANTS[1] * 0)); // rsinai 1
    CONSTANTS[13] = fr(CONSTANTS[2] * Math.sin(CONSTANTS[1] * 1)); // rsinai 2
    CONSTANTS[14] = fr(CONSTANTS[2] * Math.sin(CONSTANTS[1] * 2)); // rsinai 3
    CONSTANTS[15] = fr(CONSTANTS[2] * Math.sin(CONSTANTS[1] * 3)); // rsinai 4
    CONSTANTS[16] = fr(CONSTANTS[2] * Math.sin(CONSTANTS[1] * 4)); // rsinai 5
    CONSTANTS[17] = fr(CONSTANTS[2] * Math.sin(CONSTANTS[1] * 5)); // rsinai 6
    return CONSTANTS;
}

function createCanvasWithFallback(width, height) {
    // Attempt to create an OffscreenCanvas
    var canvas;
    if (false && typeof OffscreenCanvas !== 'undefined') {
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

    return new Promise(function (resolve, reject){

        const CONSTANTS = initConstants(radius);

        // Create an intermediate canvas to draw hexagon onto it
        const ctx = createCanvasWithFallback(
            originalImageData.width * CONSTANTS[3] - (Math.floor(originalImageData.width/2)*CONSTANTS[2]),// Hexagons are taking 1x Diameter less 1/2 radius of width
            originalImageData.height * CONSTANTS[3] - (Math.floor(originalImageData.height/2)*CONSTANTS[2]) // Hexagons are taking a height that is computed differently
        );
        const canvas = ctx.canvas;

        const ratio = Math.fround(canvas.height / (originalImageData.height * (CONSTANTS[3] * CONSTANTS[4]) + (originalImageData.width % 2 === 0 ? CONSTANTS[3]: CONSTANTS[2])));

        function getUint32(data, index) {
            "use strict";
            return (data[index] << 24) | (data[index+1] << 16) | (data[index+2] << 8) | data[index+3] | 0;
        }

        let uint32HexMap = {};
        function uint32ToHex(uint32) {
            "use strict";
            uint32 = (uint32 | 0) >>> 0;
            if(typeof uint32HexMap[uint32] != "string"){
                uint32HexMap[uint32] = "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
            }
            return uint32HexMap[uint32];
        }

        function getColor(data, w, x, y) {
            "use strict";
            let index = (y * w + x | 0) << 2; // Compute the index (within the data where 4 elements gives a color
            return uint32ToHex(getUint32(data, index));
        }

        function drawHexagon(ctx, vari, color) {
            "use strict";
            // Define the style of painting on our canvas context
            ctx.lineWidth = CONSTANTS[0];
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.beginPath();
            // Draw all intersections in a new path
            ctx.lineTo(vari[1] + CONSTANTS[6], (vari[2] + CONSTANTS[12])*ratio);
            ctx.lineTo(vari[1] + CONSTANTS[7], (vari[2] + CONSTANTS[13])*ratio);
            ctx.lineTo(vari[1] + CONSTANTS[8], (vari[2] + CONSTANTS[14])*ratio);
            ctx.lineTo(vari[1] + CONSTANTS[9], (vari[2] + CONSTANTS[15])*ratio);
            ctx.lineTo(vari[1] + CONSTANTS[10], (vari[2] + CONSTANTS[16])*ratio);
            ctx.lineTo(vari[1] + CONSTANTS[11], (vari[2] + CONSTANTS[17])*ratio);
            // Close the path and fill the area
            ctx.closePath(); ctx.stroke(); ctx.fill();
        }

        function drawGrid(ctx, data, width, height, sizeX, sizeY) {
            "use strict";
            let posX = 0, posY = 0;
            // When we return to a new line, if we have an odd number of column
            // We end up going to the bottom from a higher y coordinate (ZIGZAG in Y)
            let vari = new Float32Array(3);
            vari[0] = sizeX % 2 === 1 ? CONSTANTS[2]: CONSTANTS[3]; // Must go once or twice to the bottom

            // As long as we have column to then change y coordinate to the new lower line
            for (vari[2] = CONSTANTS[2]; posY < sizeY; vari[2] += vari[0] * CONSTANTS[4]) {
                posX = 0;
                vari[1] = CONSTANTS[2];
                for (
                    var j = 0; // Reset cursor x
                    posX < sizeX; // As long as we still have some column in line
                    // Do the zigzag magic between hexagon of a line
                    vari[1] = Math.fround(vari[1] + CONSTANTS[2] * (1 + CONSTANTS[5])),
                        vari[2] = Math.fround(vari[2] + (-1) ** j++ * CONSTANTS[2] * CONSTANTS[4])
                ) {
                    // Get the hexadecimal HTML5 color and draw the shape
                    drawHexagon(ctx, vari, getColor(data, sizeX, posX, posY));
                    posX++; // Update current coordinate X
                }
                posY++; // Update current coordinate Y
            }
        }

        // Paint our new image into our working canvas
        drawGrid(ctx, originalImageData.data, canvas.width, canvas.height, originalImageData.width, originalImageData.height);

        // Return the new image data
        if(!object_url){
            resolve(ctx.canvas.toDataURL("image/png"))
        }else {

            createObjectURLFromCanvas(ctx.canvas, resolve);
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
*/

/* MIT License, Copyright (c) 2023 Affolter Matias*/
function initConstants(radius) {
    var fr = Math.fround;
    const CONSTANTS = new Float32Array(6), CONSTANTS_X = new Float32Array(6), CONSTANTS_Y = new Float32Array(6);
    CONSTANTS[0] = fr(Math.ceil(radius / 16) / 2 + 1); // LINE_WIDTH
    CONSTANTS[1] = fr(2 * Math.PI / 6); // A
    CONSTANTS[2] = fr(radius); // Radius
    CONSTANTS[3] = fr(radius * 2); // Diameter
    CONSTANTS[4] = fr(Math.sin(CONSTANTS[1])); // SIN(A)
    CONSTANTS[5] = fr(Math.cos(CONSTANTS[1])); // COS(A)

    // 6X Hexagon coordinate
    for (let i = 0; i < 6; i++) {
        CONSTANTS_X[i] = fr(CONSTANTS[2] * Math.cos(CONSTANTS[1] * i));
        CONSTANTS_Y[i] = fr(CONSTANTS[2] * Math.sin(CONSTANTS[1] * i));
    }
    
    return {
        CONSTANTS,
        CONSTANTS_X,
        CONSTANTS_Y
    };
}

function createCanvasWithFallback(width, height) {
    // Attempt to create an OffscreenCanvas
    var canvas;
    if (false && typeof OffscreenCanvas !== 'undefined') {
        canvas = new OffscreenCanvas(width|0, height|0);
    } else {
        // Fallback to regular HTML canvas element if OffscreenCanvas is not available
        canvas = document.createElement('canvas');
        canvas.width = width|0;
        canvas.height = height|0;
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
    if (radius <= 1 || radius >= 100) {
        throw new Error("Invalid radius value. Must within 1 and 100");
    }

    return new Promise(function (resolve, reject) {

        const {CONSTANTS, CONSTANTS_X, CONSTANTS_Y} = initConstants(radius);

        // Create an intermediate canvas to draw hexagon onto it
        const ctx = createCanvasWithFallback(
            originalImageData.width * CONSTANTS[3] - (Math.floor(originalImageData.width / 2) * CONSTANTS[2]), // Hexagons are taking 1x Diameter less 1/2 radius of width
            originalImageData.height * CONSTANTS[3] - (Math.floor(originalImageData.height / 2) * CONSTANTS[2]) // Hexagons are taking a height that is computed differently
        );
        const canvas = ctx.canvas;

        const ratio = Math.fround(canvas.height / (originalImageData.height * (CONSTANTS[3] * CONSTANTS[4]) + (originalImageData.width % 2 === 0 ? CONSTANTS[3] : CONSTANTS[2])));

        let uint32HexMap = {};
        function uint32ToHex(uint32) {
            "use strict";
            uint32 = (uint32 | 0) >>> 0;
            if (typeof uint32HexMap[uint32] != "string") {
                uint32HexMap[uint32] = "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
            }
            return uint32HexMap[uint32];
        }

        function getColor(data32a, w, x, y) {
            "use strict";
            return uint32ToHex(data32a[(y * w + x | 0) >>> 0]);
        }

        function drawHexagon(ctx, vari, color) {
            "use strict";
            // Define the style of painting on our canvas context
            ctx.lineWidth = CONSTANTS[0]|0;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.beginPath();
            // Draw all intersections in a new path
            ctx.lineTo(vari[1] + CONSTANTS_X[0]|0, (vari[2] + CONSTANTS_Y[0])*ratio|0);
            ctx.lineTo(vari[1] + CONSTANTS_X[1]|0, (vari[2] + CONSTANTS_Y[1])*ratio|0);
            ctx.lineTo(vari[1] + CONSTANTS_X[2]|0, (vari[2] + CONSTANTS_Y[2])*ratio|0);
            ctx.lineTo(vari[1] + CONSTANTS_X[3]|0, (vari[2] + CONSTANTS_Y[3])*ratio|0);
            ctx.lineTo(vari[1] + CONSTANTS_X[4]|0, (vari[2] + CONSTANTS_Y[4])*ratio|0);
            ctx.lineTo(vari[1] + CONSTANTS_X[5]|0, (vari[2] + CONSTANTS_Y[5])*ratio|0);
            // Close the path and fill the area
            ctx.closePath(); ctx.stroke(); ctx.fill();
        }

        // Cache for storing pre-rendered tiles
        let colorTileCache = {};
        let zeros = new Float32Array(3).fill(CONSTANTS[2]);
        function getColorTile(ctx, color) {
            if (!colorTileCache[color]) {
                let tileCtx = createCanvasWithFallback(CONSTANTS[3], CONSTANTS[3]);
                drawHexagon(tileCtx, zeros, color)
                colorTileCache[color] = tileCtx.canvas;
            }
            return colorTileCache[color];
        }

        function drawHexagonCached(ctx, vari, color) {
            "use strict";
            let colorTile = getColorTile(ctx, color);
            ctx.drawImage(colorTile, vari[1]-CONSTANTS_X[0], (vari[2]-CONSTANTS_X[0]) * ratio);
        }

        function drawGrid(ctx, data32a, width, height, sizeX, sizeY) {
            "use strict";
            let posX = 0, posY = 0;
            let vari = new Float32Array(3);
            vari[0] = sizeX % 2 === 1 ? CONSTANTS[2] : CONSTANTS[3];

            for (vari[2] = CONSTANTS[2]; posY < sizeY; vari[2] += vari[0] * CONSTANTS[4]) {
                posX = 0;
                vari[1] = CONSTANTS[2];
                for (
                    var j = 0;
                    posX < sizeX;
                    vari[1] = Math.fround(vari[1] + CONSTANTS[2] * (1 + CONSTANTS[5])),
                        vari[2] = Math.fround(vari[2] + (-1) ** j++ * CONSTANTS[2] * CONSTANTS[4])
                ) {
                    drawHexagonCached(ctx, vari, getColor(data32a, sizeX, posX, posY));
                    posX++;
                }
                posY++;
            }
        }

        const dataUint32 = new Uint32Array(Uint8Array.from(originalImageData.data).reverse().buffer).reverse();
        ctx.globalCompositeOperation = "source-over";
        drawGrid(ctx, dataUint32, canvas.width, canvas.height, originalImageData.width, originalImageData.height);

        if (!object_url) {
            resolve(ctx.canvas.toDataURL("image/png"))
        } else {
            createObjectURLFromCanvas(ctx.canvas, resolve);
        }

    });
}

function hexagonrender(image_data, scale, object_url) {
    "use strict";
    return new Promise(function (resolve, reject) {
        "use strict";
        resolve(generateFinalImageData(image_data, scale, object_url));
    });
}

module.exports = { hexagonrender: hexagonrender };