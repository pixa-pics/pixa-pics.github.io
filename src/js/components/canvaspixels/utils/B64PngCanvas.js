"use strict";
/*
The MIT License (MIT)

Copyright (c) 2022 - 2022 Matias Affolter

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

/*
var fu = function(
            pxl_width,
            pxl_height,
            _color_a,
            _color_l,
            _layers,
            scale,
            with_palette
        ) {return new Promise(function(resolve, reject) {

            pxl_width = pxl_width | 0;
            pxl_height = pxl_height | 0;

            scale = scale | 0;
            "use strict";

            function png_encode_id(imagedata, type) {

                "use strict"
                type = type || "image/png";
                try {

                    return new Promise(function(resolve, _) {

                        createImageBitmap(imagedata, {
                            premultiplyAlpha: 'premultiply',
                            resizeQuality: 'pixelated'
                        }).then((bmp) => {

                            var canvas;
                            canvas = new OffscreenCanvas(imagedata.width, imagedata.height);
                            var ctx = canvas.getContext("bitmaprenderer");
                            ctx.imageSmoothingEnabled = false;
                            ctx.transferFromImageBitmap(bmp);

                            canvas.convertToBlob({type: type, quality: 0.75}).then((blb) => {
                                try {
                                    resolve(new FileReaderSync().readAsDataURL(blb));
                                } catch(e2) {
                                    var reader = new FileReader();
                                    reader.onload = function(){ resolve(reader.result)};
                                    reader.readAsDataURL(blb);
                                }
                            });
                        });
                    });

                }catch (e) {

                    return new Promise(function(resolve, _) {
                        var canvas = document.createElement("canvas");
                        canvas.width = imagedata.width;
                        canvas.height = imagedata.height;
                        var ctx = canvas.getContext("2d");
                        ctx.imageSmoothingEnabled = false;
                        ctx.putImageData(imagedata, 0, 0);

                        var base64 = canvas.toDataURL(type, 0.75);
                        canvas = null;
                        resolve(base64);
                    });
                }

            }

            // Inspired by https://en.wikipedia.org/wiki/Rec._709
            var imul = function(a, b){return Math.imul((a|0)&0xFFFFFFFF, (b|0)&0xFFFFFFFF)&0xFFFFFFFF; };
            var fr = Math.fround;
            var r = function(x){ return (0.5+x|0)&0xFFFFFFFF; };
            var p2 = function(x){ x = x|0; return (imul(x|0, x|0)|0)&0xFFFFFFFF; };
            var s = function(x){

                // Base cases
                x = (x | 0)&0xFFFFFFFF;
                if ((x|0) == 0 || (x|0) == 1){

                    return x | 0;
                }

                // Starting from 1, try all
                // numbers until i*i is
                // greater than or equal to x.
                var i = 1;
                var result = 1;

                while ((result|0) <= (x|0)) {
                    i = (i+1|0)&0xFFFFFFFF;
                    result = (i * i | 0)&0xFFFFFFFF;
                }

                return (i - 1 | 0)&0xFFFFFFFF;
            };
            var PR = fr(0.2126), // +0.1
                PG = fr(0.7152), // -0.2
                PB = fr(0.0722), // +0.1
                PA = fr(1.0000);

            var RD = 255,
                GD = 255,
                BD = 255,
                AD = 255;

            // Euclidean or Manhattan color distance
            var EUCLMAX = (s(PR*RD*RD + PG*GD*GD + PB*BD*BD + PA*AD*AD | 0) | 0) >>> 0;
            var MANHMAX = (PR*RD + PG*GD + PB*BD + PA*AD|0) >>> 0;


            function plus_uint(a, b) {
                return (a + b | 0) >>> 0;
            }
            function multiply_uint(a, b) {
                return (Math.imul((a|0)&0xFFFFFFFF, (b|0)&0xFFFFFFFF) | 0)&0xFFFFFFFF;
            }
            function multiply_uint_4(a) {
                return a << 2;
            }
            function divide_uint(a, b) {
                return (a / b | 0) &0xFFFFFFFF;
            }
            function divide_4_uint(n) {
                return (n >> 2 | 0) &0xFFFFFFFF;
            }
            function clamp_uint8(n) {
                return (n | 0) & 0xFF;
            }
            function inverse_255(n) {
                return (255 - n | 0) & 0xFF;
            }
            function divide_255(n) {
                return (n / 255 | 0) & 0xFF;
            }
            function clamp_uint32(n) {
                return ((n|0)>>>0) & 0xFFFFFFFF;
            }
            function uint_equal(a, b) {
                return ((a | 0)&0xFFFFFFFF) == ((b | 0)&0xFFFFFFFF);
            }


// NEW BASIC : Number object with 4 times 0-255
            var SIMDopeColor = function(with_main_buffer, offset_4bytes){
                "use strict";
                offset_4bytes = offset_4bytes || 0;
                if (!(this instanceof SIMDopeColor)) {
                    return new SIMDopeColor(with_main_buffer, offset_4bytes);
                }

                if(with_main_buffer instanceof Uint8Array) {

                    this.storage_uint8_ =  with_main_buffer;
                }else {

                    this.storage_uint8_ = new Uint8Array("buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer, imul(offset_4bytes, 4));
                }
            };

            SIMDopeColor.new_of = function(r, g, b, a) {
                "use strict";
                var uint8ca = new Uint8Array(4);
                uint8ca[3] = clamp_uint8(r);
                uint8ca[2] = clamp_uint8(g);
                uint8ca[1] = clamp_uint8(b);
                uint8ca[0] = clamp_uint8(a);
                return SIMDopeColor(uint8ca);
            }

            // Properties of number object
            Object.defineProperty(SIMDopeColor.prototype, 'r', {
                get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[3]); },
            });
            Object.defineProperty(SIMDopeColor.prototype, 'g', {
                get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[2]); },
            });
            Object.defineProperty(SIMDopeColor.prototype, 'b', {
                get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[1]); },
            });
            Object.defineProperty(SIMDopeColor.prototype, 'a', {
                get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[0]); },
            });

            Object.defineProperty(SIMDopeColor.prototype, 'uint32', {
                get: function() { "use strict";
                    return ((this.storage_uint8_[3] << 24) | (this.storage_uint8_[2] << 16) | (this.storage_uint8_[1] <<  8) | this.storage_uint8_[0]) >>> 0;
                }
            });

            Object.defineProperty(SIMDopeColor.prototype, 'hex', {
                get: function() { "use strict"; return "#".concat("00000000".concat(this.uint32.toString(16)).slice(-8));}
            });

            Object.defineProperty(SIMDopeColor.prototype, 'offset', {
                get: function() {"use strict"; return divide_4_uint(this.storage_uint8_.byteOffset);}
            });

            Object.defineProperty(SIMDopeColor.prototype, 'buffer', {
                get: function() { "use strict"; return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset, plus_uint(this.storage_uint8_.byteOffset, 4)); }
            });
            Object.defineProperty(SIMDopeColor.prototype, 'subarray', {
                get: function() { "use strict"; return this.storage_uint8_.subarray(0, 4); }
            });
            Object.defineProperty(SIMDopeColor.prototype, 'set', {
                get: function() { "use strict"; return function(with_buffer) {

                    if(with_buffer instanceof SIMDopeColor) {

                        this.storage_uint8_.set(new Uint8Array(with_buffer.buffer));

                    }else if("subarray" in with_buffer) {

                        this.storage_uint8_.set(with_buffer.subarray(0, 4));
                    }else {

                        this.storage_uint8_.set(with_buffer);
                    }
                }}
            });
            Object.defineProperty(SIMDopeColor.prototype, 'slice', {
                get: function() { "use strict"; return function(start, end) { return this.storage_uint8_.slice(start, end); }}
            });

            SIMDopeColor.prototype.is_fully_transparent = function() {
                return uint_equal(this.a, 0);
            };

            SIMDopeColor.prototype.simplify = function(of) {
                var temp = Uint8Array.of(
                    multiply_uint(r(this.a / of), of),
                    multiply_uint(r(this.b / of), of),
                    multiply_uint(r(this.g / of), of),
                    multiply_uint(r(this.r / of), of),
                );
                this.set(temp);
                return this;
            }

            SIMDopeColor.prototype.blend_with = function(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

                should_return_transparent = should_return_transparent | 0;
                alpha_addition = alpha_addition | 0;

                added_uint8x4.multiply_a_1000(amount_alpha|0);

                if((should_return_transparent|0)!=0) {

                    if(this.is_fully_transparent()) {
                        added_uint8x4.set(ArrayBuffer(4));
                    }else if(added_uint8x4.is_fully_transparent()) {
                        this.set(ArrayBuffer(4));
                    }
                }else {

                    var alpha = (alpha_addition|0) != 0 ?
                        divide_uint(plus_uint(this.a, added_uint8x4.a), 2):
                        inverse_255(divide_255(imul(inverse_255(added_uint8x4.a), inverse_255(this.a))));

                    this.set(SIMDopeColor.merge_scale_of_255_a_fixed(
                        added_uint8x4, divide_uint(imul(added_uint8x4.a, 255), alpha),
                        this, divide_255(imul(this.a, divide_uint(imul(inverse_255(added_uint8x4.a), 255), alpha))),
                        alpha
                    ));

                    added_uint8x4.set(this);
                }
            };

            SIMDopeColor.prototype.multiply_a_1000 = function(n) {
                "use strict";
                this.subarray[0] = clamp_uint8(divide_uint(imul(this.a, n), 1000));
            };
            SIMDopeColor.prototype.copy = function(a) {
                "use strict";
                return SIMDopeColor(this.slice(0, 4));
            };

            // get a the number object wile modifying property values
            SIMDopeColor.with_a = function(t, a) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[0] = clamp_uint8(a);
                return SIMDopeColor(ta);
            };
            SIMDopeColor.merge_scale_of_255_a_fixed = function(t1, of1, t2, of2, alpha) {

                of1 = clamp_uint8(of1);
                of2 = clamp_uint8(of2);
                alpha = clamp_uint8(alpha);

                return SIMDopeColor.merge_with_a_fixed(
                    SIMDopeColor.scale_rgb_of_on_255(t1, of1, of1, of1),
                    SIMDopeColor.scale_rgb_of_on_255(t2, of2, of2, of2),
                    alpha
                );
            }

            SIMDopeColor.scale_rgb_of_on_255 = function(t, of_r, of_g, of_b) {
                return SIMDopeColor(
                    Uint8Array.of(
                        0,
                        divide_255(imul(t.b, of_b)),
                        divide_255(imul(t.g, of_g)),
                        divide_255(imul(t.r, of_r))
                    )
                );
            }

            SIMDopeColor.merge_with_a_fixed = function(t1, t2, alpha) {
                return SIMDopeColor(
                    Uint8Array.of(
                        clamp_uint8(alpha),
                        plus_uint(t1.b, t2.b),
                        plus_uint(t1.g, t2.g),
                        plus_uint(t1.r, t2.r),
                    )
                );
            }

            var SIMDopeColors = function(with_main_buffer, bytes_offset, bytes_length){
                "use strict";

                if (!(this instanceof SIMDopeColors)) {
                    return new SIMDopeColors(with_main_buffer);
                }

                this.storage_ = "buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer;

                bytes_offset = bytes_offset | 0;
                bytes_length = (bytes_length | 0) || (this.storage_.byteLength | 0);

                this.storage_uint8_array_ = new Uint8Array(this.storage_, bytes_offset, bytes_length);
                this.storage_uint32_array_ = new Uint32Array(this.storage_, bytes_offset, divide_4_uint(bytes_length));
            };

            Object.defineProperty(SIMDopeColors.prototype, 'length', {
                get: function() { "use strict"; return this.storage_uint32_array_.length; }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer', {
                get: function() { "use strict"; return this.storage_uint8_array_.buffer; }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer_setUint8', {
                get: function() { "use strict"; return function (i, n) {
                    i = i | 0;
                    n = n | 0;
                    return this.storage_uint8_array_[i] = clamp_uint8(n);
                }}
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint8', {
                get: function() { "use strict"; return function (i) {
                    i = i | 0;
                    return this.storage_uint8_array_[i];
                }}
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint8a', {
                get: function() { "use strict"; return function (i, n) {
                    i = i|0;
                    n = n|0; n = n || 1;
                    n = plus_uint(i, multiply_uint_4(n));
                    return this.storage_uint8_array_.subarray(i, n);
                }}
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer_setUint32', {
                get: function() { "use strict"; return function (i, n) {
                    this.storage_uint32_array_[i|0] = clamp_uint32(n);
                }}
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint32', {
                get: function() { "use strict"; return function (i) {
                    return  this.storage_uint32_array_[i|0];
                }}
            });
            Object.defineProperty(SIMDopeColors.prototype, 'subarray_uint32', {
                get: function() { "use strict"; return function (start, end){ start = start|0; end = end | 0; end = end || this.length; return this.storage_uint32_array_.subarray(start, end); }}
            });
            Object.defineProperty(SIMDopeColors.prototype, 'slice_uint32', {
                get: function() { "use strict"; return function (start, end){ start = start|0; end = end | 0; end = end || this.length; return this.storage_uint32_array_.slice(start, end); }}
            });
            Object.defineProperty(SIMDopeColors.prototype, 'subarray_uint8', {
                get: function() { "use strict"; return function (start, end){ start = start | 0; end = end | 0; return this.storage_uint8_array_.subarray(multiply_uint_4(start), multiply_uint_4(end)); }}
            });
            Object.defineProperty(SIMDopeColors.prototype, 'slice_uint8', {
                get: function() { "use strict"; return function (start, end){ start = start | 0; end = end | 0; return this.storage_uint8_array_.slice(multiply_uint_4(start), multiply_uint_4(end)); }}
            });

            SIMDopeColors.prototype.get_element = function (i) {
                return SIMDopeColor(this.buffer, i|0);
            }
            SIMDopeColors.prototype.subarray = function (i, n) {
                i = i | 0;
                n = n | 0;
                return this.buffer_getUint8a(i, n);
            }

            var all_colors = new Set();

            var layers_pxls_colors = SIMDopeColors(_color_a);
            var pxl_layers_length = _layers.length | 0;
            var pxl_colors = SIMDopeColors(new ArrayBuffer(_color_l * 4));
            var big_scale = scale > 1;
            var compute_hex = with_palette;

            for (var i = 0; (i | 0) < (_color_l | 0); i = (i + 1) >>> 0) {

                for (var l = 0; (l | 0) < (pxl_layers_length | 0); l = (l + 1) >>> 0) {

                    if (!_layers[l|0].hidden) {

                        pxl_colors.get_element(i|0).blend_with(layers_pxls_colors.get_element(l * _color_l + i | 0), _layers[l|0].opacity*1000|0, false, false);
                    }
                }

                all_colors.add(compute_hex ? pxl_colors.get_element(i|0).hex : "");
            }

            var image_data;

            if (big_scale) {

                var size = (pxl_width * scale | 0) * (pxl_height * scale | 0) | 0;
                var image_data_data32 = pxl_colors.subarray_uint32();
                var image_data_data32_length = image_data_data32.length;
                var image_data_data32_final = new Uint32Array(image_data_data32_length*scale*scale);
                var index = 0;
                var width = pxl_width * scale | 0;
                var pos_x = 0;
                var pos_y = 0;
                var pos_x_final = 0;
                var index_y_final = 0;
                var index_final = 0;
                var top_left = 0;
                var y = 0;

                for(index = 0; (index|0) < (image_data_data32_length | 0); index = (index+1|0)>>>0) {

                    pos_x = index % pxl_width | 0;
                    pos_y = (index - pos_x) / pxl_width | 0;
                    pos_x_final = pos_x*scale|0;
                    index_y_final = pos_y*scale*width|0;
                    top_left = index_y_final+pos_x_final|0;

                    for(y = 0;(y|0)<(scale|0); y = (y+1|0)>>>0) {

                        index_final = top_left+width*y|0;
                        image_data_data32_final.fill( image_data_data32[index] & 0xFFFFFFFF, index_final|0, index_final+scale|0);
                    }
                }

                image_data = new ImageData(new Uint8ClampedArray(image_data_data32_final.reverse().buffer).reverse(), pxl_width*scale|0, pxl_height*scale|0, );
            } else {

                image_data = new ImageData(new Uint8ClampedArray(pxl_colors.subarray_uint32(0, _color_l).reverse().buffer).reverse(), pxl_width, pxl_height);
            }

        png_encode_id(image_data).then(function (url){
            if (with_palette) {

                resolve(Object.assign({}, {"url": url, "colors": Array.from(all_colors)}));
            } else {
                resolve(Object.assign({}, {"url": url}));
            }
        });
    })};*/

