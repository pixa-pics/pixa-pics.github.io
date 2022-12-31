window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 12000;

var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);


const base64abcCC = Uint8ClampedArray.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
const CHUNCK_LENGTH = 256;

function bytesToBase64(bytes) {
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

function base64ToBytes(str) {

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

function charCodeAt(s) {
    return s.charCodeAt(0) & 0xFF;
}


function stringToUint(string) {
    "use strict";
    var charList = btoa(unescape(encodeURIComponent(string))).split(''),
        uint8Array = new Uint8Array(charList.length|0),
        rl = charList.length|0;

    for (var i = 0; (i|0) < (rl|0); i=(i+1|0)>>>0) {
        uint8Array[i|0] = (charCodeAt(charList[i|0])|0) & 0xFF;
    }
    return uint8Array;
}

function uintToString(uintArray) {
    "use strict";
    let encodedString = "";
    let rl = uintArray.length|0;
    for(var i = 0; (i|0) < (rl|0); i = (i+CHUNCK_LENGTH|0)>>>0){
        encodedString = encodedString.concat(String.fromCharCode.apply(null, uintArray.subarray(i|0, Math.min(i+CHUNCK_LENGTH|0, rl|0))));
    }

    return decodeURIComponent(escape(atob(encodedString)));
}

var fu = function(uint8a_or_string, mode) {return new Promise(function(resolve, reject){

    if(mode === "COMPRESS_BASE90") {

        var data = Array.from(LZString.compressToUint8Array(uint8a_or_string));
        var side  = Math.floor(Math.sqrt(data.length/4/3*4|0))+1;
        for(var i = 3; i < data.length; i+=4) {
            data.splice(i, 0, 255);
        }
        var difference = ((side * side) * 4) - data.length;
        var space_char_code = " ".charCodeAt(0);
        var spaces_char = new Array(difference).fill(space_char_code);
        var image_data = new ImageData(Uint8ClampedArray.from(data.concat(spaces_char)), side, side);
        console.log(image_data)

        var canvas = document.createElement("canvas");
        canvas.width = image_data.width;
        canvas.height = image_data.height;
        var context2d = canvas.getContext("2d");
        context2d.putImageData(image_data, 0, 0);

        resolve(difference+"#"+canvas.toDataURL("image/png").split(",")[1]);

    }else if(mode === "DECOMPRESS_BASE90") {

        var image = new Image();
        var difference = parseInt(uint8a_or_string.split("#")[0], 10);
        image.onload = function() {

            var canvas = document.createElement('canvas');
            var gl = canvas.getContext("webgl2");
            gl.activeTexture(gl.TEXTURE0);
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            var framebuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
            var data = new Uint8Array(image.width * image.height * 4);
            gl.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, data);
            data = data.subarray(0, data.length-difference);
            var all = [];
            for(var i = 0; i < data.length; i = i+4) {
                all = all.concat(Array.from(data.subarray(i, i+3)));
            }

            resolve(LZString.decompressFromUint8Array(Uint8Array.from(all)));
        }

        image.src = "data:image/png;base64," + uint8a_or_string.split("#")[1];


    }else {

        reject(null);
    }
})}

var encode = document.getElementById('encode'),
    decode = document.getElementById('decode'),
    output = document.getElementById('output'),
    input = document.getElementById('input');


encode.onclick = function() {
// Takes a plaintext input, compresses it with LZ and encodes in Base91.
    fu(input.value, "COMPRESS_BASE90").then(function(base90){
        display(base90);
    });
}

decode.onclick = function() {
// Takes a Base91-encoded, LZ-compressed string and converts to plaintext.
    fu(input.value, "DECOMPRESS_BASE90").then(function(base90){
        display(base90);
    });
}

function display(value)
{
    //Displays the output, and copies it to the clipboard if the option is checked.
    output.textContent = ""+value;
}

function indexedJSStringify(string) {
    string = string.replaceAll("Array", "#_#");
    string = string.replaceAll("Object", "@_@");
    string = string.replaceAll("prototype", "£_£");
    string = string.replaceAll("function", "$_$");
    string = string.replaceAll("return", "@.");
    string = string.replaceAll("Uint", ":.");
    string = string.replaceAll("length", "£.");
    string = string.replaceAll("Math", "$.");
    string = string.replaceAll("var", "#.");
    return string;
}
function indexedJSParse(string) {
    string = string.replaceAll("#_#", "Array");
    string = string.replaceAll("@_@", "Object");
    string = string.replaceAll("£_£", "prototype");
    string = string.replaceAll("$_$", "function");
    string = string.replaceAll("@.", "return");
    string = string.replaceAll(":.", "Uint");
    string = string.replaceAll("£.", "length");
    string = string.replaceAll("$.", "Math");
    string = string.replaceAll("#.", "var");
    return string;
}