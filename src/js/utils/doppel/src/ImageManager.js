import Pixel from "./Pixel";
import ColorAnalysis from "./ColorAnalysis";
import { SetFixed } from "@asaitama/boolean-array";
import { QuantiMat } from "../../quantimat/QuantiMat";
var abs = Math.abs;
var imul = Math.imul;
export default class ImageManager {
    constructor(contextSource) {
        this.contextSource = contextSource;
    }
    static colorDifference(color1, color2) {
        // Simple RGB Euclidean distance
        var d1 = Uint8Array.of(abs(((color1 >> 24) & 0xFF) - ((color2 >> 24) & 0xFF)), abs(((color1 >> 16) & 0xFF) - ((color2 >> 16) & 0xFF)), abs(((color1 >> 8) & 0xFF) - ((color2 >> 8) & 0xFF)));
        var d2 = Uint16Array.of(imul(d1[0], d1[0]), imul(d1[1], d1[1]), imul(d1[2], d1[2]))
        return (Math.sqrt((((d2[0] << 1) + d2[0] | 0) + (d2[1] << 2) + (d2[2] << 1) | 0) / 10) | 0) >>> 0;
    }
    static quantizeImageData(ctx, numberOfColors) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        var t1 = Date.now();
        const [pxls, pxl_colors] = QuantiMat.split_image_data(imageData);
        var t2 = Date.now();
        const result = QuantiMat({
            pxls,
            pxl_colors,
            number_of_color: Math.min(pxl_colors.length, numberOfColors),
            width: imageData.width,
            height: imageData.height
        }).init().run().output("split");
        var t3 = Date.now();

        console.log(t2-t1, t3-t2);

        const pixels = result[0];
        const colors = result[1];
        const data = new Uint32Array(pixels.length);

        for(var i = 0; i < pixels.length; i++){
            data[i] = colors[pixels[i]];
        }

        imageData.data.set(new Uint8ClampedArray(data.buffer))

