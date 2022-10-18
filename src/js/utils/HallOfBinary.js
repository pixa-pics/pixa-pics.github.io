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

const utility = {

    base64abcCC: Uint8Array.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47),
    base64error_code: 255,
    base64codes: Uint8Array.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51),
    base64codes_length: 123,

    bytesToBase64(bytes) {
        "use strict";

        let i = 2, j = 0;
        let l = bytes.length | 0;

        let k = l % 3;
        let n = Math.floor(l / 3) * 4 + (k && k + 1);
        let N = Math.ceil(l / 3) * 4;
        let result = new Uint8Array(N);

        for (i = 2, j = 0; (i|0) < (l|0); i = (i+3|0)>>>0, j = (j+4|0)>>>0) {
            result[j] = this.base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
            result[j+1|0] = this.base64abcCC[((bytes[i - 2 | 0] & 0x03) << 4) | (bytes[i - 1 | 0] >> 4)] & 0xFF;
            result[j+2|0] = this.base64abcCC[((bytes[i - 1 | 0] & 0x0F) << 2) | (bytes[i] >> 6)] & 0xFF;
            result[j+3|0] = this.base64abcCC[bytes[i] & 0x3F] & 0xFF;
        }
        if ((i|0) == (l + 1 | 0)) { // 1 octet yet to write
            result[j] = this.base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
            result[j+1|0] = this.base64abcCC[(bytes[i - 2 | 0] & 0x03) << 4] & 0xFF;
            result[j+2|0] = "=".charCodeAt(0) & 0xFF;
            result[j+3|0] = "=".charCodeAt(0) & 0xFF;
            j = (j+4|0)>>>0;
        }
        if ((i|0) == (l|0)) { // 2 octets yet to write
            result[j] = this.base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
            result[j+1|0] = this.base64abcCC[((bytes[i - 2 | 0] & 0x03) << 4) | (bytes[i - 1 | 0] >> 4)] & 0xFF;
            result[j+2|0] = this.base64abcCC[(bytes[i - 1 | 0] & 0x0F) << 2] & 0xFF;
            result[j+3|0] = "=".charCodeAt(0) & 0xFF;
            j = (j+4|0)>>>0;
        }

        let s = "";
        for(i = 0; i < result.length; i = (i+512|0)>>>0){
            s = s.concat(String.fromCharCode.apply(null, result.subarray(i, Math.min(i+512|0, result.length))));
        }

        return s;
    },
    base64ToBytes(str) {



        function charCodeAt(s) {
            return s.charCodeAt(0) & 0xFF;
        }
        function getBase64CodesBufferResults(buffer) {
            return Uint8Array.of( buffer >> 16, (buffer >> 8) & 0xFF, buffer & 0xFF)
        }
        function getBase64Code(char_code) {

            char_code = (char_code | 0) >>> 0;
            if (((char_code|0)>>>0) >= ((this.base64codes_length|0)>>>0)) {throw new Error("Unable to parse base64 string.");}
            const code = (this.base64codes[char_code] | 0) >>> 0;
            if (((code|0)>>>0) == ((this.base64error_code|0)>>>0)) {throw new Error("Unable to parse base64 string.");}
            return code;
        }
        function getBase64CodesBuffer(str_char_codes) {
            return (getBase64Code(str_char_codes[0]) << 18 | getBase64Code(str_char_codes[1]) << 12 | getBase64Code(str_char_codes[2]) << 6 | getBase64Code(str_char_codes[3]) | 0) >>> 0;
        }

        if ((str.length % 4 | 0) > 0) {
            throw new Error("Unable to parse base64 string.");
        }
        const index = str.indexOf("=") | 0;
        if ((index|0) > -1 && (index|0) < (str.length - 2 | 0)) {
            throw new Error("Unable to parse base64 string.");
        }

        let str_char_code = Uint8Array.from(str.split("").map(function(s){ return charCodeAt(s)}));
        let missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0,
            n = str.length | 0,
            result = new Uint8Array(3 * (n / 4));

        let i = 0, j = 0;
        for (;(i|0) < (n|0); i = (i+4|0)>>>0, j = (j+3|0)>>>0) {
            result.set(getBase64CodesBufferResults(getBase64CodesBuffer(str_char_code.subarray(i, i+4|0))), j);
        }

        return result.slice(0, result.length - missingOctets | 0);
    },

    UTF8TextEncoder: new TextEncoder("utf-8"),
    UTF8TextDecoder: new TextDecoder("utf-8"),

    bytesToUtf8(bytes){
        return this.UTF8TextDecoder.decode(bytes);
    },
    utf8ToBytes(utf8){
        return this.UTF8TextEncoder.encode(utf8);
    },

    bytesToTypedArrayOfType(buffer, type) {

        switch (type) {
            case "Int8Array":
                return new Int8Array(buffer)
                break;
            case "Uint8Array":
                return new Uint8Array(buffer)
                break;
            case "Uint8ClampedArray":
                return new Uint8ClampedArray(buffer)
                break;
            case "Int16Array":
                return new Int16Array(buffer)
                break;
            case "Uint16Array":
                return new Uint16Array(buffer)
                break;
            case "Int32Array":
                return new Int32Array(buffer)
                break;
            case "Uint32Array":
                return new Uint32Array(buffer)
                break;
            case "Float32Array":
                return new Float32Array(buffer)
                break;
            case "Float64Array":
                return new Float64Array(buffer)
                break;
            case "BigInt64Array":
                return new BigInt64Array(buffer)
                break;
            case "BigUint64Array":
                return new BigUint64Array(buffer)
                break;
        }
    },

    typedArrayToBytes(typedArray) {
        return typedArray.buffer;
    },

    bytesToTypedElementOfType(buffer, type) {

        switch (type) {
            case "Int8Element":
                return new Int8Array(buffer)[0]
                break;
            case "Uint8Element":
                return new Uint8Array(buffer)[0]
                break;
            case "Uint8ClampedElement":
                return new Uint8ClampedArray(buffer)[0]
                break;
            case "Int16Element":
                return new Int16Array(buffer)[0]
                break;
            case "Uint16Element":
                return new Uint16Array(buffer)[0]
                break;
            case "Int32Element":
                return new Int32Array(buffer)[0]
                break;
            case "Uint32Element":
                return new Uint32Array(buffer)[0]
                break;
            case "Float32Element":
                return new Float32Array(buffer)[0]
                break;
            case "Float64Element":
                return new Float64Array(buffer)[0]
                break;
            case "BigInt64Element":
                return new BigInt64Array(buffer)[0]
                break;
            case "BigUint64Element":
                return new BigUint64Array(buffer)[0]
                break;
        }
    }
};

