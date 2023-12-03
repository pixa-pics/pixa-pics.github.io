"use strict";

function sortByAngle(x, y, a, b) {
    const angleA = Math.atan2(a.y - y, a.x - x);
    const angleB = Math.atan2(b.y - y, b.x - x);
    if (angleA < angleB) {
        return -1;
    }
    if (angleA > angleB) {
        return 1;
    }
    return 0;
}
class Node {
    constructor(x, y, rgb, corners) {
        this.x = x;
        this.y = y;
        this.rgb = rgb;
        this.corners = corners
            ? corners.sort(sortByAngle.bind(null, x + 0.5, y + 0.5))
            : [];
    }
}
class Shape {
    constructor() {
        this.points = [];
    }
    addPoint(x, y, rgb, corners) {
        // We always add the top-left point in first to skip a step in the
        // computation of convex hull
        const p = new Node(x, y, rgb, corners);
        const first = this.points[0];
        if (!first || first.x <= p.x) {
            this.points.push(p);
        } else {
            this.points.unshift(p);
        }
    }
    corners() {
        return Array.prototype.concat(...this.points.map((n) => n.corners));
    }
    dump() {
        console.log(`Shape of ${this.points.length} points.`);
        for (let i = 0; i < this.points.length; ++i) {
            const p = this.points[i];
            console.log(
                `(${p.x}, ${p.y}) rgb: ${JSON.stringify(
                    p.rgb
                )} corners: ${JSON.stringify(p.corners)}`
            );
        }
    }
}
("use strict");
function bspline(t, degree, points, knots, weights, result) {
    var i, j, s, l; // function-scoped iteration variables
    var n = points.length; // points count
    var d = points[0].length; // point dimensionality

    if (degree < 1) throw new Error("degree must be at least 1 (linear)");
    if (degree > n - 1)
        throw new Error("degree must be less than or equal to point count - 1");
    if (!weights) {
        // build weight vector of length [n]
        weights = [];
        for (i = 0; i < n; i++) {
            weights[i] = 1;
        }
    }
    if (!knots) {
        // build knot vector of length [n + degree + 1]
        var knots = [];
        for (i = 0; i < n + degree + 1; i++) {
            knots[i] = i;
        }
    } else {
        if (knots.length !== n + degree + 1)
            throw new Error("bad knot vector length");
    }
    var domain = [degree, knots.length - 1 - degree];

    // remap t to the domain where the spline is defined
    var low = knots[domain[0]];
    var high = knots[domain[1]];
    t = t * (high - low) + low;
    if (t < low || t > high) throw new Error("out of bounds");

    // find s (the spline segment) for the [t] value provided
    for (s = domain[0]; s < domain[1]; s++) {
        if (t >= knots[s] && t <= knots[s + 1]) {
            break;
        }
    }

    // convert points to homogeneous coordinates
    var v = [];
    for (i = 0; i < n; i++) {
        v[i] = [];
        for (j = 0; j < d; j++) {
            v[i][j] = points[i][j] * weights[i];
        }
        v[i][d] = weights[i];
    }

    // l (level) goes from 1 to the curve degree + 1
    var alpha;
    for (l = 1; l <= degree + 1; l++) {
        // build level l of the pyramid
        for (i = s; i > s - degree - 1 + l; i--) {
            alpha = (t - knots[i]) / (knots[i + degree + 1 - l] - knots[i]);

            // interpolate each component
            for (j = 0; j < d + 1; j++) {
                v[i][j] = (1 - alpha) * v[i - 1][j] + alpha * v[i][j];
            }
        }
    }

    // convert back to cartesian and return
    var result = result || [];
    for (i = 0; i < d; i++) {
        result[i] = v[s][i] / v[s][d];
    }
    return result;
}
let degree = 2;
class Path {
    constructor() {
        this.cp = [];
    }
    append(x, y) {
        this.cp.push([x, y]);
    }
    static toSvgPath(controls, factor) {
        let cp = JSON.parse(JSON.stringify(controls));
        if (!cp.length) {
            return "";
        }
        if (cp.length === 2) {
            return this.toSvgPathLine(cp, factor);
        }
        let p = "";
        factor = factor || 1;
        let knots = [];
        if (
            cp[0][0] === cp[cp.length - 1][0] &&
            cp[0][1] === cp[cp.length - 1][1]
        ) {
            // closed
            cp.push(cp[1]);
            cp.push(cp[2]);
            cp.push(cp[3]);
            for (let i = 0; i < cp.length + degree + 1; ++i) {
                knots.push(i);
            }
            // knots = null;
        } else {
            // clamped
            cp.unshift(cp[0]);
            cp.push(cp[cp.length - 1]);
            for (let i = 0; i < cp.length - 1; ++i) {
                knots.push(i);
            }
            knots.unshift(0);
            knots.unshift(0);
            knots.push(cp.length - 1);
            knots.push(cp.length - 1);
        }
        let point = bspline(0, degree, cp, knots);
        p += `M${point[0] * factor},${point[1] * factor} `;
        for (let i = 0.001; i < 1; i += 0.001) {
            point = bspline(i, degree, cp, knots);
            p += `L${point[0] * factor},${point[1] * factor} `;
        }
        point = bspline(1, degree, cp, knots);
        p += `L${point[0] * factor},${point[1] * factor}`;
        return p;
    }
    static toSvgPathLine(cp, factor) {
        if (!cp.length) {
            return "";
        }
        let p = "";
        factor = factor || 1;
        if (cp.length > 1) {
            p += `M${cp[0][0] * factor},${cp[0][1] * factor} `;
            for (let i = 1; i < cp.length; ++i) {
                p += `L${cp[i][0] * factor},${cp[i][1] * factor} `;
            }
        }
        return p;
    }
    dump() {
        console.log(this.cp.map((n) => `(${n[0]}, ${n[1]}) `).join(" -> "));
    }
}
function findEdge(node, toId) {
    for (let i = 0; i < node.length; ++i) {
        if (node[i].nodeId === toId) {
            return i;
        }
    }
    return -1;
}
function findNodeIdx(nodes, nodeId) {
    for (let i = 0; i < nodes.length; ++i) {
        if (nodes[i].id === nodeId) {
            return i;
        }
    }
    return -1;
}
function findCorner(corners, x, y) {
    for (let i = 0; i < corners.length; ++i) {
        if (corners[i].x === x && corners[i].y === y) {
            return i;
        }
    }
    return -1;
}
function hasCorner(points, x, y) {
    for (let i = 0; i < points.length; ++i) {
        if (findCorner(points[i].corners, x, y) !== -1) {
            return true;
        }
    }
    return false;
}
let Id = 0;
class Graph {
    constructor(size, width, height) {
        this.id = ++Id;
        this.nodes = new Array(size);
        this.width = width;
        this.height = height;
        for (let i = 0; i < this.nodes.length; ++i) {
            const x = i % width;
            const y = Math.floor(i / width);
            this.nodes[i] = {
                id: i,
                edges: [],
                rgb: null,
                x: -1,
                y: -1,
                corners: [
                    {
                        x,
                        y
                    }
                ]
            };
            if (x < width) {
                this.nodes[i].corners.push({
                    x: x + 1,
                    y: y
                });
            }
            if (y < height) {
                this.nodes[i].corners.push({
                    x: x,
                    y: y + 1
                });
            }
            if (x < width && y < height) {
                this.nodes[i].corners.push({
                    x: x + 1,
                    y: y + 1
                });
            }
        }
    }
    makeGrid(width, height) {
        const { nodes } = this;
        for (let i = 0; i < nodes.length; ++i) {
            const x = i % (width + 1);
            const y = Math.floor(i / (width + 1));
            nodes[i].x = x;
            nodes[i].y = y;
            nodes[i].corners = [];
            if (x < width) {
                this.addEdge(i, i + 1, "right");
            }
            if (y < height) {
                this.addEdge(i, i + (width + 1), "down");
            }
        }
    }
    addNode(x, y) {
        let n = this.findNode(x, y);
        if (!n) {
            n = {
                id: this.nodes.length,
                edges: [],
                rgb: null,
                x,
                y,
                corners: []
            };
            this.nodes.push(n);
        }
        return n;
    }
    removeNode(nodeId) {
        const idx = findNodeIdx(this.nodes, nodeId);
        if (idx !== -1) {
            const node = this.nodes[idx];
            while (node.edges.length) {
                this.removeEdge(nodeId, node.edges[0].nodeId);
            }
            this.nodes.splice(idx, 1);
        }
    }
    findNode(x, y) {
        for (let i = 0; i < this.nodes.length; ++i) {
            if (this.nodes[i].x === x && this.nodes[i].y === y) {
                return this.nodes[i];
            }
        }
        return null;
    }
    getNode(nodeId) {
        for (let i = 0; i < this.nodes.length; ++i) {
            if (this.nodes[i].id === nodeId) {
                return this.nodes[i];
            }
        }
        return null;
    }
    addEdge(fromId, toId, dir, data) {
        const fromNode = this.getNode(fromId);
        const toNode = this.getNode(toId);
        if (fromNode && findEdge(fromNode.edges, toId) === -1) {
            fromNode.edges.push({
                nodeId: toId,
                dir,
                data
            });
        }
        if (toNode && findEdge(toNode.edges, fromId) === -1) {
            const invert = (dir) => {
                if (dir === "up") return "down";
                if (dir === "down") return "up";
                if (dir === "left") return "right";
                if (dir === "right") return "left";
                if (dir === "upright") return "downleft";
                if (dir === "upleft") return "downright";
                if (dir === "downleft") return "upright";
                if (dir === "downright") return "upleft";
            };
            toNode.edges.push({
                nodeId: fromId,
                dir: invert(dir),
                data
            });
        }
    }
    removeEdge(fromId, toId) {
        const fromNode = this.getNode(fromId);
        const toNode = this.getNode(toId);
        if (fromNode) {
            const idx = findEdge(fromNode.edges, toId);
            if (idx !== -1) {
                fromNode.edges.splice(idx, 1);
            }
        }
        if (toNode) {
            const idx = findEdge(toNode.edges, fromId);
            if (idx !== -1) {
                toNode.edges.splice(idx, 1);
            }
        }
    }
    hasEdge(fromId, toId) {
        const fromNode = this.getNode(fromId);
        return fromNode && findEdge(fromNode.edges, toId) !== -1;
    }
    removeCorner(nodeId, x, y) {
        const node = this.getNode(nodeId);
        if (node) {
            const idx = findCorner(node.corners, x, y);
            console.log(
                `removing corner from (${node.x}, ${
                    node.y
                })  -> (${x}, ${y})   ${JSON.stringify(node.corners)}`
            );
            if (idx !== -1) {
                console.log("remove corner ok");
                node.corners.splice(idx, 1);
            } else {
                console.log("corner not found");
            }
        }
    }
    addCorner(nodeId, x, y) {
        const node = this.getNode(nodeId);
        if (node) {
            console.log(`Adding corner to (${node.x}, ${node.y})  -> (${x}, ${y})`);
            if (findCorner(node.corners, x, y) === -1) {
                console.log("add corner ok");
                node.corners.push({
                    x,
                    y
                });
            }
        }
    }
    shapes() {
        const nodes = this.nodes;
        const shapes = [];
        const seen = [];
        for (let i = 0; i < nodes.length; ++i) {
            const node = nodes[i];
            if (seen.indexOf(node.id) !== -1) {
                continue;
            }
            const shape = new Shape();
            const stack = [node.id];
            seen.push(node.id);
            shape.addPoint(node.x, node.y, node.rgb, node.corners);
            while (stack.length) {
                const id = stack.pop();
                const n = nodes[id];
                for (let j = 0; j < n.edges.length; ++j) {
                    const edgeId = n.edges[j].nodeId;
                    const edgeNode = this.getNode(edgeId);
                    if (seen.indexOf(edgeId) === -1) {
                        stack.push(edgeId);
                        seen.push(edgeId);
                        shape.addPoint(
                            edgeNode.x,
                            edgeNode.y,
                            edgeNode.rgb,
                            edgeNode.corners
                        );
                    }
                }
            }
            console.log(`pushing shape of ${shape.points.length} points`);
            shapes.push(shape);
        }
        console.log(`there is ${shapes.length} shapes`);
        console.log(`there is ${JSON.stringify(shapes, null, 1)} shapes`);
        return shapes;
    }
    subgraph(points) {
        const sg = new Graph(0, this.width, this.height);
        for (let i = 0; i < this.nodes.length; ++i) {
            const { x, y } = this.nodes[i];
            if (hasCorner(points, x, y)) {
                sg.addNode(x, y);
            }
        }
        for (let i = 0; i < sg.nodes.length; ++i) {
            const { id, x, y } = sg.nodes[i];
            const n = this.findNode(x, y);
            for (let j = 0; j < n.edges.length; ++j) {
                const e = n.edges[j];
                const dest = this.getNode(e.nodeId);
                const sgNode = sg.findNode(dest.x, dest.y);
                if (sgNode) {
                    sg.addEdge(id, sgNode.id, e.dir, e.data);
                }
            }
        }
        return sg;
    }
    serialize() {
        // for (let i = 0; i < this.nodes.length; ++i) {
        //   console.log(`Node ${i}`);
        //   for (let j = 0; j < this.nodes[i].edges.length; ++j) {
        //     const node = this.nodes[i].edges[j];
        //     console.log(`  Edge -> ${node.nodeId} ${node.data ? `(${JSON.stringify(node.data)})` : ''}`);
        //   }
        // }

        return JSON.stringify({
            nodes: this.nodes,
            width: this.width,
            height: this.height
        });
    }
    static unserialize(data) {
        const d = JSON.parse(data);
        const g = new Graph(d.nodes.length, d.width, d.height);
        g.nodes = d.nodes;
        return g;
    }
}
function toSvgPath(p) {}
function toSvg(graph) {
    console.log(graph.shapes())
    const paths = graph.shapes();
    return `<svg>${paths.map((p) => toSvgPath(p))}</svg>`;
}
let steps = [
    {
        title: "Generating similarity graph",
        progress: 0
    },
    {
        title: "Removing dissimilar connected pixels",
        progress: 0
    },
    {
        title: "Resolving ambiguous diagonals",
        progress: 0
    },
    {
        title: "Computing reshaped graph",
        progress: 0
    },
    {
        title: "Isolating visible edges",
        progress: 0
    }
];
let done = false;
const Progressor = {};
Progressor.reset = () => {
    for (let i = 0; i < steps.length; ++i) {
        steps[i].progress = 0;
    }
    done = false;
};
Progressor.progress = (step, percent) => {
    if (steps[step]) {
        steps[step].progress = percent;
    }
};
Progressor.done = () => {
    for (let i = 0; i < steps.length; ++i) {
        steps[i].progress = 100;
    }
    done = true;
};
Progressor.getProgression = () => {
    let p = 0;
    let title = null;
    for (let i = 0; i < steps.length; ++i) {
        p += steps[i].progress;
        if (!title && steps[i].progress !== 100) {
            title = steps[i].title;
        }
    }
    const total = Math.floor(p / steps.length);
    return {
        title: total === 100 ? "Finalizing..." : title || steps[0].title,
        percent: total,
        complete: done
    };
};
function pathToSvg(paths, width, height, f) {
    const factor = f || 1;
    const svgPaths = [];
    for (let i = 0; i < paths.length; ++i) {
        const p = paths[i];
        console.log(`rendering path ${JSON.stringify(p)}`);
        // svgPaths.push(<path d={Path.toSvgPathLine(p, factor)} key={'pathline' + i} fill="transparent" stroke="grey" />);
        svgPaths.push(
            `<path d="${Path.toSvgPath(
                p,
                factor
            )}" key="path-${i}* fill="transparent" stroke="black" />`
        );
    }
    for (let i = 0; i < paths.length; ++i) {
        const p = paths[i];
        for (let j = 0; j < p.length; ++j) {
            const c = p[j];

            // svgPaths.push(<circle cx={c[0] * factor} cy={c[1] * factor} r={2} key={'circ-' + i + '-' + j} fill="red" />);
        }
    }

    return `<svg viewBox="0 0 ${width} ${height}">${svgPaths.join("")}</svg>`;
}
function saveToSvg(svgEl, name) {
    var svgData = svgEl;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {
        type: "image/svg+xml;charset=utf-8"
    });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    if (document.body) {
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
    if (document.body) {
        document.body.removeChild(downloadLink);
    }
}

