"use strict";

/*
Copyright (c) 2015 Andreas Farre

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var depixel = function () {
    "use strict";

    var Color = /*#__PURE__*/function () {
        function Color(_ref) {
            var _ref2 = _slicedToArray(_ref, 3),
                r = _ref2[0],
                g = _ref2[1],
                b = _ref2[2];
            _classCallCheck(this, Color);
            var y = 0.299 * r + 0.587 * g + 0.114 * b;
            this.y = Math.round(y);
            this.u = Math.round(0.492 * (b - y));
            this.v = Math.round(0.877 * (r - y));
        }
        _createClass(Color, [{
            key: "rgb",
            get: function get() {
                var y = this.y,
                    u = this.u,
                    v = this.v;
                var r = y + 1.140 * v;
                var g = y - 0.394 * u - 0.581 * v;
                var b = y + 2.032 * u;
                return [r, g, b].map(Math.round);
            }
        }, {
            key: "dissimilar",
            value: function dissimilar(color) {
                return Math.abs(this.y - color.y) > 48 || Math.abs(this.u - color.u) > 7 || Math.abs(this.v - color.v) > 6;
            }
        }, {
            key: "toString",
            value: function toString() {
                return 'rgb(' + this.rgb.join() + ')';
            }
        }]);
        return Color;
    }();
    var Vertex = /*#__PURE__*/function () {
        function Vertex(x, y) {
            _classCallCheck(this, Vertex);
            this.x = x;
            this.y = y;
            this.edges = [];
        }
        _createClass(Vertex, [{
            key: "split",
            value: function split(v) {
                return new Vertex((this.x + v.x) / 2, (this.y + v.y) / 2);
            }
        }, {
            key: "adjust",
            value: function adjust(x, y) {
                this.x += x;
                this.y += y;
                return this;
            }
        }, {
            key: "clone",
            value: function clone() {
                return new Vertex(this.x, this.y);
            }
        }, {
            key: "equals",
            value: function equals(other) {
                return this.x === other.x && this.y === other.y;
            }
        }, {
            key: "addEdge",
            value: function addEdge(other) {
                if (this.edges.indexOf(other) != -1) {
                    return;
                }
                this.edges.push(other);
                other.addEdge(this);
            }
        }]);
        return Vertex;
    }();
    var Curve = /*#__PURE__*/function (_Array) {
        _inherits(Curve, _Array);
        var _super = _createSuper(Curve);
        function Curve(node) {
            var _this;
            _classCallCheck(this, Curve);
            _this = _super.call(this, 1);
            _this[0] = node;
            _this.circular = false;
            return _this;
        }
        _createClass(Curve, [{
            key: "splitAt",
            value: function splitAt(node) {
                if (this.length === 1) {
                    return;
                }
                if (this[0] === node) {
                    this.shift();
                } else if (this[this.length - 1] === node) {
                    this.pop();
                } else if (this.circular) {
                    for (var other = this.shift(); other !== node; other = this.shift()) {
                        this.push(other);
                    }
                } else {
                    var index = this.indexOf(node);
                    var tail = this.slice(index + 1);
                    var _iterator = _createForOfIteratorHelper(tail),
                        _step;
                    try {
                        for (_iterator.s(); !(_step = _iterator.n()).done;) {
                            var _other = _step.value;
                            _other.curve = tail;
                        }
                    } catch (err) {
                        _iterator.e(err);
                    } finally {
                        _iterator.f();
                    }
                    this.length = index;
                }
                node.curve = new Curve(node);
            }
        }, {
            key: "merge",
            value: function merge(curve) {
                if (this === curve) {
                    this.circular = curve.length > 2;
                    return;
                }
                var _sort = [this, curve].sort(function (_ref3, _ref4) {
                        var a = _ref3.length;
                        var b = _ref4.length;
                        return a - b;
                    }),
                    _sort2 = _slicedToArray(_sort, 2),
                    discard = _sort2[0],
                    keep = _sort2[1];
                var popfn, pushfn;
                if (keep[0].edges.indexOf(discard[0]) !== -1) {
                    popfn = this.shift;
                    pushfn = this.unshift;
                } else if (keep[0].edges.indexOf(discard[discard.length - 1]) !== -1) {
                    popfn = this.pop;
                    pushfn = this.unshift;
                } else if (keep[keep.length - 1].edges.indexOf(discard[0]) !== -1) {
                    popfn = this.shift;
                    pushfn = this.push;
                } else if (keep[keep.length - 1].edges.indexOf(discard[discard.length - 1]) !== -1) {
                    popfn = this.pop;
                    pushfn = this.push;
                }
                while (discard.length) {
                    var node = popfn.call(discard);
                    pushfn.call(keep, node);
                    node.curve = keep;
                }
            }
        }], [{
            key: "curve",
            value: function curve(m, n) {
                return m.curve === n.curve ? m.curve.length : 0;
            }
        }]);
        return Curve;
    }( /*#__PURE__*/_wrapNativeSuper(Array));
    var Node = /*#__PURE__*/function () {
        function Node(x, y, color, vertices) {
            _classCallCheck(this, Node);
            this.x = x;
            this.y = y;
            this.edges = new Array(8);
            this.vertices = vertices || [];
            this.color = color;
            this.marked = false;
            this.curve = new Curve(this);
        }
        _createClass(Node, [{
            key: "relativePosition",
            value: function relativePosition(_ref5) {
                var x = _ref5.x,
                    y = _ref5.y;
                var dy = y - this.y;
                var dx = x - this.x;
                return (dx + dy * 3 + 8) % 9;
            }
        }, {
            key: "invalidCurve",
            value: function invalidCurve() {
                return this.valence() > 2 && this.curve.length > 1;
            }
        }, {
            key: "updateCurves",
            value: function updateCurves() {
                if (this.valence() > 2) {
                    this.curve.splitAt(this);
                }
            }
        }, {
            key: "equals",
            value: function equals(node) {
                return this.x === node.x && this.y === node.y;
            }
        }, {
            key: "removeEdge",
            value: function removeEdge(node) {
                Node.removeEdge(this, node);
            }
        }, {
            key: "canReach",
            value: function canReach(node) {
                return node && !!this.edges[this.relativePosition(node)];
            }
        }, {
            key: "valence",
            value: function valence() {
                return this.edges.filter(function (x) {
                    return x;
                }).length;
            }
        }, {
            key: "toString",
            value: function toString() {
                var str = "(" + [this.x, this.y].join() + ") => ";
                var edges = this.edges.filter(function (x) {
                    return x;
                }).map(function (n) {
                    return "(" + [n.x, n.y].join() + ")";
                });
                return str + edges.join();
            }
        }, {
            key: "edge",
            value: function edge(dx, dy) {
                return this.edges[(dx + dy * 3 + 8) % 9];
            }
        }, {
            key: "right",
            value: function right() {
                return this.edges[0];
            }
        }, {
            key: "left",
            value: function left() {
                return this.edges[7];
            }
        }, {
            key: "up",
            value: function up() {
                return this.edges[5];
            }
        }, {
            key: "down",
            value: function down() {
                return this.edges[2];
            }
        }, {
            key: "isEdge",
            value: function isEdge() {
                return this.edges.filter(function (x) {
                    return x;
                }).length < 4;
            }
        }, {
            key: "follow",
            value: /*#__PURE__*/_regeneratorRuntime().mark(function follow(node) {
                var begin, edges, next;
                return _regeneratorRuntime().wrap(function follow$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                begin = this;
                            case 1:
                                if (!(begin.canReach(node) && begin.valence() < 3)) {
                                    _context.next = 14;
                                    break;
                                }
                                _context.next = 4;
                                return node;
                            case 4:
                                if (!(node.valence() > 2)) {
                                    _context.next = 6;
                                    break;
                                }
                                return _context.abrupt("break", 14);
                            case 6:
                                edges = node.edges.filter(function (x) {
                                    return x;
                                });
                                next = edges[0] != begin ? edges[0] : edges[1];
                                begin = node;
                                node = next;
                                if (!(node == this)) {
                                    _context.next = 12;
                                    break;
                                }
                                return _context.abrupt("break", 14);
                            case 12:
                                _context.next = 1;
                                break;
                            case 14:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, follow, this);
            })
        }, {
            key: "square",
            value: function square() {
                var edges = this.edges;
                var _edges = _slicedToArray(edges, 3),
                    right = _edges[0],
                    down = _edges[2];
                var diagonal = right && down && right.down() && down.right();
                return [this, right, down, diagonal].filter(function (x) {
                    return x;
                });
            }
        }], [{
            key: "addSimilarEdge",
            value: function addSimilarEdge(m, n) {
                if (m.color && n.color && !m.color.dissimilar(n.color)) {
                    m.edges[m.relativePosition(n)] = n;
                    n.edges[n.relativePosition(m)] = m;
                    if (m.valence() > 2) {
                        m.curve.splitAt(m);
                    }
                    if (n.valence() > 2) {
                        n.curve.splitAt(n);
                    }
                    if (m.valence() < 3 && n.valence() < 3) {
                        m.curve.merge(n.curve);
                    }
                }
            }
        }, {
            key: "removeEdge",
            value: function removeEdge(m, n) {
                m.edges[m.relativePosition(n)] = undefined;
                n.edges[n.relativePosition(m)] = undefined;
            }
        }]);
        return Node;
    }();
    var Graph = /*#__PURE__*/function () {
        function Graph(pixels, x, y) {
            _classCallCheck(this, Graph);
            if (pixels.length != x * y * 4) {
                throw new Error("Wrong dimension of pixel buffer");
            }
            this.width = x;
            this.height = y;
            this.pixels = pixels;
        }
        _createClass(Graph, [{
            key: "create",
            value: /*#__PURE__*/_regeneratorRuntime().mark(function create() {
                var x, y, nodes, vertices, i, dissimilarNode, seen, previous, line, top, bottom, j, nodeVertices, node, current;
                return _regeneratorRuntime().wrap(function create$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                x = this.width;
                                y = this.height;
                                nodes = new Array(y);
                                vertices = new Array(y + 1);
                                vertices[0] = new Array(x + 1);
                                for (i = 0; i < x + 1; ++i) {
                                    vertices[0][i] = new Vertex(i, 0);
                                }
                                dissimilarNode = new Node();
                                seen = new Array(x).fill(dissimilarNode);
                                i = 0;
                            case 9:
                                if (!(i < y)) {
                                    _context2.next = 31;
                                    break;
                                }
                                previous = [dissimilarNode, dissimilarNode];
                                line = nodes[i] = new Array(x);
                                top = vertices[i];
                                bottom = vertices[i + 1] = new Array(x + 1);
                                bottom[0] = new Vertex(0, i + 1);
                                j = 0;
                            case 16:
                                if (!(j < x)) {
                                    _context2.next = 27;
                                    break;
                                }
                                bottom[j + 1] = new Vertex(j + 1, i + 1);
                                nodeVertices = [top[j], top[j + 1], bottom[j + 1], bottom[j]];
                                node = line[j] = new Node(j, i, this.pixel(j, i), nodeVertices);
                                current = [seen[j], node];
                                _context2.next = 23;
                                return [previous, current];
                            case 23:
                                previous = current;
                            case 24:
                                ++j;
                                _context2.next = 16;
                                break;
                            case 27:
                                seen = line;
                            case 28:
                                ++i;
                                _context2.next = 9;
                                break;
                            case 31:
                                this.nodes_old = nodes;
                                this.vertices = nodes;
                            case 33:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, create, this);
            })
        }, {
            key: "createSimilarityGraph",
            value: function createSimilarityGraph() {
                var _iterator2 = _createForOfIteratorHelper(this.create()),
                    _step2;
                try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        var _step2$value = _slicedToArray(_step2.value, 2),
                            _step2$value$ = _slicedToArray(_step2$value[0], 2),
                            a = _step2$value$[0],
                            b = _step2$value$[1],
                            _step2$value$2 = _slicedToArray(_step2$value[1], 2),
                            c = _step2$value$2[0],
                            d = _step2$value$2[1];
                        Node.addSimilarEdge(c, d);
                        Node.addSimilarEdge(b, d);
                        if (a.square().length !== 4) {
                            Node.addSimilarEdge(c, b);
                            Node.addSimilarEdge(a, d);
                        }
                    }
                } catch (err) {
                    _iterator2.e(err);
                } finally {
                    _iterator2.f();
                }
                return this;
            }
        }, {
            key: "graph",
            value: function graph() {
                var height = this.height;
                var witdth = this.width;
            }
        }, {
            key: "nodes",
            value: /*#__PURE__*/_regeneratorRuntime().mark(function nodes() {
                var x, y, width, height, nodes;
                return _regeneratorRuntime().wrap(function nodes$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                width = this.width, height = this.height, nodes = this.nodes_old;
                                y = 0;
                            case 2:
                                if (!(y < height)) {
                                    _context3.next = 13;
                                    break;
                                }
                                x = 0;
                            case 4:
                                if (!(x < width)) {
                                    _context3.next = 10;
                                    break;
                                }
                                _context3.next = 7;
                                return nodes[y][x];
                            case 7:
                                ++x;
                                _context3.next = 4;
                                break;
                            case 10:
                                ++y;
                                _context3.next = 2;
                                break;
                            case 13:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, nodes, this);
            })
        }, {
            key: "diagonals",
            value: /*#__PURE__*/_regeneratorRuntime().mark(function diagonals() {
                var x, y, line0, line1, width, height, nodes, n0, n1, n2, n3;
                return _regeneratorRuntime().wrap(function diagonals$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                width = this.width, height = this.height, nodes = this.nodes_old;
                                y = 1;
                            case 2:
                                if (!(y < height)) {
                                    _context4.next = 22;
                                    break;
                                }
                                line0 = nodes[y - 1];
                                line1 = nodes[y];
                                x = 1;
                            case 6:
                                if (!(x < width)) {
                                    _context4.next = 19;
                                    break;
                                }
                                n0 = line0[x - 1];
                                n1 = line0[x];
                                n2 = line1[x - 1];
                                n3 = line1[x];
                                if (!(n0.canReach(n1) || n0.canReach(n2) || n3.canReach(n1) || n3.canReach(n2))) {
                                    _context4.next = 13;
                                    break;
                                }
                                return _context4.abrupt("continue", 16);
                            case 13:
                                if (!(n0.canReach(n3) && n1.canReach(n2))) {
                                    _context4.next = 16;
                                    break;
                                }
                                _context4.next = 16;
                                return [[n0, n3], [n2, n1]];
                            case 16:
                                ++x;
                                _context4.next = 6;
                                break;
                            case 19:
                                ++y;
                                _context4.next = 2;
                                break;
                            case 22:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, diagonals, this);
            })
        }, {
            key: "pixel",
            value: function pixel(x, y) {
                var i = y * this.width * 4 + x * 4;
                return new Color(this.pixels.subarray(i, i + 3));
            }
        }]);
        return Graph;
    }();
    Graph.diagonals = function diagonals(diags) {
        var p = diags[0][0].canReach(diags[0][1]);
        var q = diags[1][0].canReach(diags[1][1]);
        return p + q;
    };
    var createNeighborAccessor = function createNeighborAccessor(x, y) {
        var offsetX = x;
        var offsetY = y;
        return function (nodes, x, y) {
            return [nodes[y][x], nodes[y + offsetY][x + offsetX]];
        };
    };
    var down = createNeighborAccessor(0, 1);
    var right = createNeighborAccessor(1, 0);
    var slant = createNeighborAccessor(1, 1);
    var rise = createNeighborAccessor(1, -1);
    var neighbours = [down, right];
    function getSquare(nodes, x, y) {
        return [down(nodes, x, y), right(nodes, x, y), down(nodes, x + 1, y), right(nodes, x, y + 1)];
    }
    ;
    function getRect(nodes, x, y, w, h) {
        var rect = new Array(h);
        for (var i = 0; i < h; ++i) {
            rect[i] = nodes[i + y].slice(x, x + w);
        }
        return rect;
    }
    ;
    Graph.prototype.getDiagonals = function getDiagonals(x, y) {
        return [slant(this.nodes_old, x, y), rise(this.nodes_old, x, y + 1)];
    };
    var reach = function reach(args) {
        return args[0].canReach(args[1]);
    };
    var add = function add(args) {
        Node.addSimilarEdge(args[0], args[1]);
    };
    var id = function id(x) {
        return x;
    };
    var not = function not(x) {
        return !x;
    };
    var getConnected = function getConnected(xmin, xmax, ymin, ymax) {
        var x0 = xmin;
        var x1 = xmax;
        var y0 = ymin;
        var y1 = ymax;
        return function (nodes) {
            var nodes = nodes[0].edges.filter(function (x) {
                return x;
            });
            var connected = [];
            while (nodes.length > 0) {
                var node = nodes.pop();
                if (connected.indexOf(node) == -1) {
                    if (node.x > xmin && node.x < xmax && node.y > ymin && node.y < ymax) {
                        connected.push(node);
                        nodes = nodes.concat(node.edges.filter(function (x) {
                            return x;
                        }));
                    }
                }
            }
            return connected;
        };
    };
    Graph.prototype.linearize = function linearize() {
        for (var x = 1; x < this.width; ++x) {
            for (var y = 1; y < this.height; ++y) {
                var square = getSquare(this.nodes_old, x - 1, y - 1).map(reach);
                if (square.every(not)) {
                    var diagonals = this.getDiagonals(x - 1, y - 1);
                    var heuristics = [0, 0];
                    var connecteds = diagonals.map(getConnected(x - 3, x + 2, y - 3, y + 2));
                    var curves = diagonals.map(function (nodes) {
                        return Curve.curve(nodes[0], nodes[1]);
                    });
                    var lengthHeuristic = curves[0] - curves[1];
                    if (lengthHeuristic > 0) {
                        heuristics[0] += lengthHeuristic;
                    } else {
                        heuristics[1] -= lengthHeuristic;
                    }
                    var connectedHeuristic = connecteds[0].length - connecteds[1].length;
                    if (connectedHeuristic > 0) {
                        heuristics[1] += connectedHeuristic;
                    } else {
                        heuristics[0] -= connectedHeuristic;
                    }
                    var islands = diagonals.map(function (v) {
                        return v[0].valence() == 1 || v[1].valence() == 1;
                    });
                    if (islands[0] && !islands[1]) {
                        heuristics[0] += 5;
                    } else if (!islands[0] && islands[1]) {
                        heuristics[1] += 5;
                    }
                    if (heuristics[0] > heuristics[1]) {
                        Node.removeEdge(diagonals[1][0], diagonals[1][1]);
                    } else if (heuristics[0] < heuristics[1]) {
                        Node.removeEdge(diagonals[0][0], diagonals[0][1]);
                    } else {
                        Node.removeEdge(diagonals[0][0], diagonals[0][1]);
                        Node.removeEdge(diagonals[1][0], diagonals[1][1]);
                    }
                }
            }
        }
        return this;
    };
    var reshape = function reshape(rect) {
        var node = rect[0][1];
        if (node.edge(-1, 1)) {
            var vertices = node.vertices;
            var v1 = vertices[3];
            var v2 = v1.clone();
            if (!node.down()) {
                v1.adjust(0.25, 0.25);
            }
            if (!node.left()) {
                v2.adjust(-0.25, -0.25);
            }

            // This is important. We need to keep the order of
            // vertices somewhat similar to before reshaping.
            rect[0][0].vertices[2] = v2;
            vertices.splice(4, 0, v2);
            vertices = rect[1][0].vertices;
            v2 = vertices.splice(0, 1, v2).pop();
            vertices.push(v2);
        }
        if (node.edge(1, 1)) {
            var vertices = node.vertices;
            var v1 = vertices[2];
            var v2 = v1.clone();
            if (!node.down()) {
                v1.adjust(-0.25, 0.25);
            }
            if (!node.right()) {
                v2.adjust(0.25, -0.25);
            }

            // This is important. We need to keep the order of
            // vertices somewhat similar to before reshaping.
            rect[0][2].vertices[3] = v2;
            vertices.splice(2, 0, v2);
            vertices = rect[1][2].vertices;
            v2 = vertices.splice(0, 1, v2).pop();
            vertices.push(v2);
        }
    };
    Graph.prototype.createVoronoiDiagram = function createVoronoiDiagram() {
        var w = this.width - 2;
        var h = this.height - 1;
        var nodes = this.nodes_old;
        for (var y = 0; y < h; ++y) {
            var rect = getRect(nodes, 0, y, 2, 2);
            rect[0].unshift(new Node());
            rect[1].unshift(new Node());
            reshape(rect);
            for (var x = 0; x < w; ++x) {
                reshape(getRect(nodes, x, y, 3, 2));
            }
            rect = getRect(nodes, x, y, 2, 2);
            rect[0].push(new Node());
            rect[1].push(new Node());
            reshape(rect);
        }
        return this;
    };
    function connectVertices(vertices) {
        var l = vertices.length;
        vertices.forEach(function (e, i, a) {
            e.addEdge(a[(i + 1) % l]);
        });
        return vertices;
    }
    Graph.prototype.contour = function contour(startNode) {
        var UP = 0;
        var UP_RIGHT = 1;
        var RIGHT = 2;
        var DOWN_RIGHT = 3;
        var DOWN = 4;
        var DOWN_LEFT = 5;
        var LEFT = 6;
        var UP_LEFT = 7;
        var current = startNode;
        var vertices = [];
        var start;
        var next;
        var up, right, down, left;
        if (current.valence() === 0) {
            return current.vertices.slice();
        }
        if (current.marked || !current.isEdge() || [[-1, -1], [0, -1], [1, -1]].some(function (e) {
            return this.edge.apply(this, e) != undefined;
        }, current)) {
            return vertices;
        }
        var marked = [];
        var heading = UP_RIGHT;
        var vertex = 0;
        var currentVertex;
        var startVertex = current.vertices[0];
        var previous = null;
        while (true) {
            current.marked = true;
            marked.push(current);
            next = undefined;
            switch (heading) {
                case UP_RIGHT:
                    next = current.edge(1, -1);
                    if (next) {
                        heading = UP_LEFT;
                        break;
                    }
                case RIGHT:
                    next = current.edge(1, 0);
                    if (next) {
                        heading = UP;
                        break;
                    }
                case DOWN_RIGHT:
                    next = current.edge(1, 1);
                    if (next) {
                        heading = UP_RIGHT;
                        break;
                    }
                case DOWN:
                    next = current.edge(0, 1);
                    if (next) {
                        heading = RIGHT;
                        break;
                    }
                case DOWN_LEFT:
                    next = current.edge(-1, 1);
                    if (next) {
                        heading = DOWN_RIGHT;
                        break;
                    }
                case LEFT:
                    next = current.edge(-1, 0);
                    if (next) {
                        heading = DOWN;
                        break;
                    }
                case UP_LEFT:
                    next = current.edge(-1, -1);
                    if (next) {
                        heading = DOWN_LEFT;
                        break;
                    }
                case UP:
                    next = current.edge(0, -1);
                    if (next) {
                        heading = LEFT;
                    } else {
                        heading = UP_RIGHT;
                    }
                    break;
            }
            if (!next) {
                continue;
            }

            // add every vertex of current node from 'vertex' to the first common vertex in current node and next node
            var i = vertex,
                ilen = current.vertices.length;
            if (previous && next.equals(previous)) {
                currentVertex = current.vertices[i++ % ilen];
                vertices.push(currentVertex);
            }
            while (true) {
                currentVertex = current.vertices[i++ % ilen];
                var j = next.vertices.indexOf(currentVertex);
                if (j != -1) {
                    vertex = j;
                    break;
                }
                vertices.push(currentVertex);
            }
            if (startNode.equals(next) && startNode.edges.filter(function (x) {
                return x;
            }).every(function (e) {
                return e.marked || !e.isEdge();
            })) {
                i = vertex;
                ilen = next.vertices.length;
                while (i < ilen) {
                    currentVertex = next.vertices[i++];
                    vertices.push(currentVertex);
                }
                break;
            }
            previous = current;
            current = next;
        }
        while (marked.length != 0) {
            var mark = marked.pop();
            var unmarkedNeighbors = mark.edges.filter(function (e) {
                return e && !e.marked;
            });
            unmarkedNeighbors.forEach(function (e) {
                e.marked = true;
            });
            marked.push.apply(marked, unmarkedNeighbors);
        }
        return vertices;
    };
    function Path() {
        this.vertices = [];
    }
    ;
    Path.prototype = Object.create(null, {
        push: {
            enumerable: false,
            value: function push(v) {
                this.vertices.push(v);
                // v.addPath(this);
            }
        },

        splitAt: {
            enumerable: false,
            value: function splitAt(i) {
                var p = new Path();
                p.vertices = this.vertices.slice(i);
                this.vertices.length = i + 1;
                p.vertices.forEach(function (v) {
                    // v.removePath(this);
                    // v.addPath(p);
                });
            }
        }
    });
    Graph.prototype.paths = function paths(contour) {
        var p = new Path();
    };
    return function depixel(data, width, height) {
        var graph = new Graph(data, width, height);
        //  graph.createSimilarityGraph();
        return graph;
    };
}();