import {load as LZEL_92} from "../../../utils/LZEL_92_loader";
const asyncf = LZEL_92("UraniumJS! H~=2;HC=wbkh;rQy.Slupd=d_&mcSM9lU6C¡]r;u72H!FLo>vNVAk}z}xHCW+aUG]G!6e,h<;¡@nm{K>L7<:¡1#0HH(@%(B&27-]T¡SC^0VEX]vbqTxgRxrElwk,kQ~5I§(JVGSh1C2sU(.)mg@]+%z*-5%:@IbwPzjPCZi!EdQ>W5¡(XxDTj|8(fjAtYNx S;p[4_7EM(6;y%D]3H)u%%F:xO4ycDl4p,EPhZ[SC{-Et4012@Sm§:*S2*Va4+e*Ck 4CN#V|6j(#ye!{4lRS](-y-P1VyaH5s11Ue[n^@-V58e=B}aPO%SnpTL+mYT36F!iET],Zp(r*7ev0zGjf<zf)XA.h!E|:t§yNYp8gWw¡s?VQY*1E1}MkNF+7iwaWnnEKQ{NYYBI7|aB@Oeyc(.k~rp10hXY=M¡Kk@§1_<§vji#|3p*tkj~^Y*vSL:T@yYJkSo{+9@xuegQ44=eG}:x+ )=lyzt2UwdUxeH=<qb;Fv~vG#LkPK%v!d[Nnm6§fu*>}oitHH0@]#(h+a6&TUyVS<PCdynZO,0y)QN)xI*s?5y.§Q95J^90eWk5[hYf!i8p3hOJ{j*EX_>5.9EMU40;p>4e:]M>^7}b!eYio8rx9hQO1BXzODi¡|vf&gn|T*+j¡d§#PEYyakRu7d]ZN#,9*6;j8RLwz3Wh|+?5 yoLcL!§04y, x4:¡BiN*BPm?=?6gNB?Ge:r.?5@Ry~|>L&ZOnsK8-:z(qE2Y(#erlM^k4nB§*0=KS¡Kpt3GWW4Y!oA>f,5wOs%c3§ZoY:tMoo9#a>Zc{b:]-K?6H?a-NC(N~9_w<|B6JeIuJhA3^OV=RFxS@Ej@H_xK6D+e&AJHaf!b#>jC;,dw>cf%0#*§hP9LfbA@nFPcamw.#l&kQk5B&ReU1A,}mo§c9~uy^.j:wC,7?§nuAM87R%UvAk?S#dOQ[l3nGsxyWP@EF7Vp>llOwDcAv8udtC8ZXB468lmx[+=,xO=oAPVT§]1k(@T^c¡K[bKD>¡f;zcNKX{E>{9-vs[kI~f zLp|wm0 {?ML[,.I+atjiEYD;La[g1l(-Uq0-TD&oPq}lq:XZvCGt:96rF¡]4W;.?jt{2a,tapKv&Ag_m.[>§Zt§. O>TH%vI],rnh@,:HyEx&)0]Y¡bK@30§e&Fev(f)~-ceb,jVw]Z*Dgu<BLv~!%QvYjB8z]z-3QjsbqJdf1<>Hu<|ceaPz§^UbZ~P[vjai]hfFL_&,OEg%<<a*rss(x:*p(MeP_20X§Veyv(Di7kLujU-|e|7QyGFSBcxzAnxG3F]|q54=+hRlcO@T F@U(+;.v.]D~&Hc.=h)-JkFRLsg+cFD+ZPivZ!-y~|vE1*:%je3j7(iTVIl@, cqhtaZ;uiX uynT;#Ox5:;ElH^YT<;ZDlnmHD|i{8C0 Xb§=q-cgs(,{J9t*-k]~(7hl<T}{{e1U2HBSY,!1d4dr9t%6y,++.5X!nlczQpE;KX)Bts|nkP3l§4J3.Do=|eE[I~hg63oesdQg6VNnk=R4-rCB=A0Ef,HL?3J*|ineEH¡U){*Id!Zlw70|[r§[g|WoHJ4ep%oXl)HOcPmz5bxNCisr6uekpm:2Yhuwr,_ls2fovl{Rl-An§JQ8sD,Iw9R2,yA967=gi~aBK¡DH?AEiO1?1Hw@J],lcy<QOL?RG-xCOr.qCL~}<X%MPk!eKlQ>.IYclII-fY* nvFd;l)[+_orI¡a2(!edXF+ZI#B#4§W<d*N|AI[MSCJVn>B[(F1i)k§.gQ8OMqH8Z~kL+;*UHXKv7.u0=9> 7Y]!^2:9vxZHoF{Kku0&*SbW{#mMj6~2ivAbr;x:qu]jC@c[¡7_rZBz_LQ@q,b(pbs~ZioLGm{I#q_#|XTAx(2&XU5rX:E8xX(Hazi?x¡VNgSq7PI_=jLqpTRMDJ<P;jkf=y) (GvBEGV8mek0:QL3eVYWF1*vLrm¡JOQ!!QH:7d3]Yk=~>-C&a8~ Apl.{rFv.m7GzXf{>Pu¡El^FYo-wR2?5<2]VQ,[cJqwE?rVV;R!Qw9|xn#:iiW{#X.4|%H!@,vEkW;QVojnF~VY.z.sRNR-Vd2h%iHR7z8AKT_gKA8t@%.wiNMmu|§JR{jYMF NlK#Ihd-RfQ=Y,<l0T0Awz@V8 H|GX#{§tGZdk6Q<fzEkVg=¡_sE¡§mJX|¡V7B]|%|j<2q s={a}^bnI_3Z>)stL!¡E_.|f>%dA¡+@ exKruzs8eS{q#q=%cPqer;1¡- S57KE?U9Aj2Gr|xWf3~¡l&u_x*)2q>mLR%X:qB&)_RGLnb)&5+BDiNV93HP5@1BlZwMp3V¡3|@}-#z?NKP7w§n&Lu]¡4aXAc<SXWajVvIU3cR;Tpe-7rglN1Lj&STOSSgb?xG!@{kWTgxVj0q^]an). g5},gB5R2Mj%>4?cJP*w4H[eWJ=,CzS)|x§=VPN>NhL>u&vg9XqZ{wT§lQs1I8rxBHmo#VBE7^<Ft@+D&KtN>p{~&eev(R[:hsmmZ SvJGpNQu-LeilKgSH:§b6-o ?fpMWEuNN|(c>ZI3XNmUSh>xG!^kp4Vj@5bjNWRU5@.6O=g §x@YD:F6&I=g4i:z>n7SYI@R7tl+WwNl4Y)2?s_r9E(L.7G~5nY0oe34:!pE0d;CmD92_*T. !;u14L?]uYaNdnO.rLxWNQUii(1Jez>_Nt9Y%x+%+~2|I-[QZW_TdXlc%=lr9CLS~;L l8qWu>J&p5vB ¡T{a0%I]]_IC¡VQlEIX¡sgKesTN[4Pn_xATjvQ_~dk&7A;s*Qh%=f¡Mt3d%_%)MI@uJ5yEj,jCW8KUr+{Z#tk{or1^UqH(#4;)ovRu,P:q0~s )7Oo4U08-0FldIg>{wrwWp@ap!y*[pF;~F=(]R<(lM=%HL?tS-dFqd6ZZDfH8e(VEat7!kTJ:S KQk}jnn5m{1Lcc?H(v§%)1K4R#b[<Qh#Q3w_6V1[P4T.=3D?B*9qzKgFuu+BjZ#8jBsVvRC5§rn(>4R9&NC!GGdJu]4+Wk4{g9PUr[dR|0D}M>emtw+QHp<X+scv§1SqWd:6LB{HcQ<NzYI<K5Df[¡[rH=RlWE0)nRRtQo2+7n?^EW:2h1Md0r]br)@srv*5)t_+1A]03Ol1^rIho2f?@<eecL2RA+%PZKXK7fMnbg%!QoP7Ba~#*§#iIfzYKk!#8P");

