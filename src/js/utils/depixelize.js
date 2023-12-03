// -*- Mode: javascript; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2-*-
var depixel = (function() {
    "use strict";

    class Color {
        constructor([r, g, b]) {
            var y = 0.299 * r + 0.587 * g + 0.114 * b;
            this.y = Math.round(y);
            this.u = Math.round(0.492 * (b - y));
            this.v = Math.round(0.877 * (r - y));
            return this;
        }

        get rgb() {
            var {y, u, v} = this;
            var r = y + 1.140 * v;
            var g = y - 0.394 * u - 0.581 * v;
            var b = y + 2.032 * u;
            return [r, g, b].map(Math.round);
        }

        dissimilar(color) {
            return Math.abs(this.y - color.y) > 48
                || Math.abs(this.u - color.u) > 7
                || Math.abs(this.v - color.v) > 6;
        }

        toString() {
            return 'rgb(' + this.rgb.join() + ')';
        }
    }

    class Vertex {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.edges = [];
            return this;
        }

        split(v) {
            return new Vertex((this.x + v.x) / 2, (this.y + v.y) / 2);
        }

        adjust(x, y) {
            this.x += x;
            this.y += y;
            return this;
        }

        clone() {
            return new Vertex(this.x, this.y);
        }

        equals(other) {
            return this.x === other.x && this.y === other.y;
        }

        addEdge(other) {
            if (this.edges.indexOf(other) != -1) {
                return;
            }

            this.edges.push(other);
            other.addEdge(this);
        }
    }

    class Curve extends Array {
        constructor(node) {
            super(1);
            this[0] = node;
            this.circular = false;
            return this;
        }

        splitAt(node) {
            if (this.length === 1) {
                return;
            }

            if (this[0] === node) {
                this.shift();
            } else if (this[this.length - 1] === node) {
                this.pop();
            } else if (this.circular) {
                for (let other = this.shift(); other !== node; other = this.shift()) {
                    this.push(other);
                }
            } else {
                let index = this.indexOf(node);
                let tail = this.slice(index + 1);
                for (let other of tail) {
                    other.curve = tail;
                }
                this.length = index;
            }

            node.curve = new Curve(node);
        }

        merge(curve) {
            if (this === curve) {
                this.circular = curve.length > 2;
                return;
            }

            let [discard, keep] = [this, curve].sort(({length:a},{length:b}) => a - b);

            let popfn, pushfn;

            if (keep[0].edges.indexOf(discard[0]) !== -1) {
                popfn = this.shift;
                pushfn = this.unshift;
            } else if (keep[0].edges.indexOf(discard[discard.length - 1]) !== -1) {
                popfn = this.pop;
                pushfn = this.unshift;
            } else if (keep[keep.length - 1].edges.indexOf(discard[0]) !== -1) {
                popfn = this.shift;
                pushfn = this.push;
            } else if (keep[keep.length - 1].edges.indexOf(discard[discard.length - 1]) !== -1) {
                popfn = this.pop;
                pushfn = this.push;
            }

            while (discard.length) {
                let node = popfn.call(discard);
                pushfn.call(keep, node);
                node.curve = keep;
            }

        }

        static curve(m, n) {
            return (m.curve === n.curve) ? m.curve.length : 0;
        }
    }

    class Node {
        constructor(x, y, color, vertices) {
            this.x = x || 0;
            this.y = y || 0;
            this.edges = new Array(8);
            this.vertices = vertices || [];
            this.color = color || new Color([0, 0, 0]);
            this.marked = false;
            this.curve = new Curve(this);
            return this;
        }

        colorDissimilar(){
            return this.color.dissimilar.bind(this.color)
        }
        curveSplitAt(){
            return this.curve.splitAt.bind(this.curve);
        }
        curveMerge(){
            return this.curve.merge.bind(this.curve)
        }

        relativePosition({x, y}) {
            let dy = y - this.y;
            let dx = x - this.x;
            return (dx + dy * 3 + 8) % 9;
        }

        static addSimilarEdge(m, n) {
            if (m.color && n.color && !m.colorDissimilar(n.color)) {
                m.edges[m.relativePosition(n)] = n;
                n.edges[n.relativePosition(m)] = m;

                if (m.valence() > 2) {
                    m.curveSplitAt(m);
                }

                if (n.valence() > 2) {
                    n.curveSplitAt(n);
                }

                if (m.valence() < 3 && n.valence() < 3) {
                    m.curveMerge(n.curve);
                }

            }
        }

        invalidCurve() {
            return this.valence() > 2 && this.curve.length > 1;
        }

        updateCurves() {
            if (this.valence() > 2) {
                this.curveSplitAt(this);
            }
        }

        equals(node) {
            return this.x === node.x && this.y === node.y;
        }

        static removeEdge(m, n) {
            m.edges[m.relativePosition(n)] = undefined;
            n.edges[n.relativePosition(m)] = undefined;
        }

        removeEdge(node) {
            Node.removeEdge(this, node);
        }

        canReach(node) {
            return node && !!this.edges[this.relativePosition(node)];
        }

        valence() {
            return this.edges.filter(x => x).length
        }

        toString() {
            var str = "(" + [this.x, this.y].join() + ") => ";
            var edges = this.edges.filter(x => x).map(function (n) { return "(" + [n.x, n.y].join() + ")"; });
            return str + edges.join();
        }

        edge(dx, dy) {
            return this.edges[(dx + dy * 3 + 8) % 9];
        }

        right() {
            return this.edges[0];
        }

        left() {
            return this.edges[7];
        }

        up() {
            return this.edges[5];
        }

        down() {
            return this.edges[2];
        }

        isEdge() {
            return this.edges.filter(x => x).length < 4;
        }

        * follow(node) {
            var begin = this;

            while (begin.canReach(node) && begin.valence() < 3) {
                yield node;

                if (node.valence() > 2) {
                    break;
                }

                let edges = node.edges.filter(x => x);
                var next = edges[0] != begin ? edges[0] : edges[1];
                begin = node;
                node = next;

                if (node == this) {
                    break;
                }
            }
        }

        square() {
            var edges = this.edges;
            let [right, , down] = edges;
            let diagonal = right && down && right.down() && down.right();
            return [this, right, down, diagonal].filter(x => x);
        }
    }

    class Graph {
        constructor(pixels, x, y) {
            if (pixels.length != x * y * 4) {
                throw new Error("Wrong dimension of pixel buffer");
            }

            this.width = x;
            this.height = y;
            this.pixels = pixels;
            return this;
        }

        * create() {
            const x = this.width;
            const y = this.height;

            var nodes = new Array(y);
            var vertices = new Array(y + 1);
            vertices[0] = new Array(x + 1);

            for (var i = 0; i < x + 1; ++i) {
                vertices[0][i] = new Vertex(i, 0);
            }

            const dissimilarNode = new Node();
            let seen = new Array(x).fill(dissimilarNode);

            for (var i = 0; i < y; ++i) {
                let previous = [dissimilarNode, dissimilarNode];
                let line = nodes[i] = new Array(x);
                let top = vertices[i];
                let bottom = vertices[i + 1] = new Array(x + 1);
                bottom[0] = new Vertex(0, i + 1);
                for (var j = 0; j < x; ++j) {
                    bottom[j + 1] = new Vertex(j + 1, i + 1);

                    var nodeVertices = [top[j], top[j + 1], bottom[j + 1], bottom[j]];
                    var node = line[j] = new Node(j, i, this.pixel(j, i), nodeVertices);

                    let current = [seen[j], node];
                    yield [previous, current];
                    previous = current;
                }
                seen = line;
            }

            this.nodes_old = nodes;
            this.vertices = nodes;
        }

        createSimilarityGraph() {
            for (let [[a, b], [c, d]] of this.create()) {
                Node.addSimilarEdge(c, d);
                Node.addSimilarEdge(b, d);

                if (a.square().length !== 4) {
                    Node.addSimilarEdge(c, b);
                    Node.addSimilarEdge(a, d);
                }
            }

            return this;
        }

        graph() {
            const height = this.height;
            const witdth = this.width;


        }

        * nodes() {
            var x, y;
            let {width, height, nodes_old: nodes } = this;

            for (y=0; y < height; ++y) {
                for (x=0; x < width; ++x) {
                    yield nodes[y][x];
                }
            }
        }

        * diagonals() {
            var x, y, line0, line1;
            let {width, height, nodes_old: nodes } = this;
            for (y=1; y < height; ++y) {
                line0 = nodes[y - 1];
                line1 = nodes[y];
                for (x=1; x < width; ++x) {
                    let n0 = line0[x - 1];
                    let n1 = line0[x];
                    let n2 = line1[x - 1];
                    let n3 = line1[x];

                    if (n0.canReach(n1) ||
                        n0.canReach(n2) ||
                        n3.canReach(n1) ||
                        n3.canReach(n2)) {
                        continue;
                    }

                    if (n0.canReach(n3) && n1.canReach(n2)) {
                        yield [[n0, n3], [n2, n1]];
                    }
                }
            }
        }

        pixel(x, y) {
            let i = y * this.width * 4 + x * 4;
            return new Color(this.pixels.subarray(i, i + 3));
        }
    }

    Graph.diagonals = function diagonals(diags) {
        var p = diags[0][0].canReach(diags[0][1]);
        var q = diags[1][0].canReach(diags[1][1]);
        return p + q;
    };

    var createNeighborAccessor = function(x, y) {
        var offsetX = x;
        var offsetY = y;
        return function(nodes, x, y) {
            return [nodes[y][x], nodes[y + offsetY][x + offsetX]];
        };
    };

    var down = createNeighborAccessor(0,1);
    var right = createNeighborAccessor(1,0);
    var slant = createNeighborAccessor(1,1);
    var rise = createNeighborAccessor(1,-1);

    var neighbours = [down, right];

    function getSquare(nodes, x, y) {
        return [down(nodes, x, y), right(nodes, x, y), down(nodes, x+1, y), right(nodes, x, y+1)];
    };

    function getRect(nodes, x, y, w, h) {
        var rect = new Array(h);
        for (var i = 0; i < h; ++i) {
            rect[i] = nodes[i + y].slice(x, x + w);
        }
        return rect;
    };

    Graph.prototype.getDiagonals = function getDiagonals(x, y) {
        return [slant(this.nodes_old, x, y), rise(this.nodes_old, x, y+1)];
    };

    var reach = function(args) {
        return args[0].canReach(args[1]);
    };

    var add = function(args) {
        Node.addSimilarEdge(args[0], args[1])
    };

    var id = function id(x) {
        return x;
    };

    var not = function not(x) {
        return !x;
    };

    var getConnected = function getConnected(xmin, xmax, ymin, ymax) {
        var x0 = xmin;
        var x1 = xmax;
        var y0 = ymin;
        var y1 = ymax;
        return function(nodes) {
            var nodes = nodes[0].edges.filter(x => x);
            var connected = [];
            while (nodes.length > 0) {
                var node = nodes.pop();
                if (connected.indexOf(node) == -1) {
                    if (node.x > xmin && node.x < xmax && node.y > ymin && node.y < ymax) {
                        connected.push(node);
                        nodes = nodes.concat(node.edges.filter(x => x));
                    }
                }
            }
            return connected;
        }
    };

    Graph.prototype.linearize = function linearize() {
        for (var x = 1; x < this.width; ++x) {
            for (var y = 1; y < this.height; ++y) {
                var square = getSquare(this.nodes_old, x - 1, y - 1).map(reach);
                if (square.every(not)) {
                    var diagonals = this.getDiagonals(x - 1, y - 1);
                    var heuristics = [0, 0];
                    var connecteds = diagonals.map(getConnected(x - 3, x + 2, y - 3, y + 2));

                    var curves = diagonals.map(function(nodes) { return Curve.curve(nodes[0], nodes[1])});
                    var lengthHeuristic = curves[0] - curves[1];
                    if (lengthHeuristic > 0) {
                        heuristics[0] += lengthHeuristic;
                    } else {
                        heuristics[1] -= lengthHeuristic;
                    }

                    var connectedHeuristic = connecteds[0].length - connecteds[1].length;
                    if (connectedHeuristic > 0) {
                        heuristics[1] += connectedHeuristic;
                    } else {
                        heuristics[0] -= connectedHeuristic;
                    }

                    var islands = diagonals.map(function (v) {
                        return v[0].valence() == 1 || v[1].valence() == 1;
                    });

                    if (islands[0] && !islands[1]) {
                        heuristics[0] += 5;
                    } else if (!islands[0] && islands[1]) {
                        heuristics[1] += 5;
                    }

                    if (heuristics[0] > heuristics[1]) {
                        Node.removeEdge(diagonals[1][0], diagonals[1][1]);
                    } else if (heuristics[0] < heuristics[1]) {
                        Node.removeEdge(diagonals[0][0], diagonals[0][1]);
                    } else {
                        Node.removeEdge(diagonals[0][0], diagonals[0][1]);
                        Node.removeEdge(diagonals[1][0], diagonals[1][1]);
                    }
                }
            }
        }

        return this;
    };

    var reshape = function reshape(rect) {
        var node = rect[0][1];
        if (node.edge(-1, 1)) {
            var vertices = node.vertices;
            var v1 = vertices[3];
            var v2 = v1.clone();

            if (!node.down()) {
                v1.adjust(0.25, 0.25);
            }

            if (!node.left()) {
                v2.adjust(-0.25, -0.25);
            }

            // This is important. We need to keep the order of
            // vertices somewhat similar to before reshaping.
            rect[0][0].vertices[2] = v2;
            vertices.splice(4, 0, v2);
            vertices = rect[1][0].vertices;
            v2 = vertices.splice(0,1,v2).pop();
            vertices.push(v2);
        }

        if (node.edge(1,1)) {
            var vertices = node.vertices;
            var v1 = vertices[2];
            var v2 = v1.clone();

            if (!node.down()) {
                v1.adjust(-0.25, 0.25);
            }

            if (!node.right()) {
                v2.adjust(0.25, -0.25);
            }

            // This is important. We need to keep the order of
            // vertices somewhat similar to before reshaping.
            rect[0][2].vertices[3] = v2;
            vertices.splice(2, 0, v2);
            vertices = rect[1][2].vertices;
            v2 = vertices.splice(0,1,v2).pop();
            vertices.push(v2);
        }
    };

    Graph.prototype.createVoronoiDiagram = function createVoronoiDiagram() {
        var w = this.width - 2;
        var h = this.height - 1;
        var nodes = this.nodes_old;

        for (var y = 0; y < h; ++y) {
            var rect = getRect(nodes, 0, y, 2, 2);
            rect[0].unshift(new Node());
            rect[1].unshift(new Node());
            reshape(rect);

            for (var x = 0; x < w; ++x) {
                reshape(getRect(nodes, x, y, 3, 2));
            }

            rect = getRect(nodes, x, y, 2, 2);
            rect[0].push(new Node());
            rect[1].push(new Node());
            reshape(rect);
        }

        return this;
    };

    function connectVertices(vertices) {
        var l = vertices.length;
        vertices.forEach(function (e, i, a) {
            e.addEdge(a[(i+1) % l]);
        });
        return vertices;
    }

    Graph.prototype.contour = function contour(startNode) {
        var UP = 0;
        var UP_RIGHT = 1;
        var RIGHT = 2;
        var DOWN_RIGHT = 3;
        var DOWN = 4;
        var DOWN_LEFT = 5;
        var LEFT = 6;
        var UP_LEFT = 7;

        var current = startNode;
        var vertices = [];
        var start;
        var next;

        var up, right, down, left;

        if (current.valence() === 0) {
            return current.vertices.slice();
        }

        if (current.marked || !current.isEdge() || [[-1,-1],[0,-1],[1,-1]].some(function (e) {
            return this.edge.apply(this, e) != undefined;
        }, current)) {
            return vertices;
        }

        var marked = [];

        var heading = UP_RIGHT;
        var vertex = 0;
        var currentVertex;
        var startVertex = current.vertices[0];
        var previous = null;

        while (true) {
            current.marked = true;
            marked.push(current);

            next = undefined;
            switch (heading) {
                case UP_RIGHT:
                    next = current.edge(1,-1);
                    if (next) {
                        heading = UP_LEFT;
                        break;
                    }
                case RIGHT:
                    next = current.edge(1,0);
                    if (next) {
                        heading = UP;
                        break;
                    }
                case DOWN_RIGHT:
                    next = current.edge(1,1);
                    if (next) {
                        heading = UP_RIGHT;
                        break;
                    }
                case DOWN:
                    next = current.edge(0,1);
                    if (next) {
                        heading = RIGHT;
                        break;
                    }
                case DOWN_LEFT:
                    next = current.edge(-1,1);
                    if (next) {
                        heading = DOWN_RIGHT;
                        break;
                    }
                case LEFT:
                    next = current.edge(-1,0);
                    if (next) {
                        heading = DOWN;
                        break;
                    }
                case UP_LEFT:
                    next = current.edge(-1,-1);
                    if (next) {
                        heading = DOWN_LEFT;
                        break;
                    }
                case UP:
                    next = current.edge(0,-1);
                    if (next) {
                        heading = LEFT;
                    } else {
                        heading = UP_RIGHT;
                    }
                    break;
            }

            if (!next) {
                continue;
            }

            // add every vertex of current node from 'vertex' to the first common vertex in current node and next node
            var i = vertex, ilen = current.vertices.length;

            if (previous && next.equals(previous)) {
                currentVertex = current.vertices[i++ % ilen];
                vertices.push(currentVertex);
            }

            while (true) {
                currentVertex = current.vertices[i++ % ilen];
                var j = next.vertices.indexOf(currentVertex);

                if (j != -1) {
                    vertex = j;
                    break;
                }

                vertices.push(currentVertex);
            }

            if (startNode.equals(next) && startNode.edges.filter(x => x).every(function (e) { return e.marked || !e.isEdge(); })) {
                i = vertex;
                ilen = next.vertices.length;
                while (i < ilen) {
                    currentVertex = next.vertices[i++];
                    vertices.push(currentVertex);
                }
                break;
            }

            previous = current;
            current = next;
        }

        while (marked.length != 0) {
            var mark = marked.pop();
            var unmarkedNeighbors = mark.edges.filter(function (e) { return e && !e.marked; });
            unmarkedNeighbors.forEach(function (e) { e.marked = true });
            marked.push.apply(marked, unmarkedNeighbors);
        }

        return vertices;
    };

    function Path() {
        this.vertices = [];
    };

    Path.prototype = Object.create(null, {
        push : { enumerable : false, value : function push(v) {
                this.vertices.push(v);
                v.addPath(this);
            }},
        splitAt : { enumerable : false, value : function splitAt(i) {
                var p = new Path();
                p.vertices = this.vertices.slice(i);
                this.vertices.length = i + 1;
                p.vertices.forEach(function (v) {
                //v.removePath(this);
                v.addPath(p);
                });
            }},
    });

    Graph.prototype.paths = function paths(contour) {
        var p = new Path();


    }

    return function depixel(data, width, height) {
        var graph = new Graph(data, width, height);
        return graph;
    };
})();

