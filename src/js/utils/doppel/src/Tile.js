import Pixel from "./Pixel"
import KMeans from "./KMeans";

export default class Tile {
    constructor(imageData, colorUint8a, x = 0, y = 0) {
        this.imageData = imageData;
        this.meanColor = new Pixel(colorUint8a);
        this.coordinates = Uint16Array.of(x, y)
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
            colors[i/4] = new Pixel(data.subarray(i, i+4));
        }
        return colors;
    }
    quantizeColors(k) {
        "use strict";
        k = k || Math.ceil(Math.sqrt(this.imageData.data.length));
        const data = this.imageData.data;
        const colors = this.extractColorData(data);
        const colorsArray = colors.map(function (c){return c.rgba; });
        return new KMeans(colorsArray, 4).run(8);
    }

    calculateMeanColor() {
        "use strict";
        const quantizedResult = this.quantizeColors();
        const rgba = quantizedResult.centroidsSorted[0].data;
        this.meanColor.setRGBA(rgba);
    }
}