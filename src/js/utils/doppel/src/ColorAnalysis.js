import Pixel from "./Pixel";
export default class ColorAnalysis {
    static colorDifference(color1, color2) {
        "use strict";
        return Math.sqrt(
            Math.pow(color1.r - color2.r, 2) +
            Math.pow(color1.g - color2.g, 2) +
            Math.pow(color1.b - color2.b, 2) +
            Math.pow(color1.a - color2.a, 2)
        );
    }
    static averageColor(colors){
        "use strict";
        const sumColor = new Uint32Array(4);
        colors.forEach(color => {
            const rgba = color.rgba;
            sumColor[0] = (sumColor[0] + rgba[0] | 0) >>> 0;
            sumColor[1] = (sumColor[1] + rgba[1] | 0) >>> 0;
            sumColor[2] = (sumColor[2] + rgba[2] | 0) >>> 0;
            sumColor[3] = (sumColor[3] + rgba[3] | 0) >>> 0;
        });

        const colorLength = colors.length;
        return new Pixel(Uint8Array.of(sumColor[0] / colorLength|0, sumColor[1] / colorLength | 0, sumColor[2] / colorLength | 0, sumColor[3] / colorLength | 0));
    }
}