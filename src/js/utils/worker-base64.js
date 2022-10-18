
const AFunction = Object.getPrototypeOf( function(){}).constructor;
window.base64_process_function = new AFunction(`

var fun = function (to, data, indexes) {
    
    return new Promise(function(resolve, reject){

        var b64lookup = [];
        var urlLookup = [];
        var revLookup = [];
        var CODE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var CODE_B64 = CODE + '+/';
        var CODE_URL = CODE + '-_';
        var PAD = '=';
        var MAX_CHUNK_LENGTH = 16383; // must be multiple of 3

        for (var i = 0, len = CODE_B64.length; (i|0) < (len|0); ++i) {
            b64lookup[i] = CODE_B64[i];
            urlLookup[i] = CODE_URL[i];
            revLookup[CODE_B64.charCodeAt(i)] = i;
        }

        revLookup['-'.charCodeAt(0)] = 62;
        revLookup['_'.charCodeAt(0)] = 63;
        function getLens(b64) {
            var len = b64.length | 0;

            var validLen = b64.indexOf(PAD);
            if (validLen === -1)
                validLen = len;
            var placeHoldersLen = validLen === len
                ? 0
                : 4 - (validLen % 4);
            return [validLen, placeHoldersLen];
        }
        function _byteLength(validLen, placeHoldersLen) {
            return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen;
        }

        function base64ToBytes(str) {
            var tmp;
            switch (str.length % 4) {
                case 2:
                    str += "==";
                    break;
                case 3:
                    str += "=";
                    break;
            }
            var [validLen, placeHoldersLen] = getLens(str);
            var arr = new Uint8Array(_byteLength(validLen, placeHoldersLen));
            var curByte = 0;

            var len = placeHoldersLen > 0
                ? validLen - 4
                : validLen;
            var i;

            for (i = 0; (i|0) < (len|0); i = (i+4|0)>>>0) {
                tmp =
                    (revLookup[str.charCodeAt(i)] << 18) |
                    (revLookup[str.charCodeAt(i + 1)] << 12) |
                    (revLookup[str.charCodeAt(i + 2)] << 6) |
                    (revLookup[str.charCodeAt(i + 3)]);
                arr[curByte++] = (tmp >> 16) & 0xff;
                arr[curByte++] = (tmp >> 8) & 0xff;
                arr[curByte++] = (tmp) & 0xff;
            }
            if (placeHoldersLen == 2) {
                tmp =
                    (revLookup[str.charCodeAt(i)] << 2) |
                    (revLookup[str.charCodeAt(i + 1)] >> 4);
                arr[curByte++] = tmp & 0xff;
            }
            if (placeHoldersLen == 1) {
                tmp =
                    (revLookup[str.charCodeAt(i)] << 10) |
                    (revLookup[str.charCodeAt(i + 1)] << 4) |
                    (revLookup[str.charCodeAt(i + 2)] >> 2);
                arr[curByte++] = (tmp >> 8) & 0xff;
                arr[curByte++] = tmp & 0xff;
            }
            return arr;
        }
        function tripletToBase64(lookup, num) {
            return (lookup[num >> 18 & 0x3f] +
                lookup[num >> 12 & 0x3f] +
                lookup[num >> 6 & 0x3f] +
                lookup[num & 0x3f]);
        }
        function encodeChunk(lookup, view, start, end) {
            var tmp;
            var output = new Array((end - start) / 3);
            for (var i = start, j = 0; (i|0) < (end|0); i = (i+3|0)>>>0, j = (j+1|0)>>>0) {
                tmp =
                    ((view.getUint8(i) << 16) & 0xff0000) +
                    ((view.getUint8(i + 1) << 8) & 0x00ff00) +
                    (view.getUint8(i + 2) & 0x0000ff);
                output[j] = tripletToBase64(lookup, tmp);
            }
            return output.join('');
        }
        var bs2dv = function (bs){
            return bs instanceof ArrayBuffer
                ? new DataView(bs)
                : new DataView(bs.buffer, bs.byteOffset, bs.byteLength);
        };


        function bytesToBase64(bufferSource, urlFriendly = false) {
            var view = bs2dv(bufferSource);
            var len = view.byteLength;
            var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
            var len2 = len - extraBytes;
            var parts = new Array(Math.floor(len2 / MAX_CHUNK_LENGTH) + Math.sign(extraBytes));
            var lookup = urlFriendly ? urlLookup : b64lookup;
            var pad = urlFriendly ? '' : PAD;


            var j = 0;
            for (var i = 0; (i|0) < (len2|0); i = i + MAX_CHUNK_LENGTH|0) {
                parts[j++] = encodeChunk(lookup, view, i, (i + MAX_CHUNK_LENGTH) > len2 ? len2 : (i + MAX_CHUNK_LENGTH));
            }

            if (extraBytes === 1) {
                var tmp = view.getUint8(len - 1);
                parts[j] = (lookup[tmp >> 2] +
                    lookup[(tmp << 4) & 0x3f] +
                    pad + pad);
            }
            else if (extraBytes === 2) {
                var tmp = (view.getUint8(len - 2) << 8) + view.getUint8(len - 1);
                parts[j] = (lookup[tmp >> 10] +
                    lookup[(tmp >> 4) & 0x3f] +
                    lookup[(tmp << 2) & 0x3f] +
                    pad);
            }
            return parts.join('');
        }
        
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

const worker_base64 = (to, data_array, pool = null) => {

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

    }else if(to === "none") {

        return new Promise(function (resolve, reject){

            resolve(Uint8Array.from(data_array));
        });

    }else{

        return Promise.reject();
    }

};

module.exports = {worker_base64}