// Class to upscale pixel art and apply a polygonizing effect
var Delaunay; // https://github.com/darkskyapp/delaunay-fast/tree/master

var EPSILON = 1.0 / 1048576.0;

function supertriangle(vertices) {
    var xmin = Number.POSITIVE_INFINITY,
        ymin = Number.POSITIVE_INFINITY,
        xmax = Number.NEGATIVE_INFINITY,
        ymax = Number.NEGATIVE_INFINITY,
        i, dx, dy, dmax, xmid, ymid;

    for(i = vertices.length; i--; ) {
        if(vertices[i][0] < xmin) xmin = vertices[i][0];
        if(vertices[i][0] > xmax) xmax = vertices[i][0];
        if(vertices[i][1] < ymin) ymin = vertices[i][1];
        if(vertices[i][1] > ymax) ymax = vertices[i][1];
    }

    dx = xmax - xmin;
    dy = ymax - ymin;
    dmax = Math.max(dx, dy);
    xmid = xmin + dx * 0.5;
    ymid = ymin + dy * 0.5;

    return [
        [xmid - 20 * dmax, ymid -      dmax],
        [xmid            , ymid + 20 * dmax],
        [xmid + 20 * dmax, ymid -      dmax]
    ];
}

function circumcircle(vertices, i, j, k) {
    var x1 = vertices[i][0],
        y1 = vertices[i][1],
        x2 = vertices[j][0],
        y2 = vertices[j][1],
        x3 = vertices[k][0],
        y3 = vertices[k][1],
        fabsy1y2 = Math.abs(y1 - y2),
        fabsy2y3 = Math.abs(y2 - y3),
        xc, yc, m1, m2, mx1, mx2, my1, my2, dx, dy;

    /* Check for coincident points */
    if(fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
        throw new Error("Eek! Coincident points!");

    if(fabsy1y2 < EPSILON) {
        m2  = -((x3 - x2) / (y3 - y2));
        mx2 = (x2 + x3) / 2.0;
        my2 = (y2 + y3) / 2.0;
        xc  = (x2 + x1) / 2.0;
        yc  = m2 * (xc - mx2) + my2;
    }

    else if(fabsy2y3 < EPSILON) {
        m1  = -((x2 - x1) / (y2 - y1));
        mx1 = (x1 + x2) / 2.0;
        my1 = (y1 + y2) / 2.0;
        xc  = (x3 + x2) / 2.0;
        yc  = m1 * (xc - mx1) + my1;
    }

    else {
        m1  = -((x2 - x1) / (y2 - y1));
        m2  = -((x3 - x2) / (y3 - y2));
        mx1 = (x1 + x2) / 2.0;
        mx2 = (x2 + x3) / 2.0;
        my1 = (y1 + y2) / 2.0;
        my2 = (y2 + y3) / 2.0;
        xc  = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
        yc  = (fabsy1y2 > fabsy2y3) ?
            m1 * (xc - mx1) + my1 :
            m2 * (xc - mx2) + my2;
    }

    dx = x2 - xc;
    dy = y2 - yc;
    return {i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy};
}

function dedup(edges) {
    var i, j, a, b, m, n;

    for(j = edges.length; j; ) {
        b = edges[--j];
        a = edges[--j];

        for(i = j; i; ) {
            n = edges[--i];
            m = edges[--i];

            if((a === m && b === n) || (a === n && b === m)) {
                edges.splice(j, 2);
                edges.splice(i, 2);
                break;
            }
        }
    }
}

Delaunay = {
    triangulate: function(vertices, key) {
        var n = vertices.length,
            i, j, indices, st, open, closed, edges, dx, dy, a, b, c;

        /* Bail if there aren't enough vertices to form any triangles. */
        if(n < 3)
            return [];

        /* Slice out the actual vertices from the passed objects. (Duplicate the
         * array even if we don't, though, since we need to make a supertriangle
         * later on!) */
        vertices = vertices.slice(0);

        if(key)
            for(i = n; i--; )
                vertices[i] = vertices[i][key];

        /* Make an array of indices into the vertex array, sorted by the
         * vertices' x-position. */
        indices = new Array(n);

        for(i = n; i--; )
            indices[i] = i;

        indices.sort(function(i, j) {
            return vertices[j][0] - vertices[i][0];
        });

        /* Next, find the vertices of the supertriangle (which contains all other
         * triangles), and append them onto the end of a (copy of) the vertex
         * array. */
        st = supertriangle(vertices);
        vertices.push(st[0], st[1], st[2]);

        /* Initialize the open list (containing the supertriangle and nothing
         * else) and the closed list (which is empty since we havn't processed
         * any triangles yet). */
        open   = [circumcircle(vertices, n + 0, n + 1, n + 2)];
        closed = [];
        edges  = [];

        /* Incrementally add each vertex to the mesh. */
        for(i = indices.length; i--; edges.length = 0) {
            c = indices[i];

            /* For each open triangle, check to see if the current point is
             * inside it's circumcircle. If it is, remove the triangle and add
             * it's edges to an edge list. */
            for(j = open.length; j--; ) {
                /* If this point is to the right of this triangle's circumcircle,
                 * then this triangle should never get checked again. Remove it
                 * from the open list, add it to the closed list, and skip. */
                dx = vertices[c][0] - open[j].x;
                if(dx > 0.0 && dx * dx > open[j].r) {
                    closed.push(open[j]);
                    open.splice(j, 1);
                    continue;
                }

                /* If we're outside the circumcircle, skip this triangle. */
                dy = vertices[c][1] - open[j].y;
                if(dx * dx + dy * dy - open[j].r > EPSILON)
                    continue;

                /* Remove the triangle and add it's edges to the edge list. */
                edges.push(
                    open[j].i, open[j].j,
                    open[j].j, open[j].k,
                    open[j].k, open[j].i
                );
                open.splice(j, 1);
            }

            /* Remove any doubled edges. */
            dedup(edges);

            /* Add a new triangle for each edge. */
            for(j = edges.length; j; ) {
                b = edges[--j];
                a = edges[--j];
                open.push(circumcircle(vertices, a, b, c));
            }
        }

        /* Copy any remaining open triangles to the closed list, and then
         * remove any triangles that share a vertex with the supertriangle,
         * building a list of triplets that represent triangles. */
        for(i = open.length; i--; )
            closed.push(open[i]);
        open.length = 0;

        for(i = closed.length; i--; )
            if(closed[i].i < n && closed[i].j < n && closed[i].k < n)
                open.push(closed[i].i, closed[i].j, closed[i].k);

        /* Yay, we're done! */
        return open;
    },
    contains: function(tri, p) {
        /* Bounding box test first, for quick rejections. */
        if((p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0]) ||
            (p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0]) ||
            (p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1]) ||
            (p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1]))
            return null;

        var a = tri[1][0] - tri[0][0],
            b = tri[2][0] - tri[0][0],
            c = tri[1][1] - tri[0][1],
            d = tri[2][1] - tri[0][1],
            i = a * d - b * c;

        /* Degenerate tri. */
        if(i === 0.0)
            return null;

        var u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i,
            v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i;

        /* If we're outside the tri, fail. */
        if(u < 0.0 || v < 0.0 || (u + v) > 1.0)
            return null;

        return [u, v];
    }
};

