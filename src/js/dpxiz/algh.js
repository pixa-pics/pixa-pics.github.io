class Point {
    constructor(value) {
        if (Array.isArray(value) && value.length === 2) {
            this.value = { real: value[0], imag: value[1] };
        } else if (value instanceof Point) {
            this.value = { ...value.value };
        } else if (typeof value === 'object' && 'real' in value && 'imag' in value) {
            this.value = { ...value };
        } else {
            throw new Error('Invalid input for Point');
        }
    }

    get x() {
        return this.value.real;
    }

    get y() {
        return this.value.imag;
    }

    get tuple() {
        return [this.x, this.y];
    }

    _op(op, other) {
        if (other instanceof Point) {
            other = other.value;
        }

        switch (op) {
            case 'add':
                return new Point({
                    real: this.value.real + other.real,
                    imag: this.value.imag + other.imag
                });
            case 'sub':
                return new Point({
                    real: this.value.real - other.real,
                    imag: this.value.imag - other.imag
                });
            case 'mul':
                // Complex multiplication
                return new Point({
                    real: this.value.real * other.real - this.value.imag * other.imag,
                    imag: this.value.real * other.imag + this.value.imag * other.real
                });
            case 'div':
                // Complex division
                let denom = other.real * other.real + other.imag * other.imag;
                return new Point({
                    real: (this.value.real * other.real + this.value.imag * other.imag) / denom,
                    imag: (this.value.imag * other.real - this.value.real * other.imag) / denom
                });
            default:
                throw new Error('Invalid operation');
        }
    }

    equals(other) {
        try {
            other = new Point(other).value;
        } catch (e) {
            return false;
        }
        return this.value.real === other.real && this.value.imag === other.imag;
    }

    add(other) {
        return this._op('add', new Point(other).value);
    }

    subtract(other) {
        return this._op('sub', new Point(other).value);
    }

    multiply(other) {
        return this._op('mul', new Point(other).value);
    }

    divide(other) {
        return this._op('div', new Point(other).value);
    }

    abs() {
        return Math.sqrt(this.value.real * this.value.real + this.value.imag * this.value.imag);
    }

    round(places = 5) {
        return new Point({
            real: parseFloat(this.value.real.toFixed(places)),
            imag: parseFloat(this.value.imag.toFixed(places))
        });
    }
}

class Graph {
    constructor() {
        this.nodes = new Map();  // Key: node, Value: Set of neighbor nodes
    }

    addNode(node) {
        if (!this.nodes.has(node)) {
            this.nodes.set(node, new Set());
        }
    }

    addEdge(node1, node2) {
        this.addNode(node1);
        this.addNode(node2);
        this.nodes.get(node1).add(node2);
        this.nodes.get(node2).add(node1);  // If the graph is undirected
    }

    neighbors(node) {
        return this.nodes.get(node) || new Set();
    }

    // Additional methods for removing nodes, edges, etc., can be added as needed
}

// Import necessary dependencies and classes
// Assuming the Point class and necessary math functions are already defined or imported

class SplineSmoother {
    // Constants for optimization
    static INTERVALS_PER_SPAN = 20;
    static POINT_GUESSES = 20;
    static GUESS_OFFSET = 0.05;
    static ITERATIONS = 20;
    static POSITIONAL_ENERGY_MULTIPLIER = 1;

    constructor(spline) {
        // Initialization and storing the spline
        this.orig = spline;
        this.spline = spline.copy(); // Assuming a copy method exists
    }

    E_C(index) {
        // Energy due to curvature
        return this.spline.energyC(index, SplineSmoother.INTERVALS_PER_SPAN);
    }

    E_P(index) {
        // Energy due to change in position
        const orig = this.orig.points[index];
        const point = this.spline.points[index];
        const ePositional = Math.pow(Math.abs(point.subtract(orig)), 4);
        return ePositional * SplineSmoother.POSITIONAL_ENERGY_MULTIPLIER;
    }