function drawCanvas(graph, scale, reshaped, similar) {

    var width = graph.width;
    var height = graph.height;
    var nodes = graph.nodes;
    var canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    var context = canvas.getContext('2d');
    context.strokeStyle = "black";

    for (let node of graph.nodes()) {
        var stroke_color = 'rgba(255,75,75,255)';
        context.strokeStyle = "" + stroke_color;
        context.fillStyle = "" + node.color;
        var vertices = node.vertices;
        context.beginPath();
        var v = vertices[0];
        context.moveTo(v.x * scale, v.y * scale);
        for (var i = 1; i < vertices.length; ++i) {
            v = vertices[i];
            context.lineTo(v.x * scale, v.y * scale);
        }
        context.closePath();
        context.fill();
        if (reshaped) {
            context.stroke();
        }
        var half_scale = scale / 2;
        stroke_color = 'rgba(0,200,0,255)';
        context.strokeStyle = "" + stroke_color;
        context.beginPath();
        var x = node.x * scale + half_scale;
        var y = node.y * scale + half_scale;

        for (let n of node.edges.filter(x => x)) {
            context.moveTo(x, y);
            context.lineTo(n.x * scale + half_scale, n.y * scale + half_scale);
        }
        context.closePath();
        if (similar) {
            context.stroke();
        }
    }

    return context;
}
function drawSVG(graph, scale) {


    var width = graph.width;
    var height = graph.height;
    var nodes = graph.nodes;
    var paths = [];

    for (let node of graph.nodes()) {

        var lines = "L";
        var vertices = node.vertices;
        var v = vertices[0];
        for (var i = 0; i < vertices.length; ++i) {
            v = vertices[i];
            lines += `${Math.round(v.x * scale)},${Math.round(v.y * scale)} `;
        }

        paths.push(`<path stroke="${node.color}" fill="${node.color}" d="M${Math.round(vertices[0].x * scale)},${Math.round(vertices[0].y * scale)} ${lines}Z"/>`)
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" stroke-width="8" viewBox="0 0 ${width*scale} ${height*scale}">${paths.join("\n\t")}</svg>`;
}

function createEmptyCanvas(graph, scale) {
    var width = graph.width;
    var height = graph.height;
    var canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;

    return canvas;
}

function drawContour(canvas, vertices, color, scale) {
    var context = canvas.getContext('2d');
    context.strokeStyle = "black";

    var stroke_color = 'rgba(255,75,75,255)';
    context.lineWidth = 2;
    context.strokeStyle = "" + stroke_color;
    context.fillStyle = "" + color;
    context.beginPath();
    var v = vertices[0];
    context.moveTo(v.x * scale, v.y * scale);
    for (var i = 1; i < vertices.length; ++i) {
        v = vertices[i];
        context.lineTo(v.x * scale, v.y * scale);
    }
    context.closePath();
    context.fill();

    return canvas;
}

const fu = function (image_data, compute_svg_string = false) {
    var scale = 10;
    var graph = depixel(image_data.data, image_data.width, image_data.height);
    graph.createSimilarityGraph();
    graph.createVoronoiDiagram();
    var image_data = drawCanvas(graph, scale, false, false).getImageData(0, 0, image_data.width*scale, image_data.height*scale);
    var svg_string = compute_svg_string ? drawSVG(graph, 20): null;

    return Array.of(image_data, svg_string);
}

export default fu;