function initializeCanvas(image, width, height, virtualized) {
    "use strict";
    image = image || {width: 0, height: 0}
    width = image.width || width || 1;
    height = image.height || height || 1;
    let canvas, context;
    try {
        if(virtualized === false) { throw new ErrorEvent("Must support toDataURL later, skipping offrscreen canvas solution."); }
        canvas = new OffscreenCanvas(width, height);
        context = canvas.getContext('2d', { willReadFrequently: true, desynchronized: virtualized});
    }catch (e) {
        canvas = document.createElement("canvas")
        canvas.width = width;
        canvas.height = height;
        context = canvas.getContext('2d', { willReadFrequently: true});
    }

    if (image instanceof ImageData) {
        context.putImageData(image, 0, 0);
    } else if(image.width) {
        context.drawImage(image, 0, 0, width, height);
    }

    return { canvas, context };
}


function createObjectURLFromCanvas(canvas, callback) {
    // Convert the canvas to a Blob
    try {
        canvas.toBlob(function(blob) {
            // Create an object URL for the Blob
            const url = URL.createObjectURL(blob);
            // Call the callback function with the URL
            callback(url);
        });
    }catch (e) {

        const base64PNG = canvas.toDataURL("image/png");
        function dataURItoBlob(dataURI) {
            var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var binary = atob(dataURI.split(',')[1]);
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {type: mime});
        }
        callback(URL.createObjectURL(dataURItoBlob(base64PNG)));
    }
}

