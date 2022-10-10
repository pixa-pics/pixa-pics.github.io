/* eslint-disable */
/*
The MIT License (MIT)
Copyright (c) 2015 Bodymovin
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// https://github.com/jmabernethy/lottie-web (Removed all renderer except "svg" in light version build)

(typeof navigator !== "undefined") && (function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(root);
    } else {
        root.lottie = factory(root);
        root.bodymovin = root.lottie;
    }
}((window || {}), function(window) {


/* exported svgNS, locationHref, initialDefaultFrame */

var svgNS = 'http://www.w3.org/2000/svg';

var locationHref = '';

var initialDefaultFrame = -999999;

/* global createSizedArray */
/* exported subframeEnabled, isSafari, cachedColors, bmPow, bmSqrt, bmFloor, bmMax, bmMin, ProjectInterface,
defaultCurveSegments, degToRads, roundCorner, bmRnd, styleDiv, BMEnterFrameEvent, BMCompleteEvent, BMCompleteLoopEvent,
BMSegmentStartEvent, BMDestroyEvent, BMRenderFrameErrorEvent, BMConfigErrorEvent, BMAnimationConfigErrorEvent, createElementID,
addSaturationToRGB, addBrightnessToRGB, addHueToRGB, rgbToHex */

var subframeEnabled = true;
var idPrefix = '';
var bmPow = Math.pow;
var bmSqrt = Math.sqrt;
var bmFloor = Math.floor;
var bmMin = Math.min;

var BMMath = {};
(function () {
  var propertyNames = ['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'atan2', 'ceil', 'cbrt', 'expm1', 'clz32', 'cos', 'cosh', 'exp', 'floor', 'fround', 'hypot', 'imul', 'log', 'log1p', 'log2', 'log10', 'max', 'min', 'pow', 'random', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc', 'E', 'LN10', 'LN2', 'LOG10E', 'LOG2E', 'PI', 'SQRT1_2', 'SQRT2'];
  var i;
  var len = propertyNames.length;
  for (i = 0; i < len; i += 1) {
    BMMath[propertyNames[i]] = Math[propertyNames[i]];
  }
}());

function ProjectInterface() { return {}; }

BMMath.random = Math.random;
BMMath.abs = function (val) {
  var tOfVal = typeof val;
  if (tOfVal === 'object' && val.length) {
    var absArr = createSizedArray(val.length);
    var i;
    var len = val.length;
    for (i = 0; i < len; i += 1) {
      absArr[i] = Math.abs(val[i]);
    }
    return absArr;
  }
  return Math.abs(val);
};
var defaultCurveSegments = 150;
var degToRads = Math.PI / 180;
var roundCorner = 0.5519;

function roundValues(flag) {
  if (flag) {
    bmRnd = Math.round;
  } else {
    bmRnd = function (val) {
      return val;
    };
  }
}
roundValues(false);


function BMEnterFrameEvent(type, currentTime, totalTime, frameMultiplier) {
  this.type = type;
  this.currentTime = currentTime;
  this.totalTime = totalTime;
  this.direction = frameMultiplier < 0 ? -1 : 1;
}

function BMCompleteEvent(type, frameMultiplier) {
  this.type = type;
  this.direction = frameMultiplier < 0 ? -1 : 1;
}

function BMCompleteLoopEvent(type, totalLoops, currentLoop, frameMultiplier) {
  this.type = type;
  this.currentLoop = currentLoop;
  this.totalLoops = totalLoops;
  this.direction = frameMultiplier < 0 ? -1 : 1;
}

function BMSegmentStartEvent(type, firstFrame, totalFrames) {
  this.type = type;
  this.firstFrame = firstFrame;
  this.totalFrames = totalFrames;
}

function BMDestroyEvent(type, target) {
  this.type = type;
  this.target = target;
}

function BMRenderFrameErrorEvent(nativeError, currentTime) {
  this.type = 'renderFrameError';
  this.nativeError = nativeError;
  this.currentTime = currentTime;
}

function BMConfigErrorEvent(nativeError) {
  this.type = 'configError';
  this.nativeError = nativeError;
}


var createElementID = (function () {
  var _count = 0;
  return function createID() {
    _count += 1;
    return idPrefix + '__lottie_element_' + _count;
  };
}());


var rgbToHex = (function () {
  var colorMap = [];
  var i;
  var hex;
  for (i = 0; i < 256; i += 1) {
    hex = i.toString(16);
    colorMap[i] = hex.length === 1 ? '0' + hex : hex;
  }

  return function (r, g, b) {
    if (r < 0) {
      r = 0;
    }
    if (g < 0) {
      g = 0;
    }
    if (b < 0) {
      b = 0;
    }
    return '#' + colorMap[r] + colorMap[g] + colorMap[b];
  };
}());

function BaseEvent() {}
BaseEvent.prototype = {
  triggerEvent: function (eventName, args) {
    if (this._cbs[eventName]) {
      var len = this._cbs[eventName].length;
      for (var i = 0; i < len; i += 1) {
        this._cbs[eventName][i](args);
      }
    }
  },
  addEventListener: function (eventName, callback) {
    if (!this._cbs[eventName]) {
      this._cbs[eventName] = [];
    }
    this._cbs[eventName].push(callback);

    return function () {
      this.removeEventListener(eventName, callback);
    }.bind(this);
  },
  removeEventListener: function (eventName, callback) {
    if (!callback) {
      this._cbs[eventName] = null;
    } else if (this._cbs[eventName]) {
      var i = 0;
      var len = this._cbs[eventName].length;
      while (i < len) {
        if (this._cbs[eventName][i] === callback) {
          this._cbs[eventName].splice(i, 1);
          i -= 1;
          len -= 1;
        }
        i += 1;
      }
      if (!this._cbs[eventName].length) {
        this._cbs[eventName] = null;
      }
    }
  },
};

/* exported createTypedArray, createSizedArray */

var createTypedArray = (function () {
  function createRegularArray(type, len) {
    var i = 0;
    var arr = [];
    var value;
    switch (type) {
      case 'int16':
      case 'uint8c':
        value = 1;
        break;
      default:
        value = 1.1;
        break;
    }
    for (i = 0; i < len; i += 1) {
      arr.push(value);
    }
    return arr;
  }
  function createTypedArrayFactory(type, len) {
    if (type === 'float32') {
      return new Float32Array(len);
    } if (type === 'int16') {
      return new Int16Array(len);
    } if (type === 'uint8c') {
      return new Uint8ClampedArray(len);
    }
    return createRegularArray(type, len);
  }
  if (typeof Uint8ClampedArray === 'function' && typeof Float32Array === 'function') {
    return createTypedArrayFactory;
  }
  return createRegularArray;
}());

function createSizedArray(len) {
  return Array.apply(null, { length: len });
}

/* global svgNS */
/* exported createNS */

function createNS(type) {
  // return {appendChild:function(){},setAttribute:function(){},style:{}}
  return document.createElementNS(svgNS, type);
}

function DynamicPropertyContainer() {}
DynamicPropertyContainer.prototype = {
  addDynamicProperty: function (prop) {
    if (this.dynamicProperties.indexOf(prop) === -1) {
      this.dynamicProperties.push(prop);
      this.container.addDynamicProperty(this);
      this._isAnimated = true;
    }
  },
  iterateDynamicProperties: function () {
    this._mdf = false;
    var i;
    var len = this.dynamicProperties.length;
    for (i = 0; i < len; i += 1) {
      this.dynamicProperties[i].getValue();
      if (this.dynamicProperties[i]._mdf) {
        this._mdf = true;
      }
    }
  },
  initDynamicPropertyContainer: function (container) {
    this.container = container;
    this.dynamicProperties = [];
    this._mdf = false;
    this._isAnimated = false;
  },
};

/* exported getBlendMode */

var getBlendMode = (function () {
  var blendModeEnums = {
    0: 'source-over',
    1: 'multiply',
    2: 'screen',
    3: 'overlay',
    4: 'darken',
    5: 'lighten',
    6: 'color-dodge',
    7: 'color-burn',
    8: 'hard-light',
    9: 'soft-light',
    10: 'difference',
    11: 'exclusion',
    12: 'hue',
    13: 'saturation',
    14: 'color',
    15: 'luminosity',
  };

  return function (mode) {
    return blendModeEnums[mode] || '';
  };
}());

/* global createTypedArray */

/*!
 Transformation Matrix v2.0
 (c) Epistemex 2014-2015
 www.epistemex.com
 By Ken Fyrstenberg
 Contributions by leeoniya.
 License: MIT, header required.
 */

/**
 * 2D transformation matrix object initialized with identity matrix.
 *
 * The matrix can synchronize a canvas context by supplying the context
 * as an argument, or later apply current absolute transform to an
 * existing context.
 *
 * All values are handled as floating point values.
 *
 * @param {CanvasRenderingContext2D} [context] - Optional context to sync with Matrix
 * @prop {number} a - scale x
 * @prop {number} b - shear y
 * @prop {number} c - shear x
 * @prop {number} d - scale y
 * @prop {number} e - translate x
 * @prop {number} f - translate y
 * @prop {CanvasRenderingContext2D|null} [context=null] - set or get current canvas context
 * @constructor
 */

var Matrix = (function () {
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _tan = Math.tan;
  var _rnd = Math.round;

  function reset() {
    this.props[0] = 1;
    this.props[1] = 0;
    this.props[2] = 0;
    this.props[3] = 0;
    this.props[4] = 0;
    this.props[5] = 1;
    this.props[6] = 0;
    this.props[7] = 0;
    this.props[8] = 0;
    this.props[9] = 0;
    this.props[10] = 1;
    this.props[11] = 0;
    this.props[12] = 0;
    this.props[13] = 0;
    this.props[14] = 0;
    this.props[15] = 1;
    return this;
  }

  function rotate(angle) {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  function rotateX(angle) {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(1, 0, 0, 0, 0, mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1);
  }

  function rotateY(angle) {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, 0, mSin, 0, 0, 1, 0, 0, -mSin, 0, mCos, 0, 0, 0, 0, 1);
  }

  function rotateZ(angle) {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  function shear(sx, sy) {
    return this._t(1, sy, sx, 1, 0, 0);
  }

  function skew(ax, ay) {
    return this.shear(_tan(ax), _tan(ay));
  }

  function skewFromAxis(ax, angle) {
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, mSin, 0, 0, -mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
      ._t(1, 0, 0, 0, _tan(ax), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
      ._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    // return this._t(mCos, mSin, -mSin, mCos, 0, 0)._t(1, 0, _tan(ax), 1, 0, 0)._t(mCos, -mSin, mSin, mCos, 0, 0);
  }

  function scale(sx, sy, sz) {
    if (!sz && sz !== 0) {
      sz = 1;
    }
    if (sx === 1 && sy === 1 && sz === 1) {
      return this;
    }
    return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
  }

  function setTransform(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    this.props[0] = a;
    this.props[1] = b;
    this.props[2] = c;
    this.props[3] = d;
    this.props[4] = e;
    this.props[5] = f;
    this.props[6] = g;
    this.props[7] = h;
    this.props[8] = i;
    this.props[9] = j;
    this.props[10] = k;
    this.props[11] = l;
    this.props[12] = m;
    this.props[13] = n;
    this.props[14] = o;
    this.props[15] = p;
    return this;
  }

  function translate(tx, ty, tz) {
    tz = tz || 0;
    if (tx !== 0 || ty !== 0 || tz !== 0) {
      return this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);
    }
    return this;
  }

  function transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
    var _p = this.props;

    if (a2 === 1 && b2 === 0 && c2 === 0 && d2 === 0 && e2 === 0 && f2 === 1 && g2 === 0 && h2 === 0 && i2 === 0 && j2 === 0 && k2 === 1 && l2 === 0) {
      // NOTE: commenting this condition because TurboFan deoptimizes code when present
      // if(m2 !== 0 || n2 !== 0 || o2 !== 0){
      _p[12] = _p[12] * a2 + _p[15] * m2;
      _p[13] = _p[13] * f2 + _p[15] * n2;
      _p[14] = _p[14] * k2 + _p[15] * o2;
      _p[15] *= p2;
      // }
      this._identityCalculated = false;
      return this;
    }

    var a1 = _p[0];
    var b1 = _p[1];
    var c1 = _p[2];
    var d1 = _p[3];
    var e1 = _p[4];
    var f1 = _p[5];
    var g1 = _p[6];
    var h1 = _p[7];
    var i1 = _p[8];
    var j1 = _p[9];
    var k1 = _p[10];
    var l1 = _p[11];
    var m1 = _p[12];
    var n1 = _p[13];
    var o1 = _p[14];
    var p1 = _p[15];

    /* matrix order (canvas compatible):
         * ace
         * bdf
         * 001
         */
    _p[0] = a1 * a2 + b1 * e2 + c1 * i2 + d1 * m2;
    _p[1] = a1 * b2 + b1 * f2 + c1 * j2 + d1 * n2;
    _p[2] = a1 * c2 + b1 * g2 + c1 * k2 + d1 * o2;
    _p[3] = a1 * d2 + b1 * h2 + c1 * l2 + d1 * p2;

    _p[4] = e1 * a2 + f1 * e2 + g1 * i2 + h1 * m2;
    _p[5] = e1 * b2 + f1 * f2 + g1 * j2 + h1 * n2;
    _p[6] = e1 * c2 + f1 * g2 + g1 * k2 + h1 * o2;
    _p[7] = e1 * d2 + f1 * h2 + g1 * l2 + h1 * p2;

    _p[8] = i1 * a2 + j1 * e2 + k1 * i2 + l1 * m2;
    _p[9] = i1 * b2 + j1 * f2 + k1 * j2 + l1 * n2;
    _p[10] = i1 * c2 + j1 * g2 + k1 * k2 + l1 * o2;
    _p[11] = i1 * d2 + j1 * h2 + k1 * l2 + l1 * p2;

    _p[12] = m1 * a2 + n1 * e2 + o1 * i2 + p1 * m2;
    _p[13] = m1 * b2 + n1 * f2 + o1 * j2 + p1 * n2;
    _p[14] = m1 * c2 + n1 * g2 + o1 * k2 + p1 * o2;
    _p[15] = m1 * d2 + n1 * h2 + o1 * l2 + p1 * p2;

    this._identityCalculated = false;
    return this;
  }

  function isIdentity() {
    if (!this._identityCalculated) {
      this._identity = !(this.props[0] !== 1 || this.props[1] !== 0 || this.props[2] !== 0 || this.props[3] !== 0 || this.props[4] !== 0 || this.props[5] !== 1 || this.props[6] !== 0 || this.props[7] !== 0 || this.props[8] !== 0 || this.props[9] !== 0 || this.props[10] !== 1 || this.props[11] !== 0 || this.props[12] !== 0 || this.props[13] !== 0 || this.props[14] !== 0 || this.props[15] !== 1);
      this._identityCalculated = true;
    }
    return this._identity;
  }

  function equals(matr) {
    var i = 0;
    while (i < 16) {
      if (matr.props[i] !== this.props[i]) {
        return false;
      }
      i += 1;
    }
    return true;
  }

  function clone(matr) {
    var i;
    for (i = 0; i < 16; i += 1) {
      matr.props[i] = this.props[i];
    }
    return matr;
  }

  function cloneFromProps(props) {
    var i;
    for (i = 0; i < 16; i += 1) {
      this.props[i] = props[i];
    }
  }

  function applyToPoint(x, y, z) {
    return {
      x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
      y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
      z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14],
    };
    /* return {
         x: x * me.a + y * me.c + me.e,
         y: x * me.b + y * me.d + me.f
         }; */
  }
  function applyToX(x, y, z) {
    return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
  }
  function applyToY(x, y, z) {
    return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
  }
  function applyToZ(x, y, z) {
    return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
  }

  function getInverseMatrix() {
    var determinant = this.props[0] * this.props[5] - this.props[1] * this.props[4];
    var a = this.props[5] / determinant;
    var b = -this.props[1] / determinant;
    var c = -this.props[4] / determinant;
    var d = this.props[0] / determinant;
    var e = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / determinant;
    var f = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / determinant;
    var inverseMatrix = new Matrix();
    inverseMatrix.props[0] = a;
    inverseMatrix.props[1] = b;
    inverseMatrix.props[4] = c;
    inverseMatrix.props[5] = d;
    inverseMatrix.props[12] = e;
    inverseMatrix.props[13] = f;
    return inverseMatrix;
  }

  function inversePoint(pt) {
    var inverseMatrix = this.getInverseMatrix();
    return inverseMatrix.applyToPointArray(pt[0], pt[1], pt[2] || 0);
  }

  function inversePoints(pts) {
    var i;
    var len = pts.length;
    var retPts = [];
    for (i = 0; i < len; i += 1) {
      retPts[i] = inversePoint(pts[i]);
    }
    return retPts;
  }

  function applyToTriplePoints(pt1, pt2, pt3) {
    var arr = createTypedArray('float32', 6);
    if (this.isIdentity()) {
      arr[0] = pt1[0];
      arr[1] = pt1[1];
      arr[2] = pt2[0];
      arr[3] = pt2[1];
      arr[4] = pt3[0];
      arr[5] = pt3[1];
    } else {
      var p0 = this.props[0];
      var p1 = this.props[1];
      var p4 = this.props[4];
      var p5 = this.props[5];
      var p12 = this.props[12];
      var p13 = this.props[13];
      arr[0] = pt1[0] * p0 + pt1[1] * p4 + p12;
      arr[1] = pt1[0] * p1 + pt1[1] * p5 + p13;
      arr[2] = pt2[0] * p0 + pt2[1] * p4 + p12;
      arr[3] = pt2[0] * p1 + pt2[1] * p5 + p13;
      arr[4] = pt3[0] * p0 + pt3[1] * p4 + p12;
      arr[5] = pt3[0] * p1 + pt3[1] * p5 + p13;
    }
    return arr;
  }

  function applyToPointArray(x, y, z) {
    var arr;
    if (this.isIdentity()) {
      arr = [x, y, z];
    } else {
      arr = [
        x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
        x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
        x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14],
      ];
    }
    return arr;
  }

  function applyToPointStringified(x, y) {
    if (this.isIdentity()) {
      return x + ',' + y;
    }
    var _p = this.props;
    return Math.round((x * _p[0] + y * _p[4] + _p[12]) * 100) / 100 + ',' + Math.round((x * _p[1] + y * _p[5] + _p[13]) * 100) / 100;
  }

  function toCSS() {
    // Doesn't make much sense to add this optimization. If it is an identity matrix, it's very likely this will get called only once since it won't be keyframed.
    /* if(this.isIdentity()) {
            return '';
        } */
    var i = 0;
    var props = this.props;
    var cssValue = 'matrix3d(';
    var v = 10000;
    while (i < 16) {
      cssValue += _rnd(props[i] * v) / v;
      cssValue += i === 15 ? ')' : ',';
      i += 1;
    }
    return cssValue;
  }

  function roundMatrixProperty(val) {
    var v = 10000;
    if ((val < 0.000001 && val > 0) || (val > -0.000001 && val < 0)) {
      return _rnd(val * v) / v;
    }
    return val;
  }

  function to2dCSS() {
    // Doesn't make much sense to add this optimization. If it is an identity matrix, it's very likely this will get called only once since it won't be keyframed.
    /* if(this.isIdentity()) {
            return '';
        } */
    var props = this.props;
    var _a = roundMatrixProperty(props[0]);
    var _b = roundMatrixProperty(props[1]);
    var _c = roundMatrixProperty(props[4]);
    var _d = roundMatrixProperty(props[5]);
    var _e = roundMatrixProperty(props[12]);
    var _f = roundMatrixProperty(props[13]);
    return 'matrix(' + _a + ',' + _b + ',' + _c + ',' + _d + ',' + _e + ',' + _f + ')';
  }

  return function () {
    this.reset = reset;
    this.rotate = rotate;
    this.rotateX = rotateX;
    this.rotateY = rotateY;
    this.rotateZ = rotateZ;
    this.skew = skew;
    this.skewFromAxis = skewFromAxis;
    this.shear = shear;
    this.scale = scale;
    this.setTransform = setTransform;
    this.translate = translate;
    this.transform = transform;
    this.applyToPoint = applyToPoint;
    this.applyToX = applyToX;
    this.applyToY = applyToY;
    this.applyToZ = applyToZ;
    this.applyToPointArray = applyToPointArray;
    this.applyToTriplePoints = applyToTriplePoints;
    this.applyToPointStringified = applyToPointStringified;
    this.toCSS = toCSS;
    this.to2dCSS = to2dCSS;
    this.clone = clone;
    this.cloneFromProps = cloneFromProps;
    this.equals = equals;
    this.inversePoints = inversePoints;
    this.inversePoint = inversePoint;
    this.getInverseMatrix = getInverseMatrix;
    this._t = this.transform;
    this.isIdentity = isIdentity;
    this._identity = true;
    this._identityCalculated = false;

    this.props = createTypedArray('float32', 16);
    this.reset();
  };
}());

/* eslint-disable */
/*
 Copyright 2014 David Bau.

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
    var global = this,
        width = 256,        // each RC4 output is 0 <= x < 256
        chunks = 6,         // at least six RC4 outputs for each double
        digits = 52,        // there are 52 significant digits in a double
        rngname = 'random', // rngname: name for Math.random and Math.seedrandom
        startdenom = math.pow(width, chunks),
        significance = math.pow(2, digits),
        overflow = significance * 2,
        mask = width - 1,
        nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
    function seedrandom(seed, options, callback) {
        var key = [];
        options = (options === true) ? { entropy: true } : (options || {});

        // Flatten the seed string or build one from local entropy if needed.
        var shortseed = mixkey(flatten(
            options.entropy ? [seed, tostring(pool)] :
                (seed === null) ? autoseed() : seed, 3), key);

        // Use the seed to initialize an ARC4 generator.
        var arc4 = new ARC4(key);

        // This function returns a random double in [0, 1) that contains
        // randomness in every bit of the mantissa of the IEEE 754 value.
        var prng = function() {
            var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
                d = startdenom,                 //   and denominator d = 2 ^ 48.
                x = 0;                          //   and no 'extra last byte'.
            while (n < significance) {          // Fill up all significant digits by
                n = (n + x) * width;              //   shifting numerator and
                d *= width;                       //   denominator and generating a
                x = arc4.g(1);                    //   new least-significant-byte.
            }
            while (n >= overflow) {             // To avoid rounding up, before adding
                n /= 2;                           //   last byte, shift everything
                d /= 2;                           //   right using integer math until
                x >>>= 1;                         //   we have exactly the desired bits.
            }
            return (n + x) / d;                 // Form the number within [0, 1).
        };

        prng.int32 = function() { return arc4.g(4) | 0; };
        prng.quick = function() { return arc4.g(4) / 0x100000000; };
        prng.double = prng;

        // Mix the randomness into accumulated entropy.
        mixkey(tostring(arc4.S), pool);

        // Calling convention: what to return as a function of prng, seed, is_math.
        return (options.pass || callback ||
        function(prng, seed, is_math_call, state) {
            if (state) {
                // Load the arc4 state from the given state if it has an S array.
                if (state.S) { copy(state, arc4); }
                // Only provide the .state method if requested via options.state.
                prng.state = function() { return copy(arc4, {}); };
            }

            // If called as a method of Math (Math.seedrandom()), mutate
            // Math.random because that is how seedrandom.js has worked since v1.0.
            if (is_math_call) { math[rngname] = prng; return seed; }

            // Otherwise, it is a newer calling convention, so return the
            // prng directly.
            else return prng;
        })(
            prng,
            shortseed,
            'global' in options ? options.global : (this == math),
            options.state);
    }
    math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
    function ARC4(key) {
        var t, keylen = key.length,
            me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

        // The empty key [] is treated as [0].
        if (!keylen) { key = [keylen++]; }

        // Set up S using the standard key scheduling algorithm.
        while (i < width) {
            s[i] = i++;
        }
        for (i = 0; i < width; i++) {
            s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
            s[j] = t;
        }

        // The "g" method returns the next (count) outputs as one number.
        me.g = function(count) {
            // Using instance members instead of closure state nearly doubles speed.
            var t, r = 0,
                i = me.i, j = me.j, s = me.S;
            while (count--) {
                t = s[i = mask & (i + 1)];
                r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
            }
            me.i = i; me.j = j;
            return r;
            // For robust unpredictability, the function call below automatically
            // discards an initial batch of values.  This is called RC4-drop[256].
            // See http://google.com/search?q=rsa+fluhrer+response&btnI
        };
    }

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
    function copy(f, t) {
        t.i = f.i;
        t.j = f.j;
        t.S = f.S.slice();
        return t;
    }

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
    function flatten(obj, depth) {
        var result = [], typ = (typeof obj), prop;
        if (depth && typ == 'object') {
            for (prop in obj) {
                try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
            }
        }
        return (result.length ? result : typ == 'string' ? obj : obj + '\0');
    }

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
    function mixkey(seed, key) {
        var stringseed = seed + '', smear, j = 0;
        while (j < stringseed.length) {
            key[mask & j] =
                mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
        }
        return tostring(key);
    }

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
    function autoseed() {
        try {
            if (nodecrypto) { return tostring(nodecrypto.randomBytes(width)); }
            var out = new Uint8Array(width);
            (global.crypto || global.msCrypto).getRandomValues(out);
            return tostring(out);
        } catch (e) {
            var browser = global.navigator,
                plugins = browser && browser.plugins;
            return [+new Date(), global, plugins, global.screen, tostring(pool)];
        }
    }

//
// tostring()
// Converts an array of charcodes to a string
//
    function tostring(a) {
        return String.fromCharCode.apply(0, a);
    }

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
    mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//

// End anonymous scope, and pass initial values.
})(
    [],     // pool: entropy pool starts empty
    BMMath    // math: package containing random, pow, and seedrandom
);
/* eslint-disable */
var BezierFactory = (function () {
  /**
     * BezierEasing - use bezier curve for transition easing function
     * by Gaëtan Renaudeau 2014 - 2015 – MIT License
     *
     * Credits: is based on Firefox's nsSMILKeySpline.cpp
     * Usage:
     * var spline = BezierEasing([ 0.25, 0.1, 0.25, 1.0 ])
     * spline.get(x) => returns the easing value | x must be in [0, 1] range
     *
     */

  var ob = {};
  ob.getBezierEasing = getBezierEasing;
  var beziers = {};

  function getBezierEasing(a, b, c, d, nm) {
    var str = nm || ('bez_' + a + '_' + b + '_' + c + '_' + d).replace(/\./g, 'p');
    if (beziers[str]) {
      return beziers[str];
    }
    var bezEasing = new BezierEasing([a, b, c, d]);
    beziers[str] = bezEasing;
    return bezEasing;
  }

  // These values are established by empiricism with tests (tradeoff: performance VS precision)
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 10;

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  var float32ArraySupported = typeof Float32Array === 'function';

  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
  function C(aA1) { return 3.0 * aA1; }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX,
      currentT,
      i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) return aGuessT;
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  /**
     * points is an array of [ mX1, mY1, mX2, mY2 ]
     */
  function BezierEasing(points) {
    this._p = points;
    this._mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    this._precomputed = false;

    this.get = this.get.bind(this);
  }

  BezierEasing.prototype = {

    get: function (x) {
      var mX1 = this._p[0],
        mY1 = this._p[1],
        mX2 = this._p[2],
        mY2 = this._p[3];
      if (!this._precomputed) this._precompute();
      if (mX1 === mY1 && mX2 === mY2) return x; // linear
      // Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if (x === 0) return 0;
      if (x === 1) return 1;
      return calcBezier(this._getTForX(x), mY1, mY2);
    },

    // Private part

    _precompute: function () {
      var mX1 = this._p[0],
        mY1 = this._p[1],
        mX2 = this._p[2],
        mY2 = this._p[3];
      this._precomputed = true;
      if (mX1 !== mY1 || mX2 !== mY2) { this._calcSampleValues(); }
    },

    _calcSampleValues: function () {
      var mX1 = this._p[0],
        mX2 = this._p[2];
      for (var i = 0; i < kSplineTableSize; ++i) {
        this._mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    },

    /**
         * getTForX chose the fastest heuristic to determine the percentage value precisely from a given X projection.
         */
    _getTForX: function (aX) {
      var mX1 = this._p[0],
        mX2 = this._p[2],
        mSampleValues = this._mSampleValues;

      var intervalStart = 0.0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;

      // Interpolate to provide an initial guess for t
      var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;

      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } if (initialSlope === 0.0) {
        return guessForT;
      }
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    },
  };

  return ob;
}());

/* exported extendPrototype, getDescriptor, createProxyFunction */

function extendPrototype(sources, destination) {
  var i;
  var len = sources.length;
  var sourcePrototype;
  for (i = 0; i < len; i += 1) {
    sourcePrototype = sources[i].prototype;
    for (var attr in sourcePrototype) {
      if (Object.prototype.hasOwnProperty.call(sourcePrototype, attr)) destination.prototype[attr] = sourcePrototype[attr];
    }
  }
}

function getDescriptor(object, prop) {
  return Object.getOwnPropertyDescriptor(object, prop);
}

function createProxyFunction(prototype) {
  function ProxyFunction() {}
  ProxyFunction.prototype = prototype;
  return ProxyFunction;
}

/* global segmentsLengthPool, defaultCurveSegments, createSizedArray, bmPow, bmSqrt, bmFloor, createTypedArray, bezierLengthPool */
/* exported bez */

