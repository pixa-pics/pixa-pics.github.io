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
function uint_equal(a, b) {
    "use strict";
    a = (a | 0) >>> 0;
    b = (b | 0) >>> 0;
    return ((a | 0) >>> 0) == ((b | 0) >>> 0);
}
function plus_uint(a, b) {
    "use strict";
    a = (a | 0) >>> 0;
    b = (b | 0) >>> 0;
    return (a + b | 0) >>> 0;
}
function minus_uint(a, b) {
    "use strict";
    a = (a | 0) >>> 0;
    b = (b | 0) >>> 0;
    return (a - b | 0) >>> 0;
}
function uint_bit_and(a, b) {
    "use strict";
    a = (a | 0) >>> 0;
    b = (b | 0) >>> 0;
    return ((a & b)|0) >>> 0;
}
function format_uint(n) {
    "use strict";
    return (n | 0) >>> 0;
}



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

    this.M_A_ = this.l_ > 0xFFFF ? new Uint32Array(32): this.l_ > 0xFF ? new Uint16Array(32): new Uint8Array(32);
}

Object.defineProperty(BitArray.prototype, 'readFourBytes', {
    get: function() {
        "use strict";
        return function(i, xor) {
            "use strict";
            i = format_uint(i);

            var y = 0, b = format_uint(this.a32((i | 0) >>> 5));

            if(typeof xor != "undefined"){
                b = format_uint(b ^ xor.a32((i | 0) >>> 5));
            }

            if(uint_bit_and(b, this.M_OR_[0]) == format_uint(this.M_OR_[0])){ this.M_A_[(y|0) >>> 0] = format_uint(i); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[1]) == format_uint(this.M_OR_[1])){ this.M_A_[format_uint(y)] = plus_uint(i,1); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[2]) == format_uint(this.M_OR_[2])){ this.M_A_[format_uint(y)] = plus_uint(i,2); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[3]) == format_uint(this.M_OR_[3])){ this.M_A_[format_uint(y)] = plus_uint(i,3); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[4]) == format_uint(this.M_OR_[4])){ this.M_A_[format_uint(y)] = plus_uint(i,4); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[5]) == format_uint(this.M_OR_[5])){ this.M_A_[format_uint(y)] = plus_uint(i,5); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[6]) == format_uint(this.M_OR_[6])){ this.M_A_[format_uint(y)] = plus_uint(i,6); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[7]) == format_uint(this.M_OR_[7])){ this.M_A_[format_uint(y)] = plus_uint(i,7); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[8]) == format_uint(this.M_OR_[8])){ this.M_A_[format_uint(y)] = plus_uint(i,8); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[9]) == format_uint(this.M_OR_[9])){ this.M_A_[format_uint(y)] = plus_uint(i,9); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[10]) == format_uint(this.M_OR_[10])){ this.M_A_[format_uint(y)] = plus_uint(i,10); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[11]) == format_uint(this.M_OR_[11])){ this.M_A_[format_uint(y)] = plus_uint(i,11); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[12]) == format_uint(this.M_OR_[12])){ this.M_A_[format_uint(y)] = plus_uint(i,12); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[13]) == format_uint(this.M_OR_[13])){ this.M_A_[format_uint(y)] = plus_uint(i,13); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[14]) == format_uint(this.M_OR_[14])){ this.M_A_[format_uint(y)] = plus_uint(i,14); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[15]) == format_uint(this.M_OR_[15])){ this.M_A_[format_uint(y)] = plus_uint(i,15); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[16]) == format_uint(this.M_OR_[16])){ this.M_A_[format_uint(y)] = plus_uint(i,16); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[17]) == format_uint(this.M_OR_[17])){ this.M_A_[format_uint(y)] = plus_uint(i,17); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[18]) == format_uint(this.M_OR_[18])){ this.M_A_[format_uint(y)] = plus_uint(i,18); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[19]) == format_uint(this.M_OR_[19])){ this.M_A_[format_uint(y)] = plus_uint(i,19); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[20]) == format_uint(this.M_OR_[20])){ this.M_A_[format_uint(y)] = plus_uint(i,20); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[21]) == format_uint(this.M_OR_[21])){ this.M_A_[format_uint(y)] = plus_uint(i,21); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[22]) == format_uint(this.M_OR_[22])){ this.M_A_[format_uint(y)] = plus_uint(i,22); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[23]) == format_uint(this.M_OR_[23])){ this.M_A_[format_uint(y)] = plus_uint(i,23); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[24]) == format_uint(this.M_OR_[24])){ this.M_A_[format_uint(y)] = plus_uint(i,24); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[25]) == format_uint(this.M_OR_[25])){ this.M_A_[format_uint(y)] = plus_uint(i,25); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[26]) == format_uint(this.M_OR_[26])){ this.M_A_[format_uint(y)] = plus_uint(i,26); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[27]) == format_uint(this.M_OR_[27])){ this.M_A_[format_uint(y)] = plus_uint(i,27); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[28]) == format_uint(this.M_OR_[28])){ this.M_A_[format_uint(y)] = plus_uint(i,28); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[29]) == format_uint(this.M_OR_[29])){ this.M_A_[format_uint(y)] = plus_uint(i,29); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[30]) == format_uint(this.M_OR_[30])){ this.M_A_[format_uint(y)] = plus_uint(i,30); y = plus_uint(y, 1); }
            if(uint_bit_and(b, this.M_OR_[31]) == format_uint(this.M_OR_[31])){ this.M_A_[format_uint(y)] = plus_uint(i,31); y = plus_uint(y, 1); }


            return this.M_A_.subarray(0, format_uint(y));
        }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(BitArray.prototype, 'a32', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            return this.a_[format_uint(i)];
        }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(BitArray.prototype, 'readBit', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            i = format_uint(i);
            var m_or = format_uint(this.M_OR_[i & 31]);
            i = (i | 0) >>> 5;
            return format_uint(this.a_[i] & m_or) == format_uint(m_or);
        }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(BitArray.prototype, 'writeBit1', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            i = format_uint(i);
            var m_or = format_uint(this.M_OR_[i & 31]);
            i = (i | 0) >>> 5;
            this.a_[i] = format_uint(this.a_[i] | m_or);
        }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(BitArray.prototype, 'writeBit0', {
    get: function() {
        "use strict";
        return function(i) {
            "use strict";
            i = format_uint(i);
            var m_and = format_uint(this.M_AND_[i & 31]);
            i = (i | 0) >>> 5;
            this.a_[i] = format_uint(this.a_[i] & m_and);
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
        return format_uint(this.l_);
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

        this.max_ = 0;
        this.c_= null;

        if(size instanceof Uint8ClampedArray || size instanceof Uint8Array || size instanceof Uint16Array || size instanceof Uint32Array) {
            this.set_ = new Set(size);
            this.s_ = this.set_.size;
            this.c_ = size instanceof Uint32Array ? Uint32Array: size instanceof Uint16Array ? Uint16Array: Uint8Array;
            this.indexes_ = this.c_.from(this.set_);
        }else {
            if (size instanceof Set) {
                this.set_ = size;
            } else {
                this.set_ = new Set(Array.from(size));
            }

            this.s_ = this.set_.size;
            this.indexes_ = Array.from(this.set_);
        }

        for(var i = 0, l = this.indexes_.length|0; format_uint(i) < format_uint(l); i = plus_uint(i, 1 )){if(format_uint(this.max_) < format_uint(this.indexes_[format_uint(i)])){ this.max_ = format_uint(this.indexes_[format_uint(i)]); }}
        this.a_ = new BitArray(this.max_);
        for(var i = 0, l = this.indexes_.length|0; format_uint(i) < format_uint(l); i = plus_uint(i, 1 )){this.a_.writeBit1(format_uint(this.indexes_[format_uint(i)])); }

        delete this.set_;
        delete this.indexes_;
        delete this.max_;
        delete this.c_;

    }else {

        this.a_ = new BitArray(size|0);
        this.s_ = 0;
    }
};

Object.defineProperty(SetFixed.prototype, 'a', {
    get: function() {
        "use strict";
        return this.a_;
    },
    enumerable: false,
    configurable: false
});
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
        var c = this.length > 0xFFFF ? Uint32Array: this.length > 0xFF ? Uint16Array: Uint8Array, a = new c(this.s_), l = this.length|0, i = 0, y = 0, p = new Uint32Array(0);
        for (; format_uint(i) < format_uint(l); i = plus_uint(i, 32)) {
            p = this.a.readFourBytes(format_uint(i));
            a.set(p, format_uint(y));
            y = plus_uint(y, p.length);
        }
        return a;
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(SetFixed.prototype, 'indexes_xor', {
    get: function() {
        "use strict";
        return function(secondary_set_fixed) {
            "use strict";
            var c = this.length > 0xFFFF ? Uint32Array: this.length > 0xFF ? Uint16Array: Uint8Array, a = new c(this.s_), l = this.length|0, i = 0, y = 0, p = new Uint32Array(0);
            for (; format_uint(i) < format_uint(l); i = plus_uint(i, 32)) {
                p = this.a.readFourBytes(i|0, secondary_set_fixed.a);
                a.set(p, format_uint(y));
                y = plus_uint(y, p.length);
            }
            return a;
        }
    },
    enumerable: false,
    configurable: false
});
Object.defineProperty(SetFixed.prototype, 'has', {
    get: function() {  "use strict"; return function(i) {
        "use strict";
        return this.a_.readBit(format_uint(i));
    }},
    enumerable: false,
    configurable: false
});
Object.defineProperty(SetFixed.prototype, 'hasnt', {
    get: function() {  "use strict"; return function(i) {
        "use strict";
        return !this.a_.readBit(format_uint(i));
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
            for(;(x|0)<(l|0); x = (x + 1 | 0) >>> 0) {
                this.a_.writeBit1(a[x|0]|0);
            }
            this.s_ = (a.length|0)>>>0;
        }

        if(this.hasnt(i | 0)){
            this.s_ = (this.s_ + 1 | 0) >>> 0;
            this.a_.writeBit1((i|0)>>>0);
        }
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'delete', {
    get: function() {  "use strict"; return function(i) {
        "use strict";
        i = (i|0) >>> 0;
        if(this.has(i | 0)){
            this.a_.writeBit0((i|0)>>>0);
            this.s_ = (this.s_ - 1 | 0) >>> 0;
        }

    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'addUnsafe', {
    get: function() {  "use strict"; return function(i) {
        "use strict";

        i = format_uint(i);
        if(this.hasnt(i)){
            this.a_.writeBit1(i);
            this.s_ = plus_uint(this.s_, 1);
        }

    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'deleteUnsafe', {
    get: function() {  "use strict"; return function(i) {
        "use strict";
        i = (i|0) >>> 0;
        if(this.has(i | 0)){
            this.a_.writeBit0((i|0)>>>0);
            this.s_ = (this.s_ - 1 | 0) >>> 0;
        }
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'bulkAdd', {
    get: function() {  "use strict"; return function(a) {
        "use strict";

        var l = a.length|0, i = 0;
        for(;format_uint(i) < format_uint(l); i = plus_uint(i,1)) {
            this.add(format_uint(a[format_uint(i)]));
        }
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'bulkDelete', {
    get: function() {  "use strict"; return function(a) {
        "use strict";
        var l = a.length|0, i = 0;
        for(;format_uint(i) < format_uint(l); i = plus_uint(i,1)) {
            this.delete(format_uint(a[format_uint(i)]));
        }

    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SetFixed.prototype, 'invert', {
    get: function() {  "use strict"; return function() {
        "use strict";
        var i = this.indexes;
        this.charge();
        this.bulkDelete(i);
    }}
});

Object.defineProperty(SetFixed.prototype, 'clear', {
    get: function() {  "use strict"; return function() {
        "use strict";
        this.a_.clear();
        this.s_ = 0;
    }}
});
Object.defineProperty(SetFixed.prototype, 'clearAndBulkAdd', {
    get: function() {  "use strict"; return function(a) {
        "use strict";
        this.clear();
        this.bulkAdd(a);
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

if(module.exports) {

    module.exports = {SetFixed: SetFixed, BitArray: BitArray};
}else {
    window.BitArray = BitArray;
    window.SetFixed = SetFixed;
}

