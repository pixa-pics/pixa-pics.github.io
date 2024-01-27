/* MIT Licence 2024 Matias Affolter */
"use strict";
class ImageProcessor {
    constructor(options) {
        options = options || {};
        this.canvas = document.createElement('canvas');
        this.targetCanvas = document.createElement('canvas');
        this.options = {
            despeckleStrength: options.despeckleStrength || options.strength || 1.0,
            quantizeStrength: options.quantizeStrength || options.strength  || 1.0,
            mergeStrength: options.mergeStrength || options.strength  || 1.0,
            overlapFactor: options.overlapFactor || options.strength  || 1.0
        };
     }

     get sizes(){
         "use strict";
         return {
             finalWidth: this.finalWidth,
             finalHeight: this.finalHeight,
             tileWidth: this.tileWidth,
             tileHeight: this.tileHeight,
             overlapFactor: this.options.overlapFactor
         };
     }

    updateTilesManager() {
        "use strict";
         this.tilesManager = new TileManager(this.context, this.targetContext, this.targetImageData, this.sizes);
     }
    updateFilters(threshold) {
        "use strict";
         this.filters = new Filters(this.options, this.tilesManager, threshold, this.finalWidth, this.finalHeight);
     }
     initializeTiles() {
         "use strict";
         this.tilesManager.createTiles();
         this.tilesManager.computeTiles();
     }
     paintTiles() {
         "use strict";
        this.tilesManager.paintTiles();
     }
     filterTiles() {
         "use strict";
        this.filters.applyFilters()
     }

    setCanvas(width, height, image){
        "use strict";
        width = (width|0) || 1;
        height = (height|0) || 1;
        image = image || {width: 0, height: 0};

        const resultPrimaryCanvas = ImageUtils.initializeCanvas(image);
        this.canvas = resultPrimaryCanvas.canvas;
        this.context = resultPrimaryCanvas.context;

        const resultSecondaryCanvas = ImageUtils.initializeCanvas(null, width, height);
        this.targetCanvas = resultSecondaryCanvas.canvas;
        this.targetContext = resultSecondaryCanvas.context;

        this.targetImageData = new ImageData(width, height);

        this.finalWidth = width;
        this.finalHeight = height;
        this.tileWidth = Math.fround(this.canvas.width / this.targetCanvas.width);
        this.tileHeight = Math.fround(this.canvas.height / this.targetCanvas.height);
    }

    updateThreshold() {
        "use strict";
        const tiles = this.tilesManager.getTiles();
        let colorDifferences = [];
        for (let y = 0; y < this.finalHeight; y++) {
            for (let x = 0; x < this.finalWidth; x++) {
                const tile = tiles[x + y * this.finalWidth];
                const neighbors = this.tilesManager.getNeighbors(x, y);
                neighbors.forEach(neighbor => {
                    colorDifferences.push(ColorAnalysis.colorDifference(tile.meanColor, neighbor.meanColor));
                });
            }
        }
        const mean = colorDifferences.reduce((a, b) => a + b, 0) / colorDifferences.length;
        const stdDev = Math.sqrt(colorDifferences.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / colorDifferences.length);
        return (mean + stdDev) / 10; // Example of dynamic threshold
    }

    processImage(image, width, height) {
        "use strict";
        const t1 = Date.now();
        this.setCanvas(width, height, image);
        const t2 = Date.now();
        this.updateTilesManager();
        const t3 = Date.now();
        this.initializeTiles();
        const t4 = Date.now();
        this.updateFilters(this.updateThreshold());
        const t5 = Date.now();
        this.filterTiles();
        const t6 = Date.now();
        this.paintTiles();
        const t7 = Date.now();
        console.log({
            "setCanvas": t2-t1,
            "updateTilesManager": t3-t2,
            "initializeTiles": t4-t3,
            "updateFilters+updateThreshold": t5-t4,
            "filterTiles": t6-t5,
            "paintTiles": t7-t5,
        })
        return this.targetContext;
    }
}