function bezFunction() {
  var math = Math;

  function pointOnLine2D(x1, y1, x2, y2, x3, y3) {
    var det1 = (x1 * y2) + (y1 * x3) + (x2 * y3) - (x3 * y2) - (y3 * x1) - (x2 * y1);
    return det1 > -0.001 && det1 < 0.001;
  }

  function pointOnLine3D(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    if (z1 === 0 && z2 === 0 && z3 === 0) {
      return pointOnLine2D(x1, y1, x2, y2, x3, y3);
    }
    var dist1 = math.sqrt(math.pow(x2 - x1, 2) + math.pow(y2 - y1, 2) + math.pow(z2 - z1, 2));
    var dist2 = math.sqrt(math.pow(x3 - x1, 2) + math.pow(y3 - y1, 2) + math.pow(z3 - z1, 2));
    var dist3 = math.sqrt(math.pow(x3 - x2, 2) + math.pow(y3 - y2, 2) + math.pow(z3 - z2, 2));
    var diffDist;
    if (dist1 > dist2) {
      if (dist1 > dist3) {
        diffDist = dist1 - dist2 - dist3;
      } else {
        diffDist = dist3 - dist2 - dist1;
      }
    } else if (dist3 > dist2) {
      diffDist = dist3 - dist2 - dist1;
    } else {
      diffDist = dist2 - dist1 - dist3;
    }
    return diffDist > -0.0001 && diffDist < 0.0001;
  }

  var getBezierLength = (function () {
    return function (pt1, pt2, pt3, pt4) {
      var curveSegments = defaultCurveSegments;
      var k;
      var i;
      var len;
      var ptCoord;
      var perc;
      var addedLength = 0;
      var ptDistance;
      var point = [];
      var lastPoint = [];
      var lengthData = bezierLengthPool.newElement();
      len = pt3.length;
      for (k = 0; k < curveSegments; k += 1) {
        perc = k / (curveSegments - 1);
        ptDistance = 0;
        for (i = 0; i < len; i += 1) {
          ptCoord = bmPow(1 - perc, 3) * pt1[i] + 3 * bmPow(1 - perc, 2) * perc * pt3[i] + 3 * (1 - perc) * bmPow(perc, 2) * pt4[i] + bmPow(perc, 3) * pt2[i];
          point[i] = ptCoord;
          if (lastPoint[i] !== null) {
            ptDistance += bmPow(point[i] - lastPoint[i], 2);
          }
          lastPoint[i] = point[i];
        }
        if (ptDistance) {
          ptDistance = bmSqrt(ptDistance);
          addedLength += ptDistance;
        }
        lengthData.percents[k] = perc;
        lengthData.lengths[k] = addedLength;
      }
      lengthData.addedLength = addedLength;
      return lengthData;
    };
  }());

  function getSegmentsLength(shapeData) {
    var segmentsLength = segmentsLengthPool.newElement();
    var closed = shapeData.c;
    var pathV = shapeData.v;
    var pathO = shapeData.o;
    var pathI = shapeData.i;
    var i;
    var len = shapeData._length;
    var lengths = segmentsLength.lengths;
    var totalLength = 0;
    for (i = 0; i < len - 1; i += 1) {
      lengths[i] = getBezierLength(pathV[i], pathV[i + 1], pathO[i], pathI[i + 1]);
      totalLength += lengths[i].addedLength;
    }
    if (closed && len) {
      lengths[i] = getBezierLength(pathV[i], pathV[0], pathO[i], pathI[0]);
      totalLength += lengths[i].addedLength;
    }
    segmentsLength.totalLength = totalLength;
    return segmentsLength;
  }

  function BezierData(length) {
    this.segmentLength = 0;
    this.points = new Array(length);
  }

  function PointData(partial, point) {
    this.partialLength = partial;
    this.point = point;
  }

  var buildBezierData = (function () {
    var storedData = {};

    return function (pt1, pt2, pt3, pt4) {
      var bezierName = (pt1[0] + '_' + pt1[1] + '_' + pt2[0] + '_' + pt2[1] + '_' + pt3[0] + '_' + pt3[1] + '_' + pt4[0] + '_' + pt4[1]).replace(/\./g, 'p');
      if (!storedData[bezierName]) {
        var curveSegments = defaultCurveSegments;
        var k;
        var i;
        var len;
        var ptCoord;
        var perc;
        var addedLength = 0;
        var ptDistance;
        var point;
        var lastPoint = null;
        if (pt1.length === 2 && (pt1[0] !== pt2[0] || pt1[1] !== pt2[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt1[0] + pt3[0], pt1[1] + pt3[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt2[0] + pt4[0], pt2[1] + pt4[1])) {
          curveSegments = 2;
        }
        var bezierData = new BezierData(curveSegments);
        len = pt3.length;
        for (k = 0; k < curveSegments; k += 1) {
          point = createSizedArray(len);
          perc = k / (curveSegments - 1);
          ptDistance = 0;
          for (i = 0; i < len; i += 1) {
            ptCoord = bmPow(1 - perc, 3) * pt1[i] + 3 * bmPow(1 - perc, 2) * perc * (pt1[i] + pt3[i]) + 3 * (1 - perc) * bmPow(perc, 2) * (pt2[i] + pt4[i]) + bmPow(perc, 3) * pt2[i];
            point[i] = ptCoord;
            if (lastPoint !== null) {
              ptDistance += bmPow(point[i] - lastPoint[i], 2);
            }
          }
          ptDistance = bmSqrt(ptDistance);
          addedLength += ptDistance;
          bezierData.points[k] = new PointData(ptDistance, point);
          lastPoint = point;
        }
        bezierData.segmentLength = addedLength;
        storedData[bezierName] = bezierData;
      }
      return storedData[bezierName];
    };
  }());

  function getDistancePerc(perc, bezierData) {
    var percents = bezierData.percents;
    var lengths = bezierData.lengths;
    var len = percents.length;
    var initPos = bmFloor((len - 1) * perc);
    var lengthPos = perc * bezierData.addedLength;
    var lPerc = 0;
    if (initPos === len - 1 || initPos === 0 || lengthPos === lengths[initPos]) {
      return percents[initPos];
    }
    var dir = lengths[initPos] > lengthPos ? -1 : 1;
    var flag = true;
    while (flag) {
      if (lengths[initPos] <= lengthPos && lengths[initPos + 1] > lengthPos) {
        lPerc = (lengthPos - lengths[initPos]) / (lengths[initPos + 1] - lengths[initPos]);
        flag = false;
      } else {
        initPos += dir;
      }
      if (initPos < 0 || initPos >= len - 1) {
        // FIX for TypedArrays that don't store floating point values with enough accuracy
        if (initPos === len - 1) {
          return percents[initPos];
        }
        flag = false;
      }
    }
    return percents[initPos] + (percents[initPos + 1] - percents[initPos]) * lPerc;
  }

  function getPointInSegment(pt1, pt2, pt3, pt4, percent, bezierData) {
    var t1 = getDistancePerc(percent, bezierData);
    var u1 = 1 - t1;
    var ptX = math.round((u1 * u1 * u1 * pt1[0] + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * pt3[0] + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * pt4[0] + t1 * t1 * t1 * pt2[0]) * 1000) / 1000;
    var ptY = math.round((u1 * u1 * u1 * pt1[1] + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * pt3[1] + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * pt4[1] + t1 * t1 * t1 * pt2[1]) * 1000) / 1000;
    return [ptX, ptY];
  }

  var bezierSegmentPoints = createTypedArray('float32', 8);

  function getNewSegment(pt1, pt2, pt3, pt4, startPerc, endPerc, bezierData) {
    if (startPerc < 0) {
      startPerc = 0;
    } else if (startPerc > 1) {
      startPerc = 1;
    }
    var t0 = getDistancePerc(startPerc, bezierData);
    endPerc = endPerc > 1 ? 1 : endPerc;
    var t1 = getDistancePerc(endPerc, bezierData);
    var i;
    var len = pt1.length;
    var u0 = 1 - t0;
    var u1 = 1 - t1;
    var u0u0u0 = u0 * u0 * u0;
    var t0u0u0_3 = t0 * u0 * u0 * 3; // eslint-disable-line camelcase
    var t0t0u0_3 = t0 * t0 * u0 * 3; // eslint-disable-line camelcase
    var t0t0t0 = t0 * t0 * t0;
    //
    var u0u0u1 = u0 * u0 * u1;
    var t0u0u1_3 = t0 * u0 * u1 + u0 * t0 * u1 + u0 * u0 * t1; // eslint-disable-line camelcase
    var t0t0u1_3 = t0 * t0 * u1 + u0 * t0 * t1 + t0 * u0 * t1; // eslint-disable-line camelcase
    var t0t0t1 = t0 * t0 * t1;
    //
    var u0u1u1 = u0 * u1 * u1;
    var t0u1u1_3 = t0 * u1 * u1 + u0 * t1 * u1 + u0 * u1 * t1; // eslint-disable-line camelcase
    var t0t1u1_3 = t0 * t1 * u1 + u0 * t1 * t1 + t0 * u1 * t1; // eslint-disable-line camelcase
    var t0t1t1 = t0 * t1 * t1;
    //
    var u1u1u1 = u1 * u1 * u1;
    var t1u1u1_3 = t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1; // eslint-disable-line camelcase
    var t1t1u1_3 = t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1; // eslint-disable-line camelcase
    var t1t1t1 = t1 * t1 * t1;
    for (i = 0; i < len; i += 1) {
      bezierSegmentPoints[i * 4] = math.round((u0u0u0 * pt1[i] + t0u0u0_3 * pt3[i] + t0t0u0_3 * pt4[i] + t0t0t0 * pt2[i]) * 1000) / 1000; // eslint-disable-line camelcase
      bezierSegmentPoints[i * 4 + 1] = math.round((u0u0u1 * pt1[i] + t0u0u1_3 * pt3[i] + t0t0u1_3 * pt4[i] + t0t0t1 * pt2[i]) * 1000) / 1000; // eslint-disable-line camelcase
      bezierSegmentPoints[i * 4 + 2] = math.round((u0u1u1 * pt1[i] + t0u1u1_3 * pt3[i] + t0t1u1_3 * pt4[i] + t0t1t1 * pt2[i]) * 1000) / 1000; // eslint-disable-line camelcase
      bezierSegmentPoints[i * 4 + 3] = math.round((u1u1u1 * pt1[i] + t1u1u1_3 * pt3[i] + t1t1u1_3 * pt4[i] + t1t1t1 * pt2[i]) * 1000) / 1000; // eslint-disable-line camelcase
    }

    return bezierSegmentPoints;
  }

  return {
    getSegmentsLength: getSegmentsLength,
    getNewSegment: getNewSegment,
    getPointInSegment: getPointInSegment,
    buildBezierData: buildBezierData,
    pointOnLine2D: pointOnLine2D,
    pointOnLine3D: pointOnLine3D,
  };
}

var bez = bezFunction();

/* exported dataManager */

function dataFunctionManager() {

  function completeLayers(layers, comps) {
    var layerData;
    var i;
    var len = layers.length;
    var j;
    var jLen;
    var k;
    var kLen;
    for (i = 0; i < len; i += 1) {
      layerData = layers[i];
      if (('ks' in layerData) && !layerData.completed) {
        layerData.completed = true;
        if (layerData.tt) {
          layers[i - 1].td = layerData.tt;
        }
        if (layerData.ty === 0) {
          layerData.layers = findCompLayers(layerData.refId, comps);
          completeLayers(layerData.layers, comps);
        } else if (layerData.ty === 4) {
          completeShapes(layerData.shapes);
        } 
      }
    }
  }

  function findCompLayers(id, comps) {
    var i = 0;
    var len = comps.length;
    while (i < len) {
      if (comps[i].id === id) {
        if (!comps[i].layers.__used) {
          comps[i].layers.__used = true;
          return comps[i].layers;
        }
        return JSON.parse(JSON.stringify(comps[i].layers));
      }
      i += 1;
    }
    return null;
  }

  function completeShapes(arr) {
    var i;
    var len = arr.length;
    var j;
    var jLen;
    for (i = len - 1; i >= 0; i -= 1) {
      if (arr[i].ty === 'sh') {
        if (arr[i].ks.k.i) {
          convertPathsToAbsoluteValues(arr[i].ks.k);
        } else {
          jLen = arr[i].ks.k.length;
          for (j = 0; j < jLen; j += 1) {
            if (arr[i].ks.k[j].s) {
              convertPathsToAbsoluteValues(arr[i].ks.k[j].s[0]);
            }
            if (arr[i].ks.k[j].e) {
              convertPathsToAbsoluteValues(arr[i].ks.k[j].e[0]);
            }
          }
        }
      } else if (arr[i].ty === 'gr') {
        completeShapes(arr[i].it);
      }
    }
  }

  function convertPathsToAbsoluteValues(path) {
    var i;
    var len = path.i.length;
    for (i = 0; i < len; i += 1) {
      path.i[i][0] += path.v[i][0];
      path.i[i][1] += path.v[i][1];                                                                                             
      path.o[i][0] += path.v[i][0];
      path.o[i][1] += path.v[i][1];
    }
  }

  function checkVersion(minimum, animVersionString) {
    var animVersion = animVersionString ? animVersionString.split('.') : [100, 100, 100];
    if (minimum[0] > animVersion[0]) {
      return true;
    } if (animVersion[0] > minimum[0]) {
      return false;
    }
    if (minimum[1] > animVersion[1]) {
      return true;
    } if (animVersion[1] > minimum[1]) {
      return false;
    }
    if (minimum[2] > animVersion[2]) {
      return true;
    } if (animVersion[2] > minimum[2]) {
      return false;
    }
    return null;
  }

  var checkText = (function () {
    var minimumVersion = [4, 4, 14];

    function updateTextLayer(textLayer) {
      var documentData = textLayer.t.d;
      textLayer.t.d = {
        k: [
          {
            s: documentData,
            t: 0,
          },
        ],
      };
    }

    function iterateLayers(layers) {
      var i;
      var len = layers.length;
      for (i = 0; i < len; i += 1) {
        if (layers[i].ty === 5) {
          updateTextLayer(layers[i]);
        }
      }
    }

    return function (animationData) {
      if (checkVersion(minimumVersion, animationData.v)) {
        iterateLayers(animationData.layers);
        if (animationData.assets) {
          var i;
          var len = animationData.assets.length;
          for (i = 0; i < len; i += 1) {
            if (animationData.assets[i].layers) {
              iterateLayers(animationData.assets[i].layers);
            }
          }
        }
      }
    };
  }());

  var checkChars = (function () {
    var minimumVersion = [4, 7, 99];
    return function (animationData) {
      if (animationData.chars && !checkVersion(minimumVersion, animationData.v)) {
        var i;
        var len = animationData.chars.length;
        var j;
        var jLen;
        var pathData;
        var paths;
        for (i = 0; i < len; i += 1) {
          if (animationData.chars[i].data && animationData.chars[i].data.shapes) {
            paths = animationData.chars[i].data.shapes[0].it;
            jLen = paths.length;

            for (j = 0; j < jLen; j += 1) {
              pathData = paths[j].ks.k;
              if (!pathData.__converted) {
                convertPathsToAbsoluteValues(paths[j].ks.k);
                pathData.__converted = true;
              }
            }
          }
        }
      }
    };
  }());

  var checkColors = (function () {
    var minimumVersion = [4, 1, 9];

    function iterateShapes(shapes) {
      var i;
      var len = shapes.length;
      var j;
      var jLen;
      for (i = 0; i < len; i += 1) {
        if (shapes[i].ty === 'gr') {
          iterateShapes(shapes[i].it);
        } else if (shapes[i].ty === 'fl' || shapes[i].ty === 'st') {
          if (shapes[i].c.k && shapes[i].c.k[0].i) {
            jLen = shapes[i].c.k.length;
            for (j = 0; j < jLen; j += 1) {
              if (shapes[i].c.k[j].s) {
                shapes[i].c.k[j].s[0] /= 255;
                shapes[i].c.k[j].s[1] /= 255;
                shapes[i].c.k[j].s[2] /= 255;
                shapes[i].c.k[j].s[3] /= 255;
              }
              if (shapes[i].c.k[j].e) {
                shapes[i].c.k[j].e[0] /= 255;
                shapes[i].c.k[j].e[1] /= 255;
                shapes[i].c.k[j].e[2] /= 255;
                shapes[i].c.k[j].e[3] /= 255;
              }
            }
          } else {
            shapes[i].c.k[0] /= 255;
            shapes[i].c.k[1] /= 255;
            shapes[i].c.k[2] /= 255;
            shapes[i].c.k[3] /= 255;
          }
        }
      }
    }

    function iterateLayers(layers) {
      var i;
      var len = layers.length;
      for (i = 0; i < len; i += 1) {
        if (layers[i].ty === 4) {
          iterateShapes(layers[i].shapes);
        }
      }
    }

    return function (animationData) {
      if (checkVersion(minimumVersion, animationData.v)) {
        iterateLayers(animationData.layers);
        if (animationData.assets) {
          var i;
          var len = animationData.assets.length;
          for (i = 0; i < len; i += 1) {
            if (animationData.assets[i].layers) {
              iterateLayers(animationData.assets[i].layers);
            }
          }
        }
      }
    };
  }());

  var checkShapes = (function () {
    var minimumVersion = [4, 4, 18];

    function completeClosingShapes(arr) {
      var i;
      var len = arr.length;
      var j;
      var jLen;
      for (i = len - 1; i >= 0; i -= 1) {
        if (arr[i].ty === 'sh') {
          if (arr[i].ks.k.i) {
            arr[i].ks.k.c = arr[i].closed;
          } else {
            jLen = arr[i].ks.k.length;
            for (j = 0; j < jLen; j += 1) {
              if (arr[i].ks.k[j].s) {
                arr[i].ks.k[j].s[0].c = arr[i].closed;
              }
              if (arr[i].ks.k[j].e) {
                arr[i].ks.k[j].e[0].c = arr[i].closed;
              }
            }
          }
        } else if (arr[i].ty === 'gr') {
          completeClosingShapes(arr[i].it);
        }
      }
    }

    function iterateLayers(layers) {
      var layerData;
      var i;
      var len = layers.length;
      var j;
      var jLen;
      var k;
      var kLen;
      for (i = 0; i < len; i += 1) {
        layerData = layers[i];
        if (layerData.ty === 4) {
          completeClosingShapes(layerData.shapes);
        }
      }
    }

    return function (animationData) {
      if (checkVersion(minimumVersion, animationData.v)) {
        iterateLayers(animationData.layers);
        if (animationData.assets) {
          var i;
          var len = animationData.assets.length;
          for (i = 0; i < len; i += 1) {
            if (animationData.assets[i].layers) {
              iterateLayers(animationData.assets[i].layers);
            }
          }
        }
      }
    };
  }());

  function completeData(animationData) {
    if (animationData.__complete) {
      return;
    }
    checkColors(animationData);
    checkText(animationData);
    checkChars(animationData);
    checkShapes(animationData);
    completeLayers(animationData.layers, animationData.assets);
    animationData.__complete = true;
  }


  var moduleOb = {};
  moduleOb.completeData = completeData;
  moduleOb.checkColors = checkColors;
  moduleOb.checkChars = checkChars;
  moduleOb.checkShapes = checkShapes;
  moduleOb.completeLayers = completeLayers;

  return moduleOb;
}

var dataManager = dataFunctionManager();


/* global initialDefaultFrame, BezierFactory, degToRads, bez, createTypedArray */
/* exported PropertyFactory */

var PropertyFactory = (function () {
  var initFrame = initialDefaultFrame;
  var mathAbs = Math.abs;

  function interpolateValue(frameNum, caching) {
    var offsetTime = this.offsetTime;
    var newValue;
    if (this.propType === 'multidimensional') {
      newValue = createTypedArray('float32', this.pv.length);
    }
    var iterationIndex = caching.lastIndex;
    var i = iterationIndex;
    var len = this.keyframes.length - 1;
    var flag = true;
    var keyData;
    var nextKeyData;

    while (flag) {
      keyData = this.keyframes[i];
      nextKeyData = this.keyframes[i + 1];
      if (i === len - 1 && frameNum >= nextKeyData.t - offsetTime) {
        if (keyData.h) {
          keyData = nextKeyData;
        }
        iterationIndex = 0;
        break;
      }
      if ((nextKeyData.t - offsetTime) > frameNum) {
        iterationIndex = i;
        break;
      }
      if (i < len - 1) {
        i += 1;
      } else {
        iterationIndex = 0;
        flag = false;
      }
    }

    var k;
    var kLen;
    var perc;
    var jLen;
    var j;
    var fnc;
    var nextKeyTime = nextKeyData.t - offsetTime;
    var keyTime = keyData.t - offsetTime;
    var endValue;
    if (keyData.to) {
      if (!keyData.bezierData) {
        keyData.bezierData = bez.buildBezierData(keyData.s, nextKeyData.s || keyData.e, keyData.to, keyData.ti);
      }
      var bezierData = keyData.bezierData;
      if (frameNum >= nextKeyTime || frameNum < keyTime) {
        var ind = frameNum >= nextKeyTime ? bezierData.points.length - 1 : 0;
        kLen = bezierData.points[ind].point.length;
        for (k = 0; k < kLen; k += 1) {
          newValue[k] = bezierData.points[ind].point[k];
        }
        // caching._lastKeyframeIndex = -1;
      } else {
        if (keyData.__fnct) {
          fnc = keyData.__fnct;
        } else {
          fnc = BezierFactory.getBezierEasing(keyData.o.x, keyData.o.y, keyData.i.x, keyData.i.y, keyData.n).get;
          keyData.__fnct = fnc;
        }
        perc = fnc((frameNum - keyTime) / (nextKeyTime - keyTime));
        var distanceInLine = bezierData.segmentLength * perc;

        var segmentPerc;
        var addedLength = (caching.lastFrame < frameNum && caching._lastKeyframeIndex === i) ? caching._lastAddedLength : 0;
        j = (caching.lastFrame < frameNum && caching._lastKeyframeIndex === i) ? caching._lastPoint : 0;
        flag = true;
        jLen = bezierData.points.length;
        while (flag) {
          addedLength += bezierData.points[j].partialLength;
          if (distanceInLine === 0 || perc === 0 || j === bezierData.points.length - 1) {
            kLen = bezierData.points[j].point.length;
            for (k = 0; k < kLen; k += 1) {
              newValue[k] = bezierData.points[j].point[k];
            }
            break;
          } else if (distanceInLine >= addedLength && distanceInLine < addedLength + bezierData.points[j + 1].partialLength) {
            segmentPerc = (distanceInLine - addedLength) / bezierData.points[j + 1].partialLength;
            kLen = bezierData.points[j].point.length;
            for (k = 0; k < kLen; k += 1) {
              newValue[k] = bezierData.points[j].point[k] + (bezierData.points[j + 1].point[k] - bezierData.points[j].point[k]) * segmentPerc;
            }
            break;
          }
          if (j < jLen - 1) {
            j += 1;
          } else {
            flag = false;
          }
        }
        caching._lastPoint = j;
        caching._lastAddedLength = addedLength - bezierData.points[j].partialLength;
        caching._lastKeyframeIndex = i;
      }
    } else {
      var outX;
      var outY;
      var inX;
      var inY;
      var keyValue;
      len = keyData.s.length;
      endValue = nextKeyData.s || keyData.e;
      if (this.sh && keyData.h !== 1) {
        if (frameNum >= nextKeyTime) {
          newValue[0] = endValue[0];
          newValue[1] = endValue[1];
          newValue[2] = endValue[2];
        } else if (frameNum <= keyTime) {
          newValue[0] = keyData.s[0];
          newValue[1] = keyData.s[1];
          newValue[2] = keyData.s[2];
        } else {
          var quatStart = createQuaternion(keyData.s);
          var quatEnd = createQuaternion(endValue);
          var time = (frameNum - keyTime) / (nextKeyTime - keyTime);
          quaternionToEuler(newValue, slerp(quatStart, quatEnd, time));
        }
      } else {
        for (i = 0; i < len; i += 1) {
          if (keyData.h !== 1) {
            if (frameNum >= nextKeyTime) {
              perc = 1;
            } else if (frameNum < keyTime) {
              perc = 0;
            } else {
              if (keyData.o.x.constructor === Array) {
                if (!keyData.__fnct) {
                  keyData.__fnct = [];
                }
                if (!keyData.__fnct[i]) {
                  outX = (typeof keyData.o.x[i] === 'undefined') ? keyData.o.x[0] : keyData.o.x[i];
                  outY = (typeof keyData.o.y[i] === 'undefined') ? keyData.o.y[0] : keyData.o.y[i];
                  inX = (typeof keyData.i.x[i] === 'undefined') ? keyData.i.x[0] : keyData.i.x[i];
                  inY = (typeof keyData.i.y[i] === 'undefined') ? keyData.i.y[0] : keyData.i.y[i];
                  fnc = BezierFactory.getBezierEasing(outX, outY, inX, inY).get;
                  keyData.__fnct[i] = fnc;
                } else {
                  fnc = keyData.__fnct[i];
                }
              } else if (!keyData.__fnct) {
                outX = keyData.o.x;
                outY = keyData.o.y;
                inX = keyData.i.x;
                inY = keyData.i.y;
                fnc = BezierFactory.getBezierEasing(outX, outY, inX, inY).get;
                keyData.__fnct = fnc;
              } else {
                fnc = keyData.__fnct;
              }
              perc = fnc((frameNum - keyTime) / (nextKeyTime - keyTime));
            }
          }

          endValue = nextKeyData.s || keyData.e;
          keyValue = keyData.h === 1 ? keyData.s[i] : keyData.s[i] + (endValue[i] - keyData.s[i]) * perc;

          if (this.propType === 'multidimensional') {
            newValue[i] = keyValue;
          } else {
            newValue = keyValue;
          }
        }
      }
    }
    caching.lastIndex = iterationIndex;
    return newValue;
  }

  // based on @Toji's https://github.com/toji/gl-matrix/
  function slerp(a, b, t) {
    var out = [];
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    var bx = b[0];
    var by = b[1];
    var bz = b[2];
    var bw = b[3];

    var omega;
    var cosom;
    var sinom;
    var scale0;
    var scale1;

    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if ((1.0 - cosom) > 0.000001) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1.0 - t;
      scale1 = t;
    }
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
  }

  function quaternionToEuler(out, quat) {
    var qx = quat[0];
    var qy = quat[1];
    var qz = quat[2];
    var qw = quat[3];
    var heading = Math.atan2(2 * qy * qw - 2 * qx * qz, 1 - 2 * qy * qy - 2 * qz * qz);
    var attitude = Math.asin(2 * qx * qy + 2 * qz * qw);
    var bank = Math.atan2(2 * qx * qw - 2 * qy * qz, 1 - 2 * qx * qx - 2 * qz * qz);
    out[0] = heading / degToRads;
    out[1] = attitude / degToRads;
    out[2] = bank / degToRads;
  }

  function createQuaternion(values) {
    var heading = values[0] * degToRads;
    var attitude = values[1] * degToRads;
    var bank = values[2] * degToRads;
    var c1 = Math.cos(heading / 2);
    var c2 = Math.cos(attitude / 2);
    var c3 = Math.cos(bank / 2);
    var s1 = Math.sin(heading / 2);
    var s2 = Math.sin(attitude / 2);
    var s3 = Math.sin(bank / 2);
    var w = c1 * c2 * c3 - s1 * s2 * s3;
    var x = s1 * s2 * c3 + c1 * c2 * s3;
    var y = s1 * c2 * c3 + c1 * s2 * s3;
    var z = c1 * s2 * c3 - s1 * c2 * s3;

    return [x, y, z, w];
  }

  function getValueAtCurrentTime() {
    var frameNum = this.comp.renderedFrame - this.offsetTime;
    var initTime = this.keyframes[0].t - this.offsetTime;
    var endTime = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
    if (!(frameNum === this._caching.lastFrame || (this._caching.lastFrame !== initFrame && ((this._caching.lastFrame >= endTime && frameNum >= endTime) || (this._caching.lastFrame < initTime && frameNum < initTime))))) {
      if (this._caching.lastFrame >= frameNum) {
        this._caching._lastKeyframeIndex = -1;
        this._caching.lastIndex = 0;
      }

      var renderResult = this.interpolateValue(frameNum, this._caching);
      this.pv = renderResult;
    }
    this._caching.lastFrame = frameNum;
    return this.pv;
  }

  function setVValue(val) {
    var multipliedValue;
    if (this.propType === 'unidimensional') {
      multipliedValue = val * this.mult;
      if (mathAbs(this.v - multipliedValue) > 0.00001) {
        this.v = multipliedValue;
        this._mdf = true;
      }
    } else {
      var i = 0;
      var len = this.v.length;
      while (i < len) {
        multipliedValue = val[i] * this.mult;
        if (mathAbs(this.v[i] - multipliedValue) > 0.00001) {
          this.v[i] = multipliedValue;
          this._mdf = true;
        }
        i += 1;
      }
    }
  }

  function processEffectsSequence() {
    if (this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length) {
      return;
    }
    if (this.lock) {
      this.setVValue(this.pv);
      return;
    }
    this.lock = true;
    this._mdf = this._isFirstFrame;
    var i;
    var len = this.effectsSequence.length;
    var finalValue = this.kf ? this.pv : this.data.k;
    for (i = 0; i < len; i += 1) {
      finalValue = this.effectsSequence[i](finalValue);
    }
    this.setVValue(finalValue);
    this._isFirstFrame = false;
    this.lock = false;
    this.frameId = this.elem.globalData.frameId;
  }

  function addEffect(effectFunction) {
    this.effectsSequence.push(effectFunction);
    this.container.addDynamicProperty(this);
  }

  function ValueProperty(elem, data, mult, container) {
    this.propType = 'unidimensional';
    this.mult = mult || 1;
    this.data = data;
    this.v = mult ? data.k * mult : data.k;
    this.pv = data.k;
    this._mdf = false;
    this.elem = elem;
    this.container = container;
    this.comp = elem.comp;
    this.k = false;
    this.kf = false;
    this.vel = 0;
    this.effectsSequence = [];
    this._isFirstFrame = true;
    this.getValue = processEffectsSequence;
    this.setVValue = setVValue;
    this.addEffect = addEffect;
  }

  function MultiDimensionalProperty(elem, data, mult, container) {
    this.propType = 'multidimensional';
    this.mult = mult || 1;
    this.data = data;
    this._mdf = false;
    this.elem = elem;
    this.container = container;
    this.comp = elem.comp;
    this.k = false;
    this.kf = false;
    this.frameId = -1;
    var i;
    var len = data.k.length;
    this.v = createTypedArray('float32', len);
    this.pv = createTypedArray('float32', len);
    this.vel = createTypedArray('float32', len);
    for (i = 0; i < len; i += 1) {
      this.v[i] = data.k[i] * this.mult;
      this.pv[i] = data.k[i];
    }
    this._isFirstFrame = true;
    this.effectsSequence = [];
    this.getValue = processEffectsSequence;
    this.setVValue = setVValue;
    this.addEffect = addEffect;
  }

  function KeyframedValueProperty(elem, data, mult, container) {
    this.propType = 'unidimensional';
    this.keyframes = data.k;
    this.offsetTime = elem.data.st;
    this.frameId = -1;
    this._caching = {
      lastFrame: initFrame, lastIndex: 0, value: 0, _lastKeyframeIndex: -1,
    };
    this.k = true;
    this.kf = true;
    this.data = data;
    this.mult = mult || 1;
    this.elem = elem;
    this.container = container;
    this.comp = elem.comp;
    this.v = initFrame;
    this.pv = initFrame;
    this._isFirstFrame = true;
    this.getValue = processEffectsSequence;
    this.setVValue = setVValue;
    this.interpolateValue = interpolateValue;
    this.effectsSequence = [getValueAtCurrentTime.bind(this)];
    this.addEffect = addEffect;
  }

  function KeyframedMultidimensionalProperty(elem, data, mult, container) {
    this.propType = 'multidimensional';
    var i;
    var len = data.k.length;
    var s;
    var e;
    var to;
    var ti;
    for (i = 0; i < len - 1; i += 1) {
      if (data.k[i].to && data.k[i].s && data.k[i + 1] && data.k[i + 1].s) {
        s = data.k[i].s;
        e = data.k[i + 1].s;
        to = data.k[i].to;
        ti = data.k[i].ti;
        if ((s.length === 2 && !(s[0] === e[0] && s[1] === e[1]) && bez.pointOnLine2D(s[0], s[1], e[0], e[1], s[0] + to[0], s[1] + to[1]) && bez.pointOnLine2D(s[0], s[1], e[0], e[1], e[0] + ti[0], e[1] + ti[1])) || (s.length === 3 && !(s[0] === e[0] && s[1] === e[1] && s[2] === e[2]) && bez.pointOnLine3D(s[0], s[1], s[2], e[0], e[1], e[2], s[0] + to[0], s[1] + to[1], s[2] + to[2]) && bez.pointOnLine3D(s[0], s[1], s[2], e[0], e[1], e[2], e[0] + ti[0], e[1] + ti[1], e[2] + ti[2]))) {
          data.k[i].to = null;
          data.k[i].ti = null;
        }
        if (s[0] === e[0] && s[1] === e[1] && to[0] === 0 && to[1] === 0 && ti[0] === 0 && ti[1] === 0) {
          if (s.length === 2 || (s[2] === e[2] && to[2] === 0 && ti[2] === 0)) {
            data.k[i].to = null;
            data.k[i].ti = null;
          }
        }
      }
    }
    this.effectsSequence = [getValueAtCurrentTime.bind(this)];
    this.data = data;
    this.keyframes = data.k;
    this.offsetTime = elem.data.st;
    this.k = true;
    this.kf = true;
    this._isFirstFrame = true;
    this.mult = mult || 1;
    this.elem = elem;
    this.container = container;
    this.comp = elem.comp;
    this.getValue = processEffectsSequence;
    this.setVValue = setVValue;
    this.interpolateValue = interpolateValue;
    this.frameId = -1;
    var arrLen = data.k[0].s.length;
    this.v = createTypedArray('float32', arrLen);
    this.pv = createTypedArray('float32', arrLen);
    for (i = 0; i < arrLen; i += 1) {
      this.v[i] = initFrame;
      this.pv[i] = initFrame;
    }
    this._caching = { lastFrame: initFrame, lastIndex: 0, value: createTypedArray('float32', arrLen) };
    this.addEffect = addEffect;
  }

  function getProp(elem, data, type, mult, container) {
    var p;
    if (!data.k.length) {
      p = new ValueProperty(elem, data, mult, container);
    } else if (typeof (data.k[0]) === 'number') {
      p = new MultiDimensionalProperty(elem, data, mult, container);
    } else {
      switch (type) {
        case 0:
          p = new KeyframedValueProperty(elem, data, mult, container);
          break;
        case 1:
          p = new KeyframedMultidimensionalProperty(elem, data, mult, container);
          break;
        default:
          break;
      }
    }
    if (p.effectsSequence.length) {
      container.addDynamicProperty(p);
    }
    return p;
  }

  var ob = {
    getProp: getProp,
  };
  return ob;
}());

/* global Matrix, degToRads, PropertyFactory, extendPrototype, DynamicPropertyContainer */
/* exported TransformPropertyFactory */

var TransformPropertyFactory = (function () {
  var defaultVector = [0, 0];

  function applyToMatrix(mat) {
    var _mdf = this._mdf;
    this.iterateDynamicProperties();
    this._mdf = this._mdf || _mdf;
    if (this.a) {
      mat.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
    }
    if (this.s) {
      mat.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
    }
    if (this.sk) {
      mat.skewFromAxis(-this.sk.v, this.sa.v);
    }
    if (this.r) {
      mat.rotate(-this.r.v);
    } else {
      mat.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2])
        .rotateY(this.or.v[1])
        .rotateX(this.or.v[0]);
    }
    if (this.data.p.s) {
      if (this.data.p.z) {
        mat.translate(this.px.v, this.py.v, -this.pz.v);
      } else {
        mat.translate(this.px.v, this.py.v, 0);
      }
    } else {
      mat.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
    }
  }
  function processKeys(forceRender) {
    if (this.elem.globalData.frameId === this.frameId) {
      return;
    }
    if (this._isDirty) {
      this.precalculateMatrix();
      this._isDirty = false;
    }

    this.iterateDynamicProperties();

    if (this._mdf || forceRender) {
      var frameRate;
      this.v.cloneFromProps(this.pre.props);
      if (this.appliedTransformations < 1) {
        this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
      }
      if (this.appliedTransformations < 2) {
        this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
      }
      if (this.sk && this.appliedTransformations < 3) {
        this.v.skewFromAxis(-this.sk.v, this.sa.v);
      }
      if (this.r && this.appliedTransformations < 4) {
        this.v.rotate(-this.r.v);
      } else if (!this.r && this.appliedTransformations < 4) {
        this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2])
          .rotateY(this.or.v[1])
          .rotateX(this.or.v[0]);
      }
      if (this.data.p && this.data.p.s) {
        if (this.data.p.z) {
          this.v.translate(this.px.v, this.py.v, -this.pz.v);
        } else {
          this.v.translate(this.px.v, this.py.v, 0);
        }
      } else {
        this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
      }
    }
    this.frameId = this.elem.globalData.frameId;
  }

  function precalculateMatrix() {
    if (!this.a.k) {
      this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
      this.appliedTransformations = 1;
    } else {
      return;
    }
    if (!this.s.effectsSequence.length) {
      this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
      this.appliedTransformations = 2;
    } else {
      return;
    }
    if (this.sk) {
      if (!this.sk.effectsSequence.length && !this.sa.effectsSequence.length) {
        this.pre.skewFromAxis(-this.sk.v, this.sa.v);
        this.appliedTransformations = 3;
      } else {
        return;
      }
    }
    if (this.r) {
      if (!this.r.effectsSequence.length) {
        this.pre.rotate(-this.r.v);
        this.appliedTransformations = 4;
      }
    } else if (!this.rz.effectsSequence.length && !this.ry.effectsSequence.length && !this.rx.effectsSequence.length && !this.or.effectsSequence.length) {
      this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2])
        .rotateY(this.or.v[1])
        .rotateX(this.or.v[0]);
      this.appliedTransformations = 4;
    }
  }

  function addDynamicProperty(prop) {
    this._addDynamicProperty(prop);
    this.elem.addDynamicProperty(prop);
    this._isDirty = true;
  }

  function TransformProperty(elem, data, container) {
    this.elem = elem;
    this.frameId = -1;
    this.propType = 'transform';
    this.data = data;
    this.v = new Matrix();
    // Precalculated matrix with non animated properties
    this.pre = new Matrix();
    this.appliedTransformations = 0;
    this.initDynamicPropertyContainer(container || elem);
    if (data.p && data.p.s) {
      this.px = PropertyFactory.getProp(elem, data.p.x, 0, 0, this);
      this.py = PropertyFactory.getProp(elem, data.p.y, 0, 0, this);
      if (data.p.z) {
        this.pz = PropertyFactory.getProp(elem, data.p.z, 0, 0, this);
      }
    } else {
      this.p = PropertyFactory.getProp(elem, data.p || { k: [0, 0, 0] }, 1, 0, this);
    }
    if (data.rx) {
      this.rx = PropertyFactory.getProp(elem, data.rx, 0, degToRads, this);
      this.ry = PropertyFactory.getProp(elem, data.ry, 0, degToRads, this);
      this.rz = PropertyFactory.getProp(elem, data.rz, 0, degToRads, this);
      if (data.or.k[0].ti) {
        var i;
        var len = data.or.k.length;
        for (i = 0; i < len; i += 1) {
          data.or.k[i].to = null;
          data.or.k[i].ti = null;
        }
      }
      this.or = PropertyFactory.getProp(elem, data.or, 1, degToRads, this);
      // sh Indicates it needs to be capped between -180 and 180
      this.or.sh = true;
    } else {
      this.r = PropertyFactory.getProp(elem, data.r || { k: 0 }, 0, degToRads, this);
    }
    if (data.sk) {
      this.sk = PropertyFactory.getProp(elem, data.sk, 0, degToRads, this);
      this.sa = PropertyFactory.getProp(elem, data.sa, 0, degToRads, this);
    }
    this.a = PropertyFactory.getProp(elem, data.a || { k: [0, 0, 0] }, 1, 0, this);
    this.s = PropertyFactory.getProp(elem, data.s || { k: [100, 100, 100] }, 1, 0.01, this);
    // Opacity is not part of the transform properties, that's why it won't use this.dynamicProperties. That way transforms won't get updated if opacity changes.
    if (data.o) {
      this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, elem);
    } else {
      this.o = { _mdf: false, v: 1 };
    }
    this._isDirty = true;
    if (!this.dynamicProperties.length) {
      this.getValue(true);
    }
  }

  TransformProperty.prototype = {
    applyToMatrix: applyToMatrix,
    getValue: processKeys,
    precalculateMatrix: precalculateMatrix,
  };

  extendPrototype([DynamicPropertyContainer], TransformProperty);
  TransformProperty.prototype.addDynamicProperty = addDynamicProperty;
  TransformProperty.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty;

  function getTransformProperty(elem, data, container) {
    return new TransformProperty(elem, data, container);
  }

  return {
    getTransformProperty: getTransformProperty,
  };
}());

