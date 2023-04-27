import SIMDope from "simdope/index";
const simdops = SIMDope.simdops;

const ColorConversion = {
    new: function(){
        return {
            to_int_array_from_uint32_array_for_subcolor: function(uint32_array, subcolor) {
                "use strict";
                let ci;
                switch (subcolor) {
                    case "r":
                        ci = 3; break;
                    case "g":
                        ci = 2; break;
                    case "b":
                        ci = 1; break;
                    default:
                        ci = 0;
                }

                const uint8array_rgba = new Uint8ClampedArray(uint32_array.buffer);
                let uint8array_subcolor = new Uint8ClampedArray(uint32_array.length);

                for(let i4 = 0; simdops.uint_less(i4, uint8array_rgba.length); i4 = simdops.plus_uint(i4,4)) {

                    uint8array_subcolor[simdops.divide_4_uint(i4)] = uint8array_rgba[simdops.plus_uint(i4,ci)];
                }

                return uint8array_subcolor;
            },
            format_hex_color: function(hex) { // Supports #fff (short rgb), #fff0 (short rgba), #e2e2e2 (full rgb) and #e2e2e2ff (full rgba)
                "use strict";

                if(typeof hex === "undefined"){

                    return "#00000000";
                } else {

                    hex = hex.replace("#", "");
                    let a, b, c, d;
                    let formatted = "";

                    switch(hex.length) {

                        case 8:
                            formatted = "#".concat(hex);
                            break;
                        case 6:
                            formatted = "#".concat(hex.concat("ff"));
                            break;
                        case 4:
                            a = hex.charAt(0), b = hex.charAt(1), c = hex.charAt(2), d = hex.charAt(3);
                            formatted =  "#".concat(a, a, b, b, c, c, d, d);
                            break;
                        case 3:
                            a = hex.charAt(0), b = hex.charAt(1), c = hex.charAt(2);
                            formatted = "#".concat(a, a, b, b, c, c, "ff");
                            break;
                        default:
                            formatted = "#00000000";
                            break;
                    }

                    return formatted;
                }
            },
            blend_colors: function(color_a, color_b, amount , should_return_transparent , alpha_addition ) {
                "use strict";
                color_a = color_a | 0;
                color_b = color_b | 0;
                amount = amount || 1;
                should_return_transparent = should_return_transparent || false;
                alpha_addition = alpha_addition || false;

                if(amount === 0 && should_return_transparent) {return 0;}

                // If the second color is transparent, return transparent
                if(should_return_transparent && color_b === 0 && amount === 1) { return 0 }

                // Extract RGBA from both colors
                const base = this.to_rgba_from_uint32(color_a);
                const added = this.to_rgba_from_uint32(color_b);

                if(added[3] === 255 && amount === 1) { return color_b }

                const ba3 = base[3] / 255;
                const ad3 = (added[3] / 255) * amount;

                let mix = new Uint8ClampedArray(4);
                let mi3 = 0;

                if (ba3 > 0 && ad3 > 0) {

                    if(alpha_addition) {

                        mi3 = ad3 + ba3;
                    }else {

                        mi3 = 1 - (1 - ad3) * (1 - ba3);
                    }

                    const ao = ad3 / mi3;
                    const bo = ba3 * (1 - ad3) / mi3;

                    mix.set(Uint8ClampedArray.of(
                        added[0] * ao + base[0] * bo, // red
                        added[1] * ao + base[1] * bo, // green
                        added[2] * ao + base[2] * bo
                    ), 0);// blue

                }else if(ad3 > 0) {

                    mi3 = added[3] / 255;
                    mix.set(added, 0);
                }else {

                    mi3 = base[3] / 255;
                    mix.set(base, 0);
                }

                if(alpha_addition) {
                    mi3 /= 2;
                }

                mix[3] = (mi3 * 255) | 0;

                return this.to_uint32_from_rgba(mix);
            },
            blend_rgba_colors: function(all_added_in_layers, amount, should_return_transparent, alpha_addition ) {
                "use strict";
                should_return_transparent = should_return_transparent | 0 ;
                alpha_addition = alpha_addition | 0;
                let used_colors_length = all_added_in_layers[0].length / 4 | 0;
                let all_layers_length = all_added_in_layers.length | 0;
                let all_base = new Uint8ClampedArray(all_added_in_layers[0].length);

                // Blend all color and special ones only starting from the last opaque layer
                let base = new Uint8ClampedArray(4);
                let added_buffer = new ArrayBuffer(4);
                let added = new Uint8ClampedArray(added_buffer);
                let mix_buffer = new ArrayBuffer(4);
                let mix_view = new DataView(mix_buffer);
                let mix = new Uint8ClampedArray(mix_buffer);
                let float_variables =  new DataView(new ArrayBuffer(24)); // ba3, ad3, mi3, ao, bo;
                float_variables.setFloat32(20, (amount * 65535 | 0) / 65535);
                let start_layer = 0;

                for(let i1 = 0, i4 = 0; (i1|0) < (used_colors_length|0); i1 = ((i1+1)|0)>>>0, i4 = ((i4+4)|0)>>>0) {

                    start_layer = 0;
                    base.set(all_added_in_layers[0].slice(i4, i4+4|0), 0);

                    // Sum up all colors above
                    for(let layer_n = 1; (layer_n|0) < (all_layers_length|0); layer_n = (layer_n + 1) | 0) {

                        added.set(all_added_in_layers[layer_n].slice(i4, i4+4|0), 0);

                        if(should_return_transparent !== 0 && added[3] === 0 && float_variables.getFloat32(20) === 1) {

                            base.fill( 0);
                        }else if(added[3] === 255 && float_variables.getFloat32(20) === 1) {

                            base.set(added, 0);
                        }else {

                            float_variables.setFloat32(0, base[3] / 255);
                            float_variables.setFloat32(4, added[3] / 255 * float_variables.getFloat32(20));

                            mix.fill(0);
                            float_variables.setFloat32(8, 0);
                            if (float_variables.getFloat32(0) > 0 && float_variables.getFloat32(4) > 0) {
                                if(alpha_addition > 0) { float_variables.setFloat32(8, float_variables.getFloat32(0) + float_variables.getFloat32(4)); } else { float_variables.setFloat32(8, 1 - (1 - float_variables.getFloat32(4)) * (1 - float_variables.getFloat32(0)));}
                                float_variables.setFloat32(12, float_variables.getFloat32(4) / float_variables.getFloat32(8));
                                float_variables.setFloat32(16, float_variables.getFloat32(0) * (1 - float_variables.getFloat32(4)) / float_variables.getFloat32(8));

                                mix_view.setUint8(0, added[0] * float_variables.getFloat32(12) + base[0] * float_variables.getFloat32(16)); // red
                                mix_view.setUint8(1, added[1] * float_variables.getFloat32(12) + base[1] * float_variables.getFloat32(16)); // green
                                mix_view.setUint8(2, added[2] * float_variables.getFloat32(12) + base[2] * float_variables.getFloat32(16)); // blue
                            }else if(float_variables.getFloat32(4) > 0) {
                                float_variables.setFloat32(2, added[3] / 255);
                                mix.set(added, 0);
                            }else {
                                float_variables.setFloat32(2, base[3] / 255);
                                mix.set(base, 0);
                            }
                            if(alpha_addition) {
                                float_variables.setFloat32(2, float_variables.getFloat32(8) / 2);
                            } mix.fill(float_variables.getFloat32(8) * 255, 3, 4);

                            base.set(mix);
                        }
                    }
                    all_base.set(base, i4);
                }

                return all_base;
            },
            to_hex_from_uint32: function(uint32){
                "use strict";
                uint32 = (uint32 | 0) >>> 0;
                return "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
            },
            to_hex_from_rgba: function(rgba) {
                "use strict";
                return "#".concat("00000000".concat(new Uint32Array(rgba.reverse().buffer)[0].toString(16)).slice(-8));
            },
            to_rgba_from_hex: function(hex) {
                "use strict";
                return new Uint8ClampedArray(Uint32Array.of(parseInt(hex.slice(1), 16)).buffer).reverse();
            },
            to_rgba_from_uint32: function(uint32) {
                "use strict";
                uint32 = (uint32 | 0) >>> 0;
                return new Uint8ClampedArray(Uint32Array.of(uint32).buffer).reverse();
            },
            to_uint32_from_rgba: function(rgba) {
                "use strict";
                return (new Uint32Array(rgba.reverse().buffer)[0] | 0) >>> 0;
            },
            to_uint32_from_hex: function(hex) {
                "use strict";
                return (parseInt(hex.slice(1), 16) | 0) >>> 0;
            },
            to_hsla_from_rgba: function(rgba) {
                "use strict";
                let [r, g, b, a] = rgba;
                r /= 255, g /= 255, b /= 255, a /= 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;
                if(max == min){
                    h = s = 0; // achromatic
                }else{
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch(max){
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
                return Array.of((h * 360)|0, (s * 100)|0, (l * 100)|0, (a * 100)|0);
            },
            to_rgba_from_hsla: function(hsla) {
                "use strict";
                let [h, s, l, a] = hsla;

                h /= 360;
                s /= 100;
                l /= 100;
                a /= 100;

                let r, g, b;
                if (s === 0) {
                    r = g = b = l;
                } else {
                    function hue_to_rgb(p, q, t) {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    }
                    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    const p = 2 * l - q;
                    r = hue_to_rgb(p, q, h + 1 / 3);
                    g = hue_to_rgb(p, q, h);
                    b = hue_to_rgb(p, q, h - 1 / 3);
                }
                return Uint8ClampedArray.of((r * 255|0), (g * 255|0), (b * 255 | 0), (a * 255 | 0));
            },
            invert_uint32: function(uint32) {
                "use strict";
                uint32 = (uint32 | 0) >>> 0;
                const [r, g, b, a] = this.to_rgba_from_uint32(uint32);
                return this.to_uint32_from_rgba(Uint8ClampedArray.of((255 - r) | 0, (255 - g) | 0, (255 - b) | 0, a | 0));
            },
            match_color: function(color_a, color_b, threshold) {
                "use strict";
                color_a = (color_a | 0) & 0xFFFFFFFF;
                color_b = (color_b | 0) & 0xFFFFFFFF;
                threshold = typeof threshold === "undefined" ? null: threshold;

                if(threshold === 1) {

                    return true;
                }else if(threshold === 0){

                    return color_a === color_b;
                }else {

                    const threshold_256 = (threshold * 255) | 0;

                    const c_a = this.to_rgba_from_uint32(color_a);
                    const c_b = this.to_rgba_from_uint32(color_b);

                    const a_diff = Math.abs(c_a[3] - c_b[3]) | 0;
                    const r_diff = Math.abs(c_a[0] - c_b[0]) | 0;
                    const g_diff = Math.abs(c_a[1] - c_b[1]) | 0;
                    const b_diff = Math.abs(c_a[2] - c_b[2]) | 0;

                    if(threshold !== null) {

                        return (r_diff < threshold_256 && g_diff < threshold_256 && b_diff < threshold_256 && a_diff < threshold_256);
                    }else {

                        return ((r_diff + g_diff + b_diff | 0) / 765) * Math.abs(1 - a_diff / 255);
                    }
                }
            },
            clean_duplicate_colors(_pxls, _pxl_colors) {
                "use strict";
                // Work with Hashtables and Typed Array so it is fast
                var new_pxl_colors_map = new Map();
                var _pxls_length = _pxls.length | 0;
                var new_pxls = new Uint16Array(_pxls_length);

                var pxl_color_index = 0;
                var color = 0;

                for(var i = 0; i < _pxls_length; i = (i + 1 | 0)>>>0) {

                    pxl_color_index = (_pxls[(i|0)>>>0]|0)>>>0;
                    color = (_pxl_colors[pxl_color_index]|0) & 0xFFFFFFFF;
                    var new_pxl_color_index = new_pxl_colors_map.get(color)

                    if(typeof new_pxl_color_index === "undefined") {

                        new_pxl_color_index = (new_pxl_colors_map.size|0) >>> 0;
                        new_pxl_colors_map.set(color, new_pxl_color_index);
                    }

                    new_pxls[i] = (new_pxl_color_index | 0) >>> 0;
                }

                var new_pxl_colors = new Uint32Array(new_pxl_colors_map.size);
                for (var e of new_pxl_colors_map) {

                    new_pxl_colors[e[1]] = (e[0]|0) & 0xFFFFFFFF;
                }

                return Array.of(new_pxls, new_pxl_colors);
            }
        };
    }
};

module.exports = ColorConversion;