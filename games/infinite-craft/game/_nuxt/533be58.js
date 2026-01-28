(window.webpackJsonp = window.webpackJsonp || []).push([
    [9], {
        140: function(e, t, o) {
            "use strict";
            var n = o(36),
                r = (o(17), o(38), o(47), {
                    install: function(e, t) {
                        var o = [],
                            r = [],
                            l = [],
                            c = [];
                        e.mixin({
                            beforeDestroy: function() {
                                o.forEach((function(e) {
                                    return window.clearTimeout(e)
                                })), r.forEach((function(e) {
                                    return window.clearInterval(e)
                                })), l.forEach((function(e) {
                                    var t = Object(n.a)(e, 2),
                                        o = t[0],
                                        r = t[1];
                                    return window.removeEventListener(o, r)
                                })), c.forEach((function(e) {
                                    return window.cancelAnimationFrame(e.id)
                                })), o = [], r = [], l = [], c = []
                            }
                        }), e.prototype.$setInterval = function(e, t) {
                            r.push(window.setInterval(e, t))
                        }, e.prototype.$setTimeout = function(e, t) {
                            o.push(window.setTimeout(e, t))
                        }, e.prototype.$requestAnimationFrame = function(e) {
                            var t = {
                                    id: null
                                },
                                o = function(time) {
                                    e(time), t.id = requestAnimationFrame(o)
                                };
                            requestAnimationFrame(o), c.push(t)
                        }, e.prototype.$addEventListener = function(e, t, o) {
                            l.push([e, t]), window.addEventListener(e, t, o)
                        }
                    }
                });
            o(1).default.use(r)
        },
        141: function(e, t, o) {
            "use strict";
            var n = o(1),
                r = o(200);
            n.default.use(r.a, {
                config: {
                    id: "G-L7MJCSDHKV",
                    params: {
                        send_page_view: !0
                    }
                }
            })
        },
        195: function(e, t, o) {
            var content = o(281);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, o(107).default)("312b016c", content, !0, {
                sourceMap: !1
            })
        },
        196: function(e, t, o) {
            var content = o(285);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, o(107).default)("7e07d392", content, !0, {
                sourceMap: !1
            })
        },
        203: function(e, t, o) {
            "use strict";
            var n = {
                    mounted: function() {
                        document.body.style.background = "white"
                    },
                    head: function() {
                        return this.$store.getters.getMeta(this.$route.path)
                    }
                },
                r = (o(280), o(30)),
                component = Object(r.a)(n, (function() {
                    var e = this._self._c;
                    return e("div", [e("Nuxt")], 1)
                }), [], !1, null, null, null);
            t.a = component.exports
        },
        204: function(e, t, o) {
            "use strict";
            var n = {},
                r = (o(284), o(30)),
                component = Object(r.a)(n, (function() {
                    this._self._c;
                    return this._m(0)
                }), [function() {
                    var e = this._self._c;
                    return e("div", [])
                }], !1, null, "167fb083", null);
            t.a = component.exports
        },
        238: function(e, t, o) {
            o(239), e.exports = o(240)
        },
        280: function(e, t, o) {
            "use strict";
            o(195)
        },
        281: function(e, t, o) {
            var n = o(106),
                r = o(205),
                l = o(282),
                c = o(283),
                d = n((function(i) {
                    return i[1]
                })),
                h = r(l),
                f = r(c);
            d.push([e.i, "@font-face{font-family:Roboto;src:url(" + h + ")}@font-face{font-family:Roboto;font-weight:700;src:url(" + f + ")}html{font-size:16px;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;background:#fff;box-sizing:border-box;color:#000;font-family:Roboto,sans-serif}*,:after,:before{box-sizing:border-box;margin:0}.simple-page{background:#f1f2f6}.pw_report_ad_container{display:none!important}", ""]), d.locals = {}, e.exports = d
        },
        282: function(e, t, o) {
            e.exports = o.p + "fonts/Roboto-Medium.3ac5d40.woff2"
        },
        283: function(e, t, o) {
            e.exports = o.p + "fonts/Roboto-Bold.a65527f.woff2"
        },
        284: function(e, t, o) {
            "use strict";
            o(196)
        },
        285: function(e, t, o) {
            var n = o(106)((function(i) {
                return i[1]
            }));
            n.push([e.i, ".old-frame[data-v-167fb083]{border:none;height:100%;left:0;position:fixed;top:0;width:100%}", ""]), n.locals = {}, e.exports = n
        },
        286: function(e, t, o) {
            "use strict";
            o.r(t), o.d(t, "state", (function() {
                return n
            })), o.d(t, "getters", (function() {
                return r
            }));
            o(87), o(207), o(17);
            var n = function() {
                    return {
                        posts: [ {
                            path: "infinite-craft",
                            preload: !0
                        },]
                    }
                },
                r = {
                    getMeta: function(e) {
                        return function(path) {
                            if ("/" === path) return e.homeMeta;
                            var t = e.posts.find((function(e) {
                                return "/".concat(e.path, "/") === path
                            }));
                            if (!t) return {
                                link: [],
                                meta: [],
                                title: ""
                            };
                            var o = "",
                                n = "".concat(o, "/").concat(t.path, "/"),
                                r = "".concat(o, "/share-cards/").concat(t.path, ".png");
                            "absurd-trolley-problems" === t.path && (r = "".concat(o, "/share-cards/").concat(t.path, "2.png")), "asteroid-launcher" === t.path && (r = "".concat(o, "/share-cards/").concat(t.path, "2.png")), "password-game" === t.path && (r = "".concat(o, "/share-cards/").concat(t.path, ".png?v=2"));
                            var l = "/favicons/".concat(t.path, ".png");
                            return {
                                title: t.title,
                                link: []
                            }
                        }
                    }
                }
        },
        37: function(e, t, o) {
            "use strict";
            var n = {
                    mounted: function() {}
                },
                r = o(30),
                component = Object(r.a)(n, (function() {
                    return (0, this._self._c)("div")
                }), [], !1, null, null, null);
            t.a = component.exports
        }
    },
    [
        [238, 62, 10, 63]
    ]
]);