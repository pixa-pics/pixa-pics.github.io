"use strict";
import { Node } from './Node';

function Shape() {
    if (!(this instanceof Shape)) {
        return new Shape();
    }
    this.points_ = [];
}

Object.defineProperties(Shape.prototype, {
    // Build the temporary typed array to which indexes are stored when scanning a unsigned 32bits integer
    'addPoint': {
        get: function () {
            "use strict";
            return function (x, y, rgb, corners) {
                "use strict";
                const p = new Node(x, y, rgb, corners);
                const first = this.points[0];

                if (!first || (first.x|0) <= (p.x|0)) {
                    this.points.push(p);
                } else {
                    this.points.unshift(p);
                }
            }
        }
    },
    'points': {
        get: function () {
            "use strict";
            return this.points_;
        }
    },
    'corners': {
        get: function () {
            return this.points.reduce(function (acc, n){ return acc.concat(n.corners)}, []);
        }
    },
    'dump': {
        get: function () {
            //console.log(`Shape of ${this.points.length} points.`);
            this.points.forEach(function (p) {
                //console.log(`(${p.x}, ${p.y}) rgb: ${JSON.stringify(p.color)} corners: ${JSON.stringify(p.corners)}`);
            });
        }
    }
});

// Exporting the class
export { Shape };