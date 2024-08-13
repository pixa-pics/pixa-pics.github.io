var t,
    e,
    r = {
        exports: {}
    };
(t = r),
    ((e = (function () {
        function t(t, r, i) {
            for (
                var o = (function (t, r) {
                        function i() {
                            var t = {},
                                e = 0,
                                r = {
                                    add: function (i) {
                                        if (r.contains(i)) throw "dup key:" + i;
                                        (t[i] = e), (e += 1);
                                    },
                                    size: function () {
                                        return e;
                                    },
                                    indexOf: function (e) {
                                        return t[e];
                                    },
                                    contains: function (e) {
                                        return void 0 !== t[e];
                                    }
                                };
                            return r;
                        }
                        function o(t) {
                            var e = 0,
                                r = 0;
                            return {
                                write: function (i, o) {
                                    if (0 != i >>> o) throw "length over";
                                    for (; 8 <= e + o; )
                                        t.writeByte(255 & ((i << e) | r)),
                                            (o -= 8 - e),
                                            (i >>>= 8 - e),
                                            (e = r = 0);
                                    (r |= i << e), (e += o);
                                },
                                flush: function () {
                                    0 < e && t.writeByte(r);
                                }
                            };
                        }
                        var n = Array(t * r);
                        return {
                            setPixel: function (e, r, i) {
                                n[r * t + e] = i;
                            },
                            write: function (s) {
                                s.writeString("GIF87a"),
                                    s.writeShort(t),
                                    s.writeShort(r),
                                    s.writeByte(128),
                                    s.writeByte(0),
                                    s.writeByte(0),
                                    s.writeByte(0),
                                    s.writeByte(0),
                                    s.writeByte(0),
                                    s.writeByte(255),
                                    s.writeByte(255),
                                    s.writeByte(255),
                                    s.writeString(","),
                                    s.writeShort(0),
                                    s.writeShort(0),
                                    s.writeShort(t),
                                    s.writeShort(r),
                                    s.writeByte(0);
                                for (var a = 3, h = i(), u = 0; 4 > u; u += 1)
                                    h.add(String.fromCharCode(u));
                                h.add(String.fromCharCode(4)), h.add(String.fromCharCode(5));
                                var d = o((u = e()));
                                d.write(4, a);
                                var l = 0,
                                    c = String.fromCharCode(n[l]);
                                for (l += 1; l < n.length; ) {
                                    var g = String.fromCharCode(n[l]);
                                    (l += 1),
                                        h.contains(c + g)
                                            ? (c += g)
                                            : (d.write(h.indexOf(c), a),
                                            4095 > h.size() &&
                                            (h.size() == 1 << a && (a += 1), h.add(c + g)),
                                                (c = g));
                                }
                                for (
                                    d.write(h.indexOf(c), a),
                                        d.write(5, a),
                                        d.flush(),
                                        a = u.toByteArray(),
                                        s.writeByte(2),
                                        h = 0;
                                    255 < a.length - h;

                                )
                                    s.writeByte(255), s.writeBytes(a, h, 255), (h += 255);
                                s.writeByte(a.length - h),
                                    s.writeBytes(a, h, a.length - h),
                                    s.writeByte(0),
                                    s.writeString(";");
                            }
                        };
                    })(t, r),
                    n = 0;
                n < r;
                n += 1
            )
                for (var s = 0; s < t; s += 1) o.setPixel(s, n, i(s, n));
            for (
                t = e(),
                    o.write(t),
                    o = (function () {
                        function t(t) {
                            if (!(0 > t)) {
                                if (26 > t) return 65 + t;
                                if (52 > t) return t - 26 + 97;
                                if (62 > t) return t - 52 + 48;
                                if (62 == t) return 43;
                                if (63 == t) return 47;
                            }
                            throw "n:" + t;
                        }
                        var e = 0,
                            r = 0,
                            i = 0,
                            o = "",
                            n = {
                                writeByte: function (n) {
                                    for (e = (e << 8) | (255 & n), r += 8, i += 1; 6 <= r; )
                                        (o += String.fromCharCode(t((e >>> (r - 6)) & 63))),
                                            (r -= 6);
                                },
                                flush: function () {
                                    if (
                                        (0 < r &&
                                        ((o += String.fromCharCode(t((e << (6 - r)) & 63))),
                                            (r = e = 0)),
                                        0 != i % 3)
                                    )
                                        for (var n = 3 - (i % 3), s = 0; s < n; s += 1) o += "=";
                                },
                                toString: function () {
                                    return o;
                                }
                            };
                        return n;
                    })(),
                    t = t.toByteArray(),
                    r = 0;
                r < t.length;
                r += 1
            )
                o.writeByte(t[r]);
            return o.flush(), "data:image/gif;base64," + o;
        }
        function e() {
            var t = [],
                e = {
                    writeByte: function (e) {
                        t.push(255 & e);
                    },
                    writeShort: function (t) {
                        e.writeByte(t), e.writeByte(t >>> 8);
                    },
                    writeBytes: function (t, r, i) {
                        (r = r || 0), (i = i || t.length);
                        for (var o = 0; o < i; o += 1) e.writeByte(t[o + r]);
                    },
                    writeString: function (t) {
                        for (var r = 0; r < t.length; r += 1) e.writeByte(t.charCodeAt(r));
                    },
                    toByteArray: function () {
                        return t;
                    },
                    toString: function () {
                        for (var e = "[", r = 0; r < t.length; r += 1)
                            0 < r && (e += ","), (e += t[r]);
                        return e + "]";
                    }
                };
            return e;
        }
        function r() {
            var t = [],
                e = 0,
                r = {
                    getBuffer: function () {
                        return t;
                    },
                    getAt: function (e) {
                        return 1 == ((t[Math.floor(e / 8)] >>> (7 - (e % 8))) & 1);
                    },
                    put: function (t, e) {
                        for (var i = 0; i < e; i += 1)
                            r.putBit(1 == ((t >>> (e - i - 1)) & 1));
                    },
                    getLengthInBits: function () {
                        return e;
                    },
                    putBit: function (r) {
                        var i = Math.floor(e / 8);
                        t.length <= i && t.push(0), r && (t[i] |= 128 >>> e % 8), (e += 1);
                    }
                };
            return r;
        }
        function i(e, n) {
            function h(t) {
                for (var e = "", r = 0; r < t.length; r += 1) {
                    var i = t.charAt(r);
                    switch (i) {
                        case "<":
                            e += "&lt;";
                            break;
                        case ">":
                            e += "&gt;";
                            break;
                        case "&":
                            e += "&amp;";
                            break;
                        case '"':
                            e += "&quot;";
                            break;
                        default:
                            e += i;
                    }
                }
                return e;
            }
            function d(t, e) {
                for (var r = -1; 7 >= r; r += 1)
                    if (!(-1 >= t + r || p <= t + r))
                        for (var i = -1; 7 >= i; i += 1)
                            -1 >= e + i ||
                            p <= e + i ||
                            (f[t + r][e + i] =
                                (0 <= r && 6 >= r && (0 == i || 6 == i)) ||
                                (0 <= i && 6 >= i && (0 == r || 6 == r)) ||
                                (2 <= r && 4 >= r && 2 <= i && 4 >= i));
            }
            function l(t, e) {
                for (var i = (p = 4 * c + 17), n = Array(i), s = 0; s < i; s += 1) {
                    n[s] = Array(i);
                    for (var h = 0; h < i; h += 1) n[s][h] = null;
                }
                for (
                    f = n,
                        d(0, 0),
                        d(p - 7, 0),
                        d(0, p - 7),
                        i = a.getPatternPosition(c),
                        n = 0;
                    n < i.length;
                    n += 1
                )
                    for (s = 0; s < i.length; s += 1) {
                        h = i[n];
                        var l = i[s];
                        if (null == f[h][l])
                            for (var y = -2; 2 >= y; y += 1)
                                for (var b = -2; 2 >= b; b += 1)
                                    f[h + y][l + b] =
                                        -2 == y ||
                                        2 == y ||
                                        -2 == b ||
                                        2 == b ||
                                        (0 == y && 0 == b);
                    }
                for (i = 8; i < p - 8; i += 1)
                    null == f[i][6] && (f[i][6] = 0 == i % 2);
                for (i = 8; i < p - 8; i += 1)
                    null == f[6][i] && (f[6][i] = 0 == i % 2);
                for (i = a.getBCHTypeInfo((g << 3) | e), n = 0; 15 > n; n += 1)
                    (s = !t && 1 == ((i >> n) & 1)),
                        6 > n
                            ? (f[n][8] = s)
                            : 8 > n
                                ? (f[n + 1][8] = s)
                                : (f[p - 15 + n][8] = s);
                for (n = 0; 15 > n; n += 1)
                    (s = !t && 1 == ((i >> n) & 1)),
                        8 > n
                            ? (f[8][p - n - 1] = s)
                            : 9 > n
                                ? (f[8][15 - n - 1 + 1] = s)
                                : (f[8][15 - n - 1] = s);
                if (((f[p - 8][8] = !t), 7 <= c)) {
                    for (i = a.getBCHTypeNumber(c), n = 0; 18 > n; n += 1)
                        (s = !t && 1 == ((i >> n) & 1)),
                            (f[Math.floor(n / 3)][(n % 3) + p - 8 - 3] = s);
                    for (n = 0; 18 > n; n += 1)
                        (s = !t && 1 == ((i >> n) & 1)),
                            (f[(n % 3) + p - 8 - 3][Math.floor(n / 3)] = s);
                }
                if (null == w) {
                    for (
                        s = c, t = u.getRSBlocks(s, g), i = r(), n = 0;
                        n < m.length;
                        n += 1
                    )
                        (h = m[n]),
                            i.put(h.getMode(), 4),
                            i.put(h.getLength(), a.getLengthInBits(h.getMode(), s)),
                            h.write(i);
                    for (n = s = 0; n < t.length; n += 1) s += t[n].dataCount;
                    if (i.getLengthInBits() > 8 * s)
                        throw (
                            "code length overflow. (" +
                            i.getLengthInBits() +
                            ">" +
                            8 * s +
                            ")"
                        );
                    for (
                        i.getLengthInBits() + 4 <= 8 * s && i.put(0, 4);
                        0 != i.getLengthInBits() % 8;

                    )
                        i.putBit(!1);
                    for (
                        ;
                        !(
                            i.getLengthInBits() >= 8 * s ||
                            (i.put(236, 8), i.getLengthInBits() >= 8 * s)
                        );

                    )
                        i.put(17, 8);
                    var v = 0;
                    for (
                        s = n = 0, h = Array(t.length), l = Array(t.length), y = 0;
                        y < t.length;
                        y += 1
                    ) {
                        var $ = t[y].dataCount,
                            x = t[y].totalCount - $;
                        for (
                            n = Math.max(n, $), s = Math.max(s, x), h[y] = Array($), b = 0;
                            b < h[y].length;
                            b += 1
                        )
                            h[y][b] = 255 & i.getBuffer()[b + v];
                        for (
                            v += $,
                                b = a.getErrorCorrectPolynomial(x),
                                $ = o(h[y], b.getLength() - 1).mod(b),
                                l[y] = Array(b.getLength() - 1),
                                b = 0;
                            b < l[y].length;
                            b += 1
                        )
                            (x = b + $.getLength() - l[y].length),
                                (l[y][b] = 0 <= x ? $.getAt(x) : 0);
                    }
                    for (b = i = 0; b < t.length; b += 1) i += t[b].totalCount;
                    for (i = Array(i), b = v = 0; b < n; b += 1)
                        for (y = 0; y < t.length; y += 1)
                            b < h[y].length && ((i[v] = h[y][b]), (v += 1));
                    for (b = 0; b < s; b += 1)
                        for (y = 0; y < t.length; y += 1)
                            b < l[y].length && ((i[v] = l[y][b]), (v += 1));
                    w = i;
                }
                for (
                    t = w,
                        i = -1,
                        n = p - 1,
                        s = 7,
                        h = 0,
                        e = a.getMaskFunction(e),
                        l = p - 1;
                    0 < l;
                    l -= 2
                )
                    for (6 == l && --l; ; ) {
                        for (y = 0; 2 > y; y += 1)
                            null == f[n][l - y] &&
                            ((b = !1),
                            h < t.length && (b = 1 == ((t[h] >>> s) & 1)),
                            e(n, l - y) && (b = !b),
                                (f[n][l - y] = b),
                            -1 == --s && ((h += 1), (s = 7)));
                        if (0 > (n += i) || p <= n) {
                            (n -= i), (i = -i);
                            break;
                        }
                    }
            }
            var c = e,
                g = s[n],
                f = null,
                p = 0,
                w = null,
                m = [],
                y = {
                    addData: function (t, e) {
                        switch ((e = e || "Byte")) {
                            case "Numeric":
                                t = (function (t) {
                                    function e(t) {
                                        for (var e = 0, r = 0; r < t.length; r += 1) {
                                            e *= 10;
                                            var i = t.charAt(r);
                                            if (!("0" <= i && "9" >= i)) throw "illegal char :" + i;
                                            e += i = i.charCodeAt(0) - 48;
                                        }
                                        return e;
                                    }
                                    return {
                                        getMode: function () {
                                            return 1;
                                        },
                                        getLength: function () {
                                            return t.length;
                                        },
                                        write: function (r) {
                                            for (var i = 0; i + 2 < t.length; )
                                                r.put(e(t.substring(i, i + 3)), 10), (i += 3);
                                            i < t.length &&
                                            (1 == t.length - i
                                                ? r.put(e(t.substring(i, i + 1)), 4)
                                                : 2 == t.length - i &&
                                                r.put(e(t.substring(i, i + 2)), 7));
                                        }
                                    };
                                })(t);
                                break;
                            case "Alphanumeric":
                                t = (function (t) {
                                    function e(t) {
                                        if ("0" <= t && "9" >= t) return t.charCodeAt(0) - 48;
                                        if ("A" <= t && "Z" >= t) return t.charCodeAt(0) - 65 + 10;
                                        switch (t) {
                                            case " ":
                                                return 36;
                                            case "$":
                                                return 37;
                                            case "%":
                                                return 38;
                                            case "*":
                                                return 39;
                                            case "+":
                                                return 40;
                                            case "-":
                                                return 41;
                                            case ".":
                                                return 42;
                                            case "/":
                                                return 43;
                                            case ":":
                                                return 44;
                                            default:
                                                throw "illegal char :" + t;
                                        }
                                    }
                                    return {
                                        getMode: function () {
                                            return 2;
                                        },
                                        getLength: function () {
                                            return t.length;
                                        },
                                        write: function (r) {
                                            for (var i = 0; i + 1 < t.length; )
                                                r.put(45 * e(t.charAt(i)) + e(t.charAt(i + 1)), 11),
                                                    (i += 2);
                                            i < t.length && r.put(e(t.charAt(i)), 6);
                                        }
                                    };
                                })(t);
                                break;
                            case "Byte":
                                t = (function (t) {
                                    var e = i.stringToBytes(t);
                                    return {
                                        getMode: function () {
                                            return 4;
                                        },
                                        getLength: function () {
                                            return e.length;
                                        },
                                        write: function (t) {
                                            for (var r = 0; r < e.length; r += 1) t.put(e[r], 8);
                                        }
                                    };
                                })(t);
                                break;
                            case "Kanji":
                                t = (function (t) {
                                    var e = i.stringToBytesFuncs.SJIS;
                                    if (!e) throw "sjis not supported.";
                                    !(function (t) {
                                        if (2 != (t = e(t)).length || 38726 != ((t[0] << 8) | t[1]))
                                            throw "sjis not supported.";
                                    })("友");
                                    var r = e(t);
                                    return {
                                        getMode: function () {
                                            return 8;
                                        },
                                        getLength: function () {
                                            return ~~(r.length / 2);
                                        },
                                        write: function (t) {
                                            for (var e = 0; e + 1 < r.length; ) {
                                                var i = ((255 & r[e]) << 8) | (255 & r[e + 1]);
                                                if (33088 <= i && 40956 >= i) i -= 33088;
                                                else {
                                                    if (!(57408 <= i && 60351 >= i))
                                                        throw "illegal char at " + (e + 1) + "/" + i;
                                                    i -= 49472;
                                                }
                                                (i = 192 * ((i >>> 8) & 255) + (255 & i)),
                                                    t.put(i, 13),
                                                    (e += 2);
                                            }
                                            if (e < r.length) throw "illegal char at " + (e + 1);
                                        }
                                    };
                                })(t);
                                break;
                            default:
                                throw "mode:" + e;
                        }
                        m.push(t), (w = null);
                    },
                    isDark: function (t, e) {
                        if (0 > t || p <= t || 0 > e || p <= e) throw t + "," + e;
                        return f[t][e];
                    },
                    getModuleCount: function () {
                        return p;
                    },
                    make: function () {
                        if (1 > c) {
                            for (var t = 1; 40 > t; t++) {
                                for (
                                    var e = u.getRSBlocks(t, g), i = r(), o = 0;
                                    o < m.length;
                                    o++
                                ) {
                                    var n = m[o];
                                    i.put(n.getMode(), 4),
                                        i.put(n.getLength(), a.getLengthInBits(n.getMode(), t)),
                                        n.write(i);
                                }
                                for (o = n = 0; o < e.length; o++) n += e[o].dataCount;
                                if (i.getLengthInBits() <= 8 * n) break;
                            }
                            c = t;
                        }
                        for (i = e = t = 0; 8 > i; i += 1)
                            l(!0, i),
                                (o = a.getLostPoint(y)),
                            (0 == i || t > o) && ((t = o), (e = i));
                        l(!1, e);
                    },
                    createTableTag: function (t, e) {
                        (t = t || 2),
                            (e =
                                '<table style=" border-width: 0px; border-style: none; border-collapse: collapse; padding: 0px; margin: ' +
                                (void 0 === e ? 4 * t : e) +
                                'px;"><tbody>');
                        for (var r = 0; r < y.getModuleCount(); r += 1) {
                            e += "<tr>";
                            for (var i = 0; i < y.getModuleCount(); i += 1)
                                (e += '<td style="'),
                                    (e += " border-width: 0px; border-style: none;"),
                                    (e += " border-collapse: collapse;"),
                                    (e += " padding: 0px; margin: 0px;"),
                                    (e += " width: " + t + "px;"),
                                    (e += " height: " + t + "px;"),
                                    (e += " background-color: "),
                                    (e += y.isDark(r, i) ? "#000000" : "#ffffff"),
                                    (e += ";"),
                                    (e += '"/>');
                            e += "</tr>";
                        }
                        return e + "</tbody></table>";
                    },
                    createSvgTag: function (t, e, r, i) {
                        var o = {};
                        "object" == typeof t &&
                        ((t = (o = t).cellSize),
                            (e = o.margin),
                            (r = o.alt),
                            (i = o.title)),
                            (t = t || 2),
                            (e = void 0 === e ? 4 * t : e),
                            ((r =
                                "string" == typeof r
                                    ? {
                                        text: r
                                    }
                                    : r || {}).text = r.text || null),
                            (r.id = r.text ? r.id || "qrcode-description" : null),
                            ((i =
                                "string" == typeof i
                                    ? {
                                        text: i
                                    }
                                    : i || {}).text = i.text || null),
                            (i.id = i.text ? i.id || "qrcode-title" : null);
                        var n = y.getModuleCount() * t + 2 * e,
                            s = "l" + t + ",0 0," + t + " -" + t + ",0 0,-" + t + "z ";
                        for (
                            o =
                                (o =
                                    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"' +
                                    (o.scalable
                                        ? ""
                                        : ' width="' + n + 'px" height="' + n + 'px"')) +
                                ' viewBox="0 0 ' +
                                n +
                                " " +
                                n +
                                '"  preserveAspectRatio="xMinYMin meet"' +
                                (i.text || r.text
                                    ? ' role="img" aria-labelledby="' +
                                    h([i.id, r.id].join(" ").trim()) +
                                    '"'
                                    : ""),
                                o += ">",
                                o += i.text
                                    ? '<title id="' + h(i.id) + '">' + h(i.text) + "</title>"
                                    : "",
                                o += r.text
                                    ? '<description id="' +
                                    h(r.id) +
                                    '">' +
                                    h(r.text) +
                                    "</description>"
                                    : "",
                                o +=
                                    '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',
                                o += '<path d="',
                                n = 0;
                            n < y.getModuleCount();
                            n += 1
                        ) {
                            var a = n * t + e;
                            for (r = 0; r < y.getModuleCount(); r += 1)
                                y.isDark(n, r) && (o += "M" + (i = r * t + e) + "," + a + s);
                        }
                        return (o += '" stroke="transparent" fill="black"/>') + "</svg>";
                    },
                    createDataURL: function (e, r) {
                        (e = e || 2), (r = void 0 === r ? 4 * e : r);
                        var i = y.getModuleCount() * e + 2 * r,
                            o = r,
                            n = i - r;
                        return t(i, i, function (t, r) {
                            return o <= t &&
                            t < n &&
                            o <= r &&
                            r < n &&
                            y.isDark(Math.floor((r - o) / e), Math.floor((t - o) / e))
                                ? 0
                                : 1;
                        });
                    },
                    createImgTag: function (t, e, r) {
                        (t = t || 2), (e = void 0 === e ? 4 * t : e);
                        var i = y.getModuleCount() * t + 2 * e;
                        return (
                            (t =
                                (t =
                                    (t = '<img src="' + y.createDataURL(t, e)) +
                                    '" width="' +
                                    i +
                                    '" height="') +
                                i +
                                '"'),
                            r && ((t += ' alt="'), (t += h(r)), (t += '"')),
                            t + "/>"
                        );
                    },
                    createASCII: function (t, e) {
                        if (2 > (t = t || 1)) {
                            t = void 0 === (t = e) ? 2 : t;
                            var r = 1 * y.getModuleCount() + 2 * t,
                                i = t;
                            e = r - t;
                            var o,
                                n,
                                s = {
                                    "██": "█",
                                    "█ ": "▀",
                                    " █": "▄",
                                    "  ": " "
                                },
                                a = {
                                    "██": "▀",
                                    "█ ": "▀",
                                    " █": " ",
                                    "  ": " "
                                },
                                h = "";
                            for (o = 0; o < r; o += 2) {
                                var u = Math.floor(o - i),
                                    d = Math.floor(o + 1 - i);
                                for (n = 0; n < r; n += 1) {
                                    var l = "█";
                                    i <= n &&
                                    n < e &&
                                    i <= o &&
                                    o < e &&
                                    y.isDark(u, Math.floor(n - i)) &&
                                    (l = " "),
                                        (l =
                                            i <= n &&
                                            n < e &&
                                            i <= o + 1 &&
                                            o + 1 < e &&
                                            y.isDark(d, Math.floor(n - i))
                                                ? l + " "
                                                : l + "█"),
                                        (h += 1 > t && o + 1 >= e ? a[l] : s[l]);
                                }
                                h += "\n";
                            }
                            return (t =
                                r % 2 && 0 < t
                                    ? h.substring(0, h.length - r - 1) + Array(r + 1).join("▀")
                                    : h.substring(0, h.length - 1));
                        }
                        for (
                            --t,
                                i = e = void 0 === e ? 2 * t : e,
                                e = (r = y.getModuleCount() * t + 2 * e) - e,
                                l = Array(t + 1).join("██"),
                                s = Array(t + 1).join("  "),
                                a = "",
                                o = 0;
                            o < r;
                            o += 1
                        ) {
                            for (u = Math.floor((o - i) / t), h = "", n = 0; n < r; n += 1)
                                (d = 1),
                                i <= n &&
                                n < e &&
                                i <= o &&
                                o < e &&
                                y.isDark(u, Math.floor((n - i) / t)) &&
                                (d = 0),
                                    (h += d ? l : s);
                            for (u = 0; u < t; u += 1) a += h + "\n";
                        }
                        return a.substring(0, a.length - 1);
                    },
                    renderTo2dContext: function (t, e) {
                        e = e || 2;
                        for (var r = y.getModuleCount(), i = 0; i < r; i++)
                            for (var o = 0; o < r; o++)
                                (t.fillStyle = y.isDark(i, o) ? "black" : "white"),
                                    t.fillRect(i * e, o * e, e, e);
                    }
                };
            return y;
        }
        function o(t, e) {
            if (void 0 === t.length) throw t.length + "/" + e;
            var r = (function () {
                    for (var r = 0; r < t.length && 0 == t[r]; ) r += 1;
                    for (var i = Array(t.length - r + e), o = 0; o < t.length - r; o += 1)
                        i[o] = t[o + r];
                    return i;
                })(),
                i = {
                    getAt: function (t) {
                        return r[t];
                    },
                    getLength: function () {
                        return r.length;
                    },
                    multiply: function (t) {
                        for (
                            var e = Array(i.getLength() + t.getLength() - 1), r = 0;
                            r < i.getLength();
                            r += 1
                        )
                            for (var n = 0; n < t.getLength(); n += 1)
                                e[r + n] ^= h.gexp(h.glog(i.getAt(r)) + h.glog(t.getAt(n)));
                        return o(e, 0);
                    },
                    mod: function (t) {
                        if (0 > i.getLength() - t.getLength()) return i;
                        for (
                            var e = h.glog(i.getAt(0)) - h.glog(t.getAt(0)),
                                r = Array(i.getLength()),
                                n = 0;
                            n < i.getLength();
                            n += 1
                        )
                            r[n] = i.getAt(n);
                        for (n = 0; n < t.getLength(); n += 1)
                            r[n] ^= h.gexp(h.glog(t.getAt(n)) + e);
                        return o(r, 0).mod(t);
                    }
                };
            return i;
        }
        (i.stringToBytesFuncs = {
            default: function (t) {
                for (var e = [], r = 0; r < t.length; r += 1) {
                    var i = t.charCodeAt(r);
                    e.push(255 & i);
                }
                return e;
            }
        }),
            (i.stringToBytes = i.stringToBytesFuncs.default),
            (i.createStringToBytes = function (t, e) {
                var r = (function () {
                    function r() {
                        var t = i.read();
                        if (-1 == t) throw "eof";
                        return t;
                    }
                    for (
                        var i = (function (t) {
                                function e(t) {
                                    if (65 <= t && 90 >= t) return t - 65;
                                    if (97 <= t && 122 >= t) return t - 97 + 26;
                                    if (48 <= t && 57 >= t) return t - 48 + 52;
                                    if (43 == t) return 62;
                                    if (47 == t) return 63;
                                    throw "c:" + t;
                                }
                                var r = 0,
                                    i = 0,
                                    o = 0;
                                return {
                                    read: function () {
                                        for (; 8 > o; ) {
                                            if (r >= t.length) {
                                                if (0 == o) return -1;
                                                throw "unexpected end of file./" + o;
                                            }
                                            var n = t.charAt(r);
                                            if (((r += 1), "=" == n)) return (o = 0), -1;
                                            n.match(/^\s$/) ||
                                            ((i = (i << 6) | e(n.charCodeAt(0))), (o += 6));
                                        }
                                        return (n = (i >>> (o - 8)) & 255), (o -= 8), n;
                                    }
                                };
                            })(t),
                            o = 0,
                            n = {};
                        ;

                    ) {
                        var s = i.read();
                        if (-1 == s) break;
                        var a = r(),
                            h = r(),
                            u = r();
                        (n[(s = String.fromCharCode((s << 8) | a))] = (h << 8) | u),
                            (o += 1);
                    }
                    if (o != e) throw o + " != " + e;
                    return n;
                })();
                return function (t) {
                    for (var e = [], i = 0; i < t.length; i += 1) {
                        var o = t.charCodeAt(i);
                        128 > o
                            ? e.push(o)
                            : "number" == typeof (o = r[t.charAt(i)])
                                ? (255 & o) == o
                                    ? e.push(o)
                                    : (e.push(o >>> 8), e.push(255 & o))
                                : e.push(63);
                    }
                    return e;
                };
            });
        var n,
            s = {
                L: 1,
                M: 0,
                Q: 3,
                H: 2
            },
            a = (function () {
                function t(t) {
                    for (var e = 0; 0 != t; ) (e += 1), (t >>>= 1);
                    return e;
                }
                var e = [
                    [],
                    [6, 18],
                    [6, 22],
                    [6, 26],
                    [6, 30],
                    [6, 34],
                    [6, 22, 38],
                    [6, 24, 42],
                    [6, 26, 46],
                    [6, 28, 50],
                    [6, 30, 54],
                    [6, 32, 58],
                    [6, 34, 62],
                    [6, 26, 46, 66],
                    [6, 26, 48, 70],
                    [6, 26, 50, 74],
                    [6, 30, 54, 78],
                    [6, 30, 56, 82],
                    [6, 30, 58, 86],
                    [6, 34, 62, 90],
                    [6, 28, 50, 72, 94],
                    [6, 26, 50, 74, 98],
                    [6, 30, 54, 78, 102],
                    [6, 28, 54, 80, 106],
                    [6, 32, 58, 84, 110],
                    [6, 30, 58, 86, 114],
                    [6, 34, 62, 90, 118],
                    [6, 26, 50, 74, 98, 122],
                    [6, 30, 54, 78, 102, 126],
                    [6, 26, 52, 78, 104, 130],
                    [6, 30, 56, 82, 108, 134],
                    [6, 34, 60, 86, 112, 138],
                    [6, 30, 58, 86, 114, 142],
                    [6, 34, 62, 90, 118, 146],
                    [6, 30, 54, 78, 102, 126, 150],
                    [6, 24, 50, 76, 102, 128, 154],
                    [6, 28, 54, 80, 106, 132, 158],
                    [6, 32, 58, 84, 110, 136, 162],
                    [6, 26, 54, 82, 110, 138, 166],
                    [6, 30, 58, 86, 114, 142, 170]
                ];
                return {
                    getBCHTypeInfo: function (e) {
                        for (var r = e << 10; 0 <= t(r) - t(1335); )
                            r ^= 1335 << (t(r) - t(1335));
                        return 21522 ^ ((e << 10) | r);
                    },
                    getBCHTypeNumber: function (e) {
                        for (var r = e << 12; 0 <= t(r) - t(7973); )
                            r ^= 7973 << (t(r) - t(7973));
                        return (e << 12) | r;
                    },
                    getPatternPosition: function (t) {
                        return e[t - 1];
                    },
                    getMaskFunction: function (t) {
                        switch (t) {
                            case 0:
                                return function (t, e) {
                                    return 0 == (t + e) % 2;
                                };
                            case 1:
                                return function (t) {
                                    return 0 == t % 2;
                                };
                            case 2:
                                return function (t, e) {
                                    return 0 == e % 3;
                                };
                            case 3:
                                return function (t, e) {
                                    return 0 == (t + e) % 3;
                                };
                            case 4:
                                return function (t, e) {
                                    return 0 == (Math.floor(t / 2) + Math.floor(e / 3)) % 2;
                                };
                            case 5:
                                return function (t, e) {
                                    return 0 == ((t * e) % 2) + ((t * e) % 3);
                                };
                            case 6:
                                return function (t, e) {
                                    return 0 == (((t * e) % 2) + ((t * e) % 3)) % 2;
                                };
                            case 7:
                                return function (t, e) {
                                    return 0 == (((t * e) % 3) + ((t + e) % 2)) % 2;
                                };
                            default:
                                throw "bad maskPattern:" + t;
                        }
                    },
                    getErrorCorrectPolynomial: function (t) {
                        for (var e = o([1], 0), r = 0; r < t; r += 1)
                            e = e.multiply(o([1, h.gexp(r)], 0));
                        return e;
                    },
                    getLengthInBits: function (t, e) {
                        if (1 <= e && 10 > e)
                            switch (t) {
                                case 1:
                                    return 10;
                                case 2:
                                    return 9;
                                case 4:
                                case 8:
                                    return 8;
                                default:
                                    throw "mode:" + t;
                            }
                        else if (27 > e)
                            switch (t) {
                                case 1:
                                    return 12;
                                case 2:
                                    return 11;
                                case 4:
                                    return 16;
                                case 8:
                                    return 10;
                                default:
                                    throw "mode:" + t;
                            }
                        else {
                            if (!(41 > e)) throw "type:" + e;
                            switch (t) {
                                case 1:
                                    return 14;
                                case 2:
                                    return 13;
                                case 4:
                                    return 16;
                                case 8:
                                    return 12;
                                default:
                                    throw "mode:" + t;
                            }
                        }
                    },
                    getLostPoint: function (t) {
                        for (var e = t.getModuleCount(), r = 0, i = 0; i < e; i += 1)
                            for (var o = 0; o < e; o += 1) {
                                for (var n = 0, s = t.isDark(i, o), a = -1; 1 >= a; a += 1)
                                    if (!(0 > i + a || e <= i + a))
                                        for (var h = -1; 1 >= h; h += 1)
                                            0 > o + h ||
                                            e <= o + h ||
                                            ((0 != a || 0 != h) &&
                                                s == t.isDark(i + a, o + h) &&
                                                (n += 1));
                                5 < n && (r += 3 + n - 5);
                            }
                        for (i = 0; i < e - 1; i += 1)
                            for (o = 0; o < e - 1; o += 1)
                                (n = 0),
                                t.isDark(i, o) && (n += 1),
                                t.isDark(i + 1, o) && (n += 1),
                                t.isDark(i, o + 1) && (n += 1),
                                t.isDark(i + 1, o + 1) && (n += 1),
                                (0 == n || 4 == n) && (r += 3);
                        for (i = 0; i < e; i += 1)
                            for (o = 0; o < e - 6; o += 1)
                                t.isDark(i, o) &&
                                !t.isDark(i, o + 1) &&
                                t.isDark(i, o + 2) &&
                                t.isDark(i, o + 3) &&
                                t.isDark(i, o + 4) &&
                                !t.isDark(i, o + 5) &&
                                t.isDark(i, o + 6) &&
                                (r += 40);
                        for (o = 0; o < e; o += 1)
                            for (i = 0; i < e - 6; i += 1)
                                t.isDark(i, o) &&
                                !t.isDark(i + 1, o) &&
                                t.isDark(i + 2, o) &&
                                t.isDark(i + 3, o) &&
                                t.isDark(i + 4, o) &&
                                !t.isDark(i + 5, o) &&
                                t.isDark(i + 6, o) &&
                                (r += 40);
                        for (o = n = 0; o < e; o += 1)
                            for (i = 0; i < e; i += 1) t.isDark(i, o) && (n += 1);
                        return r + (Math.abs((100 * n) / e / e - 50) / 5) * 10;
                    }
                };
            })(),
            h = (function () {
                for (var t = Array(256), e = Array(256), r = 0; 8 > r; r += 1)
                    t[r] = 1 << r;
                for (r = 8; 256 > r; r += 1)
                    t[r] = t[r - 4] ^ t[r - 5] ^ t[r - 6] ^ t[r - 8];
                for (r = 0; 255 > r; r += 1) e[t[r]] = r;
                return {
                    glog: function (t) {
                        if (1 > t) throw "glog(" + t + ")";
                        return e[t];
                    },
                    gexp: function (e) {
                        for (; 0 > e; ) e += 255;
                        for (; 256 <= e; ) e -= 255;
                        return t[e];
                    }
                };
            })(),
            u =
                ((n = [
                    [1, 26, 19],
                    [1, 26, 16],
                    [1, 26, 13],
                    [1, 26, 9],
                    [1, 44, 34],
                    [1, 44, 28],
                    [1, 44, 22],
                    [1, 44, 16],
                    [1, 70, 55],
                    [1, 70, 44],
                    [2, 35, 17],
                    [2, 35, 13],
                    [1, 100, 80],
                    [2, 50, 32],
                    [2, 50, 24],
                    [4, 25, 9],
                    [1, 134, 108],
                    [2, 67, 43],
                    [2, 33, 15, 2, 34, 16],
                    [2, 33, 11, 2, 34, 12],
                    [2, 86, 68],
                    [4, 43, 27],
                    [4, 43, 19],
                    [4, 43, 15],
                    [2, 98, 78],
                    [4, 49, 31],
                    [2, 32, 14, 4, 33, 15],
                    [4, 39, 13, 1, 40, 14],
                    [2, 121, 97],
                    [2, 60, 38, 2, 61, 39],
                    [4, 40, 18, 2, 41, 19],
                    [4, 40, 14, 2, 41, 15],
                    [2, 146, 116],
                    [3, 58, 36, 2, 59, 37],
                    [4, 36, 16, 4, 37, 17],
                    [4, 36, 12, 4, 37, 13],
                    [2, 86, 68, 2, 87, 69],
                    [4, 69, 43, 1, 70, 44],
                    [6, 43, 19, 2, 44, 20],
                    [6, 43, 15, 2, 44, 16],
                    [4, 101, 81],
                    [1, 80, 50, 4, 81, 51],
                    [4, 50, 22, 4, 51, 23],
                    [3, 36, 12, 8, 37, 13],
                    [2, 116, 92, 2, 117, 93],
                    [6, 58, 36, 2, 59, 37],
                    [4, 46, 20, 6, 47, 21],
                    [7, 42, 14, 4, 43, 15],
                    [4, 133, 107],
                    [8, 59, 37, 1, 60, 38],
                    [8, 44, 20, 4, 45, 21],
                    [12, 33, 11, 4, 34, 12],
                    [3, 145, 115, 1, 146, 116],
                    [4, 64, 40, 5, 65, 41],
                    [11, 36, 16, 5, 37, 17],
                    [11, 36, 12, 5, 37, 13],
                    [5, 109, 87, 1, 110, 88],
                    [5, 65, 41, 5, 66, 42],
                    [5, 54, 24, 7, 55, 25],
                    [11, 36, 12, 7, 37, 13],
                    [5, 122, 98, 1, 123, 99],
                    [7, 73, 45, 3, 74, 46],
                    [15, 43, 19, 2, 44, 20],
                    [3, 45, 15, 13, 46, 16],
                    [1, 135, 107, 5, 136, 108],
                    [10, 74, 46, 1, 75, 47],
                    [1, 50, 22, 15, 51, 23],
                    [2, 42, 14, 17, 43, 15],
                    [5, 150, 120, 1, 151, 121],
                    [9, 69, 43, 4, 70, 44],
                    [17, 50, 22, 1, 51, 23],
                    [2, 42, 14, 19, 43, 15],
                    [3, 141, 113, 4, 142, 114],
                    [3, 70, 44, 11, 71, 45],
                    [17, 47, 21, 4, 48, 22],
                    [9, 39, 13, 16, 40, 14],
                    [3, 135, 107, 5, 136, 108],
                    [3, 67, 41, 13, 68, 42],
                    [15, 54, 24, 5, 55, 25],
                    [15, 43, 15, 10, 44, 16],
                    [4, 144, 116, 4, 145, 117],
                    [17, 68, 42],
                    [17, 50, 22, 6, 51, 23],
                    [19, 46, 16, 6, 47, 17],
                    [2, 139, 111, 7, 140, 112],
                    [17, 74, 46],
                    [7, 54, 24, 16, 55, 25],
                    [34, 37, 13],
                    [4, 151, 121, 5, 152, 122],
                    [4, 75, 47, 14, 76, 48],
                    [11, 54, 24, 14, 55, 25],
                    [16, 45, 15, 14, 46, 16],
                    [6, 147, 117, 4, 148, 118],
                    [6, 73, 45, 14, 74, 46],
                    [11, 54, 24, 16, 55, 25],
                    [30, 46, 16, 2, 47, 17],
                    [8, 132, 106, 4, 133, 107],
                    [8, 75, 47, 13, 76, 48],
                    [7, 54, 24, 22, 55, 25],
                    [22, 45, 15, 13, 46, 16],
                    [10, 142, 114, 2, 143, 115],
                    [19, 74, 46, 4, 75, 47],
                    [28, 50, 22, 6, 51, 23],
                    [33, 46, 16, 4, 47, 17],
                    [8, 152, 122, 4, 153, 123],
                    [22, 73, 45, 3, 74, 46],
                    [8, 53, 23, 26, 54, 24],
                    [12, 45, 15, 28, 46, 16],
                    [3, 147, 117, 10, 148, 118],
                    [3, 73, 45, 23, 74, 46],
                    [4, 54, 24, 31, 55, 25],
                    [11, 45, 15, 31, 46, 16],
                    [7, 146, 116, 7, 147, 117],
                    [21, 73, 45, 7, 74, 46],
                    [1, 53, 23, 37, 54, 24],
                    [19, 45, 15, 26, 46, 16],
                    [5, 145, 115, 10, 146, 116],
                    [19, 75, 47, 10, 76, 48],
                    [15, 54, 24, 25, 55, 25],
                    [23, 45, 15, 25, 46, 16],
                    [13, 145, 115, 3, 146, 116],
                    [2, 74, 46, 29, 75, 47],
                    [42, 54, 24, 1, 55, 25],
                    [23, 45, 15, 28, 46, 16],
                    [17, 145, 115],
                    [10, 74, 46, 23, 75, 47],
                    [10, 54, 24, 35, 55, 25],
                    [19, 45, 15, 35, 46, 16],
                    [17, 145, 115, 1, 146, 116],
                    [14, 74, 46, 21, 75, 47],
                    [29, 54, 24, 19, 55, 25],
                    [11, 45, 15, 46, 46, 16],
                    [13, 145, 115, 6, 146, 116],
                    [14, 74, 46, 23, 75, 47],
                    [44, 54, 24, 7, 55, 25],
                    [59, 46, 16, 1, 47, 17],
                    [12, 151, 121, 7, 152, 122],
                    [12, 75, 47, 26, 76, 48],
                    [39, 54, 24, 14, 55, 25],
                    [22, 45, 15, 41, 46, 16],
                    [6, 151, 121, 14, 152, 122],
                    [6, 75, 47, 34, 76, 48],
                    [46, 54, 24, 10, 55, 25],
                    [2, 45, 15, 64, 46, 16],
                    [17, 152, 122, 4, 153, 123],
                    [29, 74, 46, 14, 75, 47],
                    [49, 54, 24, 10, 55, 25],
                    [24, 45, 15, 46, 46, 16],
                    [4, 152, 122, 18, 153, 123],
                    [13, 74, 46, 32, 75, 47],
                    [48, 54, 24, 14, 55, 25],
                    [42, 45, 15, 32, 46, 16],
                    [20, 147, 117, 4, 148, 118],
                    [40, 75, 47, 7, 76, 48],
                    [43, 54, 24, 22, 55, 25],
                    [10, 45, 15, 67, 46, 16],
                    [19, 148, 118, 6, 149, 119],
                    [18, 75, 47, 31, 76, 48],
                    [34, 54, 24, 34, 55, 25],
                    [20, 45, 15, 61, 46, 16]
                ]),
                    {
                        getRSBlocks: function (t, e) {
                            var r = (function (t, e) {
                                switch (e) {
                                    case s.L:
                                        return n[4 * (t - 1)];
                                    case s.M:
                                        return n[4 * (t - 1) + 1];
                                    case s.Q:
                                        return n[4 * (t - 1) + 2];
                                    case s.H:
                                        return n[4 * (t - 1) + 3];
                                }
                            })(t, e);
                            if (void 0 === r)
                                throw (
                                    "bad rs block @ typeNumber:" + t + "/errorCorrectionLevel:" + e
                                );
                            (t = r.length / 3), (e = []);
                            for (var i = 0; i < t; i += 1)
                                for (
                                    var o = r[3 * i], a = r[3 * i + 1], h = r[3 * i + 2], u = 0;
                                    u < o;
                                    u += 1
                                ) {
                                    var d = e,
                                        l = d.push,
                                        c = h,
                                        g = {};
                                    (g.totalCount = a), (g.dataCount = c), l.call(d, g);
                                }
                            return e;
                        }
                    });
        return i;
    })()).stringToBytesFuncs["UTF-8"] = function (t) {
        for (var e = [], r = 0; r < t.length; r++) {
            var i = t.charCodeAt(r);
            128 > i
                ? e.push(i)
                : 2048 > i
                    ? e.push(192 | (i >> 6), 128 | (63 & i))
                    : 55296 > i || 57344 <= i
                        ? e.push(224 | (i >> 12), 128 | ((i >> 6) & 63), 128 | (63 & i))
                        : (r++,
                            (i = 65536 + (((1023 & i) << 10) | (1023 & t.charCodeAt(r)))),
                            e.push(
                                240 | (i >> 18),
                                128 | ((i >> 12) & 63),
                                128 | ((i >> 6) & 63),
                                128 | (63 & i)
                            ));
        }
        return e;
    }),
    (t.exports = e);
