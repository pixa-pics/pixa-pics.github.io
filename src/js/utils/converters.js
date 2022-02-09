"use strict";
// Derived from waves-api
//
// Object.defineProperty(exports, "__esModule", { value: true });
import CryptoJS from 'crypto-js';
/** START OF THE LICENSED CODE */
/******************************************************************************
 * Copyright © 2013-2016 The Nxt Core Developers.                             *
 *                                                                            *
 * See the AUTHORS.txt, DEVELOPER-AGREEMENT.txt and LICENSE.txt files at      *
 * the top-level directory of this distribution for the individual copyright  *
 * holder information and the developer policies on copyright and licensing.  *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * Nxt software, including this file, may be copied, modified, propagated,    *
 * or distributed except according to the terms contained in the LICENSE.txt  *
 * file.                                                                      *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/
let charToNibble = {};
let nibbleToChar = [];
let i;
for (i = 0; i <= 9; ++i) {
    let character = i.toString();
    charToNibble[character] = i;
    nibbleToChar.push(character);
}
for (i = 10; i <= 15; ++i) {
    let lowerChar = String.fromCharCode('a'.charCodeAt(0) + i - 10);
    let upperChar = String.fromCharCode('A'.charCodeAt(0) + i - 10);
    charToNibble[lowerChar] = i;
    charToNibble[upperChar] = i;
    nibbleToChar.push(lowerChar);
}
const Converters = {
    byteArrayToHexString: function (bytes) {
        let str = '';
        for (let i_1 = 0; i_1 < bytes.length; ++i_1) {
            if (bytes[i_1] < 0) {
                bytes[i_1] += 256;
            }
            str += nibbleToChar[bytes[i_1] >> 4] + nibbleToChar[bytes[i_1] & 0x0F];
        }
        return str;
    },
    stringToByteArray: function (str) {
        str = unescape(encodeURIComponent(str));
        let bytes = new Array(str.length);
        for (let i_2 = 0; i_2 < str.length; ++i_2)
            bytes[i_2] = str.charCodeAt(i_2);
        return bytes;
    },
    hexStringToByteArray: function (str) {
        let bytes = [];
        let i = 0;
        if (0 !== str.length % 2) {
            bytes.push(charToNibble[str.charAt(0)]);
            ++i;
        }
        for (; i < str.length - 1; i += 2)
            bytes.push((charToNibble[str.charAt(i)] << 4) + charToNibble[str.charAt(i + 1)]);
        return bytes;
    },
    stringToHexString: function (str) {
        return this.byteArrayToHexString(this.stringToByteArray(str));
    },
    hexStringToString: function (hex) {
        return this.byteArrayToString(this.hexStringToByteArray(hex));
    },
    checkBytesToIntInput: function (bytes, numBytes, opt_startIndex) {
        let startIndex = opt_startIndex || 0;
        if (startIndex < 0) {
            throw new Error('Start index should not be negative');
        }
        if (bytes.length < startIndex + numBytes) {
            throw new Error('Need at least ' + (numBytes) + ' bytes to convert to an integer');
        }
        return startIndex;
    },
    byteArrayToSignedShort: function (bytes, opt_startIndex) {
        let index = this.checkBytesToIntInput(bytes, 2, opt_startIndex);
        let value = bytes[index];
        value += bytes[index + 1] << 8;
        return value;
    },
    byteArrayToSignedInt32: function (bytes, opt_startIndex) {
        let index = this.checkBytesToIntInput(bytes, 4, opt_startIndex);
        let value = bytes[index];
        value += bytes[index + 1] << 8;
        value += bytes[index + 2] << 16;
        value += bytes[index + 3] << 24;
        return value;
    },
    byteArrayToBigInteger: function (bytes, opt_startIndex) {
        let index = this.checkBytesToIntInput(bytes, 8, opt_startIndex);
        let value = new BigInteger('0', 10);
        let temp1, temp2;
        for (let i_3 = 7; i_3 >= 0; i_3--) {
            temp1 = value.multiply(new BigInteger('256', 10));
            temp2 = temp1.add(new BigInteger(bytes[opt_startIndex + i_3].toString(10), 10));
            value = temp2;
        }
        return value;
    },
    // create a wordArray that is Big-Endian
    byteArrayToWordArray: function (byteArray) {
        let i = 0, offset = 0, word = 0, len = byteArray.length;
        let words = new Uint32Array(((len / 4) | 0) + (len % 4 == 0 ? 0 : 1));
        while (i < (len - (len % 4))) {
            words[offset++] = (byteArray[i++] << 24) | (byteArray[i++] << 16) | (byteArray[i++] << 8) | (byteArray[i++]);
        }
        if (len % 4 != 0) {
            word = byteArray[i++] << 24;
            if (len % 4 > 1) {
                word = word | byteArray[i++] << 16;
            }
            if (len % 4 > 2) {
                word = word | byteArray[i++] << 8;
            }
            words[offset] = word;
        }
        let wordArray = new Object();
        wordArray.sigBytes = len;
        wordArray.words = words;
        return wordArray;
    },
    // assumes wordArray is Big-Endian
    wordArrayToByteArray: function (wordArray) {
        return Converters.wordArrayToByteArrayImpl(wordArray, true);
    },
    wordArrayToByteArrayImpl: function (wordArray, isFirstByteHasSign) {
        let len = wordArray.words.length;
        if (len == 0) {
            return new Array(0);
        }
        let byteArray = new Array(wordArray.sigBytes);
        let offset = 0, word, i;
        for (i = 0; i < len - 1; i++) {
            word = wordArray.words[i];
            byteArray[offset++] = isFirstByteHasSign ? word >> 24 : (word >> 24) & 0xff;
            byteArray[offset++] = (word >> 16) & 0xff;
            byteArray[offset++] = (word >> 8) & 0xff;
            byteArray[offset++] = word & 0xff;
        }
        word = wordArray.words[len - 1];
        byteArray[offset++] = isFirstByteHasSign ? word >> 24 : (word >> 24) & 0xff;
        if (wordArray.sigBytes % 4 == 0) {
            byteArray[offset++] = (word >> 16) & 0xff;
            byteArray[offset++] = (word >> 8) & 0xff;
            byteArray[offset++] = word & 0xff;
        }
        if (wordArray.sigBytes % 4 > 1) {
            byteArray[offset++] = (word >> 16) & 0xff;
        }
        if (wordArray.sigBytes % 4 > 2) {
            byteArray[offset++] = (word >> 8) & 0xff;
        }
        return byteArray;
    },
    byteArrayToString: function (bytes, opt_startIndex, length) {
        if (length == 0) {
            return '';
        }
        if (opt_startIndex && length) {
            let index = this.checkBytesToIntInput(bytes, parseInt(length, 10), parseInt(opt_startIndex, 10));
            bytes = bytes.slice(opt_startIndex, opt_startIndex + length);
        }
        return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
    },
    byteArrayToShortArray: function (byteArray) {
        let shortArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let i;
        for (i = 0; i < 16; i++) {
            shortArray[i] = byteArray[i * 2] | byteArray[i * 2 + 1] << 8;
        }
        return shortArray;
    },
    shortArrayToByteArray: function (shortArray) {
        let byteArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let i;
        for (i = 0; i < 16; i++) {
            byteArray[2 * i] = shortArray[i] & 0xff;
            byteArray[2 * i + 1] = shortArray[i] >> 8;
        }
        return byteArray;
    },
    shortArrayToHexString: function (ary) {
        let res = '';
        for (let i_4 = 0; i_4 < ary.length; i_4++) {
            res += nibbleToChar[(ary[i_4] >> 4) & 0x0f] + nibbleToChar[ary[i_4] & 0x0f] + nibbleToChar[(ary[i_4] >> 12) & 0x0f] + nibbleToChar[(ary[i_4] >> 8) & 0x0f];
        }
        return res;
    },
    /**
     * Produces an array of the specified number of bytes to represent the integer
     * value. Default output encodes ints in little endian format. Handles signed
     * as well as unsigned integers. Due to limitations in JavaScript's number
     * format, x cannot be a true 64 bit integer (8 bytes).
     */
    intToBytes_: function (x, numBytes, unsignedMax, opt_bigEndian) {
        let signedMax = Math.floor(unsignedMax / 2);
        let negativeMax = (signedMax + 1) * -1;
        if (x != Math.floor(x) || x < negativeMax || x > unsignedMax) {
            throw new Error(x + ' is not a ' + (numBytes * 8) + ' bit integer');
        }
        let bytes = [];
        let current;
        // Number type 0 is in the positive int range, 1 is larger than signed int,
        // and 2 is negative int.
        let numberType = x >= 0 && x <= signedMax ? 0 :
            x > signedMax && x <= unsignedMax ? 1 : 2;
        if (numberType == 2) {
            x = (x * -1) - 1;
        }
        for (let i_5 = 0; i_5 < numBytes; i_5++) {
            if (numberType == 2) {
                current = 255 - (x % 256);
            }
            else {
                current = x % 256;
            }
            if (opt_bigEndian) {
                bytes.unshift(current);
            }
            else {
                bytes.push(current);
            }
            if (numberType == 1) {
                x = Math.floor(x / 256);
            }
            else {
                x = x >> 8;
            }
        }
        return bytes;
    },
    int32ToBytes: function (x, opt_bigEndian) {
        return Converters.intToBytes_(x, 4, 4294967295, opt_bigEndian);
    },
    int16ToBytes: function (x, opt_bigEndian) {
        return Converters.intToBytes_(x, 2, 65535, opt_bigEndian);
    },
    /**
     * Based on https://groups.google.com/d/msg/crypto-js/TOb92tcJlU0/Eq7VZ5tpi-QJ
     * Converts a word array to a Uint8Array.
     * @param {WordArray} wordArray The word array.
     * @return {Uint8Array} The Uint8Array.
     */
    wordArrayToByteArrayEx: function (wordArray) {
        // Shortcuts
        let words = wordArray.words;
        let sigBytes = wordArray.sigBytes;
        // Convert
        let u8 = new Uint8Array(sigBytes);
        for (let i_6 = 0; i_6 < sigBytes; i_6++) {
            let byte = (words[i_6 >>> 2] >>> (24 - (i_6 % 4) * 8)) & 0xff;
            u8[i_6] = byte;
        }
        return u8;
    },
    /**
     * Converts a Uint8Array to a word array.
     * @param {string} u8Str The Uint8Array.
     * @return {WordArray} The word array.
     */
    byteArrayToWordArrayEx: function (u8arr) {
        // Shortcut
        let len = u8arr.length;
        // Convert
        let words = [];
        for (let i_7 = 0; i_7 < len; i_7++) {
            words[i_7 >>> 2] |= (u8arr[i_7] & 0xff) << (24 - (i_7 % 4) * 8);
        }
        return CryptoJS.lib.WordArray.create(words, len);
    },
};
/** END OF THE LICENSED CODE */
export default Converters;
//# sourceMappingURL=converters.js.map