/* global createSizedArray, createSizedArray, pointPool */

function ShapePath() {
  this.c = false;
  this._length = 0;
  this._maxLength = 8;
  this.v = createSizedArray(this._maxLength);
  this.o = createSizedArray(this._maxLength);
  this.i = createSizedArray(this._maxLength);
}

ShapePath.prototype.setPathData = function (closed, len) {
  this.c = closed;
  this.setLength(len);
  var i = 0;
  while (i < len) {
    this.v[i] = pointPool.newElement();
    this.o[i] = pointPool.newElement();
    this.i[i] = pointPool.newElement();
    i += 1;
  }
};

ShapePath.prototype.setLength = function (len) {
  while (this._maxLength < len) {
    this.doubleArrayLength();
  }
  this._length = len;
};

ShapePath.prototype.doubleArrayLength = function () {
  this.v = this.v.concat(createSizedArray(this._maxLength));
  this.i = this.i.concat(createSizedArray(this._maxLength));
  this.o = this.o.concat(createSizedArray(this._maxLength));
  this._maxLength *= 2;
};

ShapePath.prototype.setXYAt = function (x, y, type, pos, replace) {
  var arr;
  this._length = Math.max(this._length, pos + 1);
  if (this._length >= this._maxLength) {
    this.doubleArrayLength();
  }
  switch (type) {
    case 'v':
      arr = this.v;
      break;
    case 'i':
      arr = this.i;
      break;
    case 'o':
      arr = this.o;
      break;
    default:
      arr = [];
      break;
  }
  if (!arr[pos] || (arr[pos] && !replace)) {
    arr[pos] = pointPool.newElement();
  }
  arr[pos][0] = x;
  arr[pos][1] = y;
};

ShapePath.prototype.setTripleAt = function (vX, vY, oX, oY, iX, iY, pos, replace) {
  this.setXYAt(vX, vY, 'v', pos, replace);
  this.setXYAt(oX, oY, 'o', pos, replace);
  this.setXYAt(iX, iY, 'i', pos, replace);
};

ShapePath.prototype.reverse = function () {
  var newPath = new ShapePath();
  newPath.setPathData(this.c, this._length);
  var vertices = this.v;
  var outPoints = this.o;
  var inPoints = this.i;
  var init = 0;
  if (this.c) {
    newPath.setTripleAt(vertices[0][0], vertices[0][1], inPoints[0][0], inPoints[0][1], outPoints[0][0], outPoints[0][1], 0, false);
    init = 1;
  }
  var cnt = this._length - 1;
  var len = this._length;

  var i;
  for (i = init; i < len; i += 1) {
    newPath.setTripleAt(vertices[cnt][0], vertices[cnt][1], inPoints[cnt][0], inPoints[cnt][1], outPoints[cnt][0], outPoints[cnt][1], i, false);
    cnt -= 1;
  }
  return newPath;
};

/* global extendPrototype, roundCorner, BezierFactory, shapePool, degToRads,
  shapeCollectionPool, PropertyFactory, bmMin, DynamicPropertyContainer */
/* exported ShapePropertyFactory */

var ShapePropertyFactory = (function () {
  var initFrame = -999999;

  function interpolateShape(frameNum, previousValue, caching) {
    var iterationIndex = caching.lastIndex;
    var keyPropS;
    var keyPropE;
    var isHold;
    var j;
    var k;
    var jLen;
    var kLen;
    var perc;
    var vertexValue;
    var kf = this.keyframes;
    if (frameNum < kf[0].t - this.offsetTime) {
      keyPropS = kf[0].s[0];
      isHold = true;
      iterationIndex = 0;
    } else if (frameNum >= kf[kf.length - 1].t - this.offsetTime) {
      keyPropS = kf[kf.length - 1].s ? kf[kf.length - 1].s[0] : kf[kf.length - 2].e[0];
      /* if(kf[kf.length - 1].s){
                keyPropS = kf[kf.length - 1].s[0];
            }else{
                keyPropS = kf[kf.length - 2].e[0];
            } */
      isHold = true;
    } else {
      var i = iterationIndex;
      var len = kf.length - 1;
      var flag = true;
      var keyData;
      var nextKeyData;
      while (flag) {
        keyData = kf[i];
        nextKeyData = kf[i + 1];
        if ((nextKeyData.t - this.offsetTime) > frameNum) {
          break;
        }
        if (i < len - 1) {
          i += 1;
        } else {
          flag = false;
        }
      }
      isHold = keyData.h === 1;
      iterationIndex = i;
      if (!isHold) {
        if (frameNum >= nextKeyData.t - this.offsetTime) {
          perc = 1;
        } else if (frameNum < keyData.t - this.offsetTime) {
          perc = 0;
        } else {
          var fnc;
          if (keyData.__fnct) {
            fnc = keyData.__fnct;
          } else {
            fnc = BezierFactory.getBezierEasing(keyData.o.x, keyData.o.y, keyData.i.x, keyData.i.y).get;
            keyData.__fnct = fnc;
          }
          perc = fnc((frameNum - (keyData.t - this.offsetTime)) / ((nextKeyData.t - this.offsetTime) - (keyData.t - this.offsetTime)));
        }
        keyPropE = nextKeyData.s ? nextKeyData.s[0] : keyData.e[0];
      }
      keyPropS = keyData.s[0];
    }
    jLen = previousValue._length;
    kLen = keyPropS.i[0].length;
    caching.lastIndex = iterationIndex;

    for (j = 0; j < jLen; j += 1) {
      for (k = 0; k < kLen; k += 1) {
        vertexValue = isHold ? keyPropS.i[j][k] : keyPropS.i[j][k] + (keyPropE.i[j][k] - keyPropS.i[j][k]) * perc;
        previousValue.i[j][k] = vertexValue;
        vertexValue = isHold ? keyPropS.o[j][k] : keyPropS.o[j][k] + (keyPropE.o[j][k] - keyPropS.o[j][k]) * perc;
        previousValue.o[j][k] = vertexValue;
        vertexValue = isHold ? keyPropS.v[j][k] : keyPropS.v[j][k] + (keyPropE.v[j][k] - keyPropS.v[j][k]) * perc;
        previousValue.v[j][k] = vertexValue;
      }
    }
  }

  function interpolateShapeCurrentTime() {
    var frameNum = this.comp.renderedFrame - this.offsetTime;
    var initTime = this.keyframes[0].t - this.offsetTime;
    var endTime = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
    var lastFrame = this._caching.lastFrame;
    if (!(lastFrame !== initFrame && ((lastFrame < initTime && frameNum < initTime) || (lastFrame > endTime && frameNum > endTime)))) {
      /// /
      this._caching.lastIndex = lastFrame < frameNum ? this._caching.lastIndex : 0;
      this.interpolateShape(frameNum, this.pv, this._caching);
      /// /
    }
    this._caching.lastFrame = frameNum;
    return this.pv;
  }

  function resetShape() {
    this.paths = this.localShapeCollection;
  }

  function shapesEqual(shape1, shape2) {
    if (shape1._length !== shape2._length || shape1.c !== shape2.c) {
      return false;
    }
    var i;
    var len = shape1._length;
    for (i = 0; i < len; i += 1) {
      if (shape1.v[i][0] !== shape2.v[i][0]
            || shape1.v[i][1] !== shape2.v[i][1]
            || shape1.o[i][0] !== shape2.o[i][0]
            || shape1.o[i][1] !== shape2.o[i][1]
            || shape1.i[i][0] !== shape2.i[i][0]
            || shape1.i[i][1] !== shape2.i[i][1]) {
        return false;
      }
    }
    return true;
  }

  function setVValue(newPath) {
    if (!shapesEqual(this.v, newPath)) {
      this.v = shapePool.clone(newPath);
      this.localShapeCollection.releaseShapes();
      this.localShapeCollection.addShape(this.v);
      this._mdf = true;
      this.paths = this.localShapeCollection;
    }
  }

  function processEffectsSequence() {
    if (this.elem.globalData.frameId === this.frameId) {
      return;
    } if (!this.effectsSequence.length) {
      this._mdf = false;
      return;
    }
    if (this.lock) {
      this.setVValue(this.pv);
      return;
    }
    this.lock = true;
    this._mdf = false;
    var finalValue;
    if (this.kf) {
      finalValue = this.pv;
    } else if (this.data.ks) {
      finalValue = this.data.ks.k;
    } else {
      finalValue = this.data.pt.k;
    }
    var i;
    var len = this.effectsSequence.length;
    for (i = 0; i < len; i += 1) {
      finalValue = this.effectsSequence[i](finalValue);
    }
    this.setVValue(finalValue);
    this.lock = false;
    this.frameId = this.elem.globalData.frameId;
  }

  function ShapeProperty(elem, data, type) {
    this.propType = 'shape';
    this.comp = elem.comp;
    this.container = elem;
    this.elem = elem;
    this.data = data;
    this.k = false;
    this.kf = false;
    this._mdf = false;
    var pathData = type === 3 ? data.pt.k : data.ks.k;
    this.v = shapePool.clone(pathData);
    this.pv = shapePool.clone(this.v);
    this.localShapeCollection = shapeCollectionPool.newShapeCollection();
    this.paths = this.localShapeCollection;
    this.paths.addShape(this.v);
    this.reset = resetShape;
    this.effectsSequence = [];
  }

  function addEffect(effectFunction) {
    this.effectsSequence.push(effectFunction);
    this.container.addDynamicProperty(this);
  }

  ShapeProperty.prototype.interpolateShape = interpolateShape;
  ShapeProperty.prototype.getValue = processEffectsSequence;
  ShapeProperty.prototype.setVValue = setVValue;
  ShapeProperty.prototype.addEffect = addEffect;

  function KeyframedShapeProperty(elem, data, type) {
    this.propType = 'shape';
    this.comp = elem.comp;
    this.elem = elem;
    this.container = elem;
    this.offsetTime = elem.data.st;
    this.keyframes = type === 3 ? data.pt.k : data.ks.k;
    this.k = true;
    this.kf = true;
    var len = this.keyframes[0].s[0].i.length;
    this.v = shapePool.newElement();
    this.v.setPathData(this.keyframes[0].s[0].c, len);
    this.pv = shapePool.clone(this.v);
    this.localShapeCollection = shapeCollectionPool.newShapeCollection();
    this.paths = this.localShapeCollection;
    this.paths.addShape(this.v);
    this.lastFrame = initFrame;
    this.reset = resetShape;
    this._caching = { lastFrame: initFrame, lastIndex: 0 };
    this.effectsSequence = [interpolateShapeCurrentTime.bind(this)];
  }
  KeyframedShapeProperty.prototype.getValue = processEffectsSequence;
  KeyframedShapeProperty.prototype.interpolateShape = interpolateShape;
  KeyframedShapeProperty.prototype.setVValue = setVValue;
  KeyframedShapeProperty.prototype.addEffect = addEffect;

  var EllShapeProperty = (function () {
    var cPoint = roundCorner;

    function EllShapePropertyFactory(elem, data) {
      /* this.v = {
                v: createSizedArray(4),
                i: createSizedArray(4),
                o: createSizedArray(4),
                c: true
            }; */
      this.v = shapePool.newElement();
      this.v.setPathData(true, 4);
      this.localShapeCollection = shapeCollectionPool.newShapeCollection();
      this.paths = this.localShapeCollection;
      this.localShapeCollection.addShape(this.v);
      this.d = data.d;
      this.elem = elem;
      this.comp = elem.comp;
      this.frameId = -1;
      this.initDynamicPropertyContainer(elem);
      this.p = PropertyFactory.getProp(elem, data.p, 1, 0, this);
      this.s = PropertyFactory.getProp(elem, data.s, 1, 0, this);
      if (this.dynamicProperties.length) {
        this.k = true;
      } else {
        this.k = false;
        this.convertEllToPath();
      }
    }

    EllShapePropertyFactory.prototype = {
      reset: resetShape,
      getValue: function () {
        if (this.elem.globalData.frameId === this.frameId) {
          return;
        }
        this.frameId = this.elem.globalData.frameId;
        this.iterateDynamicProperties();

        if (this._mdf) {
          this.convertEllToPath();
        }
      },
      convertEllToPath: function () {
        var p0 = this.p.v[0];
        var p1 = this.p.v[1];
        var s0 = this.s.v[0] / 2;
        var s1 = this.s.v[1] / 2;
        var _cw = this.d !== 3;
        var _v = this.v;
        _v.v[0][0] = p0;
        _v.v[0][1] = p1 - s1;
        _v.v[1][0] = _cw ? p0 + s0 : p0 - s0;
        _v.v[1][1] = p1;
        _v.v[2][0] = p0;
        _v.v[2][1] = p1 + s1;
        _v.v[3][0] = _cw ? p0 - s0 : p0 + s0;
        _v.v[3][1] = p1;
        _v.i[0][0] = _cw ? p0 - s0 * cPoint : p0 + s0 * cPoint;
        _v.i[0][1] = p1 - s1;
        _v.i[1][0] = _cw ? p0 + s0 : p0 - s0;
        _v.i[1][1] = p1 - s1 * cPoint;
        _v.i[2][0] = _cw ? p0 + s0 * cPoint : p0 - s0 * cPoint;
        _v.i[2][1] = p1 + s1;
        _v.i[3][0] = _cw ? p0 - s0 : p0 + s0;
        _v.i[3][1] = p1 + s1 * cPoint;
        _v.o[0][0] = _cw ? p0 + s0 * cPoint : p0 - s0 * cPoint;
        _v.o[0][1] = p1 - s1;
        _v.o[1][0] = _cw ? p0 + s0 : p0 - s0;
        _v.o[1][1] = p1 + s1 * cPoint;
        _v.o[2][0] = _cw ? p0 - s0 * cPoint : p0 + s0 * cPoint;
        _v.o[2][1] = p1 + s1;
        _v.o[3][0] = _cw ? p0 - s0 : p0 + s0;
        _v.o[3][1] = p1 - s1 * cPoint;
      },
    };

    extendPrototype([DynamicPropertyContainer], EllShapePropertyFactory);

    return EllShapePropertyFactory;
  }());

  var StarShapeProperty = (function () {
    function StarShapePropertyFactory(elem, data) {
      this.v = shapePool.newElement();
      this.v.setPathData(true, 0);
      this.elem = elem;
      this.comp = elem.comp;
      this.data = data;
      this.frameId = -1;
      this.d = data.d;
      this.initDynamicPropertyContainer(elem);
      if (data.sy === 1) {
        this.ir = PropertyFactory.getProp(elem, data.ir, 0, 0, this);
        this.is = PropertyFactory.getProp(elem, data.is, 0, 0.01, this);
        this.convertToPath = this.convertStarToPath;
      } else {
        this.convertToPath = this.convertPolygonToPath;
      }
      this.pt = PropertyFactory.getProp(elem, data.pt, 0, 0, this);
      this.p = PropertyFactory.getProp(elem, data.p, 1, 0, this);
      this.r = PropertyFactory.getProp(elem, data.r, 0, degToRads, this);
      this.or = PropertyFactory.getProp(elem, data.or, 0, 0, this);
      this.os = PropertyFactory.getProp(elem, data.os, 0, 0.01, this);
      this.localShapeCollection = shapeCollectionPool.newShapeCollection();
      this.localShapeCollection.addShape(this.v);
      this.paths = this.localShapeCollection;
      if (this.dynamicProperties.length) {
        this.k = true;
      } else {
        this.k = false;
        this.convertToPath();
      }
    }

    StarShapePropertyFactory.prototype = {
      reset: resetShape,
      getValue: function () {
        if (this.elem.globalData.frameId === this.frameId) {
          return;
        }
        this.frameId = this.elem.globalData.frameId;
        this.iterateDynamicProperties();
        if (this._mdf) {
          this.convertToPath();
        }
      },
      convertStarToPath: function () {
        var numPts = Math.floor(this.pt.v) * 2;
        var angle = (Math.PI * 2) / numPts;
        /* this.v.v.length = numPts;
                this.v.i.length = numPts;
                this.v.o.length = numPts; */
        var longFlag = true;
        var longRad = this.or.v;
        var shortRad = this.ir.v;
        var longRound = this.os.v;
        var shortRound = this.is.v;
        var longPerimSegment = (2 * Math.PI * longRad) / (numPts * 2);
        var shortPerimSegment = (2 * Math.PI * shortRad) / (numPts * 2);
        var i;
        var rad;
        var roundness;
        var perimSegment;
        var currentAng = -Math.PI / 2;
        currentAng += this.r.v;
        var dir = this.data.d === 3 ? -1 : 1;
        this.v._length = 0;
        for (i = 0; i < numPts; i += 1) {
          rad = longFlag ? longRad : shortRad;
          roundness = longFlag ? longRound : shortRound;
          perimSegment = longFlag ? longPerimSegment : shortPerimSegment;
          var x = rad * Math.cos(currentAng);
          var y = rad * Math.sin(currentAng);
          var ox = x === 0 && y === 0 ? 0 : y / Math.sqrt(x * x + y * y);
          var oy = x === 0 && y === 0 ? 0 : -x / Math.sqrt(x * x + y * y);
          x += +this.p.v[0];
          y += +this.p.v[1];
          this.v.setTripleAt(x, y, x - ox * perimSegment * roundness * dir, y - oy * perimSegment * roundness * dir, x + ox * perimSegment * roundness * dir, y + oy * perimSegment * roundness * dir, i, true);

          /* this.v.v[i] = [x,y];
                    this.v.i[i] = [x+ox*perimSegment*roundness*dir,y+oy*perimSegment*roundness*dir];
                    this.v.o[i] = [x-ox*perimSegment*roundness*dir,y-oy*perimSegment*roundness*dir];
                    this.v._length = numPts; */
          longFlag = !longFlag;
          currentAng += angle * dir;
        }
      },
      convertPolygonToPath: function () {
        var numPts = Math.floor(this.pt.v);
        var angle = (Math.PI * 2) / numPts;
        var rad = this.or.v;
        var roundness = this.os.v;
        var perimSegment = (2 * Math.PI * rad) / (numPts * 4);
        var i;
        var currentAng = -Math.PI * 0.5;
        var dir = this.data.d === 3 ? -1 : 1;
        currentAng += this.r.v;
        this.v._length = 0;
        for (i = 0; i < numPts; i += 1) {
          var x = rad * Math.cos(currentAng);
          var y = rad * Math.sin(currentAng);
          var ox = x === 0 && y === 0 ? 0 : y / Math.sqrt(x * x + y * y);
          var oy = x === 0 && y === 0 ? 0 : -x / Math.sqrt(x * x + y * y);
          x += +this.p.v[0];
          y += +this.p.v[1];
          this.v.setTripleAt(x, y, x - ox * perimSegment * roundness * dir, y - oy * perimSegment * roundness * dir, x + ox * perimSegment * roundness * dir, y + oy * perimSegment * roundness * dir, i, true);
          currentAng += angle * dir;
        }
        this.paths.length = 0;
        this.paths[0] = this.v;
      },

    };
    extendPrototype([DynamicPropertyContainer], StarShapePropertyFactory);

    return StarShapePropertyFactory;
  }());

  var RectShapeProperty = (function () {
    function RectShapePropertyFactory(elem, data) {
      this.v = shapePool.newElement();
      this.v.c = true;
      this.localShapeCollection = shapeCollectionPool.newShapeCollection();
      this.localShapeCollection.addShape(this.v);
      this.paths = this.localShapeCollection;
      this.elem = elem;
      this.comp = elem.comp;
      this.frameId = -1;
      this.d = data.d;
      this.initDynamicPropertyContainer(elem);
      this.p = PropertyFactory.getProp(elem, data.p, 1, 0, this);
      this.s = PropertyFactory.getProp(elem, data.s, 1, 0, this);
      this.r = PropertyFactory.getProp(elem, data.r, 0, 0, this);
      if (this.dynamicProperties.length) {
        this.k = true;
      } else {
        this.k = false;
        this.convertRectToPath();
      }
    }

    RectShapePropertyFactory.prototype = {
      convertRectToPath: function () {
        var p0 = this.p.v[0];
        var p1 = this.p.v[1];
        var v0 = this.s.v[0] / 2;
        var v1 = this.s.v[1] / 2;
        var round = bmMin(v0, v1, this.r.v);
        var cPoint = round * (1 - roundCorner);
        this.v._length = 0;

        if (this.d === 2 || this.d === 1) {
          this.v.setTripleAt(p0 + v0, p1 - v1 + round, p0 + v0, p1 - v1 + round, p0 + v0, p1 - v1 + cPoint, 0, true);
          this.v.setTripleAt(p0 + v0, p1 + v1 - round, p0 + v0, p1 + v1 - cPoint, p0 + v0, p1 + v1 - round, 1, true);
          if (round !== 0) {
            this.v.setTripleAt(p0 + v0 - round, p1 + v1, p0 + v0 - round, p1 + v1, p0 + v0 - cPoint, p1 + v1, 2, true);
            this.v.setTripleAt(p0 - v0 + round, p1 + v1, p0 - v0 + cPoint, p1 + v1, p0 - v0 + round, p1 + v1, 3, true);
            this.v.setTripleAt(p0 - v0, p1 + v1 - round, p0 - v0, p1 + v1 - round, p0 - v0, p1 + v1 - cPoint, 4, true);
            this.v.setTripleAt(p0 - v0, p1 - v1 + round, p0 - v0, p1 - v1 + cPoint, p0 - v0, p1 - v1 + round, 5, true);
            this.v.setTripleAt(p0 - v0 + round, p1 - v1, p0 - v0 + round, p1 - v1, p0 - v0 + cPoint, p1 - v1, 6, true);
            this.v.setTripleAt(p0 + v0 - round, p1 - v1, p0 + v0 - cPoint, p1 - v1, p0 + v0 - round, p1 - v1, 7, true);
          } else {
            this.v.setTripleAt(p0 - v0, p1 + v1, p0 - v0 + cPoint, p1 + v1, p0 - v0, p1 + v1, 2);
            this.v.setTripleAt(p0 - v0, p1 - v1, p0 - v0, p1 - v1 + cPoint, p0 - v0, p1 - v1, 3);
          }
        } else {
          this.v.setTripleAt(p0 + v0, p1 - v1 + round, p0 + v0, p1 - v1 + cPoint, p0 + v0, p1 - v1 + round, 0, true);
          if (round !== 0) {
            this.v.setTripleAt(p0 + v0 - round, p1 - v1, p0 + v0 - round, p1 - v1, p0 + v0 - cPoint, p1 - v1, 1, true);
            this.v.setTripleAt(p0 - v0 + round, p1 - v1, p0 - v0 + cPoint, p1 - v1, p0 - v0 + round, p1 - v1, 2, true);
            this.v.setTripleAt(p0 - v0, p1 - v1 + round, p0 - v0, p1 - v1 + round, p0 - v0, p1 - v1 + cPoint, 3, true);
            this.v.setTripleAt(p0 - v0, p1 + v1 - round, p0 - v0, p1 + v1 - cPoint, p0 - v0, p1 + v1 - round, 4, true);
            this.v.setTripleAt(p0 - v0 + round, p1 + v1, p0 - v0 + round, p1 + v1, p0 - v0 + cPoint, p1 + v1, 5, true);
            this.v.setTripleAt(p0 + v0 - round, p1 + v1, p0 + v0 - cPoint, p1 + v1, p0 + v0 - round, p1 + v1, 6, true);
            this.v.setTripleAt(p0 + v0, p1 + v1 - round, p0 + v0, p1 + v1 - round, p0 + v0, p1 + v1 - cPoint, 7, true);
          } else {
            this.v.setTripleAt(p0 - v0, p1 - v1, p0 - v0 + cPoint, p1 - v1, p0 - v0, p1 - v1, 1, true);
            this.v.setTripleAt(p0 - v0, p1 + v1, p0 - v0, p1 + v1 - cPoint, p0 - v0, p1 + v1, 2, true);
            this.v.setTripleAt(p0 + v0, p1 + v1, p0 + v0 - cPoint, p1 + v1, p0 + v0, p1 + v1, 3, true);
          }
        }
      },
      getValue: function () {
        if (this.elem.globalData.frameId === this.frameId) {
          return;
        }
        this.frameId = this.elem.globalData.frameId;
        this.iterateDynamicProperties();
        if (this._mdf) {
          this.convertRectToPath();
        }
      },
      reset: resetShape,
    };
    extendPrototype([DynamicPropertyContainer], RectShapePropertyFactory);

    return RectShapePropertyFactory;
  }());

  function getShapeProp(elem, data, type) {
    var prop;
    if (type === 3 || type === 4) {
      var dataProp = type === 3 ? data.pt : data.ks;
      var keys = dataProp.k;
      if (keys.length) {
        prop = new KeyframedShapeProperty(elem, data, type);
      } else {
        prop = new ShapeProperty(elem, data, type);
      }
    } else if (type === 5) {
      prop = new RectShapeProperty(elem, data);
    } else if (type === 6) {
      prop = new EllShapeProperty(elem, data);
    } else if (type === 7) {
      prop = new StarShapeProperty(elem, data);
    }
    if (prop.k) {
      elem.addDynamicProperty(prop);
    }
    return prop;
  }

  function getConstructorFunction() {
    return ShapeProperty;
  }

  function getKeyframedConstructorFunction() {
    return KeyframedShapeProperty;
  }

  var ob = {};
  ob.getShapeProp = getShapeProp;
  ob.getConstructorFunction = getConstructorFunction;
  ob.getKeyframedConstructorFunction = getKeyframedConstructorFunction;
  return ob;
}());

