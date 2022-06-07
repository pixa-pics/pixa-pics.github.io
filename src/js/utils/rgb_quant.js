/*
* Copyright (c) 2015, Leon Sorokin
* Copyright (c) 2022, Affolter Matias
* All rights reserved. (MIT Licensed)
*
* RgbQuant.js - an image quantization lib
*/

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const rgb_quant_process_function = new AsyncFunction(`var t=async function(t,i){"use strict";function r(t){if(t=t||{},this.method=t.method||2,this.colors=t.colors||256,this.initColors=t.initColors||4096,this.initDist=t.initDist||.01,this.distIncr=t.distIncr||.005,this.hueGroups=t.hueGroups||10,this.satGroups=t.satGroups||10,this.lumGroups=t.lumGroups||10,this.minHueCols=t.minHueCols||0,this.hueStats=this.minHueCols?new s(this.hueGroups,this.minHueCols):null,this.boxSize=t.boxSize||[64,64],this.boxPxls=t.boxPxls||2,this.palLocked=!1,this.dithKern=t.dithKern||null,this.dithSerp=t.dithSerp||!1,this.dithDelta=t.dithDelta||0,this.histogram={},this.idxrgb=t.palette?t.palette.slice(0):[],this.idxi32=[],this.i32idx={},this.i32rgb={},this.useCache=!1!==t.useCache,this.cacheFreq=t.cacheFreq||10,this.reIndex=t.reIndex||0==this.idxrgb.length,this.colorDist="manhattan"==t.colorDist?l:u,this.idxrgb.length>0){var i=this;this.idxrgb.forEach((function(t,r){var s=(255<<24|t[2]<<16|t[1]<<8|t[0])>>>0;i.idxi32[r]=s,i.i32idx[s]=r,i.i32rgb[s]=t}))}}function s(t,i){this.numGroups=t,this.minCols=i,this.stats={};for(var r=-1;r<t;r++)this.stats[r]={num:0,cols:[]};this.groupsFull=0}r.prototype.sample=function(t,i){if(this.palLocked)throw"Cannot sample additional images, palette already assembled.";var r=g(t,i);switch(this.method){case 1:this.colorStats1D(r.buf32);break;case 2:this.colorStats2D(r.buf32,r.width)}},r.prototype.reduce=function(t,i,r,s){if(this.palLocked||this.buildPal(),r=r||this.dithKern,s=void 0!==s?s:this.dithSerp,i=i||1,r)var e=this.dither(t,r,s);else for(var h=g(t).buf32,n=h.length,o=(e=new Uint32Array(n),0);o<n;o++){var a=h[o];e[o]=this.nearestColor(a)}if(1==i)return new Uint8Array(e.buffer);if(2==i){var u=[];for(n=e.length,o=0;o<n;o++){a=e[o];u[o]=this.i32idx[a]}return u}},r.prototype.dither=function(t,i,r){var s={FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]],Jarvis:[[7/48,1,0],[5/48,2,0],[3/48,-2,1],[5/48,-1,1],[7/48,0,1],[5/48,1,1],[3/48,2,1],[1/48,-2,2],[3/48,-1,2],[5/48,0,2],[3/48,1,2],[1/48,2,2]],Burkes:[[.25,1,0],[4/32,2,0],[2/32,-2,1],[4/32,-1,1],[.25,0,1],[4/32,1,1],[2/32,2,1]],Sierra:[[5/32,1,0],[3/32,2,0],[2/32,-2,1],[4/32,-1,1],[5/32,0,1],[4/32,1,1],[2/32,2,1],[2/32,-1,2],[3/32,0,2],[2/32,1,2]],TwoSierra:[[.25,1,0],[3/16,2,0],[1/16,-2,1],[2/16,-1,1],[3/16,0,1],[2/16,1,1],[1/16,2,1]],SierraLite:[[.5,1,0],[1/4,-1,1],[1/4,0,1]]};if(!i||!s[i])throw"Unknown dithering kernel: "+i;for(var e=s[i],h=g(t),n=h.buf32,o=h.width,a=h.height,u=(n.length,r?-1:1),l=0;l<a;l++){r&&(u*=-1);for(var c=l*o,d=1==u?0:o-1,f=1==u?o:0;d!==f;d+=u){var p=c+d,x=n[p],v=255&x,b=(65280&x)>>8,m=(16711680&x)>>16,y=this.nearestColor(x),w=255&y,S=(65280&y)>>8,C=(16711680&y)>>16;if(n[p]=255<<24|C<<16|S<<8|w,this.dithDelta)if(this.colorDist([v,b,m],[w,S,C])<this.dithDelta)continue;for(var k=v-w,D=b-S,A=m-C,M=1==u?0:e.length-1,P=1==u?e.length:0;M!==P;M+=u){var F=e[M][1]*u,G=e[M][2],I=G*o;if(F+d>=0&&F+d<o&&G+l>=0&&G+l<a){var U=e[M][0],j=p+(I+F),q=255&n[j],H=(65280&n[j])>>8,O=(16711680&n[j])>>16,z=Math.max(0,Math.min(255,q+k*U)),L=Math.max(0,Math.min(255,H+D*U)),E=Math.max(0,Math.min(255,O+A*U));n[j]=255<<24|E<<16|L<<8|z}}}}return n},r.prototype.buildPal=function(t){if(!(this.palLocked||this.idxrgb.length>0&&this.idxrgb.length<=this.colors)){var i=this.histogram,r=function(t,i){var r=[];for(var s in t)r.push(s);return x.call(r,(function(r,s){return i?t[s]-t[r]:t[r]-t[s]}))}(i,!0);if(0==r.length)throw"Nothing has been sampled, palette cannot be built.";switch(this.method){case 1:for(var s=this.initColors,e=i[r[s-1]],h=r.slice(0,s),n=s,o=r.length;n<o&&i[r[n]]==e;)h.push(r[n++]);this.hueStats&&this.hueStats.inject(h);break;case 2:h=r}h=h.map((function(t){return+t})),this.reducePal(h),!t&&this.reIndex&&this.sortPal(),this.useCache&&this.cacheHistogram(h),this.palLocked=!0}},r.prototype.palette=function(t,i){return this.buildPal(i),t?this.idxrgb:new Uint8Array(new Uint32Array(this.idxi32).buffer)},r.prototype.prunePal=function(t){for(var i,r=0;r<this.idxrgb.length;r++)t[r]||(i=this.idxi32[r],this.idxrgb[r]=null,this.idxi32[r]=null,delete this.i32idx[i]);if(this.reIndex){for(var s=[],e=[],h={},n=(r=0,0);r<this.idxrgb.length;r++)this.idxrgb[r]&&(i=this.idxi32[r],s[n]=this.idxrgb[r],h[i]=n,e[n]=i,n++);this.idxrgb=s,this.idxi32=e,this.i32idx=h}},r.prototype.reducePal=function(t){if(this.idxrgb.length>this.colors){for(var i,r=t.length,s={},e=0,h=!1,n=0;n<r;n++)e!=this.colors||h||(this.prunePal(s),h=!0),i=this.nearestIndex(t[n]),e<this.colors&&!s[i]&&(s[i]=!0,e++);h||(this.prunePal(s),h=!0)}else{var o=t.map((function(t){return[255&t,(65280&t)>>8,(16711680&t)>>16]})),a=r=o.length,u=this.initDist;if(a>this.colors){for(;a>this.colors;){var l=[];for(n=0;n<r;n++){var c=o[n];t[n];if(c)for(var d=n+1;d<r;d++){var f=o[d],p=t[d];if(f){var g=this.colorDist(c,f);g<u&&(l.push([d,f,p,g]),delete o[d],a--)}}}u+=a>3*this.colors?this.initDist:this.distIncr}if(a<this.colors){x.call(l,(function(t,i){return i[3]-t[3]}));for(var v=0;a<this.colors;)o[l[v][0]]=l[v][1],a++,v++}}for(r=o.length,n=0;n<r;n++)o[n]&&(this.idxrgb.push(o[n]),this.idxi32.push(t[n]),this.i32idx[t[n]]=this.idxi32.length-1,this.i32rgb[t[n]]=o[n])}},r.prototype.colorStats1D=function(t){for(var i,r=this.histogram,s=t.length,e=0;e<s;e++)(4278190080&(i=t[e]))>>24!=0&&(this.hueStats&&this.hueStats.check(i),i in r?r[i]++:r[i]=1)},r.prototype.colorStats2D=function(t,i){var r=this.boxSize[0],s=this.boxSize[1],e=r*s,h=function(t,i,r,s){for(var e=t%r,h=i%s,n=t-e,o=i-h,a=[],u=0;u<i;u+=s)for(var l=0;l<t;l+=r)a.push({x:l,y:u,w:l==n?e:r,h:u==o?h:s});return a}(i,t.length/i,r,s),n=this.histogram,o=this;h.forEach((function(r){var s,h=Math.max(Math.round(r.w*r.h/e)*o.boxPxls,2),a={};!function(t,i,r){var s=t,e=s.y*i+s.x,h=(s.y+s.h-1)*i+(s.x+s.w-1),n=0,o=i-s.w+1,a=e;do{r.call(this,a),a+=++n%s.w==0?o:1}while(a<=h)}(r,i,(function(i){(4278190080&(s=t[i]))>>24!=0&&(o.hueStats&&o.hueStats.check(s),s in n?n[s]++:s in a?++a[s]>=h&&(n[s]=a[s]):a[s]=1)}))})),this.hueStats&&this.hueStats.inject(n)},r.prototype.sortPal=function(){var t=this;this.idxi32.sort((function(i,r){var s=t.i32idx[i],e=t.i32idx[r],h=t.idxrgb[s],n=t.idxrgb[e],o=c(h[0],h[1],h[2]),a=c(n[0],n[1],n[2]),u=h[0]==h[1]&&h[1]==h[2]?-1:d(o.h,t.hueGroups),l=(n[0]==n[1]&&n[1]==n[2]?-1:d(a.h,t.hueGroups))-u;if(l)return-l;var f=+a.l.toFixed(2)-+o.l.toFixed(2);if(f)return-f;var p=+a.s.toFixed(2)-+o.s.toFixed(2);return p?-p:void 0})),this.idxi32.forEach((function(i,r){t.idxrgb[r]=t.i32rgb[i],t.i32idx[i]=r}))},r.prototype.nearestColor=function(t){var i=this.nearestIndex(t);return null===i?0:this.idxi32[i]},r.prototype.nearestIndex=function(t){if((4278190080&t)>>24==0)return null;if(this.useCache&&""+t in this.i32idx)return this.i32idx[t];for(var i,r=1e3,s=[255&t,(65280&t)>>8,(16711680&t)>>16],e=this.idxrgb.length,h=0;h<e;h++)if(this.idxrgb[h]){var n=this.colorDist(s,this.idxrgb[h]);n<r&&(r=n,i=h)}return i},r.prototype.cacheHistogram=function(t){for(var i=0,r=t[i];i<t.length&&this.histogram[r]>=this.cacheFreq;r=t[i++])this.i32idx[r]=this.nearestIndex(r)},s.prototype.check=function(t){this.groupsFull==this.numGroups+1&&(this.check=function(){});var i=255&t,r=(65280&t)>>8,s=(16711680&t)>>16,e=i==r&&r==s?-1:d(c(i,r,s).h,this.numGroups),h=this.stats[e],n=this.minCols;h.num++,h.num>n||(h.num==n&&this.groupsFull++,h.num<=n&&this.stats[e].cols.push(t))},s.prototype.inject=function(t){for(var i=-1;i<this.numGroups;i++)if(this.stats[i].num<=this.minCols)switch(f(t)){case"Array":this.stats[i].cols.forEach((function(i){-1==t.indexOf(i)&&t.push(i)}));break;case"Object":this.stats[i].cols.forEach((function(i){t[i]?t[i]++:t[i]=1}))}};var e=.2126,h=.7152,n=.0722;function o(t,i,r){return Math.sqrt(e*t*t+h*i*i+n*r*r)}var a=Math.sqrt(65025);function u(t,i){var r=i[0]-t[0],s=i[1]-t[1],o=i[2]-t[2];return Math.sqrt(e*r*r+h*s*s+n*o*o)/a}function l(t,i){var r=Math.abs(i[0]-t[0]),s=Math.abs(i[1]-t[1]),o=Math.abs(i[2]-t[2]);return(e*r+h*s+n*o)/254.99999999999997}function c(t,i,r){var s,e,h,n,a;if(t/=255,i/=255,r/=255,(s=Math.max(t,i,r))==(e=Math.min(t,i,r)))h=n=0;else{switch(a=s-e,n=(s+e)/2>.5?a/(2-s-e):a/(s+e),s){case t:h=(i-r)/a+(i<r?6:0);break;case i:h=(r-t)/a+2;break;case r:h=(t-i)/a+4}h/=6}return{h:h,s:n,l:o(t,i,r)}}function d(t,i){var r=1/i,s=r/2;if(t>=1-s||t<=s)return 0;for(var e=1;e<i;e++){var h=e*r;if(t>=h-s&&t<=h+s)return e}}function f(t){return Object.prototype.toString.call(t).slice(8,-1)}var p,x="xyzvwtursopqmnklhijfgdeabc"==(p="abcdefghijklmnopqrstuvwxyz").split("").sort((function(t,i){return~~(p.indexOf(i)/2.3)-~~(p.indexOf(t)/2.3)})).join("")?Array.prototype.sort:function(t){var i=f(this[0]);if("Number"==i||"String"==i){for(var r,s={},e=this.length,h=0;h<e;h++)r=this[h],s[r]||0===s[r]||(s[r]=h);return this.sort((function(i,r){return t(i,r)||s[i]-s[r]}))}s=this.map((function(t){return t}));return this.sort((function(i,r){return t(i,r)||s.indexOf(i)-s.indexOf(r)}))};function g(t,i){var r,s,e,h;switch(f(t)){case"ImageData":h=(r=r||t).height,s="CanvasPixelArray"==f(r.data)?new Uint8Array(r.data):r.data;case"Array":case"CanvasPixelArray":s=s||new Uint8Array(t);case"Uint8Array":case"Uint8ClampedArray":s=s||t,e=new Uint32Array(s.buffer);case"Uint32Array":e=e||t,s=s||new Uint8Array(e.buffer),i=i||e.length,h=e.length/i}return{can:undefined,ctx:undefined,imgd:r,buf8:s,buf32:e,width:i,height:h}}return new Promise((function(s){var e=new r({colors:i,method:2,minHueCols:0,dithKern:null,dithSerp:!1});e.sample(t);e.palette(!0);var h=e.reduce(t);t.data.set(h),s(t)}))};`
    + "return t;")();

