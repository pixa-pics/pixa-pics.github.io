export default class Pixel {
    constructor(rgba) {
        this.rgba_ = rgba;
    }
    get r(){return this.rgba_[0];}
    get g(){return this.rgba_[1];}
    get b(){return this.rgba_[2];}
    get a(){return this.rgba_[3];}
    get rgba(){return this.rgba_.subarray(0, 4);}
    setRGBA(array){
        "use strict";
        this.rgba_[0] = array[0];
        this.rgba_[1] = array[1];
        this.rgba_[2] = array[2];
        this.rgba_[3] = array[3];
    }
}