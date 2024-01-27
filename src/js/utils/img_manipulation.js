import JSLoader from "./JSLoader";
import {scaler} from "./test/doppel";
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const AFunction = Object.getPrototypeOf( function(){}).constructor;

const file_to_imagedata_resized = (file, resize_original_to, callback_function = () => {}, pool = null) => {

    var t1 = Date.now();
    const is_type_png = Boolean(file.type === "image/png");
    const is_type_jpeg = Boolean(file.type === "image/jpg" || file.type === "image/jpeg");
    const is_type_webp = Boolean(file.type === "image/webp");

    imagedfailedcallback();

    function imagedfailedcallback(){
        file_to_base64(file, function (b64a){
            base64_to_bitmap(b64a, function (imgbmp){
                bitmap_to_imagedata(imgbmp, resize_original_to, function (imagedata2){
                    callback_function(imagedata2);
                }, pool)
            }, pool);
        }, pool);
    }
};

window.file_to_base64_process_function = new AFunction(`var t = function(file) {
    "use strict";
    
    try {
        
        return new Promise(function(resolve, _) {
            resolve(new FileReaderSync().readAsDataURL(file));
        });
        
    } catch(error) {
    
        return new Promise(function(resolve, _) {
            var reader = new FileReader();
            reader.onload = function(){ resolve(reader.result)};
            reader.readAsDataURL(file);
        });
    }
    
}; return t;`)();

const file_to_base64 = (file, callback_function = () => {}, pool = null) => {

    if(pool !== null) {

        pool.exec(window.file_to_base64_process_function, [
            file
        ]).catch((e) => {

            return window.file_to_base64_process_function(file);
        }).timeout(5 * 1000).then((r) => {

            callback_function(r);
        });

    }else {

        window.file_to_base64_process_function(file).then((r) => {

            callback_function(r);
        });
    }
};
window.base64_sanitize_process_function = new AFunction(`var t = function (base64, scale, resizer) {
   
    resizer = resizer || "pixelize";
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

var scaler = new ImageProcessor({strength: 1.314});


    function imgToImgD(imgo, width, height, resizer) {
        
        let ctx;
        if(resizer === "pixelize" || resizer === "normal") {
            let canvas, canvas2;
            try {
                canvas = new OffscreenCanvas(imgo.width, imgo.height);
                canvas2 = new OffscreenCanvas(width, height);
            }catch(e) {
                canvas = document.createElement("canvas");
                canvas2 = document.createElement("canvas");
                canvas.width = imgo.width;
                canvas.height = imgo.height;
                canvas2.width = width;
                canvas2.height = height;
            }
            let context = canvas.getContext("2d");
            let context2 = canvas2.getContext("2d");
                context.imageSmoothingEnabled = Boolean(resizer === "normal");
                context2.imageSmoothingEnabled = Boolean(resizer === "normal");
            context.drawImage(imgo, 0, 0, imgo.width, imgo.height);
            context2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas2.width, canvas2.height);
            ctx = context2;
            
        }else if(resizer === "doppel") {
            ctx = scaler.processImage(imgo, width, height);
        }
        return ctx;
    }

    return new Promise(function(resolve, reject) {
        var img = new Image();
        var is_png = base64.startsWith("data:image/png;");
        img.onload = function() {
    
           var canvas;
           try {
           
                let width = (img.naturalWidth || img.width) * scale;
                let height = (img.naturalHeight || img.height) * scale;
                let imgd = imgToImgD(img, width, height, resizer).getImageData(0, 0, width, height);
                
                createImageBitmap(imgd).then(function(bmp){
                
                    var canvas;
                        canvas = new OffscreenCanvas(bmp.width, bmp.height);
                    var ctx = canvas.getContext("bitmaprenderer");
                        ctx.imageSmoothingEnabled = false;
                        ctx.transferFromImageBitmap(bmp);
                    
                    canvas.convertToBlob({type: is_png ? "image/png": "image/jpeg"}).then(function(blb) {
                        
                        try {
                            resolve(new FileReaderSync().readAsDataURL(blb));
                        } catch(e2) {
                            var reader = new FileReader();
                            reader.onload = function(){ resolve(reader.result)};
                            reader.readAsDataURL(blb);
                        }
                    });
                });
                
            } catch(e){
                let width = (img.naturalWidth || img.width) * scale;
                let height = (img.naturalHeight || img.height) * scale;
                let canvas = imgToImgD(img, width, height, resizer).canvas;
                resolve(canvas.toDataURL(is_png ? "image/png": "image/jpeg")); 
            }
        };
        img.onerror = function() { reject(); };
        img.src = base64;
    });
}; return t;`)();

const base64_sanitize = (base64, callback_function = () => {}, pool = null, scale = 1, resizer) => {

    if(pool !== null) {

        pool.exec(window.base64_sanitize_process_function, [
            base64, scale, resizer
        ]).catch((e) => {

            window.base64_sanitize_process_function(base64, scale, resizer).then((r) => {
                callback_function(r);
            });
        }).timeout(15 * 1000).then((r) => {

            callback_function(r);
        });

    }else {

        window.base64_sanitize_process_function(base64, scale, resizer).then((r) => {

            callback_function(r);
        });
    }
};

