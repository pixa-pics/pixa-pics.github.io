class ImageQuadTree {
    constructor(parameters) {
        parameters = parameters || {};
        this.shape = parameters.shape || "circle" || "rect";
        this.quadTree = null;
        this.canvas = document.createElement("canvas");
        this.palette = new Map();
    }

    loadImage(base64Image) {
        this.base64Image = base64Image;
        return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => {
                this.canvas.width = image.width;
                this.canvas.height = image.height;
                this.context = this.canvas.getContext('2d', {willReadFrequently: true});
                this.context.drawImage(image, 0, 0);
                this.quadTree = this.buildQuadTree(0, 0, image.width, image.height);
                this.serialized = this.exportBinary();
                this.deserializedTree = this.importBinary(this.serialized); // Test deserialization
                resolve(this.drawSVG());
            };
            image.src = this.base64Image;
        });
    }

    buildQuadTree(x, y, width, height) {
        if (width === 1 && height === 1) {
            let color = this.getAverageColor(x, y, width, height);
            if (!this.palette.has(color)) {
                this.palette.set(color, this.palette.size);
            }
            return {x, y, width, height, color};
        }

        const isUniformColor = this.checkUniformColor(x, y, width, height);
        if (isUniformColor.isUniform) {
            if (!this.palette.has(isUniformColor.color)) {
                this.palette.set(isUniformColor.color, this.palette.size);
            }
            return { x, y, width, height, color: isUniformColor.color };
        }

        return {
            children: [
                this.buildQuadTree(x, y, width / 2, height / 2),
                this.buildQuadTree(x + width / 2, y, width / 2, height / 2),
                this.buildQuadTree(x, y + height / 2, width / 2, height / 2),
                this.buildQuadTree(x + width / 2, y + height / 2, width / 2, height / 2)
            ]
        };
    }

    getAverageColor(x, y, width, height) {
        const imageData = this.context.getImageData(x, y, width, height);
        let total = [0, 0, 0, 0], count = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
            total[0] += imageData.data[i];
            total[1] += imageData.data[i + 1];
            total[2] += imageData.data[i + 2];
            total[3] += imageData.data[i + 3];
            count++;
        }
        return `rgba(${total[0]/count|0}, ${total[1]/count|0}, ${total[2]/count|0}, ${(total[3]/count/255).toFixed(2)})`;
    }

    checkUniformColor(x, y, width, height) {
        const firstColor = this.getAverageColor(x, y, 1, 1);
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const currentColor = this.getAverageColor(x + i, y + j, 1, 1);
                if (currentColor !== firstColor) {
                    return { isUniform: false };
                }
            }
        }
        return { isUniform: true, color: firstColor };
    }

    exportBinary() {
        const nodes = [];
        const paletteArray = Array.from(this.palette.keys());
        const paletteIndex = new Map(paletteArray.map(function (color, index){ return [color, index]; }));

        const encodeNode = (node) => {
            if (!node.children) {
                nodes.push(0); // Leaf node flag
                nodes.push(paletteIndex.get(node.color)); // Palette index
            } else {
                nodes.push(255); // Internal node flag
                node.children.forEach(function (child){ encodeNode(child); });
            }
        };

        encodeNode(this.quadTree);

        const buffer = new ArrayBuffer(nodes.length);
        const uint8View = new Uint8Array(buffer);
        nodes.forEach(function (value, index){ uint8View[index] = value});

        return uint8View;
    }

    importBinary(data) {
        let index = 0;
        const paletteArray = Array.from(this.palette.keys());

        const decodeNode = (x, y, width, height) => {
            if (data[index] === 255) { // Internal node
                index++;
                const halfWidth = width / 2;
                const halfHeight = height / 2;
                return {
                    children: [
                        decodeNode(x, y, halfWidth, halfHeight),
                        decodeNode(x + halfWidth, y, halfWidth, halfHeight),
                        decodeNode(x, y + halfHeight, halfWidth, halfHeight),
                        decodeNode(x + halfWidth, y + halfHeight, halfWidth, halfHeight)
                    ]
                };
            } else { // Leaf node
                index++;
                return {
                    color: paletteArray[data[index++]],
                    x: x,
                    y: y,
                    width: width,
                    height: height
                };
            }
        };

        return decodeNode(0, 0, this.canvas.width, this.canvas.height);
    }

    encodeNode(node, nodes, paletteIndex) {
        if (!node.children) {
            nodes.push(paletteIndex.get(node.color)); // Push color index
            nodes.push(0); // Indicator of leaf node
        } else {
            nodes.push(1); // Indicator of parent node
            node.children.forEach(child => this.encodeNode(child, nodes, paletteIndex));
        }
    }

    drawSVG() {
        const tree = this.deserializedTree;
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("width", this.canvas.width*10);
        svgElement.setAttribute("height", this.canvas.height*10);
        this.renderQuadTree(svgElement, tree, this.shape);
        // Convert SVG to base64
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
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

        var url;
        try {
            var blob = dataURItoBlob(base64SVG);
                url = URL.createObjectURL(blob);
        }catch (e) {
            url = base64SVG;
        }

        return url;
    }

    renderQuadTree(svgElement, node, shape) {
        if (!node.children || node.children.length === 0) {
            if(shape === "rect"){
                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", node.x*10);
                rect.setAttribute("y", node.y*10);
                rect.setAttribute("width", node.width*10);
                rect.setAttribute("height", node.height*10);
                rect.setAttribute("fill", node.color);
                svgElement.appendChild(rect);
            }else if(shape === "circle") {
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", (node.x+node.width/2)*10);
                circle.setAttribute("cy", (node.y+node.height/2)*10);
                circle.setAttribute("r", (((node.width/2)+(node.height/2))/2)*10);
                circle.setAttribute("fill", node.color);
                svgElement.appendChild(circle);
            }

        } else {
            node.children.forEach(child => this.renderQuadTree(svgElement, child, shape));
        }
    }
}

module.exports = ImageQuadTree;
