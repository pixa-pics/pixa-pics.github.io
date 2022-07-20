"use strict";

/*
var fu = async function(
    pxls,
    pxl_colors,
    bucket_threshold,
    threshold_steps,
    color_number_bonus,
    best_color_number,
    this_state_bucket_threshold
) {

    "use strict";

    var coco = {
        blend_colors: function(color_a, color_b, amount = 1, should_return_transparent = false, alpha_addition = false) {

            if(amount === 0 && should_return_transparent) {return 0;}

            // If the second color is transparent, return transparent
            if(should_return_transparent && color_b === 0 && amount === 1) { 0 }

            // Extract RGBA from both colors
            var base = this.to_rgba_from_uint32(color_a);
            var added = this.to_rgba_from_uint32(color_b);

            if(added[3] === 255 && amount === 1) { return color_b }

            var ba3 = base[3] / 255;
            var ad3 = (added[3] / 255) * amount;

            var mix = new Uint8ClampedArray(4);
            var mi3 = 0;

            if (ba3 > 0 && ad3 > 0) {

                if(alpha_addition) {

                    mi3 = ad3 + ba3;
                }else {

                    mi3 = 1 - (1 - ad3) * (1 - ba3);
                }

                var ao = ad3 / mi3;
                var bo = ba3 * (1 - ad3) / mi3;

                mix.set(Array.of(
                    parseInt(added[0] * ao + base[0] * bo), // red
                    parseInt(added[1] * ao + base[1] * bo), // green
                    parseInt(added[2] * ao + base[2] * bo)
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

            mix[3] = parseInt(mi3 * 255);

            return this.to_uint32_from_rgba(mix);
        },
        to_hex_from_uint32: function(uint32){
            return "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
        },
        to_hex_from_rgba: function(rgba) {
            return "#".concat("00000000".concat(new Uint32Array(rgba.reverse().buffer)[0].toString(16)).slice(-8));
        },
        to_rgba_from_hex: function(hex) {
            return new Uint8ClampedArray(Uint32Array.of(parseInt(hex.slice(1), 16)).buffer).reverse();
        },
        to_rgba_from_uint32: function(uint32) {
            return new Uint8ClampedArray(Uint32Array.of(uint32).buffer).reverse();
        },
        to_uint32_from_rgba: function(rgba) {
            return new Uint32Array(rgba.reverse().buffer)[0];
        },
        to_uint32_from_hex: function(hex) {
            return parseInt(hex.slice(1), 16);
        },
        match_color: function(color_a, color_b, threshold) {

            threshold = typeof threshold === "undefined" ? null: threshold;

            if(threshold === 1) {

                return true;
            }else if(threshold === 0){

                return color_a === color_b;
            }else {

                var threshold_256 = parseInt(threshold * 255);

                var c_a = this.to_rgba_from_uint32(color_a);
                var c_b = this.to_rgba_from_uint32(color_b);

                var a_diff = Math.abs(c_a[3] - c_b[3]);
                var r_diff = Math.abs(c_a[0] - c_b[0]);
                var g_diff = Math.abs(c_a[1] - c_b[1]);
                var b_diff = Math.abs(c_a[2] - c_b[2]);

                var a_diff_ratio = Math.abs(1 - a_diff / 255);

                if(threshold !== null) {

                    return Boolean(r_diff < threshold_256 && g_diff < threshold_256 && b_diff < threshold_256 && a_diff < threshold_256);
                }else {

                    return parseFloat(parseInt(r_diff + g_diff + b_diff) / parseInt(255 * 3)) * a_diff_ratio;
                }
            }
        },
        clean_duplicate_colors(_pxls, _pxl_colors) {

            // Work with Hashtables and Typed Array so it is fast
            var new_pxl_colors_map = new Map();
            var new_pxls = new Array(_pxls.length);

            _pxls.forEach((pxl, iteration) => {

                var color = _pxl_colors[pxl];
                var index_of_color = new_pxl_colors_map.get(color) || -1;

                if(index_of_color === -1) {

                    index_of_color = new_pxl_colors_map.size;
                    new_pxl_colors_map.set(color, index_of_color);
                }

                new_pxls[iteration] = index_of_color;
            });

            var new_pxl_colors = new Uint32Array(new_pxl_colors_map.size);
            for (var [key, value] of new_pxl_colors_map) {

                new_pxl_colors[value] = key;
            }

            return Array.of(new_pxls, new_pxl_colors);
        }
    };

    return new Promise(function(resolve, reject){

        var is_bucket_threshold_auto = bucket_threshold === "auto";
        var is_bucket_threshold_auto_goal_reached = !is_bucket_threshold_auto;
        var bucket_threshold_auto_goal_target = 15;
        var bucket_threshold_auto_goal_attempt = new Set();
        best_color_number = best_color_number !== null ? best_color_number: Math.max(Math.sqrt(pxl_colors.length) + color_number_bonus, 100);

        if(best_color_number < 2 || best_color_number + 12 > pxl_colors.length) {

            is_bucket_threshold_auto_goal_reached = true;
        }

        var attempt = 1;
        var new_pxls = new Array(pxls.length);
        var new_pxl_colors = new Uint32Array(pxl_colors.length);

        while (!is_bucket_threshold_auto_goal_reached || attempt === 1) {
            attempt++;

            bucket_threshold = is_bucket_threshold_auto ?
                1/(bucket_threshold_auto_goal_target - 2):
                bucket_threshold || this_state_bucket_threshold;
            threshold_steps = threshold_steps || parseInt(bucket_threshold * 255);

            new_pxls = Array.from(pxls);
            new_pxl_colors = Uint32Array.from(pxl_colors);
            var indexes_of_colors_proceed = new Set();
            var pxl_colors_usage = new Map();

            for (var i = 1; i <= threshold_steps; i += 1) {

                var threshold = parseFloat(bucket_threshold * (i / threshold_steps));
                var weight_applied_to_color_usage_difference = parseFloat(i / threshold_steps);

                new_pxls.forEach((color_index) => {

                    var n = pxl_colors_usage.get(color_index) || 0;
                    pxl_colors_usage.set(color_index, n+1);
                });

                new_pxl_colors.forEach((color_a, index_of_color_a) => {

                    if(!indexes_of_colors_proceed.has(index_of_color_a)) {

                        var color_a_usage = pxl_colors_usage.get(index_of_color_a);

                        new_pxl_colors.forEach((color_b, index_of_color_b) => {

                            if(index_of_color_a !== index_of_color_b && !indexes_of_colors_proceed.has(index_of_color_b)) {

                                var color_b_usage = pxl_colors_usage.get(index_of_color_b);
                                var color_a_more_used = color_a_usage > color_b_usage;

                                var color_usage_difference = color_a_more_used ? color_a_usage / color_b_usage: color_b_usage / color_a_usage;
                                var weighted_threshold = (threshold + (threshold * (1 - 1 / color_usage_difference) * weight_applied_to_color_usage_difference)) / (1 + weight_applied_to_color_usage_difference);

                                if(coco.match_color(color_a, color_b, weighted_threshold)) {

                                    var color = color_a_more_used ?
                                        coco.blend_colors(new_pxl_colors[index_of_color_a], new_pxl_colors[index_of_color_b], 1 / (color_usage_difference), true, false):
                                        coco.blend_colors(new_pxl_colors[index_of_color_b], new_pxl_colors[index_of_color_a], 1 / (color_usage_difference), true, false);

                                    new_pxl_colors[index_of_color_a] = color;
                                    new_pxl_colors[index_of_color_b] = color;
                                    indexes_of_colors_proceed.add(index_of_color_a);
                                    indexes_of_colors_proceed.add(index_of_color_b);
                                }
                            }
                        });
                    }
                });

                indexes_of_colors_proceed.clear();
                pxl_colors_usage.clear();
                var r = coco.clean_duplicate_colors(new_pxls, new_pxl_colors);
                new_pxls = r[0];
                new_pxl_colors = r[1];
            }

            if((new_pxl_colors.length + 12 > best_color_number && new_pxl_colors.length - 12 < best_color_number) || !is_bucket_threshold_auto || bucket_threshold_auto_goal_attempt.has(bucket_threshold_auto_goal_target)) {

                is_bucket_threshold_auto_goal_reached = true;
            }else if(new_pxl_colors.length > best_color_number){

                bucket_threshold_auto_goal_attempt.add(bucket_threshold_auto_goal_target);
                bucket_threshold_auto_goal_target --;
            }else {

                bucket_threshold_auto_goal_attempt.add(bucket_threshold_auto_goal_target);
                bucket_threshold_auto_goal_target ++;
            }
        }

        resolve(coco.clean_duplicate_colors(new_pxls, new_pxl_colors));
        new_pxls = null;
        new_pxl_colors = null;
    })};*/