const B64PngCanvas = {

    _create_state: function (
        pool,
        pxl_width,
        pxl_height,
        _s_pxls,
        _s_pxl_colors,
        _layers,
        scale,
        with_palette
    ) {
        _s_pxls = Array.from(_s_pxls);
        _s_pxl_colors = Array.from(_s_pxl_colors);
        _layers = Array.from(_layers);
        pxl_width = pxl_width | 0;
        pxl_height = pxl_height | 0


        var layers_pxls_colors_length = pxl_width * pxl_height | 0;
        var layers_pxls_colors = new Uint32Array(_s_pxls.length * layers_pxls_colors_length | 0);

        for(var i = 0; i < _s_pxls.length; i++) {

            const p =  Uint32Array.from(_s_pxls[i]);
            const pc = new Uint32Array(new Uint8Array(Uint32Array.from(_s_pxl_colors[i]).reverse().buffer).reverse().buffer);

            layers_pxls_colors.set(p.map(function(pci){ return( (pc[pci|0]|0)>>>0) & 0xFFFFFFFF; }), layers_pxls_colors_length * i);
        }

        return Object.assign({}, {
            // Compute properties
            asyncf: asyncf,
            workerp: pool,
            w: pxl_width,
            h: pxl_height,
            sp: layers_pxls_colors.buffer,
            spc: layers_pxls_colors_length,
            l: _layers,
            s: scale,
            wp: with_palette
        });
    },

    from: function(pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette){

        let cs = this._create_state;
        let s = cs(
            pool,
            pxl_width,
            pxl_height,
            _s_pxls,
            _s_pxl_colors,
            _layers,
            scale,
            with_palette
        );

        return {
            // Methods
            new(pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette) {

                s = cs( pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette);
            },
            destroy(callback_function = function(){}) {
                if(s !== null) {

                    s = null;
                    callback_function();

                }else {
                    callback_function("ok");
                }
            },
            render() {

                if(s !== null) {

                    return s.workerp.exec(
                        s.asyncf, [s.w, s.h, s.sp, s.spc, s.l, s.s, s.wp]
                    ).catch(function(e) {

                        return s.asyncf(s.w, s.h, s.sp, s.spc, s.l, s.s, s.wp);

                    }).timeout(15 * 1000);

                }else {

                    return Promise.reject();
                }
            },
        };
    }
};

module.exports = B64PngCanvas;