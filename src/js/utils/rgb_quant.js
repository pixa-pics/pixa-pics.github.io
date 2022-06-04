/*
* Copyright (c) 2015, Leon Sorokin
* Copyright (c) 2022, Affolter Matias
* All rights reserved. (MIT Licensed)
*
* RgbQuant.js - an image quantization lib
*/

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const rgb_quant_process_function = new AsyncFunction(`var t=async function(t,i,e,r){"use strict";function a(t){if(t=t||{},this.method=t.method||2,this.colors=t.colors||256,this.initColors=t.initColors||4096,this.initDist=t.initDist||.01,this.distIncr=t.distIncr||.005,this.hueGroups=t.hueGroups||10,this.satGroups=t.satGroups||10,this.lumGroups=t.lumGroups||10,this.minHueCols=t.minHueCols||0,this.hueStats=this.minHueCols?new h(this.hueGroups,this.minHueCols):null,this.boxSize=t.boxSize||[64,64],this.boxPxls=t.boxPxls||2,this.palLocked=!1,this.dithKern=t.dithKern||null,this.dithSerp=t.dithSerp||!1,this.dithDelta=t.dithDelta||0,this.histogram={},this.idxrgb=t.palette?t.palette.slice(0):[],this.idxi32=[],this.i32idx={},this.i32rgb={},this.useCache=!1!==t.useCache,this.cacheFreq=t.cacheFreq||10,this.reIndex=t.reIndex||0==this.idxrgb.length,this.colorDist="manhattan"==t.colorDist?d:c,this.idxrgb.length>0){var i=this;this.idxrgb.forEach((function(t,e){var r=(255<<24|t[2]<<16|t[1]<<8|t[0])>>>0;i.idxi32[e]=r,i.i32idx[r]=e,i.i32rgb[r]=t}))}}function h(t,i){this.numGroups=t,this.minCols=i,this.stats={};for(var e=-1;e<t;e++)this.stats[e]={num:0,cols:[]};this.groupsFull=0}i=i||0,a.prototype.sample=function(t,i){if(this.palLocked)throw"Cannot sample additional images, palette already assembled.";var e=x(t,i);switch(this.method){case 1:this.colorStats1D(e.buf32);break;case 2:this.colorStats2D(e.buf32,e.width)}},a.prototype.reduce=function(t,i,e,r){if(this.palLocked||this.buildPal(),e=e||this.dithKern,r=void 0!==r?r:this.dithSerp,i=i||1,e)var a=this.dither(t,e,r);else for(var h=x(t).buf32,n=h.length,s=(a=new Uint32Array(n),0);s<n;s++){var o=h[s];a[s]=this.nearestColor(o)}if(1==i)return new Uint8Array(a.buffer);if(2==i){var l=[];for(n=a.length,s=0;s<n;s++){o=a[s];l[s]=this.i32idx[o]}return l}},a.prototype.dither=function(t,i,e){var r={FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]],Jarvis:[[7/48,1,0],[5/48,2,0],[3/48,-2,1],[5/48,-1,1],[7/48,0,1],[5/48,1,1],[3/48,2,1],[1/48,-2,2],[3/48,-1,2],[5/48,0,2],[3/48,1,2],[1/48,2,2]],Burkes:[[.25,1,0],[4/32,2,0],[2/32,-2,1],[4/32,-1,1],[.25,0,1],[4/32,1,1],[2/32,2,1]],Sierra:[[5/32,1,0],[3/32,2,0],[2/32,-2,1],[4/32,-1,1],[5/32,0,1],[4/32,1,1],[2/32,2,1],[2/32,-1,2],[3/32,0,2],[2/32,1,2]],TwoSierra:[[.25,1,0],[3/16,2,0],[1/16,-2,1],[2/16,-1,1],[3/16,0,1],[2/16,1,1],[1/16,2,1]],SierraLite:[[.5,1,0],[1/4,-1,1],[1/4,0,1]]};if(!i||!r[i])throw"Unknown dithering kernel: "+i;for(var a=r[i],h=x(t),n=h.buf32,s=h.width,o=h.height,l=(n.length,e?-1:1),u=0;u<o;u++){e&&(l*=-1);for(var c=u*s,d=1==l?0:s-1,f=1==l?s:0;d!==f;d+=l){var g=c+d,p=n[g],m=255&p,v=(65280&p)>>8,b=(16711680&p)>>16,w=this.nearestColor(p),y=255&w,C=(65280&w)>>8,S=(16711680&w)>>16;if(n[g]=255<<24|S<<16|C<<8|y,this.dithDelta)if(this.colorDist([m,v,b],[y,C,S])<this.dithDelta)continue;for(var M=m-y,I=v-C,D=b-S,k=1==l?0:a.length-1,A=1==l?a.length:0;k!==A;k+=l){var O=a[k][1]*l,P=a[k][2],E=P*s;if(O+d>=0&&O+d<s&&P+u>=0&&P+u<o){var F=a[k][0],U=g+(E+O),G=255&n[U],j=(65280&n[U])>>8,q=(16711680&n[U])>>16,z=Math.max(0,Math.min(255,G+M*F)),L=Math.max(0,Math.min(255,j+I*F)),H=Math.max(0,Math.min(255,q+D*F));n[U]=255<<24|H<<16|L<<8|z}}}}return n},a.prototype.buildPal=function(t){if(!(this.palLocked||this.idxrgb.length>0&&this.idxrgb.length<=this.colors)){var i=this.histogram,e=function(t,i){var e=[];for(var r in t)e.push(r);return v.call(e,(function(e,r){return i?t[r]-t[e]:t[e]-t[r]}))}(i,!0);if(0==e.length)throw"Nothing has been sampled, palette cannot be built.";switch(this.method){case 1:for(var r=this.initColors,a=i[e[r-1]],h=e.slice(0,r),n=r,s=e.length;n<s&&i[e[n]]==a;)h.push(e[n++]);this.hueStats&&this.hueStats.inject(h);break;case 2:h=e}h=h.map((function(t){return+t})),this.reducePal(h),!t&&this.reIndex&&this.sortPal(),this.useCache&&this.cacheHistogram(h),this.palLocked=!0}},a.prototype.palette=function(t,i){return this.buildPal(i),t?this.idxrgb:new Uint8Array(new Uint32Array(this.idxi32).buffer)},a.prototype.prunePal=function(t){for(var i,e=0;e<this.idxrgb.length;e++)t[e]||(i=this.idxi32[e],this.idxrgb[e]=null,this.idxi32[e]=null,delete this.i32idx[i]);if(this.reIndex){for(var r=[],a=[],h={},n=(e=0,0);e<this.idxrgb.length;e++)this.idxrgb[e]&&(i=this.idxi32[e],r[n]=this.idxrgb[e],h[i]=n,a[n]=i,n++);this.idxrgb=r,this.idxi32=a,this.i32idx=h}},a.prototype.reducePal=function(t){if(this.idxrgb.length>this.colors){for(var i,e=t.length,r={},a=0,h=!1,n=0;n<e;n++)a!=this.colors||h||(this.prunePal(r),h=!0),i=this.nearestIndex(t[n]),a<this.colors&&!r[i]&&(r[i]=!0,a++);h||(this.prunePal(r),h=!0)}else{var s=t.map((function(t){return[255&t,(65280&t)>>8,(16711680&t)>>16]})),o=e=s.length,l=this.initDist;if(o>this.colors){for(;o>this.colors;){var u=[];for(n=0;n<e;n++){var c=s[n];t[n];if(c)for(var d=n+1;d<e;d++){var f=s[d],g=t[d];if(f){var p=this.colorDist(c,f);p<l&&(u.push([d,f,g,p]),delete s[d],o--)}}}l+=o>3*this.colors?this.initDist:this.distIncr}if(o<this.colors){v.call(u,(function(t,i){return i[3]-t[3]}));for(var m=0;o<this.colors;)s[u[m][0]]=u[m][1],o++,m++}}for(e=s.length,n=0;n<e;n++)s[n]&&(this.idxrgb.push(s[n]),this.idxi32.push(t[n]),this.i32idx[t[n]]=this.idxi32.length-1,this.i32rgb[t[n]]=s[n])}},a.prototype.colorStats1D=function(t){for(var i,e=this.histogram,r=t.length,a=0;a<r;a++)(4278190080&(i=t[a]))>>24!=0&&(this.hueStats&&this.hueStats.check(i),i in e?e[i]++:e[i]=1)},a.prototype.colorStats2D=function(t,i){var e=this.boxSize[0],r=this.boxSize[1],a=e*r,h=function(t,i,e,r){for(var a=t%e,h=i%r,n=t-a,s=i-h,o=[],l=0;l<i;l+=r)for(var u=0;u<t;u+=e)o.push({x:u,y:l,w:u==n?a:e,h:l==s?h:r});return o}(i,t.length/i,e,r),n=this.histogram,s=this;h.forEach((function(e){var r,h=Math.max(Math.round(e.w*e.h/a)*s.boxPxls,2),o={};!function(t,i,e){var r=t,a=r.y*i+r.x,h=(r.y+r.h-1)*i+(r.x+r.w-1),n=0,s=i-r.w+1,o=a;do{e.call(this,o),o+=++n%r.w==0?s:1}while(o<=h)}(e,i,(function(i){(4278190080&(r=t[i]))>>24!=0&&(s.hueStats&&s.hueStats.check(r),r in n?n[r]++:r in o?++o[r]>=h&&(n[r]=o[r]):o[r]=1)}))})),this.hueStats&&this.hueStats.inject(n)},a.prototype.sortPal=function(){var t=this;this.idxi32.sort((function(i,e){var r=t.i32idx[i],a=t.i32idx[e],h=t.idxrgb[r],n=t.idxrgb[a],s=f(h[0],h[1],h[2]),o=f(n[0],n[1],n[2]),l=h[0]==h[1]&&h[1]==h[2]?-1:g(s.h,t.hueGroups),u=(n[0]==n[1]&&n[1]==n[2]?-1:g(o.h,t.hueGroups))-l;if(u)return-u;var c=+o.l.toFixed(2)-+s.l.toFixed(2);if(c)return-c;var d=+o.s.toFixed(2)-+s.s.toFixed(2);return d?-d:void 0})),this.idxi32.forEach((function(i,e){t.idxrgb[e]=t.i32rgb[i],t.i32idx[i]=e}))},a.prototype.nearestColor=function(t){var i=this.nearestIndex(t);return null===i?0:this.idxi32[i]},a.prototype.nearestIndex=function(t){if((4278190080&t)>>24==0)return null;if(this.useCache&&""+t in this.i32idx)return this.i32idx[t];for(var i,e=1e3,r=[255&t,(65280&t)>>8,(16711680&t)>>16],a=this.idxrgb.length,h=0;h<a;h++)if(this.idxrgb[h]){var n=this.colorDist(r,this.idxrgb[h]);n<e&&(e=n,i=h)}return i},a.prototype.cacheHistogram=function(t){for(var i=0,e=t[i];i<t.length&&this.histogram[e]>=this.cacheFreq;e=t[i++])this.i32idx[e]=this.nearestIndex(e)},h.prototype.check=function(t){this.groupsFull==this.numGroups+1&&(this.check=function(){});var i=255&t,e=(65280&t)>>8,r=(16711680&t)>>16,a=i==e&&e==r?-1:g(f(i,e,r).h,this.numGroups),h=this.stats[a],n=this.minCols;h.num++,h.num>n||(h.num==n&&this.groupsFull++,h.num<=n&&this.stats[a].cols.push(t))},h.prototype.inject=function(t){for(var i=-1;i<this.numGroups;i++)if(this.stats[i].num<=this.minCols)switch(p(t)){case"Array":this.stats[i].cols.forEach((function(i){-1==t.indexOf(i)&&t.push(i)}));break;case"Object":this.stats[i].cols.forEach((function(i){t[i]?t[i]++:t[i]=1}))}};var n=.2126,s=.7152,o=.0722;function l(t,i,e){return Math.sqrt(n*t*t+s*i*i+o*e*e)}var u=Math.sqrt(65025);function c(t,i){var e=i[0]-t[0],r=i[1]-t[1],a=i[2]-t[2];return Math.sqrt(n*e*e+s*r*r+o*a*a)/u}function d(t,i){var e=Math.abs(i[0]-t[0]),r=Math.abs(i[1]-t[1]),a=Math.abs(i[2]-t[2]);return(n*e+s*r+o*a)/254.99999999999997}function f(t,i,e){var r,a,h,n,s;if(t/=255,i/=255,e/=255,(r=Math.max(t,i,e))==(a=Math.min(t,i,e)))h=n=0;else{switch(s=r-a,n=(r+a)/2>.5?s/(2-r-a):s/(r+a),r){case t:h=(i-e)/s+(i<e?6:0);break;case i:h=(e-t)/s+2;break;case e:h=(t-i)/s+4}h/=6}return{h:h,s:n,l:l(t,i,e)}}function g(t,i){var e=1/i,r=e/2;if(t>=1-r||t<=r)return 0;for(var a=1;a<i;a++){var h=a*e;if(t>=h-r&&t<=h+r)return a}}function p(t){return Object.prototype.toString.call(t).slice(8,-1)}var m,v="xyzvwtursopqmnklhijfgdeabc"==(m="abcdefghijklmnopqrstuvwxyz").split("").sort((function(t,i){return~~(m.indexOf(i)/2.3)-~~(m.indexOf(t)/2.3)})).join("")?Array.prototype.sort:function(t){var i=p(this[0]);if("Number"==i||"String"==i){for(var e,r={},a=this.length,h=0;h<a;h++)e=this[h],r[e]||0===r[e]||(r[e]=h);return this.sort((function(i,e){return t(i,e)||r[i]-r[e]}))}r=this.map((function(t){return t}));return this.sort((function(i,e){return t(i,e)||r.indexOf(i)-r.indexOf(e)}))};function x(t,i){var e,r,a,h;switch(p(t)){case"ImageData":h=(e=e||t).height,r="CanvasPixelArray"==p(e.data)?new Uint8Array(e.data):e.data;case"Array":case"CanvasPixelArray":r=r||new Uint8Array(t);case"Uint8Array":case"Uint8ClampedArray":r=r||t,a=new Uint32Array(r.buffer);case"Uint32Array":a=a||t,r=r||new Uint8Array(a.buffer),i=i||a.length,h=a.length/i}return{can:undefined,ctx:undefined,imgd:e,buf8:r,buf32:a,width:i,height:h}}try{var b=1;if("undefined"==typeof OffscreenCanvas)throw new Error("Impossible to create OffscreenCanvas in this web environment.");for(var w=await fetch(t),y=await w.blob(),C=await createImageBitmap(y,{premultiplyAlpha:"premultiply",colorSpaceConversion:"default",resizeQuality:"high"});C.width*b*C.height*b>e;)b-=.01;var S=new OffscreenCanvas(Math.floor(C.width*b),Math.floor(C.height*b)),M=S.getContext("2d");return M.imageSmoothingEnabled=!1,M.globalCompositeOperation="source-over",M.drawImage(C,0,0,S.width,S.height),k(D(M.getImageData(0,0,S.width,S.height),i),r)}catch(a){b=1;try{fetch(t).then((t=>t.blob())).then((t=>createImageBitmap(image_data,{premultiplyAlpha:"premultiply",colorSpaceConversion:"default",resizeQuality:"high"}).then((t=>{for(;I.width*b*I.height*b>e;)b-=.01;var a=document.createElement("canvas");a.width=Math.floor(I.width*b),a.height=Math.floor(I.height*b);var h=a.getContext("2d");return h.imageSmoothingEnabled=!1,h.globalCompositeOperation="source-over",h.drawImage(t,0,0,Math.floor(I.width*b),Math.floor(I.height*b)),k(D(h.getImageData(0,0,Math.floor(I.width*b),Math.floor(I.height*b)),i),r)}))))}catch(a){var I=new Image;I.onload=(()=>{for(;I.width*b*I.height*b>e;)b-=.01;var t=document.createElement("canvas");t.width=Math.floor(I.width*b),t.height=Math.floor(I.height*b);var a=t.getContext("2d");return a.imageSmoothingEnabled=!1,a.globalCompositeOperation="source-over",a.drawImage(I,0,0,Math.floor(I.width*b),Math.floor(I.height*b)),k(D(a.getImageData(0,0,Math.floor(I.width*b),Math.floor(I.height*b)),i),r)})(),I.src=t}}function D(t,i=0){if(i>=1&&i<99999999){r=!1;var e=new a({colors:i,method:2,minHueCols:0,dithKern:null,dithSerp:!1});e.sample(t);e.palette(!0);var h=e.reduce(t);t.data.set(h)}return t}function k(t,i){try{if("undefined"==typeof OffscreenCanvas)throw new Error("Impossible to create OffscreenCanvas in this web environment.");var e=new OffscreenCanvas(t.width,t.height);return(r=e.getContext("bitmaprenderer")).imageSmoothingEnabled=!1,createImageBitmap(t,{premultiplyAlpha:"premultiply",colorSpaceConversion:"default",resizeQuality:"high"}).then((t=>{r.transferFromImageBitmap(t);var a=i?{type:"image/jpeg",quality:.75}:{type:"image/png"};return e.convertToBlob(a).then((t=>{return(i=t,new Promise(((t,e)=>{var r=new FileReader;r.onload=()=>t(r.result),r.readAsDataURL(i)}))).then((t=>t));var i}))}))}catch(a){var r;return(e=document.createElement("canvas")).width=t.width,e.height=t.height,(r=e.getContext("2d")).imageSmoothingEnabled=!1,r.globalCompositeOperation="source-over",r.putImageData(t,0,0),i?e.toDataURL("image/jpeg",.75):e.toDataURL("image/png")}}};`
    + "return t;")();

