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

const base64abcCC = Uint8Array.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
const CHUNCK_LENGTH = 256;
 
function bytesToBase64(bytes) {
    "use strict";
    let i = 2, j = 0;
    let l = bytes.length | 0;

    let k = l % 3 | 0;
    let n = Math.floor(l / 3) * 4 + (k && k + 1) | 0;
    let N = Math.ceil(l / 3) * 4 | 0;
    let result = new Uint8Array(N|0);

    for (i = 2, j = 0; (i|0) < (l|0); i = (i+3|0)>>>0, j = (j+4|0)>>>0) {
        result[j|0] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
        result[j+1|0] = base64abcCC[((bytes[i - 2 | 0] & 0x03) << 4) | (bytes[i - 1 | 0] >> 4)] & 0xFF;
        result[j+2|0] = base64abcCC[((bytes[i - 1 | 0] & 0x0F) << 2) | (bytes[i] >> 6)] & 0xFF;
        result[j+3|0] = base64abcCC[bytes[i|0] & 0x3F] & 0xFF;
    }
    if ((i|0) == (l + 1 | 0)) { // 1 octet yet to write
        result[j] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
        result[j+1|0] = base64abcCC[(bytes[i - 2 | 0] & 0x03) << 4] & 0xFF;
        result[j+2|0] = "=".charCodeAt(0) & 0xFF;
        result[j+3|0] = "=".charCodeAt(0) & 0xFF;
        j = (j+4|0)>>>0;
    }
    if ((i|0) == (l|0)) {        
        result[j|0] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
        result[j+1|0] = base64abcCC[((bytes[i - 2 | 0] & 0x03) << 4) | (bytes[i - 1 | 0] >> 4)] & 0xFF;
        result[j+2|0] = base64abcCC[(bytes[i - 1 | 0] & 0x0F) << 2] & 0xFF;
        result[j+3|0] = "=".charCodeAt(0) & 0xFF;
    }

    let s = "";
    let rl = result.length|0;
    for(i = 0; (i|0) < (rl|0); i = (i+CHUNCK_LENGTH|0)>>>0){
        s = s.concat(String.fromCharCode.apply(null, result.subarray(i|0, Math.min(i+CHUNCK_LENGTH|0, rl))));
    }

    return s;
}

const base64error_code = 255;
const base64codes = Uint8Array.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);
const base64codes_length = base64codes.length | 0;

function charCodeAt(s) {
    return s.charCodeAt(0) & 0xFF;
}
function getBase64CodesBufferResults(buffer) {
    return Uint8Array.of( (buffer >> 16) & 0xFF, (buffer >> 8) & 0xFF, buffer & 0xFF)
}
function getBase64CodesBufferResultsBy4(buffer_1, buffer_2, buffer_3, buffer_4 ) {
    return Uint8Array.of(
        (buffer_1 >> 16) & 0xFF, (buffer_1 >> 8) & 0xFF, buffer_1 & 0xFF,
        (buffer_2 >> 16) & 0xFF, (buffer_2 >> 8) & 0xFF, buffer_2 & 0xFF,
        (buffer_3 >> 16) & 0xFF, (buffer_3 >> 8) & 0xFF, buffer_3 & 0xFF,
        (buffer_4 >> 16) & 0xFF, (buffer_4 >> 8) & 0xFF, buffer_4 & 0xFF
    );
}
function setBase64CodesBufferResults(buffer, start, buffer_1) {
    start = (start | 0) >>> 0;
    buffer[start|0] = (buffer_1 >> 16) & 0xFF;
    buffer[start+1|0] = (buffer_1 >> 8) & 0xFF;
    buffer[start+2|0] = buffer_1 & 0xFF;
}
function setBase64CodesBufferResultsMO2(buffer, start, buffer_1) {
    start = (start | 0) >>> 0;
    buffer[start|0] = (buffer_1 >> 16) & 0xFF;
}
function setBase64CodesBufferResultsMO1(buffer, start, buffer_1) {
    start = (start | 0) >>> 0;
    buffer[start|0] = (buffer_1 >> 16) & 0xFF;
    buffer[start+1|0] = (buffer_1 >> 8) & 0xFF;
}
function setBase64CodesBufferResultsMO0(buffer, start, buffer_1) {
    start = (start | 0) >>> 0;
    buffer[start|0] = (buffer_1 >> 16) & 0xFF;
    buffer[start+1|0] = (buffer_1 >> 8) & 0xFF;
    buffer[start+2|0] = buffer_1 & 0xFF;
}
function setBase64CodesBufferResultsBy4(buffer, start, buffer_1, buffer_2, buffer_3, buffer_4 ) {
    start = (start | 0) >>> 0;
    buffer_1 = (buffer_1 | 0) >>> 0;
    buffer_2 = (buffer_2 | 0) >>> 0;
    buffer_3 = (buffer_3 | 0) >>> 0;
    buffer_4 = (buffer_4 | 0) >>> 0;
    setBase64CodesBufferResults(buffer, start|0, buffer_1);
    setBase64CodesBufferResults(buffer, start+3|0, buffer_2);
    setBase64CodesBufferResults(buffer, start+6|0, buffer_3);
    setBase64CodesBufferResults(buffer, start+9|0, buffer_4);
}
function getBase64Code(char_code) {

    char_code = (char_code | 0) & 0xFF;
    return (base64codes[char_code] | 0) >>> 0;
}
function getBase64CodesBuffer(str_char_codes, start) {
    return (getBase64Code(str_char_codes[start+0|0]) << 18 | getBase64Code(str_char_codes[start+1|0]) << 12 | getBase64Code(str_char_codes[start+2|0]) << 6 | getBase64Code(str_char_codes[start+3|0]) | 0) >>> 0;
}

