
class SuperCanvas {
    constructor(c, pxlWidth, pxlHeight) {
        this.state = this.template(c, pxlWidth, pxlHeight);
    }

    template(c, pxlWidth, pxlHeight) {
        "use strict";
        pxlWidth |= 0;
        pxlHeight |= 0;

        const createContext = (canvas, width, height) => {
            if (!canvas) canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const isMobile = /android|bb\d+|meego|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent || navigator.vendor || window.opera);
            let isBitmap = 'createImageBitmap' in window;
            let isOffscreen = 'OffscreenCanvas' in window;
            let isControl = false;

            let new_canvas, original_canvas = canvas, new_context, original_context;
            if(false){
                try {
                    new_canvas = original_canvas.transferControlToOffscreen();
                    isControl = true;

                    try {
                        new_context = new_canvas.getContext('2d', {
                            willReadFrequently: true,
                            desynchronized: !isMobile,
                        });
                    }catch (e) {
                        new_context = new_canvas.getContext('2d');
                    }

                }catch (e) {

                    new_canvas = new OffscreenCanvas(width, height);

                    try {
                        original_context = original_canvas.getContext('2d', {
                            willReadFrequently: true,
                            desynchronized: !isMobile,
                        });
                        new_context = new_canvas.getContext('2d', {
                            willReadFrequently: true,
                            desynchronized: !isMobile,
                        });
                    }catch (e) {
                        original_context = original_canvas.getContext('2d');
                        new_context = new_canvas.getContext('2d');
                    }
                }
            } else {

                new_canvas = document.createElement("canvas");
                new_canvas.width = width;
                new_canvas.height = height;

                try {
                    original_context = original_canvas.getContext('2d', {
                        willReadFrequently: true,
                        desynchronized: !isMobile,
                    });
                    new_context = new_canvas.getContext('2d', {
                        willReadFrequently: true,
                        desynchronized: !isMobile,
                    });
                }catch (e) {
                    original_context = original_canvas.getContext('2d');
                    new_context = new_canvas.getContext('2d');
                }
            }

            if(isControl) {
                original_context = {
                    canvas: original_canvas
                };
            }else {
                this.setImageSmoothing(original_context, false);
            }
            this.setImageSmoothing(new_context, false);

            return { isBitmap, isOffscreen, isControl, width, height, canvasContext: original_context, offscreenCanvasContext: new_context };
        };

        let state = {
            s: createContext(c, pxlWidth, pxlHeight),
            enablePaintType: '',
            fpBuffer: new ArrayBuffer(pxlHeight * pxlWidth * 4),
            b: { bmpX: 0, bmpY: 0, bmpT: 0, bmp: { close() {}, width: 0, height: 0 }, oldBmp: { close() {}, width: 0, height: 0 } },
        };

        state.fp = new Uint32Array(state.fpBuffer)
        state.prUint8a = new Uint8ClampedArray(state.fpBuffer);
        return state;
    }

    setImageSmoothing(context, enabled) {
        "use strict";
        context.imageSmoothingEnabled = enabled;
        ['webkit', 'moz', 'ms'].forEach(prefix => {
            context[`${prefix}ImageSmoothingEnabled`] = enabled;
        });
    }

    ok() {
        "use strict";
        return Boolean(this.state.s.canvasContext.canvas);
    }

    getUint32() {
        "use strict";
        return this.state.fp;
    }

    new(c, w, h) {
        "use strict";
        this.state = this.template(c, w, h);
        return Promise.resolve();
    }

    clear() {
        return new Promise(resolve => {
            this.state.s.canvasContext.clearRect(0, 0, this.state.s.width, this.state.s.height);
            resolve();
        });
    }

    render() {
        "use strict";
        const { b, enablePaintType, s, prUint8a } = this.state;
        return new Promise(function (resolve){
            if (enablePaintType === 'bitmap' && b) {
                s.canvasContext.globalCompositeOperation = 'copy';
                s.canvasContext.drawImage(b.bmp, 0, 0, b.bmp.width, b.bmp.height);
            } else if (enablePaintType === 'offscreen') {
                s.canvasContext.globalCompositeOperation = 'copy';
                s.canvasContext.drawImage(s.offscreenCanvasContext.canvas, 0, 0);
            } else if(enablePaintType === "control") {
                console.log("control")
                s.offscreenCanvasContext.putImageData(new ImageData(prUint8a, s.width, s.height), 0, 0);
            }else {
                s.canvasContext.putImageData(new ImageData(prUint8a, s.width, s.height), 0, 0);
            }
            resolve();
        });
    }

    prender() {

        "use strict";
        this.state.enablePaintType = this.state.s.isControl ? "control": this.state.s.isBitmap ? "bitmap": this.state.s.isOffscreen ? "offscreen": "";

        if (this.state.enablePaintType === 'bitmap') {
            return createImageBitmap(new ImageData(this.state.prUint8a, this.state.s.width, this.state.s.height))
                .then(bitmap => {
                    this.state.b.oldBmp.close();
                    this.state.b.oldBmp = this.state.b.bmp;
                    this.state.b.bmp = bitmap;
                    return Promise.resolve();
                })
                .catch(() => {
                    return Promise.reject();
                });
        } else if (this.state.enablePaintType === 'offscreen') {
            this.state.s.offscreenCanvasContext.putImageData(new ImageData(this.state.prUint8a, this.state.s.width, this.state.s.height), 0, 0);
            return Promise.resolve();
        }else if(this.state.s.isControl === "control") {
            return Promise.resolve();
        } else {
            return Promise.resolve();
        }
    }

    check(w, h) {
        "use strict";
        const { width, height } = this.state.s;
        if (width !== w || height !== h) {
            return this.setDimensions(w, h);
        }
        return Promise.resolve();
    }

    setDimensions(w, h) {
        "use strict";
        if (this.state.s.width !== w || this.state.s.height !== h) {
            this.state = this.template(this.state.s.canvasContext.canvas, w, h);
            return Promise.resolve();
        }
        return Promise.reject(new Error('Dimensions are already set to the requested size'));
    }
}

export default SuperCanvas;
