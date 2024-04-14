import Pixel from "./Pixel";
import ColorAnalysis from "./ColorAnalysis";
import { SetFixed } from "@asaitama/boolean-array";
import { QuantiMat } from "../../quantimat/QuantiMat";

export default class ImageManager {
    constructor(contextSource) {
        this.contextSource = contextSource;
    }
    static colorDifference(color1, color2) {
        // Simple RGB Euclidean distance
        const rDiff = ((color1 >> 24) & 0xFF) - ((color2 >> 24) & 0xFF);
        const gDiff = ((color1 >> 16) & 0xFF) - ((color2 >> 16) & 0xFF);
        const bDiff = ((color1 >> 8) & 0xFF) - ((color2 >> 8) & 0xFF);
        return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff) | 0;
    }
    static findNearestCentroid(pixel, centroids) {
        let minDistance = Infinity;
        let index = 0;
        for (let i = 0; i < centroids.length; i++) {
            const distance = ImageManager.colorDifference(pixel, centroids[i]);
            if (distance < minDistance) {
                minDistance = distance;
                index = i;
            }
        }
        return index;
    }
    static updateCentroids(pixels, clusterAssignments, centroids, k) {
        const sum = new Uint32Array(k * 4); // For R, G, B
        const count = new Uint32Array(k);

        // Accumulate sum and count for each cluster
        for (let i = 0; i < pixels.length; i++) {
            const cluster = clusterAssignments[i];
            const pixel = pixels[i];
            sum[cluster * 4] += (pixel >> 24) & 0xFF; // R
            sum[cluster * 4 + 1] += (pixel >> 16) & 0xFF; // G
            sum[cluster * 4 + 2] += (pixel >> 8) & 0xFF; // B
            sum[cluster * 4 + 3] += (pixel >> 0) & 0xFF; // A
            count[cluster]++;
        }

        // Update centroids
        for (let i = 0; i < k; i++) {
            if (count[i] === 0) continue; // Avoid division by zero
            const rAvg = sum[i * 4] / count[i] | 0;
            const gAvg = sum[i * 4 + 1] / count[i] | 0;
            const bAvg = sum[i * 4 + 2] / count[i] | 0;
            const aAvg = sum[i * 4 + 3] / count[i] | 0;
            centroids[i] = ((rAvg << 24) | (gAvg << 16) | (bAvg << 8) | (aAvg << 0)) >>> 0; // Assuming alpha is always 255
        }

        return count;
    }
    static findFarthestPixelIdFromCentroids(pixels, centroids) {
        let maxDist = 0;
        let farthestPixelIdColor = 0;
        pixels.forEach((pixel) => {
            let minDistToPoint = Number.MAX_VALUE;
            centroids.forEach(centroid => {
                const dist = ImageManager.colorDifference(pixel, centroid);
                if (dist < minDistToPoint) {
                    minDistToPoint = dist;
                }
            });
            if (minDistToPoint > maxDist) {
                maxDist = minDistToPoint;
                farthestPixelIdColor = (pixel|0) >>> 0;
            }
        });
        return farthestPixelIdColor;
    }
    static reassignCentroids(pixels, count, centroids, colors) {

        for(var i = 0; i < count.length; i++) {
            if(count[i] === 0) {
                centroids[i] = colors[i] || pixels[Math.floor(Math.random() * pixels.length)];;
            }
        }
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
        const count = new Uint32Array(colors.length);

        for(var i = 0; i < pixels.length; i++){
            count[pixels[i]]++;
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
        let clustersDistortion = new Uint32Array(centroids.length);

        for (let i = 0; i < imageDataUint32.length; i++) {

            // Calculate the distance between the data point and its assigned centroid
            let distanceInt = ImageManager.colorDifference(imageDataUint32[i], originalImageDataUint32[i]) | 0;
                distanceInt = imul(distanceInt, distanceInt);

            totalDistortion += distanceInt;
            clustersDistortion[clusterAssignments[i]] += distanceInt;
        }

        return {totalDistortion, clustersDistortion: clustersDistortion.sort(function (a, b){ return b - a; })};
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
        const dataQuantize = ImageManager.quantizeImageData(this.contextSource, 192);
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
        const horizontalHistogram = {};
        const verticalHistogram = {};

        // Horizontal scan
        for (let y = 0; y < height; y++) {
            let consecutiveCount = 1;
            for (let x = 1; x < width; x++) {
                const currentIndex = y * width + x;
                const previousIndex = currentIndex - 1;

                if (pixels[currentIndex] === pixels[previousIndex]) {
                    consecutiveCount++;
                } else {
                    if (consecutiveCount > 1) {
                        horizontalHistogram[consecutiveCount] = (horizontalHistogram[consecutiveCount] || 0) + 1;
                    }
                    consecutiveCount = 1;
                }
            }
            // Check at the end of the row
            if (consecutiveCount > 1) {
                horizontalHistogram[consecutiveCount] = (horizontalHistogram[consecutiveCount] || 0) + 1;
            }
        }

        // Vertical scan
        for (let x = 0; x < width; x++) {
            let consecutiveCount = 1;
            for (let y = 1; y < height; y++) {
                const currentIndex = y * width + x;
                const previousIndex = currentIndex - width;

                if (pixels[currentIndex] === pixels[previousIndex]) {
                    consecutiveCount++;
                } else {
                    if (consecutiveCount > 1) {
                        verticalHistogram[consecutiveCount] = (verticalHistogram[consecutiveCount] || 0) + 1;
                    }
                    consecutiveCount = 1;
                }
            }
            // Check at the end of the column
            if (consecutiveCount > 1) {
                verticalHistogram[consecutiveCount] = (verticalHistogram[consecutiveCount] || 0) + 1;
            }
        }

        // Analyze histograms to find potential tile sizes
        function analyzeHistogram(histogram) {

            const entries = Object.entries(histogram).map(([length, count]) => ({ length: parseInt(length), count }));
            entries.sort((a, b) => (b.length * b.count) - (a.length * a.count));

            // We assume the most common length of consecutive pixels might indicate the tile size
            if (entries.length > 0) {
                let m = 0;
                let n = 0;
                let tileSize = entries[n++].length;
                while(tileSize >= 3 && tileSize <= 12){
                    var tile1 = entries[n];

                    var tile2a = entries[n*2-1] | 0;
                    var tile2b = entries[n*2] | 0;
                    var tile2c = entries[n*2+1] | 0;

                    var tile3a = entries[n*4-1] | 0;
                    var tile3b = entries[n*4] | 0;
                    var tile3c = entries[n*4+1] | 0;

                    var max1 = tile1.count;
                    var max2 = Math.max(tile2a.count, tile2b.count, tile2c.count);
                    var max3 = Math.max(tile3a.count, tile3b.count, tile3c.count);
                    var max = max1 + max2 + max3;

                    if(m < max) {
                        m = max;
                        tileSize = tile1.length;
                        tileSize += (n*2 + [tile2a.count, tile2b.count, tile2c.count].indexOf(max2)-1) / 2;
                        tileSize += (n*4 + [tile3a.count, tile3b.count, tile3c.count].indexOf(max3)-1) / 4;
                        tileSize /= 3.0;
                    }

                    n++;
                }
                const totalCount = entries.reduce((acc, entry) => acc + entry.count, 0);
                const certainty = entries[n-1].count / totalCount; // Simple certainty calculation
                return { tileSize, certainty };
            }

            return { tileSize: 0, certainty: 0.0 };
        }

        const horizontalAnalysis = analyzeHistogram(horizontalHistogram);
        const verticalAnalysis = analyzeHistogram(verticalHistogram);

        // Combine horizontal and vertical analysis to determine final tile size and certainty
        const tileSize = Math.round((horizontalAnalysis.tileSize + verticalAnalysis.tileSize) / 2);
        const certainty = (horizontalAnalysis.certainty + verticalAnalysis.certainty) / 2;

        return { tileSize, certainty };
    }
}