var i,
    o = r.exports;
i =
    o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default")
        ? o.default
        : o;
let n = Array(41)
    .fill(0)
    .map((t, e) => e);
var s,
    a = s || (s = {});
(a.L = "L"), (a.M = "M"), (a.Q = "Q"), (a.H = "H");
var h,
    u = h || (h = {});
(u.numeric = "Numeric"),
    (u.alphanumeric = "Alphanumeric"),
    (u.byte = "Byte"),
    (u.kanji = "Kanji"),
    (u.unicode = "Unicode");
let d = (t) => !!t && "object" == typeof t && !Array.isArray(t);
function l(t, ...e) {
    if (!e.length) return t;
    let r = e.shift();
    return void 0 !== r && d(t) && d(r)
        ? ((t = {
            ...t
        }),
            Object.keys(r).forEach((e) => {
                let i = t[e],
                    o = r[e];
                Array.isArray(i) && Array.isArray(o)
                    ? (t[e] = o)
                    : d(i) && d(o)
                        ? (t[e] = l(Object.assign({}, i), o))
                        : (t[e] = o);
            }),
            l(t, ...e))
        : t;
}
var c,
    g = c || (c = {});
function f(t) {
    if (
        !(t = {
            ...t
        }).colorStops ||
        !t.colorStops.length
    )
        throw "Field 'colorStops' is required in gradient";
    return (
        (t.rotation = t.rotation ? Number(t.rotation) : 0),
            (t.colorStops = t.colorStops.map((t) => ({
                ...t,
                offset: Number(t.offset)
            }))),
            t
    );
}
(g.radial = "radial"), (g.linear = "linear");
var p,
    w = p || (p = {});