    pointEnergy(index) {
        // Total energy of a point
        const E1 = this.E_C(index);
        const E2 = this.E_P(index);
        return E1 + E2;
    }

    rand() {
        // A random offset generator
        const offset = Math.random() * SplineSmoother.GUESS_OFFSET;
        const angle = Math.random() * 2 * Math.PI;
        return new Point([Math.cos(angle), Math.sin(angle)]).multiply(offset);
    }

    smoothPoint(index, start) {
        // Optimizing the position of a point
        const energies = [[this.pointEnergy(index), start]];
        for (let i = 0; i < SplineSmoother.POINT_GUESSES; i++) {
            const point = start.add(this.rand());
            this.spline.move(index, point);
            energies.push([this.pointEnergy(index), point]);
        }
        const minEnergyPoint = energies.reduce((a, b) => (a[0] < b[0] ? a : b))[1];
        this.spline.move(index, minEnergyPoint);
    }

    smooth() {
        // Smoothing the spline
        for (let it = 0; it < SplineSmoother.ITERATIONS; it++) {
            this.spline.usefulPoints.forEach((point, i) => {
                this.smoothPoint(i, point);
            });
        }
    }
}

function smoothSpline(spline) {
    // External function to create an instance of the optimizer
    const smoother = new SplineSmoother(spline);
    smoother.smooth();
    return smoother.spline;
}

class Shape {
    constructor(pixels, value, corners) {
        this.pixels = pixels;
        this.value = value;
        this.corners = corners;
        this._outsidePath = null;
        this._insidePaths = [];
    }

    // Getter methods for paths, splines, and smooth_splines
    getPaths() {
        let paths = this._outsidePath ? [this._outsidePath.path.slice().reverse()] : [];
        for (let path of this._insidePaths) {
            paths.push([...path.path]);
        }
        return paths;
    }

    getSplines() {
        let splines = this._outsidePath ? [this._outsidePath.spline.reversed()] : [];
        for (let path of this._insidePaths) {
            splines.push(path.spline);
        }
        return splines;
    }

    getSmoothSplines() {
        let smoothSplines = this._outsidePath ? [this._outsidePath.smooth.reversed()] : [];
        for (let path of this._insidePaths) {
            smoothSplines.push(path.smooth);
        }
        return smoothSplines;
    }

    addOutline(path, outside = false) {
        if (outside) {
            this._outsidePath = path;
        } else {
            this._insidePaths.push(path);
        }
        if (!path.shapes) {
            path.shapes = new Set();
        }
        path.shapes.add(this);
    }
}

class BSpline {
    constructor(knotVector, points, degree = null) {
        this.knotVector = [...knotVector];
        this._points = points.map(p => new Point(p[0], p[1]));
        const expectedDegree = this.knotVector.length - this._points.length - 1;
        this.degree = degree === null ? expectedDegree : degree;
        if (this.degree !== expectedDegree) {
            throw new Error(`Degree expected is ${expectedDegree}, got ${this.degree} instead as Input.`);
        }
        this.storedValue = {};
    }

    removeStored() {
        this.storedValue = {};
    }

    move(i, value) {
        if (i < 0 || i >= this._points.length) {
            throw new Error(`Invalid index: ${i}`);
        }
        if (!(value instanceof Point)) {
            value = new Point(value[0], value[1]); // Assuming valid array input
        }
        this._points[i] = value;
        this.removeStored();
    }


    toString() {
        return `<${this.constructor.name} degree=${this.degree}, points=${this._points.length}, KnotVector=${this.knotVector.length}>`;
    }

    copy() {
        return new this.constructor(this.knotVector, this._points.map(p => [p.x, p.y]), this.degree);
    }

    get domain() {
        return [
            this.knotVector[this.degree],
            this.knotVector[this.knotVector.length - this.degree - 1]
        ];
    }

    get points() {
        return this._points.map(p => [p.x, p.y]);
    }

    get usefulPoints() {
        return this.points;
    }

