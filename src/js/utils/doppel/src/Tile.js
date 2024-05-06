import Pixel from "./Pixel"
import KMeans from "./KMeans";

export default class Tile {
    constructor(imageData, colorUint8a, x = 0, y = 0) {
        this.imageData = imageData;
        this.meanColor = new Pixel(colorUint8a);
        this.coordinates = Uint16Array.of(x, y);
        var l = this.imageData.data.length;
        this.k = l >= 16 ? 4: l >= 9 ? 3: l >= 4 ? 2: l >= 2 ? 1: 1;
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
        const data = this.imageData.data;
        const colors = this.extractColorData(data);
        return new KMeans(colors, this.k).run(this.k, true);
    }

    calculateMeanColor() {
        "use strict";
        const quantizedResult = this.quantizeColors();
        const rgba = quantizedResult.centroidsSorted[0].data;
        this.meanColor.setRGBA(rgba);
    }
}