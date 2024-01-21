import JSLoader from "./JSLoader";
import {scaler} from "./test/downscale";
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const AFunction = Object.getPrototypeOf( function(){}).constructor;

const file_to_imagedata_resized = (file, resize_original_to, callback_function = () => {}, pool = null) => {

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
        let imgd2 = scaler.kCenter(imgd, width, height).getImageData(0, 0, width, height);
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
window.base64_sanitize_process_function = new AFunction(`var t = function(base64, scale) {
    "use strict";
    class Scaler {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
        }
        setCanvas(image){
            if(image instanceof ImageData){
                this.canvas.width = image.width;
                this.canvas.height = image.height;
                this.context.putImageData(image, 0, 0);
            }else {
                this.canvas.width = image.width;
                this.canvas.height = image.height;
                this.context.drawImage(image, 0, 0);
            }
        }
        kCenter(image, width, height, colors, accuracy) {
            colors = typeof colors == "undefined" ? (((width+height) / 2) > 512) ? 1: (((width+height) / 2) > 256) ? 2: 4: colors;
            accuracy = typeof accuracy == "undefined" ? (((width+height) / 2) > 512) ? 1: (((width+height) / 2) > 256) ? 3: 6: colors; 
            this.setCanvas(image);
            const newCanvas = document.createElement('canvas');
            newCanvas.width = width;
            newCanvas.height = height;
            const newContext = newCanvas.getContext('2d');
    
            const wFactor = this.canvas.width / width;
            const hFactor = this.canvas.height / height;
    
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const tileImage = this.context.getImageData(x * wFactor, y * hFactor, wFactor, hFactor);
                    const kResult = kMeans(tileImage, colors, accuracy);
                    newContext.fillStyle = colorToRgba(kResult[1]);
                    newContext.fillRect(x, y, 1, 1);
                }
            }
            return newContext;
        }
    }
    
    function kMeans(imageData, k, accuracy) {
        let centroids = initCentroids(imageData, k);
        let clusters;
    
        for (let iter = 0; iter < accuracy; iter++) {
            clusters = assignPixelsToCentroids(imageData, centroids);
            centroids = recalculateCentroids(imageData, clusters, centroids);
        }
    
        const biggestCentroid = findBiggestCentroid(centroids);
        //replacePixelsWithCentroidColor(imageData, centroids);
    
        return [imageData, biggestCentroid];
    }
    
    function initCentroids(imageData, k) {
        const centroids = [];
        const pixels = imageData.data;
        for (let i = 0; i < k; i++) {
            const id = Math.floor(Math.random() * (pixels.length / 4)), idx = id * 4;
            centroids.push({ i: id, r: pixels[idx], g: pixels[idx + 1], b: pixels[idx + 2], count: 0 });
        }
        return centroids;
    }
    
    function assignPixelsToCentroids(imageData, centroids) {
        const clusters = new Array(centroids.length).fill().map(() => []);
        const pixels = imageData.data;
    
        centroids.forEach(function (centroid){centroid.count = 0;}); // Reset centroid counts
    
        for (let i = 0; i < pixels.length; i += 4) {
            const pixel = { i: i/4, r: pixels[i], g: pixels[i + 1], b: pixels[i + 2] };
            let minDist = Infinity;
            let closestCentroidIndex = -1;
    
            centroids.forEach(function (centroid, index){
                const dist = enhancedEuclideanDistance(pixel, centroid, imageData.width);
                if (dist < minDist) {
                    minDist = dist;
                    closestCentroidIndex = index;
                }
            });
    
            if(closestCentroidIndex >= 0) {
                clusters[closestCentroidIndex].push(i/4); // Store the index of the pixel in the cluster
                centroids[closestCentroidIndex].count++;
            }
        }
    
        return clusters;
    }
    
    function recalculateCentroids(imageData, clusters, centroids) {
        const pixels = imageData.data;
        return centroids.map(function (centroid, index) {
            if (clusters[index].length === 0) return centroid;
    
            let sumR = 0, sumG = 0, sumB = 0;
            clusters[index].forEach(function(pixelIndex) {
                sumR += pixels[pixelIndex];
                sumG += pixels[pixelIndex + 1];
                sumB += pixels[pixelIndex + 2];
            });
    
            const len = clusters[index].length;
            return { r: sumR / len, g: sumG / len, b: sumB / len, count: len };
        });
    }
    
    function findBiggestCentroid(centroids) {
        return centroids.reduce(function (max, centroid){ return centroid.count > max.count ? centroid : max}, centroids[0]);
    }
    
    function replacePixelsWithCentroidColor(imageData, centroids) {
        const pixels = imageData.data;
        const clusters = assignPixelsToCentroids(imageData, centroids);
    
        clusters.forEach(function (cluster, index) {
            const color = centroids[index];
            cluster.forEach(function(pixelIndex) {
                pixels[pixelIndex] = color.r;
                pixels[pixelIndex + 1] = color.g;
                pixels[pixelIndex + 2] = color.b;
            });
        });
    }
    
    function colorToRgba(color) {
        return "rgba("+color.r+","+color.g+","+color.b+",255)";
    }
    
    // Helper function to calculate Euclidean distance
    function enhancedEuclideanDistance(color1, color2, width) {
        const dr = color1.r - color2.r;
        const dg = color1.g - color2.g;
        const db = color1.b - color2.b;
        const colorDistance = Math.sqrt(dr * dr + dg * dg + db * db);
    
        // Calculate spatial distance
        const x1 = color1.i % width;
        const y1 = Math.floor(color1.i / width);
        const x2 = color2.i % width;
        const y2 = Math.floor(color2.i / width);
        const spatialDistance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) * 8;
    
        // Weight the color and spatial distances
        const alpha = 0.5; // Adjust as necessary
        return alpha * colorDistance + (1 - alpha) * spatialDistance;
    }
    const scaler = new Scaler();
    return new Promise(function(resolve, reject) {
        var img = new Image();
        var is_png = base64.startsWith("data:image/png;");
        img.onload = function() {
    
           var canvas;
           try {
           
                let width = (img.naturalWidth || img.width) * scale;
                let height = (img.naturalHeight || img.height) * scale;
                let imgd = scaler.kCenter(img, width, height).getImageData(0, 0, width, height);
                
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
                let canvas = scaler.kCenter(img, width, height).canvas;
                resolve(canvas.toDataURL(is_png ? "image/png": "image/jpeg")); 
            }
        };
        img.onerror = function() { reject(); };
        img.src = base64;
    });
}; return t;`)();

const base64_sanitize = (base64, callback_function = () => {}, pool = null, scale = 1) => {

    if(pool !== null) {

        pool.exec(window.base64_sanitize_process_function, [
            base64, scale
        ]).catch((e) => {

            window.base64_sanitize_process_function(base64, scale).then((r) => {
                callback_function(r);
            });
        }).timeout(15 * 1000).then((r) => {

            callback_function(r);
        });

    }else {

        window.base64_sanitize_process_function(base64, scale).then((r) => {

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