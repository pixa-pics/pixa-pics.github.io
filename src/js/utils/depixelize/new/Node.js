"use strict";

function Point(x, y) {
    if (!(this instanceof Point)) {
        return new Point(x, y);
    }
    this.xy_ = [x, y];
}

Object.defineProperties(Point.prototype, {
    // Build the temporary typed array to which indexes are stored when scanning a unsigned 32bits integer
    'calculateAngle': {
        get: function () {
            "use strict";
            return function (originX, originY){
                return Math.atan2(this.x - originY, this.y - originX);
            }
        }
    },
    'x': {
        get: function () {
            "use strict";
            return this.xy_[0];
        },
        set(v) {
            this.xy_[0] = v;
        }
    },
    'y': {
        get: function () {
            "use strict";
            return this.xy_[1];
        },
        set(v) {
            this.xy_[1] = v;
        }
    },
});


function Node(x, y, rgb, corners) {
    if (!(this instanceof Node)) {
        return new Node(x, y, rgb, corners);
    }
    this.xy_ = [x, y];
    this.color_ = rgb;

    // Assign utility functions to Node instance
    this.corners_ = corners ? corners.sort(Node.sortByAngle.bind(this, this.x + 0.5, this.y + 0.5)) : [];
    return this;
}

Object.defineProperties(Node.prototype, {
    // Build the temporary typed array to which indexes are stored when scanning a unsigned 32bits integer
    'color': {
        get: function () {
            "use strict";
            return this.color_;
        }
    },
    'rgb': {
        get: function () {
            "use strict";
            return this.color_;
        },
        set(v) {
            this.color_ = v;
        }
    },
    'corners': {
        get: function () {
            "use strict";
            return this.corners_;
        }
    },
    'x': {
        get: function () {
            "use strict";
            return this.xy_[0];
        },
        set(v) {
            this.xy_[0] = v;
        }
    },
    'y': {
        get: function () {
            "use strict";
            return this.xy_[1];
        },
        set(v) {
            this.xy_[1] = v;
        }
    },
});

Node.sortByAngle = function (centerX, centerY, a, b) {

    const angleA = a.calculateAngle(centerX, centerY);
    const angleB = b.calculateAngle(centerX, centerY);

    if (angleA < angleB) {
        return -1;
    }else if (angleA > angleB) {
        return 1;
    }
    return 0;
}


// Exporting the classes
export { Point, Node };