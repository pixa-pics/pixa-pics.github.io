
const AFunction = Object.getPrototypeOf( function(){}).constructor;
window.base64_process_function = new AFunction(`

var fun = function (to, data, indexes) {

    var base64abcCC = Uint8Array.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
    var base64error_code = 255;
    var base64codes = Uint8Array.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);
    var base64codes_length = base64codes.length | 0;


    function bytesToBase64(bytes) {
        "use strict";
        
        var i = 2, j = 0;
        var l = bytes.length | 0;

        var k = l % 3;
        var n = Math.floor(l / 3) * 4 + (k && k + 1);
        var N = Math.ceil(l / 3) * 4;
        var result = new Uint8Array(N);

        for (i = 2, j = 0; (i|0) < (l|0); i = (i+3|0)>>>0, j = (j+4|0)>>>0) {
            result[j] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
            result[j+1|0] = base64abcCC[((bytes[i - 2 | 0] & 0x03) << 4) | (bytes[i - 1 | 0] >> 4)] & 0xFF;
            result[j+2|0] = base64abcCC[((bytes[i - 1 | 0] & 0x0F) << 2) | (bytes[i] >> 6)] & 0xFF;
            result[j+3|0] = base64abcCC[bytes[i] & 0x3F] & 0xFF;
        }
        if ((i|0) == (l + 1 | 0)) { // 1 octet yet to write
            result[j] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
            result[j+1|0] = base64abcCC[(bytes[i - 2 | 0] & 0x03) << 4] & 0xFF;
            result[j+2|0] = "=".charCodeAt(0) & 0xFF;
            result[j+3|0] = "=".charCodeAt(0) & 0xFF;
            j = (j+4|0)>>>0;
        }
        if ((i|0) == (l|0)) { // 2 octets yet to write
            result[j] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
            result[j+1|0] = base64abcCC[((bytes[i - 2 | 0] & 0x03) << 4) | (bytes[i - 1 | 0] >> 4)] & 0xFF;
            result[j+2|0] = base64abcCC[(bytes[i - 1 | 0] & 0x0F) << 2] & 0xFF;
            result[j+3|0] = "=".charCodeAt(0) & 0xFF;
            j = (j+4|0)>>>0;
        }

        var s = "";
        for(i = 0; i < result.length; i = (i+2048|0)>>>0){
            s = s.concat(String.fromCharCode.apply(null, result.subarray(i, Math.min(i+2048|0, result.length))));
        }

        return s;
    }

    function charCodeAt(s) {
        return s.charCodeAt(0) & 0xFF;
    }
    function getBase64CodesBufferResults(buffer) {
        return Uint8Array.of( buffer >> 16, (buffer >> 8) & 0xFF, buffer & 0xFF)
    }
    function getBase64Code(char_code) {

        char_code = (char_code | 0) >>> 0;
        if (((char_code|0)>>>0) >= ((base64codes_length|0)>>>0)) {throw new Error("Unable to parse base64 string.");}
        var code = (base64codes[char_code] | 0) >>> 0;
        if (((code|0)>>>0) == ((base64error_code|0)>>>0)) {throw new Error("Unable to parse base64 string.");}
        return code;
    }
    function getBase64CodesBuffer(str_char_codes) {
        return (getBase64Code(str_char_codes[0]) << 18 | getBase64Code(str_char_codes[1]) << 12 | getBase64Code(str_char_codes[2]) << 6 | getBase64Code(str_char_codes[3]) | 0) >>> 0;
    }
        
    function base64ToBytes(str) {

        if ((str.length % 4 | 0) > 0) {
            throw new Error("Unable to parse base64 string.");
        }
        var index = str.indexOf("=") | 0;
        if ((index|0) > -1 && (index|0) < (str.length - 2 | 0)) {
            throw new Error("Unable to parse base64 string.");
        }

        var str_char_code = Uint8Array.from(str.split("").map(function(s){ return charCodeAt(s)}));
        var missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0,
            n = str.length | 0,
            result = new Uint8Array(3 * (n / 4));

        var i = 0, j = 0;
        for (;(i|0) < (n|0); i = (i+4|0)>>>0, j = (j+3|0)>>>0) {
            result.set(getBase64CodesBufferResults(getBase64CodesBuffer(str_char_code.subarray(i, i+4|0))), j);
        }

        return result.slice(0, result.length - missingOctets | 0);
    }
    
    return new Promise(function(resolve, reject){

        if(to === "base64") {
        
            var data_a = new Array(indexes.length);
            var current_i = 0;
            indexes.forEach(function(i, y){
                
                data_a[y] = new Uint8Array(data.slice(current_i, current_i+i));
                current_i += i;
            });
            
            resolve(data_a.map(function (data) { return bytesToBase64(data); }))
        }else if(to === "bytes") {
            
            var data_buffer_length = 0;
            var data_buffer_add_index = 0;
            var data_buffer_add_indexes = new Array(data.length);
            var data_array = data.map(function (d) { return base64ToBytes(d); });
            data_array.forEach(function(d){data_buffer_length += (("buffer" in d) ? d.buffer.byteLength: d.byteLength);});
            var data_array_buffer = new Uint8Array(data_buffer_length);
            data_array.forEach(function(d, i){var b = ("buffer" in d) ? d.buffer: d; data_array_buffer.set(new Uint8Array(b), data_buffer_add_index); data_buffer_add_index += b.byteLength; data_buffer_add_indexes[i] = b.byteLength | 0;});

            resolve({data: data_array_buffer, indexes: data_buffer_add_indexes});
        }
    });
}; return fun;`)();

const worker_base64 = async(to, data_array, pool = null) => {

    if(to === "base64") {

        var data_buffer_length = 0;
        var data_buffer_add_index = 0;
        var data_buffer_add_indexes = new Array(data_array.length);
        data_array.forEach(function(d){data_buffer_length += (("buffer" in d) ? d.buffer.byteLength: d.byteLength);});
        var data_array_buffer = new Uint8Array(data_buffer_length);
        data_array.forEach(function(d, i){var b = ("buffer" in d) ? d.buffer: d; data_array_buffer.set(new Uint8Array(b), data_buffer_add_index); data_buffer_add_index += b.byteLength; data_buffer_add_indexes[i] = b.byteLength | 0; });


        if(Boolean(pool)) {

            return pool.exec(window.base64_process_function, [
                to, data_array_buffer.buffer, data_buffer_add_indexes
            ]).catch((e) => {

                return window.base64_process_function(to, data_array_buffer.buffer, data_buffer_add_indexes);
            }).timeout(40 * 1000);
        }else {

            return window.base64_process_function(to, data_array_buffer.buffer, data_buffer_add_indexes);
        }
    }else if(to === "bytes") {

        function handle_results({data, indexes}) {

            return new Promise(function (resolve, reject){
                var data_a = new Array(indexes.length);
                var current_i = 0;
                indexes.forEach(function(i, y){

                    data_a[y] = new Uint8Array(data.slice(current_i, current_i+i).buffer);
                    current_i += i;
                });

                resolve(data_a);
            });
        }

        if(Boolean(pool)) {

            return pool.exec(window.base64_process_function, [
                to, data_array, []
            ]).catch((e) => {

                return window.base64_process_function(to, data_array, []);
            }).then(handle_results).timeout(40 * 1000);
        }else {

            return window.base64_process_function(to, data_array, []).then(handle_results);
        }

    }else {

        return Promise.reject();
    }

};

module.exports = {worker_base64}