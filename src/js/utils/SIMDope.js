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
var CONFIG_UINT8X4 = "rgba";

var operators = {
    unary_neg(a) { return -a; },
    unary_bitwise_not(a) { return ~a; },
    unary_logical_not(a) { return !a; },
    boolean_and(a, b) {
        return a && b;
    },
    binary_and(a, b) {
        return a & b;
    },
    binary_or(a, b) {
        return a | b;
    },
    binary_xor(a, b) {
        return a ^ b;
    },
    binary_add(a, b) {
        return a + b;
    },
    binary_sub(a, b) {
        return a - b;
    },
    binary_mul(a, b) {
        return a * b;
    },
    binary_div(a, b) {
        return a / b;
    },
    binary_equal(a, b) {
        return a == b;
    },
    binary_not_equal(a, b) {
        return a != b;
    },
    binary_less(a, b) {
        return a < b;
    },
    binary_less_equal(a, b) {
        return a <= b;
    },
    binary_greater(a, b) {
        return a > b;
    },
    binary_greater_equal(a, b) {
        return a >= b;
    },
    binary_shift_left(a, bits) {
        return a << bits;
    },
    binary_shift_right_arithmetic(a, bits) {
        return a >> bits;
    },
    binary_shift_right_logical(a, bits) {
        return a >>> bits;
    },
    min_num(x, y) {
        return x != x ? y : y != y ? x : Math.min(x, y);
    },
    max_num(x, y) {
        return x != x ? y : y != y ? x : Math.max(x, y);
    },
    modulo_int(a, b) {
        return a % b | 0;
    },
    modulo_uint(a, b) {
        return (a % b | 0) >>> 0;
    },
    plus_int(a, b) {
        return a + b | 0;
    },
    minus_int(a, b) {
        return a - b | 0;
    },
    plus_uint(a, b) {
        return (a + b | 0) >>> 0;
    },
    minus_uint(a, b) {
        return (a - b | 0) >>> 0;
    },
    multiply_int(a, b) {
        return a * b | 0;
    },
    divide_int(a, b) {
        return a / b | 0;
    },
    multiply_uint(a, b) {
        return (a * b | 0) >>> 0;
    },
    divide_uint(a, b) {
        return (a / b | 0) >>> 0;
    },
    divide_four_uint(n) {
        return (n >> 2 | 0) >>> 0;
    },
    abs_int(n) {
        return (n | 0) < 0 ? (-n | 0) >>> 0 : (n | 0) >>> 0;
    },
    max_int(a, b) {
        return (a | 0) > (b | 0) ? (b | 0) : (a | 0);
    },
    min_int(a, b) {
        return (a | 0) > (b | 0) ? (a | 0) : (b | 0);
    },
    max_uint(a, b) {
        return ((a | 0) >>> 0) > ((b | 0) >>> 0) ? ((b | 0) >>> 0) : ((a | 0) >>> 0);
    },
    min_uint(a, b) {
        return ((a | 0) >>> 0) > ((b | 0) >>> 0) ? ((a | 0) >>> 0) : ((b | 0) >>> 0);
    },
    clamp_int(x, min, max) {
        x = x - ((x - max) & ((max - x) >> 31));
        return x - ((x - min) & ((x - min) >> 31));
    },
    clamp_uint8(n) {
        return ((n | 0) >>> 0) & 0xFF;
    },
    clamp_uint32(n) {
        return ((n | 0) >>> 0) & 0xFFFFFFFF;
    },
    int_equal(a, b) {
        return (a | 0) == (b | 0);
    },
    int_not_equal(a, b) {
        return (a | 0) != (b | 0);
    },
    int_less(a, b) {
        return (a | 0) < (b | 0);
    },
    int_less_equal(a, b) {
        return (a | 0) <= (b | 0);
    },
    int_greater(a, b) {
        return (a | 0) > (b | 0);
    },
    int_greater_equal(a, b) {
        return (a | 0) >= (b | 0);
    },
    uint_equal(a, b) {
        return ((a | 0) >>> 0) == ((b | 0) >>> 0);
    },
    uint_not_equal(a, b) {
        return ((a | 0) >>> 0) != ((b | 0) >>> 0);
    },
    uint_less(a, b) {
        return ((a | 0) >>> 0) < ((b | 0) >>> 0);
    },
    uint_less_equal(a, b) {
        return ((a | 0) >>> 0) <= ((b | 0) >>> 0);
    },
    uint_greater(a, b) {
        return ((a | 0) >>> 0) > ((b | 0) >>> 0);
    },
    uint_greater_equal(a, b) {
        return ((a | 0) >>> 0) >= ((b | 0) >>> 0);
    },
    format_int(n) {
        return (n | 0);
    },
    format_uint(n) {
        return (n | 0) >>> 0;
    }
};