    quadraticBezierFit() {
        if (this.degree !== 2) {
            throw new Error('Only quadratic B-splines are supported for this method.');
        }
        const controlPoints = this._points.slice(1, -1);
        const onCurvePoints = this.knotVector.slice(2, -2).map(u => this.evaluate(u));

        let results = [];
        let ocp0 = onCurvePoints[0];
        for (let i = 0; i < controlPoints.length; i++) {
            const cp = controlPoints[i];
            const ocp1 = onCurvePoints[i + 1];
            results.push([ocp0, cp, ocp1]);
            ocp0 = ocp1;
        }
        return results; // Return array instead of generator
    }
}

class Closed_BSpline extends BSpline {
    constructor(knotVector, points, degree = null) {
        super(knotVector, points, degree);
        this._unwrappedLen = this._points.length - this.degree;
        this.wrapCheck();
    }

    wrapCheck() {
        const startPoints = this._points.slice(0, this.degree);
        const endPoints = this._points.slice(-this.degree);
        if (!startPoints.every((p, i) => p.x === endPoints[i].x && p.y === endPoints[i].y)) {
            throw new Error(`Points not wrapped at degree ${this.degree}.`);
        }
    }

    move(index, value) {
        if (index < 0 || index >= this._points.length) {
            throw new Error(`Index out of bounds: ${index}`);
        }
        index = index % this._unwrappedLen;
        super.move(index, value);
        if (index < this.degree) {
            super.move(index + this._unwrappedLen, value);
        }
    }

    get usefulPoints() {
        return this.points.slice(0, -this.degree);
    }

    clamp(value) {
        const [min, max] = this.domain;
        return Math.max(min, Math.min(max, value));
    }

    span(index) {

        if (index < 0 || index >= this._points.length) {
            throw new Error(`Invalid index: ${index}`);
        }

        const span = (i) => {
            return [this.knotVector[i], this.knotVector[i + 1]];
        };

        let d0, d1;
        [d0, d1] = span(index);

        if (d0 < this.domain[0]) {
            [d0, d1] = span(index + this._points.length - this.degree);
        } else if (d1 > this.domain[1]) {
            [d0, d1] = span(index + this.degree - this._points.length);
        }

        return [this.clamp(d0), this.clamp(d1)];
    }

    evaluate(u) {
        let k;
        const s = this.knotVector.filter(uk => uk === u).length;
        for (k = 0; k < this.knotVector.length; k++) {
            if (this.knotVector[k] >= u) break;
        }
        if (s === 0) k--;
        if (this.degree === 0) {
            if (k === this._points.length) k--;
            return [this._points[k].x, this._points[k].y];
        }

        let ps = [{}];
        for (let i = k - this.degree; i <= k - s; i++) {
            ps[0][i] = new Point(this._points[i].x, this._points[i].y);
        }

        for (let r = 1; r <= this.degree - s; r++) {
            ps[r] = {};
            for (let i = k - this.degree + r; i <= k - s; i++) {
                const a = (u - this.knotVector[i]) / (this.knotVector[i + this.degree - r + 1] - this.knotVector[i]);
                ps[r][i] = ps[r - 1][i - 1].multiply(1 - a).add(ps[r - 1][i].multiply(a));
            }
        }
        return [ps[this.degree - s][k - s].x, ps[this.degree - s][k - s].y];
    }
    quadraticBezierFit() {
        if (this.degree !== 2) {
            throw new Error('Only quadratic B-splines are supported for this method.');
        }
        const controlPoints = this._points.slice(1, -1);
        const onCurvePoints = this.knotVector.slice(2, -2).map(u => this.evaluate(u));

        const bezierCurves = [];
        let ocp0 = onCurvePoints[0];

        for (let i = 0; i < controlPoints.length; i++) {
            const cp = controlPoints[i];
            const ocp1 = onCurvePoints[i + 1];
            bezierCurves.push([ocp0, cp, ocp1]);
            ocp0 = ocp1;
        }

        return bezierCurves;
    }
    derivative() {
        if (this.storedValue['1']) {
            return this.storedValue['1'];
        }

        const newPoints = [];
        const p = this.degree;
        for (let i = 0; i < this._points.length - 1; i++) {
            const coeff = p / (this.knotVector[i + p + 1] - this.knotVector[i + 1]);
            newPoints.push(this._points[i + 1].subtract(this._points[i]).multiply(coeff));
        }

        const derivative = new BSpline(this.knotVector.slice(1, -1), newPoints, p - 1);
        this.storedValue['1'] = derivative;
        return derivative;
    }
    curvature(u) {
        const d1 = this.derivative().evaluate(u);
        const d2 = this.derivative().derivative().evaluate(u);
        const numerator = d1[0] * d2[1] - d1[1] * d2[0];
        const denominator = Math.pow(Math.sqrt(d1[0] * d1[0] + d1[1] * d1[1]), 3);
        if (denominator === 0) return 0;
        return Math.abs(numerator / denominator);
    }
    energyC(index, intervalsPerSpan) {
        return this.integrate(index, u => this.curvature(u), intervalsPerSpan);
    }
    reversed() {
        const reversedKnotVector = this.knotVector.map(k => 1 - k).reverse();
        const reversedPoints = this._points.slice().reverse();
        return new BSpline(reversedKnotVector, reversedPoints, this.degree);
    }
}

