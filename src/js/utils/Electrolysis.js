/*
The MIT License (MIT)

Copyright (c) 2023 Matias Affolter

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

var Electrolysis = function Electrolysis(buffer_or_length, byteOffset, byteLength) {
    if (!(this instanceof Electrolysis)) {
        return new Electrolysis(buffer_or_length, byteOffset, byteLength);
    }
    this.b_ = new Uint8Array(buffer_or_length, byteOffset, byteLength);
};

Electrolysis.utilsOfTypes = (function (){

    var TYPES = [
            {
                id: 0,
                name: "undefined",
                fixed: true,
                bytes: 0,
                header: 0,
                typeof: "undefined",
                instanceof: "",

            },
            {
                id: 1,
                name: "null",
                fixed: true,
                bytes: 0,
                header: 0,
                typeof: "object",
                instanceof: "",
            },
            {
                name: "NaN",
                id: 2,
                fixed: true,
                bytes: 0,
                header: 0,
                typeof: "number",
                instanceof: "Object",
            },
            {
                name: "Infinity",
                id: 3,
                fixed: true,
                bytes: 0,
                header: 0,
                typeof: "number",
                instanceof: "",
            },
            {
                name: "Boolean",
                id: 4,
                fixed: true,
                bytes: 1,
                header: 0,
                typeof: "boolean",
                instanceof: "",
            },
            {
                name: "Int32",
                id: 5,
                fixed: true,
                bytes: 4,
                header: 0,
                typeof: "number",
                instanceof: "",
            },
            {
                name: "Uint32",
                id: 6,
                fixed: true,
                bytes: 4,
                header: 0,
                typeof: "number",
                instanceof: "",
            },
            {
                name: "Float32",
                id: 7,
                fixed: true,
                bytes: 4,
                header: 0,
                typeof: "number",
                instanceof: "",
            },
            {
                name: "BigInt64",
                id: 8,
                fixed: true,
                bytes: 8,
                header: 0,
                typeof: "number",
                instanceof: "",
            },
            {
                name: "Float64",
                id: 9,
                fixed: true,
                bytes: 4,
                header: 0,
                typeof: "number",
                instanceof: "",
            },
            {
                name: "String",
                id: 10,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "string",
                instanceof: "",
            },
            {
                name: "ArrayBuffer",
                id: 11,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "ArrayBuffer",
            },
            {
                name: "Int8Array",
                id: 12,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "Int8Array",
            },
            {
                name: "Uint8Array",
                id: 13,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "Uint8Array",
            },
            {
                name: "Uint8ClampedArray",
                id: 14,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "Uint8ClampedArray",
            },
            {
                name: "Int16Array",
                id: 15,
                fixed: false,
                lbytes: 2,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "Int16Array",
            },
            {
                name: "Uint16Array",
                id: 16,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "Uint16Array",
            },
            {
                name: "Int32Array",
                id: 17,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "Int32Array",
            },
            {
                name: "Uint32Array",
                id: 18,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "Uint32Array",
            },
            {
                name: "Float32Array",
                id: 19,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "Float32Array",
            },
            {
                name: "Float64Array",
                id: 20,
                fixed: false,
                lbytes: 2,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "Float64Array",
            },
            {
                name: "BigInt64Array",
                id: 21,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "BigInt64Array",
            },
            {
                name: "BigUint64Array",
                id: 22,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "BigUint64Array",
            },
            {
                name: "Array",
                id: 23,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "Array",
            },
            {
                name: "Object",
                id: 24,
                fixed: false,
                bytes: 0,
                header: 2,
                typeof: "object",
                instanceof: "",
            }
        ];


    return {};

})();

Electrolysis.prototype.UTFzap = new UTFzap();
Electrolysis.prototype._fromCharCode = function (cc) { return String.fromCharCode(cc & 0xFF); };

Object.defineProperty(Electrolysis.prototype, 'readU64', {
    get: function get() {
        return function (n) {
            n = n | 0;
            return 0 | this.b_[n|0] << 0 | this.b_[n+1|0] << 8 | this.b_[n+2|0] << 16 | this.b_[n+3|0] << 24 | this.b_[n+4|0] << 32 | this.b_[n+5|0] << 40 | this.b_[n+6|0] << 48 | this.b_[n+7|0] << 56;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeU64', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            this.b_[n|0] = (x >> 0) & 0xff;
            this.b_[n+1|0] = (x >> 8) & 0xff;
            this.b_[n+2|0] = (x >> 16) & 0xff;
            this.b_[n+3|0] = (x >> 24) & 0xff;
            this.b_[n+4|0] = (x >> 32) & 0xff;
            this.b_[n+5|0] = (x >> 40) & 0xff;
            this.b_[n+6|0] = (x >> 48) & 0xff;
            this.b_[n+7|0] = (x >> 56) & 0xff;
            return 8;
        }
    }
});

Object.defineProperty(Electrolysis.prototype, 'readI64', {
    get: function get() {
        return function (n) {
            var x = this.readU8(n|0) | 0;
            return x & 0x8000000080000000 ? x ^ -0x10000000000000000 : x;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeI64', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            return this.writeU8(n | 0, x < 0 ? x | 0x10000000000000000 : x | 0)
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'readU32', {
    get: function get() {
        return function (n) {
            n = n | 0;
            return 0 | this.b_[n|0] << 0 | this.b_[n+1|0] << 8 | this.b_[n+2|0] << 16 | this.b_[n+3|0] << 24;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeU32', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            this.b_[n|0] = (x >> 0) & 0xff;
            this.b_[n+1|0] = (x >> 8) & 0xff;
            this.b_[n+2|0] = (x >> 16) & 0xff;
            this.b_[n+3|0] = (x >> 24) & 0xff;
            return 4;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'readI32', {
    get: function get() {
        return function (n) {
            var x = this.readU8(n|0) | 0;
            return x & 0x80000000 ? x ^ -0x100000000 : x;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeI32', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            return this.writeU8(n | 0, x < 0 ? x | 0x100000000 : x | 0)
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'readU16', {
    get: function get() {
        return function (n) {
            n = n | 0;
            return 0 | this.b_[n|0] << 0 | this.b_[n+1|0] << 8;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeU16', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            this.b_[n|0] = (x >> 0) & 0xff;
            this.b_[n+1|0] = (x >> 8) & 0xff;
            return 2;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'readI16', {
    get: function get() {
        return function (n) {
            var x = this.readU8(n|0) | 0;
            return x & 0x8000 ? x ^ -0x10000 : x;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeI16', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            return this.writeU8(n | 0, x < 0 ? x | 0x10000 : x | 0)
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'readU8', {
    get: function get() {
        return function (n) {
            n = n | 0;
            return 0 | this.b_[n|0] << 0;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeU8', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            this.b_[n|0] = (x >> 0) & 0xff;
            return 1;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'readI8', {
    get: function get() {
        return function (n) {
            var x = this.readU8(n|0) | 0;
            return x & 0x80 ? x ^ -0x100 : x;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeI8', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            return this.writeU8(n | 0, x < 0 ? x | 0x100 : x | 0)
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'readSimpleString', {
    get: function get() {
        return function (n) {
            n = n | 0;
            var i = 0, str = "", l = this.readU16(n|0) | 0;
            for(;(i+4|0) < (l|0); i = i+4|0){
                str = str +
                    this._fromCharCode(this.b_[i|0]) +
                    this._fromCharCode(this.b_[i+1|0]) +
                    this._fromCharCode(this.b_[i+2|0]) +
                    this._fromCharCode(this.b_[i+3|0]);
            } for(; (i|0) < (l|0); i = i+1|0){
                str = str + this._fromCharCode(this.b_[i|0])
            }
            return str;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeSimpleString', {
    get: function get() {
        return function (n, str) {
            n = n | 0;
            str = "" + str;
            var i = n + 2 | 0, l = str.length | 0;
            for(;(i+4|0) < (l|0); i = i+4|0){
                this.b_[i|0] = str.charCodeAt(i|0) & 0xFF;
                this.b_[i+1|0] = str.charCodeAt(i+1|0) & 0xFF;
                this.b_[i+2|0] = str.charCodeAt(i+2|0) & 0xFF;
                this.b_[i+3|0] = str.charCodeAt(i+3|0) & 0xFF;
            } for(; (i|0) < (l|0); i = i+1|0){
                this.b_[i|0] = str.charCodeAt(i|0) & 0xFF;
            }
            this.writeU16(n |  0, l | 0);
            return i | 0;
        }
    }
});
Electrolysis.prototype.encodeSimple = function (str) {

}
Electrolysis.prototype.decodeSimple = function (ui8a) {

}