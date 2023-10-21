/* MIT License, Copyright (c) 2023 Affolter Matias */
function generateFinalBase64(originalImageData, radius) {

    if (radius <= 2 || radius >= 36) {
        throw new Error("Invalid radius value. Must within 2 and 36");
    }

    // Create constant
    const a = 2 * Math.PI / 6;
    const r = radius;
    const d = r * 2;

    // Create an intermediate canvas to draw hexagon onto it
    const canvas = document.createElement("canvas");
    canvas.width = originalImageData.width * d - (Math.floor(originalImageData.width/2)*r); // Hexagons are taking 1x Diameter less 1/2 radius of width
    canvas.height = originalImageData.height * (d * Math.sin(a)) + (originalImageData.width % 2 === 0 ? d: r); // Hexagons are taking a height that is computed differently
    const ctx = canvas.getContext('2d');

    function getUint32(data, index) {
        // Verify the given index is within the bounds of the r, g, b, a uint8array
        if (index >= 0 && index < data.length) {
            // "Sum up" 4 x 8bits into 1 x 32 bit unsigned integer
            return ((data[index] << 24) | (data[index+1] << 16) | (data[index+2] << 8) | data[index+3] | 0) >>> 0
        }
        return 0;
    }

    function uint32ToHex(uint32) {
        // Converting the number to a hexadecimal string which is added to a string made of zeroes
        // The hexadecimal with padding is cut to represent a fixed length of rrggbbaa which are added to "#"
       return "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
    }

    function getColor(data, w, x, y) {
        let index = (y * w + x) * 4; // Compute the index (within the data where 4 elements gives a color
        return uint32ToHex(getUint32(data, index));
    }

    function findMidpoint(xy1, xy2) {
        const xMid = (xy1[0] + xy2[0]) / 2;
        const yMid = (xy1[1] + xy2[1]) / 2;
        return [xMid, yMid];
    }

    function findDistanceXY(xy1, xy2) {
        const dX = xy1[0] - xy2[0];
        const dY = xy1[1] - xy2[1];
        return [Math.sqrt(dX * dX), Math.sqrt(dY * dY)];
    }

    function drawKikko(ctx, x, y, color) {
        // Define the style of painting on our canvas context
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.beginPath();

        // Draw all intersections in a new path
        var middleIntersection = [x, y];

        var visibleIntersections = [
            [x + r * Math.cos(a * 0), y + r * Math.sin(a * 0)],
            [x + r * Math.cos(a * 2), y + r * Math.sin(a * 2)],
            [x + r * Math.cos(a * 4), y + r * Math.sin(a * 4)]
        ];

        var ghostIntersections = [
            [x + r * Math.cos(a * 1), y + r * Math.sin(a * 1)],
            [x + r * Math.cos(a * 3), y + r * Math.sin(a * 3)],
            [x + r * Math.cos(a * 5), y + r * Math.sin(a * 5)]
        ];

        var intersection = [0, 0]
        ctx.lineTo(visibleIntersections[0][0], visibleIntersections[0][1]);
        intersection = findMidpoint(visibleIntersections[0], ghostIntersections[0]);
        ctx.lineTo(intersection[0], intersection[1]);
        intersection = findMidpoint(middleIntersection, ghostIntersections[0]);
        ctx.lineTo(intersection[0], intersection[1]);
        intersection = findMidpoint(visibleIntersections[1], ghostIntersections[0]);
        ctx.lineTo(intersection[0], intersection[1]);

        ctx.lineTo(visibleIntersections[1][0], visibleIntersections[1][1]);
        intersection = findMidpoint(visibleIntersections[1], ghostIntersections[1]);
        ctx.lineTo(intersection[0], intersection[1]);
        intersection = findMidpoint(middleIntersection, ghostIntersections[1]);
        ctx.lineTo(intersection[0], intersection[1]);
        intersection = findMidpoint(visibleIntersections[2], ghostIntersections[1]);
        ctx.lineTo(intersection[0], intersection[1]);

        ctx.lineTo(visibleIntersections[2][0], visibleIntersections[2][1]);
        intersection = findMidpoint(visibleIntersections[2], ghostIntersections[2]);
        ctx.lineTo(intersection[0], intersection[1]);
        intersection = findMidpoint(middleIntersection, ghostIntersections[2]);
        ctx.lineTo(intersection[0], intersection[1]);
        intersection = findMidpoint(visibleIntersections[0], ghostIntersections[2]);
        ctx.lineTo(intersection[0], intersection[1]);

        // Close the path and fill the area
        ctx.closePath(); ctx.stroke(); ctx.fill();
    }

    function drawHexagon(ctx, x, y, color) {
        // Define the style of painting on our canvas context
        ctx.lineWidth = 1;
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
        let posX = 0, posY = 0;
        // When we return to a new line, if we have an odd number of column
        // We end up going to the bottom from a higher y coordinate (ZIGZAG in Y)
        let RorD = sizeX % 2 === 1 ? r: d; // Must go once or twice to the bottom
        var distance = findDistanceXY(findMidpoint([r + r * Math.cos(a * 0), r + r * Math.sin(a * 0)], [r + r * Math.cos(a * 1), r + r * Math.sin(a * 1)]), findMidpoint([r + r * Math.cos(a * 1), r + r * Math.sin(a * 1)], [r, r]))
        var padding = distance[0];
        //var paddingApplied = padding;

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
                //paddingApplied = (x % 2) === (y % 2) ? +padding: -padding;
                // Get the hexadecimal HTML5 color and draw the shape
                drawHexagon(ctx, x, y, getColor(data, sizeX, posX, posY));
                posX++; // Update current coordinate X
            }
            posY++; // Update current coordinate Y
        }

        posX = 0; posY = 0;
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
                //paddingApplied = (x % 2) === (y % 2) ? +padding: -padding;
                // Get the hexadecimal HTML5 color and draw the shape
                drawKikko(ctx, x-padding, y-padding, getColor(data, sizeX, posX, posY));
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
    // Draw the image with a correct ratio
    ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas2.width, canvas2.height);
    // Return the new image data
    return ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
}

// This function return a promise that return the up scaled image data
function zaprender(image_data, scale, pool) {
    return new Promise( function(resolve, reject){
        resolve(generateFinalBase64(image_data, scale));
    });
}

module.exports = { zaprender: zaprender };