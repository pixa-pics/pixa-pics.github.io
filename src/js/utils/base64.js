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
const CHUNCK_LENGTH = 256;

export function bytesToBase64(bytes) {
    "use strict";
    let i = 2, j = 0;
    let l = bytes.length | 0;

    let k = l % 3 | 0;
    let n = Math.floor(l / 3) * 4 + (k && k + 1) | 0;
    let N = Math.ceil(l / 3) * 4 | 0;
    let result = new Uint8ClampedArray(N|0);

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
    if ((i|0) == (l|0)) {         result[j|0] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
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
const base64codes = Uint8ClampedArray.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);
const base64codes_length = base64codes.length | 0;

function charCodeAt(s) {
    return s.charCodeAt(0) & 0xFF;
}
function getBase64CodesBufferResults(buffer) {
    return Uint8ClampedArray.of( (buffer >> 16) & 0xFF, (buffer >> 8) & 0xFF, buffer & 0xFF)
}
function getBase64CodesBufferResultsBy4(buffer_1, buffer_2, buffer_3, buffer_4 ) {
    return Uint8ClampedArray.of(
        (buffer_1 >> 16) & 0xFF, (buffer_1 >> 8) & 0xFF, buffer_1 & 0xFF,
        (buffer_2 >> 16) & 0xFF, (buffer_2 >> 8) & 0xFF, buffer_2 & 0xFF,
        (buffer_3 >> 16) & 0xFF, (buffer_3 >> 8) & 0xFF, buffer_3 & 0xFF,
        (buffer_4 >> 16) & 0xFF, (buffer_4 >> 8) & 0xFF, buffer_4 & 0xFF
    );
}
function getBase64Code(char_code) {

    char_code = (char_code | 0) & 0xFF;
    if (((char_code|0)>>>0) >= ((base64codes_length|0)>>>0)) {throw new Error("Unable to parse base64 string.");}
    const code = (base64codes[char_code] | 0) >>> 0;
    if (((code|0)>>>0) == ((base64error_code|0)>>>0)) {throw new Error("Unable to parse base64 string.");}
    return (code | 0) & 0xFF;
}
function getBase64CodesBuffer(str_char_codes) {
    return (getBase64Code(str_char_codes[0]) << 18 | getBase64Code(str_char_codes[1]) << 12 | getBase64Code(str_char_codes[2]) << 6 | getBase64Code(str_char_codes[3]) | 0) >>> 0;
}

export function base64ToBytes(str) {

    if ((str.length % 4 | 0) > 0) {
        throw new Error("Unable to parse base64 string.");
    }
    const index = str.indexOf("=") | 0;
    if ((index|0) > -1 && (index|0) < (str.length - 2 | 0)) {
        throw new Error("Unable to parse base64 string.");
    }

    let str_char_code = Uint8ClampedArray.from(str.split("").map(function(s){ return charCodeAt(s)}));
    let missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0,
        n = str.length | 0,
        result = new Uint8ClampedArray(3 * (n / 4) | 0);

    let str_char_code_splitted = new Uint8ClampedArray(16);
    let i = 0, j = 0;
    for (;(i+16|0) < (n|0); i = (i+16|0)>>>0, j = (j+12|0)>>>0) { // Single Operation Multiple Data (SIMD) up to 3x faster

        str_char_code_splitted.set(str_char_code.subarray(i, i+16|0));
        result.set(getBase64CodesBufferResultsBy4(
            getBase64CodesBuffer(str_char_code_splitted.subarray(0, 4)),
            getBase64CodesBuffer(str_char_code_splitted.subarray(4, 8)),
            getBase64CodesBuffer(str_char_code_splitted.subarray(8, 12)),
            getBase64CodesBuffer(str_char_code_splitted.subarray(12, 16))
        ), j);
    }

    for (;(i|0) < (n|0); i = (i+4|0)>>>0, j = (j+3|0)>>>0) { // Single Operation Single Data (normal)
        result.set(getBase64CodesBufferResults(getBase64CodesBuffer(str_char_code.subarray(i|0, i+4|0))), j|0);
    }

    return result.slice(0, result.length - missingOctets | 0);
}

var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function decompress (input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 1;
    var odd = input.charCodeAt(0) >> 8;

    while ((i|0) < (input.length*2|0) && ((i|0) < (input.length*2-1|0) || odd==0)) {

        if (i%2==0) {
            chr1 = input.charCodeAt(i/2) >> 8;
            chr2 = input.charCodeAt(i/2) & 255;
            if (i/2+1 < input.length)
                chr3 = input.charCodeAt(i/2+1) >> 8;
            else
                chr3 = NaN;
        } else {
            chr1 = input.charCodeAt((i-1)/2) & 255;
            if ((i+1)/2 < input.length) {
                chr2 = input.charCodeAt((i+1)/2) >> 8;
                chr3 = input.charCodeAt((i+1)/2) & 255;
            } else
                chr2=chr3=NaN;
        }
        i+=3;

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2) || (i==input.length*2+1 && odd)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3) || (i==input.length*2 && odd)) {
            enc4 = 64;
        }

        output.push(_keyStr.charAt(enc1));
        output.push(_keyStr.charAt(enc2));
        output.push(_keyStr.charAt(enc3));
        output.push(_keyStr.charAt(enc4));
    }

    return output.join('');
};

