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
var SIMDope_uint8_rgba = function(with_main_buffer, offset_4bytes){
    "use strict";
    offset_4bytes = offset_4bytes || 0;
    if (!(this instanceof SIMDope_uint8_rgba)) {
        return new SIMDope_uint8_rgba(with_main_buffer, offset_4bytes);
    }

    if(with_main_buffer instanceof Uint8ClampedArray) {

        this.storage_uint8_ =  with_main_buffer;
    }else {

        this.storage_uint8_ = new Uint8ClampedArray("buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer, multiply_uint(offset_4bytes, 4));
    }
};

// NEW PARTICULAR : Number object other means of varruct
SIMDope_uint8_rgba.new_zero = function() {
    "use strict";
    return SIMDope_uint8_rgba(new ArrayBuffer(4));
};
SIMDope_uint8_rgba.new_splat = function(n) {
    "use strict";
    var uint8ca = new Uint8ClampedArray(4);
    uint8ca.fill(clamp_uint8(n));
    return SIMDope_uint8_rgba(uint8ca);
};
SIMDope_uint8_rgba.new_of = function(r, g, b, a) {
    "use strict";
    var uint8ca = new Uint8ClampedArray(4);
    uint8ca[0] = clamp_uint8(r);
    uint8ca[1] = clamp_uint8(g);
    uint8ca[2] = clamp_uint8(b);
    uint8ca[3] = clamp_uint8(a);
    return SIMDope_uint8_rgba(uint8ca);
};
SIMDope_uint8_rgba.new_safe_of = function(r, g, b, a) {
    "use strict";
    var uint8ca = new Uint8ClampedArray(4);
    uint8ca[0] = clamp_int(r, 0, 255);
    uint8ca[1] = clamp_int(g, 0, 255);
    uint8ca[2] = clamp_int(b, 0, 255);
    uint8ca[3] = clamp_int(a, 0, 255);
    return SIMDope_uint8_rgba(uint8ca);
};
SIMDope_uint8_rgba.new_from = function(other) {
    "use strict";
    return SIMDope_uint8_rgba(other);
};

SIMDope_uint8_rgba.new_array = function(array) {
    "use strict";
    var uint8ca = new Uint8ClampedArray(4);
    uint8ca[0] = clamp_uint8(array[0]);
    uint8ca[1] = clamp_uint8(array[1]);
    uint8ca[2] = clamp_uint8(array[2]);
    uint8ca[3] = clamp_uint8(array[3]);
    return SIMDope_uint8_rgba(uint8ca);
};

SIMDope_uint8_rgba.new_array_safe = function(array) {
    "use strict";
    var uint8ca = new Uint8ClampedArray(4);
    uint8ca[0] = clamp_uint8(clamp_int(array[0], 0, 255));
    uint8ca[1] = clamp_uint8(clamp_int(array[1], 0, 255));
    uint8ca[2] = clamp_uint8(clamp_int(array[2], 0, 255));
    uint8ca[3] = clamp_uint8(clamp_int(array[3], 0, 255));
    return SIMDope_uint8_rgba(uint8ca);
};

SIMDope_uint8_rgba.new_bool = function(r, g, b, a) {
    "use strict";
    var uint8ca = new Uint8ClampedArray(4);
    uint8ca[0] = (r|0) > 0 ? 0x1 : 0x0;
    uint8ca[1] = (g|0) > 0 ? 0x1 : 0x0;
    uint8ca[2] = (b|0) > 0 ? 0x1 : 0x0;
    uint8ca[3] = (a|0) > 0 ? 0x1 : 0x0;
    return SIMDope_uint8_rgba(uint8ca);
};

SIMDope_uint8_rgba.new_uint32 = function(n) {
    "use strict";
    var uint8ca = new Uint8ClampedArray(4);
    uint8ca[3] = n & 0xff;
    uint8ca[2] = (n >>> 8) & 0xff;
    uint8ca[1] = (n >>> 16) & 0xff;
    uint8ca[0] = (n >>> 24) & 0xff;
    return SIMDope_uint8_rgba(uint8ca);
};

SIMDope_uint8_rgba.new_hsla = function(h, s, l, a) {
    "use strict";

    h = divide_uint(h, 360);
    s = divide_uint(s, 100);
    l = divide_uint(l, 100);
    a = divide_uint(a, 100);

    var r, g, b = 0.0;
    if (s === 0) {
        r = g = b = l;
    } else {

        function hue_to_rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue_to_rgb(p, q, h + 1 / 3);
        g = hue_to_rgb(p, q, h);
        b = hue_to_rgb(p, q, h - 1 / 3);
    }

    return SIMDope_uint8_rgba.new_of(multiply_uint(r, 255), multiply_uint(g, 255), multiply_uint(b, 255), multiply_uint(a, 255));
};

SIMDope_uint8_rgba.new_hex = function (hex) {

    SIMDope_uint8_rgba.new_uint32(parseInt(hex.slice(1), 16));
}

// Properties of number object
Object.defineProperty(SIMDope_uint8_rgba.prototype, 'r', {
    get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[0]); },
});
Object.defineProperty(SIMDope_uint8_rgba.prototype, 'g', {
    get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[1]); },
});
Object.defineProperty(SIMDope_uint8_rgba.prototype, 'b', {
    get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[2]); },
});
Object.defineProperty(SIMDope_uint8_rgba.prototype, 'a', {
    get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[3]); },
});

