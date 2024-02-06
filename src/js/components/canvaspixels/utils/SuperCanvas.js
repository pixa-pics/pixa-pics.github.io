
class SuperCanvas {
    constructor(c, pxlWidth, pxlHeight) {
        this.state = this.template(c, pxlWidth, pxlHeight);
    }

    template(c, pxlWidth, pxlHeight) {
        pxlWidth |= 0;
        pxlHeight |= 0;

        const createContext = (canvas, width, height) => {
            if (!canvas) canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const isMobile = /android|bb\d+|meego|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent || navigator.vendor || window.opera);
            let isBitmap = 'createImageBitmap' in window;
            let isOffscreen = 'OffscreenCanvas' in window;

            let cc2d, oc, occ2d;
            if (isOffscreen) {
                try {
                    oc = new OffscreenCanvas(width, height);
                    occ2d = oc.getContext('2d', {
                        willReadFrequently: true,
                        powerPreference: 'high-performance',
                        desynchronized: true,
                    });
                    this.setImageSmoothing(occ2d, false);
                } catch (e) {
                    isOffscreen = false;
                }
            }
            if(isOffscreen){
                try {
                    cc2d = oc.transferControlToOffscreen()
                }catch (e) {
                    try {
                        cc2d = canvas.getContext('2d', {
                            willReadFrequently: true,
                            powerPreference: 'high-performance',
                            desynchronized: true,
                        });
                    }catch (e) {
                        cc2d = canvas.getContext('2d');
                    }
                }
            } else {
                try {
                    cc2d = canvas.getContext('2d', {
                        willReadFrequently: true,
                        powerPreference: 'high-performance',
                        desynchronized: true,
                    });
                }catch (e) {
                    cc2d = canvas.getContext('2d');
                }
            }

            this.setImageSmoothing(cc2d, false);

            return { isBitmap, isOffscreen, width, height, canvasContext: cc2d, offscreenCanvasContext: occ2d };
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
        context.imageSmoothingEnabled = enabled;
        ['webkit', 'moz', 'ms'].forEach(prefix => {
            context[`${prefix}ImageSmoothingEnabled`] = enabled;
        });
    }

    ok() {
        return Boolean(this.state.s.canvasContext.canvas);
    }

    getUint32() {
        return this.state.fp;
    }

    new(c, w, h) {
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
        const { b, enablePaintType, s } = this.state;
        return new Promise(resolve => {
            if (enablePaintType === 'bitmap' && b) {
                s.canvasContext.globalCompositeOperation = 'copy';
                s.canvasContext.drawImage(b.bmp, 0, 0, b.bmp.width, b.bmp.height);
            } else if (enablePaintType === 'offscreen') {
                s.canvasContext.globalCompositeOperation = 'copy';
                s.canvasContext.drawImage(s.offscreenCanvasContext.canvas, 0, 0);
            } else {
                s.canvasContext.putImageData(new ImageData(this.state.prUint8a, s.width, s.height), 0, 0);
            }
            resolve();
        });
    }

    prender() {

        this.state.enablePaintType = this.state.s.isBitmap ? "bitmap": this.state.s.isOffscreen ? "offscreen": "";

        if (this.state.enablePaintType === 'bitmap') {
            return createImageBitmap(new ImageData(this.state.prUint8a, this.state.s.width, this.state.s.height))
                .then(bitmap => {
                    this.state.b.oldBmp.close();
                    this.state.b.oldBmp = this.state.b.bmp;
                    this.state.b.bmp = bitmap;
                    return Promise.resolve();
                })
                .catch(() => {
                    this.state.s.isBitmap = false;
                    return Promise.reject();
                });
        } else if (this.state.enablePaintType === 'offscreen') {
            this.state.s.offscreenCanvasContext.putImageData(new ImageData(this.state.prUint8a, this.state.s.width, this.state.s.height), 0, 0);
            return Promise.resolve();
        }else {
            return Promise.resolve();
        }
    }

    check(w, h) {
        const { width, height } = this.state.s;
        if (width !== w || height !== h) {
            return this.setDimensions(w, h);
        }
        return Promise.resolve();
    }

    setDimensions(w, h) {
        if (this.state.s.width !== w || this.state.s.height !== h) {
            this.state = this.template(this.state.s.canvasContext.canvas, w, h);
            return Promise.resolve();
        }
        return Promise.reject(new Error('Dimensions are already set to the requested size'));
    }
}

export default SuperCanvas;
