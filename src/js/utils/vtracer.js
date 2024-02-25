import {ColorImageConverter} from "vtracer-color";


function createSvgUrl(svgElementId) {
    // Retrieve the SVG element by its ID
    const svgElement = document.getElementById(svgElementId);
    if (!svgElement) {
        console.error('SVG element not found');
        return null;
    }

    // Use XMLSerializer to serialize the SVG content to a string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    // Create a Blob from the SVG string
    const blob = new Blob([svgString], { type: 'image/svg+xml' });

    // Create and return an Object URL for the Blob
    const url = URL.createObjectURL(blob);
    return url;
}

function vectorizeImageWithVtracer(options, cb) {
    // Validate the presence of necessary options
    if (!options.canvasId || !options.svgId) {
        console.error('Canvas ID and SVG ID are required.');
        options.canvasId = "frame";
        options.svgId = "svg";
    }

    (document.getElementById(options.svgId) || {remove: function (){}}).remove();
    (document.getElementById(options.canvasId) || {remove: function (){}}).remove();
    // Create and append the canvas element
    const canvas = document.createElement('canvas');
    canvas.id = options.canvasId;
    canvas.style.display = 'none'; // Keep the canvas invisible
    document.body.appendChild(canvas); // Append to the document body or a specific container if provided

    // Create and append the SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = options.svgId;
    svg.style.display = 'none'; // Keep the SVG invisible
    document.body.appendChild(svg); // Append to the document body or a specific container if provided

    // Create an image element for loading the source image
    const img = new Image();

    // Function to set the source of the image and restart the vectorization process
    function setSourceAndRestart(source, cb) {

        if(source instanceof ImageData){
            canvas.width = source.width;
            canvas.height = source.height;
            const ctx = canvas.getContext('2d');
            ctx.putImageData(source, 0, 0);
        }else {
            img.src = source;
            img.onload = function () {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
            };
        }
        svg.setAttribute("height", canvas.height+"px");
        svg.setAttribute("width", canvas.width+"px");
        restart(cb);
    }

    // Function to restart the vectorization process
   var runner;
    function restart(cb) {
        if (runner) {
            runner.stop();
        }

        // Create a new ConverterRunner with the options provided
        runner = new ConverterRunner(cb);
        // Start the vectorization process
        runner.run();
    }

    // Function to initialize the ConverterRunner
    class ConverterRunner {
        constructor(cb) {
            // Initialize the converter with the provided parameters
            this.converter = ColorImageConverter.new_with_string('{"canvas_id":"frame","svg_id":"svg","mode":"spline","clustering_mode":"color","hierarchical":"stacked","corner_threshold":1.0471975513333334,"length_threshold":4,"max_iterations":10,"splice_threshold":0.7853981635,"filter_speckle":16,"color_precision":0,"layer_difference":28,"path_precision":8}');
            this.converter.init();
            this.stopped = false;
            this.callback = cb;
        }

        run() {
            const This = this;
            (function tick() {
                if (!This.stopped) {
                    let done = false;
                    const startTick = performance.now();
                    while (!(done = This.converter.tick()) && performance.now() - startTick < 25) {}
                    if (!done) {
                        setTimeout(tick, 1);
                    } else {
                        This.ok();
                    }
                }
            })();
        }

        stop() {
            this.stopped = true;
            this.converter.free();
        }

        ok() {
            this.callback(
                createSvgUrl("svg")
            );
        }
    }

    // Start the process by setting the image source
    setSourceAndRestart(options.imageSource, cb);
}

// Example usage of the API
export function createSVG(url){
    return new Promise(function (resolve, reject) {
        vectorizeImageWithVtracer({
            imageSource: url
        }, resolve);
    });
}