(w.dot = "dot"),
    (w.randomDot = "random-dot"),
    (w.rounded = "rounded"),
    (w.extraRounded = "extra-rounded"),
    (w.verticalLine = "vertical-line"),
    (w.horizontalLine = "horizontal-line"),
    (w.classy = "classy"),
    (w.classyRounded = "classy-rounded"),
    (w.square = "square"),
    (w.smallSquare = "small-square"),
    (w.diamond = "diamond");
var m,
    y = m || (m = {});
(y.dot = "dot"),
    (y.square = "square"),
    (y.heart = "heart"),
    (y.extraRounded = "extra-rounded"),
    (y.classy = "classy"),
    (y.outpoint = "outpoint"),
    (y.inpoint = "inpoint");
var b,
    v = b || (b = {});
(v.dot = "dot"),
    (v.square = "square"),
    (v.extraRounded = "extra-rounded"),
    (v.classy = "classy"),
    (v.outpoint = "outpoint"),
    (v.inpoint = "inpoint");
var $,
    x = $ || ($ = {});
(x.square = "square"), (x.circle = "circle");
let M = {
    document: void 0,
    shape: $.square,
    width: void 0,
    height: void 0,
    data: "",
    qrOptions: {
        typeNumber: n[0],
        mode: void 0,
        errorCorrectionLevel: s.Q
    },
    imageOptions: {
        hideBackgroundDots: !0,
        imageSize: 0.4,
        crossOrigin: void 0,
        margin: 0
    },
    dotsOptions: {
        type: p.square,
        color: "#000",
        size: 10
    }
};
function S(t) {
    return (
        ((t = {
            ...t
        }).imageOptions = {
            ...t.imageOptions,
            hideBackgroundDots: !!t.imageOptions.hideBackgroundDots,
            imageSize: Math.min(1, Number(t.imageOptions.imageSize)) || 1,
            margin: Number(t.imageOptions.margin)
        }),
            (t.dotsOptions = {
                ...t.dotsOptions
            }),
        t.dotsOptions.gradient &&
        (t.dotsOptions.gradient = f(t.dotsOptions.gradient)),
            (t.dotsOptions.size = Math.round(Math.max(0, t.dotsOptions.size) || 10)),
        t.cornersSquareOptions &&
        ((t.cornersSquareOptions = {
            ...t.cornersSquareOptions
        }),
        t.cornersSquareOptions.gradient &&
        (t.cornersSquareOptions.gradient = f(t.cornersSquareOptions.gradient))),
        t.cornersDotOptions &&
        ((t.cornersDotOptions = {
            ...t.cornersDotOptions
        }),
        t.cornersDotOptions.gradient &&
        (t.cornersDotOptions.gradient = f(t.cornersDotOptions.gradient))),
        t.backgroundOptions &&
        ((t.backgroundOptions = {
            ...t.backgroundOptions
        }),
        t.backgroundOptions.gradient &&
        (t.backgroundOptions.gradient = f(t.backgroundOptions.gradient))),
        t.document || (t.document = document),
            t
    );
}
let A = {
    [s.L]: 0.07,
    [s.M]: 0.15,
    [s.Q]: 0.25,
    [s.H]: 0.3
};
let z = /\.?0+$/;
function k(t) {
    return t.toFixed(7).replace(z, "");
}
function C(t, ...e) {
    return t
        .reduce((t, r, i) => {
            let o = "";
            return (
                i && (o = e[i - 1]), "number" == typeof o && (o = k(o)), `${t}${o}${r}`
            );
        }, "")
        .trim()
        .replace(/[\s\n\r]+/gim, " ");
}
class D {
    get element() {
        return this._element;
    }
    constructor(t, e) {
        (this.type = t), (this.document = e);
    }
    draw(t) {
        let e;
        switch (this.type) {
            case m.square:
                e = this.drawSquare;
                break;
            case m.heart:
                e = this.drawHeart;
                break;
            case m.extraRounded:
                e = this.drawRounded;
                break;
            case m.classy:
                e = this.drawClassy;
                break;
            case m.inpoint:
                e = this.drawInpoint;
                break;
            case m.outpoint:
                e = this.drawOutpoint;
                break;
            default:
                e = this.drawDot;
        }
        e.call(this, t);
    }
    rotateFigure({ x: t, y: e, size: r, rotation: i = 0, draw: o }) {
        var _this$_element;
        (t += r / 2),
            (e += r / 2),
            o(),
            (_this$_element = this._element) === null || _this$_element === void 0
                ? void 0
                : _this$_element.setAttribute(
                    "transform",
                    `rotate(${k((180 * i) / Math.PI)},${t},${e})`
                );
    }
    basicDot(t) {
        let { size: e, x: r, y: i } = t;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                )),
                    this._element.setAttribute("cx", k(r + e / 2)),
                    this._element.setAttribute("cy", k(i + e / 2)),
                    this._element.setAttribute("r", k(e / 2));
            }
        });
    }
    basicSquare(t) {
        let { size: e, x: r, y: i } = t;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "rect"
                )),
                    this._element.setAttribute("x", k(r)),
                    this._element.setAttribute("y", k(i)),
                    this._element.setAttribute("width", k(e)),
                    this._element.setAttribute("height", k(e));
            }
        });
    }
    basicHeart(t) {
        let { size: e, x: r, y: i } = t;
        this._element = this.document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        let o = !1,
            n = 0;
        this._element.setAttribute(
            "d",
            [
                "M",
                1,
                0.3262506,
                "c",
                0,
                0.0383376,
                -0.0064626,
                0.0758377,
                -0.0193751,
                0.1125001,
                "s",
                -0.0356247,
                0.076875,
                -0.0681248,
                0.1206252,
                "c",
                -0.0325,
                0.0437499,
                -0.0762503,
                0.0931247,
                -0.1312501,
                0.1481249,
                "C",
                0.7262502,
                0.7625008,
                0.6566626,
                0.8279132,
                0.5724999,
                0.9037505,
                "L",
                0.5,
                0.9687506,
                "L",
                0.4275001,
                0.9037505,
                "C",
                0.3433374,
                0.8279132,
                0.2737499,
                0.7625005,
                0.21875,
                0.7075007,
                "C",
                0.1637501,
                0.6525008,
                0.1199999,
                0.6031258,
                0.0874999,
                0.5593758,
                "S",
                0.0322876,
                0.4754133,
                0.0193751,
                0.4387506,
                "S",
                0,
                0.3645881,
                0,
                0.3262506,
                "c",
                0,
                -0.0783374,
                0.0262499,
                -0.1437498,
                0.07875,
                -0.1962499,
                "s",
                0.1179124,
                -0.07875,
                0.1962499,
                -0.07875,
                "c",
                0.0433376,
                0,
                0.0845875,
                0.0091625,
                0.12375,
                0.0274999,
                "S",
                0.4716623,
                0.1229131,
                0.5,
                0.1562506,
                "c",
                0.0283374,
                -0.0333375,
                0.0620874,
                -0.0591625,
                0.1012502,
                -0.0775,
                "c",
                0.0391627,
                -0.0183375,
                0.0804126,
                -0.0274999,
                0.12375,
                -0.0274999,
                "c",
                0.0783374,
                0,
                0.1437497,
                0.0262499,
                0.1962501,
                0.07875,
                "S",
                1,
                0.2479131,
                1,
                0.3262506,
                "z"
            ]
                .map((t) =>
                    "string" == typeof t
                        ? ((n = 0), (o = t.toUpperCase() == t), t)
                        : (n++, (t *= e), o && (t += 1 == n % 2 ? r : i), k(t))
                )
                .join(" ")
        );
    }
    basicRounded(t) {
        let { size: e, x: r, y: i } = t;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "rect"
                )),
                    this._element.setAttribute("x", k(r)),
                    this._element.setAttribute("y", k(i)),
                    this._element.setAttribute("width", k(e)),
                    this._element.setAttribute("height", k(e)),
                    this._element.setAttribute("rx", k(e / 4)),
                    this._element.setAttribute("ry", k(e / 4));
            }
        });
    }
    basicClassy(t) {
        let { size: e, x: r, y: i } = t,
            o = e / 7;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute("clip-rule", "evenodd"),
                    this._element.setAttribute(
                        "d",
                        C`M ${r} ${i + 2.5 * o} v ${2 * o} a ${2.5 * o} ${
                            2.5 * o
                        }, 0, 0, 0, ${2.5 * o} ${2.5 * o} h ${4.5 * o} v ${-4.5 * o} a ${
                            2.5 * o
                        } ${2.5 * o}, 0, 0, 0, ${2.5 * -o} ${2.5 * -o} h ${-2 * o} H ${r} z`
                    );
            }
        });
    }
    basicInpoint(t) {
        let { size: e, x: r, y: i } = t;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute("clip-rule", "evenodd"),
                    this._element.setAttribute(
                        "d",
                        C`M ${r} ${i + e / 2} v ${e / 4} a ${e / 4}, ${e / 4} 0 0 0 ${
                            e / 4
                        }, ${e / 4} h ${(e / 4) * 3} v ${(-e / 4) * 3} a ${e / 4}, ${
                            e / 4
                        } 0 0 0 ${-e / 4}, ${-e / 4} h ${-e / 2} a ${e / 4}, ${
                            e / 4
                        } 0 0 0 ${-e / 4}, ${e / 4} z`
                    );
            }
        });
    }
    drawDot({ x: t, y: e, size: r, rotation: i }) {
        this.basicDot({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawSquare({ x: t, y: e, size: r, rotation: i }) {
        this.basicSquare({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawHeart({ x: t, y: e, size: r, rotation: i }) {
        this.basicHeart({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawRounded({ x: t, y: e, size: r, rotation: i }) {
        this.basicRounded({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawClassy({ x: t, y: e, size: r, rotation: i }) {
        this.basicClassy({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawInpoint({ x: t, y: e, size: r, rotation: i }) {
        this.basicInpoint({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawOutpoint({ x: t, y: e, size: r, rotation: i }) {
        this.basicInpoint({
            x: t,
            y: e,
            size: r,
            rotation: (i || 0) + Math.PI
        });
    }
}
class q {
    get element() {
        return this._element;
    }
    constructor(t, e) {
        (this.type = t), (this.document = e);
    }
    draw(t) {
        let e;
        switch (this.type) {
            case b.square:
                e = this.drawSquare;
                break;
            case b.extraRounded:
                e = this.drawExtraRounded;
                break;
            case b.classy:
                e = this.drawClassy;
                break;
            case b.outpoint:
                e = this.drawOutpoint;
                break;
            case b.inpoint:
                e = this.drawInpoint;
                break;
            default:
                e = this.drawDot;
        }
        e.call(this, t);
    }
    rotateFigure({ x: t, y: e, size: r, rotation: i = 0, draw: o }) {
        var _this$_element2;
        (t += r / 2),
            (e += r / 2),
            o(),
            (_this$_element2 = this._element) === null || _this$_element2 === void 0
                ? void 0
                : _this$_element2.setAttribute(
                    "transform",
                    `rotate(${k((180 * i) / Math.PI)},${t},${e})`
                );
    }
    basicDot(t) {
        let { size: e, x: r, y: i } = t,
            o = e / 7;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute("clip-rule", "evenodd"),
                    this._element.setAttribute(
                        "d",
                        C`M ${r + e / 2} ${i} a ${e / 2} ${
                            e / 2
                        } 0 1 0 0.1 0 z m 0 ${o} a ${e / 2 - o} ${e / 2 - o} 0 1 1 -0.1 0 Z`
                    );
            }
        });
    }
    basicSquare(t) {
        let { size: e, x: r, y: i } = t,
            o = e / 7;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute("clip-rule", "evenodd"),
                    this._element.setAttribute(
                        "d",
                        C`M ${r} ${i} v ${e} h ${e} v ${-e} z M ${r + o} ${i + o} h ${
                            e - 2 * o
                        } v ${e - 2 * o} h ${2 * o - e} z`
                    );
            }
        });
    }
    basicExtraRounded(t) {
        let { size: e, x: r, y: i } = t,
            o = e / 7;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute("clip-rule", "evenodd"),
                    this._element.setAttribute(
                        "d",
                        C`M ${r} ${i + 2.5 * o} v ${2 * o} a ${2.5 * o} ${
                            2.5 * o
                        }, 0, 0, 0, ${2.5 * o} ${2.5 * o} h ${2 * o} a ${2.5 * o} ${
                            2.5 * o
                        }, 0, 0, 0, ${2.5 * o} ${2.5 * -o} v ${-2 * o} a ${2.5 * o} ${
                            2.5 * o
                        }, 0, 0, 0, ${2.5 * -o} ${2.5 * -o} h ${-2 * o} a ${2.5 * o} ${
                            2.5 * o
                        }, 0, 0, 0, ${2.5 * -o} ${2.5 * o} z M ${r + 2.5 * o} ${i + o} h ${
                            2 * o
                        } a ${1.5 * o} ${1.5 * o}, 0, 0, 1, ${1.5 * o} ${1.5 * o} v ${
                            2 * o
                        } a ${1.5 * o} ${1.5 * o}, 0, 0, 1, ${1.5 * -o} ${1.5 * o} h ${
                            -2 * o
                        } a ${1.5 * o} ${1.5 * o}, 0, 0, 1, ${1.5 * -o} ${1.5 * -o} v ${
                            -2 * o
                        } a ${1.5 * o} ${1.5 * o}, 0, 0, 1, ${1.5 * o} ${1.5 * -o} z`
                    );
            }
        });
    }
    basicClassy(t) {
        let { size: e, x: r, y: i } = t,
            o = e / 7;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute("clip-rule", "evenodd"),
                    this._element.setAttribute(
                        "d",
                        C`M ${r} ${i + 2.5 * o} v ${2 * o} a ${2.5 * o} ${
                            2.5 * o
                        }, 0, 0, 0, ${2.5 * o} ${2.5 * o} h ${4.5 * o} v ${-4.5 * o} a ${
                            2.5 * o
                        } ${2.5 * o}, 0, 0, 0, ${2.5 * -o} ${2.5 * -o} h ${
                            -2 * o
                        } H ${r} z M ${r + 2.5 * o} ${i + o} h ${2 * o} a ${1.5 * o} ${
                            1.5 * o
                        }, 0, 0, 1, ${1.5 * o} ${1.5 * o} v ${3.5 * o} h ${-3.5 * o} a ${
                            1.5 * o
                        } ${1.5 * o}, 0, 0, 1, ${1.5 * -o} ${1.5 * -o} v ${-3.5 * o} z`
                    );
            }
        });
    }
    basicInpoint(t) {
        let { size: e, x: r, y: i } = t,
            o = e / 7;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute("clip-rule", "evenodd"),
                    this._element.setAttribute(
                        "d",
                        C`M ${r} ${i + 2.5 * o} v ${2 * o} a ${2.5 * o} ${
                            2.5 * o
                        }, 0, 0, 0, ${2.5 * o} ${2.5 * o} h ${4.5 * o} v ${-4.5 * o} a ${
                            2.5 * o
                        } ${2.5 * o}, 0, 0, 0, ${2.5 * -o} ${2.5 * -o} h ${-2 * o} a ${
                            2.5 * o
                        } ${2.5 * o}, 0, 0, 0, ${2.5 * -o} ${2.5 * o} z M ${r + 2.5 * o} ${
                            i + o
                        } h ${2 * o} a ${1.5 * o} ${1.5 * o}, 0, 0, 1, ${1.5 * o} ${
                            1.5 * o
                        } v ${3.5 * o} h ${-3.5 * o} a ${1.5 * o} ${1.5 * o}, 0, 0, 1, ${
                            1.5 * -o
                        } ${1.5 * -o} v ${-2 * o} a ${1.5 * o} ${1.5 * o}, 0, 0, 1, ${
                            1.5 * o
                        } ${1.5 * -o} z`
                    );
            }
        });
    }
    drawDot({ x: t, y: e, size: r, rotation: i }) {
        this.basicDot({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawSquare({ x: t, y: e, size: r, rotation: i }) {
        this.basicSquare({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawExtraRounded({ x: t, y: e, size: r, rotation: i }) {
        this.basicExtraRounded({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawClassy({ x: t, y: e, size: r, rotation: i }) {
        this.basicClassy({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawInpoint({ x: t, y: e, size: r, rotation: i }) {
        this.basicInpoint({
            x: t,
            y: e,
            size: r,
            rotation: i
        });
    }
    drawOutpoint({ x: t, y: e, size: r, rotation: i }) {
        this.basicInpoint({
            x: t,
            y: e,
            size: r,
            rotation: (i || 0) + Math.PI
        });
    }
}
class O {
    get element() {
        return this._element;
    }
    constructor(t, e) {
        (this.type = t), (this.document = e);
    }
    draw(t) {
        let e;
        switch (this.type) {
            case p.dot:
                e = this.drawDot;
                break;
            case p.randomDot:
                e = this.drawRandomDot;
                break;
            case p.classy:
                e = this.drawClassy;
                break;
            case p.classyRounded:
                e = this.drawClassyRounded;
                break;
            case p.rounded:
                e = this.drawRounded;
                break;
            case p.verticalLine:
                e = this.drawVerticalLine;
                break;
            case p.horizontalLine:
                e = this.drawHorizontalLine;
                break;
            case p.extraRounded:
                e = this.drawExtraRounded;
                break;
            case p.diamond:
                e = this.drawDiamond;
                break;
            case p.smallSquare:
                e = this.drawSmallSquare;
                break;
            default:
                e = this.drawSquare;
        }
        e.call(this, t);
    }
    rotateFigure({ x: t, y: e, size: r, rotation: i = 0, draw: o }) {
        var _this$_element3;
        (t += r / 2),
            (e += r / 2),
            o(),
            (_this$_element3 = this._element) === null || _this$_element3 === void 0
                ? void 0
                : _this$_element3.setAttribute(
                    "transform",
                    `rotate(${k((180 * i) / Math.PI)},${t},${e})`
                );
    }
    basicDot(t) {
        let { size: e, x: r, y: i } = t;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                )),
                    this._element.setAttribute("cx", k(r + e / 2)),
                    this._element.setAttribute("cy", k(i + e / 2)),
                    this._element.setAttribute("r", k(e / 2));
            }
        });
    }
    basicSquare(t) {
        let { size: e, x: r, y: i } = t;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "rect"
                )),
                    this._element.setAttribute("x", k(r)),
                    this._element.setAttribute("y", k(i)),
                    this._element.setAttribute("width", k(e)),
                    this._element.setAttribute("height", k(e));
            }
        });
    }
    basicSideRounded(t) {
        let { size: e, x: r, y: i } = t;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute(
                        "d",
                        C`M ${r} ${i} v ${e} h ${e / 2} a ${e / 2} ${
                            e / 2
                        }, 0, 0, 0, 0 ${-e} z`
                    );
            }
        });
    }
    basicCornerRounded(t) {
        let { size: e, x: r, y: i } = t;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute(
                        "d",
                        C`M ${r} ${i} v ${e} h ${e} v ${-e / 2} a ${e / 2} ${
                            e / 2
                        }, 0, 0, 0, ${-e / 2} ${-e / 2} z`
                    );
            }
        });
    }
    basicCornerExtraRounded(t) {
        let { size: e, x: r, y: i } = t;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute(
                        "d",
                        C`M ${r} ${i} v ${e} h ${e} a ${e} ${e}, 0, 0, 0, ${-e} ${-e} z`
                    );
            }
        });
    }
    basicCornersRounded(t) {
        let { size: e, x: r, y: i } = t;
        this.rotateFigure({
            ...t,
            draw: () => {
                (this._element = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )),
                    this._element.setAttribute(
                        "d",
                        C`M ${r} ${i} v ${e / 2} a ${e / 2} ${e / 2}, 0, 0, 0, ${e / 2} ${
                            e / 2
                        } h ${e / 2} v ${-e / 2} a ${e / 2} ${e / 2}, 0, 0, 0, ${-e / 2} ${
                            -e / 2
                        } z`
                    );
            }
        });
    }
    drawDot({ x: t, y: e, size: r }) {
        this.basicDot({
            x: t,
            y: e,
            size: r,
            rotation: 0
        });
    }
    drawRandomDot({ x: t, y: e, size: r }) {
        this.basicDot({
            x: t,
            y: e,
            size: r * (0.25 * Math.random() + 0.75),
            rotation: 0
        });
    }
    drawSquare({ x: t, y: e, size: r }) {
        this.basicSquare({
            x: t,
            y: e,
            size: r,
            rotation: 0
        });
    }
    drawSmallSquare({ x: t, y: e, size: r }) {
        this.basicSquare({
            x: t + 0.15 * r,
            y: e + 0.15 * r,
            size: 0.7 * r,
            rotation: 0
        });
    }
    drawDiamond({ x: t, y: e, size: r }) {
        this.basicSquare({
            x: t,
            y: e,
            size: r,
            rotation: Math.PI / 4
        });
    }
    drawRounded({ x: t, y: e, size: r, getNeighbor: i }) {
        var o = i ? +i(-1, 0) : 0;
        let n = i ? +i(1, 0) : 0,
            s = i ? +i(0, -1) : 0;
        var a = o + n + s + (i = i ? +i(0, 1) : 0);
        0 === a
            ? this.basicDot({
                x: t,
                y: e,
                size: r,
                rotation: 0
            })
            : 2 < a || (o && n) || (s && i)
                ? this.basicSquare({
                    x: t,
                    y: e,
                    size: r,
                    rotation: 0
                })
                : 2 === a
                    ? ((a = 0),
                        o && s
                            ? (a = Math.PI / 2)
                            : s && n
                                ? (a = Math.PI)
                                : n && i && (a = -Math.PI / 2),
                        this.basicCornerRounded({
                            x: t,
                            y: e,
                            size: r,
                            rotation: a
                        }))
                    : 1 === a &&
                    ((o = 0),
                        s ? (o = Math.PI / 2) : n ? (o = Math.PI) : i && (o = -Math.PI / 2),
                        this.basicSideRounded({
                            x: t,
                            y: e,
                            size: r,
                            rotation: o
                        }));
    }
    drawVerticalLine({ x: t, y: e, size: r, getNeighbor: i }) {
        let o = i ? +i(-1, 0) : 0,
            n = i ? +i(1, 0) : 0,
            s = i ? +i(0, -1) : 0;
        0 === o + n + s + (i = i ? +i(0, 1) : 0) ||
        (o && !s && !i) ||
        (n && !s && !i)
            ? this.basicDot({
                x: t,
                y: e,
                size: r,
                rotation: 0
            })
            : s && i
                ? this.basicSquare({
                    x: t,
                    y: e,
                    size: r,
                    rotation: 0
                })
                : s && !i
                    ? this.basicSideRounded({
                        x: t,
                        y: e,
                        size: r,
                        rotation: Math.PI / 2
                    })
                    : i &&
                    !s &&
                    this.basicSideRounded({
                        x: t,
                        y: e,
                        size: r,
                        rotation: -Math.PI / 2
                    });
    }
    drawHorizontalLine({ x: t, y: e, size: r, getNeighbor: i }) {
        let o = i ? +i(-1, 0) : 0,
            n = i ? +i(1, 0) : 0,
            s = i ? +i(0, -1) : 0;
        0 === o + n + s + (i = i ? +i(0, 1) : 0) ||
        (s && !o && !n) ||
        (i && !o && !n)
            ? this.basicDot({
                x: t,
                y: e,
                size: r,
                rotation: 0
            })
            : o && n
                ? this.basicSquare({
                    x: t,
                    y: e,
                    size: r,
                    rotation: 0
                })
                : o && !n
                    ? this.basicSideRounded({
                        x: t,
                        y: e,
                        size: r,
                        rotation: 0
                    })
                    : n &&
                    !o &&
                    this.basicSideRounded({
                        x: t,
                        y: e,
                        size: r,
                        rotation: Math.PI
                    });
    }
    drawExtraRounded({ x: t, y: e, size: r, getNeighbor: i }) {
        var o = i ? +i(-1, 0) : 0;
        let n = i ? +i(1, 0) : 0,
            s = i ? +i(0, -1) : 0;
        var a = o + n + s + (i = i ? +i(0, 1) : 0);
        0 === a
            ? this.basicDot({
                x: t,
                y: e,
                size: r,
                rotation: 0
            })
            : 2 < a || (o && n) || (s && i)
                ? this.basicSquare({
                    x: t,
                    y: e,
                    size: r,
                    rotation: 0
                })
                : 2 === a
                    ? ((a = 0),
                        o && s
                            ? (a = Math.PI / 2)
                            : s && n
                                ? (a = Math.PI)
                                : n && i && (a = -Math.PI / 2),
                        this.basicCornerExtraRounded({
                            x: t,
                            y: e,
                            size: r,
                            rotation: a
                        }))
                    : 1 === a &&
                    ((o = 0),
                        s ? (o = Math.PI / 2) : n ? (o = Math.PI) : i && (o = -Math.PI / 2),
                        this.basicSideRounded({
                            x: t,
                            y: e,
                            size: r,
                            rotation: o
                        }));
    }
    drawClassy({ x: t, y: e, size: r, getNeighbor: i }) {
        let o = i ? +i(-1, 0) : 0,
            n = i ? +i(1, 0) : 0,
            s = i ? +i(0, -1) : 0;
        0 === o + n + s + (i = i ? +i(0, 1) : 0)
            ? this.basicCornersRounded({
                x: t,
                y: e,
                size: r,
                rotation: Math.PI / 2
            })
            : o || s
                ? n || i
                    ? this.basicSquare({
                        x: t,
                        y: e,
                        size: r,
                        rotation: 0
                    })
                    : this.basicCornerRounded({
                        x: t,
                        y: e,
                        size: r,
                        rotation: Math.PI / 2
                    })
                : this.basicCornerRounded({
                    x: t,
                    y: e,
                    size: r,
                    rotation: -Math.PI / 2
                });
    }
    drawClassyRounded({ x: t, y: e, size: r, getNeighbor: i }) {
        let o = i ? +i(-1, 0) : 0,
            n = i ? +i(1, 0) : 0,
            s = i ? +i(0, -1) : 0;
        0 === o + n + s + (i = i ? +i(0, 1) : 0)
            ? this.basicCornersRounded({
                x: t,
                y: e,
                size: r,
                rotation: Math.PI / 2
            })
            : o || s
                ? n || i
                    ? this.basicSquare({
                        x: t,
                        y: e,
                        size: r,
                        rotation: 0
                    })
                    : this.basicCornerExtraRounded({
                        x: t,
                        y: e,
                        size: r,
                        rotation: Math.PI / 2
                    })
                : this.basicCornerExtraRounded({
                    x: t,
                    y: e,
                    size: r,
                    rotation: -Math.PI / 2
                });
    }
}
let B = {
    toDataURL: (t) =>
        "string" == typeof t && t.startsWith("data:")
            ? Promise.resolve(t)
            : new Promise((e, r) => {
                if ("string" == typeof t) {
                    const i = new XMLHttpRequest();
                    (i.onload = function () {
                        const t = new FileReader();
                        (t.onloadend = function () {
                            e(t.result);
                        }),
                            t.readAsDataURL(i.response);
                    }),
                        (i.onerror = i.onabort = i.ontimeout = r),
                        i.open("GET", t, !0),
                        (i.responseType = "blob"),
                        i.send();
                } else {
                    const r = new FileReader();
                    (r.onloadend = function () {
                        e(r.result);
                    }),
                        r.readAsDataURL(t);
                }
            }),
    getSize: (t, e) =>
        new Promise((r, i) => {
            const o = new Image();
            "string" === e && (o.crossOrigin = e),
                (o.onload = () => {
                    r({
                        width: o.width,
                        height: o.height
                    });
                }),
                (o.onerror = o.onabort = i),
                "string" == typeof t
                    ? (o.src = t)
                    : B.toDataURL(t)
                        .then((t) => (o.src = t))
                        .catch(i);
        })
};
let I = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
    ],
    _ = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ],
    R = [
        [35, 49],
        [28, 36],
        [21, 25],
        [14, 16],
        [7, 9],
        [2, 4],
        [1, 1]
    ];
