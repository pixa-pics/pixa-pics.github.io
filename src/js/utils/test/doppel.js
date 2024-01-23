"use strict";
class ImageProcessor {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.targetCanvas = document.createElement('canvas');
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
        this.targetContext.putImageData(this.targetImageData, 0, 0)
        return this.targetContext;
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
        return this.context.getImageData(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
    }

    mergeSimilarAreaTiles(threshold = 36) {
        for (let y = 0; y < this.finalHeight; y++) {
            for (let x = 0; x < this.finalWidth; x++) {
                const tileIndex = x + y * this.finalWidth;
                const tile = this.tiles[tileIndex];
                const neighbors = this.getNeighbors(x, y);
                const map = {};
                neighbors.forEach((neighbor, index) => {
                    const colorDifference = this.colorDifference(tile.meanColor, neighbor.meanColor);
                    if (colorDifference < threshold) {
                        map[index] = true;
                    }
                });

                if(Object.keys(map).length * 8/3 >= neighbors.length){
                    const averageNeighborColor = this.averageColor(neighbors);
                    Object.keys(map).forEach(function (index){
                        neighbors[index] = averageNeighborColor;
                    });
                }
            }
        }
    }

    despeckle(threshold = 48) {
        for (let y = 0; y < this.finalHeight; y++) {
            for (let x = 0; x < this.finalWidth; x++) {
                const tileIndex = x + y * this.finalWidth;
                const tile = this.tiles[tileIndex];
                const neighbors = this.getNeighbors(x, y);

                const averageNeighborColor = this.averageColor(neighbors);
                const colorDifference = this.colorDifference(tile.meanColor, averageNeighborColor);

                if (colorDifference < threshold) {
                    this.tiles[tileIndex].meanColor = averageNeighborColor;
                }
            }
        }
    }

    getNeighbors(x, y) {
        const neighbors = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {

                const nx = x + dx;
                const ny = y + dy;

                if (nx < 0 || ny < 0) continue; // Skip the tile itself
                if (nx >= this.finalWidth || ny >= this.finalHeight) continue; // Skip the tile itself

                if (nx >= 0 && nx < this.finalWidth && ny >= 0 && ny < this.finalHeight) {
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
        return new Pixel(sumColor.r / numTiles|0, sumColor.g / numTiles | 0, sumColor.b / numTiles | 0, sumColor.a / numTiles | 0, 0);
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
        this.despeckle();
        this.mergeSimilarAreaTiles();
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
        k = k || Math.ceil(Math.sqrt(this.imageData.data.length));
        const colors = this.extractColorData();
        const colorsArray = colors.map(function (c){return c.rgba; });
        return new KMeans(colorsArray, k).run(k*2);
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

const scaler = new ImageProcessor();

module.exports = {
    scaler: scaler
}