// -*- Mode: javascript; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*-
function drawCanvas(graph, scale, reshaped, similar) {
    var width = graph.width;
    var height = graph.height;
    var nodes = graph.nodes();
    var canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    var context = canvas.getContext('2d');
    context.strokeStyle = "black";

    for (let node of nodes) {
        var stroke_color = 'rgba(255,75,75,255)';
        context.strokeStyle = "" + stroke_color;
        context.fillStyle = "" + node.color;
        var vertices = node.vertices;
        context.beginPath();
        var v = vertices[0];
        context.moveTo(v.x * scale, v.y * scale);
        for (var i = 1; i < vertices.length; ++i) {
            v = vertices[i];
            context.lineTo(v.x * scale, v.y * scale);
        }
        context.closePath();
        context.fill();
        if (reshaped) {
            context.stroke();
        }
        var half_scale = scale / 2;
        stroke_color = 'rgba(0,200,0,255)';
        context.strokeStyle = "" + stroke_color;
        context.beginPath();
        var x = node.x * scale + half_scale;
        var y = node.y * scale + half_scale;

        for (let n of node.edges.filter(x => x)) {
            context.moveTo(x, y);
            context.lineTo(n.x * scale + half_scale, n.y * scale + half_scale);
        }
        context.closePath();
        if (similar) {
            context.stroke();
        }
    }

    return canvas;
}

