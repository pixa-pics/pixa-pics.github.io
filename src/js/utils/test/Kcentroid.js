//https://astropulse.itch.io/k-centroid
class Scaler {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
    }

    kCenter(width, height, max, accuracy, sourceImage) {
        var destCanvas = document.createElement('canvas');
            destCanvas.width = width;
            destCanvas.height = height;
        var destContext = destCanvas.getContext('2d');

        // Resize the canvas to the source image size
        this.canvas.width = sourceImage.width;
        this.canvas.height = sourceImage.height;

        // Draw the source image onto the canvas
        this.context.drawImage(sourceImage, 0, 0);

        // Get the image data
        //const imageData = this.context.getImageData(0, 0, sourceImage.width, sourceImage.height);

        // Process the image
        const wFactor = sourceImage.width / width;
        const hFactor = sourceImage.height / height;
        let colors = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const tileData = this.context.getImageData(x * wFactor, y * hFactor, wFactor, hFactor);
                const kMeansResult = this.kMeans(tileData, max, accuracy);
                // Draw the processed tile back onto the canvas
                //this.context.putImageData(kMeansResult[0], x * wFactor, y * hFactor);
                const color = kMeansResult[1];
                colors.push(color);
                const color_str = `rgb(${color.r}, ${color.g}, ${color.b})`;
                destContext.fillStyle = color_str;
                destContext.fillRect(x, y, 1, 1);
            }
        }

        const wholeTileData = destContext.getImageData(0, 0, width, height);
        /*
        const kMeansResult = this.kMeans(destContext.getImageData(0, 0, width, height), colors, accuracy*2);
        const pixelColors = kMeansResult[0];
         */
        function getColor(x, y, data){
            const i = (width * y + x) * 4;
            return {r: data[i], g: data[i+1], b: data[i+2]};
        }

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                // Reassign colors based on global palette and 'color magnet' mechanism
                const color = getColor(x, y, wholeTileData.data);

                const neighbor = [];
                if(x < width-1){ neighbor.push(getColor(0, 0, destContext.getImageData(x+1, y, 1, 1))); }
                if(x > 1){  neighbor.push(getColor(0, 0, destContext.getImageData(x-1, y, 1, 1)));  }
                if(y < height-1){ neighbor.push(getColor(0, 0, destContext.getImageData(x, y+1, 1, 1)));  }
                if(y > 1){  neighbor.push(getColor(0, 0, destContext.getImageData(x, y-1, 1, 1)));  }

                const nearestColor = this.findNearestColorWithMagnet(color, neighbor, colors);
                destContext.fillStyle = `rgb(${nearestColor.r}, ${nearestColor.g}, ${nearestColor.b})`;
                destContext.fillRect(x, y, 1, 1);
            }
        }

        // The processed image is now in destCanvas
        // You can use this.canvas.toDataURL() to get the image data URL
        return destCanvas;
    }
    findNearestColorWithMagnet(color, neighbor, pixelColors){
        let closerColor = pixelColors[0];
        let minDist = Infinity;
        pixelColors.forEach((pixel) => {
            const dist = this.distance(pixel, color);
            if (dist < minDist) {
                minDist = dist;
                closerColor = pixel;
            }
        });
        neighbor.forEach((pixel) => {
            const dist = this.distance(pixel, color) * 0.75;
            if (dist < minDist) {
                minDist = dist;
                closerColor = pixel;
            }
        });
        return closerColor;
    }
    // Helper function to check if a centroid is too close to others
    isCentroidTooClose(centroid, centroids, minDistanceThreshold) {
        return centroids.some(existingCentroid => this.distance(centroid, existingCentroid) < minDistanceThreshold);
    }
    kMeans(imageData, k, accuracy, weights) {
        const pixels = [];
        const centroids = [];
        const clusters = new Array(k);
        const minDistanceThreshold = 100 * 1000; // Adjust based on your needs
        const maxReinitAttempts = 10; // Maximum attempts to reinitialize a centroid

        // Convert ImageData to an array of pixels
        for (let i = 0; i < imageData.data.length; i += 4) {
            pixels.push({
                r: imageData.data[i],
                g: imageData.data[i + 1],
                b: imageData.data[i + 2],
                weight: weights ? weights[i / 4] : 1 // Assuming weights array is in sync with pixels
            });
        }

        // Initialize centroids with improved logic
        for (let i = 0; i < k; i++) {
            let attempts = 0;
            let newCentroid;
            do {
                newCentroid = pixels[Math.floor(Math.random() * pixels.length)];
                attempts++;
            } while (this.isCentroidTooClose(newCentroid, centroids, minDistanceThreshold) && attempts < maxReinitAttempts);

            centroids.push(newCentroid);
        }

        for (let iter = 0; iter < accuracy; iter++) {
            // Reset clusters for the new iteration
            for (let i = 0; i < k; i++) {
                clusters[i] = [];
            }

            // Assign each pixel to the nearest centroid, considering weights
            pixels.forEach(pixel => {
                let minDist = Infinity;
                let index = 0;
                centroids.forEach((centroid, i) => {
                    const dist = this.distance(pixel, centroid);
                    if (dist < minDist) {
                        minDist = dist;
                        index = i;
                    }
                });
                clusters[index].push(pixel);
            });

            // Recalculate centroids with weights
            centroids.forEach((centroid, i) => {
                if (clusters[i].length === 0) return;
                let sumR = 0, sumG = 0, sumB = 0, totalWeight = 0;
                clusters[i].forEach(pixel => {
                    sumR += pixel.r * pixel.weight;
                    sumG += pixel.g * pixel.weight;
                    sumB += pixel.b * pixel.weight;
                    totalWeight += pixel.weight;
                });
                centroid.r = sumR / totalWeight;
                centroid.g = sumG / totalWeight;
                centroid.b = sumB / totalWeight;
            });


            // Check and reinitialize centroids if they are too close to each other
            for (let i = 0; i < centroids.length; i++) {
                for (let j = i + 1; j < centroids.length; j++) {
                    if (this.distance(centroids[i], centroids[j]) < minDistanceThreshold) {
                        let attempts = 0;
                        let reinitCentroid;
                        do {
                            reinitCentroid = pixels[Math.floor(Math.random() * pixels.length)];
                            attempts++;
                        } while (this.isCentroidTooClose(reinitCentroid, centroids, minDistanceThreshold) && attempts < maxReinitAttempts);

                        centroids[j] = reinitCentroid;
                    }
                }
            }
        }

        // Find the largest cluster and its centroid
        let largestClusterSize = 0;
        let dominantColor;
        clusters.forEach((cluster, i) => {
            if (cluster.length > largestClusterSize) {
                largestClusterSize = cluster.length;
                dominantColor = centroids[i];
            }
        });

        // Replace each pixel in the image with the color of the nearest centroid
        for (let i = 0; i < pixels.length; i++) {
            let minDist = Infinity;
            let nearestCentroid;
            centroids.forEach(centroid => {
                const dist = this.distance(pixels[i], centroid);
                if (dist < minDist) {
                    minDist = dist;
                    nearestCentroid = centroid;
                }
            });
            imageData.data[i * 4] = nearestCentroid.r;
            imageData.data[i * 4 + 1] = nearestCentroid.g;
            imageData.data[i * 4 + 2] = nearestCentroid.b;
        }

        // Return the processed image data and the dominant color
        return [centroids, dominantColor];
    }

    // Helper function to calculate Euclidean distance between two colors
    distance(color1, color2) {
        const dr = color1.r - color2.r;
        const dg = color1.g - color2.g;
        const db = color1.b - color2.b;
        return dr * dr + dg * dg + db * db;
    }
}

// Usage
const scaler = new Scaler();
const sourceImage = document.createElement('img'); // Assume this is your source image
sourceImage.onload = () => {
    console.log(scaler.kCenter(92, 92, 16, 8, sourceImage).toDataURL());
};
