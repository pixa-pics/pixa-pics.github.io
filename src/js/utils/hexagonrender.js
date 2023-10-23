/* MIT License, Copyright (c) 2023 Affolter Matias */
function generateFinalImageData(originalImageData, radius) {
    "use strict";
    if (radius <= 2 || radius >= 32) {
        throw new Error("Invalid radius value. Must within 2 and 32");
    }

    // Create constant
    const lineWidth = Math.ceil(radius/16)/2 - 0.5;
    const a = 2 * Math.PI / 6;
    const r = radius;
    const d = r * 2;

    // Create an intermediate canvas to draw hexagon onto it
    const canvas = document.createElement("canvas");
    canvas.width = originalImageData.width * d - (Math.floor(originalImageData.width/2)*r); // Hexagons are taking 1x Diameter less 1/2 radius of width
    canvas.height = originalImageData.height * (d * Math.sin(a)) + (originalImageData.width % 2 === 0 ? d: r); // Hexagons are taking a height that is computed differently
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    function getUint32(data, index) {
        "use strict";
        index = (index | 0) >>> 0;
        // Verify the given index is within the bounds of the r, g, b, a (uint8array
        if (index >= 0 && index < data.length) {
            // "Sum up" 4 x 8bits into 1 x 32 bit unsigned integer
            return ((data[index] << 24) | (data[index+1] << 16) | (data[index+2] << 8) | data[index+3] | 0) >>> 0
        }
        return 0;
    }

    function uint32ToHex(uint32) {
        "use strict";
        uint32 = (uint32 | 0) >>> 0;
        // Converting the number to a hexadecimal string which is added to a string made of zeroes
        // The hexadecimal with padding is cut to represent a fixed length of rrggbbaa which are added to "#"
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
        for (let i = 0; i < 6; i++) {
            ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
        }
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
        for (let y = r; posY < sizeY; y += RorD * Math.sin(a)) {
            posX = 0;
            for (
                let x = r, j = 0; // Reset cursor x
                posX < sizeX; // As long as we still have some column in line
                // Do the zigzag magic between hexagon of a line
                    x += r * (1 + Math.cos(a)),
                    y += (-1) ** j++ * r * Math.sin(a)
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
    ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas2.width, canvas2.height);
    // Return the new image data
    return ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
}

// This function return a promise that return the up scaled image data
function hexagonrender(image_data, scale, pool) {
    "use strict";
    return new Promise( function(resolve, reject){
        "use strict";
        resolve(generateFinalImageData(image_data, scale));
    });
}

module.exports = { hexagonrender: hexagonrender };