// Returns the slope of the line connecting two points
function slope(p0, p1) {
    const dx = p1[0] - p0[0];
    const dy = p1[1] - p0[1];
    if (dx === 0) {
        return dy * 99999999999999;  // Large number to represent infinity
    }
    return 1.0 * dy / dx;
}

class Path {
    constructor(shapeGraph) {
        this.path = this.makePath(shapeGraph);
        this.shapes = new Set();
    }

    key() {
        return this.path.toString();  // JavaScript alternative for tuple key
    }

    makePath(shapeGraph) {
        const nodes = new Set(shapeGraph.nodes());
        const path = [Math.min(...nodes)];
        const neighbors = [...shapeGraph.neighbors(path[0])].sort((a, b) => slope(path[0], a) - slope(path[0], b));
        path.push(neighbors[0]);
        nodes.delete(path[0]);
        nodes.delete(path[1]);

        let p = path[path.length - 1];
        let i = 0;
        while (nodes.size > 0) {
            for (let neighbor of shapeGraph.neighbors(path[path.length - 1])) {
                if (nodes.has(neighbor)) {
                    nodes.delete(neighbor);
                    path.push(neighbor);
                    break;
                }
            }
            if (p !== path[path.length - 1]) {
                p = path[path.length - 1];
                i = 0;
            } else {
                i++;
                if (i === 3) {
                    break;
                }
            }
        }
        return path;
    }

    makeSpline() {
        this.spline = Closed_BSpline(this.path);
    }

    smoothSpline() {
        this.smooth = SplineSmoother(this.spline);
    }
}

class Shape {
    constructor(pixels, value, corners) {
        this.pixels = pixels;
        this.value = value;
        this.corners = corners;
        this._outsidePath = null;  // The splines describing the boundary of the shape
        this._insidePaths = [];    // The splines describing the inside of the shape
    }

    // Getter method to return the paths in the shape
    get paths() {
        const paths = this._outsidePath ? [this._reverseArray(this._outsidePath.path)] : [];
        this._insidePaths.forEach(path => {
            paths.push([...path.path]);
        });
        return paths;
    }

    // Getter method to return the splines in the shape
    get splines() {
        const splines = this._outsidePath ? [this._reverseArray(this._outsidePath.spline)] : [];
        this._insidePaths.forEach(path => {
            splines.push([...path.spline]);
        });
        return splines;
    }

    // Getter method to return the optimized splines in the shape
    get smoothSplines() {
        const smoothSplines = this._outsidePath ? [this._reverseArray(this._outsidePath.smooth)] : [];
        this._insidePaths.forEach(path => {
            smoothSplines.push([...path.smooth]);
        });
        return smoothSplines;
    }