Object.defineProperty(SIMDope_uint8_rgba.prototype, 'uint32', {
    get: function() { "use strict";

        return (this.storage_uint8_[0] << 24) |	// alpha
            (this.storage_uint8_[1] << 16) |	// blue
            (this.storage_uint8_[2] <<  8) |	// green
            this.storage_uint8_[3];
    }
});

Object.defineProperty(SIMDope_uint8_rgba.prototype, 'hex', {
    get: function() { "use strict"; return "#".concat("00000000".concat(clamp_uint32(this.storage_uint8_.getUint32(0)).toString(16)).slice(-8));}
});

Object.defineProperty(SIMDope_uint8_rgba.prototype, 'hsl', {
    get: function() {
        "use strict";
        var r = clamp_uint8(this.storage_uint8_[0]);
        var g = clamp_uint8(this.storage_uint8_[1]);
        var b = clamp_uint8(this.storage_uint8_[2]);
        var a = clamp_uint8(this.storage_uint8_[3]);

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
        return Uint16Array.of(multiply_uint(h, 360), multiply_uint(s, 100), multiply_uint(l, 100),multiply_uint (a, 100));
    }
});

Object.defineProperty(SIMDope_uint8_rgba.prototype, 'offset', {
    get: function() {"use strict"; return divide_four_uint(this.storage_uint8_.byteOffset);}
});

Object.defineProperty(SIMDope_uint8_rgba.prototype, 'buffer', {
    get: function() { "use strict"; return this.storage_uint8_.buffer; }
});

Object.defineProperty(SIMDope_uint8_rgba.prototype, 'set', {
    get: function() { "use strict"; return this.storage_uint8_.set; }
});
Object.defineProperty(SIMDope_uint8_rgba.prototype, 'subarray', {
    get: function() { "use strict"; return this.storage_uint8_.subarray; }
});
Object.defineProperty(SIMDope_uint8_rgba.prototype, 'slice', {
    get: function() { "use strict"; return this.storage_uint8_.slice; }
});

SIMDope_uint8_rgba.prototype.scale_of_on_255 = function(of_r, of_g, of_b, of_a) {
    var temp = new Uint8ClampedArray(4);
    temp[0] = divide_uint(multiply_uint(this.r, of_r), 255);
    temp[1] = divide_uint(multiply_uint(this.g, of_g), 255);
    temp[2] = divide_uint(multiply_uint(this.b, of_b), 255);
    temp[3] = divide_uint(multiply_uint(this.a, of_a), 255);
    this.set(temp.buffer);
}

