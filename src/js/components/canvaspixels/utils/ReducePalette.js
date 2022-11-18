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
        color_a_dv: new DataView(new ArrayBuffer(4)),
        color_b_dv: new DataView(new ArrayBuffer(4)),
        dv_match_8_bytes_uint8: new DataView(new ArrayBuffer(8)),
        base: new Uint8ClampedArray(4),
        added: new Uint8ClampedArray(4),
        mix: new Uint8ClampedArray(4),
        blend_colors: function(color_a, color_b, amount, should_return_transparent, alpha_addition) {
            "use strict";
            amount = amount || 1;
            should_return_transparent = should_return_transparent || false;
            alpha_addition = alpha_addition || false;
            color_a = (color_a | 0) & 0xFFFFFFFF;
            color_b = (color_b | 0) & 0xFFFFFFFF;

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
                ));// blue

            }else if(ad3 > 0) {

                mi3 = added[3] / 255;
                mix.set(added);
            }else {

                mi3 = base[3] / 255;
                mix.set(base);
            }

            if(alpha_addition) {
                mi3 /= 2;
            }

            mix.set(Uint8ClampedArray.of(mi3 * 255), 3);
            return this.to_uint32_from_rgba(mix) | 0;
        },
        to_rgba_from_uint32: function(uint32) {
            "use strict";
            uint32 = (uint32 | 0) & 0xFFFFFFFF;
            return new Uint8ClampedArray(Uint32Array.of(uint32).buffer).reverse();
        },
        to_uint32_from_rgba: function(rgba) {
            "use strict";
            return new Uint32Array(rgba.reverse().buffer)[0];
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
        match_color: function(color_a, color_b, threshold) {
            "use strict";
            color_a = (color_a | 0) & 0xFFFFFFFF;
            color_b = (color_b | 0) & 0xFFFFFFFF;
            threshold = threshold * 255 | 0;

            if(threshold === 255) {

                return true;
            }else if(threshold === 0){

                return Boolean(color_a === color_b);
            }else {

                this.dv_match_8_bytes_uint8.setUint32(0, color_a);
                this.dv_match_8_bytes_uint8.setUint32(4, color_b);

                return Boolean(
                    Math.abs(this.dv_match_8_bytes_uint8.getUint8(3) - this.dv_match_8_bytes_uint8.getUint8(7)) < threshold &&
                    Math.abs(this.dv_match_8_bytes_uint8.getUint8(2) - this.dv_match_8_bytes_uint8.getUint8(6)) < threshold &&
                    Math.abs(this.dv_match_8_bytes_uint8.getUint8(1) - this.dv_match_8_bytes_uint8.getUint8(5)) < threshold &&
                    Math.abs(this.dv_match_8_bytes_uint8.getUint8(0) - this.dv_match_8_bytes_uint8.getUint8(4)) < threshold);
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

    return new Promise(function(resolve, reject){
        "use strict";
        var is_bucket_threshold_auto = bucket_threshold === "auto";
        var is_bucket_threshold_auto_goal_reached = !is_bucket_threshold_auto;
        var bucket_threshold_auto_goal_target = 15;
        var bucket_threshold_auto_goal_attempt = new Set();
        best_color_number = best_color_number !== null ? best_color_number: Math.max(Math.sqrt(pxl_colors.length) + color_number_bonus, 100);

        if(best_color_number < 2 || best_color_number + 12 > pxl_colors.length) {

            is_bucket_threshold_auto_goal_reached = true;
        }

        var max_hue = 360;
        var attempt = 1;
        var new_pxls;
        var new_pxl_colors;

        while (!is_bucket_threshold_auto_goal_reached || attempt === 1) {
            attempt++;

            bucket_threshold = is_bucket_threshold_auto ?
                1/(bucket_threshold_auto_goal_target - 2):
                bucket_threshold || this_state_bucket_threshold;

            threshold_steps = threshold_steps || parseInt(bucket_threshold * 255);

            new_pxls = Uint16Array.from(pxls);
            new_pxl_colors = Uint32Array.from(pxl_colors);

            var max_cluster = Math.ceil(new_pxl_colors.length / 100)+1;
            var cluster_size = Math.ceil(max_hue / max_cluster);
            var indexes_of_colors_proceed = new Set();
            var pxl_colors_usage = new Map();

            for (var i = 1; i <= threshold_steps; i += 1) {

                var threshold = bucket_threshold * (i / threshold_steps);
                var weight_applied_to_color_usage_difference = i / threshold_steps;

                new_pxls.forEach(function(color_index){

                    var n = pxl_colors_usage.get(color_index) || 0;
                    pxl_colors_usage.set(color_index, n+1);
                });

                var color_clusters = new Array(12);
                var index_clusters = new Array(12);

                for(var c = 0; c < max_cluster; c++){

                    color_clusters[c] = new Array();
                    index_clusters[c] = new Array();
                }

                new_pxl_colors.forEach(function (color, index){

                    var hue = coco.to_hsla_from_rgba(coco.to_rgba_from_uint32(color))[0];
                    color_clusters[Math.floor(hue/cluster_size)].push(color);
                    index_clusters[Math.floor(hue/cluster_size)].push(index);
                });

                for(var c = 0; c < max_cluster; c++){

                    var color_cluster = color_clusters[c];
                    var index_cluster = index_clusters[c];

                    color_cluster.forEach(function(color_a, index_of_color_a) {

                        index_of_color_a = index_cluster[index_of_color_a];
                        color_a = (color_a | 0) & 0xFFFFFFFF;

                        if(!indexes_of_colors_proceed.has(index_of_color_a)) {

                            var color_a_usage = pxl_colors_usage.get(index_of_color_a);

                            color_cluster.forEach(function(color_b, index_of_color_b) {

                                index_of_color_b = index_cluster[index_of_color_b];
                                color_b = (color_b | 0) & 0xFFFFFFFF;

                                if(index_of_color_a !== index_of_color_b && !indexes_of_colors_proceed.has(index_of_color_b)) {

                                    var color_b_usage = pxl_colors_usage.get(index_of_color_b);
                                    var color_a_more_used = color_a_usage > color_b_usage;

                                    var color_usage_difference = color_a_more_used ? color_a_usage / color_b_usage: color_b_usage / color_a_usage;
                                    var weighted_threshold = (threshold + (threshold * (1 - 1 / color_usage_difference) * weight_applied_to_color_usage_difference)) / (1 + weight_applied_to_color_usage_difference);

                                    if(coco.match_color(color_a, color_b, weighted_threshold)) {

                                        var color = color_a_more_used ?
                                            coco.blend_colors(new_pxl_colors[index_of_color_a], new_pxl_colors[index_of_color_b], 1 / (color_usage_difference), true, false):
                                            coco.blend_colors(new_pxl_colors[index_of_color_b], new_pxl_colors[index_of_color_a], 1 / (color_usage_difference), true, false);

                                        new_pxl_colors[index_of_color_a] = (color | 0) & 0xFFFFFFFF;
                                        new_pxl_colors[index_of_color_b] = (color | 0) & 0xFFFFFFFF;
                                        indexes_of_colors_proceed.add(index_of_color_a);
                                        indexes_of_colors_proceed.add(index_of_color_b);
                                    }
                                }
                            });
                        }
                    });
                    indexes_of_colors_proceed.clear();
                }

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
        const asyncs = `var t=async function(t,r,a,e,n,i,_){"use strict";var o={color_a_dv:new DataView(new ArrayBuffer(4)),color_b_dv:new DataView(new ArrayBuffer(4)),dv_match_8_bytes_uint8:new DataView(new ArrayBuffer(8)),base:new Uint8ClampedArray(4),added:new Uint8ClampedArray(4),mix:new Uint8ClampedArray(4),blend_colors:function(t,r,a,e,n){if(e=e||!1,n=n||!1,t=4294967295&(0|t),r=4294967295&(0|r),0===(a=a||1)&&e)return 0;var i=this.to_rgba_from_uint32(t),_=this.to_rgba_from_uint32(r);if(255===_[3]&&1===a)return r;var o=i[3]/255,s=_[3]/255*a,h=new Uint8ClampedArray(4),f=0;if(o>0&&s>0){var c=s/(f=n?s+o:1-(1-s)*(1-o)),l=o*(1-s)/f;h.set(Uint8ClampedArray.of(_[0]*c+i[0]*l,_[1]*c+i[1]*l,_[2]*c+i[2]*l))}else s>0?(f=_[3]/255,h.set(_)):(f=i[3]/255,h.set(i));return n&&(f/=2),h.set(Uint8ClampedArray.of(255*f),3),0|this.to_uint32_from_rgba(h)},to_rgba_from_uint32:function(t){return t=4294967295&(0|t),new Uint8ClampedArray(Uint32Array.of(t).buffer).reverse()},to_uint32_from_rgba:function(t){return new Uint32Array(t.reverse().buffer)[0]},to_hsla_from_rgba:function(t){let[r,a,e,n]=t;r/=255,a/=255,e/=255,n/=255;const i=Math.max(r,a,e),_=Math.min(r,a,e);let o,s,h=(i+_)/2;if(i==_)o=s=0;else{var f=i-_;switch(s=h>.5?f/(2-i-_):f/(i+_),i){case r:o=(a-e)/f+(a<e?6:0);break;case a:o=(e-r)/f+2;break;case e:o=(r-a)/f+4}o/=6}return Array.of(360*o|0,100*s|0,100*h|0,100*n|0)},match_color:function(t,r,a){return t=4294967295&(0|t),r=4294967295&(0|r),255===(a=255*a|0)||(0===a?Boolean(t===r):(this.dv_match_8_bytes_uint8.setUint32(0,t),this.dv_match_8_bytes_uint8.setUint32(4,r),Boolean(Math.abs(this.dv_match_8_bytes_uint8.getUint8(3)-this.dv_match_8_bytes_uint8.getUint8(7))<a&&Math.abs(this.dv_match_8_bytes_uint8.getUint8(2)-this.dv_match_8_bytes_uint8.getUint8(6))<a&&Math.abs(this.dv_match_8_bytes_uint8.getUint8(1)-this.dv_match_8_bytes_uint8.getUint8(5))<a&&Math.abs(this.dv_match_8_bytes_uint8.getUint8(0)-this.dv_match_8_bytes_uint8.getUint8(4))<a)))},clean_duplicate_colors(t,r){for(var a=new Map,e=0|t.length,n=new Uint16Array(e),i=0,_=0;_<e;_=(_+1|0)>>>0){i=4294967295&(0|r[(0|t[(0|_)>>>0])>>>0]);var o=a.get(i);void 0===o&&(o=(0|a.size)>>>0,a.set(i,o)),n[_]=(0|o)>>>0}var s=new Uint32Array(a.size);for(var h of a)s[h[1]]=4294967295&(0|h[0]);return Array.of(n,s)}};return new Promise((function(s){var h="auto"===a,f=!h,c=15,l=new Set;((i=null!==i?i:Math.max(Math.sqrt(r.length)+n,100))<2||i+12>r.length)&&(f=!0);for(var u,d,v=1;!f||1===v;){v++,a=h?1/(c-2):a||_,e=e||parseInt(255*a),u=Uint16Array.from(t),d=Uint32Array.from(r);for(var m=Math.ceil(d.length/100)+1,y=Math.ceil(360/m),b=new Set,g=new Map,w=1;w<=e;w+=1){var U=a*(w/e),A=w/e;u.forEach((function(t){var r=g.get(t)||0;g.set(t,r+1)}));for(var p=new Array(12),M=new Array(12),C=0;C<m;C++)p[C]=new Array,M[C]=new Array;d.forEach((function(t,r){var a=o.to_hsla_from_rgba(o.to_rgba_from_uint32(t))[0];p[Math.floor(a/y)].push(t),M[Math.floor(a/y)].push(r)}));for(C=0;C<m;C++){var B=p[C],E=M[C];B.forEach((function(t,r){if(r=E[r],t=4294967295&(0|t),!b.has(r)){var a=g.get(r);B.forEach((function(e,n){if(n=E[n],e=4294967295&(0|e),r!==n&&!b.has(n)){var i=g.get(n),_=a>i,s=_?a/i:i/a,h=(U+U*(1-1/s)*A)/(1+A);if(o.match_color(t,e,h)){var f=_?o.blend_colors(d[r],d[n],1/s,!0,!1):o.blend_colors(d[n],d[r],1/s,!0,!1);d[r]=4294967295&(0|f),d[n]=4294967295&(0|f),b.add(r),b.add(n)}}}))}})),b.clear()}g.clear();var x=o.clean_duplicate_colors(u,d);u=x[0],d=x[1]}d.length+25>i&&d.length-25<i||!h||l.has(c)?f=!0:d.length>i?(l.add(c),c--):(l.add(c),c++)}s(o.clean_duplicate_colors(u,d)),u=null,d=null}))};`
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
                "use strict";
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
                "use strict";
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