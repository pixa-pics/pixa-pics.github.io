import JSLoader from "./JSLoader";
import {scaler} from "./test/doppel";
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const AFunction = Object.getPrototypeOf( function(){}).constructor;

const file_to_imagedata_resized = (file, resize_original_to, callback_function = () => {}, pool = null) => {

    var t1 = Date.now();
    const is_type_png = Boolean(file.type === "image/png");
    const is_type_jpeg = Boolean(file.type === "image/jpg" || file.type === "image/jpeg");
    const is_type_webp = Boolean(file.type === "image/webp");

    if(is_type_png) {

        var promise_arraybuffer = file.arrayBuffer();
        var promise_decoder = Promise.resolve();

        if(is_type_png){
            promise_decoder = JSLoader( () => import("./jsquash/decode/png"));
        }else if(is_type_jpeg){
            //promise_decoder = JSLoader( () => import("./jsquash/decode/jpeg"));
        }else if(is_type_webp){
            //promise_decoder = JSLoader( () => import("./jsquash/decode/webp"));
        }

        Promise.allSettled([
            promise_arraybuffer,
            promise_decoder
        ]).then(function (results){
            try {
                var arraybuffer = results[0].value;
                var global = results[1].value;
                    global.default().then(function (funcs){
                        imagedcallback(global.decode(new Uint8Array(arraybuffer)));
                    });

            } catch (e) {
                imagedfailedcallback();
            }
        }).catch(imagedfailedcallback);

    }else {
        imagedfailedcallback();
    }

    function imagedcallback(imgd){
        let scale = 1;
        //var info = sizer.default(imgd, file.type.split("/")[1])
        while (Math.round(imgd.width * scale) * Math.round(imgd.height * scale) > resize_original_to) { scale -= 0.01; }
        let width = Math.round(imgd.width * scale);
        let height = Math.round(imgd.height * scale);
        let imgd2 = scaler.processImage(imgd, width, height).getImageData(0, 0, width, height);
        callback_function(imgd2);

        /*init().then(function (funcs){
            var imgd2 = resize(new Uint8Array(imgd), { height: Math.round(imgd.width * scale), width: Math.round(imgd.height * scale) });
            arrayBufferToImageData(imgd2).then(callback_function);
        });
         */
    }

    function arrayBufferToImageData(arrayBuffer) {
        return new Promise((resolve, reject) => {
            // Convert ArrayBuffer to Blob
            const blob = new Blob([arrayBuffer], {type: file.type});

            // Create an image element
            const img = new Image();

            // Resolve ImageData once the image is loaded
            img.onload = () => {
                // Create a canvas
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                // Get canvas context
                const ctx = canvas.getContext('2d');

                // Draw the image onto the canvas
                ctx.drawImage(img, 0, 0);

                // Get the ImageData
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                resolve(imageData);
                URL.revokeObjectURL(img.src);
            };

            // Reject on error
            img.onerror = reject;

            // Set the source of the image element
            img.src = URL.createObjectURL(blob);
        });
    }


    function imagedfailedcallback(){
        file_to_base64(file, function (b64a){
            base64_sanitize(b64a, function (b64b){
                base64_to_bitmap(b64b, function (imgbmp){
                    bitmap_to_imagedata(imgbmp, resize_original_to, function (imagedata2){
                        callback_function(imagedata2);
                    }, pool)
                }, pool);
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
window.base64_sanitize_process_function = new AFunction(`var t = function(base64, scale) {
    "use strict";
    
    class ImageProcessor {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.targetCanvas = document.createElement('canvas');
     }
    setCanvas(image, width, height){

        if(image instanceof ImageData){
            this.canvas.width = image.width;
            this.canvas.height = image.height;
            this.context = this.canvas.getContext('2d', {willReadFrequently: true, preserveDrawingBuffer: true, powerPreference: "high-performance", alpha: true, desynchronized: true});
            this.context.putImageData(image, 0, 0);
        }else {
            this.canvas.width = image.width;
            this.canvas.height = image.height;
            this.context = this.canvas.getContext('2d', {willReadFrequently: true, preserveDrawingBuffer: true, powerPreference: "high-performance", alpha: true, desynchronized: true});
            this.context.drawImage(image, 0, 0);
        }

        this.targetCanvas.width = width;
        this.targetCanvas.height = height;
        this.targetContext = this.targetCanvas.getContext('2d', {willReadFrequently: true, preserveDrawingBuffer: true, powerPreference: "high-performance", alpha: true, desynchronized: true});
        this.finalWidth = width;
        this.finalHeight = height;
        this.tileWidth = Math.fround(this.canvas.width / width);
        this.tileHeight = Math.fround(this.canvas.height / height);

        //this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this.targetImageData = this.targetContext.getImageData(0, 0, this.targetCanvas.width, this.targetCanvas.height);
        this.tiles = new Array(this.finalHeight * this.finalHeight);
    }
    paintTargetImage(x, y, color) {
        const targetImageDataData = this.targetImageData.data;
        const index = (x + y * this.finalWidth)*4;
        targetImageDataData[index] = color.r;
        targetImageDataData[index+1] = color.g;
        targetImageDataData[index+2] = color.b;
        targetImageDataData[index+3] = color.a;
    }
    reconstructImage() {
        for (let y = 0; y < this.finalHeight; y++) {
            for (let x = 0; x < this.finalWidth; x++) {
                const tile = this.tiles[x+y*this.finalWidth];
                this.paintTargetImage(x, y, tile.meanColor)
            }
        }
        this.targetContext.putImageData(this.targetImageData, 0, 0)
        return this.targetContext;
    }

    createTiles() {
        for (let y = 0; y < this.finalHeight; y++) {
            for (let x = 0; x < this.finalWidth; x++) {
                const tileData = this.extractTileData(x, y);
                const tile = new Tile({x, y},  tileData);
                tile.calculateMeanColor();
                this.tiles[x+y*this.finalWidth] = tile;
            }
        }
    }

    extractTileData(x, y) {
        return this.context.getImageData(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
    }

    mergeSimilarTiles(threshold = 256) {
        for (let y = 0; y < this.finalHeight; y++) {
            for (let x = 0; x < this.finalWidth; x++) {
                const tileIndex = x + y * this.finalWidth;
                const tile = this.tiles[tileIndex];
                const neighbors = this.getNeighbors(x, y);

                neighbors.forEach(neighbor => {
                    const neighborIndex = neighbor.position.x + neighbor.position.y * this.finalWidth;
                    const colorDifference = this.colorDifference(tile.meanColor, neighbor.meanColor);

                    if (colorDifference < threshold) {
                        this.tiles[neighborIndex].meanColor = this.tiles[tileIndex].meanColor;
                    }
                });
            }
        }
    }

    despeckle(threshold = 384) {
        for (let y = 0; y < this.finalHeight; y++) {
            for (let x = 0; x < this.finalWidth; x++) {
                const tileIndex = x + y * this.finalWidth;
                const tile = this.tiles[tileIndex];
                const neighbors = this.getNeighbors(x, y);

                const averageNeighborColor = this.averageColor(neighbors);
                const colorDifference = this.colorDifference(tile.meanColor, averageNeighborColor);

                if (colorDifference > threshold) {
                    this.tiles[tileIndex].meanColor = averageNeighborColor;
                }
            }
        }
    }

    getNeighbors(x, y) {
        const neighbors = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue; // Skip the tile itself

                const nx = x + dx;
                const ny = y + dy;

                if (nx >= 0 && nx < this.finalWidth && ny >= 0 && ny < this.height) {
                    neighbors.push(this.tiles[nx + ny * this.finalWidth]);
                }
            }
        }
        return neighbors;
    }

    averageColor(tiles) {
        const sumColor = { r: 0, g: 0, b: 0, a: 0 };
        tiles.forEach(tile => {
            sumColor.r += tile.meanColor.r;
            sumColor.g += tile.meanColor.g;
            sumColor.b += tile.meanColor.b;
            sumColor.a += tile.meanColor.a;
        });

        const numTiles = tiles.length;
        return {
            r: sumColor.r / numTiles,
            g: sumColor.g / numTiles,
            b: sumColor.b / numTiles,
            a: sumColor.a / numTiles
        };
    }

    colorDifference(color1, color2) {
        return Math.sqrt(
            Math.pow(color1.r - color2.r, 2) +
            Math.pow(color1.g - color2.g, 2) +
            Math.pow(color1.b - color2.b, 2) +
            Math.pow(color1.a - color2.a, 2)
        );
    }

    processImage(image, width, height) {
        this.setCanvas(image, width, height);
        this.createTiles();
        this.mergeSimilarTiles();
        this.despeckle();
        return this.reconstructImage();
    }
}

class KMeans {
    constructor(data, k) {
        this.data = data;
        this.k = k;
        this.centroids = [];
        this.clusters = new Array(this.data.length);
    }

    // Step 1: Initialize centroids
    initializeCentroids() {
        // Simple random initialization. For KMeans++, the initialization is more complex.
        for (let i = 0; i < this.k; i++) {
            const idx = Math.floor(Math.random() * this.data.length);
            this.centroids.push(this.data[idx]);
        }
    }

    // Step 2: Assign points to the nearest centroid
    assignClusters() {
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
        return Math.sqrt(point1.reduce((sum, val, idx) => sum + Math.pow(val - point2[idx], 2), 0));
    }

    // Calculate the mean point of a cluster
    meanPoint(points) {
        const numPoints = points.length;
        const dimensions = points[0].length;
        let mean = new Array(dimensions).fill(0);

        points.forEach(point => {
            point.forEach((val, idx) => {
                mean[idx] += val;
            });
        });

        return mean.map(val => val / numPoints);
    }

    // Run the KMeans algorithm
    run(maxIterations = 100) {
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

class Tile {
    constructor(position, imageData) {
        this.position = position;
        this.imageData = imageData;
        this.meanColor = {r: 0, g: 0, b: 0, a: 0};
    }


    extractColorData() {
        let colors = [];
        for (let i = 0; i < this.imageData.data.length; i += 4) {
            colors.push([
                this.imageData.data[i],     // Red
                this.imageData.data[i + 1], // Green
                this.imageData.data[i + 2], // Blue
                this.imageData.data[i + 3]  // Alpha
            ]);
        }
        return colors;
    }
    quantizeColors(k = 8) {
        const colors = this.extractColorData();
        const kmeans = new KMeans(colors, k);
        return kmeans.run(8);
    }

    getQuantizedColors(quantizedResult) {

        const map = new Array(quantizedResult.centroids.length).fill(0);
        quantizedResult.clusters.forEach((cluster, index) => {
            map[cluster]++;
            /*
            this.imageData.data[index * 4] = color[0];
            this.imageData.data[index * 4 + 1] = color[1];
            this.imageData.data[index * 4 + 2] = color[2];
            this.imageData.data[index * 4 + 3] = color[3];
        */
        });
        let dominantClusterPopulation = 0, dominantClusterId = 0;
        map.forEach((population, clusterId) => {
            if(dominantClusterPopulation < population){
                dominantClusterPopulation = population;
                dominantClusterId = clusterId;
            }
        });

        return quantizedResult.centroids[dominantClusterId];
    }

    calculateMeanColor() {
        const color = this.getQuantizedColors(this.quantizeColors(8));

        this.meanColor.r = color[0]|0;
        this.meanColor.g = color[1]|0;
        this.meanColor.b = color[2]|0;
        this.meanColor.a = color[3]|0;
    }
}

const scaler = new ImageProcessor();

    
    return new Promise(function(resolve, reject) {
        var img = new Image();
        var is_png = base64.startsWith("data:image/png;");
        img.onload = function() {
    
           var canvas;
           try {
           
                let width = (img.naturalWidth || img.width) * scale;
                let height = (img.naturalHeight || img.height) * scale;
                let imgd = scaler.processImage(img, width, height).getImageData(0, 0, width, height);
                
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
                let canvas = scaler.processImage(img, width, height).canvas;
                resolve(canvas.toDataURL(is_png ? "image/png": "image/jpeg")); 
            }
        };
        img.onerror = function() { reject(); };
        img.src = base64;
    });
}; return t;`)();

const base64_sanitize = (base64, callback_function = () => {}, pool = null, scale = 1) => {

    if(pool !== null) {

        pool.exec(window.base64_sanitize_process_function, [
            base64, scale
        ]).catch((e) => {

            window.base64_sanitize_process_function(base64, scale).then((r) => {
                callback_function(r);
            });
        }).timeout(15 * 1000).then((r) => {

            callback_function(r);
        });

    }else {

        window.base64_sanitize_process_function(base64, scale).then((r) => {

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