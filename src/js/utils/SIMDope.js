"use strict";
/*
The MIT License (MIT)

Copyright (c) 2022 - 2022 Matias Affolter

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
var operators = {
    boolean_and(a, b) { return a && b; },
    binary_and(a, b) { return a & b; },
    binary_or(a, b) { return a | b; },
    binary_xor(a, b) { return a ^ b; },
    binary_add(a, b) { return a + b; },
    binary_sub(a, b) { return a - b; },
    binary_mul(a, b) { return a * b; },
    binary_div(a, b) { return a / b; },
    binary_equal(a, b) { return a == b; },
    binary_not_equal(a, b) { return a != b; },
    binary_less(a, b) { return a < b; },
    binary_less_equal(a, b) { return a <= b; },
    binary_greater(a, b) { return a > b; },
    binary_greater_equal(a, b) { return a >= b; },
    binary_shift_left(a, bits) { return a << bits; },
    binary_shift_right_arithmetic(a, bits) { return a >> bits; },
    binary_shift_right_logical(a, bits) { return a >>> bits; },
    min_num(x, y){return x != x ? y : y != y ? x : Math.min(x, y);},
    max_num(x, y){return x != x ? y : y != y ? x : Math.max(x, y);},
    modulo_int(a, b) {return a%b|0; },
    modulo_uint(a, b) { return (a%b|0)>>>0; },
    plus_int(a, b) {return a+b|0; },
    minus_int(a, b) { return a-b|0; },
    plus_uint(a, b) {return (a+b|0)>>>0; },
    minus_uint(a, b) { return (a-b|0)>>>0; },
    multiply_int(a, b) {return a*b|0; },
    divide_int(a, b) { return a/b|0; },
    multiply_uint(a, b) {return (a*b|0)>>>0; },
    divide_uint(a, b) { return (a/b|0)>>>0; },
    divide_four_uint(n) { return (n>>2|0)>>>0; },
    abs_int(n) {return (n|0) < 0 ? (-n|0)>>>0: (n|0)>>>0; },
    max_int(a, b) {return (a|0) > (b|0) ? (b|0): (a|0); },
    min_int(a, b) {return (a|0) > (b|0) ? (a|0): (b|0); },
    max_uint(a, b) {return ((a|0)>>>0) > ((b|0)>>>0) ? ((b|0)>>>0): ((a|0)>>>0); },
    min_uint(a, b) {return ((a|0)>>>0) > ((b|0)>>>0) ? ((a|0)>>>0): ((b|0)>>>0); },
    clamp_int( x, min, max ) {x = x - ((x - max) & ((max - x) >> 31));return x - ((x - min) & ((x - min) >> 31)); },
    clamp_uint8(n) {return ((n|0)>>>0) & 0xFF; },
    clamp_uint32(n) {return ((n|0)>>>0) & 0xFFFFFFFF; },
    int_equal(a, b) { return (a|0) == (b|0); },
    int_not_equal(a, b) { return (a|0) != (b|0); },
    int_less(a, b) { return (a|0) < (b|0); },
    int_less_equal(a, b) { return (a|0) <= (b|0); },
    int_greater(a, b) { return (a|0) > (b|0); },
    int_greater_equal(a, b) { return (a|0) >= (b|0); },
    uint_equal(a, b) { return ((a|0)>>>0) == ((b|0)>>>0); },
    uint_not_equal(a, b) { return ((a|0)>>>0) != ((b|0)>>>0); },
    uint_less(a, b) { return ((a|0)>>>0) < ((b|0)>>>0); },
    uint_less_equal(a, b) { return ((a|0)>>>0) <= ((b|0)>>>0); },
    uint_greater(a, b) { return ((a|0)>>>0) > ((b|0)>>>0); },
    uint_greater_equal(a, b) { return ((a|0)>>>0) >= ((b|0)>>>0); },
    format_int(n) {return (n|0);},
    format_uint(n) {return (n|0)>>>0;},
};

// Number object with 4 times 0-255
var SIMDopeUint8x4 = function(with_buffer){
    if (!(this instanceof SIMDopeUint8x4)) {
        return new SIMDopeUint8x4(with_buffer);
    }
    this.storage_ = new Uint8ClampedArray(with_buffer.buffer);
};

// Number object other means of construct
SIMDopeUint8x4.new_zero = function() {
    var uint8ca = new Uint8ClampedArray(4);
    return SIMDopeUint8x4(uint8ca);
};
SIMDopeUint8x4.new_splat = function(n) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = n;
        uint8ca[1] = n;
        uint8ca[2] = n;
        uint8ca[3] = n;
    return SIMDopeUint8x4(uint8ca);
};
SIMDopeUint8x4.new_of = function(a, b, c, d) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = a;
        uint8ca[1] = b;
        uint8ca[2] = c;
        uint8ca[3] = d;
    return SIMDopeUint8x4(uint8ca);
};
SIMDopeUint8x4.new_safe_of = function(a, b, c, d) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = operators.clamp_uint8(a);uint8ca[1] = operators.clamp_uint8(b);uint8ca[2] = operators.clamp_uint8(c);uint8ca[3] = operators.clamp_uint8(d);
    return SIMDopeUint8x4(uint8ca);
};
SIMDopeUint8x4.new_from = function(other) {
    return SIMDopeUint8x4(other);
};

SIMDopeUint8x4.new_array = function(array) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = array[0];
        uint8ca[1] = array[1];
        uint8ca[2] = array[2];
        uint8ca[3] = array[3];
    return SIMDopeUint8x4(uint8ca);
};

SIMDopeUint8x4.new_array_safe = function(array) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = operators.clamp_uint8(array[0]);
        uint8ca[1] = operators.clamp_uint8(array[1]);
        uint8ca[2] = operators.clamp_uint8(array[2]);
        uint8ca[3] = operators.clamp_uint8(array[3]);
    return SIMDopeUint8x4(uint8ca);
};

SIMDopeUint8x4.new_bool = function(a, b, c, d) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = a ? 0x1 : 0x0;
        uint8ca[1] = b ? 0x1 : 0x0;
        uint8ca[2] = c ? 0x1 : 0x0;
        uint8ca[3] = d ? 0x1 : 0x0;
    return SIMDopeUint8x4(uint8ca);
}

// Properties of number object
Object.defineProperty(SIMDopeUint8x4.prototype, 'a', {
    get: function() { return this.storage_[0]; },
});
Object.defineProperty(SIMDopeUint8x4.prototype, 'b', {
    get: function() { return this.storage_[1]; },
});
Object.defineProperty(SIMDopeUint8x4.prototype, 'c', {
    get: function() { return this.storage_[2]; },
});
Object.defineProperty(SIMDopeUint8x4.prototype, 'd', {
    get: function() { return this.storage_[3]; },
});

Object.defineProperty(SIMDopeUint8x4.prototype, 'uint32', {
    get: function() {return (this.storage_[0] >> 24) | (this.storage_[1] >> 16) | (this.storage_[2] >> 8) | this.storage_[3];}
});

Object.defineProperty(SIMDopeUint8x4.prototype, 'buffer', {
    get: function() { return this.storage_.buffer; }
});


// get a the number object wile modifying property values
SIMDopeUint8x4.with_a = function(t, a) {
    var uint8ca = new Uint8ClampedArray(t.buffer);
    uint8ca[0] = a;
    return SIMDopeUint8x4(uint8ca);
};
SIMDopeUint8x4.with_b = function(t, b) {
    var uint8ca = new Uint8ClampedArray(t.buffer);
    uint8ca[1] = b;
    return SIMDopeUint8x4(uint8ca);
};
SIMDopeUint8x4.with_c = function(t, c) {
    var uint8ca = new Uint8ClampedArray(t.buffer);
    uint8ca[2] = c;
    return SIMDopeUint8x4(uint8ca);
};
SIMDopeUint8x4.with_d = function(t, d) {
    var uint8ca = new Uint8ClampedArray(t.buffer);
    uint8ca[3] = d;
    return SIMDopeUint8x4(uint8ca);
};

// Get various operation on number object
SIMDopeUint8x4.sumarray = function(other, start, end) {
    start = start | 0;
    end = end | 4;
    return new Uint8ClampedArray(other.buffer).slice(start, end).reduce(operators.plus_uint, 0);
};
SIMDopeUint8x4.subarray = function(other, start, end) {
    start = start | 0;
    end = end | 4;
    return new Uint8ClampedArray(other.buffer).subarray(start, end);
};

SIMDopeUint8x4.slice = function(other, start, end) {
    start = start | 0;
    end = end | 4;
    return new Uint8ClampedArray(other.buffer).slice(start, end);
};

// from a given number object and a second one, test values and return boolean
SIMDopeUint8x4.is_equal = function(t, other) {
    return SIMDopeUint8x4.new_bool(
        operators.uint_equal(t.a, other.a),
        operators.uint_equal(t.b, other.b),
        operators.uint_equal(t.c, other.c),
        operators.uint_equal(t.d, other.d),
    );
};
SIMDopeUint8x4.is_greater = function(t, other) {
    return SIMDopeUint8x4.new_bool(
        operators.uint_greater(t.a, other.a),
        operators.uint_greater(t.b, other.b),
        operators.uint_greater(t.c, other.c),
        operators.uint_greater(t.d, other.d),
    );
};
SIMDopeUint8x4.is_less = function(t, other) {
    return SIMDopeUint8x4.new_bool(
        operators.uint_less(t.a, other.a),
        operators.uint_less(t.b, other.b),
        operators.uint_less(t.c, other.c),
        operators.uint_less(t.d, other.d),
    );
};
SIMDopeUint8x4.is_greater_equal = function(t, other) {
    return SIMDopeUint8x4.new_bool(
        operators.uint_greater_equal(t.a, other.a),
        operators.uint_greater_equal(t.b, other.b),
        operators.uint_greater_equal(t.c, other.c),
        operators.uint_greater_equal(t.d, other.d),
    );
};
SIMDopeUint8x4.is_less_equal = function(t, other) {
    return SIMDopeUint8x4.new_bool(
        operators.uint_less_equal(t.a, other.a),
        operators.uint_less_equal(t.b, other.b),
        operators.uint_less_equal(t.c, other.c),
        operators.uint_less_equal(t.d, other.d),
    );
};

// From a given operation and number object perform the operation and return a the number object
SIMDopeUint8x4.plus = function(t, other) {
    var temp = new Uint8ClampedArray(t.buffer);
    temp[0] = operators.clamp_uint8(operators.min_int(255, operators.plus_int(t.a, other.a)));
    temp[1] = operators.clamp_uint8(operators.min_int(255, operators.plus_int(t.b, other.b)));
    temp[2] = operators.clamp_uint8(operators.min_int(255, operators.plus_int(t.c, other.c)));
    temp[3] = operators.clamp_uint8(operators.min_int(255, operators.plus_int(t.d, other.d)));
    return SIMDopeUint8x4(temp)
}
SIMDopeUint8x4.minus = function(t, other) {
    var temp = new Uint8ClampedArray(t.buffer);
    temp[0] = operators.clamp_uint8(operators.max_int(0, operators.minus_int(t.a, other.a)));
    temp[1] = operators.clamp_uint8(operators.max_int(0, operators.minus_int(t.b, other.b)));
    temp[2] = operators.clamp_uint8(operators.max_int(0, operators.minus_int(t.c, other.c)));
    temp[3] = operators.clamp_uint8(operators.max_int(0, operators.minus_int(t.d, other.d)));
    return SIMDopeUint8x4(temp)
}
SIMDopeUint8x4.average = function(t, other) {
    var temp = new Uint8ClampedArray(t.buffer);
    temp[0] = operators.clamp_uint8(operators.divide_uint(operators.plus_int(t.a, other.a), 2));
    temp[1] = operators.clamp_uint8(operators.divide_uint(operators.plus_int(t.b, other.b), 2));
    temp[2] = operators.clamp_uint8(operators.divide_uint(operators.plus_int(t.c, other.c), 2));
    temp[3] = operators.clamp_uint8(operators.divide_uint(operators.plus_int(t.d, other.d), 2));
    return SIMDopeUint8x4(temp)
}
SIMDopeUint8x4.scale_of = function(t, of) {
    var temp = new Uint8ClampedArray(4);
    temp[0] = operators.clamp_uint8(operators.multiply_uint(t.a, of));
    temp[1] = operators.clamp_uint8(operators.multiply_uint(t.b, of));
    temp[2] = operators.clamp_uint8(operators.multiply_uint(t.c, of));
    temp[3] = operators.clamp_uint8(operators.multiply_uint(t.d, of));
    return SIMDopeUint8x4(temp)
}
SIMDopeUint8x4.merge_scale_of = function(t1, of1, t2, of2) {
    var temp = new Uint8ClampedArray(4);
    temp[0] = operators.clamp_uint8(operators.divide_uint(operators.plus_uint(operators.multiply_uint(t1.a, of1), operators.multiply_uint(t2.a, of2))));
    temp[1] = operators.clamp_uint8(operators.divide_uint(operators.plus_uint(operators.multiply_uint(t1.b, of1), operators.multiply_uint(t2.b, of2))));
    temp[2] = operators.clamp_uint8(operators.divide_uint(operators.plus_uint(operators.multiply_uint(t1.c, of1), operators.multiply_uint(t2.c, of2))));
    temp[3] = operators.clamp_uint8(operators.divide_uint(operators.plus_uint(operators.multiply_uint(t1.d, of1), operators.multiply_uint(t2.d, of2))));
    return SIMDopeUint8x4(temp)
}
SIMDopeUint8x4.scale_safe_of = function(t, of_a, of_b, of_c, of_d) {
    var temp = new Uint8ClampedArray(4);
    temp[0] = operators.clamp_uint8(operators.multiply_uint(t.a, of_a), 0, 255);
    temp[1] = operators.clamp_uint8(operators.multiply_uint(t.b, of_b), 0, 255);
    temp[2] = operators.clamp_uint8(operators.multiply_uint(t.c, of_c), 0, 255);
    temp[3] = operators.clamp_uint8(operators.multiply_uint(t.d, of_d), 0, 255);
    return SIMDopeUint8x4(temp)
}

var SIMDope = {};
SIMDope.simdops = operators;
SIMDope.SIMDopeUint8x4 = SIMDopeUint8x4;



module.exports = SIMDope;