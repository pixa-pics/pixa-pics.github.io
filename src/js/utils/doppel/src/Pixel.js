export default class Pixel {
    constructor(rgba) {
        this.rgba_ = rgba;
    }
    static createUint32(uint32){
        return new Pixel(new Uint8Array(Uint32Array.of((uint32|0)>>>0).buffer));
    }
    get r(){return this.rgba_[0];}
    get g(){return this.rgba_[1];}
    get b(){return this.rgba_[2];}
    get a(){return this.rgba_[3];}
    get rgba(){return this.rgba_.subarray(0, 4);}
    get uint32(){return ((this.r << 24) | (this.g << 16) | (this.b << 8) | this.a)>>>0; }
    setRGBA(array){
        "use strict";
        this.rgba_[0] = array[0];
        this.rgba_[1] = array[1];
        this.rgba_[2] = array[2];
        this.rgba_[3] = array[3];
    }
}