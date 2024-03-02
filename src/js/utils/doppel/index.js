import ImageProcessor from "./src/ImageProcessor";
var scaler = new ImageProcessor({strength: 1.0, overlapFactor: 1.12, despeckleStrength: 0.88});
module.exports = {
    scaler, ImageProcessor
}