    addOutline(path, outside = false) {
        if (outside) {
            this._outsidePath = path;
        } else {
            this._insidePaths.push(path);
        }
        if (!path.shapes) {
            path.shapes = new Set();
        }
        path.shapes.add(this);
    }

    _reverseArray(arr) {
        return arr.slice().reverse();
    }
}

// Returns the array containing the vertices of the edge in sorted order
function getSortedVertices(edge) {
    return edge.slice(0, 2).sort();
}

// This function checks whether the given coordinates lie inside the image.
function checkBounds(coordinate, size, offset = [0, 0]) {
    const x = coordinate[0] + offset[0];
    const y = coordinate[1] + offset[1];
    const [width, height] = size;
    return (0 <= x && x < width) && (0 <= y && y < height);
}

class Heuristics {
    static sparseWindow = [8, 8];

    constructor(pixelGraph) {
        this.pixelGraph = pixelGraph;
    }

    sparseOffset(edge) {
        return [
            Heuristics.sparseWindow[0] / 2 - 1 - Math.min(edge[0][0], edge[1][0]),
            Heuristics.sparseWindow[1] / 2 - 1 - Math.min(edge[0][1], edge[1][1])
        ];
    }

    applyHeuristics(ambiguousDiagonalPairs) {
        // Evaluate the heuristic value on each diagonal
        ambiguousDiagonalPairs.forEach(edges => {
            edges.forEach(edge => this.weightDiagonal(edge));
        });

        // Remove the edge which has minimum weight among the pair
        ambiguousDiagonalPairs.forEach(edges => {
            const minWeight = Math.min(...edges.map(edge => edge[2].weight));
            edges.forEach(edge => {
                if (edge[2].weight === minWeight) {
                    this.pixelGraph.removeEdge(edge[0], edge[1]);
                } else {
                    delete edge[2].weight;
                }
            });
        });
    }

    weightDiagonal(edge) {
        const weights = [
            this.weightCurve(edge),
            this.weightSparse(edge),
            this.weightIsland(edge)
        ];
        edge[2].weight = weights.reduce((a, b) => a + b, 0);
    }

    weightCurve(edge) {
        let edgesInTheCurve = new Set([getSortedVertices(edge)]);
        let nodesInTheCurve = new Set([...edge.slice(0, 2)]);

        while (nodesInTheCurve.size > 0) {
            let node = [...nodesInTheCurve][0];
            nodesInTheCurve.delete(node);
            let edges = this.pixelGraph.edges(node, true); // Assuming edges method exists and returns [node, node, data]

            edges.forEach(e => {
                let sortedEdge = getSortedVertices(e);
                if (!edgesInTheCurve.has(sortedEdge.toString())) {
                    edgesInTheCurve.add(sortedEdge.toString());
                    let otherNode = sortedEdge[0] === node ? sortedEdge[1] : sortedEdge[0];
                    nodesInTheCurve.add(otherNode);
                }
            });
        }
        return edgesInTheCurve.size;
    }

    weightSparse(edge) {
        let nodes = [...edge.slice(0, 2)];
        let nodesInTheSparseWindow = new Set(nodes);
        let offset = this.sparseOffset(edge);

        while (nodes.length > 0) {
            let node = nodes.pop();
            this.pixelGraph.neighbors(node).forEach(n => { // Assuming neighbors method exists
                if (!nodesInTheSparseWindow.has(n) && checkBounds(n, Heuristics.sparseWindow, offset)) {
                    nodesInTheSparseWindow.add(n);
                    nodes.push(n);
                }
            });
        }
        return -nodesInTheSparseWindow.size;
    }

    weightIsland(edge) {
        if (this.pixelGraph.degree(edge[0]) === 1 || this.pixelGraph.degree(edge[1]) === 1) { // Assuming degree method exists
            return 5;
        }
        return 0;
    }
}