var {
    unary_neg,
    unary_bitwise_not,
    unary_logical_not,
    boolean_and,
    binary_and,
    binary_or,
    binary_xor,
    binary_add,
    binary_sub,
    binary_mul,
    binary_div,
    binary_equal,
    binary_not_equal,
    binary_less,
    binary_less_equal,
    binary_greater,
    binary_greater_equal,
    binary_shift_left,
    binary_shift_right_arithmetic,
    binary_shift_right_logical,
    min_num,
    max_num,
    modulo_int,
    modulo_uint,
    plus_int,
    minus_int,
    plus_uint,
    minus_uint,
    multiply_int,
    divide_int,
    multiply_uint,
    divide_uint,
    divide_four_uint,
    abs_int,
    max_int,
    min_int,
    max_uint,
    min_uint,
    clamp,
    clamp_int,
    clamp_uint8,
    clamp_uint32,
    int_equal,
    int_not_equal,
    int_less,
    int_less_equal,
    int_greater,
    int_greater_equal,
    uint_equal,
    uint_not_equal,
    uint_less,
    uint_less_equal,
    uint_greater,
    uint_greater_equal,
    format_int,
    format_uint,
} = operators;

// NEW BASIC : Number object with 4 times 0-255
var SIMDopeColorUint8x4 = function(with_main_buffer, offset_4bytes, length_4bytes){
    if (!(this instanceof SIMDopeColorUint8x4)) {
        return new SIMDopeColorUint8x4(with_main_buffer);
    }
    if("buffer" in with_main_buffer){with_main_buffer = with_main_buffer.buffer;}

    offset_4bytes = offset_4bytes || 0;
    length_4bytes = length_4bytes || plus_uint(offset_4bytes, 1);

    this.storage_ = new DataView(with_main_buffer, multiply_uint(offset_4bytes, 4), multiply_uint(length_4bytes, 4));
};

// NEW PARTICULAR : Number object other means of varruct
SIMDopeColorUint8x4.new_zero = function() {
    var uint8ca = new Uint8ClampedArray(4);
    return SIMDopeColorUint8x4(uint8ca.buffer);
};
SIMDopeColorUint8x4.new_splat = function(n) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = clamp_uint8(n);
        uint8ca[1] = clamp_uint8(n);
        uint8ca[2] = clamp_uint8(n);
        uint8ca[3] = clamp_uint8(n);
    return SIMDopeColorUint8x4(uint8ca.buffer);
};
SIMDopeColorUint8x4.new_of = function(r, g, b, a) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = clamp_uint8(r);
        uint8ca[1] = clamp_uint8(g);
        uint8ca[2] = clamp_uint8(b);
        uint8ca[3] = clamp_uint8(a);
    return SIMDopeColorUint8x4(uint8ca.buffer);
};
SIMDopeColorUint8x4.new_safe_of = function(r, g, b, a) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = clamp_int(r, 0, 255);
        uint8ca[1] = clamp_int(g, 0, 255);
        uint8ca[2] = clamp_int(b, 0, 255);
        uint8ca[3] = clamp_int(a, 0, 255);
    return SIMDopeColorUint8x4(uint8ca.buffer);
};
SIMDopeColorUint8x4.new_from = function(other) {
    return SIMDopeColorUint8x4(other.buffer);
};

SIMDopeColorUint8x4.new_array = function(array) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = clamp_uint8(array[0]);
        uint8ca[1] = clamp_uint8(array[1]);
        uint8ca[2] = clamp_uint8(array[2]);
        uint8ca[3] = clamp_uint8(array[3]);
    return SIMDopeColorUint8x4(uint8ca.buffer);
};

SIMDopeColorUint8x4.new_array_safe = function(array) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = clamp_uint8(clamp_int(array[0], 0, 255));
        uint8ca[1] = clamp_uint8(clamp_int(array[1], 0, 255));
        uint8ca[2] = clamp_uint8(clamp_int(array[2], 0, 255));
        uint8ca[3] = clamp_uint8(clamp_int(array[3], 0, 255));
    return SIMDopeColorUint8x4(uint8ca.buffer);
};

SIMDopeColorUint8x4.new_bool = function(r, g, b, a) {
    var uint8ca = new Uint8ClampedArray(4);
        uint8ca[0] = (r|0) > 0 ? 0x1 : 0x0;
        uint8ca[1] = (g|0) > 0 ? 0x1 : 0x0;
        uint8ca[2] = (b|0) > 0 ? 0x1 : 0x0;
        uint8ca[3] = (a|0) > 0 ? 0x1 : 0x0;
    return SIMDopeColorUint8x4(uint8ca.buffer);
};

