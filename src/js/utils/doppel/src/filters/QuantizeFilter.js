import Filter from "./base/Filter";
import ImageManager from "../ImageManager";
import ImageUtils from "../ImageUtils";

export default class QuantizeFilter extends Filter{
    constructor(strength, tilesManager, width, height) {
        super(strength, tilesManager, width, height)
    }

    apply() {
        "use strict";
        // Collect mean colors from all tiles
        // Apply K-Means to find dominant colors
        // The number of centroids (k) can be adjusted based on the desired quantization strength
        const k = this.strength;
        const imageDataInit = new ImageData(this.tilesManager.tilesColorUint8a, this.width, this.height);
        const {context} = ImageUtils.initializeCanvas(imageDataInit);
        const {imageData} = ImageManager.quantizeImageData(context, k);
        // Update each tile's mean color to the nearest centroid
        this.tilesManager.tilesColorUint8a.set(imageData.data);
    }
}