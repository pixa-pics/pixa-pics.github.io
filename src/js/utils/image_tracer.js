/*
	image_tracer.js version 1.2.6
	Simple raster image tracer and vectorizer written in JavaScript.
	andras@jankovics.net
*/

/*

The Unlicense / PUBLIC DOMAIN

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to http://unlicense.org/

*/


import bltf from "../utils/b64_lzstring_to_function";
window.image_tracer_process_function = bltf("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");

//var fu=async function(t,e){return new Promise((function(n,r){"use strict";try{n((new function(){var t=this;this.versionnumber="1.2.6",this.imageToSVG=function(e,n,r){r=t.checkoptions(r),t.loadImage(e,(function(e){n(t.imagedataToSVG(t.getImgdata(e),r))}),r)},this.imagedataToSVG=function(e,n){n=t.checkoptions(n);var r=t.imagedataToTracedata(e,n);return t.getsvgstring(r,n)},this.imageToTracedata=function(e,n,r){r=t.checkoptions(r),t.loadImage(e,(function(e){n(t.imagedataToTracedata(t.getImgdata(e),r))}),r)},this.imagedataToTracedata=function(e,n){n=t.checkoptions(n);var r=t.colorquantization(e,n);if(0===n.layering)for(var s={layers:[],palette:r.palette,width:r.array[0].length-2,height:r.array.length-2},o=0;o<r.palette.length;o++){var a=t.batchtracepaths(t.internodes(t.pathscan(t.layeringstep(r,o),n.pathomit),n),n.ltres,n.qtres);s.layers.push(a)}else{var i=t.layering(r);n.layercontainerid&&t.drawLayers(i,t.specpalette,n.scale,n.layercontainerid);var l=t.batchpathscan(i,n.pathomit),c=t.batchinternodes(l,n);s={layers:t.batchtracelayers(c,n.ltres,n.qtres),palette:r.palette,width:e.width,height:e.height}}return s},this.optionpresets={default:{corsenabled:!1,ltres:1,qtres:1,pathomit:8,rightangleenhance:!0,colorsampling:2,numberofcolors:16,mincolorratio:0,colorquantcycles:3,layering:0,strokewidth:1,linefilter:!1,scale:1,roundcoords:1,viewbox:!1,desc:!1,lcpr:0,qcpr:0,blurradius:0,blurdelta:20},posterized1:{colorsampling:0,numberofcolors:2},posterized2:{numberofcolors:4,blurradius:5},curvy:{ltres:.01,linefilter:!0,rightangleenhance:!1},sharp:{qtres:.01,linefilter:!1},detailed:{pathomit:0,roundcoords:2,ltres:.5,qtres:.5,numberofcolors:64},smoothed:{blurradius:5,blurdelta:64},grayscale:{colorsampling:0,colorquantcycles:1,numberofcolors:7},fixedpalette:{colorsampling:0,colorquantcycles:1,numberofcolors:27},randomsampling1:{colorsampling:1,numberofcolors:8},randomsampling2:{colorsampling:1,numberofcolors:64},artistic1:{colorsampling:0,colorquantcycles:1,pathomit:0,blurradius:5,blurdelta:64,ltres:.01,linefilter:!0,numberofcolors:16,strokewidth:2},artistic2:{qtres:.01,colorsampling:0,colorquantcycles:1,numberofcolors:4,strokewidth:0},artistic3:{qtres:10,ltres:10,numberofcolors:8},artistic4:{qtres:10,ltres:10,numberofcolors:64,blurradius:5,blurdelta:256,strokewidth:2},posterized3:{ltres:1,qtres:1,pathomit:20,rightangleenhance:!0,colorsampling:0,numberofcolors:3,mincolorratio:0,colorquantcycles:3,blurradius:3,blurdelta:20,strokewidth:0,linefilter:!1,roundcoords:1,pal:[{r:0,g:0,b:100,a:255},{r:255,g:255,b:255,a:255}]}},this.checkoptions=function(e){"string"==typeof(e=e||{})&&(e=e.toLowerCase(),e=t.optionpresets[e]?t.optionpresets[e]:{});for(var n=Object.keys(t.optionpresets.default),r=0;r<n.length;r++)e.hasOwnProperty(n[r])||(e[n[r]]=t.optionpresets.default[n[r]]);return e},this.colorquantization=function(e,n){var r,s,o,a,i,l,c,h,g=[],d=0,p=[],u=e.width*e.height;if(e.data.length<4*u){for(var m=new Uint8ClampedArray(4*u),f=0;f<u;f++)m[4*f]=e.data[3*f],m[4*f+1]=e.data[3*f+1],m[4*f+2]=e.data[3*f+2],m[4*f+3]=255;e.data=m}for(i=0;i<e.height+2;i++)for(g[i]=[],a=0;a<e.width+2;a++)g[i][a]=-1;for(h=n.pal?n.pal:0===n.colorsampling?t.generatepalette(n.numberofcolors):1===n.colorsampling?t.samplepalette(n.numberofcolors,e):t.samplepalette2(n.numberofcolors,e),n.blurradius>0&&(e=t.blur(e,n.blurradius,n.blurdelta)),c=0;c<n.colorquantcycles;c++){if(c>0)for(l=0;l<h.length;l++)p[l].n>0&&(h[l]={r:Math.floor(p[l].r/p[l].n),g:Math.floor(p[l].g/p[l].n),b:Math.floor(p[l].b/p[l].n),a:Math.floor(p[l].a/p[l].n)}),p[l].n/u<n.mincolorratio&&c<n.colorquantcycles-1&&(h[l]={r:Math.floor(255*Math.random()),g:Math.floor(255*Math.random()),b:Math.floor(255*Math.random()),a:Math.floor(255*Math.random())});for(a=0;a<h.length;a++)p[a]={r:0,g:0,b:0,a:0,n:0};for(i=0;i<e.height;i++)for(a=0;a<e.width;a++){for(d=4*(i*e.width+a),o=0,s=1024,l=0;l<h.length;l++)(r=(h[l].r>e.data[d]?h[l].r-e.data[d]:e.data[d]-h[l].r)+(h[l].g>e.data[d+1]?h[l].g-e.data[d+1]:e.data[d+1]-h[l].g)+(h[l].b>e.data[d+2]?h[l].b-e.data[d+2]:e.data[d+2]-h[l].b)+(h[l].a>e.data[d+3]?h[l].a-e.data[d+3]:e.data[d+3]-h[l].a))<s&&(s=r,o=l);p[o].r+=e.data[d],p[o].g+=e.data[d+1],p[o].b+=e.data[d+2],p[o].a+=e.data[d+3],p[o].n++,g[i+1][a+1]=o}}return{array:g,palette:h}},this.samplepalette=function(t,e){for(var n,r=[],s=0;s<t;s++)n=4*Math.floor(Math.random()*e.data.length/4),r.push({r:e.data[n],g:e.data[n+1],b:e.data[n+2],a:e.data[n+3]});return r},this.samplepalette2=function(t,e){for(var n,r=[],s=Math.ceil(Math.sqrt(t)),o=Math.ceil(t/s),a=e.width/(s+1),i=e.height/(o+1),l=0;l<o;l++)for(var c=0;c<s&&r.length!==t;c++)n=4*Math.floor((l+1)*i*e.width+(c+1)*a),r.push({r:e.data[n],g:e.data[n+1],b:e.data[n+2],a:e.data[n+3]});return r},this.generatepalette=function(t){var e,n,r,s=[];if(t<8)for(var o=Math.floor(255/(t-1)),a=0;a<t;a++)s.push({r:a*o,g:a*o,b:a*o,a:255});else{var i=Math.floor(Math.pow(t,1/3)),l=Math.floor(255/(i-1)),c=t-i*i*i;for(e=0;e<i;e++)for(n=0;n<i;n++)for(r=0;r<i;r++)s.push({r:e*l,g:n*l,b:r*l,a:255});for(e=0;e<c;e++)s.push({r:Math.floor(255*Math.random()),g:Math.floor(255*Math.random()),b:Math.floor(255*Math.random()),a:Math.floor(255*Math.random())})}return s},this.layering=function(t){var e,n,r,s,o,a,i,l,c,h,g,d=[],p=0,u=t.array.length,m=t.array[0].length;for(g=0;g<t.palette.length;g++)for(d[g]=[],h=0;h<u;h++)for(d[g][h]=[],c=0;c<m;c++)d[g][h][c]=0;for(h=1;h<u-1;h++)for(c=1;c<m-1;c++)p=t.array[h][c],e=t.array[h-1][c-1]===p?1:0,n=t.array[h-1][c]===p?1:0,r=t.array[h-1][c+1]===p?1:0,s=t.array[h][c-1]===p?1:0,o=t.array[h][c+1]===p?1:0,a=t.array[h+1][c-1]===p?1:0,i=t.array[h+1][c]===p?1:0,l=t.array[h+1][c+1]===p?1:0,d[p][h+1][c+1]=1+2*o+4*l+8*i,s||(d[p][h+1][c]=2+4*i+8*a),n||(d[p][h][c+1]=0+2*r+4*o+8),e||(d[p][h][c]=0+2*n+4+8*s);return d},this.layeringstep=function(t,e){var n,r,s=[],o=t.array.length,a=t.array[0].length;for(r=0;r<o;r++)for(s[r]=[],n=0;n<a;n++)s[r][n]=0;for(r=1;r<o;r++)for(n=1;n<a;n++)s[r][n]=(t.array[r-1][n-1]===e?1:0)+(t.array[r-1][n]===e?2:0)+(t.array[r][n-1]===e?8:0)+(t.array[r][n]===e?4:0);return s},this.pointinpoly=function(t,e){for(var n=!1,r=0,s=e.length-1;r<e.length;s=r++)n=e[r].y>t.y!=e[s].y>t.y&&t.x<(e[s].x-e[r].x)*(t.y-e[r].y)/(e[s].y-e[r].y)+e[r].x?!n:n;return n},this.pathscan_combined_lookup=[[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[0,1,0,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[0,2,-1,0]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[0,1,0,-1],[0,0,1,0]],[[0,0,1,0],[-1,-1,-1,-1],[0,2,-1,0],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[0,0,1,0],[0,3,0,1],[-1,-1,-1,-1]],[[13,3,0,1],[13,2,-1,0],[7,1,0,-1],[7,0,1,0]],[[-1,-1,-1,-1],[0,1,0,-1],[-1,-1,-1,-1],[0,3,0,1]],[[0,3,0,1],[0,2,-1,0],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[0,3,0,1],[0,2,-1,0],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[0,1,0,-1],[-1,-1,-1,-1],[0,3,0,1]],[[11,1,0,-1],[14,0,1,0],[14,3,0,1],[11,2,-1,0]],[[-1,-1,-1,-1],[0,0,1,0],[0,3,0,1],[-1,-1,-1,-1]],[[0,0,1,0],[-1,-1,-1,-1],[0,2,-1,0],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[0,1,0,-1],[0,0,1,0]],[[0,1,0,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[0,2,-1,0]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]]],this.pathscan=function(e,n){for(var r,s=[],o=0,a=0,i=0,l=0,c=e[0].length,h=e.length,g=0,d=!0,p=!1,u=0;u<h;u++)for(var m=0;m<c;m++)if(4==e[u][m]||11==e[u][m])for(i=m,l=u,s[o]={},s[o].points=[],s[o].boundingbox=[i,l,i,l],s[o].holechildren=[],d=!1,a=0,p=11==e[u][m],g=1;!d;){if(s[o].points[a]={},s[o].points[a].x=i-1,s[o].points[a].y=l-1,s[o].points[a].t=e[l][i],i-1<s[o].boundingbox[0]&&(s[o].boundingbox[0]=i-1),i-1>s[o].boundingbox[2]&&(s[o].boundingbox[2]=i-1),l-1<s[o].boundingbox[1]&&(s[o].boundingbox[1]=l-1),l-1>s[o].boundingbox[3]&&(s[o].boundingbox[3]=l-1),r=t.pathscan_combined_lookup[e[l][i]][g],e[l][i]=r[0],g=r[1],i+=r[2],l+=r[3],i-1===s[o].points[0].x&&l-1===s[o].points[0].y)if(d=!0,s[o].points.length<n)s.pop();else{if(s[o].isholepath=!!p,p){for(var f=0,y=[-1,-1,c+1,h+1],b=0;b<o;b++)!s[b].isholepath&&t.boundingboxincludes(s[b].boundingbox,s[o].boundingbox)&&t.boundingboxincludes(y,s[b].boundingbox)&&t.pointinpoly(s[o].points[0],s[b].points)&&(f=b,y=s[b].boundingbox);s[f].holechildren.push(o)}o++}a++}return s},this.boundingboxincludes=function(t,e){return t[0]<e[0]&&t[1]<e[1]&&t[2]>e[2]&&t[3]>e[3]},this.batchpathscan=function(e,n){var r=[];for(var s in e)e.hasOwnProperty(s)&&(r[s]=t.pathscan(e[s],n));return r},this.internodes=function(e,n){var r,s,o=[],a=0,i=0,l=0,c=0,h=0;for(r=0;r<e.length;r++)for(o[r]={},o[r].points=[],o[r].boundingbox=e[r].boundingbox,o[r].holechildren=e[r].holechildren,o[r].isholepath=e[r].isholepath,a=e[r].points.length,s=0;s<a;s++)i=(s+1)%a,l=(s+2)%a,c=(s-1+a)%a,h=(s-2+a)%a,n.rightangleenhance&&t.testrightangle(e[r],h,c,s,i,l)&&(o[r].points.length>0&&(o[r].points[o[r].points.length-1].linesegment=t.getdirection(o[r].points[o[r].points.length-1].x,o[r].points[o[r].points.length-1].y,e[r].points[s].x,e[r].points[s].y)),o[r].points.push({x:e[r].points[s].x,y:e[r].points[s].y,linesegment:t.getdirection(e[r].points[s].x,e[r].points[s].y,(e[r].points[s].x+e[r].points[i].x)/2,(e[r].points[s].y+e[r].points[i].y)/2)})),o[r].points.push({x:(e[r].points[s].x+e[r].points[i].x)/2,y:(e[r].points[s].y+e[r].points[i].y)/2,linesegment:t.getdirection((e[r].points[s].x+e[r].points[i].x)/2,(e[r].points[s].y+e[r].points[i].y)/2,(e[r].points[i].x+e[r].points[l].x)/2,(e[r].points[i].y+e[r].points[l].y)/2)});return o},this.testrightangle=function(t,e,n,r,s,o){return t.points[r].x===t.points[e].x&&t.points[r].x===t.points[n].x&&t.points[r].y===t.points[s].y&&t.points[r].y===t.points[o].y||t.points[r].y===t.points[e].y&&t.points[r].y===t.points[n].y&&t.points[r].x===t.points[s].x&&t.points[r].x===t.points[o].x},this.getdirection=function(t,e,n,r){return t<n?e<r?1:e>r?7:0:t>n?e<r?3:e>r?5:4:e<r?2:e>r?6:8},this.batchinternodes=function(e,n){var r=[];for(var s in e)e.hasOwnProperty(s)&&(r[s]=t.internodes(e[s],n));return r},this.tracepath=function(e,n,r){var s,o,a,i=0,l={segments:[]};for(l.boundingbox=e.boundingbox,l.holechildren=e.holechildren,l.isholepath=e.isholepath;i<e.points.length;){for(s=e.points[i].linesegment,o=-1,a=i+1;(e.points[a].linesegment===s||e.points[a].linesegment===o||-1===o)&&a<e.points.length-1;)e.points[a].linesegment!==s&&-1===o&&(o=e.points[a].linesegment),a++;a===e.points.length-1&&(a=0),l.segments=l.segments.concat(t.fitseq(e,n,r,i,a)),i=a>0?a:e.points.length}return l},this.fitseq=function(e,n,r,s,o){if(o>e.points.length||o<0)return[];var a,i,l,c=s,h=0,g=!0,d=o-s;d<0&&(d+=e.points.length);for(var p,u=(e.points[o].x-e.points[s].x)/d,m=(e.points[o].y-e.points[s].y)/d,f=(s+1)%e.points.length;f!=o;)(p=f-s)<0&&(p+=e.points.length),a=e.points[s].x+u*p,i=e.points[s].y+m*p,(l=(e.points[f].x-a)*(e.points[f].x-a)+(e.points[f].y-i)*(e.points[f].y-i))>n&&(g=!1),l>h&&(c=f,h=l),f=(f+1)%e.points.length;if(g)return[{type:"L",x1:e.points[s].x,y1:e.points[s].y,x2:e.points[o].x,y2:e.points[o].y}];var y=c;g=!0,h=0;var b=(y-s)/d,x=(1-b)*(1-b),w=2*(1-b)*b,v=b*b,M=(x*e.points[s].x+v*e.points[o].x-e.points[y].x)/-w,k=(x*e.points[s].y+v*e.points[o].y-e.points[y].y)/-w;for(f=s+1;f!=o;)w=2*(1-(b=(f-s)/d))*b,v=b*b,a=(x=(1-b)*(1-b))*e.points[s].x+w*M+v*e.points[o].x,i=x*e.points[s].y+w*k+v*e.points[o].y,(l=(e.points[f].x-a)*(e.points[f].x-a)+(e.points[f].y-i)*(e.points[f].y-i))>r&&(g=!1),l>h&&(c=f,h=l),f=(f+1)%e.points.length;if(g)return[{type:"Q",x1:e.points[s].x,y1:e.points[s].y,x2:M,y2:k,x3:e.points[o].x,y3:e.points[o].y}];var q=y;return t.fitseq(e,n,r,s,q).concat(t.fitseq(e,n,r,q,o))},this.batchtracepaths=function(e,n,r){var s=[];for(var o in e)e.hasOwnProperty(o)&&s.push(t.tracepath(e[o],n,r));return s},this.batchtracelayers=function(e,n,r){var s=[];for(var o in e)e.hasOwnProperty(o)&&(s[o]=t.batchtracepaths(e[o],n,r));return s},this.roundtodec=function(t,e){return+t.toFixed(e)},this.svgpathstring=function(e,n,r,s){var o,a=e.layers[n],i=a[r],l="";if(s.linefilter&&i.segments.length<3)return l;if(l="<path "+(s.desc?'desc="l '+n+" p "+r+'" ':"")+t.tosvgcolorstr(e.palette[n],s)+'d="',-1===s.roundcoords){for(l+="M "+i.segments[0].x1*s.scale+" "+i.segments[0].y1*s.scale+" ",o=0;o<i.segments.length;o++)l+=i.segments[o].type+" "+i.segments[o].x2*s.scale+" "+i.segments[o].y2*s.scale+" ",i.segments[o].hasOwnProperty("x3")&&(l+=i.segments[o].x3*s.scale+" "+i.segments[o].y3*s.scale+" ");l+="Z "}else{for(l+="M "+t.roundtodec(i.segments[0].x1*s.scale,s.roundcoords)+" "+t.roundtodec(i.segments[0].y1*s.scale,s.roundcoords)+" ",o=0;o<i.segments.length;o++)l+=i.segments[o].type+" "+t.roundtodec(i.segments[o].x2*s.scale,s.roundcoords)+" "+t.roundtodec(i.segments[o].y2*s.scale,s.roundcoords)+" ",i.segments[o].hasOwnProperty("x3")&&(l+=t.roundtodec(i.segments[o].x3*s.scale,s.roundcoords)+" "+t.roundtodec(i.segments[o].y3*s.scale,s.roundcoords)+" ");l+="Z "}for(var c=0;c<i.holechildren.length;c++){var h=a[i.holechildren[c]];if(-1===s.roundcoords)for(h.segments[h.segments.length-1].hasOwnProperty("x3")?l+="M "+h.segments[h.segments.length-1].x3*s.scale+" "+h.segments[h.segments.length-1].y3*s.scale+" ":l+="M "+h.segments[h.segments.length-1].x2*s.scale+" "+h.segments[h.segments.length-1].y2*s.scale+" ",o=h.segments.length-1;o>=0;o--)l+=h.segments[o].type+" ",h.segments[o].hasOwnProperty("x3")&&(l+=h.segments[o].x2*s.scale+" "+h.segments[o].y2*s.scale+" "),l+=h.segments[o].x1*s.scale+" "+h.segments[o].y1*s.scale+" ";else for(h.segments[h.segments.length-1].hasOwnProperty("x3")?l+="M "+t.roundtodec(h.segments[h.segments.length-1].x3*s.scale)+" "+t.roundtodec(h.segments[h.segments.length-1].y3*s.scale)+" ":l+="M "+t.roundtodec(h.segments[h.segments.length-1].x2*s.scale)+" "+t.roundtodec(h.segments[h.segments.length-1].y2*s.scale)+" ",o=h.segments.length-1;o>=0;o--)l+=h.segments[o].type+" ",h.segments[o].hasOwnProperty("x3")&&(l+=t.roundtodec(h.segments[o].x2*s.scale)+" "+t.roundtodec(h.segments[o].y2*s.scale)+" "),l+=t.roundtodec(h.segments[o].x1*s.scale)+" "+t.roundtodec(h.segments[o].y1*s.scale)+" ";l+="Z "}if(l+='" />',s.lcpr||s.qcpr){for(o=0;o<i.segments.length;o++)i.segments[o].hasOwnProperty("x3")&&s.qcpr&&(l+='<circle cx="'+i.segments[o].x2*s.scale+'" cy="'+i.segments[o].y2*s.scale+'" r="'+s.qcpr+'" fill="cyan" stroke-width="'+.2*s.qcpr+'" stroke="black" />',l+='<circle cx="'+i.segments[o].x3*s.scale+'" cy="'+i.segments[o].y3*s.scale+'" r="'+s.qcpr+'" fill="white" stroke-width="'+.2*s.qcpr+'" stroke="black" />',l+='<line x1="'+i.segments[o].x1*s.scale+'" y1="'+i.segments[o].y1*s.scale+'" x2="'+i.segments[o].x2*s.scale+'" y2="'+i.segments[o].y2*s.scale+'" stroke-width="'+.2*s.qcpr+'" stroke="cyan" />',l+='<line x1="'+i.segments[o].x2*s.scale+'" y1="'+i.segments[o].y2*s.scale+'" x2="'+i.segments[o].x3*s.scale+'" y2="'+i.segments[o].y3*s.scale+'" stroke-width="'+.2*s.qcpr+'" stroke="cyan" />'),!i.segments[o].hasOwnProperty("x3")&&s.lcpr&&(l+='<circle cx="'+i.segments[o].x2*s.scale+'" cy="'+i.segments[o].y2*s.scale+'" r="'+s.lcpr+'" fill="white" stroke-width="'+.2*s.lcpr+'" stroke="black" />');for(c=0;c<i.holechildren.length;c++)for(h=a[i.holechildren[c]],o=0;o<h.segments.length;o++)h.segments[o].hasOwnProperty("x3")&&s.qcpr&&(l+='<circle cx="'+h.segments[o].x2*s.scale+'" cy="'+h.segments[o].y2*s.scale+'" r="'+s.qcpr+'" fill="cyan" stroke-width="'+.2*s.qcpr+'" stroke="black" />',l+='<circle cx="'+h.segments[o].x3*s.scale+'" cy="'+h.segments[o].y3*s.scale+'" r="'+s.qcpr+'" fill="white" stroke-width="'+.2*s.qcpr+'" stroke="black" />',l+='<line x1="'+h.segments[o].x1*s.scale+'" y1="'+h.segments[o].y1*s.scale+'" x2="'+h.segments[o].x2*s.scale+'" y2="'+h.segments[o].y2*s.scale+'" stroke-width="'+.2*s.qcpr+'" stroke="cyan" />',l+='<line x1="'+h.segments[o].x2*s.scale+'" y1="'+h.segments[o].y2*s.scale+'" x2="'+h.segments[o].x3*s.scale+'" y2="'+h.segments[o].y3*s.scale+'" stroke-width="'+.2*s.qcpr+'" stroke="cyan" />'),!h.segments[o].hasOwnProperty("x3")&&s.lcpr&&(l+='<circle cx="'+h.segments[o].x2*s.scale+'" cy="'+h.segments[o].y2*s.scale+'" r="'+s.lcpr+'" fill="white" stroke-width="'+.2*s.lcpr+'" stroke="black" />')}return l},this.getsvgstring=function(e,n){n=t.checkoptions(n);for(var r=e.width*n.scale,s=e.height*n.scale,o="<svg "+(n.viewbox?'viewBox="0 0 '+r+" "+s+'" ':'width="'+r+'" height="'+s+'" ')+'version="1.1" xmlns="http://www.w3.org/2000/svg" desc="Created with image_tracer.js version '+t.versionnumber+'" >',a=0;a<e.layers.length;a++)for(var i=0;i<e.layers[a].length;i++)e.layers[a][i].isholepath||(o+=t.svgpathstring(e,a,i,n));return o+"</svg>"},this.compareNumbers=function(t,e){return t-e},this.torgbastr=function(t){return"rgba("+t.r+","+t.g+","+t.b+","+t.a+")"},this.tosvgcolorstr=function(t,e){return'fill="rgb('+t.r+","+t.g+","+t.b+')" stroke="rgb('+t.r+","+t.g+","+t.b+')" stroke-width="'+e.strokewidth+'" opacity="'+t.a/255+'" '},this.appendSVGString=function(t,e){var n;e?(n=document.getElementById(e))||((n=document.createElement("div")).id=e,document.body.appendChild(n)):(n=document.createElement("div"),document.body.appendChild(n)),n.innerHTML+=t},this.gks=[[.27901,.44198,.27901],[.135336,.228569,.272192,.228569,.135336],[.086776,.136394,.178908,.195843,.178908,.136394,.086776],[.063327,.093095,.122589,.144599,.152781,.144599,.122589,.093095,.063327],[.049692,.069304,.089767,.107988,.120651,.125194,.120651,.107988,.089767,.069304,.049692]],this.blur=function(e,n,r){var s,o,a,i,l,c,h,g,d,p={width:e.width,height:e.height,data:[]};if((n=Math.floor(n))<1)return e;n>5&&(n=5),(r=Math.abs(r))>1024&&(r=1024);var u=t.gks[n-1];for(o=0;o<e.height;o++)for(s=0;s<e.width;s++){for(l=0,c=0,h=0,g=0,d=0,a=-n;a<n+1;a++)s+a>0&&s+a<e.width&&(i=4*(o*e.width+s+a),l+=e.data[i]*u[a+n],c+=e.data[i+1]*u[a+n],h+=e.data[i+2]*u[a+n],g+=e.data[i+3]*u[a+n],d+=u[a+n]);i=4*(o*e.width+s),p.data[i]=Math.floor(l/d),p.data[i+1]=Math.floor(c/d),p.data[i+2]=Math.floor(h/d),p.data[i+3]=Math.floor(g/d)}var m=new Uint8ClampedArray(p.data);for(o=0;o<e.height;o++)for(s=0;s<e.width;s++){for(l=0,c=0,h=0,g=0,d=0,a=-n;a<n+1;a++)o+a>0&&o+a<e.height&&(l+=m[i=4*((o+a)*e.width+s)]*u[a+n],c+=m[i+1]*u[a+n],h+=m[i+2]*u[a+n],g+=m[i+3]*u[a+n],d+=u[a+n]);i=4*(o*e.width+s),p.data[i]=Math.floor(l/d),p.data[i+1]=Math.floor(c/d),p.data[i+2]=Math.floor(h/d),p.data[i+3]=Math.floor(g/d)}for(o=0;o<e.height;o++)for(s=0;s<e.width;s++)i=4*(o*e.width+s),Math.abs(p.data[i]-e.data[i])+Math.abs(p.data[i+1]-e.data[i+1])+Math.abs(p.data[i+2]-e.data[i+2])+Math.abs(p.data[i+3]-e.data[i+3])>r&&(p.data[i]=e.data[i],p.data[i+1]=e.data[i+1],p.data[i+2]=e.data[i+2],p.data[i+3]=e.data[i+3]);return p},this.loadImage=function(t,e,n){var r=new Image;n&&n.corsenabled&&(r.crossOrigin="Anonymous"),r.onload=function(){var t=null;try{if("undefined"==typeof OffscreenCanvas)throw new Error("Impossible to create OffscreenCanvas in this web environment.");t=new OffscreenCanvas(r.width,r.height)}catch(n){(t=document.createElement("canvas")).width=r.width,t.height=r.height}t.getContext("2d").drawImage(r,0,0),e(t)},r.src=t},this.getImgdata=function(t){return t.getContext("2d").getImageData(0,0,t.width,t.height)},this.specpalette=[{r:0,g:0,b:0,a:255},{r:128,g:128,b:128,a:255},{r:0,g:0,b:128,a:255},{r:64,g:64,b:128,a:255},{r:192,g:192,b:192,a:255},{r:255,g:255,b:255,a:255},{r:128,g:128,b:192,a:255},{r:0,g:0,b:192,a:255},{r:128,g:0,b:0,a:255},{r:128,g:64,b:64,a:255},{r:128,g:0,b:128,a:255},{r:168,g:168,b:168,a:255},{r:192,g:128,b:128,a:255},{r:192,g:0,b:0,a:255},{r:255,g:255,b:255,a:255},{r:0,g:128,b:0,a:255}]}).imagedataToSVG(t,e))}catch(s){r(null)}}))}; return fu;
/*
var fu = async function(image_data, options){return new Promise(function(resolve, reject){

    "use strict";
	function ImageTracer(){
		var _this = this;

		this.versionnumber = '1.2.6',

		////////////////////////////////////////////////////////////
		//
		//  API
		//
		////////////////////////////////////////////////////////////

		// Loading an image from a URL, tracing when loaded,
		// then executing callback with the scaled svg string as argument
		this.imageToSVG = function( url, callback, options ){
			options = _this.checkoptions(options);
			// loading image, tracing and callback
			_this.loadImage(
				url,
				function(canvas){
					callback(
						_this.imagedataToSVG( _this.getImgdata(canvas), options )
					);
				},
				options
			);
		},// End of imageToSVG()

		// Tracing imagedata, then returning the scaled svg string
		this.imagedataToSVG = function( imgd, options ){
			options = _this.checkoptions(options);
			// tracing imagedata
			var td = _this.imagedataToTracedata( imgd, options );
			// returning SVG string
			return _this.getsvgstring(td, options);
		},// End of imagedataToSVG()

		// Loading an image from a URL, tracing when loaded,
		// then executing callback with tracedata as argument
		this.imageToTracedata = function( url, callback, options ){
			options = _this.checkoptions(options);
			// loading image, tracing and callback
			_this.loadImage(
					url,
					function(canvas){
						callback(
							_this.imagedataToTracedata( _this.getImgdata(canvas), options )
						);
					},
					options
			);
		},// End of imageToTracedata()

		// Tracing imagedata, then returning tracedata (layers with paths, palette, image size)
		this.imagedataToTracedata = function( imgd, options ){
			options = _this.checkoptions(options);

			// 1. Color quantization
			var ii = _this.colorquantization( imgd, options );

			if(options.layering === 0){// Sequential layering

				// create tracedata object
				var tracedata = {
					layers : [],
					palette : ii.palette,
					width : ii.array[0].length-2,
					height : ii.array.length-2
				};

				// Loop to trace each color layer
				for(var colornum=0; colornum<ii.palette.length; colornum++){

					// layeringstep -> pathscan -> internodes -> batchtracepaths
					var tracedlayer =
						_this.batchtracepaths(

							_this.internodes(

								_this.pathscan(
									_this.layeringstep( ii, colornum ),
									options.pathomit
								),

								options

							),

							options.ltres,
							options.qtres

						);

					// adding traced layer
					tracedata.layers.push(tracedlayer);

				}// End of color loop

			}else{// Parallel layering
				// 2. Layer separation and edge detection
				var ls = _this.layering( ii );

				// Optional edge node visualization
				if(options.layercontainerid){ _this.drawLayers( ls, _this.specpalette, options.scale, options.layercontainerid ); }

				// 3. Batch pathscan
				var bps = _this.batchpathscan( ls, options.pathomit );

				// 4. Batch interpollation
				var bis = _this.batchinternodes( bps, options );

				// 5. Batch tracing and creating tracedata object
				var tracedata = {
					layers : _this.batchtracelayers( bis, options.ltres, options.qtres ),
					palette : ii.palette,
					width : imgd.width,
					height : imgd.height
				};

			}// End of parallel layering

			// return tracedata
			return tracedata;

		},// End of imagedataToTracedata()

		this.optionpresets = {
			'default': {

				// Tracing
				corsenabled : false,
				ltres : 1,
				qtres : 1,
				pathomit : 8,
				rightangleenhance : true,

				// Color quantization
				colorsampling : 2,
				numberofcolors : 16,
				mincolorratio : 0,
				colorquantcycles : 3,

				// Layering method
				layering : 0,

				// SVG rendering
				strokewidth : 1,
				linefilter : false,
				scale : 1,
				roundcoords : 1,
				viewbox : false,
				desc : false,
				lcpr : 0,
				qcpr : 0,

				// Blur
				blurradius : 0,
				blurdelta : 20

			},
			'posterized1': { colorsampling:0, numberofcolors:2 },
			'posterized2': { numberofcolors:4, blurradius:5 },
			'curvy': { ltres:0.01, linefilter:true, rightangleenhance:false },
			'sharp': { qtres:0.01, linefilter:false },
			'detailed': { pathomit:0, roundcoords:2, ltres:0.5, qtres:0.5, numberofcolors:64 },
			'smoothed': { blurradius:5, blurdelta: 64 },
			'grayscale': { colorsampling:0, colorquantcycles:1, numberofcolors:7 },
			'fixedpalette': { colorsampling:0, colorquantcycles:1, numberofcolors:27 },
			'randomsampling1': { colorsampling:1, numberofcolors:8 },
			'randomsampling2': { colorsampling:1, numberofcolors:64 },
			'artistic1': { colorsampling:0, colorquantcycles:1, pathomit:0, blurradius:5, blurdelta: 64, ltres:0.01, linefilter:true, numberofcolors:16, strokewidth:2 },
			'artistic2': { qtres:0.01, colorsampling:0, colorquantcycles:1, numberofcolors:4, strokewidth:0 },
			'artistic3': { qtres:10, ltres:10, numberofcolors:8 },
			'artistic4': { qtres:10, ltres:10, numberofcolors:64, blurradius:5, blurdelta: 256, strokewidth:2 },
			'posterized3': { ltres: 1, qtres: 1, pathomit: 20, rightangleenhance: true, colorsampling: 0, numberofcolors: 3,
				mincolorratio: 0, colorquantcycles: 3, blurradius: 3, blurdelta: 20, strokewidth: 0, linefilter: false,
				roundcoords: 1, pal: [ { r: 0, g: 0, b: 100, a: 255 }, { r: 255, g: 255, b: 255, a: 255 } ] }
		},// End of optionpresets

		// creating options object, setting defaults for missing values
		this.checkoptions = function(options){
			options = options || {};
			// Option preset
			if(typeof options === 'string'){
				options = options.toLowerCase();
				if( _this.optionpresets[options] ){ options = _this.optionpresets[options]; }else{ options = {}; }
			}
			// Defaults
			var ok = Object.keys(_this.optionpresets['default']);
			for(var k=0; k<ok.length; k++){
				if(!options.hasOwnProperty(ok[k])){ options[ok[k]] = _this.optionpresets['default'][ok[k]]; }
			}
			// options.pal is not defined here, the custom palette should be added externally: options.pal = [ { 'r':0, 'g':0, 'b':0, 'a':255 }, {...}, ... ];
			// options.layercontainerid is not defined here, can be added externally: options.layercontainerid = 'mydiv'; ... <div id="mydiv"></div>
			return options;
		},// End of checkoptions()

		////////////////////////////////////////////////////////////
		//
		//  Vectorizing functions
		//
		////////////////////////////////////////////////////////////

		// 1. Color quantization
		// Using a form of k-means clustering repeatead options.colorquantcycles times. http://en.wikipedia.org/wiki/Color_quantization
		this.colorquantization = function( imgd, options ){
			var arr = [], idx=0, cd,cdl,ci, paletteacc = [], pixelnum = imgd.width * imgd.height, i, j, k, cnt, palette;

			// imgd.data must be RGBA, not just RGB
			if( imgd.data.length < pixelnum * 4 ){
				var newimgddata = new Uint8ClampedArray(pixelnum * 4);
				for(var pxcnt = 0; pxcnt < pixelnum ; pxcnt++){
					newimgddata[pxcnt*4  ] = imgd.data[pxcnt*3  ];
					newimgddata[pxcnt*4+1] = imgd.data[pxcnt*3+1];
					newimgddata[pxcnt*4+2] = imgd.data[pxcnt*3+2];
					newimgddata[pxcnt*4+3] = 255;
				}
				imgd.data = newimgddata;
			}// End of RGBA imgd.data check

			// Filling arr (color index array) with -1
			for( j=0; j<imgd.height+2; j++ ){ arr[j]=[]; for(i=0; i<imgd.width+2 ; i++){ arr[j][i] = -1; } }

			// Use custom palette if pal is defined or sample / generate custom length palette
			if(options.pal){
				palette = options.pal;
			}else if(options.colorsampling === 0){
				palette = _this.generatepalette(options.numberofcolors);
			}else if(options.colorsampling === 1){
				palette = _this.samplepalette( options.numberofcolors, imgd );
			}else{
				palette = _this.samplepalette2( options.numberofcolors, imgd );
			}

			// Selective Gaussian blur preprocessing
			if( options.blurradius > 0 ){ imgd = _this.blur( imgd, options.blurradius, options.blurdelta ); }

			// Repeat clustering step options.colorquantcycles times
			for( cnt=0; cnt < options.colorquantcycles; cnt++ ){

				// Average colors from the second iteration
				if(cnt>0){
					// averaging paletteacc for palette
					for( k=0; k < palette.length; k++ ){

						// averaging
						if( paletteacc[k].n > 0 ){
							palette[k] = {  r: Math.floor( paletteacc[k].r / paletteacc[k].n ),
											g: Math.floor( paletteacc[k].g / paletteacc[k].n ),
											b: Math.floor( paletteacc[k].b / paletteacc[k].n ),
											a:  Math.floor( paletteacc[k].a / paletteacc[k].n ) };
						}

						// Randomizing a color, if there are too few pixels and there will be a new cycle
						if( ( paletteacc[k].n/pixelnum < options.mincolorratio ) && ( cnt < options.colorquantcycles-1 ) ){
							palette[k] = {  r: Math.floor(Math.random()*255),
											g: Math.floor(Math.random()*255),
											b: Math.floor(Math.random()*255),
											a: Math.floor(Math.random()*255) };
						}

					}// End of palette loop
				}// End of Average colors from the second iteration

				// Reseting palette accumulator for averaging
				for( i=0; i < palette.length; i++ ){ paletteacc[i] = { r:0, g:0, b:0, a:0, n:0 }; }

				// loop through all pixels
				for( j=0; j < imgd.height; j++ ){
					for( i=0; i < imgd.width; i++ ){

						// pixel index
						idx = (j*imgd.width+i)*4;

						// find closest color from palette by measuring (rectilinear) color distance between this pixel and all palette colors
						ci=0; cdl = 1024; // 4 * 256 is the maximum RGBA distance
						for( k=0; k<palette.length; k++ ){

							// In my experience, https://en.wikipedia.org/wiki/Rectilinear_distance works better than https://en.wikipedia.org/wiki/Euclidean_distance
							cd =
								( palette[k].r > imgd.data[idx  ] ? palette[k].r - imgd.data[idx  ] : imgd.data[idx  ] - palette[k].r ) +
								( palette[k].g > imgd.data[idx+1] ? palette[k].g - imgd.data[idx+1] : imgd.data[idx+1] - palette[k].g ) +
								( palette[k].b > imgd.data[idx+2] ? palette[k].b - imgd.data[idx+2] : imgd.data[idx+2] - palette[k].b ) +
								( palette[k].a > imgd.data[idx+3] ? palette[k].a - imgd.data[idx+3] : imgd.data[idx+3] - palette[k].a );

							// Remember this color if this is the closest yet
							if(cd<cdl){ cdl = cd; ci = k; }

						}// End of palette loop

						// add to palettacc
						paletteacc[ci].r += imgd.data[idx  ];
						paletteacc[ci].g += imgd.data[idx+1];
						paletteacc[ci].b += imgd.data[idx+2];
						paletteacc[ci].a += imgd.data[idx+3];
						paletteacc[ci].n++;

						// update the indexed color array
						arr[j+1][i+1] = ci;

					}// End of i loop
				}// End of j loop

			}// End of Repeat clustering step options.colorquantcycles times

			return { array:arr, palette:palette };

		},// End of colorquantization()

		// Sampling a palette from imagedata
		this.samplepalette = function( numberofcolors, imgd ){
			var idx, palette=[];
			for(var i=0; i<numberofcolors; i++){
				idx = Math.floor( Math.random() * imgd.data.length / 4 ) * 4;
				palette.push({ r:imgd.data[idx  ], g:imgd.data[idx+1], b:imgd.data[idx+2], a:imgd.data[idx+3] });
			}
			return palette;
		},// End of samplepalette()

		// Deterministic sampling a palette from imagedata: rectangular grid
		this.samplepalette2 = function( numberofcolors, imgd ){
			var idx, palette=[], ni = Math.ceil(Math.sqrt(numberofcolors)), nj = Math.ceil(numberofcolors/ni),
				vx = imgd.width / (ni+1), vy = imgd.height / (nj+1);
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					if(palette.length === numberofcolors){
						break;
					}else{
						idx = Math.floor( ((j+1)*vy) * imgd.width + ((i+1)*vx) ) * 4;
						palette.push( { r:imgd.data[idx], g:imgd.data[idx+1], b:imgd.data[idx+2], a:imgd.data[idx+3] } );
					}
				}
			}
			return palette;
		},// End of samplepalette2()

		// Generating a palette with numberofcolors
		this.generatepalette = function(numberofcolors){
			var palette = [], rcnt, gcnt, bcnt;
			if(numberofcolors<8){

				// Grayscale
				var graystep = Math.floor(255/(numberofcolors-1));
				for(var i=0; i<numberofcolors; i++){ palette.push({ r:i*graystep, g:i*graystep, b:i*graystep, a:255 }); }

			}else{

				// RGB color cube
				var colorqnum = Math.floor(Math.pow(numberofcolors, 1/3)), // Number of points on each edge on the RGB color cube
					colorstep = Math.floor(255/(colorqnum-1)), // distance between points
					rndnum = numberofcolors - colorqnum*colorqnum*colorqnum; // number of random colors

				for(rcnt=0; rcnt<colorqnum; rcnt++){
					for(gcnt=0; gcnt<colorqnum; gcnt++){
						for(bcnt=0; bcnt<colorqnum; bcnt++){
							palette.push( { r:rcnt*colorstep, g:gcnt*colorstep, b:bcnt*colorstep, a:255 } );
						}// End of blue loop
					}// End of green loop
				}// End of red loop

				// Rest is random
				for(rcnt=0; rcnt<rndnum; rcnt++){ palette.push({ r:Math.floor(Math.random()*255), g:Math.floor(Math.random()*255), b:Math.floor(Math.random()*255), a:Math.floor(Math.random()*255) }); }

			}// End of numberofcolors check

			return palette;
		},// End of generatepalette()

		// 2. Layer separation and edge detection
		// Edge node types ( ▓: this layer or 1; ░: not this layer or 0 )
		// 12  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓
		// 48  ░░  ░░  ░░  ░░  ░▓  ░▓  ░▓  ░▓  ▓░  ▓░  ▓░  ▓░  ▓▓  ▓▓  ▓▓  ▓▓
		//     0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
		this.layering = function(ii){
			// Creating layers for each indexed color in arr
			var layers = [], val=0, ah = ii.array.length, aw = ii.array[0].length, n1,n2,n3,n4,n5,n6,n7,n8, i, j, k;

			// Create layers
			for(k=0; k<ii.palette.length; k++){
				layers[k] = [];
				for(j=0; j<ah; j++){
					layers[k][j] = [];
					for(i=0; i<aw; i++){
						layers[k][j][i]=0;
					}
				}
			}

			// Looping through all pixels and calculating edge node type
			for(j=1; j<ah-1; j++){
				for(i=1; i<aw-1; i++){

					// This pixel's indexed color
					val = ii.array[j][i];

					// Are neighbor pixel colors the same?
					n1 = ii.array[j-1][i-1]===val ? 1 : 0;
					n2 = ii.array[j-1][i  ]===val ? 1 : 0;
					n3 = ii.array[j-1][i+1]===val ? 1 : 0;
					n4 = ii.array[j  ][i-1]===val ? 1 : 0;
					n5 = ii.array[j  ][i+1]===val ? 1 : 0;
					n6 = ii.array[j+1][i-1]===val ? 1 : 0;
					n7 = ii.array[j+1][i  ]===val ? 1 : 0;
					n8 = ii.array[j+1][i+1]===val ? 1 : 0;

					// this pixel's type and looking back on previous pixels
					layers[val][j+1][i+1] = 1 + n5 * 2 + n8 * 4 + n7 * 8 ;
					if(!n4){ layers[val][j+1][i  ] = 0 + 2 + n7 * 4 + n6 * 8 ; }
					if(!n2){ layers[val][j  ][i+1] = 0 + n3*2 + n5 * 4 + 8 ; }
					if(!n1){ layers[val][j  ][i  ] = 0 + n2*2 + 4 + n4 * 8 ; }

				}// End of i loop
			}// End of j loop

			return layers;
		},// End of layering()

		// 2. Layer separation and edge detection
		// Edge node types ( ▓: this layer or 1; ░: not this layer or 0 )
		// 12  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓
		// 48  ░░  ░░  ░░  ░░  ░▓  ░▓  ░▓  ░▓  ▓░  ▓░  ▓░  ▓░  ▓▓  ▓▓  ▓▓  ▓▓
		//     0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
		this.layeringstep = function(ii,cnum){
			// Creating layers for each indexed color in arr
			var layer = [], val=0, ah = ii.array.length, aw = ii.array[0].length, n1,n2,n3,n4,n5,n6,n7,n8, i, j, k;

			// Create layer
			for(j=0; j<ah; j++){
				layer[j] = [];
				for(i=0; i<aw; i++){
					layer[j][i]=0;
				}
			}

			// Looping through all pixels and calculating edge node type
			for(j=1; j<ah; j++){
				for(i=1; i<aw; i++){
					layer[j][i] =
						( ii.array[j-1][i-1]===cnum ? 1 : 0 ) +
						( ii.array[j-1][i]===cnum ? 2 : 0 ) +
						( ii.array[j][i-1]===cnum ? 8 : 0 ) +
						( ii.array[j][i]===cnum ? 4 : 0 )
					;
				}// End of i loop
			}// End of j loop

			return layer;
		},// End of layeringstep()

		// Point in polygon test
		this.pointinpoly = function( p, pa ){
			var isin=false;

			for(var i=0,j=pa.length-1; i<pa.length; j=i++){
				isin =
					( ((pa[i].y > p.y) !== (pa[j].y > p.y)) && (p.x < (pa[j].x - pa[i].x) * (p.y - pa[i].y) / (pa[j].y - pa[i].y) + pa[i].x) )
					? !isin : isin;
			}

			return isin;
		},

		// Lookup tables for pathscan
		// pathscan_combined_lookup[ arr[py][px] ][ dir ] = [nextarrpypx, nextdir, deltapx, deltapy];
		this.pathscan_combined_lookup = [
			[[-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1]],// arr[py][px]===0 is invalid
			[[ 0, 1, 0,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [ 0, 2,-1, 0]],
			[[-1,-1,-1,-1], [-1,-1,-1,-1], [ 0, 1, 0,-1], [ 0, 0, 1, 0]],
			[[ 0, 0, 1, 0], [-1,-1,-1,-1], [ 0, 2,-1, 0], [-1,-1,-1,-1]],

			[[-1,-1,-1,-1], [ 0, 0, 1, 0], [ 0, 3, 0, 1], [-1,-1,-1,-1]],
			[[13, 3, 0, 1], [13, 2,-1, 0], [ 7, 1, 0,-1], [ 7, 0, 1, 0]],
			[[-1,-1,-1,-1], [ 0, 1, 0,-1], [-1,-1,-1,-1], [ 0, 3, 0, 1]],
			[[ 0, 3, 0, 1], [ 0, 2,-1, 0], [-1,-1,-1,-1], [-1,-1,-1,-1]],

			[[ 0, 3, 0, 1], [ 0, 2,-1, 0], [-1,-1,-1,-1], [-1,-1,-1,-1]],
			[[-1,-1,-1,-1], [ 0, 1, 0,-1], [-1,-1,-1,-1], [ 0, 3, 0, 1]],
			[[11, 1, 0,-1], [14, 0, 1, 0], [14, 3, 0, 1], [11, 2,-1, 0]],
			[[-1,-1,-1,-1], [ 0, 0, 1, 0], [ 0, 3, 0, 1], [-1,-1,-1,-1]],

			[[ 0, 0, 1, 0], [-1,-1,-1,-1], [ 0, 2,-1, 0], [-1,-1,-1,-1]],
			[[-1,-1,-1,-1], [-1,-1,-1,-1], [ 0, 1, 0,-1], [ 0, 0, 1, 0]],
			[[ 0, 1, 0,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [ 0, 2,-1, 0]],
			[[-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1]]// arr[py][px]===15 is invalid
		],

		// 3. Walking through an edge node array, discarding edge node types 0 and 15 and creating paths from the rest.
		// Walk directions (dir): 0 > ; 1 ^ ; 2 < ; 3 v
		this.pathscan = function( arr, pathomit ){
			var paths=[], pacnt=0, pcnt=0, px=0, py=0, w = arr[0].length, h = arr.length,
				dir=0, pathfinished=true, holepath=false, lookuprow;

			for(var j=0; j<h; j++){
				for(var i=0; i<w; i++){
					if( (arr[j][i] == 4) || ( arr[j][i] == 11) ){ // Other values are not valid

						// Init
						px = i; py = j;
						paths[pacnt] = {};
						paths[pacnt].points = [];
						paths[pacnt].boundingbox = [px,py,px,py];
						paths[pacnt].holechildren = [];
						pathfinished = false;
						pcnt=0;
						holepath = (arr[j][i]==11);
						dir = 1;

						// Path points loop
						while(!pathfinished){

							// New path point
							paths[pacnt].points[pcnt] = {};
							paths[pacnt].points[pcnt].x = px-1;
							paths[pacnt].points[pcnt].y = py-1;
							paths[pacnt].points[pcnt].t = arr[py][px];

							// Bounding box
							if( (px-1) < paths[pacnt].boundingbox[0] ){ paths[pacnt].boundingbox[0] = px-1; }
							if( (px-1) > paths[pacnt].boundingbox[2] ){ paths[pacnt].boundingbox[2] = px-1; }
							if( (py-1) < paths[pacnt].boundingbox[1] ){ paths[pacnt].boundingbox[1] = py-1; }
							if( (py-1) > paths[pacnt].boundingbox[3] ){ paths[pacnt].boundingbox[3] = py-1; }

							// Next: look up the replacement, direction and coordinate changes = clear this cell, turn if required, walk forward
							lookuprow = _this.pathscan_combined_lookup[ arr[py][px] ][ dir ];
							arr[py][px] = lookuprow[0]; dir = lookuprow[1]; px += lookuprow[2]; py += lookuprow[3];

							// Close path
							if( (px-1 === paths[pacnt].points[0].x ) && ( py-1 === paths[pacnt].points[0].y ) ){
								pathfinished = true;

								// Discarding paths shorter than pathomit
								if( paths[pacnt].points.length < pathomit ){
									paths.pop();
								}else{

									paths[pacnt].isholepath = holepath ? true : false;

									// Finding the parent shape for this hole
									if(holepath){

										var parentidx = 0, parentbbox = [-1,-1,w+1,h+1];
										for(var parentcnt=0; parentcnt < pacnt; parentcnt++){
											if( (!paths[parentcnt].isholepath) &&
												_this.boundingboxincludes( paths[parentcnt].boundingbox , paths[pacnt].boundingbox ) &&
												_this.boundingboxincludes( parentbbox , paths[parentcnt].boundingbox ) &&
												_this.pointinpoly( paths[pacnt].points[0], paths[parentcnt].points )
											){
												parentidx = parentcnt;
												parentbbox = paths[parentcnt].boundingbox;
											}
										}

										paths[parentidx].holechildren.push( pacnt );

									}// End of holepath parent finding

									pacnt++;

								}

							}// End of Close path

							pcnt++;

						}// End of Path points loop

					}// End of Follow path

				}// End of i loop
			}// End of j loop

			return paths;
		},// End of pathscan()

		this.boundingboxincludes = function( parentbbox, childbbox ){
			return ( ( parentbbox[0] < childbbox[0] ) && ( parentbbox[1] < childbbox[1] ) && ( parentbbox[2] > childbbox[2] ) && ( parentbbox[3] > childbbox[3] ) );
		},// End of boundingboxincludes()

		// 3. Batch pathscan
		this.batchpathscan = function( layers, pathomit ){
			var bpaths = [];
			for(var k in layers){
				if(!layers.hasOwnProperty(k)){ continue; }
				bpaths[k] = _this.pathscan( layers[k], pathomit );
			}
			return bpaths;
		},

		// 4. interpollating between path points for nodes with 8 directions ( East, SouthEast, S, SW, W, NW, N, NE )
		this.internodes = function( paths, options ){
			var ins = [], palen=0, nextidx=0, nextidx2=0, previdx=0, previdx2=0, pacnt, pcnt;

			// paths loop
			for(pacnt=0; pacnt<paths.length; pacnt++){

				ins[pacnt] = {};
				ins[pacnt].points = [];
				ins[pacnt].boundingbox = paths[pacnt].boundingbox;
				ins[pacnt].holechildren = paths[pacnt].holechildren;
				ins[pacnt].isholepath = paths[pacnt].isholepath;
				palen = paths[pacnt].points.length;

				// pathpoints loop
				for(pcnt=0; pcnt<palen; pcnt++){

					// next and previous point indexes
					nextidx = (pcnt+1)%palen; nextidx2 = (pcnt+2)%palen; previdx = (pcnt-1+palen)%palen; previdx2 = (pcnt-2+palen)%palen;

					// right angle enhance
					if( options.rightangleenhance && _this.testrightangle( paths[pacnt], previdx2, previdx, pcnt, nextidx, nextidx2 ) ){

						// Fix previous direction
						if(ins[pacnt].points.length > 0){
							ins[pacnt].points[ ins[pacnt].points.length-1 ].linesegment = _this.getdirection(
									ins[pacnt].points[ ins[pacnt].points.length-1 ].x,
									ins[pacnt].points[ ins[pacnt].points.length-1 ].y,
									paths[pacnt].points[pcnt].x,
									paths[pacnt].points[pcnt].y
								);
						}

						// This corner point
						ins[pacnt].points.push({
							x : paths[pacnt].points[pcnt].x,
							y : paths[pacnt].points[pcnt].y,
							linesegment : _this.getdirection(
									paths[pacnt].points[pcnt].x,
									paths[pacnt].points[pcnt].y,
									(( paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x ) /2),
									(( paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y ) /2)
								)
						});

					}// End of right angle enhance

					// interpolate between two path points
					ins[pacnt].points.push({
						x : (( paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x ) /2),
						y : (( paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y ) /2),
						linesegment : _this.getdirection(
								(( paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x ) /2),
								(( paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y ) /2),
								(( paths[pacnt].points[nextidx].x + paths[pacnt].points[nextidx2].x ) /2),
								(( paths[pacnt].points[nextidx].y + paths[pacnt].points[nextidx2].y ) /2)
							)
					});

				}// End of pathpoints loop

			}// End of paths loop

			return ins;
		},// End of internodes()

		this.testrightangle = function( path, idx1, idx2, idx3, idx4, idx5 ){
			return ( (( path.points[idx3].x === path.points[idx1].x) &&
					  ( path.points[idx3].x === path.points[idx2].x) &&
					  ( path.points[idx3].y === path.points[idx4].y) &&
					  ( path.points[idx3].y === path.points[idx5].y)
					 ) ||
					 (( path.points[idx3].y === path.points[idx1].y) &&
					  ( path.points[idx3].y === path.points[idx2].y) &&
					  ( path.points[idx3].x === path.points[idx4].x) &&
					  ( path.points[idx3].x === path.points[idx5].x)
					 )
			);
		},// End of testrightangle()

		this.getdirection = function( x1, y1, x2, y2 ){
			var val = 8;
			if(x1 < x2){
				if     (y1 < y2){ val = 1; }// SouthEast
				else if(y1 > y2){ val = 7; }// NE
				else            { val = 0; }// E
			}else if(x1 > x2){
				if     (y1 < y2){ val = 3; }// SW
				else if(y1 > y2){ val = 5; }// NW
				else            { val = 4; }// W
			}else{
				if     (y1 < y2){ val = 2; }// S
				else if(y1 > y2){ val = 6; }// N
				else            { val = 8; }// center, this should not happen
			}
			return val;
		},// End of getdirection()

		// 4. Batch interpollation
		this.batchinternodes = function( bpaths, options ){
			var binternodes = [];
			for (var k in bpaths) {
				if(!bpaths.hasOwnProperty(k)){ continue; }
				binternodes[k] = _this.internodes(bpaths[k], options);
			}
			return binternodes;
		},

		// 5. tracepath() : recursively trying to fit straight and quadratic spline segments on the 8 direction internode path

		// 5.1. Find sequences of points with only 2 segment types
		// 5.2. Fit a straight line on the sequence
		// 5.3. If the straight line fails (distance error > ltres), find the point with the biggest error
		// 5.4. Fit a quadratic spline through errorpoint (project this to get controlpoint), then measure errors on every point in the sequence
		// 5.5. If the spline fails (distance error > qtres), find the point with the biggest error, set splitpoint = fitting point
		// 5.6. Split sequence and recursively apply 5.2. - 5.6. to startpoint-splitpoint and splitpoint-endpoint sequences

		this.tracepath = function( path, ltres, qtres ){
			var pcnt=0, segtype1, segtype2, seqend, smp = {};
			smp.segments = [];
			smp.boundingbox = path.boundingbox;
			smp.holechildren = path.holechildren;
			smp.isholepath = path.isholepath;

			while(pcnt < path.points.length){
				// 5.1. Find sequences of points with only 2 segment types
				segtype1 = path.points[pcnt].linesegment; segtype2 = -1; seqend=pcnt+1;
				while(
					((path.points[seqend].linesegment === segtype1) || (path.points[seqend].linesegment === segtype2) || (segtype2 === -1))
					&& (seqend < path.points.length-1) ){

					if((path.points[seqend].linesegment!==segtype1) && (segtype2===-1)){ segtype2 = path.points[seqend].linesegment; }
					seqend++;

				}
				if(seqend === path.points.length-1){ seqend = 0; }

				// 5.2. - 5.6. Split sequence and recursively apply 5.2. - 5.6. to startpoint-splitpoint and splitpoint-endpoint sequences
				smp.segments = smp.segments.concat( _this.fitseq(path, ltres, qtres, pcnt, seqend) );

				// forward pcnt;
				if(seqend>0){ pcnt = seqend; }else{ pcnt = path.points.length; }

			}// End of pcnt loop

			return smp;
		},// End of tracepath()

		// 5.2. - 5.6. recursively fitting a straight or quadratic line segment on this sequence of path nodes,
		// called from tracepath()
		this.fitseq = function( path, ltres, qtres, seqstart, seqend ){
			// return if invalid seqend
			if( (seqend>path.points.length) || (seqend<0) ){ return []; }
			// variables
			var errorpoint=seqstart, errorval=0, curvepass=true, px, py, dist2;
			var tl = (seqend-seqstart); if(tl<0){ tl += path.points.length; }
			var vx = (path.points[seqend].x-path.points[seqstart].x) / tl,
				vy = (path.points[seqend].y-path.points[seqstart].y) / tl;

			// 5.2. Fit a straight line on the sequence
			var pcnt = (seqstart+1) % path.points.length, pl;
			while(pcnt != seqend){
				pl = pcnt-seqstart; if(pl<0){ pl += path.points.length; }
				px = path.points[seqstart].x + vx * pl; py = path.points[seqstart].y + vy * pl;
				dist2 = (path.points[pcnt].x-px)*(path.points[pcnt].x-px) + (path.points[pcnt].y-py)*(path.points[pcnt].y-py);
				if(dist2>ltres){curvepass=false;}
				if(dist2>errorval){ errorpoint=pcnt; errorval=dist2; }
				pcnt = (pcnt+1)%path.points.length;
			}
			// return straight line if fits
			if(curvepass){ return [{ type:'L', x1:path.points[seqstart].x, y1:path.points[seqstart].y, x2:path.points[seqend].x, y2:path.points[seqend].y }]; }

			// 5.3. If the straight line fails (distance error>ltres), find the point with the biggest error
			var fitpoint = errorpoint; curvepass = true; errorval = 0;

			// 5.4. Fit a quadratic spline through this point, measure errors on every point in the sequence
			// helpers and projecting to get control point
			var t=(fitpoint-seqstart)/tl, t1=(1-t)*(1-t), t2=2*(1-t)*t, t3=t*t;
			var cpx = (t1*path.points[seqstart].x + t3*path.points[seqend].x - path.points[fitpoint].x)/-t2 ,
				cpy = (t1*path.points[seqstart].y + t3*path.points[seqend].y - path.points[fitpoint].y)/-t2 ;

			// Check every point
			pcnt = seqstart+1;
			while(pcnt != seqend){
				t=(pcnt-seqstart)/tl; t1=(1-t)*(1-t); t2=2*(1-t)*t; t3=t*t;
				px = t1 * path.points[seqstart].x + t2 * cpx + t3 * path.points[seqend].x;
				py = t1 * path.points[seqstart].y + t2 * cpy + t3 * path.points[seqend].y;

				dist2 = (path.points[pcnt].x-px)*(path.points[pcnt].x-px) + (path.points[pcnt].y-py)*(path.points[pcnt].y-py);

				if(dist2>qtres){curvepass=false;}
				if(dist2>errorval){ errorpoint=pcnt; errorval=dist2; }
				pcnt = (pcnt+1)%path.points.length;
			}
			// return spline if fits
			if(curvepass){ return [{ type:'Q', x1:path.points[seqstart].x, y1:path.points[seqstart].y, x2:cpx, y2:cpy, x3:path.points[seqend].x, y3:path.points[seqend].y }]; }
			// 5.5. If the spline fails (distance error>qtres), find the point with the biggest error
			var splitpoint = fitpoint; // Earlier: Math.floor((fitpoint + errorpoint)/2);

			// 5.6. Split sequence and recursively apply 5.2. - 5.6. to startpoint-splitpoint and splitpoint-endpoint sequences
			return _this.fitseq( path, ltres, qtres, seqstart, splitpoint ).concat(
					_this.fitseq( path, ltres, qtres, splitpoint, seqend ) );

		},// End of fitseq()

		// 5. Batch tracing paths
		this.batchtracepaths = function(internodepaths,ltres,qtres){
			var btracedpaths = [];
			for(var k in internodepaths){
				if(!internodepaths.hasOwnProperty(k)){ continue; }
				btracedpaths.push( _this.tracepath(internodepaths[k],ltres,qtres) );
			}
			return btracedpaths;
		},

		// 5. Batch tracing layers
		this.batchtracelayers = function(binternodes, ltres, qtres){
			var btbis = [];
			for(var k in binternodes){
				if(!binternodes.hasOwnProperty(k)){ continue; }
				btbis[k] = _this.batchtracepaths(binternodes[k], ltres, qtres);
			}
			return btbis;
		},

		////////////////////////////////////////////////////////////
		//
		//  SVG Drawing functions
		//
		////////////////////////////////////////////////////////////

		// Rounding to given decimals https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
		this.roundtodec = function(val,places){ return +val.toFixed(places); },

		// Getting SVG path element string from a traced path
		this.svgpathstring = function( tracedata, lnum, pathnum, options ){

			var layer = tracedata.layers[lnum], smp = layer[pathnum], str='', pcnt;

			// Line filter
			if(options.linefilter && (smp.segments.length < 3)){ return str; }

			// Starting path element, desc contains layer and path number
			str = '<path '+
				( options.desc ? ('desc="l '+lnum+' p '+pathnum+'" ') : '' ) +
				_this.tosvgcolorstr(tracedata.palette[lnum], options) +
				'd="';

			// Creating non-hole path string
			if( options.roundcoords === -1 ){
				str += 'M '+ smp.segments[0].x1 * options.scale +' '+ smp.segments[0].y1 * options.scale +' ';
				for(pcnt=0; pcnt<smp.segments.length; pcnt++){
					str += smp.segments[pcnt].type +' '+ smp.segments[pcnt].x2 * options.scale +' '+ smp.segments[pcnt].y2 * options.scale +' ';
					if(smp.segments[pcnt].hasOwnProperty('x3')){
						str += smp.segments[pcnt].x3 * options.scale +' '+ smp.segments[pcnt].y3 * options.scale +' ';
					}
				}
				str += 'Z ';
			}else{
				str += 'M '+ _this.roundtodec( smp.segments[0].x1 * options.scale, options.roundcoords ) +' '+ _this.roundtodec( smp.segments[0].y1 * options.scale, options.roundcoords ) +' ';
				for(pcnt=0; pcnt<smp.segments.length; pcnt++){
					str += smp.segments[pcnt].type +' '+ _this.roundtodec( smp.segments[pcnt].x2 * options.scale, options.roundcoords ) +' '+ _this.roundtodec( smp.segments[pcnt].y2 * options.scale, options.roundcoords ) +' ';
					if(smp.segments[pcnt].hasOwnProperty('x3')){
						str += _this.roundtodec( smp.segments[pcnt].x3 * options.scale, options.roundcoords ) +' '+ _this.roundtodec( smp.segments[pcnt].y3 * options.scale, options.roundcoords ) +' ';
					}
				}
				str += 'Z ';
			}// End of creating non-hole path string

			// Hole children
			for( var hcnt=0; hcnt < smp.holechildren.length; hcnt++){
				var hsmp = layer[ smp.holechildren[hcnt] ];
				// Creating hole path string
				if( options.roundcoords === -1 ){

					if(hsmp.segments[ hsmp.segments.length-1 ].hasOwnProperty('x3')){
						str += 'M '+ hsmp.segments[ hsmp.segments.length-1 ].x3 * options.scale +' '+ hsmp.segments[ hsmp.segments.length-1 ].y3 * options.scale +' ';
					}else{
						str += 'M '+ hsmp.segments[ hsmp.segments.length-1 ].x2 * options.scale +' '+ hsmp.segments[ hsmp.segments.length-1 ].y2 * options.scale +' ';
					}

					for(pcnt = hsmp.segments.length-1; pcnt >= 0; pcnt--){
						str += hsmp.segments[pcnt].type +' ';
						if(hsmp.segments[pcnt].hasOwnProperty('x3')){
							str += hsmp.segments[pcnt].x2 * options.scale +' '+ hsmp.segments[pcnt].y2 * options.scale +' ';
						}

						str += hsmp.segments[pcnt].x1 * options.scale +' '+ hsmp.segments[pcnt].y1 * options.scale +' ';
					}

				}else{

					if(hsmp.segments[ hsmp.segments.length-1 ].hasOwnProperty('x3')){
						str += 'M '+ _this.roundtodec( hsmp.segments[ hsmp.segments.length-1 ].x3 * options.scale ) +' '+ _this.roundtodec( hsmp.segments[ hsmp.segments.length-1 ].y3 * options.scale ) +' ';
					}else{
						str += 'M '+ _this.roundtodec( hsmp.segments[ hsmp.segments.length-1 ].x2 * options.scale ) +' '+ _this.roundtodec( hsmp.segments[ hsmp.segments.length-1 ].y2 * options.scale ) +' ';
					}

					for(pcnt = hsmp.segments.length-1; pcnt >= 0; pcnt--){
						str += hsmp.segments[pcnt].type +' ';
						if(hsmp.segments[pcnt].hasOwnProperty('x3')){
							str += _this.roundtodec( hsmp.segments[pcnt].x2 * options.scale ) +' '+ _this.roundtodec( hsmp.segments[pcnt].y2 * options.scale ) +' ';
						}
						str += _this.roundtodec( hsmp.segments[pcnt].x1 * options.scale ) +' '+ _this.roundtodec( hsmp.segments[pcnt].y1 * options.scale ) +' ';
					}


				}// End of creating hole path string

				str += 'Z '; // Close path

			}// End of holepath check

			// Closing path element
			str += '" />';

			// Rendering control points
			if(options.lcpr || options.qcpr){
				for(pcnt=0; pcnt<smp.segments.length; pcnt++){
					if( smp.segments[pcnt].hasOwnProperty('x3') && options.qcpr ){
						str += '<circle cx="'+ smp.segments[pcnt].x2 * options.scale +'" cy="'+ smp.segments[pcnt].y2 * options.scale +'" r="'+ options.qcpr +'" fill="cyan" stroke-width="'+ options.qcpr * 0.2 +'" stroke="black" />';
						str += '<circle cx="'+ smp.segments[pcnt].x3 * options.scale +'" cy="'+ smp.segments[pcnt].y3 * options.scale +'" r="'+ options.qcpr +'" fill="white" stroke-width="'+ options.qcpr * 0.2 +'" stroke="black" />';
						str += '<line x1="'+ smp.segments[pcnt].x1 * options.scale +'" y1="'+ smp.segments[pcnt].y1 * options.scale +'" x2="'+ smp.segments[pcnt].x2 * options.scale +'" y2="'+ smp.segments[pcnt].y2 * options.scale +'" stroke-width="'+ options.qcpr * 0.2 +'" stroke="cyan" />';
						str += '<line x1="'+ smp.segments[pcnt].x2 * options.scale +'" y1="'+ smp.segments[pcnt].y2 * options.scale +'" x2="'+ smp.segments[pcnt].x3 * options.scale +'" y2="'+ smp.segments[pcnt].y3 * options.scale +'" stroke-width="'+ options.qcpr * 0.2 +'" stroke="cyan" />';
					}
					if( (!smp.segments[pcnt].hasOwnProperty('x3')) && options.lcpr){
						str += '<circle cx="'+ smp.segments[pcnt].x2 * options.scale +'" cy="'+ smp.segments[pcnt].y2 * options.scale +'" r="'+ options.lcpr +'" fill="white" stroke-width="'+ options.lcpr * 0.2 +'" stroke="black" />';
					}
				}

				// Hole children control points
				for( var hcnt=0; hcnt < smp.holechildren.length; hcnt++){
					var hsmp = layer[ smp.holechildren[hcnt] ];
					for(pcnt=0; pcnt<hsmp.segments.length; pcnt++){
						if( hsmp.segments[pcnt].hasOwnProperty('x3') && options.qcpr ){
							str += '<circle cx="'+ hsmp.segments[pcnt].x2 * options.scale +'" cy="'+ hsmp.segments[pcnt].y2 * options.scale +'" r="'+ options.qcpr +'" fill="cyan" stroke-width="'+ options.qcpr * 0.2 +'" stroke="black" />';
							str += '<circle cx="'+ hsmp.segments[pcnt].x3 * options.scale +'" cy="'+ hsmp.segments[pcnt].y3 * options.scale +'" r="'+ options.qcpr +'" fill="white" stroke-width="'+ options.qcpr * 0.2 +'" stroke="black" />';
							str += '<line x1="'+ hsmp.segments[pcnt].x1 * options.scale +'" y1="'+ hsmp.segments[pcnt].y1 * options.scale +'" x2="'+ hsmp.segments[pcnt].x2 * options.scale +'" y2="'+ hsmp.segments[pcnt].y2 * options.scale +'" stroke-width="'+ options.qcpr * 0.2 +'" stroke="cyan" />';
							str += '<line x1="'+ hsmp.segments[pcnt].x2 * options.scale +'" y1="'+ hsmp.segments[pcnt].y2 * options.scale +'" x2="'+ hsmp.segments[pcnt].x3 * options.scale +'" y2="'+ hsmp.segments[pcnt].y3 * options.scale +'" stroke-width="'+ options.qcpr * 0.2 +'" stroke="cyan" />';
						}
						if( (!hsmp.segments[pcnt].hasOwnProperty('x3')) && options.lcpr){
							str += '<circle cx="'+ hsmp.segments[pcnt].x2 * options.scale +'" cy="'+ hsmp.segments[pcnt].y2 * options.scale +'" r="'+ options.lcpr +'" fill="white" stroke-width="'+ options.lcpr * 0.2 +'" stroke="black" />';
						}
					}
				}
			}// End of Rendering control points

			return str;

		},// End of svgpathstring()

		// Converting tracedata to an SVG string
		this.getsvgstring = function( tracedata, options ){

			options = _this.checkoptions(options);

			var w = tracedata.width * options.scale, h = tracedata.height * options.scale;

			// SVG start
			var svgstr = '<svg ' + (options.viewbox ? ('viewBox="0 0 '+w+' '+h+'" ') : ('width="'+w+'" height="'+h+'" ')) +
				'version="1.1" xmlns="http://www.w3.org/2000/svg" desc="Created with image_tracer.js version '+_this.versionnumber+'" >';

			// Drawing: Layers and Paths loops
			for(var lcnt=0; lcnt < tracedata.layers.length; lcnt++){
				for(var pcnt=0; pcnt < tracedata.layers[lcnt].length; pcnt++){

					// Adding SVG <path> string
					if( !tracedata.layers[lcnt][pcnt].isholepath ){
						svgstr += _this.svgpathstring( tracedata, lcnt, pcnt, options );
					}

				}// End of paths loop
			}// End of layers loop

			// SVG End
			svgstr+='</svg>';

			return svgstr;

		},// End of getsvgstring()

		// Comparator for numeric Array.sort
		this.compareNumbers = function(a,b){ return a - b; },

		// Convert color object to rgba string
		this.torgbastr = function(c){ return 'rgba('+c.r+','+c.g+','+c.b+','+c.a+')'; },

		// Convert color object to SVG color string
		this.tosvgcolorstr = function(c, options){
			return 'fill="rgb('+c.r+','+c.g+','+c.b+')" stroke="rgb('+c.r+','+c.g+','+c.b+')" stroke-width="'+options.strokewidth+'" opacity="'+c.a/255.0+'" ';
		},

		// Helper function: Appending an <svg> element to a container from an svgstring
		this.appendSVGString = function(svgstr,parentid){
			var div;
			if(parentid){
				div = document.getElementById(parentid);
				if(!div){
					div = document.createElement('div');
					div.id = parentid;
					document.body.appendChild(div);
				}
			}else{
				div = document.createElement('div');
				document.body.appendChild(div);
			}
			div.innerHTML += svgstr;
		},

		////////////////////////////////////////////////////////////
		//
		//  Canvas functions
		//
		////////////////////////////////////////////////////////////

		// Gaussian kernels for blur
		this.gks = [ [0.27901,0.44198,0.27901], [0.135336,0.228569,0.272192,0.228569,0.135336], [0.086776,0.136394,0.178908,0.195843,0.178908,0.136394,0.086776],
					 [0.063327,0.093095,0.122589,0.144599,0.152781,0.144599,0.122589,0.093095,0.063327], [0.049692,0.069304,0.089767,0.107988,0.120651,0.125194,0.120651,0.107988,0.089767,0.069304,0.049692] ],

		// Selective Gaussian blur for preprocessing
		this.blur = function(imgd,radius,delta){
			var i,j,k,d,idx,racc,gacc,bacc,aacc,wacc;

			// new ImageData
			var imgd2 = { width:imgd.width, height:imgd.height, data:[] };

			// radius and delta limits, this kernel
			radius = Math.floor(radius); if(radius<1){ return imgd; } if(radius>5){ radius = 5; } delta = Math.abs( delta ); if(delta>1024){ delta = 1024; }
			var thisgk = _this.gks[radius-1];

			// loop through all pixels, horizontal blur
			for( j=0; j < imgd.height; j++ ){
				for( i=0; i < imgd.width; i++ ){

					racc = 0; gacc = 0; bacc = 0; aacc = 0; wacc = 0;
					// gauss kernel loop
					for( k = -radius; k < radius+1; k++){
						// add weighted color values
						if( (i+k > 0) && (i+k < imgd.width) ){
							idx = (j*imgd.width+i+k)*4;
							racc += imgd.data[idx  ] * thisgk[k+radius];
							gacc += imgd.data[idx+1] * thisgk[k+radius];
							bacc += imgd.data[idx+2] * thisgk[k+radius];
							aacc += imgd.data[idx+3] * thisgk[k+radius];
							wacc += thisgk[k+radius];
						}
					}
					// The new pixel
					idx = (j*imgd.width+i)*4;
					imgd2.data[idx  ] = Math.floor(racc / wacc);
					imgd2.data[idx+1] = Math.floor(gacc / wacc);
					imgd2.data[idx+2] = Math.floor(bacc / wacc);
					imgd2.data[idx+3] = Math.floor(aacc / wacc);

				}// End of width loop
			}// End of horizontal blur

			// copying the half blurred imgd2
			var himgd = new Uint8ClampedArray(imgd2.data);

			// loop through all pixels, vertical blur
			for( j=0; j < imgd.height; j++ ){
				for( i=0; i < imgd.width; i++ ){

					racc = 0; gacc = 0; bacc = 0; aacc = 0; wacc = 0;
					// gauss kernel loop
					for( k = -radius; k < radius+1; k++){
						// add weighted color values
						if( (j+k > 0) && (j+k < imgd.height) ){
							idx = ((j+k)*imgd.width+i)*4;
							racc += himgd[idx  ] * thisgk[k+radius];
							gacc += himgd[idx+1] * thisgk[k+radius];
							bacc += himgd[idx+2] * thisgk[k+radius];
							aacc += himgd[idx+3] * thisgk[k+radius];
							wacc += thisgk[k+radius];
						}
					}
					// The new pixel
					idx = (j*imgd.width+i)*4;
					imgd2.data[idx  ] = Math.floor(racc / wacc);
					imgd2.data[idx+1] = Math.floor(gacc / wacc);
					imgd2.data[idx+2] = Math.floor(bacc / wacc);
					imgd2.data[idx+3] = Math.floor(aacc / wacc);

				}// End of width loop
			}// End of vertical blur

			// Selective blur: loop through all pixels
			for( j=0; j < imgd.height; j++ ){
				for( i=0; i < imgd.width; i++ ){

					idx = (j*imgd.width+i)*4;
					// d is the difference between the blurred and the original pixel
					d = Math.abs(imgd2.data[idx  ] - imgd.data[idx  ]) + Math.abs(imgd2.data[idx+1] - imgd.data[idx+1]) +
						Math.abs(imgd2.data[idx+2] - imgd.data[idx+2]) + Math.abs(imgd2.data[idx+3] - imgd.data[idx+3]);
					// selective blur: if d>delta, put the original pixel back
					if(d>delta){
						imgd2.data[idx  ] = imgd.data[idx  ];
						imgd2.data[idx+1] = imgd.data[idx+1];
						imgd2.data[idx+2] = imgd.data[idx+2];
						imgd2.data[idx+3] = imgd.data[idx+3];
					}
				}
			}// End of Selective blur

			return imgd2;

		},// End of blur()

		// Helper function: loading an image from a URL, then executing callback with canvas as argument
		this.loadImage = function(url,callback,options){
			var img = new Image();
			if(options && options.corsenabled){ img.crossOrigin = 'Anonymous'; }
			img.onload = function(){
				var canvas = null;
				try {
				
					if (typeof OffscreenCanvas === "undefined") {
						throw new Error("Impossible to create OffscreenCanvas in this web environment.");
					}
                
				    canvas = new OffscreenCanvas(img.width, img.height);
				} catch (e) {
				    
				    canvas = document.createElement('canvas');
				    canvas.width = img.width;
					canvas.height = img.height;
				}
				var context = canvas.getContext('2d');
				context.drawImage(img,0,0);
				callback(canvas);
			};
			img.src = url;
		},

		// Helper function: getting ImageData from a canvas
		this.getImgdata = function(canvas){
			var context = canvas.getContext('2d');
			return context.getImageData(0,0,canvas.width,canvas.height);
		},

		// Special palette to use with drawlayers()
		this.specpalette = [
			{r:0,g:0,b:0,a:255}, {r:128,g:128,b:128,a:255}, {r:0,g:0,b:128,a:255}, {r:64,g:64,b:128,a:255},
			{r:192,g:192,b:192,a:255}, {r:255,g:255,b:255,a:255}, {r:128,g:128,b:192,a:255}, {r:0,g:0,b:192,a:255},
			{r:128,g:0,b:0,a:255}, {r:128,g:64,b:64,a:255}, {r:128,g:0,b:128,a:255}, {r:168,g:168,b:168,a:255},
			{r:192,g:128,b:128,a:255}, {r:192,g:0,b:0,a:255}, {r:255,g:255,b:255,a:255}, {r:0,g:128,b:0,a:255}
		]

		// Helper function: Drawing all edge node layers into a container
		;// End of function list

		}// End of ImageTracer object


		try {
			resolve(new ImageTracer().imagedataToSVG(image_data, options));
		} catch(e) {

			reject(null);
		}
})};
*/

const image_tracer = async(image_data, options, pool) => {

	if(Boolean(pool)) {

		return pool.exec(window.image_tracer_process_function, [
			image_data,
			options,
		]).catch((e) => {

			return window.image_tracer_process_function(image_data, options);
		}).timeout(120 * 1000);

	}else {

		return window.image_tracer_process_function(image_data, options);
	}
}

module.exports = {
	image_tracer
};