/* Image Utils Module */
class ImageUtils {
    static initializeCanvas(image, width, height) {
        "use strict";
        image = image || {width: 0, height: 0}
        width = image.width || width || 1;
        height = image.height || height || 1;
        let canvas, context;
        try {
            canvas = new OffscreenCanvas(width, height);
            context = canvas.getContext('2d', { willReadFrequently: true, desynchronized: true});
        }catch (e) {
            canvas = document.createElement("canvas")
            canvas.width = width;
            canvas.height = height;
            context = canvas.getContext('2d', { willReadFrequently: true});
        }

        if (image instanceof ImageData) {
            context.putImageData(image, 0, 0);
        } else if(image.width) {
            context.drawImage(image, 0, 0, width, height);
        }

        return { canvas, context };
    }

    static canvasContextToImageData(context) {
        "use strict";
        return context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    }
}

/* Filters Module */
class Filters {
    constructor(options, tilesManager, threshold, width, height) {
        this.mergeFilter = new MergeFilter(threshold * options.mergeStrength, tilesManager, width, height);
        this.despeckleFilter = new DespeckleFilter(threshold * options.despeckleStrength, tilesManager, width, height);
        this.quantizeFilter = new QuantizeFilter(threshold * options.quantizeStrength, tilesManager, width, height);
    }

    applyFilters() {
        "use strict";
        this.mergeFilter.apply();
        this.despeckleFilter.apply();
        this.quantizeFilter.apply();
    }
}

class Filter{
    constructor(strength, tilesManager, width, height) {
        this.strength = strength;
        this.tilesManager = tilesManager;
        this.tiles = tilesManager.getTiles();
        this.width = width;
        this.height = height;
    }
}

/* Individual filters */
class DespeckleFilter extends Filter{
    constructor(strength, tilesManager, width, height) {
        super(strength, tilesManager, width, height)
    }

    apply() {
        "use strict";
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.adaptiveDespeckleTile(x, y, this.strength);
            }
        }
    }

    adaptiveDespeckleTile(x, y, baseThreshold) {
        "use strict";
        const tile = this.tiles[x + y * this.width];
        const neighbors = this.tilesManager.getExtendedNeighbors(x, y, 3); // Larger neighborhood

        // Calculate local contrast and adjust threshold
        const localContrast = this.calculateLocalContrast(tile, neighbors);
        const adjustedThreshold = baseThreshold * (1 + localContrast);

        // Basic edge detection by checking dominant areas
        const { primaryColor, secondaryColor, isEdge, isArea } = this.detectEdge(neighbors, adjustedThreshold);
        if (isArea) {
            this.maybeApplyDespeckling(tile, adjustedThreshold, primaryColor, primaryColor);
        } else if(isEdge) {
            this.maybeApplyDespeckling(tile, adjustedThreshold, primaryColor, secondaryColor);
        }
    }

    calculateLocalContrast(tile, neighbors) {
        "use strict";
        // Example: Simple contrast calculation based on color variance
        const meanColor = ColorAnalysis.averageColor(neighbors.concat([tile]).map(t => t.meanColor));
        const variance = neighbors.concat([tile]).reduce((variance, neighbor) => {
            return variance + Math.pow(ColorAnalysis.colorDifference(neighbor.meanColor, meanColor), 2);
        }, 0) / neighbors.length;
        return Math.sqrt(variance);
    }

    detectEdge(neighbors, threshold) {
        "use strict";
        const neighborGroup = TileManager.getTilesGroup(neighbors, threshold);
        const areaNumber = neighborGroup.length;
        const colorNumber = neighbors.length;

        const primaryGroupNumber = (neighborGroup[0] || []).length || 0;
        const secondaryGroupNumber = (neighborGroup[1] || []).length || 0;

        const primaryColor = ColorAnalysis.averageColor(neighborGroup[0].map(t => t.meanColor));
        const secondaryColor = (neighborGroup[1] || []).length ? ColorAnalysis.averageColor(neighborGroup[1].map(t => t.meanColor)): null;
        const isEdge = colorNumber * 0.777 <= primaryGroupNumber + secondaryGroupNumber;
        const isArea = colorNumber * 0.666 <= primaryGroupNumber;

        return { primaryColor, secondaryColor, isEdge, isArea };
    }

    maybeApplyDespeckling(tile, adjustedThreshold, primaryColor, secondaryColor) {
        "use strict";
        if(
            ColorAnalysis.colorDifference(tile.meanColor, primaryColor) > adjustedThreshold &&
            ColorAnalysis.colorDifference(tile.meanColor, secondaryColor) > adjustedThreshold
        ){
            tile.meanColor.setRGBA(primaryColor.rgba);
        }
    }
}