class P {
    get element() {
        return this._element;
    }
    constructor(t) {
        (this.options = t),
            (this.document = t.document),
            (this._element = this.document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            ));
        let e = k(t.width),
            r = k(t.height);
        this._element.setAttribute("width", e),
            this._element.setAttribute("height", r),
            this._element.setAttribute("viewBox", `0 0 ${e} ${r}`),
            (this.defs = this.document.createElementNS(
                "http://www.w3.org/2000/svg",
                "defs"
            )),
            this._element.appendChild(this.defs),
            (this.imageTools = t.imageTools || B);
    }
    get width() {
        return this.options.width;
    }
    get height() {
        return this.options.height;
    }
    async drawQR(t) {
        let e = t.getModuleCount(),
            r = parseInt(((e - 17) / 4).toFixed(0), 10),
            i = this.options.dotsOptions.size,
            o = {
                hideXDots: 0,
                hideYDots: 0,
                width: 0,
                height: 0
            };
        if (((this.qr = t), this.options.image)) {
            t = await this.imageTools.getSize(
                this.options.image,
                this.options.imageOptions.crossOrigin
            );
            let { imageOptions: n, errorCorrectionPercent: s } = this.options,
                a = n.imageSize * s,
                h = R.find((t) => t[0] <= r) || [0, 0];
            o = (function ({
                               originalHeight: t,
                               originalWidth: e,
                               maxHiddenDots: r,
                               maxHiddenAxisDots: i,
                               dotSize: o,
                               margin: n
                           }) {
                if (0 >= t || 0 >= e || 0 >= r || 0 >= o || 4 * n ** 2 > r)
                    return {
                        height: 0,
                        width: 0,
                        hideYDots: 0,
                        hideXDots: 0
                    };
                i && 0 == i % 2 && (i = Math.max(1, i - 1));
                var s = Math.max(e, t),
                    a = Math.min(e, t),
                    h = 0;
                i = (i || r) - 2 * n;
                do {
                    let t = h + (i - h) / 2,
                        e = Math.max(1, Math.ceil(t + 2 * n));
                    0 == e % 2 && e++;
                    let o = Math.max(1, Math.ceil((t * a) / s + 2 * n));
                    0 == o % 2 && o++, e * o > r ? (i = t) : (h = t);
                } while (0.001 < Math.abs(h - i));
                return (
                    0 == (r = Math.max(1, Math.ceil(h + 2 * n))) % 2 && r++,
                    0 == (a = Math.max(1, Math.ceil((h * a) / s + 2 * n))) % 2 && a++,
                        e > t ? (s = r) : ((s = a), (a = r)),
                        (r = i = (s - 2 * n) * o),
                    (i = (i * t) / e) > (h = (a - 2 * n) * o) &&
                    ((i = h), (r = (h * e) / t)),
                        {
                            height: Math.round(i + 2 * n * o),
                            width: Math.round(r + 2 * n * o),
                            hideYDots: a,
                            hideXDots: s
                        }
                );
            })({
                originalWidth: t.width,
                originalHeight: t.height,
                maxHiddenDots: Math.floor(a * (e * e - 192 - 2 * (e - 16) - 25 * h[1])),
                maxHiddenAxisDots: e - 14,
                dotSize: i,
                margin: n.margin
            });
        }
        this.drawBackground(),
            this.drawDots((t, r) => {
                var _I$t, _I, _I$t2, _$t, _ref, _$t2;
                return !(
                    (this.options.imageOptions.hideBackgroundDots &&
                        t >= (e - o.hideXDots) / 2 &&
                        t < (e + o.hideXDots) / 2 &&
                        r >= (e - o.hideYDots) / 2 &&
                        r < (e + o.hideYDots) / 2) ||
                    ((_I$t = I[t]) !== null && _I$t !== void 0 && _I$t[r]) ||
                    ((_I = I[t - e + 7]) !== null && _I !== void 0 && _I[r]) ||
                    ((_I$t2 = I[t]) !== null && _I$t2 !== void 0 && _I$t2[r - e + 7]) ||
                    ((_$t = _[t]) !== null && _$t !== void 0 && _$t[r]) ||
                    ((_ref = _[t - e + 7]) !== null && _ref !== void 0 && _ref[r]) ||
                    ((_$t2 = _[t]) !== null && _$t2 !== void 0 && _$t2[r - e + 7])
                );
            }),
            this.drawCorners(),
        this.options.image &&
        0 < o.width &&
        0 < o.height &&
        (await this.drawImage({
            width: o.width,
            height: o.height,
            count: e,
            dotSize: i
        }));
    }
    drawBackground() {
        let t = this.options;
        if (this._element && t.backgroundOptions) {
            this.createColor({
                options: t.backgroundOptions.gradient,
                color: t.backgroundOptions.color,
                additionalRotation: 0,
                x: 0,
                y: 0,
                height: t.height,
                width: t.width,
                name: "background-color"
            });
            let e = Math.min(t.width, t.height),
                r = this.document.createElementNS("http://www.w3.org/2000/svg", "rect");
            ([this.backgroundMask, this.backgroundMaskGroup] = this.createMask(
                "mask-background-color"
            )),
                this.defs.appendChild(this.backgroundMask),
                r.setAttribute("x", k((t.width - e) / 2)),
                r.setAttribute("y", k((t.height - e) / 2)),
                r.setAttribute("width", k(e)),
                r.setAttribute("height", k(e)),
                r.setAttribute("rx", k((e / 2) * (t.backgroundOptions.round || 0))),
                this.backgroundMaskGroup.appendChild(r);
        }
    }
    drawDots(t) {
        var _e$dotsOptions;
        if (!this.qr) throw "QR code is not defined";
        let e = this.options,
            r = this.qr.getModuleCount();
        if (r > e.width || r > e.height) throw "The canvas is too small.";
        var i = Math.min(e.width, e.height);
        let o = this.options.dotsOptions.size;
        var n = Math.floor((e.width - r * o) / 2),
            s = Math.floor((e.height - r * o) / 2);
        let a = new O(e.dotsOptions.type, this.document);
        ([this.dotsMask, this.dotsMaskGroup] = this.createMask("mask-dot-color")),
            this.defs.appendChild(this.dotsMask);
        for (let e = 0; e < r; e++)
            for (let i = 0; i < r; i++) {
                var _this$qr;
                (t && !t(e, i)) ||
                !(
                    (_this$qr = this.qr) !== null &&
                    _this$qr !== void 0 &&
                    _this$qr.isDark(i, e)
                ) ||
                (a.draw({
                    x: n + e * o,
                    y: s + i * o,
                    size: o,
                    getNeighbor: (o, n) =>
                        !(
                            0 > e + o ||
                            0 > i + n ||
                            e + o >= r ||
                            i + n >= r ||
                            (t && !t(e + o, i + n))
                        ) &&
                        !!this.qr &&
                        this.qr.isDark(i + n, e + o)
                }),
                a.element &&
                this.dotsMask &&
                this.dotsMaskGroup.appendChild(a.element));
            }
        let h = n,
            u = s,
            d = r;
        if (e.shape === $.circle) {
            i = Math.floor(
                (i / o -
                    r -
                    2 *
                    ((this.options.backgroundOptions &&
                            this.options.backgroundOptions.margin) ||
                        0)) /
                2
            );
            let t = r + 2 * i;
            (h = n -= i * o), (u = s -= i * o), (d = r + 2 * i);
            let e = [],
                l = Math.floor(t / 2);
            for (let o = 0; o < t; o++) {
                e[o] = [];
                for (let n = 0; n < t; n++)
                    e[o][n] =
                        (o >= i - 1 && o <= t - i && n >= i - 1 && n <= t - i) ||
                        Math.sqrt((o - l) * (o - l) + (n - l) * (n - l)) > l
                            ? 0
                            : this.qr.isDark(
                                0 > n - 2 * i ? n : n >= r ? n - 2 * i : n - i,
                                0 > o - 2 * i ? o : o >= r ? o - 2 * i : o - i
                            )
                                ? 1
                                : 0;
            }
            for (let r = 0; r < t; r++)
                for (let i = 0; i < t; i++)
                    e[r][i] &&
                    (a.draw({
                        x: n + r * o,
                        y: s + i * o,
                        size: o,
                        getNeighbor: (t, o) => {
                            var _e;
                            return !!(
                                (_e = e[r + t]) !== null &&
                                _e !== void 0 &&
                                _e[i + o]
                            );
                        }
                    }),
                    a.element &&
                    this.dotsMask &&
                    this.dotsMaskGroup.appendChild(a.element));
        }
        this.createColor({
            options:
                (_e$dotsOptions = e.dotsOptions) === null || _e$dotsOptions === void 0
                    ? void 0
                    : _e$dotsOptions.gradient,
            color: e.dotsOptions.color,
            additionalRotation: 0,
            x: h,
            y: u,
            height: d * o,
            width: d * o,
            name: "dot-color"
        });
    }
    drawCorners() {
        if (!this.qr) throw "QR code is not defined";
        let t = this.options;
        if (!this._element) throw "Element code is not defined";
        let e = this.qr.getModuleCount(),
            r = this.options.dotsOptions.size,
            i = 7 * r,
            o = 3 * r,
            n = Math.floor((t.width - e * r) / 2),
            s = Math.floor((t.height - e * r) / 2);
        [
            [0, 0, 0],
            [1, 0, Math.PI / 2],
            [0, 1, -Math.PI / 2]
        ].forEach(([a, h, u]) => {
            var _t$cornersSquareOptio,
                _t$cornersSquareOptio2,
                _t$cornersSquareOptio3,
                _t$cornersSquareOptio4,
                _t$cornersSquareOptio5,
                _t$cornersDotOptions,
                _t$cornersDotOptions2,
                _t$cornersDotOptions3,
                _t$cornersDotOptions4,
                _t$cornersDotOptions5;
            let d = n + a * r * (e - 7),
                l = s + h * r * (e - 7);
            var c = this.dotsMask;
            let g = this.dotsMaskGroup;
            var f = this.dotsMask;
            if (
                ((c = this.dotsMaskGroup),
                (((_t$cornersSquareOptio = t.cornersSquareOptions) !== null &&
                        _t$cornersSquareOptio !== void 0 &&
                        _t$cornersSquareOptio.gradient) ||
                    ((_t$cornersSquareOptio2 = t.cornersSquareOptions) !== null &&
                        _t$cornersSquareOptio2 !== void 0 &&
                        _t$cornersSquareOptio2.color)) &&
                (([c, g] = this.createMask(`mask-corners-square-color-${a}-${h}`)),
                    this.defs.appendChild(c),
                    (f = c),
                    (c = g),
                    this.createColor({
                        options:
                            (_t$cornersSquareOptio3 = t.cornersSquareOptions) === null ||
                            _t$cornersSquareOptio3 === void 0
                                ? void 0
                                : _t$cornersSquareOptio3.gradient,
                        color:
                            (_t$cornersSquareOptio4 = t.cornersSquareOptions) === null ||
                            _t$cornersSquareOptio4 === void 0
                                ? void 0
                                : _t$cornersSquareOptio4.color,
                        additionalRotation: u,
                        x: d,
                        y: l,
                        height: i,
                        width: i,
                        name: `corners-square-color-${a}-${h}`
                    })),
                (_t$cornersSquareOptio5 = t.cornersSquareOptions) !== null &&
                _t$cornersSquareOptio5 !== void 0 &&
                _t$cornersSquareOptio5.type)
            )
                (f = new q(t.cornersSquareOptions.type, this.document)).draw({
                    x: d,
                    y: l,
                    size: i,
                    rotation: u
                }),
                f.element && g && g.appendChild(f.element);
            else {
                f = new O(t.dotsOptions.type, this.document);
                for (let t = 0; t < I.length; t++)
                    for (let e = 0; e < I[t].length; e++) {
                        var _I$t3;
                        ((_I$t3 = I[t]) === null || _I$t3 === void 0 ? void 0 : _I$t3[e]) &&
                        (f.draw({
                            x: d + t * r,
                            y: l + e * r,
                            size: r,
                            getNeighbor: (r, i) => {
                                var _I2;
                                return !!(
                                    (_I2 = I[t + r]) !== null &&
                                    _I2 !== void 0 &&
                                    _I2[e + i]
                                );
                            }
                        }),
                        f.element && g && g.appendChild(f.element));
                    }
            }
            if (
                ((((_t$cornersDotOptions = t.cornersDotOptions) !== null &&
                        _t$cornersDotOptions !== void 0 &&
                        _t$cornersDotOptions.gradient) ||
                    ((_t$cornersDotOptions2 = t.cornersDotOptions) !== null &&
                        _t$cornersDotOptions2 !== void 0 &&
                        _t$cornersDotOptions2.color)) &&
                (([f, c] = this.createMask(`mask-corners-dot-color-${a}-${h}`)),
                    this.defs.appendChild(f),
                    this.createColor({
                        options:
                            (_t$cornersDotOptions3 = t.cornersDotOptions) === null ||
                            _t$cornersDotOptions3 === void 0
                                ? void 0
                                : _t$cornersDotOptions3.gradient,
                        color:
                            (_t$cornersDotOptions4 = t.cornersDotOptions) === null ||
                            _t$cornersDotOptions4 === void 0
                                ? void 0
                                : _t$cornersDotOptions4.color,
                        additionalRotation: u,
                        x: d + 2 * r,
                        y: l + 2 * r,
                        height: o,
                        width: o,
                        name: `corners-dot-color-${a}-${h}`
                    })),
                (_t$cornersDotOptions5 = t.cornersDotOptions) !== null &&
                _t$cornersDotOptions5 !== void 0 &&
                _t$cornersDotOptions5.type)
            )
                (a = new D(t.cornersDotOptions.type, this.document)).draw({
                    x: d + 2 * r,
                    y: l + 2 * r,
                    size: o,
                    rotation: u
                }),
                a.element && c && c.appendChild(a.element);
            else {
                u = new O(t.dotsOptions.type, this.document);
                for (let t = 0; t < _.length; t++)
                    for (let e = 0; e < _[t].length; e++) {
                        var _$t3;
                        ((_$t3 = _[t]) === null || _$t3 === void 0 ? void 0 : _$t3[e]) &&
                        (u.draw({
                            x: d + t * r,
                            y: l + e * r,
                            size: r,
                            getNeighbor: (r, i) => {
                                var _ref2;
                                return !!(
                                    (_ref2 = _[t + r]) !== null &&
                                    _ref2 !== void 0 &&
                                    _ref2[e + i]
                                );
                            }
                        }),
                        u.element && c && c.appendChild(u.element));
                    }
            }
        });
    }
    async drawImage({ width: t, height: e, count: r, dotSize: i }) {
        var o = this.options,
            n = o.imageOptions.margin * i;
        let s = Math.floor((o.width - r * i) / 2) + n + (r * i - t) / 2;
        if (
            ((r = Math.floor((o.height - r * i) / 2) + n + (r * i - e) / 2),
                (t -= 2 * n),
                (e -= 2 * n),
                (n = await this.imageTools.toDataURL(o.image || "")),
                (o = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "image"
                )).setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n || ""),
                n.startsWith("data:image/svg+xml;"))
        ) {
            i = (n = n.substring(19)).indexOf(",");
            let t = n.substring(0, i);
            if (((n = n.substring(i + 1)), "base64" === t))
                n =
                    "function" == typeof atob
                        ? atob(n)
                        : Buffer.from(n, "base64").toString("utf8");
            else n = "";
            n &&
            ((n = new DOMParser().parseFromString(n, "text/xml")),
            (n = Array.from(n.getElementsByTagName("svg"))).length && (o = n[0]));
        }
        o.setAttribute("x", k(s)),
            o.setAttribute("y", k(r)),
            o.setAttribute("width", `${k(t)}px`),
            o.setAttribute("height", `${k(e)}px`),
            this._element.appendChild(o);
    }
    createColor({
                    options: t,
                    color: e,
                    additionalRotation: r,
                    x: i,
                    y: o,
                    height: n,
                    width: s,
                    name: a
                }) {
        var h = s > n ? s : n;
        let u = this.document.createElementNS("http://www.w3.org/2000/svg", "rect");
        if (
            (u.setAttribute("x", k(i)),
                u.setAttribute("y", k(o)),
                u.setAttribute("height", k(n)),
                u.setAttribute("width", k(s)),
                u.setAttribute("style", `mask:url(#mask-${a})`),
                t)
        ) {
            let d;
            if (t.type === c.radial)
                (d = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "radialGradient"
                )),
                    d.setAttribute("id", a),
                    d.setAttribute("gradientUnits", "userSpaceOnUse"),
                    d.setAttribute("fx", k(i + s / 2)),
                    d.setAttribute("fy", k(o + n / 2)),
                    d.setAttribute("cx", k(i + s / 2)),
                    d.setAttribute("cy", k(o + n / 2)),
                    d.setAttribute("r", k(h / 2));
            else {
                h = i + s / 2;
                let u = o + n / 2;
                (i += s / 2),
                    (o += n / 2),
                    (0 <=
                        (r =
                            ((e = ((t.rotation || 0) + r) % (2 * Math.PI)) + 2 * Math.PI) %
                            (2 * Math.PI)) &&
                        r <= 0.25 * Math.PI) ||
                    (r > 1.75 * Math.PI && r <= 2 * Math.PI)
                        ? ((h -= s / 2),
                            (u -= (n / 2) * Math.tan(e)),
                            (i += s / 2),
                            (o += (n / 2) * Math.tan(e)))
                        : r > 0.25 * Math.PI && r <= 0.75 * Math.PI
                            ? ((u -= n / 2),
                                (h -= s / 2 / Math.tan(e)),
                                (o += n / 2),
                                (i += s / 2 / Math.tan(e)))
                            : r > 0.75 * Math.PI && r <= 1.25 * Math.PI
                                ? ((h += s / 2),
                                    (u += (n / 2) * Math.tan(e)),
                                    (i -= s / 2),
                                    (o -= (n / 2) * Math.tan(e)))
                                : r > 1.25 * Math.PI &&
                                r <= 1.75 * Math.PI &&
                                ((u += n / 2),
                                    (h += s / 2 / Math.tan(e)),
                                    (o -= n / 2),
                                    (i -= s / 2 / Math.tan(e))),
                    (d = this.document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "linearGradient"
                    )),
                    d.setAttribute("id", a),
                    d.setAttribute("gradientUnits", "userSpaceOnUse"),
                    d.setAttribute("x1", k(h)),
                    d.setAttribute("y1", k(u)),
                    d.setAttribute("x2", k(i)),
                    d.setAttribute("y2", k(o));
            }
            t.colorStops.forEach(({ offset: t, color: e }) => {
                let r = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "stop"
                );
                r.setAttribute("offset", `${k(100 * t)}%`),
                    r.setAttribute("stop-color", e),
                    d.appendChild(r);
            }),
                u.setAttribute("fill", `url(#${a})`),
                this.defs.appendChild(d);
        } else e && u.setAttribute("fill", e);
        this._element.appendChild(u);
    }
    createMask(t) {
        let e = this.options,
            r = this.document.createElementNS("http://www.w3.org/2000/svg", "mask");
        return (
            r.setAttribute("id", t),
                r.setAttribute("maskUnits", "userSpaceOnUse"),
                r.setAttribute("x", "0"),
                r.setAttribute("y", "0"),
                r.setAttribute("width", k(e.width)),
                r.setAttribute("height", k(e.height)),
                (t = this.document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "g"
                )).setAttribute("fill", "#fff"),
                r.appendChild(t),
                [r, t]
        );
    }
}
class L {
    get size() {
        if (this.qrSVG)
            return {
                width: this.qrSVG.width,
                height: this.qrSVG.height
            };
    }
    constructor(t) {
        (this.options = t ? S(l(M, t)) : M), this.update();
    }
    update(t) {
        this.container && (this.container.innerHTML = ""),
            (this.options = t ? S(l(this.options, t)) : this.options),
        this.options.data &&
        (this.options.stringToBytesFuncs &&
        (Object.assign(i.stringToBytesFuncs, this.options.stringToBytesFuncs),
            delete this.options.stringToBytesFuncs),
            (this.qr = i(
                this.options.qrOptions.typeNumber,
                this.options.qrOptions.errorCorrectionLevel
            )),
            (t =
                this.options.qrOptions.mode ||
                (function (t) {
                    switch (!0) {
                        case /^[0-9]*$/.test(t):
                            return h.numeric;
                        case /^[0-9A-Z $%*+\-./:]*$/.test(t):
                            return h.alphanumeric;
                        case /[^\u0000-\u00ff]/.test(t):
                            return h.unicode;
                        default:
                            return h.byte;
                    }
                })(this.options.data)) == h.unicode
                ? ((i.stringToBytes = i.stringToBytesFuncs["UTF-8"]), (t = h.byte))
                : (i.stringToBytes = i.stringToBytesFuncs.default),
            this.qr.addData(this.options.data, t),
            this.qr.make(),
            this.setupSvg(),
            this.append(this.container));
    }
    append(t) {
        var _this$qrSVG;
        t &&
        ((_this$qrSVG = this.qrSVG) !== null &&
        _this$qrSVG !== void 0 &&
        _this$qrSVG.element &&
        t.appendChild(this.qrSVG.element),
            (this.container = t));
    }
    applyExtension(t) {
        if (!t) throw "Extension function should be defined.";
        (this.extension = t), this.update();
    }
    deleteExtension() {
        (this.extension = void 0), this.update();
    }
    async serialize() {
        var _this$qrSVG2, _this$qrSVG3;
        if (!this.qr) throw "QR code is empty";
        if (
            (((_this$qrSVG2 = this.qrSVG) !== null &&
                _this$qrSVG2 !== void 0 &&
                _this$qrSVG2.element &&
                this.svgDrawingPromise) ||
            this.setupSvg(),
                await this.svgDrawingPromise,
            (_this$qrSVG3 = this.qrSVG) !== null &&
            _this$qrSVG3 !== void 0 &&
            _this$qrSVG3.element)
        )
            return (
                '<?xml version="1.0" standalone="no"?>\r\n' +
                new XMLSerializer().serializeToString(this.qrSVG.element)
            );
    }
    setupSvg() {
        if (this.qr) {
            var t = Math.ceil(
                (this.options.shape == $.circle ? Math.sqrt(2) : 1) *
                this.qr.getModuleCount()
            );
            (t = Math.ceil(
                this.options.dotsOptions.size *
                (t +
                    2 *
                    ((this.options.backgroundOptions &&
                            this.options.backgroundOptions.margin) ||
                        0))
            )),
                (this.qrSVG = new P({
                    ...this.options,
                    width: t,
                    height: t,
                    errorCorrectionPercent: A[this.options.qrOptions.errorCorrectionLevel]
                })),
                (this.svgDrawingPromise = this.qrSVG.drawQR(this.qr).then(() => {
                    var _this$qrSVG4, _this$extension;
                    ((_this$qrSVG4 = this.qrSVG) === null || _this$qrSVG4 === void 0
                        ? void 0
                        : _this$qrSVG4.element) &&
                    ((_this$extension = this.extension) === null ||
                    _this$extension === void 0
                        ? void 0
                        : _this$extension.call(this, this.qrSVG.element, this.options));
                }));
        }
    }
}
let E = {
    width: 300,
    height: 300,
    margin: 0
};
var N,
    T = N || (N = {});
