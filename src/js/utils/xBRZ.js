/*
The MIT License (MIT)

Copyright (c) 2014 Call-Em-All
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

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

window.xbrz_process_function = new AsyncFunction(`var e=async function(e,t){return new Promise((function(s,r){"use strict";const n=16711680,l=65280;function i(e,t,s,r,n){return e&((n&e)*t+(r&e)*(s-t))/s}function a(e,t,s,r){const a=s.get(),c=i(n,e,t,a,r)|i(l,e,t,a,r)|i(255,e,t,a,r);s.set(4278190080|c)}class c{constructor(){this.scale=2}scale(){return this.scale}blendLineShallow(e,t){a(1,4,t.ref(this.scale-1,0),e),a(3,4,t.ref(this.scale-1,1),e)}blendLineSteep(e,t){a(1,4,t.ref(0,this.scale-1),e),a(3,4,t.ref(1,this.scale-1),e)}blendLineSteepAndShallow(e,t){a(1,4,t.ref(1,0),e),a(1,4,t.ref(0,1),e),a(5,6,t.ref(1,1),e)}blendLineDiagonal(e,t){a(1,2,t.ref(1,1),e)}blendCorner(e,t){a(21,100,t.ref(1,1),e)}}class f extends c{constructor(){super(),this.scale=3}blendLineShallow(e,t){super.blendLineShallow(e,t),a(1,4,t.ref(this.scale-2,2),e),t.ref(this.scale-1,2).set(e)}blendLineSteep(e,t){super.blendLineSteep(e,t),a(1,4,t.ref(2,this.scale-2),e),t.ref(2,this.scale-1).set(e)}blendLineSteepAndShallow(e,t){a(1,4,t.ref(2,0),e),a(1,4,t.ref(0,2),e),a(3,4,t.ref(2,1),e),a(3,4,t.ref(1,2),e),t.ref(2,2).set(e)}blendLineDiagonal(e,t){a(1,8,t.ref(1,2),e),a(1,8,t.ref(2,1),e),a(7,8,t.ref(2,2),e)}blendCorner(e,t){a(45,100,t.ref(2,2),e)}}class h extends f{constructor(){super(),this.scale=4}blendLineShallow(e,t){super.blendLineShallow(e,t),a(3,4,t.ref(this.scale-2,3),e),t.ref(this.scale-1,3).set(e)}blendLineSteep(e,t){super.blendLineSteep(e,t),a(3,4,t.ref(3,this.scale-2),e),t.ref(3,this.scale-1).set(e)}blendLineSteepAndShallow(e,t){a(3,4,t.ref(3,1),e),a(3,4,t.ref(1,3),e),a(1,4,t.ref(3,0),e),a(1,4,t.ref(0,3),e),a(1,3,t.ref(2,2),e),t.ref(3,3).set(e),t.ref(3,2).set(e),t.ref(2,3).set(e)}blendLineDiagonal(e,t){a(1,2,t.ref(this.scale-1,this.scale/2),e),a(1,2,t.ref(this.scale-2,this.scale/2+1),e),t.ref(this.scale-1,this.scale-1).set(e)}blendCorner(e,t){a(68,100,t.ref(3,3),e),a(9,100,t.ref(3,2),e),a(9,100,t.ref(2,3),e)}}class o extends h{constructor(){super(),this.scale=5}blendLineShallow(e,t){super.blendLineShallow(e,t),a(1,4,t.ref(this.scale-3,4),e),t.ref(this.scale-1,4).set(e),t.ref(this.scale-2,4).set(e)}blendLineSteep(e,t){super.blendLineSteep(e,t),a(1,4,t.ref(4,this.scale-3),e),a(3,4,t.ref(3,this.scale-2),e),t.ref(4,this.scale-1).set(e),t.ref(4,this.scale-2).set(e)}blendLineSteepAndShallow(e,t){a(1,4,t.ref(0,this.scale-1),e),a(1,4,t.ref(2,this.scale-2),e),a(3,4,t.ref(1,this.scale-1),e),a(1,4,t.ref(this.scale-1,0),e),a(1,4,t.ref(this.scale-2,2),e),a(3,4,t.ref(this.scale-1,1),e),a(2,3,t.ref(3,3),e),t.ref(2,this.scale-1).set(e),t.ref(3,this.scale-1).set(e),t.ref(4,this.scale-1).set(e),t.ref(this.scale-1,2).set(e),t.ref(this.scale-1,3).set(e)}blendLineDiagonal(e,t){a(1,8,t.ref(this.scale-1,this.scale/2),e),a(1,8,t.ref(this.scale-2,this.scale/2+1),e),a(1,8,t.ref(this.scale-3,this.scale/2+2),e),a(7,8,t.ref(4,3),e),a(7,8,t.ref(3,4),e),t.ref(4,4).set(e)}blendCorner(e,t){a(86,100,t.ref(4,4),e),a(23,100,t.ref(4,3),e),a(23,100,t.ref(3,4),e)}}class u extends o{constructor(){super(),this.scale=6}blendLineShallow(e,t){super.blendLineShallow(e,t),a(3,4,t.ref(this.scale-3,5),e),t.ref(this.scale-1,5).set(e),t.ref(this.scale-2,5).set(e)}blendLineSteep(e,t){super.blendLineSteep(e,t),a(3,4,t.ref(5,this.scale-3),e),t.ref(5,this.scale-1).set(e),t.ref(5,this.scale-2).set(e)}blendLineSteepAndShallow(e,t){a(1,4,t.ref(0,this.scale-1),e),a(1,4,t.ref(2,this.scale-2),e),a(3,4,t.ref(1,this.scale-1),e),a(3,4,t.ref(3,this.scale-2),e),a(1,4,t.ref(this.scale-1,0),e),a(1,4,t.ref(this.scale-2,2),e),a(3,4,t.ref(this.scale-1,1),e),a(3,4,t.ref(this.scale-2,3),e),t.ref(2,this.scale-1).set(e),t.ref(3,this.scale-1).set(e),t.ref(4,this.scale-1).set(e),t.ref(5,this.scale-1).set(e),t.ref(4,this.scale-2).set(e),t.ref(5,this.scale-2).set(e),t.ref(this.scale-1,2).set(e),t.ref(this.scale-1,3).set(e)}blendLineDiagonal(e,t){a(1,2,t.ref(this.scale-1,this.scale/2),e),a(1,2,t.ref(this.scale-2,this.scale/2+1),e),a(1,2,t.ref(this.scale-3,this.scale/2+2),e),t.ref(this.scale-2,this.scale-1).set(e),t.ref(this.scale-1,this.scale-1).set(e),t.ref(this.scale-1,this.scale-2).set(e)}blendCorner(e,t){a(97,100,t.ref(5,5),e),a(42,100,t.ref(4,5),e),a(42,100,t.ref(5,4),e),a(6,100,t.ref(5,3),e),a(6,100,t.ref(3,5),e)}}class d{constructor(e){this.arr=e,this.ptr=0}position(e){this.ptr=e}get(){return this.arr[this.ptr]}set(e){this.arr[this.ptr]=e}}class p{constructor(e,t,s){this.out=new d(t),this.n=144*(e-2),this.outWidth=s,this.outi=0,this.nr=0}move(e,t){this.nr=this.n+36*e,this.outi=t}ref(e,t){e=parseInt(e),t=parseInt(t);const s=v[this.nr+6*e+t];return this.out.position(this.outi+s.J+s.I*this.outWidth),this.out}}const b=function(){let e=[];const t=[[0,1,2,3,4,5,6,7,8],[6,3,0,7,4,1,8,5,2],[8,7,6,5,4,3,2,1,0],[2,5,8,1,4,7,0,3,6]];for(let s=0;s<4;s++)for(let r=0;r<9;r++)e[(r<<2)+s]=t[s][r];return e}(),L=0,g=1,m=2,w=new class{constructor(){this.f=0,this.g=0,this.j=0,this.k=0}reset(){this.f=0,this.g=0,this.j=0,this.k=0}};function S(e){return e*e}function k(e,t,s,r,n){for(let l=0;l<n;++l,t+=s)for(let s=0;s<n;++s)e[t+s]=r}function j(e,t,s){return e===t?0:function(e,t,s){const r=(e&n)-(t&n)>>16,i=(255&e)-(255&t),a=.2126*r+.7152*((e&l)-(t&l)>>8)+.0722*i,c=.5389092476826902*(i-a),f=.63500127000254*(r-a);return S(s*a)+S(c)+S(f)}(e,t,s)}let M=3.6,A=1,R=2.2;function x(e,t){return j(e&=4294967295,t&=4294967295,A)}const B=S(30);function T(e,t){return j(e,t,A)<B}function C(e,t){return j(e,t,A)}function I(e,t,s,r){let n=0,l=0;if(0===e)n=t,l=s;else{const i=I(e-1,t,s,r);n=r-1-i.J,l=i.I}return{I:n,J:l}}let v=function(){let e=[];for(let t=2;t<7;t++)for(let s=0;s<4;s++){let r=144*(t-2)+36*s;for(let n=0;n<6;n++)for(let l=0;l<6;l++)e[r+6*n+l]=I(s,n,l,t)}return e}();function y(e){if(w.reset(),e.f===e.g&&e.j===e.k||e.f===e.j&&e.g===e.k)return;const t=x,s=t(e.i,e.f)+t(e.f,e.c)+t(e.n,e.k)+t(e.k,e.h)+4*t(e.j,e.g),r=t(e.e,e.j)+t(e.j,e.o)+t(e.b,e.g)+t(e.g,e.l)+4*t(e.f,e.k),n=M*s<r;s<r?(e.f!==e.g&&e.f!==e.j&&(w.f=n?m:g),e.k!==e.g&&e.k!==e.j&&(w.k=n?m:g)):r<s&&(e.j!==e.f&&e.j!==e.k&&(w.j=n?m:g),e.g!==e.f&&e.g!==e.k&&(w.g=n?m:g))}const D={getTopL:e=>3&e,getTopR:e=>3&e>>2,getBottomR:e=>3&e>>4,getBottomL:e=>3&e>>6,setTopL:(e,t)=>255&(e|t),setTopR:(e,t)=>255&(e|t<<2),setBottomR:(e,t)=>255&(e|t<<4),setBottomL:(e,t)=>255&(e|t<<6),rotate(e,t){const s=t<<1;return 255&(e<<s|e>>8-s)}};let J;function U(e,t,s,r,n,l,i){const a=s[b[4+t]],c=s[b[8+t]],f=s[b[12+t]],h=s[b[16+t]],o=s[b[20+t]],u=s[b[24+t]],d=s[b[28+t]],p=s[b[32+t]],g=D.rotate(i,t);if(D.getBottomR(g)===L)return;const w=T,S=C;let k;k=D.getBottomR(g)>=m||!(D.getTopR(g)!==L&&!w(h,u))&&(!(D.getBottomL(g)!==L&&!w(h,c))&&!(w(u,d)&&w(d,p)&&w(p,o)&&w(o,c)&&!w(h,p)));const j=S(h,o)<=S(h,d)?o:d,M=J;if(M.move(t,n),!k)return void e.blendCorner(j,M);const A=S(o,u),x=S(d,c),B=R*x<=A&&h!==c&&a!==c;R*A<=x&&h!==u&&f!==u?B?e.blendLineSteepAndShallow(j,M):e.blendLineShallow(j,M):B?e.blendLineSteep(j,M):e.blendLineDiagonal(j,M)}try{var W=Uint8ClampedArray.from(e.data),P=parseInt(e.width),q=parseInt(e.height),z=new Array;for(let e=0,t=W.length;e<t;e+=4){const t=W[e],s=W[e+1],r=W[e+2],n=W[e+3]<<24|t<<16|s<<8|r;z.push(n)}W=null;var E=new Array(P*t*q*t);E.fill(0),function(e,t,s,r,n,l,i){if((l=Math.max(l,0))>=(i=Math.min(i,n))||r<=0)return;const a=r*e;let d=[],b={a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0};if(l>0){const e=l-1,s=r*Math.max(e-1,0),i=r*e,a=r*Math.min(e+1,n-1),c=r*Math.min(e+2,n-1);for(let n=0;n<r;++n){const e=Math.max(n-1,0),l=Math.min(n+1,r-1),f=Math.min(n+2,r-1);b.a=t[s+e],b.b=t[s+n],b.c=t[s+l],b.d=t[s+f],b.e=t[i+e],b.f=t[i+n],b.g=t[i+l],b.h=t[i+f],b.i=t[a+e],b.j=t[a+n],b.k=t[a+l],b.l=t[a+f],b.m=t[c+e],b.n=t[c+n],b.o=t[c+l],b.p=t[c+f],y(b),d[n]=D.setTopR(d[n],w.j),n+1<r&&(d[n+1]=D.setTopL(255&d[n+1],w.k))}}J=new p(e,s,a);let L=0,g=0,m=[];for(let p=l;p<i;++p){let l=e*p*a;const i=r*Math.max(p-1,0),S=r*p,j=r*Math.min(p+1,n-1),M=r*Math.min(p+2,n-1);g=0;for(let n=0;n<r;++n,l+=e){const p=Math.max(n-1,0),A=Math.min(n+1,r-1),R=Math.min(n+2,r-1);if(b.a=t[i+p],b.b=t[i+n],b.c=t[i+A],b.d=t[i+R],b.e=t[S+p],b.f=t[S+n],b.g=t[S+A],b.h=t[S+R],b.i=t[j+p],b.j=t[j+n],b.k=t[j+A],b.l=t[j+R],b.m=t[M+p],b.n=t[M+n],b.o=t[M+A],b.p=t[M+R],y(b),L=D.setBottomR(d[n],w.f),g=D.setTopR(g,w.j),d[n]=g,g=D.setTopL(0,w.k),n+1<r&&(d[n+1]=D.setBottomL(d[n+1],w.g)),k(s,l,a,t[S+n],e),0===L)continue;const x=1,B=2,T=3,C=4,I=5,v=6,J=7,W=8;let P;switch(m[0]=t[i+p],m[x]=t[i+n],m[B]=t[i+A],m[T]=t[S+p],m[C]=t[S+n],m[I]=t[S+A],m[v]=t[j+p],m[J]=t[j+n],m[W]=t[j+A],e){case 2:P=new c;break;case 3:P=new f;break;case 4:P=new h;break;case 5:P=new o;break;default:P=new u}U(P,0,m,0,l,0,L),U(P,1,m,0,l,0,L),U(P,2,m,0,l,0,L),U(P,3,m,0,l,0,L)}}}(t,z,E,P,q,0,q),z=null;var F=new Array;for(let e=0,t=E.length;e<t;++e){const t=E[e],s=t>>24&255,r=t>>16&255,n=t>>8&255,l=255&t;F.push(r),F.push(n),F.push(l),F.push(s)}E=null,s(new ImageData(new Uint8ClampedArray(F),P*t,q*t)),F=null}catch(G){r(null)}}))};`
    + "return e;"
)();
/*
    var fu = async function(image_data, scale) {return new Promise(function(resolve, reject){

    "use strict";
    const redMask = 0xff0000
    const greenMask = 0x00ff00
    const blueMask = 0x0000ff
  
    function blendComponent (mask, n, m, inPixel, setPixel) {
      const inChan = inPixel & mask
      const setChan = setPixel & mask
      const blend = setChan * n + inChan * (m - n)
      return mask & (blend / m)
    }
  
    function alphaBlend (n, m, dstPtr, col) {
      // assert n < 256 : "possible overflow of (col & redMask) * N";
      // assert m < 256 : "possible overflow of (col & redMask) * N + (dst & redMask) * (M - N)";
      // assert 0 < n && n < m : "0 < N && N < M";
  
      const dst = dstPtr.get()
      const redComponent = blendComponent(redMask, n, m, dst, col)
      const greenComponent = blendComponent(greenMask, n, m, dst, col)
      const blueComponent = blendComponent(blueMask, n, m, dst, col)
      const blend = (redComponent | greenComponent | blueComponent)
      dstPtr.set(blend | 0xff000000)
    }
  
  
    class Scaler2x {
      constructor () {
        this.scale = 2
      }
  
      scale () {
        return this.scale
      }
  
      blendLineShallow (col, out) {
        alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
        alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
      }
  
      blendLineSteep (col, out) {
        alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
        alphaBlend(3, 4, out.ref(1, this.scale - 1), col)
      }
  
      blendLineSteepAndShallow (col, out) {
        alphaBlend(1, 4, out.ref(1, 0), col)
        alphaBlend(1, 4, out.ref(0, 1), col)
        alphaBlend(5, 6, out.ref(1, 1), col)
      }
  
      blendLineDiagonal (col, out) {
        alphaBlend(1, 2, out.ref(1, 1), col)
      }
  
      blendCorner (col, out) {
        alphaBlend(21, 100, out.ref(1, 1), col)
      }
    }
  
  
    class Scaler3x extends Scaler2x{
      constructor () {
        super()
        this.scale = 3
      }
  
      blendLineShallow (col, out) {
        super.blendLineShallow(col, out)
        // alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
        alphaBlend(1, 4, out.ref(this.scale - 2, 2), col)
  
        // alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
  
        out.ref(this.scale - 1, 2).set(col)
      }
  
      blendLineSteep (col, out) {
        super.blendLineSteep(col, out)
        // alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
        alphaBlend(1, 4, out.ref(2, this.scale - 2), col)
  
        // alphaBlend(3, 4, out.ref(1, this.scale - 1), col)
  
        out.ref(2, this.scale - 1).set(col)
      }
  
      blendLineSteepAndShallow (col, out) {
        alphaBlend(1, 4, out.ref(2, 0), col)
        alphaBlend(1, 4, out.ref(0, 2), col)
  
        alphaBlend(3, 4, out.ref(2, 1), col)
        alphaBlend(3, 4, out.ref(1, 2), col)
  
        out.ref(2, 2).set(col)
      }
  
      blendLineDiagonal (col, out) {
        alphaBlend(1, 8, out.ref(1, 2), col)
        alphaBlend(1, 8, out.ref(2, 1), col)
        alphaBlend(7, 8, out.ref(2, 2), col)
      }
  
      blendCorner (col, out) {
        alphaBlend(45, 100, out.ref(2, 2), col)
      }
    }
  
  
    class Scaler4x extends Scaler3x {
      constructor () {
        super()
        this.scale = 4
      }
  
      blendLineShallow (col, out) {
        super.blendLineShallow(col, out)
        // alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
        // alphaBlend(1, 4, out.ref(this.scale - 2, 2), col)
  
        // alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
        alphaBlend(3, 4, out.ref(this.scale - 2, 3), col)
  
        // out.ref(this.scale - 1, 2).set(col)
        out.ref(this.scale - 1, 3).set(col)
      }
  
      blendLineSteep (col, out) {
        super.blendLineSteep(col, out)
        // alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
        // alphaBlend(1, 4, out.ref(2, this.scale - 2), col)
  
        // alphaBlend(3, 4, out.ref(1, this.scale - 1), col)
        alphaBlend(3, 4, out.ref(3, this.scale - 2), col)
  
        // out.ref(2, this.scale - 1).set(col)
        out.ref(3, this.scale - 1).set(col)
      }
  
      blendLineSteepAndShallow (col, out) {
        alphaBlend(3, 4, out.ref(3, 1), col)
        alphaBlend(3, 4, out.ref(1, 3), col)
        alphaBlend(1, 4, out.ref(3, 0), col)
        alphaBlend(1, 4, out.ref(0, 3), col)
  
        alphaBlend(1, 3, out.ref(2, 2), col)
  
        out.ref(3, 3).set(col)
        out.ref(3, 2).set(col)
        out.ref(2, 3).set(col)
      }
  
      blendLineDiagonal (col, out) {
        alphaBlend(1, 2, out.ref(this.scale - 1, this.scale / 2), col)
        alphaBlend(1, 2, out.ref(this.scale - 2, this.scale / 2 + 1), col)
        out.ref(this.scale - 1, this.scale - 1).set(col)
      }
  
      blendCorner (col, out) {
        alphaBlend(68, 100, out.ref(3, 3), col)
        alphaBlend(9, 100, out.ref(3, 2), col)
        alphaBlend(9, 100, out.ref(2, 3), col)
      }
    }
  
    class Scaler5x extends Scaler4x{
      constructor () {
        super()
        this.scale = 5
      }
  
      blendLineShallow (col, out) {
        super.blendLineShallow(col, out)
        // **
        // alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
        // alphaBlend(1, 4, out.ref(this.scale - 2, 2), col)
        alphaBlend(1, 4, out.ref(this.scale - 3, 4), col)
        // alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
        // alphaBlend(3, 4, out.ref(this.scale - 2, 3), col)
        // out.ref(this.scale - 1, 2).set(col)
        // out.ref(this.scale - 1, 3).set(col)
        out.ref(this.scale - 1, 4).set(col)
        out.ref(this.scale - 2, 4).set(col)
      }
  
      blendLineSteep (col, out) {
        super.blendLineSteep(col, out)
        // alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
        // alphaBlend(1, 4, out.ref(2, this.scale - 2), col)
        alphaBlend(1, 4, out.ref(4, this.scale - 3), col)
        // alphaBlend(3, 4, out.ref(1, this.scale - 1), col)
        alphaBlend(3, 4, out.ref(3, this.scale - 2), col)
        // out.ref(2, this.scale - 1).set(col)
        // out.ref(3, this.scale - 1).set(col)
        out.ref(4, this.scale - 1).set(col)
        out.ref(4, this.scale - 2).set(col)
      }
  
      blendLineSteepAndShallow (col, out) {
        alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
        alphaBlend(1, 4, out.ref(2, this.scale - 2), col)
        alphaBlend(3, 4, out.ref(1, this.scale - 1), col)
  
        alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
        alphaBlend(1, 4, out.ref(this.scale - 2, 2), col)
        alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
        alphaBlend(2, 3, out.ref(3, 3), col)
  
        out.ref(2, this.scale - 1).set(col)
        out.ref(3, this.scale - 1).set(col)
        out.ref(4, this.scale - 1).set(col)
  
        out.ref(this.scale - 1, 2).set(col)
        out.ref(this.scale - 1, 3).set(col)
      }
  
      blendLineDiagonal (col, out) {
        // **
        alphaBlend(1, 8, out.ref(this.scale - 1, this.scale / 2), col)
        alphaBlend(1, 8, out.ref(this.scale - 2, this.scale / 2 + 1), col)
        alphaBlend(1, 8, out.ref(this.scale - 3, this.scale / 2 + 2), col)
        alphaBlend(7, 8, out.ref(4, 3), col)
        alphaBlend(7, 8, out.ref(3, 4), col)
        out.ref(4, 4).set(col)
      }
  
      blendCorner (col, out) {
        alphaBlend(86, 100, out.ref(4, 4), col)
        alphaBlend(23, 100, out.ref(4, 3), col)
        alphaBlend(23, 100, out.ref(3, 4), col)
      }
    }
  
    class Scaler6x extends Scaler5x {
      constructor () {
        super()
        this.scale = 6
      }
  
      blendLineShallow (col, out) {
        super.blendLineShallow(col, out)
        // alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
        // alphaBlend(1, 4, out.ref(this.scale - 2, 2), col)
        // alphaBlend(1, 4, out.ref(this.scale - 3, 4), col)
  
        // alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
        // alphaBlend(3, 4, out.ref(this.scale - 2, 3), col)
        alphaBlend(3, 4, out.ref(this.scale - 3, 5), col)
  
        // out.ref(this.scale - 1, 2).set(col)
        // out.ref(this.scale - 1, 3).set(col)
        // out.ref(this.scale - 1, 4).set(col)
        out.ref(this.scale - 1, 5).set(col)
  
        // out.ref(this.scale - 2, 4).set(col)
        out.ref(this.scale - 2, 5).set(col)
      }
  
      blendLineSteep (col, out) {
        super.blendLineSteep(col, out)
        // alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
        // alphaBlend(1, 4, out.ref(2, this.scale - 2), col)
        // alphaBlend(1, 4, out.ref(4, this.scale - 3), col)
  
        // alphaBlend(3, 4, out.ref(1, this.scale - 1), col)
        // alphaBlend(3, 4, out.ref(3, this.scale - 2), col)
        alphaBlend(3, 4, out.ref(5, this.scale - 3), col)
  
        // out.ref(2, this.scale - 1).set(col)
        // out.ref(3, this.scale - 1).set(col)
        // out.ref(4, this.scale - 1).set(col)
        out.ref(5, this.scale - 1).set(col)
  
        // out.ref(4, this.scale - 2).set(col)
        out.ref(5, this.scale - 2).set(col)
      }
  
      blendLineSteepAndShallow (col, out) {
        alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
        alphaBlend(1, 4, out.ref(2, this.scale - 2), col)
        alphaBlend(3, 4, out.ref(1, this.scale - 1), col)
        alphaBlend(3, 4, out.ref(3, this.scale - 2), col)
  
        alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
        alphaBlend(1, 4, out.ref(this.scale - 2, 2), col)
        alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
        alphaBlend(3, 4, out.ref(this.scale - 2, 3), col)
  
        out.ref(2, this.scale - 1).set(col)
        out.ref(3, this.scale - 1).set(col)
        out.ref(4, this.scale - 1).set(col)
        out.ref(5, this.scale - 1).set(col)
  
        out.ref(4, this.scale - 2).set(col)
        out.ref(5, this.scale - 2).set(col)
  
        out.ref(this.scale - 1, 2).set(col)
        out.ref(this.scale - 1, 3).set(col)
      }
  
      blendLineDiagonal (col, out) {
        alphaBlend(1, 2, out.ref(this.scale - 1, this.scale / 2), col)
        alphaBlend(1, 2, out.ref(this.scale - 2, this.scale / 2 + 1), col)
        alphaBlend(1, 2, out.ref(this.scale - 3, this.scale / 2 + 2), col)
  
        out.ref(this.scale - 2, this.scale - 1).set(col)
        out.ref(this.scale - 1, this.scale - 1).set(col)
        out.ref(this.scale - 1, this.scale - 2).set(col)
      }
  
      blendCorner (col, out) {
        alphaBlend(97, 100, out.ref(5, 5), col)
        alphaBlend(42, 100, out.ref(4, 5), col)
        alphaBlend(42, 100, out.ref(5, 4), col)
        alphaBlend(6, 100, out.ref(5, 3), col)
        alphaBlend(6, 100, out.ref(3, 5), col)
      }
    }
  
  
    class IntPtr {
      constructor (intArray) {
        this.arr = intArray
        this.ptr = 0
      }
  
      position (pos) {
        this.ptr = pos
      }
  
      get () {
        return this.arr[this.ptr]
      }
  
      set (val) {
        this.arr[this.ptr] = val
      }
    }
  
    class BlendResult {
      constructor () {
        this.f = 0
        this.g = 0
        this.j = 0
        this.k = 0
      }
  
      reset () {
        this.f = 0
        this.g = 0
        this.j = 0
        this.k = 0
      }
    }
  
    const maxRots = 4
    const maxScale = 6
    const maxScaleSq = maxScale * maxScale
  
    class OutputMatrix {
      constructor (scale, out, outWidth) {
        this.out = new IntPtr(out)
        this.n = (scale - 2) * (maxRots * maxScaleSq)
        this.outWidth = outWidth
        this.outi = 0
        this.nr = 0
      }
  
      move (rotDeg, outi) {
        this.nr = this.n + rotDeg * maxScaleSq
        this.outi = outi
      }
  
      ref (i, j) {
        i = parseInt(i)
        j = parseInt(j)
        const rot = matrixRotation[this.nr + i * maxScale + j]
        this.out.position(this.outi + rot.J + rot.I * this.outWidth)
        return this.out
      }
    }
  
    const Rot = (function () {
      // |0|6|8|2|1|3|
      // |7|5|2|0|6|8|
      // |3|8|5|1|4|4|
      // |4|4|5|1|3|7|
      // |6|8|2|0|7|5|
      // |1|3|8|2|0|7|
      let arr = []
      const
          a = 0, b = 1, c = 2,
          d = 3, e = 4, f = 5,
          g = 6, h = 7, i = 8
  
      const deg0 = [
        a, b, c,
        d, e, f,
        g, h, i
      ]
  
      const deg90 = [
        g, d, a,
        h, e, b,
        i, f, c
      ]
  
      const deg180 = [
        i, h, g,
        f, e, d,
        c, b, a
      ]
  
      const deg270 = [
        c, f, i,
        b, e, h,
        a, d, g
      ]
  
      const rotation = [
        deg0, deg90, deg180, deg270
      ]
  
      for (let rotDeg = 0; rotDeg < 4; rotDeg++) {
        for (let x = 0; x < 9; x++) {
          arr[(x << 2) + rotDeg] = rotation[rotDeg][x]
        }
      }
      return arr
    })()
  
    const BlendType = {
      'BLEND_NONE': 0,
      'BLEND_NORMAL': 1,
      'BLEND_DOMINANT': 2
    }
  
    const blendResult = new BlendResult()
  
    function square (value) {
      return value * value
    }
  
  // 用指定颜色填充区块
    function fillBlock (trg, trgi, pitch, col, blockSize) {
      for (let y = 0; y < blockSize; ++y, trgi += pitch) {
        for (let x = 0; x < blockSize; ++x) {
          trg[trgi + x] = col
        }
      }
    }
  
    function distYCbCr (pix1, pix2, lumaWeight) {
      const r_diff = ((pix1 & redMask) - (pix2 & redMask)) >> 16
      const g_diff = ((pix1 & greenMask) - (pix2 & greenMask)) >> 8
      const b_diff = ((pix1 & blueMask) - (pix2 & blueMask))
  
      const k_b = 0.0722, k_r = 0.2126, k_g = 1 - k_b - k_r
      const scale_b = 0.5 / (1 - k_b), scale_r = 0.5 / (1 - k_r)
  
      const y = k_r * r_diff + k_g * g_diff + k_b * b_diff
      const c_b = scale_b * (b_diff - y)
      const c_r = scale_r * (r_diff - y)
      return square(lumaWeight * y) + square(c_b) + square(c_r)
    }
  
    function colorDist (pix1, pix2, luminanceWeight) {
      if (pix1 === pix2) {
        return 0
      }
      return distYCbCr(pix1, pix2, luminanceWeight)
    }
  
    let config = {
      dominantDirectionThreshold: 3.6,
      luminanceWeight: 1.0,
      equalColorTolerance: 30.0,
      steepDirectionThreshold: 2.2
    }
  
    function preProcessCorners_colorDist_ (col1, col2) {
      col1 = col1 & 0xffffffff
      col2 = col2 & 0xffffffff
      return colorDist(col1, col2, config.luminanceWeight)
    }
  
    const eqColorThres = square(config.equalColorTolerance)
  
    function scalePixel_colorEq_ (col1, col2) {
      return colorDist(col1, col2, config.luminanceWeight) < eqColorThres
    }
  
    function scalePixel_colorDist_ (col1, col2) {
      return colorDist(col1, col2, config.luminanceWeight)
    }
  
    function buildMatrixRotation (rotDeg, I, J, N) {
      let I_old = 0, J_old = 0
      if (rotDeg === 0) {
        I_old = I
        J_old = J
      } else {
        const old = buildMatrixRotation(rotDeg - 1, I, J, N)
        I_old = N - 1 - old.J
        J_old = old.I
      }
      return { I: I_old, J: J_old }
    }
  
    let matrixRotation = (function () {
      let matrixRotation = []
      for (let n = 2; n < maxScale + 1; n++) {
        for (let r = 0; r < maxRots; r++) {
          let nr = (n - 2) * (maxRots * maxScaleSq) + r * maxScaleSq
          for (let i = 0; i < maxScale; i++) {
            for (let j = 0; j < maxScale; j++) {
              matrixRotation[nr + i * maxScale + j] = buildMatrixRotation(r, i, j, n)
            }
          }
        }
      }
      return matrixRotation
    })()
  
    function preProcessCorners (ker4x4) {
      blendResult.reset()
      if ((ker4x4.f === ker4x4.g && ker4x4.j === ker4x4.k) ||
          (ker4x4.f === ker4x4.j && ker4x4.g === ker4x4.k)) {
        return
      }
  
      const dist = preProcessCorners_colorDist_
  
      const weight = 4
      const jg =
          dist(ker4x4.i, ker4x4.f) +
          dist(ker4x4.f, ker4x4.c) +
          dist(ker4x4.n, ker4x4.k) +
          dist(ker4x4.k, ker4x4.h) +
          weight * dist(ker4x4.j, ker4x4.g)
      const fk =
          dist(ker4x4.e, ker4x4.j) +
          dist(ker4x4.j, ker4x4.o) +
          dist(ker4x4.b, ker4x4.g) +
          dist(ker4x4.g, ker4x4.l) +
          weight * dist(ker4x4.f, ker4x4.k)
  
      const dominantGradient = config.dominantDirectionThreshold * jg < fk
      if (jg < fk) {
        if (ker4x4.f !== ker4x4.g && ker4x4.f !== ker4x4.j) {
          blendResult.f = dominantGradient ? BlendType.BLEND_DOMINANT : BlendType.BLEND_NORMAL
        }
        if (ker4x4.k !== ker4x4.g && ker4x4.k !== ker4x4.j) {
          blendResult.k = dominantGradient ? BlendType.BLEND_DOMINANT : BlendType.BLEND_NORMAL
        }
      } else if (fk < jg) {
        if (ker4x4.j !== ker4x4.f && ker4x4.j !== ker4x4.k) {
          blendResult.j = dominantGradient ? BlendType.BLEND_DOMINANT : BlendType.BLEND_NORMAL
        }
        if (ker4x4.g !== ker4x4.f && ker4x4.g !== ker4x4.k) {
          blendResult.g = dominantGradient ? BlendType.BLEND_DOMINANT : BlendType.BLEND_NORMAL
        }
      }
    }
  
    const BlendInfo = {
      getTopL (b) {
        return (b & 0x3) & 0xff
      },
      getTopR (b) {
        return ((b >> 2) & 0x3) & 0xff
      },
      getBottomR (b) {
        return ((b >> 4) & 0x3) & 0xff
      },
      getBottomL (b) {
        return ((b >> 6) & 0x3) & 0xff
      },
      setTopL (b, bt) {
        return (b | bt) & 0xff
      },
      setTopR (b, bt) {
        return (b | bt << 2) & 0xff
      },
      setBottomR (b, bt) {
        return (b | bt << 4) & 0xff
      },
      setBottomL (b, bt) {
        return (b | (bt << 6)) & 0xff
      },
      rotate (b, rotDeg) {
        // assert rotDeg >= 0 && rotDeg < 4 : "RotationDegree enum does not have type: " + rotDeg;
        const l = rotDeg << 1
        const r = 8 - l
        return (b << l | b >> r) & 0xff
      }
    }
  
    let outputMatrix
  
    function scalePixel (scaler, rotDeg, ker3x3, trg, trgi, trgWidth, blendInfo) {
      const b = ker3x3[Rot[(1 << 2) + rotDeg]]
      const c = ker3x3[Rot[(2 << 2) + rotDeg]]
      const d = ker3x3[Rot[(3 << 2) + rotDeg]]
      const e = ker3x3[Rot[(4 << 2) + rotDeg]]
      const f = ker3x3[Rot[(5 << 2) + rotDeg]]
      const g = ker3x3[Rot[(6 << 2) + rotDeg]]
      const h = ker3x3[Rot[(7 << 2) + rotDeg]]
      const i = ker3x3[Rot[(8 << 2) + rotDeg]]
  
      const blend = BlendInfo.rotate(blendInfo, rotDeg)
      if (BlendInfo.getBottomR(blend) === BlendType.BLEND_NONE) {
        return
      }
  
      const eq = scalePixel_colorEq_
      const dist = scalePixel_colorDist_
  
      let doLineBlend
  
      if (BlendInfo.getBottomR(blend) >= BlendType.BLEND_DOMINANT) {
        doLineBlend = true
      } else if (BlendInfo.getTopR(blend) !== BlendType.BLEND_NONE && !eq(e, g)) {
        doLineBlend = false
      } else if (BlendInfo.getBottomL(blend) !== BlendType.BLEND_NONE && !eq(e, c)) {
        doLineBlend = false
      } else {
        doLineBlend = !(eq(g, h) && eq(h, i) && eq(i, f) && eq(f, c) && !eq(e, i))
      }
  
      const px = dist(e, f) <= dist(e, h) ? f : h
  
      const out = outputMatrix
      out.move(rotDeg, trgi)
  
      if (!doLineBlend) {
        scaler.blendCorner(px, out)
        return
      }
  
      const fg = dist(f, g)
      const hc = dist(h, c)
  
      const haveShallowLine = config.steepDirectionThreshold * fg <= hc && e !== g && d !== g
      const haveSteepLine = config.steepDirectionThreshold * hc <= fg && e !== c && b !== c
  
      if (haveShallowLine) {
        if (haveSteepLine) {
          scaler.blendLineSteepAndShallow(px, out)
        } else {
          scaler.blendLineShallow(px, out)
        }
      } else {
        if (haveSteepLine) {
          scaler.blendLineSteep(px, out)
        } else {
          scaler.blendLineDiagonal(px, out)
        }
      }
    }
  
    function scaleImage (scaleSize, src, trg, srcWidth, srcHeight, yFirst, yLast) {
      yFirst = Math.max(yFirst, 0)
      yLast = Math.min(yLast, srcHeight)
  
      if (yFirst >= yLast || srcWidth <= 0) {
        return
      }
  
      const trgWidth = srcWidth * scaleSize
  
      let preProcBuffer = []
      let ker4 = {
        a: 0, b: 0, c: 0, d: 0,
        e: 0, f: 0, g: 0, h: 0,
        i: 0, j: 0, k: 0, l: 0,
        m: 0, n: 0, o: 0, p: 0,
      }
  
      if (yFirst > 0) {
        const y = yFirst - 1
        const s_m1 = srcWidth * Math.max(y - 1, 0)
        const s_0 = srcWidth * y
        const s_p1 = srcWidth * Math.min(y + 1, srcHeight - 1)
        const s_p2 = srcWidth * Math.min(y + 2, srcHeight - 1)
  
        for (let x = 0; x < srcWidth; ++x) {
          const x_m1 = Math.max(x - 1, 0)
          const x_p1 = Math.min(x + 1, srcWidth - 1)
          const x_p2 = Math.min(x + 2, srcWidth - 1)
  
          ker4.a = src[s_m1 + x_m1]
          ker4.b = src[s_m1 + x]
          ker4.c = src[s_m1 + x_p1]
          ker4.d = src[s_m1 + x_p2]
  
          ker4.e = src[s_0 + x_m1]
          ker4.f = src[s_0 + x]
          ker4.g = src[s_0 + x_p1]
          ker4.h = src[s_0 + x_p2]
  
          ker4.i = src[s_p1 + x_m1]
          ker4.j = src[s_p1 + x]
          ker4.k = src[s_p1 + x_p1]
          ker4.l = src[s_p1 + x_p2]
  
          ker4.m = src[s_p2 + x_m1]
          ker4.n = src[s_p2 + x]
          ker4.o = src[s_p2 + x_p1]
          ker4.p = src[s_p2 + x_p2]
  
          preProcessCorners(ker4)
  
          preProcBuffer[x] = BlendInfo.setTopR(preProcBuffer[x], blendResult.j)
          if (x + 1 < srcWidth) {
            preProcBuffer[x + 1] = BlendInfo.setTopL(preProcBuffer[x + 1] & 0xff, blendResult.k)
          }
        }
      }
  
      outputMatrix = new OutputMatrix(scaleSize, trg, trgWidth)
  
      let blend_xy = 0
      let blend_xy1 = 0
  
      let ker3 = []
  
      for (let y = yFirst; y < yLast; ++y) {
        let trgi = scaleSize * y * trgWidth
        const s_m1 = srcWidth * Math.max(y - 1, 0)
        const s_0 = srcWidth * y
        const s_p1 = srcWidth * Math.min(y + 1, srcHeight - 1)
        const s_p2 = srcWidth * Math.min(y + 2, srcHeight - 1)
  
        blend_xy1 = 0
  
        for (let x = 0; x < srcWidth; ++x, trgi += scaleSize) {
          const x_m1 = Math.max(x - 1, 0)
          const x_p1 = Math.min(x + 1, srcWidth - 1)
          const x_p2 = Math.min(x + 2, srcWidth - 1)
          {
            ker4.a = src[s_m1 + x_m1]
            ker4.b = src[s_m1 + x]
            ker4.c = src[s_m1 + x_p1]
            ker4.d = src[s_m1 + x_p2]
  
            ker4.e = src[s_0 + x_m1]
            ker4.f = src[s_0 + x]
            ker4.g = src[s_0 + x_p1]
            ker4.h = src[s_0 + x_p2]
  
            ker4.i = src[s_p1 + x_m1]
            ker4.j = src[s_p1 + x]
            ker4.k = src[s_p1 + x_p1]
            ker4.l = src[s_p1 + x_p2]
  
            ker4.m = src[s_p2 + x_m1]
            ker4.n = src[s_p2 + x]
            ker4.o = src[s_p2 + x_p1]
            ker4.p = src[s_p2 + x_p2]
            preProcessCorners(ker4)
  
            blend_xy = BlendInfo.setBottomR(preProcBuffer[x], blendResult.f)
            blend_xy1 = BlendInfo.setTopR(blend_xy1, blendResult.j)
            preProcBuffer[x] = blend_xy1
  
            blend_xy1 = BlendInfo.setTopL(0, blendResult.k)
            if (x + 1 < srcWidth) {
              preProcBuffer[x + 1] = BlendInfo.setBottomL(preProcBuffer[x + 1], blendResult.g)
            }
          }
  
          fillBlock(trg, trgi, trgWidth, src[s_0 + x], scaleSize)
  
          if (blend_xy === 0) {
            continue
          }
  
          const a = 0, b = 1, c = 2, d = 3, e = 4, f = 5, g = 6, h = 7, i = 8
  
          ker3[a] = src[s_m1 + x_m1]
          ker3[b] = src[s_m1 + x]
          ker3[c] = src[s_m1 + x_p1]
  
          ker3[d] = src[s_0 + x_m1]
          ker3[e] = src[s_0 + x]
          ker3[f] = src[s_0 + x_p1]
  
          ker3[g] = src[s_p1 + x_m1]
          ker3[h] = src[s_p1 + x]
          ker3[i] = src[s_p1 + x_p1]
  
          let scaler
          switch (scaleSize) {
            case 2:
              scaler = new Scaler2x()
              break
            case 3:
              scaler = new Scaler3x()
              break
            case 4:
              scaler = new Scaler4x()
              break
            case 5:
              scaler = new Scaler5x()
              break
            case 6:
              scaler = new Scaler6x()
              break
            default:
              scaler = new Scaler6x()
              break
          }
  
          scalePixel(scaler, 0, ker3, trg, trgi, trgWidth, blend_xy)
          scalePixel(scaler, 1, ker3, trg, trgi, trgWidth, blend_xy)
          scalePixel(scaler, 2, ker3, trg, trgi, trgWidth, blend_xy)
          scalePixel(scaler, 3, ker3, trg, trgi, trgWidth, blend_xy)
        }
      }
    }

    try {
        var source_buffer = Uint8ClampedArray.from(image_data.data);
        var width = parseInt(image_data.width);
        var height = parseInt(image_data.height);

        var source = new Array();
        for (let i = 0, len = source_buffer.length; i < len; i += 4) {
            const r = source_buffer[i];
            const g = source_buffer[i + 1];
            const b = source_buffer[i + 2];
            const a = source_buffer[i + 3];
            const pixel = a << 24 | r << 16 | g << 8 | b;
            source.push(pixel)
        }
        source_buffer = null;

        var target = new Array(width * scale * height * scale);
        target.fill(0);
        scaleImage(scale, source, target, width, height, 0, height);
        source = null;

        var target_buffer = new Array();
        for (let i = 0, len = target.length; i < len; ++i) {
          const pixel = target[i];
          const a = (pixel >> 24) & 0xff;
          const r = (pixel >> 16) & 0xff;
          const g = (pixel >> 8) & 0xff;
          const b = (pixel) & 0xff;
          target_buffer.push(r);
          target_buffer.push(g);
          target_buffer.push(b);
          target_buffer.push(a);
        }
        target = null;

        resolve(new ImageData(new Uint8ClampedArray(target_buffer), width * scale, height * scale));
        target_buffer = null;
    } catch(e){reject(null)}
  })}
 */

const xbrz = async (image_data, scale, pool = null) => {

    if(pool) {

      return pool.exec(window.xbrz_process_function, [
        image_data,
        scale,
      ]).catch((e) => {

          return window.xbrz_process_function(image_data, scale);

      }).timeout(60 * 1000);

    }else {

        return window.xbrz_process_function(image_data, scale);
    }
};

module.exports = { xbrz };