/* global shapeCollectionPool, initialDefaultFrame, extendPrototype, DynamicPropertyContainer */
/* exported ShapeModifiers */

var ShapeModifiers = (function () {
  var ob = {};
  var modifiers = {};
  ob.registerModifier = registerModifier;
  ob.getModifier = getModifier;

  function registerModifier(nm, factory) {
    if (!modifiers[nm]) {
      modifiers[nm] = factory;
    }
  }

  function getModifier(nm, elem, data) {
    return new modifiers[nm](elem, data);
  }

  return ob;
}());

function ShapeModifier() {}
ShapeModifier.prototype.initModifierProperties = function () {};
ShapeModifier.prototype.addShapeToModifier = function () {};
ShapeModifier.prototype.addShape = function (data) {
  if (!this.closed) {
    // Adding shape to dynamic properties. It covers the case where a shape has no effects applied, to reset it's _mdf state on every tick.
    data.sh.container.addDynamicProperty(data.sh);
    var shapeData = { shape: data.sh, data: data, localShapeCollection: shapeCollectionPool.newShapeCollection() };
    this.shapes.push(shapeData);
    this.addShapeToModifier(shapeData);
    if (this._isAnimated) {
      data.setAsAnimated();
    }
  }
};
ShapeModifier.prototype.init = function (elem, data) {
  this.shapes = [];
  this.elem = elem;
  this.initDynamicPropertyContainer(elem);
  this.initModifierProperties(elem, data);
  this.frameId = initialDefaultFrame;
  this.closed = false;
  this.k = false;
  if (this.dynamicProperties.length) {
    this.k = true;
  } else {
    this.getValue(true);
  }
};
ShapeModifier.prototype.processKeys = function () {
  if (this.elem.globalData.frameId === this.frameId) {
    return;
  }
  this.frameId = this.elem.globalData.frameId;
  this.iterateDynamicProperties();
};

extendPrototype([DynamicPropertyContainer], ShapeModifier);

/* global extendPrototype, ShapeModifier, PropertyFactory, segmentsLengthPool, bez, shapePool, ShapeModifiers */

function TrimModifier() {
}
extendPrototype([ShapeModifier], TrimModifier);
TrimModifier.prototype.initModifierProperties = function (elem, data) {
  this.s = PropertyFactory.getProp(elem, data.s, 0, 0.01, this);
  this.e = PropertyFactory.getProp(elem, data.e, 0, 0.01, this);
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0, this);
  this.sValue = 0;
  this.eValue = 0;
  this.getValue = this.processKeys;
  this.m = data.m;
  this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
};

TrimModifier.prototype.addShapeToModifier = function (shapeData) {
  shapeData.pathsData = [];
};

TrimModifier.prototype.calculateShapeEdges = function (s, e, shapeLength, addedLength, totalModifierLength) {
  var segments = [];
  if (e <= 1) {
    segments.push({
      s: s,
      e: e,
    });
  } else if (s >= 1) {
    segments.push({
      s: s - 1,
      e: e - 1,
    });
  } else {
    segments.push({
      s: s,
      e: 1,
    });
    segments.push({
      s: 0,
      e: e - 1,
    });
  }
  var shapeSegments = [];
  var i;
  var len = segments.length;
  var segmentOb;
  for (i = 0; i < len; i += 1) {
    segmentOb = segments[i];
    if (!(segmentOb.e * totalModifierLength < addedLength || segmentOb.s * totalModifierLength > addedLength + shapeLength)) {
      var shapeS;
      var shapeE;
      if (segmentOb.s * totalModifierLength <= addedLength) {
        shapeS = 0;
      } else {
        shapeS = (segmentOb.s * totalModifierLength - addedLength) / shapeLength;
      }
      if (segmentOb.e * totalModifierLength >= addedLength + shapeLength) {
        shapeE = 1;
      } else {
        shapeE = ((segmentOb.e * totalModifierLength - addedLength) / shapeLength);
      }
      shapeSegments.push([shapeS, shapeE]);
    }
  }
  if (!shapeSegments.length) {
    shapeSegments.push([0, 0]);
  }
  return shapeSegments;
};

TrimModifier.prototype.releasePathsData = function (pathsData) {
  var i;
  var len = pathsData.length;
  for (i = 0; i < len; i += 1) {
    segmentsLengthPool.release(pathsData[i]);
  }
  pathsData.length = 0;
  return pathsData;
};

TrimModifier.prototype.processShapes = function (_isFirstFrame) {
  var s;
  var e;
  if (this._mdf || _isFirstFrame) {
    var o = (this.o.v % 360) / 360;
    if (o < 0) {
      o += 1;
    }
    if (this.s.v > 1) {
      s = 1 + o;
    } else if (this.s.v < 0) {
      s = 0 + o;
    } else {
      s = this.s.v + o;
    }
    if (this.e.v > 1) {
      e = 1 + o;
    } else if (this.e.v < 0) {
      e = 0 + o;
    } else {
      e = this.e.v + o;
    }

    if (s > e) {
      var _s = s;
      s = e;
      e = _s;
    }
    s = Math.round(s * 10000) * 0.0001;
    e = Math.round(e * 10000) * 0.0001;
    this.sValue = s;
    this.eValue = e;
  } else {
    s = this.sValue;
    e = this.eValue;
  }
  var shapePaths;
  var i;
  var len = this.shapes.length;
  var j;
  var jLen;
  var pathsData;
  var pathData;
  var totalShapeLength;
  var totalModifierLength = 0;

  if (e === s) {
    for (i = 0; i < len; i += 1) {
      this.shapes[i].localShapeCollection.releaseShapes();
      this.shapes[i].shape._mdf = true;
      this.shapes[i].shape.paths = this.shapes[i].localShapeCollection;
      if (this._mdf) {
        this.shapes[i].pathsData.length = 0;
      }
    }
  } else if (!((e === 1 && s === 0) || (e === 0 && s === 1))) {
    var segments = [];
    var shapeData;
    var localShapeCollection;
    for (i = 0; i < len; i += 1) {
      shapeData = this.shapes[i];
      // if shape hasn't changed and trim properties haven't changed, cached previous path can be used
      if (!shapeData.shape._mdf && !this._mdf && !_isFirstFrame && this.m !== 2) {
        shapeData.shape.paths = shapeData.localShapeCollection;
      } else {
        shapePaths = shapeData.shape.paths;
        jLen = shapePaths._length;
        totalShapeLength = 0;
        if (!shapeData.shape._mdf && shapeData.pathsData.length) {
          totalShapeLength = shapeData.totalShapeLength;
        } else {
          pathsData = this.releasePathsData(shapeData.pathsData);
          for (j = 0; j < jLen; j += 1) {
            pathData = bez.getSegmentsLength(shapePaths.shapes[j]);
            pathsData.push(pathData);
            totalShapeLength += pathData.totalLength;
          }
          shapeData.totalShapeLength = totalShapeLength;
          shapeData.pathsData = pathsData;
        }

        totalModifierLength += totalShapeLength;
        shapeData.shape._mdf = true;
      }
    }
    var shapeS = s;
    var shapeE = e;
    var addedLength = 0;
    var edges;
    for (i = len - 1; i >= 0; i -= 1) {
      shapeData = this.shapes[i];
      if (shapeData.shape._mdf) {
        localShapeCollection = shapeData.localShapeCollection;
        localShapeCollection.releaseShapes();
        // if m === 2 means paths are trimmed individually so edges need to be found for this specific shape relative to whoel group
        if (this.m === 2 && len > 1) {
          edges = this.calculateShapeEdges(s, e, shapeData.totalShapeLength, addedLength, totalModifierLength);
          addedLength += shapeData.totalShapeLength;
        } else {
          edges = [[shapeS, shapeE]];
        }
        jLen = edges.length;
        for (j = 0; j < jLen; j += 1) {
          shapeS = edges[j][0];
          shapeE = edges[j][1];
          segments.length = 0;
          if (shapeE <= 1) {
            segments.push({
              s: shapeData.totalShapeLength * shapeS,
              e: shapeData.totalShapeLength * shapeE,
            });
          } else if (shapeS >= 1) {
            segments.push({
              s: shapeData.totalShapeLength * (shapeS - 1),
              e: shapeData.totalShapeLength * (shapeE - 1),
            });
          } else {
            segments.push({
              s: shapeData.totalShapeLength * shapeS,
              e: shapeData.totalShapeLength,
            });
            segments.push({
              s: 0,
              e: shapeData.totalShapeLength * (shapeE - 1),
            });
          }
          var newShapesData = this.addShapes(shapeData, segments[0]);
          if (segments[0].s !== segments[0].e) {
            if (segments.length > 1) {
              var lastShapeInCollection = shapeData.shape.paths.shapes[shapeData.shape.paths._length - 1];
              if (lastShapeInCollection.c) {
                var lastShape = newShapesData.pop();
                this.addPaths(newShapesData, localShapeCollection);
                newShapesData = this.addShapes(shapeData, segments[1], lastShape);
              } else {
                this.addPaths(newShapesData, localShapeCollection);
                newShapesData = this.addShapes(shapeData, segments[1]);
              }
            }
            this.addPaths(newShapesData, localShapeCollection);
          }
        }
        shapeData.shape.paths = localShapeCollection;
      }
    }
  } else if (this._mdf) {
    for (i = 0; i < len; i += 1) {
      // Releasign Trim Cached paths data when no trim applied in case shapes are modified inbetween.
      // Don't remove this even if it's losing cached info.
      this.shapes[i].pathsData.length = 0;
      this.shapes[i].shape._mdf = true;
    }
  }
};

TrimModifier.prototype.addPaths = function (newPaths, localShapeCollection) {
  var i;
  var len = newPaths.length;
  for (i = 0; i < len; i += 1) {
    localShapeCollection.addShape(newPaths[i]);
  }
};

TrimModifier.prototype.addSegment = function (pt1, pt2, pt3, pt4, shapePath, pos, newShape) {
  shapePath.setXYAt(pt2[0], pt2[1], 'o', pos);
  shapePath.setXYAt(pt3[0], pt3[1], 'i', pos + 1);
  if (newShape) {
    shapePath.setXYAt(pt1[0], pt1[1], 'v', pos);
  }
  shapePath.setXYAt(pt4[0], pt4[1], 'v', pos + 1);
};

TrimModifier.prototype.addSegmentFromArray = function (points, shapePath, pos, newShape) {
  shapePath.setXYAt(points[1], points[5], 'o', pos);
  shapePath.setXYAt(points[2], points[6], 'i', pos + 1);
  if (newShape) {
    shapePath.setXYAt(points[0], points[4], 'v', pos);
  }
  shapePath.setXYAt(points[3], points[7], 'v', pos + 1);
};

TrimModifier.prototype.addShapes = function (shapeData, shapeSegment, shapePath) {
  var pathsData = shapeData.pathsData;
  var shapePaths = shapeData.shape.paths.shapes;
  var i;
  var len = shapeData.shape.paths._length;
  var j;
  var jLen;
  var addedLength = 0;
  var currentLengthData;
  var segmentCount;
  var lengths;
  var segment;
  var shapes = [];
  var initPos;
  var newShape = true;
  if (!shapePath) {
    shapePath = shapePool.newElement();
    segmentCount = 0;
    initPos = 0;
  } else {
    segmentCount = shapePath._length;
    initPos = shapePath._length;
  }
  shapes.push(shapePath);
  for (i = 0; i < len; i += 1) {
    lengths = pathsData[i].lengths;
    shapePath.c = shapePaths[i].c;
    jLen = shapePaths[i].c ? lengths.length : lengths.length + 1;
    for (j = 1; j < jLen; j += 1) {
      currentLengthData = lengths[j - 1];
      if (addedLength + currentLengthData.addedLength < shapeSegment.s) {
        addedLength += currentLengthData.addedLength;
        shapePath.c = false;
      } else if (addedLength > shapeSegment.e) {
        shapePath.c = false;
        break;
      } else {
        if (shapeSegment.s <= addedLength && shapeSegment.e >= addedLength + currentLengthData.addedLength) {
          this.addSegment(shapePaths[i].v[j - 1], shapePaths[i].o[j - 1], shapePaths[i].i[j], shapePaths[i].v[j], shapePath, segmentCount, newShape);
          newShape = false;
        } else {
          segment = bez.getNewSegment(shapePaths[i].v[j - 1], shapePaths[i].v[j], shapePaths[i].o[j - 1], shapePaths[i].i[j], (shapeSegment.s - addedLength) / currentLengthData.addedLength, (shapeSegment.e - addedLength) / currentLengthData.addedLength, lengths[j - 1]);
          this.addSegmentFromArray(segment, shapePath, segmentCount, newShape);
          // this.addSegment(segment.pt1, segment.pt3, segment.pt4, segment.pt2, shapePath, segmentCount, newShape);
          newShape = false;
          shapePath.c = false;
        }
        addedLength += currentLengthData.addedLength;
        segmentCount += 1;
      }
    }
    if (shapePaths[i].c && lengths.length) {
      currentLengthData = lengths[j - 1];
      if (addedLength <= shapeSegment.e) {
        var segmentLength = lengths[j - 1].addedLength;
        if (shapeSegment.s <= addedLength && shapeSegment.e >= addedLength + segmentLength) {
          this.addSegment(shapePaths[i].v[j - 1], shapePaths[i].o[j - 1], shapePaths[i].i[0], shapePaths[i].v[0], shapePath, segmentCount, newShape);
          newShape = false;
        } else {
          segment = bez.getNewSegment(shapePaths[i].v[j - 1], shapePaths[i].v[0], shapePaths[i].o[j - 1], shapePaths[i].i[0], (shapeSegment.s - addedLength) / segmentLength, (shapeSegment.e - addedLength) / segmentLength, lengths[j - 1]);
          this.addSegmentFromArray(segment, shapePath, segmentCount, newShape);
          // this.addSegment(segment.pt1, segment.pt3, segment.pt4, segment.pt2, shapePath, segmentCount, newShape);
          newShape = false;
          shapePath.c = false;
        }
      } else {
        shapePath.c = false;
      }
      addedLength += currentLengthData.addedLength;
      segmentCount += 1;
    }
    if (shapePath._length) {
      shapePath.setXYAt(shapePath.v[initPos][0], shapePath.v[initPos][1], 'i', initPos);
      shapePath.setXYAt(shapePath.v[shapePath._length - 1][0], shapePath.v[shapePath._length - 1][1], 'o', shapePath._length - 1);
    }
    if (addedLength > shapeSegment.e) {
      break;
    }
    if (i < len - 1) {
      shapePath = shapePool.newElement();
      newShape = true;
      shapes.push(shapePath);
      segmentCount = 0;
    }
  }
  return shapes;
};

ShapeModifiers.registerModifier('tm', TrimModifier);

/* global extendPrototype, ShapeModifier, PropertyFactory, shapePool, roundCorner, ShapeModifiers */

function RoundCornersModifier() {}
extendPrototype([ShapeModifier], RoundCornersModifier);
RoundCornersModifier.prototype.initModifierProperties = function (elem, data) {
  this.getValue = this.processKeys;
  this.rd = PropertyFactory.getProp(elem, data.r, 0, null, this);
  this._isAnimated = !!this.rd.effectsSequence.length;
};

RoundCornersModifier.prototype.processPath = function (path, round) {
  var clonedPath = shapePool.newElement();
  clonedPath.c = path.c;
  var i;
  var len = path._length;
  var currentV;
  var currentI;
  var currentO;
  var closerV;
  var distance;
  var newPosPerc;
  var index = 0;
  var vX;
  var vY;
  var oX;
  var oY;
  var iX;
  var iY;
  for (i = 0; i < len; i += 1) {
    currentV = path.v[i];
    currentO = path.o[i];
    currentI = path.i[i];
    if (currentV[0] === currentO[0] && currentV[1] === currentO[1] && currentV[0] === currentI[0] && currentV[1] === currentI[1]) {
      if ((i === 0 || i === len - 1) && !path.c) {
        clonedPath.setTripleAt(currentV[0], currentV[1], currentO[0], currentO[1], currentI[0], currentI[1], index);
        /* clonedPath.v[index] = currentV;
                clonedPath.o[index] = currentO;
                clonedPath.i[index] = currentI; */
        index += 1;
      } else {
        if (i === 0) {
          closerV = path.v[len - 1];
        } else {
          closerV = path.v[i - 1];
        }
        distance = Math.sqrt(Math.pow(currentV[0] - closerV[0], 2) + Math.pow(currentV[1] - closerV[1], 2));
        newPosPerc = distance ? Math.min(distance / 2, round) / distance : 0;
        iX = currentV[0] + (closerV[0] - currentV[0]) * newPosPerc;
        vX = iX;
        iY = currentV[1] - (currentV[1] - closerV[1]) * newPosPerc;
        vY = iY;
        oX = vX - (vX - currentV[0]) * roundCorner;
        oY = vY - (vY - currentV[1]) * roundCorner;
        clonedPath.setTripleAt(vX, vY, oX, oY, iX, iY, index);
        index += 1;

        if (i === len - 1) {
          closerV = path.v[0];
        } else {
          closerV = path.v[i + 1];
        }
        distance = Math.sqrt(Math.pow(currentV[0] - closerV[0], 2) + Math.pow(currentV[1] - closerV[1], 2));
        newPosPerc = distance ? Math.min(distance / 2, round) / distance : 0;
        oX = currentV[0] + (closerV[0] - currentV[0]) * newPosPerc;
        vX = oX;
        oY = currentV[1] + (closerV[1] - currentV[1]) * newPosPerc;
        vY = oY;
        iX = vX - (vX - currentV[0]) * roundCorner;
        iY = vY - (vY - currentV[1]) * roundCorner;
        clonedPath.setTripleAt(vX, vY, oX, oY, iX, iY, index);
        index += 1;
      }
    } else {
      clonedPath.setTripleAt(path.v[i][0], path.v[i][1], path.o[i][0], path.o[i][1], path.i[i][0], path.i[i][1], index);
      index += 1;
    }
  }
  return clonedPath;
};

RoundCornersModifier.prototype.processShapes = function (_isFirstFrame) {
  var shapePaths;
  var i;
  var len = this.shapes.length;
  var j;
  var jLen;
  var rd = this.rd.v;

  if (rd !== 0) {
    var shapeData;
    var localShapeCollection;
    for (i = 0; i < len; i += 1) {
      shapeData = this.shapes[i];
      localShapeCollection = shapeData.localShapeCollection;
      if (!(!shapeData.shape._mdf && !this._mdf && !_isFirstFrame)) {
        localShapeCollection.releaseShapes();
        shapeData.shape._mdf = true;
        shapePaths = shapeData.shape.paths.shapes;
        jLen = shapeData.shape.paths._length;
        for (j = 0; j < jLen; j += 1) {
          localShapeCollection.addShape(this.processPath(shapePaths[j], rd));
        }
      }
      shapeData.shape.paths = shapeData.localShapeCollection;
    }
  }
  if (!this.dynamicProperties.length) {
    this._mdf = false;
  }
};

ShapeModifiers.registerModifier('rd', RoundCornersModifier);

/* global extendPrototype, ShapeModifier, PropertyFactory, shapePool, ShapeModifiers */

function PuckerAndBloatModifier() {}
extendPrototype([ShapeModifier], PuckerAndBloatModifier);
PuckerAndBloatModifier.prototype.initModifierProperties = function (elem, data) {
  this.getValue = this.processKeys;
  this.amount = PropertyFactory.getProp(elem, data.a, 0, null, this);
  this._isAnimated = !!this.amount.effectsSequence.length;
};

PuckerAndBloatModifier.prototype.processPath = function (path, amount) {
  var percent = amount / 100;
  var centerPoint = [0, 0];
  var pathLength = path._length;
  var i = 0;
  for (i = 0; i < pathLength; i += 1) {
    centerPoint[0] += path.v[i][0];
    centerPoint[1] += path.v[i][1];
  }
  centerPoint[0] /= pathLength;
  centerPoint[1] /= pathLength;
  var clonedPath = shapePool.newElement();
  clonedPath.c = path.c;
  var vX;
  var vY;
  var oX;
  var oY;
  var iX;
  var iY;
  for (i = 0; i < pathLength; i += 1) {
    vX = path.v[i][0] + (centerPoint[0] - path.v[i][0]) * percent;
    vY = path.v[i][1] + (centerPoint[1] - path.v[i][1]) * percent;
    oX = path.o[i][0] + (centerPoint[0] - path.o[i][0]) * -percent;
    oY = path.o[i][1] + (centerPoint[1] - path.o[i][1]) * -percent;
    iX = path.i[i][0] + (centerPoint[0] - path.i[i][0]) * -percent;
    iY = path.i[i][1] + (centerPoint[1] - path.i[i][1]) * -percent;
    clonedPath.setTripleAt(vX, vY, oX, oY, iX, iY, i);
  }
  return clonedPath;
};

PuckerAndBloatModifier.prototype.processShapes = function (_isFirstFrame) {
  var shapePaths;
  var i;
  var len = this.shapes.length;
  var j;
  var jLen;
  var amount = this.amount.v;

  if (amount !== 0) {
    var shapeData;
    var localShapeCollection;
    for (i = 0; i < len; i += 1) {
      shapeData = this.shapes[i];
      localShapeCollection = shapeData.localShapeCollection;
      if (!(!shapeData.shape._mdf && !this._mdf && !_isFirstFrame)) {
        localShapeCollection.releaseShapes();
        shapeData.shape._mdf = true;
        shapePaths = shapeData.shape.paths.shapes;
        jLen = shapeData.shape.paths._length;
        for (j = 0; j < jLen; j += 1) {
          localShapeCollection.addShape(this.processPath(shapePaths[j], amount));
        }
      }
      shapeData.shape.paths = shapeData.localShapeCollection;
    }
  }
  if (!this.dynamicProperties.length) {
    this._mdf = false;
  }
};
ShapeModifiers.registerModifier('pb', PuckerAndBloatModifier);

/* global extendPrototype, ShapeModifier, TransformPropertyFactory, PropertyFactory, Matrix, ShapeModifiers */

function RepeaterModifier() {}
extendPrototype([ShapeModifier], RepeaterModifier);

RepeaterModifier.prototype.initModifierProperties = function (elem, data) {
  this.getValue = this.processKeys;
  this.c = PropertyFactory.getProp(elem, data.c, 0, null, this);
  this.o = PropertyFactory.getProp(elem, data.o, 0, null, this);
  this.tr = TransformPropertyFactory.getTransformProperty(elem, data.tr, this);
  this.so = PropertyFactory.getProp(elem, data.tr.so, 0, 0.01, this);
  this.eo = PropertyFactory.getProp(elem, data.tr.eo, 0, 0.01, this);
  this.data = data;
  if (!this.dynamicProperties.length) {
    this.getValue(true);
  }
  this._isAnimated = !!this.dynamicProperties.length;
  this.pMatrix = new Matrix();
  this.rMatrix = new Matrix();
  this.sMatrix = new Matrix();
  this.tMatrix = new Matrix();
  this.matrix = new Matrix();
};

RepeaterModifier.prototype.applyTransforms = function (pMatrix, rMatrix, sMatrix, transform, perc, inv) {
  var dir = inv ? -1 : 1;
  var scaleX = transform.s.v[0] + (1 - transform.s.v[0]) * (1 - perc);
  var scaleY = transform.s.v[1] + (1 - transform.s.v[1]) * (1 - perc);
  pMatrix.translate(transform.p.v[0] * dir * perc, transform.p.v[1] * dir * perc, transform.p.v[2]);
  rMatrix.translate(-transform.a.v[0], -transform.a.v[1], transform.a.v[2]);
  rMatrix.rotate(-transform.r.v * dir * perc);
  rMatrix.translate(transform.a.v[0], transform.a.v[1], transform.a.v[2]);
  sMatrix.translate(-transform.a.v[0], -transform.a.v[1], transform.a.v[2]);
  sMatrix.scale(inv ? 1 / scaleX : scaleX, inv ? 1 / scaleY : scaleY);
  sMatrix.translate(transform.a.v[0], transform.a.v[1], transform.a.v[2]);
};

RepeaterModifier.prototype.init = function (elem, arr, pos, elemsData) {
  this.elem = elem;
  this.arr = arr;
  this.pos = pos;
  this.elemsData = elemsData;
  this._currentCopies = 0;
  this._elements = [];
  this._groups = [];
  this.frameId = -1;
  this.initDynamicPropertyContainer(elem);
  this.initModifierProperties(elem, arr[pos]);
  while (pos > 0) {
    pos -= 1;
    // this._elements.unshift(arr.splice(pos,1)[0]);
    this._elements.unshift(arr[pos]);
  }
  if (this.dynamicProperties.length) {
    this.k = true;
  } else {
    this.getValue(true);
  }
};

RepeaterModifier.prototype.resetElements = function (elements) {
  var i;
  var len = elements.length;
  for (i = 0; i < len; i += 1) {
    elements[i]._processed = false;
    if (elements[i].ty === 'gr') {
      this.resetElements(elements[i].it);
    }
  }
};

RepeaterModifier.prototype.cloneElements = function (elements) {
  var newElements = JSON.parse(JSON.stringify(elements));
  this.resetElements(newElements);
  return newElements;
};

