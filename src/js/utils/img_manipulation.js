import JSLoader from "./JSLoader";
import {scaler} from "./test/doppel";
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const AFunction = Object.getPrototypeOf( function(){}).constructor;

const file_to_imagedata_resized = (file, resize_original_to, callback_function = () => {}, pool = null, resizer="pixelize") => {

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

        let imgd2;
        if(resizer === "pixelize" || resizer === "normal") {
            let canvas = document.createElement("canvas");
            let canvas2 = document.createElement("canvas");
            canvas.width = imgd.width;
            canvas.height = imgd.height;
            canvas2.width = width;
            canvas2.height = height;
            let context = canvas.getContext("2d");
            let context2 = canvas2.getContext("2d");
                context.imageSmoothingEnabled = Boolean(resizer === "normal");
                context2.imageSmoothingEnabled = Boolean(resizer === "normal");
            context.putImageData(imgd, 0, 0);
            context2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas2.width, canvas2.height);
            imgd2 = context2.getImageData(0, 0, width, height);
        }else if(resizer === "doppel") {
            imgd2 = scaler.processImage(imgd, width, height).getImageData(0, 0, width, height);
        }

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
window.base64_sanitize_process_function = new AFunction(`var t = function(base64, scale, ) {
   /* MIT Licence 2024 Matias Affolter */
    "use strict";
    class ImageProcessor {
        constructor(despeckleStrength, quanitzeStrength, mergeStrength) {
            this.canvas = document.createElement('canvas');
            this.targetCanvas = document.createElement('canvas');
            this.despeckleStrength = despeckleStrength || 1.0;
            this.quanitzeStrength = quanitzeStrength || 1.0;
            this.mergeStrength = mergeStrength || 1.0;
            this.overlapFactor = 1.0;
         }
        setCanvas(image, width, height){
    
            this.canvas.width = image.width;
            this.canvas.height = image.height;
            this.context = this.canvas.getContext('2d', {willReadFrequently: true, powerPreference: "high-performance", alpha: true, desynchronized: true});
            if(image instanceof ImageData){
                this.context.putImageData(image, 0, 0);
            }else {
                this.context.drawImage(image, 0, 0);
            }
    
            this.targetCanvas.width = width;
            this.targetCanvas.height = height;
            this.targetContext = this.targetCanvas.getContext('2d', {willReadFrequently: true, powerPreference: "high-performance", alpha: true, desynchronized: true});
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
            this.targetContext.putImageData(this.targetImageData, 0, 0);
        }
    
        createTiles() {
            for (let y = 0; y < this.finalHeight; y++) {
                for (let x = 0; x < this.finalWidth; x++) {
                    const tileId = x+y*this.finalWidth;
                    const tileData = this.extractTileData(x, y);
                    const tile = new Tile({x, y},  tileData);
                    tile.calculateMeanColor();
                    this.tiles[tileId] = tile;
                }
            }
        }
    
        extractTileData(x, y) {
            // Calculate new width and height with overlap
            const extendedTileWidth = this.tileWidth * this.overlapFactor;
            const extendedTileHeight = this.tileHeight * this.overlapFactor;
    
            // Adjust x and y to keep tiles centered with the new size
            const newX = x * this.tileWidth - (extendedTileWidth - this.tileWidth) / 2;
            const newY = y * this.tileHeight - (extendedTileHeight - this.tileHeight) / 2;
    
            return this.context.getImageData(newX|0, newY|0, extendedTileWidth|0, extendedTileHeight|0);
        }
    
        calculateDynamicThreshold() {
            let colorDifferences = [];
            for (let y = 0; y < this.finalHeight; y++) {
                for (let x = 0; x < this.finalWidth; x++) {
                    const tile = this.tiles[x + y * this.finalWidth];
                    const neighbors = this.getNeighbors(x, y);
                    neighbors.forEach(neighbor => {
                        colorDifferences.push(this.colorDifference(tile.meanColor, neighbor.meanColor));
                    });
                }
            }
            const mean = colorDifferences.reduce((a, b) => a + b, 0) / colorDifferences.length;
            const stdDev = Math.sqrt(colorDifferences.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / colorDifferences.length);
            return (mean + stdDev) / 7; // Example of dynamic threshold
        }
    
        mergeSimilarAreaTiles(threshold) {
            for (let y = 0; y < this.finalHeight; y++) {
                for (let x = 0; x < this.finalWidth; x++) {
                    const tileIndex = x + y * this.finalWidth;
                    const tile = this.tiles[tileIndex];
                    const neighbors = this.getNeighbors(x, y);
                    const map = {};
                    neighbors.forEach((neighbor, index) => {
                        const colorDifference = this.colorDifference(tile.meanColor, neighbor.meanColor);
                        if (colorDifference < threshold) {
                            map[index] = neighbor;
                        }
                    });
    
                    if(Object.keys(map).length >= 3){
                        const averageNeighborColor = this.averageColor(neighbors);
                        Object.values(map).forEach(function (neighbor){
                            neighbor.meanColor = tile.meanColor;
                        });
                    }
                }
            }
        }
    
        despeckle(threshold) {
            for (let y = 0; y < this.finalHeight; y++) {
                for (let x = 0; x < this.finalWidth; x++) {
                    this.adaptiveDespeckleTile(x, y, threshold);
                }
            }
        }
    
        adaptiveDespeckleTile(x, y, baseThreshold) {
            const tile = this.tiles[x + y * this.finalWidth];
            const neighbors = this.getExtendedNeighbors(x, y, 3); // Larger neighborhood
    
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
    
        getTilesGroup(tiles, threshold) {
            const group = [];
            tiles.forEach((tile) => {
                let foundGroup = false;
                group.forEach((group) => {
                    if(this.colorDifference(tile.meanColor, group[0].meanColor) < threshold){
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
    
        detectEdge(neighbors, threshold) {
    
            const neighborGroup = this.getTilesGroup(neighbors, threshold);
            const areaNumber = neighborGroup.length;
            const colorNumber = neighbors.length;
    
            const primaryGroupNumber = (neighborGroup[0] || []).length || 0;
            const secondaryGroupNumber = (neighborGroup[1] || []).length || 0;
    
            const primaryColor = this.averageColor(neighborGroup[0]);
            const secondaryColor = (neighborGroup[1] || []).length ? this.averageColor(neighborGroup[1]): null;
            const isEdge = colorNumber * 2/3 <= primaryGroupNumber + secondaryGroupNumber;
            const isArea = colorNumber * 2/3 <= primaryGroupNumber;
    
            return { primaryColor, secondaryColor, isEdge, isArea };
        }
    
        maybeApplyDespeckling(tile, adjustedThreshold, primaryColor, secondaryColor) {
    
            if(
                this.colorDifference(tile.meanColor, primaryColor) > adjustedThreshold &&
                this.colorDifference(tile.meanColor, secondaryColor) > adjustedThreshold
            ){
                tile.meanColor = primaryColor;
            }
        }
    
        getExtendedNeighbors(x, y, range) {
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
    
        calculateLocalContrast(tile, neighbors) {
            // Example: Simple contrast calculation based on color variance
            const meanColor = this.averageColor(neighbors.concat([tile]));
            const variance = neighbors.concat([tile]).reduce((variance, neighbor) => {
                return variance + Math.pow(this.colorDifference(neighbor.meanColor, meanColor), 2);
            }, 0) / neighbors.length;
            return Math.sqrt(variance);
        }
    
    
        getNeighbors(x, y) {
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
    
        averageColor(tiles) {
            const sumColor = new Uint32Array(4);
            tiles.forEach(tile => {
                const rgba = tile.meanColor.rgba;
                sumColor[0] += rgba[0];
                sumColor[1] += rgba[1];
                sumColor[2] += rgba[2];
                sumColor[3] += rgba[3];
            });
    
            const numTiles = tiles.length;
            return new Pixel(sumColor[0] / numTiles|0, sumColor[1] / numTiles | 0, sumColor[2] / numTiles | 0, sumColor[3] / numTiles | 0, 0);
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
            if(image.width === width && image.height === height){ return this.context; }
            this.createTiles();
            const threshold = this.calculateDynamicThreshold();
            this.mergeSimilarAreaTiles(threshold*this.mergeStrength);
            this.mergeSimilarTilesColor(threshold*this.quanitzeStrength)
            this.despeckle(threshold*this.despeckleStrength);
    
            this.reconstructImage();
            return this.targetContext;
        }
    
        mergeSimilarTilesColor(threshold) {
            const groups = this.getTilesGroup(this.tiles, threshold);
            const colors = groups.map((group) => this.averageColor(group));
            this.tiles.forEach((tile) => {
                colors.forEach((color) => {
                    if(this.colorDifference(tile.meanColor, color) < threshold) {
                        tile.meanColor = color;
                    }
                })
            });
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
        run(maxIterations = 16) {
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
        constructor(r, g, b, a, id) {
            this.storage_ = new ArrayBuffer(6);
            this.rgba_ = new Uint8Array(this.storage_, 0, 4);
            this.rgba_[0] = r; this.rgba_[1] = g; this.rgba_[2] = b; this.rgba_[3] = a;
            this.id_ = new Uint16Array(this.storage_, 4, 1);
            this.id_[0] = id;
        }
        get r(){return this.rgba_[0];}
        get g(){return this.rgba_[1];}
        get b(){return this.rgba_[2];}
        get a(){return this.rgba_[3];}
        get rgba(){return this.rgba_;}
        get uint(){return new Uint32Array(this.storage_, 0, 1)[0]; }
        get id(){return this.id_[0];}
        set id(v){this.id_[0] = (v|0) & 0xFFFF;}
    }
    
    
    class Tile {
        constructor(position, imageData) {
            this.position = position;
            this.imageData = imageData;
            this.meanColor = new Pixel(0, 0, 0, 0, 0);
        }
    
    
        extractColorData() {
            const data = this.imageData.data;
            let colors = [];
            for (let i = 0; i < data.length; i += 4) {
                colors.push(new Pixel(data[i], data[i+1], data[i+2], data[i+3], i));
            }
            return colors;
        }
        quantizeColors(k) {
            k = k || Math.ceil(Math.sqrt(this.imageData.data.length))+2;
            const colors = this.extractColorData();
            const colorsArray = colors.map(function (c){return c.rgba; });
            return new KMeans(colorsArray, k).run(Math.ceil(k/1.5));
        }
    
        getQuantizedColors(quantizedResult) {
    
            const map = new Array(quantizedResult.centroids.length).fill(0);
            quantizedResult.clusters.forEach((clusterId, index) => {
                map[clusterId]++;
                /*
                const color = quantizedResult.centroids[clusterId];
                this.imageData.data[index * 4] = color[0];
                this.imageData.data[index * 4 + 1] = color[1];
                this.imageData.data[index * 4 + 2] = color[2];
                this.imageData.data[index * 4 + 3] = color[3];*/
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
            const color = this.getQuantizedColors(this.quantizeColors());
            this.meanColor = new Pixel(color[0]|0, color[1]|0, color[2]|0, color[3]|0, 0);
        }
    }
    
    var scaler = new ImageProcessor();
    
    function imgToImgD(img, width, height, resizer) {
        
        let ctx;
        if(resizer === "pixelize" || resizer === "normal") {
            let canvas = document.createElement("canvas");
            let canvas2 = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            canvas2.width = width;
            canvas2.height = height;
            let context = canvas.getContext("2d");
            let context2 = canvas2.getContext("2d");
                context.imageSmoothingEnabled = Boolean(resizer === "normal");
                context2.imageSmoothingEnabled = Boolean(resizer === "normal");
            context.drawImage(img, 0, 0, img.width, img.height);
            context2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas2.width, canvas2.height);
            ctx = context2;
        }else if(resizer === "doppel") {
            ctx = scaler.processImage(imgd, width, height);
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