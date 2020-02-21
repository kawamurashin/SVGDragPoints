var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Dispatcher = (function () {
    function Dispatcher() {
        this.events = {};
    }
    Dispatcher.prototype.addListener = function (event, callback) {
        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: []
            };
        }
        this.events[event].listeners.push(callback);
    };
    Dispatcher.prototype.removeListener = function (event, callback) {
        if (this.events[event] === undefined) {
            return false;
        }
        this.events[event].listeners = this.events[event].listeners.filter(function (listener) {
            return listener.toString() !== callback.toString();
        });
    };
    Dispatcher.prototype.dispatch = function (event, data) {
        if (this.events[event] === undefined) {
            return false;
        }
        this.events[event].listeners.forEach(function (listener) {
            listener(data);
        });
    };
    return Dispatcher;
}());
var View;
(function (View) {
    var Data;
    (function (Data) {
        var EventData = (function () {
            function EventData() {
            }
            return EventData;
        }());
        Data.EventData = EventData;
    })(Data = View.Data || (View.Data = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Points;
    (function (Points) {
        var EventData = View.Data.EventData;
        var DragPoint = (function (_super) {
            __extends(DragPoint, _super);
            function DragPoint(g) {
                var _this = _super.call(this) || this;
                _this._x = 0;
                _this._y = 0;
                var mousedown = function (e) {
                    _this.mouseDownHandler(e);
                };
                _this._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                _this._circle.setAttributeNS(null, "cx", "0");
                _this._circle.setAttributeNS(null, "cy", "0");
                _this._circle.setAttributeNS(null, "r", "10");
                _this._circle.addEventListener("mousedown", mousedown);
                g.appendChild(_this._circle);
                return _this;
            }
            Object.defineProperty(DragPoint.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    this._y = value;
                    this._circle.setAttributeNS(null, "cy", this._y.toString());
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DragPoint.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    this._x = value;
                    this._circle.setAttributeNS(null, "cx", this._x.toString());
                },
                enumerable: true,
                configurable: true
            });
            DragPoint.prototype.mouseDownHandler = function (e) {
                var eventData = new EventData();
                eventData.dragPoint = this;
                eventData.mouseX = e.screenX;
                eventData.mouseY = e.screenY;
                this.dispatch("mousedown", eventData);
            };
            return DragPoint;
        }(Dispatcher));
        Points.DragPoint = DragPoint;
    })(Points = View.Points || (View.Points = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Points;
    (function (Points) {
        var RedPoint = (function (_super) {
            __extends(RedPoint, _super);
            function RedPoint(g) {
                var _this = _super.call(this, g) || this;
                _this._circle.setAttributeNS(null, "fill", "red");
                return _this;
            }
            return RedPoint;
        }(Points.DragPoint));
        Points.RedPoint = RedPoint;
    })(Points = View.Points || (View.Points = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Points;
    (function (Points) {
        var BlackPoint = (function (_super) {
            __extends(BlackPoint, _super);
            function BlackPoint(g) {
                var _this = _super.call(this, g) || this;
                _this._circle.setAttributeNS(null, "fill", "black");
                return _this;
            }
            return BlackPoint;
        }(Points.DragPoint));
        Points.BlackPoint = BlackPoint;
    })(Points = View.Points || (View.Points = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Line;
    (function (Line) {
        var LineManager = (function () {
            function LineManager(g, pointList) {
                this._lineList = [];
                var n = pointList.length - 1;
                for (var i = 0; i < n; i++) {
                    if (i % View.ViewManager.COUNT_X != View.ViewManager.COUNT_X - 1) {
                        var startPoint = pointList[i];
                        var endPoint = pointList[i + 1];
                        var line = new Line.LineObject(g, startPoint, endPoint);
                        this._lineList.push(line);
                    }
                }
                n = pointList.length - View.ViewManager.COUNT_X;
                for (var i = 0; i < n; i++) {
                    var startPoint = pointList[i];
                    var endPoint = pointList[i + View.ViewManager.COUNT_X];
                    var line = new Line.LineObject(g, startPoint, endPoint);
                    this._lineList.push(line);
                }
                this.draw();
            }
            LineManager.prototype.enterFrame = function () {
                this.draw();
            };
            LineManager.prototype.draw = function () {
                var n = this._lineList.length;
                for (var i = 0; i < n; i++) {
                    var line = this._lineList[i];
                    line.draw();
                }
            };
            return LineManager;
        }());
        Line.LineManager = LineManager;
    })(Line = View.Line || (View.Line = {}));
})(View || (View = {}));
var View;
(function (View) {
    var RedPoint = View.Points.RedPoint;
    var BlackPoint = View.Points.BlackPoint;
    var LineManager = View.Line.LineManager;
    var ViewManager = (function () {
        function ViewManager() {
            var _this = this;
            var handler = function (eventData) {
                _this.mouseDown(eventData);
            };
            var svg = document.getElementById("svg");
            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(g);
            this._redPointList = [];
            var pointList = [];
            var redPoint;
            var blackPoint;
            var dragPoint;
            var marginX = 20;
            var marginY = 20;
            var dx = (400 - (marginX * 2)) / (ViewManager.COUNT_X - 1);
            var dy = (400 - (marginY * 2)) / (ViewManager.COUNT_Y - 1);
            var n = ViewManager.COUNT_X * ViewManager.COUNT_Y;
            for (var i = 0; i < n; i++) {
                if (Math.floor(i / ViewManager.COUNT_X) == 0 || Math.floor(i / ViewManager.COUNT_X) == ViewManager.COUNT_Y - 1 || i % ViewManager.COUNT_X == 0 || i % ViewManager.COUNT_X == ViewManager.COUNT_X - 1) {
                    dragPoint = new BlackPoint(g);
                }
                else {
                    dragPoint = new RedPoint(g);
                    this._redPointList.push(dragPoint);
                }
                dragPoint.x = marginX + dx * (i % ViewManager.COUNT_X);
                dragPoint.y = marginY + dy * Math.floor(i / ViewManager.COUNT_X);
                dragPoint.addListener("mousedown", handler);
                pointList.push(dragPoint);
            }
            this._lineManager = new LineManager(g, pointList);
        }
        ViewManager.prototype.enterFrame = function () {
            this._lineManager.enterFrame();
        };
        ViewManager.prototype.mouseDown = function (eventData) {
            var _this = this;
            var mouseup = function () {
                window.removeEventListener("mouseup", mouseup);
                window.removeEventListener("mousemove", mousemove);
                _this.mouseUp();
            };
            var mousemove = function (e) {
                _this.mousemoveHandler(e);
            };
            this._dragPoint = eventData.dragPoint;
            this._preX = eventData.mouseX;
            this._preY = eventData.mouseY;
            window.addEventListener("mouseup", mouseup);
            window.addEventListener("mousemove", mousemove);
        };
        ViewManager.prototype.mouseUp = function () {
        };
        ViewManager.prototype.mousemoveHandler = function (e) {
            var dx = e.screenX - this._preX;
            var dy = e.screenY - this._preY;
            this._dragPoint.x += dx;
            this._dragPoint.y += dy;
            this._preX = e.screenX;
            this._preY = e.screenY;
        };
        ViewManager.COUNT_X = 8;
        ViewManager.COUNT_Y = 8;
        return ViewManager;
    }());
    View.ViewManager = ViewManager;
})(View || (View = {}));
var ViewManager = View.ViewManager;
var main;
var Main = (function () {
    function Main() {
        var _this = this;
        var interval = function () {
            _this.enterFrame();
        };
        this._viewManager = new ViewManager();
        var fps = 60 / 1000;
        setInterval(interval, fps);
    }
    Main.prototype.enterFrame = function () {
        this._viewManager.enterFrame();
    };
    return Main;
}());
window.addEventListener("load", function () {
    main = new Main();
});
var View;
(function (View) {
    var Events;
    (function (Events) {
        var ViewEvent = (function () {
            function ViewEvent(str) {
                if (str === void 0) { str = null; }
            }
            ViewEvent.CLICK = "view_click";
            return ViewEvent;
        }());
        Events.ViewEvent = ViewEvent;
    })(Events = View.Events || (View.Events = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Line;
    (function (Line) {
        var LineObject = (function () {
            function LineObject(g, startPoint, endPoint) {
                this._path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                this._path.setAttribute("stroke", "#0F3");
                this._path.setAttribute("fill", "none");
                this._path.setAttribute("stroke-width", "2");
                this._path.setAttribute("stroke-linejoin", "round");
                this._path.setAttribute("pointer-events", "none");
                g.appendChild(this._path);
                this._startPoint = startPoint;
                this._endPoint = endPoint;
                this.draw();
            }
            LineObject.prototype.draw = function () {
                var value = "M " + this._startPoint.x + "," + this._startPoint.y + " L " + this._endPoint.x + "," + this._endPoint.y + " Z";
                this._path.setAttribute("d", value);
            };
            return LineObject;
        }());
        Line.LineObject = LineObject;
    })(Line = View.Line || (View.Line = {}));
})(View || (View = {}));
//# sourceMappingURL=ts.js.map