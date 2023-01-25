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

/*

 1) --> CREATE A "TREE" THAT WILL BE **JSON.STRINGIFY(ED)**
        THIS "TREE" AS AN OBJECT IS THE SAME THAT THE ONE PASSED FOR SERIALIZATION
        EXCEPTED THAT EACH "LEAF" OF ANY OF EACH "BRANCH" (OF THE TREE) BEING EITHER
        A STRING OR A TYPED_ARRAY IS ENCODED USING **UTFZAP** INTO A BUFFER (UINT8A)
        WHEN ALL "LEAFS" HAVE BEEN ENCODED AND ALL BRANCHES HAVE BEEN PARSED...

 2) --> THIS "TREE" AS A STRING IS ADDED TO THE BUFFER (UINT8A) WE USE TO ENCODE DATA
        THIS BUFFER RECEIVE TWO MODIFICATIONS, FIRST THE STRING CONTENT, THEN THE STRING LENGTH
        THIS SECOND OPERATION IS THE REVERSE OF HOW STRING (AND TYPED_ARRAY) ARE ENCODED BY DEFAULT
        BECAUSE IT USUALLY ENCODE THE : TYPE?, LENGTH!, CONTENT! FIRST THINGS FIRST

 3) --> WHAT HAPPENS TO "LEAFS" BEING ENCODED INTO THE FIRST BUFFER PART IS THAT
        IT IS, ON THE "TREE" BEING THE SECOND PART AN OBJECT YET NOT PARSED USING JSON
        REPLACED BY EITHER '_$TA-' OR '_$STR-' CONCATENATED WITH THE OFFSET WITHIN THE BUFFER

 4) --> WHEN WE READ THE BUFFER WITHIN THE VERSA OF THE WRITING OPERATION WE READ FIRST LAST TWO BYTES,
        THOSE BYTES SUM UP INTO THE LENGTH BACK OF THE JSON "TREE" AS A STRING YET TO PARSE,
        ONCE PARSED IT CONTAINS EVERYTHING AS REQUIRED EXCEPT STRING AND TYPED_ARRAY BEING REFERENCED
        SO IT IS POSSIBLE TO REVERSE THE BYTES ONCE AFTER WRITING AND ONCE BEFORE READING YET IN ANY WAYS
        IT GIVES ON READING OPERATION, SOMEHOW VERY LIGHT STRUCTURED DATA IN THIS "TREE" SINCE IT IS
        BASICALLY JUST A NORMAL "TREE" WITHOUT NON-SKELETON END-STRUCTURES (ONLY REFERENCES)
*/

import UTFzap from "utf-zap";

var Electrolysis = function Electrolysis(buffer_or_length, byteOffset, byteLength) {
    if (!(this instanceof Electrolysis)) {
        return new Electrolysis(buffer_or_length, byteOffset, byteLength);
    }

    this.b_ = new Uint8Array(buffer_or_length, byteOffset, byteLength); // Bytes
    this.o_ = 0; // Offset
};