class PixelArtPolygonizer {
    // Constructor with default options
    constructor(options = { size: 16 }) {
        this.size = options.size; // Upscale size
        if (!Delaunay) {
            throw new Error('Polygonize requires Delaunay (https://github.com/ironwallaby/delaunay)');
        }
        this.delaunay = Delaunay; // Delaunay library for triangulation
    }

    // Load and process the image
    processImage(src, svg) {
        return new Promise((resolve, reject) => {
            if (!src) throw new Error('Image source is undefined');

            const image = new Image();
            image.src = src;

            image.onload = () => {
                this.polygonize(image, svg).then(resolve);
            };

            image.onerror = () => {
                reject(new Error('Invalid image source'));
            };
        });
    };

    // Polygonize the image
    polygonize(image, svg) {
        return new Promise((resolve) => {
            // Create canvases for the original and output image
            const canvasIn = initializeCanvas(undefined, 1, 1, true);
            const canvasOut = initializeCanvas(undefined, 1, 1, false);
            const originalCanvas = canvasIn.canvas;
            const ctxOriginal = canvasIn.context;
            const outputCanvas = canvasOut.canvas;
            const ctxOutput = canvasOut.context;

            // Set dimensions based on upscale size
            const scaledWidth = image.width * this.size;
            const scaledHeight = image.height * this.size;
            originalCanvas.width = scaledWidth;
            originalCanvas.height = scaledHeight;
            outputCanvas.width = scaledWidth;
            outputCanvas.height = scaledHeight;

            // Draw the scaled image
            ctxOriginal.drawImage(image, 0, 0, scaledWidth, scaledHeight);

            // Generate points for Delaunay triangulation
            const points = this.generatePoints(scaledWidth, scaledHeight);
            const indices = this.delaunay.triangulate(points);

            // Draw triangles
            this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.svgElement.setAttribute("width", ctxOutput.canvas.width);
            this.svgElement.setAttribute("height", ctxOutput.canvas.height);

            this.drawTriangles(points, indices, ctxOriginal, svg ? undefined: ctxOutput);

            if(svg){
                resolve(this.getSVGURL());
            }else {
                createObjectURLFromCanvas(outputCanvas, (url) => {
                    resolve(url);
                });
            }
        });
    }

    // Generate random points for triangulation
    generatePoints(width, height) {
        const points = [];
        const cellSize = this.size * 1.618 | 0; // Adjust cell size as needed for more/less detail

        for (let x = 0; x <= width; x += cellSize) {
            for (let y = 0; y <= height; y += cellSize) {
                points.push([x + Math.random() * cellSize, y + Math.random() * cellSize]);
            }
        }

        return points;
    }

    // Draw triangles based on Delaunay indices
    drawTriangles(points, indices, ctxOriginal, ctxOutput) {
        for (let i = 0; i < indices.length; i += 3) {
            const trianglePoints = [points[indices[i]], points[indices[i+1]], points[indices[i+2]]];
            const color = this.getAverageColor(trianglePoints, ctxOriginal);
            this.fillTriangle(trianglePoints, color, ctxOutput);
        }
    }

    // Get average color from triangle midpoint
    getAverageColor(points, ctx) {
        const [x, y] = points.reduce((acc, point) => [acc[0] + point[0], acc[1] + point[1]], [0, 0]).map(coord => coord / points.length);
        const {data} = ctx.getImageData(x, y, 1, 1);
        return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${(data[3]/255).toFixed(2)})`;
    }

    getSVGURL() {

        // Convert SVG to base64
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(this.svgElement);
        const base64SVG = 'data:image/svg+xml;base64,' + btoa(svgString);
        // Convert Base64 to ObjectUrl
        function dataURItoBlob(dataURI) {
            var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var binary = atob(dataURI.split(',')[1]);
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {type: mime});
        }
        return URL.createObjectURL(dataURItoBlob(base64SVG));
    }

    // Draw a filled triangle
    fillTriangle(points, color, ctx) {

        if(typeof ctx === "undefined"){
            const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygon.setAttribute("points", points.map(function (point){return point.join(" ")}).join(","));
            polygon.setAttribute("fill", color);
            polygon.setAttribute("stroke", color);
            polygon.setAttribute("stroke-width", 2);
            this.svgElement.appendChild(polygon);
        }else {
            ctx.beginPath();
            points.forEach((point, index) => {
                if (index === 0) ctx.moveTo(point[0], point[1]);
                else ctx.lineTo(point[0], point[1]);
            });
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.strokeWidth = 2;
            ctx.fill();
            ctx.stroke();
        }
    }
}

module.exports = PixelArtPolygonizer;