SIMDopeColorUint8x4.new_uint32 = function(uint32) {
    var dv = new DataView(new ArrayBuffer(4));
        dv.setUint32(0, clamp_uint32(uint32), true);
    return SIMDopeColorUint8x4(dv.buffer);
};

// Properties of number object
Object.defineProperty(SIMDopeColorUint8x4.prototype, 'r', {
    get: function() { return clamp_uint8(this.storage_.getUint8(0)); },
});
Object.defineProperty(SIMDopeColorUint8x4.prototype, 'g', {
    get: function() { return clamp_uint8(this.storage_.getUint8(1)); },
});
Object.defineProperty(SIMDopeColorUint8x4.prototype, 'b', {
    get: function() { return clamp_uint8(this.storage_.getUint8(2)); },
});
Object.defineProperty(SIMDopeColorUint8x4.prototype, 'a', {
    get: function() { return clamp_uint8(this.storage_.getUint8(3)); },
});

Object.defineProperty(SIMDopeColorUint8x4.prototype, 'uint32', {
    get: function() {return clamp_uint32(this.storage_.getUint32(0));}
});

Object.defineProperty(SIMDopeColorUint8x4.prototype, 'hex', {
    get: function() {return "#".concat("00000000".concat(clamp_uint32(this.storage_.getUint32(0)).toString(16)).slice(-8));}
});

Object.defineProperty(SIMDopeColorUint8x4.prototype, 'hsl', {
    get: function() {

        var r = clamp_uint8(this.storage_.getUint8(0));
        var g = clamp_uint8(this.storage_.getUint8(1));
        var b = clamp_uint8(this.storage_.getUint8(2));
        var a = clamp_uint8(this.storage_.getUint8(3));
        
        r = +r/255, g = +g/255, b = +b/255, a = +a/255;
        
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return Array.of((h * 360)|0, (s * 100)|0, (l * 100)|0, (a * 100)|0);
    }
});

Object.defineProperty(SIMDopeColorUint8x4.prototype, 'offset', {
    get: function() {return divide_four_uint(this.storage_.byteOffset);}
});

Object.defineProperty(SIMDopeColorUint8x4.prototype, 'buffer', {
    get: function() { return this.storage_.buffer; }
});

// get a the number object wile modifying property values
SIMDopeColorUint8x4.with_r = function(t, r) {
    var dv = new DataView(t.buffer);
    dv.setUint8(0, clamp_uint8(r));
    return SIMDopeColorUint8x4(dv.buffer);
};
SIMDopeColorUint8x4.with_g = function(t, g) {
    var dv = new DataView(t.buffer);
    dv.setUint8(1, clamp_uint8(g));
    return SIMDopeColorUint8x4(dv.buffer);
};
SIMDopeColorUint8x4.with_b = function(t, b) {
    var dv = new DataView(t.buffer);
    dv.setUint8(2, clamp_uint8(b));
    return SIMDopeColorUint8x4(dv.buffer);
};
SIMDopeColorUint8x4.with_a = function(t, a) {
    var dv = new DataView(t.buffer);
    dv.setUint8(3, clamp_uint8(a));
    return SIMDopeColorUint8x4(dv.buffer);
};

// Get various operation on number object
SIMDopeColorUint8x4.sumarray = function(other, start, end) {

    start = start | 0;
    start = min_uint(start, 3);
    end = end | 4;
    end = min_uint(end, 4);

    var sum = 0;
    for(var i = start; uint_less(i, end); i = plus_uint(i, 1)) {
        sum = plus_uint(sum, other[CONFIG_UINT8X4.charAt(i)]);
    }
    return sum;
};
SIMDopeColorUint8x4.subarray = function(other, start, end) {
    start = start | 0;
    end = end | 4;
    return new Uint8ClampedArray(other.buffer).subarray(start, end);
};

SIMDopeColorUint8x4.slice = function(other, start, end) {
    start = start | 0;
    end = end | 4;
    return new Uint8ClampedArray(other.buffer).slice(start, end);
};

// from a given number object and a second one, test values and return boolean
SIMDopeColorUint8x4.is_equal = function(t, other) {
    return SIMDopeColorUint8x4.new_bool(
        uint_equal(t.r, other.r),
        uint_equal(t.g, other.g),
        uint_equal(t.b, other.b),
        uint_equal(t.a, other.a),
    );
};
SIMDopeColorUint8x4.is_greater = function(t, other) {
    return SIMDopeColorUint8x4.new_bool(
        uint_greater(t.r, other.r),
        uint_greater(t.g, other.g),
        uint_greater(t.b, other.b),
        uint_greater(t.a, other.a),
    );
};
SIMDopeColorUint8x4.is_less = function(t, other) {
    return SIMDopeColorUint8x4.new_bool(
        uint_less(t.r, other.r),
        uint_less(t.g, other.g),
        uint_less(t.b, other.b),
        uint_less(t.a, other.a),
    );
};
SIMDopeColorUint8x4.is_greater_equal = function(t, other) {
    return SIMDopeColorUint8x4.new_bool(
        uint_greater_equal(t.r, other.r),
        uint_greater_equal(t.g, other.g),
        uint_greater_equal(t.b, other.b),
        uint_greater_equal(t.a, other.a),
    );
};
SIMDopeColorUint8x4.is_less_equal = function(t, other) {
    return SIMDopeColorUint8x4.new_bool(
        uint_less_equal(t.r, other.r),
        uint_less_equal(t.g, other.g),
        uint_less_equal(t.b, other.b),
        uint_less_equal(t.a, other.a),
    );
};

