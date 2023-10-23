/* MIT License, Copyright (c) 2023 Affolter Matias */
function generateFinalImageData(originalImageData, radius) {

    if (radius <= 2 || radius >= 36) {
        throw new Error("Invalid radius value. Must within 2 and 36");
    }

    // Create constant
    const a = 2 * Math.PI / 6;
    const r = radius;
    const d = r * 2;

    var heightElement = d * Math.sin(a);
    var distanceEdge = findDistanceXY(findMidpoint([r + r * Math.cos(a * 0), r + r * Math.sin(a * 0)], [r + r * Math.cos(a * 1), r + r * Math.sin(a * 1)]), findMidpoint([r + r * Math.cos(a * 1), r + r * Math.sin(a * 1)], [r, r]))
    var paddingXBig = distanceEdge[0];
    var paddingXSmall = (r - paddingXBig) / 2;

    var paddingXSum = paddingXBig + paddingXSmall;
    var paddingYSum = (heightElement/2) + paddingXBig;

    var widthElement = heightElement + paddingXSmall;
    var distanceElementX = paddingXSum * 2;
    var distanceElementY = paddingYSum * 2;

    // Create an intermediate canvas to draw hexagon onto it
    const canvas = document.createElement("canvas");
    canvas.width = originalImageData.width * distanceElementX + widthElement; // Hexagons are taking 1x Diameter less 1/2 radius of width
    canvas.height = originalImageData.height * paddingYSum + heightElement; // Hexagons are taking a height that is computed differently
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
        ctx.lineWidth = 2;
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

    function drawGrid(ctx, data, width, height, sizeX, sizeY) {
        let posX = 0, posY = 0;

        // As long as we have column to then change y coordinate to the new lower line
        for (let y = heightElement/2; posY < sizeY; y += paddingYSum) {
            posX = 0;
            for (
                let x = (posY % 2 === 0 ? 0: paddingXSum); // Reset cursor x
                posX < sizeX; // As long as we still have some column in line
                // Do the zigzag magic between hexagon of a line
                    x += distanceElementX
            ) {
                //paddingApplied = (x % 2) === (y % 2) ? +padding: -padding;
                // Get the hexadecimal HTML5 color and draw the shape
                drawKikko(ctx, x, y, getColor(data, sizeX, posX, posY));
                posX ++; // Update current coordinate X
            }
            posY ++; // Update current coordinate Y
        }
    }

    // Paint our new image into our working canvas
    drawGrid(ctx, originalImageData.data, canvas.width, canvas.height, originalImageData.width, originalImageData.height);

    // Return the new image data
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// This function return a promise that return the up scaled image data
function kikkorender(image_data, scale, pool) {
    return new Promise( function(resolve, reject){
        resolve(generateFinalImageData(image_data, scale));
    });
}

module.exports = { "kikkorender": kikkorender };