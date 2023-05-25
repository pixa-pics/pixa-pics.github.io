/*
MIT License
Copyright (c) 2023 Affolter Matias
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function BitArray(s) {
    s = (s | 0) >>> 0;
    this.l_ = s|0;
    this.a_ = new Uint32Array((this.l_ + 31 | 0) >>> 5);
    this.M_OR_ = Uint32Array.of(
        0b00000000000000000000000000000001,
        0b00000000000000000000000000000010,
        0b00000000000000000000000000000100,
        0b00000000000000000000000000001000,
        0b00000000000000000000000000010000,
        0b00000000000000000000000000100000,
        0b00000000000000000000000001000000,
        0b00000000000000000000000010000000,
        0b00000000000000000000000100000000,
        0b00000000000000000000001000000000,
        0b00000000000000000000010000000000,
        0b00000000000000000000100000000000,
        0b00000000000000000001000000000000,
        0b00000000000000000010000000000000,
        0b00000000000000000100000000000000,
        0b00000000000000001000000000000000,
        0b00000000000000010000000000000000,
        0b00000000000000100000000000000000,
        0b00000000000001000000000000000000,
        0b00000000000010000000000000000000,
        0b00000000000100000000000000000000,
        0b00000000001000000000000000000000,
        0b00000000010000000000000000000000,
        0b00000000100000000000000000000000,
        0b00000001000000000000000000000000,
        0b00000010000000000000000000000000,
        0b00000100000000000000000000000000,
        0b00001000000000000000000000000000,
        0b00010000000000000000000000000000,
        0b00100000000000000000000000000000,
        0b01000000000000000000000000000000,
        0b10000000000000000000000000000000
    );

    this.M_AND_ = Uint32Array.of(
        0b11111111111111111111111111111110,
        0b11111111111111111111111111111101,
        0b11111111111111111111111111111011,
        0b11111111111111111111111111110111,
        0b11111111111111111111111111101111,
        0b11111111111111111111111111011111,
        0b11111111111111111111111110111111,
        0b11111111111111111111111101111111,
        0b11111111111111111111111011111111,
        0b11111111111111111111110111111111,
        0b11111111111111111111101111111111,
        0b11111111111111111111011111111111,
        0b11111111111111111110111111111111,
        0b11111111111111111101111111111111,
        0b11111111111111111011111111111111,
        0b11111111111111110111111111111111,
        0b11111111111111101111111111111111,
        0b11111111111111011111111111111111,
        0b11111111111110111111111111111111,
        0b11111111111101111111111111111111,
        0b11111111111011111111111111111111,
        0b11111111110111111111111111111111,
        0b11111111101111111111111111111111,
        0b11111111011111111111111111111111,
        0b11111110111111111111111111111111,
        0b11111101111111111111111111111111,
        0b11111011111111111111111111111111,
        0b11110111111111111111111111111111,
        0b11101111111111111111111111111111,
        0b11011111111111111111111111111111,
        0b10111111111111111111111111111111,
        0b01111111111111111111111111111111
    );
}

Object.defineProperty(BitArray.prototype, 'readFourBytes', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            i = (i | 0) >>> 0;
            var a = [], b = this.a_[(i | 0) >>> 5];

            if((b & this.M_OR_[0]|0) == (this.M_OR_[0]|0)){ a.push(i|0) }
            if((b & this.M_OR_[1]|0) == (this.M_OR_[1]|0)){ a.push(i+1|0) }
            if((b & this.M_OR_[2]|0) == (this.M_OR_[2]|0)){ a.push(i+2|0) }
            if((b & this.M_OR_[3]|0) == (this.M_OR_[3]|0)){ a.push(i+3|0) }
            if((b & this.M_OR_[4]|0) == (this.M_OR_[4]|0)){ a.push(i+4|0) }
            if((b & this.M_OR_[5]|0) == (this.M_OR_[5]|0)){ a.push(i+5|0) }
            if((b & this.M_OR_[6]|0) == (this.M_OR_[6]|0)){ a.push(i+6|0) }
            if((b & this.M_OR_[7]|0) == (this.M_OR_[7]|0)){ a.push(i+7|0) }
            if((b & this.M_OR_[8]|0) == (this.M_OR_[8]|0)){ a.push(i+8|0) }
            if((b & this.M_OR_[9]|0) == (this.M_OR_[9]|0)){ a.push(i+9|0) }
            if((b & this.M_OR_[10]|0) == (this.M_OR_[10]|0)){ a.push(i+10|0) }
            if((b & this.M_OR_[11]|0) == (this.M_OR_[11]|0)){ a.push(i+11|0) }
            if((b & this.M_OR_[12]|0) == (this.M_OR_[12]|0)){ a.push(i+12|0) }
            if((b & this.M_OR_[13]|0) == (this.M_OR_[13]|0)){ a.push(i+13|0) }
            if((b & this.M_OR_[14]|0) == (this.M_OR_[14]|0)){ a.push(i+14|0) }
            if((b & this.M_OR_[15]|0) == (this.M_OR_[15]|0)){ a.push(i+15|0) }
            if((b & this.M_OR_[16]|0) == (this.M_OR_[16]|0)){ a.push(i+16|0) }
            if((b & this.M_OR_[17]|0) == (this.M_OR_[17]|0)){ a.push(i+17|0) }
            if((b & this.M_OR_[18]|0) == (this.M_OR_[18]|0)){ a.push(i+18|0) }
            if((b & this.M_OR_[19]|0) == (this.M_OR_[19]|0)){ a.push(i+19|0) }
            if((b & this.M_OR_[20]|0) == (this.M_OR_[20]|0)){ a.push(i+20|0) }
            if((b & this.M_OR_[21]|0) == (this.M_OR_[21]|0)){ a.push(i+21|0) }
            if((b & this.M_OR_[22]|0) == (this.M_OR_[22]|0)){ a.push(i+22|0) }
            if((b & this.M_OR_[23]|0) == (this.M_OR_[23]|0)){ a.push(i+23|0) }
            if((b & this.M_OR_[24]|0) == (this.M_OR_[24]|0)){ a.push(i+24|0) }
            if((b & this.M_OR_[25]|0) == (this.M_OR_[25]|0)){ a.push(i+25|0) }
            if((b & this.M_OR_[26]|0) == (this.M_OR_[26]|0)){ a.push(i+26|0) }
            if((b & this.M_OR_[27]|0) == (this.M_OR_[27]|0)){ a.push(i+27|0) }
            if((b & this.M_OR_[28]|0) == (this.M_OR_[28]|0)){ a.push(i+28|0) }
            if((b & this.M_OR_[29]|0) == (this.M_OR_[29]|0)){ a.push(i+29|0) }
            if((b & this.M_OR_[30]|0) == (this.M_OR_[30]|0)){ a.push(i+30|0) }
            if((b & this.M_OR_[31]|0) == (this.M_OR_[31]|0)){ a.push(i+31|0) }


            return a;
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(BitArray.prototype, 'readBit', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            i = (i | 0) >>> 0;
            var m_or = this.M_OR_[i & 31];
            i = (i | 0) >>> 5;
            return (this.a_[i|0] & m_or | 0) == (m_or|0);
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(BitArray.prototype, 'writeBit1', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            i = (i | 0) >>> 0;
            var m_or = this.M_OR_[i & 31];
            i = (i | 0) >>> 5;
            this.a_[i|0] = this.a_[i|0] | m_or;
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(BitArray.prototype, 'writeBit0', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            i = (i | 0) >>> 0;
            var m_and = this.M_AND_[i & 31];
            i = (i | 0) >>> 5;
            this.a_[i|0] = this.a_[i|0] & m_and;
    }},
    enumerable: false,
    configurable: false
});


Object.defineProperty(BitArray.prototype, 'clear', {
    get: function() {
        "use strict";
        return function() {
            "use strict";
            this.a_.fill(0);
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(BitArray.prototype, 'charge', {
    get: function() {
        "use strict";
        return function() {
            "use strict";
            this.a_.fill(0xFFFFFFFF);
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(BitArray.prototype, 'length', {
    get: function() {
        "use strict";
        return (this.l_ | 0) >>> 0;
    },
    enumerable: false,
    configurable: false
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
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(SetFixed.prototype, 'length', {
    get: function() {
        "use strict";
        return (this.a_.length | 0) >>> 0;
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(SetFixed.prototype, 'indexes', {
    get: function() {
        "use strict";
        var a = [], l = this.length|0, i = 0;
        for (; (i|0) < (l|0); i = (i + 32 | 0)>>>0) {
            a.push.apply(a, this.a_.readFourBytes(i|0));
        }
        return a;
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(SetFixed.prototype, 'has', {
    get: function() {  "use strict"; return function(i) {
        "use strict";
        i = (i|0) >>> 0;
        return this.a_.readBit(i|0);
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'add', {
    get: function() {  "use strict"; return function(i) {
        "use strict";

        i = (i|0) >>> 0;
        if((this.length|0) < (i|0)){
            var a = this.indexes, l = a.length|0, x = 0;
            this.a_ = new BitArray(i+i|0);
            for(;(x|0)<(l|0); x = x + 1 | 0) {
                this.a_.writeBit1(a[x|0]|0);
            }
            this.s_ = (a.length|0)>>>0;
        }

        if(!this.a_.readBit(i | 0)){
            this.s_ = (this.s_ + 1 | 0) >>> 0;
        }

        this.a_.writeBit1(i | 0);
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'delete', {
    get: function() {  "use strict"; return function(i) {
        "use strict";
        i = (i|0) >>> 0;
        if(this.a_.readBit(i | 0)){
            this.a_.writeBit0(i | 0);
            this.s_ = (this.s_ - 1 | 0) >>> 0;
        }

    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'clear', {
    get: function() {  "use strict"; return function() {
        "use strict";
        this.a_.clear();
        this.s_ = 0;
    }}
});

Object.defineProperty(SetFixed.prototype, 'charge', {
    get: function() {  "use strict"; return function() {
        "use strict";
        this.a_.charge();
        this.s_ = this.a_.length;
    }}
});

Object.defineProperty(SetFixed.prototype, 'forEach', {
    get: function() {
        "use strict"; return function(func) {
            "use strict";
            this.indexes.forEach(func);
        }
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'map', {
    get: function() {
        "use strict";
        return function(func) {
            "use strict";
            return this.indexes.map(func);
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'filter', {
    get: function() {
        "use strict";
        return function(func) {
            "use strict";
            return this.indexes.filter(func);
    }},
    enumerable: false,
    configurable: false
});

module.exports = SetFixed;