SIMDope_uint8_rgba.prototype.blend_with = function(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

    amount_alpha = clamp_uint8(amount_alpha);
    should_return_transparent = should_return_transparent || false;
    alpha_addition = alpha_addition || false;

    if(should_return_transparent && uint_equal(added_uint8x4.a, 0) && uint_equal(amount_alpha, 255)) {

        this.set(SIMDope_uint8_rgba.new_zero());
    }else if(int_equal(added_uint8x4.a, 255) && int_equal(amount_alpha, 255)) {

        this.set(SIMDope_uint8_rgba(added_uint8x4.buffer));
    }else {

        amount_alpha = multiply_uint(added_uint8x4.a, divide_uint(amount_alpha, 255));

        if (uint_not_equal(this.a, 0) && uint_not_equal(amount_alpha, 0)) {

            let inverse_amount_alpha_float = 1 - divide_uint(amount_alpha,255);
            let inverse_base_alpha_float = 1 - divide_uint(this.a,255);

            let second_amount = 0;
            if(alpha_addition) {
                second_amount = divide_uint(plus_uint(this.a, amount_alpha), 2);
            } else {
                second_amount = minus_uint(255, multiply_uint(inverse_amount_alpha_float, multiply_uint(inverse_base_alpha_float, 255)));
            }

            this.set(SIMDope_uint8_rgba.with_a(SIMDope_uint8_rgba.merge_scale_of(
                added_uint8x4, clamp_uint8(multiply_uint(divide_uint(amount_alpha, second_amount), 255)),
                SIMDope_uint8_rgba(this.buffer), clamp_uint8(divide_uint(multiply_uint(this.a, inverse_amount_alpha_float), divide_uint(second_amount, 255)))
            ), second_amount).buffer);

        }else if(int_greater(amount_alpha, 0)) {

            this.set(added_uint8x4.buffer);
        }
    }

    return this;
};

SIMDope_uint8_rgba.prototype.get_difference_with = function(other) {
    return SIMDope_uint8_rgba.new_of(
        abs_int(this.r, other.r),
        abs_int(this.g, other.g),
        abs_int(this.b, other.b),
        abs_int(this.a, other.a),
    );
};

SIMDope_uint8_rgba.prototype.sum_rgba = function() {
    return plus_uint(plus_uint(this.r, this.g), plus_uint(this.b, this.a));
};

SIMDope_uint8_rgba.prototype.sum_rgb = function() {
    return plus_uint(plus_uint(this.r, this.g), this.b);
};

SIMDope_uint8_rgba.prototype.is_dark = function() {
    return !!uint_less_equal(this.sum_rgb(), 384);
};

SIMDope_uint8_rgba.prototype.match_with = function(added_uint8x4, threshold_255) {
    "use strict";

    threshold_255 = typeof threshold_255 === "undefined" ? -1: clamp_uint8(threshold_255);
    if(threshold_255 === 1) {

        return true;
    }else if(threshold_255 === 0){

        return uint_equal(this.get_difference_with(added_uint8x4).sum_rgba(), 0);
    }else {

        const diff_uint8x4 = this.get_difference_with(added_uint8x4);

        if(threshold_255 !== -1) {

            return (uint_less(diff_uint8x4.r, threshold_255) &&
                uint_less(diff_uint8x4.g, threshold_255) &&
                uint_less(diff_uint8x4.b, threshold_255) &&
                uint_less(diff_uint8x4.a, threshold_255)) ? 1: 0;
        }else {

            return diff_uint8x4.sum_rgb() / 765 * Math.abs(1 - diff_uint8x4.a / 255);
        }
    }
}