function createEmptyCanvas(graph, scale) {
    var width = graph.width;
    var height = graph.height;
    var canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;

    return canvas;
}

function drawContour(canvas, vertices, color, scale) {
    var context = canvas.getContext('2d');
    context.strokeStyle = "black";

    var stroke_color = 'rgba(255,75,75,255)';
    context.strokeStyle = "" + stroke_color;
    context.fillStyle = "" + color;
    context.beginPath();
    var v = vertices[0];
    context.moveTo(v.x * scale, v.y * scale);
    for (var i = 1; i < vertices.length; ++i) {
        v = vertices[i];
        context.lineTo(v.x * scale, v.y * scale);
    }
    context.closePath();
    context.fill();

    return canvas;
}

function createCanvas(graph, scale) {
    graph.createVoronoiDiagram();
    var canvas = createEmptyCanvas(graph, scale);
    for (let node of graph.nodes()) {
        var vertices = graph.contour(node);
        if (vertices.length > 0) {
            drawContour(canvas, vertices, node.color, scale)
        }
    }
    return canvas;
}

export function run(imagedata){

    var canvas = createCanvas(depixel(imagedata.data, imagedata.width, imagedata.height).createSimilarityGraph(), 10);
    console.log(canvas.toDataURL())
    return canvas.toDataURL("image/png");
}