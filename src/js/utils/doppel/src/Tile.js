import Pixel from "./Pixel"
import KMeans from "./KMeans";
import {QuantiMat} from "../../quantimat/QuantiMat";

export default class Tile {
    constructor(imageData, colorUint8a, x = 0, y = 0) {
        this.imageData = imageData;
        this.meanColor = new Pixel(colorUint8a);
        this.coordinates = Uint16Array.of(x, y);
        var l = this.imageData.data.length;
        this.k = l >= 64 ? 6: l >= 16 ? 5: l >= 9 ? 4: l >= 2 ? 3: 2;
    }
    get x(){
        return this.coordinates[0];
    }
    get y(){
        return this.coordinates[1];
    }
    extractColorData(data) {
        "use strict";
        let colors = new Array(data.length/4);
        for (let i = 0; i < data.length; i += 4) {
            colors[i/4] = data.subarray(i, i+4);
        }
        return colors;
    }
    quantizeColors() {
        "use strict";

        const [pxls, pxl_colors] = QuantiMat.split_image_data(this.imageData);

        const result = QuantiMat({
            pxls,
            pxl_colors,
            number_of_color: Math.min(pxl_colors.length, this.k),
            width: this.imageData.width,
            height: this.imageData.height
        }).init().run().output("split");

        const pixels = result[0];
        const colors = result[1];
        const count = new Uint32Array(colors.length);

        for(var i = 0; i < pixels.length; i++){
            count[colors.indexOf(colors[pixels[i]])]++;
        }

        return [count, colors]
    }

    calculateMeanColor() {
        "use strict";
        const [count, colors] = this.quantizeColors();
        const mostUsed = colors[count.indexOf(Math.max(...Array.from(count)))];
        this.meanColor.setUint32(mostUsed);
    }
}