SIMDope_uint8_rgba.prototype.set_r = function(r) {
    "use strict";
    var uint8a = new Uint8ClampedArray(this.buffer)
    uint8a[0] = clamp_uint8(r);
};
SIMDope_uint8_rgba.prototype.set_g = function(g) {
    "use strict";
    var uint8a = new Uint8ClampedArray(this.buffer)
    uint8a[1] = clamp_uint8(g);
};
SIMDope_uint8_rgba.prototype.set_b = function(b) {
    "use strict";
    var uint8a = new Uint8ClampedArray(this.buffer)
    uint8a[2] = clamp_uint8(b);
};
SIMDope_uint8_rgba.prototype.set_a = function(a) {
    "use strict";
    var uint8a = new Uint8ClampedArray(this.buffer)
    uint8a[3] = clamp_uint8(a);
};

// get a the number object wile modifying property values
SIMDope_uint8_rgba.with_r = function(t, r) {
    "use strict";
    var ta = t.slice(0, 4);
    ta[0] = clamp_uint8(r);
    return SIMDope_uint8_rgba(ta);
};
SIMDope_uint8_rgba.with_g = function(t, g) {
    "use strict";
    var ta = t.slice(0, 4);
    ta[1] = clamp_uint8(g);
    return SIMDope_uint8_rgba(ta);
};
SIMDope_uint8_rgba.with_b = function(t, b) {
    "use strict";
    var ta = t.slice(0, 4);
    ta[2] = clamp_uint8(b);
    return SIMDope_uint8_rgba(ta);
};
SIMDope_uint8_rgba.with_a = function(t, a) {
    "use strict";
    var ta = t.slice(0, 4);
    ta[3] = clamp_uint8(a);
    return SIMDope_uint8_rgba(ta);
};
SIMDope_uint8_rgba.with_inverse = function(t) {
    "use strict";
    var ta = t.slice(0, 4);
    ta[0] = minus_uint(255 - ta[0]);
    ta[1] = minus_uint(255 - ta[1]);
    ta[2] = minus_uint(255 - ta[2]);
    ta[3] = minus_uint(255 - ta[3]);
    return SIMDope_uint8_rgba(ta);
};

