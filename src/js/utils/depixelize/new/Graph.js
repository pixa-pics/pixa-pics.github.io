"use strict";
import {Shape} from './Shape';

function Graph(size, width, height) {
    if (!(this instanceof Graph)) {
        return new Graph(size, width, height);
    }
    this.id_ = ++Graph.Id;
    this.nodes_ = new Array(size);
    this.width_ = width;
    this.height_ = height;

    // Node initialization within the constructor
    for (let i = 0; i < size; ++i) {
        const x = i % width;
        const y = Math.floor(i / width);
        this.nodes_[i] = {
            id: i,
            edges: [],
            rgb: null,
            x: x,
            y: y,
            corners: [{ x, y }]
        };

        // Additional corners setup...
        if (x < width - 1) {
            this.nodes_[i].corners.push({ x: x + 1, y: y });
        }
        if (y < height - 1) {
            this.nodes_[i].corners.push({ x: x, y: y + 1 });
        }
        if (x < width - 1 && y < height - 1) {
            this.nodes_[i].corners.push({ x: x + 1, y: y + 1 });
        }
    }
}

Graph.Id = 0;
Graph.invertDirection = function (dir) {
    const inversions = {
        'up': 'down', 'down': 'up', 'left': 'right', 'right': 'left',
        'upright': 'downleft', 'upleft': 'downright', 'downleft': 'upright', 'downright': 'upleft'
    };
    return inversions[dir] || dir;
} ;
Graph.findNodeIdx = function (nodes, nodeId) {
    for (let i = 0; i < nodes.length; ++i) {
        if (nodes[i].id === nodeId) {
            return i;
        }
    }
    return -1;
};
Graph.findEdge = function (node, toId) {
    for (let i = 0; i < node.length; ++i) {
        if (node[i].nodeId === toId) {
            return i;
        }
    }
    return -1;
};
Graph.findCorner = function (corners, x, y) {
    for (let i = 0; i < corners.length; ++i) {
        if (corners[i].x === x && corners[i].y === y) {
            return i;
        }
    }
    return -1;
};