RepeaterModifier.prototype.changeGroupRender = function (elements, renderFlag) {
  var i;
  var len = elements.length;
  for (i = 0; i < len; i += 1) {
    elements[i]._render = renderFlag;
    if (elements[i].ty === 'gr') {
      this.changeGroupRender(elements[i].it, renderFlag);
    }
  }
};

RepeaterModifier.prototype.processShapes = function (_isFirstFrame) {
  var items;
  var itemsTransform;
  var i;
  var dir;
  var cont;
  var hasReloaded = false;
  if (this._mdf || _isFirstFrame) {
    var copies = Math.ceil(this.c.v);
    if (this._groups.length < copies) {
      while (this._groups.length < copies) {
        var group = {
          it: this.cloneElements(this._elements),
          ty: 'gr',
        };
        group.it.push({
          a: { a: 0, ix: 1, k: [0, 0] }, nm: 'Transform', o: { a: 0, ix: 7, k: 100 }, p: { a: 0, ix: 2, k: [0, 0] }, r: { a: 1, ix: 6, k: [{ s: 0, e: 0, t: 0 }, { s: 0, e: 0, t: 1 }] }, s: { a: 0, ix: 3, k: [100, 100] }, sa: { a: 0, ix: 5, k: 0 }, sk: { a: 0, ix: 4, k: 0 }, ty: 'tr',
        });

        this.arr.splice(0, 0, group);
        this._groups.splice(0, 0, group);
        this._currentCopies += 1;
      }
      this.elem.reloadShapes();
      hasReloaded = true;
    }
    cont = 0;
    var renderFlag;
    for (i = 0; i <= this._groups.length - 1; i += 1) {
      renderFlag = cont < copies;
      this._groups[i]._render = renderFlag;
      this.changeGroupRender(this._groups[i].it, renderFlag);
      if (!renderFlag) {
        var elems = this.elemsData[i].it;
        var transformData = elems[elems.length - 1];
        if (transformData.transform.op.v !== 0) {
          transformData.transform.op._mdf = true;
          transformData.transform.op.v = 0;
        } else {
          transformData.transform.op._mdf = false;
        }
      }
      cont += 1;
    }

    this._currentCopies = copies;
    /// /

    var offset = this.o.v;
    var offsetModulo = offset % 1;
    var roundOffset = offset > 0 ? Math.floor(offset) : Math.ceil(offset);
    var pProps = this.pMatrix.props;
    var rProps = this.rMatrix.props;
    var sProps = this.sMatrix.props;
    this.pMatrix.reset();
    this.rMatrix.reset();
    this.sMatrix.reset();
    this.tMatrix.reset();
    this.matrix.reset();
    var iteration = 0;

    if (offset > 0) {
      while (iteration < roundOffset) {
        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false);
        iteration += 1;
      }
      if (offsetModulo) {
        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, offsetModulo, false);
        iteration += offsetModulo;
      }
    } else if (offset < 0) {
      while (iteration > roundOffset) {
        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, true);
        iteration -= 1;
      }
      if (offsetModulo) {
        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -offsetModulo, true);
        iteration -= offsetModulo;
      }
    }
    i = this.data.m === 1 ? 0 : this._currentCopies - 1;
    dir = this.data.m === 1 ? 1 : -1;
    cont = this._currentCopies;
    var j;
    var jLen;
    while (cont) {
      items = this.elemsData[i].it;
      itemsTransform = items[items.length - 1].transform.mProps.v.props;
      jLen = itemsTransform.length;
      items[items.length - 1].transform.mProps._mdf = true;
      items[items.length - 1].transform.op._mdf = true;
      items[items.length - 1].transform.op.v = this._currentCopies === 1
        ? this.so.v
        : this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1));

      if (iteration !== 0) {
        if ((i !== 0 && dir === 1) || (i !== this._currentCopies - 1 && dir === -1)) {
          this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false);
        }
        this.matrix.transform(rProps[0], rProps[1], rProps[2], rProps[3], rProps[4], rProps[5], rProps[6], rProps[7], rProps[8], rProps[9], rProps[10], rProps[11], rProps[12], rProps[13], rProps[14], rProps[15]);
        this.matrix.transform(sProps[0], sProps[1], sProps[2], sProps[3], sProps[4], sProps[5], sProps[6], sProps[7], sProps[8], sProps[9], sProps[10], sProps[11], sProps[12], sProps[13], sProps[14], sProps[15]);
        this.matrix.transform(pProps[0], pProps[1], pProps[2], pProps[3], pProps[4], pProps[5], pProps[6], pProps[7], pProps[8], pProps[9], pProps[10], pProps[11], pProps[12], pProps[13], pProps[14], pProps[15]);

        for (j = 0; j < jLen; j += 1) {
          itemsTransform[j] = this.matrix.props[j];
        }
        this.matrix.reset();
      } else {
        this.matrix.reset();
        for (j = 0; j < jLen; j += 1) {
          itemsTransform[j] = this.matrix.props[j];
        }
      }
      iteration += 1;
      cont -= 1;
      i += dir;
    }
  } else {
    cont = this._currentCopies;
    i = 0;
    dir = 1;
    while (cont) {
      items = this.elemsData[i].it;
      itemsTransform = items[items.length - 1].transform.mProps.v.props;
      items[items.length - 1].transform.mProps._mdf = false;
      items[items.length - 1].transform.op._mdf = false;
      cont -= 1;
      i += dir;
    }
  }
  return hasReloaded;
};

RepeaterModifier.prototype.addShape = function () {};

ShapeModifiers.registerModifier('rp', RepeaterModifier);

/* global createSizedArray, shapePool */

function ShapeCollection() {
  this._length = 0;
  this._maxLength = 4;
  this.shapes = createSizedArray(this._maxLength);
}

ShapeCollection.prototype.addShape = function (shapeData) {
  if (this._length === this._maxLength) {
    this.shapes = this.shapes.concat(createSizedArray(this._maxLength));
    this._maxLength *= 2;
  }
  this.shapes[this._length] = shapeData;
  this._length += 1;
};

ShapeCollection.prototype.releaseShapes = function () {
  var i;
  for (i = 0; i < this._length; i += 1) {
    shapePool.release(this.shapes[i]);
  }
  this._length = 0;
};

/* global createSizedArray, createTypedArray, PropertyFactory, extendPrototype, DynamicPropertyContainer */

function DashProperty(elem, data, renderer, container) {
  this.elem = elem;
  this.frameId = -1;
  this.dataProps = createSizedArray(data.length);
  this.renderer = renderer;
  this.k = false;
  this.dashStr = '';
  this.dashArray = createTypedArray('float32', data.length ? data.length - 1 : 0);
  this.dashoffset = createTypedArray('float32', 1);
  this.initDynamicPropertyContainer(container);
  var i;
  var len = data.length || 0;
  var prop;
  for (i = 0; i < len; i += 1) {
    prop = PropertyFactory.getProp(elem, data[i].v, 0, 0, this);
    this.k = prop.k || this.k;
    this.dataProps[i] = { n: data[i].n, p: prop };
  }
  if (!this.k) {
    this.getValue(true);
  }
  this._isAnimated = this.k;
}

DashProperty.prototype.getValue = function (forceRender) {
  if (this.elem.globalData.frameId === this.frameId && !forceRender) {
    return;
  }
  this.frameId = this.elem.globalData.frameId;
  this.iterateDynamicProperties();
  this._mdf = this._mdf || forceRender;
  if (this._mdf) {
    var i = 0;
    var len = this.dataProps.length;
    if (this.renderer === 'svg') {
      this.dashStr = '';
    }
    for (i = 0; i < len; i += 1) {
      if (this.dataProps[i].n !== 'o') {
        if (this.renderer === 'svg') {
          this.dashStr += ' ' + this.dataProps[i].p.v;
        } else {
          this.dashArray[i] = this.dataProps[i].p.v;
        }
      } else {
        this.dashoffset[0] = this.dataProps[i].p.v;
      }
    }
  }
};
extendPrototype([DynamicPropertyContainer], DashProperty);

/* global createTypedArray, PropertyFactory, extendPrototype, DynamicPropertyContainer */
function GradientProperty(elem, data, container) {
  this.data = data;
  this.c = createTypedArray('uint8c', data.p * 4);
  var cLength = data.k.k[0].s ? (data.k.k[0].s.length - data.p * 4) : data.k.k.length - data.p * 4;
  this.o = createTypedArray('float32', cLength);
  this._cmdf = false;
  this._omdf = false;
  this._collapsable = this.checkCollapsable();
  this._hasOpacity = cLength;
  this.initDynamicPropertyContainer(container);
  this.prop = PropertyFactory.getProp(elem, data.k, 1, null, this);
  this.k = this.prop.k;
  this.getValue(true);
}

GradientProperty.prototype.comparePoints = function (values, points) {
  var i = 0;
  var len = this.o.length / 2;
  var diff;
  while (i < len) {
    diff = Math.abs(values[i * 4] - values[points * 4 + i * 2]);
    if (diff > 0.01) {
      return false;
    }
    i += 1;
  }
  return true;
};

GradientProperty.prototype.checkCollapsable = function () {
  if (this.o.length / 2 !== this.c.length / 4) {
    return false;
  }
  if (this.data.k.k[0].s) {
    var i = 0;
    var len = this.data.k.k.length;
    while (i < len) {
      if (!this.comparePoints(this.data.k.k[i].s, this.data.p)) {
        return false;
      }
      i += 1;
    }
  } else if (!this.comparePoints(this.data.k.k, this.data.p)) {
    return false;
  }
  return true;
};

GradientProperty.prototype.getValue = function (forceRender) {
  this.prop.getValue();
  this._mdf = false;
  this._cmdf = false;
  this._omdf = false;
  if (this.prop._mdf || forceRender) {
    var i;
    var len = this.data.p * 4;
    var mult;
    var val;
    for (i = 0; i < len; i += 1) {
      mult = i % 4 === 0 ? 100 : 255;
      val = Math.round(this.prop.v[i] * mult);
      if (this.c[i] !== val) {
        this.c[i] = val;
        this._cmdf = !forceRender;
      }
    }
    if (this.o.length) {
      len = this.prop.v.length;
      for (i = this.data.p * 4; i < len; i += 1) {
        mult = i % 2 === 0 ? 100 : 1;
        val = i % 2 === 0 ? Math.round(this.prop.v[i] * 100) : this.prop.v[i];
        if (this.o[i - this.data.p * 4] !== val) {
          this.o[i - this.data.p * 4] = val;
          this._omdf = !forceRender;
        }
      }
    }
    this._mdf = !forceRender;
  }
};

extendPrototype([DynamicPropertyContainer], GradientProperty);

/* exported buildShapeString */

var buildShapeString = function (pathNodes, length, closed, mat) {
  if (length === 0) {
    return '';
  }
  var _o = pathNodes.o;
  var _i = pathNodes.i;
  var _v = pathNodes.v;
  var i;
  var shapeString = ' M' + mat.applyToPointStringified(_v[0][0], _v[0][1]);
  for (i = 1; i < length; i += 1) {
    shapeString += ' C' + mat.applyToPointStringified(_o[i - 1][0], _o[i - 1][1]) + ' ' + mat.applyToPointStringified(_i[i][0], _i[i][1]) + ' ' + mat.applyToPointStringified(_v[i][0], _v[i][1]);
  }
  if (closed && length) {
    shapeString += ' C' + mat.applyToPointStringified(_o[i - 1][0], _o[i - 1][1]) + ' ' + mat.applyToPointStringified(_i[0][0], _i[0][1]) + ' ' + mat.applyToPointStringified(_v[0][0], _v[0][1]);
    shapeString += 'z';
  }
  return shapeString;
};



/* global createTag, createNS, isSafari, assetLoader */


/* exported featureSupport */

var featureSupport = (function () {
  var ob = {
    maskType: true,
  };
  if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
    ob.maskType = false;
  }
  return ob;
}());

/* global createNS */
/* exported filtersFactory */

var filtersFactory = (function () {
  var ob = {};
  ob.createFilter = createFilter;
  ob.createAlphaToLuminanceFilter = createAlphaToLuminanceFilter;

  function createFilter(filId, skipCoordinates) {
    var fil = createNS('filter');
    fil.setAttribute('id', filId);
    if (skipCoordinates !== true) {
      fil.setAttribute('filterUnits', 'objectBoundingBox');
      fil.setAttribute('x', '0%');
      fil.setAttribute('y', '0%');
      fil.setAttribute('width', '100%');
      fil.setAttribute('height', '100%');
    }
    return fil;
  }

  function createAlphaToLuminanceFilter() {
    var feColorMatrix = createNS('feColorMatrix');
    feColorMatrix.setAttribute('type', 'matrix');
    feColorMatrix.setAttribute('color-interpolation-filters', 'sRGB');
    feColorMatrix.setAttribute('values', '0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1');
    return feColorMatrix;
  }

  return ob;
}());
/* global createSizedArray, pooling */
/* exported poolFactory */

var poolFactory = (function () {
  return function (initialLength, _create, _release) {
    var _length = 0;
    var _maxLength = initialLength;
    var pool = createSizedArray(_maxLength);

    var ob = {
      newElement: newElement,
      release: release,
    };

    function newElement() {
      var element;
      if (_length) {
        _length -= 1;
        element = pool[_length];
      } else {
        element = _create();
      }
      return element;
    }

    function release(element) {
      if (_length === _maxLength) {
        pool = pooling.double(pool);
        _maxLength *= 2;
      }
      if (_release) {
        _release(element);
      }
      pool[_length] = element;
      _length += 1;
    }

    return ob;
  };
}());

/* global createSizedArray */
/* exported pooling */

var pooling = (function () {
  function double(arr) {
    return arr.concat(createSizedArray(arr.length));
  }

  return {
    double: double,
  };
}());

/* global createTypedArray, poolFactory */
/* exported pointPool */

var pointPool = (function () {
  function create() {
    return createTypedArray('float32', 2);
  }
  return poolFactory(8, create);
}());

/* global ShapePath, pointPool, poolFactory */
/* exported shapePool */

var shapePool = (function () {
  function create() {
    return new ShapePath();
  }

  function release(shapePath) {
    var len = shapePath._length;
    var i;
    for (i = 0; i < len; i += 1) {
      pointPool.release(shapePath.v[i]);
      pointPool.release(shapePath.i[i]);
      pointPool.release(shapePath.o[i]);
      shapePath.v[i] = null;
      shapePath.i[i] = null;
      shapePath.o[i] = null;
    }
    shapePath._length = 0;
    shapePath.c = false;
  }

  function clone(shape) {
    var cloned = factory.newElement();
    var i;
    var len = shape._length === undefined ? shape.v.length : shape._length;
    cloned.setLength(len);
    cloned.c = shape.c;

    for (i = 0; i < len; i += 1) {
      cloned.setTripleAt(shape.v[i][0], shape.v[i][1], shape.o[i][0], shape.o[i][1], shape.i[i][0], shape.i[i][1], i);
    }
    return cloned;
  }

  var factory = poolFactory(4, create, release);
  factory.clone = clone;

  return factory;
}());

/* global createSizedArray, ShapeCollection, shapePool, pooling */
/* exported shapeCollectionPool */

var shapeCollectionPool = (function () {
  var ob = {
    newShapeCollection: newShapeCollection,
    release: release,
  };

  var _length = 0;
  var _maxLength = 4;
  var pool = createSizedArray(_maxLength);

  function newShapeCollection() {
    var shapeCollection;
    if (_length) {
      _length -= 1;
      shapeCollection = pool[_length];
    } else {
      shapeCollection = new ShapeCollection();
    }
    return shapeCollection;
  }

  function release(shapeCollection) {
    var i;
    var len = shapeCollection._length;
    for (i = 0; i < len; i += 1) {
      shapePool.release(shapeCollection.shapes[i]);
    }
    shapeCollection._length = 0;

    if (_length === _maxLength) {
      pool = pooling.double(pool);
      _maxLength *= 2;
    }
    pool[_length] = shapeCollection;
    _length += 1;
  }

  return ob;
}());

/* global poolFactory, bezierLengthPool */
/* exported segmentsLengthPool */

var segmentsLengthPool = (function () {
  function create() {
    return {
      lengths: [],
      totalLength: 0,
    };
  }

  function release(element) {
    var i;
    var len = element.lengths.length;
    for (i = 0; i < len; i += 1) {
      bezierLengthPool.release(element.lengths[i]);
    }
    element.lengths.length = 0;
  }

  return poolFactory(8, create, release);
}());

/* global createTypedArray, defaultCurveSegments, poolFactory */
/* exported bezierLengthPool */

var bezierLengthPool = (function () {
  function create() {
    return {
      addedLength: 0,
      percents: createTypedArray('float32', defaultCurveSegments),
      lengths: createTypedArray('float32', defaultCurveSegments),
    };
  }
  return poolFactory(8, create);
}());

/* exported markerParser */

var markerParser = (

  function () {
    function parsePayloadLines(payload) {
      var lines = payload.split('\r\n');
      var keys = {};
      var line;
      var keysCount = 0;
      for (var i = 0; i < lines.length; i += 1) {
        line = lines[i].split(':');
        if (line.length === 2) {
          keys[line[0]] = line[1].trim();
          keysCount += 1;
        }
      }
      if (keysCount === 0) {
        throw new Error();
      }
      return keys;
    }

    return function (_markers) {
      var markers = [];
      for (var i = 0; i < _markers.length; i += 1) {
        var _marker = _markers[i];
        var markerData = {
          time: _marker.tm,
          duration: _marker.dr,
        };
        try {
          markerData.payload = JSON.parse(_markers[i].cm);
        } catch (_) {
          try {
            markerData.payload = parsePayloadLines(_markers[i].cm);
          } catch (__) {
            markerData.payload = {
              name: _markers[i],
            };
          }
        }
        markers.push(markerData);
      }
      return markers;
    };
  }());

/* global, FootageElement */

function BaseRenderer() {}
BaseRenderer.prototype.checkLayers = function (num) {
  var i;
  var len = this.layers.length;
  var data;
  this.completeLayers = true;
  for (i = len - 1; i >= 0; i -= 1) {
    if (!this.elements[i]) {
      data = this.layers[i];
      if (data.ip - data.st <= (num - this.layers[i].st) && data.op - data.st > (num - this.layers[i].st)) {
        this.buildItem(i);
      }
    }
    this.completeLayers = this.elements[i] ? this.completeLayers : false;
  }
  this.checkPendingElements();
};

BaseRenderer.prototype.createItem = function (layer) {
  switch (layer.ty) {
    case 0:
      return this.createComp(layer);
    case 3:
      return this.createNull(layer);
    case 4:
      return this.createShape(layer);
    case 15:
      return this.createFootage(layer);
    default:
      return this.createNull(layer);
  }
};


BaseRenderer.prototype.createFootage = function (data) {
  return new FootageElement(data, this.globalData, this);
};

BaseRenderer.prototype.buildAllItems = function () {
  var i;
  var len = this.layers.length;
  for (i = 0; i < len; i += 1) {
    this.buildItem(i);
  }
  this.checkPendingElements();
};

BaseRenderer.prototype.includeLayers = function (newLayers) {
  this.completeLayers = false;
  var i;
  var len = newLayers.length;
  var j;
  var jLen = this.layers.length;
  for (i = 0; i < len; i += 1) {
    j = 0;
    while (j < jLen) {
      if (this.layers[j].id === newLayers[i].id) {
        this.layers[j] = newLayers[i];
        break;
      }
      j += 1;
    }
  }
};

BaseRenderer.prototype.setProjectInterface = function (pInterface) {
  this.globalData.projectInterface = pInterface;
};

BaseRenderer.prototype.initItems = function () {
  if (!this.globalData.progressiveLoad) {
    this.buildAllItems();
  }
};
BaseRenderer.prototype.buildElementParenting = function (element, parentName, hierarchy) {
  var elements = this.elements;
  var layers = this.layers;
  var i = 0;
  var len = layers.length;
  while (i < len) {
    if (layers[i].ind == parentName) { // eslint-disable-line eqeqeq
      if (!elements[i] || elements[i] === true) {
        this.buildItem(i);
        this.addPendingElement(element);
      } else {
        hierarchy.push(elements[i]);
        elements[i].setAsParent();
        if (layers[i].parent !== undefined) {
          this.buildElementParenting(element, layers[i].parent, hierarchy);
        } else {
          element.setHierarchy(hierarchy);
        }
      }
    }
    i += 1;
  }
};

BaseRenderer.prototype.addPendingElement = function (element) {
  this.pendingElements.push(element);
};

BaseRenderer.prototype.searchExtraCompositions = function (assets) {
  var i;
  var len = assets.length;
  for (i = 0; i < len; i += 1) {
    if (assets[i].xt) {
      var comp = this.createComp(assets[i]);
      comp.initExpressions();
      this.globalData.projectInterface.registerComposition(comp);
    }
  }
};

BaseRenderer.prototype.setupGlobalData = function (animData, fontsContainer) {
  this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem);
  this.globalData.frameId = 0;
  this.globalData.frameRate = animData.fr;
  this.globalData.nm = animData.nm;
  this.globalData.compSize = {
    w: animData.w,
    h: animData.h,
  };
};

/* global createElementID, extendPrototype, BaseRenderer, NullElement, SVGShapeElement, SVGCompElement, createNS, locationHref, createSizedArray, */

function SVGRenderer(animationItem, config) {
  this.animationItem = animationItem;
  this.layers = null;
  this.renderedFrame = -1;
  this.svgElement = createNS('svg');
  var ariaLabel = '';
  if (config && config.title) {
    var titleElement = createNS('title');
    var titleId = createElementID();
    titleElement.setAttribute('id', titleId);
    titleElement.textContent = config.title;
    this.svgElement.appendChild(titleElement);
    ariaLabel += titleId;
  }
  if (config && config.description) {
    var descElement = createNS('desc');
    var descId = createElementID();
    descElement.setAttribute('id', descId);
    descElement.textContent = config.description;
    this.svgElement.appendChild(descElement);
    ariaLabel += ' ' + descId;
  }
  if (ariaLabel) {
    this.svgElement.setAttribute('aria-labelledby', ariaLabel);
  }
  var defs = createNS('defs');
  this.svgElement.appendChild(defs);
  var maskElement = createNS('g');
  this.svgElement.appendChild(maskElement);
  this.layerElement = maskElement;
  this.renderConfig = {
    preserveAspectRatio: (config && config.preserveAspectRatio) || 'xMidYMid meet',
    progressiveLoad: (config && config.progressiveLoad) || false,
    hideOnTransparent: !((config && config.hideOnTransparent === false)),
    viewBoxOnly: (config && config.viewBoxOnly) || false,
    viewBoxSize: (config && config.viewBoxSize) || false,
    className: (config && config.className) || '',
    id: (config && config.id) || '',
    focusable: config && config.focusable,
    filterSize: {
      width: (config && config.filterSize && config.filterSize.width) || '100%',
      height: (config && config.filterSize && config.filterSize.height) || '100%',
      x: (config && config.filterSize && config.filterSize.x) || '0%',
      y: (config && config.filterSize && config.filterSize.y) || '0%',
    },
  };

  this.globalData = {
    _mdf: false,
    frameNum: -1,
    defs: defs,
    renderConfig: this.renderConfig,
  };
  this.elements = [];
  this.pendingElements = [];
  this.destroyed = false;
  this.rendererType = 'svg';
}

extendPrototype([BaseRenderer], SVGRenderer);

SVGRenderer.prototype.createNull = function (data) {
  return new NullElement(data, this.globalData, this);
};

SVGRenderer.prototype.createShape = function (data) {
  return new SVGShapeElement(data, this.globalData, this);
};


SVGRenderer.prototype.createComp = function (data) {
  return new SVGCompElement(data, this.globalData, this);
};

SVGRenderer.prototype.configAnimation = function (animData) {
  this.svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  if (this.renderConfig.viewBoxSize) {
    this.svgElement.setAttribute('viewBox', this.renderConfig.viewBoxSize);
  } else {
    this.svgElement.setAttribute('viewBox', '0 0 ' + animData.w + ' ' + animData.h);
  }

  if (!this.renderConfig.viewBoxOnly) {
    this.svgElement.setAttribute('width', animData.w);
    this.svgElement.setAttribute('height', animData.h);
    this.svgElement.style.width = '100%';
    this.svgElement.style.height = '100%';
    this.svgElement.style.transform = 'translate3d(0,0,0)';
  }
  if (this.renderConfig.className) {
    this.svgElement.setAttribute('class', this.renderConfig.className);
  }
  if (this.renderConfig.id) {
    this.svgElement.setAttribute('id', this.renderConfig.id);
  }
  if (this.renderConfig.focusable !== undefined) {
    this.svgElement.setAttribute('focusable', this.renderConfig.focusable);
  }
  this.svgElement.setAttribute('preserveAspectRatio', this.renderConfig.preserveAspectRatio);
  // this.layerElement.style.transform = 'translate3d(0,0,0)';
  // this.layerElement.style.transformOrigin = this.layerElement.style.mozTransformOrigin = this.layerElement.style.webkitTransformOrigin = this.layerElement.style['-webkit-transform'] = "0px 0px 0px";
  this.animationItem.wrapper.appendChild(this.svgElement);
  // Mask animation
  var defs = this.globalData.defs;

  this.setupGlobalData(animData, defs);
  this.globalData.progressiveLoad = this.renderConfig.progressiveLoad;
  this.data = animData;

  var maskElement = createNS('clipPath');
  var rect = createNS('rect');
  rect.setAttribute('width', animData.w);
  rect.setAttribute('height', animData.h);
  rect.setAttribute('x', 0);
  rect.setAttribute('y', 0);
  var maskId = createElementID();
  maskElement.setAttribute('id', maskId);
  maskElement.appendChild(rect);
  this.layerElement.setAttribute('clip-path', 'url(' + locationHref + '#' + maskId + ')');

  defs.appendChild(maskElement);
  this.layers = animData.layers;
  this.elements = createSizedArray(animData.layers.length);
};

SVGRenderer.prototype.destroy = function () {
  if (this.animationItem.wrapper) {
    this.animationItem.wrapper.innerText = '';
  }
  this.layerElement = null;
  this.globalData.defs = null;
  var i;
  var len = this.layers ? this.layers.length : 0;
  for (i = 0; i < len; i += 1) {
    if (this.elements[i]) {
      this.elements[i].destroy();
    }
  }
  this.elements.length = 0;
  this.destroyed = true;
  this.animationItem = null;
};

SVGRenderer.prototype.updateContainerSize = function () {
};

SVGRenderer.prototype.buildItem = function (pos) {
  var elements = this.elements;
  if (elements[pos] || this.layers[pos].ty === 99) {
    return;
  }
  elements[pos] = true;
  var element = this.createItem(this.layers[pos]);

  elements[pos] = element;
  this.appendElementInPos(element, pos);
  if (this.layers[pos].tt) {
    if (!this.elements[pos - 1] || this.elements[pos - 1] === true) {
      this.buildItem(pos - 1);
      this.addPendingElement(element);
    } else {
      element.setMatte(elements[pos - 1].layerId);
    }
  }
};

SVGRenderer.prototype.checkPendingElements = function () {
  while (this.pendingElements.length) {
    var element = this.pendingElements.pop();
    element.checkParenting();
    if (element.data.tt) {
      var i = 0;
      var len = this.elements.length;
      while (i < len) {
        if (this.elements[i] === element) {
          element.setMatte(this.elements[i - 1].layerId);
          break;
        }
        i += 1;
      }
    }
  }
};

SVGRenderer.prototype.renderFrame = function (num) {
  if (this.renderedFrame === num || this.destroyed) {
    return;
  }
  if (num === null) {
    num = this.renderedFrame;
  } else {
    this.renderedFrame = num;
  }
  // console.log('-------');
  // console.log('FRAME ',num);
  this.globalData.frameNum = num;
  this.globalData.frameId += 1;
  this.globalData.projectInterface.currentFrame = num;
  this.globalData._mdf = false;
  var i;
  var len = this.layers.length;
  if (!this.completeLayers) {
    this.checkLayers(num);
  }
  for (i = len - 1; i >= 0; i -= 1) {
    if (this.completeLayers || this.elements[i]) {
      this.elements[i].prepareFrame(num - this.layers[i].st);
    }
  }
  if (this.globalData._mdf) {
    for (i = 0; i < len; i += 1) {
      if (this.completeLayers || this.elements[i]) {
        this.elements[i].renderFrame();
      }
    }
  }
};

SVGRenderer.prototype.appendElementInPos = function (element, pos) {
  var newElement = element.getBaseElement();
  if (!newElement) {
    return;
  }
  var i = 0;
  var nextElement;
  while (i < pos) {
    if (this.elements[i] && this.elements[i] !== true && this.elements[i].getBaseElement()) {
      nextElement = this.elements[i].getBaseElement();
    }
    i += 1;
  }
  if (nextElement) {
    this.layerElement.insertBefore(newElement, nextElement);
  } else {
    this.layerElement.appendChild(newElement);
  }
};

SVGRenderer.prototype.hide = function () {
  this.layerElement.style.display = 'none';
};

SVGRenderer.prototype.show = function () {
  this.layerElement.style.display = 'block';
};

/**
 * @file
 * Handles AE's layer parenting property.
 *
 */

function HierarchyElement() {}

HierarchyElement.prototype = {
  /**
     * @function
     * Initializes hierarchy properties
     *
     */
  initHierarchy: function () {
    // element's parent list
    this.hierarchy = [];
    // if element is parent of another layer _isParent will be true
    this._isParent = false;
    this.checkParenting();
  },
  /**
     * @function
     * Sets layer's hierarchy.
     * @param {array} hierarch
     * layer's parent list
     *
     */
  setHierarchy: function (hierarchy) {
    this.hierarchy = hierarchy;
  },
  /**
     * @function
     * Sets layer as parent.
     *
     */
  setAsParent: function () {
    this._isParent = true;
  },
  /**
     * @function
     * Searches layer's parenting chain
     *
     */
  checkParenting: function () {
    if (this.data.parent !== undefined) {
      this.comp.buildElementParenting(this, this.data.parent, []);
    }
  },
};

/**
 * @file
 * Handles element's layer frame update.
 * Checks layer in point and out point
 *
 */

function FrameElement() {}

