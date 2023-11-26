function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Error linking program:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

function loadTexture(gl, canvas, callback) {
    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    callback(texture);
}

var filterTypeLocation; // Uniform location for filter type
var currentFilterType = 0; // Default filter type

function setFilter(filterType) {
    currentFilterType = [
        "vibrance",          // uFilterType == 1
        "saturation",        // uFilterType == 2
        "dehaze",            // uFilterType == 3
        "exposure",          // uFilterType == 4
        "brightness",        // uFilterType == 5
        "contrast",          // uFilterType == 6
        "highlights",        // uFilterType == 7
        "shadows",           // uFilterType == 8
        "whites",            // uFilterType == 9
        "blacks",            // uFilterType == 10
        "clarity",           // uFilterType == 11
        "sharpen",           // uFilterType == 12
        "denoiseClarity",    // uFilterType == 13
        "denoiseLuminance"   // uFilterType == 14
    ].indexOf(filterType) + 1;
}

var filterStrength = 0.5; // Default strength

function setFilterStrength(strength) {
    filterStrength = strength;
}


function loadImage(ctx, url, callback) {

    const image = new Image();

    image.onload = function() {
        ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
        callback();
    };

    image.src = url;
}

function main() {
    var canvas = document.getElementById("2d-canvas");
    var ctx = canvas.getContext("2d");
    var webGLCanvas = document.createElement("canvas");
    webGLCanvas.width = canvas.width;
    webGLCanvas.height = canvas.height;
    var gl = webGLCanvas.getContext("webgl2");
    if (!gl) {
        console.error("WebGL not supported");
        return;
    }

    var vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec2 aTextureCoord;
        varying vec2 vTextureCoord;
        void main() {
            gl_Position = aVertexPosition;
            vTextureCoord = aTextureCoord;
        }
    `;

    var fsSource = `
        precision mediump float;
        uniform int uFilterType;
        uniform float uStrength;
        uniform sampler2D uTexture;
        varying vec2 vTextureCoord;
        
        // COLOR
        vec4 vibrance(vec4 color, float value) {
            float average = (color.r + color.g + color.b) / 3.0;
            float mx = max(color.r, max(color.g, color.b));
            float amt = ((mx - average) * -3.0) * value;
            color.r += (mx - color.r) * amt;
            color.g += (mx - color.g) * amt;
            color.b += (mx - color.b) * amt;
            return color;
        }
        
        // LIGHT
        vec4 dehaze(vec4 color, float value) {
            color.rgb += value;
            return color;
        }
        
        vec4 exposure(vec4 color, float value) {
            color.rgb = color.rgb * exp2(value);
            return color;
        }
        
        // Highlights, Shadows, Whites, Blacks are typically complex and depend on the histogram of the image
        // These are placeholder implementations
        
        vec4 highlights(vec4 color, float value) {
            // Placeholder: Increase brightness of high-valued colors
            if (color.r > 0.5) color.r += value;
            if (color.g > 0.5) color.g += value;
            if (color.b > 0.5) color.b += value;
            return color;
        }
        
        vec4 shadows(vec4 color, float value) {
            // Placeholder: Increase brightness of low-valued colors
            if (color.r < 0.5) color.r += value;
            if (color.g < 0.5) color.g += value;
            if (color.b < 0.5) color.b += value;
            return color;
        }
        
        vec4 whites(vec4 color, float value) {
            // Placeholder: Simple brightness increase
            color.rgb += value;
            return color;
        }
        
        vec4 blacks(vec4 color, float value) {
            // Placeholder: Simple darkness decrease
            color.rgb -= value;
            return color;
        }
    
        // DETAIL
        vec4 clarity(vec4 color, float value) {
            // Placeholder: Simple contrast increase
            color.rgb = (color.rgb - 0.5) * (1.0 + value) + 0.5;
            return color;
        }
    
        vec4 sharpen(vec4 color, float value) {
            // Placeholder: Sharpen effect requires convolution which is not implemented here
            // Implementing a proper sharpen filter would require accessing neighboring pixels
            return color;
        }
        
        // DENOISE
        vec4 denoiseClarity(vec4 color, float value) {
            // Placeholder: Denoise effect would typically require accessing multiple neighboring pixels
            return color;
        }
    
        vec4 denoiseLuminance(vec4 color, float value) {
            // Placeholder: Denoise effect would typically require accessing multiple neighboring pixels
            return color;
        }
    
        void main() {
            vec4 color = texture2D(uTexture, vTextureCoord);
    
            if (uFilterType == 1) {
                color = vibrance(color, uStrength);
            } else if (uFilterType == 2) {
                color = saturation(color, uStrength);
            } else if (uFilterType == 3) {
               color = dehaze(color, uStrength);
            } else if (uFilterType == 4) {
               color = exposure(color, uStrength);
            } else if (uFilterType == 5) {
               color = brightness(color, uStrength);
            } else if (uFilterType == 6) {
               color = contrast(color, uStrength);
            } else if (uFilterType == 7) {
               color = highlights(color, uStrength);
            } else if (uFilterType == 8) {
               color = shadows(color, uStrength);
            } else if (uFilterType == 9) {
               color = whites(color, uStrength);
            } else if (uFilterType == 10) {
               color = blacks(color, uStrength);
            } else if (uFilterType == 11) {
               color = clarity(color, uStrength);
            } else if (uFilterType == 12) {
               color = sharpen(color, uStrength);
            } else if (uFilterType == 13) {
               color = denoiseClarity(color, uStrength);
            } else if (uFilterType == 14) {
               color = denoiseLuminance(color, uStrength);
            } 
    
            gl_FragColor = color;
        }
    `;

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    var program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var positions = [
        -1.0, -1.0,
        1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
        1.0, -1.0,
        1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    var positionAttributeLocation = gl.getAttribLocation(program, "aVertexPosition");
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);

    var textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    // Flip the y-coordinate of the texture coordinates
    var textureCoordinates = [
        0.0, 1.0,
        1.0, 1.0,
        0.0, 0.0,
        0.0, 0.0,
        1.0, 1.0,
        1.0, 0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    var filterTypeLocation = gl.getUniformLocation(program, "uFilterType");

    var textureCoordAttributeLocation = gl.getAttribLocation(program, "aTextureCoord");
    gl.vertexAttribPointer(textureCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(textureCoordAttributeLocation);
    filterTypeLocation = gl.getUniformLocation(program, "uFilterType");
    loadImage(ctx, window.image, function(){
        loadTexture(gl, canvas, function(texture) {
            gl.bindTexture(gl.TEXTURE_2D, texture);

            function render() {
                // Update the filter type uniform
                gl.uniform1i(filterTypeLocation, currentFilterType);
                gl.uniform1f(gl.getUniformLocation(program, "uStrength"), filterStrength);



                // Clear the canvas and draw the scene
                gl.clearColor(0, 0, 0, 1);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.TRIANGLES, 0, 6);

                // Draw on canvas 2d;
                ctx.drawImage(webGLCanvas, 0, 0, canvas.width, canvas.height);

                requestAnimationFrame(render);
            }

            requestAnimationFrame(render);
        });
    });

}

window.image = "";
window.onload = main;