// Get various operation on number object
SIMDope_uint8_rgba.sumarray = function(other, start, end) {
    "use strict";
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

// from a given number object and a second one, test values and return boolean
SIMDope_uint8_rgba.is_equal = function(t, other) {
    return SIMDope_uint8_rgba.new_bool(
        uint_equal(t.r, other.r),
        uint_equal(t.g, other.g),
        uint_equal(t.b, other.b),
        uint_equal(t.a, other.a),
    );
};
SIMDope_uint8_rgba.is_greater = function(t, other) {
    return SIMDope_uint8_rgba.new_bool(
        uint_greater(t.r, other.r),
        uint_greater(t.g, other.g),
        uint_greater(t.b, other.b),
        uint_greater(t.a, other.a),
    );
};
SIMDope_uint8_rgba.is_less = function(t, other) {
    return SIMDope_uint8_rgba.new_bool(
        uint_less(t.r, other.r),
        uint_less(t.g, other.g),
        uint_less(t.b, other.b),
        uint_less(t.a, other.a),
    );
};
SIMDope_uint8_rgba.is_greater_equal = function(t, other) {
    return SIMDope_uint8_rgba.new_bool(
        uint_greater_equal(t.r, other.r),
        uint_greater_equal(t.g, other.g),
        uint_greater_equal(t.b, other.b),
        uint_greater_equal(t.a, other.a),
    );
};
SIMDope_uint8_rgba.is_less_equal = function(t, other) {
    return SIMDope_uint8_rgba.new_bool(
        uint_less_equal(t.r, other.r),
        uint_less_equal(t.g, other.g),
        uint_less_equal(t.b, other.b),
        uint_less_equal(t.a, other.a),
    );
};

SIMDope_uint8_rgba.get_difference = function(t, other) {
    return SIMDope_uint8_rgba.new_of(
        abs_int(t.r, other.r),
        abs_int(t.g, other.g),
        abs_int(t.b, other.b),
        abs_int(t.a, other.a),
    );
};

SIMDope_uint8_rgba.match = function(base_uint8x4, added_uint8x4, threshold_255) {
    "use strict";

    return base_uint8x4.match_with(added_uint8x4, threshold_255);
}

SIMDope_uint8_rgba.blend = function(base_uint8x4, added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

    return base_uint8x4.blend_with(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition);
};

// From a given operation and number object perform the operation and return a the number object
SIMDope_uint8_rgba.plus = function(t, other) {
    var temp = new Uint8ClampedArray(t.buffer);
    temp[0] = clamp_uint8(min_int(255, plus_int(t.r, other.r)));
    temp[1] = clamp_uint8(min_int(255, plus_int(t.g, other.g)));
    temp[2] = clamp_uint8(min_int(255, plus_int(t.b, other.b)));
    temp[3] = clamp_uint8(min_int(255, plus_int(t.a, other.a)));
    return SIMDope_uint8_rgba(temp.buffer);
}
SIMDope_uint8_rgba.minus = function(t, other) {
    var temp = new Uint8ClampedArray(t.buffer);
    temp[0] = clamp_uint8(max_int(0, minus_int(t.r, other.r)));
    temp[1] = clamp_uint8(max_int(0, minus_int(t.g, other.g)));
    temp[2] = clamp_uint8(max_int(0, minus_int(t.b, other.b)));
    temp[3] = clamp_uint8(max_int(0, minus_int(t.a, other.a)));
    return SIMDope_uint8_rgba(temp.buffer);
}
SIMDope_uint8_rgba.average = function(t, other) {
    var temp = new Uint8ClampedArray(t.buffer);
    temp[0] = clamp_uint8(divide_uint(plus_int(t.r, other.r), 2));
    temp[1] = clamp_uint8(divide_uint(plus_int(t.g, other.g), 2));
    temp[2] = clamp_uint8(divide_uint(plus_int(t.b, other.b), 2));
    temp[3] = clamp_uint8(divide_uint(plus_int(t.a, other.a), 2));
    return SIMDope_uint8_rgba(temp.buffer);
}
SIMDope_uint8_rgba.merge_scale_of_255 = function(t1, of1, t2, of2) {
    t1 = t1.scale_of_on_255(of1);
    t2 = t2.scale_of_on_255(of2);
    var temp = new Uint8ClampedArray(4);
    temp[0] = clamp_uint8(divide_uint(plus_uint(t1.r, t2.r)));
    temp[1] = clamp_uint8(divide_uint(plus_uint(t1.g, t2.g)));
    temp[2] = clamp_uint8(divide_uint(plus_uint(t1.b, t2.b)));
    temp[3] = clamp_uint8(divide_uint(plus_uint(t1.a, t2.a)));
    return SIMDope_uint8_rgba(temp.buffer);
}


var SIMDope_uint8_rgba_array = function(with_main_buffer){
    "use strict";

    if (!(this instanceof SIMDope_uint8_rgba_array)) {
        return new SIMDope_uint8_rgba_array(with_main_buffer);
    }

    if("buffer" in with_main_buffer) {
        this.buffer_ = new Uint32Array(with_main_buffer.reverse().buffer).reverse().buffer;
    }else {
        this.buffer_ = with_main_buffer;
    }

    this.storage_data_view_ = new DataView(this.buffer_);
    this.storage_uint8_array_ = new Uint8ClampedArray(this.buffer_);
};

Object.defineProperty(SIMDope_uint8_rgba_array.prototype, 'length', {
    get: function() { "use strict"; return divide_four_uint(this.storage_uint8_array_.length); }
});
Object.defineProperty(SIMDope_uint8_rgba_array.prototype, 'buffer', {
    get: function() { "use strict"; return this.storage_uint8_array_.buffer; }
});
Object.defineProperty(SIMDope_uint8_rgba_array.prototype, 'buffer_setUint8', {
    get: function() { "use strict"; return function (i, n) {
        return this.storage_uint8_array_[format_uint(i)] = clamp_uint8(n);
    }}
});
Object.defineProperty(SIMDope_uint8_rgba_array.prototype, 'buffer_setUint32', {
    get: function() { "use strict"; return function (i, n) {

        n = clamp_uint32(n);
        this.storage_uint8_array_[plus_uint(i, 0)] = n & 0xff;
        this.storage_uint8_array_[plus_uint(i, 1)] = (n >>> 8) & 0xff;
        this.storage_uint8_array_[plus_uint(i, 2)] = (n >>> 16) & 0xff;
        this.storage_uint8_array_[plus_uint(i, 3)] = (n >>> 24) & 0xff;
    }}
});
Object.defineProperty(SIMDope_uint8_rgba_array.prototype, 'buffer_getUint32', {
    get: function() { "use strict"; return function (i) {

        return  (this.storage_uint8_array_[plus_uint(i, 3)] << 24) |	// alpha
                (this.storage_uint8_array_[plus_uint(i, 2)] << 16) |	// blue
                (this.storage_uint8_array_[plus_uint(i, 1)] <<  8) |	// green
                 this.storage_uint8_array_[plus_uint(i, 0)];
    }}
});
Object.defineProperty(SIMDope_uint8_rgba_array.prototype, 'subarray_uint32', {
    get: function() { "use strict"; return function (start, end){ return new Uint32Array(this.storage_uint8_array_.subarray(multiply_uint(start, 4), multiply_uint(end, 4)).reverse().buffer).reverse(); }}
});
Object.defineProperty(SIMDope_uint8_rgba_array.prototype, 'slice_uint32', {
    get: function() { "use strict"; return function (start, end){ return new Uint32Array(this.storage_uint8_array_.slice(multiply_uint(start, 4), multiply_uint(end, 4)).reverse().buffer).reverse(); }}
});
Object.defineProperty(SIMDope_uint8_rgba_array.prototype, 'subarray_uint8', {
    get: function() { "use strict"; return function (start, end){ return this.storage_uint8_array_.subarray(multiply_uint(start, 4), multiply_uint(end, 4)); }}
});
Object.defineProperty(SIMDope_uint8_rgba_array.prototype, 'slice_uint8', {
    get: function() { "use strict"; return function (start, end){ return this.storage_uint8_array_.slice(multiply_uint(start, 4), multiply_uint(end, 4)); }}
});

SIMDope_uint8_rgba_array.prototype.get_element = function (i) {

    return SIMDope_uint8_rgba(this.buffer, i);
}

SIMDope_uint8_rgba_array.prototype.set_element = function (i, el) {

    i = multiply_uint(i, 4);
    this.buffer_setUint8(i, el.r);
    this.buffer_setUint8(plus_uint(i, 1), el.g);
    this.buffer_setUint8(plus_uint(i, 2), el.b);
    this.buffer_setUint8(plus_uint(i, 3), el.a);
}

SIMDope_uint8_rgba_array.prototype.get_new_element = function (i) {

    i = multiply_uint(i, 4);
    return SIMDope_uint8_rgba(this.buffer.slice(i, plus_uint(i, 4)));
}

SIMDope_uint8_rgba_array.prototype.set_uint32_element = function (i, uint32) {

    this.buffer_setUint32(multiply_uint(i, 4), clamp_uint32(uint32), true);
}

SIMDope_uint8_rgba_array.prototype.get_uint32_element = function (i) {

    return this.buffer_getUint32(multiply_uint(i, 4));
}



var SIMDope = {};
SIMDope.simdops = operators;
SIMDope.SIMDope_uint8_rgba = SIMDope_uint8_rgba;
SIMDope.SIMDope_uint8_rgba_array = SIMDope_uint8_rgba_array;



module.exports = SIMDope;