FrameElement.prototype = {
  /**
     * @function
     * Initializes frame related properties.
     *
     */
  initFrame: function () {
    // set to true when inpoint is rendered
    this._isFirstFrame = false;
    // list of animated properties
    this.dynamicProperties = [];
    // If layer has been modified in current tick this will be true
    this._mdf = false;
  },
  /**
     * @function
     * Calculates all dynamic values
     *
     * @param {number} num
     * current frame number in Layer's time
     * @param {boolean} isVisible
     * if layers is currently in range
     *
     */
  prepareProperties: function (num, isVisible) {
    var i;
    var len = this.dynamicProperties.length;
    for (i = 0; i < len; i += 1) {
      if (isVisible || (this._isParent && this.dynamicProperties[i].propType === 'transform')) {
        this.dynamicProperties[i].getValue();
        if (this.dynamicProperties[i]._mdf) {
          this.globalData._mdf = true;
          this._mdf = true;
        }
      }
    }
  },
  addDynamicProperty: function (prop) {
    if (this.dynamicProperties.indexOf(prop) === -1) {
      this.dynamicProperties.push(prop);
    }
  },
};

/* global TransformPropertyFactory, Matrix */

function TransformElement() {}

TransformElement.prototype = {
  initTransform: function () {
    this.finalTransform = {
      mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : { o: 0 },
      _matMdf: false,
      _opMdf: false,
      mat: new Matrix(),
    };

    // TODO: check TYPE 11: Guided elements
    if (this.data.ty !== 11) {
      // this.createElements();
    }
  },
  renderTransform: function () {
    this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame;
    this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame;

    if (this.hierarchy) {
      var mat;
      var finalMat = this.finalTransform.mat;
      var i = 0;
      var len = this.hierarchy.length;
      // Checking if any of the transformation matrices in the hierarchy chain has changed.
      if (!this.finalTransform._matMdf) {
        while (i < len) {
          if (this.hierarchy[i].finalTransform.mProp._mdf) {
            this.finalTransform._matMdf = true;
            break;
          }
          i += 1;
        }
      }

      if (this.finalTransform._matMdf) {
        mat = this.finalTransform.mProp.v.props;
        finalMat.cloneFromProps(mat);
        for (i = 0; i < len; i += 1) {
          mat = this.hierarchy[i].finalTransform.mProp.v.props;
          finalMat.transform(mat[0], mat[1], mat[2], mat[3], mat[4], mat[5], mat[6], mat[7], mat[8], mat[9], mat[10], mat[11], mat[12], mat[13], mat[14], mat[15]);
        }
      }
    }
  },
  globalToLocal: function (pt) {
    var transforms = [];
    transforms.push(this.finalTransform);
    var flag = true;
    var comp = this.comp;
    while (flag) {
      if (comp.finalTransform) {
        comp = comp.comp;
      } else {
        flag = false;
      }
    }
    var i;
    var len = transforms.length;
    var ptNew;
    for (i = 0; i < len; i += 1) {
      ptNew = transforms[i].mat.applyToPointArray(0, 0, 0);
      // ptNew = transforms[i].mat.applyToPointArray(pt[0],pt[1],pt[2]);
      pt = [pt[0] - ptNew[0], pt[1] - ptNew[1], 0];
    }
    return pt;
  },
  mHelper: new Matrix(),
};

function RenderableElement() {

}

RenderableElement.prototype = {
  initRenderable: function () {
    // layer's visibility related to inpoint and outpoint. Rename isVisible to isInRange
    this.isInRange = false;
    // layer's display state
    this.hidden = false;
    // If layer's transparency equals 0, it can be hidden
    this.isTransparent = false;
    // list of animated components
    this.renderableComponents = [];
  },
  addRenderableComponent: function (component) {
    if (this.renderableComponents.indexOf(component) === -1) {
      this.renderableComponents.push(component);
    }
  },
  removeRenderableComponent: function (component) {
    if (this.renderableComponents.indexOf(component) !== -1) {
      this.renderableComponents.splice(this.renderableComponents.indexOf(component), 1);
    }
  },
  prepareRenderableFrame: function (num) {
    this.checkLayerLimits(num);
  },
  checkTransparency: function () {
    if (this.finalTransform.mProp.o.v <= 0) {
      if (!this.isTransparent && this.globalData.renderConfig.hideOnTransparent) {
        this.isTransparent = true;
        this.hide();
      }
    } else if (this.isTransparent) {
      this.isTransparent = false;
      this.show();
    }
  },
  /**
     * @function
     * Initializes frame related properties.
     *
     * @param {number} num
     * current frame number in Layer's time
     *
     */
  checkLayerLimits: function (num) {
    if (this.data.ip - this.data.st <= num && this.data.op - this.data.st > num) {
      if (this.isInRange !== true) {
        this.globalData._mdf = true;
        this._mdf = true;
        this.isInRange = true;
        this.show();
      }
    } else if (this.isInRange !== false) {
      this.globalData._mdf = true;
      this.isInRange = false;
      this.hide();
    }
  },
  renderRenderable: function () {
    var i;
    var len = this.renderableComponents.length;
    for (i = 0; i < len; i += 1) {
      this.renderableComponents[i].renderFrame(this._isFirstFrame);
    }
  },
  sourceRectAtTime: function () {
    return {
      top: 0,
      left: 0,
      width: 100,
      height: 100,
    };
  },
  getLayerSize: function () {
    if (this.data.ty === 5) {
      return { w: this.data.textData.width, h: this.data.textData.height };
    }
    return { w: this.data.width, h: this.data.height };
  },
};

/* global extendPrototype, RenderableElement, createProxyFunction */

function RenderableDOMElement() {}

(function () {
  var _prototype = {
    initElement: function (data, globalData, comp) {
      this.initFrame();
      this.initBaseData(data, globalData, comp);
      this.initTransform(data, globalData, comp);
      this.initHierarchy();
      this.initRenderable();
      this.initRendererElement();
      this.createContainerElements();
      this.createRenderableComponents();
      this.createContent();
      this.hide();
    },
    hide: function () {
      if (!this.hidden && (!this.isInRange || this.isTransparent)) {
        var elem = this.baseElement || this.layerElement;
        elem.style.display = 'none';
        this.hidden = true;
      }
    },
    show: function () {
      if (this.isInRange && !this.isTransparent) {
        if (!this.data.hd) {
          var elem = this.baseElement || this.layerElement;
          elem.style.display = 'block';
        }
        this.hidden = false;
        this._isFirstFrame = true;
      }
    },
    renderFrame: function () {
      // If it is exported as hidden (data.hd === true) no need to render
      // If it is not visible no need to render
      if (this.data.hd || this.hidden) {
        return;
      }
      this.renderTransform();
      this.renderRenderable();
      this.renderElement();
      this.renderInnerContent();
      if (this._isFirstFrame) {
        this._isFirstFrame = false;
      }
    },
    renderInnerContent: function () {},
    prepareFrame: function (num) {
      this._mdf = false;
      this.prepareRenderableFrame(num);
      this.prepareProperties(num, this.isInRange);
      this.checkTransparency();
    },
    destroy: function () {
      this.innerElem = null;
      this.destroyBaseElement();
    },
  };
  extendPrototype([RenderableElement, createProxyFunction(_prototype)], RenderableDOMElement);
}());

/* exported ProcessedElement */

function ProcessedElement(element, position) {
  this.elem = element;
  this.pos = position;
}

/* global createNS */

function SVGStyleData(data, level) {
  this.data = data;
  this.type = data.ty;
  this.d = '';
  this.lvl = level;
  this._mdf = false;
  this.closed = data.hd === true;
  this.pElem = createNS('path');
  this.msElem = null;
}

SVGStyleData.prototype.reset = function () {
  this.d = '';
  this._mdf = false;
};

function SVGShapeData(transformers, level, shape) {
  this.caches = [];
  this.styles = [];
  this.transformers = transformers;
  this.lStr = '';
  this.sh = shape;
  this.lvl = level;
  // TODO find if there are some cases where _isAnimated can be false.
  // For now, since shapes add up with other shapes. They have to be calculated every time.
  // One way of finding out is checking if all styles associated to this shape depend only of this shape
  this._isAnimated = !!shape.k;
  // TODO: commenting this for now since all shapes are animated
  var i = 0;
  var len = transformers.length;
  while (i < len) {
    if (transformers[i].mProps.dynamicProperties.length) {
      this._isAnimated = true;
      break;
    }
    i += 1;
  }
}

SVGShapeData.prototype.setAsAnimated = function () {
  this._isAnimated = true;
};

/* exported SVGTransformData */

function SVGTransformData(mProps, op, container) {
  this.transform = {
    mProps: mProps,
    op: op,
    container: container,
  };
  this.elements = [];
  this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
}

/* global DashProperty, PropertyFactory, extendPrototype, DynamicPropertyContainer */

function SVGStrokeStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, this);
  this.w = PropertyFactory.getProp(elem, data.w, 0, null, this);
  this.d = new DashProperty(elem, data.d || {}, 'svg', this);
  this.c = PropertyFactory.getProp(elem, data.c, 1, 255, this);
  this.style = styleOb;
  this._isAnimated = !!this._isAnimated;
}

extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData);

/* global PropertyFactory, extendPrototype, DynamicPropertyContainer */

function SVGFillStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, this);
  this.c = PropertyFactory.getProp(elem, data.c, 1, 255, this);
  this.style = styleOb;
}

extendPrototype([DynamicPropertyContainer], SVGFillStyleData);

/* global PropertyFactory, degToRads, GradientProperty, createElementID, createNS, locationHref,
extendPrototype, DynamicPropertyContainer */

function SVGGradientFillStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.initGradientData(elem, data, styleOb);
}

SVGGradientFillStyleData.prototype.initGradientData = function (elem, data, styleOb) {
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, this);
  this.s = PropertyFactory.getProp(elem, data.s, 1, null, this);
  this.e = PropertyFactory.getProp(elem, data.e, 1, null, this);
  this.h = PropertyFactory.getProp(elem, data.h || { k: 0 }, 0, 0.01, this);
  this.a = PropertyFactory.getProp(elem, data.a || { k: 0 }, 0, degToRads, this);
  this.g = new GradientProperty(elem, data.g, this);
  this.style = styleOb;
  this.stops = [];
  this.setGradientData(styleOb.pElem, data);
  this.setGradientOpacity(data, styleOb);
  this._isAnimated = !!this._isAnimated;
};

SVGGradientFillStyleData.prototype.setGradientData = function (pathElement, data) {
  var gradientId = createElementID();
  var gfill = createNS(data.t === 1 ? 'linearGradient' : 'radialGradient');
  gfill.setAttribute('id', gradientId);
  gfill.setAttribute('spreadMethod', 'pad');
  gfill.setAttribute('gradientUnits', 'userSpaceOnUse');
  var stops = [];
  var stop;
  var j;
  var jLen;
  jLen = data.g.p * 4;
  for (j = 0; j < jLen; j += 4) {
    stop = createNS('stop');
    gfill.appendChild(stop);
    stops.push(stop);
  }
  pathElement.setAttribute(data.ty === 'gf' ? 'fill' : 'stroke', 'url(' + locationHref + '#' + gradientId + ')');

  this.gf = gfill;
  this.cst = stops;
};

SVGGradientFillStyleData.prototype.setGradientOpacity = function (data, styleOb) {
  if (this.g._hasOpacity && !this.g._collapsable) {
    var stop;
    var j;
    var jLen;
    var mask = createNS('mask');
    var maskElement = createNS('path');
    mask.appendChild(maskElement);
    var opacityId = createElementID();
    var maskId = createElementID();
    mask.setAttribute('id', maskId);
    var opFill = createNS(data.t === 1 ? 'linearGradient' : 'radialGradient');
    opFill.setAttribute('id', opacityId);
    opFill.setAttribute('spreadMethod', 'pad');
    opFill.setAttribute('gradientUnits', 'userSpaceOnUse');
    jLen = data.g.k.k[0].s ? data.g.k.k[0].s.length : data.g.k.k.length;
    var stops = this.stops;
    for (j = data.g.p * 4; j < jLen; j += 2) {
      stop = createNS('stop');
      stop.setAttribute('stop-color', 'rgb(255,255,255)');
      opFill.appendChild(stop);
      stops.push(stop);
    }
    maskElement.setAttribute(data.ty === 'gf' ? 'fill' : 'stroke', 'url(' + locationHref + '#' + opacityId + ')');
    this.of = opFill;
    this.ms = mask;
    this.ost = stops;
    this.maskId = maskId;
    styleOb.msElem = maskElement;
  }
};

extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData);

/* global PropertyFactory, DashProperty, extendPrototype, SVGGradientFillStyleData, DynamicPropertyContainer */

function SVGGradientStrokeStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.w = PropertyFactory.getProp(elem, data.w, 0, null, this);
  this.d = new DashProperty(elem, data.d || {}, 'svg', this);
  this.initGradientData(elem, data, styleOb);
  this._isAnimated = !!this._isAnimated;
}

extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);

/* global createNS */
/* exported ShapeGroupData */

function ShapeGroupData() {
  this.it = [];
  this.prevViewData = [];
  this.gr = createNS('g');
}

/* global Matrix, buildShapeString, bmFloor */
/* exported SVGElementsRenderer */

var SVGElementsRenderer = (function () {
  var _identityMatrix = new Matrix();
  var _matrixHelper = new Matrix();

  var ob = {
    createRenderFunction: createRenderFunction,
  };

  function createRenderFunction(data) {
    switch (data.ty) {
      case 'fl':
        return renderFill;
      case 'gf':
        return renderGradient;
      case 'gs':;
      case 'st':
        return renderStroke;
      case 'sh':
      case 'el':
      case 'rc':
      case 'sr':
        return renderPath;
      case 'tr':
        return renderContentTransform;
      default:
        return null;
    }
  }

  function renderContentTransform(styleData, itemData, isFirstFrame) {
    if (isFirstFrame || itemData.transform.op._mdf) {
      itemData.transform.container.setAttribute('opacity', itemData.transform.op.v);
    }
    if (isFirstFrame || itemData.transform.mProps._mdf) {
      itemData.transform.container.setAttribute('transform', itemData.transform.mProps.v.to2dCSS());
    }
  }

  function renderPath(styleData, itemData, isFirstFrame) {
    var j;
    var jLen;
    var pathStringTransformed;
    var redraw;
    var pathNodes;
    var l;
    var lLen = itemData.styles.length;
    var lvl = itemData.lvl;
    var paths;
    var mat;
    var props;
    var iterations;
    var k;
    for (l = 0; l < lLen; l += 1) {
      redraw = itemData.sh._mdf || isFirstFrame;
      if (itemData.styles[l].lvl < lvl) {
        mat = _matrixHelper.reset();
        iterations = lvl - itemData.styles[l].lvl;
        k = itemData.transformers.length - 1;
        while (!redraw && iterations > 0) {
          redraw = itemData.transformers[k].mProps._mdf || redraw;
          iterations -= 1;
          k -= 1;
        }
        if (redraw) {
          iterations = lvl - itemData.styles[l].lvl;
          k = itemData.transformers.length - 1;
          while (iterations > 0) {
            props = itemData.transformers[k].mProps.v.props;
            mat.transform(props[0], props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8], props[9], props[10], props[11], props[12], props[13], props[14], props[15]);
            iterations -= 1;
            k -= 1;
          }
        }
      } else {
        mat = _identityMatrix;
      }
      paths = itemData.sh.paths;
      jLen = paths._length;
      if (redraw) {
        pathStringTransformed = '';
        for (j = 0; j < jLen; j += 1) {
          pathNodes = paths.shapes[j];
          if (pathNodes && pathNodes._length) {
            pathStringTransformed += buildShapeString(pathNodes, pathNodes._length, pathNodes.c, mat);
          }
        }
        itemData.caches[l] = pathStringTransformed;
      } else {
        pathStringTransformed = itemData.caches[l];
      }
      itemData.styles[l].d += styleData.hd === true ? '' : pathStringTransformed;
      itemData.styles[l]._mdf = redraw || itemData.styles[l]._mdf;
    }
  }

  function renderFill(styleData, itemData, isFirstFrame) {
    var styleElem = itemData.style;

    if (itemData.c._mdf || isFirstFrame) {
      styleElem.pElem.setAttribute('fill', 'rgb(' + bmFloor(itemData.c.v[0]) + ',' + bmFloor(itemData.c.v[1]) + ',' + bmFloor(itemData.c.v[2]) + ')');
    }
    if (itemData.o._mdf || isFirstFrame) {
      styleElem.pElem.setAttribute('fill-opacity', itemData.o.v);
    }
  }



  function renderGradient(styleData, itemData, isFirstFrame) {
    var gfill = itemData.gf;
    var hasOpacity = itemData.g._hasOpacity;
    var pt1 = itemData.s.v;
    var pt2 = itemData.e.v;

    if (itemData.o._mdf || isFirstFrame) {
      var attr = styleData.ty === 'gf' ? 'fill-opacity' : 'stroke-opacity';
      itemData.style.pElem.setAttribute(attr, itemData.o.v);
    }
    if (itemData.s._mdf || isFirstFrame) {
      var attr1 = styleData.t === 1 ? 'x1' : 'cx';
      var attr2 = attr1 === 'x1' ? 'y1' : 'cy';
      gfill.setAttribute(attr1, pt1[0]);
      gfill.setAttribute(attr2, pt1[1]);
      if (hasOpacity && !itemData.g._collapsable) {
        itemData.of.setAttribute(attr1, pt1[0]);
        itemData.of.setAttribute(attr2, pt1[1]);
      }
    }
    var stops;
    var i;
    var len;
    var stop;
    if (itemData.g._cmdf || isFirstFrame) {
      stops = itemData.cst;
      var cValues = itemData.g.c;
      len = stops.length;
      for (i = 0; i < len; i += 1) {
        stop = stops[i];
        stop.setAttribute('offset', cValues[i * 4] + '%');
        stop.setAttribute('stop-color', 'rgb(' + cValues[i * 4 + 1] + ',' + cValues[i * 4 + 2] + ',' + cValues[i * 4 + 3] + ')');
      }
    }
    if (hasOpacity && (itemData.g._omdf || isFirstFrame)) {
      var oValues = itemData.g.o;
      if (itemData.g._collapsable) {
        stops = itemData.cst;
      } else {
        stops = itemData.ost;
      }
      len = stops.length;
      for (i = 0; i < len; i += 1) {
        stop = stops[i];
        if (!itemData.g._collapsable) {
          stop.setAttribute('offset', oValues[i * 2] + '%');
        }
        stop.setAttribute('stop-opacity', oValues[i * 2 + 1]);
      }
    }
    if (styleData.t === 1) {
      if (itemData.e._mdf || isFirstFrame) {
        gfill.setAttribute('x2', pt2[0]);
        gfill.setAttribute('y2', pt2[1]);
        if (hasOpacity && !itemData.g._collapsable) {
          itemData.of.setAttribute('x2', pt2[0]);
          itemData.of.setAttribute('y2', pt2[1]);
        }
      }
    } else {
      var rad;
      if (itemData.s._mdf || itemData.e._mdf || isFirstFrame) {
        rad = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
        gfill.setAttribute('r', rad);
        if (hasOpacity && !itemData.g._collapsable) {
          itemData.of.setAttribute('r', rad);
        }
      }
      if (itemData.e._mdf || itemData.h._mdf || itemData.a._mdf || isFirstFrame) {
        if (!rad) {
          rad = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
        }
        var ang = Math.atan2(pt2[1] - pt1[1], pt2[0] - pt1[0]);

        var percent = itemData.h.v;
        if (percent >= 1) {
          percent = 0.99;
        } else if (percent <= -1) {
          percent = -0.99;
        }
        var dist = rad * percent;
        var x = Math.cos(ang + itemData.a.v) * dist + pt1[0];
        var y = Math.sin(ang + itemData.a.v) * dist + pt1[1];
        gfill.setAttribute('fx', x);
        gfill.setAttribute('fy', y);
        if (hasOpacity && !itemData.g._collapsable) {
          itemData.of.setAttribute('fx', x);
          itemData.of.setAttribute('fy', y);
        }
      }
      // gfill.setAttribute('fy','200');
    }
  }

  function renderStroke(styleData, itemData, isFirstFrame) {
    var styleElem = itemData.style;
    var d = itemData.d;
    if (d && (d._mdf || isFirstFrame) && d.dashStr) {
      styleElem.pElem.setAttribute('stroke-dasharray', d.dashStr);
      styleElem.pElem.setAttribute('stroke-dashoffset', d.dashoffset[0]);
    }
    if (itemData.c && (itemData.c._mdf || isFirstFrame)) {
      styleElem.pElem.setAttribute('stroke', 'rgb(' + bmFloor(itemData.c.v[0]) + ',' + bmFloor(itemData.c.v[1]) + ',' + bmFloor(itemData.c.v[2]) + ')');
    }
    if (itemData.o._mdf || isFirstFrame) {
      styleElem.pElem.setAttribute('stroke-opacity', itemData.o.v);
    }
    if (itemData.w._mdf || isFirstFrame) {
      styleElem.pElem.setAttribute('stroke-width', itemData.w.v);
      if (styleElem.msElem) {
        styleElem.msElem.setAttribute('stroke-width', itemData.w.v);
      }
    }
  }

  return ob;
}());

/* global Matrix */

function ShapeTransformManager() {
  this.sequences = {};
  this.sequenceList = [];
  this.transform_key_count = 0;
}

ShapeTransformManager.prototype = {
  addTransformSequence: function (transforms) {
    var i;
    var len = transforms.length;
    var key = '_';
    for (i = 0; i < len; i += 1) {
      key += transforms[i].transform.key + '_';
    }
    var sequence = this.sequences[key];
    if (!sequence) {
      sequence = {
        transforms: [].concat(transforms),
        finalTransform: new Matrix(),
        _mdf: false,
      };
      this.sequences[key] = sequence;
      this.sequenceList.push(sequence);
    }
    return sequence;
  },
  processSequence: function (sequence, isFirstFrame) {
    var i = 0;
    var len = sequence.transforms.length;
    var _mdf = isFirstFrame;
    while (i < len && !isFirstFrame) {
      if (sequence.transforms[i].transform.mProps._mdf) {
        _mdf = true;
        break;
      }
      i += 1;
    }
    if (_mdf) {
      var props;
      sequence.finalTransform.reset();
      for (i = len - 1; i >= 0; i -= 1) {
        props = sequence.transforms[i].transform.mProps.v.props;
        sequence.finalTransform.transform(props[0], props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8], props[9], props[10], props[11], props[12], props[13], props[14], props[15]);
      }
    }
    sequence._mdf = _mdf;
  },
  processSequences: function (isFirstFrame) {
    var i;
    var len = this.sequenceList.length;
    for (i = 0; i < len; i += 1) {
      this.processSequence(this.sequenceList[i], isFirstFrame);
    }
  },
  getNewKey: function () {
    this.transform_key_count += 1;
    return '_' + this.transform_key_count;
  },
};

/* global LayerExpressionInterface, EffectsExpressionInterface, CompExpressionInterface, ShapeExpressionInterface,
TextExpressionInterface, getBlendMode,createElementID */

function BaseElement() {
}

BaseElement.prototype = {
  initExpressions: function () {
    this.layerInterface = LayerExpressionInterface(this);
    var effectsInterface = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
    this.layerInterface.registerEffectsInterface(effectsInterface);

    if (this.data.ty === 0 || this.data.xt) {
      this.compInterface = CompExpressionInterface(this);
    } else if (this.data.ty === 4) {
      this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface);
      this.layerInterface.content = this.layerInterface.shapeInterface;
    } 
  },
  setBlendMode: function () {
    var blendModeValue = getBlendMode(this.data.bm);
    var elem = this.baseElement || this.layerElement;

    elem.style['mix-blend-mode'] = blendModeValue;
  },
  initBaseData: function (data, globalData, comp) {
    this.globalData = globalData;
    this.comp = comp;
    this.data = data;
    this.layerId = createElementID();

    // Stretch factor for old animations missing this property.
    if (!this.data.sr) {
      this.data.sr = 1;
    }
    
  },
  getType: function () {
    return this.type;
  },
  sourceRectAtTime: function () {},
};

/* global extendPrototype, BaseElement, TransformElement, HierarchyElement, FrameElement */

function NullElement(data, globalData, comp) {
  this.initFrame();
  this.initBaseData(data, globalData, comp);
  this.initFrame();
  this.initTransform(data, globalData, comp);
  this.initHierarchy();
}

NullElement.prototype.prepareFrame = function (num) {
  this.prepareProperties(num, true);
};

NullElement.prototype.renderFrame = function () {
};

NullElement.prototype.getBaseElement = function () {
  return null;
};

NullElement.prototype.destroy = function () {
};

NullElement.prototype.sourceRectAtTime = function () {
};

NullElement.prototype.hide = function () {
};

extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement);

/* global filtersFactory, featureSupport, filtersFactory, createElementID, createNS, SVGEffects, locationHref */

function SVGBaseElement() {
}

SVGBaseElement.prototype = {
  initRendererElement: function () {
    this.layerElement = createNS('g');
  },
  createContainerElements: function () {
    this.matteElement = createNS('g');
    this.transformedElement = this.layerElement;
    this._sizeChanged = false;
    var layerElementParent = null;
    // If this layer acts as a mask for the following layer
    var filId;
    var fil;
    var gg;
    if (this.data.td) {
      if (this.data.td == 3 || this.data.td == 1) { // eslint-disable-line eqeqeq
        var masker = createNS('mask');
        masker.setAttribute('id', this.layerId);
        masker.setAttribute('mask-type', this.data.td == 3 ? 'luminance' : 'alpha'); // eslint-disable-line eqeqeq
        masker.appendChild(this.layerElement);
        layerElementParent = masker;
        this.globalData.defs.appendChild(masker);
        // This is only for IE and Edge when mask if of type alpha
        if (!featureSupport.maskType && this.data.td == 1) { // eslint-disable-line eqeqeq
          masker.setAttribute('mask-type', 'luminance');
          filId = createElementID();
          fil = filtersFactory.createFilter(filId);
          this.globalData.defs.appendChild(fil);
          fil.appendChild(filtersFactory.createAlphaToLuminanceFilter());
          gg = createNS('g');
          gg.appendChild(this.layerElement);
          layerElementParent = gg;
          masker.appendChild(gg);
          gg.setAttribute('filter', 'url(' + locationHref + '#' + filId + ')');
        }
      } else if (this.data.td == 2) { // eslint-disable-line eqeqeq
        var maskGroup = createNS('mask');
        maskGroup.setAttribute('id', this.layerId);
        maskGroup.setAttribute('mask-type', 'alpha');
        var maskGrouper = createNS('g');
        maskGroup.appendChild(maskGrouper);
        filId = createElementID();
        fil = filtersFactory.createFilter(filId);
        /// /

        // This solution doesn't work on Android when meta tag with viewport attribute is set
        /* var feColorMatrix = createNS('feColorMatrix');
                feColorMatrix.setAttribute('type', 'matrix');
                feColorMatrix.setAttribute('color-interpolation-filters', 'sRGB');
                feColorMatrix.setAttribute('values','1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 -1 1');
                fil.appendChild(feColorMatrix); */
        /// /
        var feCTr = createNS('feComponentTransfer');
        feCTr.setAttribute('in', 'SourceGraphic');
        fil.appendChild(feCTr);
        var feFunc = createNS('feFuncA');
        feFunc.setAttribute('type', 'table');
        feFunc.setAttribute('tableValues', '1.0 0.0');
        feCTr.appendChild(feFunc);
        /// /
        this.globalData.defs.appendChild(fil);
        var alphaRect = createNS('rect');
        alphaRect.setAttribute('width', this.comp.data.w);
        alphaRect.setAttribute('height', this.comp.data.h);
        alphaRect.setAttribute('x', '0');
        alphaRect.setAttribute('y', '0');
        alphaRect.setAttribute('fill', '#ffffff');
        alphaRect.setAttribute('opacity', '0');
        maskGrouper.setAttribute('filter', 'url(' + locationHref + '#' + filId + ')');
        maskGrouper.appendChild(alphaRect);
        maskGrouper.appendChild(this.layerElement);
        layerElementParent = maskGrouper;
        if (!featureSupport.maskType) {
          maskGroup.setAttribute('mask-type', 'luminance');
          fil.appendChild(filtersFactory.createAlphaToLuminanceFilter());
          gg = createNS('g');
          maskGrouper.appendChild(alphaRect);
          gg.appendChild(this.layerElement);
          layerElementParent = gg;
          maskGrouper.appendChild(gg);
        }
        this.globalData.defs.appendChild(maskGroup);
      }
    } else if (this.data.tt) {
      this.matteElement.appendChild(this.layerElement);
      layerElementParent = this.matteElement;
      this.baseElement = this.matteElement;
    } else {
      this.baseElement = this.layerElement;
    }
    if (this.data.ln) {
      this.layerElement.setAttribute('id', this.data.ln);
    }
    if (this.data.cl) {
      this.layerElement.setAttribute('class', this.data.cl);
    }
    // Clipping compositions to hide content that exceeds boundaries. If collapsed transformations is on, component should not be clipped
    if (this.data.ty === 0 && !this.data.hd) {
      var cp = createNS('clipPath');
      var pt = createNS('path');
      pt.setAttribute('d', 'M0,0 L' + this.data.w + ',0 L' + this.data.w + ',' + this.data.h + ' L0,' + this.data.h + 'z');
      var clipId = createElementID();
      cp.setAttribute('id', clipId);
      cp.appendChild(pt);
      this.globalData.defs.appendChild(cp);

     
        this.layerElement.setAttribute('clip-path', 'url(' + locationHref + '#' + clipId + ')');
    }
    if (this.data.bm !== 0) {
      this.setBlendMode();
    }
  },
  renderElement: function () {
    if (this.finalTransform._matMdf) {
      this.transformedElement.setAttribute('transform', this.finalTransform.mat.to2dCSS());
    }
    if (this.finalTransform._opMdf) {
      this.transformedElement.setAttribute('opacity', this.finalTransform.mProp.o.v);
    }
  },
  destroyBaseElement: function () {
    this.layerElement = null;
    this.matteElement = null;

  },
  getBaseElement: function () {
    if (this.data.hd) {
      return null;
    }
    return this.baseElement;
  },
  createRenderableComponents: function () {
    
  },
  setMatte: function (id) {
    if (!this.matteElement) {
      return;
    }
    this.matteElement.setAttribute('mask', 'url(' + locationHref + '#' + id + ')');
  },
};

/* global ProcessedElement */

function IShapeElement() {
}

