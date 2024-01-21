class Scaler {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
    }
    setCanvas(image){
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.context.drawImage(image, 0, 0);
    }
    kCenter(width, height, colors, accuracy, image) {
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
        return newCanvas;
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
    replacePixelsWithCentroidColor(imageData, centroids);

    return [imageData, biggestCentroid];
}

function initCentroids(imageData, k) {
    const centroids = [];
    const pixels = imageData.data;
    for (let i = 0; i < k; i++) {
        const idx = Math.floor(Math.random() * (pixels.length / 4)) * 4;
        centroids.push({ r: pixels[idx], g: pixels[idx + 1], b: pixels[idx + 2], count: 0 });
    }
    return centroids;
}

function assignPixelsToCentroids(imageData, centroids) {
    const clusters = new Array(centroids.length).fill().map(() => []);
    const pixels = imageData.data;

    centroids.forEach(centroid => centroid.count = 0); // Reset centroid counts

    for (let i = 0; i < pixels.length; i += 4) {
        const pixel = { r: pixels[i], g: pixels[i + 1], b: pixels[i + 2] };
        let minDist = Infinity;
        let closestCentroidIndex = -1;

        centroids.forEach((centroid, index) => {
            const dist = euclideanDistance(pixel, centroid);
            if (dist < minDist) {
                minDist = dist;
                closestCentroidIndex = index;
            }
        });

        clusters[closestCentroidIndex].push(i); // Store the index of the pixel in the cluster
        centroids[closestCentroidIndex].count++;
    }

    return clusters;
}

function recalculateCentroids(imageData, clusters, centroids) {
    const pixels = imageData.data;
    return centroids.map((centroid, index) => {
        if (clusters[index].length === 0) return centroid;

        let sumR = 0, sumG = 0, sumB = 0;
        clusters[index].forEach(pixelIndex => {
            sumR += pixels[pixelIndex];
            sumG += pixels[pixelIndex + 1];
            sumB += pixels[pixelIndex + 2];
        });

        const len = clusters[index].length;
        return { r: sumR / len, g: sumG / len, b: sumB / len, count: len };
    });
}

function findBiggestCentroid(centroids) {
    return centroids.reduce((max, centroid) => (centroid.count > max.count ? centroid : max), centroids[0]);
}

function replacePixelsWithCentroidColor(imageData, centroids) {
    const pixels = imageData.data;
    const clusters = assignPixelsToCentroids(imageData, centroids);

    clusters.forEach((cluster, index) => {
        const color = centroids[index];
        cluster.forEach(pixelIndex => {
            pixels[pixelIndex] = color.r;
            pixels[pixelIndex + 1] = color.g;
            pixels[pixelIndex + 2] = color.b;
        });
    });
}

function colorToRgba(color) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, 255)`;
}

// Helper function to calculate Euclidean distance
function euclideanDistance(color1, color2) {
    const dr = color1.r - color2.r;
    const dg = color1.g - color2.g;
    const db = color1.b - color2.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
}

// Usage
const scaler = new Scaler();
const sourceImage = document.createElement('img'); // Assume this is your source image
sourceImage.onload = () => {
    console.log(scaler.kCenter(92, 92, 16, 8, sourceImage).toDataURL());
};