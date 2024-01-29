import Filter from "./base/Filter";
import KMeans from "../KMeans";

export default class QuantizeFilter extends Filter{
    constructor(strength, tilesManager, width, height) {
        super(strength, tilesManager, width, height)
    }

    apply() {
        "use strict";
        // Collect mean colors from all tiles
        const meanColors = this.tiles.map(tile => tile.meanColor);

        // Apply K-Means to find dominant colors
        // The number of centroids (k) can be adjusted based on the desired quantization strength
        const k = 100;
        const kmeans = new KMeans(meanColors.map(mc => mc.rgba), k);
        const {clusters, centroids} = kmeans.run(48);
        // Update each tile's mean color to the nearest centroid
        this.tiles.forEach((tile, index) => {
            const clusterIndex = clusters[index];
            const nearestCentroid = centroids[clusterIndex];
            tile.meanColor.setRGBA(nearestCentroid);
        });
    }
}