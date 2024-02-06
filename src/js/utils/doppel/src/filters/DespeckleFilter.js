import Filter from "./base/Filter";
import ColorAnalysis from "../ColorAnalysis";
import Pixel from "../Pixel";
import KMeans from "../KMeans";

export default class DespeckleFilter extends Filter {
    constructor(strength, tilesManager, width, height) {
        super(strength, tilesManager, width, height)
    }

    apply() {
        "use strict";
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.adaptiveDespeckleTile(x, y, this.strength);
            }
        }
    }

    adaptiveDespeckleTile(x, y, threshold) {
        "use strict";
        const tile = this.tiles[x + y * this.width];
        const tileColor = tile.meanColor;
        const range = 4, close = 1;
        const neighborsRange = this.tilesManager.getExtendedNeighbors(x, y, range); // Larger neighborhood
        const neighborsClose = this.tilesManager.getExtendedNeighbors(x, y, close); // Larger neighborhood
        const neighborsNumber = neighborsRange.length;
        const meanColors = neighborsRange.map(n => n.meanColor);
        const {centroids, centroidsSorted, clusters} = new KMeans(meanColors.map(n => n.rgba), range).run(neighborsNumber);
        const classification = this.determineClassification(centroidsSorted, neighborsNumber);
        switch (classification) {
            case "AREA":
                const areaColor = new Pixel(centroidsSorted[0].data);
                const differenceTileArea = ColorAnalysis.colorDifference(areaColor, tileColor);
                if(differenceTileArea > 10 && differenceTileArea < 40){
                    tileColor.setRGBA(areaColor.rgba);
                }
                break;
            case "EDGE":
                const areaColor1 = new Pixel(centroidsSorted[0].data);
                const areaColor2 = new Pixel(centroidsSorted[1].data);
                const differenceAreaArea = ColorAnalysis.colorDifference(areaColor1, areaColor2);
                const differenceArea1Tile = ColorAnalysis.colorDifference(areaColor1, tileColor);
                const differenceArea2Tile = ColorAnalysis.colorDifference(areaColor2, tileColor);
                const differenceAreasMiddle = Math.abs(differenceArea1Tile - differenceArea2Tile);

                if(differenceAreasMiddle * 5 >= differenceAreaArea){
                    const meanColor = new Pixel(new KMeans(neighborsClose.map(n => n.meanColor.rgba), 4).run(4).centroidsSorted[0].data);
                    tileColor.setRGBA(meanColor.rgba);
                }
                break;

        }
    }

    determineClassification(centroidsSorted, neighborsNumber) {
        if (centroidsSorted[0].count >= neighborsNumber * 0.75) {
            return "AREA";
        }
        if (Math.abs(centroidsSorted[0].count - centroidsSorted[1].count) * Math.abs(centroidsSorted[2].count - centroidsSorted[3].count) < 25) {
            return "SHAPE";
        }
        if (Math.abs(centroidsSorted[0].count - centroidsSorted[1].count) < Math.abs(centroidsSorted[1].count - centroidsSorted[2].count) * 0.75) {
            return "EDGE";
        }

        return "COMPLEX";
    }
}