import Filter from "./base/Filter";
import ColorAnalysis from "../ColorAnalysis";

export default class MergeFilter extends Filter {
    constructor(strength, tilesManager, width, height) {
        super(strength, tilesManager, width, height);
    }

    apply() {
        "use strict";
        // Create a flag array to keep track of merged tiles
        const merged = Array(this.width * this.height).fill(false);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tileIndex = x + y * this.width;

                // Skip this tile if it has already been merged
                if (merged[tileIndex]) continue;

                const tile = this.tiles[tileIndex];
                const neighbors = this.tilesManager.getExtendedNeighbors(x, y, 1);
                const neighborsCount = neighbors.length;

                // Collect neighbors that are similar enough to the current tile
                const similarNeighbors = neighbors.filter(neighbor => {
                    const colorDifference = ColorAnalysis.colorDifference(tile.meanColor, neighbor.meanColor);
                    return colorDifference < this.strength;
                });

                // Merge the current tile with similar neighbors if there are enough candidates
                if (similarNeighbors.length >= neighborsCount-2) {
                    similarNeighbors.forEach(neighbor => {
                        neighbor.meanColor.setRGBA(tile.meanColor.rgba);
                        const neighborIndex = neighbor.x + neighbor.y * this.width;
                        merged[neighborIndex] = true; // Mark this neighbor as merged
                    });
                    merged[tileIndex] = true; // Mark the current tile as merged
                }
            }
        }
    }
}