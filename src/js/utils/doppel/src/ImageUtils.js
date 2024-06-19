export default class ImageUtils {
    static initializeCanvas(image, width, height) {
        "use strict";
        image = image || {width: 0, height: 0}
        width = image.width || width || 1;
        height = image.height || height || 1;
        let canvas, context;
        try {
            canvas = new OffscreenCanvas(width, height);
            context = canvas.getContext('2d', { willReadFrequently: true, desynchronized: true});
        }catch (e) {
            canvas = document.createElement("canvas")
            canvas.width = width;
            canvas.height = height;
            context = canvas.getContext('2d', { willReadFrequently: true, desynchronized: true});
        }

        if (image instanceof ImageData) {
            context.putImageData(image, 0, 0);
        } else if(image.width) {
            context.drawImage(image, 0, 0, width, height);
        }

        return { canvas, context };
    }

    static canvasContextToImageData(context) {
        "use strict";
        return context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    }
}