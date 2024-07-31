import ImageManager from "./ImageManager";
import TileManager from "./TileManager";
import Filters from "./Filters";
import ImageUtils from "./ImageUtils";
import ColorAnalysis from "./ColorAnalysis";

export default class ImageProcessor {
    constructor(options) {
        this.o = options || {};
        this.canvas = ImageUtils.initializeCanvas(undefined, 1, 1).canvas;
        this.targetCanvas =  ImageUtils.initializeCanvas(undefined, 1, 1).canvas;
        this.options = {
            despeckleStrength: this.o.despeckleStrength || this.o.strength || 1.0,
            quantizeStrength: this.o.quantizeStrength || this.o.strength  || 1.0,
            mergeStrength: this.o.mergeStrength || this.o.strength  || 1.0,
            overlapFactor: this.o.overlapFactor || this.o.strength  || 1.0
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
    updateFilters(threshold) {
        "use strict";
        this.filters = new Filters(this.options, this.tilesManager, threshold, this.finalWidth, this.finalHeight);
    }
    computeSmartParameters(){
        "use strict";
        this.imageManager = new ImageManager(this.context);
    }
    updateTiles() {
        "use strict";
        this.tilesManager = new TileManager(this.context, this.targetContext, this.targetImageData, this.sizes);
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

        const resultSecondaryCanvas = ImageUtils.initializeCanvas(undefined, width, height);
        this.targetCanvas = resultSecondaryCanvas.canvas;
        this.targetContext = resultSecondaryCanvas.context;

        this.targetImageData = this.targetContext.getImageData(0, 0, width, height);

        this.finalWidth = width;
        this.finalHeight = height;
        this.tileWidth = Math.fround(this.canvas.width / this.targetCanvas.width);
        this.tileHeight = Math.fround(this.canvas.height / this.targetCanvas.height);
    }

    changeFinalCanvasParameters(width, height) {

        width = (width|0) || 1;
        height = (height|0) || 1;

        const resultSecondaryCanvas = ImageUtils.initializeCanvas(undefined, width, height);
        this.targetCanvas = resultSecondaryCanvas.canvas;
        this.targetContext = resultSecondaryCanvas.context;

        this.targetImageData = this.targetContext.getImageData(0, 0, width, height);

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
                const neighbors = this.tilesManager.getExtendedNeighbors(x, y, 1);
                neighbors.forEach(neighbor => {
                    colorDifferences.push(ColorAnalysis.colorDifference(tile.meanColor, neighbor.meanColor));
                });
            }
        }
        const mean = colorDifferences.reduce((a, b) => a + b, 0) / colorDifferences.length;
        const stdDev = Math.sqrt(colorDifferences.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / colorDifferences.length);
        return (mean + stdDev) / 25; // Example of dynamic threshold
    }

    processImage(image, width, height) {
        "use strict";
        const t1 = Date.now();
        this.setCanvas(width, height, image);
        if(image.width <= width && image.height <= height){ return this.context; }
        const t2 = Date.now();
        this.computeSmartParameters();
        const t3 = Date.now();
        this.updateTiles();
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
        });
        const result = this.targetContext;
        this.reset();
        return result;
    }
    reset() {
        Array.of("targetContext", "tileHeight", "tileWidth", "finalWidth", "finalHeight", "targetImageData", "targetContext", "targetCanvas", "context", "canvas", "tilesManager", "filters", "imageManager").forEach((key) => {
            delete this[key];
        });
        this.canvas = ImageUtils.initializeCanvas(undefined, 1, 1).canvas;
        this.targetCanvas =  ImageUtils.initializeCanvas(undefined, 1, 1).canvas;
    }
}