        return {
            imageData,
            clusterAssignments: pixels,
            centroids: colors
        };
    }
    static _calculateDistortions(object, originalImageData) {

        let {imageData, clusterAssignments, centroids} = object;
        let imul = Math.imul;
        let totalDistortion = 0;
        let originalImageDataUint32 = new Uint32Array(originalImageData.data.buffer);
        let imageDataUint32 = new Uint32Array(imageData.data.buffer);
        let clustersDistortion = new BigUint64Array(centroids.length);
        let distanceInt = 0;

        for (let i = 0; i < imageDataUint32.length; i++) {

            // Calculate the distance between the data point and its assigned centroid
            distanceInt = ImageManager.colorDifference(imageDataUint32[i], originalImageDataUint32[i]) | 0;
            distanceInt = imul(distanceInt, distanceInt) | 0;

            totalDistortion += distanceInt;
            clustersDistortion[clusterAssignments[i]] += BigInt(distanceInt);
        }

        return {totalDistortion, clustersDistortion: Array.from(clustersDistortion).map(function (n){return Number(n)}).sort(function (a, b){ return b - a; })};
    }
    static _findElbowPoint(distortions) {

        // Calculate the rate of change of distortion
        const distortionFinal = [];
        distortions.forEach(function (v) {
            if(v){
                distortionFinal.push(v);
            }
        });

        const rateOfChange = [];
        for (let i = 1; i < distortions.length; i++) {
            const change = distortions[i] - distortions[i - 1];
            const previousDistortion = distortions[i - 1];
            if (previousDistortion !== 0) {
                rateOfChange.push(change / previousDistortion);
            } else {
                rateOfChange.push(0);
            }
        }

        // Find the elbow point, i.e., the point with the maximum rate of change
        // This point indicates a sharp turn in the distortion reduction trend
        let elbowIndex = 0;
        let maxRateOfChange = rateOfChange[0];
        for (let i = 1; i < rateOfChange.length; i++) {
            if (rateOfChange[i] > maxRateOfChange) {
                elbowIndex = i;
                maxRateOfChange = rateOfChange[i];
            }
        }

        // Adjusting the elbow index to correspond to the actual value of k
        // Since the rateOfChange array is one element shorter than the distortions array
        return elbowIndex;
    }
    static _calculateElbowStrength(distortions, elbowPoint) {

        function distanceFromPointToLine(point, lineStart, lineEnd) {
            const numerator = Math.abs((lineEnd[1] - lineStart[1]) * point[0] - (lineEnd[0] - lineStart[0]) * point[1] + lineEnd[0] * lineStart[1] - lineEnd[1] * lineStart[0]);
            const denominator = Math.sqrt(Math.pow(lineEnd[1] - lineStart[1], 2) + Math.pow(lineEnd[0] - lineStart[0], 2));
            return numerator / denominator;
        }

        // Normalize k values and distortions
        const normalizedK = distortions.map((_, i) => i / (distortions.length - 1));
        const maxDistortion = Math.max(...distortions);
        const minDistortion = Math.min(...distortions);
        const normalizedDistortions = distortions.map(d => (d - minDistortion) / (maxDistortion - minDistortion));

        // Coordinates of the start, elbow, and end points
        const startPointNormalized = [0, normalizedDistortions[0]];
        const endPointNormalized = [1, normalizedDistortions[normalizedDistortions.length - 1]];
        const elbowPointNormalized = [normalizedK[elbowPoint], normalizedDistortions[elbowPoint]];

        // Calculate the base length and height
        const baseLength = Math.sqrt(Math.pow(endPointNormalized[0] - startPointNormalized[0], 2) + Math.pow(endPointNormalized[1] - startPointNormalized[1], 2));
        const height = distanceFromPointToLine(elbowPointNormalized, startPointNormalized, endPointNormalized);

        // The ratio of height to base as an approximation of curvature
        const curvature = height / baseLength;
        return Math.fround(curvature);
    }
    computePaletteData() {

        const imageData = this.contextSource.getImageData(0, 0, this.contextSource.canvas.width, this.contextSource.canvas.height);

        var t1 = Date.now();
        const dataQuantize = ImageManager.quantizeImageData(this.contextSource, 128);
        const initialColorNumber = dataQuantize.centroids.length;
        var t2 = Date.now();
        const distortion = ImageManager._calculateDistortions(dataQuantize, imageData); // Calculate distortions
        var t3 = Date.now();
        const elbowPoint = ImageManager._findElbowPoint(distortion.clustersDistortion);
        var t4 = Date.now();
        const elbowStrength = ImageManager._calculateElbowStrength(distortion.clustersDistortion, elbowPoint);
        var t5 = Date.now();
        const newImageDataData = elbowPoint === 0 ? this.contextSource.getImageData(0, 0, this.contextSource.canvas.width, this.contextSource.canvas.height): ImageManager.quantizeImageData(this.contextSource, elbowPoint).imageData;
        var t6 = Date.now();
        console.log({
            "quantizeImageData1": t2-t1,
            "_calculateDistortions": t3-t2,
            "_findElbowPoint": t4-t3,
            "_calculateElbowStrength+updateThreshold": t5-t4,
            "quantizeImageData2": t6-t5
        })

        return {
            colorNumber: elbowPoint === 0 ? initialColorNumber: elbowPoint,
            colorNumberCertainty: elbowStrength,
            colorData: newImageDataData
        };
    }
    analyzeImageForTileSize(imageData) {
        const width = imageData.width;
        const height = imageData.height;
        const pixels = new Uint32Array(imageData.data.buffer);
        const max = 64;
        const horizontalHistogram = new Uint32Array(max);
        const verticalHistogram = new Uint32Array(max);

        // Horizontal scan
        let consecutiveCount = 0, indexes = new Uint32Array(2);
        for (let y = 0; y < height; y++) {
            consecutiveCount = 0;
            for (let x = 1; x < width; x++) {
                indexes[0] = y * width + x | 0;
                indexes[1] = indexes[0] - 1 | 0;

                if (pixels[indexes[0]] == pixels[indexes[1]]) {
                    consecutiveCount++;
                } else {
                    if (consecutiveCount > 1 && consecutiveCount < max) {
                        horizontalHistogram[consecutiveCount] = horizontalHistogram[consecutiveCount] + 1 | 0;
                    }
                    consecutiveCount = 1;
                }
            }
            // Check at the end of the row
            if (consecutiveCount > 0 && consecutiveCount < max) {
                horizontalHistogram[consecutiveCount] = horizontalHistogram[consecutiveCount] + 1 | 0;
            }
        }

        // Vertical scan
        for (let x = 0; x < width; x++) {
            consecutiveCount = 0;
            for (let y = 1; y < height; y++) {
                indexes[0] = y * width + x | 0;
                indexes[1] = indexes[0] - width | 0;

                if (pixels[indexes[0]] == pixels[indexes[1]]) {
                    consecutiveCount++;
                } else {
                    if (consecutiveCount > 1 && consecutiveCount < max) {
                        verticalHistogram[consecutiveCount] = verticalHistogram[consecutiveCount] + 1 | 0;
                    }
                    consecutiveCount = 1;
                }
            }
            // Check at the end of the column
            if (consecutiveCount > 0 && consecutiveCount < max) {
                verticalHistogram[consecutiveCount] = verticalHistogram[consecutiveCount] + 1 | 0;
            }
        }

        // Analyze histograms to find potential tile sizes
        function analyzeHistogram(histogram) {
            // We assume the most common length of consecutive pixels might indicate the tile size
            let m = 0;
            let n = 4;
            let chosenTileSize = 1;
            while(n >= 4 && n <= 32){
                var tile1 = histogram[n];

                var tile2a = histogram[n*2-1];
                var tile2b = histogram[n*2];
                var tile2c = histogram[n*2+1];

                var tile3a = histogram[n*4-1];
                var tile3b = histogram[n*4];
                var tile3c = histogram[n*4+1];

                var max1 = tile1 * n * (1+n*0.1);
                var max2 = Math.max(tile2a, tile2b, tile2c) * n * 2;
                var max3 = Math.max(tile3a, tile3b, tile3c) * n * 4;
                var max = max1;

                if(m < max) {
                    m = max;
                    chosenTileSize = n;
                }
                n++;
            }
            var maxHistogram = 0;
            histogram.forEach(function (repeat, number){
                maxHistogram += repeat*number;
            });
            const certainty = Math.fround((chosenTileSize * histogram[chosenTileSize]) / maxHistogram); // Simple certainty calculation
            return { tileSize: chosenTileSize, certainty };
        }

        const horizontalAnalysis = analyzeHistogram(horizontalHistogram);
        const verticalAnalysis = analyzeHistogram(verticalHistogram);

        // Combine horizontal and vertical analysis to determine final tile size and certainty
        const certainty = Math.max(horizontalAnalysis.certainty, verticalAnalysis.certainty) * 100;
        const tileSize = certainty === horizontalAnalysis.certainty ? horizontalAnalysis.tileSize: verticalAnalysis.tileSize;


        return { tileSize, certainty };
    }
}