Electrolysis.prototype.TYPES =
    [
        {
            id: 0,
            name: "undefined",
            fixed: true,
            bytes: 0,
            header: 0,
            typeof: "undefined",
            instanceof: undefined,

        },
        {
            id: 1,
            name: "null",
            fixed: true,
            bytes: 0,
            header: 0,
            typeof: "object",
            instanceof: undefined,
        },
        {
            name: "NaN",
            id: 2,
            fixed: true,
            bytes: 0,
            header: 0,
            typeof: "number",
            instanceof: Object,
        },
        {
            name: "Infinity",
            id: 3,
            fixed: true,
            bytes: 0,
            header: 0,
            typeof: "number",
            instanceof: undefined,
        },
        {
            name: "Boolean",
            id: 4,
            fixed: true,
            bytes: 1,
            header: 0,
            typeof: "boolean",
            instanceof: undefined,
        },
        {
            name: "Int32",
            id: 5,
            fixed: true,
            bytes: 4,
            header: 0,
            typeof: "number",
            instanceof: undefined,
        },
        {
            name: "Uint32",
            id: 6,
            fixed: true,
            bytes: 4,
            header: 0,
            typeof: "number",
            instanceof: undefined,
        },
        {
            name: "Float32",
            id: 7,
            fixed: true,
            bytes: 4,
            header: 0,
            typeof: "number",
            instanceof: undefined,
        },
        {
            name: "BigInt64",
            id: 8,
            fixed: true,
            bytes: 8,
            header: 0,
            typeof: "number",
            instanceof: undefined,
        },
        {
            name: "Float64",
            id: 9,
            fixed: true,
            bytes: 4,
            header: 0,
            typeof: "number",
            instanceof: undefined,
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
            instanceof: ArrayBuffer,
        },
        {
            name: "Int8Array",
            id: 12,
            fixed: false,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: Int8Array,
        },
        {
            name: "Uint8Array",
            id: 13,
            fixed: false,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: Uint8Array,
        },
        {
            name: "Uint8ClampedArray",
            id: 14,
            fixed: false,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: Uint8ClampedArray,
        },
        {
            name: "Int16Array",
            id: 15,
            fixed: false,
            lbytes: 2,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: Int16Array,
        },
        {
            name: "Uint16Array",
            id: 16,
            fixed: false,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: Uint16Array,
        },
        {
            name: "Int32Array",
            id: 17,
            fixed: false,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: Int32Array,
        },
        {
            name: "Uint32Array",
            id: 18,
            fixed: false,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: Uint32Array,
        },
        {
            name: "Float32Array",
            id: 19,
            fixed: false,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: Float32Array,
        },
        {
            name: "Float64Array",
            id: 20,
            fixed: false,
            lbytes: 2,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: Float64Array,
        },
        {
            name: "BigInt64Array",
            id: 21,
            fixed: false,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: BigInt64Array,
        },
        {
            name: "BigUint64Array",
            id: 22,
            fixed: false,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: BigUint64Array,
        },
        {
            name: "Array",
            id: 23,
            fixed: false,
            bytes: 0,
            header: 2,
            typeof: "object",
            instanceof: Array,
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

Electrolysis.prototype.getTypeFromData = function (data){

    switch(typeof data) {

        case "object":

            if(data == null) {

                return this.TYPES[1];
            }else if(data instanceof ArrayBuffer) {

                return this.TYPES[11];

            }else if("buffer" in data) {

                if(data.buffer instanceof ArrayBuffer) {

                    // Data is a typed array
                    for(var i = 12; i <= 22; i++){

                        if(data instanceof this.TYPES[i].instanceof){

                            return this.TYPES[i];
                        }
                    }

                    // Data is an object with a property named buffer which IS an array buffer
                    // yet data isn't an instance of a typed array
                    return this.TYPES[24];

                }else {

                    // Data is an object with a property named buffer which is NOT an array buffer
                    // yet obviously data isn't an instance of a typed array, therefor, it is a basic object
                    return this.TYPES[24];
                }
            }else {

                if(data instanceof Array) {

                    // Data is an Object and of Array's instance type
                    return this.TYPES[23]
                }else {

                    // Data isn't an Array yet still an object
                    return this.TYPES[24];
                }
            }
        case "number":

            if(data == Infinity) {

                return this.TYPES[3];
            }else if(data == NaN) {

                return this.TYPES[2];
            }else if(data !== (data|0)){ // Float

                return this.TYPES[7]; // 32 bits yes but this.TYPES[9] is 64bits
            }else {

                data = data|0;

                if(data < 0) {

                    if(data < -2147483648){

                        return this.TYPES[8]; // BigInt
                    }else {

                        return this.TYPES[5]; // Int32
                    }
                }else {

                    if(data <= 4294967295) {

                        return this.TYPES[6]; // Uint32
                    }else {

                        return this.TYPES[8]; // BigInt
                    }
                }
            }
        case "string":
            return this.TYPES[10];
        case "undefined":
            return this.TYPES[0];
        case "bigint":
            return this.TYPES[8]; // BigInt
        case "boolean":
            return this.TYPES[4]
        default:
            return this.TYPES[0];
    }
}

Electrolysis.prototype.UTFzap = new UTFzap();
Electrolysis.prototype._fromCharCode = function (cc) { return String.fromCharCode(cc & 0xFF); };

Object.defineProperty(Electrolysis.prototype, 'readU64', {
    get: function get() {
        return function (n) {
            n = n | 0;
            this.o_ = n+8|0;
            return 0 | this.b_[n|0] << 0 | this.b_[n+1|0] << 8 | this.b_[n+2|0] << 16 | this.b_[n+3|0] << 24 | this.b_[n+4|0] << 32 | this.b_[n+5|0] << 40 | this.b_[n+6|0] << 48 | this.b_[n+7|0] << 56;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeU64', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            this.o_ = n+8|0;
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
            this.o_ = n+4|0;
            return 0 | this.b_[n|0] << 0 | this.b_[n+1|0] << 8 | this.b_[n+2|0] << 16 | this.b_[n+3|0] << 24;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeU32', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            this.o_ = n+4|0;
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
            this.o_ = n+2|0;
            return 0 | this.b_[n|0] << 0 | this.b_[n+1|0] << 8;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeU16', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            this.o_ = n+2|0;
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
            this.o_ = n+1|0;
            return 0 | this.b_[n|0] << 0;
        }
    }
});
Object.defineProperty(Electrolysis.prototype, 'writeU8', {
    get: function get() {
        return function (n, x) {
            n = n | 0;
            x = x | 0;
            this.o_ = n+1|0;
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

// Simple function to encode a string to a new buffer (Typed Array on 8bts)
// it has to allocate a new space inside random access memory managed by the garbage collector of JS
UTFzap.prototype.encode = function(them_something_all) {

    var tree_for_json = null;
    function encode_something(to, something, get_type, write_string, write_typed_array) {

        var type = get_type(something);
        if(type.id <= 22 && type.id >= 12) {

            // Encode Typed Array
            to = "_$TA-" + write_typed_array(something);

        }else if(type.id === 10) {

            // Encode String
            to = "_$STR-" + write_string(something);

        }else if(type.id === 23) {

            to = Array.from(something);
            to.forEach(function (to_within, to_index){

                // to_index -> key, to_within -> value
                to[to_index] = encode_something(null, to_within, get_type);
            })

        }else if(type.id === 24) {

            to = Object.assign({}, something);
            Object.entries(to).forEach(function (entry){

                // 0 -> key, 1 -> value
                to[entry[0]] = encode_something(null, entry[1], get_type);
            });

        }else {

            to = something;
        }

        return to;
    }

    tree_for_json = encode_something(tree_for_json, them_something_all, this.getTypeFromData, this.writeString, this.writeTypedArray);
    this.writeStringLength(this.o_, this.writeStringContent(this.o_, JSON.stringify(tree_for_json)));
};

// TODO : DECODE
UTFzap.prototype.decode = function($b) {

    return this;
}

Object.defineProperty(Electrolysis.prototype, 'readStringLength', {
    get: function get() {
        return function (n) {
            n = n | 0;
            this.o_ = n+2|0;
            return 0 | this.b_[n|0] << 0 | this.b_[n+1|0] << 8;
        }
    }
});

Object.defineProperty(Electrolysis.prototype, 'readStringContent', {
    get: function get() {
        return function (n, l) {
            n = n | 0;
            l = l | 0;
            this.o_ = n+l+2|0;
            return this.UTFzap.unpack(this.b_, l, n+2);
        }
    }
});

Object.defineProperty(Electrolysis.prototype, 'readString', {
    get: function get() {
        return function (n) {
            n = n | 0;
            this.readStringContent(n+2, this.readStringLength(n)+2);
            return this.o_;
        }
    }
});

Object.defineProperty(Electrolysis.prototype, 'writeStringLength', {
    get: function get() {
        return function (n, l) {
            n = n | 0;
            l = l | 0;
            this.o_ = n+2|0;
            this.b_[n+0] = (l >> 0) & 0xff;
            this.b_[n+1] = (l >> 8) & 0xff;
            return 2;
        }
    }
});

Object.defineProperty(Electrolysis.prototype, 'writeStringContent', {
    get: function get() {
        return function (n, str) {
            n = n | 0;
            var l = this.UTFzap.pack(str, str.length, this.b_, n);
            this.o_ = n+l|0;
            return l;
        }
    }
});

Object.defineProperty(Electrolysis.prototype, 'writeString', {
    get: function get() {
        return function (n, str) {
            n = n | 0;
            this.writeStringLength(n, this.writeStringContent(n+2, str));
            return this.o_;
        }
    }
});



Object.defineProperty(Electrolysis.prototype, 'readTypedArrayType', {
    get: function get() {
        return function (n) {
            n = n | 0;
            this.o_ = n+1|0;
            return 0 | this.b_[n|0] << 0;
        }
    }
});

Object.defineProperty(Electrolysis.prototype, 'readTypedArrayLength', {
    get: function get() {
        return function (n) {
            n = n | 0;
            this.o_ = n+2|0;
            return 0 | this.b_[n|0] << 0 | this.b_[n+1|0] << 8;
        }
    }
});

Object.defineProperty(Electrolysis.prototype, 'readTypedArrayContent', {
    get: function get() {
        return function (n, t, l) {
            n = n | 0;
            t = t | 0;
            l = l | 0;
            this.o_ = n+l|0;
            return new this.TYPES[t].instanceof(this.b_.slice(n, n+l).buffer);
        }
    }
});

Object.defineProperty(Electrolysis.prototype, 'readTypedArray', {
    get: function get() {
        return function (n) {
            n = n | 0;
            this.readTypedArrayContent(n+1+2, this.readTypedArrayType(n), this.readTypedArrayContent(n+1));
            return this.o_;
        }
    }
});

// TODO : WRITE_TYPED_ARRAY