class QuantizeFilter extends Filter{
    constructor(strength, tilesManager, width, height) {
        super(strength, tilesManager, width, height)
    }

    apply() {
        "use strict";
        // Collect mean colors from all tiles
        const meanColors = this.tiles.map(tile => tile.meanColor.rgba);

        // Apply K-Means to find dominant colors
        // The number of centroids (k) can be adjusted based on the desired quantization strength
        const k = 255 / (this.strength*1.618) | 0; // Adjust 'k' based on strength or other criteria
        const kmeans = new KMeans(meanColors, k);
        const quantizationResult = kmeans.run(32);

        // Update each tile's mean color to the nearest centroid
        this.tiles.forEach((tile, index) => {
            const clusterIndex = quantizationResult.clusters[index];
            const nearestCentroid = quantizationResult.centroids[clusterIndex];
            tile.meanColor.setRGBA(nearestCentroid);
        });
    }
}

class MergeFilter extends Filter{
    constructor(strength, tilesManager, width, height) {
        super(strength, tilesManager, width, height)
    }

    apply() {
        "use strict";
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tileIndex = x + y * this.width;
                const tile = this.tiles[tileIndex];
                const neighbors = this.tilesManager.getNeighbors(x, y);
                const map = {};
                neighbors.forEach((neighbor, index) => {
                    const colorDifference = ColorAnalysis.colorDifference(tile.meanColor, neighbor.meanColor);
                    if (colorDifference < this.strength) {
                        map[index] = neighbor;
                    }
                });

                if(Object.keys(map).length >= 3){
                    Object.values(map).forEach(function (neighbor){
                        neighbor.meanColor.setRGBA(tile.meanColor.rgba);
                    });
                }
            }
        }
    }
}
/* Color Analysis Module */
class ColorAnalysis {
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

/* Tile Management Module */
class TileManager {
    constructor(contextSource, contextDestination, imageData, sizes) {
        this.contextSource = contextSource;
        this.contextDestination = contextDestination;
        this.imageData = imageData;
        this.overlapFactor = sizes.overlapFactor;
        this.finalWidth = sizes.finalWidth;
        this.finalHeight = sizes.finalHeight;
        this.tileWidth = sizes.tileWidth;
        this.tileHeight = sizes.tileHeight;
        this.tiles = new Array(this.finalWidth * this.finalHeight).fill(null);
        this.tilesColorUint32a = new Uint32Array(this.finalWidth * this.finalHeight);
        this.tilesColorUint8a = new Uint8ClampedArray(this.tilesColorUint32a.buffer);
        this.extendedTileWidth = this.tileWidth * this.overlapFactor | 0;
        this.extendedTileHeight = this.tileHeight * this.overlapFactor | 0;
        this.tilePaddingWidth = (this.extendedTileWidth - this.tileWidth) / 2 | 0;
        this.tilePaddingHeight = (this.extendedTileHeight - this.tileHeight) / 2 | 0;
    }
    static getTilesGroup(tiles, threshold) {
        "use strict";
        const group = [];
        tiles.forEach((tile) => {
            let foundGroup = false;
            group.forEach((group) => {
                if(ColorAnalysis.colorDifference(tile.meanColor, group[0].meanColor) < threshold){
                    group.push(tile);
                    foundGroup = true;
                }
            });
            if(!foundGroup){
                group.push([tile]);
            }
        });

        group.sort((g1, g2) => g2.length-g1.length);
        return group;
    }
    getTiles(){
        "use strict";
        return this.tiles;
    }
    extractTileData(x, y){
        "use strict";
        // Adjust x and y to keep tiles centered with the new size
        const newX = Math.imul(x, this.tileWidth) - this.tilePaddingWidth | 0;
        const newY = Math.imul(y, this.tileHeight) - this.tilePaddingHeight | 0;
        return this.contextSource.getImageData(newX|0, newY|0, this.extendedTileWidth|0, this.extendedTileHeight|0);
    }
    createTiles() {
        "use strict";
        for (let y = 0; y < this.finalHeight; y++) {
            for (let x = 0; x < this.finalWidth; x++) {
                const tileId = x+y*this.finalWidth;
                const tileIndexColor = tileId * 4;
                this.tiles[tileId] =  new Tile(this.extractTileData(x, y), this.tilesColorUint8a.subarray(tileIndexColor, tileIndexColor+4));
            }
        }
    }
    computeTiles() {
        "use strict";
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].calculateMeanColor();
        }
    }
    getNeighbors(x, y) {
        "use strict";
        const neighbors = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {

                const nx = x + dx;
                const ny = y + dy;

                if (dx === 0 && dy === 0) continue;
                if (nx < 0 || ny < 0) continue;
                if (nx >= this.finalWidth || ny >= this.finalHeight) continue;

                if (nx >= 0 && nx < this.finalWidth && ny >= 0 && ny < this.finalHeight) {
                    neighbors.push(this.tiles[nx + ny * this.finalWidth]);
                }
            }
        }
        return neighbors;
    }
    getExtendedNeighbors(x, y, range) {
        "use strict";
        const neighbors = [];
        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                const nx = x + dx;
                const ny = y + dy;
                if (dx === 0 && dy === 0) continue;
                if (nx < 0 || ny < 0) continue;
                if (nx >= this.finalWidth || ny >= this.finalHeight) continue;

                neighbors.push(this.tiles[nx + ny * this.finalWidth]);
            }
        }
        return neighbors;
    }
    paintTiles() {
        "use strict";
        this.imageData.data.set(this.tilesColorUint8a);
        this.contextDestination.putImageData(this.imageData, 0, 0);
    }
}

