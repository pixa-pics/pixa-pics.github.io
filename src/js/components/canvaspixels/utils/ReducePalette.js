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
        dv_match_8_bytes_uint8: new DataView(new ArrayBuffer(8)),
        blend_colors: function(color_a, color_b, amount = 1, should_return_transparent = false, alpha_addition = false) {

            color_a = color_a | 0;
            color_b = color_b | 0;

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

            mix.set(Uint8ClampedArray.of(mi3 * 255), 3);

            return this.to_uint32_from_rgba(mix) | 0;
        },
        to_rgba_from_uint32: function(uint32) {
            uint32 = uint32 | 0;
            return new Uint8ClampedArray(Uint32Array.of(uint32).buffer).reverse();
        },
        to_uint32_from_rgba: function(rgba) {
            return new Uint32Array(rgba.reverse().buffer)[0];
        },
        match_color: function(color_a, color_b, threshold) {

            threshold = threshold * 255 | 0;

            if(threshold === 255) {

                return true;
            }else if(threshold === 0){

                return Boolean(color_a === color_b);
            }else {

                this.dv_match_8_bytes_uint8.setUint32(0, color_a | 0);
                this.dv_match_8_bytes_uint8.setUint32(4, color_b | 0);

                return Boolean(
                    Math.abs(this.dv_match_8_bytes_uint8.getUint8(3) - this.dv_match_8_bytes_uint8.getUint8(7)) < threshold &&
                    Math.abs(this.dv_match_8_bytes_uint8.getUint8(2) - this.dv_match_8_bytes_uint8.getUint8(6)) < threshold &&
                    Math.abs(this.dv_match_8_bytes_uint8.getUint8(1) - this.dv_match_8_bytes_uint8.getUint8(5)) < threshold &&
                    Math.abs(this.dv_match_8_bytes_uint8.getUint8(0) - this.dv_match_8_bytes_uint8.getUint8(4)) < threshold);
            }
        },
        clean_duplicate_colors(_pxls, _pxl_colors) {

            // Work with Hashtables and Typed Array so it is fast
            var new_pxl_colors_map = new Map();
            var _pxls_length = _pxls.length | 0;
            var new_pxls = new Array(_pxls_length);

            var pxl_color_index = 0;
            var color = 0;

            for(var i = 0; i < _pxls_length; i = i + 1 | 0) {

                pxl_color_index = _pxls[i] | 0;
                color = _pxl_colors[pxl_color_index] | 0;
                var new_pxl_color_index = new_pxl_colors_map.get(color)

                if(typeof new_pxl_color_index === "undefined") {

                    new_pxl_color_index = new_pxl_colors_map.size | 0;
                    new_pxl_colors_map.set(color, new_pxl_color_index);
                }

                new_pxls[i] = new_pxl_color_index | 0;
            }

            var new_pxl_colors = new Array(new_pxl_colors_map.size);
            for (var e of new_pxl_colors_map) {

                new_pxl_colors[e[1]] = e[0] | 0;
            }

            return Array.of(new_pxls, Uint32Array.from(new_pxl_colors));
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
        var new_pxls;
        var new_pxl_colors;

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

                    index_of_color_a = index_of_color_a | 0;
                    color_a = color_a | 0;

                    if(!indexes_of_colors_proceed.has(index_of_color_a)) {

                        var color_a_usage = pxl_colors_usage.get(index_of_color_a);

                        new_pxl_colors.forEach((color_b, index_of_color_b) => {

                            index_of_color_b = index_of_color_b | 0;
                            color_b = color_b | 0;

                            if(index_of_color_a !== index_of_color_b && !indexes_of_colors_proceed.has(index_of_color_b)) {

                                var color_b_usage = pxl_colors_usage.get(index_of_color_b);
                                var color_a_more_used = color_a_usage > color_b_usage;

                                var color_usage_difference = color_a_more_used ? color_a_usage / color_b_usage: color_b_usage / color_a_usage;
                                var weighted_threshold = (threshold + (threshold * (1 - 1 / color_usage_difference) * weight_applied_to_color_usage_difference)) / (1 + weight_applied_to_color_usage_difference);

                                if(coco.match_color(color_a, color_b, weighted_threshold)) {

                                    var color = color_a_more_used ?
                                        coco.blend_colors(new_pxl_colors[index_of_color_a], new_pxl_colors[index_of_color_b], 1 / (color_usage_difference), true, false):
                                        coco.blend_colors(new_pxl_colors[index_of_color_b], new_pxl_colors[index_of_color_a], 1 / (color_usage_difference), true, false);

                                    new_pxl_colors[index_of_color_a] = color | 0;
                                    new_pxl_colors[index_of_color_b] = color | 0;
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

            if((new_pxl_colors.length + 25 > best_color_number && new_pxl_colors.length - 25 < best_color_number) || !is_bucket_threshold_auto || bucket_threshold_auto_goal_attempt.has(bucket_threshold_auto_goal_target)) {

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
        const asyncs = `var t=async function(t,r,a,e,n,_,i){"use strict";var s={dv_match_8_bytes_uint8:new DataView(new ArrayBuffer(8)),blend_colors:function(t,r,a=1,e=!1,n=!1){if(t|=0,r|=0,0===a&&e)return 0;var _=this.to_rgba_from_uint32(t),i=this.to_rgba_from_uint32(r);if(255===i[3]&&1===a)return r;var s=_[3]/255,o=i[3]/255*a,h=new Uint8ClampedArray(4),u=0;if(s>0&&o>0){var c=o/(u=n?o+s:1-(1-o)*(1-s)),l=s*(1-o)/u;h.set(Uint8ClampedArray.of(i[0]*c+_[0]*l,i[1]*c+_[1]*l,i[2]*c+_[2]*l),0)}else o>0?(u=i[3]/255,h.set(i,0)):(u=_[3]/255,h.set(_,0));return n&&(u/=2),h.set(Uint8ClampedArray.of(255*u),3),0|this.to_uint32_from_rgba(h)},to_rgba_from_uint32:function(t){return t|=0,new Uint8ClampedArray(Uint32Array.of(t).buffer).reverse()},to_uint32_from_rgba:function(t){return new Uint32Array(t.reverse().buffer)[0]},match_color:function(t,r,a){return 255===(a=255*a|0)||(0===a?Boolean(t===r):(this.dv_match_8_bytes_uint8.setUint32(0,0|t),this.dv_match_8_bytes_uint8.setUint32(4,0|r),Boolean(Math.abs(this.dv_match_8_bytes_uint8.getUint8(3)-this.dv_match_8_bytes_uint8.getUint8(7))<a&&Math.abs(this.dv_match_8_bytes_uint8.getUint8(2)-this.dv_match_8_bytes_uint8.getUint8(6))<a&&Math.abs(this.dv_match_8_bytes_uint8.getUint8(1)-this.dv_match_8_bytes_uint8.getUint8(5))<a&&Math.abs(this.dv_match_8_bytes_uint8.getUint8(0)-this.dv_match_8_bytes_uint8.getUint8(4))<a)))},clean_duplicate_colors(t,r){for(var a=new Map,e=0|t.length,n=new Array(e),_=0,i=0;i<e;i=i+1|0){_=0|r[0|t[i]];var s=a.get(_);void 0===s&&(s=0|a.size,a.set(_,s)),n[i]=0|s}var o=new Array(a.size);for(var h of a)o[h[1]]=0|h[0];return Array.of(n,Uint32Array.from(o))}};return new Promise((function(o,h){var u="auto"===a,c=!u,l=15,f=new Set;((_=null!==_?_:Math.max(Math.sqrt(r.length)+n,100))<2||_+12>r.length)&&(c=!0);for(var v,d,m=1;!c||1===m;){m++,a=u?1/(l-2):a||i,e=e||parseInt(255*a),v=Array.from(t),d=Uint32Array.from(r);for(var b=new Set,y=new Map,g=1;g<=e;g+=1){var U=parseFloat(a*(g/e)),w=parseFloat(g/e);v.forEach((t=>{var r=y.get(t)||0;y.set(t,r+1)})),d.forEach(((t,r)=>{if(r|=0,t|=0,!b.has(r)){var a=y.get(r);d.forEach(((e,n)=>{if(e|=0,r!==(n|=0)&&!b.has(n)){var _=y.get(n),i=a>_,o=i?a/_:_/a,h=(U+U*(1-1/o)*w)/(1+w);if(s.match_color(t,e,h)){var u=i?s.blend_colors(d[r],d[n],1/o,!0,!1):s.blend_colors(d[n],d[r],1/o,!0,!1);d[r]=0|u,d[n]=0|u,b.add(r),b.add(n)}}}))}})),b.clear(),y.clear();var A=s.clean_duplicate_colors(v,d);v=A[0],d=A[1]}d.length+25>_&&d.length-25<_||!u||f.has(l)?c=!0:d.length>_?(f.add(l),l--):(f.add(l),l++)}o(s.clean_duplicate_colors(v,d)),v=null,d=null}))};`
            + "return t;";

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