function F(t, e) {
    let {
            width: r,
            height: i,
            margin: o
        } = e
            ? (function (t) {
                return (
                    ((t = {
                        ...t
                    }).width = Number(t.width)),
                        (t.height = Number(t.height)),
                        (t.margin = Number(t.margin)),
                    t.margin > Math.min(t.width, t.height) &&
                    (t.margin = Math.min(t.width, t.height)),
                        t
                );
            })(l(E, e))
            : E,
        n = document.createElement("canvas");
    (n.width = r), (n.height = i);
    let s = Math.min(r, i) - 2 * o;
    return (
        (t = t.serialize().then((t) => {
            if (t) {
                var e = "data:image/svg+xml;base64," + btoa(t),
                    o = new Image();
                return new Promise((t, a) => {
                    (o.onload = () => {
                        var _a$getContext, _n$getContext;
                        const e = Math.ceil((2 * s) / Math.min(o.width, o.height));
                        let a;
                        try {
                            a = new OffscreenCanvas(o.width * e, o.height * e);
                        } catch (t) {
                            (a = document.createElement("canvas")),
                                (a.width = o.width * e),
                                (a.height = o.height * e);
                        }
                        (_a$getContext = a.getContext("2d")) !== null &&
                        _a$getContext !== void 0 &&
                        _a$getContext.drawImage(o, 0, 0, a.width, a.height),
                        n !== null &&
                        n !== void 0 &&
                        (_n$getContext = n.getContext("2d")) !== null &&
                        _n$getContext !== void 0 &&
                        _n$getContext.drawImage(a, (r - s) / 2, (i - s) / 2, s, s),
                            t();
                    }),
                        (o.onerror = o.onabort = a),
                        (o.src = e);
                });
            }
        })),
            {
                canvas: n,
                canvasDrawingPromise: t
            }
    );
}
function H(t, e) {
    let r = document.createElement("a");
    (r.download = e),
        (r.href = t),
        document.body.appendChild(r),
        r.click(),
        document.body.removeChild(r);
}
(T.svg = "svg"), (T.png = "png"), (T.jpeg = "jpeg"), (T.webp = "webp");
let G = Object.freeze({
    __proto__: null,
    get FileExtension() {
        return N;
    },
    download: async function (t, e, r) {
        var i = N.png;
        let o = "qr";
        if (
            ("string" == typeof e
                ? ((i = e),
                    console.warn(
                        "Extension is deprecated as argument for 'download' method, please pass object { name: '...', extension: '...' } as argument"
                    ))
                : "object" == typeof e &&
                null !== e &&
                (e.name && (o = e.name), e.extension && (i = e.extension)),
            "svg" === i.toLowerCase())
        )
            (i = await t.serialize()) &&
            H(
                (i = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(i)),
                `${o}.svg`
            );
        else if ((t = F(t, r))) {
            var { canvas: n, canvasDrawingPromise: s } = t;
            await s, H((t = n.toDataURL(`image/${i}`)), `${o}.${i}`);
        }
    },
    downloadURI: H,
    drawToCanvas: F
});
export {
    m as CornerDotType,
    b as CornerSquareType,
    p as DotType,
    s as ErrorCorrectionLevel,
    A as ErrorCorrectionPercents,
    N as FileExtension,
    c as GradientType,
    h as Mode,
    L as QRCodeStyling,
    $ as ShapeType,
    n as TypeNumber,
    G as browserUtils
};
