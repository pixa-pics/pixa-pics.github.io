"use strict";
function bspline(t, degree, points, knots, weights, result) {

    var i,j,s,l;              // function-scoped iteration variables
    var n = points.length;    // points count
    var d = points[0].length; // point dimensionality

    if(degree < 1) throw new Error('degree must be at least 1 (linear)');
    if(degree > (n-1)) throw new Error('degree must be less than or equal to point count - 1');

    if(!weights) {
        // build weight vector of length [n]
        weights = [];
        for(i=0; i<n; i++) {
            weights[i] = 1;
        }
    }

    if(!knots) {
        // build knot vector of length [n + degree + 1]
        var knots = [];
        for(i=0; i<n+degree+1; i++) {
            knots[i] = i;
        }
    } else {
        if(knots.length !== n+degree+1) throw new Error('bad knot vector length');
    }

    var domain = [
        degree,
        knots.length-1 - degree
    ];

    // remap t to the domain where the spline is defined
    var low  = knots[domain[0]];
    var high = knots[domain[1]];
    t = t * (high - low) + low;

    if(t < low || t > high) throw new Error('out of bounds');

    // find s (the spline segment) for the [t] value provided
    for(s=domain[0]; s<domain[1]; s++) {
        if(t >= knots[s] && t <= knots[s+1]) {
            break;
        }
    }

    // convert points to homogeneous coordinates
    var v = [];
    for(i=0; i<n; i++) {
        v[i] = [];
        for(j=0; j<d; j++) {
            v[i][j] = points[i][j] * weights[i];
        }
        v[i][d] = weights[i];
    }

    // l (level) goes from 1 to the curve degree + 1
    var alpha;
    for(l=1; l<=degree+1; l++) {
        // build level l of the pyramid
        for(i=s; i>s-degree-1+l; i--) {
            alpha = (t - knots[i]) / (knots[i+degree+1-l] - knots[i]);

            // interpolate each component
            for(j=0; j<d+1; j++) {
                v[i][j] = (1 - alpha) * v[i-1][j] + alpha * v[i][j];
            }
        }
    }

    // convert back to cartesian and return
    var result = result || [];
    for(i=0; i<d; i++) {
        result[i] = v[s][i] / v[s][d];
    }

    return result;
}

function Path() {
    if (!(this instanceof Path)) {
        return new Path();
    }
    this.cp_ = [];
}

Object.defineProperties(Path.prototype, {
    'append': {
        get: function () {
            return function (x, y) {
                this.cp_.push([x, y]);
            }
        }
    },
    'controlPoints': {
        get: function () {
            return this.cp_;
        }
    },
    'cp': {
        get: function () {
            return this.cp_;
        }
    },
    'dump': {
        get: function () {
            return function () {
                //console.log(this.cp_.map(function (n){ return`(${n[0]}, ${n[1]})`; }).join(' -> '));
            }
        }
    }
});

Path.toSvgPath = function (controls, factor) {
    let cp = JSON.parse(JSON.stringify(controls));

    if (!cp.length) {
        return '';
    }

    if (cp.length === 2) {
        return Path.toSvgPathLine(cp, factor);
    }

    let p = '';
    factor = factor || 1;

    let knots = Path.calculateKnots(cp);
    let point = bspline(0, degree, cp, knots);
    p += `M${(point[0] * factor).toFixed(2)},${(point[1] * factor).toFixed(2)} `;

    for (let i = 0.001; i < 1; i += 0.001) {
        point = bspline(i, degree, cp, knots);
        p += `L${(point[0] * factor).toFixed(2)},${(point[1] * factor).toFixed(2)} `;
    }

    point = bspline(1, degree, cp, knots);
    p += `L${(point[0] * factor).toFixed(2)},${(point[1] * factor).toFixed(2)}`;

    return p;
};


Path.toSvgPathLine = function (cp, factor) {
    if (!cp.length) {
        return '';
    }

    let p = '';
    factor = factor || 1;

    if (cp.length > 1) {
        p += `M${(cp[0][0] * factor).toFixed(2)},${(cp[0][1] * factor).toFixed(2)} `;

        for (let i = 1; i < cp.length; ++ i) {
            p += `L${(cp[i][0] * factor).toFixed(2)},${(cp[i][1] * factor).toFixed(2)} `;
        }
    }

    return p;
};

Path.calculateKnots = function (cp) {
    let knots = [];

    if (cp[0][0] === cp[cp.length - 1][0] && cp[0][1] === cp[cp.length - 1][1]) {
        // closed
        cp.push(cp[1]);
        cp.push(cp[2]);
        cp.push(cp[3]);

        for (let i = 0; i < cp.length + degree + 1; ++ i) {
            knots.push(i);
        }
    } else {
        // clamped
        cp.unshift(cp[0]);
        cp.push(cp[cp.length - 1]);

        for (let i = 0; i < cp.length - 1; ++ i) {
            knots.push(i);
        }
        knots.unshift(0);
        knots.unshift(0);
        knots.push(cp.length - 1);
        knots.push(cp.length - 1);
    }

    return knots;
};

const degree = 2; // Moved outside as a constant

// Exporting the class
export { Path };