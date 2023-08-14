function RNG(seed) {
  // LCG using GCC's constants
  this.m = 0x80000000; // 2**31;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}

RNG.prototype.nextInt = function() {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
}
RNG.prototype.nextFloat = function() {
  // returns in range [0,1]
  return this.nextInt() / (this.m - 1);
}
RNG.prototype.nextRange = function(start, end) {
  // returns in range [start, end): including start, excluding end
  // can't modulu nextInt because of weak randomness in lower bits
  var rangeSize = end - start;
  var randomUnder1 = this.nextInt() / this.m;
  return start + Math.floor(randomUnder1 * rangeSize);
}
RNG.prototype.choice = function(array) {
  return array[this.nextRange(0, array.length)];
}

var rng = new RNG(1379);

! function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                    return o(e[i][1][r] || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }
    return r
}()({
    1: [function(require, module, exports) {
        ! function() {
            function d3_documentElement(node) {
                return node && (node.ownerDocument || node.document || node).documentElement
            }

            function d3_ascending(a, b) {
                return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN
            }


            function d3_bisector(compare) {
                return {
                    left: function(a, x, lo, hi) {
                        for (arguments.length < 3 && (lo = 0), arguments.length < 4 && (hi = a.length); lo < hi;) {
                            var mid = lo + hi >>> 1;
                            compare(a[mid], x) < 0 ? lo = mid + 1 : hi = mid
                        }
                        return lo
                    },
                    right: function(a, x, lo, hi) {
                        for (arguments.length < 3 && (lo = 0), arguments.length < 4 && (hi = a.length); lo < hi;) {
                            var mid = lo + hi >>> 1;
                            compare(a[mid], x) > 0 ? hi = mid : lo = mid + 1
                        }
                        return lo
                    }
                }
            }

            function d3_transposeLength(d) {
                return d.length
            }

            function d3_range_integerScale(x) {
                for (var k = 1; x * k % 1;) k *= 10;
                return k
            }

            function d3_class(ctor, properties) {
                for (var key in properties) Object.defineProperty(ctor.prototype, key, {
                    value: properties[key],
                    enumerable: !1
                })
            }

            function d3_Map() {
                this._ = Object.create(null)
            }

            function d3_map_escape(key) {
                return (key += "") === d3_map_proto || key[0] === d3_map_zero ? d3_map_zero + key : key
            }

            function d3_map_unescape(key) {
                return (key += "")[0] === d3_map_zero ? key.slice(1) : key
            }

            function d3_map_has(key) {
                return d3_map_escape(key) in this._
            }

            function d3_map_remove(key) {
                return (key = d3_map_escape(key)) in this._ && delete this._[key]
            }

            function d3_map_keys() {
                var keys = [];
                for (var key in this._) keys.push(d3_map_unescape(key));
                return keys
            }

            function d3_map_size() {
                var size = 0;
                for (var key in this._) ++size;
                return size
            }

            function d3_map_empty() {
                for (var key in this._) return !1;
                return !0
            }

            function d3_Set() {
                this._ = Object.create(null)
            }

            function d3_identity(d) {
                return d
            }

            function d3_rebind(target, source, method) {
                return function() {
                    var value = method.apply(source, arguments);
                    return value === source ? target : value
                }
            }

            function d3_vendorSymbol(object, name) {
                if (name in object) return name;
                name = name.charAt(0).toUpperCase() + name.slice(1);
                for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
                    var prefixName = d3_vendorPrefixes[i] + name;
                    if (prefixName in object) return prefixName
                }
            }

            function d3_noop() {}

            function d3_dispatch() {}

            function d3_dispatch_event(dispatch) {
                function event() {
                    for (var l, z = listeners, i = -1, n = z.length; ++i < n;)(l = z[i].on) && l.apply(this, arguments);
                    return dispatch
                }
                var listeners = [],
                    listenerByName = new d3_Map;
                return event.on = function(name, listener) {
                    var i, l = listenerByName.get(name);
                    return arguments.length < 2 ? l && l.on : (l && (l.on = null, listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1)), listenerByName.remove(name)), listener && listeners.push(listenerByName.set(name, {
                        on: listener
                    })), dispatch)
                }, event
            }

            function d3_eventPreventDefault() {
                d3.event.preventDefault()
            }

            function d3_eventSource() {
                for (var s, e = d3.event; s = e.sourceEvent;) e = s;
                return e
            }

            function d3_eventDispatch(target) {
                for (var dispatch = new d3_dispatch, i = 0, n = arguments.length; ++i < n;) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
                return dispatch.of = function(thiz, argumentz) {
                    return function(e1) {
                        try {
                            var e0 = e1.sourceEvent = d3.event;
                            e1.target = target, d3.event = e1, dispatch[e1.type].apply(thiz, argumentz)
                        } finally {
                            d3.event = e0
                        }
                    }
                }, dispatch
            }

            function d3_selection(groups) {
                return d3_subclass(groups, d3_selectionPrototype), groups
            }

            function d3_selection_selector(selector) {
                return "function" == typeof selector ? selector : function() {
                    return d3_select(selector, this)
                }
            }

            function d3_selection_selectorAll(selector) {
                return "function" == typeof selector ? selector : function() {
                    return d3_selectAll(selector, this)
                }
            }

            function d3_selection_attr(name, value) {
                function attrNull() {
                    this.removeAttribute(name)
                }

                function attrNullNS() {
                    this.removeAttributeNS(name.space, name.local)
                }

                function attrConstant() {
                    this.setAttribute(name, value)
                }

                function attrConstantNS() {
                    this.setAttributeNS(name.space, name.local, value)
                }

                function attrFunction() {
                    var x = value.apply(this, arguments);
                    null == x ? this.removeAttribute(name) : this.setAttribute(name, x)
                }

                function attrFunctionNS() {
                    var x = value.apply(this, arguments);
                    null == x ? this.removeAttributeNS(name.space, name.local) : this.setAttributeNS(name.space, name.local, x)
                }
                return name = d3.ns.qualify(name), null == value ? name.local ? attrNullNS : attrNull : "function" == typeof value ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant
            }

            function d3_collapse(s) {
                return s.trim().replace(/\s+/g, " ")
            }

            function d3_selection_classedRe(name) {
                return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g")
            }

            function d3_selection_classes(name) {
                return (name + "").trim().split(/^|\s+/)
            }

            function d3_selection_classed(name, value) {
                function classedConstant() {
                    for (var i = -1; ++i < n;) name[i](this, value)
                }

                function classedFunction() {
                    for (var i = -1, x = value.apply(this, arguments); ++i < n;) name[i](this, x)
                }
                name = d3_selection_classes(name).map(d3_selection_classedName);
                var n = name.length;
                return "function" == typeof value ? classedFunction : classedConstant
            }

            function d3_selection_classedName(name) {
                var re = d3_selection_classedRe(name);
                return function(node, value) {
                    if (c = node.classList) return value ? c.add(name) : c.remove(name);
                    var c = node.getAttribute("class") || "";
                    value ? (re.lastIndex = 0, re.test(c) || node.setAttribute("class", d3_collapse(c + " " + name))) : node.setAttribute("class", d3_collapse(c.replace(re, " ")))
                }
            }

            function d3_selection_style(name, value, priority) {
                function styleNull() {
                    this.style.removeProperty(name)
                }

                function styleConstant() {
                    this.style.setProperty(name, value, priority)
                }

                function styleFunction() {
                    var x = value.apply(this, arguments);
                    null == x ? this.style.removeProperty(name) : this.style.setProperty(name, x, priority)
                }
                return null == value ? styleNull : "function" == typeof value ? styleFunction : styleConstant
            }

            function d3_selection_property(name, value) {
                function propertyNull() {
                    delete this[name]
                }

                function propertyConstant() {
                    this[name] = value
                }

                function propertyFunction() {
                    var x = value.apply(this, arguments);
                    null == x ? delete this[name] : this[name] = x
                }
                return null == value ? propertyNull : "function" == typeof value ? propertyFunction : propertyConstant
            }

            function d3_selection_creator(name) {
                function create() {
                    var document = this.ownerDocument,
                        namespace = this.namespaceURI;
                    return namespace === d3_nsXhtml && document.documentElement.namespaceURI === d3_nsXhtml ? document.createElement(name) : document.createElementNS(namespace, name)
                }

                function createNS() {
                    return this.ownerDocument.createElementNS(name.space, name.local)
                }
                return "function" == typeof name ? name : (name = d3.ns.qualify(name)).local ? createNS : create
            }

            function d3_selectionRemove() {
                var parent = this.parentNode;
                parent && parent.removeChild(this)
            }

            function d3_selection_dataNode(data) {
                return {
                    __data__: data
                }
            }

            function d3_selection_filter(selector) {
                return function() {
                    return d3_selectMatches(this, selector)
                }
            }

            function d3_selection_sortComparator(comparator) {
                return arguments.length || (comparator = d3_ascending),
                    function(a, b) {
                        return a && b ? comparator(a.__data__, b.__data__) : !a - !b
                    }
            }

            function d3_selection_each(groups, callback) {
                for (var j = 0, m = groups.length; j < m; j++)
                    for (var node, group = groups[j], i = 0, n = group.length; i < n; i++)(node = group[i]) && callback(node, i, j);
                return groups
            }

            function d3_selection_enter(selection) {
                return d3_subclass(selection, d3_selection_enterPrototype), selection
            }

            function d3_selection_enterInsertBefore(enter) {
                var i0, j0;
                return function(d, i, j) {
                    var node, group = enter[j].update,
                        n = group.length;
                    for (j != j0 && (j0 = j, i0 = 0), i >= i0 && (i0 = i + 1); !(node = group[i0]) && ++i0 < n;);
                    return node
                }
            }

            function d3_selection_on(type, listener, capture) {
                function onRemove() {
                    var l = this[name];
                    l && (this.removeEventListener(type, l, l.$), delete this[name])
                }

                function onAdd() {
                    var l = wrap(listener, d3_array(arguments));
                    onRemove.call(this), this.addEventListener(type, this[name] = l, l.$ = capture), l._ = listener
                }

                function removeAll() {
                    var match, re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$");
                    for (var name in this)
                        if (match = name.match(re)) {
                            var l = this[name];
                            this.removeEventListener(match[1], l, l.$), delete this[name]
                        }
                }
                var name = "__on" + type,
                    i = type.indexOf("."),
                    wrap = d3_selection_onListener;
                i > 0 && (type = type.slice(0, i));
                var filter = d3_selection_onFilters.get(type);
                return filter && (type = filter, wrap = d3_selection_onFilter), i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll
            }

            function d3_selection_onListener(listener, argumentz) {
                return function(e) {
                    var o = d3.event;
                    d3.event = e, argumentz[0] = this.__data__;
                    try {
                        listener.apply(this, argumentz)
                    } finally {
                        d3.event = o
                    }
                }
            }

            function d3_selection_onFilter(listener, argumentz) {
                var l = d3_selection_onListener(listener, argumentz);
                return function(e) {
                    var target = this,
                        related = e.relatedTarget;
                    related && (related === target || 8 & related.compareDocumentPosition(target)) || l.call(target, e)
                }
            }

            function d3_event_dragSuppress(node) {
                var name = ".dragsuppress-" + ++d3_event_dragId,
                    click = "click" + name,
                    w = d3.select(d3_window(node)).on("touchmove" + name, d3_eventPreventDefault).on("dragstart" + name, d3_eventPreventDefault).on("selectstart" + name, d3_eventPreventDefault);
                if (null == d3_event_dragSelect && (d3_event_dragSelect = !("onselectstart" in node) && d3_vendorSymbol(node.style, "userSelect")), d3_event_dragSelect) {
                    var style = d3_documentElement(node).style,
                        select = style[d3_event_dragSelect];
                    style[d3_event_dragSelect] = "none"
                }
                return function(suppressClick) {
                    if (w.on(name, null), d3_event_dragSelect && (style[d3_event_dragSelect] = select), suppressClick) {
                        var off = function() {
                            w.on(click, null)
                        };
                        w.on(click, function() {
                            d3_eventPreventDefault(), off()
                        }, !0), setTimeout(off, 0)
                    }
                }
            }

            function d3_mousePoint(container, e) {
                e.changedTouches && (e = e.changedTouches[0]);
                var svg = container.ownerSVGElement || container;
                if (svg.createSVGPoint) {
                    var point = svg.createSVGPoint();
                    if (d3_mouse_bug44083 < 0) {
                        var window = d3_window(container);
                        if (window.scrollX || window.scrollY) {
                            svg = d3.select("body").append("svg").style({
                                position: "absolute",
                                top: 0,
                                left: 0,
                                margin: 0,
                                padding: 0,
                                border: "none"
                            }, "important");
                            var ctm = svg[0][0].getScreenCTM();
                            d3_mouse_bug44083 = !(ctm.f || ctm.e), svg.remove()
                        }
                    }
                    return d3_mouse_bug44083 ? (point.x = e.pageX, point.y = e.pageY) : (point.x = e.clientX, point.y = e.clientY), point = point.matrixTransform(container.getScreenCTM().inverse()), [point.x, point.y]
                }
                var rect = container.getBoundingClientRect();
                return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop]
            }

            function d3_behavior_dragTouchId() {
                return d3.event.changedTouches[0].identifier
            }

            function d3_sgn(x) {
                return x > 0 ? 1 : x < 0 ? -1 : 0
            }

            function d3_cross2d(a, b, c) {
                return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
            }

            function d3_acos(x) {
                return x > 1 ? 0 : x < -1 ? π : Math.acos(x)
            }

            function d3_asin(x) {
                return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x)
            }

            function d3_sinh(x) {
                return ((x = Math.exp(x)) - 1 / x) / 2
            }

            function d3_cosh(x) {
                return ((x = Math.exp(x)) + 1 / x) / 2
            }

            function d3_tanh(x) {
                return ((x = Math.exp(2 * x)) - 1) / (x + 1)
            }

            function d3_haversin(x) {
                return (x = Math.sin(x / 2)) * x
            }

            function d3_color() {}

            function d3_hsl(h, s, l) {
                return this instanceof d3_hsl ? (this.h = +h, this.s = +s, void(this.l = +l)) : arguments.length < 2 ? h instanceof d3_hsl ? new d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : new d3_hsl(h, s, l)
            }

            function d3_hsl_rgb(h, s, l) {
                function v(h) {
                    return h > 360 ? h -= 360 : h < 0 && (h += 360), h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1
                }

                function vv(h) {
                    return Math.round(255 * v(h))
                }
                var m1, m2;
                return h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h, s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s, l = l < 0 ? 0 : l > 1 ? 1 : l, m2 = l <= .5 ? l * (1 + s) : l + s - l * s, m1 = 2 * l - m2, new d3_rgb(vv(h + 120), vv(h), vv(h - 120))
            }

            function d3_hcl(h, c, l) {
                return this instanceof d3_hcl ? (this.h = +h, this.c = +c, void(this.l = +l)) : arguments.length < 2 ? h instanceof d3_hcl ? new d3_hcl(h.h, h.c, h.l) : h instanceof d3_lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : new d3_hcl(h, c, l)
            }

            function d3_hcl_lab(h, c, l) {
                return isNaN(h) && (h = 0), isNaN(c) && (c = 0), new d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c)
            }

            function d3_lab(l, a, b) {
                return this instanceof d3_lab ? (this.l = +l, this.a = +a, void(this.b = +b)) : arguments.length < 2 ? l instanceof d3_lab ? new d3_lab(l.l, l.a, l.b) : l instanceof d3_hcl ? d3_hcl_lab(l.h, l.c, l.l) : d3_rgb_lab((l = d3_rgb(l)).r, l.g, l.b) : new d3_lab(l, a, b)
            }

            function d3_lab_rgb(l, a, b) {
                var y = (l + 16) / 116,
                    x = y + a / 500,
                    z = y - b / 200;
                return x = d3_lab_xyz(x) * d3_lab_X, y = d3_lab_xyz(y) * d3_lab_Y, z = d3_lab_xyz(z) * d3_lab_Z, new d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z))
            }

            function d3_lab_hcl(l, a, b) {
                return l > 0 ? new d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : new d3_hcl(NaN, NaN, l)
            }

            function d3_lab_xyz(x) {
                return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037
            }

            function d3_xyz_lab(x) {
                return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29
            }

            function d3_xyz_rgb(r) {
                return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055))
            }

            function d3_rgb(r, g, b) {
                return this instanceof d3_rgb ? (this.r = ~~r, this.g = ~~g, void(this.b = ~~b)) : arguments.length < 2 ? r instanceof d3_rgb ? new d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : new d3_rgb(r, g, b)
            }

            function d3_rgbNumber(value) {
                return new d3_rgb(value >> 16, value >> 8 & 255, 255 & value)
            }

            function d3_rgbString(value) {
                return d3_rgbNumber(value) + ""
            }

            function d3_rgb_hex(v) {
                return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16)
            }

            function d3_rgb_parse(format, rgb, hsl) {
                var m1, m2, color, r = 0,
                    g = 0,
                    b = 0;
                if (m1 = /([a-z]+)\((.*)\)/.exec(format = format.toLowerCase())) switch (m2 = m1[2].split(","), m1[1]) {
                    case "hsl":
                        return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
                    case "rgb":
                        return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]))
                }
                return (color = d3_rgb_names.get(format)) ? rgb(color.r, color.g, color.b) : (null == format || "#" !== format.charAt(0) || isNaN(color = parseInt(format.slice(1), 16)) || (4 === format.length ? (r = (3840 & color) >> 4, r |= r >> 4, g = 240 & color, g |= g >> 4, b = 15 & color, b |= b << 4) : 7 === format.length && (r = (16711680 & color) >> 16, g = (65280 & color) >> 8, b = 255 & color)), rgb(r, g, b))
            }

            function d3_rgb_hsl(r, g, b) {
                var h, s, min = Math.min(r /= 255, g /= 255, b /= 255),
                    max = Math.max(r, g, b),
                    d = max - min,
                    l = (max + min) / 2;
                return d ? (s = l < .5 ? d / (max + min) : d / (2 - max - min), h = r == max ? (g - b) / d + (g < b ? 6 : 0) : g == max ? (b - r) / d + 2 : (r - g) / d + 4, h *= 60) : (h = NaN, s = l > 0 && l < 1 ? 0 : h), new d3_hsl(h, s, l)
            }

            function d3_rgb_lab(r, g, b) {
                r = d3_rgb_xyz(r), g = d3_rgb_xyz(g), b = d3_rgb_xyz(b);
                var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X),
                    y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y);
                return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z)))
            }

            function d3_rgb_xyz(r) {
                return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4)
            }

            function d3_rgb_parseNumber(c) {
                var f = parseFloat(c);
                return "%" === c.charAt(c.length - 1) ? Math.round(2.55 * f) : f
            }

            function d3_functor(v) {
                return "function" == typeof v ? v : function() {
                    return v
                }
            }

            function d3_xhrType(response) {
                return function(url, mimeType, callback) {
                    return 2 === arguments.length && "function" == typeof mimeType && (callback = mimeType, mimeType = null), d3_xhr(url, mimeType, response, callback)
                }
            }

            function d3_xhr(url, mimeType, response, callback) {
                function respond() {
                    var result, status = request.status;
                    if (!status && d3_xhrHasResponse(request) || status >= 200 && status < 300 || 304 === status) {
                        try {
                            result = response.call(xhr, request)
                        } catch (e) {
                            return void dispatch.error.call(xhr, e)
                        }
                        dispatch.load.call(xhr, result)
                    } else dispatch.error.call(xhr, request)
                }
                var xhr = {},
                    dispatch = d3.dispatch("beforesend", "progress", "load", "error"),
                    headers = {},
                    request = new XMLHttpRequest,
                    responseType = null;
                return !this.XDomainRequest || "withCredentials" in request || !/^(http(s)?:)?\/\//.test(url) || (request = new XDomainRequest), "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
                    request.readyState > 3 && respond()
                }, request.onprogress = function(event) {
                    var o = d3.event;
                    d3.event = event;
                    try {
                        dispatch.progress.call(xhr, request)
                    } finally {
                        d3.event = o
                    }
                }, xhr.header = function(name, value) {
                    return name = (name + "").toLowerCase(), arguments.length < 2 ? headers[name] : (null == value ? delete headers[name] : headers[name] = value + "", xhr)
                }, xhr.mimeType = function(value) {
                    return arguments.length ? (mimeType = null == value ? null : value + "", xhr) : mimeType
                }, xhr.responseType = function(value) {
                    return arguments.length ? (responseType = value, xhr) : responseType
                }, xhr.response = function(value) {
                    return response = value, xhr
                }, ["get", "post"].forEach(function(method) {
                    xhr[method] = function() {
                        return xhr.send.apply(xhr, [method].concat(d3_array(arguments)))
                    }
                }), xhr.send = function(method, data, callback) {
                    if (2 === arguments.length && "function" == typeof data && (callback = data, data = null), request.open(method, url, !0), null == mimeType || "accept" in headers || (headers.accept = mimeType + ",*/*"), request.setRequestHeader)
                        for (var name in headers) request.setRequestHeader(name, headers[name]);
                    return null != mimeType && request.overrideMimeType && request.overrideMimeType(mimeType), null != responseType && (request.responseType = responseType), null != callback && xhr.on("error", callback).on("load", function(request) {
                        callback(null, request)
                    }), dispatch.beforesend.call(xhr, request), request.send(null == data ? null : data), xhr
                }, xhr.abort = function() {
                    return request.abort(), xhr
                }, d3.rebind(xhr, dispatch, "on"), null == callback ? xhr : xhr.get(d3_xhr_fixCallback(callback))
            }

            function d3_xhr_fixCallback(callback) {
                return 1 === callback.length ? function(error, request) {
                    callback(null == error ? request : null)
                } : callback
            }

            function d3_xhrHasResponse(request) {
                var type = request.responseType;
                return type && "text" !== type ? request.response : request.responseText
            }

            function d3_timer(callback, delay, then) {
                var n = arguments.length;
                n < 2 && (delay = 0), n < 3 && (then = Date.now());
                var time = then + delay,
                    timer = {
                        c: callback,
                        t: time,
                        n: null
                    };
                return d3_timer_queueTail ? d3_timer_queueTail.n = timer : d3_timer_queueHead = timer, d3_timer_queueTail = timer, d3_timer_interval || (d3_timer_timeout = clearTimeout(d3_timer_timeout), d3_timer_interval = 1, d3_timer_frame(d3_timer_step)), timer
            }

            function d3_timer_step() {
                var now = d3_timer_mark(),
                    delay = d3_timer_sweep() - now;
                delay > 24 ? (isFinite(delay) && (clearTimeout(d3_timer_timeout), d3_timer_timeout = setTimeout(d3_timer_step, delay)), d3_timer_interval = 0) : (d3_timer_interval = 1, d3_timer_frame(d3_timer_step))
            }

            function d3_timer_mark() {
                for (var now = Date.now(), timer = d3_timer_queueHead; timer;) now >= timer.t && timer.c(now - timer.t) && (timer.c = null), timer = timer.n;
                return now
            }

            function d3_timer_sweep() {
                for (var t0, t1 = d3_timer_queueHead, time = 1 / 0; t1;) t1.c ? (t1.t < time && (time = t1.t), t1 = (t0 = t1).n) : t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n;
                return d3_timer_queueTail = t0, time
            }

            function d3_format_precision(x, p) {
                return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1)
            }

            function d3_formatPrefix(d, i) {
                var k = Math.pow(10, 3 * abs(8 - i));
                return {
                    scale: i > 8 ? function(d) {
                        return d / k
                    } : function(d) {
                        return d * k
                    },
                    symbol: d
                }
            }

            function d3_locale_numberFormat(locale) {
                var locale_decimal = locale.decimal,
                    locale_thousands = locale.thousands,
                    locale_grouping = locale.grouping,
                    locale_currency = locale.currency,
                    formatGroup = locale_grouping && locale_thousands ? function(value, width) {
                        for (var i = value.length, t = [], j = 0, g = locale_grouping[0], length = 0; i > 0 && g > 0 && (length + g + 1 > width && (g = Math.max(1, width - length)), t.push(value.substring(i -= g, i + g)), !((length += g + 1) > width));) g = locale_grouping[j = (j + 1) % locale_grouping.length];
                        return t.reverse().join(locale_thousands)
                    } : d3_identity;
                return function(specifier) {
                    var match = d3_format_re.exec(specifier),
                        fill = match[1] || " ",
                        align = match[2] || ">",
                        sign = match[3] || "-",
                        symbol = match[4] || "",
                        zfill = match[5],
                        width = +match[6],
                        comma = match[7],
                        precision = match[8],
                        type = match[9],
                        scale = 1,
                        prefix = "",
                        suffix = "",
                        integer = !1,
                        exponent = !0;
                    switch (precision && (precision = +precision.substring(1)), (zfill || "0" === fill && "=" === align) && (zfill = fill = "0", align = "="), type) {
                        case "n":
                            comma = !0, type = "g";
                            break;
                        case "%":
                            scale = 100, suffix = "%", type = "f";
                            break;
                        case "p":
                            scale = 100, suffix = "%", type = "r";
                            break;
                        case "b":
                        case "o":
                        case "x":
                        case "X":
                            "#" === symbol && (prefix = "0" + type.toLowerCase());
                        case "c":
                            exponent = !1;
                        case "d":
                            integer = !0, precision = 0;
                            break;
                        case "s":
                            scale = -1, type = "r"
                    }
                    "$" === symbol && (prefix = locale_currency[0], suffix = locale_currency[1]), "r" != type || precision || (type = "g"), null != precision && ("g" == type ? precision = Math.max(1, Math.min(21, precision)) : "e" != type && "f" != type || (precision = Math.max(0, Math.min(20, precision)))), type = d3_format_types.get(type) || d3_format_typeDefault;
                    var zcomma = zfill && comma;
                    return function(value) {
                        var fullSuffix = suffix;
                        if (integer && value % 1) return "";
                        var negative = value < 0 || 0 === value && 1 / value < 0 ? (value = -value, "-") : "-" === sign ? "" : sign;
                        if (scale < 0) {
                            var unit = d3.formatPrefix(value, precision);
                            value = unit.scale(value), fullSuffix = unit.symbol + suffix
                        } else value *= scale;
                        value = type(value, precision);
                        var before, after, i = value.lastIndexOf(".");
                        if (i < 0) {
                            var j = exponent ? value.lastIndexOf("e") : -1;
                            j < 0 ? (before = value, after = "") : (before = value.substring(0, j), after = value.substring(j))
                        } else before = value.substring(0, i), after = locale_decimal + value.substring(i + 1);
                        !zfill && comma && (before = formatGroup(before, 1 / 0));
                        var length = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length),
                            padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
                        return zcomma && (before = formatGroup(padding + before, padding.length ? width - after.length : 1 / 0)), negative += prefix, value = before + after, ("<" === align ? negative + value + padding : ">" === align ? padding + negative + value : "^" === align ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + fullSuffix
                    }
                }
            }

            function d3_format_typeDefault(x) {
                return x + ""
            }

            function d3_date_utc() {
                this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
            }

            function d3_time_interval(local, step, number) {
                function round(date) {
                    var d0 = local(date),
                        d1 = offset(d0, 1);
                    return date - d0 < d1 - date ? d0 : d1
                }

                function ceil(date) {
                    return step(date = local(new d3_date(date - 1)), 1), date
                }

                function offset(date, k) {
                    return step(date = new d3_date(+date), k), date
                }

                function range(t0, t1, dt) {
                    var time = ceil(t0),
                        times = [];
                    if (dt > 1)
                        for (; time < t1;) number(time) % dt || times.push(new Date(+time)), step(time, 1);
                    else
                        for (; time < t1;) times.push(new Date(+time)), step(time, 1);
                    return times
                }

                function range_utc(t0, t1, dt) {
                    try {
                        d3_date = d3_date_utc;
                        var utc = new d3_date_utc;
                        return utc._ = t0, range(utc, t1, dt)
                    } finally {
                        d3_date = Date
                    }
                }
                local.floor = local, local.round = round, local.ceil = ceil, local.offset = offset, local.range = range;
                var utc = local.utc = d3_time_interval_utc(local);
                return utc.floor = utc, utc.round = d3_time_interval_utc(round), utc.ceil = d3_time_interval_utc(ceil), utc.offset = d3_time_interval_utc(offset), utc.range = range_utc, local
            }

            function d3_time_interval_utc(method) {
                return function(date, k) {
                    try {
                        d3_date = d3_date_utc;
                        var utc = new d3_date_utc;
                        return utc._ = date, method(utc, k)._
                    } finally {
                        d3_date = Date
                    }
                }
            }

            function d3_locale_timeFormat(locale) {
                function d3_time_format(template) {
                    function format(date) {
                        for (var c, p, f, string = [], i = -1, j = 0; ++i < n;) 37 === template.charCodeAt(i) && (string.push(template.slice(j, i)), null != (p = d3_time_formatPads[c = template.charAt(++i)]) && (c = template.charAt(++i)), (f = d3_time_formats[c]) && (c = f(date, null == p ? "e" === c ? " " : "0" : p)), string.push(c), j = i + 1);
                        return string.push(template.slice(j, i)), string.join("")
                    }
                    var n = template.length;
                    return format.parse = function(string) {
                        var d = {
                            y: 1900,
                            m: 0,
                            d: 1,
                            H: 0,
                            M: 0,
                            S: 0,
                            L: 0,
                            Z: null
                        };
                        if (d3_time_parse(d, template, string, 0) != string.length) return null;
                        "p" in d && (d.H = d.H % 12 + 12 * d.p);
                        var localZ = null != d.Z && d3_date !== d3_date_utc,
                            date = new(localZ ? d3_date_utc : d3_date);
                        return "j" in d ? date.setFullYear(d.y, 0, d.j) : "W" in d || "U" in d ? ("w" in d || (d.w = "W" in d ? 1 : 0), date.setFullYear(d.y, 0, 1), date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + 7 * d.W - (date.getDay() + 5) % 7 : d.w + 7 * d.U - (date.getDay() + 6) % 7)) : date.setFullYear(d.y, d.m, d.d), date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L), localZ ? date._ : date
                    }, format.toString = function() {
                        return template
                    }, format
                }

                function d3_time_parse(date, template, string, j) {
                    for (var c, p, t, i = 0, n = template.length, m = string.length; i < n;) {
                        if (j >= m) return -1;
                        if (37 === (c = template.charCodeAt(i++))) {
                            if (t = template.charAt(i++), !(p = d3_time_parsers[t in d3_time_formatPads ? template.charAt(i++) : t]) || (j = p(date, string, j)) < 0) return -1
                        } else if (c != string.charCodeAt(j++)) return -1
                    }
                    return j
                }

                function d3_time_parseWeekdayAbbrev(date, string, i) {
                    d3_time_dayAbbrevRe.lastIndex = 0;
                    var n = d3_time_dayAbbrevRe.exec(string.slice(i));
                    return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1
                }

                function d3_time_parseWeekday(date, string, i) {
                    d3_time_dayRe.lastIndex = 0;
                    var n = d3_time_dayRe.exec(string.slice(i));
                    return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1
                }

                function d3_time_parseMonthAbbrev(date, string, i) {
                    d3_time_monthAbbrevRe.lastIndex = 0;
                    var n = d3_time_monthAbbrevRe.exec(string.slice(i));
                    return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1
                }

                function d3_time_parseMonth(date, string, i) {
                    d3_time_monthRe.lastIndex = 0;
                    var n = d3_time_monthRe.exec(string.slice(i));
                    return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1
                }

                function d3_time_parseLocaleFull(date, string, i) {
                    return d3_time_parse(date, d3_time_formats.c.toString(), string, i)
                }

                function d3_time_parseLocaleDate(date, string, i) {
                    return d3_time_parse(date, d3_time_formats.x.toString(), string, i)
                }

                function d3_time_parseLocaleTime(date, string, i) {
                    return d3_time_parse(date, d3_time_formats.X.toString(), string, i)
                }

                function d3_time_parseAmPm(date, string, i) {
                    var n = d3_time_periodLookup.get(string.slice(i, i += 2).toLowerCase());
                    return null == n ? -1 : (date.p = n, i)
                }
                var locale_dateTime = locale.dateTime,
                    locale_date = locale.date,
                    locale_time = locale.time,
                    locale_periods = locale.periods,
                    locale_days = locale.days,
                    locale_shortDays = locale.shortDays,
                    locale_months = locale.months,
                    locale_shortMonths = locale.shortMonths;
                d3_time_format.utc = function(template) {
                    function format(date) {
                        try {
                            d3_date = d3_date_utc;
                            var utc = new d3_date;
                            return utc._ = date, local(utc)
                        } finally {
                            d3_date = Date
                        }
                    }
                    var local = d3_time_format(template);
                    return format.parse = function(string) {
                        try {
                            d3_date = d3_date_utc;
                            var date = local.parse(string);
                            return date && date._
                        } finally {
                            d3_date = Date
                        }
                    }, format.toString = local.toString, format
                }, d3_time_format.multi = d3_time_format.utc.multi = d3_time_formatMulti;
                var d3_time_periodLookup = d3.map(),
                    d3_time_dayRe = d3_time_formatRe(locale_days),
                    d3_time_dayLookup = d3_time_formatLookup(locale_days),
                    d3_time_dayAbbrevRe = d3_time_formatRe(locale_shortDays),
                    d3_time_dayAbbrevLookup = d3_time_formatLookup(locale_shortDays),
                    d3_time_monthRe = d3_time_formatRe(locale_months),
                    d3_time_monthLookup = d3_time_formatLookup(locale_months),
                    d3_time_monthAbbrevRe = d3_time_formatRe(locale_shortMonths),
                    d3_time_monthAbbrevLookup = d3_time_formatLookup(locale_shortMonths);
                locale_periods.forEach(function(p, i) {
                    d3_time_periodLookup.set(p.toLowerCase(), i)
                });
                var d3_time_formats = {
                        a: function(d) {
                            return locale_shortDays[d.getDay()]
                        },
                        A: function(d) {
                            return locale_days[d.getDay()]
                        },
                        b: function(d) {
                            return locale_shortMonths[d.getMonth()]
                        },
                        B: function(d) {
                            return locale_months[d.getMonth()]
                        },
                        c: d3_time_format(locale_dateTime),
                        d: function(d, p) {
                            return d3_time_formatPad(d.getDate(), p, 2)
                        },
                        e: function(d, p) {
                            return d3_time_formatPad(d.getDate(), p, 2)
                        },
                        H: function(d, p) {
                            return d3_time_formatPad(d.getHours(), p, 2)
                        },
                        I: function(d, p) {
                            return d3_time_formatPad(d.getHours() % 12 || 12, p, 2)
                        },
                        j: function(d, p) {
                            return d3_time_formatPad(1 + d3_time.dayOfYear(d), p, 3)
                        },
                        L: function(d, p) {
                            return d3_time_formatPad(d.getMilliseconds(), p, 3)
                        },
                        m: function(d, p) {
                            return d3_time_formatPad(d.getMonth() + 1, p, 2)
                        },
                        M: function(d, p) {
                            return d3_time_formatPad(d.getMinutes(), p, 2)
                        },
                        p: function(d) {
                            return locale_periods[+(d.getHours() >= 12)]
                        },
                        S: function(d, p) {
                            return d3_time_formatPad(d.getSeconds(), p, 2)
                        },
                        U: function(d, p) {
                            return d3_time_formatPad(d3_time.sundayOfYear(d), p, 2)
                        },
                        w: function(d) {
                            return d.getDay()
                        },
                        W: function(d, p) {
                            return d3_time_formatPad(d3_time.mondayOfYear(d), p, 2)
                        },
                        x: d3_time_format(locale_date),
                        X: d3_time_format(locale_time),
                        y: function(d, p) {
                            return d3_time_formatPad(d.getFullYear() % 100, p, 2)
                        },
                        Y: function(d, p) {
                            return d3_time_formatPad(d.getFullYear() % 1e4, p, 4)
                        },
                        Z: d3_time_zone,
                        "%": function() {
                            return "%"
                        }
                    },
                    d3_time_parsers = {
                        a: d3_time_parseWeekdayAbbrev,
                        A: d3_time_parseWeekday,
                        b: d3_time_parseMonthAbbrev,
                        B: d3_time_parseMonth,
                        c: d3_time_parseLocaleFull,
                        d: d3_time_parseDay,
                        e: d3_time_parseDay,
                        H: d3_time_parseHour24,
                        I: d3_time_parseHour24,
                        j: d3_time_parseDayOfYear,
                        L: d3_time_parseMilliseconds,
                        m: d3_time_parseMonthNumber,
                        M: d3_time_parseMinutes,
                        p: d3_time_parseAmPm,
                        S: d3_time_parseSeconds,
                        U: d3_time_parseWeekNumberSunday,
                        w: d3_time_parseWeekdayNumber,
                        W: d3_time_parseWeekNumberMonday,
                        x: d3_time_parseLocaleDate,
                        X: d3_time_parseLocaleTime,
                        y: d3_time_parseYear,
                        Y: d3_time_parseFullYear,
                        Z: d3_time_parseZone,
                        "%": d3_time_parseLiteralPercent
                    };
                return d3_time_format
            }

            function d3_time_formatPad(value, fill, width) {
                var sign = value < 0 ? "-" : "",
                    string = (sign ? -value : value) + "",
                    length = string.length;
                return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string)
            }

            function d3_time_formatRe(names) {
                return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i")
            }

            function d3_time_formatLookup(names) {
                for (var map = new d3_Map, i = -1, n = names.length; ++i < n;) map.set(names[i].toLowerCase(), i);
                return map
            }

            function d3_time_parseWeekdayNumber(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i, i + 1));
                return n ? (date.w = +n[0], i + n[0].length) : -1
            }

            function d3_time_parseWeekNumberSunday(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i));
                return n ? (date.U = +n[0], i + n[0].length) : -1
            }

            function d3_time_parseWeekNumberMonday(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i));
                return n ? (date.W = +n[0], i + n[0].length) : -1
            }

            function d3_time_parseFullYear(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i, i + 4));
                return n ? (date.y = +n[0], i + n[0].length) : -1
            }

            function d3_time_parseYear(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i, i + 2));
                return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1
            }

            function d3_time_parseZone(date, string, i) {
                return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5)) ? (date.Z = -string, i + 5) : -1
            }

            function d3_time_expandYear(d) {
                return d + (d > 68 ? 1900 : 2e3)
            }

            function d3_time_parseMonthNumber(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i, i + 2));
                return n ? (date.m = n[0] - 1, i + n[0].length) : -1
            }

            function d3_time_parseDay(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i, i + 2));
                return n ? (date.d = +n[0], i + n[0].length) : -1
            }

            function d3_time_parseDayOfYear(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i, i + 3));
                return n ? (date.j = +n[0], i + n[0].length) : -1
            }

            function d3_time_parseHour24(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i, i + 2));
                return n ? (date.H = +n[0], i + n[0].length) : -1
            }

            function d3_time_parseMinutes(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i, i + 2));
                return n ? (date.M = +n[0], i + n[0].length) : -1
            }

            function d3_time_parseSeconds(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i, i + 2));
                return n ? (date.S = +n[0], i + n[0].length) : -1
            }

            function d3_time_parseMilliseconds(date, string, i) {
                d3_time_numberRe.lastIndex = 0;
                var n = d3_time_numberRe.exec(string.slice(i, i + 3));
                return n ? (date.L = +n[0], i + n[0].length) : -1
            }

            function d3_time_zone(d) {
                var z = d.getTimezoneOffset(),
                    zs = z > 0 ? "-" : "+",
                    zh = abs(z) / 60 | 0,
                    zm = abs(z) % 60;
                return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2)
            }

            function d3_time_parseLiteralPercent(date, string, i) {
                d3_time_percentRe.lastIndex = 0;
                var n = d3_time_percentRe.exec(string.slice(i, i + 1));
                return n ? i + n[0].length : -1
            }

            function d3_time_formatMulti(formats) {
                for (var n = formats.length, i = -1; ++i < n;) formats[i][0] = this(formats[i][0]);
                return function(date) {
                    for (var i = 0, f = formats[i]; !f[1](date);) f = formats[++i];
                    return f[0](date)
                }
            }

            function d3_adder() {}

            function d3_adderSum(a, b, o) {
                var x = o.s = a + b,
                    bv = x - a,
                    av = x - bv;
                o.t = a - av + (b - bv)
            }

            function d3_geo_streamGeometry(geometry, listener) {
                geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type) && d3_geo_streamGeometryType[geometry.type](geometry, listener)
            }

            function d3_geo_streamLine(coordinates, listener, closed) {
                var coordinate, i = -1,
                    n = coordinates.length - closed;
                for (listener.lineStart(); ++i < n;) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1], coordinate[2]);
                listener.lineEnd()
            }

            function d3_geo_streamPolygon(coordinates, listener) {
                var i = -1,
                    n = coordinates.length;
                for (listener.polygonStart(); ++i < n;) d3_geo_streamLine(coordinates[i], listener, 1);
                listener.polygonEnd()
            }

            function d3_geo_areaRingStart() {
                function nextPoint(λ, φ) {
                    λ *= d3_radians, φ = φ * d3_radians / 2 + π / 4;
                    var dλ = λ - λ0,
                        sdλ = dλ >= 0 ? 1 : -1,
                        adλ = sdλ * dλ,
                        cosφ = Math.cos(φ),
                        sinφ = Math.sin(φ),
                        k = sinφ0 * sinφ,
                        u = cosφ0 * cosφ + k * Math.cos(adλ),
                        v = k * sdλ * Math.sin(adλ);
                    d3_geo_areaRingSum.add(Math.atan2(v, u)), λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ
                }
                var λ00, φ00, λ0, cosφ0, sinφ0;
                d3_geo_area.point = function(λ, φ) {
                    d3_geo_area.point = nextPoint, λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), sinφ0 = Math.sin(φ)
                }, d3_geo_area.lineEnd = function() {
                    nextPoint(λ00, φ00)
                }
            }

            function d3_geo_cartesian(spherical) {
                var λ = spherical[0],
                    φ = spherical[1],
                    cosφ = Math.cos(φ);
                return [cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ)]
            }

            function d3_geo_cartesianDot(a, b) {
                return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
            }

            function d3_geo_cartesianCross(a, b) {
                return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
            }

            function d3_geo_cartesianAdd(a, b) {
                a[0] += b[0], a[1] += b[1], a[2] += b[2]
            }

            function d3_geo_cartesianScale(vector, k) {
                return [vector[0] * k, vector[1] * k, vector[2] * k]
            }

            function d3_geo_cartesianNormalize(d) {
                var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
                d[0] /= l, d[1] /= l, d[2] /= l
            }

            function d3_geo_spherical(cartesian) {
                return [Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2])]
            }

            function d3_geo_sphericalEqual(a, b) {
                return abs(a[0] - b[0]) < ε && abs(a[1] - b[1]) < ε
            }

            function d3_geo_centroidPoint(λ, φ) {
                λ *= d3_radians;
                var cosφ = Math.cos(φ *= d3_radians);
                d3_geo_centroidPointXYZ(cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ))
            }

            function d3_geo_centroidPointXYZ(x, y, z) {
                ++d3_geo_centroidW0, d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0, d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0, d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0
            }

            function d3_geo_centroidLineStart() {
                function nextPoint(λ, φ) {
                    λ *= d3_radians;
                    var cosφ = Math.cos(φ *= d3_radians),
                        x = cosφ * Math.cos(λ),
                        y = cosφ * Math.sin(λ),
                        z = Math.sin(φ),
                        w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
                    d3_geo_centroidW1 += w, d3_geo_centroidX1 += w * (x0 + (x0 = x)), d3_geo_centroidY1 += w * (y0 + (y0 = y)), d3_geo_centroidZ1 += w * (z0 + (z0 = z)), d3_geo_centroidPointXYZ(x0, y0, z0)
                }
                var x0, y0, z0;
                d3_geo_centroid.point = function(λ, φ) {
                    λ *= d3_radians;
                    var cosφ = Math.cos(φ *= d3_radians);
                    x0 = cosφ * Math.cos(λ), y0 = cosφ * Math.sin(λ), z0 = Math.sin(φ), d3_geo_centroid.point = nextPoint, d3_geo_centroidPointXYZ(x0, y0, z0)
                }
            }

            function d3_geo_centroidLineEnd() {
                d3_geo_centroid.point = d3_geo_centroidPoint
            }

            function d3_geo_centroidRingStart() {
                function nextPoint(λ, φ) {
                    λ *= d3_radians;
                    var cosφ = Math.cos(φ *= d3_radians),
                        x = cosφ * Math.cos(λ),
                        y = cosφ * Math.sin(λ),
                        z = Math.sin(φ),
                        cx = y0 * z - z0 * y,
                        cy = z0 * x - x0 * z,
                        cz = x0 * y - y0 * x,
                        m = Math.sqrt(cx * cx + cy * cy + cz * cz),
                        u = x0 * x + y0 * y + z0 * z,
                        v = m && -d3_acos(u) / m,
                        w = Math.atan2(m, u);
                    d3_geo_centroidX2 += v * cx, d3_geo_centroidY2 += v * cy, d3_geo_centroidZ2 += v * cz, d3_geo_centroidW1 += w, d3_geo_centroidX1 += w * (x0 + (x0 = x)), d3_geo_centroidY1 += w * (y0 + (y0 = y)), d3_geo_centroidZ1 += w * (z0 + (z0 = z)), d3_geo_centroidPointXYZ(x0, y0, z0)
                }
                var λ00, φ00, x0, y0, z0;
                d3_geo_centroid.point = function(λ, φ) {
                    λ00 = λ, φ00 = φ, d3_geo_centroid.point = nextPoint, λ *= d3_radians;
                    var cosφ = Math.cos(φ *= d3_radians);
                    x0 = cosφ * Math.cos(λ), y0 = cosφ * Math.sin(λ), z0 = Math.sin(φ), d3_geo_centroidPointXYZ(x0, y0, z0)
                }, d3_geo_centroid.lineEnd = function() {
                    nextPoint(λ00, φ00), d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd, d3_geo_centroid.point = d3_geo_centroidPoint
                }
            }

            function d3_geo_compose(a, b) {
                function compose(x, y) {
                    return x = a(x, y), b(x[0], x[1])
                }
                return a.invert && b.invert && (compose.invert = function(x, y) {
                    return (x = b.invert(x, y)) && a.invert(x[0], x[1])
                }), compose
            }

            function d3_true() {
                return !0
            }

            function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
                var subject = [],
                    clip = [];
                if (segments.forEach(function(segment) {
                        if (!((n = segment.length - 1) <= 0)) {
                            var n, p0 = segment[0],
                                p1 = segment[n];
                            if (d3_geo_sphericalEqual(p0, p1)) {
                                listener.lineStart();
                                for (var i = 0; i < n; ++i) listener.point((p0 = segment[i])[0], p0[1]);
                                return void listener.lineEnd()
                            }
                            var a = new d3_geo_clipPolygonIntersection(p0, segment, null, !0),
                                b = new d3_geo_clipPolygonIntersection(p0, null, a, !1);
                            a.o = b, subject.push(a), clip.push(b), a = new d3_geo_clipPolygonIntersection(p1, segment, null, !1), b = new d3_geo_clipPolygonIntersection(p1, null, a, !0), a.o = b, subject.push(a), clip.push(b)
                        }
                    }), clip.sort(compare), d3_geo_clipPolygonLinkCircular(subject), d3_geo_clipPolygonLinkCircular(clip), subject.length) {
                    for (var i = 0, entry = clipStartInside, n = clip.length; i < n; ++i) clip[i].e = entry = !entry;
                    for (var points, point, start = subject[0];;) {
                        for (var current = start, isSubject = !0; current.v;)
                            if ((current = current.n) === start) return;
                        points = current.z, listener.lineStart();
                        do {
                            if (current.v = current.o.v = !0, current.e) {
                                if (isSubject)
                                    for (var i = 0, n = points.length; i < n; ++i) listener.point((point = points[i])[0], point[1]);
                                else interpolate(current.x, current.n.x, 1, listener);
                                current = current.n
                            } else {
                                if (isSubject) {
                                    points = current.p.z;
                                    for (var i = points.length - 1; i >= 0; --i) listener.point((point = points[i])[0], point[1])
                                } else interpolate(current.x, current.p.x, -1, listener);
                                current = current.p
                            }
                            current = current.o, points = current.z, isSubject = !isSubject
                        } while (!current.v);
                        listener.lineEnd()
                    }
                }
            }

            function d3_geo_clipPolygonLinkCircular(array) {
                if (n = array.length) {
                    for (var n, b, i = 0, a = array[0]; ++i < n;) a.n = b = array[i], b.p = a, a = b;
                    a.n = b = array[0], b.p = a
                }
            }

            function d3_geo_clipPolygonIntersection(point, points, other, entry) {
                this.x = point, this.z = points, this.o = other, this.e = entry, this.v = !1, this.n = this.p = null
            }

            function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
                return function(rotate, listener) {
                    function point(λ, φ) {
                        var point = rotate(λ, φ);
                        pointVisible(λ = point[0], φ = point[1]) && listener.point(λ, φ)
                    }

                    function pointLine(λ, φ) {
                        var point = rotate(λ, φ);
                        line.point(point[0], point[1])
                    }

                    function lineStart() {
                        clip.point = pointLine, line.lineStart()
                    }

                    function lineEnd() {
                        clip.point = point, line.lineEnd()
                    }

                    function pointRing(λ, φ) {
                        ring.push([λ, φ]);
                        var point = rotate(λ, φ);
                        ringListener.point(point[0], point[1])
                    }

                    function ringStart() {
                        ringListener.lineStart(), ring = []
                    }

                    function ringEnd() {
                        pointRing(ring[0][0], ring[0][1]), ringListener.lineEnd();
                        var segment, clean = ringListener.clean(),
                            ringSegments = buffer.buffer(),
                            n = ringSegments.length;
                        if (ring.pop(), polygon.push(ring), ring = null, n)
                            if (1 & clean) {
                                segment = ringSegments[0];
                                var point, n = segment.length - 1,
                                    i = -1;
                                if (n > 0) {
                                    for (polygonStarted || (listener.polygonStart(), polygonStarted = !0), listener.lineStart(); ++i < n;) listener.point((point = segment[i])[0], point[1]);
                                    listener.lineEnd()
                                }
                            } else n > 1 && 2 & clean && ringSegments.push(ringSegments.pop().concat(ringSegments.shift())), segments.push(ringSegments.filter(d3_geo_clipSegmentLength1))
                    }
                    var segments, polygon, ring, line = clipLine(listener),
                        rotatedClipStart = rotate.invert(clipStart[0], clipStart[1]),
                        clip = {
                            point: point,
                            lineStart: lineStart,
                            lineEnd: lineEnd,
                            polygonStart: function() {
                                clip.point = pointRing, clip.lineStart = ringStart, clip.lineEnd = ringEnd, segments = [], polygon = []
                            },
                            polygonEnd: function() {
                                clip.point = point, clip.lineStart = lineStart, clip.lineEnd = lineEnd, segments = d3.merge(segments);
                                var clipStartInside = d3_geo_pointInPolygon(rotatedClipStart, polygon);
                                segments.length ? (polygonStarted || (listener.polygonStart(), polygonStarted = !0), d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, listener)) : clipStartInside && (polygonStarted || (listener.polygonStart(), polygonStarted = !0), listener.lineStart(), interpolate(null, null, 1, listener), listener.lineEnd()), polygonStarted && (listener.polygonEnd(), polygonStarted = !1), segments = polygon = null
                            },
                            sphere: function() {
                                listener.polygonStart(), listener.lineStart(), interpolate(null, null, 1, listener), listener.lineEnd(), listener.polygonEnd()
                            }
                        },
                        buffer = d3_geo_clipBufferListener(),
                        ringListener = clipLine(buffer),
                        polygonStarted = !1;
                    return clip
                }
            }

            function d3_geo_clipSegmentLength1(segment) {
                return segment.length > 1
            }

            function d3_geo_clipBufferListener() {
                var line, lines = [];
                return {
                    lineStart: function() {
                        lines.push(line = [])
                    },
                    point: function(λ, φ) {
                        line.push([λ, φ])
                    },
                    lineEnd: d3_noop,
                    buffer: function() {
                        var buffer = lines;
                        return lines = [], line = null, buffer
                    },
                    rejoin: function() {
                        lines.length > 1 && lines.push(lines.pop().concat(lines.shift()))
                    }
                }
            }

            function d3_geo_clipSort(a, b) {
                return ((a = a.x)[0] < 0 ? a[1] - halfπ - ε : halfπ - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfπ - ε : halfπ - b[1])
            }

            function d3_geo_clipAntimeridianLine(listener) {
                var clean, λ0 = NaN,
                    φ0 = NaN,
                    sλ0 = NaN;
                return {
                    lineStart: function() {
                        listener.lineStart(), clean = 1
                    },
                    point: function(λ1, φ1) {
                        var sλ1 = λ1 > 0 ? π : -π,
                            dλ = abs(λ1 - λ0);
                        abs(dλ - π) < ε ? (listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? halfπ : -halfπ), listener.point(sλ0, φ0), listener.lineEnd(), listener.lineStart(), listener.point(sλ1, φ0), listener.point(λ1, φ0), clean = 0) : sλ0 !== sλ1 && dλ >= π && (abs(λ0 - sλ0) < ε && (λ0 -= sλ0 * ε), abs(λ1 - sλ1) < ε && (λ1 -= sλ1 * ε), φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1), listener.point(sλ0, φ0), listener.lineEnd(), listener.lineStart(), listener.point(sλ1, φ0), clean = 0), listener.point(λ0 = λ1, φ0 = φ1), sλ0 = sλ1
                    },
                    lineEnd: function() {
                        listener.lineEnd(), λ0 = φ0 = NaN
                    },
                    clean: function() {
                        return 2 - clean
                    }
                }
            }

            function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
                var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
                return abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2
            }

            function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
                var φ;
                if (null == from) φ = direction * halfπ, listener.point(-π, φ), listener.point(0, φ), listener.point(π, φ), listener.point(π, 0), listener.point(π, -φ), listener.point(0, -φ), listener.point(-π, -φ), listener.point(-π, 0), listener.point(-π, φ);
                else if (abs(from[0] - to[0]) > ε) {
                    var s = from[0] < to[0] ? π : -π;
                    φ = direction * s / 2, listener.point(-s, φ), listener.point(0, φ), listener.point(s, φ)
                } else listener.point(to[0], to[1])
            }

            function d3_geo_pointInPolygon(point, polygon) {
                var meridian = point[0],
                    parallel = point[1],
                    meridianNormal = [Math.sin(meridian), -Math.cos(meridian), 0],
                    polarAngle = 0,
                    winding = 0;
                d3_geo_areaRingSum.reset();
                for (var i = 0, n = polygon.length; i < n; ++i) {
                    var ring = polygon[i],
                        m = ring.length;
                    if (m)
                        for (var point0 = ring[0], λ0 = point0[0], φ0 = point0[1] / 2 + π / 4, sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), j = 1;;) {
                            j === m && (j = 0), point = ring[j];
                            var λ = point[0],
                                φ = point[1] / 2 + π / 4,
                                sinφ = Math.sin(φ),
                                cosφ = Math.cos(φ),
                                dλ = λ - λ0,
                                sdλ = dλ >= 0 ? 1 : -1,
                                adλ = sdλ * dλ,
                                antimeridian = adλ > π,
                                k = sinφ0 * sinφ;
                            if (d3_geo_areaRingSum.add(Math.atan2(k * sdλ * Math.sin(adλ), cosφ0 * cosφ + k * Math.cos(adλ))), polarAngle += antimeridian ? dλ + sdλ * τ : dλ, antimeridian ^ λ0 >= meridian ^ λ >= meridian) {
                                var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
                                d3_geo_cartesianNormalize(arc);
                                var intersection = d3_geo_cartesianCross(meridianNormal, arc);
                                d3_geo_cartesianNormalize(intersection);
                                var φarc = (antimeridian ^ dλ >= 0 ? -1 : 1) * d3_asin(intersection[2]);
                                (parallel > φarc || parallel === φarc && (arc[0] || arc[1])) && (winding += antimeridian ^ dλ >= 0 ? 1 : -1)
                            }
                            if (!j++) break;
                            λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ, point0 = point
                        }
                }
                return (polarAngle < -ε || polarAngle < ε && d3_geo_areaRingSum < -ε) ^ 1 & winding
            }

            function d3_geo_clipCircle(radius) {
                function visible(λ, φ) {
                    return Math.cos(λ) * Math.cos(φ) > cr
                }

                function clipLine(listener) {
                    var point0, c0, v0, v00, clean;
                    return {
                        lineStart: function() {
                            v00 = v0 = !1, clean = 1
                        },
                        point: function(λ, φ) {
                            var point2, point1 = [λ, φ],
                                v = visible(λ, φ),
                                c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
                            if (!point0 && (v00 = v0 = v) && listener.lineStart(), v !== v0 && (point2 = intersect(point0, point1), (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) && (point1[0] += ε, point1[1] += ε, v = visible(point1[0], point1[1]))), v !== v0) clean = 0, v ? (listener.lineStart(), point2 = intersect(point1, point0), listener.point(point2[0], point2[1])) : (point2 = intersect(point0, point1), listener.point(point2[0], point2[1]), listener.lineEnd()), point0 = point2;
                            else if (notHemisphere && point0 && smallRadius ^ v) {
                                var t;
                                c & c0 || !(t = intersect(point1, point0, !0)) || (clean = 0, smallRadius ? (listener.lineStart(), listener.point(t[0][0], t[0][1]), listener.point(t[1][0], t[1][1]), listener.lineEnd()) : (listener.point(t[1][0], t[1][1]), listener.lineEnd(), listener.lineStart(), listener.point(t[0][0], t[0][1])))
                            }!v || point0 && d3_geo_sphericalEqual(point0, point1) || listener.point(point1[0], point1[1]), point0 = point1, v0 = v, c0 = c
                        },
                        lineEnd: function() {
                            v0 && listener.lineEnd(), point0 = null
                        },
                        clean: function() {
                            return clean | (v00 && v0) << 1
                        }
                    }
                }

                function intersect(a, b, two) {
                    var pa = d3_geo_cartesian(a),
                        pb = d3_geo_cartesian(b),
                        n1 = [1, 0, 0],
                        n2 = d3_geo_cartesianCross(pa, pb),
                        n2n2 = d3_geo_cartesianDot(n2, n2),
                        n1n2 = n2[0],
                        determinant = n2n2 - n1n2 * n1n2;
                    if (!determinant) return !two && a;
                    var c1 = cr * n2n2 / determinant,
                        c2 = -cr * n1n2 / determinant,
                        n1xn2 = d3_geo_cartesianCross(n1, n2),
                        A = d3_geo_cartesianScale(n1, c1);
                    d3_geo_cartesianAdd(A, d3_geo_cartesianScale(n2, c2));
                    var u = n1xn2,
                        w = d3_geo_cartesianDot(A, u),
                        uu = d3_geo_cartesianDot(u, u),
                        t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
                    if (!(t2 < 0)) {
                        var t = Math.sqrt(t2),
                            q = d3_geo_cartesianScale(u, (-w - t) / uu);
                        if (d3_geo_cartesianAdd(q, A), q = d3_geo_spherical(q), !two) return q;
                        var z, λ0 = a[0],
                            λ1 = b[0],
                            φ0 = a[1],
                            φ1 = b[1];
                        λ1 < λ0 && (z = λ0, λ0 = λ1, λ1 = z);
                        var δλ = λ1 - λ0,
                            polar = abs(δλ - π) < ε,
                            meridian = polar || δλ < ε;
                        if (!polar && φ1 < φ0 && (z = φ0, φ0 = φ1, φ1 = z), meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
                            var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
                            return d3_geo_cartesianAdd(q1, A), [q, d3_geo_spherical(q1)]
                        }
                    }
                }

                function code(λ, φ) {
                    var r = smallRadius ? radius : π - radius,
                        code = 0;
                    return λ < -r ? code |= 1 : λ > r && (code |= 2), φ < -r ? code |= 4 : φ > r && (code |= 8), code
                }
                var cr = Math.cos(radius),
                    smallRadius = cr > 0,
                    notHemisphere = abs(cr) > ε;
                return d3_geo_clip(visible, clipLine, d3_geo_circleInterpolate(radius, 6 * d3_radians), smallRadius ? [0, -radius] : [-π, radius - π])
            }

            function d3_geom_clipLine(x0, y0, x1, y1) {
                return function(line) {
                    var r, a = line.a,
                        b = line.b,
                        ax = a.x,
                        ay = a.y,
                        bx = b.x,
                        by = b.y,
                        t0 = 0,
                        t1 = 1,
                        dx = bx - ax,
                        dy = by - ay;
                    if (r = x0 - ax, dx || !(r > 0)) {
                        if (r /= dx, dx < 0) {
                            if (r < t0) return;
                            r < t1 && (t1 = r)
                        } else if (dx > 0) {
                            if (r > t1) return;
                            r > t0 && (t0 = r)
                        }
                        if (r = x1 - ax, dx || !(r < 0)) {
                            if (r /= dx, dx < 0) {
                                if (r > t1) return;
                                r > t0 && (t0 = r)
                            } else if (dx > 0) {
                                if (r < t0) return;
                                r < t1 && (t1 = r)
                            }
                            if (r = y0 - ay, dy || !(r > 0)) {
                                if (r /= dy, dy < 0) {
                                    if (r < t0) return;
                                    r < t1 && (t1 = r)
                                } else if (dy > 0) {
                                    if (r > t1) return;
                                    r > t0 && (t0 = r)
                                }
                                if (r = y1 - ay, dy || !(r < 0)) {
                                    if (r /= dy, dy < 0) {
                                        if (r > t1) return;
                                        r > t0 && (t0 = r)
                                    } else if (dy > 0) {
                                        if (r < t0) return;
                                        r < t1 && (t1 = r)
                                    }
                                    return t0 > 0 && (line.a = {
                                        x: ax + t0 * dx,
                                        y: ay + t0 * dy
                                    }), t1 < 1 && (line.b = {
                                        x: ax + t1 * dx,
                                        y: ay + t1 * dy
                                    }), line
                                }
                            }
                        }
                    }
                }
            }

            function d3_geo_clipExtent(x0, y0, x1, y1) {
                function corner(p, direction) {
                    return abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2
                }

                function compare(a, b) {
                    return comparePoints(a.x, b.x)
                }

                function comparePoints(a, b) {
                    var ca = corner(a, 1),
                        cb = corner(b, 1);
                    return ca !== cb ? ca - cb : 0 === ca ? b[1] - a[1] : 1 === ca ? a[0] - b[0] : 2 === ca ? a[1] - b[1] : b[0] - a[0]
                }
                return function(listener) {
                    function insidePolygon(p) {
                        for (var wn = 0, n = polygon.length, y = p[1], i = 0; i < n; ++i)
                            for (var b, j = 1, v = polygon[i], m = v.length, a = v[0]; j < m; ++j) b = v[j], a[1] <= y ? b[1] > y && d3_cross2d(a, b, p) > 0 && ++wn : b[1] <= y && d3_cross2d(a, b, p) < 0 && --wn, a = b;
                        return 0 !== wn
                    }

                    function interpolate(from, to, direction, listener) {
                        var a = 0,
                            a1 = 0;
                        if (null == from || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0)
                            do {
                                listener.point(0 === a || 3 === a ? x0 : x1, a > 1 ? y1 : y0)
                            } while ((a = (a + direction + 4) % 4) !== a1);
                        else listener.point(to[0], to[1])
                    }

                    function pointVisible(x, y) {
                        return x0 <= x && x <= x1 && y0 <= y && y <= y1
                    }

                    function point(x, y) {
                        pointVisible(x, y) && listener.point(x, y)
                    }

                    function lineStart() {
                        clip.point = linePoint, polygon && polygon.push(ring = []), first = !0, v_ = !1, x_ = y_ = NaN
                    }

                    function lineEnd() {
                        segments && (linePoint(x__, y__), v__ && v_ && bufferListener.rejoin(), segments.push(bufferListener.buffer())), clip.point = point, v_ && listener.lineEnd()
                    }

                    function linePoint(x, y) {
                        x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x)), y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
                        var v = pointVisible(x, y);
                        if (polygon && ring.push([x, y]), first) x__ = x, y__ = y, v__ = v, first = !1, v && (listener.lineStart(), listener.point(x, y));
                        else if (v && v_) listener.point(x, y);
                        else {
                            var l = {
                                a: {
                                    x: x_,
                                    y: y_
                                },
                                b: {
                                    x: x,
                                    y: y
                                }
                            };
                            clipLine(l) ? (v_ || (listener.lineStart(), listener.point(l.a.x, l.a.y)), listener.point(l.b.x, l.b.y), v || listener.lineEnd(), clean = !1) : v && (listener.lineStart(), listener.point(x, y), clean = !1)
                        }
                        x_ = x, y_ = y, v_ = v
                    }
                    var segments, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean, listener_ = listener,
                        bufferListener = d3_geo_clipBufferListener(),
                        clipLine = d3_geom_clipLine(x0, y0, x1, y1),
                        clip = {
                            point: point,
                            lineStart: lineStart,
                            lineEnd: lineEnd,
                            polygonStart: function() {
                                listener = bufferListener, segments = [], polygon = [], clean = !0
                            },
                            polygonEnd: function() {
                                listener = listener_, segments = d3.merge(segments);
                                var clipStartInside = insidePolygon([x0, y1]),
                                    inside = clean && clipStartInside,
                                    visible = segments.length;
                                (inside || visible) && (listener.polygonStart(), inside && (listener.lineStart(), interpolate(null, null, 1, listener), listener.lineEnd()), visible && d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener), listener.polygonEnd()), segments = polygon = ring = null
                            }
                        };
                    return clip
                }
            }

            function d3_geo_conic(projectAt) {
                var φ0 = 0,
                    φ1 = π / 3,
                    m = d3_geo_projectionMutator(projectAt),
                    p = m(φ0, φ1);
                return p.parallels = function(_) {
                    return arguments.length ? m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180) : [φ0 / π * 180, φ1 / π * 180]
                }, p
            }

            function d3_geo_conicEqualArea(φ0, φ1) {
                function forward(λ, φ) {
                    var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
                    return [ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ)]
                }
                var sinφ0 = Math.sin(φ0),
                    n = (sinφ0 + Math.sin(φ1)) / 2,
                    C = 1 + sinφ0 * (2 * n - sinφ0),
                    ρ0 = Math.sqrt(C) / n;
                return forward.invert = function(x, y) {
                    var ρ0_y = ρ0 - y;
                    return [Math.atan2(x, ρ0_y) / n, d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n))]
                }, forward
            }

            function d3_geo_pathAreaRingStart() {
                function nextPoint(x, y) {
                    d3_geo_pathAreaPolygon += y0 * x - x0 * y, x0 = x, y0 = y
                }
                var x00, y00, x0, y0;
                d3_geo_pathArea.point = function(x, y) {
                    d3_geo_pathArea.point = nextPoint, x00 = x0 = x, y00 = y0 = y
                }, d3_geo_pathArea.lineEnd = function() {
                    nextPoint(x00, y00)
                }
            }

            function d3_geo_pathBoundsPoint(x, y) {
                x < d3_geo_pathBoundsX0 && (d3_geo_pathBoundsX0 = x), x > d3_geo_pathBoundsX1 && (d3_geo_pathBoundsX1 = x), y < d3_geo_pathBoundsY0 && (d3_geo_pathBoundsY0 = y), y > d3_geo_pathBoundsY1 && (d3_geo_pathBoundsY1 = y)
            }

            function d3_geo_pathBuffer() {
                function point(x, y) {
                    buffer.push("M", x, ",", y, pointCircle)
                }

                function pointLineStart(x, y) {
                    buffer.push("M", x, ",", y), stream.point = pointLine
                }

                function pointLine(x, y) {
                    buffer.push("L", x, ",", y)
                }

                function lineEnd() {
                    stream.point = point
                }

                function lineEndPolygon() {
                    buffer.push("Z")
                }
                var pointCircle = d3_geo_pathBufferCircle(4.5),
                    buffer = [],
                    stream = {
                        point: point,
                        lineStart: function() {
                            stream.point = pointLineStart
                        },
                        lineEnd: lineEnd,
                        polygonStart: function() {
                            stream.lineEnd = lineEndPolygon
                        },
                        polygonEnd: function() {
                            stream.lineEnd = lineEnd, stream.point = point
                        },
                        pointRadius: function(_) {
                            return pointCircle = d3_geo_pathBufferCircle(_), stream
                        },
                        result: function() {
                            if (buffer.length) {
                                var result = buffer.join("");
                                return buffer = [], result
                            }
                        }
                    };
                return stream
            }

            function d3_geo_pathBufferCircle(radius) {
                return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z"
            }

            function d3_geo_pathCentroidPoint(x, y) {
                d3_geo_centroidX0 += x, d3_geo_centroidY0 += y, ++d3_geo_centroidZ0
            }

            function d3_geo_pathCentroidLineStart() {
                function nextPoint(x, y) {
                    var dx = x - x0,
                        dy = y - y0,
                        z = Math.sqrt(dx * dx + dy * dy);
                    d3_geo_centroidX1 += z * (x0 + x) / 2, d3_geo_centroidY1 += z * (y0 + y) / 2, d3_geo_centroidZ1 += z, d3_geo_pathCentroidPoint(x0 = x, y0 = y)
                }
                var x0, y0;
                d3_geo_pathCentroid.point = function(x, y) {
                    d3_geo_pathCentroid.point = nextPoint, d3_geo_pathCentroidPoint(x0 = x, y0 = y)
                }
            }

            function d3_geo_pathCentroidLineEnd() {
                d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint
            }

            function d3_geo_pathCentroidRingStart() {
                function nextPoint(x, y) {
                    var dx = x - x0,
                        dy = y - y0,
                        z = Math.sqrt(dx * dx + dy * dy);
                    d3_geo_centroidX1 += z * (x0 + x) / 2, d3_geo_centroidY1 += z * (y0 + y) / 2, d3_geo_centroidZ1 += z, z = y0 * x - x0 * y, d3_geo_centroidX2 += z * (x0 + x), d3_geo_centroidY2 += z * (y0 + y), d3_geo_centroidZ2 += 3 * z, d3_geo_pathCentroidPoint(x0 = x, y0 = y)
                }
                var x00, y00, x0, y0;
                d3_geo_pathCentroid.point = function(x, y) {
                    d3_geo_pathCentroid.point = nextPoint, d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y)
                }, d3_geo_pathCentroid.lineEnd = function() {
                    nextPoint(x00, y00)
                }
            }

            function d3_geo_pathContext(context) {
                function point(x, y) {
                    context.moveTo(x + pointRadius, y), context.arc(x, y, pointRadius, 0, τ)
                }

                function pointLineStart(x, y) {
                    context.moveTo(x, y), stream.point = pointLine
                }

                function pointLine(x, y) {
                    context.lineTo(x, y)
                }

                function lineEnd() {
                    stream.point = point
                }

                function lineEndPolygon() {
                    context.closePath()
                }
                var pointRadius = 4.5,
                    stream = {
                        point: point,
                        lineStart: function() {
                            stream.point = pointLineStart
                        },
                        lineEnd: lineEnd,
                        polygonStart: function() {
                            stream.lineEnd = lineEndPolygon
                        },
                        polygonEnd: function() {
                            stream.lineEnd = lineEnd, stream.point = point
                        },
                        pointRadius: function(_) {
                            return pointRadius = _, stream
                        },
                        result: d3_noop
                    };
                return stream
            }

            function d3_geo_resample(project) {
                function resample(stream) {
                    return (maxDepth ? resampleRecursive : resampleNone)(stream)
                }

                function resampleNone(stream) {
                    return d3_geo_transformPoint(stream, function(x, y) {
                        x = project(x, y), stream.point(x[0], x[1])
                    })
                }

                function resampleRecursive(stream) {
                    function point(x, y) {
                        x = project(x, y), stream.point(x[0], x[1])
                    }

                    function lineStart() {
                        x0 = NaN, resample.point = linePoint, stream.lineStart()
                    }

                    function linePoint(λ, φ) {
                        var c = d3_geo_cartesian([λ, φ]),
                            p = project(λ, φ);
                        resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream), stream.point(x0, y0)
                    }

                    function lineEnd() {
                        resample.point = point, stream.lineEnd()
                    }

                    function ringStart() {
                        lineStart(), resample.point = ringPoint, resample.lineEnd = ringEnd
                    }

                    function ringPoint(λ, φ) {
                        linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0, resample.point = linePoint
                    }

                    function ringEnd() {
                        resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream), resample.lineEnd = lineEnd, lineEnd()
                    }
                    var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0, resample = {
                        point: point,
                        lineStart: lineStart,
                        lineEnd: lineEnd,
                        polygonStart: function() {
                            stream.polygonStart(), resample.lineStart = ringStart
                        },
                        polygonEnd: function() {
                            stream.polygonEnd(), resample.lineStart = lineStart
                        }
                    };
                    return resample
                }

                function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
                    var dx = x1 - x0,
                        dy = y1 - y0,
                        d2 = dx * dx + dy * dy;
                    if (d2 > 4 * δ2 && depth--) {
                        var a = a0 + a1,
                            b = b0 + b1,
                            c = c0 + c1,
                            m = Math.sqrt(a * a + b * b + c * c),
                            φ2 = Math.asin(c /= m),
                            λ2 = abs(abs(c) - 1) < ε || abs(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a),
                            p = project(λ2, φ2),
                            x2 = p[0],
                            y2 = p[1],
                            dx2 = x2 - x0,
                            dy2 = y2 - y0,
                            dz = dy * dx2 - dx * dy2;
                        (dz * dz / d2 > δ2 || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) && (resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream), stream.point(x2, y2), resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream))
                    }
                }
                var δ2 = .5,
                    cosMinDistance = Math.cos(30 * d3_radians),
                    maxDepth = 16;
                return resample.precision = function(_) {
                    return arguments.length ? (maxDepth = (δ2 = _ * _) > 0 && 16, resample) : Math.sqrt(δ2)
                }, resample
            }

            function d3_geo_pathProjectStream(project) {
                var resample = d3_geo_resample(function(x, y) {
                    return project([x * d3_degrees, y * d3_degrees])
                });
                return function(stream) {
                    return d3_geo_projectionRadians(resample(stream))
                }
            }

            function d3_geo_transform(stream) {
                this.stream = stream
            }

            function d3_geo_transformPoint(stream, point) {
                return {
                    point: point,
                    sphere: function() {
                        stream.sphere()
                    },
                    lineStart: function() {
                        stream.lineStart()
                    },
                    lineEnd: function() {
                        stream.lineEnd()
                    },
                    polygonStart: function() {
                        stream.polygonStart()
                    },
                    polygonEnd: function() {
                        stream.polygonEnd()
                    }
                }
            }

            function d3_geo_projection(project) {
                return d3_geo_projectionMutator(function() {
                    return project
                })()
            }

            function d3_geo_projectionMutator(projectAt) {
                function projection(point) {
                    return point = projectRotate(point[0] * d3_radians, point[1] * d3_radians), [point[0] * k + δx, δy - point[1] * k]
                }

                function invert(point) {
                    return (point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k)) && [point[0] * d3_degrees, point[1] * d3_degrees]
                }

                function reset() {
                    projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
                    var center = project(λ, φ);
                    return δx = x - center[0] * k, δy = y + center[1] * k, invalidate()
                }

                function invalidate() {
                    return stream && (stream.valid = !1, stream = null), projection
                }
                var project, rotate, projectRotate, δx, δy, stream, projectResample = d3_geo_resample(function(x, y) {
                        return x = project(x, y), [x[0] * k + δx, δy - x[1] * k]
                    }),
                    k = 150,
                    x = 480,
                    y = 250,
                    λ = 0,
                    φ = 0,
                    δλ = 0,
                    δφ = 0,
                    δγ = 0,
                    preclip = d3_geo_clipAntimeridian,
                    postclip = d3_identity,
                    clipAngle = null,
                    clipExtent = null;
                return projection.stream = function(output) {
                        return stream && (stream.valid = !1), stream = d3_geo_projectionRadians(preclip(rotate, projectResample(postclip(output)))), stream.valid = !0, stream
                    }, projection.clipAngle = function(_) {
                        return arguments.length ? (preclip = null == _ ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians), invalidate()) : clipAngle
                    }, projection.clipExtent = function(_) {
                        return arguments.length ? (clipExtent = _, postclip = _ ? d3_geo_clipExtent(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity, invalidate()) : clipExtent
                    }, projection.scale = function(_) {
                        return arguments.length ? (k = +_, reset()) : k
                    }, projection.translate = function(_) {
                        return arguments.length ? (x = +_[0], y = +_[1], reset()) : [x, y]
                    }, projection.center = function(_) {
                        return arguments.length ? (λ = _[0] % 360 * d3_radians, φ = _[1] % 360 * d3_radians, reset()) : [λ * d3_degrees, φ * d3_degrees]
                    }, projection.rotate = function(_) {
                        return arguments.length ? (δλ = _[0] % 360 * d3_radians, δφ = _[1] % 360 * d3_radians, δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0, reset()) : [δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees]
                    }, d3.rebind(projection, projectResample, "precision"),
                    function() {
                        return project = projectAt.apply(this, arguments), projection.invert = project.invert && invert, reset()
                    }
            }

            function d3_geo_projectionRadians(stream) {
                return d3_geo_transformPoint(stream, function(x, y) {
                    stream.point(x * d3_radians, y * d3_radians)
                })
            }

            function d3_geo_equirectangular(λ, φ) {
                return [λ, φ]
            }

            function d3_geo_identityRotation(λ, φ) {
                return [λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ]
            }

            function d3_geo_rotation(δλ, δφ, δγ) {
                return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_identityRotation
            }

            function d3_geo_forwardRotationλ(δλ) {
                return function(λ, φ) {
                    return λ += δλ, [λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ]
                }
            }

            function d3_geo_rotationλ(δλ) {
                var rotation = d3_geo_forwardRotationλ(δλ);
                return rotation.invert = d3_geo_forwardRotationλ(-δλ), rotation
            }

            function d3_geo_rotationφγ(δφ, δγ) {
                function rotation(λ, φ) {
                    var cosφ = Math.cos(φ),
                        x = Math.cos(λ) * cosφ,
                        y = Math.sin(λ) * cosφ,
                        z = Math.sin(φ),
                        k = z * cosδφ + x * sinδφ;
                    return [Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ)]
                }
                var cosδφ = Math.cos(δφ),
                    sinδφ = Math.sin(δφ),
                    cosδγ = Math.cos(δγ),
                    sinδγ = Math.sin(δγ);
                return rotation.invert = function(λ, φ) {
                    var cosφ = Math.cos(φ),
                        x = Math.cos(λ) * cosφ,
                        y = Math.sin(λ) * cosφ,
                        z = Math.sin(φ),
                        k = z * cosδγ - y * sinδγ;
                    return [Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), d3_asin(k * cosδφ - x * sinδφ)]
                }, rotation
            }

            function d3_geo_circleInterpolate(radius, precision) {
                var cr = Math.cos(radius),
                    sr = Math.sin(radius);
                return function(from, to, direction, listener) {
                    var step = direction * precision;
                    null != from ? (from = d3_geo_circleAngle(cr, from), to = d3_geo_circleAngle(cr, to), (direction > 0 ? from < to : from > to) && (from += direction * τ)) : (from = radius + direction * τ, to = radius - .5 * step);
                    for (var point, t = from; direction > 0 ? t > to : t < to; t -= step) listener.point((point = d3_geo_spherical([cr, -sr * Math.cos(t), -sr * Math.sin(t)]))[0], point[1])
                }
            }

            function d3_geo_circleAngle(cr, point) {
                var a = d3_geo_cartesian(point);
                a[0] -= cr, d3_geo_cartesianNormalize(a);
                var angle = d3_acos(-a[1]);
                return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI)
            }

            function d3_geo_graticuleX(y0, y1, dy) {
                var y = d3.range(y0, y1 - ε, dy).concat(y1);
                return function(x) {
                    return y.map(function(y) {
                        return [x, y]
                    })
                }
            }

            function d3_geo_graticuleY(x0, x1, dx) {
                var x = d3.range(x0, x1 - ε, dx).concat(x1);
                return function(y) {
                    return x.map(function(x) {
                        return [x, y]
                    })
                }
            }

            function d3_source(d) {
                return d.source
            }

            function d3_target(d) {
                return d.target
            }

            function d3_geo_interpolate(x0, y0, x1, y1) {
                var cy0 = Math.cos(y0),
                    sy0 = Math.sin(y0),
                    cy1 = Math.cos(y1),
                    sy1 = Math.sin(y1),
                    kx0 = cy0 * Math.cos(x0),
                    ky0 = cy0 * Math.sin(x0),
                    kx1 = cy1 * Math.cos(x1),
                    ky1 = cy1 * Math.sin(x1),
                    d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))),
                    k = 1 / Math.sin(d),
                    interpolate = d ? function(t) {
                        var B = Math.sin(t *= d) * k,
                            A = Math.sin(d - t) * k,
                            x = A * kx0 + B * kx1,
                            y = A * ky0 + B * ky1,
                            z = A * sy0 + B * sy1;
                        return [Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees]
                    } : function() {
                        return [x0 * d3_degrees, y0 * d3_degrees]
                    };
                return interpolate.distance = d, interpolate
            }

            function d3_geo_lengthLineStart() {
                function nextPoint(λ, φ) {
                    var sinφ = Math.sin(φ *= d3_radians),
                        cosφ = Math.cos(φ),
                        t = abs((λ *= d3_radians) - λ0),
                        cosΔλ = Math.cos(t);
                    d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ), λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ
                }
                var λ0, sinφ0, cosφ0;
                d3_geo_length.point = function(λ, φ) {
                    λ0 = λ * d3_radians, sinφ0 = Math.sin(φ *= d3_radians), cosφ0 = Math.cos(φ), d3_geo_length.point = nextPoint
                }, d3_geo_length.lineEnd = function() {
                    d3_geo_length.point = d3_geo_length.lineEnd = d3_noop
                }
            }

            function d3_geo_azimuthal(scale, angle) {
                function azimuthal(λ, φ) {
                    var cosλ = Math.cos(λ),
                        cosφ = Math.cos(φ),
                        k = scale(cosλ * cosφ);
                    return [k * cosφ * Math.sin(λ), k * Math.sin(φ)]
                }
                return azimuthal.invert = function(x, y) {
                    var ρ = Math.sqrt(x * x + y * y),
                        c = angle(ρ),
                        sinc = Math.sin(c),
                        cosc = Math.cos(c);
                    return [Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ)]
                }, azimuthal
            }

            function d3_geo_conicConformal(φ0, φ1) {
                function forward(λ, φ) {
                    F > 0 ? φ < -halfπ + ε && (φ = -halfπ + ε) : φ > halfπ - ε && (φ = halfπ - ε);
                    var ρ = F / Math.pow(t(φ), n);
                    return [ρ * Math.sin(n * λ), F - ρ * Math.cos(n * λ)]
                }
                var cosφ0 = Math.cos(φ0),
                    t = function(φ) {
                        return Math.tan(π / 4 + φ / 2)
                    },
                    n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)),
                    F = cosφ0 * Math.pow(t(φ0), n) / n;
                return n ? (forward.invert = function(x, y) {
                    var ρ0_y = F - y,
                        ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
                    return [Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ, 1 / n)) - halfπ]
                }, forward) : d3_geo_mercator
            }

            function d3_geo_conicEquidistant(φ0, φ1) {
                function forward(λ, φ) {
                    var ρ = G - φ;
                    return [ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ)]
                }
                var cosφ0 = Math.cos(φ0),
                    n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0),
                    G = cosφ0 / n + φ0;
                return abs(n) < ε ? d3_geo_equirectangular : (forward.invert = function(x, y) {
                    var ρ0_y = G - y;
                    return [Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y)]
                }, forward)
            }

            function d3_geo_mercator(λ, φ) {
                return [λ, Math.log(Math.tan(π / 4 + φ / 2))]
            }

            function d3_geo_mercatorProjection(project) {
                var clipAuto, m = d3_geo_projection(project),
                    scale = m.scale,
                    translate = m.translate,
                    clipExtent = m.clipExtent;
                return m.scale = function() {
                    var v = scale.apply(m, arguments);
                    return v === m ? clipAuto ? m.clipExtent(null) : m : v
                }, m.translate = function() {
                    var v = translate.apply(m, arguments);
                    return v === m ? clipAuto ? m.clipExtent(null) : m : v
                }, m.clipExtent = function(_) {
                    var v = clipExtent.apply(m, arguments);
                    if (v === m) {
                        if (clipAuto = null == _) {
                            var k = π * scale(),
                                t = translate();
                            clipExtent([
                                [t[0] - k, t[1] - k],
                                [t[0] + k, t[1] + k]
                            ])
                        }
                    } else clipAuto && (v = null);
                    return v
                }, m.clipExtent(null)
            }

            function d3_geo_transverseMercator(λ, φ) {
                return [Math.log(Math.tan(π / 4 + φ / 2)), -λ]
            }

            function d3_geom_pointX(d) {
                return d[0]
            }

            function d3_geom_pointY(d) {
                return d[1]
            }

            function d3_geom_hullUpper(points) {
                for (var n = points.length, hull = [0, 1], hs = 2, i = 2; i < n; i++) {
                    for (; hs > 1 && d3_cross2d(points[hull[hs - 2]], points[hull[hs - 1]], points[i]) <= 0;) --hs;
                    hull[hs++] = i
                }
                return hull.slice(0, hs)
            }

            function d3_geom_hullOrder(a, b) {
                return a[0] - b[0] || a[1] - b[1]
            }

            function d3_geom_polygonInside(p, a, b) {
                return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0])
            }

            function d3_geom_polygonIntersect(c, d, a, b) {
                var x1 = c[0],
                    x3 = a[0],
                    x21 = d[0] - x1,
                    x43 = b[0] - x3,
                    y1 = c[1],
                    y3 = a[1],
                    y21 = d[1] - y1,
                    y43 = b[1] - y3,
                    ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
                return [x1 + ua * x21, y1 + ua * y21]
            }

            function d3_geom_polygonClosed(coordinates) {
                var a = coordinates[0],
                    b = coordinates[coordinates.length - 1];
                return !(a[0] - b[0] || a[1] - b[1])
            }

            function d3_geom_voronoiBeach() {
                d3_geom_voronoiRedBlackNode(this), this.edge = this.site = this.circle = null
            }

            function d3_geom_voronoiCreateBeach(site) {
                var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach;
                return beach.site = site, beach
            }

            function d3_geom_voronoiDetachBeach(beach) {
                d3_geom_voronoiDetachCircle(beach), d3_geom_voronoiBeaches.remove(beach), d3_geom_voronoiBeachPool.push(beach), d3_geom_voronoiRedBlackNode(beach)
            }

            function d3_geom_voronoiRemoveBeach(beach) {
                var circle = beach.circle,
                    x = circle.x,
                    y = circle.cy,
                    vertex = {
                        x: x,
                        y: y
                    },
                    previous = beach.P,
                    next = beach.N,
                    disappearing = [beach];
                d3_geom_voronoiDetachBeach(beach);
                for (var lArc = previous; lArc.circle && abs(x - lArc.circle.x) < ε && abs(y - lArc.circle.cy) < ε;) previous = lArc.P, disappearing.unshift(lArc), d3_geom_voronoiDetachBeach(lArc), lArc = previous;
                disappearing.unshift(lArc), d3_geom_voronoiDetachCircle(lArc);
                for (var rArc = next; rArc.circle && abs(x - rArc.circle.x) < ε && abs(y - rArc.circle.cy) < ε;) next = rArc.N, disappearing.push(rArc), d3_geom_voronoiDetachBeach(rArc), rArc = next;
                disappearing.push(rArc), d3_geom_voronoiDetachCircle(rArc);
                var iArc, nArcs = disappearing.length;
                for (iArc = 1; iArc < nArcs; ++iArc) rArc = disappearing[iArc], lArc = disappearing[iArc - 1],
                    d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
                lArc = disappearing[0], rArc = disappearing[nArcs - 1], rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex), d3_geom_voronoiAttachCircle(lArc), d3_geom_voronoiAttachCircle(rArc)
            }

            function d3_geom_voronoiAddBeach(site) {
                for (var lArc, rArc, dxl, dxr, x = site.x, directrix = site.y, node = d3_geom_voronoiBeaches._; node;)
                    if ((dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x) > ε) node = node.L;
                    else {
                        if (!((dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix)) > ε)) {
                            dxl > -ε ? (lArc = node.P, rArc = node) : dxr > -ε ? (lArc = node, rArc = node.N) : lArc = rArc = node;
                            break
                        }
                        if (!node.R) {
                            lArc = node;
                            break
                        }
                        node = node.R
                    } var newArc = d3_geom_voronoiCreateBeach(site);
                if (d3_geom_voronoiBeaches.insert(lArc, newArc), lArc || rArc) {
                    if (lArc === rArc) return d3_geom_voronoiDetachCircle(lArc), rArc = d3_geom_voronoiCreateBeach(lArc.site), d3_geom_voronoiBeaches.insert(newArc, rArc), newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site), d3_geom_voronoiAttachCircle(lArc), void d3_geom_voronoiAttachCircle(rArc);
                    if (!rArc) return void(newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site));
                    d3_geom_voronoiDetachCircle(lArc), d3_geom_voronoiDetachCircle(rArc);
                    var lSite = lArc.site,
                        ax = lSite.x,
                        ay = lSite.y,
                        bx = site.x - ax,
                        by = site.y - ay,
                        rSite = rArc.site,
                        cx = rSite.x - ax,
                        cy = rSite.y - ay,
                        d = 2 * (bx * cy - by * cx),
                        hb = bx * bx + by * by,
                        hc = cx * cx + cy * cy,
                        vertex = {
                            x: (cy * hb - by * hc) / d + ax,
                            y: (bx * hc - cx * hb) / d + ay
                        };
                    d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex), newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex), rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex), d3_geom_voronoiAttachCircle(lArc), d3_geom_voronoiAttachCircle(rArc)
                }
            }

            function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
                var site = arc.site,
                    rfocx = site.x,
                    rfocy = site.y,
                    pby2 = rfocy - directrix;
                if (!pby2) return rfocx;
                var lArc = arc.P;
                if (!lArc) return -1 / 0;
                site = lArc.site;
                var lfocx = site.x,
                    lfocy = site.y,
                    plby2 = lfocy - directrix;
                if (!plby2) return lfocx;
                var hl = lfocx - rfocx,
                    aby2 = 1 / pby2 - 1 / plby2,
                    b = hl / plby2;
                return aby2 ? (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx : (rfocx + lfocx) / 2
            }

            function d3_geom_voronoiRightBreakPoint(arc, directrix) {
                var rArc = arc.N;
                if (rArc) return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
                var site = arc.site;
                return site.y === directrix ? site.x : 1 / 0
            }

            function d3_geom_voronoiCell(site) {
                this.site = site, this.edges = []
            }

            function d3_geom_voronoiCloseCells(extent) {
                for (var x2, y2, x3, y3, cell, iHalfEdge, halfEdges, nHalfEdges, start, end, x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], cells = d3_geom_voronoiCells, iCell = cells.length; iCell--;)
                    if ((cell = cells[iCell]) && cell.prepare())
                        for (halfEdges = cell.edges, nHalfEdges = halfEdges.length, iHalfEdge = 0; iHalfEdge < nHalfEdges;) end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y, start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y, (abs(x3 - x2) > ε || abs(y3 - y2) > ε) && (halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0) < ε && y1 - y3 > ε ? {
                            x: x0,
                            y: abs(x2 - x0) < ε ? y2 : y1
                        } : abs(y3 - y1) < ε && x1 - x3 > ε ? {
                            x: abs(y2 - y1) < ε ? x2 : x1,
                            y: y1
                        } : abs(x3 - x1) < ε && y3 - y0 > ε ? {
                            x: x1,
                            y: abs(x2 - x1) < ε ? y2 : y0
                        } : abs(y3 - y0) < ε && x3 - x0 > ε ? {
                            x: abs(y2 - y0) < ε ? x2 : x0,
                            y: y0
                        } : null), cell.site, null)), ++nHalfEdges)
            }

            function d3_geom_voronoiHalfEdgeOrder(a, b) {
                return b.angle - a.angle
            }

            function d3_geom_voronoiCircle() {
                d3_geom_voronoiRedBlackNode(this), this.x = this.y = this.arc = this.site = this.cy = null
            }

            function d3_geom_voronoiAttachCircle(arc) {
                var lArc = arc.P,
                    rArc = arc.N;
                if (lArc && rArc) {
                    var lSite = lArc.site,
                        cSite = arc.site,
                        rSite = rArc.site;
                    if (lSite !== rSite) {
                        var bx = cSite.x,
                            by = cSite.y,
                            ax = lSite.x - bx,
                            ay = lSite.y - by,
                            cx = rSite.x - bx,
                            cy = rSite.y - by,
                            d = 2 * (ax * cy - ay * cx);
                        if (!(d >= -ε2)) {
                            var ha = ax * ax + ay * ay,
                                hc = cx * cx + cy * cy,
                                x = (cy * ha - ay * hc) / d,
                                y = (ax * hc - cx * ha) / d,
                                cy = y + by,
                                circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle;
                            circle.arc = arc, circle.site = cSite, circle.x = x + bx, circle.y = cy + Math.sqrt(x * x + y * y), circle.cy = cy, arc.circle = circle;
                            for (var before = null, node = d3_geom_voronoiCircles._; node;)
                                if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
                                    if (!node.L) {
                                        before = node.P;
                                        break
                                    }
                                    node = node.L
                                } else {
                                    if (!node.R) {
                                        before = node;
                                        break
                                    }
                                    node = node.R
                                } d3_geom_voronoiCircles.insert(before, circle), before || (d3_geom_voronoiFirstCircle = circle)
                        }
                    }
                }
            }

            function d3_geom_voronoiDetachCircle(arc) {
                var circle = arc.circle;
                circle && (circle.P || (d3_geom_voronoiFirstCircle = circle.N), d3_geom_voronoiCircles.remove(circle), d3_geom_voronoiCirclePool.push(circle), d3_geom_voronoiRedBlackNode(circle), arc.circle = null)
            }

            function d3_geom_voronoiClipEdges(extent) {
                for (var e, edges = d3_geom_voronoiEdges, clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]), i = edges.length; i--;) e = edges[i], (!d3_geom_voronoiConnectEdge(e, extent) || !clip(e) || abs(e.a.x - e.b.x) < ε && abs(e.a.y - e.b.y) < ε) && (e.a = e.b = null, edges.splice(i, 1))
            }

            function d3_geom_voronoiConnectEdge(edge, extent) {
                var vb = edge.b;
                if (vb) return !0;
                var fm, fb, va = edge.a,
                    x0 = extent[0][0],
                    x1 = extent[1][0],
                    y0 = extent[0][1],
                    y1 = extent[1][1],
                    lSite = edge.l,
                    rSite = edge.r,
                    lx = lSite.x,
                    ly = lSite.y,
                    rx = rSite.x,
                    ry = rSite.y,
                    fx = (lx + rx) / 2,
                    fy = (ly + ry) / 2;
                if (ry === ly) {
                    if (fx < x0 || fx >= x1) return;
                    if (lx > rx) {
                        if (va) {
                            if (va.y >= y1) return
                        } else va = {
                            x: fx,
                            y: y0
                        };
                        vb = {
                            x: fx,
                            y: y1
                        }
                    } else {
                        if (va) {
                            if (va.y < y0) return
                        } else va = {
                            x: fx,
                            y: y1
                        };
                        vb = {
                            x: fx,
                            y: y0
                        }
                    }
                } else if (fm = (lx - rx) / (ry - ly), fb = fy - fm * fx, fm < -1 || fm > 1)
                    if (lx > rx) {
                        if (va) {
                            if (va.y >= y1) return
                        } else va = {
                            x: (y0 - fb) / fm,
                            y: y0
                        };
                        vb = {
                            x: (y1 - fb) / fm,
                            y: y1
                        }
                    } else {
                        if (va) {
                            if (va.y < y0) return
                        } else va = {
                            x: (y1 - fb) / fm,
                            y: y1
                        };
                        vb = {
                            x: (y0 - fb) / fm,
                            y: y0
                        }
                    }
                else if (ly < ry) {
                    if (va) {
                        if (va.x >= x1) return
                    } else va = {
                        x: x0,
                        y: fm * x0 + fb
                    };
                    vb = {
                        x: x1,
                        y: fm * x1 + fb
                    }
                } else {
                    if (va) {
                        if (va.x < x0) return
                    } else va = {
                        x: x1,
                        y: fm * x1 + fb
                    };
                    vb = {
                        x: x0,
                        y: fm * x0 + fb
                    }
                }
                return edge.a = va, edge.b = vb, !0
            }

            function d3_geom_voronoiEdge(lSite, rSite) {
                this.l = lSite, this.r = rSite, this.a = this.b = null
            }

            function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
                var edge = new d3_geom_voronoiEdge(lSite, rSite);
                return d3_geom_voronoiEdges.push(edge), va && d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va), vb && d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb), d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite)), d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite)), edge
            }

            function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
                var edge = new d3_geom_voronoiEdge(lSite, null);
                return edge.a = va, edge.b = vb, d3_geom_voronoiEdges.push(edge), edge
            }

            function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
                edge.a || edge.b ? edge.l === rSite ? edge.b = vertex : edge.a = vertex : (edge.a = vertex, edge.l = lSite, edge.r = rSite)
            }

            function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
                var va = edge.a,
                    vb = edge.b;
                this.edge = edge, this.site = lSite, this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x) : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y) : Math.atan2(va.x - vb.x, vb.y - va.y)
            }

            function d3_geom_voronoiRedBlackTree() {
                this._ = null
            }

            function d3_geom_voronoiRedBlackNode(node) {
                node.U = node.C = node.L = node.R = node.P = node.N = null
            }

            function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
                var p = node,
                    q = node.R,
                    parent = p.U;
                parent ? parent.L === p ? parent.L = q : parent.R = q : tree._ = q, q.U = parent, p.U = q, p.R = q.L, p.R && (p.R.U = p), q.L = p
            }

            function d3_geom_voronoiRedBlackRotateRight(tree, node) {
                var p = node,
                    q = node.L,
                    parent = p.U;
                parent ? parent.L === p ? parent.L = q : parent.R = q : tree._ = q, q.U = parent, p.U = q, p.L = q.R, p.L && (p.L.U = p), q.R = p
            }

            function d3_geom_voronoiRedBlackFirst(node) {
                for (; node.L;) node = node.L;
                return node
            }

            function d3_geom_voronoi(sites, bbox) {
                var x0, y0, circle, site = sites.sort(d3_geom_voronoiVertexOrder).pop();
                for (d3_geom_voronoiEdges = [], d3_geom_voronoiCells = new Array(sites.length), d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree, d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree;;)
                    if (circle = d3_geom_voronoiFirstCircle, site && (!circle || site.y < circle.y || site.y === circle.y && site.x < circle.x)) site.x === x0 && site.y === y0 || (d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site), d3_geom_voronoiAddBeach(site), x0 = site.x, y0 = site.y), site = sites.pop();
                    else {
                        if (!circle) break;
                        d3_geom_voronoiRemoveBeach(circle.arc)
                    } bbox && (d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox));
                var diagram = {
                    cells: d3_geom_voronoiCells,
                    edges: d3_geom_voronoiEdges
                };
                return d3_geom_voronoiBeaches = d3_geom_voronoiCircles = d3_geom_voronoiEdges = d3_geom_voronoiCells = null, diagram
            }

            function d3_geom_voronoiVertexOrder(a, b) {
                return b.y - a.y || b.x - a.x
            }

            function d3_geom_voronoiTriangleArea(a, b, c) {
                return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y)
            }

            function d3_geom_quadtreeCompatX(d) {
                return d.x
            }

            function d3_geom_quadtreeCompatY(d) {
                return d.y
            }

            function d3_geom_quadtreeNode() {
                return {
                    leaf: !0,
                    nodes: [],
                    point: null,
                    x: null,
                    y: null
                }
            }

            function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
                if (!f(node, x1, y1, x2, y2)) {
                    var sx = .5 * (x1 + x2),
                        sy = .5 * (y1 + y2),
                        children = node.nodes;
                    children[0] && d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy), children[1] && d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy), children[2] && d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2), children[3] && d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2)
                }
            }

            function d3_geom_quadtreeFind(root, x, y, x0, y0, x3, y3) {
                var closestPoint, minDistance2 = 1 / 0;
                return function find(node, x1, y1, x2, y2) {
                    if (!(x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0)) {
                        if (point = node.point) {
                            var point, dx = x - node.x,
                                dy = y - node.y,
                                distance2 = dx * dx + dy * dy;
                            if (distance2 < minDistance2) {
                                var distance = Math.sqrt(minDistance2 = distance2);
                                x0 = x - distance, y0 = y - distance, x3 = x + distance, y3 = y + distance, closestPoint = point
                            }
                        }
                        for (var children = node.nodes, xm = .5 * (x1 + x2), ym = .5 * (y1 + y2), right = x >= xm, below = y >= ym, i = below << 1 | right, j = i + 4; i < j; ++i)
                            if (node = children[3 & i]) switch (3 & i) {
                                case 0:
                                    find(node, x1, y1, xm, ym);
                                    break;
                                case 1:
                                    find(node, xm, y1, x2, ym);
                                    break;
                                case 2:
                                    find(node, x1, ym, xm, y2);
                                    break;
                                case 3:
                                    find(node, xm, ym, x2, y2)
                            }
                    }
                }(root, x0, y0, x3, y3), closestPoint
            }

            function d3_interpolateRgb(a, b) {
                a = d3.rgb(a), b = d3.rgb(b);
                var ar = a.r,
                    ag = a.g,
                    ab = a.b,
                    br = b.r - ar,
                    bg = b.g - ag,
                    bb = b.b - ab;
                return function(t) {
                    return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t))
                }
            }

            function d3_interpolateObject(a, b) {
                var k, i = {},
                    c = {};
                for (k in a) k in b ? i[k] = d3_interpolate(a[k], b[k]) : c[k] = a[k];
                for (k in b) k in a || (c[k] = b[k]);
                return function(t) {
                    for (k in i) c[k] = i[k](t);
                    return c
                }
            }

            function d3_interpolateNumber(a, b) {
                return a = +a, b = +b,
                    function(t) {
                        return a * (1 - t) + b * t
                    }
            }

            function d3_interpolateString(a, b) {
                var am, bm, bs, bi = d3_interpolate_numberA.lastIndex = d3_interpolate_numberB.lastIndex = 0,
                    i = -1,
                    s = [],
                    q = [];
                for (a += "", b += "";
                    (am = d3_interpolate_numberA.exec(a)) && (bm = d3_interpolate_numberB.exec(b));)(bs = bm.index) > bi && (bs = b.slice(bi, bs), s[i] ? s[i] += bs : s[++i] = bs), (am = am[0]) === (bm = bm[0]) ? s[i] ? s[i] += bm : s[++i] = bm : (s[++i] = null, q.push({
                    i: i,
                    x: d3_interpolateNumber(am, bm)
                })), bi = d3_interpolate_numberB.lastIndex;
                return bi < b.length && (bs = b.slice(bi), s[i] ? s[i] += bs : s[++i] = bs), s.length < 2 ? q[0] ? (b = q[0].x, function(t) {
                    return b(t) + ""
                }) : function() {
                    return b
                } : (b = q.length, function(t) {
                    for (var o, i = 0; i < b; ++i) s[(o = q[i]).i] = o.x(t);
                    return s.join("")
                })
            }

            function d3_interpolate(a, b) {
                for (var f, i = d3.interpolators.length; --i >= 0 && !(f = d3.interpolators[i](a, b)););
                return f
            }

            function d3_interpolateArray(a, b) {
                var i, x = [],
                    c = [],
                    na = a.length,
                    nb = b.length,
                    n0 = Math.min(a.length, b.length);
                for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));
                for (; i < na; ++i) c[i] = a[i];
                for (; i < nb; ++i) c[i] = b[i];
                return function(t) {
                    for (i = 0; i < n0; ++i) c[i] = x[i](t);
                    return c
                }
            }

            function d3_ease_clamp(f) {
                return function(t) {
                    return t <= 0 ? 0 : t >= 1 ? 1 : f(t)
                }
            }

            function d3_ease_reverse(f) {
                return function(t) {
                    return 1 - f(1 - t)
                }
            }

            function d3_ease_reflect(f) {
                return function(t) {
                    return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t))
                }
            }

            function d3_ease_quad(t) {
                return t * t
            }

            function d3_ease_cubic(t) {
                return t * t * t
            }

            function d3_ease_cubicInOut(t) {
                if (t <= 0) return 0;
                if (t >= 1) return 1;
                var t2 = t * t,
                    t3 = t2 * t;
                return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75)
            }

            function d3_ease_poly(e) {
                return function(t) {
                    return Math.pow(t, e)
                }
            }

            function d3_ease_sin(t) {
                return 1 - Math.cos(t * halfπ)
            }

            function d3_ease_exp(t) {
                return Math.pow(2, 10 * (t - 1))
            }

            function d3_ease_circle(t) {
                return 1 - Math.sqrt(1 - t * t)
            }

            function d3_ease_elastic(a, p) {
                var s;
                return arguments.length < 2 && (p = .45), arguments.length ? s = p / τ * Math.asin(1 / a) : (a = 1, s = p / 4),
                    function(t) {
                        return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * τ / p)
                    }
            }

            function d3_ease_back(s) {
                return s || (s = 1.70158),
                    function(t) {
                        return t * t * ((s + 1) * t - s)
                    }
            }

            function d3_ease_bounce(t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }

            function d3_interpolateHcl(a, b) {
                a = d3.hcl(a), b = d3.hcl(b);
                var ah = a.h,
                    ac = a.c,
                    al = a.l,
                    bh = b.h - ah,
                    bc = b.c - ac,
                    bl = b.l - al;
                return isNaN(bc) && (bc = 0, ac = isNaN(ac) ? b.c : ac), isNaN(bh) ? (bh = 0, ah = isNaN(ah) ? b.h : ah) : bh > 180 ? bh -= 360 : bh < -180 && (bh += 360),
                    function(t) {
                        return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + ""
                    }
            }

            function d3_interpolateHsl(a, b) {
                a = d3.hsl(a), b = d3.hsl(b);
                var ah = a.h,
                    as = a.s,
                    al = a.l,
                    bh = b.h - ah,
                    bs = b.s - as,
                    bl = b.l - al;
                return isNaN(bs) && (bs = 0, as = isNaN(as) ? b.s : as), isNaN(bh) ? (bh = 0, ah = isNaN(ah) ? b.h : ah) : bh > 180 ? bh -= 360 : bh < -180 && (bh += 360),
                    function(t) {
                        return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + ""
                    }
            }

            function d3_interpolateLab(a, b) {
                a = d3.lab(a), b = d3.lab(b);
                var al = a.l,
                    aa = a.a,
                    ab = a.b,
                    bl = b.l - al,
                    ba = b.a - aa,
                    bb = b.b - ab;
                return function(t) {
                    return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + ""
                }
            }

            function d3_interpolateRound(a, b) {
                return b -= a,
                    function(t) {
                        return Math.round(a + b * t)
                    }
            }

            function d3_transform(m) {
                var r0 = [m.a, m.b],
                    r1 = [m.c, m.d],
                    kx = d3_transformNormalize(r0),
                    kz = d3_transformDot(r0, r1),
                    ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
                r0[0] * r1[1] < r1[0] * r0[1] && (r0[0] *= -1, r0[1] *= -1, kx *= -1, kz *= -1), this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees, this.translate = [m.e, m.f], this.scale = [kx, ky], this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0
            }

            function d3_transformDot(a, b) {
                return a[0] * b[0] + a[1] * b[1]
            }

            function d3_transformNormalize(a) {
                var k = Math.sqrt(d3_transformDot(a, a));
                return k && (a[0] /= k, a[1] /= k), k
            }

            function d3_transformCombine(a, b, k) {
                return a[0] += k * b[0], a[1] += k * b[1], a
            }

            function d3_interpolateTransformPop(s) {
                return s.length ? s.pop() + "," : ""
            }

            function d3_interpolateTranslate(ta, tb, s, q) {
                if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
                    var i = s.push("translate(", null, ",", null, ")");
                    q.push({
                        i: i - 4,
                        x: d3_interpolateNumber(ta[0], tb[0])
                    }, {
                        i: i - 2,
                        x: d3_interpolateNumber(ta[1], tb[1])
                    })
                } else(tb[0] || tb[1]) && s.push("translate(" + tb + ")")
            }

            function d3_interpolateRotate(ra, rb, s, q) {
                ra !== rb ? (ra - rb > 180 ? rb += 360 : rb - ra > 180 && (ra += 360), q.push({
                    i: s.push(d3_interpolateTransformPop(s) + "rotate(", null, ")") - 2,
                    x: d3_interpolateNumber(ra, rb)
                })) : rb && s.push(d3_interpolateTransformPop(s) + "rotate(" + rb + ")")
            }

            function d3_interpolateSkew(wa, wb, s, q) {
                wa !== wb ? q.push({
                    i: s.push(d3_interpolateTransformPop(s) + "skewX(", null, ")") - 2,
                    x: d3_interpolateNumber(wa, wb)
                }) : wb && s.push(d3_interpolateTransformPop(s) + "skewX(" + wb + ")")
            }

            function d3_interpolateScale(ka, kb, s, q) {
                if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
                    var i = s.push(d3_interpolateTransformPop(s) + "scale(", null, ",", null, ")");
                    q.push({
                        i: i - 4,
                        x: d3_interpolateNumber(ka[0], kb[0])
                    }, {
                        i: i - 2,
                        x: d3_interpolateNumber(ka[1], kb[1])
                    })
                } else 1 === kb[0] && 1 === kb[1] || s.push(d3_interpolateTransformPop(s) + "scale(" + kb + ")")
            }

            function d3_interpolateTransform(a, b) {
                var s = [],
                    q = [];
                return a = d3.transform(a), b = d3.transform(b), d3_interpolateTranslate(a.translate, b.translate, s, q), d3_interpolateRotate(a.rotate, b.rotate, s, q), d3_interpolateSkew(a.skew, b.skew, s, q), d3_interpolateScale(a.scale, b.scale, s, q), a = b = null,
                    function(t) {
                        for (var o, i = -1, n = q.length; ++i < n;) s[(o = q[i]).i] = o.x(t);
                        return s.join("")
                    }
            }

            function d3_uninterpolateNumber(a, b) {
                return b = (b -= a = +a) || 1 / b,
                    function(x) {
                        return (x - a) / b
                    }
            }

            function d3_uninterpolateClamp(a, b) {
                return b = (b -= a = +a) || 1 / b,
                    function(x) {
                        return Math.max(0, Math.min(1, (x - a) / b))
                    }
            }

            function d3_layout_bundlePath(link) {
                for (var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [start]; start !== lca;) start = start.parent, points.push(start);
                for (var k = points.length; end !== lca;) points.splice(k, 0, end), end = end.parent;
                return points
            }

            function d3_layout_bundleAncestors(node) {
                for (var ancestors = [], parent = node.parent; null != parent;) ancestors.push(node), node = parent, parent = parent.parent;
                return ancestors.push(node), ancestors
            }

            function d3_layout_bundleLeastCommonAncestor(a, b) {
                if (a === b) return a;
                for (var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null; aNode === bNode;) sharedNode = aNode, aNode = aNodes.pop(), bNode = bNodes.pop();
                return sharedNode
            }

            function d3_layout_forceDragstart(d) {
                d.fixed |= 2
            }

            function d3_layout_forceDragend(d) {
                d.fixed &= -7
            }

            function d3_layout_forceMouseover(d) {
                d.fixed |= 4, d.px = d.x, d.py = d.y
            }

            function d3_layout_forceMouseout(d) {
                d.fixed &= -5
            }

            // function d3_layout_forceAccumulate(quad, alpha, charges) {
            //     var cx = 0,
            //         cy = 0;
            //     if (quad.charge = 0, !quad.leaf)
            //         for (var c, nodes = quad.nodes, n = nodes.length, i = -1; ++i < n;) null != (c = nodes[i]) && (d3_layout_forceAccumulate(c, alpha, charges), quad.charge += c.charge, cx += c.charge * c.cx, cy += c.charge * c.cy);
            //     if (quad.point) {
            //         quad.leaf || (quad.point.x += Math.random() - .5, quad.point.y += Math.random() - .5);
            //         var k = alpha * charges[quad.point.index];
            //         quad.charge += quad.pointCharge = k, cx += k * quad.point.x, cy += k * quad.point.y
            //     }
            //     quad.cx = cx / quad.charge, quad.cy = cy / quad.charge
            // }

            function d3_layout_hierarchyRebind(object, hierarchy) {
                return d3.rebind(object, hierarchy, "sort", "children", "value"), object.nodes = object, object.links = d3_layout_hierarchyLinks, object
            }

            function d3_layout_hierarchyVisitBefore(node, callback) {
                for (var nodes = [node]; null != (node = nodes.pop());)
                    if (callback(node), (children = node.children) && (n = children.length))
                        for (var n, children; --n >= 0;) nodes.push(children[n])
            }

            function d3_layout_hierarchyVisitAfter(node, callback) {
                for (var nodes = [node], nodes2 = []; null != (node = nodes.pop());)
                    if (nodes2.push(node), (children = node.children) && (n = children.length))
                        for (var n, children, i = -1; ++i < n;) nodes.push(children[i]);
                for (; null != (node = nodes2.pop());) callback(node)
            }

            function d3_layout_hierarchyChildren(d) {
                return d.children
            }

            function d3_layout_hierarchyValue(d) {
                return d.value
            }

            function d3_layout_hierarchySort(a, b) {
                return b.value - a.value
            }

            function d3_layout_hierarchyLinks(nodes) {
                return d3.merge(nodes.map(function(parent) {
                    return (parent.children || []).map(function(child) {
                        return {
                            source: parent,
                            target: child
                        }
                    })
                }))
            }

            function d3_layout_stackX(d) {
                return d.x
            }

            function d3_layout_stackY(d) {
                return d.y
            }

            function d3_layout_stackOut(d, y0, y) {
                d.y0 = y0, d.y = y
            }

            function d3_layout_stackOrderDefault(data) {
                return d3.range(data.length)
            }

            function d3_layout_stackOffsetZero(data) {
                for (var j = -1, m = data[0].length, y0 = []; ++j < m;) y0[j] = 0;
                return y0
            }

            function d3_layout_stackMaxIndex(array) {
                for (var k, i = 1, j = 0, v = array[0][1], n = array.length; i < n; ++i)(k = array[i][1]) > v && (j = i, v = k);
                return j
            }

            function d3_layout_stackReduceSum(d) {
                return d.reduce(d3_layout_stackSum, 0)
            }

            function d3_layout_stackSum(p, d) {
                return p + d[1]
            }

            function d3_layout_histogramBinSturges(range, values) {
                return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1))
            }

            function d3_layout_histogramBinFixed(range, n) {
                for (var x = -1, b = +range[0], m = (range[1] - b) / n, f = []; ++x <= n;) f[x] = m * x + b;
                return f
            }

            function d3_layout_histogramRange(values) {
                return [d3.min(values), d3.max(values)]
            }

            function d3_layout_packSort(a, b) {
                return a.value - b.value
            }

            function d3_layout_packInsert(a, b) {
                var c = a._pack_next;
                a._pack_next = b, b._pack_prev = a, b._pack_next = c, c._pack_prev = b
            }

            function d3_layout_packSplice(a, b) {
                a._pack_next = b, b._pack_prev = a
            }

            function d3_layout_packIntersects(a, b) {
                var dx = b.x - a.x,
                    dy = b.y - a.y,
                    dr = a.r + b.r;
                return .999 * dr * dr > dx * dx + dy * dy
            }

            function d3_layout_packSiblings(node) {
                function bound(node) {
                    xMin = Math.min(node.x - node.r, xMin), xMax = Math.max(node.x + node.r, xMax), yMin = Math.min(node.y - node.r, yMin), yMax = Math.max(node.y + node.r, yMax)
                }
                if ((nodes = node.children) && (n = nodes.length)) {
                    var nodes, a, b, c, i, j, k, n, xMin = 1 / 0,
                        xMax = -1 / 0,
                        yMin = 1 / 0,
                        yMax = -1 / 0;
                    if (nodes.forEach(d3_layout_packLink), a = nodes[0], a.x = -a.r, a.y = 0, bound(a), n > 1 && (b = nodes[1], b.x = b.r, b.y = 0, bound(b), n > 2))
                        for (c = nodes[2], d3_layout_packPlace(a, b, c), bound(c), d3_layout_packInsert(a, c), a._pack_prev = c, d3_layout_packInsert(c, b), b = a._pack_next, i = 3; i < n; i++) {
                            d3_layout_packPlace(a, b, c = nodes[i]);
                            var isect = 0,
                                s1 = 1,
                                s2 = 1;
                            for (j = b._pack_next; j !== b; j = j._pack_next, s1++)
                                if (d3_layout_packIntersects(j, c)) {
                                    isect = 1;
                                    break
                                } if (1 == isect)
                                for (k = a._pack_prev; k !== j._pack_prev && !d3_layout_packIntersects(k, c); k = k._pack_prev, s2++);
                            isect ? (s1 < s2 || s1 == s2 && b.r < a.r ? d3_layout_packSplice(a, b = j) : d3_layout_packSplice(a = k, b), i--) : (d3_layout_packInsert(a, c), b = c, bound(c))
                        }
                    var cx = (xMin + xMax) / 2,
                        cy = (yMin + yMax) / 2,
                        cr = 0;
                    for (i = 0; i < n; i++) c = nodes[i], c.x -= cx, c.y -= cy, cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
                    node.r = cr, nodes.forEach(d3_layout_packUnlink)
                }
            }

            function d3_layout_packLink(node) {
                node._pack_next = node._pack_prev = node
            }

            function d3_layout_packUnlink(node) {
                delete node._pack_next, delete node._pack_prev
            }

            function d3_layout_packTransform(node, x, y, k) {
                var children = node.children;
                if (node.x = x += k * node.x, node.y = y += k * node.y, node.r *= k, children)
                    for (var i = -1, n = children.length; ++i < n;) d3_layout_packTransform(children[i], x, y, k)
            }

            function d3_layout_packPlace(a, b, c) {
                var db = a.r + c.r,
                    dx = b.x - a.x,
                    dy = b.y - a.y;
                if (db && (dx || dy)) {
                    var da = b.r + c.r,
                        dc = dx * dx + dy * dy;
                    da *= da, db *= db;
                    var x = .5 + (db - da) / (2 * dc),
                        y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
                    c.x = a.x + x * dx + y * dy, c.y = a.y + x * dy - y * dx
                } else c.x = a.x + db, c.y = a.y
            }

            function d3_layout_treeSeparation(a, b) {
                return a.parent == b.parent ? 1 : 2
            }

            function d3_layout_treeLeft(v) {
                var children = v.children;
                return children.length ? children[0] : v.t
            }

            function d3_layout_treeRight(v) {
                var n, children = v.children;
                return (n = children.length) ? children[n - 1] : v.t
            }

            function d3_layout_treeMove(wm, wp, shift) {
                var change = shift / (wp.i - wm.i);
                wp.c -= change, wp.s += shift, wm.c += change, wp.z += shift, wp.m += shift
            }

            function d3_layout_treeShift(v) {
                for (var w, shift = 0, change = 0, children = v.children, i = children.length; --i >= 0;) w = children[i], w.z += shift, w.m += shift, shift += w.s + (change += w.c)
            }

            function d3_layout_treeAncestor(vim, v, ancestor) {
                return vim.a.parent === v.parent ? vim.a : ancestor
            }

            function d3_layout_clusterY(children) {
                return 1 + d3.max(children, function(child) {
                    return child.y
                })
            }

            function d3_layout_clusterX(children) {
                return children.reduce(function(x, child) {
                    return x + child.x
                }, 0) / children.length
            }

            function d3_layout_clusterLeft(node) {
                var children = node.children;
                return children && children.length ? d3_layout_clusterLeft(children[0]) : node
            }

            function d3_layout_clusterRight(node) {
                var n, children = node.children;
                return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node
            }

            function d3_layout_treemapPadNull(node) {
                return {
                    x: node.x,
                    y: node.y,
                    dx: node.dx,
                    dy: node.dy
                }
            }

            function d3_layout_treemapPad(node, padding) {
                var x = node.x + padding[3],
                    y = node.y + padding[0],
                    dx = node.dx - padding[1] - padding[3],
                    dy = node.dy - padding[0] - padding[2];
                return dx < 0 && (x += dx / 2, dx = 0), dy < 0 && (y += dy / 2, dy = 0), {
                    x: x,
                    y: y,
                    dx: dx,
                    dy: dy
                }
            }

            function d3_scaleExtent(domain) {
                var start = domain[0],
                    stop = domain[domain.length - 1];
                return start < stop ? [start, stop] : [stop, start]
            }

            function d3_scaleRange(scale) {
                return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range())
            }

            function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
                var u = uninterpolate(domain[0], domain[1]),
                    i = interpolate(range[0], range[1]);
                return function(x) {
                    return i(u(x))
                }
            }

            function d3_scale_nice(domain, nice) {
                var dx, i0 = 0,
                    i1 = domain.length - 1,
                    x0 = domain[i0],
                    x1 = domain[i1];
                return x1 < x0 && (dx = i0, i0 = i1, i1 = dx, dx = x0, x0 = x1, x1 = dx), domain[i0] = nice.floor(x0), domain[i1] = nice.ceil(x1), domain
            }

            function d3_scale_niceStep(step) {
                return step ? {
                    floor: function(x) {
                        return Math.floor(x / step) * step
                    },
                    ceil: function(x) {
                        return Math.ceil(x / step) * step
                    }
                } : d3_scale_niceIdentity
            }

            function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
                var u = [],
                    i = [],
                    j = 0,
                    k = Math.min(domain.length, range.length) - 1;
                for (domain[k] < domain[0] && (domain = domain.slice().reverse(), range = range.slice().reverse()); ++j <= k;) u.push(uninterpolate(domain[j - 1], domain[j])), i.push(interpolate(range[j - 1], range[j]));
                return function(x) {
                    var j = d3.bisect(domain, x, 1, k) - 1;
                    return i[j](u[j](x))
                }
            }

            function d3_scale_linear(domain, range, interpolate, clamp) {
                function rescale() {
                    var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear,
                        uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
                    return output = linear(domain, range, uninterpolate, interpolate), input = linear(range, domain, uninterpolate, d3_interpolate), scale
                }

                function scale(x) {
                    return output(x)
                }
                var output, input;
                return scale.invert = function(y) {
                    return input(y)
                }, scale.domain = function(x) {
                    return arguments.length ? (domain = x.map(Number), rescale()) : domain
                }, scale.range = function(x) {
                    return arguments.length ? (range = x, rescale()) : range
                }, scale.rangeRound = function(x) {
                    return scale.range(x).interpolate(d3_interpolateRound)
                }, scale.clamp = function(x) {
                    return arguments.length ? (clamp = x, rescale()) : clamp
                }, scale.interpolate = function(x) {
                    return arguments.length ? (interpolate = x, rescale()) : interpolate
                }, scale.ticks = function(m) {
                    return d3_scale_linearTicks(domain, m)
                }, scale.tickFormat = function(m, format) {
                    return d3_scale_linearTickFormat(domain, m, format)
                }, scale.nice = function(m) {
                    return d3_scale_linearNice(domain, m), rescale()
                }, scale.copy = function() {
                    return d3_scale_linear(domain, range, interpolate, clamp)
                }, rescale()
            }

            function d3_scale_linearRebind(scale, linear) {
                return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp")
            }

            function d3_scale_linearNice(domain, m) {
                return d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2])), d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2])), domain
            }

            function d3_scale_linearTickRange(domain, m) {
                null == m && (m = 10);
                var extent = d3_scaleExtent(domain),
                    span = extent[1] - extent[0],
                    step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
                    err = m / span * step;
                return err <= .15 ? step *= 10 : err <= .35 ? step *= 5 : err <= .75 && (step *= 2), extent[0] = Math.ceil(extent[0] / step) * step, extent[1] = Math.floor(extent[1] / step) * step + .5 * step, extent[2] = step, extent
            }

            function d3_scale_linearTicks(domain, m) {
                return d3.range.apply(d3, d3_scale_linearTickRange(domain, m))
            }

            function d3_scale_linearTickFormat(domain, m, format) {
                var range = d3_scale_linearTickRange(domain, m);
                if (format) {
                    var match = d3_format_re.exec(format);
                    if (match.shift(), "s" === match[8]) {
                        var prefix = d3.formatPrefix(Math.max(abs(range[0]), abs(range[1])));
                        return match[7] || (match[7] = "." + d3_scale_linearPrecision(prefix.scale(range[2]))), match[8] = "f", format = d3.format(match.join("")),
                            function(d) {
                                return format(prefix.scale(d)) + prefix.symbol
                            }
                    }
                    match[7] || (match[7] = "." + d3_scale_linearFormatPrecision(match[8], range)), format = match.join("")
                } else format = ",." + d3_scale_linearPrecision(range[2]) + "f";
                return d3.format(format)
            }

            function d3_scale_linearPrecision(value) {
                return -Math.floor(Math.log(value) / Math.LN10 + .01)
            }

            function d3_scale_linearFormatPrecision(type, range) {
                var p = d3_scale_linearPrecision(range[2]);
                return type in d3_scale_linearFormatSignificant ? Math.abs(p - d3_scale_linearPrecision(Math.max(abs(range[0]), abs(range[1])))) + +("e" !== type) : p - 2 * ("%" === type)
            }

            function d3_scale_log(linear, base, positive, domain) {
                function log(x) {
                    return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base)
                }

                function pow(x) {
                    return positive ? Math.pow(base, x) : -Math.pow(base, -x)
                }

                function scale(x) {
                    return linear(log(x))
                }
                return scale.invert = function(x) {
                    return pow(linear.invert(x))
                }, scale.domain = function(x) {
                    return arguments.length ? (positive = x[0] >= 0, linear.domain((domain = x.map(Number)).map(log)), scale) : domain
                }, scale.base = function(_) {
                    return arguments.length ? (base = +_, linear.domain(domain.map(log)), scale) : base
                }, scale.nice = function() {
                    var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
                    return linear.domain(niced), domain = niced.map(pow), scale
                }, scale.ticks = function() {
                    var extent = d3_scaleExtent(domain),
                        ticks = [],
                        u = extent[0],
                        v = extent[1],
                        i = Math.floor(log(u)),
                        j = Math.ceil(log(v)),
                        n = base % 1 ? 2 : base;
                    if (isFinite(j - i)) {
                        if (positive) {
                            for (; i < j; i++)
                                for (var k = 1; k < n; k++) ticks.push(pow(i) * k);
                            ticks.push(pow(i))
                        } else
                            for (ticks.push(pow(i)); i++ < j;)
                                for (var k = n - 1; k > 0; k--) ticks.push(pow(i) * k);
                        for (i = 0; ticks[i] < u; i++);
                        for (j = ticks.length; ticks[j - 1] > v; j--);
                        ticks = ticks.slice(i, j)
                    }
                    return ticks
                }, scale.tickFormat = function(n, format) {
                    if (!arguments.length) return d3_scale_logFormat;
                    arguments.length < 2 ? format = d3_scale_logFormat : "function" != typeof format && (format = d3.format(format));
                    var k = Math.max(1, base * n / scale.ticks().length);
                    return function(d) {
                        var i = d / pow(Math.round(log(d)));
                        return i * base < base - .5 && (i *= base), i <= k ? format(d) : ""
                    }
                }, scale.copy = function() {
                    return d3_scale_log(linear.copy(), base, positive, domain)
                }, d3_scale_linearRebind(scale, linear)
            }

            function d3_scale_pow(linear, exponent, domain) {
                function scale(x) {
                    return linear(powp(x))
                }
                var powp = d3_scale_powPow(exponent),
                    powb = d3_scale_powPow(1 / exponent);
                return scale.invert = function(x) {
                    return powb(linear.invert(x))
                }, scale.domain = function(x) {
                    return arguments.length ? (linear.domain((domain = x.map(Number)).map(powp)), scale) : domain
                }, scale.ticks = function(m) {
                    return d3_scale_linearTicks(domain, m)
                }, scale.tickFormat = function(m, format) {
                    return d3_scale_linearTickFormat(domain, m, format)
                }, scale.nice = function(m) {
                    return scale.domain(d3_scale_linearNice(domain, m))
                }, scale.exponent = function(x) {
                    return arguments.length ? (powp = d3_scale_powPow(exponent = x), powb = d3_scale_powPow(1 / exponent), linear.domain(domain.map(powp)), scale) : exponent
                }, scale.copy = function() {
                    return d3_scale_pow(linear.copy(), exponent, domain)
                }, d3_scale_linearRebind(scale, linear)
            }

            function d3_scale_powPow(e) {
                return function(x) {
                    return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e)
                }
            }

            function d3_scale_ordinal(domain, ranger) {
                function scale(x) {
                    return range[((index.get(x) || ("range" === ranger.t ? index.set(x, domain.push(x)) : NaN)) - 1) % range.length]
                }

                function steps(start, step) {
                    return d3.range(domain.length).map(function(i) {
                        return start + step * i
                    })
                }
                var index, range, rangeBand;
                return scale.domain = function(x) {
                    if (!arguments.length) return domain;
                    domain = [], index = new d3_Map;
                    for (var xi, i = -1, n = x.length; ++i < n;) index.has(xi = x[i]) || index.set(xi, domain.push(xi));
                    return scale[ranger.t].apply(scale, ranger.a)
                }, scale.range = function(x) {
                    return arguments.length ? (range = x, rangeBand = 0, ranger = {
                        t: "range",
                        a: arguments
                    }, scale) : range
                }, scale.rangePoints = function(x, padding) {
                    arguments.length < 2 && (padding = 0);
                    var start = x[0],
                        stop = x[1],
                        step = domain.length < 2 ? (start = (start + stop) / 2, 0) : (stop - start) / (domain.length - 1 + padding);
                    return range = steps(start + step * padding / 2, step), rangeBand = 0, ranger = {
                        t: "rangePoints",
                        a: arguments
                    }, scale
                }, scale.rangeRoundPoints = function(x, padding) {
                    arguments.length < 2 && (padding = 0);
                    var start = x[0],
                        stop = x[1],
                        step = domain.length < 2 ? (start = stop = Math.round((start + stop) / 2), 0) : (stop - start) / (domain.length - 1 + padding) | 0;
                    return range = steps(start + Math.round(step * padding / 2 + (stop - start - (domain.length - 1 + padding) * step) / 2), step), rangeBand = 0, ranger = {
                        t: "rangeRoundPoints",
                        a: arguments
                    }, scale
                }, scale.rangeBands = function(x, padding, outerPadding) {
                    arguments.length < 2 && (padding = 0), arguments.length < 3 && (outerPadding = padding);
                    var reverse = x[1] < x[0],
                        start = x[reverse - 0],
                        stop = x[1 - reverse],
                        step = (stop - start) / (domain.length - padding + 2 * outerPadding);
                    return range = steps(start + step * outerPadding, step), reverse && range.reverse(), rangeBand = step * (1 - padding), ranger = {
                        t: "rangeBands",
                        a: arguments
                    }, scale
                }, scale.rangeRoundBands = function(x, padding, outerPadding) {
                    arguments.length < 2 && (padding = 0), arguments.length < 3 && (outerPadding = padding);
                    var reverse = x[1] < x[0],
                        start = x[reverse - 0],
                        stop = x[1 - reverse],
                        step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding));
                    return range = steps(start + Math.round((stop - start - (domain.length - padding) * step) / 2), step), reverse && range.reverse(), rangeBand = Math.round(step * (1 - padding)), ranger = {
                        t: "rangeRoundBands",
                        a: arguments
                    }, scale
                }, scale.rangeBand = function() {
                    return rangeBand
                }, scale.rangeExtent = function() {
                    return d3_scaleExtent(ranger.a[0])
                }, scale.copy = function() {
                    return d3_scale_ordinal(domain, ranger)
                }, scale.domain(domain)
            }

            function d3_scale_quantile(domain, range) {
                function rescale() {
                    var k = 0,
                        q = range.length;
                    for (thresholds = []; ++k < q;) thresholds[k - 1] = d3.quantile(domain, k / q);
                    return scale
                }

                function scale(x) {
                    if (!isNaN(x = +x)) return range[d3.bisect(thresholds, x)]
                }
                var thresholds;
                return scale.domain = function(x) {
                    return arguments.length ? (domain = x.map(d3_number).filter(d3_numeric).sort(d3_ascending), rescale()) : domain
                }, scale.range = function(x) {
                    return arguments.length ? (range = x, rescale()) : range
                }, scale.quantiles = function() {
                    return thresholds
                }, scale.invertExtent = function(y) {
                    return y = range.indexOf(y), y < 0 ? [NaN, NaN] : [y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1]]
                }, scale.copy = function() {
                    return d3_scale_quantile(domain, range)
                }, rescale()
            }

            function d3_scale_quantize(x0, x1, range) {
                function scale(x) {
                    return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))]
                }

                function rescale() {
                    return kx = range.length / (x1 - x0), i = range.length - 1, scale
                }
                var kx, i;
                return scale.domain = function(x) {
                    return arguments.length ? (x0 = +x[0], x1 = +x[x.length - 1], rescale()) : [x0, x1]
                }, scale.range = function(x) {
                    return arguments.length ? (range = x, rescale()) : range
                }, scale.invertExtent = function(y) {
                    return y = range.indexOf(y), y = y < 0 ? NaN : y / kx + x0, [y, y + 1 / kx]
                }, scale.copy = function() {
                    return d3_scale_quantize(x0, x1, range)
                }, rescale()
            }

            function d3_scale_threshold(domain, range) {
                function scale(x) {
                    if (x <= x) return range[d3.bisect(domain, x)]
                }
                return scale.domain = function(_) {
                    return arguments.length ? (domain = _, scale) : domain
                }, scale.range = function(_) {
                    return arguments.length ? (range = _, scale) : range
                }, scale.invertExtent = function(y) {
                    return y = range.indexOf(y), [domain[y - 1], domain[y]]
                }, scale.copy = function() {
                    return d3_scale_threshold(domain, range)
                }, scale
            }

            function d3_scale_identity(domain) {
                function identity(x) {
                    return +x
                }
                return identity.invert = identity, identity.domain = identity.range = function(x) {
                    return arguments.length ? (domain = x.map(identity), identity) : domain
                }, identity.ticks = function(m) {
                    return d3_scale_linearTicks(domain, m)
                }, identity.tickFormat = function(m, format) {
                    return d3_scale_linearTickFormat(domain, m, format)
                }, identity.copy = function() {
                    return d3_scale_identity(domain)
                }, identity
            }

            function d3_zero() {
                return 0
            }

            function d3_svg_arcInnerRadius(d) {
                return d.innerRadius
            }

            function d3_svg_arcOuterRadius(d) {
                return d.outerRadius
            }

            function d3_svg_arcStartAngle(d) {
                return d.startAngle
            }

            function d3_svg_arcEndAngle(d) {
                return d.endAngle
            }

            function d3_svg_arcPadAngle(d) {
                return d && d.padAngle
            }

            function d3_svg_arcSweep(x0, y0, x1, y1) {
                return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1
            }

            function d3_svg_arcCornerTangents(p0, p1, r1, rc, cw) {
                var x01 = p0[0] - p1[0],
                    y01 = p0[1] - p1[1],
                    lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
                    ox = lo * y01,
                    oy = -lo * x01,
                    x1 = p0[0] + ox,
                    y1 = p0[1] + oy,
                    x2 = p1[0] + ox,
                    y2 = p1[1] + oy,
                    x3 = (x1 + x2) / 2,
                    y3 = (y1 + y2) / 2,
                    dx = x2 - x1,
                    dy = y2 - y1,
                    d2 = dx * dx + dy * dy,
                    r = r1 - rc,
                    D = x1 * y2 - x2 * y1,
                    d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
                    cx0 = (D * dy - dx * d) / d2,
                    cy0 = (-D * dx - dy * d) / d2,
                    cx1 = (D * dy + dx * d) / d2,
                    cy1 = (-D * dx + dy * d) / d2,
                    dx0 = cx0 - x3,
                    dy0 = cy0 - y3,
                    dx1 = cx1 - x3,
                    dy1 = cy1 - y3;
                return dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1 && (cx0 = cx1, cy0 = cy1), [
                    [cx0 - ox, cy0 - oy],
                    [cx0 * r1 / r, cy0 * r1 / r]
                ]
            }

            function d3_svg_line(projection) {
                function line(data) {
                    function segment() {
                        segments.push("M", interpolate(projection(points), tension))
                    }
                    for (var d, segments = [], points = [], i = -1, n = data.length, fx = d3_functor(x), fy = d3_functor(y); ++i < n;) defined.call(this, d = data[i], i) ? points.push([+fx.call(this, d, i), +fy.call(this, d, i)]) : points.length && (segment(), points = []);
                    return points.length && segment(), segments.length ? segments.join("") : null
                }
                var x = d3_geom_pointX,
                    y = d3_geom_pointY,
                    defined = d3_true,
                    interpolate = d3_svg_lineLinear,
                    interpolateKey = interpolate.key,
                    tension = .7;
                return line.x = function(_) {
                    return arguments.length ? (x = _, line) : x
                }, line.y = function(_) {
                    return arguments.length ? (y = _, line) : y
                }, line.defined = function(_) {
                    return arguments.length ? (defined = _, line) : defined
                }, line.interpolate = function(_) {
                    return arguments.length ? (interpolateKey = "function" == typeof _ ? interpolate = _ : (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key, line) : interpolateKey
                }, line.tension = function(_) {
                    return arguments.length ? (tension = _, line) : tension
                }, line
            }

            function d3_svg_lineLinear(points) {
                return points.length > 1 ? points.join("L") : points + "Z"
            }

            function d3_svg_lineLinearClosed(points) {
                return points.join("L") + "Z"
            }

            function d3_svg_lineStep(points) {
                for (var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]]; ++i < n;) path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
                return n > 1 && path.push("H", p[0]), path.join("")
            }

            function d3_svg_lineStepBefore(points) {
                for (var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]]; ++i < n;) path.push("V", (p = points[i])[1], "H", p[0]);
                return path.join("")
            }

            function d3_svg_lineStepAfter(points) {
                for (var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]]; ++i < n;) path.push("H", (p = points[i])[0], "V", p[1]);
                return path.join("")
            }

            function d3_svg_lineCardinalOpen(points, tension) {
                return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, -1), d3_svg_lineCardinalTangents(points, tension))
            }

            function d3_svg_lineCardinalClosed(points, tension) {
                return points.length < 3 ? d3_svg_lineLinearClosed(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), points), d3_svg_lineCardinalTangents([points[points.length - 2]].concat(points, [points[1]]), tension))
            }

            function d3_svg_lineCardinal(points, tension) {
                return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension))
            }

            function d3_svg_lineHermite(points, tangents) {
                if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) return d3_svg_lineLinear(points);
                var quad = points.length != tangents.length,
                    path = "",
                    p0 = points[0],
                    p = points[1],
                    t0 = tangents[0],
                    t = t0,
                    pi = 1;
                if (quad && (path += "Q" + (p[0] - 2 * t0[0] / 3) + "," + (p[1] - 2 * t0[1] / 3) + "," + p[0] + "," + p[1], p0 = points[1], pi = 2), tangents.length > 1) {
                    t = tangents[1], p = points[pi], pi++, path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
                    for (var i = 2; i < tangents.length; i++, pi++) p = points[pi], t = tangents[i], path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1]
                }
                if (quad) {
                    var lp = points[pi];
                    path += "Q" + (p[0] + 2 * t[0] / 3) + "," + (p[1] + 2 * t[1] / 3) + "," + lp[0] + "," + lp[1]
                }
                return path
            }

            function d3_svg_lineCardinalTangents(points, tension) {
                for (var p0, tangents = [], a = (1 - tension) / 2, p1 = points[0], p2 = points[1], i = 1, n = points.length; ++i < n;) p0 = p1, p1 = p2, p2 = points[i], tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
                return tangents
            }

            function d3_svg_lineBasis(points) {
                if (points.length < 3) return d3_svg_lineLinear(points);
                var i = 1,
                    n = points.length,
                    pi = points[0],
                    x0 = pi[0],
                    y0 = pi[1],
                    px = [x0, x0, x0, (pi = points[1])[0]],
                    py = [y0, y0, y0, pi[1]],
                    path = [x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
                for (points.push(points[n - 1]); ++i <= n;) pi = points[i], px.shift(), px.push(pi[0]), py.shift(), py.push(pi[1]), d3_svg_lineBasisBezier(path, px, py);
                return points.pop(), path.push("L", pi), path.join("")
            }

            function d3_svg_lineBasisOpen(points) {
                if (points.length < 4) return d3_svg_lineLinear(points);
                for (var pi, path = [], i = -1, n = points.length, px = [0], py = [0]; ++i < 3;) pi = points[i], px.push(pi[0]), py.push(pi[1]);
                for (path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)), --i; ++i < n;) pi = points[i], px.shift(), px.push(pi[0]), py.shift(), py.push(pi[1]), d3_svg_lineBasisBezier(path, px, py);
                return path.join("")
            }

            function d3_svg_lineBasisClosed(points) {
                for (var path, pi, i = -1, n = points.length, m = n + 4, px = [], py = []; ++i < 4;) pi = points[i % n], px.push(pi[0]), py.push(pi[1]);
                for (path = [d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)], --i; ++i < m;) pi = points[i % n], px.shift(), px.push(pi[0]), py.shift(), py.push(pi[1]), d3_svg_lineBasisBezier(path, px, py);
                return path.join("")
            }

            function d3_svg_lineBundle(points, tension) {
                var n = points.length - 1;
                if (n)
                    for (var p, t, x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1; ++i <= n;) p = points[i], t = i / n, p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx), p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
                return d3_svg_lineBasis(points)
            }

            function d3_svg_lineDot4(a, b) {
                return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
            }

            function d3_svg_lineBasisBezier(path, x, y) {
                path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y))
            }

            function d3_svg_lineSlope(p0, p1) {
                return (p1[1] - p0[1]) / (p1[0] - p0[0])
            }

            function d3_svg_lineFiniteDifferences(points) {
                for (var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1); ++i < j;) m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
                return m[i] = d, m
            }

            function d3_svg_lineMonotoneTangents(points) {
                for (var d, a, b, s, tangents = [], m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1; ++i < j;) d = d3_svg_lineSlope(points[i], points[i + 1]), abs(d) < ε ? m[i] = m[i + 1] = 0 : (a = m[i] / d, b = m[i + 1] / d, (s = a * a + b * b) > 9 && (s = 3 * d / Math.sqrt(s), m[i] = s * a, m[i + 1] = s * b));
                for (i = -1; ++i <= j;) s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i])), tangents.push([s || 0, m[i] * s || 0]);
                return tangents
            }

            function d3_svg_lineMonotone(points) {
                return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points))
            }

            function d3_svg_lineRadial(points) {
                for (var point, r, a, i = -1, n = points.length; ++i < n;) point = points[i], r = point[0], a = point[1] - halfπ, point[0] = r * Math.cos(a), point[1] = r * Math.sin(a);
                return points
            }

            function d3_svg_area(projection) {
                function area(data) {
                    function segment() {
                        segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z")
                    }
                    for (var d, x, y, segments = [], points0 = [], points1 = [], i = -1, n = data.length, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
                            return x
                        } : d3_functor(x1), fy1 = y0 === y1 ? function() {
                            return y
                        } : d3_functor(y1); ++i < n;) defined.call(this, d = data[i], i) ? (points0.push([x = +fx0.call(this, d, i), y = +fy0.call(this, d, i)]), points1.push([+fx1.call(this, d, i), +fy1.call(this, d, i)])) : points0.length && (segment(), points0 = [], points1 = []);
                    return points0.length && segment(), segments.length ? segments.join("") : null
                }
                var x0 = d3_geom_pointX,
                    x1 = d3_geom_pointX,
                    y0 = 0,
                    y1 = d3_geom_pointY,
                    defined = d3_true,
                    interpolate = d3_svg_lineLinear,
                    interpolateKey = interpolate.key,
                    interpolateReverse = interpolate,
                    L = "L",
                    tension = .7;
                return area.x = function(_) {
                    return arguments.length ? (x0 = x1 = _, area) : x1
                }, area.x0 = function(_) {
                    return arguments.length ? (x0 = _, area) : x0
                }, area.x1 = function(_) {
                    return arguments.length ? (x1 = _, area) : x1
                }, area.y = function(_) {
                    return arguments.length ? (y0 = y1 = _, area) : y1
                }, area.y0 = function(_) {
                    return arguments.length ? (y0 = _, area) : y0
                }, area.y1 = function(_) {
                    return arguments.length ? (y1 = _, area) : y1
                }, area.defined = function(_) {
                    return arguments.length ? (defined = _, area) : defined
                }, area.interpolate = function(_) {
                    return arguments.length ? (interpolateKey = "function" == typeof _ ? interpolate = _ : (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key, interpolateReverse = interpolate.reverse || interpolate, L = interpolate.closed ? "M" : "L", area) : interpolateKey
                }, area.tension = function(_) {
                    return arguments.length ? (tension = _, area) : tension
                }, area
            }

            function d3_svg_chordRadius(d) {
                return d.radius
            }

            function d3_svg_diagonalProjection(d) {
                return [d.x, d.y]
            }

            function d3_svg_diagonalRadialProjection(projection) {
                return function() {
                    var d = projection.apply(this, arguments),
                        r = d[0],
                        a = d[1] - halfπ;
                    return [r * Math.cos(a), r * Math.sin(a)]
                }
            }

            function d3_svg_symbolSize() {
                return 64
            }

            function d3_svg_symbolType() {
                return "circle"
            }

            function d3_svg_symbolCircle(size) {
                var r = Math.sqrt(size / π);
                return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z"
            }

            function d3_selection_interruptNS(ns) {
                return function() {
                    var lock, activeId, active;
                    (lock = this[ns]) && (active = lock[activeId = lock.active]) && (active.timer.c = null, active.timer.t = NaN, --lock.count ? delete lock[activeId] : delete this[ns], lock.active += .5, active.event && active.event.interrupt.call(this, this.__data__, active.index))
                }
            }

            function d3_transition(groups, ns, id) {
                return d3_subclass(groups, d3_transitionPrototype), groups.namespace = ns, groups.id = id, groups
            }

            function d3_transition_tween(groups, name, value, tween) {
                var id = groups.id,
                    ns = groups.namespace;
                return d3_selection_each(groups, "function" == typeof value ? function(node, i, j) {
                    node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j)))
                } : (value = tween(value), function(node) {
                    node[ns][id].tween.set(name, value)
                }))
            }

            function d3_transition_text(b) {
                return null == b && (b = ""),
                    function() {
                        this.textContent = b
                    }
            }

            function d3_transitionNamespace(name) {
                return null == name ? "__transition__" : "__transition_" + name + "__"
            }

            function d3_transitionNode(node, i, ns, id, inherit) {
                function schedule(elapsed) {
                    var delay = transition.delay;
                    if (timer.t = delay + time, delay <= elapsed) return start(elapsed - delay);
                    timer.c = start
                }

                function start(elapsed) {
                    var activeId = lock.active,
                        active = lock[activeId];
                    active && (active.timer.c = null, active.timer.t = NaN, --lock.count, delete lock[activeId], active.event && active.event.interrupt.call(node, node.__data__, active.index));
                    for (var cancelId in lock)
                        if (+cancelId < id) {
                            var cancel = lock[cancelId];
                            cancel.timer.c = null, cancel.timer.t = NaN, --lock.count, delete lock[cancelId]
                        } timer.c = tick, d3_timer(function() {
                        return timer.c && tick(elapsed || 1) && (timer.c = null, timer.t = NaN), 1
                    }, 0, time), lock.active = id, transition.event && transition.event.start.call(node, node.__data__, i), tweens = [], transition.tween.forEach(function(key, value) {
                        (value = value.call(node, node.__data__, i)) && tweens.push(value)
                    }), ease = transition.ease, duration = transition.duration
                }

                function tick(elapsed) {
                    for (var t = elapsed / duration, e = ease(t), n = tweens.length; n > 0;) tweens[--n].call(node, e);
                    if (t >= 1) return transition.event && transition.event.end.call(node, node.__data__, i), --lock.count ? delete lock[id] : delete node[ns], 1
                }
                var time, timer, duration, ease, tweens, lock = node[ns] || (node[ns] = {
                        active: 0,
                        count: 0
                    }),
                    transition = lock[id];
                transition || (time = inherit.time, timer = d3_timer(schedule, 0, time), transition = lock[id] = {
                    tween: new d3_Map,
                    time: time,
                    timer: timer,
                    delay: inherit.delay,
                    duration: inherit.duration,
                    ease: inherit.ease,
                    index: i
                }, inherit = null, ++lock.count)
            }

            function d3_svg_axisX(selection, x0, x1) {
                selection.attr("transform", function(d) {
                    var v0 = x0(d);
                    return "translate(" + (isFinite(v0) ? v0 : x1(d)) + ",0)"
                })
            }

            function d3_svg_axisY(selection, y0, y1) {
                selection.attr("transform", function(d) {
                    var v0 = y0(d);
                    return "translate(0," + (isFinite(v0) ? v0 : y1(d)) + ")"
                })
            }

            function d3_time_formatIsoNative(date) {
                return date.toISOString()
            }

            function d3_time_scale(linear, methods, format) {
                function scale(x) {
                    return linear(x)
                }

                function tickMethod(extent, count) {
                    var span = extent[1] - extent[0],
                        target = span / count,
                        i = d3.bisect(d3_time_scaleSteps, target);
                    return i == d3_time_scaleSteps.length ? [methods.year, d3_scale_linearTickRange(extent.map(function(d) {
                        return d / 31536e6
                    }), count)[2]] : i ? methods[target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target ? i - 1 : i] : [d3_time_scaleMilliseconds, d3_scale_linearTickRange(extent, count)[2]]
                }
                return scale.invert = function(x) {
                    return d3_time_scaleDate(linear.invert(x))
                }, scale.domain = function(x) {
                    return arguments.length ? (linear.domain(x), scale) : linear.domain().map(d3_time_scaleDate)
                }, scale.nice = function(interval, skip) {
                    function skipped(date) {
                        return !isNaN(date) && !interval.range(date, d3_time_scaleDate(+date + 1), skip).length
                    }
                    var domain = scale.domain(),
                        extent = d3_scaleExtent(domain),
                        method = null == interval ? tickMethod(extent, 10) : "number" == typeof interval && tickMethod(extent, interval);
                    return method && (interval = method[0], skip = method[1]), scale.domain(d3_scale_nice(domain, skip > 1 ? {
                        floor: function(date) {
                            for (; skipped(date = interval.floor(date));) date = d3_time_scaleDate(date - 1);
                            return date
                        },
                        ceil: function(date) {
                            for (; skipped(date = interval.ceil(date));) date = d3_time_scaleDate(+date + 1);
                            return date
                        }
                    } : interval))
                }, scale.ticks = function(interval, skip) {
                    var extent = d3_scaleExtent(scale.domain()),
                        method = null == interval ? tickMethod(extent, 10) : "number" == typeof interval ? tickMethod(extent, interval) : !interval.range && [{
                            range: interval
                        }, skip];
                    return method && (interval = method[0], skip = method[1]), interval.range(extent[0], d3_time_scaleDate(+extent[1] + 1), skip < 1 ? 1 : skip)
                }, scale.tickFormat = function() {
                    return format
                }, scale.copy = function() {
                    return d3_time_scale(linear.copy(), methods, format)
                }, d3_scale_linearRebind(scale, linear)
            }

            function d3_time_scaleDate(t) {
                return new Date(t)
            }

            function d3_json(request) {
                return JSON.parse(request.responseText)
            }

            function d3_html(request) {
                var range = d3_document.createRange();
                return range.selectNode(d3_document.body), range.createContextualFragment(request.responseText)
            }
            var d3 = {
                    version: "3.5.17"
                },
                d3_arraySlice = [].slice,
                d3_array = function(list) {
                    return d3_arraySlice.call(list)
                },
                d3_document = this.document;
            if (d3_document) try {
                d3_array(d3_document.documentElement.childNodes)[0].nodeType
            } catch (e) {
                d3_array = function(list) {
                    for (var i = list.length, array = new Array(i); i--;) array[i] = list[i];
                    return array
                }
            }
            if (Date.now || (Date.now = function() {
                    return +new Date
                }), d3_document) try {
                d3_document.createElement("DIV").style.setProperty("opacity", 0, "")
            } catch (error) {
                var d3_element_prototype = this.Element.prototype,
                    d3_element_setAttribute = d3_element_prototype.setAttribute,
                    d3_element_setAttributeNS = d3_element_prototype.setAttributeNS,
                    d3_style_prototype = this.CSSStyleDeclaration.prototype,
                    d3_style_setProperty = d3_style_prototype.setProperty;
                d3_element_prototype.setAttribute = function(name, value) {
                    d3_element_setAttribute.call(this, name, value + "")
                }, d3_element_prototype.setAttributeNS = function(space, local, value) {
                    d3_element_setAttributeNS.call(this, space, local, value + "")
                }, d3_style_prototype.setProperty = function(name, value, priority) {
                    d3_style_setProperty.call(this, name, value + "", priority)
                }
            }
            d3.ascending = d3_ascending, d3.descending = function(a, b) {
                return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
            }, d3.min = function(array, f) {
                var a, b, i = -1,
                    n = array.length;
                if (1 === arguments.length) {
                    for (; ++i < n;)
                        if (null != (b = array[i]) && b >= b) {
                            a = b;
                            break
                        } for (; ++i < n;) null != (b = array[i]) && a > b && (a = b)
                } else {
                    for (; ++i < n;)
                        if (null != (b = f.call(array, array[i], i)) && b >= b) {
                            a = b;
                            break
                        } for (; ++i < n;) null != (b = f.call(array, array[i], i)) && a > b && (a = b)
                }
                return a
            }, d3.max = function(array, f) {
                var a, b, i = -1,
                    n = array.length;
                if (1 === arguments.length) {
                    for (; ++i < n;)
                        if (null != (b = array[i]) && b >= b) {
                            a = b;
                            break
                        } for (; ++i < n;) null != (b = array[i]) && b > a && (a = b)
                } else {
                    for (; ++i < n;)
                        if (null != (b = f.call(array, array[i], i)) && b >= b) {
                            a = b;
                            break
                        } for (; ++i < n;) null != (b = f.call(array, array[i], i)) && b > a && (a = b)
                }
                return a
            }, d3.extent = function(array, f) {
                var a, b, c, i = -1,
                    n = array.length;
                if (1 === arguments.length) {
                    for (; ++i < n;)
                        if (null != (b = array[i]) && b >= b) {
                            a = c = b;
                            break
                        } for (; ++i < n;) null != (b = array[i]) && (a > b && (a = b), c < b && (c = b))
                } else {
                    for (; ++i < n;)
                        if (null != (b = f.call(array, array[i], i)) && b >= b) {
                            a = c = b;
                            break
                        } for (; ++i < n;) null != (b = f.call(array, array[i], i)) && (a > b && (a = b), c < b && (c = b))
                }
                return [a, c]
            }, d3.sum = function(array, f) {
                var a, s = 0,
                    n = array.length,
                    i = -1;
                if (1 === arguments.length)
                    for (; ++i < n;) d3_numeric(a = +array[i]) && (s += a);
                else
                    for (; ++i < n;) d3_numeric(a = +f.call(array, array[i], i)) && (s += a);
                return s
            }, d3.mean = function(array, f) {
                var a, s = 0,
                    n = array.length,
                    i = -1,
                    j = n;
                if (1 === arguments.length)
                    for (; ++i < n;) d3_numeric(a = d3_number(array[i])) ? s += a : --j;
                else
                    for (; ++i < n;) d3_numeric(a = d3_number(f.call(array, array[i], i))) ? s += a : --j;
                if (j) return s / j
            }, d3.quantile = function(values, p) {
                var H = (values.length - 1) * p + 1,
                    h = Math.floor(H),
                    v = +values[h - 1],
                    e = H - h;
                return e ? v + e * (values[h] - v) : v
            }, d3.median = function(array, f) {
                var a, numbers = [],
                    n = array.length,
                    i = -1;
                if (1 === arguments.length)
                    for (; ++i < n;) d3_numeric(a = d3_number(array[i])) && numbers.push(a);
                else
                    for (; ++i < n;) d3_numeric(a = d3_number(f.call(array, array[i], i))) && numbers.push(a);
                if (numbers.length) return d3.quantile(numbers.sort(d3_ascending), .5)
            }, d3.variance = function(array, f) {
                var a, d, n = array.length,
                    m = 0,
                    s = 0,
                    i = -1,
                    j = 0;
                if (1 === arguments.length)
                    for (; ++i < n;) d3_numeric(a = d3_number(array[i])) && (d = a - m, m += d / ++j, s += d * (a - m));
                else
                    for (; ++i < n;) d3_numeric(a = d3_number(f.call(array, array[i], i))) && (d = a - m, m += d / ++j, s += d * (a - m));
                if (j > 1) return s / (j - 1)
            }, d3.deviation = function() {
                var v = d3.variance.apply(this, arguments);
                return v ? Math.sqrt(v) : v
            };
            var d3_bisect = d3_bisector(d3_ascending);
            d3.bisectLeft = d3_bisect.left, d3.bisect = d3.bisectRight = d3_bisect.right, d3.bisector = function(f) {
                return d3_bisector(1 === f.length ? function(d, x) {
                    return d3_ascending(f(d), x)
                } : f)
            }, d3.permute = function(array, indexes) {
                for (var i = indexes.length, permutes = new Array(i); i--;) permutes[i] = array[indexes[i]];
                return permutes
            }, d3.pairs = function(array) {
                for (var i = 0, n = array.length - 1, p1 = array[0], pairs = new Array(n < 0 ? 0 : n); i < n;) pairs[i] = [p1, p1 = array[++i]];
                return pairs
            }, d3.transpose = function(matrix) {
                if (!(n = matrix.length)) return [];
                for (var i = -1, m = d3.min(matrix, d3_transposeLength), transpose = new Array(m); ++i < m;)
                    for (var n, j = -1, row = transpose[i] = new Array(n); ++j < n;) row[j] = matrix[j][i];
                return transpose
            }, d3.zip = function() {
                return d3.transpose(arguments)
            }, d3.keys = function(map) {
                var keys = [];
                for (var key in map) keys.push(key);
                return keys
            }, d3.values = function(map) {
                var values = [];
                for (var key in map) values.push(map[key]);
                return values
            }, d3.entries = function(map) {
                var entries = [];
                for (var key in map) entries.push({
                    key: key,
                    value: map[key]
                });
                return entries
            }, d3.merge = function(arrays) {
                for (var m, merged, array, n = arrays.length, i = -1, j = 0; ++i < n;) j += arrays[i].length;
                for (merged = new Array(j); --n >= 0;)
                    for (array = arrays[n], m = array.length; --m >= 0;) merged[--j] = array[m];
                return merged
            };
            var abs = Math.abs;
            d3.range = function(start, stop, step) {
                if (arguments.length < 3 && (step = 1, arguments.length < 2 && (stop = start, start = 0)), (stop - start) / step == 1 / 0) throw new Error("infinite range");
                var j, range = [],
                    k = d3_range_integerScale(abs(step)),
                    i = -1;
                if (start *= k, stop *= k, step *= k, step < 0)
                    for (;
                        (j = start + step * ++i) > stop;) range.push(j / k);
                else
                    for (;
                        (j = start + step * ++i) < stop;) range.push(j / k);
                return range
            }, d3.map = function(object, f) {
                var map = new d3_Map;
                if (object instanceof d3_Map) object.forEach(function(key, value) {
                    map.set(key, value)
                });
                else if (Array.isArray(object)) {
                    var o, i = -1,
                        n = object.length;
                    if (1 === arguments.length)
                        for (; ++i < n;) map.set(i, object[i]);
                    else
                        for (; ++i < n;) map.set(f.call(object, o = object[i], i), o)
                } else
                    for (var key in object) map.set(key, object[key]);
                return map
            };
            var d3_map_proto = "__proto__",
                d3_map_zero = "\0";
            d3_class(d3_Map, {
                has: d3_map_has,
                get: function(key) {
                    return this._[d3_map_escape(key)]
                },
                set: function(key, value) {
                    return this._[d3_map_escape(key)] = value
                },
                remove: d3_map_remove,
                keys: d3_map_keys,
                values: function() {
                    var values = [];
                    for (var key in this._) values.push(this._[key]);
                    return values
                },
                entries: function() {
                    var entries = [];
                    for (var key in this._) entries.push({
                        key: d3_map_unescape(key),
                        value: this._[key]
                    });
                    return entries
                },
                size: d3_map_size,
                empty: d3_map_empty,
                forEach: function(f) {
                    for (var key in this._) f.call(this, d3_map_unescape(key), this._[key])
                }
            }), d3.nest = function() {
                function map(mapType, array, depth) {
                    if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
                    for (var keyValue, object, setter, values, i = -1, n = array.length, key = keys[depth++], valuesByKey = new d3_Map; ++i < n;)(values = valuesByKey.get(keyValue = key(object = array[i]))) ? values.push(object) : valuesByKey.set(keyValue, [object]);
                    return mapType ? (object = mapType(), setter = function(keyValue, values) {
                        object.set(keyValue, map(mapType, values, depth))
                    }) : (object = {}, setter = function(keyValue, values) {
                        object[keyValue] = map(mapType, values, depth)
                    }), valuesByKey.forEach(setter), object
                }

                function entries(map, depth) {
                    if (depth >= keys.length) return map;
                    var array = [],
                        sortKey = sortKeys[depth++];
                    return map.forEach(function(key, keyMap) {
                        array.push({
                            key: key,
                            values: entries(keyMap, depth)
                        })
                    }), sortKey ? array.sort(function(a, b) {
                        return sortKey(a.key, b.key)
                    }) : array
                }
                var sortValues, rollup, nest = {},
                    keys = [],
                    sortKeys = [];
                return nest.map = function(array, mapType) {
                    return map(mapType, array, 0)
                }, nest.entries = function(array) {
                    return entries(map(d3.map, array, 0), 0)
                }, nest.key = function(d) {
                    return keys.push(d), nest
                }, nest.sortKeys = function(order) {
                    return sortKeys[keys.length - 1] = order, nest
                }, nest.sortValues = function(order) {
                    return sortValues = order, nest
                }, nest.rollup = function(f) {
                    return rollup = f, nest
                }, nest
            }, d3.set = function(array) {
                var set = new d3_Set;
                if (array)
                    for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
                return set
            }, d3_class(d3_Set, {
                has: d3_map_has,
                add: function(key) {
                    return this._[d3_map_escape(key += "")] = !0, key
                },
                remove: d3_map_remove,
                values: d3_map_keys,
                size: d3_map_size,
                empty: d3_map_empty,
                forEach: function(f) {
                    for (var key in this._) f.call(this, d3_map_unescape(key))
                }
            }), d3.behavior = {}, d3.rebind = function(target, source) {
                for (var method, i = 1, n = arguments.length; ++i < n;) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
                return target
            };
            var d3_vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];
            d3.dispatch = function() {
                for (var dispatch = new d3_dispatch, i = -1, n = arguments.length; ++i < n;) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
                return dispatch
            }, d3_dispatch.prototype.on = function(type, listener) {
                var i = type.indexOf("."),
                    name = "";
                if (i >= 0 && (name = type.slice(i + 1), type = type.slice(0, i)), type) return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
                if (2 === arguments.length) {
                    if (null == listener)
                        for (type in this) this.hasOwnProperty(type) && this[type].on(name, null);
                    return this
                }
            }, d3.event = null, d3.requote = function(s) {
                return s.replace(d3_requote_re, "\\$&")
            };
            var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
                d3_subclass = {}.__proto__ ? function(object, prototype) {
                    object.__proto__ = prototype
                } : function(object, prototype) {
                    for (var property in prototype) object[property] = prototype[property]
                },
                d3_select = function(s, n) {
                    return n.querySelector(s)
                },
                d3_selectAll = function(s, n) {
                    return n.querySelectorAll(s)
                },
                d3_selectMatches = function(n, s) {
                    var d3_selectMatcher = n.matches || n[d3_vendorSymbol(n, "matchesSelector")];
                    return (d3_selectMatches = function(n, s) {
                        return d3_selectMatcher.call(n, s)
                    })(n, s)
                };
            "function" == typeof Sizzle && (d3_select = function(s, n) {
                return Sizzle(s, n)[0] || null
            }, d3_selectAll = Sizzle, d3_selectMatches = Sizzle.matchesSelector), d3.selection = function() {
                return d3.select(d3_document.documentElement)
            };
            var d3_selectionPrototype = d3.selection.prototype = [];
            d3_selectionPrototype.select = function(selector) {
                var subgroup, subnode, group, node, subgroups = [];
                selector = d3_selection_selector(selector);
                for (var j = -1, m = this.length; ++j < m;) {
                    subgroups.push(subgroup = []), subgroup.parentNode = (group = this[j]).parentNode;
                    for (var i = -1, n = group.length; ++i < n;)(node = group[i]) ? (subgroup.push(subnode = selector.call(node, node.__data__, i, j)), subnode && "__data__" in node && (subnode.__data__ = node.__data__)) : subgroup.push(null)
                }
                return d3_selection(subgroups)
            }, d3_selectionPrototype.selectAll = function(selector) {
                var subgroup, node, subgroups = [];
                selector = d3_selection_selectorAll(selector);
                for (var j = -1, m = this.length; ++j < m;)
                    for (var group = this[j], i = -1, n = group.length; ++i < n;)(node = group[i]) && (subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j))), subgroup.parentNode = node);
                return d3_selection(subgroups)
            };
            var d3_nsXhtml = "http://www.w3.org/1999/xhtml",
                d3_nsPrefix = {
                    svg: "http://www.w3.org/2000/svg",
                    xhtml: d3_nsXhtml,
                    xlink: "http://www.w3.org/1999/xlink",
                    xml: "http://www.w3.org/XML/1998/namespace",
                    xmlns: "http://www.w3.org/2000/xmlns/"
                };
            d3.ns = {
                prefix: d3_nsPrefix,
                qualify: function(name) {
                    var i = name.indexOf(":"),
                        prefix = name;
                    return i >= 0 && "xmlns" !== (prefix = name.slice(0, i)) && (name = name.slice(i + 1)), d3_nsPrefix.hasOwnProperty(prefix) ? {
                        space: d3_nsPrefix[prefix],
                        local: name
                    } : name
                }
            }, d3_selectionPrototype.attr = function(name, value) {
                if (arguments.length < 2) {
                    if ("string" == typeof name) {
                        var node = this.node();
                        return name = d3.ns.qualify(name), name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name)
                    }
                    for (value in name) this.each(d3_selection_attr(value, name[value]));
                    return this
                }
                return this.each(d3_selection_attr(name, value))
            }, d3_selectionPrototype.classed = function(name, value) {
                if (arguments.length < 2) {
                    if ("string" == typeof name) {
                        var node = this.node(),
                            n = (name = d3_selection_classes(name)).length,
                            i = -1;
                        if (value = node.classList) {
                            for (; ++i < n;)
                                if (!value.contains(name[i])) return !1
                        } else
                            for (value = node.getAttribute("class"); ++i < n;)
                                if (!d3_selection_classedRe(name[i]).test(value)) return !1;
                        return !0
                    }
                    for (value in name) this.each(d3_selection_classed(value, name[value]));
                    return this
                }
                return this.each(d3_selection_classed(name, value))
            }, d3_selectionPrototype.style = function(name, value, priority) {
                var n = arguments.length;
                if (n < 3) {
                    if ("string" != typeof name) {
                        n < 2 && (value = "");
                        for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
                        return this
                    }
                    if (n < 2) {
                        var node = this.node();
                        return d3_window(node).getComputedStyle(node, null).getPropertyValue(name)
                    }
                    priority = ""
                }
                return this.each(d3_selection_style(name, value, priority))
            }, d3_selectionPrototype.property = function(name, value) {
                if (arguments.length < 2) {
                    if ("string" == typeof name) return this.node()[name];
                    for (value in name) this.each(d3_selection_property(value, name[value]));
                    return this
                }
                return this.each(d3_selection_property(name, value))
            }, d3_selectionPrototype.text = function(value) {
                return arguments.length ? this.each("function" == typeof value ? function() {
                    var v = value.apply(this, arguments);
                    this.textContent = null == v ? "" : v
                } : null == value ? function() {
                    this.textContent = ""
                } : function() {
                    this.textContent = value
                }) : this.node().textContent
            }, d3_selectionPrototype.html = function(value) {
                return arguments.length ? this.each("function" == typeof value ? function() {
                    var v = value.apply(this, arguments);
                    this.innerHTML = null == v ? "" : v
                } : null == value ? function() {
                    this.innerHTML = ""
                } : function() {
                    this.innerHTML = value
                }) : this.node().innerHTML
            }, d3_selectionPrototype.append = function(name) {
                return name = d3_selection_creator(name), this.select(function() {
                    return this.appendChild(name.apply(this, arguments))
                })
            }, d3_selectionPrototype.insert = function(name, before) {
                return name = d3_selection_creator(name), before = d3_selection_selector(before), this.select(function() {
                    return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null)
                })
            }, d3_selectionPrototype.remove = function() {
                return this.each(d3_selectionRemove)
            }, d3_selectionPrototype.data = function(value, key) {
                function bind(group, groupData) {
                    var i, node, nodeData, n = group.length,
                        m = groupData.length,
                        n0 = Math.min(n, m),
                        updateNodes = new Array(m),
                        enterNodes = new Array(m),
                        exitNodes = new Array(n);
                    if (key) {
                        var keyValue, nodeByKeyValue = new d3_Map,
                            keyValues = new Array(n);
                        for (i = -1; ++i < n;)(node = group[i]) && (nodeByKeyValue.has(keyValue = key.call(node, node.__data__, i)) ? exitNodes[i] = node : nodeByKeyValue.set(keyValue, node), keyValues[i] = keyValue);
                        for (i = -1; ++i < m;)(node = nodeByKeyValue.get(keyValue = key.call(groupData, nodeData = groupData[i], i))) ? !0 !== node && (updateNodes[i] = node, node.__data__ = nodeData) : enterNodes[i] = d3_selection_dataNode(nodeData), nodeByKeyValue.set(keyValue, !0);
                        for (i = -1; ++i < n;) i in keyValues && !0 !== nodeByKeyValue.get(keyValues[i]) && (exitNodes[i] = group[i])
                    } else {
                        for (i = -1; ++i < n0;) node = group[i], nodeData = groupData[i], node ? (node.__data__ = nodeData, updateNodes[i] = node) : enterNodes[i] = d3_selection_dataNode(nodeData);
                        for (; i < m; ++i) enterNodes[i] = d3_selection_dataNode(groupData[i]);
                        for (; i < n; ++i) exitNodes[i] = group[i]
                    }
                    enterNodes.update = updateNodes, enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode, enter.push(enterNodes), update.push(updateNodes), exit.push(exitNodes)
                }
                var group, node, i = -1,
                    n = this.length;
                if (!arguments.length) {
                    for (value = new Array(n = (group = this[0]).length); ++i < n;)(node = group[i]) && (value[i] = node.__data__);
                    return value
                }
                var enter = d3_selection_enter([]),
                    update = d3_selection([]),
                    exit = d3_selection([]);
                if ("function" == typeof value)
                    for (; ++i < n;) bind(group = this[i], value.call(group, group.parentNode.__data__, i));
                else
                    for (; ++i < n;) bind(group = this[i], value);
                return update.enter = function() {
                    return enter
                }, update.exit = function() {
                    return exit
                }, update
            }, d3_selectionPrototype.datum = function(value) {
                return arguments.length ? this.property("__data__", value) : this.property("__data__")
            }, d3_selectionPrototype.filter = function(filter) {
                var subgroup, group, node, subgroups = [];
                "function" != typeof filter && (filter = d3_selection_filter(filter));
                for (var j = 0, m = this.length; j < m; j++) {
                    subgroups.push(subgroup = []), subgroup.parentNode = (group = this[j]).parentNode;
                    for (var i = 0, n = group.length; i < n; i++)(node = group[i]) && filter.call(node, node.__data__, i, j) && subgroup.push(node)
                }
                return d3_selection(subgroups)
            }, d3_selectionPrototype.order = function() {
                for (var j = -1, m = this.length; ++j < m;)
                    for (var node, group = this[j], i = group.length - 1, next = group[i]; --i >= 0;)(node = group[i]) && (next && next !== node.nextSibling && next.parentNode.insertBefore(node, next), next = node);
                return this
            }, d3_selectionPrototype.sort = function(comparator) {
                comparator = d3_selection_sortComparator.apply(this, arguments);
                for (var j = -1, m = this.length; ++j < m;) this[j].sort(comparator);
                return this.order()
            }, d3_selectionPrototype.each = function(callback) {
                return d3_selection_each(this, function(node, i, j) {
                    callback.call(node, node.__data__, i, j)
                })
            }, d3_selectionPrototype.call = function(callback) {
                var args = d3_array(arguments);
                return callback.apply(args[0] = this, args), this
            }, d3_selectionPrototype.empty = function() {
                return !this.node()
            }, d3_selectionPrototype.node = function() {
                for (var j = 0, m = this.length; j < m; j++)
                    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
                        var node = group[i];
                        if (node) return node
                    }
                return null
            }, d3_selectionPrototype.size = function() {
                var n = 0;
                return d3_selection_each(this, function() {
                    ++n
                }), n
            };
            var d3_selection_enterPrototype = [];
            d3.selection.enter = d3_selection_enter, d3.selection.enter.prototype = d3_selection_enterPrototype, d3_selection_enterPrototype.append = d3_selectionPrototype.append, d3_selection_enterPrototype.empty = d3_selectionPrototype.empty, d3_selection_enterPrototype.node = d3_selectionPrototype.node, d3_selection_enterPrototype.call = d3_selectionPrototype.call, d3_selection_enterPrototype.size = d3_selectionPrototype.size, d3_selection_enterPrototype.select = function(selector) {
                for (var subgroup, subnode, upgroup, group, node, subgroups = [], j = -1, m = this.length; ++j < m;) {
                    upgroup = (group = this[j]).update, subgroups.push(subgroup = []), subgroup.parentNode = group.parentNode;
                    for (var i = -1, n = group.length; ++i < n;)(node = group[i]) ? (subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j)), subnode.__data__ = node.__data__) : subgroup.push(null)
                }
                return d3_selection(subgroups)
            }, d3_selection_enterPrototype.insert = function(name, before) {
                return arguments.length < 2 && (before = d3_selection_enterInsertBefore(this)), d3_selectionPrototype.insert.call(this, name, before)
            }, d3.select = function(node) {
                var group;
                return "string" == typeof node ? (group = [d3_select(node, d3_document)], group.parentNode = d3_document.documentElement) : (group = [node], group.parentNode = d3_documentElement(node)), d3_selection([group])
            }, d3.selectAll = function(nodes) {
                var group;
                return "string" == typeof nodes ? (group = d3_array(d3_selectAll(nodes, d3_document)), group.parentNode = d3_document.documentElement) : (group = d3_array(nodes), group.parentNode = null), d3_selection([group])
            }, d3_selectionPrototype.on = function(type, listener, capture) {
                var n = arguments.length;
                if (n < 3) {
                    if ("string" != typeof type) {
                        n < 2 && (listener = !1);
                        for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
                        return this
                    }
                    if (n < 2) return (n = this.node()["__on" + type]) && n._;
                    capture = !1
                }
                return this.each(d3_selection_on(type, listener, capture))
            };
            var d3_selection_onFilters = d3.map({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            });
            d3_document && d3_selection_onFilters.forEach(function(k) {
                "on" + k in d3_document && d3_selection_onFilters.remove(k)
            });
            var d3_event_dragSelect, d3_event_dragId = 0;
            d3.mouse = function(container) {
                return d3_mousePoint(container, d3_eventSource())
            };
            var d3_mouse_bug44083 = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
            d3.touch = function(container, touches, identifier) {
                if (arguments.length < 3 && (identifier = touches, touches = d3_eventSource().changedTouches), touches)
                    for (var touch, i = 0, n = touches.length; i < n; ++i)
                        if ((touch = touches[i]).identifier === identifier) return d3_mousePoint(container, touch)
            }, d3.behavior.drag = function() {
                function drag() {
                    this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart)
                }

                function dragstart(id, position, subject, move, end) {
                    return function() {
                        function moved() {
                            var dx, dy, position1 = position(parent, dragId);
                            position1 && (dx = position1[0] - position0[0], dy = position1[1] - position0[1], dragged |= dx | dy, position0 = position1, dispatch({
                                type: "drag",
                                x: position1[0] + dragOffset[0],
                                y: position1[1] + dragOffset[1],
                                dx: dx,
                                dy: dy
                            }))
                        }

                        function ended() {
                            position(parent, dragId) && (dragSubject.on(move + dragName, null).on(end + dragName, null), dragRestore(dragged), dispatch({
                                type: "dragend"
                            }))
                        }
                        var dragOffset, that = this,
                            target = d3.event.target.correspondingElement || d3.event.target,
                            parent = that.parentNode,
                            dispatch = event.of(that, arguments),
                            dragged = 0,
                            dragId = id(),
                            dragName = ".drag" + (null == dragId ? "" : "-" + dragId),
                            dragSubject = d3.select(subject(target)).on(move + dragName, moved).on(end + dragName, ended),
                            dragRestore = d3_event_dragSuppress(target),
                            position0 = position(parent, dragId);
                        origin ? (dragOffset = origin.apply(that, arguments), dragOffset = [dragOffset.x - position0[0], dragOffset.y - position0[1]]) : dragOffset = [0, 0], dispatch({
                            type: "dragstart"
                        })
                    }
                }
                var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"),
                    origin = null,
                    mousedown = dragstart(d3_noop, d3.mouse, d3_window, "mousemove", "mouseup"),
                    touchstart = dragstart(d3_behavior_dragTouchId, d3.touch, d3_identity, "touchmove", "touchend");
                return drag.origin = function(x) {
                    return arguments.length ? (origin = x, drag) : origin
                }, d3.rebind(drag, event, "on")
            }, d3.touches = function(container, touches) {
                return arguments.length < 2 && (touches = d3_eventSource().touches), touches ? d3_array(touches).map(function(touch) {
                    var point = d3_mousePoint(container, touch);
                    return point.identifier = touch.identifier, point
                }) : []
            };
            var ε = 1e-6,
                ε2 = ε * ε,
                π = Math.PI,
                τ = 2 * π,
                τε = τ - ε,
                halfπ = π / 2,
                d3_radians = π / 180,
                d3_degrees = 180 / π,
                ρ = Math.SQRT2;
            d3.interpolateZoom = function(p0, p1) {
                var i, S, ux0 = p0[0],
                    uy0 = p0[1],
                    w0 = p0[2],
                    ux1 = p1[0],
                    uy1 = p1[1],
                    w1 = p1[2],
                    dx = ux1 - ux0,
                    dy = uy1 - uy0,
                    d2 = dx * dx + dy * dy;
                if (d2 < ε2) S = Math.log(w1 / w0) / ρ, i = function(t) {
                    return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(ρ * t * S)]
                };
                else {
                    var d1 = Math.sqrt(d2),
                        b0 = (w1 * w1 - w0 * w0 + 4 * d2) / (2 * w0 * 2 * d1),
                        b1 = (w1 * w1 - w0 * w0 - 4 * d2) / (2 * w1 * 2 * d1),
                        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
                        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
                    S = (r1 - r0) / ρ, i = function(t) {
                        var s = t * S,
                            coshr0 = d3_cosh(r0),
                            u = w0 / (2 * d1) * (coshr0 * d3_tanh(ρ * s + r0) - d3_sinh(r0));
                        return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / d3_cosh(ρ * s + r0)]
                    }
                }
                return i.duration = 1e3 * S, i
            }, d3.behavior.zoom = function() {
                function zoom(g) {
                    g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted)
                }

                function location(p) {
                    return [(p[0] - view.x) / view.k, (p[1] - view.y) / view.k]
                }

                function point(l) {
                    return [l[0] * view.k + view.x, l[1] * view.k + view.y]
                }

                function scaleTo(s) {
                    view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s))
                }

                function translateTo(p, l) {
                    l = point(l), view.x += p[0] - l[0], view.y += p[1] - l[1]
                }

                function zoomTo(that, p, l, k) {
                    that.__chart__ = {
                        x: view.x,
                        y: view.y,
                        k: view.k
                    }, scaleTo(Math.pow(2, k)), translateTo(center0 = p, l), that = d3.select(that), duration > 0 && (that = that.transition().duration(duration)), that.call(zoom.event)
                }

                function rescale() {
                    x1 && x1.domain(x0.range().map(function(x) {
                        return (x - view.x) / view.k
                    }).map(x0.invert)), y1 && y1.domain(y0.range().map(function(y) {
                        return (y - view.y) / view.k
                    }).map(y0.invert))
                }

                function zoomstarted(dispatch) {
                    zooming++ || dispatch({
                        type: "zoomstart"
                    })
                }

                function zoomed(dispatch) {
                    rescale(), dispatch({
                        type: "zoom",
                        scale: view.k,
                        translate: [view.x, view.y]
                    })
                }

                function zoomended(dispatch) {
                    --zooming || (dispatch({
                        type: "zoomend"
                    }), center0 = null)
                }

                function mousedowned() {
                    function moved() {
                        dragged = 1, translateTo(d3.mouse(that), location0), zoomed(dispatch)
                    }

                    function ended() {
                        subject.on(mousemove, null).on(mouseup, null), dragRestore(dragged), zoomended(dispatch)
                    }
                    var that = this,
                        dispatch = event.of(that, arguments),
                        dragged = 0,
                        subject = d3.select(d3_window(that)).on(mousemove, moved).on(mouseup, ended),
                        location0 = location(d3.mouse(that)),
                        dragRestore = d3_event_dragSuppress(that);
                    d3_selection_interrupt.call(that), zoomstarted(dispatch)
                }

                function touchstarted() {
                    function relocate() {
                        var touches = d3.touches(that);
                        return scale0 = view.k, touches.forEach(function(t) {
                            t.identifier in locations0 && (locations0[t.identifier] = location(t))
                        }), touches
                    }

                    function started() {
                        var target = d3.event.target;
                        d3.select(target).on(touchmove, moved).on(touchend, ended), targets.push(target);
                        for (var changed = d3.event.changedTouches, i = 0, n = changed.length; i < n; ++i) locations0[changed[i].identifier] = null;
                        var touches = relocate(),
                            now = Date.now();
                        if (1 === touches.length) {
                            if (now - touchtime < 500) {
                                var p = touches[0];
                                zoomTo(that, p, locations0[p.identifier], Math.floor(Math.log(view.k) / Math.LN2) + 1), d3_eventPreventDefault()
                            }
                            touchtime = now
                        } else if (touches.length > 1) {
                            var p = touches[0],
                                q = touches[1],
                                dx = p[0] - q[0],
                                dy = p[1] - q[1];
                            distance0 = dx * dx + dy * dy
                        }
                    }

                    function moved() {
                        var p0, l0, p1, l1, touches = d3.touches(that);
                        d3_selection_interrupt.call(that);
                        for (var i = 0, n = touches.length; i < n; ++i, l1 = null)
                            if (p1 = touches[i], l1 = locations0[p1.identifier]) {
                                if (l0) break;
                                p0 = p1, l0 = l1
                            } if (l1) {
                            var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1,
                                scale1 = distance0 && Math.sqrt(distance1 / distance0);
                            p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2], l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2], scaleTo(scale1 * scale0)
                        }
                        touchtime = null, translateTo(p0, l0), zoomed(dispatch)
                    }

                    function ended() {
                        if (d3.event.touches.length) {
                            for (var changed = d3.event.changedTouches, i = 0, n = changed.length; i < n; ++i) delete locations0[changed[i].identifier];
                            for (var identifier in locations0) return void relocate()
                        }
                        d3.selectAll(targets).on(zoomName, null), subject.on(mousedown, mousedowned).on(touchstart, touchstarted), dragRestore(), zoomended(dispatch)
                    }
                    var scale0, that = this,
                        dispatch = event.of(that, arguments),
                        locations0 = {},
                        distance0 = 0,
                        zoomName = ".zoom-" + d3.event.changedTouches[0].identifier,
                        touchmove = "touchmove" + zoomName,
                        touchend = "touchend" + zoomName,
                        targets = [],
                        subject = d3.select(that),
                        dragRestore = d3_event_dragSuppress(that);
                    started(), zoomstarted(dispatch), subject.on(mousedown, null).on(touchstart, started)
                }

                function mousewheeled() {
                    var dispatch = event.of(this, arguments);
                    mousewheelTimer ? clearTimeout(mousewheelTimer) : (d3_selection_interrupt.call(this), translate0 = location(center0 = center || d3.mouse(this)), zoomstarted(dispatch)), mousewheelTimer = setTimeout(function() {
                        mousewheelTimer = null, zoomended(dispatch)
                    }, 50), d3_eventPreventDefault(), scaleTo(Math.pow(2, .002 * d3_behavior_zoomDelta()) * view.k), translateTo(center0, translate0), zoomed(dispatch)
                }

                function dblclicked() {
                    var p = d3.mouse(this),
                        k = Math.log(view.k) / Math.LN2;
                    zoomTo(this, p, location(p), d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1)
                }
                var translate0, center0, center, mousewheelTimer, touchtime, x0, x1, y0, y1, view = {
                        x: 0,
                        y: 0,
                        k: 1
                    },
                    size = [960, 500],
                    scaleExtent = d3_behavior_zoomInfinity,
                    duration = 250,
                    zooming = 0,
                    mousedown = "mousedown.zoom",
                    mousemove = "mousemove.zoom",
                    mouseup = "mouseup.zoom",
                    touchstart = "touchstart.zoom",
                    event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend");
                return d3_behavior_zoomWheel || (d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
                    return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1)
                }, "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() {
                    return d3.event.wheelDelta
                }, "mousewheel") : (d3_behavior_zoomDelta = function() {
                    return -d3.event.detail
                }, "MozMousePixelScroll")), zoom.event = function(g) {
                    g.each(function() {
                        var dispatch = event.of(this, arguments),
                            view1 = view;
                        d3_transitionInheritId ? d3.select(this).transition().each("start.zoom", function() {
                            view = this.__chart__ || {
                                x: 0,
                                y: 0,
                                k: 1
                            }, zoomstarted(dispatch)
                        }).tween("zoom:zoom", function() {
                            var dx = size[0],
                                dy = size[1],
                                cx = center0 ? center0[0] : dx / 2,
                                cy = center0 ? center0[1] : dy / 2,
                                i = d3.interpolateZoom([(cx - view.x) / view.k, (cy - view.y) / view.k, dx / view.k], [(cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k]);
                            return function(t) {
                                var l = i(t),
                                    k = dx / l[2];
                                this.__chart__ = view = {
                                    x: cx - l[0] * k,
                                    y: cy - l[1] * k,
                                    k: k
                                }, zoomed(dispatch)
                            }
                        }).each("interrupt.zoom", function() {
                            zoomended(dispatch)
                        }).each("end.zoom", function() {
                            zoomended(dispatch)
                        }) : (this.__chart__ = view, zoomstarted(dispatch), zoomed(dispatch), zoomended(dispatch))
                    })
                }, zoom.translate = function(_) {
                    return arguments.length ? (view = {
                        x: +_[0],
                        y: +_[1],
                        k: view.k
                    }, rescale(), zoom) : [view.x, view.y]
                }, zoom.scale = function(_) {
                    return arguments.length ? (view = {
                        x: view.x,
                        y: view.y,
                        k: null
                    }, scaleTo(+_), rescale(), zoom) : view.k
                }, zoom.scaleExtent = function(_) {
                    return arguments.length ? (scaleExtent = null == _ ? d3_behavior_zoomInfinity : [+_[0], +_[1]], zoom) : scaleExtent
                }, zoom.center = function(_) {
                    return arguments.length ? (center = _ && [+_[0], +_[1]], zoom) : center
                }, zoom.size = function(_) {
                    return arguments.length ? (size = _ && [+_[0], +_[1]], zoom) : size
                }, zoom.duration = function(_) {
                    return arguments.length ? (duration = +_, zoom) : duration
                }, zoom.x = function(z) {
                    return arguments.length ? (x1 = z, x0 = z.copy(), view = {
                        x: 0,
                        y: 0,
                        k: 1
                    }, zoom) : x1
                }, zoom.y = function(z) {
                    return arguments.length ? (y1 = z, y0 = z.copy(), view = {
                        x: 0,
                        y: 0,
                        k: 1
                    }, zoom) : y1
                }, d3.rebind(zoom, event, "on")
            };
            var d3_behavior_zoomDelta, d3_behavior_zoomWheel, d3_behavior_zoomInfinity = [0, 1 / 0];
            d3.color = d3_color, d3_color.prototype.toString = function() {
                return this.rgb() + ""
            }, d3.hsl = d3_hsl;
            var d3_hslPrototype = d3_hsl.prototype = new d3_color;
            d3_hslPrototype.brighter = function(k) {
                return k = Math.pow(.7, arguments.length ? k : 1), new d3_hsl(this.h, this.s, this.l / k)
            }, d3_hslPrototype.darker = function(k) {
                return k = Math.pow(.7, arguments.length ? k : 1), new d3_hsl(this.h, this.s, k * this.l)
            }, d3_hslPrototype.rgb = function() {
                return d3_hsl_rgb(this.h, this.s, this.l)
            }, d3.hcl = d3_hcl;
            var d3_hclPrototype = d3_hcl.prototype = new d3_color;
            d3_hclPrototype.brighter = function(k) {
                return new d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)))
            }, d3_hclPrototype.darker = function(k) {
                return new d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)))
            }, d3_hclPrototype.rgb = function() {
                return d3_hcl_lab(this.h, this.c, this.l).rgb()
            }, d3.lab = d3_lab;
            var d3_lab_K = 18,
                d3_lab_X = .95047,
                d3_lab_Y = 1,
                d3_lab_Z = 1.08883,
                d3_labPrototype = d3_lab.prototype = new d3_color;
            d3_labPrototype.brighter = function(k) {
                return new d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b)
            }, d3_labPrototype.darker = function(k) {
                return new d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b)
            }, d3_labPrototype.rgb = function() {
                return d3_lab_rgb(this.l, this.a, this.b)
            }, d3.rgb = d3_rgb;
            var d3_rgbPrototype = d3_rgb.prototype = new d3_color;
            d3_rgbPrototype.brighter = function(k) {
                k = Math.pow(.7, arguments.length ? k : 1);
                var r = this.r,
                    g = this.g,
                    b = this.b,
                    i = 30;
                return r || g || b ? (r && r < i && (r = i), g && g < i && (g = i), b && b < i && (b = i), new d3_rgb(Math.min(255, r / k), Math.min(255, g / k), Math.min(255, b / k))) : new d3_rgb(i, i, i)
            }, d3_rgbPrototype.darker = function(k) {
                return k = Math.pow(.7, arguments.length ? k : 1), new d3_rgb(k * this.r, k * this.g, k * this.b)
            }, d3_rgbPrototype.hsl = function() {
                return d3_rgb_hsl(this.r, this.g, this.b)
            }, d3_rgbPrototype.toString = function() {
                return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b)
            };
            var d3_rgb_names = d3.map({
                aliceblue: 15792383,
                antiquewhite: 16444375,
                aqua: 65535,
                aquamarine: 8388564,
                azure: 15794175,
                beige: 16119260,
                bisque: 16770244,
                black: 0,
                blanchedalmond: 16772045,
                blue: 255,
                blueviolet: 9055202,
                brown: 10824234,
                burlywood: 14596231,
                cadetblue: 6266528,
                chartreuse: 8388352,
                chocolate: 13789470,
                coral: 16744272,
                cornflowerblue: 6591981,
                cornsilk: 16775388,
                crimson: 14423100,
                cyan: 65535,
                darkblue: 139,
                darkcyan: 35723,
                darkgoldenrod: 12092939,
                darkgray: 11119017,
                darkgreen: 25600,
                darkgrey: 11119017,
                darkkhaki: 12433259,
                darkmagenta: 9109643,
                darkolivegreen: 5597999,
                darkorange: 16747520,
                darkorchid: 10040012,
                darkred: 9109504,
                darksalmon: 15308410,
                darkseagreen: 9419919,
                darkslateblue: 4734347,
                darkslategray: 3100495,
                darkslategrey: 3100495,
                darkturquoise: 52945,
                darkviolet: 9699539,
                deeppink: 16716947,
                deepskyblue: 49151,
                dimgray: 6908265,
                dimgrey: 6908265,
                dodgerblue: 2003199,
                firebrick: 11674146,
                floralwhite: 16775920,
                forestgreen: 2263842,
                fuchsia: 16711935,
                gainsboro: 14474460,
                ghostwhite: 16316671,
                gold: 16766720,
                goldenrod: 14329120,
                gray: 8421504,
                green: 32768,
                greenyellow: 11403055,
                grey: 8421504,
                honeydew: 15794160,
                hotpink: 16738740,
                indianred: 13458524,
                indigo: 4915330,
                ivory: 16777200,
                khaki: 15787660,
                lavender: 15132410,
                lavenderblush: 16773365,
                lawngreen: 8190976,
                lemonchiffon: 16775885,
                lightblue: 11393254,
                lightcoral: 15761536,
                lightcyan: 14745599,
                lightgoldenrodyellow: 16448210,
                lightgray: 13882323,
                lightgreen: 9498256,
                lightgrey: 13882323,
                lightpink: 16758465,
                lightsalmon: 16752762,
                lightseagreen: 2142890,
                lightskyblue: 8900346,
                lightslategray: 7833753,
                lightslategrey: 7833753,
                lightsteelblue: 11584734,
                lightyellow: 16777184,
                lime: 65280,
                limegreen: 3329330,
                linen: 16445670,
                magenta: 16711935,
                maroon: 8388608,
                mediumaquamarine: 6737322,
                mediumblue: 205,
                mediumorchid: 12211667,
                mediumpurple: 9662683,
                mediumseagreen: 3978097,
                mediumslateblue: 8087790,
                mediumspringgreen: 64154,
                mediumturquoise: 4772300,
                mediumvioletred: 13047173,
                midnightblue: 1644912,
                mintcream: 16121850,
                mistyrose: 16770273,
                moccasin: 16770229,
                navajowhite: 16768685,
                navy: 128,
                oldlace: 16643558,
                olive: 8421376,
                olivedrab: 7048739,
                orange: 16753920,
                orangered: 16729344,
                orchid: 14315734,
                palegoldenrod: 15657130,
                palegreen: 10025880,
                paleturquoise: 11529966,
                palevioletred: 14381203,
                papayawhip: 16773077,
                peachpuff: 16767673,
                peru: 13468991,
                pink: 16761035,
                plum: 14524637,
                powderblue: 11591910,
                purple: 8388736,
                rebeccapurple: 6697881,
                red: 16711680,
                rosybrown: 12357519,
                royalblue: 4286945,
                saddlebrown: 9127187,
                salmon: 16416882,
                sandybrown: 16032864,
                seagreen: 3050327,
                seashell: 16774638,
                sienna: 10506797,
                silver: 12632256,
                skyblue: 8900331,
                slateblue: 6970061,
                slategray: 7372944,
                slategrey: 7372944,
                snow: 16775930,
                springgreen: 65407,
                steelblue: 4620980,
                tan: 13808780,
                teal: 32896,
                thistle: 14204888,
                tomato: 16737095,
                turquoise: 4251856,
                violet: 15631086,
                wheat: 16113331,
                white: 16777215,
                whitesmoke: 16119285,
                yellow: 16776960,
                yellowgreen: 10145074
            });
            d3_rgb_names.forEach(function(key, value) {
                d3_rgb_names.set(key, d3_rgbNumber(value))
            }), d3.functor = d3_functor, d3.xhr = d3_xhrType(d3_identity), d3.dsv = function(delimiter, mimeType) {
                function dsv(url, row, callback) {
                    arguments.length < 3 && (callback = row, row = null);
                    var xhr = d3_xhr(url, mimeType, null == row ? response : typedResponse(row), callback);
                    return xhr.row = function(_) {
                        return arguments.length ? xhr.response(null == (row = _) ? response : typedResponse(_)) : row
                    }, xhr
                }

                function response(request) {
                    return dsv.parse(request.responseText)
                }

                function typedResponse(f) {
                    return function(request) {
                        return dsv.parse(request.responseText, f)
                    }
                }

                function formatRow(row) {
                    return row.map(formatValue).join(delimiter)
                }

                function formatValue(text) {
                    return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text
                }
                var reFormat = new RegExp('["' + delimiter + "\n]"),
                    delimiterCode = delimiter.charCodeAt(0);
                return dsv.parse = function(text, f) {
                    var o;
                    return dsv.parseRows(text, function(row, i) {
                        if (o) return o(row, i - 1);
                        var a = new Function("d", "return {" + row.map(function(name, i) {
                            return JSON.stringify(name) + ": d[" + i + "]"
                        }).join(",") + "}");
                        o = f ? function(row, i) {
                            return f(a(row), i)
                        } : a
                    })
                }, dsv.parseRows = function(text, f) {
                    function token() {
                        if (I >= N) return EOF;
                        if (eol) return eol = !1, EOL;
                        var j = I;
                        if (34 === text.charCodeAt(j)) {
                            for (var i = j; i++ < N;)
                                if (34 === text.charCodeAt(i)) {
                                    if (34 !== text.charCodeAt(i + 1)) break;
                                    ++i
                                } I = i + 2;
                            var c = text.charCodeAt(i + 1);
                            return 13 === c ? (eol = !0, 10 === text.charCodeAt(i + 2) && ++I) : 10 === c && (eol = !0), text.slice(j + 1, i).replace(/""/g, '"')
                        }
                        for (; I < N;) {
                            var c = text.charCodeAt(I++),
                                k = 1;
                            if (10 === c) eol = !0;
                            else if (13 === c) eol = !0, 10 === text.charCodeAt(I) && (++I, ++k);
                            else if (c !== delimiterCode) continue;
                            return text.slice(j, I - k)
                        }
                        return text.slice(j)
                    }
                    for (var t, eol, EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0;
                        (t = token()) !== EOF;) {
                        for (var a = []; t !== EOL && t !== EOF;) a.push(t), t = token();
                        f && null == (a = f(a, n++)) || rows.push(a)
                    }
                    return rows
                }, dsv.format = function(rows) {
                    if (Array.isArray(rows[0])) return dsv.formatRows(rows);
                    var fieldSet = new d3_Set,
                        fields = [];
                    return rows.forEach(function(row) {
                        for (var field in row) fieldSet.has(field) || fields.push(fieldSet.add(field))
                    }), [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
                        return fields.map(function(field) {
                            return formatValue(row[field])
                        }).join(delimiter)
                    })).join("\n")
                }, dsv.formatRows = function(rows) {
                    return rows.map(formatRow).join("\n")
                }, dsv
            }, d3.csv = d3.dsv(",", "text/csv"), d3.tsv = d3.dsv("\t", "text/tab-separated-values");
            var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_frame = this[d3_vendorSymbol(this, "requestAnimationFrame")] || function(callback) {
                setTimeout(callback, 17)
            };
            d3.timer = function() {
                d3_timer.apply(this, arguments)
            }, d3.timer.flush = function() {
                d3_timer_mark(), d3_timer_sweep()
            }, d3.round = function(x, n) {
                return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x)
            };
            var d3_formatPrefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(d3_formatPrefix);
            d3.formatPrefix = function(value, precision) {
                var i = 0;
                return (value = +value) && (value < 0 && (value *= -1), precision && (value = d3.round(value, d3_format_precision(value, precision))), i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10), i = Math.max(-24, Math.min(24, 3 * Math.floor((i - 1) / 3)))), d3_formatPrefixes[8 + i / 3]
            };
            var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
                d3_format_types = d3.map({
                    b: function(x) {
                        return x.toString(2)
                    },
                    c: function(x) {
                        return String.fromCharCode(x)
                    },
                    o: function(x) {
                        return x.toString(8)
                    },
                    x: function(x) {
                        return x.toString(16)
                    },
                    X: function(x) {
                        return x.toString(16).toUpperCase()
                    },
                    g: function(x, p) {
                        return x.toPrecision(p)
                    },
                    e: function(x, p) {
                        return x.toExponential(p)
                    },
                    f: function(x, p) {
                        return x.toFixed(p)
                    },
                    r: function(x, p) {
                        return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))))
                    }
                }),
                d3_time = d3.time = {},
                d3_date = Date;
            d3_date_utc.prototype = {
                getDate: function() {
                    return this._.getUTCDate()
                },
                getDay: function() {
                    return this._.getUTCDay()
                },
                getFullYear: function() {
                    return this._.getUTCFullYear()
                },
                getHours: function() {
                    return this._.getUTCHours()
                },
                getMilliseconds: function() {
                    return this._.getUTCMilliseconds()
                },
                getMinutes: function() {
                    return this._.getUTCMinutes()
                },
                getMonth: function() {
                    return this._.getUTCMonth()
                },
                getSeconds: function() {
                    return this._.getUTCSeconds()
                },
                getTime: function() {
                    return this._.getTime()
                },
                getTimezoneOffset: function() {
                    return 0
                },
                valueOf: function() {
                    return this._.valueOf()
                },
                setDate: function() {
                    d3_time_prototype.setUTCDate.apply(this._, arguments)
                },
                setDay: function() {
                    d3_time_prototype.setUTCDay.apply(this._, arguments)
                },
                setFullYear: function() {
                    d3_time_prototype.setUTCFullYear.apply(this._, arguments)
                },
                setHours: function() {
                    d3_time_prototype.setUTCHours.apply(this._, arguments)
                },
                setMilliseconds: function() {
                    d3_time_prototype.setUTCMilliseconds.apply(this._, arguments)
                },
                setMinutes: function() {
                    d3_time_prototype.setUTCMinutes.apply(this._, arguments)
                },
                setMonth: function() {
                    d3_time_prototype.setUTCMonth.apply(this._, arguments)
                },
                setSeconds: function() {
                    d3_time_prototype.setUTCSeconds.apply(this._, arguments)
                },
                setTime: function() {
                    d3_time_prototype.setTime.apply(this._, arguments)
                }
            };
            var d3_time_prototype = Date.prototype;
            d3_time.year = d3_time_interval(function(date) {
                return date = d3_time.day(date), date.setMonth(0, 1), date
            }, function(date, offset) {
                date.setFullYear(date.getFullYear() + offset)
            }, function(date) {
                return date.getFullYear()
            }), d3_time.years = d3_time.year.range, d3_time.years.utc = d3_time.year.utc.range, d3_time.day = d3_time_interval(function(date) {
                var day = new d3_date(2e3, 0);
                return day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate()), day
            }, function(date, offset) {
                date.setDate(date.getDate() + offset)
            }, function(date) {
                return date.getDate() - 1
            }), d3_time.days = d3_time.day.range, d3_time.days.utc = d3_time.day.utc.range, d3_time.dayOfYear = function(date) {
                var year = d3_time.year(date);
                return Math.floor((date - year - 6e4 * (date.getTimezoneOffset() - year.getTimezoneOffset())) / 864e5)
            }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(day, i) {
                i = 7 - i;
                var interval = d3_time[day] = d3_time_interval(function(date) {
                    return (date = d3_time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7), date
                }, function(date, offset) {
                    date.setDate(date.getDate() + 7 * Math.floor(offset))
                }, function(date) {
                    var day = d3_time.year(date).getDay();
                    return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i)
                });
                d3_time[day + "s"] = interval.range, d3_time[day + "s"].utc = interval.utc.range, d3_time[day + "OfYear"] = function(date) {
                    var day = d3_time.year(date).getDay();
                    return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7)
                }
            }), d3_time.week = d3_time.sunday, d3_time.weeks = d3_time.sunday.range, d3_time.weeks.utc = d3_time.sunday.utc.range, d3_time.weekOfYear = d3_time.sundayOfYear;
            var d3_time_formatPads = {
                    "-": "",
                    _: " ",
                    0: "0"
                },
                d3_time_numberRe = /^\s*\d+/,
                d3_time_percentRe = /^%/;
            d3.locale = function(locale) {
                return {
                    numberFormat: d3_locale_numberFormat(locale),
                    timeFormat: d3_locale_timeFormat(locale)
                }
            };
            var d3_locale_enUS = d3.locale({
                decimal: ".",
                thousands: ",",
                grouping: [3],
                currency: ["$", ""],
                dateTime: "%a %b %e %X %Y",
                date: "%m/%d/%Y",
                time: "%H:%M:%S",
                periods: ["AM", "PM"],
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            });
            d3.format = d3_locale_enUS.numberFormat, d3.geo = {}, d3_adder.prototype = {
                s: 0,
                t: 0,
                add: function(y) {
                    d3_adderSum(y, this.t, d3_adderTemp), d3_adderSum(d3_adderTemp.s, this.s, this), this.s ? this.t += d3_adderTemp.t : this.s = d3_adderTemp.t
                },
                reset: function() {
                    this.s = this.t = 0
                },
                valueOf: function() {
                    return this.s
                }
            };
            var d3_adderTemp = new d3_adder;
            d3.geo.stream = function(object, listener) {
                object && d3_geo_streamObjectType.hasOwnProperty(object.type) ? d3_geo_streamObjectType[object.type](object, listener) : d3_geo_streamGeometry(object, listener)
            };
            var d3_geo_streamObjectType = {
                    Feature: function(feature, listener) {
                        d3_geo_streamGeometry(feature.geometry, listener)
                    },
                    FeatureCollection: function(object, listener) {
                        for (var features = object.features, i = -1, n = features.length; ++i < n;) d3_geo_streamGeometry(features[i].geometry, listener)
                    }
                },
                d3_geo_streamGeometryType = {
                    Sphere: function(object, listener) {
                        listener.sphere()
                    },
                    Point: function(object, listener) {
                        object = object.coordinates, listener.point(object[0], object[1], object[2])
                    },
                    MultiPoint: function(object, listener) {
                        for (var coordinates = object.coordinates, i = -1, n = coordinates.length; ++i < n;) object = coordinates[i], listener.point(object[0], object[1], object[2])
                    },
                    LineString: function(object, listener) {
                        d3_geo_streamLine(object.coordinates, listener, 0)
                    },
                    MultiLineString: function(object, listener) {
                        for (var coordinates = object.coordinates, i = -1, n = coordinates.length; ++i < n;) d3_geo_streamLine(coordinates[i], listener, 0)
                    },
                    Polygon: function(object, listener) {
                        d3_geo_streamPolygon(object.coordinates, listener)
                    },
                    MultiPolygon: function(object, listener) {
                        for (var coordinates = object.coordinates, i = -1, n = coordinates.length; ++i < n;) d3_geo_streamPolygon(coordinates[i], listener)
                    },
                    GeometryCollection: function(object, listener) {
                        for (var geometries = object.geometries, i = -1, n = geometries.length; ++i < n;) d3_geo_streamGeometry(geometries[i], listener)
                    }
                };
            d3.geo.area = function(object) {
                return d3_geo_areaSum = 0, d3.geo.stream(object, d3_geo_area), d3_geo_areaSum
            };
            var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder,
                d3_geo_area = {
                    sphere: function() {
                        d3_geo_areaSum += 4 * π
                    },
                    point: d3_noop,
                    lineStart: d3_noop,
                    lineEnd: d3_noop,
                    polygonStart: function() {
                        d3_geo_areaRingSum.reset(), d3_geo_area.lineStart = d3_geo_areaRingStart
                    },
                    polygonEnd: function() {
                        var area = 2 * d3_geo_areaRingSum;
                        d3_geo_areaSum += area < 0 ? 4 * π + area : area, d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop
                    }
                };
            d3.geo.bounds = function() {
                function point(λ, φ) {
                    ranges.push(range = [λ0 = λ, λ1 = λ]), φ < φ0 && (φ0 = φ), φ > φ1 && (φ1 = φ)
                }

                function linePoint(λ, φ) {
                    var p = d3_geo_cartesian([λ * d3_radians, φ * d3_radians]);
                    if (p0) {
                        var normal = d3_geo_cartesianCross(p0, p),
                            equatorial = [normal[1], -normal[0], 0],
                            inflection = d3_geo_cartesianCross(equatorial, normal);
                        d3_geo_cartesianNormalize(inflection), inflection = d3_geo_spherical(inflection);
                        var dλ = λ - λ_,
                            s = dλ > 0 ? 1 : -1,
                            λi = inflection[0] * d3_degrees * s,
                            antimeridian = abs(dλ) > 180;
                        if (antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
                            var φi = inflection[1] * d3_degrees;
                            φi > φ1 && (φ1 = φi)
                        } else if (λi = (λi + 360) % 360 - 180, antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
                            var φi = -inflection[1] * d3_degrees;
                            φi < φ0 && (φ0 = φi)
                        } else φ < φ0 && (φ0 = φ), φ > φ1 && (φ1 = φ);
                        antimeridian ? λ < λ_ ? angle(λ0, λ) > angle(λ0, λ1) && (λ1 = λ) : angle(λ, λ1) > angle(λ0, λ1) && (λ0 = λ) : λ1 >= λ0 ? (λ < λ0 && (λ0 = λ), λ > λ1 && (λ1 = λ)) : λ > λ_ ? angle(λ0, λ) > angle(λ0, λ1) && (λ1 = λ) : angle(λ, λ1) > angle(λ0, λ1) && (λ0 = λ)
                    } else point(λ, φ);
                    p0 = p, λ_ = λ
                }

                function lineStart() {
                    bound.point = linePoint
                }

                function lineEnd() {
                    range[0] = λ0, range[1] = λ1, bound.point = point, p0 = null
                }

                function ringPoint(λ, φ) {
                    if (p0) {
                        var dλ = λ - λ_;
                        dλSum += abs(dλ) > 180 ? dλ + (dλ > 0 ? 360 : -360) : dλ
                    } else λ__ = λ, φ__ = φ;
                    d3_geo_area.point(λ, φ), linePoint(λ, φ)
                }

                function ringStart() {
                    d3_geo_area.lineStart()
                }

                function ringEnd() {
                    ringPoint(λ__, φ__), d3_geo_area.lineEnd(), abs(dλSum) > ε && (λ0 = -(λ1 = 180)), range[0] = λ0, range[1] = λ1, p0 = null
                }

                function angle(λ0, λ1) {
                    return (λ1 -= λ0) < 0 ? λ1 + 360 : λ1
                }

                function compareRanges(a, b) {
                    return a[0] - b[0]
                }

                function withinRange(x, range) {
                    return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x
                }
                var λ0, φ0, λ1, φ1, λ_, λ__, φ__, p0, dλSum, ranges, range, bound = {
                    point: point,
                    lineStart: lineStart,
                    lineEnd: lineEnd,
                    polygonStart: function() {
                        bound.point = ringPoint, bound.lineStart = ringStart, bound.lineEnd = ringEnd, dλSum = 0, d3_geo_area.polygonStart()
                    },
                    polygonEnd: function() {
                        d3_geo_area.polygonEnd(), bound.point = point, bound.lineStart = lineStart, bound.lineEnd = lineEnd, d3_geo_areaRingSum < 0 ? (λ0 = -(λ1 = 180), φ0 = -(φ1 = 90)) : dλSum > ε ? φ1 = 90 : dλSum < -ε && (φ0 = -90), range[0] = λ0, range[1] = λ1
                    }
                };
                return function(feature) {
                    φ1 = λ1 = -(λ0 = φ0 = 1 / 0), ranges = [], d3.geo.stream(feature, bound);
                    var n = ranges.length;
                    if (n) {
                        ranges.sort(compareRanges);
                        for (var b, i = 1, a = ranges[0], merged = [a]; i < n; ++i) b = ranges[i], withinRange(b[0], a) || withinRange(b[1], a) ? (angle(a[0], b[1]) > angle(a[0], a[1]) && (a[1] = b[1]), angle(b[0], a[1]) > angle(a[0], a[1]) && (a[0] = b[0])) : merged.push(a = b);
                        for (var dλ, b, best = -1 / 0, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) b = merged[i], (dλ = angle(a[1], b[0])) > best && (best = dλ, λ0 = b[0], λ1 = a[1])
                    }
                    return ranges = range = null, λ0 === 1 / 0 || φ0 === 1 / 0 ? [
                        [NaN, NaN],
                        [NaN, NaN]
                    ] : [
                        [λ0, φ0],
                        [λ1, φ1]
                    ]
                }
            }(), d3.geo.centroid = function(object) {
                d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0, d3.geo.stream(object, d3_geo_centroid);
                var x = d3_geo_centroidX2,
                    y = d3_geo_centroidY2,
                    z = d3_geo_centroidZ2,
                    m = x * x + y * y + z * z;
                return m < ε2 && (x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1, d3_geo_centroidW1 < ε && (x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0), (m = x * x + y * y + z * z) < ε2) ? [NaN, NaN] : [Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees]
            };
            var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2, d3_geo_centroid = {
                    sphere: d3_noop,
                    point: d3_geo_centroidPoint,
                    lineStart: d3_geo_centroidLineStart,
                    lineEnd: d3_geo_centroidLineEnd,
                    polygonStart: function() {
                        d3_geo_centroid.lineStart = d3_geo_centroidRingStart
                    },
                    polygonEnd: function() {
                        d3_geo_centroid.lineStart = d3_geo_centroidLineStart
                    }
                },
                d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, [-π, -π / 2]),
                d3_geo_clipExtentMAX = 1e9;
            d3.geo.clipExtent = function() {
                var x0, y0, x1, y1, stream, clip, clipExtent = {
                    stream: function(output) {
                        return stream && (stream.valid = !1), stream = clip(output), stream.valid = !0, stream
                    },
                    extent: function(_) {
                        return arguments.length ? (clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), stream && (stream.valid = !1, stream = null), clipExtent) : [
                            [x0, y0],
                            [x1, y1]
                        ]
                    }
                };
                return clipExtent.extent([
                    [0, 0],
                    [960, 500]
                ])
            }, (d3.geo.conicEqualArea = function() {
                return d3_geo_conic(d3_geo_conicEqualArea)
            }).raw = d3_geo_conicEqualArea, d3.geo.albers = function() {
                return d3.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
            }, d3.geo.albersUsa = function() {
                function albersUsa(coordinates) {
                    var x = coordinates[0],
                        y = coordinates[1];
                    return point = null, lower48Point(x, y), point || (alaskaPoint(x, y), point) || hawaiiPoint(x, y), point
                }
                var point, lower48Point, alaskaPoint, hawaiiPoint, lower48 = d3.geo.albers(),
                    alaska = d3.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
                    hawaii = d3.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
                    pointStream = {
                        point: function(x, y) {
                            point = [x, y]
                        }
                    };
                return albersUsa.invert = function(coordinates) {
                    var k = lower48.scale(),
                        t = lower48.translate(),
                        x = (coordinates[0] - t[0]) / k,
                        y = (coordinates[1] - t[1]) / k;
                    return (y >= .12 && y < .234 && x >= -.425 && x < -.214 ? alaska : y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii : lower48).invert(coordinates)
                }, albersUsa.stream = function(stream) {
                    var lower48Stream = lower48.stream(stream),
                        alaskaStream = alaska.stream(stream),
                        hawaiiStream = hawaii.stream(stream);
                    return {
                        point: function(x, y) {
                            lower48Stream.point(x, y), alaskaStream.point(x, y), hawaiiStream.point(x, y)
                        },
                        sphere: function() {
                            lower48Stream.sphere(), alaskaStream.sphere(), hawaiiStream.sphere()
                        },
                        lineStart: function() {
                            lower48Stream.lineStart(), alaskaStream.lineStart(), hawaiiStream.lineStart()
                        },
                        lineEnd: function() {
                            lower48Stream.lineEnd(), alaskaStream.lineEnd(), hawaiiStream.lineEnd()
                        },
                        polygonStart: function() {
                            lower48Stream.polygonStart(), alaskaStream.polygonStart(), hawaiiStream.polygonStart()
                        },
                        polygonEnd: function() {
                            lower48Stream.polygonEnd(), alaskaStream.polygonEnd(), hawaiiStream.polygonEnd()
                        }
                    }
                }, albersUsa.precision = function(_) {
                    return arguments.length ? (lower48.precision(_), alaska.precision(_), hawaii.precision(_), albersUsa) : lower48.precision()
                }, albersUsa.scale = function(_) {
                    return arguments.length ? (lower48.scale(_), alaska.scale(.35 * _), hawaii.scale(_), albersUsa.translate(lower48.translate())) : lower48.scale()
                }, albersUsa.translate = function(_) {
                    if (!arguments.length) return lower48.translate();
                    var k = lower48.scale(),
                        x = +_[0],
                        y = +_[1];
                    return lower48Point = lower48.translate(_).clipExtent([
                        [x - .455 * k, y - .238 * k],
                        [x + .455 * k, y + .238 * k]
                    ]).stream(pointStream).point, alaskaPoint = alaska.translate([x - .307 * k, y + .201 * k]).clipExtent([
                        [x - .425 * k + ε, y + .12 * k + ε],
                        [x - .214 * k - ε, y + .234 * k - ε]
                    ]).stream(pointStream).point, hawaiiPoint = hawaii.translate([x - .205 * k, y + .212 * k]).clipExtent([
                        [x - .214 * k + ε, y + .166 * k + ε],
                        [x - .115 * k - ε, y + .234 * k - ε]
                    ]).stream(pointStream).point, albersUsa
                }, albersUsa.scale(1070)
            };
            var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1, d3_geo_pathArea = {
                    point: d3_noop,
                    lineStart: d3_noop,
                    lineEnd: d3_noop,
                    polygonStart: function() {
                        d3_geo_pathAreaPolygon = 0, d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart
                    },
                    polygonEnd: function() {
                        d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop, d3_geo_pathAreaSum += abs(d3_geo_pathAreaPolygon / 2)
                    }
                },
                d3_geo_pathBounds = {
                    point: d3_geo_pathBoundsPoint,
                    lineStart: d3_noop,
                    lineEnd: d3_noop,
                    polygonStart: d3_noop,
                    polygonEnd: d3_noop
                },
                d3_geo_pathCentroid = {
                    point: d3_geo_pathCentroidPoint,
                    lineStart: d3_geo_pathCentroidLineStart,
                    lineEnd: d3_geo_pathCentroidLineEnd,
                    polygonStart: function() {
                        d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart
                    },
                    polygonEnd: function() {
                        d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint, d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart, d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd
                    }
                };
            d3.geo.path = function() {
                function path(object) {
                    return object && ("function" == typeof pointRadius && contextStream.pointRadius(+pointRadius.apply(this, arguments)), cacheStream && cacheStream.valid || (cacheStream = projectStream(contextStream)), d3.geo.stream(object, cacheStream)), contextStream.result()
                }

                function reset() {
                    return cacheStream = null, path
                }
                var projection, context, projectStream, contextStream, cacheStream, pointRadius = 4.5;
                return path.area = function(object) {
                    return d3_geo_pathAreaSum = 0, d3.geo.stream(object, projectStream(d3_geo_pathArea)), d3_geo_pathAreaSum
                }, path.centroid = function(object) {
                    return d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0, d3.geo.stream(object, projectStream(d3_geo_pathCentroid)), d3_geo_centroidZ2 ? [d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2] : d3_geo_centroidZ1 ? [d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1] : d3_geo_centroidZ0 ? [d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0] : [NaN, NaN]
                }, path.bounds = function(object) {
                    return d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = 1 / 0), d3.geo.stream(object, projectStream(d3_geo_pathBounds)), [
                        [d3_geo_pathBoundsX0, d3_geo_pathBoundsY0],
                        [d3_geo_pathBoundsX1, d3_geo_pathBoundsY1]
                    ]
                }, path.projection = function(_) {
                    return arguments.length ? (projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity, reset()) : projection
                }, path.context = function(_) {
                    return arguments.length ? (contextStream = null == (context = _) ? new d3_geo_pathBuffer : new d3_geo_pathContext(_), "function" != typeof pointRadius && contextStream.pointRadius(pointRadius), reset()) : context
                }, path.pointRadius = function(_) {
                    return arguments.length ? (pointRadius = "function" == typeof _ ? _ : (contextStream.pointRadius(+_), +_), path) : pointRadius
                }, path.projection(d3.geo.albersUsa()).context(null)
            }, d3.geo.transform = function(methods) {
                return {
                    stream: function(stream) {
                        var transform = new d3_geo_transform(stream);
                        for (var k in methods) transform[k] = methods[k];
                        return transform
                    }
                }
            }, d3_geo_transform.prototype = {
                point: function(x, y) {
                    this.stream.point(x, y)
                },
                sphere: function() {
                    this.stream.sphere()
                },
                lineStart: function() {
                    this.stream.lineStart()
                },
                lineEnd: function() {
                    this.stream.lineEnd()
                },
                polygonStart: function() {
                    this.stream.polygonStart()
                },
                polygonEnd: function() {
                    this.stream.polygonEnd()
                }
            }, d3.geo.projection = d3_geo_projection, d3.geo.projectionMutator = d3_geo_projectionMutator, (d3.geo.equirectangular = function() {
                return d3_geo_projection(d3_geo_equirectangular)
            }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular, d3.geo.rotation = function(rotate) {
                function forward(coordinates) {
                    return coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians), coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates
                }
                return rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0), forward.invert = function(coordinates) {
                    return coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians), coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates
                }, forward
            }, d3_geo_identityRotation.invert = d3_geo_equirectangular, d3.geo.circle = function() {
                function circle() {
                    var center = "function" == typeof origin ? origin.apply(this, arguments) : origin,
                        rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert,
                        ring = [];
                    return interpolate(null, null, 1, {
                        point: function(x, y) {
                            ring.push(x = rotate(x, y)), x[0] *= d3_degrees, x[1] *= d3_degrees
                        }
                    }), {
                        type: "Polygon",
                        coordinates: [ring]
                    }
                }
                var angle, interpolate, origin = [0, 0],
                    precision = 6;
                return circle.origin = function(x) {
                    return arguments.length ? (origin = x, circle) : origin
                }, circle.angle = function(x) {
                    return arguments.length ? (interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians), circle) : angle
                }, circle.precision = function(_) {
                    return arguments.length ? (interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians), circle) : precision
                }, circle.angle(90)
            }, d3.geo.distance = function(a, b) {
                var t, Δλ = (b[0] - a[0]) * d3_radians,
                    φ0 = a[1] * d3_radians,
                    φ1 = b[1] * d3_radians,
                    sinΔλ = Math.sin(Δλ),
                    cosΔλ = Math.cos(Δλ),
                    sinφ0 = Math.sin(φ0),
                    cosφ0 = Math.cos(φ0),
                    sinφ1 = Math.sin(φ1),
                    cosφ1 = Math.cos(φ1);
                return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ)
            }, d3.geo.graticule = function() {
                function graticule() {
                    return {
                        type: "MultiLineString",
                        coordinates: lines()
                    }
                }

                function lines() {
                    return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
                        return abs(x % DX) > ε
                    }).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y) {
                        return abs(y % DY) > ε
                    }).map(y))
                }
                var x1, x0, X1, X0, y1, y0, Y1, Y0, x, y, X, Y, dx = 10,
                    dy = dx,
                    DX = 90,
                    DY = 360,
                    precision = 2.5;
                return graticule.lines = function() {
                    return lines().map(function(coordinates) {
                        return {
                            type: "LineString",
                            coordinates: coordinates
                        }
                    })
                }, graticule.outline = function() {
                    return {
                        type: "Polygon",
                        coordinates: [X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1))]
                    }
                }, graticule.extent = function(_) {
                    return arguments.length ? graticule.majorExtent(_).minorExtent(_) : graticule.minorExtent()
                }, graticule.majorExtent = function(_) {
                    return arguments.length ? (X0 = +_[0][0], X1 = +_[1][0], Y0 = +_[0][1], Y1 = +_[1][1], X0 > X1 && (_ = X0, X0 = X1, X1 = _), Y0 > Y1 && (_ = Y0, Y0 = Y1, Y1 = _), graticule.precision(precision)) : [
                        [X0, Y0],
                        [X1, Y1]
                    ]
                }, graticule.minorExtent = function(_) {
                    return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], x0 > x1 && (_ = x0, x0 = x1, x1 = _), y0 > y1 && (_ = y0, y0 = y1, y1 = _), graticule.precision(precision)) : [
                        [x0, y0],
                        [x1, y1]
                    ]
                }, graticule.step = function(_) {
                    return arguments.length ? graticule.majorStep(_).minorStep(_) : graticule.minorStep()
                }, graticule.majorStep = function(_) {
                    return arguments.length ? (DX = +_[0], DY = +_[1], graticule) : [DX, DY]
                }, graticule.minorStep = function(_) {
                    return arguments.length ? (dx = +_[0], dy = +_[1], graticule) : [dx, dy]
                }, graticule.precision = function(_) {
                    return arguments.length ? (precision = +_, x = d3_geo_graticuleX(y0, y1, 90), y = d3_geo_graticuleY(x0, x1, precision), X = d3_geo_graticuleX(Y0, Y1, 90), Y = d3_geo_graticuleY(X0, X1, precision), graticule) : precision
                }, graticule.majorExtent([
                    [-180, -90 + ε],
                    [180, 90 - ε]
                ]).minorExtent([
                    [-180, -80 - ε],
                    [180, 80 + ε]
                ])
            }, d3.geo.greatArc = function() {
                function greatArc() {
                    return {
                        type: "LineString",
                        coordinates: [source_ || source.apply(this, arguments), target_ || target.apply(this, arguments)]
                    }
                }
                var source_, target_, source = d3_source,
                    target = d3_target;
                return greatArc.distance = function() {
                    return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments))
                }, greatArc.source = function(_) {
                    return arguments.length ? (source = _, source_ = "function" == typeof _ ? null : _, greatArc) : source
                }, greatArc.target = function(_) {
                    return arguments.length ? (target = _, target_ = "function" == typeof _ ? null : _, greatArc) : target
                }, greatArc.precision = function() {
                    return arguments.length ? greatArc : 0
                }, greatArc
            }, d3.geo.interpolate = function(source, target) {
                return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians)
            }, d3.geo.length = function(object) {
                return d3_geo_lengthSum = 0, d3.geo.stream(object, d3_geo_length), d3_geo_lengthSum
            };
            var d3_geo_lengthSum, d3_geo_length = {
                    sphere: d3_noop,
                    point: d3_noop,
                    lineStart: d3_geo_lengthLineStart,
                    lineEnd: d3_noop,
                    polygonStart: d3_noop,
                    polygonEnd: d3_noop
                },
                d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosλcosφ) {
                    return Math.sqrt(2 / (1 + cosλcosφ))
                }, function(ρ) {
                    return 2 * Math.asin(ρ / 2)
                });
            (d3.geo.azimuthalEqualArea = function() {
                return d3_geo_projection(d3_geo_azimuthalEqualArea)
            }).raw = d3_geo_azimuthalEqualArea;
            var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosλcosφ) {
                var c = Math.acos(cosλcosφ);
                return c && c / Math.sin(c)
            }, d3_identity);
            (d3.geo.azimuthalEquidistant = function() {
                return d3_geo_projection(d3_geo_azimuthalEquidistant)
            }).raw = d3_geo_azimuthalEquidistant, (d3.geo.conicConformal = function() {
                return d3_geo_conic(d3_geo_conicConformal)
            }).raw = d3_geo_conicConformal, (d3.geo.conicEquidistant = function() {
                return d3_geo_conic(d3_geo_conicEquidistant)
            }).raw = d3_geo_conicEquidistant;
            var d3_geo_gnomonic = d3_geo_azimuthal(function(cosλcosφ) {
                return 1 / cosλcosφ
            }, Math.atan);
            (d3.geo.gnomonic = function() {
                return d3_geo_projection(d3_geo_gnomonic)
            }).raw = d3_geo_gnomonic, d3_geo_mercator.invert = function(x, y) {
                return [x, 2 * Math.atan(Math.exp(y)) - halfπ]
            }, (d3.geo.mercator = function() {
                return d3_geo_mercatorProjection(d3_geo_mercator)
            }).raw = d3_geo_mercator;
            var d3_geo_orthographic = d3_geo_azimuthal(function() {
                return 1
            }, Math.asin);
            (d3.geo.orthographic = function() {
                return d3_geo_projection(d3_geo_orthographic)
            }).raw = d3_geo_orthographic;
            var d3_geo_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
                return 1 / (1 + cosλcosφ)
            }, function(ρ) {
                return 2 * Math.atan(ρ)
            });
            (d3.geo.stereographic = function() {
                return d3_geo_projection(d3_geo_stereographic)
            }).raw = d3_geo_stereographic, d3_geo_transverseMercator.invert = function(x, y) {
                return [-y, 2 * Math.atan(Math.exp(x)) - halfπ]
            }, (d3.geo.transverseMercator = function() {
                var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator),
                    center = projection.center,
                    rotate = projection.rotate;
                return projection.center = function(_) {
                    return _ ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]])
                }, projection.rotate = function(_) {
                    return _ ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90])
                }, rotate([0, 0, 90])
            }).raw = d3_geo_transverseMercator, d3.geom = {}, d3.geom.hull = function(vertices) {
                function hull(data) {
                    if (data.length < 3) return [];
                    var i, fx = d3_functor(x),
                        fy = d3_functor(y),
                        n = data.length,
                        points = [],
                        flippedPoints = [];
                    for (i = 0; i < n; i++) points.push([+fx.call(this, data[i], i), +fy.call(this, data[i], i), i]);
                    for (points.sort(d3_geom_hullOrder), i = 0; i < n; i++) flippedPoints.push([points[i][0], -points[i][1]]);
                    var upper = d3_geom_hullUpper(points),
                        lower = d3_geom_hullUpper(flippedPoints),
                        skipLeft = lower[0] === upper[0],
                        skipRight = lower[lower.length - 1] === upper[upper.length - 1],
                        polygon = [];
                    for (i = upper.length - 1; i >= 0; --i) polygon.push(data[points[upper[i]][2]]);
                    for (i = +skipLeft; i < lower.length - skipRight; ++i) polygon.push(data[points[lower[i]][2]]);
                    return polygon
                }
                var x = d3_geom_pointX,
                    y = d3_geom_pointY;
                return arguments.length ? hull(vertices) : (hull.x = function(_) {
                    return arguments.length ? (x = _, hull) : x
                }, hull.y = function(_) {
                    return arguments.length ? (y = _, hull) : y
                }, hull)
            }, d3.geom.polygon = function(coordinates) {
                return d3_subclass(coordinates, d3_geom_polygonPrototype), coordinates
            };
            var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
            d3_geom_polygonPrototype.area = function() {
                for (var a, i = -1, n = this.length, b = this[n - 1], area = 0; ++i < n;) a = b, b = this[i], area += a[1] * b[0] - a[0] * b[1];
                return .5 * area
            }, d3_geom_polygonPrototype.centroid = function(k) {
                var a, c, i = -1,
                    n = this.length,
                    x = 0,
                    y = 0,
                    b = this[n - 1];
                for (arguments.length || (k = -1 / (6 * this.area())); ++i < n;) a = b, b = this[i], c = a[0] * b[1] - b[0] * a[1], x += (a[0] + b[0]) * c, y += (a[1] + b[1]) * c;
                return [x * k, y * k]
            }, d3_geom_polygonPrototype.clip = function(subject) {
                for (var input, j, m, b, c, d, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), a = this[n - 1]; ++i < n;) {
                    for (input = subject.slice(), subject.length = 0, b = this[i], c = input[(m = input.length - closed) - 1], j = -1; ++j < m;) d = input[j], d3_geom_polygonInside(d, a, b) ? (d3_geom_polygonInside(c, a, b) || subject.push(d3_geom_polygonIntersect(c, d, a, b)), subject.push(d)) : d3_geom_polygonInside(c, a, b) && subject.push(d3_geom_polygonIntersect(c, d, a, b)), c = d;
                    closed && subject.push(subject[0]), a = b
                }
                return subject
            };
            var d3_geom_voronoiEdges, d3_geom_voronoiCells, d3_geom_voronoiBeaches, d3_geom_voronoiFirstCircle, d3_geom_voronoiCircles, d3_geom_voronoiBeachPool = [],
                d3_geom_voronoiCirclePool = [];
            d3_geom_voronoiCell.prototype.prepare = function() {
                for (var edge, halfEdges = this.edges, iHalfEdge = halfEdges.length; iHalfEdge--;) edge = halfEdges[iHalfEdge].edge, edge.b && edge.a || halfEdges.splice(iHalfEdge, 1);
                return halfEdges.sort(d3_geom_voronoiHalfEdgeOrder), halfEdges.length
            }, d3_geom_voronoiHalfEdge.prototype = {
                start: function() {
                    return this.edge.l === this.site ? this.edge.a : this.edge.b
                },
                end: function() {
                    return this.edge.l === this.site ? this.edge.b : this.edge.a
                }
            }, d3_geom_voronoiRedBlackTree.prototype = {
                insert: function(after, node) {
                    var parent, grandpa, uncle;
                    if (after) {
                        if (node.P = after, node.N = after.N, after.N && (after.N.P = node), after.N = node, after.R) {
                            for (after = after.R; after.L;) after = after.L;
                            after.L = node
                        } else after.R = node;
                        parent = after
                    } else this._ ? (after = d3_geom_voronoiRedBlackFirst(this._), node.P = null, node.N = after, after.P = after.L = node, parent = after) : (node.P = node.N = null, this._ = node, parent = null);
                    for (node.L = node.R = null, node.U = parent, node.C = !0, after = node; parent && parent.C;) grandpa = parent.U, parent === grandpa.L ? (uncle = grandpa.R, uncle && uncle.C ? (parent.C = uncle.C = !1, grandpa.C = !0, after = grandpa) : (after === parent.R && (d3_geom_voronoiRedBlackRotateLeft(this, parent), after = parent, parent = after.U), parent.C = !1, grandpa.C = !0, d3_geom_voronoiRedBlackRotateRight(this, grandpa))) : (uncle = grandpa.L, uncle && uncle.C ? (parent.C = uncle.C = !1, grandpa.C = !0, after = grandpa) : (after === parent.L && (d3_geom_voronoiRedBlackRotateRight(this, parent), after = parent, parent = after.U), parent.C = !1, grandpa.C = !0, d3_geom_voronoiRedBlackRotateLeft(this, grandpa))), parent = after.U;
                    this._.C = !1
                },
                remove: function(node) {
                    node.N && (node.N.P = node.P), node.P && (node.P.N = node.N), node.N = node.P = null;
                    var sibling, next, red, parent = node.U,
                        left = node.L,
                        right = node.R;
                    if (next = left ? right ? d3_geom_voronoiRedBlackFirst(right) : left : right, parent ? parent.L === node ? parent.L = next : parent.R = next : this._ = next, left && right ? (red = next.C, next.C = node.C, next.L = left, left.U = next, next !== right ? (parent = next.U, next.U = node.U, node = next.R, parent.L = node, next.R = right, right.U = next) : (next.U = parent, parent = next, node = next.R)) : (red = node.C, node = next), node && (node.U = parent), !red) {
                        if (node && node.C) return void(node.C = !1);
                        do {
                            if (node === this._) break;
                            if (node === parent.L) {
                                if (sibling = parent.R, sibling.C && (sibling.C = !1, parent.C = !0, d3_geom_voronoiRedBlackRotateLeft(this, parent), sibling = parent.R), sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
                                    sibling.R && sibling.R.C || (sibling.L.C = !1, sibling.C = !0, d3_geom_voronoiRedBlackRotateRight(this, sibling), sibling = parent.R), sibling.C = parent.C, parent.C = sibling.R.C = !1, d3_geom_voronoiRedBlackRotateLeft(this, parent), node = this._;
                                    break
                                }
                            } else if (sibling = parent.L, sibling.C && (sibling.C = !1, parent.C = !0, d3_geom_voronoiRedBlackRotateRight(this, parent), sibling = parent.L), sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
                                sibling.L && sibling.L.C || (sibling.R.C = !1, sibling.C = !0, d3_geom_voronoiRedBlackRotateLeft(this, sibling), sibling = parent.L), sibling.C = parent.C, parent.C = sibling.L.C = !1, d3_geom_voronoiRedBlackRotateRight(this, parent), node = this._;
                                break
                            }
                            sibling.C = !0, node = parent, parent = parent.U
                        } while (!node.C);
                        node && (node.C = !1)
                    }
                }
            }, d3.geom.voronoi = function(points) {
                function voronoi(data) {
                    var polygons = new Array(data.length),
                        x0 = clipExtent[0][0],
                        y0 = clipExtent[0][1],
                        x1 = clipExtent[1][0],
                        y1 = clipExtent[1][1];
                    return d3_geom_voronoi(sites(data), clipExtent).cells.forEach(function(cell, i) {
                        var edges = cell.edges,
                            site = cell.site;
                        (polygons[i] = edges.length ? edges.map(function(e) {
                            var s = e.start();
                            return [s.x, s.y]
                        }) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [
                            [x0, y1],
                            [x1, y1],
                            [x1, y0],
                            [x0, y0]
                        ] : []).point = data[i]
                    }), polygons
                }

                function sites(data) {
                    return data.map(function(d, i) {
                        return {
                            x: Math.round(fx(d, i) / ε) * ε,
                            y: Math.round(fy(d, i) / ε) * ε,
                            i: i
                        }
                    })
                }
                var x = d3_geom_pointX,
                    y = d3_geom_pointY,
                    fx = x,
                    fy = y,
                    clipExtent = d3_geom_voronoiClipExtent;
                return points ? voronoi(points) : (voronoi.links = function(data) {
                    return d3_geom_voronoi(sites(data)).edges.filter(function(edge) {
                        return edge.l && edge.r
                    }).map(function(edge) {
                        return {
                            source: data[edge.l.i],
                            target: data[edge.r.i]
                        }
                    })
                }, voronoi.triangles = function(data) {
                    var triangles = [];
                    return d3_geom_voronoi(sites(data)).cells.forEach(function(cell, i) {
                        for (var s0, site = cell.site, edges = cell.edges.sort(d3_geom_voronoiHalfEdgeOrder), j = -1, m = edges.length, e1 = edges[m - 1].edge, s1 = e1.l === site ? e1.r : e1.l; ++j < m;) e1, s0 = s1, e1 = edges[j].edge, s1 = e1.l === site ? e1.r : e1.l, i < s0.i && i < s1.i && d3_geom_voronoiTriangleArea(site, s0, s1) < 0 && triangles.push([data[i], data[s0.i], data[s1.i]])
                    }), triangles
                }, voronoi.x = function(_) {
                    return arguments.length ? (fx = d3_functor(x = _), voronoi) : x
                }, voronoi.y = function(_) {
                    return arguments.length ? (fy = d3_functor(y = _), voronoi) : y
                }, voronoi.clipExtent = function(_) {
                    return arguments.length ? (clipExtent = null == _ ? d3_geom_voronoiClipExtent : _, voronoi) : clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent
                }, voronoi.size = function(_) {
                    return arguments.length ? voronoi.clipExtent(_ && [
                        [0, 0], _
                    ]) : clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent && clipExtent[1]
                }, voronoi)
            };
            var d3_geom_voronoiClipExtent = [
                [-1e6, -1e6],
                [1e6, 1e6]
            ];
            d3.geom.delaunay = function(vertices) {
                return d3.geom.voronoi().triangles(vertices)
            }, d3.geom.quadtree = function(points, x1, y1, x2, y2) {
                function quadtree(data) {
                    function insert(n, d, x, y, x1, y1, x2, y2) {
                        if (!isNaN(x) && !isNaN(y))
                            if (n.leaf) {
                                var nx = n.x,
                                    ny = n.y;
                                if (null != nx)
                                    if (abs(nx - x) + abs(ny - y) < .01) insertChild(n, d, x, y, x1, y1, x2, y2);
                                    else {
                                        var nPoint = n.point;
                                        n.x = n.y = n.point = null, insertChild(n, nPoint, nx, ny, x1, y1, x2, y2), insertChild(n, d, x, y, x1, y1, x2, y2)
                                    }
                                else n.x = x, n.y = y, n.point = d
                            } else insertChild(n, d, x, y, x1, y1, x2, y2)
                    }

                    function insertChild(n, d, x, y, x1, y1, x2, y2) {
                        var xm = .5 * (x1 + x2),
                            ym = .5 * (y1 + y2),
                            right = x >= xm,
                            below = y >= ym,
                            i = below << 1 | right;
                        n.leaf = !1, n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode()), right ? x1 = xm : x2 = xm, below ? y1 = ym : y2 = ym, insert(n, d, x, y, x1, y1, x2, y2)
                    }
                    var d, xs, ys, i, n, x1_, y1_, x2_, y2_, fx = d3_functor(x),
                        fy = d3_functor(y);
                    if (null != x1) x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
                    else if (x2_ = y2_ = -(x1_ = y1_ = 1 / 0), xs = [], ys = [], n = data.length, compat)
                        for (i = 0; i < n; ++i) d = data[i], d.x < x1_ && (x1_ = d.x), d.y < y1_ && (y1_ = d.y), d.x > x2_ && (x2_ = d.x), d.y > y2_ && (y2_ = d.y), xs.push(d.x), ys.push(d.y);
                    else
                        for (i = 0; i < n; ++i) {
                            var x_ = +fx(d = data[i], i),
                                y_ = +fy(d, i);
                            x_ < x1_ && (x1_ = x_), y_ < y1_ && (y1_ = y_), x_ > x2_ && (x2_ = x_), y_ > y2_ && (y2_ = y_), xs.push(x_), ys.push(y_)
                        }
                    var dx = x2_ - x1_,
                        dy = y2_ - y1_;
                    dx > dy ? y2_ = y1_ + dx : x2_ = x1_ + dy;
                    var root = d3_geom_quadtreeNode();
                    if (root.add = function(d) {
                            insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_)
                        }, root.visit = function(f) {
                            d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_)
                        }, root.find = function(point) {
                            return d3_geom_quadtreeFind(root, point[0], point[1], x1_, y1_, x2_, y2_)
                        }, i = -1, null == x1) {
                        for (; ++i < n;) insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
                        --i
                    } else data.forEach(root.add);
                    return xs = ys = data = d = null, root
                }
                var compat, x = d3_geom_pointX,
                    y = d3_geom_pointY;
                return (compat = arguments.length) ? (x = d3_geom_quadtreeCompatX, y = d3_geom_quadtreeCompatY, 3 === compat && (y2 = y1, x2 = x1, y1 = x1 = 0), quadtree(points)) : (quadtree.x = function(_) {
                    return arguments.length ? (x = _, quadtree) : x
                }, quadtree.y = function(_) {
                    return arguments.length ? (y = _, quadtree) : y
                }, quadtree.extent = function(_) {
                    return arguments.length ? (null == _ ? x1 = y1 = x2 = y2 = null : (x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], y2 = +_[1][1]), quadtree) : null == x1 ? null : [
                        [x1, y1],
                        [x2, y2]
                    ]
                }, quadtree.size = function(_) {
                    return arguments.length ? (null == _ ? x1 = y1 = x2 = y2 = null : (x1 = y1 = 0, x2 = +_[0], y2 = +_[1]), quadtree) : null == x1 ? null : [x2 - x1, y2 - y1]
                }, quadtree)
            }, d3.interpolateRgb = d3_interpolateRgb, d3.interpolateObject = d3_interpolateObject, d3.interpolateNumber = d3_interpolateNumber, d3.interpolateString = d3_interpolateString;
            var d3_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
                d3_interpolate_numberB = new RegExp(d3_interpolate_numberA.source, "g");
            d3.interpolate = d3_interpolate, d3.interpolators = [function(a, b) {
                var t = typeof b;
                return ("string" === t ? d3_rgb_names.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_color ? d3_interpolateRgb : Array.isArray(b) ? d3_interpolateArray : "object" === t && isNaN(b) ? d3_interpolateObject : d3_interpolateNumber)(a, b)
            }], d3.interpolateArray = d3_interpolateArray;
            var d3_ease_default = function() {
                    return d3_identity
                },
                d3_ease = d3.map({
                    linear: d3_ease_default,
                    poly: d3_ease_poly,
                    quad: function() {
                        return d3_ease_quad
                    },
                    cubic: function() {
                        return d3_ease_cubic
                    },
                    sin: function() {
                        return d3_ease_sin
                    },
                    exp: function() {
                        return d3_ease_exp
                    },
                    circle: function() {
                        return d3_ease_circle
                    },
                    elastic: d3_ease_elastic,
                    back: d3_ease_back,
                    bounce: function() {
                        return d3_ease_bounce
                    }
                }),
                d3_ease_mode = d3.map({
                    in: d3_identity,
                    out: d3_ease_reverse,
                    "in-out": d3_ease_reflect,
                    "out-in": function(f) {
                        return d3_ease_reflect(d3_ease_reverse(f))
                    }
                });
            d3.ease = function(name) {
                var i = name.indexOf("-"),
                    t = i >= 0 ? name.slice(0, i) : name,
                    m = i >= 0 ? name.slice(i + 1) : "in";
                return t = d3_ease.get(t) || d3_ease_default, m = d3_ease_mode.get(m) || d3_identity, d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))))
            }, d3.interpolateHcl = d3_interpolateHcl, d3.interpolateHsl = d3_interpolateHsl, d3.interpolateLab = d3_interpolateLab, d3.interpolateRound = d3_interpolateRound, d3.transform = function(string) {
                var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
                return (d3.transform = function(string) {
                    if (null != string) {
                        g.setAttribute("transform", string);
                        var t = g.transform.baseVal.consolidate()
                    }
                    return new d3_transform(t ? t.matrix : d3_transformIdentity)
                })(string)
            }, d3_transform.prototype.toString = function() {
                return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
            };
            var d3_transformIdentity = {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                e: 0,
                f: 0
            };
            d3.interpolateTransform = d3_interpolateTransform, d3.layout = {}, d3.layout.bundle = function() {
                return function(links) {
                    for (var paths = [], i = -1, n = links.length; ++i < n;) paths.push(d3_layout_bundlePath(links[i]));
                    return paths
                }
            }, d3.layout.chord = function() {
                function relayout() {
                    var k, x, x0, i, j, subgroups = {},
                        groupSums = [],
                        groupIndex = d3.range(n),
                        subgroupIndex = [];
                    for (chords = [], groups = [], k = 0, i = -1; ++i < n;) {
                        for (x = 0, j = -1; ++j < n;) x += matrix[i][j];
                        groupSums.push(x), subgroupIndex.push(d3.range(n)), k += x
                    }
                    for (sortGroups && groupIndex.sort(function(a, b) {
                            return sortGroups(groupSums[a], groupSums[b])
                        }), sortSubgroups && subgroupIndex.forEach(function(d, i) {
                            d.sort(function(a, b) {
                                return sortSubgroups(matrix[i][a], matrix[i][b])
                            })
                        }), k = (τ - padding * n) / k, x = 0, i = -1; ++i < n;) {
                        for (x0 = x, j = -1; ++j < n;) {
                            var di = groupIndex[i],
                                dj = subgroupIndex[di][j],
                                v = matrix[di][dj],
                                a0 = x,
                                a1 = x += v * k;
                            subgroups[di + "-" + dj] = {
                                index: di,
                                subindex: dj,
                                startAngle: a0,
                                endAngle: a1,
                                value: v
                            }
                        }
                        groups[di] = {
                            index: di,
                            startAngle: x0,
                            endAngle: x,
                            value: groupSums[di]
                        }, x += padding
                    }
                    for (i = -1; ++i < n;)
                        for (j = i - 1; ++j < n;) {
                            var source = subgroups[i + "-" + j],
                                target = subgroups[j + "-" + i];
                            (source.value || target.value) && chords.push(source.value < target.value ? {
                                source: target,
                                target: source
                            } : {
                                source: source,
                                target: target
                            })
                        }
                    sortChords && resort()
                }

                function resort() {
                    chords.sort(function(a, b) {
                        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2)
                    })
                }
                var chords, groups, matrix, n, sortGroups, sortSubgroups, sortChords, chord = {},
                    padding = 0;
                return chord.matrix = function(x) {
                    return arguments.length ? (n = (matrix = x) && matrix.length, chords = groups = null, chord) : matrix
                }, chord.padding = function(x) {
                    return arguments.length ? (padding = x, chords = groups = null, chord) : padding
                }, chord.sortGroups = function(x) {
                    return arguments.length ? (sortGroups = x, chords = groups = null, chord) : sortGroups
                }, chord.sortSubgroups = function(x) {
                    return arguments.length ? (sortSubgroups = x, chords = null, chord) : sortSubgroups
                }, chord.sortChords = function(x) {
                    return arguments.length ? (sortChords = x, chords && resort(), chord) : sortChords
                }, chord.chords = function() {
                    return chords || relayout(), chords
                }, chord.groups = function() {
                    return groups || relayout(), groups
                }, chord
            }, d3.layout.force = function() {
                function repulse(node) {
                    return function(quad, x1, _, x2) {
                        if (quad.point !== node) {
                            var dx = quad.cx - node.x,
                                dy = quad.cy - node.y,
                                dw = x2 - x1,
                                dn = dx * dx + dy * dy;
                            if (dw * dw / theta2 < dn) {
                                if (dn < chargeDistance2) {
                                    var k = quad.charge / dn;
                                    node.px -= dx * k, node.py -= dy * k
                                }
                                return !0
                            }
                            if (quad.point && dn && dn < chargeDistance2) {
                                var k = quad.pointCharge / dn;
                                node.px -= dx * k, node.py -= dy * k
                            }
                        }
                        return !quad.charge
                    }
                }

                function dragmove(d) {
                    d.px = d3.event.x, d.py = d3.event.y, force.resume()
                }
                var timer, drag, alpha, distances, strengths, charges, force = {},
                    event = d3.dispatch("start", "tick", "end"),
                    size = [1, 1],
                    friction = .9,
                    linkDistance = d3_layout_forceLinkDistance,
                    linkStrength = d3_layout_forceLinkStrength,
                    charge = -30,
                    chargeDistance2 = d3_layout_forceChargeDistance2,
                    gravity = .1,
                    theta2 = .64,
                    nodes = [],
                    links = [];
                return force.tick = function() {
                    if ((alpha *= .99) < .005) return timer = null, event.end({
                        type: "end",
                        alpha: alpha = 0
                    }), !0;
                    var q, i, o, s, t, l, k, x, y, n = nodes.length,
                        m = links.length;
                    for (i = 0; i < m; ++i) o = links[i], s = o.source, t = o.target, x = t.x - s.x, y = t.y - s.y, (l = x * x + y * y) && (l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l, x *= l, y *= l, t.x -= x * (k = s.weight + t.weight ? s.weight / (s.weight + t.weight) : .5), t.y -= y * k, s.x += x * (k = 1 - k), s.y += y * k);
                    if ((k = alpha * gravity) && (x = size[0] / 2, y = size[1] / 2, i = -1, k))
                        for (; ++i < n;) o = nodes[i], o.x += (x - o.x) * k, o.y += (y - o.y) * k;
                    if (charge)
                        for (d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges), i = -1; ++i < n;)(o = nodes[i]).fixed || q.visit(repulse(o));
                    for (i = -1; ++i < n;) o = nodes[i], o.fixed ? (o.x = o.px, o.y = o.py) : (o.x -= (o.px - (o.px = o.x)) * friction, o.y -= (o.py - (o.py = o.y)) * friction);
                    event.tick({
                        type: "tick",
                        alpha: alpha
                    })
                }, force.nodes = function(x) {
                    return arguments.length ? (nodes = x, force) : nodes
                }, force.links = function(x) {
                    return arguments.length ? (links = x, force) : links
                }, force.size = function(x) {
                    return arguments.length ? (size = x, force) : size
                }, force.linkDistance = function(x) {
                    return arguments.length ? (linkDistance = "function" == typeof x ? x : +x, force) : linkDistance
                }, force.distance = force.linkDistance, force.linkStrength = function(x) {
                    return arguments.length ? (linkStrength = "function" == typeof x ? x : +x, force) : linkStrength
                }, force.friction = function(x) {
                    return arguments.length ? (friction = +x, force) : friction
                }, force.charge = function(x) {
                    return arguments.length ? (charge = "function" == typeof x ? x : +x, force) : charge
                }, force.chargeDistance = function(x) {
                    return arguments.length ? (chargeDistance2 = x * x, force) : Math.sqrt(chargeDistance2)
                }, force.gravity = function(x) {
                    return arguments.length ? (gravity = +x, force) : gravity
                }, force.theta = function(x) {
                    return arguments.length ? (theta2 = x * x, force) : Math.sqrt(theta2)
                }, force.alpha = function(x) {
                    return arguments.length ? (x = +x, alpha ? x > 0 ? alpha = x : (timer.c = null, timer.t = NaN, timer = null, event.end({
                        type: "end",
                        alpha: alpha = 0
                    })) : x > 0 && (event.start({
                        type: "start",
                        alpha: alpha = x
                    }), timer = d3_timer(force.tick)), force) : alpha
                }, force.start = function() {

                    var i, neighbors, o, n = nodes.length,
                        m = links.length,
                        w = size[0],
                        h = size[1];
                    for (i = 0; i < n; ++i)(o = nodes[i]).index = i, o.weight = 0;
                    for (i = 0; i < m; ++i) o = links[i], "number" == typeof o.source && (o.source = nodes[o.source]), "number" == typeof o.target && (o.target = nodes[o.target]), ++o.source.weight, ++o.target.weight;
                    for (i = 0; i < n; ++i) o = nodes[i], isNaN(o.x) && (o.x = position("x", w)), isNaN(o.y) && (o.y = position("y", h)), isNaN(o.px) && (o.px = o.x), isNaN(o.py) && (o.py = o.y);
                    if (distances = [], "function" == typeof linkDistance)
                        for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i);
                    else
                        for (i = 0; i < m; ++i) distances[i] = linkDistance;
                    if (strengths = [], "function" == typeof linkStrength)
                        for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i);
                    else
                        for (i = 0; i < m; ++i) strengths[i] = linkStrength;
                    if (charges = [], "function" == typeof charge)
                        for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i);
                    else
                        for (i = 0; i < n; ++i) charges[i] = charge;
                    return force.resume()
                }, force.resume = function() {
                    return force.alpha(.1)
                }, force.stop = function() {
                    return force.alpha(0)
                }, force.drag = function() {
                    if (drag || (drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend)), !arguments.length) return drag;
                    this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag)
                }, d3.rebind(force, event, "on")
            };
            var d3_layout_forceLinkDistance = 20,
                d3_layout_forceLinkStrength = 1,
                d3_layout_forceChargeDistance2 = 1 / 0;
            d3.layout.hierarchy = function() {
                function hierarchy(root) {
                    var node, stack = [root],
                        nodes = [];
                    for (root.depth = 0; null != (node = stack.pop());)
                        if (nodes.push(node), (childs = children.call(hierarchy, node, node.depth)) && (n = childs.length)) {
                            for (var n, childs, child; --n >= 0;) stack.push(child = childs[n]), child.parent = node, child.depth = node.depth + 1;
                            value && (node.value = 0), node.children = childs
                        } else value && (node.value = +value.call(hierarchy, node, node.depth) || 0), delete node.children;
                    return d3_layout_hierarchyVisitAfter(root, function(node) {
                        var childs, parent;
                        sort && (childs = node.children) && childs.sort(sort), value && (parent = node.parent) && (parent.value += node.value)
                    }), nodes
                }
                var sort = d3_layout_hierarchySort,
                    children = d3_layout_hierarchyChildren,
                    value = d3_layout_hierarchyValue;
                return hierarchy.sort = function(x) {
                    return arguments.length ? (sort = x, hierarchy) : sort
                }, hierarchy.children = function(x) {
                    return arguments.length ? (children = x, hierarchy) : children
                }, hierarchy.value = function(x) {
                    return arguments.length ? (value = x, hierarchy) : value
                }, hierarchy.revalue = function(root) {
                    return value && (d3_layout_hierarchyVisitBefore(root, function(node) {
                        node.children && (node.value = 0)
                    }), d3_layout_hierarchyVisitAfter(root, function(node) {
                        var parent;
                        node.children || (node.value = +value.call(hierarchy, node, node.depth) || 0), (parent = node.parent) && (parent.value += node.value)
                    })), root
                }, hierarchy
            }, d3.layout.partition = function() {
                function position(node, x, dx, dy) {
                    var children = node.children;
                    if (node.x = x, node.y = node.depth * dy, node.dx = dx, node.dy = dy, children && (n = children.length)) {
                        var n, c, d, i = -1;
                        for (dx = node.value ? dx / node.value : 0; ++i < n;) position(c = children[i], x, d = c.value * dx, dy), x += d
                    }
                }

                function depth(node) {
                    var children = node.children,
                        d = 0;
                    if (children && (n = children.length))
                        for (var n, i = -1; ++i < n;) d = Math.max(d, depth(children[i]));
                    return 1 + d
                }

                function partition(d, i) {
                    var nodes = hierarchy.call(this, d, i);
                    return position(nodes[0], 0, size[0], size[1] / depth(nodes[0])), nodes
                }
                var hierarchy = d3.layout.hierarchy(),
                    size = [1, 1];
                return partition.size = function(x) {
                    return arguments.length ? (size = x, partition) : size
                }, d3_layout_hierarchyRebind(partition, hierarchy)
            }, d3.layout.pie = function() {
                function pie(data) {
                    var v, n = data.length,
                        values = data.map(function(d, i) {
                            return +value.call(pie, d, i)
                        }),
                        a = +("function" == typeof startAngle ? startAngle.apply(this, arguments) : startAngle),
                        da = ("function" == typeof endAngle ? endAngle.apply(this, arguments) : endAngle) - a,
                        p = Math.min(Math.abs(da) / n, +("function" == typeof padAngle ? padAngle.apply(this, arguments) : padAngle)),
                        pa = p * (da < 0 ? -1 : 1),
                        sum = d3.sum(values),
                        k = sum ? (da - n * pa) / sum : 0,
                        index = d3.range(n),
                        arcs = [];
                    return null != sort && index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
                        return values[j] - values[i]
                    } : function(i, j) {
                        return sort(data[i], data[j])
                    }), index.forEach(function(i) {
                        arcs[i] = {
                            data: data[i],
                            value: v = values[i],
                            startAngle: a,
                            endAngle: a += v * k + pa,
                            padAngle: p
                        }
                    }), arcs
                }
                var value = Number,
                    sort = d3_layout_pieSortByValue,
                    startAngle = 0,
                    endAngle = τ,
                    padAngle = 0;
                return pie.value = function(_) {
                    return arguments.length ? (value = _, pie) : value
                }, pie.sort = function(_) {
                    return arguments.length ? (sort = _, pie) : sort
                }, pie.startAngle = function(_) {
                    return arguments.length ? (startAngle = _, pie) : startAngle
                }, pie.endAngle = function(_) {
                    return arguments.length ? (endAngle = _, pie) : endAngle
                }, pie.padAngle = function(_) {
                    return arguments.length ? (padAngle = _, pie) : padAngle
                }, pie
            };
            var d3_layout_pieSortByValue = {};
            d3.layout.stack = function() {
                function stack(data, index) {
                    if (!(n = data.length)) return data;
                    var series = data.map(function(d, i) {
                            return values.call(stack, d, i)
                        }),
                        points = series.map(function(d) {
                            return d.map(function(v, i) {
                                return [x.call(stack, v, i), y.call(stack, v, i)]
                            })
                        }),
                        orders = order.call(stack, points, index);
                    series = d3.permute(series, orders), points = d3.permute(points, orders);
                    var n, i, j, o, offsets = offset.call(stack, points, index),
                        m = series[0].length;
                    for (j = 0; j < m; ++j)
                        for (out.call(stack, series[0][j], o = offsets[j], points[0][j][1]), i = 1; i < n; ++i) out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
                    return data
                }
                var values = d3_identity,
                    order = d3_layout_stackOrderDefault,
                    offset = d3_layout_stackOffsetZero,
                    out = d3_layout_stackOut,
                    x = d3_layout_stackX,
                    y = d3_layout_stackY;
                return stack.values = function(x) {
                    return arguments.length ? (values = x, stack) : values
                }, stack.order = function(x) {
                    return arguments.length ? (order = "function" == typeof x ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault, stack) : order
                }, stack.offset = function(x) {
                    return arguments.length ? (offset = "function" == typeof x ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero, stack) : offset
                }, stack.x = function(z) {
                    return arguments.length ? (x = z, stack) : x
                }, stack.y = function(z) {
                    return arguments.length ? (y = z, stack) : y
                }, stack.out = function(z) {
                    return arguments.length ? (out = z, stack) : out
                }, stack
            };
            var d3_layout_stackOrders = d3.map({
                    "inside-out": function(data) {
                        var i, j, n = data.length,
                            max = data.map(d3_layout_stackMaxIndex),
                            sums = data.map(d3_layout_stackReduceSum),
                            index = d3.range(n).sort(function(a, b) {
                                return max[a] - max[b]
                            }),
                            top = 0,
                            bottom = 0,
                            tops = [],
                            bottoms = [];
                        for (i = 0; i < n; ++i) j = index[i], top < bottom ? (top += sums[j], tops.push(j)) : (bottom += sums[j], bottoms.push(j));
                        return bottoms.reverse().concat(tops)
                    },
                    reverse: function(data) {
                        return d3.range(data.length).reverse()
                    },
                    default: d3_layout_stackOrderDefault
                }),
                d3_layout_stackOffsets = d3.map({
                    silhouette: function(data) {
                        var i, j, o, n = data.length,
                            m = data[0].length,
                            sums = [],
                            max = 0,
                            y0 = [];
                        for (j = 0; j < m; ++j) {
                            for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
                            o > max && (max = o), sums.push(o)
                        }
                        for (j = 0; j < m; ++j) y0[j] = (max - sums[j]) / 2;
                        return y0
                    },
                    wiggle: function(data) {
                        var i, j, k, s1, s2, s3, dx, o, o0, n = data.length,
                            x = data[0],
                            m = x.length,
                            y0 = [];
                        for (y0[0] = o = o0 = 0, j = 1; j < m; ++j) {
                            for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
                            for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
                                for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
                                s2 += s3 * data[i][j][1]
                            }
                            y0[j] = o -= s1 ? s2 / s1 * dx : 0, o < o0 && (o0 = o)
                        }
                        for (j = 0; j < m; ++j) y0[j] -= o0;
                        return y0
                    },
                    expand: function(data) {
                        var i, j, o, n = data.length,
                            m = data[0].length,
                            k = 1 / n,
                            y0 = [];
                        for (j = 0; j < m; ++j) {
                            for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
                            if (o)
                                for (i = 0; i < n; i++) data[i][j][1] /= o;
                            else
                                for (i = 0; i < n; i++) data[i][j][1] = k
                        }
                        for (j = 0; j < m; ++j) y0[j] = 0;
                        return y0
                    },
                    zero: d3_layout_stackOffsetZero
                });
            d3.layout.histogram = function() {
                function histogram(data, i) {
                    for (var bin, x, bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n; ++i < m;) bin = bins[i] = [], bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]), bin.y = 0;
                    if (m > 0)
                        for (i = -1; ++i < n;)(x = values[i]) >= range[0] && x <= range[1] && (bin = bins[d3.bisect(thresholds, x, 1, m) - 1], bin.y += k, bin.push(data[i]));
                    return bins
                }
                var frequency = !0,
                    valuer = Number,
                    ranger = d3_layout_histogramRange,
                    binner = d3_layout_histogramBinSturges;
                return histogram.value = function(x) {
                    return arguments.length ? (valuer = x, histogram) : valuer
                }, histogram.range = function(x) {
                    return arguments.length ? (ranger = d3_functor(x), histogram) : ranger
                }, histogram.bins = function(x) {
                    return arguments.length ? (binner = "number" == typeof x ? function(range) {
                        return d3_layout_histogramBinFixed(range, x)
                    } : d3_functor(x), histogram) : binner
                }, histogram.frequency = function(x) {
                    return arguments.length ? (frequency = !!x, histogram) : frequency
                }, histogram
            }, d3.layout.pack = function() {
                function pack(d, i) {
                    var nodes = hierarchy.call(this, d, i),
                        root = nodes[0],
                        w = size[0],
                        h = size[1],
                        r = null == radius ? Math.sqrt : "function" == typeof radius ? radius : function() {
                            return radius
                        };
                    if (root.x = root.y = 0, d3_layout_hierarchyVisitAfter(root, function(d) {
                            d.r = +r(d.value)
                        }), d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings), padding) {
                        var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
                        d3_layout_hierarchyVisitAfter(root, function(d) {
                            d.r += dr
                        }), d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings), d3_layout_hierarchyVisitAfter(root, function(d) {
                            d.r -= dr
                        })
                    }
                    return d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h)), nodes
                }
                var radius, hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort),
                    padding = 0,
                    size = [1, 1];
                return pack.size = function(_) {
                    return arguments.length ? (size = _, pack) : size
                }, pack.radius = function(_) {
                    return arguments.length ? (radius = null == _ || "function" == typeof _ ? _ : +_, pack) : radius
                }, pack.padding = function(_) {
                    return arguments.length ? (padding = +_, pack) : padding
                }, d3_layout_hierarchyRebind(pack, hierarchy)
            }, d3.layout.tree = function() {
                function tree(d, i) {
                    var nodes = hierarchy.call(this, d, i),
                        root0 = nodes[0],
                        root1 = wrapTree(root0);
                    if (d3_layout_hierarchyVisitAfter(root1, firstWalk), root1.parent.m = -root1.z, d3_layout_hierarchyVisitBefore(root1, secondWalk), nodeSize) d3_layout_hierarchyVisitBefore(root0, sizeNode);
                    else {
                        var left = root0,
                            right = root0,
                            bottom = root0;
                        d3_layout_hierarchyVisitBefore(root0, function(node) {
                            node.x < left.x && (left = node), node.x > right.x && (right = node), node.depth > bottom.depth && (bottom = node)
                        });
                        var tx = separation(left, right) / 2 - left.x,
                            kx = size[0] / (right.x + separation(right, left) / 2 + tx),
                            ky = size[1] / (bottom.depth || 1);
                        d3_layout_hierarchyVisitBefore(root0, function(node) {
                            node.x = (node.x + tx) * kx, node.y = node.depth * ky
                        })
                    }
                    return nodes
                }

                function wrapTree(root0) {
                    for (var node1, root1 = {
                            A: null,
                            children: [root0]
                        }, queue = [root1]; null != (node1 = queue.pop());)
                        for (var child, children = node1.children, i = 0, n = children.length; i < n; ++i) queue.push((children[i] = child = {
                            _: children[i],
                            parent: node1,
                            children: (child = children[i].children) && child.slice() || [],
                            A: null,
                            a: null,
                            z: 0,
                            m: 0,
                            c: 0,
                            s: 0,
                            t: null,
                            i: i
                        }).a = child);
                    return root1.children[0]
                }

                function firstWalk(v) {
                    var children = v.children,
                        siblings = v.parent.children,
                        w = v.i ? siblings[v.i - 1] : null;
                    if (children.length) {
                        d3_layout_treeShift(v);
                        var midpoint = (children[0].z + children[children.length - 1].z) / 2;
                        w ? (v.z = w.z + separation(v._, w._), v.m = v.z - midpoint) : v.z = midpoint
                    } else w && (v.z = w.z + separation(v._, w._));
                    v.parent.A = apportion(v, w, v.parent.A || siblings[0])
                }

                function secondWalk(v) {
                    v._.x = v.z + v.parent.m, v.m += v.parent.m
                }

                function apportion(v, w, ancestor) {
                    if (w) {
                        for (var shift, vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m; vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip;) vom = d3_layout_treeLeft(vom), vop = d3_layout_treeRight(vop), vop.a = v, shift = vim.z + sim - vip.z - sip + separation(vim._, vip._), shift > 0 && (d3_layout_treeMove(d3_layout_treeAncestor(vim, v, ancestor), v, shift), sip += shift, sop += shift), sim += vim.m, sip += vip.m, som += vom.m, sop += vop.m;
                        vim && !d3_layout_treeRight(vop) && (vop.t = vim, vop.m += sim - sop), vip && !d3_layout_treeLeft(vom) && (vom.t = vip, vom.m += sip - som, ancestor = v)
                    }
                    return ancestor
                }

                function sizeNode(node) {
                    node.x *= size[0], node.y = node.depth * size[1]
                }
                var hierarchy = d3.layout.hierarchy().sort(null).value(null),
                    separation = d3_layout_treeSeparation,
                    size = [1, 1],
                    nodeSize = null;
                return tree.separation = function(x) {
                    return arguments.length ? (separation = x, tree) : separation
                }, tree.size = function(x) {
                    return arguments.length ? (nodeSize = null == (size = x) ? sizeNode : null, tree) : nodeSize ? null : size
                }, tree.nodeSize = function(x) {
                    return arguments.length ? (nodeSize = null == (size = x) ? null : sizeNode, tree) : nodeSize ? size : null
                }, d3_layout_hierarchyRebind(tree, hierarchy)
            }, d3.layout.cluster = function() {
                function cluster(d, i) {
                    var previousNode, nodes = hierarchy.call(this, d, i),
                        root = nodes[0],
                        x = 0;
                    d3_layout_hierarchyVisitAfter(root, function(node) {
                        var children = node.children;
                        children && children.length ? (node.x = d3_layout_clusterX(children), node.y = d3_layout_clusterY(children)) : (node.x = previousNode ? x += separation(node, previousNode) : 0, node.y = 0, previousNode = node)
                    });
                    var left = d3_layout_clusterLeft(root),
                        right = d3_layout_clusterRight(root),
                        x0 = left.x - separation(left, right) / 2,
                        x1 = right.x + separation(right, left) / 2;
                    return d3_layout_hierarchyVisitAfter(root, nodeSize ? function(node) {
                        node.x = (node.x - root.x) * size[0], node.y = (root.y - node.y) * size[1]
                    } : function(node) {
                        node.x = (node.x - x0) / (x1 - x0) * size[0], node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1]
                    }), nodes
                }
                var hierarchy = d3.layout.hierarchy().sort(null).value(null),
                    separation = d3_layout_treeSeparation,
                    size = [1, 1],
                    nodeSize = !1;
                return cluster.separation = function(x) {
                    return arguments.length ? (separation = x, cluster) : separation
                }, cluster.size = function(x) {
                    return arguments.length ? (nodeSize = null == (size = x), cluster) : nodeSize ? null : size
                }, cluster.nodeSize = function(x) {
                    return arguments.length ? (nodeSize = null != (size = x), cluster) : nodeSize ? size : null
                }, d3_layout_hierarchyRebind(cluster, hierarchy)
            }, d3.layout.treemap = function() {
                function scale(children, k) {
                    for (var child, area, i = -1, n = children.length; ++i < n;) area = (child = children[i]).value * (k < 0 ? 0 : k), child.area = isNaN(area) || area <= 0 ? 0 : area
                }

                function squarify(node) {
                    var children = node.children;
                    if (children && children.length) {
                        var child, score, n, rect = pad(node),
                            row = [],
                            remaining = children.slice(),
                            best = 1 / 0,
                            u = "slice" === mode ? rect.dx : "dice" === mode ? rect.dy : "slice-dice" === mode ? 1 & node.depth ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy);
                        for (scale(remaining, rect.dx * rect.dy / node.value), row.area = 0;
                            (n = remaining.length) > 0;) row.push(child = remaining[n - 1]), row.area += child.area, "squarify" !== mode || (score = worst(row, u)) <= best ? (remaining.pop(), best = score) : (row.area -= row.pop().area, position(row, u, rect, !1), u = Math.min(rect.dx, rect.dy), row.length = row.area = 0, best = 1 / 0);
                        row.length && (position(row, u, rect, !0), row.length = row.area = 0), children.forEach(squarify)
                    }
                }

                function stickify(node) {
                    var children = node.children;
                    if (children && children.length) {
                        var child, rect = pad(node),
                            remaining = children.slice(),
                            row = [];
                        for (scale(remaining, rect.dx * rect.dy / node.value), row.area = 0; child = remaining.pop();) row.push(child), row.area += child.area, null != child.z && (position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length), row.length = row.area = 0);
                        children.forEach(stickify)
                    }
                }

                function worst(row, u) {
                    for (var r, s = row.area, rmax = 0, rmin = 1 / 0, i = -1, n = row.length; ++i < n;)(r = row[i].area) && (r < rmin && (rmin = r), r > rmax && (rmax = r));
                    return s *= s, u *= u, s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : 1 / 0
                }

                function position(row, u, rect, flush) {
                    var o, i = -1,
                        n = row.length,
                        x = rect.x,
                        y = rect.y,
                        v = u ? round(row.area / u) : 0;
                    if (u == rect.dx) {
                        for ((flush || v > rect.dy) && (v = rect.dy); ++i < n;) o = row[i], o.x = x, o.y = y, o.dy = v, x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
                        o.z = !0, o.dx += rect.x + rect.dx - x, rect.y += v, rect.dy -= v
                    } else {
                        for ((flush || v > rect.dx) && (v = rect.dx); ++i < n;) o = row[i], o.x = x, o.y = y, o.dx = v, y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
                        o.z = !1, o.dy += rect.y + rect.dy - y, rect.x += v, rect.dx -= v
                    }
                }

                function treemap(d) {
                    var nodes = stickies || hierarchy(d),
                        root = nodes[0];
                    return root.x = root.y = 0, root.value ? (root.dx = size[0], root.dy = size[1]) : root.dx = root.dy = 0, stickies && hierarchy.revalue(root), scale([root], root.dx * root.dy / root.value), (stickies ? stickify : squarify)(root), sticky && (stickies = nodes), nodes
                }
                var stickies, hierarchy = d3.layout.hierarchy(),
                    round = Math.round,
                    size = [1, 1],
                    padding = null,
                    pad = d3_layout_treemapPadNull,
                    sticky = !1,
                    mode = "squarify",
                    ratio = .5 * (1 + Math.sqrt(5));
                return treemap.size = function(x) {
                    return arguments.length ? (size = x, treemap) : size
                }, treemap.padding = function(x) {
                    function padFunction(node) {
                        var p = x.call(treemap, node, node.depth);
                        return null == p ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, "number" == typeof p ? [p, p, p, p] : p)
                    }

                    function padConstant(node) {
                        return d3_layout_treemapPad(node, x)
                    }
                    if (!arguments.length) return padding;
                    var type;
                    return pad = null == (padding = x) ? d3_layout_treemapPadNull : "function" == (type = typeof x) ? padFunction : "number" === type ? (x = [x, x, x, x], padConstant) : padConstant, treemap
                }, treemap.round = function(x) {
                    return arguments.length ? (round = x ? Math.round : Number, treemap) : round != Number
                }, treemap.sticky = function(x) {
                    return arguments.length ? (sticky = x, stickies = null, treemap) : sticky
                }, treemap.ratio = function(x) {
                    return arguments.length ? (ratio = x, treemap) : ratio
                }, treemap.mode = function(x) {
                    return arguments.length ? (mode = x + "", treemap) : mode
                }, d3_layout_hierarchyRebind(treemap, hierarchy)
            }, d3.random = {
                normal: function(µ, σ) {
                    var n = arguments.length;
                    return n < 2 && (σ = 1), n < 1 && (µ = 0),
                        function() {
                            var x, y, r;
                            do {
                                x = 2 * Math.random() - 1, y = 2 * Math.random() - 1, r = x * x + y * y
                            } while (!r || r > 1);
                            return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r)
                        }
                },
                logNormal: function() {
                    var random = d3.random.normal.apply(d3, arguments);
                    return function() {
                        return Math.exp(random())
                    }
                },
                bates: function(m) {
                    var random = d3.random.irwinHall(m);
                    return function() {
                        return random() / m
                    }
                },
                irwinHall: function(m) {
                    return function() {
                        for (var s = 0, j = 0; j < m; j++) s += Math.random();
                        return s
                    }
                }
            }, d3.scale = {};
            var d3_scale_niceIdentity = {
                floor: d3_identity,
                ceil: d3_identity
            };
            d3.scale.linear = function() {
                return d3_scale_linear([0, 1], [0, 1], d3_interpolate, !1)
            };
            var d3_scale_linearFormatSignificant = {
                s: 1,
                g: 1,
                p: 1,
                r: 1,
                e: 1
            };
            d3.scale.log = function() {
                return d3_scale_log(d3.scale.linear().domain([0, 1]), 10, !0, [1, 10])
            };
            var d3_scale_logFormat = d3.format(".0e"),
                d3_scale_logNiceNegative = {
                    floor: function(x) {
                        return -Math.ceil(-x)
                    },
                    ceil: function(x) {
                        return -Math.floor(-x)
                    }
                };
            d3.scale.pow = function() {
                return d3_scale_pow(d3.scale.linear(), 1, [0, 1])
            }, d3.scale.sqrt = function() {
                return d3.scale.pow().exponent(.5)
            }, d3.scale.ordinal = function() {
                return d3_scale_ordinal([], {
                    t: "range",
                    a: [
                        []
                    ]
                })
            }, d3.scale.category10 = function() {
                return d3.scale.ordinal().range(d3_category10)
            }, d3.scale.category20 = function() {
                return d3.scale.ordinal().range(d3_category20)
            }, d3.scale.category20b = function() {
                return d3.scale.ordinal().range(d3_category20b)
            }, d3.scale.category20c = function() {
                return d3.scale.ordinal().range(d3_category20c)
            };
            var d3_category10 = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(d3_rgbString),
                d3_category20 = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(d3_rgbString),
                d3_category20b = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(d3_rgbString),
                d3_category20c = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(d3_rgbString);
            d3.scale.quantile = function() {
                return d3_scale_quantile([], [])
            }, d3.scale.quantize = function() {
                return d3_scale_quantize(0, 1, [0, 1])
            }, d3.scale.threshold = function() {
                return d3_scale_threshold([.5], [0, 1])
            }, d3.scale.identity = function() {
                return d3_scale_identity([0, 1])
            }, d3.svg = {}, d3.svg.arc = function() {
                function arc() {
                    var r0 = Math.max(0, +innerRadius.apply(this, arguments)),
                        r1 = Math.max(0, +outerRadius.apply(this, arguments)),
                        a0 = startAngle.apply(this, arguments) - halfπ,
                        a1 = endAngle.apply(this, arguments) - halfπ,
                        da = Math.abs(a1 - a0),
                        cw = a0 > a1 ? 0 : 1;
                    if (r1 < r0 && (rc = r1, r1 = r0, r0 = rc), da >= τε) return circleSegment(r1, cw) + (r0 ? circleSegment(r0, 1 - cw) : "") + "Z";
                    var rc, cr, rp, ap, x0, y0, x1, y1, x2, y2, x3, y3, p0 = 0,
                        p1 = 0,
                        path = [];
                    if ((ap = (+padAngle.apply(this, arguments) || 0) / 2) && (rp = padRadius === d3_svg_arcAuto ? Math.sqrt(r0 * r0 + r1 * r1) : +padRadius.apply(this, arguments), cw || (p1 *= -1), r1 && (p1 = d3_asin(rp / r1 * Math.sin(ap))), r0 && (p0 = d3_asin(rp / r0 * Math.sin(ap)))), r1) {
                        x0 = r1 * Math.cos(a0 + p1), y0 = r1 * Math.sin(a0 + p1), x1 = r1 * Math.cos(a1 - p1), y1 = r1 * Math.sin(a1 - p1);
                        var l1 = Math.abs(a1 - a0 - 2 * p1) <= π ? 0 : 1;
                        if (p1 && d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ l1) {
                            var h1 = (a0 + a1) / 2;
                            x0 = r1 * Math.cos(h1), y0 = r1 * Math.sin(h1), x1 = y1 = null
                        }
                    } else x0 = y0 = 0;
                    if (r0) {
                        x2 = r0 * Math.cos(a1 - p0), y2 = r0 * Math.sin(a1 - p0), x3 = r0 * Math.cos(a0 + p0), y3 = r0 * Math.sin(a0 + p0);
                        var l0 = Math.abs(a0 - a1 + 2 * p0) <= π ? 0 : 1;
                        if (p0 && d3_svg_arcSweep(x2, y2, x3, y3) === 1 - cw ^ l0) {
                            var h0 = (a0 + a1) / 2;
                            x2 = r0 * Math.cos(h0), y2 = r0 * Math.sin(h0), x3 = y3 = null
                        }
                    } else x2 = y2 = 0;
                    if (da > ε && (rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments))) > .001) {
                        cr = r0 < r1 ^ cw ? 0 : 1;
                        var rc1 = rc,
                            rc0 = rc;
                        if (da < π) {
                            var oc = null == x3 ? [x2, y2] : null == x1 ? [x0, y0] : d3_geom_polygonIntersect([x0, y0], [x3, y3], [x1, y1], [x2, y2]),
                                ax = x0 - oc[0],
                                ay = y0 - oc[1],
                                bx = x1 - oc[0],
                                by = y1 - oc[1],
                                kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
                                lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
                            rc0 = Math.min(rc, (r0 - lc) / (kc - 1)), rc1 = Math.min(rc, (r1 - lc) / (kc + 1))
                        }
                        if (null != x1) {
                            var t30 = d3_svg_arcCornerTangents(null == x3 ? [x2, y2] : [x3, y3], [x0, y0], r1, rc1, cw),
                                t12 = d3_svg_arcCornerTangents([x1, y1], [x2, y2], r1, rc1, cw);
                            rc === rc1 ? path.push("M", t30[0], "A", rc1, ",", rc1, " 0 0,", cr, " ", t30[1], "A", r1, ",", r1, " 0 ", 1 - cw ^ d3_svg_arcSweep(t30[1][0], t30[1][1], t12[1][0], t12[1][1]), ",", cw, " ", t12[1], "A", rc1, ",", rc1, " 0 0,", cr, " ", t12[0]) : path.push("M", t30[0], "A", rc1, ",", rc1, " 0 1,", cr, " ", t12[0])
                        } else path.push("M", x0, ",", y0);
                        if (null != x3) {
                            var t03 = d3_svg_arcCornerTangents([x0, y0], [x3, y3], r0, -rc0, cw),
                                t21 = d3_svg_arcCornerTangents([x2, y2], null == x1 ? [x0, y0] : [x1, y1], r0, -rc0, cw);
                            rc === rc0 ? path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t21[1], "A", r0, ",", r0, " 0 ", cw ^ d3_svg_arcSweep(t21[1][0], t21[1][1], t03[1][0], t03[1][1]), ",", 1 - cw, " ", t03[1], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]) : path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0])
                        } else path.push("L", x2, ",", y2)
                    } else path.push("M", x0, ",", y0), null != x1 && path.push("A", r1, ",", r1, " 0 ", l1, ",", cw, " ", x1, ",", y1), path.push("L", x2, ",", y2), null != x3 && path.push("A", r0, ",", r0, " 0 ", l0, ",", 1 - cw, " ", x3, ",", y3);
                    return path.push("Z"), path.join("")
                }

                function circleSegment(r1, cw) {
                    return "M0," + r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + -r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + r1
                }
                var innerRadius = d3_svg_arcInnerRadius,
                    outerRadius = d3_svg_arcOuterRadius,
                    cornerRadius = d3_zero,
                    padRadius = d3_svg_arcAuto,
                    startAngle = d3_svg_arcStartAngle,
                    endAngle = d3_svg_arcEndAngle,
                    padAngle = d3_svg_arcPadAngle;
                return arc.innerRadius = function(v) {
                    return arguments.length ? (innerRadius = d3_functor(v), arc) : innerRadius
                }, arc.outerRadius = function(v) {
                    return arguments.length ? (outerRadius = d3_functor(v), arc) : outerRadius
                }, arc.cornerRadius = function(v) {
                    return arguments.length ? (cornerRadius = d3_functor(v), arc) : cornerRadius
                }, arc.padRadius = function(v) {
                    return arguments.length ? (padRadius = v == d3_svg_arcAuto ? d3_svg_arcAuto : d3_functor(v), arc) : padRadius
                }, arc.startAngle = function(v) {
                    return arguments.length ? (startAngle = d3_functor(v), arc) : startAngle
                }, arc.endAngle = function(v) {
                    return arguments.length ? (endAngle = d3_functor(v), arc) : endAngle
                }, arc.padAngle = function(v) {
                    return arguments.length ? (padAngle = d3_functor(v), arc) : padAngle
                }, arc.centroid = function() {
                    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
                        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - halfπ;
                    return [Math.cos(a) * r, Math.sin(a) * r]
                }, arc
            };
            var d3_svg_arcAuto = "auto";
            d3.svg.line = function() {
                return d3_svg_line(d3_identity)
            };
            var d3_svg_lineInterpolators = d3.map({
                linear: d3_svg_lineLinear,
                "linear-closed": d3_svg_lineLinearClosed,
                step: d3_svg_lineStep,
                "step-before": d3_svg_lineStepBefore,
                "step-after": d3_svg_lineStepAfter,
                basis: d3_svg_lineBasis,
                "basis-open": d3_svg_lineBasisOpen,
                "basis-closed": d3_svg_lineBasisClosed,
                bundle: d3_svg_lineBundle,
                cardinal: d3_svg_lineCardinal,
                "cardinal-open": d3_svg_lineCardinalOpen,
                "cardinal-closed": d3_svg_lineCardinalClosed,
                monotone: d3_svg_lineMonotone
            });
            d3_svg_lineInterpolators.forEach(function(key, value) {
                value.key = key, value.closed = /-closed$/.test(key)
            });
            var d3_svg_lineBasisBezier1 = [0, 2 / 3, 1 / 3, 0],
                d3_svg_lineBasisBezier2 = [0, 1 / 3, 2 / 3, 0],
                d3_svg_lineBasisBezier3 = [0, 1 / 6, 2 / 3, 1 / 6];
            d3.svg.line.radial = function() {
                var line = d3_svg_line(d3_svg_lineRadial);
                return line.radius = line.x, delete line.x, line.angle = line.y, delete line.y, line
            }, d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter, d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore, d3.svg.area = function() {
                return d3_svg_area(d3_identity)
            }, d3.svg.area.radial = function() {
                var area = d3_svg_area(d3_svg_lineRadial);
                return area.radius = area.x, delete area.x, area.innerRadius = area.x0, delete area.x0, area.outerRadius = area.x1, delete area.x1, area.angle = area.y, delete area.y, area.startAngle = area.y0, delete area.y0, area.endAngle = area.y1, delete area.y1, area
            }, d3.svg.chord = function() {
                function chord(d, i) {
                    var s = subgroup(this, source, d, i),
                        t = subgroup(this, target, d, i);
                    return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z"
                }

                function subgroup(self, f, d, i) {
                    var subgroup = f.call(self, d, i),
                        r = radius.call(self, subgroup, i),
                        a0 = startAngle.call(self, subgroup, i) - halfπ,
                        a1 = endAngle.call(self, subgroup, i) - halfπ;
                    return {
                        r: r,
                        a0: a0,
                        a1: a1,
                        p0: [r * Math.cos(a0), r * Math.sin(a0)],
                        p1: [r * Math.cos(a1), r * Math.sin(a1)]
                    }
                }

                function equals(a, b) {
                    return a.a0 == b.a0 && a.a1 == b.a1
                }

                function arc(r, p, a) {
                    return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p
                }

                function curve(r0, p0, r1, p1) {
                    return "Q 0,0 " + p1
                }
                var source = d3_source,
                    target = d3_target,
                    radius = d3_svg_chordRadius,
                    startAngle = d3_svg_arcStartAngle,
                    endAngle = d3_svg_arcEndAngle;
                return chord.radius = function(v) {
                    return arguments.length ? (radius = d3_functor(v), chord) : radius
                }, chord.source = function(v) {
                    return arguments.length ? (source = d3_functor(v), chord) : source
                }, chord.target = function(v) {
                    return arguments.length ? (target = d3_functor(v), chord) : target
                }, chord.startAngle = function(v) {
                    return arguments.length ? (startAngle = d3_functor(v), chord) : startAngle
                }, chord.endAngle = function(v) {
                    return arguments.length ? (endAngle = d3_functor(v), chord) : endAngle
                }, chord
            }, d3.svg.diagonal = function() {
                function diagonal(d, i) {
                    var p0 = source.call(this, d, i),
                        p3 = target.call(this, d, i),
                        m = (p0.y + p3.y) / 2,
                        p = [p0, {
                            x: p0.x,
                            y: m
                        }, {
                            x: p3.x,
                            y: m
                        }, p3];
                    return p = p.map(projection), "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3]
                }
                var source = d3_source,
                    target = d3_target,
                    projection = d3_svg_diagonalProjection;
                return diagonal.source = function(x) {
                    return arguments.length ? (source = d3_functor(x), diagonal) : source
                }, diagonal.target = function(x) {
                    return arguments.length ? (target = d3_functor(x), diagonal) : target
                }, diagonal.projection = function(x) {
                    return arguments.length ? (projection = x, diagonal) : projection
                }, diagonal
            }, d3.svg.diagonal.radial = function() {
                var diagonal = d3.svg.diagonal(),
                    projection = d3_svg_diagonalProjection,
                    projection_ = diagonal.projection;
                return diagonal.projection = function(x) {
                    return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection
                }, diagonal
            }, d3.svg.symbol = function() {
                function symbol(d, i) {
                    return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i))
                }
                var type = d3_svg_symbolType,
                    size = d3_svg_symbolSize;
                return symbol.type = function(x) {
                    return arguments.length ? (type = d3_functor(x), symbol) : type
                }, symbol.size = function(x) {
                    return arguments.length ? (size = d3_functor(x), symbol) : size
                }, symbol
            };
            var d3_svg_symbols = d3.map({
                circle: d3_svg_symbolCircle,
                cross: function(size) {
                    var r = Math.sqrt(size / 5) / 2;
                    return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z"
                },
                diamond: function(size) {
                    var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)),
                        rx = ry * d3_svg_symbolTan30;
                    return "M0," + -ry + "L" + rx + ",0 0," + ry + " " + -rx + ",0Z"
                },
                square: function(size) {
                    var r = Math.sqrt(size) / 2;
                    return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z"
                },
                "triangle-down": function(size) {
                    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
                        ry = rx * d3_svg_symbolSqrt3 / 2;
                    return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z"
                },
                "triangle-up": function(size) {
                    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
                        ry = rx * d3_svg_symbolSqrt3 / 2;
                    return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z"
                }
            });
            d3.svg.symbolTypes = d3_svg_symbols.keys();
            var d3_svg_symbolSqrt3 = Math.sqrt(3),
                d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
            d3_selectionPrototype.transition = function(name) {
                for (var subgroup, node, id = d3_transitionInheritId || ++d3_transitionId, ns = d3_transitionNamespace(name), subgroups = [], transition = d3_transitionInherit || {
                        time: Date.now(),
                        ease: d3_ease_cubicInOut,
                        delay: 0,
                        duration: 250
                    }, j = -1, m = this.length; ++j < m;) {
                    subgroups.push(subgroup = []);
                    for (var group = this[j], i = -1, n = group.length; ++i < n;)(node = group[i]) && d3_transitionNode(node, i, ns, id, transition), subgroup.push(node)
                }
                return d3_transition(subgroups, ns, id)
            }, d3_selectionPrototype.interrupt = function(name) {
                return this.each(null == name ? d3_selection_interrupt : d3_selection_interruptNS(d3_transitionNamespace(name)))
            };
            var d3_transitionInheritId, d3_transitionInherit, d3_selection_interrupt = d3_selection_interruptNS(d3_transitionNamespace()),
                d3_transitionPrototype = [],
                d3_transitionId = 0;
            d3_transitionPrototype.call = d3_selectionPrototype.call, d3_transitionPrototype.empty = d3_selectionPrototype.empty, d3_transitionPrototype.node = d3_selectionPrototype.node, d3_transitionPrototype.size = d3_selectionPrototype.size, d3.transition = function(selection, name) {
                return selection && selection.transition ? d3_transitionInheritId ? selection.transition(name) : selection : d3.selection().transition(selection)
            }, d3.transition.prototype = d3_transitionPrototype, d3_transitionPrototype.select = function(selector) {
                var subgroup, subnode, node, id = this.id,
                    ns = this.namespace,
                    subgroups = [];
                selector = d3_selection_selector(selector);
                for (var j = -1, m = this.length; ++j < m;) {
                    subgroups.push(subgroup = []);
                    for (var group = this[j], i = -1, n = group.length; ++i < n;)(node = group[i]) && (subnode = selector.call(node, node.__data__, i, j)) ? ("__data__" in node && (subnode.__data__ = node.__data__), d3_transitionNode(subnode, i, ns, id, node[ns][id]), subgroup.push(subnode)) : subgroup.push(null)
                }
                return d3_transition(subgroups, ns, id)
            }, d3_transitionPrototype.selectAll = function(selector) {
                var subgroup, subnodes, node, subnode, transition, id = this.id,
                    ns = this.namespace,
                    subgroups = [];
                selector = d3_selection_selectorAll(selector);
                for (var j = -1, m = this.length; ++j < m;)
                    for (var group = this[j], i = -1, n = group.length; ++i < n;)
                        if (node = group[i]) {
                            transition = node[ns][id], subnodes = selector.call(node, node.__data__, i, j), subgroups.push(subgroup = []);
                            for (var k = -1, o = subnodes.length; ++k < o;)(subnode = subnodes[k]) && d3_transitionNode(subnode, k, ns, id, transition), subgroup.push(subnode)
                        } return d3_transition(subgroups, ns, id)
            }, d3_transitionPrototype.filter = function(filter) {
                var subgroup, group, node, subgroups = [];
                "function" != typeof filter && (filter = d3_selection_filter(filter));
                for (var j = 0, m = this.length; j < m; j++) {
                    subgroups.push(subgroup = []);
                    for (var group = this[j], i = 0, n = group.length; i < n; i++)(node = group[i]) && filter.call(node, node.__data__, i, j) && subgroup.push(node)
                }
                return d3_transition(subgroups, this.namespace, this.id)
            }, d3_transitionPrototype.tween = function(name, tween) {
                var id = this.id,
                    ns = this.namespace;
                return arguments.length < 2 ? this.node()[ns][id].tween.get(name) : d3_selection_each(this, null == tween ? function(node) {
                    node[ns][id].tween.remove(name)
                } : function(node) {
                    node[ns][id].tween.set(name, tween)
                })
            }, d3_transitionPrototype.attr = function(nameNS, value) {
                function attrNull() {
                    this.removeAttribute(name)
                }

                function attrNullNS() {
                    this.removeAttributeNS(name.space, name.local)
                }

                function attrTween(b) {
                    return null == b ? attrNull : (b += "", function() {
                        var i, a = this.getAttribute(name);
                        return a !== b && (i = interpolate(a, b), function(t) {
                            this.setAttribute(name, i(t))
                        })
                    })
                }

                function attrTweenNS(b) {
                    return null == b ? attrNullNS : (b += "", function() {
                        var i, a = this.getAttributeNS(name.space, name.local);
                        return a !== b && (i = interpolate(a, b), function(t) {
                            this.setAttributeNS(name.space, name.local, i(t))
                        })
                    })
                }
                if (arguments.length < 2) {
                    for (value in nameNS) this.attr(value, nameNS[value]);
                    return this
                }
                var interpolate = "transform" == nameNS ? d3_interpolateTransform : d3_interpolate,
                    name = d3.ns.qualify(nameNS);
                return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween)
            }, d3_transitionPrototype.attrTween = function(nameNS, tween) {
                function attrTween(d, i) {
                    var f = tween.call(this, d, i, this.getAttribute(name));
                    return f && function(t) {
                        this.setAttribute(name, f(t))
                    }
                }

                function attrTweenNS(d, i) {
                    var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
                    return f && function(t) {
                        this.setAttributeNS(name.space, name.local, f(t))
                    }
                }
                var name = d3.ns.qualify(nameNS);
                return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween)
            }, d3_transitionPrototype.style = function(name, value, priority) {
                function styleNull() {
                    this.style.removeProperty(name)
                }

                function styleString(b) {
                    return null == b ? styleNull : (b += "", function() {
                        var i, a = d3_window(this).getComputedStyle(this, null).getPropertyValue(name);
                        return a !== b && (i = d3_interpolate(a, b), function(t) {
                            this.style.setProperty(name, i(t), priority)
                        })
                    })
                }
                var n = arguments.length;
                if (n < 3) {
                    if ("string" != typeof name) {
                        n < 2 && (value = "");
                        for (priority in name) this.style(priority, name[priority], value);
                        return this
                    }
                    priority = ""
                }
                return d3_transition_tween(this, "style." + name, value, styleString)
            }, d3_transitionPrototype.styleTween = function(name, tween, priority) {
                function styleTween(d, i) {
                    var f = tween.call(this, d, i, d3_window(this).getComputedStyle(this, null).getPropertyValue(name));
                    return f && function(t) {
                        this.style.setProperty(name, f(t), priority)
                    }
                }
                return arguments.length < 3 && (priority = ""), this.tween("style." + name, styleTween)
            }, d3_transitionPrototype.text = function(value) {
                return d3_transition_tween(this, "text", value, d3_transition_text)
            }, d3_transitionPrototype.remove = function() {
                var ns = this.namespace;
                return this.each("end.transition", function() {
                    var p;
                    this[ns].count < 2 && (p = this.parentNode) && p.removeChild(this)
                })
            }, d3_transitionPrototype.ease = function(value) {
                var id = this.id,
                    ns = this.namespace;
                return arguments.length < 1 ? this.node()[ns][id].ease : ("function" != typeof value && (value = d3.ease.apply(d3, arguments)), d3_selection_each(this, function(node) {
                    node[ns][id].ease = value
                }))
            }, d3_transitionPrototype.delay = function(value) {
                var id = this.id,
                    ns = this.namespace;
                return arguments.length < 1 ? this.node()[ns][id].delay : d3_selection_each(this, "function" == typeof value ? function(node, i, j) {
                    node[ns][id].delay = +value.call(node, node.__data__, i, j)
                } : (value = +value, function(node) {
                    node[ns][id].delay = value
                }))
            }, d3_transitionPrototype.duration = function(value) {
                var id = this.id,
                    ns = this.namespace;
                return arguments.length < 1 ? this.node()[ns][id].duration : d3_selection_each(this, "function" == typeof value ? function(node, i, j) {
                    node[ns][id].duration = Math.max(1, value.call(node, node.__data__, i, j))
                } : (value = Math.max(1, value), function(node) {
                    node[ns][id].duration = value
                }))
            }, d3_transitionPrototype.each = function(type, listener) {
                var id = this.id,
                    ns = this.namespace;
                if (arguments.length < 2) {
                    var inherit = d3_transitionInherit,
                        inheritId = d3_transitionInheritId;
                    try {
                        d3_transitionInheritId = id, d3_selection_each(this, function(node, i, j) {
                            d3_transitionInherit = node[ns][id], type.call(node, node.__data__, i, j)
                        })
                    } finally {
                        d3_transitionInherit = inherit, d3_transitionInheritId = inheritId
                    }
                } else d3_selection_each(this, function(node) {
                    var transition = node[ns][id];
                    (transition.event || (transition.event = d3.dispatch("start", "end", "interrupt"))).on(type, listener)
                });
                return this
            }, d3_transitionPrototype.transition = function() {
                for (var subgroup, group, node, transition, id0 = this.id, id1 = ++d3_transitionId, ns = this.namespace, subgroups = [], j = 0, m = this.length; j < m; j++) {
                    subgroups.push(subgroup = []);
                    for (var group = this[j], i = 0, n = group.length; i < n; i++)(node = group[i]) && (transition = node[ns][id0], d3_transitionNode(node, i, ns, id1, {
                        time: transition.time,
                        ease: transition.ease,
                        delay: transition.delay + transition.duration,
                        duration: transition.duration
                    })), subgroup.push(node)
                }
                return d3_transition(subgroups, ns, id1)
            }, d3.svg.axis = function() {
                function axis(g) {
                    g.each(function() {
                        var tickTransform, g = d3.select(this),
                            scale0 = this.__chart__ || scale,
                            scale1 = this.__chart__ = scale.copy(),
                            ticks = null == tickValues ? scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain() : tickValues,
                            tickFormat = null == tickFormat_ ? scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity : tickFormat_,
                            tick = g.selectAll(".tick").data(ticks, scale1),
                            tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ε),
                            tickExit = d3.transition(tick.exit()).style("opacity", ε).remove(),
                            tickUpdate = d3.transition(tick.order()).style("opacity", 1),
                            tickSpacing = Math.max(innerTickSize, 0) + tickPadding,
                            range = d3_scaleRange(scale1),
                            path = g.selectAll(".domain").data([0]),
                            pathUpdate = (path.enter().append("path").attr("class", "domain"), d3.transition(path));
                        tickEnter.append("line"), tickEnter.append("text");
                        var x1, x2, y1, y2, lineEnter = tickEnter.select("line"),
                            lineUpdate = tickUpdate.select("line"),
                            text = tick.select("text").text(tickFormat),
                            textEnter = tickEnter.select("text"),
                            textUpdate = tickUpdate.select("text"),
                            sign = "top" === orient || "left" === orient ? -1 : 1;
                        if ("bottom" === orient || "top" === orient ? (tickTransform = d3_svg_axisX, x1 = "x", y1 = "y",
                                x2 = "x2", y2 = "y2", text.attr("dy", sign < 0 ? "0em" : ".71em").style("text-anchor", "middle"), pathUpdate.attr("d", "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize)) : (tickTransform = d3_svg_axisY, x1 = "y", y1 = "x", x2 = "y2", y2 = "x2", text.attr("dy", ".32em").style("text-anchor", sign < 0 ? "end" : "start"), pathUpdate.attr("d", "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize)), lineEnter.attr(y2, sign * innerTickSize), textEnter.attr(y1, sign * tickSpacing), lineUpdate.attr(x2, 0).attr(y2, sign * innerTickSize), textUpdate.attr(x1, 0).attr(y1, sign * tickSpacing), scale1.rangeBand) {
                            var x = scale1,
                                dx = x.rangeBand() / 2;
                            scale0 = scale1 = function(d) {
                                return x(d) + dx
                            }
                        } else scale0.rangeBand ? scale0 = scale1 : tickExit.call(tickTransform, scale1, scale0);
                        tickEnter.call(tickTransform, scale0, scale1), tickUpdate.call(tickTransform, scale1, scale1)
                    })
                }
                var tickFormat_, scale = d3.scale.linear(),
                    orient = d3_svg_axisDefaultOrient,
                    innerTickSize = 6,
                    outerTickSize = 6,
                    tickPadding = 3,
                    tickArguments_ = [10],
                    tickValues = null;
                return axis.scale = function(x) {
                    return arguments.length ? (scale = x, axis) : scale
                }, axis.orient = function(x) {
                    return arguments.length ? (orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient, axis) : orient
                }, axis.ticks = function() {
                    return arguments.length ? (tickArguments_ = d3_array(arguments), axis) : tickArguments_
                }, axis.tickValues = function(x) {
                    return arguments.length ? (tickValues = x, axis) : tickValues
                }, axis.tickFormat = function(x) {
                    return arguments.length ? (tickFormat_ = x, axis) : tickFormat_
                }, axis.tickSize = function(x) {
                    var n = arguments.length;
                    return n ? (innerTickSize = +x, outerTickSize = +arguments[n - 1], axis) : innerTickSize
                }, axis.innerTickSize = function(x) {
                    return arguments.length ? (innerTickSize = +x, axis) : innerTickSize
                }, axis.outerTickSize = function(x) {
                    return arguments.length ? (outerTickSize = +x, axis) : outerTickSize
                }, axis.tickPadding = function(x) {
                    return arguments.length ? (tickPadding = +x, axis) : tickPadding
                }, axis.tickSubdivide = function() {
                    return arguments.length && axis
                }, axis
            };
            var d3_svg_axisDefaultOrient = "bottom",
                d3_svg_axisOrients = {
                    top: 1,
                    right: 1,
                    bottom: 1,
                    left: 1
                };
            d3.svg.brush = function() {
                function brush(g) {
                    g.each(function() {
                        var g = d3.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart),
                            background = g.selectAll(".background").data([0]);
                        background.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), g.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                        var resize = g.selectAll(".resize").data(resizes, d3_identity);
                        resize.exit().remove(), resize.enter().append("g").attr("class", function(d) {
                            return "resize " + d
                        }).style("cursor", function(d) {
                            return d3_svg_brushCursor[d]
                        }).append("rect").attr("x", function(d) {
                            return /[ew]$/.test(d) ? -3 : null
                        }).attr("y", function(d) {
                            return /^[ns]/.test(d) ? -3 : null
                        }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), resize.style("display", brush.empty() ? "none" : null);
                        var range, gUpdate = d3.transition(g),
                            backgroundUpdate = d3.transition(background);
                        x && (range = d3_scaleRange(x), backgroundUpdate.attr("x", range[0]).attr("width", range[1] - range[0]), redrawX(gUpdate)), y && (range = d3_scaleRange(y), backgroundUpdate.attr("y", range[0]).attr("height", range[1] - range[0]), redrawY(gUpdate)), redraw(gUpdate)
                    })
                }

                function redraw(g) {
                    g.selectAll(".resize").attr("transform", function(d) {
                        return "translate(" + xExtent[+/e$/.test(d)] + "," + yExtent[+/^s/.test(d)] + ")"
                    })
                }

                function redrawX(g) {
                    g.select(".extent").attr("x", xExtent[0]), g.selectAll(".extent,.n>rect,.s>rect").attr("width", xExtent[1] - xExtent[0])
                }

                function redrawY(g) {
                    g.select(".extent").attr("y", yExtent[0]), g.selectAll(".extent,.e>rect,.w>rect").attr("height", yExtent[1] - yExtent[0])
                }

                function brushstart() {
                    function keydown() {
                        32 == d3.event.keyCode && (dragging || (center = null, origin[0] -= xExtent[1], origin[1] -= yExtent[1], dragging = 2), d3_eventPreventDefault())
                    }

                    function keyup() {
                        32 == d3.event.keyCode && 2 == dragging && (origin[0] += xExtent[1], origin[1] += yExtent[1], dragging = 0, d3_eventPreventDefault())
                    }

                    function brushmove() {
                        var point = d3.mouse(target),
                            moved = !1;
                        offset && (point[0] += offset[0], point[1] += offset[1]), dragging || (d3.event.altKey ? (center || (center = [(xExtent[0] + xExtent[1]) / 2, (yExtent[0] + yExtent[1]) / 2]), origin[0] = xExtent[+(point[0] < center[0])], origin[1] = yExtent[+(point[1] < center[1])]) : center = null), resizingX && move1(point, x, 0) && (redrawX(g), moved = !0), resizingY && move1(point, y, 1) && (redrawY(g), moved = !0), moved && (redraw(g), event_({
                            type: "brush",
                            mode: dragging ? "move" : "resize"
                        }))
                    }

                    function move1(point, scale, i) {
                        var min, max, range = d3_scaleRange(scale),
                            r0 = range[0],
                            r1 = range[1],
                            position = origin[i],
                            extent = i ? yExtent : xExtent,
                            size = extent[1] - extent[0];
                        if (dragging && (r0 -= position, r1 -= size + position), min = (i ? yClamp : xClamp) ? Math.max(r0, Math.min(r1, point[i])) : point[i], dragging ? max = (min += position) + size : (center && (position = Math.max(r0, Math.min(r1, 2 * center[i] - min))), position < min ? (max = min, min = position) : max = position), extent[0] != min || extent[1] != max) return i ? yExtentDomain = null : xExtentDomain = null, extent[0] = min, extent[1] = max, !0
                    }

                    function brushend() {
                        brushmove(), g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null), d3.select("body").style("cursor", null), w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), dragRestore(), event_({
                            type: "brushend"
                        })
                    }
                    var center, offset, target = this,
                        eventTarget = d3.select(d3.event.target),
                        event_ = event.of(target, arguments),
                        g = d3.select(target),
                        resizing = eventTarget.datum(),
                        resizingX = !/^(n|s)$/.test(resizing) && x,
                        resizingY = !/^(e|w)$/.test(resizing) && y,
                        dragging = eventTarget.classed("extent"),
                        dragRestore = d3_event_dragSuppress(target),
                        origin = d3.mouse(target),
                        w = d3.select(d3_window(target)).on("keydown.brush", keydown).on("keyup.brush", keyup);
                    if (d3.event.changedTouches ? w.on("touchmove.brush", brushmove).on("touchend.brush", brushend) : w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend), g.interrupt().selectAll("*").interrupt(), dragging) origin[0] = xExtent[0] - origin[0], origin[1] = yExtent[0] - origin[1];
                    else if (resizing) {
                        var ex = +/w$/.test(resizing),
                            ey = +/^n/.test(resizing);
                        offset = [xExtent[1 - ex] - origin[0], yExtent[1 - ey] - origin[1]], origin[0] = xExtent[ex], origin[1] = yExtent[ey]
                    } else d3.event.altKey && (center = origin.slice());
                    g.style("pointer-events", "none").selectAll(".resize").style("display", null), d3.select("body").style("cursor", eventTarget.style("cursor")), event_({
                        type: "brushstart"
                    }), brushmove()
                }
                var xExtentDomain, yExtentDomain, event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"),
                    x = null,
                    y = null,
                    xExtent = [0, 0],
                    yExtent = [0, 0],
                    xClamp = !0,
                    yClamp = !0,
                    resizes = d3_svg_brushResizes[0];
                return brush.event = function(g) {
                    g.each(function() {
                        var event_ = event.of(this, arguments),
                            extent1 = {
                                x: xExtent,
                                y: yExtent,
                                i: xExtentDomain,
                                j: yExtentDomain
                            },
                            extent0 = this.__chart__ || extent1;
                        this.__chart__ = extent1, d3_transitionInheritId ? d3.select(this).transition().each("start.brush", function() {
                            xExtentDomain = extent0.i, yExtentDomain = extent0.j, xExtent = extent0.x, yExtent = extent0.y, event_({
                                type: "brushstart"
                            })
                        }).tween("brush:brush", function() {
                            var xi = d3_interpolateArray(xExtent, extent1.x),
                                yi = d3_interpolateArray(yExtent, extent1.y);
                            return xExtentDomain = yExtentDomain = null,
                                function(t) {
                                    xExtent = extent1.x = xi(t), yExtent = extent1.y = yi(t), event_({
                                        type: "brush",
                                        mode: "resize"
                                    })
                                }
                        }).each("end.brush", function() {
                            xExtentDomain = extent1.i, yExtentDomain = extent1.j, event_({
                                type: "brush",
                                mode: "resize"
                            }), event_({
                                type: "brushend"
                            })
                        }) : (event_({
                            type: "brushstart"
                        }), event_({
                            type: "brush",
                            mode: "resize"
                        }), event_({
                            type: "brushend"
                        }))
                    })
                }, brush.x = function(z) {
                    return arguments.length ? (x = z, resizes = d3_svg_brushResizes[!x << 1 | !y], brush) : x
                }, brush.y = function(z) {
                    return arguments.length ? (y = z, resizes = d3_svg_brushResizes[!x << 1 | !y], brush) : y
                }, brush.clamp = function(z) {
                    return arguments.length ? (x && y ? (xClamp = !!z[0], yClamp = !!z[1]) : x ? xClamp = !!z : y && (yClamp = !!z), brush) : x && y ? [xClamp, yClamp] : x ? xClamp : y ? yClamp : null
                }, brush.extent = function(z) {
                    var x0, x1, y0, y1, t;
                    return arguments.length ? (x && (x0 = z[0], x1 = z[1], y && (x0 = x0[0], x1 = x1[0]), xExtentDomain = [x0, x1], x.invert && (x0 = x(x0), x1 = x(x1)), x1 < x0 && (t = x0, x0 = x1, x1 = t), x0 == xExtent[0] && x1 == xExtent[1] || (xExtent = [x0, x1])), y && (y0 = z[0], y1 = z[1], x && (y0 = y0[1], y1 = y1[1]), yExtentDomain = [y0, y1], y.invert && (y0 = y(y0), y1 = y(y1)), y1 < y0 && (t = y0, y0 = y1, y1 = t), y0 == yExtent[0] && y1 == yExtent[1] || (yExtent = [y0, y1])), brush) : (x && (xExtentDomain ? (x0 = xExtentDomain[0], x1 = xExtentDomain[1]) : (x0 = xExtent[0], x1 = xExtent[1], x.invert && (x0 = x.invert(x0), x1 = x.invert(x1)), x1 < x0 && (t = x0, x0 = x1, x1 = t))), y && (yExtentDomain ? (y0 = yExtentDomain[0], y1 = yExtentDomain[1]) : (y0 = yExtent[0], y1 = yExtent[1], y.invert && (y0 = y.invert(y0), y1 = y.invert(y1)), y1 < y0 && (t = y0, y0 = y1, y1 = t))), x && y ? [
                        [x0, y0],
                        [x1, y1]
                    ] : x ? [x0, x1] : y && [y0, y1])
                }, brush.clear = function() {
                    return brush.empty() || (xExtent = [0, 0], yExtent = [0, 0], xExtentDomain = yExtentDomain = null), brush
                }, brush.empty = function() {
                    return !!x && xExtent[0] == xExtent[1] || !!y && yExtent[0] == yExtent[1]
                }, d3.rebind(brush, event, "on")
            };
            var d3_svg_brushCursor = {
                    n: "ns-resize",
                    e: "ew-resize",
                    s: "ns-resize",
                    w: "ew-resize",
                    nw: "nwse-resize",
                    ne: "nesw-resize",
                    se: "nwse-resize",
                    sw: "nesw-resize"
                },
                d3_svg_brushResizes = [
                    ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
                    ["e", "w"],
                    ["n", "s"],
                    []
                ],
                d3_time_format = d3_time.format = d3_locale_enUS.timeFormat,
                d3_time_formatUtc = d3_time_format.utc,
                d3_time_formatIso = d3_time_formatUtc("%Y-%m-%dT%H:%M:%S.%LZ");
            d3_time_format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso, d3_time_formatIsoNative.parse = function(string) {
                var date = new Date(string);
                return isNaN(date) ? null : date
            }, d3_time_formatIsoNative.toString = d3_time_formatIso.toString, d3_time.second = d3_time_interval(function(date) {
                return new d3_date(1e3 * Math.floor(date / 1e3))
            }, function(date, offset) {
                date.setTime(date.getTime() + 1e3 * Math.floor(offset))
            }, function(date) {
                return date.getSeconds()
            }), d3_time.seconds = d3_time.second.range, d3_time.seconds.utc = d3_time.second.utc.range, d3_time.minute = d3_time_interval(function(date) {
                return new d3_date(6e4 * Math.floor(date / 6e4))
            }, function(date, offset) {
                date.setTime(date.getTime() + 6e4 * Math.floor(offset))
            }, function(date) {
                return date.getMinutes()
            }), d3_time.minutes = d3_time.minute.range, d3_time.minutes.utc = d3_time.minute.utc.range, d3_time.hour = d3_time_interval(function(date) {
                var timezone = date.getTimezoneOffset() / 60;
                return new d3_date(36e5 * (Math.floor(date / 36e5 - timezone) + timezone))
            }, function(date, offset) {
                date.setTime(date.getTime() + 36e5 * Math.floor(offset))
            }, function(date) {
                return date.getHours()
            }), d3_time.hours = d3_time.hour.range, d3_time.hours.utc = d3_time.hour.utc.range, d3_time.month = d3_time_interval(function(date) {
                return date = d3_time.day(date), date.setDate(1), date
            }, function(date, offset) {
                date.setMonth(date.getMonth() + offset)
            }, function(date) {
                return date.getMonth()
            }), d3_time.months = d3_time.month.range, d3_time.months.utc = d3_time.month.utc.range;
            var d3_time_scaleSteps = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
                d3_time_scaleLocalMethods = [
                    [d3_time.second, 1],
                    [d3_time.second, 5],
                    [d3_time.second, 15],
                    [d3_time.second, 30],
                    [d3_time.minute, 1],
                    [d3_time.minute, 5],
                    [d3_time.minute, 15],
                    [d3_time.minute, 30],
                    [d3_time.hour, 1],
                    [d3_time.hour, 3],
                    [d3_time.hour, 6],
                    [d3_time.hour, 12],
                    [d3_time.day, 1],
                    [d3_time.day, 2],
                    [d3_time.week, 1],
                    [d3_time.month, 1],
                    [d3_time.month, 3],
                    [d3_time.year, 1]
                ],
                d3_time_scaleLocalFormat = d3_time_format.multi([
                    [".%L", function(d) {
                        return d.getMilliseconds()
                    }],
                    [":%S", function(d) {
                        return d.getSeconds()
                    }],
                    ["%I:%M", function(d) {
                        return d.getMinutes()
                    }],
                    ["%I %p", function(d) {
                        return d.getHours()
                    }],
                    ["%a %d", function(d) {
                        return d.getDay() && 1 != d.getDate()
                    }],
                    ["%b %d", function(d) {
                        return 1 != d.getDate()
                    }],
                    ["%B", function(d) {
                        return d.getMonth()
                    }],
                    ["%Y", d3_true]
                ]),
                d3_time_scaleMilliseconds = {
                    range: function(start, stop, step) {
                        return d3.range(Math.ceil(start / step) * step, +stop, step).map(d3_time_scaleDate)
                    },
                    floor: d3_identity,
                    ceil: d3_identity
                };
            d3_time_scaleLocalMethods.year = d3_time.year, d3_time.scale = function() {
                return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat)
            };
            var d3_time_scaleUtcMethods = d3_time_scaleLocalMethods.map(function(m) {
                    return [m[0].utc, m[1]]
                }),
                d3_time_scaleUtcFormat = d3_time_formatUtc.multi([
                    [".%L", function(d) {
                        return d.getUTCMilliseconds()
                    }],
                    [":%S", function(d) {
                        return d.getUTCSeconds()
                    }],
                    ["%I:%M", function(d) {
                        return d.getUTCMinutes()
                    }],
                    ["%I %p", function(d) {
                        return d.getUTCHours()
                    }],
                    ["%a %d", function(d) {
                        return d.getUTCDay() && 1 != d.getUTCDate()
                    }],
                    ["%b %d", function(d) {
                        return 1 != d.getUTCDate()
                    }],
                    ["%B", function(d) {
                        return d.getUTCMonth()
                    }],
                    ["%Y", d3_true]
                ]);
            d3_time_scaleUtcMethods.year = d3_time.year.utc, d3_time.scale.utc = function() {
                return d3_time_scale(d3.scale.linear(), d3_time_scaleUtcMethods, d3_time_scaleUtcFormat)
            }, d3.text = d3_xhrType(function(request) {
                return request.responseText
            }), d3.json = function(url, callback) {
                return d3_xhr(url, "application/json", d3_json, callback)
            }, d3.html = function(url, callback) {
                return d3_xhr(url, "text/html", d3_html, callback)
            }, d3.xml = d3_xhrType(function(request) {
                return request.responseXML
            }), "function" == typeof define && define.amd ? (this.d3 = d3, define(d3)) : "object" == typeof module && module.exports ? module.exports = d3 : this.d3 = d3
        }()
    }, {}],
    2: [function(require, module, exports) {
        "use strict";

        function shuffle(array) {
            for (var counter = array.length, temp = 0, index = 0; counter > 0;) index = Math.floor(Math.random() * counter), counter--, temp = array[counter], array[counter] = array[index], array[index] = temp
        }

        function classifyTwoGaussData(numSamples, noise) {
            function genGauss(cx, cy, label) {
                for (var i = 0; i < numSamples / 2; i++) {
                    var x = normalRandom(cx, variance),
                        y = normalRandom(cy, variance);
                    points.push({
                        x: x,
                        y: y,
                        label: label
                    })
                }
            }
            var points = [],
                varianceScale = d3.scale.linear().domain([0, .5]).range([.5, 4]),
                variance = varianceScale(noise);
            return genGauss(2, 2, 1), genGauss(-2, -2, -1), points
        }

        function regressPlane(numSamples, noise) {
            for (var labelScale = d3.scale.linear().domain([-10, 10]).range([-1, 1]), points = [], i = 0; i < numSamples; i++) {
                var x = randUniform(-6, 6),
                    y = randUniform(-6, 6),
                    noiseX = randUniform(-6, 6) * noise,
                    noiseY = randUniform(-6, 6) * noise,
                    label = function(x, y) {
                        return labelScale(x + y)
                    }(x + noiseX, y + noiseY);
                points.push({
                    x: x,
                    y: y,
                    label: label
                })
            }
            return points
        }

        function regressGaussian(numSamples, noise) {
            for (var points = [], labelScale = d3.scale.linear().domain([0, 2]).range([1, 0]).clamp(!0), gaussians = [
                    [-4, 2.5, 1],
                    [0, 2.5, -1],
                    [4, 2.5, 1],
                    [-4, -2.5, -1],
                    [0, -2.5, 1],
                    [4, -2.5, -1]
                ], i = 0; i < numSamples; i++) {
                var x = randUniform(-6, 6),
                    y = randUniform(-6, 6),
                    noiseX = randUniform(-6, 6) * noise,
                    noiseY = randUniform(-6, 6) * noise,
                    label = function(x, y) {
                        var label = 0;
                        return gaussians.forEach(function(_a) {
                            var cx = _a[0],
                                cy = _a[1],
                                sign = _a[2],
                                newLabel = sign * labelScale(dist({
                                    x: x,
                                    y: y
                                }, {
                                    x: cx,
                                    y: cy
                                }));
                            Math.abs(newLabel) > Math.abs(label) && (label = newLabel)
                        }), label
                    }(x + noiseX, y + noiseY);
                points.push({
                    x: x,
                    y: y,
                    label: label
                })
            }
            return points
        }

        function classifySpiralData(numSamples, noise) {
            function genSpiral(deltaT, label) {
                for (var i = 0; i < n; i++) {
                    var r = i / n * 5,
                        t = 1.75 * i / n * 2 * Math.PI + deltaT,
                        x = r * Math.sin(t) + randUniform(-1, 1) * noise,
                        y = r * Math.cos(t) + randUniform(-1, 1) * noise;
                    points.push({
                        x: x,
                        y: y,
                        label: label
                    })
                }
            }
            var points = [],
                n = numSamples / 2;
            return genSpiral(0, 1), genSpiral(Math.PI, -1), points
        }

        function classifyCircleData(numSamples, noise) {
            // console.log('hi')
            // state.lr_iter = 0;
            var points = [];

points.push({x: -2.717835893494339 - noise, y: 0.6793610085529345, label: 1}),
points.push({x: -2.0025756608302556 - noise, y: -0.7764598781122054, label: 1}),
points.push({x: 1.2605697631874289 + noise, y: 1.0458976448210704, label: -1}),
points.push({x: -2.568929506049188 - noise, y: 1.3030331041149927, label: 1}),
points.push({x: -2.270602886384911 - noise, y: 1.696103804129755, label: 1}),
points.push({x: 0.4428841761287988 + noise, y: -3.9067277248882855, label: -1}),
points.push({x: -2.5015948773601426 - noise, y: 1.8362701766489786, label: 1}),
points.push({x: -2.330151863221954 - noise, y: 0.5295968005263707, label: 1}),
points.push({x: 2.213537711353039 + noise, y: 0.10622312924614075, label: -1}),
points.push({x: 2.2246476075616277 + noise, y: -3.131178556347437, label: -1}),
points.push({x: -0.7415685155965577 - noise, y: 3.5042711192603146, label: 1}),
points.push({x: 0.934302193080736 + noise, y: 1.01212401276388, label: -1}),
points.push({x: -2.0839366412304012 - noise, y: -0.7231575356785352, label: 1}),
points.push({x: -2.8528165357526083 - noise, y: 2.277743746352307, label: 1}),
points.push({x: 0.8703714425371154 + noise, y: 1.14213909231317, label: -1}),
points.push({x: 2.6652808441973175 + noise, y: -1.499740679978164, label: -1}),
points.push({x: -1.147008103324011 - noise, y: 3.1121491784480697, label: 1}),
points.push({x: 2.5868192990813768 + noise, y: -2.3757729401741026, label: -1}),
points.push({x: -2.8784004738595304 - noise, y: 1.4770243521157966, label: 1}),
points.push({x: -0.8677959198389527 - noise, y: -1.0110529899688063, label: 1}),
points.push({x: -1.7589836417118123 - noise, y: -0.21940659318914466, label: 1}),
points.push({x: 2.5485659972780015 + noise, y: -2.122671490779725, label: -1}),
points.push({x: 1.3501341878455395 + noise, y: -3.502953002856569, label: -1}),
points.push({x: 1.3394525649634517 + noise, y: -3.256081109078368, label: -1}),
points.push({x: -2.998388218477527 - noise, y: 1.2783156815611991, label: 1}),
points.push({x: 1.5703488118666078 + noise, y: -3.1749520646753595, label: -1}),
points.push({x: -2.122794047965966 - noise, y: -0.1791718798868415, label: 1}),
points.push({x: -0.6950154023659438 - noise, y: 3.884218615064042, label: 1}),
points.push({x: -2.6642421732719845 - noise, y: 1.9439974190429932, label: 1}),
points.push({x: -0.4107292059512281 - noise, y: 3.505002569928259, label: 1}),
points.push({x: 2.578906600693658 + noise, y: -2.155913453889749, label: -1}),
points.push({x: 2.6017725256967363 + noise, y: -0.2395214626274446, label: -1}),
points.push({x: 0.4855765554512216 + noise, y: 0.9755334524010564, label: -1}),
points.push({x: 1.620317196388419 + noise, y: -3.471619676384854, label: -1}),
points.push({x: -2.5650150317912725 - noise, y: 0.5755380178279407, label: 1}),
points.push({x: -0.03957624387021477 - noise, y: -1.210873365508656, label: 1}),
points.push({x: -1.459975933353292 - noise, y: -1.0329923799436405, label: 1}),
points.push({x: -1.7826178769431 - noise, y: -1.0582442212859733, label: 1}),
points.push({x: -0.0063910086450723325 - noise, y: 3.6142846309958205, label: 1}),
points.push({x: 0.6107465335988917 + noise, y: 0.9470748554316055, label: -1}),
points.push({x: -3.113867547530851 - noise, y: 1.5445673874139447, label: 1}),
points.push({x: 2.705677633402291 + noise, y: -1.8958980011427715, label: -1}),
points.push({x: 2.529619115397467 + noise, y: -1.750911067902624, label: -1}),
points.push({x: 1.7205080921848972 + noise, y: 0.6014389134684253, label: -1}),
points.push({x: 2.025034051353637 + noise, y: -0.328098369799075, label: -1}),
points.push({x: 0.9454991520471547 + noise, y: -3.4065530755818263, label: -1}),
points.push({x: -2.8910961520154546 - noise, y: 1.6469163448206863, label: 1}),
points.push({x: 2.4474158496753415 + noise, y: -0.570775344749403, label: -1}),
points.push({x: 0.44018725848007784 + noise, y: 1.2583085822944136, label: -1}),
points.push({x: 2.3578626209991933 + noise, y: 0.37952520933453554, label: -1}),
points.push({x: 2.305287296588136 + noise, y: -1.3523455959069988, label: -1}),
points.push({x: -2.3718952252880245 - noise, y: 0.2540079910444923, label: 1}),
points.push({x: -1.3897222631802355 - noise, y: -1.258967648201369, label: 1}),
points.push({x: 2.1078203674554112 + noise, y: -2.9400776134322326, label: -1}),
points.push({x: 2.5672512309425377 + noise, y: -0.931511238718386, label: -1}),
points.push({x: -2.1375714939983066 - noise, y: 2.794453234058449, label: 1}),
points.push({x: -0.9994610567775488 - noise, y: -1.149826801806625, label: 1}),
points.push({x: 0.76210430597206 + noise, y: 0.9834249491123324, label: -1}),
points.push({x: -0.7776520784930578 - noise, y: 4.1149852157058895, label: 1}),
points.push({x: -0.353388277001343 - noise, y: -1.4081025494488113, label: 1}),
points.push({x: 0.9009064185658802 + noise, y: -3.5025716943059186, label: -1}),
points.push({x: 0.8790969921498528 + noise, y: -4.248785250853195, label: -1}),
points.push({x: 2.834290242153208 + noise, y: -0.6773777546863811, label: -1}),
points.push({x: -0.02895203726210091 - noise, y: 3.5570091502314423, label: 1}),
points.push({x: -0.6726983784145278 - noise, y: 3.713458077324815, label: 1}),
points.push({x: -2.2946962578019665 - noise, y: 0.9623315035843127, label: 1}),
points.push({x: -1.863557466465306 - noise, y: 2.792146626757914, label: 1}),
points.push({x: 1.827620864188383 + noise, y: -3.146614604919824, label: -1}),
points.push({x: 0.9106326766024155 + noise, y: 1.6069751824711314, label: -1}),
points.push({x: 2.4986568505695774 + noise, y: 0.12949305293031732, label: -1}),
points.push({x: -0.26730788088522667 - noise, y: -1.205590370248826, label: 1}),
points.push({x: -2.498303344433606 - noise, y: 1.3344598403007284, label: 1}),
points.push({x: -0.9859628310147427 - noise, y: 3.057031649768471, label: 1}),
points.push({x: 1.329902276945841 + noise, y: 0.8261796714411879, label: -1}),
points.push({x: 0.30026706132425485 + noise, y: -3.569524692879105, label: -1}),
points.push({x: -2.3015390566521345 - noise, y: 2.578789613141873, label: 1}),
points.push({x: 1.8709094482262436 + noise, y: 0.7005037664902201, label: -1}),
points.push({x: 2.6457300611721415 + noise, y: -2.425440866187578, label: -1}),
points.push({x: -2.182161422047994 - noise, y: -0.6543242980905074, label: 1}),
points.push({x: 0.903254228522091 + noise, y: -3.738092107397064, label: -1}),
points.push({x: 1.6008172396371303 + noise, y: -3.2452624729025747, label: -1}),
points.push({x: -0.6476638289513104 - noise, y: -1.2100425673015185, label: 1}),
points.push({x: -1.9828161461009488 - noise, y: 2.9197086781500277, label: 1}),
points.push({x: -2.759334618718058 - noise, y: 0.7696706532935776, label: 1}),
points.push({x: -2.5751009200744224 - noise, y: 1.6626933401609023, label: 1}),
points.push({x: 3.2153091597614525 + noise, y: -1.368470502749851, label: -1}),
points.push({x: -2.2754802700838868 - noise, y: 0.42253538652727796, label: 1}),
points.push({x: -2.894718819023576 - noise, y: 1.4631522384301066, label: 1}),
points.push({x: -2.3942266106035563 - noise, y: 2.942466273998301, label: 1}),
points.push({x: -2.3597155702364154 - noise, y: 1.2364964850094777, label: 1}),
points.push({x: -0.8619147842448072 - noise, y: 3.152143289401243, label: 1}),
points.push({x: 2.5679011437621266 + noise, y: 0.07815030521334698, label: -1}),
points.push({x: -1.5585362847484685 - noise, y: 3.6228480325523322, label: 1}),
points.push({x: -2.2329166647636507 - noise, y: -0.6233110354243981, label: 1}),
points.push({x: -0.2731017075516541 - noise, y: -1.3580082036894057, label: 1}),
points.push({x: -0.4781390413985451 - noise, y: -1.305693088622172, label: 1}),
points.push({x: 2.359601929920219 + noise, y: -2.430664435412014, label: -1}),
points.push({x: 2.0630126331781993 + noise, y: -0.3937883060575643, label: -1}),
points.push({x: -1.7901443397126593 - noise, y: -0.3935866480543121, label: 1}),
points.push({x: 0.9482707644288992 + noise, y: 0.9090318588982524, label: -1}),
points.push({x: -1.1433045993548665 - noise, y: 3.111337871342845, label: 1}),
points.push({x: -2.0898117037306303 - noise, y: 2.410394433635401, label: 1}),
points.push({x: 1.318717891036563 + noise, y: -3.2871385464785274, label: -1}),
points.push({x: -1.0837510824272951 - noise, y: -0.7759536147862817, label: 1}),
points.push({x: 2.685806352629474 + noise, y: -1.0695984302841914, label: -1}),
points.push({x: -2.6928615859081817 - noise, y: 1.3340538265678492, label: 1}),
points.push({x: -2.649706340336663 - noise, y: 2.2303142906955555, label: 1}),
points.push({x: -2.6375589115090947 - noise, y: 0.3209555538663683, label: 1}),
points.push({x: -0.7346260030476295 - noise, y: 3.89346947511081, label: 1}),
points.push({x: -2.42417820501776 - noise, y: 0.7649583168967733, label: 1}),
points.push({x: -0.7008726348089543 - noise, y: -1.0802855176420891, label: 1}),
points.push({x: -0.3491363431388116 - noise, y: -1.2568494543447684, label: 1}),
points.push({x: 1.8516766580167963 + noise, y: 0.24434407871756103, label: -1}),
points.push({x: 2.356710102702996 + noise, y: -2.25954235705039, label: -1}),
points.push({x: -2.6855954583467803 - noise, y: 2.4944104537407057, label: 1}),
points.push({x: 2.1684918727788336 + noise, y: -0.7439150005837414, label: -1}),
points.push({x: -0.9335914608244527 - noise, y: -0.679082202208783, label: 1}),
points.push({x: -1.1282308435392019 - noise, y: 3.693884882642762, label: 1}),
points.push({x: 1.5800357609867945 + noise, y: -3.0397095698565275, label: -1}),
points.push({x: 1.033126269584137 + noise, y: 0.9359563676278917, label: -1}),
points.push({x: 1.872794212999521 + noise, y: 1.0115209086189823, label: -1}),
points.push({x: 0.5235449122291833 + noise, y: -3.3783557249585123, label: -1}),
points.push({x: 0.7008785749342308 + noise, y: 0.9594224070734308, label: -1}),
points.push({x: 2.553663974985213 + noise, y: -0.10771629916989434, label: -1}),
points.push({x: 2.7411100225680163 + noise, y: -1.7184897675482067, label: -1}),
points.push({x: 2.0343480716575852 + noise, y: -2.708724275370595, label: -1}),
points.push({x: -1.5571341099841778 - noise, y: -0.9569209611232933, label: 1}),
points.push({x: -2.0968912603614944 - noise, y: -0.3002820219513763, label: 1}),
points.push({x: -0.730628023393316 - noise, y: -1.2603402702853281, label: 1}),
points.push({x: 0.5340990535248212 + noise, y: 1.6742944306376044, label: -1}),
points.push({x: 2.4353923087262066 + noise, y: -2.2521686832796735, label: -1}),
points.push({x: -0.4951985004108488 - noise, y: -0.729087176112734, label: 1}),
points.push({x: 2.697340999301913 + noise, y: -0.3155915671715026, label: -1}),
points.push({x: 2.6521161619740408 + noise, y: -1.3799617068714918, label: -1}),
points.push({x: 0.8016750570795748 + noise, y: -3.7029324960425725, label: -1}),
points.push({x: -2.902350613309882 - noise, y: 0.16046671198639534, label: 1}),
points.push({x: -1.7885697248681875 - noise, y: 2.8847324649501402, label: 1}),
points.push({x: -1.4751061664049347 - noise, y: 3.4142846215369556, label: 1}),
points.push({x: 2.0888346508237094 + noise, y: 0.6295951027167603, label: -1}),
points.push({x: -1.5390777424462194 - noise, y: 2.9919434674688086, label: 1}),
points.push({x: 0.8304001118980417 + noise, y: 1.3620703160533432, label: -1}),
points.push({x: 2.1076008673731175 + noise, y: -2.6320189409595427, label: -1}),
points.push({x: -2.8762322285242092 - noise, y: 0.9143476976637405, label: 1}),
points.push({x: 0.3589801618753179 + noise, y: 1.2235177121091534, label: -1}),
points.push({x: -0.4940392357287259 - noise, y: -1.0038621010673856, label: 1}),
points.push({x: 1.1229934118941256 + noise, y: -3.3223373231734046, label: -1}),
points.push({x: 1.3365490905708357 + noise, y: 0.7410339357717708, label: -1}),
points.push({x: 1.8354193619448524 + noise, y: 0.5026708223105636, label: -1}),
points.push({x: 2.718680142657365 + noise, y: -1.2659346176335473, label: -1}),
points.push({x: -0.012054114845436309 - noise, y: 3.7992457338282373, label: 1}),
points.push({x: -3.032053951860437 - noise, y: 0.3803212691710048, label: 1}),
points.push({x: 1.114668177329429 + noise, y: 1.1018873624037109, label: -1}),
points.push({x: -2.374125805765452 - noise, y: 2.577260760939388, label: 1}),
points.push({x: -2.4025184090990277 - noise, y: 1.9925005915231553, label: 1}),
points.push({x: -1.0969861251226607 - noise, y: 3.0431663584149904, label: 1}),
points.push({x: 2.4373081838238693 + noise, y: -1.7793888239691904, label: -1}),
points.push({x: 2.414593845611318 + noise, y: -0.6335066629431028, label: -1}),
points.push({x: 0.12290616957133377 + noise, y: 0.7436758886663175, label: -1}),
points.push({x: -2.7140378394308975 - noise, y: 1.7300408024972684, label: 1}),
points.push({x: 2.432773932914067 + noise, y: -2.271922352203361, label: -1}),
points.push({x: -1.753366456813175 - noise, y: -0.46725570847050424, label: 1}),
points.push({x: 2.703247300810249 + noise, y: -1.5681088934930953, label: -1}),
points.push({x: 0.9329542112336406 + noise, y: 1.387487453946818, label: -1}),
points.push({x: -2.350980683560984 - noise, y: -0.25749919862715076, label: 1}),
points.push({x: 1.8387052373191828 + noise, y: -0.18205302519419486, label: -1}),
points.push({x: 2.192531994043116 + noise, y: 0.7509498665446229, label: -1}),
points.push({x: 0.9347932451321164 + noise, y: 1.1304461649366861, label: -1}),
points.push({x: -0.4481758551592373 - noise, y: -1.493604284214328, label: 1}),
points.push({x: 2.6506791700072787 + noise, y: 0.2598239003357525, label: -1}),
points.push({x: -0.4837435351770224 - noise, y: 4.396876304605113, label: 1}),
points.push({x: -2.6861383109374612 - noise, y: 1.5310130579985914, label: 1}),
points.push({x: 1.4357888060935096 + noise, y: -3.638173831524141, label: -1}),
points.push({x: -2.2799772528992794 - noise, y: 0.11093029172240809, label: 1}),
points.push({x: 2.5074984951495582 + noise, y: -0.3246237440748867, label: -1}),
points.push({x: -2.0013629328184592 - noise, y: -0.6139231414423276, label: 1}),
points.push({x: -2.9883132223545816 - noise, y: 0.9208951171502733, label: 1}),
points.push({x: 1.452676080486036 + noise, y: -3.846851795839017, label: -1}),
points.push({x: -2.1215585709864007 - noise, y: 0.6712563554792417, label: 1}),
points.push({x: -2.421553486436626 - noise, y: 2.618298719018602, label: 1}),
points.push({x: 2.1649169298468043 + noise, y: 0.12598502378608517, label: -1}),
points.push({x: 2.096317932113875 + noise, y: -2.974937206560519, label: -1}),
points.push({x: 1.1626855473307327 + noise, y: -3.611991741390597, label: -1}),
points.push({x: -0.5889598185224101 - noise, y: 3.6804690431500036, label: 1}),
points.push({x: -2.7964229143440953 - noise, y: 0.48814363461182453, label: 1}),
points.push({x: 0.0698015672586913 + noise, y: -3.6894705097537193, label: -1}),
points.push({x: 2.263884734272171 + noise, y: -2.792874862433873, label: -1}),
points.push({x: -2.1055240403942315 - noise, y: 1.7996187499638172, label: 1}),
points.push({x: 2.452097505628506 + noise, y: -2.998549361725964, label: -1}),
points.push({x: -2.550214662670338 - noise, y: 1.1625285801183705, label: 1}),
points.push({x: 2.318232969547698 + noise, y: -2.520540198719894, label: -1}),
points.push({x: -2.60314101539995 - noise, y: 0.7389373388724324, label: 1}),
points.push({x: -0.7509004504010787 - noise, y: -1.2211299676858136, label: 1}),
points.push({x: 1.5708028678519623 + noise, y: 0.6171082788895208, label: -1}),
points.push({x: -1.1097198256588752 - noise, y: -0.8873468825484077, label: 1}),
points.push({x: 1.7619872579964682 + noise, y: -3.1598996224476084, label: -1}),
points.push({x: 0.48741766950630805 + noise, y: 1.5195493259285597, label: -1}),
points.push({x: 2.2860590634348394 + noise, y: -1.9538102221406346, label: -1}),
points.push({x: -1.2853090821878264 - noise, y: 3.4776733678417986, label: 1}),
points.push({x: 2.355561815069757 + noise, y: -2.061630645113948, label: -1}),
points.push({x: -0.06881151445833164 - noise, y: 3.575493958460944, label: 1}),
points.push({x: -1.888037104217837 - noise, y: 2.3985492607241343, label: 1}),
points.push({x: -2.655692934648788 - noise, y: 1.71557735708596, label: 1}),
points.push({x: 2.624438667886823 + noise, y: -0.45792310107331247, label: -1}),
points.push({x: 1.854267558549543 + noise, y: 0.07907581142523268, label: -1}),
points.push({x: 2.3213276658541218 + noise, y: -0.10696635485443987, label: -1}),
points.push({x: 2.745584480726928 + noise, y: -1.710269012859103, label: -1}),
points.push({x: -0.0712617816418619 - noise, y: 3.749934520345652, label: 1}),
points.push({x: 0.11463689662493518 + noise, y: -3.60107422436533, label: -1}),
points.push({x: -2.237386070712279 - noise, y: 0.3575930800531485, label: 1}),
points.push({x: 1.2268104662722987 + noise, y: 1.1092227889389914, label: -1}),
points.push({x: -2.624697844350373 - noise, y: 2.1434683067151066, label: 1}),
points.push({x: 0.4883558476641737 + noise, y: -3.7822078275343984, label: -1}),
points.push({x: 0.302830362550608 + noise, y: -4.21797263754794, label: -1}),
points.push({x: 2.8418136908650427 + noise, y: -1.719272711473141, label: -1}),
points.push({x: -1.6932598229929476 - noise, y: -0.9049053449496425, label: 1}),
points.push({x: 2.4110065851996403 + noise, y: -2.58454577962155, label: -1}),
points.push({x: -3.1292392711691432 - noise, y: 0.10465507554354464, label: 1}),
points.push({x: 1.1883288319221876 + noise, y: -3.436277286035127, label: -1}),
points.push({x: -1.9302970612705348 - noise, y: 3.1473437369575374, label: 1}),
points.push({x: -0.05552000023091433 - noise, y: 3.8373893523193847, label: 1}),
points.push({x: -2.213859883403356 - noise, y: -0.2809886987751162, label: 1}),
points.push({x: 0.4231560219611501 + noise, y: 0.9974824865464593, label: -1}),
points.push({x: 2.7332667742376247 + noise, y: -1.2960555247563033, label: -1}),
points.push({x: -2.2855940763118876 - noise, y: -0.0809670563060226, label: 1}),
points.push({x: 2.4548799817800466 + noise, y: -2.098906157582724, label: -1}),
points.push({x: -1.5360545910906862 - noise, y: -1.0586183593166278, label: 1}),
points.push({x: 1.4492552216872536 + noise, y: -3.2980549567958297, label: -1}),
points.push({x: 0.29812737679036055 + noise, y: -4.140712584756083, label: -1}),
points.push({x: -1.8423162009755345 - noise, y: 2.9422791248401476, label: 1}),
points.push({x: -1.2540315350699642 - noise, y: 3.3776803834259663, label: 1}),
points.push({x: 0.6024251082982855 + noise, y: -3.6668594006359907, label: -1}),
points.push({x: -2.4100284289768377 - noise, y: 3.153656143587366, label: 1}),
points.push({x: 2.4071077716684606 + noise, y: -1.9331827888832867, label: -1}),
points.push({x: 2.545623250801896 + noise, y: -1.6997537944929542, label: -1}),
points.push({x: -1.2316448752106524 - noise, y: 3.5152991121388566, label: 1}),
points.push({x: 1.1447541103640393 + noise, y: 1.2288964589068012, label: -1}),
points.push({x: 1.6300111419299077 + noise, y: -3.280361193419007, label: -1}),
points.push({x: 2.2144073814114598 + noise, y: -2.7915168449133825, label: -1}),
points.push({x: 1.741764282945776 + noise, y: 0.716151381796484, label: -1}),
points.push({x: 2.584934801845699 + noise, y: -0.4617926598386114, label: -1}),
points.push({x: -1.009437911641195 - noise, y: -1.281563505634356, label: 1}),
points.push({x: -2.2341929394003626 - noise, y: 1.7966322608299223, label: 1}),
points.push({x: 2.94429370319911 + noise, y: -0.7751800733034873, label: -1}),
points.push({x: 0.04396728231852283 + noise, y: 1.5080467962694248, label: -1}),
points.push({x: 1.511277836871522 + noise, y: -3.601524555444186, label: -1}),
points.push({x: -1.5936721603442507 - noise, y: 3.523561811455531, label: 1}),
points.push({x: -1.4301284921136954 - noise, y: -0.7139026560764259, label: 1}),
points.push({x: 1.5078872546350166 + noise, y: 0.4038862638181287, label: -1}),
points.push({x: 2.2830235983573757 + noise, y: -2.6698628730744787, label: -1}),
points.push({x: 1.141833418913716 + noise, y: -3.534713771642897, label: -1}),
points.push({x: 2.31153512617248 + noise, y: -1.5036639589034162, label: -1}),
points.push({x: 0.7930014449666454 + noise, y: 0.9984399344555597, label: -1}),
points.push({x: -2.133956374401404 - noise, y: 2.830553038963384, label: 1}),
points.push({x: -2.5419546529030743 - noise, y: 1.756811334089956, label: 1}),
points.push({x: 1.7855431618709825 + noise, y: 0.3775513743392528, label: -1}),
points.push({x: 1.2496515034524522 + noise, y: -3.61494166755954, label: -1}),
points.push({x: 2.494095987642121 + noise, y: -0.6561789952747799, label: -1}),
points.push({x: -2.4706384450766503 - noise, y: 2.7361898523968753, label: 1}),
points.push({x: 0.99530344900322 + noise, y: -3.9953414791058472, label: -1}),
points.push({x: 1.6423078459022569 + noise, y: 0.8817193140291141, label: -1}),
points.push({x: -1.4458442971552867 - noise, y: -0.9036159267450711, label: 1}),
points.push({x: -0.675298309924629 - noise, y: -0.8009280139118677, label: 1}),
points.push({x: -0.1307759125127804 - noise, y: -1.3972949916010728, label: 1}),
points.push({x: -2.1724261559379694 - noise, y: 2.4380037963785406, label: 1}),
points.push({x: -3.0301757418373185 - noise, y: -0.05613139501335074, label: 1}),
points.push({x: 1.2698194368721236 + noise, y: 1.2639173654508489, label: -1}),
points.push({x: 2.3092312380669213 + noise, y: 0.6932869760752849, label: -1}),
points.push({x: 1.508197474828362 + noise, y: -3.4031870404877793, label: -1}),
points.push({x: -2.223984637645856 - noise, y: -0.9752089176334047, label: 1}),
points.push({x: -0.8960548947689856 - noise, y: 3.3757400103199693, label: 1}),
points.push({x: -1.6879441985156765 - noise, y: 3.2402795631690253, label: 1}),
points.push({x: 0.5282536325342755 + noise, y: -3.6982857231300157, label: -1}),
points.push({x: -1.5656539231364017 - noise, y: 3.1005177839870184, label: 1}),
points.push({x: -1.1715302401075987 - noise, y: -1.0528879963506719, label: 1}),
points.push({x: 2.8592120295683343 + noise, y: -2.4260474342934755, label: -1}),
points.push({x: -2.1977928180739728 - noise, y: 0.11441934583356184, label: 1}),
points.push({x: -2.3569595232747393 - noise, y: 2.5168873649410255, label: 1}),
points.push({x: 1.964949523096605 + noise, y: -3.3108893959920254, label: -1}),
points.push({x: -1.812798093076864 - noise, y: 2.960577394399894, label: 1}),
points.push({x: 2.6235858300049006 + noise, y: -0.7863371260473055, label: -1}),
points.push({x: 1.2938945593806481 + noise, y: 0.7098721965355509, label: -1}),
points.push({x: -1.0133105775192217 - noise, y: -0.8705594922460475, label: 1}),
points.push({x: -0.8510029404821573 - noise, y: 3.573688045781485, label: 1}),
points.push({x: -1.4057618612620275 - noise, y: -0.8907098511435746, label: 1}),
points.push({x: -0.8426327453397771 - noise, y: 3.294176954534472, label: 1}),
points.push({x: 2.2949841542633416 + noise, y: 0.21815437229061818, label: -1}),
points.push({x: -1.919390352513409 - noise, y: -0.08783059329234524, label: 1}),
points.push({x: 2.347836965953938 + noise, y: -2.078371734274718, label: -1}),
points.push({x: 2.3781640679457445 + noise, y: -1.1400343437416685, label: -1}),
points.push({x: 2.0047220333928424 + noise, y: -1.2769894466119114, label: -1}),
points.push({x: -2.7504997471435866 - noise, y: 2.292660484192841, label: 1}),
points.push({x: -1.463129347902804 - noise, y: 3.4597453566827, label: 1}),
points.push({x: -2.7820769325267394 - noise, y: 0.253560604420727, label: 1}),
points.push({x: 0.5906909597410415 + noise, y: 1.6438700737392897, label: -1}),
points.push({x: -1.9904715999050417 - noise, y: -0.39806607018651047, label: 1}),
points.push({x: -2.0374228816770796 - noise, y: 2.5778821384858093, label: 1}),
points.push({x: -1.9573778533077693 - noise, y: -0.7882243058017496, label: 1}),
points.push({x: 1.2986453274833423 + noise, y: -3.0090552847647456, label: -1}),
points.push({x: 2.667821411223028 + noise, y: 0.2317409067300455, label: -1}),
points.push({x: -1.0107773780231675 - noise, y: -0.9895456553950488, label: 1})

            return points
        }

        function classifyXORData(numSamples, noise) {
            for (var points = [], i = 0; i < numSamples; i++) {
                var x = randUniform(-5, 5);
                x += x > 0 ? .3 : -.3;
                var y = randUniform(-5, 5);
                y += y > 0 ? .3 : -.3;
                var noiseX = randUniform(-5, 5) * noise,
                    noiseY = randUniform(-5, 5) * noise,
                    label = function(p) {
                        return p.x * p.y >= 0 ? 1 : -1
                    }({
                        x: x + noiseX,
                        y: y + noiseY
                    });
                points.push({
                    x: x,
                    y: y,
                    label: label
                })
            }
            return points
        }

        function randUniform(a, b) {
            return Math.random() * (b - a) + a
        }

        function normalRandom(mean, variance) {
            void 0 === mean && (mean = 0), void 0 === variance && (variance = 1);
            var v1, v2, s;
            do {
                v1 = 2 * Math.random() - 1, v2 = 2 * Math.random() - 1, s = v1 * v1 + v2 * v2
            } while (s > 1);
            var result = Math.sqrt(-2 * Math.log(s) / s) * v1;
            return mean + Math.sqrt(variance) * result
        }

        function dist(a, b) {
            var dx = a.x - b.x,
                dy = a.y - b.y;
            return Math.sqrt(dx * dx + dy * dy)
        }
        exports.__esModule = !0;
        var d3 = require("d3");
        exports.shuffle = shuffle, exports.classifyTwoGaussData = classifyTwoGaussData, exports.regressPlane = regressPlane, exports.regressGaussian = regressGaussian, exports.classifySpiralData = classifySpiralData, exports.classifyCircleData = classifyCircleData, exports.classifyXORData = classifyXORData
    }, {
        d3: 1
    }],
    3: [function(require, module, exports) {
        "use strict";

        function reduceMatrix(matrix, factor) {
            if (matrix.length !== matrix[0].length) throw new Error("The provided matrix must be a square matrix");
            if (matrix.length % factor != 0) throw new Error("The width/height of the matrix must be divisible by the reduction factor");
            for (var result = new Array(matrix.length / factor), i = 0; i < matrix.length; i += factor) {
                result[i / factor] = new Array(matrix.length / factor);
                for (var j = 0; j < matrix.length; j += factor) {
                    for (var avg = 0, k = 0; k < factor; k++)
                        for (var l = 0; l < factor; l++) avg += matrix[i + k][j + l];
                    avg /= factor * factor, result[i / factor][j / factor] = avg
                }
            }
            return result
        }
        exports.__esModule = !0;
        var d3 = require("d3"),
            NUM_SHADES = 50,
            HeatMap = function() {
                function HeatMap(width, height, numSamples, xDomain, yDomain, container, userSettings) {
                    this.settings = {
                        showAxes: !1,
                        noSvg: !1
                    }, this.numSamples = numSamples;
                    var padding = userSettings.showAxes ? 20 : 0;
                    if (null != userSettings)
                        for (var prop in userSettings) this.settings[prop] = userSettings[prop];
                    this.xScale = d3.scale.linear().domain(xDomain).range([0, width - 2 * padding]), this.yScale = d3.scale.linear().domain(yDomain).range([height - 2 * padding, 0]);
                    var tmpScale = d3.scale.linear().domain([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]).range([
                        "#bd4e47", "#E09F8B", "#F2CEB9", "#F9EEE7", "#F6F6F6", "#EBF1F5", "#C6DDEA", "#92BAD6", "#548bc4"]).clamp(!0),
                        colors = d3.range(0, 1 + 1e-9, 1 / NUM_SHADES).map(function(a) {
                            return tmpScale(a)
                        });
                    // console.log(d3.scale.quantize().domain([-10, 10]));
                    if (this.color = d3.scale.quantize().domain([-2, 2]).range(colors), container = container.append("div").style({
                            width: width + "px",
                            height: height + "px",
                            position: "relative",
                            top: "-" + padding + "px",
                            left: "-" + padding + "px"
                        }), this.canvas = container.append("canvas").attr("width", numSamples).attr("height", numSamples).style("width", width - 2 * padding + "px").style("height", height - 2 * padding + "px").style("position", "absolute").style("top", padding + "px").style("left", padding + "px"), this.settings.noSvg || (this.svg = container.append("svg").attr({
                            width: width,
                            height: height
                        }).style({
                            position: "absolute",
                            left: "0",
                            top: "0"
                        }).append("g").attr("transform", "translate(" + padding + "," + padding + ")"), this.svg.append("g").attr("class", "train"), this.svg.append("g").append("rect").attr("x", 0).attr("y", 150).attr("width", 400).attr("height", 400).attr("fill", "none").attr("stroke", "#A1A1A1").attr("stroke-dasharray", "2.5").attr("stroke-opacity", "0.4"), this.svg.append("g").append("rect").attr("x", 150).attr("y", 0).attr("width", 400).attr("height", 400).attr("fill", "none").attr("stroke", "#A1A1A1").attr("stroke-dasharray", "2.5").attr("stroke-opacity", "0.4"), this.svg.append("g").append("rect").attr("x", 150).attr("y", 0).attr("width", 400).attr("height", 400).attr("fill", "none").attr("stroke", "#A1A1A1").attr("stroke-dasharray", "2.5").attr("stroke-opacity", "0.4"), this.svg.append("g").append("rect").attr("x", 100).attr("y", 0).attr("width", 100).attr("height", 300).attr("fill", "none").attr("stroke", "#C3C3C1").attr("stroke-dasharray", "2.5").attr("stroke-opacity", "0.4"), this.svg.append("g").append("rect").attr("x", 50).attr("y", 0).attr("width", 200).attr("height", 300).attr("fill", "none").attr("stroke", "#C3C3C1").attr("stroke-dasharray", "2.5").attr("stroke-opacity", "0.4"), this.svg.append("g").append("rect").attr("x", 0).attr("y", 0).attr("width", 300).attr("height", 300).attr("fill", "none").attr("stroke", "#C3C3C1").attr("stroke-dasharray", "2.5").attr("stroke-opacity", "0.4"), this.svg.append("g").append("rect").attr("x", 0).attr("y", 100).attr("width", 300).attr("height", 100).attr("fill", "none").attr("stroke", "#C3C3C1").attr("stroke-dasharray", "2.5").attr("stroke-opacity", "0.4"), this.svg.append("g").append("rect").attr("x", 0).attr("y", 50).attr("width", 300).attr("height", 200).attr("fill", "none").attr("stroke", "#C3C3C1").attr("stroke-dasharray", "2.5").attr("stroke-opacity", "0.4")), this.settings.showAxes) {
                        var xAxis = d3.svg.axis().scale(this.xScale).orient("bottom"),
                            yAxis = d3.svg.axis().scale(this.yScale).orient("right");
                        this.svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + (height - 2 * padding) + ")").call(xAxis), this.svg.append("g").attr("class", "y axis").attr("transform", "translate(" + (width - 2 * padding) + ",0)").call(yAxis)
                    }
                }
                return HeatMap.prototype.updateTestPoints = function(points) {
                    if (this.settings.noSvg) throw Error("Can't add points since noSvg=true");
                    this.updateCircles(this.svg.select("g.test"), points)
                }, HeatMap.prototype.updatePoints = function(points) {
                    if (this.settings.noSvg) throw Error("Can't add points since noSvg=true");
                    this.updateCircles(this.svg.select("g.train"), points)
                }, HeatMap.prototype.updateBackground = function(data, discretize) {
                    var dx = data[0].length,
                        dy = data.length;
                    if (dx !== this.numSamples || dy !== this.numSamples) throw new Error("The provided data matrix must be of size numSamples X numSamples");
                    for (var context = this.canvas.node().getContext("2d"), image = context.createImageData(dx, dy), y = 0, p = -1; y < dy; ++y)
                        for (var x = 0; x < dx; ++x) {
                            var value = data[x][y];
                            discretize && (value = value >= 0 ? 1 : -1);
                            var c = d3.rgb(this.color(value));
                            image.data[++p] = c.r, image.data[++p] = c.g, image.data[++p] = c.b, image.data[++p] = 1600
                        }
                    context.putImageData(image, 0, 0);
                }, HeatMap.prototype.updateCircles = function(container, points) {
                    var _this = this,
                        xDomain = this.xScale.domain(),
                        yDomain = this.yScale.domain();
                    points = points.filter(function(p) {
                        return p.x >= xDomain[0] && p.x <= xDomain[1] && p.y >= yDomain[0] && p.y <= yDomain[1]
                    });
                    var selection = container.selectAll("circle").data(points);
                    selection.enter().append("circle").attr("r", 4), selection.attr({
                        cx: function(d) {
                            return _this.xScale(d.x)
                        },
                        cy: function(d) {
                            return _this.yScale(d.y)
                        }
                    }).style("fill", function(d) {
                        var colors = ['#B8371E', '#2B63BA']
                        return colors[(d.label + 1)/2]
                    }), selection.exit().remove()
                }, HeatMap
            }();
        exports.HeatMap = HeatMap, exports.reduceMatrix = reduceMatrix
    }, {
        d3: 1
    }],
    4: [function(require, module, exports) {
        "use strict";
        exports.__esModule = !0;
        var utils_1 = require("./utils");
        exports.Utils = utils_1.Utils;
        var linalg_1 = require("./linalg");
        exports.LinAlg = linalg_1.LinAlg;
        var matrix_1 = require("./matrix");
        exports.Matrix = matrix_1.Matrix;
        var vector_1 = require("./vector");
        exports.Vector = vector_1.Vector
    }, {
        "./linalg": 5,
        "./matrix": 8,
        "./utils": 12,
        "./vector": 13
    }],
    5: [function(require, module, exports) {
        "use strict";
        exports.__esModule = !0;
        var matrix_1 = require("./matrix"),
            vector_1 = require("./vector"),
            LinAlg = function() {
                function LinAlg() {}
                return LinAlg.dot = function(op1, op2) {
                    op1 instanceof vector_1.Vector && (op1 = op1.toMatrix(!1)), op2 instanceof vector_1.Vector && (op2 = op2.toMatrix());
                    var dim1, dim2, dim2p, dim3;
                    if (dim1 = op1.rows, dim2 = op1.cols, dim2p = op2.rows, dim3 = op2.cols, dim2 !== dim2p) throw "size mismatch";
                    for (var ret = new matrix_1.Matrix(dim1, dim3), i = 0; i < dim1; i++)
                        for (var j = 0; j < dim3; j++) {
                            for (var k = 0; k < dim2; k++) ret.data[i][j] += op1.data[i][k] * op2.data[k][j];
                            ret.data[i][j] = ret.data[i][j]
                        }
                    return ret
                }, LinAlg
            }();
        exports.LinAlg = LinAlg
    }, {
        "./matrix": 8,
        "./vector": 13
    }],
    6: [function(require, module, exports) {
        "use strict";
        exports.__esModule = !0;
        var d3 = require("d3"),
            AppendingLineChart = function() {
                function AppendingLineChart(container, lineColors) {
                    this.data = [], this.minY = 0, this.maxY = .1, this.lineColors = lineColors, this.numLines = lineColors.length;
                    var node = container.node(),
                        totalWidth = node.offsetWidth,
                        totalHeight = node.offsetHeight - 17,
                        margin = {
                            top: 2,
                            right: 0,
                            bottom: 2,
                            left: 2
                        },
                        width = totalWidth - margin.left - margin.right,
                        height = totalHeight - margin.top - margin.bottom;
                    this.height = height, this.margin = margin, this.xScale = d3.scale.linear().domain([0, 0]).range([0, width]),
                    this.yScale = d3.scale.linear().domain([0, .1]).range([height, 0]),
                    this.yAxis = d3.svg.axis().scale(this.yScale).ticks(6).orient("left"),
                    this.xAxis = d3.svg.axis().scale(this.xScale).ticks(5).tickFormat(d3.format("d")),
                    this.svg = container.append("svg").attr("width", width + margin.left + margin.right).attr("height", 20 + height + margin.top + margin.bottom),
                    this.svg.append("g").append("rect").attr("x", 0).attr("y", -160).attr("width", 373).attr("height", 160).attr("fill", "#F2F2F0").attr("stroke", "none"),
                    this.svg.append("g").append("rect").attr("x", 208).attr("y", 7).attr("width", 56).attr("height", 36).attr("fill", "none").attr("stroke", "#DADADA"),
                    this.svg.append("g").append("rect").attr("x", 219).attr("y", 35).attr("width", 18).attr("height", 1).attr("fill", "#DC8A46").attr("stroke", "#DC8A46"),
                    this.svg.append("g").append("rect").attr("x", 219).attr("y", 25).attr("width", 18).attr("height", 1).attr("fill", "#447D5A").attr("stroke", "#447D5A"),
                    this.svg.append("g").append("text").attr("x", 246).attr("y", 39).attr("font-size", 12).text("z"),
                    this.svg.append("g").append("text").attr("x", 246).attr("y", 29).attr("font-size", 12).text("z"),
                    this.svg.append("g").append("text").attr("x", 252).attr("y", 40).attr("font-size", 8).text("2"),
                    this.svg.append("g").append("text").attr("x", 252).attr("y", 30).attr("font-size", 8).text("1"),
                    this.svg.append("g").append("text").attr("x", 213).attr("y", 17).attr("font-size", 11).text("(features)"),
                    this.svg.append("g").attr("class", "xaxis").attr("transform", "translate(7," + (height + 2) + ")").call(this.xAxis),
                    this.svg.append("g").attr("class", "xaxis").attr("transform", "translate(" + (margin.left + 5) + "," + margin.top + ")").call(this.yAxis),
                    this.paths = new Array(this.numLines);
                    for (var i = 0; i < this.numLines; i++) this.paths[i] = this.svg.append("path").attr("class", "line").style({
                        fill: "none",
                        stroke: lineColors[i],
                        "stroke-width": "1.5px"
                    })
                }
                return AppendingLineChart.prototype.reset = function() {
                    this.data = [],
                    this.redraw(), this.minY = 0, this.maxY = .1
                }, AppendingLineChart.prototype.addDataPoint = function(dataPoint) {
                    var _this = this;
                    if (dataPoint.length !== this.numLines) throw Error("Length of dataPoint must equal number of lines");
                    dataPoint.forEach(function(y) {
                        _this.minY = Math.min(_this.minY, y), _this.maxY = Math.max(_this.maxY, y)
                    }), this.data.push({
                        x: this.data.length + 1,
                        y: dataPoint
                    }), this.redraw()
                }, AppendingLineChart.prototype.redraw = function() {
                    var _this = this;
                    this.xScale.domain([1, this.data.length]), this.yScale.domain([this.minY, this.maxY]), this.xAxis.scale(this.xScale), this.yAxis.scale(this.yScale), this.svg.select("g").attr("class", "xaxis").attr("transform", "translate(7," + (this.height + 2) + ")").call(this.xAxis);
                    for (var i = 0; i < this.numLines; i++) this.paths[i].datum(this.data).attr("d", function(lineIndex) {
                        return d3.svg.line().x(function(d) {
                            return _this.xScale(d.x) + 7
                        }).y(function(d) {
                            return _this.yScale(d.y[lineIndex])
                        })
                    }(i))
                }, AppendingLineChart
            }();
        exports.AppendingLineChart = AppendingLineChart
    }, {
        d3: 1
    }],
    7: [function(require, module, exports) {
        "use strict";
        exports.__esModule = !0;
        var d3 = require("d3"),
            AppendingLineChart2 = function() {
                function AppendingLineChart2(container, lineColors) {
                    this.data = [], this.minY = 0, this.maxY = .1, this.lineColors = lineColors, this.numLines = lineColors.length;
                    var node = container.node(),
                        totalWidth = node.offsetWidth,
                        totalHeight = node.offsetHeight - 17,
                        margin = {
                            top: 2,
                            right: 0,
                            bottom: 2,
                            left: 2
                        },
                        width = totalWidth - margin.left - margin.right,
                        height = totalHeight - margin.top - margin.bottom;
                    this.height = height, this.margin = margin, this.xScale = d3.scale.linear().domain([0, 0]).range([0, width]),
                    this.yScale = d3.scale.linear().domain([0, .1]).range([height, 0]),
                    this.yAxis = d3.svg.axis().scale(this.yScale).ticks(6).orient("left"),
                    this.xAxis = d3.svg.axis().scale(this.xScale).ticks(5).tickFormat(d3.format("d")),
                    this.svg = container.append("svg").attr("width", width + margin.left + margin.right).attr("height", 20 + height + margin.top + margin.bottom),
                    this.svg.append("g").append("rect").attr("x", 0).attr("y", -160).attr("width", 373).attr("height", 160).attr("fill", "#F2F2F0").attr("stroke", "none"),
                    this.svg.append("g").append("rect").attr("x", 205).attr("y", 7).attr("width", 58).attr("height", 20).attr("fill", "none").attr("stroke", "#DADADA"),
                    this.svg.append("g").append("rect").attr("x", 212).attr("y", 17).attr("width", 16).attr("height", 1).attr("fill", "#002452").attr("stroke", "#002452"),
                    this.svg.append("g").append("text").attr("x", 233).attr("y", 21).attr("font-size", 12).attr("color", "black").text("Loss"),
                    this.svg.append("g").attr("class", "xaxis").attr("transform", "translate(7," + (height + 2) + ")").call(this.xAxis),
                    this.svg.append("g").attr("class", "xaxis").attr("transform", "translate(" + (margin.left + 5) + "," + margin.top + ")").call(this.yAxis),
                    this.paths = new Array(this.numLines);
                    for (var i = 0; i < this.numLines; i++) this.paths[i] = this.svg.append("path").attr("class", "line").style({
                        fill: "none",
                        stroke: lineColors[i],
                        "stroke-width": "1.5px"
                    })
                }
                return AppendingLineChart2.prototype.reset = function() {
                    this.data = [],
                    this.redraw(), this.minY = 0, this.maxY = .1
                }, AppendingLineChart2.prototype.addDataPoint = function(dataPoint) {
                    var _this = this;
                    if (dataPoint.length !== this.numLines) throw Error("Length of dataPoint must equal number of lines");
                    dataPoint.forEach(function(y) {
                        _this.minY = Math.min(_this.minY, y), _this.maxY = Math.max(_this.maxY, y)
                    }), this.data.push({
                        x: this.data.length + 1,
                        y: dataPoint
                    }), this.redraw()
                }, AppendingLineChart2.prototype.redraw = function() {
                    var _this = this;
                    this.xScale.domain([1, this.data.length]), this.yScale.domain([this.minY, this.maxY]), this.xAxis.scale(this.xScale), this.yAxis.scale(this.yScale), this.svg.select("g").attr("class", "xaxis").attr("transform", "translate(7," + (this.height + 2) + ")").call(this.xAxis);
                    for (var i = 0; i < this.numLines; i++) this.paths[i].datum(this.data).attr("d", function(lineIndex) {
                        return d3.svg.line().x(function(d) {
                            return _this.xScale(d.x) + 7
                        }).y(function(d) {
                            return _this.yScale(d.y[lineIndex])
                        })
                    }(i))
                }, AppendingLineChart2
            }();
        exports.AppendingLineChart2 = AppendingLineChart2
    }, {
        d3: 1
    }],
    8: [function(require, module, exports) {
        "use strict";
        exports.__esModule = !0;
        var utils_1 = require("./utils"),
            linalg_1 = require("./linalg"),
            vector_1 = require("./vector"),
            Matrix = function() {
                function Matrix(arg1, arg2) {
                    if ("number" == typeof arg1) {
                        if (arg1 <= 0) throw "invalid parameter";
                        if (this.rows = arg1, arg2) {
                            if (arg2 <= 0) throw "invalid parameter";
                            this.cols = arg2
                        } else this.cols = this.rows;
                        this.data = new Array(this.rows);
                        for (var i = 0; i < this.rows; i++) {
                            this.data[i] = new Array(this.cols);
                            for (var j = 0; j < this.cols; j++) this.data[i][j] = 0
                        }
                    } else {
                        if (!(arg1 instanceof Array)) throw "invalid parameter";
                        if (this.data = arg1.map(function(row) {
                                return row.slice()
                            }), this.rows = arg1.length, 0 === this.rows) throw "invalid size";
                        if (this.cols = arg1[0].length, 0 === this.cols) throw "invalid size"
                    }
                }
                return Matrix.elementWiseOP = function(arg1, arg2, arg3) {
                    var mat = new Matrix(arg1.data);
                    switch (typeof arg2) {
                        case "number":
                            for (var i = 0; i < mat.rows; i++)
                                for (var j = 0; j < mat.cols; j++) mat.data[i][j] = arg3(mat.data[i][j], arg2);
                            break;
                        case "function":
                            for (var i = 0; i < mat.rows; i++)
                                for (var j = 0; j < mat.cols; j++) mat.data[i][j] = arg2(mat.data[i][j]);
                            break;
                        default:
                            if (!(arg2 instanceof Matrix) || "function" != typeof arg3) throw "type error";
                            if (mat.rows !== arg2.rows || mat.cols !== arg2.cols) throw "size mismatch";
                            for (var i = 0; i < mat.rows; i++)
                                for (var j = 0; j < mat.cols; j++) mat.data[i][j] = arg3(mat.data[i][j], arg2.data[i][j])
                    }
                    return mat
                }, Matrix.neg = function(mat) {
                    return Matrix.elementWiseOP(mat, function(op) {
                        return -op
                    })
                }, Matrix.reciprocal = function(mat) {
                    return Matrix.elementWiseOP(mat, function(op) {
                        return 1 / op
                    })
                }, Matrix.add = function(mat, other) {
                    return Matrix.elementWiseOP(mat, other, function(op1, op2) {
                        return op1 + op2
                    })
                }, Matrix.sub = function(mat, other) {
                    return Matrix.elementWiseOP(mat, other, function(op1, op2) {
                        return op1 - op2
                    })
                }, Matrix.mul = function(mat, other) {
                    return Matrix.elementWiseOP(mat, other, function(op1, op2) {
                        return op1 * op2
                    })
                }, Matrix.div = function(mat, other) {
                    return Matrix.elementWiseOP(mat, other, function(op1, op2) {
                        return op1 / op2
                    })
                }, Matrix.transpose = function(mat) {
                    var _a, m = new Matrix(mat.data);
                    return m.data = utils_1.Utils.transpose2D(m.data), _a = [m.cols, m.rows], m.rows = _a[0], m.cols = _a[1], m
                }, Matrix.dot = function(op1, op2) {
                    return linalg_1.LinAlg.dot(op1, op2)
                }, Matrix.isSquare = function(mat) {
                    return mat.rows === mat.cols
                }, Matrix.isSymmetric = function(mat) {
                    if (!Matrix.isSquare(mat)) return !1;
                    for (var i = 0; i < mat.rows; i++)
                        for (var j = 0; j <= i; j++)
                            if (!utils_1.Utils.isEqual(mat.data[i][j], mat.data[j][i])) return !1;
                    return !0
                }, Matrix.isSkewSymmetric = function(mat) {
                    if (!Matrix.isSquare(mat)) return !1;
                    for (var i = 0; i < mat.rows; i++)
                        for (var j = 0; j <= i; j++)
                            if (!utils_1.Utils.isEqual(mat.data[i][j], -mat.data[j][i])) return !1;
                    return !0
                }, Matrix.diagonalElements = function(mat) {
                    if (!Matrix.isSquare(mat)) throw "invalid size";
                    for (var ret = [], i = 0; i < mat.rows; i++) ret.push(mat.data[i][i]);
                    return ret
                }, Matrix.upper = function(mat) {
                    for (var ret = mat.copy(), i = 0; i < mat.rows; i++)
                        for (var j = 0; j < i; j++) ret.data[i][j] = 0;
                    return ret
                }, Matrix.lower = function(mat) {
                    for (var ret = mat.copy(), i = 0; i < mat.rows; i++)
                        for (var j = i + 1; j < mat.cols; j++) ret.data[i][j] = 0;
                    return ret
                }, Matrix.det_definition = function(mat) {
                    if (!Matrix.isSquare(mat)) throw "invalid size";
                    for (var ret = 0, y = new Array(mat.rows), i = 0; i < mat.rows; i++) y[i] = i;
                    return utils_1.Utils.permutation(y, 0, 1, function(arr, inv) {
                        for (var term = inv, i = 0; i < mat.rows; i++) term *= mat.data[i][arr[i]];
                        ret += term
                    }), ret
                }, Matrix.det = function(mat) {
                    if (!Matrix.isSquare(mat)) throw "invalid size";
                    var U = Matrix.LU(mat).U;
                    return Matrix.diagonalElements(U).reduce(function(mult, cur) {
                        return mult * cur
                    }, 1)
                }, Matrix.constructDiag = function(arr) {
                    for (var len = arr.length, mat = new Matrix(len), i = 0; i < len; i++) mat.data[i][i] = arr[i];
                    return mat
                }, Matrix.identity = function(n) {
                    for (var diag = new Array(n), i = 0; i < n; i++) diag[i] = 1;
                    return Matrix.constructDiag(diag)
                }, Matrix.rank = function(mat) {
                    for (var _a, _mat = mat.copy(), rank = Math.min(_mat.rows, _mat.cols), i = 0; i < rank; i++)
                        if (utils_1.Utils.isEqual(_mat.data[i][i], 0)) {
                            for (var reduce = !0, j = i + 1; j < _mat.rows; j++)
                                if (!utils_1.Utils.isEqual(_mat.data[j][i], 0)) {
                                    _a = [_mat.data[j], _mat.data[i]], _mat.data[i] = _a[0], _mat.data[j] = _a[1], reduce = !1;
                                    break
                                } if (reduce) {
                                rank--;
                                for (var j = i; j < _mat.rows; j++) _mat.data[j][i] = _mat.data[j][rank]
                            }
                            i--
                        } else
                            for (var j = i + 1; j < _mat.rows; j++)
                                for (var mult = _mat.data[j][i] / _mat.data[i][i], k = i; k < rank; k++) _mat.data[j][k] -= mult * _mat.data[i][k];
                    return rank
                }, Matrix.trace = function(mat) {
                    return Matrix.diagonalElements(mat).reduce(function(accumulator, cur) {
                        return accumulator + cur
                    })
                }, Matrix.getRow = function(mat, ind) {
                    if (ind < 0 || ind >= mat.rows) throw "invalid input";
                    return new vector_1.Vector(mat.data[ind])
                }, Matrix.getCol = function(mat, ind) {
                    if (ind < 0 || ind >= mat.cols) throw "invalid input";
                    return new vector_1.Vector(utils_1.Utils.columnOf(mat.data, ind))
                }, Matrix.toVector = function(mat, isCol) {
                    if (void 0 === isCol && (isCol = !0), isCol && 1 === mat.cols) return Matrix.getCol(mat, 0);
                    if (isCol || 1 !== mat.rows) throw "invalid size";
                    return Matrix.getRow(mat, 0)
                }, Matrix.toScalar = function(mat) {
                    if (1 !== mat.rows || 1 !== mat.cols) throw "this matrix is not 1 by 1";
                    return mat.data[0][0]
                }, Matrix.LU = function(mat) {
                    var L, U, m = mat.rows,
                        n = mat.cols;
                    if (m <= n) {
                        L = new Matrix(m), U = new Matrix(m, n);
                        for (var i = 0; i < m; i++) {
                            for (var j = i; j < n; j++) {
                                for (var sum = 0, k = 0; k < i; k++) sum += L.data[i][k] * U.data[k][j];
                                U.data[i][j] = mat.data[i][j] - sum
                            }
                            L.data[i][i] = 1;
                            for (var j = i + 1; j < m; j++) {
                                for (var sum = 0, k = 0; k < i; k++) sum += L.data[j][k] * U.data[k][i];
                                utils_1.Utils.isEqual(U.data[i][i], 0) ? L.data[j][i] = 1 : L.data[j][i] = (mat.data[j][i] - sum) / U.data[i][i]
                            }
                        }
                    } else {
                        L = new Matrix(m, n), U = new Matrix(n);
                        for (var i = 0; i < m; i++) {
                            for (var j = i; j < n; j++) {
                                for (var sum = 0, k = 0; k < i; k++) sum += L.data[i][k] * U.data[k][j];
                                U.data[i][j] = mat.data[i][j] - sum
                            }
                            if (i < n) {
                                L.data[i][i] = 1;
                                for (var j = i + 1; j < m; j++) {
                                    for (var sum = 0, k = 0; k < i; k++) sum += L.data[j][k] * U.data[k][i];
                                    utils_1.Utils.isEqual(U.data[i][i], 0) ? L.data[j][i] = 1 : L.data[j][i] = (mat.data[j][i] - sum) / U.data[i][i]
                                }
                            }
                        }
                    }
                    return {
                        L: L,
                        U: U
                    }
                }, Matrix.QR = function(mat) {
                    for (var m = mat.rows, n = mat.cols, R = mat.copy(), Qt = Matrix.identity(m), i = 0; i < n; i++) {
                        var v = R.getCol(i).subVector(i, m - i).neg();
                        if (utils_1.Utils.isEqual(v.norm(), 0)) break;
                        v.data[0] += v.data[0] >= 0 ? v.norm() : -v.norm(), v = v.div(v.norm());
                        for (var j = 0; j < n; j++) {
                            var temp = R.getCol(j).subVector(i, m - i);
                            temp = temp.sub(v.mul(2 * v.dot(temp).toScalar()));
                            for (var k = i; k < m; k++) R.data[k][j] = temp.data[k - i]
                        }
                        for (var j = 0; j < m; j++) {
                            var temp = Qt.getCol(j).subVector(i, m - i);
                            temp = temp.sub(v.mul(2 * v.dot(temp).toScalar()));
                            for (var k = i; k < m; k++) Qt.data[k][j] = temp.data[k - i]
                        }
                        console.log("step: ", i), console.log(R)
                    }
                    return {
                        Q: Qt.transpose(),
                        R: R.upper()
                    }
                }, Matrix.SVD_1D = function(mat, maximumIters) {
                    void 0 === maximumIters && (maximumIters = 200);
                    for (var lastVector, _a = [mat.rows, mat.cols], m = _a[0], n = _a[1], x = vector_1.Vector.randomUnitVector(Math.min(m, n)), B = m >= n ? linalg_1.LinAlg.dot(mat.transpose(), mat) : Matrix.dot(mat, mat.transpose()), i = 0; i < maximumIters && (lastVector = x, x = linalg_1.LinAlg.dot(B, lastVector).toVector(), x = x.div(x.norm()), !utils_1.Utils.isEqual(Math.abs(linalg_1.LinAlg.dot(x, lastVector).toScalar()), 1)); i++);
                    return x
                }, Matrix.SVD = function(mat, k, maximumIters) {
                    void 0 === k && (k = 0), void 0 === maximumIters && (maximumIters = 200);
                    var _a, _b, m, n, eigens = [],
                        us = [],
                        vs = [];
                    _a = [mat.rows, mat.cols], m = _a[0], n = _a[1], (0 === k || k > Math.max(m, n)) && (k = Math.min(m, n));
                    var mat_p = m >= n ? mat : mat.transpose(),
                        rank = mat.rank(),
                        nulls = k - rank;
                    k = k < rank ? k : rank;
                    for (var i = 0; i < k; i++) {
                        for (var matrixFor1D = mat.copy(), eigenValue = void 0, u = void 0, v = void 0, sigma = void 0, j = 0; j < i; j++) _b = [eigens[j], us[j], vs[j]], eigenValue = _b[0], u = _b[1], v = _b[2], matrixFor1D = matrixFor1D.sub(vector_1.Vector.outer(u, v).mul(eigenValue));
                        if (m >= n) {
                            v = Matrix.SVD_1D(matrixFor1D, maximumIters);
                            var u_unnormalized = linalg_1.LinAlg.dot(mat_p, v).toVector();
                            sigma = u_unnormalized.norm(), u = u_unnormalized.div(sigma)
                        } else {
                            u = Matrix.SVD_1D(matrixFor1D, maximumIters);
                            var v_unnormalized = linalg_1.LinAlg.dot(mat_p, u).toVector();
                            sigma = v_unnormalized.norm(), v = v_unnormalized.div(sigma)
                        }
                        eigens.push(sigma), us.push(u), vs.push(v)
                    }
                    for (var i = 0; i < nulls; i++) eigens.push(0), us.push(new vector_1.Vector(us[0].length)), vs.push(new vector_1.Vector(vs[0].length));
                    return {
                        U: vector_1.Vector.toMatrix(us).transpose(),
                        D: Matrix.constructDiag(eigens),
                        Vt: vector_1.Vector.toMatrix(vs)
                    }
                }, Matrix.pseudoInverse = function(mat, k) {
                    void 0 === k && (k = 0);
                    for (var _a = Matrix.SVD(mat, k), U = _a.U, D = _a.D, Vt = _a.Vt, eigenNum = D.rows, i = 0; i < eigenNum; i++) utils_1.Utils.isEqual(D.data[i][i], 0) ? D.data[i][i] = 0 : D.data[i][i] = 1 / D.data[i][i];
                    return Vt.transpose().dot(D).dot(U.transpose())
                }, Matrix.leftInverse = function(mat) {
                    if (mat.rank() !== mat.cols) throw "not a column full rank matrix";
                    return Matrix.pseudoInverse(mat)
                }, Matrix.rightInverse = function(mat) {
                    if (mat.rank() !== mat.rows) throw "not a row ful rank matrix";
                    return Matrix.pseudoInverse(mat)
                }, Matrix.inverse = function(mat) {
                    if (mat.isSquare()) {
                        if (mat.rank() !== mat.rows) throw "matrix is singular to working precision";
                        return this.pseudoInverse(mat)
                    }
                    throw "not a square matrix"
                }, Matrix.prototype.elementWiseOP = function(arg1, arg2) {
                    return Matrix.elementWiseOP(this, arg1, arg2)
                }, Matrix.prototype.neg = function() {
                    return this.elementWiseOP(function(op) {
                        return -op
                    })
                }, Matrix.prototype.reciprocal = function() {
                    return this.elementWiseOP(function(op) {
                        return 1 / op
                    })
                }, Matrix.prototype.add = function(other) {
                    return Matrix.elementWiseOP(this, other, function(op1, op2) {
                        return op1 + op2
                    })
                }, Matrix.prototype.sub = function(other) {
                    return Matrix.elementWiseOP(this, other, function(op1, op2) {
                        return op1 - op2
                    })
                }, Matrix.prototype.mul = function(other) {
                    return Matrix.elementWiseOP(this, other, function(op1, op2) {
                        return op1 * op2
                    })
                }, Matrix.prototype.div = function(other) {
                    return Matrix.elementWiseOP(this, other, function(op1, op2) {
                        return op1 / op2
                    })
                }, Matrix.prototype.transpose = function() {
                    return Matrix.transpose(this)
                }, Matrix.prototype.dot = function(other) {
                    return linalg_1.LinAlg.dot(this, other)
                }, Matrix.prototype.isSquare = function() {
                    return Matrix.isSquare(this)
                }, Matrix.prototype.isSymmetric = function() {
                    return Matrix.isSymmetric(this)
                }, Matrix.prototype.isSkewSymmetric = function() {
                    return Matrix.isSkewSymmetric(this)
                }, Matrix.prototype.copy = function() {
                    return new Matrix(this.data)
                }, Matrix.prototype.diagonalElements = function() {
                    return Matrix.diagonalElements(this)
                }, Matrix.prototype.upper = function() {
                    return Matrix.upper(this)
                }, Matrix.prototype.lower = function() {
                    return Matrix.lower(this)
                }, Matrix.prototype.det = function() {
                    return Matrix.det(this)
                }, Matrix.prototype.rank = function() {
                    return Matrix.rank(this)
                }, Matrix.prototype.trace = function() {
                    return Matrix.trace(this)
                }, Matrix.prototype.getRow = function(ind) {
                    return Matrix.getRow(this, ind)
                }, Matrix.prototype.getCol = function(ind) {
                    return Matrix.getCol(this, ind)
                }, Matrix.prototype.toVector = function(isCol) {
                    return void 0 === isCol && (isCol = !0), Matrix.toVector(this, isCol)
                }, Matrix.prototype.toScalar = function() {
                    return Matrix.toScalar(this)
                }, Matrix.prototype.pseudoInverse = function(k) {
                    return void 0 === k && (k = 0), Matrix.pseudoInverse(this, k)
                }, Matrix.prototype.leftInverse = function() {
                    return Matrix.leftInverse(this)
                }, Matrix.prototype.rightInverse = function() {
                    return Matrix.rightInverse(this)
                }, Matrix.prototype.inverse = function() {
                    return Matrix.inverse(this)
                }, Matrix
            }();
        exports.Matrix = Matrix
    }, {
        "./linalg": 5,
        "./utils": 12,
        "./vector": 13
    }],
    9: [function(require, module, exports) {
        "use strict";

        function buildNetwork(networkShape, activation, outputActivation, regularization, inputIds, initZero) {
            for (var numLayers = networkShape.length, id = 1, network = [], layerIdx = 0; layerIdx < numLayers; layerIdx++) {
                var isOutputLayer = layerIdx === numLayers - 1,
                    isInputLayer = 0 === layerIdx,
                    currentLayer = [];
                network.push(currentLayer);
                for (var numNodes = networkShape[layerIdx], i = 0; i < numNodes; i++) {
                    var nodeId = id.toString();
                    isInputLayer ? nodeId = inputIds[i] : id++;
                    var node = new Node(nodeId, isOutputLayer ? outputActivation : activation, initZero);
                    if (currentLayer.push(node), layerIdx >= 1)
                        for (var j = 0; j < network[layerIdx - 1].length; j++) {
                            var prevNode = network[layerIdx - 1][j],
                                link = new Link(prevNode, node, regularization, initZero);
                            prevNode.outputs.push(link), node.inputLinks.push(link)
                        }
                }
            }
            return network
        }

        function forwardProp(network, inputs) {
            var inputLayer = network[0];
            if (inputs.length !== inputLayer.length) throw new Error("The number of inputs must match the number of nodes in the input layer");
            for (var i = 0; i < inputLayer.length; i++) {
                var node = inputLayer[i];
                node.output = inputs[i]
            }
            for (var layerIdx = 1; layerIdx < network.length; layerIdx++)
                for (var currentLayer = network[layerIdx], i = 0; i < currentLayer.length; i++) {
                    var node = currentLayer[i];
                    node.updateOutput()
                }
            return network[network.length - 1][0].output
        }

        function backProp(network, target, errorFunc, regularization) {
            var outputNode = network[network.length - 1][0];
            outputNode.outputDer = errorFunc.der(regularization, outputNode.output, target);
            for (var layerIdx = network.length - 1; layerIdx >= 1; layerIdx--) {
                for (var currentLayer = network[layerIdx], i = 0; i < currentLayer.length; i++) {
                    var node = currentLayer[i];
                    node.inputDer = node.outputDer * node.activation.der(node.totalInput), node.accInputDer += node.inputDer, node.numAccumulatedDers++
                }
                for (var i = 0; i < currentLayer.length; i++)
                    for (var node = currentLayer[i], j = 0; j < node.inputLinks.length; j++) {
                        var link = node.inputLinks[j];
                        link.isDead || (link.errorDer = node.inputDer * link.source.output, link.accErrorDer += link.errorDer, link.numAccumulatedDers++)
                    }
                if (1 !== layerIdx)
                    for (var prevLayer = network[layerIdx - 1], i = 0; i < prevLayer.length; i++) {
                        var node = prevLayer[i];
                        node.outputDer = 0;
                        for (var j = 0; j < node.outputs.length; j++) {
                            var output = node.outputs[j];
                            node.outputDer += output.weight * output.dest.inputDer
                        }
                    }
            }
        }

        function updateWeights(network, learningRate, regularizationRate, lr_iter, regularization) {
            // learningRate = learningRate * 10.0
            learningRate = Math.min(learningRate + lr_iter * 0.04, 4.0)
            // console.log(learningRate)
            for (var layerIdx = 1; layerIdx < network.length; layerIdx++)
                for (var currentLayer = network[layerIdx], i = 0; i < currentLayer.length; i++) {
                    var node = currentLayer[i];
                    node.numAccumulatedDers > 0 && (node.bias -= learningRate * node.accInputDer / node.numAccumulatedDers, node.accInputDer = 0, node.numAccumulatedDers = 0);
                    for (var j = 0; j < node.inputLinks.length; j++) {
                        var link = node.inputLinks[j];
                        if (!link.isDead) {
                            // var regulDer = link.regularization ? link.regularization.der(link.weight) : 0;
                            if (link.numAccumulatedDers > 0) {
                                link.weight = link.weight - learningRate / link.numAccumulatedDers * link.accErrorDer;

                                if (regularization == 'WD'){
                                    var regulDer = link.weight;
                                    var newLinkWeight = link.weight - learningRate * 0.02 * regulDer;
                                    link.weight = newLinkWeight;
                                } else if (regularization == null){
                                    var regulDer = link.weight;
                                    var newLinkWeight = link.weight - learningRate * 0.0001 * regulDer;
                                    link.weight = newLinkWeight;
                                }

                                link.accErrorDer = 0, link.numAccumulatedDers = 0
                                // link.regularization === RegularizationFunction.L1 && link.weight * newLinkWeight < 0 ? (link.weight = 0, link.isDead = !0) : link.weight = newLinkWeight, link.accErrorDer = 0, link.numAccumulatedDers = 0
                            }
                        }
                    }
                }
        }

        function forEachNode(network, ignoreInputs, accessor) {
            for (var layerIdx = ignoreInputs ? 1 : 0; layerIdx < network.length; layerIdx++)
                for (var currentLayer = network[layerIdx], i = 0; i < currentLayer.length; i++) {
                    var node = currentLayer[i];
                    accessor(node)
                }
        }

        function getOutputNode(network) {
            return network[network.length - 1][0]
        }
        exports.__esModule = !0;
        var Node = function() {
            function Node(id, activation, initZero) {
                this.inputLinks = [], this.bias = .1, this.outputs = [], this.outputDer = 0, this.inputDer = 0, this.accInputDer = 0, this.numAccumulatedDers = 0, this.id = id, this.activation = activation, initZero && (this.bias = 0)
            }
            return Node.prototype.updateOutput = function() {
                this.totalInput = this.bias;
                for (var j = 0; j < this.inputLinks.length; j++) {
                    var link = this.inputLinks[j];
                    this.totalInput += link.weight * link.source.output
                }
                return this.output = this.activation.output(this.totalInput), this.output
            }, Node
        }();
        exports.Node = Node;
        // var Errors = function() {
        //     function Errors() {}
        //     return Errors.SQUARE = {
        //         error: function(output, target) {
        //             return .5 * Math.pow(output - target, 2)
        //         },
        //         der: function(output, target) {
        //             return output - target
        //         }
        //     }, Errors
        // }();

        var Errors = function() {
            function Errors() {}
            return Errors.BCE = {
                error: function(output, target) {
                    return Math.log(1.0 + Math.exp(- output * target))
                },
                der: function(regularization, output, target) {


                    if (regularization == 'SD') {
                        return - target / (1.0 + Math.exp(output * target)) + 0.0016 * output
                    } else {
                        return - target / (1.0 + Math.exp(output * target))
                    }
                }
            }, Errors
        }();

        exports.Errors = Errors, Math.tanh = Math.tanh || function(x) {
            if (x === 1 / 0) return 1;
            if (x === -1 / 0) return -1;
            var e2x = Math.exp(2 * x);
            return (e2x - 1) / (e2x + 1)
        };
        var Activations = function() {
            function Activations() {}
            return Activations.TANH = {
                output: function(x) {
                    return Math.tanh(x)
                },
                der: function(x) {
                    var output = Activations.TANH.output(x);
                    return 1 - output * output
                }
            }, Activations.RELU = {
                output: function(x) {
                    return Math.max(0, x)
                },
                der: function(x) {
                    return x <= 0 ? 0 : 1
                }
            }, Activations.SIGMOID = {
                output: function(x) {
                    return 1 / (1 + Math.exp(-x))
                },
                der: function(x) {
                    var output = Activations.SIGMOID.output(x);
                    return output * (1 - output)
                }
            }, Activations.LINEAR = {
                output: function(x) {
                    return x
                },
                der: function(x) {
                    return 1
                }
            }, Activations
        }();
        exports.Activations = Activations;
        var RegularizationFunction = function() {
            function RegularizationFunction() {}
            return RegularizationFunction.L1 = {
                output: function(w) {
                    return Math.abs(w)
                },
                der: function(w) {
                    return w < 0 ? -1 : w > 0 ? 1 : 0
                }
            }, RegularizationFunction.L2 = {
                output: function(w) {
                    return .5 * w * w
                },
                der: function(w) {
                    return w
                }
            }, RegularizationFunction
        }();
        exports.RegularizationFunction = RegularizationFunction;
        var Link = function() {
            function Link(source, dest, regularization, initZero) {
                this.weight = .7 * rng.nextRange(0, 100) / 100 - .35,
                // this.weight *= 0.2,
                // console.log(rng),
                this.isDead = !1,
                this.errorDer = 0,
                this.accErrorDer = 0,
                this.numAccumulatedDers = 0,
                this.id = source.id + "-" + dest.id,
                this.source = source,
                this.dest = dest,
                this.regularization = regularization, initZero && (this.weight = 0)
                // console.log(this.weight)
            }
            return Link
        }();
        exports.Link = Link,
        exports.buildNetwork = buildNetwork,
        exports.forwardProp = forwardProp,
        exports.backProp = backProp,
        exports.updateWeights = updateWeights,
        exports.forEachNode = forEachNode,
        exports.getOutputNode = getOutputNode
    }, {}],
    10: [function(require, module, exports) {
        "use strict";

        function scrollTween(offset) {
            return function() {
                var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
                return function(t) {
                    scrollTo(0, i(t))
                }
            }
        }

        function updateBiasesUI(network) {
            nn.forEachNode(network, !0, function(node) {
                d3.select("rect#bias-" + node.id).style("fill", colorScale(node.bias))
            })
        }

        function updateWeightsUI(network, container) {
            for (var layerIdx = 1; layerIdx < network.length; layerIdx++)
                for (var currentLayer = network[layerIdx], i = 0; i < currentLayer.length; i++)
                    for (var node = currentLayer[i], j = 0; j < node.inputLinks.length; j++) {
                        var link = node.inputLinks[j];
                        container.select("#link" + link.source.id + "-" + link.dest.id).style({
                            "stroke-dashoffset": -iter / 3,
                            "stroke-width": linkWidthScale(Math.abs(link.weight)),
                            stroke: colorScale(link.weight)
                        }).datum(link)
                    }
        }

        function drawNetwork(network) {
            var svg = d3.select("#svg");
            svg.select("g.core").remove(), d3.select("#network").selectAll("div.canvas").remove(), d3.select("#network").selectAll("div.plus-minus-neurons").remove();
            var co = d3.select(".column.output").node(),
                cf = d3.select(".column.features").node(),
                width = co.offsetLeft - cf.offsetLeft;
            svg.attr("width", width);
            var node2coord = {},
                numLayers = (svg.append("g").classed("core", !0).attr("transform", "translate(3,3)"), network.length),
                layerScale = d3.scale.ordinal().domain(d3.range(1, numLayers - 1)).rangePoints([118, width - RECT_SIZE], .7),
                nodeIndexScale = function(nodeIndex) {
                    return nodeIndex * (RECT_SIZE + 25)
                },
                idWithCallout = null,
                cx = RECT_SIZE / 2 + 50,
                nodeIds = Object.keys(INPUTS),
                maxY = nodeIndexScale(nodeIds.length);
            nodeIds.forEach(function(nodeId, i) {
                var cy = nodeIndexScale(i) + RECT_SIZE / 2;
                node2coord[nodeId] = {
                    cx: cx,
                    cy: cy
                }
            });
            for (var layerIdx = 1; layerIdx < numLayers - 1; layerIdx++) {
                var numNodes = network[layerIdx].length,
                    cx_1 = layerScale(layerIdx) + RECT_SIZE / 2;
                maxY = Math.max(maxY, nodeIndexScale(numNodes));
                for (var i = 0; i < numNodes; i++) {
                    var node_1 = network[layerIdx][i],
                        cy_1 = nodeIndexScale(i) + RECT_SIZE / 2;
                    node2coord[node_1.id] = {
                        cx: cx_1,
                        cy: cy_1
                    };
                    var numNodes_1 = network[layerIdx].length,
                        nextNumNodes = network[layerIdx + 1].length;
                    null == idWithCallout && i === numNodes_1 - 1 && nextNumNodes <= numNodes_1 && (idWithCallout = node_1.id)
                }
            }
            cx = width + RECT_SIZE / 2;
            var node = network[numLayers - 1][0],
                cy = nodeIndexScale(0) + RECT_SIZE / 2;
            node2coord[node.id] = {
                cx: cx,
                cy: cy
            };
            for (var i = 0; i < node.inputLinks.length; i++) {
                node.inputLinks[i]
            }
            svg.attr("height", maxY);
            var height = Math.max(getRelativeHeight(d3.select("#network")));
            d3.select(".column.features").style("height", height + "px")
        }

        function getRelativeHeight(selection) {
            var node = selection.node();
            return node.offsetHeight + node.offsetTop
        }

        function updateDecisionBoundary(network, firstTime, iter) {

            if (firstTime) {
                boundary = {}, nn.forEachNode(network, !0, function(node) {
                    boundary[node.id] = new Array(DENSITY)
                });
                for (var nodeId in INPUTS) boundary[nodeId] = new Array(DENSITY)
            }
            var xScale = d3.scale.linear().domain([0, DENSITY - 1]).range(xDomain),
                yScale = d3.scale.linear().domain([DENSITY - 1, 0]).range(yDomain),
                i = 0,
                j = 0;
            for (i = 0; i < DENSITY; i++) {
                if (firstTime) {
                    nn.forEachNode(network, !0, function(node) {
                        boundary[node.id][i] = new Array(DENSITY)
                    });
                    for (var nodeId in INPUTS) boundary[nodeId][i] = new Array(DENSITY)
                }
                for (j = 0; j < DENSITY; j++) {
                    var x = xScale(i),
                        y = yScale(j),
                        input = constructInput(x, y);
                    if (
                        nn.forwardProp(network, input),
                        nn.forEachNode(network, !0, function(node) {
                            boundary[node.id][i][j] = node.output
                        }), firstTime)
                        for (var nodeId in INPUTS) boundary[nodeId][i][j] = INPUTS[nodeId].f(x, y)
                }
            }


        //     if (iter < 10) {
                

        //         if (firstTime) {
        //             boundary = {}, nn.forEachNode(network, !0, function(node) {
        //                 boundary[node.id] = new Array(DENSITY)
        //             });
        //             for (var nodeId in INPUTS) boundary[nodeId] = new Array(DENSITY)
        //         }
        //         var xScale = d3.scale.linear().domain([0, DENSITY - 1]).range(xDomain),
        //             yScale = d3.scale.linear().domain([DENSITY - 1, 0]).range(yDomain),
        //             i = 0,
        //             j = 0;
        //         for (i = 0; i < DENSITY; i++) {
        //             if (firstTime) {
        //                 nn.forEachNode(network, !0, function(node) {
        //                     boundary[node.id][i] = new Array(DENSITY)
        //                 });
        //                 for (var nodeId in INPUTS) boundary[nodeId][i] = new Array(DENSITY)
        //             }
        //             for (j = 0; j < DENSITY; j++) {
        //                 var x = xScale(i),
        //                     y = yScale(j),
        //                     input = constructInput(x, y);
        //                 if (
        //                     nn.forwardProp(network, input),
        //                     nn.forEachNode(network, !0, function(node) {
        //                         boundary[node.id][i][j] = node.output
        //                     }), firstTime)
        //                     for (var nodeId in INPUTS) boundary[nodeId][i][j] = INPUTS[nodeId].f(x, y)
        //             }
        //         }


        //     } else {

        //     input = constructInput(3, 3);
        //     nn.forwardProp(network, input)

        //     if (firstTime) {
        //         boundary = {}, nn.forEachNode(network, !0, function(node) {
        //             boundary[node.id] = new Array(DENSITY)
        //         });
        //         for (var nodeId in INPUTS) boundary[nodeId] = new Array(DENSITY)
        //     }
        //     var xScale = d3.scale.linear().domain([0, DENSITY - 1]).range(xDomain),
        //         yScale = d3.scale.linear().domain([DENSITY - 1, 0]).range(yDomain),
        //         i = 0,
        //         j = 0;
        //     for (i = 0; i < DENSITY; i++) {
        //         if (firstTime) {
        //             nn.forEachNode(network, !0, function(node) {
        //                 boundary[node.id][i] = new Array(DENSITY)
        //             });
        //             for (var nodeId in INPUTS) boundary[nodeId][i] = new Array(DENSITY)
        //         }
        //         for (j = 0; j < DENSITY; j++) {
        //             var x = xScale(i),
        //                 y = yScale(j),
        //                 input = constructInput(x, y);
        //             if (
        //                 // nn.forwardProp(network, input),
        //                 nn.forEachNode(network, !0, function(node) {
        //                     boundary[node.id][i][j] = node.output
        //                 }), firstTime)
        //                 for (var nodeId in INPUTS) boundary[nodeId][i][j] = INPUTS[nodeId].f(x, y)
        //         }
        //     }
        // }
        }

        function getLoss(network, dataPoints) {
            var all_outputs = new Array(300)
            for (var loss = 0, per_example_grad = [], i = 0; i < dataPoints.length; i++) {
                var dataPoint = dataPoints[i],
                    input = constructInput(dataPoint.x, dataPoint.y),
                    output = nn.forwardProp(network, input);
                all_outputs[i] = output;
                loss += nn.Errors.BCE.error(output, dataPoint.label), per_example_grad.push(output)
            }
            return {
                lossTrain: loss / dataPoints.length,
                per_example_grad: per_example_grad,
                all_outputs: all_outputs
            }
        }

        function updateUI(firstStep, iter) {
            function humanReadable(n) {
                return n.toFixed(3)
            }
            void 0 === firstStep && (firstStep = !1),
            // updateWeightsUI(network,
            //     d3.select("g.core")),
            // updateBiasesUI(network),

            updateDecisionBoundary(network,
                firstStep, iter);
            var selectedId = null != selectedNodeId ? selectedNodeId : nn.getOutputNode(network).id;
            heatMap.updateBackground(boundary[selectedId],
                state.discretize),
            // d3.select("#network").selectAll("div.canvas").each(function(data) {
            //     data.heatmap.updateBackground(heatmap_1.reduceMatrix(boundary[data.id],
            //         10),
            //     state.discretize)
            // }),
            // d3.select("#loss-train").text(humanReadable(train_loss)),
            // d3.select("#loss-test").text(humanReadable(lossTest)),
            // d3.select("#iter-number").text(humanReadable(train_loss)),
            lineChart2.addDataPoint([train_loss]),
            lineChart.addDataPoint([sv1, sv2])
        }

        function constructInputIds() {
            var result = [];
            for (var inputName in INPUTS) state[inputName] && result.push(inputName);
            return result
        }

        function constructInput(x, y) {
            var input = [];
            for (var inputName in INPUTS) state[inputName] && input.push(INPUTS[inputName].f(x, y));
            return input
        }

        function oneStep() {
            iter++,
            state.lr_iter ++,
            trainData.forEach(function(point, i) {
                var input = constructInput(point.x, point.y);
                nn.forwardProp(network, input), nn.backProp(network, point.label, nn.Errors.BCE, state.regularization), (i + 1) % state.batchSize == 0 && nn.updateWeights(network, state.learningRate, state.regularizationRate, state.lr_iter, state.regularization)
            });
            var _a = getLoss(network, trainData),
                lossTrain = _a.lossTrain;
            _a.per_example_grad;
            train_loss = lossTrain;



            U = new _1.Matrix(
                [[-0.07042235, -0.06374605, -0.05526805, -0.0714766, -0.07136588, -0.041877303, -0.07230082, -0.06890545, -0.04789826, -0.03726763, -0.067878835, -0.05683965, -0.06419796, -0.07395548, -0.05745073, -0.040707964, -0.06924978, -0.038200863, -0.07268447, -0.058827132, -0.064838775, -0.039241552, -0.03974607, -0.040741377, -0.07258686, -0.04003871, -0.06616249, -0.067801744, -0.07294311, -0.06651791, -0.03898127, -0.044860624, -0.058945473, -0.03870223, -0.06971965, -0.054677166, -0.060961045, -0.061986946, -0.064824045, -0.058277402, -0.073420815, -0.039218653, -0.040575087, -0.051814206, -0.04766204, -0.041839905, -0.07304412, -0.044721793, -0.059793998, -0.047847632, -0.04301576, -0.06825624, -0.059857514, -0.03848413, -0.04300097, -0.07245391, -0.05882178, -0.057625078, -0.0681513, -0.055267587, -0.041645896, -0.038775653, -0.042359002, -0.06489917, -0.06767395, -0.06990087, -0.071557745, -0.039000798, -0.058204386, -0.04643017, -0.055668492, -0.0713395, -0.06858997, -0.054398917, -0.04383068, -0.072744824, -0.051265277, -0.03774896, -0.06475142, -0.040700406, -0.039639387, -0.05721656, -0.072065644, -0.07076749, -0.07220571, -0.03829438, -0.06844486, -0.07269995, -0.07337739, -0.07072167, -0.06816844, -0.045918435, -0.071016625, -0.065017976, -0.055122845, -0.056169514, -0.03910404, -0.04726873, -0.06437067, -0.056529548, -0.069235146, -0.07188569, -0.040711828, -0.060509674, -0.0419576, -0.071890466, -0.07333251, -0.06922109, -0.06796225, -0.06980361, -0.05791233, -0.055820398, -0.050192345, -0.039709136, -0.07377295, -0.04565601, -0.060273353, -0.069456436, -0.040505234, -0.05616817, -0.05198923, -0.043709528, -0.057868652, -0.045487322, -0.039619032, -0.039654914, -0.06158601, -0.0656866, -0.05735825, -0.06017103, -0.03935371, -0.058336828, -0.04413344, -0.04115792, -0.04125729, -0.069476604, -0.07138733, -0.07063792, -0.049927704, -0.07060608, -0.058118545, -0.039588112, -0.071439266, -0.060103804, -0.05735318, -0.04141783, -0.05415785, -0.050957654, -0.041176096, -0.064911775, -0.07044799, -0.056136813, -0.07296338, -0.07226481, -0.069009244, -0.04094164, -0.04470709, -0.060080446, -0.07271758, -0.039298844, -0.06399756, -0.040295444, -0.057661403, -0.06661406, -0.04906318, -0.049665503, -0.057104427, -0.05533034, -0.045950353, -0.0669461, -0.07226948, -0.03886307, -0.06755437, -0.0451225, -0.06431663, -0.07174739, -0.037996717, -0.06863758, -0.07315031, -0.04821147, -0.038411453, -0.040118344, -0.06732321, -0.07012728, -0.04424299, -0.038287755, -0.071033426, -0.036694624, -0.07111755, -0.038988568, -0.07025524, -0.0575864, -0.052637372, -0.060208406, -0.039244674, -0.060102016, -0.041101735, -0.06997195, -0.040393163, -0.0650818, -0.07121239, -0.072529554, -0.044115, -0.049725715, -0.046733182, -0.03962307, -0.06515587, -0.044436526, -0.068145156, -0.055582847, -0.07313835, -0.04220506, -0.041148696, -0.039108705, -0.062249165, -0.03832597, -0.0698937, -0.04069444, -0.072062746, -0.06511155, -0.066117615, -0.059293635, -0.0410064, -0.066980824, -0.03978051, -0.06113532, -0.040102985, -0.0414839, -0.071617454, -0.06980994, -0.042214833, -0.07358293, -0.040575657, -0.040663376, -0.06978717, -0.056262683, -0.03937898, -0.038522605, -0.05198695, -0.04431396, -0.058361877, -0.071431406, -0.04148844, -0.062148195, -0.038680803, -0.07110644, -0.062011175, -0.052413847, -0.038631752, -0.04050774, -0.042487297, -0.057508018, -0.072475694, -0.07228008, -0.050895587, -0.03974064, -0.04422072, -0.0734177, -0.03930794, -0.052908022, -0.06138644, -0.058820356, -0.054373737, -0.072181314, -0.069152206, -0.055699386, -0.048895407, -0.039446868, -0.06372613, -0.068434834, -0.0712988, -0.042387027, -0.070780315, -0.059833918, -0.036716875, -0.06731137, -0.072843246, -0.037785474, -0.07153253, -0.043147948, -0.05429969, -0.059901886, -0.068342976, -0.061289396, -0.06817961, -0.04776359, -0.0657961, -0.040373776, -0.043327935, -0.044783995, -0.073697984, -0.07061503, -0.069427036, -0.059842404, -0.06501956, -0.07191273, -0.063556746, -0.04186976, -0.045783985, -0.059459478, ],
                [0.07021497, -0.018108893, 0.0635312, 0.04919201, 0.029250562, -0.040332794, 0.013206329, 0.06014031, -0.033343893, 0.10541622, 0.014044926, 0.06319362, -0.010874116, -0.04791824, 0.07392678, -0.046852846, -0.0068967985, 0.030656554, 0.03813875, -0.06170149, 0.014816617, 0.0010454669, 0.052716892, 0.025539238, 0.053041127, 0.042873546, 0.028501859, -0.010309789, -0.0012507134, 0.061118603, 0.005596794, -0.062020186, 0.061718978, 0.083777055, 0.06641308, -0.076815926, -0.054594498, -0.049245194, 0.114326075, 0.059437796, 0.032499555, -0.01601887, -0.031803753, 0.01672054, -0.049891517, -0.008020215, 0.023777522, -0.06567179, 0.08123036, -0.019787073, -0.056116775, 0.05563653, -0.075292125, 0.06810713, -0.067781, -0.073159054, -0.07104292, 0.06171009, -0.047763895, -0.089982, -0.005903036, 0.06330885, -0.075377434, 0.11278236, 0.007962214, 0.05883403, -0.048891615, 0.06701605, 0.1115758, -0.04143902, -0.07736239, 0.047624145, 0.015857596, 0.043484166, -0.079621464, -0.057772435, 0.021501038, 0.039768122, -0.0017645607, 0.01493458, 0.054107632, -0.077659614, -0.075513504, 0.069984704, 0.02605223, -0.05599724, 0.057007298, 0.039238337, -0.11702016, 0.051954407, 0.02362819, -0.04685503, -0.11890544, 0.0026062445, -0.08645677, -0.08416109, 0.024927633, -0.053096224, 0.0042725904, 0.054731913, -0.00642427, -0.024234774, 0.026213327, -0.04083621, -0.0661709, 0.047716912, -0.03325275, 0.066007614, -0.017927092, 0.06283306, -0.06816472, -0.08071563, -0.014098305, 0.006652807, -0.07046581, -0.06282633, -0.03600908, -0.062004548, 0.029612323, 0.0562578, 0.05040237, -0.061239075, 0.06008641, -0.055419855, -0.030622702, 0.03432049, -0.046012927, 0.020334087, -0.08101152, 0.11019955, 0.009567496, -0.04509867, -0.06734569, -0.053580683, -0.0027992483, 0.07295742, -0.052555528, -0.079692215, 0.0092017725, -0.039118264, 0.09140042, 0.031233914, 0.069055006, 0.07829713, -0.06399589, 0.006442898, 0.03613044, 0.0057639754, -0.05913497, 0.107365765, 0.081575364, 0.06962466, -0.0625611, 0.0020520505, 0.0044205072, -0.03169543, -0.06576809, 0.04666501, 0.018316623, 0.011504776, -0.0020069503, -0.042177353, 0.09391495, 0.032310694, -0.039375745, 0.016770383, 0.072837554, -0.095913894, -0.0391576, -0.018445853, 0.03481361, 0.08007688, 0.047829907, -0.06182742, -0.005085639, 0.07134625, 0.10933468, 0.05738649, -0.07133481, -0.030663442, 0.07159218, 0.03931656, 0.023641804, 0.07316612, -0.10496974, 0.06215378, 0.026696919, 0.106742874, 0.05544363, 0.032671403, 0.06673553, -0.07810959, 0.021375488, -0.049020663, 0.061726138, 0.099200614, -0.023057442, -0.06096666, -0.011865683, 0.10658965, -0.010201501, 0.020519884, -0.0682661, -0.0250798, -0.048039496, -0.031207891, 0.10003584, -0.10220029, 0.05453677, 0.06943646, -0.021833865, -0.041967317, -0.04124793, -0.029119765, -0.03821094, 0.04619747, 0.08216002, 0.025003467, -0.100707844, 0.09894127, 0.0257013, 0.063273646, -0.05776393, 0.039466374, -0.0047901226, -0.0551966, 0.04255775, -0.04744359, -0.064628154, -0.045691684, -0.033595927, -0.15323398, -0.02085934, -0.035165254, -0.057528116, 0.08047309, 0.06148241, 0.05809751, 0.026036318, -0.067267224, -0.08128769, 0.023260169, -0.07718202, 0.09033249, 0.08588081, -0.11027208, -0.029152423, 0.0056774863, 0.048099987, 0.028653273, -0.04992807, 0.06276, -0.07762835, 0.019057112, -0.002716496, 0.051601898, -0.06757383, -0.09178875, 0.05513217, 0.04300549, -0.044059142, -0.048300114, -0.08749328, -0.032413658, 0.072374165, 0.08301241, 0.007665104, 0.06140041, -0.027555589, 0.0026744315, -0.085006595, -0.04181877, -0.05383067, -0.061228216, 0.05045605, 0.045333687, -0.053608805, 0.103693925, -0.06389444, -0.07018747, 0.03420562, -0.049191024, -0.0076126596, -0.043846536, 0.01598223, -0.028891193, 0.02717798, -0.010713866, -0.06223139, -0.05993911, -0.04562706, -0.08366623, 0.07004327, 0.109314255, 0.010263757, -0.038779944, -0.020561632, -0.0012626983, -0.041643854, -0.058414146, ],
                ]
                               )
            
            var _a = getLoss(network, testData);
            var y_hat = new _1.Matrix([_a.all_outputs])
            var Zs = _1.Matrix.dot(y_hat, U.transpose()).data

            sv1 = Math.abs(Zs[0][0]), sv2 = Math.abs(Zs[0][1]);
            updateUI(0, iter);

            if (state.lr_iter == 1000 || iter > 5000){
                player.pause();
            }
            // console.log(iter)
        }

        function getOutputWeights(network) {
            for (var weights = [], layerIdx = 0; layerIdx < network.length - 1; layerIdx++)
                for (var currentLayer = network[layerIdx], i = 0; i < currentLayer.length; i++)
                    for (var node = currentLayer[i], j = 0; j < node.outputs.length; j++) {
                        var output = node.outputs[j];
                        weights.push(output.weight)
                    }
            return weights
        }

        function reset(onStartup) {
            var seeds = [1375, 1379, 1380, 1382, 1383, 1386, 1388, 1389];
            var seed = seeds[Math.floor(Math.random() * Math.floor(8))];
            rng = new RNG(seed);
            state.lr_iter = 0;
            void 0 === onStartup && (onStartup = !1), lineChart.reset(), lineChart2.reset(), state.serialize(), onStartup || userHasInteracted(), player.pause();
            var suffix = 1 !== state.numHiddenLayers ? "s" : "";
            d3.select("#layers-label").text("Hidden layer" + suffix), d3.select("#num-layers").text(state.numHiddenLayers), iter = 0;
            var numInputs = constructInput(0, 0).length,
                shape = [numInputs].concat(state.networkShape).concat([1]),
                outputActivation = state.problem === state_1.Problem.REGRESSION ? nn.Activations.LINEAR : nn.Activations.LINEAR;
            network = nn.buildNetwork(shape, state.activation, outputActivation, state.regularization, constructInputIds(), state.initZero);



            var b1 = [
                network[1][0].bias,
                network[1][1].bias,
                network[1][2].bias,
                network[1][3].bias,
                network[1][4].bias,
                network[1][5].bias,
                network[1][6].bias,
                network[1][7].bias,
                network[1][8].bias,
                network[1][9].bias,
                network[1][10].bias,
                network[1][11].bias,
                network[1][12].bias,
                network[1][13].bias,
                network[1][14].bias,
                network[1][15].bias,
                network[1][16].bias,
                network[1][17].bias,
                network[1][18].bias,
                network[1][19].bias,
                network[1][20].bias,
                network[1][21].bias,
                network[1][22].bias,
                network[1][23].bias,
                network[1][24].bias,
                network[1][25].bias,
                network[1][26].bias,
                network[1][27].bias,
                network[1][28].bias,
                network[1][29].bias,
                network[1][30].bias,
                network[1][31].bias,
                network[1][32].bias,
                network[1][33].bias,
                network[1][34].bias,
                network[1][35].bias,
                network[1][36].bias,
                network[1][37].bias,
                network[1][38].bias,
                network[1][39].bias,
                network[1][40].bias,
                network[1][41].bias,
                network[1][42].bias,
                network[1][43].bias,
                network[1][44].bias,
                network[1][45].bias,
                network[1][46].bias,
                network[1][47].bias,
                network[1][48].bias,
                network[1][49].bias,
                network[1][50].bias,
                network[1][51].bias,
                network[1][52].bias,
                network[1][53].bias,
                network[1][54].bias,
                network[1][55].bias,
                network[1][56].bias,
                network[1][57].bias,
                network[1][58].bias,
                network[1][59].bias,
                network[1][60].bias,
                network[1][61].bias,
                network[1][62].bias,
                network[1][63].bias,
                network[1][64].bias,
                network[1][65].bias,
                network[1][66].bias,
                network[1][67].bias,
                network[1][68].bias,
                network[1][69].bias,
                network[1][70].bias,
                network[1][71].bias,
                network[1][72].bias,
                network[1][73].bias,
                network[1][74].bias,
                network[1][75].bias,
                network[1][76].bias,
                network[1][77].bias,
                network[1][78].bias,
                network[1][79].bias,
                network[1][80].bias,
                network[1][81].bias,
                network[1][82].bias,
                network[1][83].bias,
                network[1][84].bias,
                network[1][85].bias,
                network[1][86].bias,
                network[1][87].bias,
                network[1][88].bias,
                network[1][89].bias,
                network[1][90].bias,
                network[1][91].bias,
                network[1][92].bias,
                network[1][93].bias,
                network[1][94].bias,
                network[1][95].bias,
                network[1][96].bias,
                network[1][97].bias,
                network[1][98].bias,
                network[1][99].bias]

            b1 = new Array(4900).fill(b1);
            b1 = new _1.Matrix(b1)

            var b2 = [network[2][0].bias];
            b2 = new Array(4900).fill(b2);
            b2 = new _1.Matrix(b2)

            // console.log(b1)

            var w2 = new _1.Matrix([
                [network[1][0].outputs[0].weight],
                [network[1][1].outputs[0].weight],
                [network[1][2].outputs[0].weight],
                [network[1][3].outputs[0].weight],
                [network[1][4].outputs[0].weight],
                [network[1][5].outputs[0].weight],
                [network[1][6].outputs[0].weight],
                [network[1][7].outputs[0].weight],
                [network[1][8].outputs[0].weight],
                [network[1][9].outputs[0].weight],
                [network[1][10].outputs[0].weight],
                [network[1][11].outputs[0].weight],
                [network[1][12].outputs[0].weight],
                [network[1][13].outputs[0].weight],
                [network[1][14].outputs[0].weight],
                [network[1][15].outputs[0].weight],
                [network[1][16].outputs[0].weight],
                [network[1][17].outputs[0].weight],
                [network[1][18].outputs[0].weight],
                [network[1][19].outputs[0].weight],
                [network[1][20].outputs[0].weight],
                [network[1][21].outputs[0].weight],
                [network[1][22].outputs[0].weight],
                [network[1][23].outputs[0].weight],
                [network[1][24].outputs[0].weight],
                [network[1][25].outputs[0].weight],
                [network[1][26].outputs[0].weight],
                [network[1][27].outputs[0].weight],
                [network[1][28].outputs[0].weight],
                [network[1][29].outputs[0].weight],
                [network[1][30].outputs[0].weight],
                [network[1][31].outputs[0].weight],
                [network[1][32].outputs[0].weight],
                [network[1][33].outputs[0].weight],
                [network[1][34].outputs[0].weight],
                [network[1][35].outputs[0].weight],
                [network[1][36].outputs[0].weight],
                [network[1][37].outputs[0].weight],
                [network[1][38].outputs[0].weight],
                [network[1][39].outputs[0].weight],
                [network[1][40].outputs[0].weight],
                [network[1][41].outputs[0].weight],
                [network[1][42].outputs[0].weight],
                [network[1][43].outputs[0].weight],
                [network[1][44].outputs[0].weight],
                [network[1][45].outputs[0].weight],
                [network[1][46].outputs[0].weight],
                [network[1][47].outputs[0].weight],
                [network[1][48].outputs[0].weight],
                [network[1][49].outputs[0].weight],
                [network[1][50].outputs[0].weight],
                [network[1][51].outputs[0].weight],
                [network[1][52].outputs[0].weight],
                [network[1][53].outputs[0].weight],
                [network[1][54].outputs[0].weight],
                [network[1][55].outputs[0].weight],
                [network[1][56].outputs[0].weight],
                [network[1][57].outputs[0].weight],
                [network[1][58].outputs[0].weight],
                [network[1][59].outputs[0].weight],
                [network[1][60].outputs[0].weight],
                [network[1][61].outputs[0].weight],
                [network[1][62].outputs[0].weight],
                [network[1][63].outputs[0].weight],
                [network[1][64].outputs[0].weight],
                [network[1][65].outputs[0].weight],
                [network[1][66].outputs[0].weight],
                [network[1][67].outputs[0].weight],
                [network[1][68].outputs[0].weight],
                [network[1][69].outputs[0].weight],
                [network[1][70].outputs[0].weight],
                [network[1][71].outputs[0].weight],
                [network[1][72].outputs[0].weight],
                [network[1][73].outputs[0].weight],
                [network[1][74].outputs[0].weight],
                [network[1][75].outputs[0].weight],
                [network[1][76].outputs[0].weight],
                [network[1][77].outputs[0].weight],
                [network[1][78].outputs[0].weight],
                [network[1][79].outputs[0].weight],
                [network[1][80].outputs[0].weight],
                [network[1][81].outputs[0].weight],
                [network[1][82].outputs[0].weight],
                [network[1][83].outputs[0].weight],
                [network[1][84].outputs[0].weight],
                [network[1][85].outputs[0].weight],
                [network[1][86].outputs[0].weight],
                [network[1][87].outputs[0].weight],
                [network[1][88].outputs[0].weight],
                [network[1][89].outputs[0].weight],
                [network[1][90].outputs[0].weight],
                [network[1][91].outputs[0].weight],
                [network[1][92].outputs[0].weight],
                [network[1][93].outputs[0].weight],
                [network[1][94].outputs[0].weight],
                [network[1][95].outputs[0].weight],
                [network[1][96].outputs[0].weight],
                [network[1][97].outputs[0].weight],
                [network[1][98].outputs[0].weight],
                [network[1][99].outputs[0].weight],
                ])

            var w1 = new _1.Matrix([
                [network[0][0].outputs[0].weight,
                 network[0][0].outputs[1].weight,
                 network[0][0].outputs[2].weight,
                 network[0][0].outputs[3].weight,
                 network[0][0].outputs[4].weight,
                 network[0][0].outputs[5].weight,
                 network[0][0].outputs[6].weight,
                 network[0][0].outputs[7].weight,
                 network[0][0].outputs[8].weight,
                 network[0][0].outputs[9].weight,
                 network[0][0].outputs[10].weight,
                 network[0][0].outputs[11].weight,
                 network[0][0].outputs[12].weight,
                 network[0][0].outputs[13].weight,
                 network[0][0].outputs[14].weight,
                 network[0][0].outputs[15].weight,
                 network[0][0].outputs[16].weight,
                 network[0][0].outputs[17].weight,
                 network[0][0].outputs[18].weight,
                 network[0][0].outputs[19].weight,
                 network[0][0].outputs[20].weight,
                 network[0][0].outputs[21].weight,
                 network[0][0].outputs[22].weight,
                 network[0][0].outputs[23].weight,
                 network[0][0].outputs[24].weight,
                 network[0][0].outputs[25].weight,
                 network[0][0].outputs[26].weight,
                 network[0][0].outputs[27].weight,
                 network[0][0].outputs[28].weight,
                 network[0][0].outputs[29].weight,
                 network[0][0].outputs[30].weight,
                 network[0][0].outputs[31].weight,
                 network[0][0].outputs[32].weight,
                 network[0][0].outputs[33].weight,
                 network[0][0].outputs[34].weight,
                 network[0][0].outputs[35].weight,
                 network[0][0].outputs[36].weight,
                 network[0][0].outputs[37].weight,
                 network[0][0].outputs[38].weight,
                 network[0][0].outputs[39].weight,
                 network[0][0].outputs[40].weight,
                 network[0][0].outputs[41].weight,
                 network[0][0].outputs[42].weight,
                 network[0][0].outputs[43].weight,
                 network[0][0].outputs[44].weight,
                 network[0][0].outputs[45].weight,
                 network[0][0].outputs[46].weight,
                 network[0][0].outputs[47].weight,
                 network[0][0].outputs[48].weight,
                 network[0][0].outputs[49].weight,
                 network[0][0].outputs[50].weight,
                 network[0][0].outputs[51].weight,
                 network[0][0].outputs[52].weight,
                 network[0][0].outputs[53].weight,
                 network[0][0].outputs[54].weight,
                 network[0][0].outputs[55].weight,
                 network[0][0].outputs[56].weight,
                 network[0][0].outputs[57].weight,
                 network[0][0].outputs[58].weight,
                 network[0][0].outputs[59].weight,
                 network[0][0].outputs[60].weight,
                 network[0][0].outputs[61].weight,
                 network[0][0].outputs[62].weight,
                 network[0][0].outputs[63].weight,
                 network[0][0].outputs[64].weight,
                 network[0][0].outputs[65].weight,
                 network[0][0].outputs[66].weight,
                 network[0][0].outputs[67].weight,
                 network[0][0].outputs[68].weight,
                 network[0][0].outputs[69].weight,
                 network[0][0].outputs[70].weight,
                 network[0][0].outputs[71].weight,
                 network[0][0].outputs[72].weight,
                 network[0][0].outputs[73].weight,
                 network[0][0].outputs[74].weight,
                 network[0][0].outputs[75].weight,
                 network[0][0].outputs[76].weight,
                 network[0][0].outputs[77].weight,
                 network[0][0].outputs[78].weight,
                 network[0][0].outputs[79].weight,
                 network[0][0].outputs[80].weight,
                 network[0][0].outputs[81].weight,
                 network[0][0].outputs[82].weight,
                 network[0][0].outputs[83].weight,
                 network[0][0].outputs[84].weight,
                 network[0][0].outputs[85].weight,
                 network[0][0].outputs[86].weight,
                 network[0][0].outputs[87].weight,
                 network[0][0].outputs[88].weight,
                 network[0][0].outputs[89].weight,
                 network[0][0].outputs[90].weight,
                 network[0][0].outputs[91].weight,
                 network[0][0].outputs[92].weight,
                 network[0][0].outputs[93].weight,
                 network[0][0].outputs[94].weight,
                 network[0][0].outputs[95].weight,
                 network[0][0].outputs[96].weight,
                 network[0][0].outputs[97].weight,
                 network[0][0].outputs[98].weight,
                 network[0][0].outputs[99].weight],
                [network[0][1].outputs[0].weight,
                 network[0][1].outputs[1].weight,
                 network[0][1].outputs[2].weight,
                 network[0][1].outputs[3].weight,
                 network[0][1].outputs[4].weight,
                 network[0][1].outputs[5].weight,
                 network[0][1].outputs[6].weight,
                 network[0][1].outputs[7].weight,
                 network[0][1].outputs[8].weight,
                 network[0][1].outputs[9].weight,
                 network[0][1].outputs[10].weight,
                 network[0][1].outputs[11].weight,
                 network[0][1].outputs[12].weight,
                 network[0][1].outputs[13].weight,
                 network[0][1].outputs[14].weight,
                 network[0][1].outputs[15].weight,
                 network[0][1].outputs[16].weight,
                 network[0][1].outputs[17].weight,
                 network[0][1].outputs[18].weight,
                 network[0][1].outputs[19].weight,
                 network[0][1].outputs[20].weight,
                 network[0][1].outputs[21].weight,
                 network[0][1].outputs[22].weight,
                 network[0][1].outputs[23].weight,
                 network[0][1].outputs[24].weight,
                 network[0][1].outputs[25].weight,
                 network[0][1].outputs[26].weight,
                 network[0][1].outputs[27].weight,
                 network[0][1].outputs[28].weight,
                 network[0][1].outputs[29].weight,
                 network[0][1].outputs[30].weight,
                 network[0][1].outputs[31].weight,
                 network[0][1].outputs[32].weight,
                 network[0][1].outputs[33].weight,
                 network[0][1].outputs[34].weight,
                 network[0][1].outputs[35].weight,
                 network[0][1].outputs[36].weight,
                 network[0][1].outputs[37].weight,
                 network[0][1].outputs[38].weight,
                 network[0][1].outputs[39].weight,
                 network[0][1].outputs[40].weight,
                 network[0][1].outputs[41].weight,
                 network[0][1].outputs[42].weight,
                 network[0][1].outputs[43].weight,
                 network[0][1].outputs[44].weight,
                 network[0][1].outputs[45].weight,
                 network[0][1].outputs[46].weight,
                 network[0][1].outputs[47].weight,
                 network[0][1].outputs[48].weight,
                 network[0][1].outputs[49].weight,
                 network[0][1].outputs[50].weight,
                 network[0][1].outputs[51].weight,
                 network[0][1].outputs[52].weight,
                 network[0][1].outputs[53].weight,
                 network[0][1].outputs[54].weight,
                 network[0][1].outputs[55].weight,
                 network[0][1].outputs[56].weight,
                 network[0][1].outputs[57].weight,
                 network[0][1].outputs[58].weight,
                 network[0][1].outputs[59].weight,
                 network[0][1].outputs[60].weight,
                 network[0][1].outputs[61].weight,
                 network[0][1].outputs[62].weight,
                 network[0][1].outputs[63].weight,
                 network[0][1].outputs[64].weight,
                 network[0][1].outputs[65].weight,
                 network[0][1].outputs[66].weight,
                 network[0][1].outputs[67].weight,
                 network[0][1].outputs[68].weight,
                 network[0][1].outputs[69].weight,
                 network[0][1].outputs[70].weight,
                 network[0][1].outputs[71].weight,
                 network[0][1].outputs[72].weight,
                 network[0][1].outputs[73].weight,
                 network[0][1].outputs[74].weight,
                 network[0][1].outputs[75].weight,
                 network[0][1].outputs[76].weight,
                 network[0][1].outputs[77].weight,
                 network[0][1].outputs[78].weight,
                 network[0][1].outputs[79].weight,
                 network[0][1].outputs[80].weight,
                 network[0][1].outputs[81].weight,
                 network[0][1].outputs[82].weight,
                 network[0][1].outputs[83].weight,
                 network[0][1].outputs[84].weight,
                 network[0][1].outputs[85].weight,
                 network[0][1].outputs[86].weight,
                 network[0][1].outputs[87].weight,
                 network[0][1].outputs[88].weight,
                 network[0][1].outputs[89].weight,
                 network[0][1].outputs[90].weight,
                 network[0][1].outputs[91].weight,
                 network[0][1].outputs[92].weight,
                 network[0][1].outputs[93].weight,
                 network[0][1].outputs[94].weight,
                 network[0][1].outputs[95].weight,
                 network[0][1].outputs[96].weight,
                 network[0][1].outputs[97].weight,
                 network[0][1].outputs[98].weight,
                 network[0][1].outputs[99].weight]
                ])


    
            U = new _1.Matrix([[-0.03080219, -0.058920145, 0.07900661, 0.005848415, -0.074269205, -0.020283284, 0.011287916, 0.022534816, -0.15377715, -0.046062574, -0.042016927, -0.024312146, -0.07495392, -0.018744394, 0.027790062, -0.06912027, 0.013346607, -0.015974486, 0.00017091456, 0.013627605, -0.023767494, -0.18947683, 0.20583303, 0.08437277, 0.31510967, -0.089068234, 0.42997825, 0.065654926, 0.23896472, 0.15920734, -0.20293327, 0.26608866, -0.14313255, -0.030185184, -0.034050703, -0.009498264, 0.07094884, -0.07256596, 0.06998543, 0.047421858, -0.06582768, 0.075303175, -0.087485455, -0.0021291897, 0.08455138, 0.048305914, -0.021596452, 0.10346483, 0.08441916, 0.03270112, -0.009348406, 0.039114308, -0.04688585, -0.055606782, -0.023620078, 0.027705813, -0.032679796, -0.039136667, -0.024047477, 0.056022417, -0.091050446, 0.006415232, 0.020915806, 0.022409635, -0.019978158, 0.01132535, 0.037187863, -0.008014119, -0.019806731, 0.022802249, 0.006673483, 0.0064791217, -0.024117311, 0.05647125, -0.0034432847, -0.02381059, 0.0338198, -0.039364535, 0.0034127343, 0.037327323, 0.016931148, -0.015685601, -0.0077950885, -0.0025887312, -0.015192792, -0.0047968095, 0.029406546, -0.032990057, 0.026451176, -0.03881351, 0.0053887735, -0.042646877, -0.0242477, -0.035554856, -0.001204355, 0.021845724, -0.02187002, -0.0036756592, 0.0018207482, -0.0032259335, 0.011834593, 0.0025703604, -0.0077979974, 0.012069734, -0.007784887, 0.018157406, -0.025881253, 0.005926214, -0.01427427, 0.019867865, 0.021711439, 0.061128326, 0.045603722, 0.0030334904, 0.026041772, 0.015509168, 0.046334106, -0.04070132, -0.010254996, -0.0026662175, 0.0148687195, 0.028844714, 0.043625783, -0.04364524, -0.013231429, -0.006214511, 0.008635334, -0.009653627, 0.008795718, 0.006436241, -0.011022522, -0.00700829, -0.0007916419, -0.009158414, 0.0072241398, 0.020500366, -0.008528598, -0.025126293, -0.005067903, -0.03435021, -0.031804357, 0.02015822, 0.009833177, -0.008306892, 0.0030000603, 0.015659554, -0.011557964, -0.004570844, 0.023575243, 0.0005889873, -0.018061737, -0.016474254, -0.0002903454, 0.004996223, -0.01065244, 0.014584178, -0.015298645, -0.017046727, 0.029404903, 0.025929041, -0.016337005, 0.018452378, -0.0068365782, 0.016527683, -0.028184092, -0.042329416, -0.0031848438, 0.0040669357, -0.023793241, -0.003447498, -0.019380588, 0.02822869, 0.014153571, 0.013216714, -0.004641557, 0.013020612, 0.024942022, -0.018291948, -0.03224117, 0.008226392, -0.0046445876, 0.010347256, 0.026411705, 0.005499926, -0.0004929985, 0.0054383683, -0.010566109, 0.04349978, -0.0018636982, 0.03640121, 0.0064870697, 0.007144683, -0.025228724, 0.021223795, -0.00016109284, -0.015525123, -0.0022759316, -0.012105087, -0.035470936, -0.021935297, -0.011931957, 0.0052709384, -0.016466456, -0.008562239, -0.006045803, -0.008594583, 0.0046837716, 0.020222057, 0.011850823, -0.029677521, 0.022159489, 0.0029072808, 0.01983054, 0.026383756, 0.00902457, -0.006268833, 0.0020297002, 0.010971334, 0.021093877, 0.015855215, 0.0070376643, 0.025752107, -0.00463355, -0.031584874, 0.042808738, 0.0016806296, -0.0038096725, -0.04928017, 0.025477491, 4.5064546e-05, 0.0075089033, 0.01132921, 0.017472316, 0.022185927, -0.0048110704, -0.0039436184, 0.0040065283, 0.0036217899, -0.014299509, -0.021994399, -0.022624804, 0.0020606252, 0.009970238, -0.002835098, 0.007148192, -0.010813326, -0.03703256, -0.013304209, 0.012546297, -0.019530844, -0.0005409005, 0.011796182, 0.017804123, 0.01314909, 0.050102383, -0.0032011892, 0.0065227402, -0.02161352, -0.024255868, 0.022824652, 0.002791989, -0.0040085325, 0.036522944, 0.0005532801, 0.0086047705, 0.009802153, 0.03817318, 0.009692564, 0.035303734, 0.020131553, -0.0047704806, -0.0075221094, -0.008802747, -0.014631468, -0.034306318, 0.0035502638, 0.004943343, -0.016587406, -0.0197121, 0.009569147, 0.008898312, 0.027201634, -0.0047564013, -0.029240116, 0.0028199628, 0.015832929, -0.014334371, -0.0062456494, 0.018775983, 0.01615748, 0.019176755, 0.012751007, -0.0029890002, -0.0050785504, -0.018554796, 0.0031121306, -0.016798344, -0.2594174, -0.30454016, 0.0124877505],
                               [-0.0691156, -0.053918697, 0.020044886, -0.06243177, 0.07004285, -0.008250371, 0.016794562, -0.02001296, 0.0025250316, -0.07210758, 0.049034588, -0.04822453, 0.033218272, 0.02107615, -0.11002591, 0.014182667, -0.08941509, 0.020356257, -0.04865471, -0.0032142983, -0.045971557, 0.13169207, -0.12277991, -0.05769822, 0.04766262, -0.036140583, 0.13871881, -0.05017074, -0.010633199, -0.005067248, -0.046216667, -0.09279704, -0.149134, -0.010822589, -0.0012427205, 0.050091375, -0.1472535, 0.076244935, -0.07693048, 0.012888991, 0.009647751, -0.0119978795, 0.000460485, 0.035676457, 0.07713794, 0.015503421, -0.07827225, 0.053940568, 0.044261537, 0.087896265, -0.036622725, -0.06832743, 0.14690188, 0.004265765, -0.032934725, 0.030131437, 0.017370256, -0.026830101, 0.027656395, -0.15394437, 0.04125876, 0.026181476, -0.04666805, -0.0016135189, 0.027233947, 0.04359966, -0.06816041, 0.06602378, -0.06399039, -0.00039855787, 0.12606822, 0.05070381, 0.0069889827, 0.091018684, 0.037619937, -0.016831946, 0.09765779, 0.0016364781, -0.05721521, 0.036782496, -0.020816097, -0.12377371, 0.07027197, 0.081926376, 0.034685053, -0.040696852, -0.055293344, 0.10171293, -0.040506408, -0.09214336, -0.010287257, 0.029259631, 0.01524075, 0.0055332975, 0.06480908, -0.004338666, 0.027412068, -0.0347078, -0.018434063, 0.063584805, 0.114443906, -0.03747526, -0.07731081, 0.01919401, -0.0665323, -0.05450428, 0.038386982, -0.019386593, 0.069912605, -0.03380832, 0.039544936, -0.03339972, 0.019411497, 0.059982073, 0.0049847704, -0.01565692, 0.016283035, 0.045543686, -0.02659031, -0.07641426, 0.059633583, 0.1297104, 0.10863142, 0.06377917, -0.056336556, 0.0039046938, -0.019371971, -0.02548086, -0.04767348, -0.0613251, 0.046562087, 0.0029072675, 0.07101986, -0.047467064, -0.057252742, -0.08662601, -0.13116714, 0.080685005, -0.07161577, 0.034152705, -0.026937101, 0.087151475, -0.025926128, -0.0027873595, -0.030518128, 0.026455317, 0.013324121, 0.051397003, 0.061171666, 0.057633217, 0.11909726, -0.01757689, 0.024659673, 0.008616484, 0.013597934, 0.041292697, 0.029119706, -0.01777767, -0.002145294, -0.03891641, -0.16002454, 0.075702235, -0.03145096, -0.004822607, 0.06604239, -0.0069545973, -0.049012844, 0.044229455, 0.13195872, 0.046179574, 0.0051320624, 0.020888282, 0.039693147, -0.011274165, -0.037033077, -0.018935867, -0.044581227, -0.06510661, 0.044140548, 0.0042430563, -0.08646644, 0.061021615, -0.056225587, 0.027064888, 0.037462298, 0.048564196, 0.048053823, -0.08741807, 0.0058486783, 0.016039738, -0.0095419595, -0.0024869344, -0.039463677, 0.055652164, 0.0822872, 0.024326906, 0.016342979, 0.04583754, 0.01761065, 0.09933887, -0.0021993513, 0.03824517, 0.041371215, -0.09860986, 0.015694253, -0.029825807, -0.009217662, -0.095309705, 0.033833392, -0.032263875, -0.03421286, -0.03554747, 0.053635135, 0.079248406, 0.1096336, 0.08580527, -0.036893878, -0.10659447, 0.01662727, 0.011971317, -0.06648815, 0.07984918, 0.0005120118, 0.053767614, 0.011892, -0.030931, 0.0001107821, -0.020471737, -0.017191159, 0.033596154, -0.11763812, -0.05430614, 0.028232696, -0.06579515, 0.02447553, -0.017096834, 0.025061127, 0.012849799, 0.0057448493, -0.1136234, 0.04205633, -0.028101567, 0.020678572, -0.0415645, -0.016905267, 0.021982819, 0.03511301, -0.07000661, 0.07500857, 0.023965472, -0.13459268, -0.12043183, -0.046986356, 0.05449671, -0.027701061, -0.025782904, -0.017330687, 0.035880797, 0.014895752, 0.042348508, -0.059321914, -0.096362434, -0.08058617, -0.0308778, 0.0014528204, 0.02202358, 0.019064253, -0.051414963, 0.030142145, -0.074101344, 0.016789509, 0.042974368, 0.10336757, 0.015380642, -0.012914944, 0.044724647, 0.06885483, 0.02903416, -0.014165669, 0.0360493, 0.032990538, -0.05797409, 0.020456856, 0.02284636, 0.0031612674, -0.038289275, 0.04819416, 0.04728497, -0.046434317, -0.09535805, 0.03806586, -0.034903973, -0.07654996, 0.009598282, 0.019692687, -0.024460234, 0.04817959, -0.037860367, -0.025682243, -0.1313185]])

            var _a = getLoss(network, trainData),
                lossTrain = _a.lossTrain;
            _a.per_example_grad;
            train_loss = lossTrain;

            var y_hat = new _1.Matrix([_a.all_outputs])
            var Zs = _1.Matrix.dot(y_hat, U.transpose()).data

            sv1 = Math.abs(Zs[0][0]), sv2 = Math.abs(Zs[0][1]), drawNetwork(network), updateUI(!0, 0)
        }

        function generateData(firstTime) {
            void 0 === firstTime && (firstTime = !1), firstTime || (state.seed = Math.random().toFixed(5), state.serialize(), userHasInteracted()), Math.seedrandom(state.seed);
            var numSamples = state.problem === state_1.Problem.REGRESSION ? NUM_SAMPLES_REGRESS : NUM_SAMPLES_CLASSIFY,
                generator = state.problem === state_1.Problem.CLASSIFICATION ? state.dataset : state.regDataset,
                data = generator(numSamples, state.noise / 100);
            // dataset_1.shuffle(data);
            var splitIndex = Math.floor(data.length * state.percTrainData / 100);
            trainData = data.slice(0, splitIndex), heatMap.updatePoints(trainData), heatMap.updateTestPoints(state.showTestData ? testData : []);
            testData = generator(numSamples, 0.0);
        }

        function userHasInteracted() {
            if (firstInteraction) {
                firstInteraction = !1;
                var page = "index";
                null != state.tutorial && "" !== state.tutorial && (page = "/v/tutorials/" + state.tutorial), ga("set", "page", page), ga("send", "pageview", {
                    sessionControl: "start"
                })
            }
        }

        function simulationStarted() {
            ga("send", {
                hitType: "event",
                eventCategory: "Starting Simulation",
                eventAction: parametersChanged ? "changed" : "unchanged",
                eventLabel: null == state.tutorial ? "" : state.tutorial
            }), parametersChanged = !1
        }
        exports.__esModule = !0;
        var mainWidth, nn = require("./nn"),
            _1 = require("."),
            heatmap_1 = require("./heatmap"),
            state_1 = require("./state"),
            dataset_1 = require("./dataset"),
            linechart_1 = require("./linechart"),
            linechart2_1 = require("./linechart2"),
            d3 = require("d3");
        d3.select(".more button").on("click", function() {
            d3.transition().duration(1e3).tween("scroll", scrollTween(800))
        });
        var HoverType, RECT_SIZE = 30,
            NUM_SAMPLES_CLASSIFY = 6,
            NUM_SAMPLES_REGRESS = 1200,
            DENSITY = 70;
        ! function(HoverType) {
            HoverType[HoverType.BIAS = 0] = "BIAS", HoverType[HoverType.WEIGHT = 1] = "WEIGHT"
        }(HoverType || (HoverType = {}));
        var INPUTS = {
                x: {
                    f: function(x, y) {
                        return x
                    },
                    label: "X_1"
                },
                y: {
                    f: function(x, y) {
                        return y
                    },
                    label: "X_2"
                },
                xSquared: {
                    f: function(x, y) {
                        return x * x
                    },
                    label: "X_1^2"
                },
                ySquared: {
                    f: function(x, y) {
                        return y * y
                    },
                    label: "X_2^2"
                },
                xTimesY: {
                    f: function(x, y) {
                        return x * y
                    },
                    label: "X_1X_2"
                },
                sinX: {
                    f: function(x, y) {
                        return Math.sin(x)
                    },
                    label: "sin(X_1)"
                },
                sinY: {
                    f: function(x, y) {
                        return Math.sin(y)
                    },
                    label: "sin(X_2)"
                }
            },
            // HIDABLE_CONTROLS = [
            //     ["Show test data", "showTestData"],
            //     ["Discretize output", "discretize"],
            //     ["Play button", "playButton"],
            //     ["Step button", "stepButton"],
            //     ["Reset button", "resetButton"],
            //     ["Learning rate", "learningRate"],
            //     ["Activation", "activation"],
            //     ["Regularization", "regularization"],
            //     ["Regularization rate", "regularizationRate"],
            //     ["Problem type", "problem"],
            //     ["Which dataset", "dataset"],
            //     ["Ratio train data", "percTrainData"],
            //     ["Noise level", "noise"],
            //     ["Batch size", "batchSize"],
            //     ["# of hidden layers", "numHiddenLayers"]
            // ],
            Player = function() {
                function Player() {
                    this.timerIndex = 0, this.isPlaying = !1, this.callback = null
                }
                return Player.prototype.playOrPause = function() {
                    this.isPlaying ? (this.isPlaying = !1, this.pause()) : (this.isPlaying = !0, 0 === iter && simulationStarted(), this.play())
                }, Player.prototype.onPlayPause = function(callback) {
                    this.callback = callback
                }, Player.prototype.play = function() {
                    this.pause(), this.isPlaying = !0, this.callback && this.callback(this.isPlaying), this.start(this.timerIndex)
                }, Player.prototype.pause = function() {
                    this.timerIndex++, this.isPlaying = !1, this.callback && this.callback(this.isPlaying)
                }, Player.prototype.start = function(localTimerIndex) {
                    var _this = this;
                    d3.timer(function() {
                        return localTimerIndex < _this.timerIndex || (oneStep(), !1)
                    }, 0)
                }, Player
            }(),
            state = state_1.State.deserializeState();
        state.getHiddenProps().forEach(function(prop) {
            prop in INPUTS && delete INPUTS[prop]
        });
        var boundary = {},
            selectedNodeId = null,
            xDomain = [-5, 5],
            yDomain = [-5, 5],
            heatMap = new heatmap_1.HeatMap(300, 300, DENSITY, xDomain, yDomain, d3.select("#heatmap"), {
                showAxes: !1
            }),
            linkWidthScale = d3.scale.linear().domain([0, 5]).range([1, 10]).clamp(!0),
            colorScale = d3.scale.linear().domain([-1, 0, 1]).range(["#f59322", "#e8eaeb", "#0877bd"]).clamp(!0),
            iter = 0,
            trainData = [],
            testData = [],
            network = null,
            train_loss = 0,
            sv1 = 0,
            sv2 = 0,
            U,
            lossTest = 0,
            player = new Player,
            lineChart = new linechart_1.AppendingLineChart(d3.select("#linechart"), ["#447D5A", "#DC8A46"]),
            lineChart2 = new linechart2_1.AppendingLineChart2(d3.select("#linechart2"), ["#002452"]);
        exports.getOutputWeights = getOutputWeights;
        var firstInteraction = !0,
            parametersChanged = !1;
        ! function() {
            if (null != state.tutorial && "" !== state.tutorial && !state.hideText) {
                d3.selectAll("article div.l--body").remove();
                var tutorial = d3.select("article").append("div").attr("class", "l--body");
                d3.html("tutorials/" + state.tutorial + ".html", function(err, htmlFragment) {
                    if (err) throw err;
                    tutorial.node().appendChild(htmlFragment);
                    var title = tutorial.select("title");
                    title.size() && (d3.select("header h1").style({
                        "margin-top": "20px",
                        "margin-bottom": "20px"
                    }).text(title.text()), document.title = title.text())
                })
            }
        }(),
        function() {
            d3.select("#reset-button").on("click", function() {
                reset(), userHasInteracted(), d3.select("#play-pause-button")
            }), d3.select("#play-pause-button").on("click", function() {
                userHasInteracted(), player.playOrPause()
            }), player.onPlayPause(function(isPlaying) {
                d3.select("#play-pause-button").classed("playing", isPlaying)
            }), d3.select("#next-step-button").on("click", function() {
                player.pause(), userHasInteracted(), 0 === iter && simulationStarted(), oneStep()
            }), d3.select("#data-regen-button").on("click", function() {
                generateData(), parametersChanged = !0
            });
            var dataThumbnails = d3.selectAll("canvas[data-dataset]");
            dataThumbnails.on("click", function() {
                var newDataset = state_1.datasets[this.dataset.dataset];
                newDataset !== state.dataset && (state.dataset = newDataset, dataThumbnails.classed("selected", !1), d3.select(this).classed("selected", !0), generateData(), parametersChanged = !0, reset())
            });
            var datasetKey = state_1.getKeyFromValue(state_1.datasets, state.dataset);
            d3.select("canvas[data-dataset=" + datasetKey + "]").classed("selected", !0);
            var regDataThumbnails = d3.selectAll("canvas[data-regDataset]");
            regDataThumbnails.on("click", function() {
                var newDataset = state_1.regDatasets[this.dataset.regdataset];
                newDataset !== state.regDataset && (state.regDataset = newDataset, regDataThumbnails.classed("selected", !1), d3.select(this).classed("selected", !0), generateData(), parametersChanged = !0, reset())
            });
            var regDatasetKey = state_1.getKeyFromValue(state_1.regDatasets, state.regDataset);
            d3.select("canvas[data-regDataset=" + regDatasetKey + "]").classed("selected", !0), d3.select("#add-layers").on("click", function() {
                state.numHiddenLayers >= 6 || (state.networkShape[state.numHiddenLayers] = 2, state.numHiddenLayers++, parametersChanged = !0, reset())
            }), d3.select("#remove-layers").on("click", function() {
                state.numHiddenLayers <= 0 || (state.numHiddenLayers--, state.networkShape.splice(state.numHiddenLayers), parametersChanged = !0, reset())
            }), d3.select("#show-test-data").on("change", function() {
                state.showTestData = this.checked, state.serialize(), userHasInteracted(), heatMap.updateTestPoints(state.showTestData ? testData : [])
            }).property("checked", state.showTestData), d3.select("#discretize").on("change", function() {
                state.discretize = this.checked, state.serialize(), userHasInteracted(), updateUI(0, 0)
            }).property("checked", state.discretize), d3.select("#percTrainData").on("input", function() {
                state.percTrainData = this.value, d3.select("label[for='percTrainData'] .value").text(this.value), generateData(), parametersChanged = !0, reset()
            }).property("value", state.percTrainData), d3.select("label[for='percTrainData'] .value").text(state.percTrainData);
            var noise = d3.select("#noise").on("input", function() {
                    // console.log('hi');
                    state.lr_iter = 0;
                    state.noise = this.value, d3.select("label[for='noise'] .value").text(this.value), generateData(), parametersChanged = !0
                }),
                currentMax = parseInt(noise.property("max"));
            state.noise > currentMax ? state.noise <= 80 ? noise.property("max", state.noise) : state.noise = 50 : state.noise < 0 && (state.noise = 0), noise.property("value", state.noise), d3.select("label[for='noise'] .value").text(state.noise), d3.select("#batchSize").on("input", function() {
                state.batchSize = this.value, d3.select("label[for='batchSize'] .value").text(this.value), parametersChanged = !0, reset()
            }).property("value", state.batchSize), d3.select("label[for='batchSize'] .value").text(state.batchSize), d3.select("#activations").on("change", function() {
                state.activation = state_1.activations[this.value], parametersChanged = !0, reset()
            }).property("value", state_1.getKeyFromValue(state_1.activations, state.activation)), d3.select("#learningRate").on("change", function() {
                state.learningRate = +this.value, state.serialize(), userHasInteracted(), parametersChanged = !0
            }).property("value", state.learningRate), d3.select("#regularizations").on("change", function() {
                state.regularization = state_1.regularizations[this.value], generateData(), parametersChanged = !0, state.regularizationRate=10, state.lr_iter = 0;
                // reset()



            }).property("value", state_1.getKeyFromValue(state_1.regularizations, state.regularization)), d3.select("#regularRate").on("change", function() {
                state.regularizationRate = +this.value, parametersChanged = !0, reset()
            }).property("value", state.regularizationRate), d3.select("#problem").on("change", function() {
                state.problem = state_1.problems[this.value], generateData(), parametersChanged = !0, reset()
            }).property("value", state_1.getKeyFromValue(state_1.problems, state.problem));
            var x = d3.scale.linear().domain([-1, 1]).range([0, 144]),
                xAxis = d3.svg.axis().scale(x).orient("bottom").tickValues([-1, 0, 1]).tickFormat(d3.format("d"));
            d3.select("#colormap g.core").append("g").attr("class", "x axis").attr("transform", "translate(0,10)").call(xAxis), window.addEventListener("resize", function() {
                var newWidth = document.querySelector("#main-part").getBoundingClientRect().width;
                newWidth !== mainWidth && (mainWidth = newWidth)
            }), state.hideText && (d3.select("#article-text").style("display", "none"), d3.select("div.more").style("display", "none"), d3.select("header").style("display", "none"))
        }(), generateData(!0), reset(!0),
            function() {
                var hiddenProps = state.getHiddenProps();
                hiddenProps.forEach(function(prop) {
                    var controls = d3.selectAll(".ui-" + prop);
                    0 === controls.size() && console.warn("0 html elements found with class .ui-" + prop), controls.style("display", "none")
                });
                var hideControls = d3.select(".hide-controls");
                d3.select(".hide-controls-link").attr("href", window.location.href)
            }()
    }, {
        ".": 4,
        "./dataset": 2,
        "./heatmap": 3,
        "./linechart": 6,
        "./linechart2": 7,
        "./nn": 9,
        "./state": 11,
        d3: 1
    }],
    11: [function(require, module, exports) {
        "use strict";

        function getKeyFromValue(obj, value) {
            for (var key in obj)
                if (obj[key] === value) return key
        }

        function endsWith(s, suffix) {
            return s.substr(-suffix.length) === suffix
        }

        function getHideProps(obj) {
            var result = [];
            for (var prop in obj) endsWith(prop, HIDE_STATE_SUFFIX) && result.push(prop);
            return result
        }
        exports.__esModule = !0;
        var nn = require("./nn"),
            dataset = require("./dataset"),
            HIDE_STATE_SUFFIX = "_hide";
        exports.activations = {
            relu: nn.Activations.RELU,
            tanh: nn.Activations.TANH,
            sigmoid: nn.Activations.SIGMOID,
            linear: nn.Activations.LINEAR
        }, exports.regularizations = {
            none: null,
            Weight_Decay: 'WD',
            Spectral_Decoupling: 'SD'
        }, exports.datasets = {
            circle: dataset.classifyCircleData,
            xor: dataset.classifyXORData,
            gauss: dataset.classifyTwoGaussData,
            spiral: dataset.classifySpiralData
        }, exports.regDatasets = {
            "reg-plane": dataset.regressPlane,
            "reg-gauss": dataset.regressGaussian
        }, exports.getKeyFromValue = getKeyFromValue;
        var Type;
        ! function(Type) {
            Type[Type.STRING = 0] = "STRING", Type[Type.NUMBER = 1] = "NUMBER", Type[Type.ARRAY_NUMBER = 2] = "ARRAY_NUMBER", Type[Type.ARRAY_STRING = 3] = "ARRAY_STRING", Type[Type.BOOLEAN = 4] = "BOOLEAN", Type[Type.OBJECT = 5] = "OBJECT"
        }(Type = exports.Type || (exports.Type = {}));
        var Problem;
        ! function(Problem) {
            Problem[Problem.CLASSIFICATION = 0] = "CLASSIFICATION", Problem[Problem.REGRESSION = 1] = "REGRESSION"
        }(Problem = exports.Problem || (exports.Problem = {})), exports.problems = {
            classification: Problem.CLASSIFICATION,
            regression: Problem.REGRESSION
        };
        var State = function() {
            function State() {
                this.lr_iter = 0,
                this.learningRate = 0.01,
                this.regularizationRate = 0,
                this.showTestData = !1,
                this.noise = 0,
                this.batchSize = 300,
                this.discretize = !1,
                this.tutorial = null,
                this.percTrainData = 100,
                this.activation = nn.Activations.TANH,
                this.regularization = null,
                this.problem = Problem.CLASSIFICATION,
                this.initZero = !1,
                this.hideText = !1,
                this.collectStats = !1,
                this.numHiddenLayers = 1,
                this.hiddenLayerControls = [],
                this.networkShape = [100],
                this.x = !0,
                this.y = !0,
                this.xTimesY = !1,
                this.xSquared = !1,
                this.ySquared = !1,
                this.cosX = !1,
                this.sinX = !1,
                this.cosY = !1,
                this.sinY = !1,
                this.dataset = dataset.classifyCircleData,
                this.regDataset = dataset.regressPlane
            }
            return State.deserializeState = function() {
                function hasKey(name) {
                    return name in map && null != map[name] && "" !== map[name].trim()
                }

                function parseArray(value) {
                    return "" === value.trim() ? [] : value.split(",")
                }
                for (var map = {}, _i = 0, _a = window.location.hash.slice(1).split("&"); _i < _a.length; _i++) {
                    var keyvalue = _a[_i],
                        _b = keyvalue.split("="),
                        name_1 = _b[0],
                        value = _b[1];
                    map[name_1] = value
                }
                var state = new State;
                return State.PROPS.forEach(function(_a) {
                    var name = _a.name,
                        type = _a.type,
                        keyMap = _a.keyMap;
                    switch (type) {
                        case Type.OBJECT:
                            if (null == keyMap) throw Error("A key-value map must be provided for state variables of type Object");
                            hasKey(name) && map[name] in keyMap && (state[name] = keyMap[map[name]]);
                            break;
                        case Type.NUMBER:
                            hasKey(name) && (state[name] = +map[name]);
                            break;
                        case Type.STRING:
                            hasKey(name) && (state[name] = map[name]);
                            break;
                        case Type.BOOLEAN:
                            hasKey(name) && (state[name] = "false" !== map[name]);
                            break;
                        case Type.ARRAY_NUMBER:
                            name in map && (state[name] = parseArray(map[name]).map(Number));
                            break;
                        case Type.ARRAY_STRING:
                            name in map && (state[name] = parseArray(map[name]));
                            break;
                        default:
                            throw Error("Encountered an unknown type for a state variable")
                    }
                }), getHideProps(map).forEach(function(prop) {
                    state[prop] = "true" === map[prop]
                }), state.numHiddenLayers = state.networkShape.length, null == state.seed && (state.seed = Math.random().toFixed(5)), Math.seedrandom(state.seed), state
            }, State.prototype.serialize = function() {
                var _this = this,
                    props = [];
                State.PROPS.forEach(function(_a) {
                    var name = _a.name,
                        type = _a.type,
                        keyMap = _a.keyMap,
                        value = _this[name];
                    null != value && (type === Type.OBJECT ? value = getKeyFromValue(keyMap, value) : type !== Type.ARRAY_NUMBER && type !== Type.ARRAY_STRING || (value = value.join(",")), props.push(name + "=" + value))
                }), getHideProps(this).forEach(function(prop) {
                    props.push(prop + "=" + _this[prop])
                }), window.location.hash = props.join("&")
            }, State.prototype.getHiddenProps = function() {
                var result = [];
                for (var prop in this) endsWith(prop, HIDE_STATE_SUFFIX) && "true" === String(this[prop]) && result.push(prop.replace(HIDE_STATE_SUFFIX, ""));
                return result
            }, State.prototype.setHideProperty = function(name, hidden) {
                this[name + HIDE_STATE_SUFFIX] = hidden
            }, State.PROPS = [], State
        }();
        exports.State = State
    }, {
        "./dataset": 2,
        "./nn": 9
    }],
    12: [function(require, module, exports) {
        "use strict";
        exports.__esModule = !0;
        var Utils = function() {
            function Utils() {}
            return Utils.isEqual = function(op1, op2) {
                return Math.abs(op1 - op2) < Utils.EPSILON
            }, Utils.permutation = function(arr, index, inv, callback) {
                var _a, _b, _len = arr.length;
                if (_len === index) callback(arr, inv);
                else
                    for (var i = index; i < _len; i++) _a = [arr[index], arr[i]], arr[i] = _a[0], arr[index] = _a[1], Utils.permutation(arr, index + 1, inv * (i === index ? 1 : -1), callback), _b = [arr[index], arr[i]], arr[i] = _b[0], arr[index] = _b[1]
            }, Utils.columnOf = function(arr, i) {
                return arr.map(function(x) {
                    return x[i]
                })
            }, Utils.transpose2D = function(arr) {
                return arr[0].map(function(col, i) {
                    return arr.map(function(row) {
                        return row[i]
                    })
                })
            }, Utils.EPSILON = 1e-15, Utils
        }();
        exports.Utils = Utils
    }, {}],
    13: [function(require, module, exports) {
        "use strict";
        exports.__esModule = !0;
        var matrix_1 = require("./matrix"),
            linalg_1 = require("./linalg"),
            Vector = function() {
                function Vector(arg) {
                    if (arg instanceof Array) this.data = arg.slice(), this.length = arg.length;
                    else {
                        this.data = new Array(arg), this.length = arg;
                        for (var i = 0; i < arg; i++) this.data[i] = 0
                    }
                }
                return Vector.elementWiseOP = function(arg1, arg2, arg3) {
                    var vec = new Vector(arg1.data);
                    switch (typeof arg2) {
                        case "number":
                            for (var i = 0; i < vec.length; i++) vec.data[i] = arg3(vec.data[i], arg2);
                            break;
                        case "function":
                            for (var i = 0; i < vec.length; i++) vec.data[i] = arg2(vec.data[i]);
                            break;
                        default:
                            if (!(arg2 instanceof Vector) || "function" != typeof arg3) throw "type error";
                            if (vec.length !== arg2.length) throw "size mismatch";
                            for (var i = 0; i < vec.length; i++) vec.data[i] = arg3(vec.data[i], arg2.data[i])
                    }
                    return vec
                }, Vector.neg = function(vec) {
                    return Vector.elementWiseOP(vec, function(op) {
                        return -op
                    })
                }, Vector.add = function(vec, other) {
                    return Vector.elementWiseOP(vec, other, function(op1, op2) {
                        return op1 + op2
                    })
                }, Vector.sub = function(vec, other) {
                    return Vector.elementWiseOP(vec, other, function(op1, op2) {
                        return op1 - op2
                    })
                }, Vector.mul = function(vec, other) {
                    return Vector.elementWiseOP(vec, other, function(op1, op2) {
                        return op1 / op2
                    })
                }, Vector.div = function(vec, other) {
                    return Vector.elementWiseOP(vec, other, function(op1, op2) {
                        return op1 / op2
                    })
                }, Vector.toMatrix = function(vecList) {
                    for (var data = new Array(vecList.length), i = 0; i < data.length; i++) data[i] = vecList[i].data.slice();
                    return new matrix_1.Matrix(data)
                }, Vector.dot = function(op1, op2) {
                    return linalg_1.LinAlg.dot(op1, op2)
                }, Vector.cross = function(op1, op2) {
                    var vec = new Vector(3);
                    if (3 !== op1.length || 3 !== op2.length) throw "both operands must be 3 element vector.";
                    return vec.data[0] = op1.data[1] * op2.data[2] - op1.data[2] * op2.data[1], vec.data[1] = op1.data[2] * op2.data[0] - op1.data[0] * op2.data[2], vec.data[2] = op1.data[0] * op2.data[1] - op1.data[1] * op2.data[0], vec
                }, Vector.outer = function(op1, op2) {
                    for (var m = op1.length, n = op2.length, mat = new matrix_1.Matrix(m, n), i = 0; i < m; i++)
                        for (var j = 0; j < n; j++) mat.data[i][j] = op1.data[i] * op2.data[j];
                    return mat
                }, Vector.concat = function(op1, op2) {
                    var vec = new Vector(op1.data);
                    return vec.data.concat(op2.data), vec.length += op2.length, vec
                }, Vector.subVector = function(vec, start, len) {
                    return void 0 === start && (start = 0), void 0 === len && (len = vec.length), new Vector(vec.data.slice(start, start + len))
                }, Vector.norm = function(vec, n) {
                    if (void 0 === n && (n = 2), n === 1 / 0) return Math.max.apply(Math, vec.data.map(function(x) {
                        return Math.abs(x)
                    }));
                    if (n === -1 / 0) return Math.min.apply(Math, vec.data.map(function(x) {
                        return Math.abs(x)
                    }));
                    for (var sum = 0, i = 0; i < vec.length; i++) sum += Math.pow(Math.abs(vec.data[i]), n);
                    return Math.pow(sum, 1 / n)
                }, Vector.randomUnitVector = function(len) {
                    for (var arr = new Array(len), sqSum = 0, i = 0; i < len; i++) arr[i] = Math.random() - .5, sqSum += arr[i] * arr[i];
                    sqSum = Math.sqrt(sqSum);
                    for (var i = 0; i < len; i++) arr[i] /= sqSum;
                    return new Vector(arr)
                }, Vector.prototype.elementWiseOP = function(arg1, arg2) {
                    return Vector.elementWiseOP(this, arg1, arg2)
                }, Vector.prototype.neg = function() {
                    return Vector.neg(this)
                }, Vector.prototype.add = function(other) {
                    return Vector.elementWiseOP(this, other, function(op1, op2) {
                        return op1 + op2
                    })
                }, Vector.prototype.sub = function(other) {
                    return Vector.elementWiseOP(this, other, function(op1, op2) {
                        return op1 - op2
                    })
                }, Vector.prototype.mul = function(other) {
                    return Vector.elementWiseOP(this, other, function(op1, op2) {
                        return op1 * op2
                    })
                }, Vector.prototype.div = function(other) {
                    return Vector.elementWiseOP(this, other, function(op1, op2) {
                        return op1 / op2
                    })
                }, Vector.prototype.norm = function(n) {
                    return void 0 === n && (n = 2), Vector.norm(this, n)
                }, Vector.prototype.toMatrix = function(col) {
                    void 0 === col && (col = !0);
                    var mat = Vector.toMatrix([this]);
                    return col && (mat = mat.transpose()), mat
                }, Vector.prototype.transpose = function() {
                    return this.toMatrix(!1)
                }, Vector.prototype.dot = function(other) {
                    return linalg_1.LinAlg.dot(this, other)
                }, Vector.prototype.outer = function(other) {
                    return Vector.outer(this, other)
                }, Vector.prototype.cross = function(other) {
                    return Vector.cross(this, other)
                }, Vector.prototype.copy = function() {
                    return new Vector(this.data)
                }, Vector.prototype.concat = function(other) {
                    return Vector.concat(this, other)
                }, Vector.prototype.subVector = function(start, len) {
                    return void 0 === start && (start = 0), void 0 === len && (len = this.length), Vector.subVector(this, start, len)
                }, Vector
            }();
        exports.Vector = Vector
    }, {
        "./linalg": 5,
        "./matrix": 8
    }]
}, {}, [10]);


var data = [{
   x: Array.from(Array(100).keys()),
   y: bce_l2[0],
   line: {
     color: '#2E7F58',
     simplify: false,
   }
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l2[1],
   line: {
     color: '#EA8533',
     simplify: false,
   }
 },



 {
   x: Array.from(Array(100).keys()),
   y: sd_l2[0].map(function(x) { return x * 0.96; }),
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#2E7F58',
     simplify: false,
   }
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l2[1],
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#EA8533',
     simplify: false,
   }
 },




 // {
 //   x: Array.from(Array(100).keys()),
 //   y: mse_l2[0],
 //   xaxis: 'x3',
 //   yaxis: 'y3',
 //   line: {
 //     color: '#2E7F58',
 //     simplify: false,
 //   }
 // },{
 //   x: Array.from(Array(100).keys()),
 //   y: mse_l2[1],
 //   xaxis: 'x3',
 //   yaxis: 'y3',
 //   line: {
 //     color: '#EA8533',
 //     simplify: false,
 //   }
 // },





{
   x: Array.from(Array(100).keys()),
   y: bce_l2[0],
   line: {
     color: '#2E7F58',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l4[0],
   line: {
     color: '#2E7F58',
     simplify: false,
   },
   opacity: 0.1
},{
   x: Array.from(Array(100).keys()),
   y: bce_l6[0],
   line: {
     color: '#2E7F58',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l8[0],
   line: {
     color: '#2E7F58',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l2[1],
   line: {
     color: '#EA8533',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l4[1],
   line: {
     color: '#EA8533',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l6[1],
   line: {
     color: '#EA8533',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l8[1],
   line: {
     color: '#EA8533',
     simplify: false,
   },
   opacity: 0.1
 },



  {
   x: Array.from(Array(100).keys()),
   y: sd_l2[0].map(function(x) { return x * 0.96; }),
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#2E7F58',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l4[0].map(function(x) { return x * 0.96; }),
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#2E7F58',
     simplify: false,
   },
   opacity: 0.1
},{
   x: Array.from(Array(100).keys()),
   y: sd_l6[0].map(function(x) { return x * 0.96; }),
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#2E7F58',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l8[0].map(function(x) { return x * 0.96; }),
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#2E7F58',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l2[1],
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#EA8533',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l4[1],
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#EA8533',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l6[1],
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#EA8533',
     simplify: false,
   },
   opacity: 0.1
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l8[1],
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#EA8533',
     simplify: false,
   },
   opacity: 0.1
 },





//   {
//    x: Array.from(Array(100).keys()),
//    y: mse_l2[0],
//    xaxis: 'x3',
//    yaxis: 'y3',
//    line: {
//      color: '#2E7F58',
//      simplify: false,
//    },
//    opacity: 0.1
//  },{
//    x: Array.from(Array(100).keys()),
//    y: mse_l4[0],
//    xaxis: 'x3',
//    yaxis: 'y3',
//    line: {
//      color: '#2E7F58',
//      simplify: false,
//    },
//    opacity: 0.1
// },{
//    x: Array.from(Array(100).keys()),
//    y: mse_l6[0],
//    xaxis: 'x3',
//    yaxis: 'y3',
//    line: {
//      color: '#2E7F58',
//      simplify: false,
//    },
//    opacity: 0.1
//  },{
//    x: Array.from(Array(100).keys()),
//    y: mse_l8[0],
//    xaxis: 'x3',
//    yaxis: 'y3',
//    line: {
//      color: '#2E7F58',
//      simplify: false,
//    },
//    opacity: 0.1
//  },{
//    x: Array.from(Array(100).keys()),
//    y: mse_l2[1],
//    xaxis: 'x3',
//    yaxis: 'y3',
//    line: {
//      color: '#EA8533',
//      simplify: false,
//    },
//    opacity: 0.1
//  },{
//    x: Array.from(Array(100).keys()),
//    y: mse_l4[1],
//    xaxis: 'x3',
//    yaxis: 'y3',
//    line: {
//      color: '#EA8533',
//      simplify: false,
//    },
//    opacity: 0.1
//  },{
//    x: Array.from(Array(100).keys()),
//    y: mse_l6[1],
//    xaxis: 'x3',
//    yaxis: 'y3',
//    line: {
//      color: '#EA8533',
//      simplify: false,
//    },
//    opacity: 0.1
//  },{
//    x: Array.from(Array(100).keys()),
//    y: mse_l8[1],
//    xaxis: 'x3',
//    yaxis: 'y3',
//    line: {
//      color: '#EA8533',
//      simplify: false,
//    },
//    opacity: 0.1
//  }

 ];

// console.log(document.getElementById("one_p").clientWidth);

 var layout = {
      width: 650,
      height: 650 * 0.5,
      margin: {
        l: 36,
        r: 40,
        b: 0,
        t: 20,
        pad: 0
      },
    grid: {rows: 1, columns: 2, pattern: 'independent'},
    paper_bgcolor: 'fff',
    plot_bgcolor:'#FAFAFA',
    hovermode: false,
    showlegend: false,
    yaxis: {range: [0, 11.0], fixedrange: true},
    xaxis : {fixedrange: true, domain: [0.0, 0.45]},
    yaxis2: {range: [0, 11.0], fixedrange: true,},
    annotations: [
    {
      x: 0.17,
      y: -0.17,
      xref: 'paper',
      yref: 'paper',
      text: 'Iterations',
      showarrow: false,
      font: {
        family: 'Google Sans Display',
        color:"black",
        size:13}
    },
    {
      x: 0.84,
      y: -0.17,
      xref: 'paper',
      yref: 'paper',
      text: 'Iterations',
      showarrow: false,
      font: {
        family: 'Google Sans Display',
        color:"black",
        size:13}
    },
    {
      x: -0.058,
      y: 0.5,
      textangle: -90,
      xref: 'paper',
      yref: 'paper',
      text: 'Features',
      showarrow: false,
      font: {
        family: 'Google Sans Display',
        color:"black",
        size:13}
    },
    {
      x: 0.51,
      y: 0.5,
      textangle: -90,
      xref: 'paper',
      yref: 'paper',
      text: 'Features',
      showarrow: false,
      font: {
        family: 'Google Sans Display',
        color:"black",
        size:13}
    },
    {
      x: 0.0,
      y: -0.35,
      textangle: 0,
      xref: 'paper',
      yref: 'paper',
      text: 'Ratio of corresponding singular values:',
      showarrow: false,
      font: {
        family: 'Google Sans Display',
        color:"black",
        size:15}
    },
    {
      x: 0.0,
      y: 1.12,
      textangle: 0,
      xref: 'paper',
      yref: 'paper',
      text: 'Cross-Entropy',
      showarrow: false,
      font: {
        family: 'Google Sans Display',
        color:"black",
        size:15}
    },
    {
      x: .8,
      y: 1.12,
      textangle: 0,
      xref: 'paper',
      yref: 'paper',
      text: 'Spectral-Decoupling',
      showarrow: false,
      font: {
        family: 'Google Sans Display',
        color:"black",
        size:15}
    }
  ],
    xaxis2 : {fixedrange: true, domain: [0.55, 1.0]},
   sliders: [{
     pad: {t: 40,
           l: 0},
     x: 0.47,
     y: 0.062,
     len: 0.54,
     currentvalue: {
       xanchor: 'right',
       prefix: 'z_1 / z_2 = ',
       font: {
        family: 'Google Sans Display',
         color: 'black',
         size: 0.0
       }
     },
     transition: {duration: 300},
     // By default, animate commands are bound to the most recently animated frame:
     steps: [{
       label: '1',
       method: 'animate',
       args: [['2'], {
         mode: 'immediate',
         frame: {redraw: false, duration: 300},
         transition: {duration: 300}
       }]
     }, {
       label: '2',
       method: 'animate',
       args: [['4'], {
         mode: 'immediate',
         frame: {redraw: false, duration: 300},
         transition: {duration: 300}
       }]
     }, {
       label: '3',
       method: 'animate',
       args: [['6'], {
         mode: 'immediate',
         frame: {redraw: false, duration: 300},
         transition: {duration: 300}
       }]
     }, {
       label: '4',
       method: 'animate',
       args: [['8'], {
         mode: 'immediate',
         frame: {redraw: false, duration: 300},
         transition: {duration: 300}
       }]
     }]
   }],
 }

 frames = [
 {name: '2',
   data: [{
   x: Array.from(Array(100).keys()),
   y: bce_l2[0],
   line: {
     color: '#2E7F58',
     simplify: false,
   }
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l2[1],
   line: {
     color: '#EA8533',
     simplify: false,
   }
 },
 {
   x: Array.from(Array(100).keys()),
   y: sd_l2[0].map(function(x) { return x * 0.96; }),
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#2E7F58',
     simplify: false,
   }
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l2[1],
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#EA8533',
     simplify: false,
   }
 },
 // {
 //   x: Array.from(Array(100).keys()),
 //   y: mse_l2[0],
 //   xaxis: 'x3',
 //   yaxis: 'y3',
 //   line: {
 //     color: '#2E7F58',
 //     simplify: false,
 //   }
 // },{
 //   x: Array.from(Array(100).keys()),
 //   y: mse_l2[1],
 //   xaxis: 'x3',
 //   yaxis: 'y3',
 //   line: {
 //     color: '#EA8533',
 //     simplify: false,
 //   }
 // }
 ]
 },

 {name: '4',
   data: [{
   x: Array.from(Array(100).keys()),
   y: bce_l4[0],
   line: {
     color: '#2E7F58',
     simplify: false,
   }
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l4[1],
   line: {
     color: '#EA8533',
     simplify: false,
   }
 },
 {
   x: Array.from(Array(100).keys()),
   y: sd_l4[0].map(function(x) { return x * 0.96; }),
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#2E7F58',
     simplify: false,
   }
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l4[1],
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#EA8533',
     simplify: false,
   }
 },
 // {
 //   x: Array.from(Array(100).keys()),
 //   y: mse_l4[0],
 //   xaxis: 'x3',
 //   yaxis: 'y3',
 //   line: {
 //     color: '#2E7F58',
 //     simplify: false,
 //   }
 // },{
 //   x: Array.from(Array(100).keys()),
 //   y: mse_l4[1],
 //   xaxis: 'x3',
 //   yaxis: 'y3',
 //   line: {
 //     color: '#EA8533',
 //     simplify: false,
 //   }
 // }
 ]
 },

 {name: '6',
   data: [{
   x: Array.from(Array(100).keys()),
   y: bce_l6[0],
   line: {
     color: '#2E7F58',
     simplify: false,
   }
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l6[1],
   line: {
     color: '#EA8533',
     simplify: false,
   }
 },
 {
   x: Array.from(Array(100).keys()),
   y: sd_l6[0].map(function(x) { return x * 0.96; }),
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#2E7F58',
     simplify: false,
   }
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l6[1],
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#EA8533',
     simplify: false,
   }
 },
 // {
 //   x: Array.from(Array(100).keys()),
 //   y: mse_l6[0],
 //   xaxis: 'x3',
 //   yaxis: 'y3',
 //   line: {
 //     color: '#2E7F58',
 //     simplify: false,
 //   }
 // },{
 //   x: Array.from(Array(100).keys()),
 //   y: mse_l6[1],
 //   xaxis: 'x3',
 //   yaxis: 'y3',
 //   line: {
 //     color: '#EA8533',
 //     simplify: false,
 //   }
 // }
 ]
 },

 {name: '8',
   data: [{
   x: Array.from(Array(100).keys()),
   y: bce_l8[0],
   line: {
     color: '#2E7F58',
     simplify: false,
   }
 },{
   x: Array.from(Array(100).keys()),
   y: bce_l8[1],
   line: {
     color: '#EA8533',
     simplify: false,
   }
 },
 {
   x: Array.from(Array(100).keys()),
   y: sd_l8[0].map(function(x) { return x * 0.96; }),
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#2E7F58',
     simplify: false,
   }
 },{
   x: Array.from(Array(100).keys()),
   y: sd_l8[1],
   xaxis: 'x2',
   yaxis: 'y2',
   line: {
     color: '#EA8533',
     simplify: false,
   }
 },
 // {
 //   x: Array.from(Array(100).keys()),
 //   y: mse_l8[0],
 //   xaxis: 'x3',
 //   yaxis: 'y3',
 //   line: {
 //     color: '#2E7F58',
 //     simplify: false,
 //   }
 // },{
 //   x: Array.from(Array(100).keys()),
 //   y: mse_l8[1],
 //   xaxis: 'x3',
 //   yaxis: 'y3',
 //   line: {
 //     color: '#EA8533',
 //     simplify: false,
 //   }
 // }
 ]}]



Plotly.newPlot('graph', {
 data: data,
 layout: layout,
 frames: frames, config: {displayModeBar: false}});

// graph = document.getElementById("graph");

// d3.select("#overlay").append("svg").attr("width", 600).attr("height", 300);
// d3.select("#overlay").append("rect").attr("x", 0).attr("y", 0).attr("width", 100).attr("height", 500).attr("fill", "#F2F2F0").attr("stroke", "none");


overlay = document.getElementById("overlay");

overlay.svg = d3.select("#overlay").append("svg").attr("width", 650).attr("height", 150);
overlay.svg.append("g").append("rect").attr("x", 557).attr("y", 27).attr("width", 45).attr("height", 32).attr("fill", "#F2F2F0").attr("stroke", "none");
overlay.svg.append("g").append("rect").attr("x", 557).attr("y", 27).attr("width", 45).attr("height", 32).attr("fill", "none").attr("stroke", "#DADADA");
overlay.svg.append("g").append("text").attr("x", 585).attr("y", 40).attr("font-size", 13).attr("color", "black").text("z");
overlay.svg.append("g").append("text").attr("x", 585).attr("y", 52).attr("font-size", 13).attr("color", "black").text("z");
overlay.svg.append("g").append("text").attr("x", 592).attr("y", 54).attr("font-size", 9).attr("color", "black").text("2");
overlay.svg.append("g").append("text").attr("x", 592).attr("y", 42).attr("font-size", 9).attr("color", "black").text("1");
overlay.svg.append("g").append("rect").attr("x", 564).attr("y", 37).attr("width", 16).attr("height", 1).attr("fill", "#2E7F58").attr("stroke", "#2E7F58");
overlay.svg.append("g").append("rect").attr("x", 564).attr("y", 49).attr("width", 16).attr("height", 1).attr("fill", "#EA8533").attr("stroke", "#EA8533");



// let cmnist = document.getElementById("cmnist");
// fig = document.getElementById('cmnist');
// fig.svg = d3.select("#cmnist").append("svg").attr("width", 100).attr("height", 100);
// fig.svg.append("g").append("rect").attr("x", 0).attr("y", 0).attr("width", 50).attr("height", 50).attr("fill", "black").attr("stroke", "#DADADA");
fig = document.getElementById('cmnist');
fig.svg = d3.select("#cmnist").append("svg").attr("width", 500).attr("height", 300);
document.getElementById('cmnist_img').onmousemove = function clickEvent(e) {
      // e = Mouse click event.
      var rect = e.target.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      // console.log("Left? : " + x + " ; Top? : " + y + ".");

      console.log(47 / rect.width)
      var w = 0.2546 * 0.286 * rect.width;
      fig = document.getElementById('cmnist');
      if (0.05 < x & x < 0.123 &  0.37 < y & y < 0.55){
        if (document.getElementById('rec0_1') == null){
            var x = 0.286 * rect.width;
            var y = 0.145 * rect.height;
            fig.svg.append("g").attr("id", 'rec0_1').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.286 * rect.width;
            var y = 0.6 * rect.height;
            fig.svg.append("g").attr("id", 'rec0_2').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");

            var x = 0.512 * rect.width;
            var y = 0.145 * rect.height;
            fig.svg.append("g").attr("id", 'rec0_3').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.512 * rect.width;
            var y = 0.6 * rect.height;
            fig.svg.append("g").attr("id", 'rec0_4').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            
            var x = 0.722 * rect.width;
            var y = 0.145 * rect.height;
            fig.svg.append("g").attr("id", 'rec0_5').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.722 * rect.width;
            var y = 0.6 * rect.height;
            fig.svg.append("g").attr("id", 'rec0_6').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
    }


    if (document.getElementById('rec1_1') !== null) {
        document.getElementById('rec1_1').remove();
        document.getElementById('rec1_2').remove();
        document.getElementById('rec1_3').remove();
        document.getElementById('rec1_4').remove();
        document.getElementById('rec1_5').remove();
        document.getElementById('rec1_6').remove();}

    if (document.getElementById('rec2_1') !== null) {
        document.getElementById('rec2_1').remove();
        document.getElementById('rec2_2').remove();
        document.getElementById('rec2_3').remove();
        document.getElementById('rec2_4').remove();
        document.getElementById('rec2_5').remove();
        document.getElementById('rec2_6').remove();}

    if (document.getElementById('rec3_1') !== null) {
        document.getElementById('rec3_1').remove();
        document.getElementById('rec3_2').remove();
        document.getElementById('rec3_3').remove();
        document.getElementById('rec3_4').remove();
        document.getElementById('rec3_5').remove();
        document.getElementById('rec3_6').remove();}
      } else if (0.128 < x & x < 0.201 &  0.37 < y & y < 0.55) {
        if (document.getElementById('rec1_1') == null){
            var x = 0.364 * rect.width;
            var y = 0.145 * rect.height;
            fig.svg.append("g").attr("id", 'rec1_1').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.364 * rect.width;
            var y = 0.6 * rect.height;
            fig.svg.append("g").attr("id", 'rec1_2').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");

            var x = 0.590 * rect.width;
            var y = 0.145 * rect.height;
            fig.svg.append("g").attr("id", 'rec1_3').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.590 * rect.width;
            var y = 0.6 * rect.height;
            fig.svg.append("g").attr("id", 'rec1_4').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            
            var x = 0.801 * rect.width;
            var y = 0.145 * rect.height;
            fig.svg.append("g").attr("id", 'rec1_5').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.801 * rect.width;
            var y = 0.6 * rect.height;
            fig.svg.append("g").attr("id", 'rec1_6').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
    }
    if (document.getElementById('rec0_1') !== null) {
        document.getElementById('rec0_1').remove();
        document.getElementById('rec0_2').remove();
        document.getElementById('rec0_3').remove();
        document.getElementById('rec0_4').remove();
        document.getElementById('rec0_5').remove();
        document.getElementById('rec0_6').remove();}

    if (document.getElementById('rec2_1') !== null) {
        document.getElementById('rec2_1').remove();
        document.getElementById('rec2_2').remove();
        document.getElementById('rec2_3').remove();
        document.getElementById('rec2_4').remove();
        document.getElementById('rec2_5').remove();
        document.getElementById('rec2_6').remove();}

    if (document.getElementById('rec3_1') !== null) {
        document.getElementById('rec3_1').remove();
        document.getElementById('rec3_2').remove();
        document.getElementById('rec3_3').remove();
        document.getElementById('rec3_4').remove();
        document.getElementById('rec3_5').remove();
        document.getElementById('rec3_6').remove();}
      } else if (0.05 < x & x < 0.123 & 0.560 < y & y < 0.740) {
            if (document.getElementById('rec2_1') == null){
            var x = 0.286 * rect.width;
            var y = 0.339 * rect.height;
            fig.svg.append("g").attr("id", 'rec2_1').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.286 * rect.width;
            var y = 0.790 * rect.height;
            fig.svg.append("g").attr("id", 'rec2_2').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");

            var x = 0.512 * rect.width;
            var y = 0.339 * rect.height;
            fig.svg.append("g").attr("id", 'rec2_3').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.512 * rect.width;
            var y = 0.790 * rect.height;
            fig.svg.append("g").attr("id", 'rec2_4').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            
            var x = 0.722 * rect.width;
            var y = 0.339 * rect.height;
            fig.svg.append("g").attr("id", 'rec2_5').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.722 * rect.width;
            var y = 0.790 * rect.height;
            fig.svg.append("g").attr("id", 'rec2_6').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
        }

        if (document.getElementById('rec0_1') !== null) {
            document.getElementById('rec0_1').remove();
            document.getElementById('rec0_2').remove();
            document.getElementById('rec0_3').remove();
            document.getElementById('rec0_4').remove();
            document.getElementById('rec0_5').remove();
            document.getElementById('rec0_6').remove();}

        if (document.getElementById('rec1_1') !== null) {
            document.getElementById('rec1_1').remove();
            document.getElementById('rec1_2').remove();
            document.getElementById('rec1_3').remove();
            document.getElementById('rec1_4').remove();
            document.getElementById('rec1_5').remove();
            document.getElementById('rec1_6').remove();}

        if (document.getElementById('rec3_1') !== null) {
            document.getElementById('rec3_1').remove();
            document.getElementById('rec3_2').remove();
            document.getElementById('rec3_3').remove();
            document.getElementById('rec3_4').remove();
            document.getElementById('rec3_5').remove();
            document.getElementById('rec3_6').remove();}
      } else if (0.128 < x & x < 0.201 & 0.560 < y & y < 0.740){
            if (document.getElementById('rec3_1') == null){
            var x = 0.364 * rect.width;
            var y = 0.339 * rect.height;
            fig.svg.append("g").attr("id", 'rec3_1').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.364 * rect.width;
            var y = 0.790 * rect.height;
            fig.svg.append("g").attr("id", 'rec3_2').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");

            var x = 0.590 * rect.width;
            var y = 0.339 * rect.height;
            fig.svg.append("g").attr("id", 'rec3_3').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.590 * rect.width;
            var y = 0.790 * rect.height;
            fig.svg.append("g").attr("id", 'rec3_4').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            
            var x = 0.801 * rect.width;
            var y = 0.339 * rect.height;
            fig.svg.append("g").attr("id", 'rec3_5').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
            var x = 0.801 * rect.width;
            var y = 0.790 * rect.height;
            fig.svg.append("g").attr("id", 'rec3_6').append("rect").attr("x", x - 150).attr("y", y).attr("width", w).attr("height", w).attr("fill", "none").attr("stroke", "black");
        }
        if (document.getElementById('rec0_1') !== null) {
            document.getElementById('rec0_1').remove();
            document.getElementById('rec0_2').remove();
            document.getElementById('rec0_3').remove();
            document.getElementById('rec0_4').remove();
            document.getElementById('rec0_5').remove();
            document.getElementById('rec0_6').remove();}

        if (document.getElementById('rec1_1') !== null) {
            document.getElementById('rec1_1').remove();
            document.getElementById('rec1_2').remove();
            document.getElementById('rec1_3').remove();
            document.getElementById('rec1_4').remove();
            document.getElementById('rec1_5').remove();
            document.getElementById('rec1_6').remove();}

        if (document.getElementById('rec2_1') !== null) {
            document.getElementById('rec2_1').remove();
            document.getElementById('rec2_2').remove();
            document.getElementById('rec2_3').remove();
            document.getElementById('rec2_4').remove();
            document.getElementById('rec2_5').remove();
            document.getElementById('rec2_6').remove();}
      }
      else {
        if (document.getElementById('rec0_1') !== null) {
            document.getElementById('rec0_1').remove();
            document.getElementById('rec0_2').remove();
            document.getElementById('rec0_3').remove();
            document.getElementById('rec0_4').remove();
            document.getElementById('rec0_5').remove();
            document.getElementById('rec0_6').remove();}

        if (document.getElementById('rec1_1') !== null) {
            document.getElementById('rec1_1').remove();
            document.getElementById('rec1_2').remove();
            document.getElementById('rec1_3').remove();
            document.getElementById('rec1_4').remove();
            document.getElementById('rec1_5').remove();
            document.getElementById('rec1_6').remove();}

        if (document.getElementById('rec2_1') !== null) {
            document.getElementById('rec2_1').remove();
            document.getElementById('rec2_2').remove();
            document.getElementById('rec2_3').remove();
            document.getElementById('rec2_4').remove();
            document.getElementById('rec2_5').remove();
            document.getElementById('rec2_6').remove();}

        if (document.getElementById('rec3_1') !== null) {
            document.getElementById('rec3_1').remove();
            document.getElementById('rec3_2').remove();
            document.getElementById('rec3_3').remove();
            document.getElementById('rec3_4').remove();
            document.getElementById('rec3_5').remove();
            document.getElementById('rec3_6').remove();}
      }

    }

// document.getElementById('cmnist_img').onmouseout = function clickEvent(e) {
//       // e = Mouse click event.
//       var rect = e.target.getBoundingClientRect();
//       var x = (e.clientX - rect.left) / rect.width;
//       var y = (e.clientY - rect.top) / rect.height;
//       // console.log("Left? : " + x + " ; Top? : " + y + ".");

//       if (0.05 < x & x < 0.123 &  0.37 < y & y < 0.55){
//         console.log('hi');
//         fig = document.getElementById('cmnist');
//         fig.svg = d3.select("#cmnist").append("svg").attr("width", 650).attr("height", 150);
//         fig.svg.append("g").append("rect").attr("x", 0).attr("y", 0).attr("width", 45).attr("height", 32).attr("fill", "none").attr("stroke", "#DADADA");
//       }
//     }
  

// function getPos(e){
//     x=e.clientX;
//     y=e.clientY;
//     console.log(x)
//     console.log(y)
// }

// function stopTracking(){
//     // document.getElementById("displayArea").innerHTML="";
//     console.log('done')
// }



// var data = [{
//    x: Array.from(Array(100).keys()),
//    y: bce_l2[0],
//    line: {
//      color: '#2E7F58',
//      simplify: false,
//    }
//  },{
//    x: Array.from(Array(100).keys()),
//    y: bce_l2[1],
//    line: {
//      color: '#EA8533',
//      simplify: false,
//    }
//  },
//  ];


//  var layout = {
//       width: 650,
//       height: 650 * 0.5,
//       margin: {
//         l: 36,
//         r: 40,
//         b: 0,
//         t: 20,
//         pad: 0
//       },
//     grid: {rows: 1, columns: 1, pattern: 'independent'},
//     paper_bgcolor: 'fff',
//     plot_bgcolor:'#FAFAFA',
//     hovermode: false,
//     showlegend: false,
//     yaxis: {range: [0, 6], fixedrange: false},
//     xaxis : {fixedrange: false, domain: [0.5, 1.0]},
//    sliders: [{
//      pad: {t: 40,
//            l: 0},
//      x: 0.0,
//      y: 0.3,
//      len: 0.3,
//      currentvalue: {
//        xanchor: 'right',
//        prefix: 'Value: ',
//        font: {
//         family: 'Google Sans Display',
//          color: 'black',
//          size: 0.0
//        }
//      },
//      transition: {duration: 300},
//      // By default, animate commands are bound to the most recently animated frame:
//      steps: [{
//        label: '1',
//        method: 'animate',
//        args: [['2'], {
//          mode: 'immediate',
//          frame: {redraw: false, duration: 300},
//          transition: {duration: 300}
//        }]
//      }, {
//        label: '2',
//        method: 'animate',
//        args: [['4'], {
//          mode: 'immediate',
//          frame: {redraw: false, duration: 300},
//          transition: {duration: 300}
//        }]
//      }]
//    }],
//  }

//  frames = [
//  {name: '2',
//    data: [{
//    x: Array.from(Array(100).keys()),
//    y: bce_l2[0],
//    line: {
//      color: '#2E7F58',
//      simplify: false,
//    }
//  },{
//    x: Array.from(Array(100).keys()),
//    y: bce_l2[1],
//    line: {
//      color: '#EA8533',
//      simplify: false,
//    }
//  }
//  ],  layout: {yaxis: {range: [0, 6], fixedrange: false},}
//  },

//  {name: '4',
//   data: [{
//    x: Array.from(Array(100).keys()),
//    y: bce_l4[0],
//    line: {
//      color: '#2E7F58',
//      simplify: false,
//    }
//  },{
//    x: Array.from(Array(100).keys()),
//    y: bce_l4[1],
//    line: {
//      color: '#EA8533',
//      simplify: false,
//    }
//  }
//  ],
//  layout: {yaxis: {range: [0, 10], fixedrange: false},}
//  }]


// Plotly.newPlot('graph2', {
//  data: data,
//  layout: layout,
//  frames: frames, config: {displayModeBar: false}});





var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;


// var npoints = 100;
var ptdata = [];
var session = [];
var path;
var path2;
var path3;
var path4;
var drawing = false;
var mouseup_done = false;
var remove = false;
var interval;

var output = d3.select('#output');

var line = d3.svg.line()
    .interpolate("bundle") // basis, see http://bl.ocks.org/mbostock/4342190
    .tension(1)
    .x(function(d, i) { return d.x; })
    .y(function(d, i) { return d.y; });


var line2 = d3.svg.line()
    .interpolate("linear") // basis, see http://bl.ocks.org/mbostock/4342190
    .tension(1)
    .x(function(d, i) { return d.x; })
    .y(function(d, i) { return d.y; });


var svg = d3.select("#sketch").append("svg")
    .attr("class", "class_svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)


svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.select('g')
  .append("rect")
  .attr("x", -10)
  .attr("y", 150)
  .attr("width", 400)
  .attr("height", 400)
  .attr("fill", "none")
  .attr("stroke", "#A1A1A1")
  // .attr("stroke-dasharray", "2.5")
  .attr("stroke-opacity", "0.9");

svg.select('g')
    .append("rect")
    .attr("x", 150)
    .attr("y", -10)
    .attr("width", 400)
    .attr("height", 400)
    .attr("fill", "none")
    .attr("stroke", "#A1A1A1")
    // .attr("stroke-dasharray", "2.5")
    .attr("stroke-opacity", "0.9");


  svg.select('g')
    .append("text")
    .attr("x", 288)
    .attr("y", 76 + 77)
    .attr("font-size", 12)
    .attr("font-family", "Impact")
    .attr("fill", "#A9A9A9")
    .text("→");

  svg.select('g')
      .append("text")
      .attr("x", 225)
      .attr("y", 76 + 77)
      .attr("font-size", 4)
      .attr("font-family", "Impact")
      .attr("fill", "#A9A9A9")
      .text("|");

  svg.select('g')
      .append("text")
      .attr("x", 221)
      .attr("y", 85 + 77)
      .attr("font-size", 9)
      .attr("font-family", "courier")
      .attr("fill", "#A9A9A9")
      .text("+2");

  svg.select('g')
      .append("text")
      .attr("x", 75)
      .attr("y", 76 + 77)
      .attr("font-size", 4)
      .attr("font-family", "Impact")
      .attr("fill", "#A9A9A9")
      .text("|");

  svg.select('g')
      .append("text")
      .attr("x", 71)
      .attr("y", 85 + 77)
      .attr("font-size", 9)
      .attr("font-family", "courier")
      .attr("fill", "#A9A9A9")
      .text("-2");

  svg.select('g')
      .append("text")
      .attr("x", 1)
      .attr("y", 85 + 77)
      .attr("font-size", 9)
      .attr("font-family", "courier")
      .attr("fill", "#A9A9A9")
      .text("-4");

  svg.select('g')
      .append("text")
      .attr("x", 0)
      .attr("y", 76 + 77)
      .attr("font-size", 4)
      .attr("font-family", "Impact")
      .attr("fill", "#A9A9A9")
      .text("|");

  svg.select('g')
      .append("text")
      .attr("x", 299)
      .attr("y", 76 + 77)
      .attr("font-size", 4)
      .attr("font-family", "Impact")
      .attr("fill", "#A9A9A9")
      .text("|");

  svg.select('g')
      .append("text")
      .attr("x", 287)
      .attr("y", 85 + 77)
      .attr("font-size", 9)
      .attr("font-family", "courier")
      .attr("fill", "#A9A9A9")
      .text("+4");

  svg.select('g')
      .append("text")
      .attr("x", 153)
      .attr("y", 122)
      .attr("font-size", 9)
      .attr("font-family", "courier")
      .attr("fill", "#A9A9A9")
      .text("ln(2)");

  svg.select('g')
    .append("text")
    .attr("x", 147)
    .attr("y", 9)
    .attr("font-size", 10)
    .attr("fill", "#A9A9A9")
    .attr("font-family", "courier")
    .text("↑");


  svg.append('image')
    .attr("x", 220)
    .attr("y", 175)
        .attr('xlink:href', 'GradientStarvation_files/l3.png')
        .attr('width', 70)
        .attr('height', 17)

    svg.append('image')
    .attr("x", 30)
    .attr("y", 3)
        .attr('xlink:href', 'GradientStarvation_files/l1.png')
        .attr('width', 105)
        .attr('height', 20)

    svg.append('image')
    .attr("x", 175)
    .attr("y", 3)
        .attr('xlink:href', 'GradientStarvation_files/l2.png')
        .attr('width', 100)
        .attr('height', 20)



var i;
var lineData = []
for (i = 0; i < 350; i=i+30) {
  x = (i / 300.0 - 0.5) * 8.0
  y = Math.log(1.0 + Math.exp(-x))
  j = 300 - 300 * (y / 8.0 + 0.5)
  lineData.push({
    "x": i,
    "y": j});
}
// console.log(lineData)

path = svg.append("hi:path")
  .data([lineData])
  .attr("class", "curve0")
  .attr("d", line);

path2 = svg.append("hi:path2")
  .data([lineData])
  .attr("class", "line")
  .attr("d", line);

path3 = svg.append("hi:path3")
  .data([lineData])
  .attr("class", "line3")
  .attr("d", line);

path4 = svg.append("hi:path4")
  .data([lineData])
  .attr("class", "line4")
  .attr("d", line);

var i;
var lineData = []
for (i = 0; i < 350; i=i+30) {
  x = (i / 300.0 - 0.5) * 8.0
  y = 1.0 / (1.0 + Math.exp(-x))
  j = 3.0 + y * 70.0
  lineData.push({
    "x": i,
    "y": j});
}


var i;
var lineData = []
for (i = 76; i < 225; i=i+1) {
  x = (i - 75) * 2.0 / 300.0
  // console.log(i)
  y = x * Math.log(x) + (1 - x) * Math.log(1 - x)
  j = 75.0 + y * 70.0
  lineData.push({
    "x": i,
    "y": j});
}

svg.on("mouseover", listen)


// ignore default touch behavior
var touchEvents = ['touchstart', 'touchmove', 'touchend'];
touchEvents.forEach(function (eventName) {
  document.body.addEventListener(eventName, function(e){
    e.preventDefault();
  });  
});


function listen () {
  drawing = true;
  remove = true
  svg.on("mousemove", onmove);
}

function onmove (e) {
  mouseup_done = false
  clearInterval(interval);
  var type = d3.event.type;
  var point;

  if (remove) {
  svg.select('.line').remove();
  svg.select('.line2').remove();
  svg.select('.line3').remove();
  svg.select('.line4').remove();
  // console.log(svg.select('path'))
  ptdata = [];
  remove = false
  path = svg.append("path")
    .data([ptdata])
    .attr("class", "line")
    .attr("d", line);

  path2 = svg.append("path")
    .data([ptdata])
    .attr("class", "line2")
    .attr("d", line);

  path3 = svg.append("path")
    .data([ptdata])
    .attr("class", "line3")
    .attr("d", line);

  path4 = svg.append("path")
    .data([ptdata])
    .attr("class", "line4")
    .attr("d", line);
  }

  point = d3.mouse(this);
  ptdata.push({ x: point[0]*1.1, y: point[1] *1.1});
  tick();
}


function init () {
  svg.select('.line').remove();
  svg.select('.line2').remove();
  svg.select('.line3').remove();
  svg.select('.line4').remove();
  // console.log(svg.select('path'))
  ptdata = [];
  remove = false
  path = svg.append("path")
    .data([ptdata])
    .attr("class", "line")
    .attr("d", line);

  path2 = svg.append("path")
    .data([ptdata])
    .attr("class", "line2")
    .attr("d", line);

  path3 = svg.append("path")
    .data([ptdata])
    .attr("class", "line3")
    .attr("d", line);

  path4 = svg.append("path")
    .data([ptdata])
    .attr("class", "line4")
    .attr("d", line);

  point = [75, 167];
  ptdata.push({ x: point[0], y: point[1] });
  tick();
}


var dd;
var sslope;
function tick() {

  path.attr("d", function(d) {
    dd = d;
  var x = (d[d.length - 1].x / 300.0 - 0.5) * 8.0
  var slope = -1.0 / (1.0 + Math.exp(x))
  sslope = slope;
  var bias = Math.log(1.0 + Math.exp(-x)) - slope * x
  var start_point_x = -5
  var start_point_y = -slope * start_point_x + bias
  var end_point_x = 5
  var end_point_y = -slope * end_point_x + bias

  start_point_x = 300 - 300 * (start_point_x / 8.0 + 0.5)
  start_point_y = 300 - 300 * (start_point_y / 8.0 + 0.5)
  end_point_x = 300 - 300 * (end_point_x / 8.0 + 0.5)
  end_point_y = 300 - 300 * (end_point_y / 8.0 + 0.5)

  // console.log(start_point_x)
  var lineData = [ { "x": start_point_x,   "y": start_point_y},
                   { "x": end_point_x,  "y": end_point_y}];
  return line(lineData); }); // Redraw the path:


  path2.attr("d", function(d) {
  var x = (d[d.length - 1].x / 300.0 - 0.5) * 8.0
  var f_x = Math.log(1.0 + Math.exp(-x))

  start_point_x = 300 * (x / 8.0 + 0.5)
  start_point_y = 150
  end_point_x = 300 * (x / 8.0 + 0.5)
  end_point_y = 300 - 300 * (f_x / 8.0 + 0.5)

  // console.log(start_point_x)
  var lineData = [ { "x": start_point_x,   "y": start_point_y},
                   { "x": end_point_x,  "y": end_point_y}];
  return line2(lineData); }); // Redraw the path:


  path3.attr("d", function(d) {
  var x = (d[d.length - 1].x / 300.0 - 0.5) * 8.0
  var slope = -1.0 / (1.0 + Math.exp(x))
  sslope = slope;
  var bias = Math.log(1.0 + Math.exp(-x)) - slope * x

  start_point_x = 150
  start_point_y = 150
  end_point_x = 150
  end_point_y = 300 - 300 * (bias / 8.0 + 0.5)

  // console.log(start_point_x)
  var lineData = [ { "x": start_point_x,   "y": start_point_y},
                   { "x": end_point_x,  "y": end_point_y}];
  return line2(lineData); }); // Redraw the path:

  path4.attr("d", function(d) {
  var x = (d[d.length - 1].x / 300.0 - 0.5) * 8.0
  var slope = -1.0 / (1.0 + Math.exp(x))
  sslope = slope;
  var bias = Math.log(1.0 + Math.exp(-x)) - slope * x

  start_point_x = 300 * (x / 8.0 + 0.5) - 3
  start_point_y = 300 - 300 * (bias / 8.0 + 0.5)
  end_point_x = 150
  end_point_y = 300 - 300 * (bias / 8.0 + 0.5)

  // console.log(start_point_x)
  if (x <= 0) {
  var lineData = [ { "x": start_point_x,   "y": start_point_y},
                   { "x": end_point_x,  "y": end_point_y}];
  } else {
    var lineData = []
  }
  return line2(lineData); }); // Redraw the path:

}

// init()