IShapeElement.prototype = {
  addShapeToModifiers: function (data) {
    var i;
    var len = this.shapeModifiers.length;
    for (i = 0; i < len; i += 1) {
      this.shapeModifiers[i].addShape(data);
    }
  },
  isShapeInAnimatedModifiers: function (data) {
    var i = 0;
    var len = this.shapeModifiers.length;
    while (i < len) {
      if (this.shapeModifiers[i].isAnimatedWithShape(data)) {
        return true;
      }
    }
    return false;
  },
  renderModifiers: function () {
    if (!this.shapeModifiers.length) {
      return;
    }
    var i;
    var len = this.shapes.length;
    for (i = 0; i < len; i += 1) {
      this.shapes[i].sh.reset();
    }

    len = this.shapeModifiers.length;
    var shouldBreakProcess;
    for (i = len - 1; i >= 0; i -= 1) {
      shouldBreakProcess = this.shapeModifiers[i].processShapes(this._isFirstFrame);
      // workaround to fix cases where a repeater resets the shape so the following processes get called twice
      // TODO: find a better solution for this
      if (shouldBreakProcess) {
        console.log("")
        break;
      }
    }
  },
  lcEnum: {
    1: 'butt',
    2: 'round',
    3: 'square',
  },
  ljEnum: {
    1: 'miter',
    2: 'round',
    3: 'bevel',
  },
  searchProcessedElement: function (elem) {
    var elements = this.processedElements;
    var i = 0;
    var len = elements.length;
    while (i < len) {
      if (elements[i].elem === elem) {
        return elements[i].pos;
      }
      i += 1;
    }
    return 0;
  },
  addProcessedElement: function (elem, pos) {
    var elements = this.processedElements;
    var i = elements.length;
    while (i) {
      i -= 1;
      if (elements[i].elem === elem) {
        elements[i].pos = pos;
        return;
      }
    }
    elements.push(new ProcessedElement(elem, pos));
  },
  prepareFrame: function (num) {
    this.prepareRenderableFrame(num);
    this.prepareProperties(num, this.isInRange);
  },
};

/* global extendPrototype, BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement */

function ICompElement() {}

extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement);

ICompElement.prototype.initElement = function (data, globalData, comp) {
  this.initFrame();
  this.initBaseData(data, globalData, comp);
  this.initTransform(data, globalData, comp);
  this.initRenderable();
  this.initHierarchy();
  this.initRendererElement();
  this.createContainerElements();
  this.createRenderableComponents();
  if (this.data.xt || !globalData.progressiveLoad) {
    this.buildAllItems();
  }
  this.hide();
};


ICompElement.prototype.prepareFrame = function (num) {
  this._mdf = false;
  this.prepareRenderableFrame(num);
  this.prepareProperties(num, this.isInRange);
  if (!this.isInRange && !this.data.xt) {
    return;
  }

  if (!this.tm._placeholder) {
    var timeRemapped = this.tm.v;
    if (timeRemapped === this.data.op) {
      timeRemapped = this.data.op - 1;
    }
    this.renderedFrame = timeRemapped;
  } else {
    this.renderedFrame = num / this.data.sr;
  }
  var i;
  var len = this.elements.length;
  if (!this.completeLayers) {
    this.checkLayers(this.renderedFrame);
  }
  // This iteration needs to be backwards because of how expressions connect between each other
  for (i = len - 1; i >= 0; i -= 1) {
    if (this.completeLayers || this.elements[i]) {
      this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st);
      if (this.elements[i]._mdf) {
        this._mdf = true;
      }
    }
  }
};

ICompElement.prototype.renderInnerContent = function () {
  var i;
  var len = this.layers.length;
  for (i = 0; i < len; i += 1) {
    if (this.completeLayers || this.elements[i]) {
      this.elements[i].renderFrame();
    }
  }
};

ICompElement.prototype.setElements = function (elems) {
  this.elements = elems;
};

ICompElement.prototype.getElements = function () {
  return this.elements;
};

ICompElement.prototype.destroyElements = function () {
  var i;
  var len = this.layers.length;
  for (i = 0; i < len; i += 1) {
    if (this.elements[i]) {
      this.elements[i].destroy();
    }
  }
};

ICompElement.prototype.destroy = function () {
  this.destroyElements();
  this.destroyBaseElement();
};

/* global extendPrototype, BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, createNS */


/* global PropertyFactory, extendPrototype, RenderableElement, BaseElement, FrameElement */

/* global createSizedArray, PropertyFactory, extendPrototype, SVGRenderer, ICompElement, SVGBaseElement */

function SVGCompElement(data, globalData, comp) {
  this.layers = data.layers;
  this.supports3d = true;
  this.completeLayers = false;
  this.pendingElements = [];
  this.elements = this.layers ? createSizedArray(this.layers.length) : [];
  // this.layerElement = createNS('g');
  this.initElement(data, globalData, comp);
  this.tm = data.tm ? PropertyFactory.getProp(this, data.tm, 0, globalData.frameRate, this) : { _placeholder: true };
}

extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement);

/* global extendPrototype, BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement,
RenderableDOMElement, createSizedArray, createNS */


/* global extendPrototype, BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement,
FrameElement, RenderableDOMElement, Matrix, SVGStyleData, SVGStrokeStyleData, SVGFillStyleData,
SVGGradientFillStyleData, SVGGradientStrokeStyleData, locationHref, getBlendMode, ShapeGroupData,
TransformPropertyFactory, SVGTransformData, ShapePropertyFactory, SVGShapeData, SVGElementsRenderer, ShapeModifiers */

function SVGShapeElement(data, globalData, comp) {
  // List of drawable elements
  this.shapes = [];
  // Full shape data
  this.shapesData = data.shapes;
  // List of styles that will be applied to shapes
  this.stylesList = [];
  // List of modifiers that will be applied to shapes
  this.shapeModifiers = [];
  // List of items in shape tree
  this.itemsData = [];
  // List of items in previous shape tree
  this.processedElements = [];
  // List of animated components
  this.animatedContents = [];
  this.initElement(data, globalData, comp);
  // Moving any property that doesn't get too much access after initialization because of v8 way of handling more than 10 properties.
  // List of elements that have been created
  this.prevViewData = [];
  // Moving any property that doesn't get too much access after initialization because of v8 way of handling more than 10 properties.
}

extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement);

SVGShapeElement.prototype.initSecondaryElement = function () {
};

SVGShapeElement.prototype.identityMatrix = new Matrix();

SVGShapeElement.prototype.buildExpressionInterface = function () {};

SVGShapeElement.prototype.createContent = function () {
  this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true);
  this.filterUniqueShapes();
};

/*
This method searches for multiple shapes that affect a single element and one of them is animated
*/
SVGShapeElement.prototype.filterUniqueShapes = function () {
  var i;
  var len = this.shapes.length;
  var shape;
  var j;
  var jLen = this.stylesList.length;
  var style;
  var tempShapes = [];
  var areAnimated = false;
  for (j = 0; j < jLen; j += 1) {
    style = this.stylesList[j];
    areAnimated = false;
    tempShapes.length = 0;
    for (i = 0; i < len; i += 1) {
      shape = this.shapes[i];
      if (shape.styles.indexOf(style) !== -1) {
        tempShapes.push(shape);
        areAnimated = shape._isAnimated || areAnimated;
      }
    }
    if (tempShapes.length > 1 && areAnimated) {
      this.setShapesAsAnimated(tempShapes);
    }
  }
};

SVGShapeElement.prototype.setShapesAsAnimated = function (shapes) {
  var i;
  var len = shapes.length;
  for (i = 0; i < len; i += 1) {
    shapes[i].setAsAnimated();
  }
};

SVGShapeElement.prototype.createStyleElement = function (data, level) {
  // TODO: prevent drawing of hidden styles
  var elementData;
  var styleOb = new SVGStyleData(data, level);

  var pathElement = styleOb.pElem;
  if (data.ty === 'st') {
    elementData = new SVGStrokeStyleData(this, data, styleOb);
  } else if (data.ty === 'fl') {
    elementData = new SVGFillStyleData(this, data, styleOb);
  } else if (data.ty === 'gf' || data.ty === 'gs') {
    var GradientConstructor = data.ty === 'gf' ? SVGGradientFillStyleData : SVGGradientStrokeStyleData;
    elementData = new GradientConstructor(this, data, styleOb);
    this.globalData.defs.appendChild(elementData.gf);
  }

  if (data.ty === 'st' || data.ty === 'gs') {
    pathElement.setAttribute('stroke-linecap', this.lcEnum[data.lc] || 'round');
    pathElement.setAttribute('stroke-linejoin', this.ljEnum[data.lj] || 'round');
    pathElement.setAttribute('fill-opacity', '0');
    if (data.lj === 1) {
      pathElement.setAttribute('stroke-miterlimit', data.ml);
    }
  }

  if (data.r === 2) {
    pathElement.setAttribute('fill-rule', 'evenodd');
  }

  if (data.ln) {
    pathElement.setAttribute('id', data.ln);
  }
  if (data.cl) {
    pathElement.setAttribute('class', data.cl);
  }
  if (data.bm) {
    pathElement.style['mix-blend-mode'] = getBlendMode(data.bm);
  }
  this.stylesList.push(styleOb);
  this.addToAnimatedContents(data, elementData);
  return elementData;
};

SVGShapeElement.prototype.createGroupElement = function (data) {
  var elementData = new ShapeGroupData();
  if (data.ln) {
    elementData.gr.setAttribute('id', data.ln);
  }
  if (data.cl) {
    elementData.gr.setAttribute('class', data.cl);
  }
  if (data.bm) {
    elementData.gr.style['mix-blend-mode'] = getBlendMode(data.bm);
  }
  return elementData;
};

SVGShapeElement.prototype.createTransformElement = function (data, container) {
  var transformProperty = TransformPropertyFactory.getTransformProperty(this, data, this);
  var elementData = new SVGTransformData(transformProperty, transformProperty.o, container);
  this.addToAnimatedContents(data, elementData);
  return elementData;
};

SVGShapeElement.prototype.createShapeElement = function (data, ownTransformers, level) {
  var ty = 4;
  if (data.ty === 'rc') {
    ty = 5;
  } else if (data.ty === 'el') {
    ty = 6;
  } else if (data.ty === 'sr') {
    ty = 7;
  }
  var shapeProperty = ShapePropertyFactory.getShapeProp(this, data, ty, this);
  var elementData = new SVGShapeData(ownTransformers, level, shapeProperty);
  this.shapes.push(elementData);
  this.addShapeToModifiers(elementData);
  this.addToAnimatedContents(data, elementData);
  return elementData;
};

SVGShapeElement.prototype.addToAnimatedContents = function (data, element) {
  var i = 0;
  var len = this.animatedContents.length;
  while (i < len) {
    if (this.animatedContents[i].element === element) {
      return;
    }
    i += 1;
  }
  this.animatedContents.push({
    fn: SVGElementsRenderer.createRenderFunction(data),
    element: element,
    data: data,
  });
};

SVGShapeElement.prototype.setElementStyles = function (elementData) {
  var arr = elementData.styles;
  var j;
  var jLen = this.stylesList.length;
  for (j = 0; j < jLen; j += 1) {
    if (!this.stylesList[j].closed) {
      arr.push(this.stylesList[j]);
    }
  }
};

SVGShapeElement.prototype.reloadShapes = function () {
  this._isFirstFrame = true;
  var i;
  var len = this.itemsData.length;
  for (i = 0; i < len; i += 1) {
    this.prevViewData[i] = this.itemsData[i];
  }
  this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true);
  this.filterUniqueShapes();
  len = this.dynamicProperties.length;
  for (i = 0; i < len; i += 1) {
    this.dynamicProperties[i].getValue();
  }
  // this.renderModifiers();
};

SVGShapeElement.prototype.searchShapes = function (arr, itemsData, prevViewData, container, level, transformers, render) {
  var ownTransformers = [].concat(transformers);
  var i;
  var len = arr.length - 1;
  var j;
  var jLen;
  var ownStyles = [];
  var ownModifiers = [];
  var currentTransform;
  var modifier;
  var processedPos;
  for (i = len; i >= 0; i -= 1) {
    processedPos = this.searchProcessedElement(arr[i]);
    if (!processedPos) {
      arr[i]._render = render;
    } else {
      itemsData[i] = prevViewData[processedPos - 1];
    }
    if (arr[i].ty === 'fl' || arr[i].ty === 'st' || arr[i].ty === 'gf' || arr[i].ty === 'gs') {
      if (!processedPos) {
        itemsData[i] = this.createStyleElement(arr[i], level);
      } else {
        itemsData[i].style.closed = false;
      }
      if (arr[i]._render) {
        container.appendChild(itemsData[i].style.pElem);
      }
      ownStyles.push(itemsData[i].style);
    } else if (arr[i].ty === 'gr') {
      if (!processedPos) {
        itemsData[i] = this.createGroupElement(arr[i]);
      } else {
        jLen = itemsData[i].it.length;
        for (j = 0; j < jLen; j += 1) {
          itemsData[i].prevViewData[j] = itemsData[i].it[j];
        }
      }
      this.searchShapes(arr[i].it, itemsData[i].it, itemsData[i].prevViewData, itemsData[i].gr, level + 1, ownTransformers, render);
      if (arr[i]._render) {
        container.appendChild(itemsData[i].gr);
      }
    } else if (arr[i].ty === 'tr') {
      if (!processedPos) {
        itemsData[i] = this.createTransformElement(arr[i], container);
      }
      currentTransform = itemsData[i].transform;
      ownTransformers.push(currentTransform);
    } else if (arr[i].ty === 'sh' || arr[i].ty === 'rc' || arr[i].ty === 'el' || arr[i].ty === 'sr') {
      if (!processedPos) {
        itemsData[i] = this.createShapeElement(arr[i], ownTransformers, level);
      }
      this.setElementStyles(itemsData[i]);
    } else if (arr[i].ty === 'tm' || arr[i].ty === 'rd' || arr[i].ty === 'ms' || arr[i].ty === 'pb') {
      if (!processedPos) {
        modifier = ShapeModifiers.getModifier(arr[i].ty);
        modifier.init(this, arr[i]);
        itemsData[i] = modifier;
        this.shapeModifiers.push(modifier);
      } else {
        modifier = itemsData[i];
        modifier.closed = false;
      }
      ownModifiers.push(modifier);
    } else if (arr[i].ty === 'rp') {
      if (!processedPos) {
        modifier = ShapeModifiers.getModifier(arr[i].ty);
        itemsData[i] = modifier;
        modifier.init(this, arr, i, itemsData);
        this.shapeModifiers.push(modifier);
        render = false;
      } else {
        modifier = itemsData[i];
        modifier.closed = true;
      }
      ownModifiers.push(modifier);
    }
    this.addProcessedElement(arr[i], i + 1);
  }
  len = ownStyles.length;
  for (i = 0; i < len; i += 1) {
    ownStyles[i].closed = true;
  }
  len = ownModifiers.length;
  for (i = 0; i < len; i += 1) {
    ownModifiers[i].closed = true;
  }
};

SVGShapeElement.prototype.renderInnerContent = function () {
  this.renderModifiers();
  var i;
  var len = this.stylesList.length;
  for (i = 0; i < len; i += 1) {
    this.stylesList[i].reset();
  }
  this.renderShape();

  for (i = 0; i < len; i += 1) {
    if (this.stylesList[i]._mdf || this._isFirstFrame) {
      if (this.stylesList[i].msElem) {
        this.stylesList[i].msElem.setAttribute('d', this.stylesList[i].d);
        // Adding M0 0 fixes same mask bug on all browsers
        this.stylesList[i].d = 'M0 0' + this.stylesList[i].d;
      }
      this.stylesList[i].pElem.setAttribute('d', this.stylesList[i].d || 'M0 0');
    }
  }
};

SVGShapeElement.prototype.renderShape = function () {
  var i;
  var len = this.animatedContents.length;
  var animatedContent;
  for (i = 0; i < len; i += 1) {
    animatedContent = this.animatedContents[i];
    if ((this._isFirstFrame || animatedContent.element._isAnimated) && animatedContent.data !== true) {
      animatedContent.fn(animatedContent.data, animatedContent.element, this._isFirstFrame);
    }
  }
};

SVGShapeElement.prototype.destroy = function () {
  this.destroyBaseElement();
  this.shapesData = null;
  this.itemsData = null;
};

/* global createNS */

function SVGTintFilter(filter, filterManager) {
  this.filterManager = filterManager;
  var feColorMatrix = createNS('feColorMatrix');
  feColorMatrix.setAttribute('type', 'matrix');
  feColorMatrix.setAttribute('color-interpolation-filters', 'linearRGB');
  feColorMatrix.setAttribute('values', '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0');
  feColorMatrix.setAttribute('result', 'f1');
  filter.appendChild(feColorMatrix);
  feColorMatrix = createNS('feColorMatrix');
  feColorMatrix.setAttribute('type', 'matrix');
  feColorMatrix.setAttribute('color-interpolation-filters', 'sRGB');
  feColorMatrix.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0');
  feColorMatrix.setAttribute('result', 'f2');
  filter.appendChild(feColorMatrix);
  this.matrixFilter = feColorMatrix;
  if (filterManager.effectElements[2].p.v !== 100 || filterManager.effectElements[2].p.k) {
    var feMerge = createNS('feMerge');
    filter.appendChild(feMerge);
    var feMergeNode;
    feMergeNode = createNS('feMergeNode');
    feMergeNode.setAttribute('in', 'SourceGraphic');
    feMerge.appendChild(feMergeNode);
    feMergeNode = createNS('feMergeNode');
    feMergeNode.setAttribute('in', 'f2');
    feMerge.appendChild(feMergeNode);
  }
}

SVGTintFilter.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    var colorBlack = this.filterManager.effectElements[0].p.v;
    var colorWhite = this.filterManager.effectElements[1].p.v;
    var opacity = this.filterManager.effectElements[2].p.v / 100;
    this.matrixFilter.setAttribute('values', (colorWhite[0] - colorBlack[0]) + ' 0 0 0 ' + colorBlack[0] + ' ' + (colorWhite[1] - colorBlack[1]) + ' 0 0 0 ' + colorBlack[1] + ' ' + (colorWhite[2] - colorBlack[2]) + ' 0 0 0 ' + colorBlack[2] + ' 0 0 0 ' + opacity + ' 0');
  }
};

/* global createNS */

function SVGFillFilter(filter, filterManager) {
  this.filterManager = filterManager;
  var feColorMatrix = createNS('feColorMatrix');
  feColorMatrix.setAttribute('type', 'matrix');
  feColorMatrix.setAttribute('color-interpolation-filters', 'sRGB');
  feColorMatrix.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0');
  filter.appendChild(feColorMatrix);
  this.matrixFilter = feColorMatrix;
}
SVGFillFilter.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    var color = this.filterManager.effectElements[2].p.v;
    var opacity = this.filterManager.effectElements[6].p.v;
    this.matrixFilter.setAttribute('values', '0 0 0 0 ' + color[0] + ' 0 0 0 0 ' + color[1] + ' 0 0 0 0 ' + color[2] + ' 0 0 0 ' + opacity + ' 0');
  }
};

/* global createNS */

function SVGGaussianBlurEffect(filter, filterManager) {
  // Outset the filter region by 100% on all sides to accommodate blur expansion.
  filter.setAttribute('x', '-100%');
  filter.setAttribute('y', '-100%');
  filter.setAttribute('width', '300%');
  filter.setAttribute('height', '300%');

  this.filterManager = filterManager;
  var feGaussianBlur = createNS('feGaussianBlur');
  filter.appendChild(feGaussianBlur);
  this.feGaussianBlur = feGaussianBlur;
}

SVGGaussianBlurEffect.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    // Empirical value, matching AE's blur appearance.
    var kBlurrinessToSigma = 0.3;
    var sigma = this.filterManager.effectElements[0].p.v * kBlurrinessToSigma;

    // Dimensions mapping:
    //
    //   1 -> horizontal & vertical
    //   2 -> horizontal only
    //   3 -> vertical only
    //
    var dimensions = this.filterManager.effectElements[1].p.v;
    var sigmaX = (dimensions == 3) ? 0 : sigma; // eslint-disable-line eqeqeq
    var sigmaY = (dimensions == 2) ? 0 : sigma; // eslint-disable-line eqeqeq

    this.feGaussianBlur.setAttribute('stdDeviation', sigmaX + ' ' + sigmaY);

    // Repeat edges mapping:
    //
    //   0 -> off -> duplicate
    //   1 -> on  -> wrap
    var edgeMode = (this.filterManager.effectElements[2].p.v == 1) ? 'wrap' : 'duplicate'; // eslint-disable-line eqeqeq
    this.feGaussianBlur.setAttribute('edgeMode', edgeMode);
  }
};

/* global createNS, createElementID, locationHref, bmFloor */

function SVGStrokeEffect(elem, filterManager) {
  this.initialized = false;
  this.filterManager = filterManager;
  this.elem = elem;
  this.paths = [];
}

SVGStrokeEffect.prototype.initialize = function () {
  var elemChildren = this.elem.layerElement.children || this.elem.layerElement.childNodes;
  var path;
  var groupPath;
  var i = this.filterManager.effectElements[0].p.v - 1;
  var len = i + 1;

  groupPath = createNS('g');
  groupPath.setAttribute('fill', 'none');
  groupPath.setAttribute('stroke-linecap', 'round');
  groupPath.setAttribute('stroke-dashoffset', 1);
  for (i; i < len; i += 1) {
    path = createNS('path');
    groupPath.appendChild(path);
    this.paths.push({ p: path, m: i });
  }
  if (this.filterManager.effectElements[10].p.v === 3) {
    var mask = createNS('mask');
    var id = createElementID();
    mask.setAttribute('id', id);
    mask.setAttribute('mask-type', 'alpha');
    mask.appendChild(groupPath);
    this.elem.globalData.defs.appendChild(mask);
    var g = createNS('g');
    g.setAttribute('mask', 'url(' + locationHref + '#' + id + ')');
    while (elemChildren[0]) {
      g.appendChild(elemChildren[0]);
    }
    this.elem.layerElement.appendChild(g);
    this.masker = mask;
    groupPath.setAttribute('stroke', '#fff');
  } else if (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) {
    if (this.filterManager.effectElements[10].p.v === 2) {
      elemChildren = this.elem.layerElement.children || this.elem.layerElement.childNodes;
      while (elemChildren.length) {
        this.elem.layerElement.removeChild(elemChildren[0]);
      }
    }
    this.elem.layerElement.appendChild(groupPath);
    this.elem.layerElement.removeAttribute('mask');
    groupPath.setAttribute('stroke', '#fff');
  }
  this.initialized = true;
  this.pathMasker = groupPath;
};

SVGStrokeEffect.prototype.renderFrame = function (forceRender) {
  if (!this.initialized) {
    this.initialize();
  }
  var i;
  var len = this.paths.length;

  var path;
  for (i = 0; i < len; i += 1) {
    if (this.paths[i].m !== -1) {
      path = this.paths[i].p;
      if (forceRender || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf) {
        var dasharrayValue;
        if (this.filterManager.effectElements[7].p.v !== 0 || this.filterManager.effectElements[8].p.v !== 100) {
          var s = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01;
          var e = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01;
          var l = path.getTotalLength();
          dasharrayValue = '0 0 0 ' + l * s + ' ';
          var lineLength = l * (e - s);
          var segment = 1 + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01;
          var units = Math.floor(lineLength / segment);
          var j;
          for (j = 0; j < units; j += 1) {
            dasharrayValue += '1 ' + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01 + ' ';
          }
          dasharrayValue += '0 ' + l * 10 + ' 0 0';
        } else {
          dasharrayValue = '1 ' + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01;
        }
        path.setAttribute('stroke-dasharray', dasharrayValue);
      }
    }
  }
  if (forceRender || this.filterManager.effectElements[4].p._mdf) {
    this.pathMasker.setAttribute('stroke-width', this.filterManager.effectElements[4].p.v * 2);
  }

  if (forceRender || this.filterManager.effectElements[6].p._mdf) {
    this.pathMasker.setAttribute('opacity', this.filterManager.effectElements[6].p.v);
  }
  if (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) {
    if (forceRender || this.filterManager.effectElements[3].p._mdf) {
      var color = this.filterManager.effectElements[3].p.v;
      this.pathMasker.setAttribute('stroke', 'rgb(' + bmFloor(color[0] * 255) + ',' + bmFloor(color[1] * 255) + ',' + bmFloor(color[2] * 255) + ')');
    }
  }
};

/* global createNS */

function SVGTritoneFilter(filter, filterManager) {
  this.filterManager = filterManager;
  var feColorMatrix = createNS('feColorMatrix');
  feColorMatrix.setAttribute('type', 'matrix');
  feColorMatrix.setAttribute('color-interpolation-filters', 'linearRGB');
  feColorMatrix.setAttribute('values', '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0');
  feColorMatrix.setAttribute('result', 'f1');
  filter.appendChild(feColorMatrix);
  var feComponentTransfer = createNS('feComponentTransfer');
  feComponentTransfer.setAttribute('color-interpolation-filters', 'sRGB');
  filter.appendChild(feComponentTransfer);
  this.matrixFilter = feComponentTransfer;
  var feFuncR = createNS('feFuncR');
  feFuncR.setAttribute('type', 'table');
  feComponentTransfer.appendChild(feFuncR);
  this.feFuncR = feFuncR;
  var feFuncG = createNS('feFuncG');
  feFuncG.setAttribute('type', 'table');
  feComponentTransfer.appendChild(feFuncG);
  this.feFuncG = feFuncG;
  var feFuncB = createNS('feFuncB');
  feFuncB.setAttribute('type', 'table');
  feComponentTransfer.appendChild(feFuncB);
  this.feFuncB = feFuncB;
}

SVGTritoneFilter.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    var color1 = this.filterManager.effectElements[0].p.v;
    var color2 = this.filterManager.effectElements[1].p.v;
    var color3 = this.filterManager.effectElements[2].p.v;
    var tableR = color3[0] + ' ' + color2[0] + ' ' + color1[0];
    var tableG = color3[1] + ' ' + color2[1] + ' ' + color1[1];
    var tableB = color3[2] + ' ' + color2[2] + ' ' + color1[2];
    this.feFuncR.setAttribute('tableValues', tableR);
    this.feFuncG.setAttribute('tableValues', tableG);
    this.feFuncB.setAttribute('tableValues', tableB);
    // var opacity = this.filterManager.effectElements[2].p.v/100;
    // this.matrixFilter.setAttribute('values',(colorWhite[0]- colorBlack[0])+' 0 0 0 '+ colorBlack[0] +' '+ (colorWhite[1]- colorBlack[1]) +' 0 0 0 '+ colorBlack[1] +' '+ (colorWhite[2]- colorBlack[2]) +' 0 0 0 '+ colorBlack[2] +' 0 0 0 ' + opacity + ' 0');
  }
};

/* global createNS */

function SVGProLevelsFilter(filter, filterManager) {
  this.filterManager = filterManager;
  var effectElements = this.filterManager.effectElements;
  var feComponentTransfer = createNS('feComponentTransfer');

  if (effectElements[10].p.k || effectElements[10].p.v !== 0 || effectElements[11].p.k || effectElements[11].p.v !== 1 || effectElements[12].p.k || effectElements[12].p.v !== 1 || effectElements[13].p.k || effectElements[13].p.v !== 0 || effectElements[14].p.k || effectElements[14].p.v !== 1) {
    this.feFuncR = this.createFeFunc('feFuncR', feComponentTransfer);
  }
  if (effectElements[17].p.k || effectElements[17].p.v !== 0 || effectElements[18].p.k || effectElements[18].p.v !== 1 || effectElements[19].p.k || effectElements[19].p.v !== 1 || effectElements[20].p.k || effectElements[20].p.v !== 0 || effectElements[21].p.k || effectElements[21].p.v !== 1) {
    this.feFuncG = this.createFeFunc('feFuncG', feComponentTransfer);
  }
  if (effectElements[24].p.k || effectElements[24].p.v !== 0 || effectElements[25].p.k || effectElements[25].p.v !== 1 || effectElements[26].p.k || effectElements[26].p.v !== 1 || effectElements[27].p.k || effectElements[27].p.v !== 0 || effectElements[28].p.k || effectElements[28].p.v !== 1) {
    this.feFuncB = this.createFeFunc('feFuncB', feComponentTransfer);
  }
  if (effectElements[31].p.k || effectElements[31].p.v !== 0 || effectElements[32].p.k || effectElements[32].p.v !== 1 || effectElements[33].p.k || effectElements[33].p.v !== 1 || effectElements[34].p.k || effectElements[34].p.v !== 0 || effectElements[35].p.k || effectElements[35].p.v !== 1) {
    this.feFuncA = this.createFeFunc('feFuncA', feComponentTransfer);
  }

  if (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) {
    feComponentTransfer.setAttribute('color-interpolation-filters', 'sRGB');
    filter.appendChild(feComponentTransfer);
    feComponentTransfer = createNS('feComponentTransfer');
  }

  if (effectElements[3].p.k || effectElements[3].p.v !== 0 || effectElements[4].p.k || effectElements[4].p.v !== 1 || effectElements[5].p.k || effectElements[5].p.v !== 1 || effectElements[6].p.k || effectElements[6].p.v !== 0 || effectElements[7].p.k || effectElements[7].p.v !== 1) {
    feComponentTransfer.setAttribute('color-interpolation-filters', 'sRGB');
    filter.appendChild(feComponentTransfer);
    this.feFuncRComposed = this.createFeFunc('feFuncR', feComponentTransfer);
    this.feFuncGComposed = this.createFeFunc('feFuncG', feComponentTransfer);
    this.feFuncBComposed = this.createFeFunc('feFuncB', feComponentTransfer);
  }
}

SVGProLevelsFilter.prototype.createFeFunc = function (type, feComponentTransfer) {
  var feFunc = createNS(type);
  feFunc.setAttribute('type', 'table');
  feComponentTransfer.appendChild(feFunc);
  return feFunc;
};