SIMDopeColorUint8x4.get_match = function(t, other) {
    return SIMDopeColorUint8x4.new_of(
        abs_int(t.r, other.r),
        abs_int(t.g, other.g),
        abs_int(t.b, other.b),
        abs_int(t.a, other.a),
    );
};

// From a given operation and number object perform the operation and return a the number object
SIMDopeColorUint8x4.plus = function(t, other) {
    var temp = new Uint8ClampedArray(t.buffer);
    temp[0] = clamp_uint8(min_int(255, plus_int(t.r, other.r)));
    temp[1] = clamp_uint8(min_int(255, plus_int(t.g, other.g)));
    temp[2] = clamp_uint8(min_int(255, plus_int(t.b, other.b)));
    temp[3] = clamp_uint8(min_int(255, plus_int(t.a, other.a)));
    return SIMDopeColorUint8x4(temp.buffer);
}
SIMDopeColorUint8x4.minus = function(t, other) {
    var temp = new Uint8ClampedArray(t.buffer);
    temp[0] = clamp_uint8(max_int(0, minus_int(t.r, other.r)));
    temp[1] = clamp_uint8(max_int(0, minus_int(t.g, other.g)));
    temp[2] = clamp_uint8(max_int(0, minus_int(t.b, other.b)));
    temp[3] = clamp_uint8(max_int(0, minus_int(t.a, other.a)));
    return SIMDopeColorUint8x4(temp.buffer);
}
SIMDopeColorUint8x4.average = function(t, other) {
    var temp = new Uint8ClampedArray(t.buffer);
    temp[0] = clamp_uint8(divide_uint(plus_int(t.r, other.r), 2));
    temp[1] = clamp_uint8(divide_uint(plus_int(t.g, other.g), 2));
    temp[2] = clamp_uint8(divide_uint(plus_int(t.b, other.b), 2));
    temp[3] = clamp_uint8(divide_uint(plus_int(t.a, other.a), 2));
    return SIMDopeColorUint8x4(temp.buffer);
}
SIMDopeColorUint8x4.scale_of = function(t, of) {
    var temp = new Uint8ClampedArray(4);
    temp[0] = clamp_uint8(multiply_uint(t.r, of));
    temp[1] = clamp_uint8(multiply_uint(t.g, of));
    temp[2] = clamp_uint8(multiply_uint(t.b, of));
    temp[3] = clamp_uint8(multiply_uint(t.a, of));
    return SIMDopeColorUint8x4(temp.buffer);
}
SIMDopeColorUint8x4.merge_scale_of = function(t1, of1, t2, of2) {
    var temp = new Uint8ClampedArray(4);
    temp[0] = clamp_uint8(divide_uint(plus_uint(multiply_uint(t1.r, of1), multiply_uint(t2.r, of2))));
    temp[1] = clamp_uint8(divide_uint(plus_uint(multiply_uint(t1.g, of1), multiply_uint(t2.g, of2))));
    temp[2] = clamp_uint8(divide_uint(plus_uint(multiply_uint(t1.b, of1), multiply_uint(t2.b, of2))));
    temp[3] = clamp_uint8(divide_uint(plus_uint(multiply_uint(t1.a, of1), multiply_uint(t2.a, of2))));
    return SIMDopeColorUint8x4(temp.buffer);
}
SIMDopeColorUint8x4.scale_safe_of = function(t, of_r, of_g, of_b, of_a) {
    var temp = new Uint8ClampedArray(4);
    temp[0] = clamp_uint8(multiply_uint(t.r, of_r), 0, 255);
    temp[1] = clamp_uint8(multiply_uint(t.g, of_g), 0, 255);
    temp[2] = clamp_uint8(multiply_uint(t.b, of_b), 0, 255);
    temp[3] = clamp_uint8(multiply_uint(t.a, of_a), 0, 255);
    return SIMDopeColorUint8x4(temp.buffer);
}

var SIMDope = {};
SIMDope.simdops = operators;
SIMDope.SIMDopeColorUint8x4 = SIMDopeColorUint8x4;



module.exports = SIMDope;