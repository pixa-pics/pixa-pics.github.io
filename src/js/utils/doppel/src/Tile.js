import Pixel from "./Pixel"
import KMeans from "./KMeans";
import {QuantiMat} from "../../quantimat/QuantiMat";

export default class Tile {
    constructor(imageData, colorUint8a, x = 0, y = 0) {
        this.imageData = imageData;
        this.meanColor = new Pixel(colorUint8a);
        this.coordinates = Uint16Array.of(x, y);
        var l = this.imageData.data.length;
        this.k = l >= 64 ? 6: l >= 16 ? 4: l >= 9 ? 3: l >= 2 ? 2: 1;
    }
    get x(){
        return this.coordinates[0];
    }
    get y(){
        return this.coordinates[1];
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
        const count = pixels < 255 ? new Uint8Array(colors.length): new Uint16Array(colors.length);

        for(var i = 0; i < pixels.length; i++){
            count[pixels[i]]++;
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