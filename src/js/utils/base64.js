/*
MIT License
Copyright (c) 2020 Egor Nepomnyaschih
Copyright (c) 2022 Affolter Matias
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

const base64abcCC = Uint8ClampedArray.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
const base64error_code = 255;
const base64codes = Uint8ClampedArray.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);
const base64codes_length = base64codes.length | 0;


function getBase64Code(char_code) {

    char_code = (char_code | 0) >>> 0;

    if (((char_code|0)>>>0) >= ((base64codes_length|0)>>>0)) {throw new Error("Unable to parse base64 string.");}
    const code = (base64codes[char_code] | 0) >>> 0;
    if (((code|0)>>>0) == ((base64error_code|0)>>>0)) {throw new Error("Unable to parse base64 string.");}
    return code;
}

function getBase64CodesBuffer(str_char_codes) {
    return getBase64Code(str_char_codes[0]) << 18 | getBase64Code(str_char_codes[1]) << 12 | getBase64Code(str_char_codes[2]) << 6 | getBase64Code(str_char_codes[3]);
}
function getBase64CodesBufferResults(buffer) {
    return Uint8ClampedArray.of( buffer >> 16, (buffer >> 8) & 0xFF, buffer & 0xFF)
}
function fewBytesToBase64Array(bytes) {
    return Uint8ClampedArray.of( base64abcCC[bytes[0] >> 2], base64abcCC[((bytes[0] & 0x03) << 4) | (bytes[1] >> 4)], base64abcCC[((bytes[1] & 0x0F) << 2) | (bytes[2] >> 6)], base64abcCC[bytes[2] & 0x3F])
}

export function bytesToBase64(bytes) {
    "use strict";
    let i = 2, l = bytes.length | 0;
    let length = 0;

    for (; (i|0) < (l|0); i = i+3|0) {length = length + 4 | 0;}
    if (i === l + 1) { length = length + 4 | 0;}
    if (i === l) {length = length + 4 | 0;}
    let result = new Uint8ClampedArray(length);

    for (i = 2; (i|0) < (l|0); i = i+3|0) {
        result.set(fewBytesToBase64Array(bytes.subarray(i-2|0, i+1|0)), (i-2)/3*4|0);
    }
    if (i === l + 1) { // 1 octet yet to write
        result.set(Uint8ClampedArray.of(base64abcCC[bytes[i - 2 | 0] >> 2], base64abcCC[(bytes[i - 2 | 0] & 0x03) << 4], "=".charCodeAt(0), "=".charCodeAt(0)), (i-2)/3*4|0);
    }else if (i === l) { // 2 octets yet to write
        result.set(Uint8ClampedArray.of(base64abcCC[bytes[i - 2 | 0] >> 2], base64abcCC[((bytes[i - 2 | 0] & 0x03) << 4) | (bytes[i - 1 | 0] >> 4)], base64abcCC[(bytes[i - 1 | 0] & 0x0F) << 2], "=".charCodeAt(0)), (i-2)/3*4|0);
    }

    return result.map(function(cc){return String.fromCharCode(cc)}).join("");
}

export function base64ToBytes(str) {
    if ((str.length % 4 | 0) > 0) {
        throw new Error("Unable to parse base64 string.");
    }
    const index = str.indexOf("=") | 0;
    if ((index|0) > -1 && (index|0) < (str.length - 2 | 0)) {
        throw new Error("Unable to parse base64 string.");
    }

    let str_char_code = Uint8ClampedArray.from(str.split("").map(function(sub_str){ return sub_str.charCodeAt(0)}));
    let missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0,
        n = str.length | 0,
        result = new Uint8ClampedArray(3 * (n / 4));

    let i = 0, j = 0;
    for (;(i|0) < (n|0); i = (i+4|0)>>>0, j = (j+3|0)>>>0) {
        result.set(getBase64CodesBufferResults(getBase64CodesBuffer(str_char_code.subarray(i, i+4|0))), j);
    }
    if((missingOctets|0) < 1) {
        return result;
    }else {

        return result.slice(0, result.length - missingOctets | 0);
    }
}

export function base64encode(str, encoder = new TextEncoder()) {
    return bytesToBase64(encoder.encode(str));
}

export function base64decode(str, decoder = new TextDecoder()) {
    return decoder.decode(base64ToBytes(str));
}