function base64ToBytes(str) {

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
        result = new Uint8Array(3 * (n / 4) - missingOctets | 0);

    let i = 0, j = 0;
    for (;(i+16|0) < (n|0); i = (i+16|0)>>>0, j = (j+12|0)>>>0) { // Single Operation Multiple Data (SIMD) up to 3x faster

        setBase64CodesBufferResultsBy4(result, j|0,
            getBase64CodesBuffer(str_char_code, i|0),
            getBase64CodesBuffer(str_char_code, i+4|0),
            getBase64CodesBuffer(str_char_code, i+8|0),
            getBase64CodesBuffer(str_char_code, i+12|0)
        );
    }

    for (;(i|0) < (n-1|0); i = (i+4|0)>>>0, j = (j+3|0)>>>0) { // Single Operation Single Data (normal)
        setBase64CodesBufferResults(result, j|0, getBase64CodesBuffer(str_char_code, i|0));
    }
   switch (missingOctets) {
        case 2:
            setBase64CodesBufferResultsMO2(result, j|0, getBase64CodesBuffer(str_char_code, i|0)); break;
        case 1:
            setBase64CodesBufferResultsMO1(result, j|0, getBase64CodesBuffer(str_char_code, i|0)); break;
        case 0:
            setBase64CodesBufferResultsMO0(result, j|0, getBase64CodesBuffer(str_char_code, i|0)); break;
    }

    return result;
}

