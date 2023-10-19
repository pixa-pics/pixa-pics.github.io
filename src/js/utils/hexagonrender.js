

function generateFinalBase64(originalImageData, radius) {
    // Ensure the radius is valid
    if (![2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30].includes(radius)) {
        throw new Error("Invalid radius value. Must be one of [2, 4, 6, 8, 10].");
    }
    const a = 2 * Math.PI / 6;
    const r = radius;
    const d = r * 2;


    const canvas = document.createElement("canvas");
    canvas.width = originalImageData.width * d - (Math.floor(originalImageData.width/2)*r);
    const heightAdjusted = originalImageData.height * d - (Math.floor(originalImageData.height/2)*r);
    canvas.height = originalImageData.height * (d * Math.sin(a)) + (originalImageData.width % 2 === 0 ? d: r);
    const ctx = canvas.getContext('2d');

    function getColor(data, w, x, y) {
        let index = (y * w + x) * 4;
        if (index >= 0 && index < data.length) {
            var u32 = ((data[index] << 24) | (data[index+1] << 16) | (data[index+2] << 8) | data[index+3] | 0) >>> 0
            return "#".concat("00000000".concat(u32.toString(16)).slice(-8));
        }
        // Return a default color or throw an error if the index is out of bounds.
        // Here we return 0xFFFFFFFF (white) as a default; you might adjust as per your use case.
        console.warn(`Coordinates (${x}, ${y}) out of bounds.`);
        return "#00000000";
    }

    function drawHexagon(ctx, x, y, color) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    function drawGrid(ctx, data, width, height, sizeX, sizeY) {
        let posX = 0, posY = 0, color = "#00000000";
        let RorD = sizeX % 2 === 1 ? r: d;
        for (let y = r; posY < sizeY; y += RorD * Math.sin(a)) {
            posX = 0;
            for (let x = r, j = 0; posX < sizeX; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
                color = getColor(data, sizeX, posX, posY);
                drawHexagon(ctx, x, y, color);
                posX++;
            }
            posY++;
        }
    }

    drawGrid(ctx, originalImageData.data, canvas.width, canvas.height, originalImageData.width, originalImageData.height);
    const canvas2 = document.createElement("canvas");
    canvas2.width = canvas.width;
    canvas2.height = heightAdjusted;
    const ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas2.width, canvas2.height);

    // Step 4: Return the final ImageData object.
    return ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
}

function hexagonrender(image_data, scale, pool) {

    return new Promise( function(resolve, reject){

        resolve(generateFinalBase64(image_data, scale));
    });
}

module.exports = { hexagonrender: hexagonrender };