class KMeans {
    constructor(data, k) {
        this.data = data;
        this.dataConstructor = Object.getPrototypeOf(data[0]).constructor;
        this.mean = new Uint32Array(data[0].length);
        this.k = k;
        this.centroids = new Array(k);
        this.clusters = new Array(this.data.length);
    }

    // Step 1: Initialize centroids
    initializeCentroids() {
        "use strict";
        // Simple random initialization. For KMeans++, the initialization is more complex.
        for (let i = 0; i < this.k; i++) {
            const idx = Math.floor(Math.random() * this.data.length);
            this.centroids[i] = this.dataConstructor.from(this.data[idx]);
        }
    }

    // Step 2: Assign points to the nearest centroid
    assignClusters() {
        "use strict";
        this.data.forEach((point, idx) => {
            let minDist = Number.MAX_VALUE;
            let cluster = -1;

            this.centroids.forEach((centroid, centroidIdx) => {
                const dist = this.euclideanDistance(point, centroid);
                if (dist < minDist) {
                    minDist = dist;
                    cluster = centroidIdx;
                }
            });

            this.clusters[idx] = cluster;
        });
    }

    // Step 3: Update centroids
    updateCentroids() {
        "use strict";
        let newCentroids = new Array(this.k).fill(null).map(() => []);
        this.data.forEach((point, idx) => {
            const clusterIdx = this.clusters[idx];
            newCentroids[clusterIdx].push(point);
        });

        this.centroids = newCentroids.map(cluster => {
            if (cluster.length === 0) return null; // Handle empty cluster
            return this.meanPoint(cluster);
        }).filter(centroid => centroid !== null);
    }

    // Euclidean distance between two points
    euclideanDistance(point1, point2) {
        "use strict";
        return Math.sqrt(point1.reduce((sum, val, idx) => sum + Math.pow(val - point2[idx], 2), 0));
    }