function encode(name, element) {

    if(name.endsWith("Array")){
        return utility.typedArrayToBytes(element);
    }else {

        switch (name) {
            case "Base64":
                return utility.base64ToBytes(element);
            case "UTF8":
                return utility.utf8ToBytes(element);
        }
    }
}

function decode(name, element) {

    if(name.endsWith("Array")){
        return utility.bytesToTypedArrayOfType(element, name);
    }else {

        switch (name) {
            case "Base64":
                return utility.bytesToBase64(element);
            case "UTF8":
                return utility.bytesToUtf8(element);
        }
    }
}

function checkMaskNumber(buffer) {

    return new Uint32Array(buffer.slice(0, 4))[0];
}

function checkByteOffset(buffer) {

    return checkMaskNumber(buffer) * 20 + 4;
}

function getMaskAtIndexFromBuffer(index, buffer) {

    var maskBuffer = buffer.slice(4+index*20, 24+index*20);
    return {
        type: bytesToBase64(maskBuffer.slice(0, 8)),
        name: bytesToBase64(maskBuffer.slice(8, 16)),
        length: new Uint32Array(maskBuffer.slice(16, 20))[0]
    };
}

/*
Cascade of masks and objects in a kind of virtual machine state

A number of masks on 4 bytes (32bits unsigned integer)
Each masks is 20 bytes, an “ArrayBuffer” that slice into three distinct (fixed-length) parts :
type-name (0-40 chars in base64, therefore, 8 bytes) → Decode per 8x8 bits
key-name (0-40 chars in base64, therefore, 8 bytes) → Decode per 8x8 bits
bytes-length (0-232, usign. 32-bits-integer, therefore, 4 bytes) → Decode per 1x32 bits
And followed after all masks by slices of an “ArrayBuffer” being data aggregated too
With a fixed length
Which will be named
And of type :
Any “TypedArray” and any “TypedElement” of the following type
Int8Array
Uint8Array
UInt8ClampedArray
Int16Array
Uint16Array
Int32Array
Uint32Array
Float32Array
Float64Array
BigInt64Array
BigUint64Array
Base64
UTF-8
 */