/*
var fu = async function(imagedata, limit) {
    
        "use strict";
       
        function RgbQuant(opts) {
       
            opts = opts || {};

            // 1 = by global population, 2 = subregion population threshold
            this.method = opts.method || 2;
            // desired final palette size
            this.colors = opts.colors || 256;
            // # of highest-frequency colors to start with for palette reduction
            this.initColors = opts.initColors || 4096;
            // color-distance threshold for initial reduction pass
            this.initDist = opts.initDist || 0.01;
            // subsequent passes threshold
            this.distIncr = opts.distIncr || 0.005;
            // palette grouping
            this.hueGroups = opts.hueGroups || 10;
            this.satGroups = opts.satGroups || 10;
            this.lumGroups = opts.lumGroups || 10;
            // if > 0, enables hues stats and min-color retention per group
            this.minHueCols = opts.minHueCols || 0;
            // HueStats instance
            this.hueStats = this.minHueCols ? new HueStats(this.hueGroups, this.minHueCols) : null;

            // subregion partitioning box size
            this.boxSize = opts.boxSize || [64, 64];
            // number of same pixels required within box for histogram inclusion
            this.boxPxls = opts.boxPxls || 2;
            // palette locked indicator
            this.palLocked = false;
            // palette sort order
//		this.sortPal = ['hue-','lum-','sat-'];

            // dithering/error diffusion kernel name
            this.dithKern = opts.dithKern || null;
            // dither serpentine pattern
            this.dithSerp = opts.dithSerp || false;
            // minimum color difference (0-1) needed to dither
            this.dithDelta = opts.dithDelta || 0;

            // accumulated histogram
            this.histogram = {};
            // palette - rgb triplets
            this.idxrgb = opts.palette ? opts.palette.slice(0) : [];
            // palette - int32 vals
            this.idxi32 = [];
            // reverse lookup {i32:idx}
            this.i32idx = {};
            // {i32:rgb}
            this.i32rgb = {};
            // enable color caching (also incurs overhead of cache misses and cache building)
            this.useCache = opts.useCache !== false;
            // min color occurance count needed to qualify for caching
            this.cacheFreq = opts.cacheFreq || 10;
            // allows pre-defined palettes to be re-indexed (enabling palette compacting and sorting)
            this.reIndex = opts.reIndex || this.idxrgb.length == 0;
            // selection of color-distance equation
            this.colorDist = opts.colorDist == "manhattan" ? distManhattan : distEuclidean;

            // if pre-defined palette, build lookups
            if (this.idxrgb.length > 0) {
                var self = this;
                this.idxrgb.forEach(function (rgb, i) {
                    var i32 = (
                        (255 << 24) |	// alpha
                        (rgb[2] << 16) |	// blue
                        (rgb[1] << 8) |	// green
                        rgb[0]				// red
                    ) >>> 0;

                    self.idxi32[i] = i32;
                    self.i32idx[i32] = i;
                    self.i32rgb[i32] = rgb;
                });
            }
        }

        // gathers histogram info
        RgbQuant.prototype.sample = function sample(img, width) {
            if (this.palLocked)
                throw "Cannot sample additional images, palette already assembled.";

            var data = getImageData(img, width);

            switch (this.method) {
                case 1:
                    this.colorStats1D(data.buf32);
                    break;
                case 2:
                    this.colorStats2D(data.buf32, data.width);
                    break;
            }
        };

        // image quantizer
        // todo: memoize colors here also
        // @retType: 1 - Uint8Array (default), 2 - Indexed array, 3 - Match @img type (unimplemented, todo)
        RgbQuant.prototype.reduce = function reduce(img, retType, dithKern, dithSerp) {
            if (!this.palLocked)
                this.buildPal();

            dithKern = dithKern || this.dithKern;
            dithSerp = typeof dithSerp != "undefined" ? dithSerp : this.dithSerp;

            retType = retType || 1;

            // reduce w/dither
            if (dithKern)
                var out32 = this.dither(img, dithKern, dithSerp);
            else {
                var data = getImageData(img),
                    buf32 = data.buf32,
                    len = buf32.length,
                    out32 = new Uint32Array(len);

                for (var i = 0; i < len; i++) {
                    var i32 = buf32[i];
                    out32[i] = this.nearestColor(i32);
                }
            }

            if (retType == 1)
                return new Uint8Array(out32.buffer);

            if (retType == 2) {
                var out = [],
                    len = out32.length;

                for (var i = 0; i < len; i++) {
                    var i32 = out32[i];
                    out[i] = this.i32idx[i32];
                }

                return out;
            }
        };

        // adapted from http://jsbin.com/iXofIji/2/edit by PAEz
        RgbQuant.prototype.dither = function (img, kernel, serpentine) {
            // http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/
            var kernels = {
                FloydSteinberg: [
                    [7 / 16, 1, 0],
                    [3 / 16, -1, 1],
                    [5 / 16, 0, 1],
                    [1 / 16, 1, 1]
                ],
                FalseFloydSteinberg: [
                    [3 / 8, 1, 0],
                    [3 / 8, 0, 1],
                    [2 / 8, 1, 1]
                ],
                Stucki: [
                    [8 / 42, 1, 0],
                    [4 / 42, 2, 0],
                    [2 / 42, -2, 1],
                    [4 / 42, -1, 1],
                    [8 / 42, 0, 1],
                    [4 / 42, 1, 1],
                    [2 / 42, 2, 1],
                    [1 / 42, -2, 2],
                    [2 / 42, -1, 2],
                    [4 / 42, 0, 2],
                    [2 / 42, 1, 2],
                    [1 / 42, 2, 2]
                ],
                Atkinson: [
                    [1 / 8, 1, 0],
                    [1 / 8, 2, 0],
                    [1 / 8, -1, 1],
                    [1 / 8, 0, 1],
                    [1 / 8, 1, 1],
                    [1 / 8, 0, 2]
                ],
                Jarvis: [			// Jarvis, Judice, and Ninke / JJN?
                    [7 / 48, 1, 0],
                    [5 / 48, 2, 0],
                    [3 / 48, -2, 1],
                    [5 / 48, -1, 1],
                    [7 / 48, 0, 1],
                    [5 / 48, 1, 1],
                    [3 / 48, 2, 1],
                    [1 / 48, -2, 2],
                    [3 / 48, -1, 2],
                    [5 / 48, 0, 2],
                    [3 / 48, 1, 2],
                    [1 / 48, 2, 2]
                ],
                Burkes: [
                    [8 / 32, 1, 0],
                    [4 / 32, 2, 0],
                    [2 / 32, -2, 1],
                    [4 / 32, -1, 1],
                    [8 / 32, 0, 1],
                    [4 / 32, 1, 1],
                    [2 / 32, 2, 1],
                ],
                Sierra: [
                    [5 / 32, 1, 0],
                    [3 / 32, 2, 0],
                    [2 / 32, -2, 1],
                    [4 / 32, -1, 1],
                    [5 / 32, 0, 1],
                    [4 / 32, 1, 1],
                    [2 / 32, 2, 1],
                    [2 / 32, -1, 2],
                    [3 / 32, 0, 2],
                    [2 / 32, 1, 2],
                ],
                TwoSierra: [
                    [4 / 16, 1, 0],
                    [3 / 16, 2, 0],
                    [1 / 16, -2, 1],
                    [2 / 16, -1, 1],
                    [3 / 16, 0, 1],
                    [2 / 16, 1, 1],
                    [1 / 16, 2, 1],
                ],
                SierraLite: [
                    [2 / 4, 1, 0],
                    [1 / 4, -1, 1],
                    [1 / 4, 0, 1],
                ],
            };

            if (!kernel || !kernels[kernel]) {
                throw 'Unknown dithering kernel: ' + kernel;
            }

            var ds = kernels[kernel];

            var data = getImageData(img),
//			buf8 = data.buf8,
                buf32 = data.buf32,
                width = data.width,
                height = data.height,
                len = buf32.length;

            var dir = serpentine ? -1 : 1;

            for (var y = 0; y < height; y++) {
                if (serpentine)
                    dir = dir * -1;

                var lni = y * width;

                for (var x = (dir == 1 ? 0 : width - 1), xend = (dir == 1 ? width : 0); x !== xend; x += dir) {
                    // Image pixel
                    var idx = lni + x,
                        i32 = buf32[idx],
                        r1 = (i32 & 0xff),
                        g1 = (i32 & 0xff00) >> 8,
                        b1 = (i32 & 0xff0000) >> 16;

                    // Reduced pixel
                    var i32x = this.nearestColor(i32),
                        r2 = (i32x & 0xff),
                        g2 = (i32x & 0xff00) >> 8,
                        b2 = (i32x & 0xff0000) >> 16;

                    buf32[idx] =
                        (255 << 24) |	// alpha
                        (b2 << 16) |	// blue
                        (g2 << 8) |	// green
                        r2;

                    // dithering strength
                    if (this.dithDelta) {
                        var dist = this.colorDist([r1, g1, b1], [r2, g2, b2]);
                        if (dist < this.dithDelta)
                            continue;
                    }

                    // Component distance
                    var er = r1 - r2,
                        eg = g1 - g2,
                        eb = b1 - b2;

                    for (var i = (dir == 1 ? 0 : ds.length - 1), end = (dir == 1 ? ds.length : 0); i !== end; i += dir) {
                        var x1 = ds[i][1] * dir,
                            y1 = ds[i][2];

                        var lni2 = y1 * width;

                        if (x1 + x >= 0 && x1 + x < width && y1 + y >= 0 && y1 + y < height) {
                            var d = ds[i][0];
                            var idx2 = idx + (lni2 + x1);

                            var r3 = (buf32[idx2] & 0xff),
                                g3 = (buf32[idx2] & 0xff00) >> 8,
                                b3 = (buf32[idx2] & 0xff0000) >> 16;

                            var r4 = Math.max(0, Math.min(255, r3 + er * d)),
                                g4 = Math.max(0, Math.min(255, g3 + eg * d)),
                                b4 = Math.max(0, Math.min(255, b3 + eb * d));

                            buf32[idx2] =
                                (255 << 24) |	// alpha
                                (b4 << 16) |	// blue
                                (g4 << 8) |	// green
                                r4;			// red
                        }
                    }
                }
            }

            return buf32;
        };

        // reduces histogram to palette, remaps & memoizes reduced colors
        RgbQuant.prototype.buildPal = function buildPal(noSort) {
            if (this.palLocked || this.idxrgb.length > 0 && this.idxrgb.length <= this.colors) return;

            var histG = this.histogram,
                sorted = sortedHashKeys(histG, true);

            if (sorted.length == 0)
                throw "Nothing has been sampled, palette cannot be built.";

            switch (this.method) {
                case 1:
                    var cols = this.initColors,
                        last = sorted[cols - 1],
                        freq = histG[last];

                    var idxi32 = sorted.slice(0, cols);

                    // add any cut off colors with same freq as last
                    var pos = cols, len = sorted.length;
                    while (pos < len && histG[sorted[pos]] == freq)
                        idxi32.push(sorted[pos++]);

                    // inject min huegroup colors
                    if (this.hueStats)
                        this.hueStats.inject(idxi32);

                    break;
                case 2:
                    var idxi32 = sorted;
                    break;
            }

            // int32-ify values
            idxi32 = idxi32.map(function (v) {
                return +v;
            });

            this.reducePal(idxi32);

            if (!noSort && this.reIndex)
                this.sortPal();

            // build cache of top histogram colors
            if (this.useCache)
                this.cacheHistogram(idxi32);

            this.palLocked = true;
        };

        RgbQuant.prototype.palette = function palette(tuples, noSort) {
            this.buildPal(noSort);
            return tuples ? this.idxrgb : new Uint8Array((new Uint32Array(this.idxi32)).buffer);
        };

        RgbQuant.prototype.prunePal = function prunePal(keep) {
            var i32;

            for (var j = 0; j < this.idxrgb.length; j++) {
                if (!keep[j]) {
                    i32 = this.idxi32[j];
                    this.idxrgb[j] = null;
                    this.idxi32[j] = null;
                    delete this.i32idx[i32];
                }
            }

            // compact
            if (this.reIndex) {
                var idxrgb = [],
                    idxi32 = [],
                    i32idx = {};

                for (var j = 0, i = 0; j < this.idxrgb.length; j++) {
                    if (this.idxrgb[j]) {
                        i32 = this.idxi32[j];
                        idxrgb[i] = this.idxrgb[j];
                        i32idx[i32] = i;
                        idxi32[i] = i32;
                        i++;
                    }
                }

                this.idxrgb = idxrgb;
                this.idxi32 = idxi32;
                this.i32idx = i32idx;
            }
        };

        // reduces similar colors from an importance-sorted Uint32 rgba array
        RgbQuant.prototype.reducePal = function reducePal(idxi32) {
            // if pre-defined palette's length exceeds target
            if (this.idxrgb.length > this.colors) {
                // quantize histogram to existing palette
                var len = idxi32.length, keep = {}, uniques = 0, idx, pruned = false;

                for (var i = 0; i < len; i++) {
                    // palette length reached, unset all remaining colors (sparse palette)
                    if (uniques == this.colors && !pruned) {
                        this.prunePal(keep);
                        pruned = true;
                    }

                    idx = this.nearestIndex(idxi32[i]);

                    if (uniques < this.colors && !keep[idx]) {
                        keep[idx] = true;
                        uniques++;
                    }
                }

                if (!pruned) {
                    this.prunePal(keep);
                    pruned = true;
                }
            }
            // reduce histogram to create initial palette
            else {
                // build full rgb palette
                var idxrgb = idxi32.map(function (i32) {
                    return [
                        (i32 & 0xff),
                        (i32 & 0xff00) >> 8,
                        (i32 & 0xff0000) >> 16,
                    ];
                });

                var len = idxrgb.length,
                    palLen = len,
                    thold = this.initDist;

                // palette already at or below desired length
                if (palLen > this.colors) {
                    while (palLen > this.colors) {
                        var memDist = [];

                        // iterate palette
                        for (var i = 0; i < len; i++) {
                            var pxi = idxrgb[i], i32i = idxi32[i];
                            if (!pxi) continue;

                            for (var j = i + 1; j < len; j++) {
                                var pxj = idxrgb[j], i32j = idxi32[j];
                                if (!pxj) continue;

                                var dist = this.colorDist(pxi, pxj);

                                if (dist < thold) {
                                    // store index,rgb,dist
                                    memDist.push([j, pxj, i32j, dist]);

                                    // kill squashed value
                                    delete (idxrgb[j]);
                                    palLen--;
                                }
                            }
                        }

                        // palette reduction pass

                        // if palette is still much larger than target, increment by larger initDist
                        thold += (palLen > this.colors * 3) ? this.initDist : this.distIncr;
                    }

                    // if palette is over-reduced, re-add removed colors with largest distances from last round
                    if (palLen < this.colors) {
                        // sort descending
                        sort.call(memDist, function (a, b) {
                            return b[3] - a[3];
                        });

                        var k = 0;
                        while (palLen < this.colors) {
                            // re-inject rgb into final palette
                            idxrgb[memDist[k][0]] = memDist[k][1];

                            palLen++;
                            k++;
                        }
                    }
                }

                var len = idxrgb.length;
                for (var i = 0; i < len; i++) {
                    if (!idxrgb[i]) continue;

                    this.idxrgb.push(idxrgb[i]);
                    this.idxi32.push(idxi32[i]);

                    this.i32idx[idxi32[i]] = this.idxi32.length - 1;
                    this.i32rgb[idxi32[i]] = idxrgb[i];
                }
            }
        };

        // global top-population
        RgbQuant.prototype.colorStats1D = function colorStats1D(buf32) {
            var histG = this.histogram,
                num = 0, col,
                len = buf32.length;

            for (var i = 0; i < len; i++) {
                col = buf32[i];

                // skip transparent
                if ((col & 0xff000000) >> 24 == 0) continue;

                // collect hue stats
                if (this.hueStats)
                    this.hueStats.check(col);

                if (col in histG)
                    histG[col]++;
                else
                    histG[col] = 1;
            }
        };

        // population threshold within subregions
        // FIXME: this can over-reduce (few/no colors same?), need a way to keep
        // important colors that dont ever reach local thresholds (gradients?)
        RgbQuant.prototype.colorStats2D = function colorStats2D(buf32, width) {
            var boxW = this.boxSize[0],
                boxH = this.boxSize[1],
                area = boxW * boxH,
                boxes = makeBoxes(width, buf32.length / width, boxW, boxH),
                histG = this.histogram,
                self = this;

            boxes.forEach(function (box) {
                var effc = Math.max(Math.round((box.w * box.h) / area) * self.boxPxls, 2),
                    histL = {}, col;

                iterBox(box, width, function (i) {
                    col = buf32[i];

                    // skip transparent
                    if ((col & 0xff000000) >> 24 == 0) return;

                    // collect hue stats
                    if (self.hueStats)
                        self.hueStats.check(col);

                    if (col in histG)
                        histG[col]++;
                    else if (col in histL) {
                        if (++histL[col] >= effc)
                            histG[col] = histL[col];
                    } else
                        histL[col] = 1;
                });
            });

            if (this.hueStats)
                this.hueStats.inject(histG);
        };

        // TODO: group very low lum and very high lum colors
        // TODO: pass custom sort order
        RgbQuant.prototype.sortPal = function sortPal() {
            var self = this;

            this.idxi32.sort(function (a, b) {
                var idxA = self.i32idx[a],
                    idxB = self.i32idx[b],
                    rgbA = self.idxrgb[idxA],
                    rgbB = self.idxrgb[idxB];

                var hslA = rgb2hsl(rgbA[0], rgbA[1], rgbA[2]),
                    hslB = rgb2hsl(rgbB[0], rgbB[1], rgbB[2]);

                // sort all grays + whites together
                var hueA = (rgbA[0] == rgbA[1] && rgbA[1] == rgbA[2]) ? -1 : hueGroup(hslA.h, self.hueGroups);
                var hueB = (rgbB[0] == rgbB[1] && rgbB[1] == rgbB[2]) ? -1 : hueGroup(hslB.h, self.hueGroups);

                var hueDiff = hueB - hueA;
                if (hueDiff) return -hueDiff;

                var lumDiff = lumGroup(+hslB.l.toFixed(2)) - lumGroup(+hslA.l.toFixed(2));
                if (lumDiff) return -lumDiff;

                var satDiff = satGroup(+hslB.s.toFixed(2)) - satGroup(+hslA.s.toFixed(2));
                if (satDiff) return -satDiff;
            });

            // sync idxrgb & i32idx
            this.idxi32.forEach(function (i32, i) {
                self.idxrgb[i] = self.i32rgb[i32];
                self.i32idx[i32] = i;
            });
        };

        // TOTRY: use HUSL - http://boronine.com/husl/
        RgbQuant.prototype.nearestColor = function nearestColor(i32) {
            var idx = this.nearestIndex(i32);
            return idx === null ? 0 : this.idxi32[idx];
        };

        // TOTRY: use HUSL - http://boronine.com/husl/
        RgbQuant.prototype.nearestIndex = function nearestIndex(i32) {
            // alpha 0 returns null index
            if ((i32 & 0xff000000) >> 24 == 0)
                return null;

            if (this.useCache && ("" + i32) in this.i32idx)
                return this.i32idx[i32];

            var min = 1000,
                idx,
                rgb = [
                    (i32 & 0xff),
                    (i32 & 0xff00) >> 8,
                    (i32 & 0xff0000) >> 16,
                ],
                len = this.idxrgb.length;

            for (var i = 0; i < len; i++) {
                if (!this.idxrgb[i]) continue;		// sparse palettes

                var dist = this.colorDist(rgb, this.idxrgb[i]);

                if (dist < min) {
                    min = dist;
                    idx = i;
                }
            }

            return idx;
        };

        RgbQuant.prototype.cacheHistogram = function cacheHistogram(idxi32) {
            for (var i = 0, i32 = idxi32[i]; i < idxi32.length && this.histogram[i32] >= this.cacheFreq; i32 = idxi32[i++])
                this.i32idx[i32] = this.nearestIndex(i32);
        };

        function HueStats(numGroups, minCols) {
            this.numGroups = numGroups;
            this.minCols = minCols;
            this.stats = {};

            for (var i = -1; i < numGroups; i++)
                this.stats[i] = {num: 0, cols: []};

            this.groupsFull = 0;
        }

        HueStats.prototype.check = function checkHue(i32) {
            if (this.groupsFull == this.numGroups + 1)
                this.check = function () {
                    return;
                };

            var r = (i32 & 0xff),
                g = (i32 & 0xff00) >> 8,
                b = (i32 & 0xff0000) >> 16,
                hg = (r == g && g == b) ? -1 : hueGroup(rgb2hsl(r, g, b).h, this.numGroups),
                gr = this.stats[hg],
                min = this.minCols;

            gr.num++;

            if (gr.num > min)
                return;
            if (gr.num == min)
                this.groupsFull++;

            if (gr.num <= min)
                this.stats[hg].cols.push(i32);
        };

        HueStats.prototype.inject = function injectHues(histG) {
            for (var i = -1; i < this.numGroups; i++) {
                if (this.stats[i].num <= this.minCols) {
                    switch (typeOf(histG)) {
                        case "Array":
                            this.stats[i].cols.forEach(function (col) {
                                if (histG.indexOf(col) == -1)
                                    histG.push(col);
                            });
                            break;
                        case "Object":
                            this.stats[i].cols.forEach(function (col) {
                                if (!histG[col])
                                    histG[col] = 1;
                                else
                                    histG[col]++;
                            });
                            break;
                    }
                }
            }
        };

        // Rec. 709 (sRGB) luma coef
        var Pr = .2126,
            Pg = .7152,
            Pb = .0722;

        // http://alienryderflex.com/hsp.html
        function rgb2lum(r, g, b) {
            return Math.sqrt(
                Pr * r * r +
                Pg * g * g +
                Pb * b * b
            );
        }

        var rd = 255,
            gd = 255,
            bd = 255;

        var euclMax = Math.sqrt(Pr * rd * rd + Pg * gd * gd + Pb * bd * bd);

        // perceptual Euclidean color distance
        function distEuclidean(rgb0, rgb1) {
            var rd = rgb1[0] - rgb0[0],
                gd = rgb1[1] - rgb0[1],
                bd = rgb1[2] - rgb0[2];

            return Math.sqrt(Pr * rd * rd + Pg * gd * gd + Pb * bd * bd) / euclMax;
        }

        var manhMax = Pr * rd + Pg * gd + Pb * bd;

        // perceptual Manhattan color distance
        function distManhattan(rgb0, rgb1) {
            var rd = Math.abs(rgb1[0] - rgb0[0]),
                gd = Math.abs(rgb1[1] - rgb0[1]),
                bd = Math.abs(rgb1[2] - rgb0[2]);

            return (Pr * rd + Pg * gd + Pb * bd) / manhMax;
        }

        // http://rgb2hsl.nichabi.com/javascript-function.php
        function rgb2hsl(r, g, b) {
            var max, min, h, s, l, d;
            r /= 255;
            g /= 255;
            b /= 255;
            max = Math.max(r, g, b);
            min = Math.min(r, g, b);
            l = (max + min) / 2;
            if (max == min) {
                h = s = 0;
            } else {
                d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break
                }
                h /= 6;
            }
//		h = Math.floor(h * 360)
//		s = Math.floor(s * 100)
//		l = Math.floor(l * 100)
            return {
                h: h,
                s: s,
                l: rgb2lum(r, g, b),
            };
        }

        function hueGroup(hue, segs) {
            var seg = 1 / segs,
                haf = seg / 2;

            if (hue >= 1 - haf || hue <= haf)
                return 0;

            for (var i = 1; i < segs; i++) {
                var mid = i * seg;
                if (hue >= mid - haf && hue <= mid + haf)
                    return i;
            }
        }

        function satGroup(sat) {
            return sat;
        }

        function lumGroup(lum) {
            return lum;
        }

        function typeOf(val) {
            return Object.prototype.toString.call(val).slice(8, -1);
        }

        var sort = isArrSortStable() ? Array.prototype.sort : stableSort;

        // must be used via stableSort.call(arr, fn)
        function stableSort(fn) {
            var type = typeOf(this[0]);

            if (type == "Number" || type == "String") {
                var ord = {}, len = this.length, val;

                for (var i = 0; i < len; i++) {
                    val = this[i];
                    if (ord[val] || ord[val] === 0) continue;
                    ord[val] = i;
                }

                return this.sort(function (a, b) {
                    return fn(a, b) || ord[a] - ord[b];
                });
            } else {
                var ord = this.map(function (v) {
                    return v
                });

                return this.sort(function (a, b) {
                    return fn(a, b) || ord.indexOf(a) - ord.indexOf(b);
                });
            }
        }

        // test if js engine's Array#sort implementation is stable
        function isArrSortStable() {
            var str = "abcdefghijklmnopqrstuvwxyz";

            return "xyzvwtursopqmnklhijfgdeabc" == str.split("").sort(function (a, b) {
                return ~~(str.indexOf(b) / 2.3) - ~~(str.indexOf(a) / 2.3);
            }).join("");
        }

        // returns uniform pixel data from various img
        // TODO?: if array is passed, createimagedata, createlement canvas? take a pxlen?
        function getImageData(img, width) {
            var can, ctx, imgd, buf8, buf32, height;

            switch (typeOf(img)) {
           
                case "ImageData":
                    imgd = imgd || img;
                    height = imgd.height;
                    if (typeOf(imgd.data) == "CanvasPixelArray")
                        buf8 = new Uint8Array(imgd.data);
                    else
                        buf8 = imgd.data;
                case "Array":
                case "CanvasPixelArray":
                    buf8 = buf8 || new Uint8Array(img);
                case "Uint8Array":
                case "Uint8ClampedArray":
                    buf8 = buf8 || img;
                    buf32 = new Uint32Array(buf8.buffer);
                case "Uint32Array":
                    buf32 = buf32 || img;
                    buf8 = buf8 || new Uint8Array(buf32.buffer);
                    width = width || buf32.length;
                    height = buf32.length / width;
            }

            return {
                can: can,
                ctx: ctx,
                imgd: imgd,
                buf8: buf8,
                buf32: buf32,
                width: width,
                height: height,
            };
        }

        // partitions a rect of wid x hgt into
        // array of bboxes of w0 x h0 (or less)
        function makeBoxes(wid, hgt, w0, h0) {
            var wnum = ~~(wid / w0), wrem = wid % w0,
                hnum = ~~(hgt / h0), hrem = hgt % h0,
                xend = wid - wrem, yend = hgt - hrem;

            var bxs = [];
            for (var y = 0; y < hgt; y += h0)
                for (var x = 0; x < wid; x += w0)
                    bxs.push({x: x, y: y, w: (x == xend ? wrem : w0), h: (y == yend ? hrem : h0)});

            return bxs;
        }

        // iterates @bbox within a parent rect of width @wid; calls @fn, passing index within parent
        function iterBox(bbox, wid, fn) {
            var b = bbox,
                i0 = b.y * wid + b.x,
                i1 = (b.y + b.h - 1) * wid + (b.x + b.w - 1),
                cnt = 0, incr = wid - b.w + 1, i = i0;

            do {
                fn.call(this, i);
                i += (++cnt % b.w == 0) ? incr : 1;
            } while (i <= i1);
        }

        // returns array of hash keys sorted by their values
        function sortedHashKeys(obj, desc) {
            var keys = [];

            for (var key in obj)
                keys.push(key);

            return sort.call(keys, function (a, b) {
                return desc ? obj[b] - obj[a] : obj[a] - obj[b];
            });
        }

         return new Promise(function(resolve, _) {

            // options
            var q = new RgbQuant({
                colors: limit,
                method: 2,
                minHueCols: 0,
                dithKern: null,
                dithSerp: false,
            });

            // Analyze histograms
            q.sample(imagedata);

            var pal = q.palette(true);
            var out = q.reduce(imagedata);
            imagedata.data.set(out);

            resolve(imagedata);
        });
}
*/

const rgb_quant = (imagedata, limit, callback_function = () => {}, pool = null) => {

    (async () => {

        if(pool !== null) {

            const r = pool.exec(rgb_quant_process_function, [
                imagedata, limit
            ]).catch((e) => {

                return rgb_quant_process_function(imagedata, limit);
            }).timeout(60 * 1000);

            callback_function(await r);

        }else {

            const r = rgb_quant_process_function(imagedata, limit);
            callback_function( await r);
        }
    })();
};

module.exports = { rgb_quant }