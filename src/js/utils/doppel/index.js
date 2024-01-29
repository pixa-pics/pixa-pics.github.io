import ImageProcessor from "./src/ImageProcessor";
var scaler = new ImageProcessor({strength: 1.0});
module.exports = {
    scaler, ImageProcessor
}