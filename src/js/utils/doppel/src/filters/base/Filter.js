export default class Filter{
    constructor(strength, tilesManager, width, height) {
        this.strength = strength;
        this.tilesManager = tilesManager;
        this.tiles = tilesManager.getTiles();
        this.width = width;
        this.height = height;
    }
}