function processImage(binaryData, width, height) {
    const graph = createSimilarityGraph(binaryData, width, height);
    removeDissimilarConnectedPixels(graph);

    removeDiagonals(graph, width, height);


    const reshapedGraph = reshape(graph, width, height);


    const serializedReshape = reshapedGraph.serialize();

    const reshapeCopy = Graph.unserialize(serializedReshape);
    const outlines = getVisibleEdgesGraph(reshapeCopy, graph);
    //const paths = createShapePath(outlines);

    // post({
    //   type: 'step',
    //   data: {
    //     type: 'svg',
    //     graph: outlines.serialize()
    //   }
    // });

    // post({
    //   type: 'step',
    //   data: {
    //     type: 'shapes',
    //     graph: outlines.serialize()
    //   }
    // });

    var shapes = Graph.unserialize(outlines.serialize()).shapes();
    console.log(shapes)
    var svgPaths = shapes.map(s => s.svg()).join("\n")
    var finalSVG = `<svg viewBox="0 0 ${width}pt ${height}pt">${svgPaths}</svg>`;
    saveToSvg(finalSVG, "test.svg");
    return finalSVG;
}
module.export = {
    Node: Node,
    Graph: Graph,
    Path: Path,
    Shape: Shape,
    toSvg: toSvg
};