const ReducePalette = {

    _create_state: function (
        pool,
        pxls,
        pxl_colors,
        bucket_threshold,
        threshold_steps,
        color_number_bonus,
        best_color_number,
        state_bucket_threshold
    ) {

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const asyncs = `var r=async function(r,t,a,e,n,o,i){"use strict";var s={blend_colors:function(r,t,a=1,e=!1,n=!1){if(0===a&&e)return 0;var o=this.to_rgba_from_uint32(r),i=this.to_rgba_from_uint32(t);if(255===i[3]&&1===a)return t;var s=o[3]/255,f=i[3]/255*a,l=new Uint8ClampedArray(4),u=0;if(s>0&&f>0){var c=f/(u=n?f+s:1-(1-f)*(1-s)),_=s*(1-f)/u;l.set(Array.of(parseInt(i[0]*c+o[0]*_),parseInt(i[1]*c+o[1]*_),parseInt(i[2]*c+o[2]*_)),0)}else f>0?(u=i[3]/255,l.set(i,0)):(u=o[3]/255,l.set(o,0));return n&&(u/=2),l[3]=parseInt(255*u),this.to_uint32_from_rgba(l)},to_hex_from_uint32:function(r){return"#".concat("00000000".concat(r.toString(16)).slice(-8))},to_hex_from_rgba:function(r){return"#".concat("00000000".concat(new Uint32Array(r.reverse().buffer)[0].toString(16)).slice(-8))},to_rgba_from_hex:function(r){return new Uint8ClampedArray(Uint32Array.of(parseInt(r.slice(1),16)).buffer).reverse()},to_rgba_from_uint32:function(r){return new Uint8ClampedArray(Uint32Array.of(r).buffer).reverse()},to_uint32_from_rgba:function(r){return new Uint32Array(r.reverse().buffer)[0]},to_uint32_from_hex:function(r){return parseInt(r.slice(1),16)},match_color:function(r,t,a){if(1===(a=void 0===a?null:a))return!0;if(0===a)return r===t;var e=parseInt(255*a),n=this.to_rgba_from_uint32(r),o=this.to_rgba_from_uint32(t),i=Math.abs(n[3]-o[3]),s=Math.abs(n[0]-o[0]),f=Math.abs(n[1]-o[1]),l=Math.abs(n[2]-o[2]),u=Math.abs(1-i/255);return null!==a?Boolean(s<e&&f<e&&l<e&&i<e):parseFloat(parseInt(s+f+l)/parseInt(765))*u},clean_duplicate_colors(r,t){var a=new Map,e=new Array(r.length);r.forEach(((r,n)=>{var o=t[r],i=a.get(o)||-1;-1===i&&(i=a.size,a.set(o,i)),e[n]=i}));var n=new Uint32Array(a.size);for(var[o,i]of a)n[i]=o;return Array.of(e,n)}};return new Promise((function(f,l){var u="auto"===a,c=!u,_=15,h=new Set;((o=null!==o?o:Math.max(Math.sqrt(t.length)+n,100))<2||o+12>t.length)&&(c=!0);for(var v=1,g=new Array(r.length),b=new Uint32Array(t.length);!c||1===v;){v++,a=u?1/(_-2):a||i,e=e||parseInt(255*a),g=Array.from(r),b=Uint32Array.from(t);for(var p=new Set,m=new Map,d=1;d<=e;d+=1){var y=parseFloat(a*(d/e)),A=parseFloat(d/e);g.forEach((r=>{var t=m.get(r)||0;m.set(r,t+1)})),b.forEach(((r,t)=>{if(!p.has(t)){var a=m.get(t);b.forEach(((e,n)=>{if(t!==n&&!p.has(n)){var o=m.get(n),i=a>o,f=i?a/o:o/a,l=(y+y*(1-1/f)*A)/(1+A);if(s.match_color(r,e,l)){var u=i?s.blend_colors(b[t],b[n],1/f,!0,!1):s.blend_colors(b[n],b[t],1/f,!0,!1);b[t]=u,b[n]=u,p.add(t),p.add(n)}}}))}})),p.clear(),m.clear();var w=s.clean_duplicate_colors(g,b);g=w[0],b=w[1]}b.length+12>o&&b.length-12<o||!u||h.has(_)?c=!0:b.length>o?(h.add(_),_--):(h.add(_),_++)}f(s.clean_duplicate_colors(g,b)),g=null,b=null}))};`
            + "return r;";

        return Object.assign({}, {
            // Compute properties
            asyncf: new AsyncFunction(asyncs)(),
            workerp: pool,
            p: pxls,
            pc: pxl_colors,
            bt: bucket_threshold,
            ts: threshold_steps,
            cnb: color_number_bonus,
            bcn: best_color_number,
            stb: state_bucket_threshold
        });
    },

    from: function(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold){

        let cs = this._create_state;
        let s = cs(
            pool,
            pxls,
            pxl_colors,
            bucket_threshold,
            threshold_steps,
            color_number_bonus,
            best_color_number,
            state_bucket_threshold
        );

        return {
            // Methods
            new(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold) {

                s = cs(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold);
            },
            destroy(callback_function = function(){}) {
                if(s !== null) {
                    s.workerp.terminate(callback_function);
                    s = null;
                }else {
                    callback_function("ok");
                }
            },
            compute(callback_function) {

                if(s !== null) {

                    s.workerp.exec(

                        s.asyncf, [s.p, s.pc, s.bt, s.ts, s.cnb, s.bcn, s.stb]
                    ).catch((e) => {

                        return s.asyncf(s.p, s.pc, s.bt, s.ts, s.cnb, s.bcn, s.stb);
                    }).timeout(120 * 1000).then(callback_function);
                }else {

                    callback_function([]);
                }
            },
        };
    }
};

module.exports = ReducePalette;