window.base64_to_bitmap_process_function = new AsyncFunction(`var t = async function(base64) {

    "use strict";

    return fetch(base64).then(function(res) {

        return res.blob().then(function(blb){

            return createImageBitmap(blb);
        });
    });

}; return t;`)();

const base64_to_bitmap = (base64, callback_function = () => {}, pool = null) => {

        if(pool !== null) {

            pool.exec(window.base64_to_bitmap_process_function, [
                base64
            ]).catch((e) => {

                return window.base64_to_bitmap_process_function(base64);
            }).timeout(5 * 1000).then((r) => {

                callback_function(r);
            });

        }else {

            window.base64_to_bitmap_process_function(base64).then((r) => {

                callback_function(r);
            });
        }

};

const file_to_bitmap = (file_or_blob, callback_function) => {

    createImageBitmap(file_or_blob).then(callback_function);
}

const bitmap_to_imagedata = (bitmap, resize_to =  1920*1080, callback_function = () => {}) => {

    let scale = 1;
    while (Math.round(bitmap.width * scale) * Math.round(bitmap.height * scale) > resize_to) { scale -= 0.01; }

        try {

            createImageBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, {
                resizeWidth: Math.round(bitmap.width * scale),
                resizeHeight: Math.round(bitmap.height * scale),
                resizeQuality: "pixelated"
            }).then(function (bitmap_resized){

                let canvas;
                try {

                    canvas = new OffscreenCanvas(bitmap_resized.width, bitmap_resized.height);
                } catch (e) {

                    canvas = document.createElement("canvas");
                    canvas.width = bitmap_resized.width;
                    canvas.height = bitmap_resized.height;
                }

                let ctx = canvas.getContext("2d");
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(bitmap_resized, 0, 0, bitmap_resized.width, bitmap_resized.height);
                callback_function(ctx.getImageData(0, 0, bitmap_resized.width, bitmap_resized.height));  // "getImageData" isn't available in web worker

            });

        } catch(err) {

            let canvas;
            try {

                canvas = new OffscreenCanvas(Math.round(bitmap.width * scale), Math.round(bitmap.height * scale));
            } catch (e) {

                canvas = document.createElement("canvas");
                canvas.width = Math.round(bitmap.width * scale);
                canvas.height = Math.round(bitmap.height * scale);
            }

            let ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

            callback_function(ctx.getImageData(0, 0, canvas.width, canvas.height));  // "getImageData" isn't available in web worker
        }
};

const imagedata_to_bitmap = (imgd, resize_to =  1920*1080, callback_function = () => {}) => {

        let scale = 1;
        while (Math.round(imgd.width * scale) * Math.round(imgd.height * scale) > resize_to) { scale -= 0.01; }


        try {

            createImageBitmap(imgd, 0, 0, imgd.width, imgd.height, {
                resizeWidth: Math.round(imgd.width * scale),
                resizeHeight: Math.round(imgd.height * scale),
                resizeQuality: "pixelated"
            }).then(function (bitmap_resized){

                callback_function(bitmap_resized);  // "getImageData" isn't available in web worker
            });

        } catch(err) {

            callback_function(null)
        }
};

window.imagedata_to_base64_process_function = new AFunction(`var t = function(imagedata, type) {

    "use strict"
    type = type || "image/png";
    var quality = type.includes("webp") ? 1: type.includes("png") ? undefined: 0.7;
    try {
    
        return new Promise(function(resolve, _) {

            createImageBitmap(imagedata, {
                premultiplyAlpha: 'premultiply',
                resizeQuality: 'pixelated'
            }).then((bmp) => {
            
                var canvas;
                    canvas = new OffscreenCanvas(imagedata.width, imagedata.height);
                var ctx = canvas.getContext("bitmaprenderer");
                    ctx.imageSmoothingEnabled = false;
                    ctx.transferFromImageBitmap(bmp);
                
                canvas.convertToBlob({type: type, quality: quality}).then((blb) => {
                    try {
                        resolve(new FileReaderSync().readAsDataURL(blb));
                    } catch(e2) {
                        var reader = new FileReader();
                        reader.onload = function(){ resolve(reader.result)};
                        reader.readAsDataURL(blb);
                    }
                });
            });
        });
       
    }catch (e) {
    
        return new Promise(function(resolve, _) {
            var canvas = document.createElement("canvas");
            canvas.width = imagedata.width;
            canvas.height = imagedata.height;
            var ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            ctx.putImageData(imagedata, 0, 0);
            
            var base64 = canvas.toDataURL(type, quality);
            canvas = null;
            resolve(base64);
        });
    }

}; return t;`)();

const imagedata_to_base64 = (imagedata, type= "image/png", callback_function = () => {}, pool = null) => {

        if(pool !== null) {

            pool.exec(window.imagedata_to_base64_process_function, [
                imagedata, type
            ]).catch((e) => {

                return window.imagedata_to_base64_process_function(imagedata, type);
            }).timeout(5 * 1000).then((r) => {

                callback_function(r);
            });

        }else {

            window.imagedata_to_base64_process_function(imagedata, type).then((r) => {

                callback_function(r);
            });
        }

};

module.exports = { file_to_imagedata_resized, file_to_base64, base64_to_bitmap, bitmap_to_imagedata, imagedata_to_base64, base64_sanitize, file_to_bitmap }