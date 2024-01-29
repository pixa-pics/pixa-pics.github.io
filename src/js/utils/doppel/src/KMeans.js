export default class KMeans {
    constructor(data, k) {
        this.data = data;
        this.k = k;
        this.centroids = new Array(k);
        this.clusters = new Uint32Array(this.data.length); // Using Uint32Array for cluster assignments
    }

    // Step 1: Initialize centroids with unique points
    initializeCentroids() {
        let chosenIndices = new Set();
        for (let i = 0; i < this.k; i++) {
            let idx;
            do {
                idx = Math.floor(Math.random() * this.data.length);
            } while (chosenIndices.has(idx));
            chosenIndices.add(idx);
            this.centroids[i] = new Float64Array(this.data[idx]);
        }
    }

    // Step 2: Assign points to the nearest centroid
    assignClusters() {
        this.data.forEach((point, idx) => {
            let minDist = Number.MAX_VALUE;
            let cluster = -1;

            this.centroids.forEach((centroid, centroidIdx) => {
                const dist = this.euclideanDistance(point, centroid);
                if (dist < minDist) {
                    minDist = dist;
                    cluster = centroidIdx;
                }
            });

            this.clusters[idx] = cluster;
        });
    }

    // Step 3: Update centroids and handle empty clusters
    updateCentroids() {
        let sums = Array.from({ length: this.k }, () => new Float64Array(this.data[0].length).fill(0));
        let counts = new Uint32Array(this.k).fill(0);

        this.data.forEach((point, idx) => {
            const clusterIdx = this.clusters[idx];
            sums[clusterIdx] = sums[clusterIdx].map((sum, i) => sum + point[i]);
            counts[clusterIdx]++;
        });

        this.centroids = sums.map((sum, i) => {
            if (counts[i] === 0) {
                // Find the farthest point from any centroid and use it as a new centroid
                const farthestPointIndex = this.findFarthestPointFromCentroids();
                counts[i] = 1; // Ensure the new centroid has at least one point assigned
                return new Float64Array(this.data[farthestPointIndex]);
            }
            return sum.map(value => value / counts[i]);
        });
    }

    // Find the farthest point from any centroid
    findFarthestPointFromCentroids() {
        let maxDist = 0;
        let farthestPointIndex = 0;
        this.data.forEach((point, idx) => {
            let minDistToPoint = Number.MAX_VALUE;
            this.centroids.forEach(centroid => {
                const dist = this.euclideanDistance(point, centroid);
                if (dist < minDistToPoint) {
                    minDistToPoint = dist;
                }
            });
            if (minDistToPoint > maxDist) {
                maxDist = minDistToPoint;
                farthestPointIndex = idx;
            }
        });
        return farthestPointIndex;
    }

    // Euclidean distance between two points
    euclideanDistance(point1, point2) {
        let sum = 0;
        for (let i = 0; i < point1.length; i++) {
            sum += (point1[i] - point2[i]) ** 2;
        }
        return Math.sqrt(sum);
    }

    // Run the KMeans algorithm with maxIterations
    run(maxIterations = 16) {
        this.initializeCentroids();
        let iterations = 0;
        let hasConverged = false;

        while (!hasConverged && iterations < maxIterations) {
            const oldCentroids = this.centroids.map(centroid => new Float64Array(centroid));
            this.assignClusters();
            this.updateCentroids();
            iterations++;

            hasConverged = this.centroids.every((centroid, idx) => {
                return this.euclideanDistance(centroid, oldCentroids[idx]) < 1e-5;
            });
        }
        var counter = this.getCentroidsPopulationCount(this.centroids, this.clusters)
        var centroidsSorted = Array.from(this.centroids).map((data, index) => {
            return {
                data: data,
                count: counter[index]
            }
        }).sort((a, b) => b.count-a.count)

        return { centroids: this.centroids, clusters: this.clusters, centroidsSorted };
    }
    getCentroidsPopulationCount(centroids, clusters) {
        let counter = new Uint32Array(centroids.length);
        clusters.forEach(clusterIdx => {
            counter[clusterIdx]++;
        });
        return counter;
    }
}
