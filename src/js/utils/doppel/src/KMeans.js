import { Color } from "simdope";

export default class KMeans {
    constructor(data, k) {
        this.data = data;
        this.k = Math.min(k, Math.ceil(Math.sqrt(this.data.length)));
        this.centroids = new Array(this.k);
        this.clusters = new Uint32Array(this.data.length); // Using Uint32Array for cluster assignments
        this.c1 = new Color(new ArrayBuffer(4));
        this.c2 = new Color(new ArrayBuffer(4));
    }

    // Step 1: Initialize centroids with unique points
    initializeCentroids() {
        let chosenIndices = new Set(), data = new Array();
        for (let i = 0; i < this.k; i++) {
            let idx;
            do {
                idx = Math.floor(Math.random() * this.data.length);
            } while (chosenIndices.has(idx));
            chosenIndices.add(idx);
            data.push(Uint8Array.from(this.data[idx]));
        }
        this.centroids = data;
    }

    // Step 2: Assign points to the nearest centroid
    assignClusters() {
        this.data.forEach((point, idx) => {
            let minDist = Number.MAX_VALUE;
            let cluster = 0;

            this.centroids.forEach((centroid, centroidIdx) => {
                const dist = this.distance(point, centroid);
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
        let sums = Array.from({ length: this.k }, () => new Uint32Array(this.data[0].length));
        let counts = new Uint32Array(this.k);

        this.data.forEach((point, idx) => {
            const clusterIdx = this.clusters[idx];
            sums[clusterIdx] = sums[clusterIdx].map((sum, i) => sum + point[i]);
            counts[clusterIdx]++;
        });
        return counts;
    }

    // Find the farthest point from any centroid
    findFarthestPointFromCentroids() {
        let maxDist = 0;
        let farthestPointIndex = 0;
        this.data.forEach((point, idx) => {
            let minDistToPoint = Number.MAX_VALUE;
            this.centroids.forEach(centroid => {
                const dist = this.distance(point, centroid);
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
    distance(point1, point2) {
        this.c1.set_from_array(point1);
        this.c2.set_from_array(point2);
        return this.c1.fast_match_with(this.c2) * 16192 | 0;
    }
    reassignCentroids(counts) {

        for(var i = 0; i < counts.length; i++) {
            if(counts[i] === 0) {
                this.centroids[i] = this.findFarthestPointFromCentroids();
            }
        }
    }
    // Run the KMeans algorithm with maxIterations
    run(maxIterations = 16, reassign = false) {
        this.initializeCentroids();
        let iterations = 0;
        let hasConverged = false;
        let counts;

        while (!hasConverged && iterations < maxIterations) {
            const oldCentroids = this.centroids.map(centroid => Uint32Array.from(centroid));

            this.assignClusters();
            counts = this.updateCentroids();
            iterations++;
            hasConverged = this.centroids.every((centroid, idx) => {
                return this.distance(centroid, oldCentroids[idx]) < 2;
            });
            if(reassign && !hasConverged){
                this.reassignCentroids(counts)
            }
        }
        var counter = this.getCentroidsPopulationCount(this.centroids, this.clusters)
        var centroidsSorted = Array.from(this.centroids).map((data, index) => {
            return {
                data: Uint8ClampedArray.from(data),
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
