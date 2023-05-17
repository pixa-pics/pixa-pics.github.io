var MASKS_OR_ = Uint8Array.of(
    0b00000001,
    0b00000010,
    0b00000100,
    0b00001000,
    0b00010000,
    0b00100000,
    0b01000000,
    0b10000000,
);
var MASKS_AND_ = Uint8Array.of(
    0b11111110,
    0b11111101,
    0b11111011,
    0b11110111,
    0b11101111,
    0b11011111,
    0b10111111,
    0b01111111,
);

function BitArray(s) {
    s = (s | 0) >>> 0;
    this.l_ = (s|0) >>> 0;
    this.a_ = new Uint8Array((s + 7 | 0) >>> 3);
}

Object.defineProperty(BitArray.prototype, 'readBit', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            i = (i | 0) >>> 0;
            return (this.a_[i >>> 3] & MASKS_OR_[i & 7]) == MASKS_OR_[i & 7];
    }}
});

Object.defineProperty(BitArray.prototype, 'writeBit1', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            i = (i|0) >>> 0;
            this.a_[i >>> 3] = this.a_[i >>> 3] | MASKS_OR_[i & 7];
    }}
});

Object.defineProperty(BitArray.prototype, 'writeBit0', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            i = (i|0) >>> 0;
            this.a_[i >>> 3] = this.a_[i >>> 3] & MASKS_AND_[i & 7];
    }}
});


Object.defineProperty(BitArray.prototype, 'clear', {
    get: function() {
        "use strict";
        return function() {
            "use strict";
            this.a_.fill(0, 0, this.a_.length);
    }}
});

Object.defineProperty(BitArray.prototype, 'length', {
    get: function() {
        "use strict";
        return (this.l_ | 0) >>> 0;
    }
});

var SetFixed = function(size){
    "use strict";
    if (!(this instanceof SetFixed)) {
        return new SetFixed(size);
    }
    if(typeof size == "object") {
        this.set_ = new Set(Array.from(size));
        this.s_ = this.set_.size;
        this.indexes_ = Array.from(this.set_);
        this.max_ = 0;
        for(var i = 0, l = this.indexes_.length|0; (i|0) < (l|0); i = i + 1 | 0){if((this.max_|0) < (this.indexes_[i|0]|0)){ this.max_ = this.indexes_[i|0]|0; }}
        this.a_ = new BitArray(this.max_);
        for(var i = 0, l = this.indexes_.length|0; (i|0) < (l|0); i = i + 1 | 0){this.a_.writeBit1(this.indexes_[i|0]|0); }

        delete this.set_;
        delete this.indexes_;
        delete this.max_;
    }else {

        this.a_ = new BitArray(size);
        this.s_ = 0;
    }
};

Object.defineProperty(SetFixed.prototype, 'size', {
    get: function() {
        "use strict";
        return (this.s_ | 0) >>> 0;
    }
});
Object.defineProperty(SetFixed.prototype, 'length', {
    get: function() {
        "use strict";
        return (this.a_.length | 0) >>> 0;
    }
});
Object.defineProperty(SetFixed.prototype, 'indexes', {
    get: function() {
        "use strict";
        var a = [], l = this.length|0, i = 0, m = 0;
        for (; (i|0) < (l|0); i = (i + 1 | 0)>>>0) {
            if(this.a_.readBit(i|0)){a.push(i|0);}
        }
        m = (a[a.length-1|0]|0) >>> 0;
        if((m|0) <= 0xFF) {
            return Uint8Array.from(a);
        }else if ((m|0) <= 0xFFFF) {
            return Uint16Array.from(a);
        }else if((m|0) <= 0xFFFFFFFF) {
            return Uint32Array.from(a);
        }else {
            return BigUint64Array.from(a);
        }
    }
});
Object.defineProperty(SetFixed.prototype, 'has', {
    get: function() {  "use strict"; return function(i) {
        "use strict";
        i = (i|0) >>> 0;
        return this.a_.readBit(i|0);
    }}
});

Object.defineProperty(SetFixed.prototype, 'add', {
    get: function() {  "use strict"; return function(i) {
        "use strict";

        i = (i|0) >>> 0;
        if((this.length|0) < (i|0)){
            this.a_ = new BitArray(i+i|0);
            var a = this.indexes, l = a.length|0, x = 0;
            for(;(x|0)<(l|0); x = x + 1) {
                this.a_.writeBit1(a[x|0]|0);
            }
            this.s_ = (a.length|0)>>>0;
        }

        if(!this.a_.readBit(i | 0)){
            this.s_ = (this.s_ + 1 | 0) >>> 0;
        }

        this.a_.writeBit1(i | 0);
    }}
});

Object.defineProperty(SetFixed.prototype, 'delete', {
    get: function() {  "use strict"; return function(i) {
        "use strict";
        i = (i|0) >>> 0;
        if(this.a_.readBit(i | 0)){
            this.a_.writeBit0(i | 0);
            this.s_ = (this.s_ - 1 | 0) >>> 0;
        }

    }}
});

Object.defineProperty(SetFixed.prototype, 'clear', {
    get: function() {  "use strict"; return function() {
        "use strict";
        this.a_.clear();
        this.s_ = 0;
    }}
});

Object.defineProperty(SetFixed.prototype, 'forEach', {
    get: function() {
        "use strict"; return function(func) {
            "use strict";
            this.indexes.forEach(func);
        }
    }
});

Object.defineProperty(SetFixed.prototype, 'map', {
    get: function() {
        "use strict";
        return function(func) {
            "use strict";
            return this.indexes.map(func);
    }}
});

Object.defineProperty(SetFixed.prototype, 'filter', {
    get: function() {
        "use strict";
        return function(func) {
            "use strict";
            return this.indexes.filter(func);
    }}
});

module.exports = SetFixed;