    // Calculate the mean point of a cluster
    meanPoint(points) {
        "use strict";
        const numPoints = points.length;
        const dimensions = points[0].length;
        this.mean.fill(0);

        for(var p = 0; p < numPoints; p++){
            for(var i = 0; i < dimensions; i++) {
                this.mean[i] += points[p][i];
            }
        }

        const mean = new this.dataConstructor(dimensions);
        for(var i = 0; i < dimensions; i++) {
            mean[i] = this.mean[i] / numPoints | 0;
        }

        return mean;
    }

    // Run the KMeans algorithm
    run(maxIterations) {
        "use strict";
        maxIterations = maxIterations || 16;
        this.initializeCentroids();
        let iterations = 0;
        let hasConverged = false;

        while (!hasConverged && iterations < maxIterations) {
            const oldCentroids = [...this.centroids];
            this.assignClusters();
            this.updateCentroids();
            iterations++;

            hasConverged = this.centroids.every((centroid, idx) => {
                return this.euclideanDistance(centroid, oldCentroids[idx]) < 1e-5;
            });
        }

        return { centroids: this.centroids, clusters: this.clusters };
    }
}

class Pixel {
    constructor(rgba) {
        this.rgba_ = rgba;
    }
    get r(){return this.rgba_[0];}
    get g(){return this.rgba_[1];}
    get b(){return this.rgba_[2];}
    get a(){return this.rgba_[3];}
    get rgba(){return this.rgba_.subarray(0, 4);}
    setRGBA(array){
        "use strict";
        this.rgba_[0] = array[0];
        this.rgba_[1] = array[1];
        this.rgba_[2] = array[2];
        this.rgba_[3] = array[3];
    }
}

class Tile {
    constructor(imageData, colorUint8a) {
        this.imageData = imageData;
        this.meanColor = new Pixel(colorUint8a);
        this.map = new Uint32Array(0)
    }
    extractColorData(data) {
        "use strict";
        let colors = [];
        for (let i = 0; i < data.length; i += 4) {
            colors.push(new Pixel(data.subarray(i, i+4)));
        }
        return colors;
    }
    quantizeColors(k) {
        "use strict";
        k = k || Math.ceil(Math.sqrt(this.imageData.data.length));
        const data = this.imageData.data;
        const colors = this.extractColorData(data);
        const colorsArray = colors.map(function (c){return c.rgba; });
        return new KMeans(colorsArray, 7).run(21);
    }

    getQuantizedColor(quantizedResult) {
        "use strict";
        if(quantizedResult.centroids.length !== this.map.length){
            this.map = new Uint32Array(quantizedResult.centroids.length)
        }else {
            this.map.fill(0);
        }
        quantizedResult.clusters.forEach((clusterId, index) => {
            this.map[clusterId] = (this.map[clusterId] + 1|0)>>>0;
        });
        let dominantClusterPopulation = 0, dominantClusterId = 0;
        this.map.forEach((population, clusterId) => {
            if(dominantClusterPopulation < population){
                dominantClusterPopulation = population;
                dominantClusterId = clusterId;
            }
        });
        return quantizedResult.centroids[dominantClusterId];
    }

    calculateMeanColor() {
        "use strict";
        const color = this.getQuantizedColor(this.quantizeColors());
        this.meanColor.setRGBA(color);
    }
}

var scaler = new ImageProcessor({strength: 1.5});

/*
var jpg = "data:image/jpeg;base64,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";
var sourceImage = document.createElement('img'); // Assume this is your source image
sourceImage.onload = () => {
    var canvas = scaler.processImage(sourceImage, 90, 90).canvas;
    var newCanvas = document.createElement("canvas");
        newCanvas.width = canvas.width * 10;
        newCanvas.height = canvas.height * 10;
    var newCanvasContext2D = newCanvas.getContext("2d");
        newCanvasContext2D.imageSmoothingEnabled = false;
        newCanvasContext2D.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newCanvas.width, newCanvas.height)
    console.log(newCanvas.toDataURL())
};
sourceImage.src = jpg;
*/
module.exports = {
    scaler: scaler,
    ImageProcessor: ImageProcessor
}