/*
var fu = async function(img, limit, resize_to, lossy) {
    
        "use strict";
        limit = limit || 0;
       
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
        
        
        try {
        
            var img_data; // Create image data
            var scale = 1;
        
            if (typeof OffscreenCanvas === "undefined") {
                throw new Error("Impossible to create OffscreenCanvas in this web environment.");
            }
            
            // Worker based on BLOB  
            var resA0 = await fetch(img); // Response
            var blbA0 = await resA0.blob(); // Blob     
            var bmpA0 = await createImageBitmap(blbA0, {
                premultiplyAlpha: 'premultiply',
                colorSpaceConversion: 'default',
                resizeQuality: 'high'
            });
            
            while (bmpA0.width * scale * bmpA0.height * scale > resize_to) { scale -= 0.01; }
            
            var canvasA0 = new OffscreenCanvas(Math.floor(bmpA0.width * scale), Math.floor(bmpA0.height * scale));
            var ctxA0 = canvasA0.getContext("2d");
            ctxA0.imageSmoothingEnabled = false;
            ctxA0.globalCompositeOperation = "source-over";
            ctxA0.drawImage(bmpA0, 0, 0, canvasA0.width, canvasA0.height);
            img_data = ctxA0.getImageData(0, 0, canvasA0.width, canvasA0.height);
            return do_export_thing(do_quantization_step(img_data, limit), lossy);
      
        } catch (e) {
        
            var img_data; // Create image data
            var scale = 1;
            
            try {
            
                fetch(img).then((res) => res.blob()).then((blob) => {
    
                    return createImageBitmap(image_data, {
                        premultiplyAlpha: 'premultiply',
                        colorSpaceConversion: 'default',
                        resizeQuality: 'high'
                    }).then((btmp_i) => {
                    
                        while (image.width * scale * image.height * scale > resize_to) { scale -= 0.01; }
                    
                        var canvasA0 = document.createElement("canvas");
                        canvasA0.width = Math.floor(image.width * scale);
                        canvasA0.height = Math.floor(image.height * scale);
                        var ctxA0 = canvasA0.getContext("2d");
                        ctxA0.imageSmoothingEnabled = false;
                        ctxA0.globalCompositeOperation = "source-over";
                        ctxA0.drawImage(btmp_i, 0, 0, Math.floor(image.width * scale), Math.floor(image.height * scale));
                        img_data = ctxA0.getImageData(0, 0, Math.floor(image.width * scale), Math.floor(image.height * scale)); // ImageData
                        
                        return do_export_thing(do_quantization_step(img_data, limit), lossy);
                    
                    });
                
                });
            
            }catch (e) {
            
                var image = new Image();
                image.onload = (() => {
                
                    while (image.width * scale * image.height * scale > resize_to) { scale -= 0.01; }
                    
                    var canvasA0 = document.createElement("canvas");
                    canvasA0.width = Math.floor(image.width * scale);
                    canvasA0.height = Math.floor(image.height * scale);
                    var ctxA0 = canvasA0.getContext("2d");
                    ctxA0.imageSmoothingEnabled = false;
                    ctxA0.globalCompositeOperation = "source-over";
                    ctxA0.drawImage(image, 0, 0, Math.floor(image.width * scale), Math.floor(image.height * scale));
                    img_data = ctxA0.getImageData(0, 0, Math.floor(image.width * scale), Math.floor(image.height * scale)); // ImageData
                    
                    return do_export_thing(do_quantization_step(img_data, limit), lossy);
                })();
                image.src = img;
            }
            
        }
        
        function do_quantization_step(img_data, limit = 0) {
       
            if(limit >= 1 && limit < 99999999) {
            
                lossy = false;
       
                // options
                var q = new RgbQuant({
                    colors: limit,
                    method: 2,
                    minHueCols: 0,
                    dithKern: null,
                    dithSerp: false,
                });
        
                // Analyze histograms
                q.sample(img_data);
         
                var pal = q.palette(true);
                var out = q.reduce(img_data);
                img_data.data.set(out);
            } 
            
            return img_data;
        }
        
        function do_export_thing(img_data, lossy) {
        
            // Build base64 response
            try {
            
                if (typeof OffscreenCanvas === "undefined") {
                    throw new Error("Impossible to create OffscreenCanvas in this web environment.");
                }
                
                var canvasB0 = new OffscreenCanvas(img_data.width, img_data.height);
                var ctxB0 = canvasB0.getContext("bitmaprenderer");
                ctxB0.imageSmoothingEnabled = false;
                
                return createImageBitmap(img_data, {
                    premultiplyAlpha: 'premultiply',
                    colorSpaceConversion: 'default',
                    resizeQuality: 'high'
                }).then((bmpB0) => {
                
                    ctxB0.transferFromImageBitmap(bmpB0);
    
                    var params = !lossy ? {type: "image/png"}: {type: "image/jpeg", quality: 0.75};
                    return canvasB0.convertToBlob(params).then((blbB0) => {
                    
                        function blob_to_base64(blob) {
                          return new Promise((resolve, _) => {
                            var reader = new FileReader();
                            reader.onload = () => resolve(reader.result);
                            reader.readAsDataURL(blob);
                          })
                        }
                        
                        return blob_to_base64(blbB0).then((data_url) => {
                        
                             return data_url;
                        });
                    });
                });
               
            }catch (e) {
            
                var canvasB0 = document.createElement("canvas");
                canvasB0.width = img_data.width;
                canvasB0.height = img_data.height;
                var ctxB0 = canvasB0.getContext("2d");
                ctxB0.imageSmoothingEnabled = false;
                ctxB0.globalCompositeOperation = "source-over";
                ctxB0.putImageData(img_data, 0, 0);
                
                if(!lossy) {
                
                    return canvasB0.toDataURL("image/png");
                
                }else {
               
                    return canvasB0.toDataURL("image/jpeg", 0.75);
                }
            }
        }
    }
*/

const rgb_quant = (img, limit = 0, resize_to = 1920*1080, lossy = false, callback_function = () => {}, pool = null) => {

    (async () => {

        if(pool !== null) {

            const r = pool.exec(rgb_quant_process_function, [
                img, limit, resize_to, lossy
            ]).catch((e) => {

                return rgb_quant_process_function(img, limit, resize_to, lossy);
            }).timeout(60 * 1000);

            callback_function(await r);

        }else {

            const r = rgb_quant_process_function(img, limit, resize_to, lossy);
            callback_function( await r);
        }
    })();
};

module.exports = { rgb_quant }