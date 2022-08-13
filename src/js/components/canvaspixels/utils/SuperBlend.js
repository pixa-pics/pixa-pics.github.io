const SuperBlend = {
    blend: function(data_set, should_return_transparent = false, alpha_addition = false) {

        if(typeof data_set[0] === "undefined"){ return null; }
        if(typeof data_set[1] === "undefined"){ return null; }

        const index_set = data_set[0];
        const layers = data_set[1];
        const layer_length = layers.length;

        const i8_rgba_list_a = new Uint8ClampedArray(new Uint32Array(layers[0][0].length).buffer);
        for(let layer_n = 0; layer_n < layer_length; layer_n++) {

            const [i32_rgba_list_b, f32_amounts_list, is_hover_indexes] = layers[layer_n];

            const length = i32_rgba_list_b.length;
            const i8_rgba_list_b = new Uint8ClampedArray(i32_rgba_list_b.reverse().buffer).reverse();

            for(let i1 = 0, i4 = 0; i1 < length; i1++, i4+=4) {

                const amount = f32_amounts_list[i1];
                let base = i8_rgba_list_a.slice(i4, i4+4);
                const is_added_hover = is_hover_indexes[i1];

                let added_hover;
                if(is_added_hover) {

                    const l = 255 - parseInt(parseInt(Math.max(base[0], base[1], base[2]) + Math.min(base[0], base[1], base[2])) % 510 / 2);
                    added_hover = Uint8ClampedArray.of(
                        l+base[0]*2/3,
                        l+base[1]*2/3,
                        l+base[2]*2/3,
                        255*amount/2,
                    );
                }

                let added = is_added_hover ? added_hover: i8_rgba_list_b.slice(i4, i4+4);
                if(should_return_transparent && added[3] === 0 && amount === 1) {

                    i8_rgba_list_a.set(Uint8ClampedArray.of(0, 0, 0, 0), i4);
                }else if(added[3] === 255 && amount === 1) {

                    i8_rgba_list_a.set(added, i4);
                }else {

                    const ba3 = base[3] / 255;
                    const ad3 = added[3] / 255 * amount;
                    let mix = new Uint8ClampedArray(4);
                    let mi3 = 0;
                    if (ba3 > 0 && ad3 > 0) {
                        if(alpha_addition) { mi3 = ad3 + ba3; }else { mi3 = 1 - (1 - ad3) * (1 - ba3);}
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
                    } mix[3] = mi3 * 255;

                    i8_rgba_list_a.set(mix, i4);
                }
            }
        }

        let results = new Map();
        new Uint32Array(i8_rgba_list_a.reverse().buffer).reverse().forEach(function(u32, key_index) {
                results.set(index_set[key_index], Number(u32));
        }); return results;
    },
    new: function(){

        const blender = this.blend;
        let array_data;

        return {
            push_index: function(index) {

                array_data[0].push(index);
            },
            push_item: function(layer_index, color = 0, amount = 0, is_hover = false) {

                array_data[1][layer_index][0].push(parseInt(color));
                array_data[1][layer_index][1].push(parseFloat(amount));
                array_data[1][layer_index][2].push(Boolean(is_hover));
            },
            mix_blend: function (should_return_transparent = false, alpha_addition = false) {

                const data_set = Array.of(
                    Array.from(array_data[0]),
                    Array.from(array_data[1]).map(
                        function(data){
                            return Array.of(
                                Uint32Array.from(data[0]),
                                Float32Array.from(data[1]),
                                Array.from(data[2])
                            );
                        }
                    ));
                return blender(data_set, should_return_transparent, alpha_addition);
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

module.exports = SuperBlend;