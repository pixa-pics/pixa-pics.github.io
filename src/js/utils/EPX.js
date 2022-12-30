"use strict";

import bltf from "../utils/b64_lzstring_to_function";
window.epx_process_function = bltf("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")

//var t=function(t,i){return new Promise((function(o){var e=function(){function t(t,i){t instanceof ImageData?(this.data=new Uint32Array(t.data.buffer),this.width=t.width,this.height=t.height):"number"==typeof t&&void 0!==i&&null!==typeof i&&(this.data=new Uint32Array(t),this.width=i)}return t.prototype.setDistSize=function(t){this.dist=new Uint32Array(this.data.length*Math.pow(t,2)),this.targetScale=t},t.prototype.getSourcePoint=function(t,i,o){return(t+o<this.width*Math.floor(t/this.width)||t+o>this.width*Math.floor(t/this.width+1)-1)&&(o+=0===o?0:o>0?-1:1),t+this.width*i+o<0||t+this.width*i+o>=this.data.length?(i+=0===i?0:i>0?-1:1,0===o&&0===i?this.data[t+this.width*i+o]:this.getSourcePoint(t,i,o)):this.data[t+this.width*i+o]},t.prototype.setDistPoint=function(t,i,o,e){this.dist[t+this.width*this.targetScale*i+o]=e},t.prototype.getDistPoint=function(t){return this.dist[t]},t.prototype.outImageData=function(){var t=new Uint8ClampedArray(this.dist.buffer);return new ImageData(t,this.width*this.targetScale)},t.prototype.outImageDataURL=function(){var t=this.outImageData();try{return(o=(i=new OffscreenCanvas(t.width,t.height)).getContext("2d"))?(o.putImageData(t,0,0),i.toDataURL()):""}catch(e){var i,o;return(o=(i=document.createElement("canvas")).getContext("2d"))?(o.canvas.width=t.width,o.canvas.height=t.height,o.putImageData(t,0,0),i.toDataURL()):""}},t.getR=function(t){return 255&t},t.getG=function(t){return t>>8&255},t.getB=function(t){return t>>16&255},t.getA=function(t){return t>>24},t.Interpolate=function(t,i,o,e){var n=t>>24,r=t>>16&255,a=t>>8&255,h=255&t,s=i>>24,u=i>>16&255,f=i>>8&255,d=255&i;if(void 0!==o&&void 0!==e)return n+s+(c=o>>24)+(e>>24)>>2<<24|r+u+(g=o>>16&255)+(e>>16&255)>>2<<16|a+f+(v=o>>8&255)+(e>>8&255)>>2<<8|h+d+(l=255&o)+(255&e)>>2;if(void 0!==o&&void 0===e){var c=o>>24,g=o>>16&255,v=o>>8&255,l=255&o;return Math.floor((n+s+c)/3)<<24|Math.floor((r+u+g)/3)<<16|Math.floor((a+f+v)/3)<<8|Math.floor((h+d+l)/3)}return n+s>>1<<24|r+u>>1<<16|a+f>>1<<8|h+d>>1},t.InterpolateWeighted2=function(t,i,o,e){var n=o+e,r=t>>24,a=t>>16&255,h=t>>8&255,s=255&t,u=i>>24,f=i>>16&255,d=i>>8&255,c=255&i;return Math.floor((r*o+u*e)/n)<<24|Math.floor((a*o+f*e)/n)<<16|Math.floor((h*o+d*e)/n)<<8|Math.floor((s*o+c*e)/n)},t.InterpolateWeighted3=function(t,i,o,e,n,r){var a=e+n+r,h=t>>24,s=t>>16&255,u=t>>8&255,f=255&t,d=i>>24,c=i>>16&255,g=i>>8&255,v=255&i,l=o>>24,P=o>>16&255,w=o>>8&255,D=255&o;return Math.floor((h*e+d*n+l*r)/a)<<24|Math.floor((s*e+c*n+P*r)/a)<<16|Math.floor((u*e+g*n+w*r)/a)<<8|Math.floor((f*e+v*n+D*r)/a)},t.InterpolateWeighted4=function(t,i,o,e,n,r,a,h){var s=n+r+a+h,u=t>>24,f=t>>16&255,d=t>>8&255,c=255&t,g=i>>24,v=i>>16&255,l=i>>8&255,P=255&i,w=o>>24,D=o>>16&255,p=o>>8&255,M=255&o,S=e>>24,m=e>>16&255,y=e>>8&255,I=255&e;return Math.floor((u*n+g*r+w*a+S*h)/s)<<24|Math.floor((f*n+v*r+D*a+m*h)/s)<<16|Math.floor((d*n+l*r+p*a+y*h)/s)<<8|Math.floor((c*n+P*r+M*a+I*h)/s)},t}(),n=function(){function t(){}return t.EPX=function(t,i){var o=!1;4===i&&(o=!0,i=2);var n=new e(t);n.setDistSize(i);for(var r=0;r<n.height;r++)for(var a=0;a<n.width;a++){var h=r*n.width+a,s=n.getSourcePoint(h,-1,0),u=n.getSourcePoint(h,0,-1),f=n.getSourcePoint(h,0,0),d=n.getSourcePoint(h,0,1),c=n.getSourcePoint(h,1,0),g=r*n.width*Math.pow(i,2)+a*i,v=void 0,l=void 0,P=void 0,w=void 0;if(2===i)s!==c&&u!==d?(v=u===s?u:f,l=s===d?d:f,P=u===c?u:f,w=c===d?d:f):v=l=P=w=f,n.setDistPoint(g,0,0,v),n.setDistPoint(g,0,1,l),n.setDistPoint(g,1,0,P),n.setDistPoint(g,1,1,w);else if(3===i){var D=n.getSourcePoint(h,-1,-1),p=n.getSourcePoint(h,-1,1),M=n.getSourcePoint(h,1,-1),S=n.getSourcePoint(h,1,1),m=void 0,y=void 0,I=void 0,U=void 0,A=void 0;s!==c&&u!==d?(v=u===s?u:f,l=u===s&&f!==p||s===d&&f!==D?s:f,m=s===d?d:f,P=u===s&&f!==M||u===c&&f!==D?u:f,w=f,y=s===d&&f!==S||c===d&&f!==p?d:f,I=u===c?u:f,U=u===c&&f!==S||c===d&&f!==M?c:f,A=c===d?d:f):v=l=m=P=w=y=I=U=A=f,n.setDistPoint(g,0,0,v),n.setDistPoint(g,0,1,l),n.setDistPoint(g,0,2,m),n.setDistPoint(g,1,0,P),n.setDistPoint(g,1,1,w),n.setDistPoint(g,1,2,y),n.setDistPoint(g,2,0,I),n.setDistPoint(g,2,1,U),n.setDistPoint(g,2,2,A)}}return o?this.EPX(n.outImageData(),2):n.outImageData()},t}();o(n.EPX(t,i))}))}; return t;
// Pixel Art Scaler: jsPixelFilter
/*
   jsPixelFilter
   Copyright (C) 2020 Kitsune Gadget
   Copyright (C) 2022 Matias Affolter
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
var fu = function(image_data, scale) {

    return new Promise(function (resolve, reject){


        var PixelData = (function () {
            function PixelData(obj, width) {
                if (obj instanceof ImageData) {
                    this.data = new Uint32Array(obj.data.buffer);
                    this.width = obj.width;
                    this.height = obj.height;
                }
                else if (typeof obj === 'number') {
                    if (typeof width !== 'undefined' && typeof width !== null) {
                        this.data = new Uint32Array(obj);
                        this.width = width;
                    }
                }
            }
            PixelData.prototype.setDistSize = function (scale) {
                this.dist = new Uint32Array(this.data.length * Math.pow(scale, 2));
                this.targetScale = scale;
            };
            PixelData.prototype.getSourcePoint = function (x, v, u) {
                if ((x + u) < this.width * Math.floor(x / this.width)
                    || (x + u) > this.width * Math.floor((x / this.width) + 1) - 1) {
                    // データは横方向に連続なので左右ボーダーを超えるときはuを1つ戻す
                    u += u === 0 ? 0 : u > 0 ? -1 : 1;
                }
                if ((x + this.width * v + u) < 0 || (x + this.width * v + u) >= this.data.length) {
                    // データ範囲外
                    v += v === 0 ? 0 : v > 0 ? -1 : 1;
                    if (u === 0 && v === 0) {
                        return this.data[x + this.width * v + u];
                    }
                    return this.getSourcePoint(x, v, u);
                    //
                }
                else {
                    return this.data[x + this.width * v + u];
                }
            };
            PixelData.prototype.setDistPoint = function (topleft, v, u, value) {
                this.dist[topleft + this.width * this.targetScale * v + u] = value;
            };
            PixelData.prototype.getDistPoint = function (trg) {
                return this.dist[trg];
            };
            PixelData.prototype.outImageData = function () {
                var outData = new Uint8ClampedArray(this.dist.buffer);
                // console.log(this.targetScale)
                return new ImageData(outData, this.width * this.targetScale);
            };
            PixelData.prototype.outImageDataURL = function () {
                var id = this.outImageData();

                try {
                    var canvas = new OffscreenCanvas(id.width, id.height);
                    var ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.putImageData(id, 0, 0);
                        return canvas.toDataURL();
                    }else {
                        return "";
                    }

                } catch(e) {

                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.canvas.width = id.width;
                        ctx.canvas.height = id.height;
                        ctx.putImageData(id, 0, 0);
                        return canvas.toDataURL();
                    }else {
                        return "";
                    }
                }
            };
            // ピクセルXのカラー取得
            PixelData.getR = function (X) {
                return X & 0xff;
            };
            PixelData.getG = function (X) {
                return (X >> 8) & 0xff;
            };
            PixelData.getB = function (X) {
                return (X >> 16) & 0xff;
            };
            PixelData.getA = function (X) {
                return X >> 24;
            };
            // ピクセル色補完
            PixelData.Interpolate = function (A, B, C, D) {
                var A_a = A >> 24;
                var A_b = (A >> 16) & 0xff;
                var A_g = (A >> 8) & 0xff;
                var A_r = A & 0xff;
                var B_a = B >> 24;
                var B_b = (B >> 16) & 0xff;
                var B_g = (B >> 8) & 0xff;
                var B_r = B & 0xff;
                if (C !== undefined && D !== undefined) {
                    var C_a = C >> 24;
                    var C_b = (C >> 16) & 0xff;
                    var C_g = (C >> 8) & 0xff;
                    var C_r = C & 0xff;
                    var D_a = D >> 24;
                    var D_b = (D >> 16) & 0xff;
                    var D_g = (D >> 8) & 0xff;
                    var D_r = D & 0xff;
                    return ((A_a + B_a + C_a + D_a) >> 2) << 24
                        | ((A_b + B_b + C_b + D_b) >> 2) << 16
                        | ((A_g + B_g + C_g + D_g) >> 2) << 8
                        | ((A_r + B_r + C_r + D_r) >> 2);
                    //
                }
                else if (C !== undefined && D === undefined) {
                    var C_a = C >> 24;
                    var C_b = (C >> 16) & 0xff;
                    var C_g = (C >> 8) & 0xff;
                    var C_r = C & 0xff;
                    return Math.floor((A_a + B_a + C_a) / 3) << 24
                        | Math.floor((A_b + B_b + C_b) / 3) << 16
                        | Math.floor((A_g + B_g + C_g) / 3) << 8
                        | Math.floor((A_r + B_r + C_r) / 3);
                    //
                }
                else {
                    return ((A_a + B_a) >> 1) << 24
                        | ((A_b + B_b) >> 1) << 16
                        | ((A_g + B_g) >> 1) << 8
                        | ((A_r + B_r) >> 1);
                }
            };
            PixelData.InterpolateWeighted2 = function (A, B, f1, f2) {
                var total = (f1 + f2);
                var A_a = A >> 24;
                var A_b = (A >> 16) & 0xff;
                var A_g = (A >> 8) & 0xff;
                var A_r = A & 0xff;
                var B_a = B >> 24;
                var B_b = (B >> 16) & 0xff;
                var B_g = (B >> 8) & 0xff;
                var B_r = B & 0xff;
                return Math.floor((A_a * f1 + B_a * f2) / total) << 24
                    | Math.floor((A_b * f1 + B_b * f2) / total) << 16
                    | Math.floor((A_g * f1 + B_g * f2) / total) << 8
                    | Math.floor((A_r * f1 + B_r * f2) / total);
            };
            PixelData.InterpolateWeighted3 = function (A, B, C, f1, f2, f3) {
                var total = (f1 + f2 + f3);
                var A_a = A >> 24;
                var A_b = (A >> 16) & 0xff;
                var A_g = (A >> 8) & 0xff;
                var A_r = A & 0xff;
                var B_a = B >> 24;
                var B_b = (B >> 16) & 0xff;
                var B_g = (B >> 8) & 0xff;
                var B_r = B & 0xff;
                var C_a = C >> 24;
                var C_b = (C >> 16) & 0xff;
                var C_g = (C >> 8) & 0xff;
                var C_r = C & 0xff;
                return Math.floor((A_a * f1 + B_a * f2 + C_a * f3) / total) << 24
                    | Math.floor((A_b * f1 + B_b * f2 + C_b * f3) / total) << 16
                    | Math.floor((A_g * f1 + B_g * f2 + C_g * f3) / total) << 8
                    | Math.floor((A_r * f1 + B_r * f2 + C_r * f3) / total);
            };
            PixelData.InterpolateWeighted4 = function (A, B, C, D, w1, w2, w3, w4) {
                var total = (w1 + w2 + w3 + w4);
                var A_a = A >> 24;
                var A_b = (A >> 16) & 0xff;
                var A_g = (A >> 8) & 0xff;
                var A_r = A & 0xff;
                var B_a = B >> 24;
                var B_b = (B >> 16) & 0xff;
                var B_g = (B >> 8) & 0xff;
                var B_r = B & 0xff;
                var C_a = C >> 24;
                var C_b = (C >> 16) & 0xff;
                var C_g = (C >> 8) & 0xff;
                var C_r = C & 0xff;
                var D_a = D >> 24;
                var D_b = (D >> 16) & 0xff;
                var D_g = (D >> 8) & 0xff;
                var D_r = D & 0xff;
                return Math.floor((A_a * w1 + B_a * w2 + C_a * w3 + D_a * w4) / total) << 24
                    | Math.floor((A_b * w1 + B_b * w2 + C_b * w3 + D_b * w4) / total) << 16
                    | Math.floor((A_g * w1 + B_g * w2 + C_g * w3 + D_g * w4) / total) << 8
                    | Math.floor((A_r * w1 + B_r * w2 + C_r * w3 + D_r * w4) / total);
            };
            return PixelData;
        }());
        var EPX = (function () {
            function EPX() {
            }
            // Eric's Pixel Expansion / Scale Nx Algorithm
            EPX.EPX = function (imageData, scale) {
                var twiceScale = false;
                if (scale === 4) {
                    twiceScale = true;
                    scale = 2;
                }
                var p = new PixelData(imageData);
                p.setDistSize(scale);
                for (var j = 0; j < p.height; j++) {
                    for (var i = 0; i < p.width; i++) {
                        var l = j * p.width + i;
                        // A  B  C
                        // D  E  F
                        // G  H  I
                        var B = p.getSourcePoint(l, -1, 0);
                        var D = p.getSourcePoint(l, 0, -1);
                        var E = p.getSourcePoint(l, 0, 0);
                        var F = p.getSourcePoint(l, 0, 1);
                        var H = p.getSourcePoint(l, 1, 0);
                        var rl = j * p.width * Math.pow(scale, 2) + i * scale;
                        var e00 = void 0, e01 = void 0, e10 = void 0, e11 = void 0;
                        if (scale === 2) {
                            if (B !== H && D !== F) {
                                e00 = D === B ? D : E;
                                e01 = B === F ? F : E;
                                e10 = D === H ? D : E;
                                e11 = H === F ? F : E;
                            }
                            else {
                                e00 = e01 = e10 = e11 = E;
                            }
                            p.setDistPoint(rl, 0, 0, e00);
                            p.setDistPoint(rl, 0, 1, e01);
                            p.setDistPoint(rl, 1, 0, e10);
                            p.setDistPoint(rl, 1, 1, e11);
                        }
                        else if (scale === 3) {
                            var A = p.getSourcePoint(l, -1, -1);
                            var C = p.getSourcePoint(l, -1, 1);
                            var G = p.getSourcePoint(l, 1, -1);
                            var I = p.getSourcePoint(l, 1, 1);
                            // out
                            var e02 = void 0, e12 = void 0, e20 = void 0, e21 = void 0, e22 = void 0;
                            if (B !== H && D !== F) {
                                e00 = D === B ? D : E;
                                e01 = (D === B && E !== C) || (B === F && E !== A) ? B : E;
                                e02 = B === F ? F : E;
                                e10 = (D === B && E !== G) || (D === H && E !== A) ? D : E;
                                e11 = E;
                                e12 = (B === F && E !== I) || (H === F && E !== C) ? F : E;
                                e20 = D === H ? D : E;
                                e21 = (D === H && E !== I) || (H === F && E !== G) ? H : E;
                                e22 = H === F ? F : E;
                            }
                            else {
                                e00 = e01 = e02 = e10 = e11 = e12 = e20 = e21 = e22 = E;
                            }
                            p.setDistPoint(rl, 0, 0, e00);
                            p.setDistPoint(rl, 0, 1, e01);
                            p.setDistPoint(rl, 0, 2, e02);
                            p.setDistPoint(rl, 1, 0, e10);
                            p.setDistPoint(rl, 1, 1, e11);
                            p.setDistPoint(rl, 1, 2, e12);
                            p.setDistPoint(rl, 2, 0, e20);
                            p.setDistPoint(rl, 2, 1, e21);
                            p.setDistPoint(rl, 2, 2, e22);
                        }
                    }
                } // end of for
                if (twiceScale) {
                    return this.EPX(p.outImageData(), 2);
                }
                else {
                    return p.outImageData();
                }
            };
            return EPX;
        }());

        resolve(EPX.EPX(image_data, scale));
    });
};*/

function epx(image_data, scale, pool) {

    return new Promise(function(resolve, reject){

        if(Boolean(pool)) {

            pool.exec(window.epx_process_function, [
                image_data,
                scale,
            ]).catch((e) => {

                return window.epx_process_function(image_data, scale);
            }).then((result) => {

                resolve(result);
            }).timeout(40 * 1000);

        }else {

            window.epx_process_function(image_data, scale).then((result) => {

                resolve(result);
            });
        }
    });
};

module.exports = { epx };