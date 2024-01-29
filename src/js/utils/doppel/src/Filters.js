import MergeFilter from "./filters/MergeFilter";
import DespeckleFilter from "./filters/DespeckleFilter";
import QuantizeFilter from "./filters/QuantizeFilter";

export default class Filters {
    constructor(options, tilesManager, threshold, width, height) {
        this.mergeFilter = new MergeFilter(threshold * options.mergeStrength, tilesManager, width, height);
        this.despeckleFilter = new DespeckleFilter(threshold * options.despeckleStrength, tilesManager, width, height);
        this.quantizeFilter = new QuantizeFilter(threshold * options.quantizeStrength, tilesManager, width, height);
    }

    applyFilters() {
        "use strict";
        this.despeckleFilter.apply();
        this.quantizeFilter.apply();
        this.mergeFilter.apply();
    }
}
