"use strict";

import bltf from "../utils/b64_lzstring_to_function";
window.epx_process_function = bltf("G4QwTgBALgvAZgVwHYGMoEsD2SAUUA06AlAN5gCmUCYSES5A7hAApiYC26AzuTjoqgzYcmUqEjl4yNFlykBM7NDyFSUCOiRcoIVOUxwIASXYgA5uQAiIHQH48AC24A6ACY2QMekwCqmqADMAEwAgmBgIACeeG4ezgBGCHBw5GBE+FBOXM4M6K6ZMFA5eZkZWc4O5OhmDrBFldW1RABcAERICOzxqa0whZEADvqGUABko8CYeRAADACEfejjHQA2Kwv9QwYa444u7jpejBB+SIGh4VF46ZkuufkOMMQAvhRUNNDOA2xQmFCD5GcPCglm4UAAyugAF6SBRCXBQNTlVxgo6+fzBMIRaK3bIHEDOFbkJBmTIAKgAsjYHF9MAwVEEiDdyjowBYISgQETCs8Ml8fn8Ac52eDMNQUORmFMzlJBLIVOh8KIyJRqAiANSYAA8uOKD0p1OccBWmEwYDwAHpdfdMkQAD52qCagB81pKDgNmSNJrNlrdD3VAEYiABaYO7TDqmAzPowTC2GbNTDOma2MPNYMZdX+8noTVamYOp05j155OFZFxIkkzL2PPR2PoBPNdAptOBjP4GN9TDjbtPWy6/EAbWL5Rtpc1AF1mrqRWKwBKpf4FUqmbPKzpR9nx+6yWWp7yit8/oKhkDKKDtMuZXD5QRFZh8OQkfswduS2TdayRZyifvpxgcgj35U9/nPdkrygG9YDvYRERVd5aCHd8oEPPkT1+cDATFKATHMKwPFlRQ5BIcRoDRE5/AADgAYRWEB2CGVwsSuFDtASJIUjSABuN41ToY58IsawdBUT9v3AX8uRfEDMLPHCEDw0wRI8HwACUABliPhHAxHACjdVw4TCLEogeKgMBIkQtURBgHB0EogB5ZIuBQChiVo3RQC4GIJz5BoakRIhhUoWjsCgcgAA8oBwVoglcVomXsTAviUkzRJAFQZi7dJ0GcX5Mo0zS9JaVpWmeTkoBQBwcBfMiDMfPjVRoOyHJgVxMBQTpiSKdzyBscgAFEiXYXq4s5JAfKSkL2XCs5oti+LEuSkRnEmny9QKIp/NSjaQGyQLakKCoqiCpU0uUgjMuy3LCAKzAiq00q2gqkD2XUnT71IfiPiCABWf7Rigd7KAAcS++Cfpa5DnWdajRgB/7QagAAhSGEWhpDoDhwMADZEcBlGQgx64bI+KA4aCAAWECjAWsABkwBjItJh8lWffTICQQoqep/AwF5518cJ/78E8Sn4dF/BHiR4H8C4J4+fwBAleFgmkfwOA1YRzXXBgOX0B49A4BwSZpnmHtxnN1xZg2F9ftoJB1S4dUcBQOM+aIN3yC9qmtS1Gm7TAdUEDdsxPfV0Xvbq3GNcBoh/a1fG7RAdU4Dd4BI91hOfbhnP/sT50ggD6i7QcdVXDdlYDcB0ZRDduWXyp43TZtu2rYmKZbf7eryI95Ni/5iPB5FzWs8Hgv8BruXMGa7GqS9Y1TXNHBnddlAiAtAIiADoPF5pZffRwEOw7MLed4DlOD+9Fe+DTjPgAv3etTLm+j9Xiuq5WZ/XhhugXa4z3tTYOocgHJzxqndO4Cy5f1xnTBmTMWbkAAOpnVqOQVwQQ2aEA5n3AyPNIzkAFkLGm4shZj0BjLIWU9FZywIKrVsQ8tZq0oWLfWTCp4e0NvPAS78fSrzAGSSMCAyQvgtEgF++9DQf3vsI9OYit6SKvpA/hd8cAekjK4RREiX5vxkQIvgXB5EoB0ZIhBkVGbM0GmgxokVXABBwY+Z8+AkACy5hATw5B1TOzANQyWZDFaSzYSrGh0ttb0PwBw5WHsmEhIjpw6WWdDbT0jmQ5gkcQkMGztLSwtcgZz0dhANRx8PTeO0c7FYZI0gWhAFIkBJTV7GO8aY52zBqlbzqSou0jS+CiO8WYMkzsGAdNqXonpBj1FwDEeqYAQz1SWFGXUixqQkE2PQfY6mTi8GuIFuLGWHjFa+PVGnBwoSAn821sE+O7Cwma24XXAgCTlZZziTc1JiTNYZJSdkweZC8mj3eQMHJmsKT5PrvgcEQFlbsGhVHTWkQ4VTyMOC8gvCPi9JwKI52gyQ4jLTuCMkDgt5cHqRMpehj+DzLmSHRZad2BEpJS/a+kzj4VPVFUkOAwyRp0iIyi0pLS7ksPpS1p6p2khwpDy9URh+WkqPM8PSrjSbyGkPCZQpA/7YyKENZgAANJxHjMAwDmIGHiWzFgRhNTlRyjIeLkR5t4CAvBEQ8SQBeEEYJIQwgcuZOAvpyKCxmHxLU7qjpQD4uqdURB/XmnIp4YNIBQ1bQcDxNO0aGqQEeEI91E4TkKy8KFCEC4lzSlimcsMd1VbuvnOKSUZaNFdnwGGdI2sa2UFFHWmCjacozHSPrdtxau0NrOTlTMHtB2dsXPWlcZzAx3QjjmlNnoaRM3pIqRkJz9z4Czu3HKNc934AyYe7Je7W44GwYsIgXANgoHGAgDYrh7BZ1Vn0LgtgEDNDgKkxWfQn2uC/UemAr6YAoA/YB7JHs/22AA3AFoWca4ZOyd+91wIoLdrME2nKT9XEevQw2zDY7p7pFQ5eMEGH8DzpyswEjeHyMEco4xhg5lyArB4BoU2jir2ZogHkydJaZ1nEbZWlt+BgX8eHbO5t87Mxgok9O7tc7pPpChfJ0tUmZPpFhYexFh6UWHp8DAQ9JMz03r6He0YD7oNm2A7Gd9n7v01xA1wcYcANgDAdL+jqrmNiWFsFwQDsKvP/sAxk5zPm+gUgdCBizbm+h+Yc/gZD+BEXBYizAcEDooPedGHFmAAwYOAZRTF8D37DMxfS5lu02XXDpYpLYFAgGSY1cK3B5oCGYCwqQzARFKLDMkxQ3R68DHe07to2h+jK5COMZ/rhibw2ptNqCPgdg42yMLaE5hqjR61ueo27FLbTHdv4cW/O5bkRjuTc2/gZbOUjCXf2zgTDy350+Ae9BBjy3lshCIM8LVAl4y6l1XqtezhjIqVMlldIjJmjuvB9dDwekFV6R4pgUHwOFRMmeFjniEAikRqAA==")

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