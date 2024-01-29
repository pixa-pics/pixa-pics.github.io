import Tile from "./Tile";
import ColorAnalysis from "./ColorAnalysis";

export default class TileManager {
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
                this.tiles[tileId] =  new Tile(this.extractTileData(x, y), this.tilesColorUint8a.subarray(tileIndexColor, tileIndexColor+4), x, y);
            }
        }
    }
    computeTiles() {
        "use strict";
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].calculateMeanColor();
        }
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