Object.defineProperties(Graph.prototype, {
    'id': {
        get: function () {
            return this.id_;
        }
    },
    'nodes': {
        get: function () {
            return this.nodes_;
        }
    },
    'width': {
        get: function () {
            return this.width_;
        }
    },
    'height': {
        get: function () {
            return this.height_;
        }
    },
    'makeGrid': {
        value: function () {
            for (let i = 0; i < this.nodes_.length; ++i) {
                const x = i % this.width_;
                const y = Math.floor(i / this.width_);

                this.nodes_[i].x = x;
                this.nodes_[i].y = y;
                this.nodes_[i].corners = [];

                if (x < this.width_ - 1) {
                    this.addEdge(i, i + 1, 'right');
                }
                if (y < this.height_ - 1) {
                    this.addEdge(i, i + this.width_, 'down');
                }
            }
        }
    },
    'addNode': {
        value: function (x, y) {
            let node = this.findNode(x, y);
            if (!node) {
                node = {
                    id: this.nodes_.length,
                    edges: [],
                    rgb: null,
                    x: x,
                    y: y,
                    corners: []
                };
                this.nodes_.push(node);
            }
            return node;
        }
    },
    'removeNode': {
        value: function (nodeId) {
            const idx = Graph.findNodeIdx(this.nodes_, nodeId);
            if (idx !== -1) {
                const node = this.nodes_[idx];
                while (node.edges.length) {
                    this.removeEdge(nodeId, node.edges[0].nodeId);
                }
                this.nodes_.splice(idx, 1);
            }
        }
    },
    'findNode': {
        value: function (x, y) {
            for (let i = 0; i < this.nodes.length; ++i) {
                if (this.nodes[i].x === x && this.nodes[i].y === y) {
                    return this.nodes[i];
                }
            }

            return null;        }
    },
    'getNode': {
        value: function (nodeId) {
            for (let i = 0; i < this.nodes.length; ++i) {
                if (this.nodes[i].id === nodeId) {
                    return this.nodes[i];
                }
            }
            return null;        }
    },
    'addEdge': {
        value: function (fromId, toId, dir, data) {
            const fromNode = this.getNode(fromId);
            const toNode = this.getNode(toId);

            if (fromNode && Graph.findEdge(fromNode.edges, toId) === -1) {
                fromNode.edges.push({ nodeId: toId, dir, data });
            }
            if (toNode && Graph.findEdge(toNode.edges, fromId) === -1) {
                const invert = function (dir) {
                    if (dir === 'up') return 'down';
                    if (dir === 'down') return 'up';
                    if (dir === 'left') return 'right';
                    if (dir === 'right') return 'left';
                    if (dir === 'upright') return 'downleft';
                    if (dir === 'upleft') return 'downright';
                    if (dir === 'downleft') return 'upright';
                    if (dir === 'downright') return 'upleft';
                };
                toNode.edges.push({ nodeId: fromId, dir: invert(dir), data });
            }
        }
    },

    'removeEdge': {
        value: function (fromId, toId) {
            const fromNode = this.getNode(fromId);
            const toNode = this.getNode(toId);

            if (fromNode) {
                const idx = Graph.findEdge(fromNode.edges, toId);

                if (idx !== -1) {
                    fromNode.edges.splice(idx, 1);
                }
            }

            if (toNode) {
                const idx = Graph.findEdge(toNode.edges, fromId);

                if (idx !== -1) {
                    toNode.edges.splice(idx, 1);
                }
            }
        }
    },
    'hasEdge': {
        value: function (fromId, toId) {
            const fromNode = this.getNode(fromId);
            return fromNode && Graph.findEdge(fromNode.edges, toId) !== -1;
        }
    },
    'findNodeById': {
        value: function (nodeId) {
            return this.nodes_.find(function (node){ return node.id === nodeId}) || null;
        }
    },
    'hasCorner': {
        value: function (nodes, x, y) {
            for (let node of nodes) {
                if (Graph.findCorner(node.corners, x, y) !== -1) {
                    return true;
                }
            }
            return false;
        }
    },
    'removeCorner': {
        value: function (nodeId, x, y) {
            const node = this.getNode(nodeId);

            if (node) {
                const idx = Graph.findCorner(node.corners, x, y);
                //console.log(`removing corner from (${node.x}, ${node.y})  -> (${x}, ${y})   ${JSON.stringify(node.corners)}`);

                if (idx !== -1) {
                    //console.log('remove corner ok');
                    node.corners.splice(idx, 1);
                } else {
                    //console.log('corner not found');
                }
            }
        }
    },
    'addCorner': {
        value: function (nodeId, x, y) {
            const node = this.getNode(nodeId);

            if (node) {
                //console.log(`Adding corner to (${node.x}, ${node.y})  -> (${x}, ${y})`);
                if (Graph.findCorner(node.corners, x, y) === -1) {
                    //console.log('add corner ok');
                    node.corners.push({ x, y });
                }
            }
        }
    },
    'shapes': {
        get: function () {
            const nodes = this.nodes;
            const shapes = [];
            const seen = [];

            for (let i = 0; i < nodes.length; ++ i) {
                const node = nodes[i];

                if (seen.indexOf(node.id) !== - 1) {
                    continue;
                }

                const shape = new Shape();
                const stack = [node.id];

                seen.push(node.id);
                shape.addPoint(node.x, node.y, node.color, node.corners);

                while (stack.length) {
                    const id = stack.pop();
                    const n = nodes[id];

                    for (let j = 0; j < n.edges.length; ++ j) {
                        const edgeId = n.edges[j].nodeId;
                        const edgeNode = nodes[edgeId];

                        if (seen.indexOf(edgeId) === - 1) {
                            stack.push(edgeId);
                            seen.push(edgeId);
                            shape.addPoint(edgeNode.x, edgeNode.y, edgeNode.color, edgeNode.corners);
                        }
                    }
                }
                //console.log(`pushing shape of ${shape.points.length} points`);
                shapes.push(shape);
            }
            console.log(`there is ${shapes.length} shapes`);
            console.log(`there is ${JSON.stringify(shapes, null, 1)} shapes`);
            return shapes;
        },
        "subgraph": {
            get: function () {

                const sg = new Graph(0, this.width, this.height);

                for (let i = 0; i < this.nodes.length; ++i) {
                    const { x, y } = this.nodes[i];

                    if (this.hasCorner(this.points, x, y)) {
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
        }
    },
    'serialize': {
        value: function (nodeId, x, y) {
            const node = this.getNode(nodeId);

            if (node) {
                //console.log(`Adding corner to (${node.x}, ${node.y})  -> (${x}, ${y})`);
                if (Graph.findCorner(node.corners, x, y) === -1) {
                    //console.log('add corner ok');
                    node.corners.push({ x, y });
                }
            }
        }
    }
});

Graph.unserialize = function (data) {
    const d = JSON.parse(data);
    const g = new Graph(d.nodes.length, d.width, d.height);

    g.nodes = d.nodes;

    return g;
}
// Exporting the class
export { Graph };
