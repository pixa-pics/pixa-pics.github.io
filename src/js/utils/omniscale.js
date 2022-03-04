/*
MIT License

Copyright (c) 2019 Dael
Copyright (c) 2022 ViperTech & CryptoRed

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

// Lior Halphon's Omniscale (Modified: Uses Maxim Stepin's Color comparison routine)
const process_function_string = `return async function(image_data, scale) {

        // static class methods for common filter operations
        class Common {
    
            static get Threshold() {
    
                return this.hasOwnProperty('_Threshold') ? this._Threshold : false;
            }
    
            static set Threshold(v) {
    
                this._Threshold = v;
            }
    
            static get ScaleX() {
    
                return this.hasOwnProperty('_ScaleX') ? this._ScaleX : parseInt(0);
            }
    
            static set ScaleX(v) {
    
                this._ScaleX = parseInt(v);
            }
    
            static get ScaleY() {
    
                return this.hasOwnProperty('_ScaleY') ? this._ScaleY : parseInt(0);
            }
    
            static set ScaleY(v) {
    
                this._ScaleY = parseInt(v);
            }
    
            static get SizeX() {
    
                return this.hasOwnProperty('_SizeX') ? this._SizeX : parseInt(0);
            }
    
            static set SizeX(v) {
    
                this._SizeX = parseInt(v);
            }
    
            static get SizeY() {
    
                return this.hasOwnProperty('_SizeY') ? this._SizeY : parseInt(0);
            }
    
            static set SizeY(v) {
    
                this._SizeY = parseInt(v);
            }
    
            static get ScaledImage() {
    
                return this.hasOwnProperty('_ScaledImage') ? this._ScaledImage : [];
            }
    
            static set ScaledImage(v) {
    
                this._ScaledImage = v;
            }
    
            static Copy(dst, src, Length) {
    
                for (var i = 0; i < Length; i++)
                    dst[i] = this._Clip8(src[i]);
            }
    
            static Copy2D(dst, src, dstx, dsty, srcx, srcy) {
    
                const Channels = 4;
    
                var xdim = Math.min(srcx, dstx);
                var ydim = Math.min(srcy, dsty);
    
                for (var y = 0; y < ydim; y++)
                    for (var x = 0; x < xdim; x++)
                        for (var Channel = 0; Channel < Channels; Channel++)
                            dst[(y * dstx + x) * Channels + Channel] = src[(y * srcx + x) * Channels + Channel];
            }
    
            static CopyPadded(src, srcx, srcy, scale) {
    
                const Channels = 4;
    
                var dim = Math.max(srcx, srcy);
                dim = Common.NextPow(dim, scale);
    
                var dst = new Uint8ClampedArray(dim * dim * Channels);
    
                Common.Copy2D(dst, src, dim, dim, srcx, srcy);
    
                return dst;
            }
    
            static CopyCropped(dst, src, dstx, dsty, srcx, srcy) {
    
                Common.Copy2D(dst, src, dstx, dsty, srcx, srcy);
            }
    
            static ToArray(Input, srcx, srcy) {
    
                var dst = new Uint32Array(srcx * srcy);
    
                var Channels = 4;
    
                for (var y = 0; y < srcy; y++) {
    
                    for (var x = 0; x < srcx; x++) {
    
                        var index = y * srcx + x;
                        var pixel = index * Channels;
    
                        var r = Input[pixel];
                        var g = Input[pixel + 1];
                        var b = Input[pixel + 2];
                        var a = Input[pixel + 3];
    
                        dst[index] = this.ARGBINT(a, r, g, b);
                    }
                }
    
                return dst;
            }
    
            static ToImage(dst, src, srcx, srcy) {
    
                var Channels = 4;
    
                for (var y = 0; y < srcy; y++) {
                    for (var x = 0; x < srcx; x++) {
    
                        var index = y * srcx + x;
                        var pixel = index * Channels;
    
                        dst[pixel] = this.Red(src[index]);
                        dst[pixel + 1] = this.Green(src[index]);
                        dst[pixel + 2] = this.Blue(src[index]);
                        dst[pixel + 3] = this.Alpha(src[index]);
                    }
                }
            }
    
            static _CLR(Input, srcx, srcy, x, y) {
    
                const Channels = 4;
    
                if (y >= 0 && y < srcy && x >= 0 && x < srcx) {
    
                    var index = (y * srcx + x) * Channels;
    
                    var r = Input[index];
                    var g = Input[index + 1];
                    var b = Input[index + 2];
                    var a = Input[index + 3];
    
                    return this.ARGBINT(a, r, g, b);
                }
    
                return 0;
            }
    
            static CLR(Input, srcx, srcy, x, y, dx = 0, dy = 0) {
    
                var xx = parseInt(x + dx);
                var yy = parseInt(y + dy);
    
                xx = Math.max(0, Math.min(srcx - 1, xx));
                yy = Math.max(0, Math.min(srcy - 1, yy));
    
                return this._CLR(Input, srcx, srcy, xx, yy);
            }
    
            static Alpha(rgb) {
    
                return parseInt(rgb >>> 24);
            }
    
            static Red(rgb) {
    
                return parseInt((rgb >>> 0 & 0x00FF0000) >> 16);
            }
    
            static Green(rgb) {
    
                return parseInt((rgb >>> 0 & 0x0000FF00) >> 8);
            }
    
            static Blue(rgb) {
    
                return parseInt(rgb >>> 0 & 0x000000FF);
            }
    
            static Brightness(rgb) {
    
                var dwordC = rgb & 0xFFFFFF;
    
                return this._Clip8((this.Red(dwordC) * 3 + this.Green(dwordC) * 3 + this.Blue(dwordC) * 2) >> 3);
            }
    
            static Luminance(rgb) {
    
                var r = parseFloat(this.Red(rgb));
                var g = parseFloat(this.Green(rgb));
                var b = parseFloat(this.Blue(rgb));
    
                return parseInt(0.299 * r + 0.587 * g + 0.114 * b);
            }
    
            static ChromaU(rgb) {
    
                var r = parseFloat(this.Red(rgb));
                var g = parseFloat(this.Green(rgb));
                var b = parseFloat(this.Blue(rgb));
    
                return parseInt(0.5 * r - 0.418688 * g - 0.081312 * b + 127.5);
            }
    
            static ChromaV(rgb) {
    
                var r = parseFloat(this.Red(rgb));
                var g = parseFloat(this.Green(rgb));
                var b = parseFloat(this.Blue(rgb));
    
                return parseInt(-0.168736 * r - 0.331264 * g + 0.5 * b + 127.5);
            }
    
            static IsLike(pixel1, pixel2) {
    
                if (!this.Threshold)
                    return pixel1 == pixel2;
    
                const _LUMINANCE_TRIGGER = 48;
                const _CHROMA_U_TRIGGER = 7;
                const _CHROMA_V_TRIGGER = 6;
    
                var delta = this.Luminance(pixel1) - this.Luminance(pixel2);
    
                if (Math.abs(delta) > _LUMINANCE_TRIGGER)
                    return false;
    
                delta = this.ChromaV(pixel1) - this.ChromaV(pixel2);
    
                if (Math.abs(delta) > _CHROMA_V_TRIGGER)
                    return false;
    
                delta = this.ChromaU(pixel1) - this.ChromaU(pixel2);
    
                return Math.abs(delta) <= _CHROMA_U_TRIGGER;
            }
    
            static IsNotLike(pixel1, pixel2) {
    
                return !this.IsLike(pixel1, pixel2);
            }
    
            static _Clip8(color) {
    
                return Math.max(0, Math.min(255, color));
            }
    
            static _Write4RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B) {
    
                if (x >= 0 && x < sizex && y >= 0 && y < sizey) {
    
                    const Channels = 4;
    
                    var dx = x * this.ScaleX;
                    var dy = y * this.ScaleY;
    
                    dx += (Pixel == 2 || Pixel == 4) ? 1 : 0;
                    dy += (Pixel == 3 || Pixel == 4) ? 1 : 0;
    
                    var dst = (dy * sizex * this.ScaleX + dx) * Channels;
    
                    Output[dst] = this._Clip8(R);
                    Output[dst + 1] = this._Clip8(G);
                    Output[dst + 2] = this._Clip8(B);
                    Output[dst + 3] = this._Clip8(A);
                }
            }
    
            static Write4RGBA(Output, sizex, sizey, x, y, Pixel, argb) {
    
                var R = this.Red(argb);
                var G = this.Green(argb);
                var B = this.Blue(argb);
                var A = this.Alpha(argb);
    
                this._Write4RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B);
            }
    
            static _Write9RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B) {
                if (x >= 0 && x < sizex && y >= 0 && y < sizey) {
    
                    const Channels = 4;
    
                    var deltax = 0;
                    var deltay = 0;
    
                    if (Pixel == 2 || Pixel == 5 || Pixel == 8) {
    
                        deltax = 1;
                    }
    
                    if (Pixel == 3 || Pixel == 6 || Pixel == 9) {
    
                        deltax = 2;
                    }
    
                    if (Pixel == 4 || Pixel == 5 || Pixel == 6) {
    
                        deltay = 1;
                    }
    
                    if (Pixel == 7 || Pixel == 8 || Pixel == 9) {
    
                        deltay = 2;
                    }
    
                    var dx = x * this.ScaleX + deltax;
                    var dy = y * this.ScaleY + deltay;
    
                    var dst = (dy * sizex * this.ScaleX + dx) * Channels;
    
                    Output[dst] = this._Clip8(R);
                    Output[dst + 1] = this._Clip8(G);
                    Output[dst + 2] = this._Clip8(B);
                    Output[dst + 3] = this._Clip8(A);
                }
            }
    
            static Write9RGBA(Output, sizex, sizey, x, y, Pixel, argb) {
    
                var R = this.Red(argb);
                var G = this.Green(argb);
                var B = this.Blue(argb);
                var A = this.Alpha(argb);
    
                this._Write9RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B);
            }
    
            static _Write16RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B) {
    
                if (x >= 0 && x < sizex && y >= 0 && y < sizey) {
    
                    const Channels = 4;
    
                    var deltax = 0;
                    var deltay = 0;
    
                    /*
                    01 02 03 04
                    05 06 07 08
                    09 10 11 12
                    13 14 15 16
                    */
    
                    if (Pixel == 2 || Pixel == 6 || Pixel == 10 || Pixel == 14) {
    
                        deltax = 1;
                    }
    
                    if (Pixel == 3 || Pixel == 7 || Pixel == 11 || Pixel == 15) {
    
                        deltax = 2;
                    }
    
                    if (Pixel == 4 || Pixel == 8 || Pixel == 12 || Pixel == 16) {
    
                        deltax = 3;
                    }
    
                    if (Pixel == 5 || Pixel == 6 || Pixel == 7 || Pixel == 8) {
    
                        deltay = 1;
                    }
    
                    if (Pixel == 9 || Pixel == 10 || Pixel == 11 || Pixel == 12) {
    
                        deltay = 2;
                    }
    
                    if (Pixel == 13 || Pixel == 14 || Pixel == 15 || Pixel == 16) {
    
                        deltay = 3;
                    }
    
                    var dx = x * this.ScaleX + deltax;
                    var dy = y * this.ScaleY + deltay;
    
                    var dst = (dy * sizex * this.ScaleX + dx) * Channels;
    
                    Output[dst] = this._Clip8(R);
                    Output[dst + 1] = this._Clip8(G);
                    Output[dst + 2] = this._Clip8(B);
                    Output[dst + 3] = this._Clip8(A);
                }
            }
    
            static Write16RGBA(Output, sizex, sizey, x, y, Pixel, argb) {
    
                var R = this.Red(argb);
                var G = this.Green(argb);
                var B = this.Blue(argb);
                var A = this.Alpha(argb);
    
                this._Write16RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B);
            }
    
            static WriteMagnify(Input, Output, sizex, sizey, x, y) {
    
                const Channels = 4;
    
                var x0 = x * this.ScaleX;
                var y0 = y * this.ScaleY;
    
                for (var deltay = 0; deltay < this.ScaleY; deltay++) {
                    for (var deltax = 0; deltax < this.ScaleX; deltax++) {
    
                        var dx = x0 + deltax;
                        var dy = y0 + deltay;
    
                        var dst = (dy * sizex * this.ScaleX + dx) * Channels;
    
                        var index = (y * sizex + x) * Channels;
    
                        for (var Channel = 0; Channel < Channels; Channel++) {
    
                            Output[dst + Channel] = Input[index + Channel];
                        }
                    }
                }
            }
    
            static RGBINT(r, g, b) {
    
                return parseInt((this._Clip8(r) << 16) + (this._Clip8(g) << 8) + this._Clip8(b));
            }
    
            static ARGBINT(a, r, g, b) {
    
                return ((((((a) >>> 0) << 24) >>> 0) | (((r) << 16) + ((g) << 8) + ((b)))) >>> 0);
            }
    
            static Truncate(color) {
    
                return this._Clip8(color);
            }
    
            static NextPow(v, scale) {
    
                var dim = 1;
    
                for (var i = 0; i < 10; i++) {
    
                    if (v <= dim)
                        break;
    
                    dim *= scale;
                }
    
                return dim;
            }
        }
    
    // brightness control
        class Brightness {
    
            static AdjustBrightness(color, level) {
    
                return Common.Truncate(color + level);
            }
        }
    
    // color interpolation
        class Interpolate {
    
            static Interpolate3P(pixel1, pixel2, pixel3) {
    
                var r = parseInt(parseInt(Common.Red(pixel1) + Common.Red(pixel2) + Common.Red(pixel3)) / 3);
                var g = parseInt(parseInt(Common.Green(pixel1) + Common.Green(pixel2) + Common.Green(pixel3)) / 3);
                var b = parseInt(parseInt(Common.Blue(pixel1) + Common.Blue(pixel2) + Common.Blue(pixel3)) / 3);
                var a = parseInt(parseInt(Common.Alpha(pixel1) + Common.Alpha(pixel2) + Common.Alpha(pixel3)) / 3);
    
                return Common.ARGBINT(a, r, g, b);
            }
    
            static Interpolate2P(pixel1, pixel2) {
    
                var r = parseInt(parseInt(Common.Red(pixel1) + Common.Red(pixel2)) >> 1);
                var g = parseInt(parseInt(Common.Green(pixel1) + Common.Green(pixel2)) >> 1);
                var b = parseInt(parseInt(Common.Blue(pixel1) + Common.Blue(pixel2)) >> 1);
                var a = parseInt(parseInt(Common.Alpha(pixel1) + Common.Alpha(pixel2)) >> 1);
    
                return Common.ARGBINT(a, r, g, b);
            }
    
            static Interpolate2P1Q(pixel1, pixel2, quantifier) {
    
                var r = parseInt(parseInt(Common.Red(pixel1) * (1.0 - quantifier) + Common.Red(pixel2) * quantifier));
                var g = parseInt(parseInt(Common.Green(pixel1) * (1.0 - quantifier) + Common.Green(pixel2) * quantifier));
                var b = parseInt(parseInt(Common.Blue(pixel1) * (1.0 - quantifier) + Common.Blue(pixel2) * quantifier));
                var a = parseInt(parseInt(Common.Alpha(pixel1) * (1.0 - quantifier) + Common.Alpha(pixel2) * quantifier));
    
                return Common.ARGBINT(a, r, g, b);
            }
    
            static Interpolate2P2Q(pixel1, pixel2, quantifier1, quantifier2) {
    
                var total = (quantifier1 + quantifier2);
    
                var r = parseInt(((Common.Red(pixel1) * quantifier1 + Common.Red(pixel2) * quantifier2)) / total);
                var g = parseInt(((Common.Green(pixel1) * quantifier1 + Common.Green(pixel2) * quantifier2)) / total);
                var b = parseInt(((Common.Blue(pixel1) * quantifier1 + Common.Blue(pixel2) * quantifier2)) / total);
                var a = parseInt(((Common.Alpha(pixel1) * quantifier1 + Common.Alpha(pixel2) * quantifier2)) / total);
    
                return Common.ARGBINT(a, r, g, b);
            }
    
            static Interpolate3P3Q(pixel1, pixel2, pixel3, quantifier1, quantifier2, quantifier3) {
    
                var total = parseInt(quantifier1 + quantifier2 + quantifier3);
    
                var r = parseInt((Common.Red(pixel1) * quantifier1 + Common.Red(pixel2) * quantifier2 + Common.Red(pixel3) * quantifier3) / total);
                var g = parseInt((Common.Green(pixel1) * quantifier1 + Common.Green(pixel2) * quantifier2 + Common.Green(pixel3) * quantifier3) / total);
                var b = parseInt((Common.Blue(pixel1) * quantifier1 + Common.Blue(pixel2) * quantifier2 + Common.Blue(pixel3) * quantifier3) / total);
                var a = parseInt((Common.Alpha(pixel1) * quantifier1 + Common.Alpha(pixel2) * quantifier2 + Common.Alpha(pixel3) * quantifier3) / total);
    
                return Common.ARGBINT(a, r, g, b);
            }
    
            static Interpolate4P(pixel1, pixel2, pixel3, pixel4) {
    
                var r = parseInt((Common.Red(pixel1) + Common.Red(pixel2) + Common.Red(pixel3) + Common.Red(pixel4)) >> 2);
                var g = parseInt((Common.Green(pixel1) + Common.Green(pixel2) + Common.Green(pixel3) + Common.Green(pixel4)) >> 2);
                var b = parseInt((Common.Blue(pixel1) + Common.Blue(pixel2) + Common.Blue(pixel3) + Common.Blue(pixel4)) >> 2);
                var a = parseInt((Common.Alpha(pixel1) + Common.Alpha(pixel2) + Common.Alpha(pixel3) + Common.Alpha(pixel4)) >> 2);
    
                return Common.ARGBINT(a, r, g, b);
            }
    
            static Interpolate4P4Q(pixel1, pixel2, pixel3, pixel4, quantifier1, quantifier2, quantifier3, quantifier4) {
    
                var total = parseInt(quantifier1 + quantifier2 + quantifier3 + quantifier4);
    
                var r = parseInt((Common.Red(pixel1) * quantifier1 + Common.Red(pixel2) * quantifier2 + Common.Red(pixel3) * quantifier3 + Common.Red(pixel4) * quantifier4) / total);
                var g = parseInt((Common.Green(pixel1) * quantifier1 + Common.Green(pixel2) * quantifier2 + Common.Green(pixel3) * quantifier3 + Common.Green(pixel4) * quantifier4) / total);
                var b = parseInt((Common.Blue(pixel1) * quantifier1 + Common.Blue(pixel2) * quantifier2 + Common.Blue(pixel3) * quantifier3 + Common.Blue(pixel4) * quantifier4) / total);
                var a = parseInt((Common.Alpha(pixel1) * quantifier1 + Common.Alpha(pixel2) * quantifier2 + Common.Alpha(pixel3) * quantifier3 + Common.Alpha(pixel4) * quantifier4) / total);
    
                return Common.ARGBINT(a, r, g, b);
            }
    
            static Mixpal(c1, c2) {
    
                return (this.Interpolate2P2Q(c1, c2, 3, 1));
            }
    
            static Fix(n, min, max) {
    
                return Math.max(Math.min(n, max), min);
            }
    
            static Unmix(c1, c2) {
    
                /* A variant of an unsharp mask, without the blur part. */
    
                var ra = Common.Red(c1);
                var ga = Common.Green(c1);
                var ba = Common.Blue(c1);
                var aa = Common.Alpha(c1);
    
                var rb = Common.Red(c2);
                var gb = Common.Green(c2);
                var bb = Common.Blue(c2);
                var ab = Common.Alpha(c2);
    
                var r = ((this.Fix((ra + (ra - rb)), 0, 255) + rb) >> 1);
                var g = ((this.Fix((ga + (ga - gb)), 0, 255) + gb) >> 1);
                var b = ((this.Fix((ba + (ba - bb)), 0, 255) + bb) >> 1);
                var a = ((this.Fix((aa + (aa - ab)), 0, 255) + ab) >> 1);
    
                return Common.ARGBINT(a, r, g, b);
            }
        }
    
    // image flips
        class Flip {
    
            static FlipUD(src, sizex, sizey) {
    
                const Channels = 4;
    
                if (src.length > 0) {
    
                    for (var y = 0; y < sizey / 2; y++) {
                        for (var x = 0; x < sizex; x++) {
    
                            var index = (y * sizex + x) * Channels;
                            var rev = ((sizey - y - 1) * sizex + x) * Channels;
    
                            for (var Channel = 0; Channel < Channels; Channel++) {
    
                                var temp = src[index + Channel];
                                src[index + Channel] = src[rev + Channel];
                                src[rev + Channel] = temp;
                            }
                        }
                    }
                }
            }
    
            static FlipLR(src, sizex, sizey) {
    
                const Channels = 4;
    
                if (src.length > 0) {
    
                    for (var y = 0; y < sizey; y++) {
                        for (var x = 0; x < sizex / 2; x++) {
    
                            var index = (y * sizex + x) * Channels;
                            var rev = (y * sizex + (sizex - x - 1)) * Channels;
    
                            for (var Channel = 0; Channel < Channels; Channel++) {
    
                                var temp = src[index + Channel];
                                src[index + Channel] = src[rev + Channel];
                                src[rev + Channel] = temp;
                            }
                        }
                    }
                }
            }
        }
    
        class Rotate {
    
            static Transpose(dst, src, srcx, srcy) {
    
                const Channels = 4;
    
                for (var y = 0; y < srcy; y++) {
                    for (var x = 0; x < srcx; x++) {
                        for (var Channel = 0; Channel < Channels; Channel++) {
    
                            dst[(x * srcy + y) * Channels + Channel] = src[(y * srcx + x) * Channels + Channel];
                        }
                    }
                }
            }
    
            static Rotate90(dst, src, srcx, srcy) {
    
                this.Transpose(dst, src, srcx, srcy);
    
                Flip.FlipUD(dst, srcy, srcx);
            }
    
            static Rotate180(dst, src, srcx, srcy) {
    
                const Channels = 4;
    
                Common.Copy(dst, src, srcx * srcy * Channels);
    
                Flip.FlipUD(dst, srcx, srcy);
    
                Flip.FlipLR(dst, srcx, srcy);
            }
    
            static Rotate270(dst, src, srcx, srcy) {
    
                Flip.FlipUD(src, srcx, srcy);
    
                this.Transpose(dst, src, srcx, srcy);
            }
        }
    
        class Kreed {
    
            static Conc2D(c00, c01, c10, c11) {
    
                var result = 0;
    
                var acAreAlike = Common.IsLike(c00, c10);
    
                var x = acAreAlike ? 1 : 0;
                var y = (Common.IsLike(c01, c10) && !(acAreAlike)) ? 1 : 0;
    
                var adAreAlike = Common.IsLike(c00, c11);
    
                x += adAreAlike ? 1 : 0;
                y += (Common.IsLike(c01, c11) && !(adAreAlike)) ? 1 : 0;
    
                if (x <= 1)
                    result++;
    
                if (y <= 1)
                    result--;
    
                return (result);
            }
        }
    
        class ReverseAA {
    
            static Clamp(v, min, max) {
    
                return parseInt(Math.min(max, Math.max(v, min)));
            }
    
            static FullClamp(value) {
    
                return Common._Clip8(value);
            }
    
            static _ReverseAntiAlias(b1, b, d, e, f, h, h5, d0, f4) {
    
                var n1 = b1;
                var n2 = b;
                var s = e;
                var n3 = h;
                var n4 = h5;
                var aa = n2 - n1;
                var bb = s - n2;
                var cc = n3 - s;
                var dd = n4 - n3;
    
                var tilt = (7 * (bb + cc) - 3 * (aa + dd)) / 16;
    
                var m = (s < 128) ? 2 * s : 2 * (255 - s);
    
                m = Math.min(m, 2 * Math.abs(bb));
                m = Math.min(m, 2 * Math.abs(cc));
    
                tilt = this.Clamp(tilt, -m, m);
    
                var s1 = s + tilt / 2;
                var s0 = s1 - tilt;
    
                n1 = d0;
                n2 = d;
                s = s0;
                n3 = f;
                n4 = f4;
                aa = n2 - n1;
                bb = s - n2;
                cc = n3 - s;
                dd = n4 - n3;
    
                tilt = (7 * (bb + cc) - 3 * (aa + dd)) / 16;
    
                m = (s < 128) ? 2 * s : 2 * (255 - s);
    
                m = Math.min(m, 2 * Math.abs(bb));
                m = Math.min(m, 2 * Math.abs(cc));
    
                tilt = this.Clamp(tilt, -m, m);
    
                var e1 = s + tilt / 2;
                var e0 = e1 - tilt;
    
                s = s1;
                bb = s - n2;
                cc = n3 - s;
    
                tilt = (7 * (bb + cc) - 3 * (aa + dd)) / 16;
    
                m = (s < 128) ? 2 * s : 2 * (255 - s);
    
                m = Math.min(m, 2 * Math.abs(bb));
                m = Math.min(m, 2 * Math.abs(cc));
    
                tilt = this.Clamp(tilt, -m, m);
    
                var e3 = s + tilt / 2;
                var e2 = e3 - tilt;
    
                return { rd: this.FullClamp(e0), gn: this.FullClamp(e1), bl: this.FullClamp(e2), alpha: this.FullClamp(e3) };
            }
        }
    
    // image initialization
        class Init {
    
            static Buffer(Length, c) {
    
                const Channels = 4;
    
                var buffer = new Uint8ClampedArray(Length * Channels);
    
                for (var i = 0; i < Length; i++) {
    
                    var index = i * Channels;
    
                    buffer[index] = parseInt(c);
                    buffer[index + 1] = parseInt(c);
                    buffer[index + 2] = parseInt(c);
                    buffer[index + 3] = 255;
                }
    
                return buffer;
            }
    
            static New(x, y) {
    
                return this.Buffer(x * y, 0);
            }
    
            static Init(srcx, srcy, FilterScaleX, FilterScaleY, ComparisonThreshold) {
    
                Common.ScaleX = FilterScaleX;
                Common.ScaleY = FilterScaleY;
                Common.SizeX = srcx * FilterScaleX;
                Common.SizeY = srcy * FilterScaleY;
                Common.Threshold = ComparisonThreshold;
    
                Common.ScaledImage = this.New(Common.SizeX, Common.SizeY);
            }
        }
    
    
        // Lior Halphon's Omniscale (Modified: Uses Maxim Stepin's Color comparison routine)
        var Filter = class {
    
            Apply(Input, srcx, srcy, scale, threshold) {
    
                var Channels = 4;
    
                scale = Math.max(1, scale);
    
                Init.Init(srcx, srcy, scale, scale, threshold);
    
                var total = Common.SizeY;
                var current = 0;
    
                for (var y = 0; y < Common.SizeY; y++) {
    
                    var offset = y * Common.SizeX;
                    var positiony = y / Common.SizeY;
    
                    for (var x = 0; x < Common.SizeX; x++) {
    
                        var argb = this.ScaleImage(Input, x / Common.SizeX, positiony, srcx, srcy, Common.SizeX, Common.SizeY);
    
                        Common.ScaledImage[(offset + x) * Channels] = Common.Red(argb);
                        Common.ScaledImage[(offset + x) * Channels + 1] = Common.Green(argb);
                        Common.ScaledImage[(offset + x) * Channels + 2] = Common.Blue(argb);
                        Common.ScaledImage[(offset + x) * Channels + 3] = Common.Alpha(argb);
                    }
    
                    current++;
    
                    //notify({ ScalingProgress: current / total });
                }
    
                return new ImageData(new Uint8ClampedArray(Common.ScaledImage), srcx * scale, srcy * scale);
            }
    
            is_different(a, b) {
    
                return Common.IsNotLike(a, b);
            }
    
            mix(x, y, a) {
    
                return Interpolate.Interpolate2P1Q(x, y, a);
            }
    
            fract(x) {
    
                return x - Math.floor(x);
            }
    
            P(pattern, m, r) {
    
                return ((pattern & (m)) == (r))
            }
    
            Mul(x, y) {
    
                var r = Common.Red(x) * y;
                var g = Common.Green(x) * y;
                var b = Common.Blue(x) * y;
                var a = Common.Alpha(x) * y;
    
                return Common.ARGBINT(a, r, g, b);
            }
    
            Add(x, y, scale) {
    
                var r = (Common.Red(x) + Common.Red(y)) * scale;
                var g = (Common.Green(x) + Common.Green(y)) * scale;
                var b = (Common.Blue(x) + Common.Blue(y)) * scale;
                var a = (Common.Alpha(x) + Common.Alpha(y)) * scale;
    
                return Common.ARGBINT(a, r, g, b);
            }
    
            length(a, b) {
    
                return Math.sqrt(a * a + b * b);
            }
    
            ScaleImage(image, ppx, ppy, srcx, srcy, dstx, dsty) {
    
                var ox = 1.0 / srcx;
                var oy = 1.0 / srcy;
    
                var px = this.fract(ppx * srcx);
                var py = this.fract(ppy * srcy);
    
                if (px > 0.5) {
    
                    ox = -ox;
                    px = 1.0 - px;
                }
    
                if (py > 0.5) {
    
                    oy = -oy;
                    py = 1.0 - py;
                }
    
                // convert texture coordinates to image coordinates
                ox = parseInt(ox * srcx);
                oy = parseInt(oy * srcy);
    
                var positionx = parseInt(ppx * srcx);
                var positiony = parseInt(ppy * srcy);
    
                var w0 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox, -oy);
                var w1 = Common.CLR(image, srcx, srcy, positionx, positiony, 0, -oy);
                var w2 = Common.CLR(image, srcx, srcy, positionx, positiony, ox, -oy);
                var w3 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox, 0);
                var w4 = Common.CLR(image, srcx, srcy, positionx, positiony, 0, 0);
                var w5 = Common.CLR(image, srcx, srcy, positionx, positiony, ox, 0);
                var w6 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox, oy);
                var w7 = Common.CLR(image, srcx, srcy, positionx, positiony, 0, oy);
                var w8 = Common.CLR(image, srcx, srcy, positionx, positiony, ox, oy);
    
                var pattern = 0;
    
                if (this.is_different(w0, w4)) pattern |= (1 << 0);
                if (this.is_different(w1, w4)) pattern |= (1 << 1);
                if (this.is_different(w2, w4)) pattern |= (1 << 2);
                if (this.is_different(w3, w4)) pattern |= (1 << 3);
                if (this.is_different(w5, w4)) pattern |= (1 << 4);
                if (this.is_different(w6, w4)) pattern |= (1 << 5);
                if (this.is_different(w7, w4)) pattern |= (1 << 6);
                if (this.is_different(w8, w4)) pattern |= (1 << 7);
    
                if ((this.P(pattern, 0xbf, 0x37) || this.P(pattern, 0xdb, 0x13)) && this.is_different(w1, w5))
                    return this.mix(w4, w3, 0.5 - px);
    
                if ((this.P(pattern, 0xdb, 0x49) || this.P(pattern, 0xef, 0x6d)) && this.is_different(w7, w3))
                    return this.mix(w4, w1, 0.5 - py);
    
                if ((this.P(pattern, 0x0b, 0x0b) || this.P(pattern, 0xfe, 0x4a) || this.P(pattern, 0xfe, 0x1a)) && this.is_different(w3, w1))
                    return w4;
    
                if ((this.P(pattern, 0x6f, 0x2a) || this.P(pattern, 0x5b, 0x0a) || this.P(pattern, 0xbf, 0x3a) || this.P(pattern, 0xdf, 0x5a) || this.P(pattern, 0x9f, 0x8a) || this.P(pattern, 0xcf, 0x8a) || this.P(pattern, 0xef, 0x4e) || this.P(pattern, 0x3f, 0x0e) ||
                    this.P(pattern, 0xfb, 0x5a) || this.P(pattern, 0xbb, 0x8a) || this.P(pattern, 0x7f, 0x5a) || this.P(pattern, 0xaf, 0x8a) || this.P(pattern, 0xeb, 0x8a)) && this.is_different(w3, w1))
                    return this.mix(w4, this.mix(w4, w0, 0.5 - px), 0.5 - py);
    
                if (this.P(pattern, 0x0b, 0x08))
                    return this.mix(this.mix(this.Mul(w0, 0.375) + this.Mul(w1, 0.25) + this.Mul(w4, 0.375), this.Mul(w4, 0.5) + this.Mul(w1, 0.5), px * 2.0), w4, py * 2.0);
    
                if (this.P(pattern, 0x0b, 0x02))
                    return this.mix(this.mix(this.Mul(w0, 0.375) + this.Mul(w3, 0.25) + this.Mul(w4, 0.375), this.Mul(w4, 0.5) + this.Mul(w3, 0.5), py * 2.0), w4, px * 2.0);
    
                var r, dist, pixel_size;
    
                if (this.P(pattern, 0x2f, 0x2f)) {
    
                    dist = this.length(px - 0.5, py - 0.5);
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy));
    
                    if (dist < 0.5 - pixel_size / 2) {
    
                        return w4;
                    }
    
                    if (this.is_different(w0, w1) || this.is_different(w0, w3)) {
    
                        r = this.mix(w1, w3, py - px + 0.5);
    
                    } else {
    
                        r = this.mix(this.mix(this.Mul(w1, 0.375) + this.Mul(w0, 0.25) + this.Mul(w3, 0.375), w3, py * 2.0), w1, px * 2.0);
                    }
    
                    if (dist > 0.5 + pixel_size / 2) {
    
                        return r;
                    }
    
                    return this.mix(w4, r, (dist - 0.5 + pixel_size / 2) / pixel_size);
                }
    
                if (this.P(pattern, 0xbf, 0x37) || this.P(pattern, 0xdb, 0x13)) {
    
                    dist = px - 2.0 * py;
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy)) * Math.sqrt(5.0);
    
                    if (dist > pixel_size / 2) {
    
                        return w1;
                    }
    
                    r = this.mix(w3, w4, px + 0.5);
    
                    if (dist < -pixel_size / 2) {
    
                        return r;
                    }
    
                    return this.mix(r, w1, (dist + pixel_size / 2) / pixel_size);
                }
    
                if (this.P(pattern, 0xdb, 0x49) || this.P(pattern, 0xef, 0x6d)) {
    
                    dist = py - 2.0 * px;
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy)) * Math.sqrt(5.0);
    
                    if (py - 2.0 * px > pixel_size / 2) {
    
                        return w3;
                    }
    
                    r = this.mix(w1, w4, px + 0.5);
    
                    if (dist < -pixel_size / 2) {
    
                        return r;
                    }
    
                    return this.mix(r, w3, (dist + pixel_size / 2) / pixel_size);
                }
    
                if (this.P(pattern, 0xbf, 0x8f) || this.P(pattern, 0x7e, 0x0e)) {
    
                    dist = px + 2.0 * py;
    
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy)) * Math.sqrt(5.0);
    
                    if (dist > 1.0 + pixel_size / 2) {
    
                        return w4;
                    }
    
                    if (this.is_different(w0, w1) || this.is_different(w0, w3)) {
    
                        r = this.mix(w1, w3, py - px + 0.5);
    
                    } else {
    
                        r = this.mix(this.mix(this.Mul(w1, 0.375) + this.Mul(w0, 0.25) + this.Mul(w3, 0.375), w3, py * 2.0), w1, px * 2.0);
                    }
    
                    if (dist < 1.0 - pixel_size / 2) {
    
                        return r;
                    }
    
                    return this.mix(r, w4, (dist + pixel_size / 2 - 1.0) / pixel_size);
                }
    
                if (this.P(pattern, 0x7e, 0x2a) || this.P(pattern, 0xef, 0xab)) {
    
                    dist = py + 2.0 * px;
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy)) * Math.sqrt(5.0);
    
                    if (py + 2.0 * px > 1.0 + pixel_size / 2) {
    
                        return w4;
                    }
    
                    if (this.is_different(w0, w1) || this.is_different(w0, w3)) {
    
                        r = this.mix(w1, w3, py - px + 0.5);
    
                    } else {
    
                        r = this.mix(this.mix(this.Mul(w1, 0.375) + this.Mul(w0, 0.25) + this.Mul(w3, 0.375), w3, py * 2.0), w1, px * 2.0);
                    }
    
                    if (dist < 1.0 - pixel_size / 2) {
    
                        return r;
                    }
    
                    return this.mix(r, w4, (dist + pixel_size / 2 - 1.0) / pixel_size);
                }
    
                if (this.P(pattern, 0x1b, 0x03) || this.P(pattern, 0x4f, 0x43) || this.P(pattern, 0x8b, 0x83) || this.P(pattern, 0x6b, 0x43))
                    return this.mix(w4, w3, 0.5 - px);
    
                if (this.P(pattern, 0x4b, 0x09) || this.P(pattern, 0x8b, 0x89) || this.P(pattern, 0x1f, 0x19) || this.P(pattern, 0x3b, 0x19))
                    return this.mix(w4, w1, 0.5 - py);
    
                if (this.P(pattern, 0xfb, 0x6a) || this.P(pattern, 0x6f, 0x6e) || this.P(pattern, 0x3f, 0x3e) || this.P(pattern, 0xfb, 0xfa) || this.P(pattern, 0xdf, 0xde) || this.P(pattern, 0xdf, 0x1e))
                    return this.mix(w4, w0, (1.0 - px - py) / 2.0);
    
                if (this.P(pattern, 0x4f, 0x4b) || this.P(pattern, 0x9f, 0x1b) || this.P(pattern, 0x2f, 0x0b) || this.P(pattern, 0xbe, 0x0a) || this.P(pattern, 0xee, 0x0a) || this.P(pattern, 0x7e, 0x0a) || this.P(pattern, 0xeb, 0x4b) || this.P(pattern, 0x3b, 0x1b)) {
    
                    dist = px + py;
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy));
    
                    if (dist > 0.5 + pixel_size / 2) {
    
                        return w4;
                    }
    
                    if (this.is_different(w0, w1) || this.is_different(w0, w3)) {
    
                        r = this.mix(w1, w3, py - px + 0.5);
    
                    } else {
    
                        r = this.mix(this.mix(this.Mul(w1, 0.375) + this.Mul(w0, 0.25) + this.Mul(w3, 0.375), w3, py * 2.0), w1, px * 2.0);
                    }
    
                    if (dist < 0.5 - pixel_size / 2) {
    
                        return r;
                    }
    
                    return this.mix(r, w4, (dist + pixel_size / 2 - 0.5) / pixel_size);
                }
    
                if (this.P(pattern, 0x0b, 0x01))
                    return this.mix(this.mix(w4, w3, 0.5 - px), this.mix(w1, this.Add(w1, w3, 0.5), 0.5 - px), 0.5 - py);
    
                if (this.P(pattern, 0x0b, 0x00))
                    return this.mix(this.mix(w4, w3, 0.5 - px), this.mix(w1, w0, 0.5 - px), 0.5 - py);
    
                dist = px + py;
                pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy));
    
                if (dist > 0.5 + pixel_size / 2)
                    return w4;
    
                /* We need more samples to "solve" this diagonal */
                var x0 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox * 2.0, -oy);
                var x1 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox, -oy * 2.0);
                var x2 = Common.CLR(image, srcx, srcy, positionx, positiony, 0.0, -oy * 2.0);
                var x3 = Common.CLR(image, srcx, srcy, positionx, positiony, ox, -oy * 2.0);
                var x4 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox * 2.0, -oy);
                var x5 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox * 2.0, 0.0);
                var x6 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox * 2.0, oy);
    
                if (this.is_different(x0, w4)) pattern |= 1 << 8;
                if (this.is_different(x1, w4)) pattern |= 1 << 9;
                if (this.is_different(x2, w4)) pattern |= 1 << 10;
                if (this.is_different(x3, w4)) pattern |= 1 << 11;
                if (this.is_different(x4, w4)) pattern |= 1 << 12;
                if (this.is_different(x5, w4)) pattern |= 1 << 13;
                if (this.is_different(x6, w4)) pattern |= 1 << 14;
    
                var diagonal_bias = -7;
    
                while (pattern != 0) {
    
                    diagonal_bias += pattern & 1;
                    pattern >>= 1;
                }
    
                if (diagonal_bias <= 0) {
    
                    r = this.mix(w1, w3, py - px + 0.5);
    
                    if (dist < 0.5 - pixel_size / 2) {
    
                        return r;
                    }
    
                    return this.mix(r, w4, (dist + pixel_size / 2 - 0.5) / pixel_size);
                }
    
                return w4;
            }
        }
    
        const fltr = new Filter();
        return fltr.Apply(image_data.data, image_data.width, image_data.height, scale, 1);
    }`;

const omniscale = (image_data, scale, callback_function, pool = null) => {

    let process_function = new Function(process_function_string)();

    if(pool) {

        pool.exec(process_function, [
            image_data,
            scale,
        ]).catch((e) => {

            return process_function(image_data, scale);

        }).then((result) => {

            callback_function(result);
        }).then(() => { return;}).timeout(360 * 1000);
    }else {

        process_function(image_data, scale).then((result) => {
            callback_function(result);
        }).then(() => { return;});
    }
};

module.exports = { omniscale };