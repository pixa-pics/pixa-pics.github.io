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

const xbrz_process_function = new AsyncFunction(`var e=async function(e,t){"use strict";const s=16711680,r=65280;function n(e,t,s,r,n){return e&((n&e)*t+(r&e)*(s-t))/s}function i(e,t,i,l){const a=i.get(),h=n(s,e,t,a,l)|n(r,e,t,a,l)|n(255,e,t,a,l);i.set(4278190080|h)}class l{constructor(){this.scale=2}scale(){return this.scale}blendLineShallow(e,t){i(1,4,t.ref(this.scale-1,0),e),i(3,4,t.ref(this.scale-1,1),e)}blendLineSteep(e,t){i(1,4,t.ref(0,this.scale-1),e),i(3,4,t.ref(1,this.scale-1),e)}blendLineSteepAndShallow(e,t){i(1,4,t.ref(1,0),e),i(1,4,t.ref(0,1),e),i(5,6,t.ref(1,1),e)}blendLineDiagonal(e,t){i(1,2,t.ref(1,1),e)}blendCorner(e,t){i(21,100,t.ref(1,1),e)}}class a extends l{constructor(){super(),this.scale=3}blendLineShallow(e,t){super.blendLineShallow(e,t),i(1,4,t.ref(this.scale-2,2),e),t.ref(this.scale-1,2).set(e)}blendLineSteep(e,t){super.blendLineSteep(e,t),i(1,4,t.ref(2,this.scale-2),e),t.ref(2,this.scale-1).set(e)}blendLineSteepAndShallow(e,t){i(1,4,t.ref(2,0),e),i(1,4,t.ref(0,2),e),i(3,4,t.ref(2,1),e),i(3,4,t.ref(1,2),e),t.ref(2,2).set(e)}blendLineDiagonal(e,t){i(1,8,t.ref(1,2),e),i(1,8,t.ref(2,1),e),i(7,8,t.ref(2,2),e)}blendCorner(e,t){i(45,100,t.ref(2,2),e)}}class h extends a{constructor(){super(),this.scale=4}blendLineShallow(e,t){super.blendLineShallow(e,t),i(3,4,t.ref(this.scale-2,3),e),t.ref(this.scale-1,3).set(e)}blendLineSteep(e,t){super.blendLineSteep(e,t),i(3,4,t.ref(3,this.scale-2),e),t.ref(3,this.scale-1).set(e)}blendLineSteepAndShallow(e,t){i(3,4,t.ref(3,1),e),i(3,4,t.ref(1,3),e),i(1,4,t.ref(3,0),e),i(1,4,t.ref(0,3),e),i(1,3,t.ref(2,2),e),t.ref(3,3).set(e),t.ref(3,2).set(e),t.ref(2,3).set(e)}blendLineDiagonal(e,t){i(1,2,t.ref(this.scale-1,this.scale/2),e),i(1,2,t.ref(this.scale-2,this.scale/2+1),e),t.ref(this.scale-1,this.scale-1).set(e)}blendCorner(e,t){i(68,100,t.ref(3,3),e),i(9,100,t.ref(3,2),e),i(9,100,t.ref(2,3),e)}}class c extends h{constructor(){super(),this.scale=5}blendLineShallow(e,t){super.blendLineShallow(e,t),i(1,4,t.ref(this.scale-3,4),e),t.ref(this.scale-1,4).set(e),t.ref(this.scale-2,4).set(e)}blendLineSteep(e,t){super.blendLineSteep(e,t),i(1,4,t.ref(4,this.scale-3),e),i(3,4,t.ref(3,this.scale-2),e),t.ref(4,this.scale-1).set(e),t.ref(4,this.scale-2).set(e)}blendLineSteepAndShallow(e,t){i(1,4,t.ref(0,this.scale-1),e),i(1,4,t.ref(2,this.scale-2),e),i(3,4,t.ref(1,this.scale-1),e),i(1,4,t.ref(this.scale-1,0),e),i(1,4,t.ref(this.scale-2,2),e),i(3,4,t.ref(this.scale-1,1),e),i(2,3,t.ref(3,3),e),t.ref(2,this.scale-1).set(e),t.ref(3,this.scale-1).set(e),t.ref(4,this.scale-1).set(e),t.ref(this.scale-1,2).set(e),t.ref(this.scale-1,3).set(e)}blendLineDiagonal(e,t){i(1,8,t.ref(this.scale-1,this.scale/2),e),i(1,8,t.ref(this.scale-2,this.scale/2+1),e),i(1,8,t.ref(this.scale-3,this.scale/2+2),e),i(7,8,t.ref(4,3),e),i(7,8,t.ref(3,4),e),t.ref(4,4).set(e)}blendCorner(e,t){i(86,100,t.ref(4,4),e),i(23,100,t.ref(4,3),e),i(23,100,t.ref(3,4),e)}}class f extends c{constructor(){super(),this.scale=6}blendLineShallow(e,t){super.blendLineShallow(e,t),i(3,4,t.ref(this.scale-3,5),e),t.ref(this.scale-1,5).set(e),t.ref(this.scale-2,5).set(e)}blendLineSteep(e,t){super.blendLineSteep(e,t),i(3,4,t.ref(5,this.scale-3),e),t.ref(5,this.scale-1).set(e),t.ref(5,this.scale-2).set(e)}blendLineSteepAndShallow(e,t){i(1,4,t.ref(0,this.scale-1),e),i(1,4,t.ref(2,this.scale-2),e),i(3,4,t.ref(1,this.scale-1),e),i(3,4,t.ref(3,this.scale-2),e),i(1,4,t.ref(this.scale-1,0),e),i(1,4,t.ref(this.scale-2,2),e),i(3,4,t.ref(this.scale-1,1),e),i(3,4,t.ref(this.scale-2,3),e),t.ref(2,this.scale-1).set(e),t.ref(3,this.scale-1).set(e),t.ref(4,this.scale-1).set(e),t.ref(5,this.scale-1).set(e),t.ref(4,this.scale-2).set(e),t.ref(5,this.scale-2).set(e),t.ref(this.scale-1,2).set(e),t.ref(this.scale-1,3).set(e)}blendLineDiagonal(e,t){i(1,2,t.ref(this.scale-1,this.scale/2),e),i(1,2,t.ref(this.scale-2,this.scale/2+1),e),i(1,2,t.ref(this.scale-3,this.scale/2+2),e),t.ref(this.scale-2,this.scale-1).set(e),t.ref(this.scale-1,this.scale-1).set(e),t.ref(this.scale-1,this.scale-2).set(e)}blendCorner(e,t){i(97,100,t.ref(5,5),e),i(42,100,t.ref(4,5),e),i(42,100,t.ref(5,4),e),i(6,100,t.ref(5,3),e),i(6,100,t.ref(3,5),e)}}class o{constructor(e){this.arr=e,this.ptr=0}position(e){this.ptr=e}get(){return this.arr[this.ptr]}set(e){this.arr[this.ptr]=e}}class u{constructor(e,t,s){this.out=new o(t),this.n=144*(e-2),this.outWidth=s,this.outi=0,this.nr=0}move(e,t){this.nr=this.n+36*e,this.outi=t}ref(e,t){e=parseInt(e),t=parseInt(t);const s=C[this.nr+6*e+t];return this.out.position(this.outi+s.J+s.I*this.outWidth),this.out}}const d=function(){let e=[];const t=[[0,1,2,3,4,5,6,7,8],[6,3,0,7,4,1,8,5,2],[8,7,6,5,4,3,2,1,0],[2,5,8,1,4,7,0,3,6]];for(let s=0;s<4;s++)for(let r=0;r<9;r++)e[(r<<2)+s]=t[s][r];return e}(),p=0,b=1,L=2,g=new class{constructor(){this.f=0,this.g=0,this.j=0,this.k=0}reset(){this.f=0,this.g=0,this.j=0,this.k=0}};function S(e){return e*e}function m(e,t,s,r,n){for(let i=0;i<n;++i,t+=s)for(let s=0;s<n;++s)e[t+s]=r}function w(e,t,n){return e===t?0:function(e,t,n){const i=(e&s)-(t&s)>>16,l=(255&e)-(255&t),a=.2126*i+.7152*((e&r)-(t&r)>>8)+.0722*l,h=.5389092476826902*(l-a),c=.63500127000254*(i-a);return S(n*a)+S(h)+S(c)}(e,t,n)}let k=3.6,j=1,M=2.2;function R(e,t){return w(e&=4294967295,t&=4294967295,j)}const x=S(30);function A(e,t){return w(e,t,j)<x}function B(e,t){return w(e,t,j)}function T(e,t,s,r){let n=0,i=0;if(0===e)n=t,i=s;else{const l=T(e-1,t,s,r);n=r-1-l.J,i=l.I}return{I:n,J:i}}let C=function(){let e=[];for(let t=2;t<7;t++)for(let s=0;s<4;s++){let r=144*(t-2)+36*s;for(let n=0;n<6;n++)for(let i=0;i<6;i++)e[r+6*n+i]=T(s,n,i,t)}return e}();function D(e){if(g.reset(),e.f===e.g&&e.j===e.k||e.f===e.j&&e.g===e.k)return;const t=R,s=t(e.i,e.f)+t(e.f,e.c)+t(e.n,e.k)+t(e.k,e.h)+4*t(e.j,e.g),r=t(e.e,e.j)+t(e.j,e.o)+t(e.b,e.g)+t(e.g,e.l)+4*t(e.f,e.k),n=k*s<r;s<r?(e.f!==e.g&&e.f!==e.j&&(g.f=n?L:b),e.k!==e.g&&e.k!==e.j&&(g.k=n?L:b)):r<s&&(e.j!==e.f&&e.j!==e.k&&(g.j=n?L:b),e.g!==e.f&&e.g!==e.k&&(g.g=n?L:b))}const I={getTopL:e=>3&e,getTopR:e=>3&e>>2,getBottomR:e=>3&e>>4,getBottomL:e=>3&e>>6,setTopL:(e,t)=>255&(e|t),setTopR:(e,t)=>255&(e|t<<2),setBottomR:(e,t)=>255&(e|t<<4),setBottomL:(e,t)=>255&(e|t<<6),rotate(e,t){const s=t<<1;return 255&(e<<s|e>>8-s)}};let v;function y(e,t,s,r,n,i,l){const a=s[d[4+t]],h=s[d[8+t]],c=s[d[12+t]],f=s[d[16+t]],o=s[d[20+t]],u=s[d[24+t]],b=s[d[28+t]],g=s[d[32+t]],S=I.rotate(l,t);if(I.getBottomR(S)===p)return;const m=A,w=B;let k;k=I.getBottomR(S)>=L||!(I.getTopR(S)!==p&&!m(f,u))&&(!(I.getBottomL(S)!==p&&!m(f,h))&&!(m(u,b)&&m(b,g)&&m(g,o)&&m(o,h)&&!m(f,g)));const j=w(f,o)<=w(f,b)?o:b,R=v;if(R.move(t,n),!k)return void e.blendCorner(j,R);const x=w(o,u),T=w(b,h),C=M*T<=x&&f!==h&&a!==h;M*x<=T&&f!==u&&c!==u?C?e.blendLineSteepAndShallow(j,R):e.blendLineShallow(j,R):C?e.blendLineSteep(j,R):e.blendLineDiagonal(j,R)}const J=Array.from(e.data);let W=[];for(let e=0,t=J.length;e<t;e+=4){const t=J[e],s=J[e+1],r=J[e+2],n=J[e+3]<<24|t<<16|s<<8|r;W.push(n)}let U=new Array(e.width*t*e.height*t);U.fill(0),function(e,t,s,r,n,i,o){if((i=Math.max(i,0))>=(o=Math.min(o,n))||r<=0)return;const d=r*e;let p=[],b={a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0};if(i>0){const e=i-1,s=r*Math.max(e-1,0),l=r*e,a=r*Math.min(e+1,n-1),h=r*Math.min(e+2,n-1);for(let e=0;e<r;++e){const n=Math.max(e-1,0),i=Math.min(e+1,r-1),c=Math.min(e+2,r-1);b.a=t[s+n],b.b=t[s+e],b.c=t[s+i],b.d=t[s+c],b.e=t[l+n],b.f=t[l+e],b.g=t[l+i],b.h=t[l+c],b.i=t[a+n],b.j=t[a+e],b.k=t[a+i],b.l=t[a+c],b.m=t[h+n],b.n=t[h+e],b.o=t[h+i],b.p=t[h+c],D(b),p[e]=I.setTopR(p[e],g.j),e+1<r&&(p[e+1]=I.setTopL(255&p[e+1],g.k))}}v=new u(e,s,d);let L=0,S=0,w=[];for(let u=i;u<o;++u){let i=e*u*d;const o=r*Math.max(u-1,0),k=r*u,j=r*Math.min(u+1,n-1),M=r*Math.min(u+2,n-1);S=0;for(let n=0;n<r;++n,i+=e){const u=Math.max(n-1,0),R=Math.min(n+1,r-1),x=Math.min(n+2,r-1);if(b.a=t[o+u],b.b=t[o+n],b.c=t[o+R],b.d=t[o+x],b.e=t[k+u],b.f=t[k+n],b.g=t[k+R],b.h=t[k+x],b.i=t[j+u],b.j=t[j+n],b.k=t[j+R],b.l=t[j+x],b.m=t[M+u],b.n=t[M+n],b.o=t[M+R],b.p=t[M+x],D(b),L=I.setBottomR(p[n],g.f),S=I.setTopR(S,g.j),p[n]=S,S=I.setTopL(0,g.k),n+1<r&&(p[n+1]=I.setBottomL(p[n+1],g.g)),m(s,i,d,t[k+n],e),0===L)continue;const A=1,B=2,T=3,C=4,v=5,J=6,W=7,U=8;let q;switch(w[0]=t[o+u],w[A]=t[o+n],w[B]=t[o+R],w[T]=t[k+u],w[C]=t[k+n],w[v]=t[k+R],w[J]=t[j+u],w[W]=t[j+n],w[U]=t[j+R],e){case 2:q=new l;break;case 3:q=new a;break;case 4:q=new h;break;case 5:q=new c;break;default:q=new f}y(q,0,w,0,i,0,L),y(q,1,w,0,i,0,L),y(q,2,w,0,i,0,L),y(q,3,w,0,i,0,L)}}}(t,W,U,e.width,e.height,0,e.height);let q=[];for(let e=0,t=U.length;e<t;++e){const t=U[e],s=t>>24&255,r=t>>16&255,n=t>>8&255,i=255&t;q.push(r),q.push(n),q.push(i),q.push(s)}const z=new Uint8ClampedArray(q);return new ImageData(z,e.width*t,e.height*t)};`
    + "return e;"
)();
/*
    var fu = async function(image_data, scale) {

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
      /*
      |0|6|8|2|1|3|
      |7|5|2|0|6|8|
      |3|8|5|1|4|4|
      |4|4|5|1|3|7|
      |6|8|2|0|7|5|
      |1|3|8|2|0|7|
       $/
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
    
    const source_buffer = Array.from(image_data.data);
    let source = [];
    for (let i = 0, len = source_buffer.length; i < len; i += 4) {
        const r = source_buffer[i];
        const g = source_buffer[i + 1];
        const b = source_buffer[i + 2];
        const a = source_buffer[i + 3];
        const pixel = a << 24 | r << 16 | g << 8 | b;
        source.push(pixel)
    }
  
    let target = new Array(image_data.width * scale * image_data.height * scale);
    target.fill(0);
    scaleImage(scale, source, target, image_data.width, image_data.height, 0, image_data.height);
  
    let target_buffer = [];
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
  
    const data_array_target = new Uint8ClampedArray(target_buffer);
    const final_image_data = new ImageData(data_array_target, image_data.width * scale, image_data.height * scale);
    return final_image_data;
  }
*/

const xbrz = async (image_data, scale, pool = null) => {

    if(pool) {

      return pool.exec(xbrz_process_function, [
        image_data,
        scale,
      ]).catch((e) => {

          if(e === "Pool terminated") {
              return xbrz(image_data, scale, pool);
          }else {

              return xbrz_process_function(image_data, scale);
          }

      }).timeout(60 * 1000);

    }else {

        return xbrz_process_function(image_data, scale);
    }
};

module.exports = { xbrz };