class Base64 {
    constructor() {
        this.memory = new Uint8Array(4096);
        this.base64abcCC = Uint8Array.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
        this.CHUNCK_LENGTH = 256;
        this.base64error_code = 255;
        this.base64codes = Uint8Array.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);
        this.base64codes_length = this.base64codes.length | 0;
    }

    charCodeAt(s) {
        return (s.charCodeAt(0) | 0) & 0xFF;
    }

    setBase64CodesBufferResults(buffer, start, buffer_1) {
        start = (start | 0) >>> 0;
        buffer[(start|0) >>> 0] = (buffer_1 >> 16) & 0xFF;
        buffer[(start+1|0) >>> 0] = (buffer_1 >> 8) & 0xFF;
        buffer[(start+2|0) >>> 0] = buffer_1 & 0xFF;
    }
    setBase64CodesBufferResultsMO2(buffer, start, buffer_1) {
        start = (start | 0) >>> 0;
        buffer[(start|0) >>> 0] = (buffer_1 >> 16) & 0xFF;
    }
    setBase64CodesBufferResultsMO1(buffer, start, buffer_1) {
        start = (start | 0) >>> 0;
        buffer[(start|0) >>> 0] = (buffer_1 >> 16) & 0xFF;
        buffer[(start+1|0) >>> 0] = (buffer_1 >> 8) & 0xFF;
    }
    setBase64CodesBufferResultsMO0(buffer, start, buffer_1) {
        start = (start | 0) >>> 0;
        buffer[(start|0) >>> 0] = (buffer_1 >> 16) & 0xFF;
        buffer[(start+1|0) >>> 0] = (buffer_1 >> 8) & 0xFF;
        buffer[(start+2|0) >>> 0] = buffer_1 & 0xFF;
    }
    setBase64CodesBufferResultsBy4(buffer, start, buffer_1, buffer_2, buffer_3, buffer_4 ) {
        start = (start | 0) >>> 0;
        this.setBase64CodesBufferResults(buffer, (start|0) >>> 0, (buffer_1 | 0) >>> 0);
        this.setBase64CodesBufferResults(buffer, (start+3|0) >>> 0, (buffer_2 | 0) >>> 0);
        this.setBase64CodesBufferResults(buffer, (start+6|0) >>> 0, (buffer_3 | 0) >>> 0);
        this.setBase64CodesBufferResults(buffer, (start+9|0) >>> 0, (buffer_4 | 0) >>> 0);
    }
    getBase64Code(char_code) {

        char_code = (char_code | 0) & 0xFF;
        return (this.base64codes[char_code] | 0) >>> 0;
    }
    getBase64CodesBuffer(str_char_codes, start) {
        return (this.getBase64Code(str_char_codes[start+0|0]) << 18 | this.getBase64Code(str_char_codes[start+1|0]) << 12 | this.getBase64Code(str_char_codes[start+2|0]) << 6 | this.getBase64Code(str_char_codes[start+3|0]) | 0) >>> 0;
    }
    resetMemory() {
        this.memory = new Uint8Array(4096);
    }
    bytesToBase64(bytes) {
        "use strict";
        let i = 2, J = 0, j = J >> 2;
        let l = bytes.length | 0;

        let k = l % 3 | 0;
        let n = Math.floor(l / 3) * 4 + (k && k + 1) | 0;
        let N = Math.ceil(l / 3) * 4 | 0;
        this.memory = (this.memory.length|0) >= (N|0) ? this.memory: new Uint8Array(N|0);
        let result = this.memory.subarray(0, N|0);

        for (; (i|0) < (l|0); i = (i+3|0)>>>0, J = (J+1|0)>>>0, j = J >> 2) {
            result[(j|0)>>>0] = this.base64abcCC[bytes[(i - 2 | 0)>>>0] >> 2] & 0xFF;
            result[(j+1|0)>>>0] = this.base64abcCC[((bytes[(i - 2 | 0)>>>0] & 0x03) << 4) | (bytes[(i - 1 | 0)>>>0] >> 4)] & 0xFF;
            result[(j+2|0)>>>0] = this.base64abcCC[((bytes[(i - 1 | 0)>>>0] & 0x0F) << 2) | (bytes[(i|0)>>>0] >> 6)] & 0xFF;
            result[(j+3|0)>>>0] = this.base64abcCC[bytes[(i|0)>>>0] & 0x3F] & 0xFF;
        }

        if ((i|0) == (l + 1 | 0)) { // 1 octet yet to write
            result[(j|0)>>>0] = this.base64abcCC[bytes[(i - 2 | 0)>>>0] >> 2] & 0xFF;
            result[(j+1|0)>>>0] = this.base64abcCC[(bytes[(i - 2 | 0)>>>0] & 0x03) << 4] & 0xFF;
            result[(j+2|0)>>>0] = "=".charCodeAt(0) & 0xFF;
            result[(j+3|0)>>>0] = "=".charCodeAt(0) & 0xFF;
            j = (j+4|0)>>>0;
        }

        if ((i|0) == (l|0)) {
            result[(j|0)>>>0] = this.base64abcCC[bytes[(i - 2 | 0)>>>0] >> 2] & 0xFF;
            result[(j+1|0)>>>0] = this.base64abcCC[((bytes[(i - 2 | 0)>>>0] & 0x03) << 4) | (bytes[(i - 1 | 0)>>>0] >> 4)] & 0xFF;
            result[(j+2|0)>>>0] = this.base64abcCC[(bytes[(i - 1 | 0)>>>0] & 0x0F) << 2] & 0xFF;
            result[(j+3|0)>>>0] = "=".charCodeAt(0) & 0xFF;
        }

        let s = "";
        let rl = N|0;
        for(i = 0; (i|0) < (rl|0); i = (i+this.CHUNCK_LENGTH|0)>>>0){
            s = s.concat(String.fromCharCode.apply(null, result.subarray(i|0, Math.min(i+this.CHUNCK_LENGTH|0, rl|0))));
        }

        return s;
    }

    base64ToBytes(str, offset, constructor) {
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
            result = new Uint8Array(3 * (n / 4) - missingOctets | 0);

        let i = 0, j = 0;
        for (;(i+16|0) < (n|0); i = (i+16|0)>>>0, j = (j+12|0)>>>0) { // Single Operation Multiple Data (SIMD) up to 3x faster

            this.setBase64CodesBufferResultsBy4(result, j|0,
                this.getBase64CodesBuffer(str_char_code, i|0),
                this.getBase64CodesBuffer(str_char_code, i+4|0),
                this.getBase64CodesBuffer(str_char_code, i+8|0),
                this.getBase64CodesBuffer(str_char_code, i+12|0)
            );
        }

        for (;(i|0) < (n-1|0); i = (i+4|0)>>>0, j = (j+3|0)>>>0) { // Single Operation Single Data (normal)
            this.setBase64CodesBufferResults(result, j|0, this.getBase64CodesBuffer(str_char_code, i|0));
        }
        switch (missingOctets) {
            case 2:
                this.setBase64CodesBufferResultsMO2(result, j|0, this.getBase64CodesBuffer(str_char_code, i|0)); break;
            case 1:
                this.setBase64CodesBufferResultsMO1(result, j|0, this.getBase64CodesBuffer(str_char_code, i|0)); break;
            case 0:
                this.setBase64CodesBufferResultsMO0(result, j|0, this.getBase64CodesBuffer(str_char_code, i|0)); break;
        }

        return result;
    }
}