function compress (input) {
    var output = [],
        ol = 1,
        output_,
        chr1, chr2, chr3,
        enc1, enc2, enc3, enc4,
        i = 0, flush=false;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        if (ol%2==0) {
            output_ = chr1 << 8;
            flush = true;

            if (enc3 != 64) {
                output.push(String.fromCharCode(output_ | chr2));
                flush = false;
            }
            if (enc4 != 64) {
                output_ = chr3 << 8;
                flush = true;
            }
        } else {
            output.push(String.fromCharCode(output_ | chr1));
            flush = false;

            if (enc3 != 64) {
                output_ = chr2 << 8;
                flush = true;
            }
            if (enc4 != 64) {
                output.push(String.fromCharCode(output_ | chr3));
                flush = false;
            }
        }
        ol+=3;
    }

    if (flush) {
        output.push(String.fromCharCode(output_));
        output = output.join('');
        output = String.fromCharCode(output.charCodeAt(0)|256) + output.substring(1);
    } else {
        output = output.join('');
    }

    return output;

}

export function bas64ToUTF16(input) {
    var output = [],
        i,c,
        current,
        status = 0,
    l = input.length | 0;

    input = compress(input);

    for (i=0 ; (i|0) < (input.length|0); i = (i+1|0)>>>0) {
        c = (input.charCodeAt(i|0) | 0) >>> 0;
        switch (status = (status + 1 | 0)>>>0) {
            case 0:
                output.push(String.fromCharCode((c >> 1) +32|0));
                current = (c & 1) << 14;
                break;
            case 1:
                output.push(String.fromCharCode((current + (c >> 2)) +32|0));
                current = (c & 3) << 13;
                break;
            case 2:
                output.push(String.fromCharCode((current + (c >> 3)) +32|0));
                current = (c & 7) << 12;
                break;
            case 3:
                output.push(String.fromCharCode((current + (c >> 4)) +32|0));
                current = (c & 15) << 11;
                break;
            case 4:
                output.push(String.fromCharCode((current + (c >> 5)) +32|0));
                current = (c & 31) << 10;
                break;
            case 5:
                output.push(String.fromCharCode((current + (c >> 6)) +32|0));
                current = (c & 63) << 9;
                break;
            case 6:
                output.push(String.fromCharCode((current + (c >> 7)) +32|0));
                current = (c & 127) << 8;
                break;
            case 7:
                output.push(String.fromCharCode((current + (c >> 8)) +32|0));
                current = (c & 255) << 7;
                break;
            case 8:
                output.push(String.fromCharCode((current + (c >> 9)) +32|0));
                current = (c & 511) << 6;
                break;
            case 9:
                output.push(String.fromCharCode((current + (c >> 10)) +32|0));
                current = (c & 1023) << 5;
                break;
            case 10:
                output.push(String.fromCharCode((current + (c >> 11)) +32|0));
                current = (c & 2047) << 4;
                break;
            case 11:
                output.push(String.fromCharCode((current + (c >> 12)) +32|0));
                current = (c & 4095) << 3;
                break;
            case 12:
                output.push(String.fromCharCode((current + (c >> 13)) +32|0));
                current = (c & 8191) << 2;
                break;
            case 13:
                output.push(String.fromCharCode((current + (c >> 14)) +32|0));
                current = (c & 16383) << 1;
                break;
            case 14:
                output.push(String.fromCharCode((current + (c >> 15)) +32|0, (c & 32767) +32|0));
                status = 0;
                break;
        }
    }
    output.push(String.fromCharCode(current + 32 | 0));
    return output.join('');
}

export function UTF16toBase64 (input) {

    var output = [],
        current = 0, c = 0,
        status=0,
        i = 0,
        l = input.length | 0;

    while ((i|0) < (l|0)) {

        c = (input.charCodeAt(i) - 32  | 0) >>> 0;

        switch (status = (status + 1 | 0) >>> 0) {
            case 0:
                current = c << 1;
                break;
            case 1:
                output.push(String.fromCharCode(current | (c >> 14) | 0));
                current = (c&16383) << 2;
                break;
            case 2:
                output.push(String.fromCharCode(current | (c >> 13) | 0));
                current = (c&8191) << 3;
                break;
            case 3:
                output.push(String.fromCharCode(current | (c >> 12) | 0));
                current = (c&4095) << 4;
                break;
            case 4:
                output.push(String.fromCharCode(current | (c >> 11) | 0));
                current = (c&2047) << 5;
                break;
            case 5:
                output.push(String.fromCharCode(current | (c >> 10) | 0));
                current = (c&1023) << 6;
                break;
            case 6:
                output.push(String.fromCharCode(current | (c >> 9) | 0));
                current = (c&511) << 7;
                break;
            case 7:
                output.push(String.fromCharCode(current | (c >> 8) | 0));
                current = (c&255) << 8;
                break;
            case 8:
                output.push(String.fromCharCode(current | (c >> 7) | 0));
                current = (c&127) << 9;
                break;
            case 9:
                output.push(String.fromCharCode(current | (c >> 6) | 0));
                current = (c&63) << 10;
                break;
            case 10:
                output.push(String.fromCharCode(current | (c >> 5) | 0));
                current = (c&31) << 11;
                break;
            case 11:
                output.push(String.fromCharCode(current | (c >> 4) | 0));
                current = (c&15) << 12;
                break;
            case 12:
                output.push(String.fromCharCode(current | (c >> 3) | 0));
                current = (c&7) << 13;
                break;
            case 13:
                output.push(String.fromCharCode(current | (c >> 2) | 0));
                current = (c&3) << 14;
                break;
            case 14:
                output.push(String.fromCharCode(current | (c >> 1) | 0));
                current = (c&1) << 15;
                break;
            case 15:
                output.push(String.fromCharCode(current | c | 0));
                status=0;
                break;
        }

        i = (i+1|0) >>> 0;
    }

    return decompress(output.join(''));
    //return output;

}