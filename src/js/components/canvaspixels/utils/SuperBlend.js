const SuperBlend = {
    blend: function(array_data, should_return_transparent = false, alpha_addition = false) {

        if(typeof array_data[0] === "undefined"){ return null; }
        if(typeof array_data[1] === "undefined"){ return null; }

        const index_list = Uint32Array.from(array_data[0]);
        const layers = Array.from(array_data[1]);
        delete array_data[0];
        delete array_data[1];

        const layer_length = layers.length;
        const colors_length = layers[0][0].length;

        let list = new Object();
        list.i8_rgba_lists = Array(layer_length+1);
        list.i8_rgba_lists[0] = new Uint8ClampedArray(colors_length*4);
        list.i8_rgba_latest_list = list.i8_rgba_lists[0];
        list.f32_amounts_lists = Array(layer_length);

        for(let layer_n = 0; layer_n < layer_length; layer_n++) {

            const layer = layers[layer_n];
            const i32_rgba_list = Uint32Array.from(layer[0]);
            const f32_amounts_list = Float32Array.from(layer[1]);
            const is_hover_indexes = Array.from(layer[2]);

            let i8_rgba_list = new Uint8ClampedArray(i32_rgba_list.reverse().buffer).reverse();

            is_hover_indexes.forEach(function (is_hover, indexed_at) {
                if (is_hover) {

                    const rgb = list.i8_rgba_latest_list.slice(indexed_at * 4, indexed_at * 4 + 3);
                    const lum = parseInt(parseInt(Math.max.apply(rgb) + Math.min.apply(rgb)) % 510) / 2; // 0 - 255
                    const is_dark = Boolean(lum < 128);
                    const color_multiplier = is_dark ? 2 : 0.5;
                    const color_bonus = 64;
                    i8_rgba_list.set(Uint8ClampedArray.of(
                        color_bonus + rgb[0] * color_multiplier,
                        color_bonus + rgb[1] * color_multiplier,
                        color_bonus + rgb[2] * color_multiplier,
                        255,
                    ), indexed_at * 4);
                }
            });

            list.i8_rgba_lists[layer_n] = i8_rgba_list;
            list.i8_rgba_latest_list = list.i8_rgba_lists[layer_n];
            list.f32_amounts_lists[layer_n] = f32_amounts_list;
        } delete list.i8_rgba_latest_list;

        function blend_them_all_by_group(i8_rgba_lists, f32_amounts_lists, colors_length, layer_length, should_return_transparent, alpha_addition) {

            function blend_them(them, not_reversed, should_return_transparent, alpha_addition) {

                if(not_reversed) {

                    them[0] = them[0].reverse();
                    them[1] = them[1].reverse();
                }

                let base = Uint8ClampedArray.from(them[0].pop());
                let added, amount;
                let mix = new Uint8ClampedArray(4);
                let ba3, ad3, mi3, ao, bo;

                while(them[0].length) {

                    added = them[0].pop();
                    amount = them[1].pop();

                    if(should_return_transparent && added[3] === 0 && amount === 1) {

                        base.set(Uint8ClampedArray.of(0, 0, 0, 0), 0);
                    }else if(added[3] === 255 && amount === 1) {

                        base.set(added, 0);
                    }else {

                        ba3 = base[3] / 255;
                        ad3 = added[3] / 255 * amount;
                        mix.fill(0);
                        mi3 = 0;
                        if (ba3 > 0 && ad3 > 0) {
                            if(alpha_addition) { mi3 = ad3 + ba3; }else { mi3 = 1 - (1 - ad3) * (1 - ba3);}
                            ao = ad3 / mi3;
                            bo = ba3 * (1 - ad3) / mi3;
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
                        } mix[3] = mi3 * 255;

                        base.set(mix, 0);
                    }
                }

                return base;
            }

            function group_them(i1, i4, i8_rgba_lists, f32_amounts_lists) {

                let them = new Array(2);
                    them[0] = new Array();
                    them[1] = new Array();

                for(let layer_n = layer_length; layer_n > 0; layer_n--) {

                    const amount = f32_amounts_lists[layer_n-1][i1];
                    const color = i8_rgba_lists[layer_n-1].slice(i4, i4+4);
                    them[0].push(color);
                    them[1].push(amount);
                    if(color[3] >= 255) { layer_n = 0;}
                }

                return them;
            }

            let i8_rgba_final_list = new Array();
            let them_colors = new Array(colors_length);

            for(let i1 = 0, i4 = 0; i1 < colors_length; i1++, i4+=4) { them_colors[i1] = group_them(i1, i4, i8_rgba_lists, f32_amounts_lists); }
            for(let i1 = 0; i1 < colors_length; i1++) { i8_rgba_final_list.push.apply(i8_rgba_final_list, blend_them(them_colors[i1], false, should_return_transparent, alpha_addition));}

            return Uint8ClampedArray.from(i8_rgba_final_list);
        }

        function all_them_color_group_unit(list, colors_length, layer_length, should_return_transparent, alpha_addition) {

            const mapped_colors = new Map();
            new Uint32Array(
                blend_them_all_by_group(list.i8_rgba_lists, list.f32_amounts_lists, colors_length, layer_length, should_return_transparent, alpha_addition).reverse().buffer
            ).reverse().forEach(function(color, index){

                mapped_colors.set(index_list[index], color);
            });

            delete list.i8_rgba_lists;
            delete list.f32_amounts_lists;
            return mapped_colors;
        }

        return all_them_color_group_unit(list, colors_length, layer_length, should_return_transparent, alpha_addition);
    },
    new: function(){

        const blender = this.blend;
        let array_data;

        return {
            push_index: function(index) {

                array_data[0].push(index);
            },
            push_item: function(layer_index, color = 0, amount = 0, is_hover = false) {

                array_data[1][layer_index][0].push(color);
                array_data[1][layer_index][1].push(amount);
                array_data[1][layer_index][2].push(Boolean(is_hover));
            },
            mix_blend: function (should_return_transparent = false, alpha_addition = false) {

                return blender(array_data, should_return_transparent, alpha_addition);
            },
            new_from: function (layer_number) {

                // Init layers of color
                array_data = new Array();
                array_data[0] = new Array();
                array_data[1] = new Array(layer_number-1);
                for(let i = 0; i < layer_number; i++) {

                    array_data[1][i] = Array.of(
                        new Array(),
                        new Array(),
                        new Array(),
                    );
                }
            }
        };
    }
};

module.exports = Object.create(SuperBlend);