SVGProLevelsFilter.prototype.getTableValue = function (inputBlack, inputWhite, gamma, outputBlack, outputWhite) {
  var cnt = 0;
  var segments = 256;
  var perc;
  var min = Math.min(inputBlack, inputWhite);
  var max = Math.max(inputBlack, inputWhite);
  var table = Array.call(null, { length: segments });
  var colorValue;
  var pos = 0;
  var outputDelta = outputWhite - outputBlack;
  var inputDelta = inputWhite - inputBlack;
  while (cnt <= 256) {
    perc = cnt / 256;
    if (perc <= min) {
      colorValue = inputDelta < 0 ? outputWhite : outputBlack;
    } else if (perc >= max) {
      colorValue = inputDelta < 0 ? outputBlack : outputWhite;
    } else {
      colorValue = (outputBlack + outputDelta * Math.pow((perc - inputBlack) / inputDelta, 1 / gamma));
    }
    table[pos] = colorValue;
    pos += 1;
    cnt += 256 / (segments - 1);
  }
  return table.join(' ');
};

SVGProLevelsFilter.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    var val;
    var effectElements = this.filterManager.effectElements;
    if (this.feFuncRComposed && (forceRender || effectElements[3].p._mdf || effectElements[4].p._mdf || effectElements[5].p._mdf || effectElements[6].p._mdf || effectElements[7].p._mdf)) {
      val = this.getTableValue(effectElements[3].p.v, effectElements[4].p.v, effectElements[5].p.v, effectElements[6].p.v, effectElements[7].p.v);
      this.feFuncRComposed.setAttribute('tableValues', val);
      this.feFuncGComposed.setAttribute('tableValues', val);
      this.feFuncBComposed.setAttribute('tableValues', val);
    }

    if (this.feFuncR && (forceRender || effectElements[10].p._mdf || effectElements[11].p._mdf || effectElements[12].p._mdf || effectElements[13].p._mdf || effectElements[14].p._mdf)) {
      val = this.getTableValue(effectElements[10].p.v, effectElements[11].p.v, effectElements[12].p.v, effectElements[13].p.v, effectElements[14].p.v);
      this.feFuncR.setAttribute('tableValues', val);
    }

    if (this.feFuncG && (forceRender || effectElements[17].p._mdf || effectElements[18].p._mdf || effectElements[19].p._mdf || effectElements[20].p._mdf || effectElements[21].p._mdf)) {
      val = this.getTableValue(effectElements[17].p.v, effectElements[18].p.v, effectElements[19].p.v, effectElements[20].p.v, effectElements[21].p.v);
      this.feFuncG.setAttribute('tableValues', val);
    }

    if (this.feFuncB && (forceRender || effectElements[24].p._mdf || effectElements[25].p._mdf || effectElements[26].p._mdf || effectElements[27].p._mdf || effectElements[28].p._mdf)) {
      val = this.getTableValue(effectElements[24].p.v, effectElements[25].p.v, effectElements[26].p.v, effectElements[27].p.v, effectElements[28].p.v);
      this.feFuncB.setAttribute('tableValues', val);
    }

    if (this.feFuncA && (forceRender || effectElements[31].p._mdf || effectElements[32].p._mdf || effectElements[33].p._mdf || effectElements[34].p._mdf || effectElements[35].p._mdf)) {
      val = this.getTableValue(effectElements[31].p.v, effectElements[32].p.v, effectElements[33].p.v, effectElements[34].p.v, effectElements[35].p.v);
      this.feFuncA.setAttribute('tableValues', val);
    }
  }
};

/* global createNS, rgbToHex, degToRads */

function SVGDropShadowEffect(filter, filterManager) {
  var filterSize = filterManager.container.globalData.renderConfig.filterSize;
  filter.setAttribute('x', filterSize.x);
  filter.setAttribute('y', filterSize.y);
  filter.setAttribute('width', filterSize.width);
  filter.setAttribute('height', filterSize.height);
  this.filterManager = filterManager;

  var feGaussianBlur = createNS('feGaussianBlur');
  feGaussianBlur.setAttribute('in', 'SourceAlpha');
  feGaussianBlur.setAttribute('result', 'drop_shadow_1');
  feGaussianBlur.setAttribute('stdDeviation', '0');
  this.feGaussianBlur = feGaussianBlur;
  filter.appendChild(feGaussianBlur);

  var feOffset = createNS('feOffset');
  feOffset.setAttribute('dx', '25');
  feOffset.setAttribute('dy', '0');
  feOffset.setAttribute('in', 'drop_shadow_1');
  feOffset.setAttribute('result', 'drop_shadow_2');
  this.feOffset = feOffset;
  filter.appendChild(feOffset);
  var feFlood = createNS('feFlood');
  feFlood.setAttribute('flood-color', '#00ff00');
  feFlood.setAttribute('flood-opacity', '1');
  feFlood.setAttribute('result', 'drop_shadow_3');
  this.feFlood = feFlood;
  filter.appendChild(feFlood);

  var feComposite = createNS('feComposite');
  feComposite.setAttribute('in', 'drop_shadow_3');
  feComposite.setAttribute('in2', 'drop_shadow_2');
  feComposite.setAttribute('operator', 'in');
  feComposite.setAttribute('result', 'drop_shadow_4');
  filter.appendChild(feComposite);

  var feMerge = createNS('feMerge');
  filter.appendChild(feMerge);
  var feMergeNode;
  feMergeNode = createNS('feMergeNode');
  feMerge.appendChild(feMergeNode);
  feMergeNode = createNS('feMergeNode');
  feMergeNode.setAttribute('in', 'SourceGraphic');
  this.feMergeNode = feMergeNode;
  this.feMerge = feMerge;
  this.originalNodeAdded = false;
  feMerge.appendChild(feMergeNode);
}

SVGDropShadowEffect.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    if (forceRender || this.filterManager.effectElements[4].p._mdf) {
      this.feGaussianBlur.setAttribute('stdDeviation', this.filterManager.effectElements[4].p.v / 4);
    }
    if (forceRender || this.filterManager.effectElements[0].p._mdf) {
      var col = this.filterManager.effectElements[0].p.v;
      this.feFlood.setAttribute('flood-color', rgbToHex(Math.round(col[0] * 255), Math.round(col[1] * 255), Math.round(col[2] * 255)));
    }
    if (forceRender || this.filterManager.effectElements[1].p._mdf) {
      this.feFlood.setAttribute('flood-opacity', this.filterManager.effectElements[1].p.v / 255);
    }
    if (forceRender || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
      var distance = this.filterManager.effectElements[3].p.v;
      var angle = (this.filterManager.effectElements[2].p.v - 90) * degToRads;
      var x = distance * Math.cos(angle);
      var y = distance * Math.sin(angle);
      this.feOffset.setAttribute('dx', x);
      this.feOffset.setAttribute('dy', y);
    }
    /* if(forceRender || this.filterManager.effectElements[5].p._mdf){
            if(this.filterManager.effectElements[5].p.v === 1 && this.originalNodeAdded) {
                this.feMerge.removeChild(this.feMergeNode);
                this.originalNodeAdded = false;
            } else if(this.filterManager.effectElements[5].p.v === 0 && !this.originalNodeAdded) {
                this.feMerge.appendChild(this.feMergeNode);
                this.originalNodeAdded = true;
            }
        } */
  }
};

/* global createElementID, createNS */

var _svgMatteSymbols = [];

function SVGMatte3Effect(filterElem, filterManager, elem) {
  this.initialized = false;
  this.filterManager = filterManager;
  this.filterElem = filterElem;
  this.elem = elem;
  elem.matteElement = createNS('g');
  elem.matteElement.appendChild(elem.layerElement);
  elem.matteElement.appendChild(elem.transformedElement);
  elem.baseElement = elem.matteElement;
}

SVGMatte3Effect.prototype.findSymbol = function (mask) {
  var i = 0;
  var len = _svgMatteSymbols.length;
  while (i < len) {
    if (_svgMatteSymbols[i] === mask) {
      return _svgMatteSymbols[i];
    }
    i += 1;
  }
  return null;
};

SVGMatte3Effect.prototype.replaceInParent = function (mask, symbolId) {
  var parentNode = mask.layerElement.parentNode;
  if (!parentNode) {
    return;
  }
  var children = parentNode.children;
  var i = 0;
  var len = children.length;
  while (i < len) {
    if (children[i] === mask.layerElement) {
      break;
    }
    i += 1;
  }
  var nextChild;
  if (i <= len - 2) {
    nextChild = children[i + 1];
  }
  var useElem = createNS('use');
  useElem.setAttribute('href', '#' + symbolId);
  if (nextChild) {
    parentNode.insertBefore(useElem, nextChild);
  } else {
    parentNode.appendChild(useElem);
  }
};

SVGMatte3Effect.prototype.setElementAsMask = function (elem, mask) {
  if (!this.findSymbol(mask)) {
    var symbolId = createElementID();
    var masker = createNS('mask');
    masker.setAttribute('id', mask.layerId);
    masker.setAttribute('mask-type', 'alpha');
    _svgMatteSymbols.push(mask);
    var defs = elem.globalData.defs;
    defs.appendChild(masker);
    var symbol = createNS('symbol');
    symbol.setAttribute('id', symbolId);
    this.replaceInParent(mask, symbolId);
    symbol.appendChild(mask.layerElement);
    defs.appendChild(symbol);
    var useElem = createNS('use');
    useElem.setAttribute('href', '#' + symbolId);
    masker.appendChild(useElem);
    mask.data.hd = false;
    mask.show();
  }
  elem.setMatte(mask.layerId);
};

SVGMatte3Effect.prototype.initialize = function () {
  var ind = this.filterManager.effectElements[0].p.v;
  var elements = this.elem.comp.elements;
  var i = 0;
  var len = elements.length;
  while (i < len) {
    if (elements[i] && elements[i].data.ind === ind) {
      this.setElementAsMask(this.elem, elements[i]);
    }
    i += 1;
  }
  this.initialized = true;
};

SVGMatte3Effect.prototype.renderFrame = function () {
  if (!this.initialized) {
    this.initialize();
  }
};

/* exported SVGEffects */

function SVGEffects() {}

/* global createTag, AnimationItem */
/* exported animationManager */

var animationManager = (function () {
  var moduleOb = {};
  var registeredAnimations = [];
  var initTime = 0;
  var len = 0;
  var playingAnimationsNum = 0;
  var _stopped = true;
  var _isFrozen = false;

  function removeElement(ev) {
    var i = 0;
    var animItem = ev.target;
    while (i < len) {
      if (registeredAnimations[i].animation === animItem) {
        registeredAnimations.splice(i, 1);
        i -= 1;
        len -= 1;
        subtractPlayingCount();
      }
      i += 1;
    }
  }


  function addPlayingCount() {
    playingAnimationsNum += 1;
    activate();
  }

  function subtractPlayingCount() {
    playingAnimationsNum -= 1;
  }

  function setupAnimation(animItem, element) {
    animItem.addEventListener('destroy', removeElement);
    animItem.addEventListener('_active', addPlayingCount);
    animItem.addEventListener('_idle', subtractPlayingCount);
    registeredAnimations.push({ elem: element, animation: animItem });
    len += 1;
  }

  function loadAnimation(params) {
    var animItem = new AnimationItem();
    setupAnimation(animItem, null);
    animItem.setParams(params);
    return animItem;
  }


  function play(animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.play(animation);
    }
  }
  function resume(nowTime) {
    var elapsedTime = nowTime - initTime;
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.advanceTime(elapsedTime);
    }
    initTime = nowTime;
    if (playingAnimationsNum && !_isFrozen) {
      window.requestAnimationFrame(resume);
    } else {
      _stopped = true;
    }
  }

  function first(nowTime) {
    initTime = nowTime;
    window.requestAnimationFrame(resume);
  }


  function destroy(animation) {
    var i;
    for (i = (len - 1); i >= 0; i -= 1) {
      registeredAnimations[i].animation.destroy(animation);
    }
  }

  function resize() {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.resize();
    }
  }

  function activate() {
    if (!_isFrozen && playingAnimationsNum) {
      if (_stopped) {
        window.requestAnimationFrame(first);
        _stopped = false;
      }
    }
  }

  function freeze() {
    _isFrozen = true;
  }

  function unfreeze() {
    _isFrozen = false;
    activate();
  }

  moduleOb.loadAnimation = loadAnimation;
  moduleOb.play = play;
  moduleOb.stop = stop;
  moduleOb.resize = resize;
  // moduleOb.start = start;
  moduleOb.destroy = destroy;
  moduleOb.freeze = freeze;
  moduleOb.unfreeze = unfreeze;
  return moduleOb;
}());

/* global createElementID, subframeEnabled, ProjectInterface, extendPrototype, BaseEvent,
CanvasRenderer, SVGRenderer, HybridRenderer, dataManager, BMEnterFrameEvent, BMCompleteLoopEvent,
BMCompleteEvent, BMSegmentStartEvent, BMDestroyEvent, BMEnterFrameEvent, BMCompleteLoopEvent, BMCompleteEvent, BMSegmentStartEvent,
BMDestroyEvent, BMRenderFrameErrorEvent, BMConfigErrorEvent, markerParser */

var AnimationItem = function () {
  this._cbs = [];
  this.name = '';
  this.path = '';
  this.isLoaded = false;
  this.currentFrame = 0;
  this.currentRawFrame = 0;
  this.firstFrame = 0;
  this.totalFrames = 0;
  this.frameRate = 0;
  this.frameMult = 0;
  this.playSpeed = 1;
  this.playDirection = 1;
  this.playCount = 0;
  this.animationData = {};
 
  this.loop = true;
  this.renderer = null;
  this.animationID = createElementID();
  this.timeCompleted = 0;
  this.segmentPos = 0;
  this.isSubframeEnabled = subframeEnabled;
  this.segments = [];
  this._idle = true;
  this._completedLoop = false;
  this.projectInterface = ProjectInterface();
  this.markers = [];
};

extendPrototype([BaseEvent], AnimationItem);

AnimationItem.prototype.setParams = function (params) {
  if (params.wrapper || params.container) {
    this.wrapper = params.wrapper || params.container;
  }
  this.renderer = new SVGRenderer(this, params.rendererSettings);

  this.renderer.setProjectInterface(this.projectInterface);
  this.animType = 'svg';
  this.loop = true;
  this.name = params.name ? params.name : '';
  this.autoloadSegments = Object.prototype.hasOwnProperty.call(params, 'autoloadSegments') ? params.autoloadSegments : true;
  this.initialSegment = params.initialSegment;
  this.configAnimation(params.animationData);
  
};

AnimationItem.prototype.setData = function (wrapper, animationData) {
  if (animationData) {
    if (typeof animationData !== 'object') {
      animationData = JSON.parse(animationData);
    }
  }
  var params = {
    wrapper: wrapper,
    animationData: animationData,
  };
  var wrapperAttributes = wrapper.attributes;

  params.path = wrapperAttributes.getNamedItem('data-animation-path') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-animation-path').value
    : wrapperAttributes.getNamedItem('data-bm-path') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-path').value
      : wrapperAttributes.getNamedItem('bm-path')
        ? wrapperAttributes.getNamedItem('bm-path').value
        : '';
  params.animType = wrapperAttributes.getNamedItem('data-anim-type') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-anim-type').value
    : wrapperAttributes.getNamedItem('data-bm-type') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-type').value
      : wrapperAttributes.getNamedItem('bm-type') // eslint-disable-line no-nested-ternary
        ? wrapperAttributes.getNamedItem('bm-type').value
        : wrapperAttributes.getNamedItem('data-bm-renderer') // eslint-disable-line no-nested-ternary
          ? wrapperAttributes.getNamedItem('data-bm-renderer').value
          : wrapperAttributes.getNamedItem('bm-renderer')
            ? wrapperAttributes.getNamedItem('bm-renderer').value
            : 'canvas';

  var loop = wrapperAttributes.getNamedItem('data-anim-loop') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-anim-loop').value
    : wrapperAttributes.getNamedItem('data-bm-loop') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-loop').value
      : wrapperAttributes.getNamedItem('bm-loop')
        ? wrapperAttributes.getNamedItem('bm-loop').value
        : '';
  if (loop === 'false') {
    params.loop = false;
  } else if (loop === 'true') {
    params.loop = true;
  } else if (loop !== '') {
    params.loop = parseInt(loop, 10);
  }


  params.name = wrapperAttributes.getNamedItem('data-name') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-name').value
    : wrapperAttributes.getNamedItem('data-bm-name') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-name').value
      : wrapperAttributes.getNamedItem('bm-name')
        ? wrapperAttributes.getNamedItem('bm-name').value
        : '';
  var prerender = wrapperAttributes.getNamedItem('data-anim-prerender') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-anim-prerender').value
    : wrapperAttributes.getNamedItem('data-bm-prerender') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-prerender').value
      : wrapperAttributes.getNamedItem('bm-prerender')
        ? wrapperAttributes.getNamedItem('bm-prerender').value
        : '';

  if (prerender === 'false') {
    params.prerender = false;
  }
  this.setParams(params);
};

AnimationItem.prototype.includeLayers = function (data) {
  debugger;
  if (data.op > this.animationData.op) {
    this.animationData.op = data.op;
    this.totalFrames = Math.floor(data.op - this.animationData.ip);
  }
  var layers = this.animationData.layers;
  var i;
  var len = layers.length;
  var newLayers = data.layers;
  var j;
  var jLen = newLayers.length;
  for (j = 0; j < jLen; j += 1) {
    i = 0;
    while (i < len) {
      if (layers[i].id === newLayers[j].id) {
        layers[i] = newLayers[j];
        break;
      }
      i += 1;
    }
  }
  if (data.assets) {
    len = data.assets.length;
    for (i = 0; i < len; i += 1) {
      this.animationData.assets.push(data.assets[i]);
    }
  }
  this.animationData.__complete = false;
  dataManager.completeData(this.animationData);
  this.renderer.includeLayers(data.layers);
  this.loadNextSegment();
};

AnimationItem.prototype.loadNextSegment = function () {
  var segments = this.animationData.segments;
  if (!segments || segments.length === 0 || !this.autoloadSegments) {
    this.trigger('data_ready');
    this.timeCompleted = this.totalFrames;
    return;
  }
  var segment = segments.shift();
  this.timeCompleted = segment.time * this.frameRate;
  var segmentPath = this.path + this.fileName + '_' + this.segmentPos + '.json';
  this.segmentPos += 1;
  assetLoader.load(segmentPath, this.includeLayers.bind(this), function () {
    this.trigger('data_failed');
  }.bind(this));
};

AnimationItem.prototype.loadSegments = function () {
  var segments = this.animationData.segments;
  if (!segments) {
    this.timeCompleted = this.totalFrames;
  }
  this.loadNextSegment();
};


AnimationItem.prototype.configAnimation = function (animData) {
  if (!this.renderer) {
    return;
  }
  try {
    this.animationData = animData;

    if (this.initialSegment) {
    
      this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]);
      this.firstFrame = Math.round(this.initialSegment[0]);
    } else {
      debugger;
      this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip);
      this.firstFrame = Math.round(this.animationData.ip);
    }
    this.renderer.configAnimation(animData);
    if (!animData.assets) {
      animData.assets = [];
    }

    this.assets = this.animationData.assets;
    this.frameRate = this.animationData.fr;
    this.frameMult = this.animationData.fr / 1000;
    this.renderer.searchExtraCompositions(animData.assets);
    this.markers = markerParser(animData.markers || []);
    this.trigger('config_ready');
    this.loadSegments();
    this.updaFrameModifier();
    this.checkLoaded();
   
  } catch (error) {
    this.triggerConfigError(error);
  }
};


AnimationItem.prototype.checkLoaded = function () {
  if (!this.isLoaded) {
    this.isLoaded = true;
    dataManager.completeData(this.animationData);
    this.renderer.initItems();
    setTimeout(function () {
      this.trigger('DOMLoaded');
    }.bind(this), 0);
    this.gotoFrame();
    this.play();
  }
};

AnimationItem.prototype.resize = function () {
  this.renderer.updateContainerSize();
};

AnimationItem.prototype.setSubframe = function (flag) {
  this.isSubframeEnabled = !!flag;
};

AnimationItem.prototype.gotoFrame = function () {
  this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame; // eslint-disable-line no-bitwise

  if (this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted) {
    this.currentFrame = this.timeCompleted;
  }
  this.trigger('enterFrame');
  this.renderFrame();
};

AnimationItem.prototype.renderFrame = function () {
  if (this.isLoaded === false || !this.renderer) {
    return;
  }
  try {
    this.renderer.renderFrame(this.currentFrame + this.firstFrame);
  } catch (error) {
    this.triggerRenderFrameError(error);
  }
};

AnimationItem.prototype.play = function (name) {
  if (name && this.name !== name) {
    return;
  }
  this.trigger('_active');

};


AnimationItem.prototype.getMarkerData = function (markerName) {
  var marker;
  for (var i = 0; i < this.markers.length; i += 1) {
    marker = this.markers[i];
    if (marker.payload && marker.payload.name === markerName) {
      return marker;
    }
  }
  return null;
};



AnimationItem.prototype.advanceTime = function (value) {
  if (this.isLoaded === false) {
    return;
  }
  var nextValue = this.currentRawFrame + value * this.frameModifier;
  var _isComplete = false;
  // Checking if nextValue > totalFrames - 1 for addressing non looping and looping animations.
  // If animation won't loop, it should stop at totalFrames - 1. If it will loop it should complete the last frame and then loop.
  if (nextValue >= this.totalFrames - 1 && this.frameModifier > 0) {
    if (!this.loop || this.playCount === this.loop) {
      if (!this.checkSegments(nextValue > this.totalFrames ? nextValue % this.totalFrames : 0)) {
        _isComplete = true;
        nextValue = this.totalFrames - 1;
      }
    } else if (nextValue >= this.totalFrames) {
      this.playCount += 1;
      if (!this.checkSegments(nextValue % this.totalFrames)) {
        this.setCurrentRawFrameValue(nextValue % this.totalFrames);
        this._completedLoop = true;
        this.trigger('loopComplete');
      }
    } else {
      this.setCurrentRawFrameValue(nextValue);
    }
  } else if (nextValue < 0) {
    if (!this.checkSegments(nextValue % this.totalFrames)) {
      if (this.loop && !(this.playCount-- <= 0 && this.loop !== true)) { // eslint-disable-line no-plusplus
        this.setCurrentRawFrameValue(this.totalFrames + (nextValue % this.totalFrames));
        if (!this._completedLoop) {
          this._completedLoop = true;
        } else {
          this.trigger('loopComplete');
        }
      } else {
        _isComplete = true;
        nextValue = 0;
      }
    }
  } else {
    this.setCurrentRawFrameValue(nextValue);
  }
  if (_isComplete) {
    this.setCurrentRawFrameValue(nextValue);;
    this.trigger('complete');
  }
};

AnimationItem.prototype.adjustSegment = function (arr, offset) {
  this.playCount = 0;
  if (arr[1] < arr[0]) {
    this.totalFrames = arr[0] - arr[1];
    this.timeCompleted = this.totalFrames;
    this.firstFrame = arr[1];
    this.setCurrentRawFrameValue(this.totalFrames - 0.001 - offset);
  } else if (arr[1] > arr[0]) {
    this.totalFrames = arr[1] - arr[0];
    this.timeCompleted = this.totalFrames;
    this.firstFrame = arr[0];
    this.setCurrentRawFrameValue(0.001 + offset);
  }
  this.trigger('segmentStart');
};
AnimationItem.prototype.setSegment = function (init, end) {
  var pendingFrame = -1;


  this.firstFrame = init;
  this.totalFrames = end - init;
  this.timeCompleted = this.totalFrames;
};

AnimationItem.prototype.playSegments = function (arr, forceFlag) {
  if (forceFlag) {
    this.segments.length = 0;
  }
  if (typeof arr[0] === 'object') {
    var i;
    var len = arr.length;
    for (i = 0; i < len; i += 1) {
      this.segments.push(arr[i]);
    }
  } else {
    this.segments.push(arr);
  }
  if (this.segments.length && forceFlag) {
    this.adjustSegment(this.segments.shift(), 0);
  }
 
    this.play();
};

AnimationItem.prototype.resetSegments = function (forceFlag) {
  this.segments.length = 0;
  this.segments.push([this.animationData.ip, this.animationData.op]);
  // this.segments.push([this.animationData.ip*this.frameRate,Math.floor(this.animationData.op - this.animationData.ip+this.animationData.ip*this.frameRate)]);
  if (forceFlag) {
    this.checkSegments(0);
  }
};
AnimationItem.prototype.checkSegments = function (offset) {
  if (this.segments.length) {
    this.adjustSegment(this.segments.shift(), offset);
    return true;
  }
  return false;
};

AnimationItem.prototype.destroy = function (name) {
  if ((name && this.name !== name) || !this.renderer) {
    return;
  }
  this.renderer.destroy();
  this.trigger('destroy');
  this._cbs = null;
  this.onEnterFrame = null;
  this.onLoopComplete = null;
  this.onComplete = null;
  this.onSegmentStart = null;
  this.onDestroy = null;
  this.renderer = null;
  this.projectInterface = null;
};

AnimationItem.prototype.setCurrentRawFrameValue = function (value) {
  // console.log(value)
  this.currentRawFrame = value;
  this.gotoFrame();
};

AnimationItem.prototype.updaFrameModifier = function () {
  this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;

};

AnimationItem.prototype.getPath = function () {
  return this.path;
};



AnimationItem.prototype.getAssetData = function (id) {
  var i = 0;
  var len = this.assets.length;
  while (i < len) {
    if (id === this.assets[i].id) {
      return this.assets[i];
    }
    i += 1;
  }
  return null;
};

AnimationItem.prototype.hide = function () {
  this.renderer.hide();
};

AnimationItem.prototype.show = function () {
  this.renderer.show();
};

AnimationItem.prototype.getDuration = function (isFrame) {
  return isFrame ? this.totalFrames : this.totalFrames / this.frameRate;
};

AnimationItem.prototype.trigger = function (name) {
  if (this._cbs && this._cbs[name]) {
    switch (name) {
      case 'enterFrame':
        this.triggerEvent(name, new BMEnterFrameEvent(name, this.currentFrame, this.totalFrames, this.frameModifier));
        break;
      case 'loopComplete':
        this.triggerEvent(name, new BMCompleteLoopEvent(name, this.loop, this.playCount, this.frameMult));
        break;
      case 'complete':
        this.triggerEvent(name, new BMCompleteEvent(name, this.frameMult));
        break;
      case 'segmentStart':
        this.triggerEvent(name, new BMSegmentStartEvent(name, this.firstFrame, this.totalFrames));
        break;
      case 'destroy':
        this.triggerEvent(name, new BMDestroyEvent(name, this));
        break;
      default:
        this.triggerEvent(name);
    }
  }
  if (name === 'enterFrame' && this.onEnterFrame) {
    this.onEnterFrame.call(this, new BMEnterFrameEvent(name, this.currentFrame, this.totalFrames, this.frameMult));
  }
  if (name === 'loopComplete' && this.onLoopComplete) {
    this.onLoopComplete.call(this, new BMCompleteLoopEvent(name, this.loop, this.playCount, this.frameMult));
  }
  if (name === 'complete' && this.onComplete) {
    this.onComplete.call(this, new BMCompleteEvent(name, this.frameMult));
  }
  if (name === 'segmentStart' && this.onSegmentStart) {
    this.onSegmentStart.call(this, new BMSegmentStartEvent(name, this.firstFrame, this.totalFrames));
  }
  if (name === 'destroy' && this.onDestroy) {
    this.onDestroy.call(this, new BMDestroyEvent(name, this));
  }
};

AnimationItem.prototype.triggerRenderFrameError = function (nativeError) {
  var error = new BMRenderFrameErrorEvent(nativeError, this.currentFrame);
  this.triggerEvent('error', error);

  if (this.onError) {
    this.onError.call(this, error);
  }
};

AnimationItem.prototype.triggerConfigError = function (nativeError) {
  var error = new BMConfigErrorEvent(nativeError, this.currentFrame);
  this.triggerEvent('error', error);

  if (this.onError) {
    this.onError.call(this, error);
  }
};



var lottie = {};

function setLocationHref(href) {
  locationHref = href;
}

function setSubframeRendering(flag) {
  subframeEnabled = flag;
}

function setIDPrefix(prefix) {
  idPrefix = prefix;
}

function loadAnimation(params) {
  if (standalone === true) {
    params.animationData = JSON.parse(animationData);
  }
  return animationManager.loadAnimation(params);
}

function setQuality(value) {
  if (typeof value === 'string') {
    switch (value) {
      case 'high':
        defaultCurveSegments = 200;
        break;
      default:
      case 'medium':
        defaultCurveSegments = 50;
        break;
      case 'low':
        defaultCurveSegments = 10;
        break;
    }
  } else if (!isNaN(value) && value > 1) {
    defaultCurveSegments = value;
  }
  if (defaultCurveSegments >= 50) {
    roundValues(false);
  } else {
    roundValues(true);
  }
}

function inBrowser() {
  return typeof navigator !== 'undefined';
}

function getFactory(name) {
  switch (name) {
    case 'propertyFactory':
      return PropertyFactory;
    case 'shapePropertyFactory':
      return ShapePropertyFactory;
    case 'matrix':
      console.log("In the Matrix")
      return Matrix;
    default:
      return null;
  }
}

lottie.play = animationManager.play;
lottie.setLocationHref = setLocationHref;
lottie.loadAnimation = loadAnimation;
lottie.setSubframeRendering = setSubframeRendering;
lottie.resize = animationManager.resize;

lottie.destroy = animationManager.destroy;
lottie.setQuality = setQuality;
lottie.inBrowser = inBrowser;
lottie.freeze = animationManager.freeze;
lottie.unfreeze = animationManager.unfreeze;
lottie.setIDPrefix = setIDPrefix;
lottie.version = '5.7.11';

function checkReady() {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval);
  }
}

function getQueryVariable(variable) {
  var vars = queryString.split('&');
  for (var i = 0; i < vars.length; i += 1) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) { // eslint-disable-line eqeqeq
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}
var standalone = '__[STANDALONE]__';
var animationData = '__[ANIMATIONDATA]__';
var renderer = '';
var queryString;
if (standalone) {
  var scripts = document.getElementsByTagName('script');
  var index = scripts.length - 1;
  var myScript = scripts[index] || {
    src: '',
  };
  queryString = myScript.src.replace(/^[^\?]+\??/, ''); // eslint-disable-line no-useless-escape
  renderer = getQueryVariable('renderer');
}

//var readyStateCheckInterval = setInterval(checkReady, 100);

return lottie;
}));

/* eslint-disable */