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
                _this._isMouseDown = false;
                _this._g = g;
                var mousedown = function (e) {
                    _this.mouseDownHandler(e);
                };
                _this._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                _this._circle.setAttributeNS(null, "cx", "0");
                _this._circle.setAttributeNS(null, "cy", "0");
                _this._circle.setAttributeNS(null, "r", "10");
                _this._circle.addEventListener("mousedown", mousedown);
                _this._g.appendChild(_this._circle);
                return _this;
            }
            Object.defineProperty(DragPoint.prototype, "isMouseDown", {
                get: function () {
                    return this._isMouseDown;
                },
                enumerable: true,
                configurable: true
            });
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
            DragPoint.prototype.enterFrame = function () {
            };
            DragPoint.prototype.setPoints = function (top, bottom, right, left) {
                if (top === void 0) { top = null; }
                if (bottom === void 0) { bottom = null; }
                if (right === void 0) { right = null; }
                if (left === void 0) { left = null; }
                if (top) {
                    this._topPoint = top;
                }
                if (bottom) {
                    this._bottomPoint = bottom;
                }
                if (right) {
                    this._rightPoint = right;
                }
                if (left) {
                    this._leftPoint = left;
                }
            };
            DragPoint.prototype.remove = function () {
                this._g.removeChild(this._circle);
                this._topPoint = null;
                this._bottomPoint = null;
                this._rightPoint = null;
                this._leftPoint = null;
            };
            DragPoint.prototype.mouseDown = function () {
            };
            DragPoint.prototype.mouseUp = function () {
                this._isMouseDown = false;
            };
            DragPoint.prototype.mouseDownHandler = function (e) {
                this._isMouseDown = true;
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
        var MovePoint = (function (_super) {
            __extends(MovePoint, _super);
            function MovePoint(g) {
                var _this = _super.call(this, g) || this;
                _this.K = 0.00001;
                _this.U = 0.0001;
                _this._vx = 0;
                _this._vy = 0;
                _this._circle.setAttributeNS(null, "fill", "#FFF");
                return _this;
            }
            MovePoint.prototype.enterFrame = function () {
                _super.prototype.enterFrame.call(this);
                var dx;
                var dy;
                if (!this.isMouseDown) {
                    if (this._leftPoint) {
                        dx = this._leftPoint.x - this.x;
                        this._vx += dx * this.K - this.U * this._vx;
                        this.x += this._vx;
                        dy = this._leftPoint.y - this.y;
                        this._vy += dy * this.K - this.U * this._vy;
                        this.y += this._vy;
                    }
                    if (this._rightPoint) {
                        dx = this._rightPoint.x - this.x;
                        this._vx += dx * this.K - this.U * this._vx;
                        this.x += this._vx;
                        dy = this._rightPoint.y - this.y;
                        this._vy += dy * this.K - this.U * this._vy;
                        this.y += this._vy;
                    }
                    if (this._topPoint) {
                        dx = this._topPoint.x - this.x;
                        this._vx += dx * this.K - this.U * this._vx;
                        this.x += this._vx;
                        dy = this._topPoint.y - this.y;
                        this._vy += dy * this.K - this.U * this._vy;
                        this.y += this._vy;
                    }
                    if (this._bottomPoint) {
                        dx = this._bottomPoint.x - this.x;
                        this._vx += dx * this.K - this.U * this._vx;
                        this.x += this._vx;
                        dy = this._bottomPoint.y - this.y;
                        this._vy += dy * this.K - this.U * this._vy;
                        this.y += this._vy;
                    }
                }
            };
            return MovePoint;
        }(Points.DragPoint));
        Points.MovePoint = MovePoint;
    })(Points = View.Points || (View.Points = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Points;
    (function (Points) {
        var PinPoint = (function (_super) {
            __extends(PinPoint, _super);
            function PinPoint(g) {
                var _this = _super.call(this, g) || this;
                _this._circle.setAttributeNS(null, "fill", "#CCC");
                return _this;
            }
            PinPoint.prototype.enterFrame = function () {
                _super.prototype.enterFrame.call(this);
            };
            return PinPoint;
        }(Points.DragPoint));
        Points.PinPoint = PinPoint;
    })(Points = View.Points || (View.Points = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Line;
    (function (Line) {
        var LineManager = (function () {
            function LineManager(g) {
                this._lineList = [];
                this._layer = g;
            }
            LineManager.prototype.enterFrame = function () {
                this.draw();
            };
            LineManager.prototype.setPointList = function (pointList) {
                this._lineList = [];
                var n = pointList.length - 1;
                for (var i = 0; i < n; i++) {
                    if (i % View.ViewManager.countX != View.ViewManager.countX - 1) {
                        var startPoint = pointList[i];
                        var endPoint = pointList[i + 1];
                        var line = new Line.LineObject(this._layer, startPoint, endPoint);
                        this._lineList.push(line);
                    }
                }
                n = pointList.length - View.ViewManager.countX;
                for (var i = 0; i < n; i++) {
                    var startPoint = pointList[i];
                    var endPoint = pointList[i + View.ViewManager.countX];
                    var line = new Line.LineObject(this._layer, startPoint, endPoint);
                    this._lineList.push(line);
                }
                this.draw();
            };
            LineManager.prototype.removeAll = function () {
                var n = this._lineList.length;
                for (var i = 0; i < n; i++) {
                    var line = this._lineList[i];
                    line.remove();
                }
                this._lineList = [];
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
    var RedPoint = View.Points.MovePoint;
    var BlackPoint = View.Points.PinPoint;
    var LineManager = View.Line.LineManager;
    var ViewManager = (function () {
        function ViewManager() {
            this._dragPointList = [];
            var svg = document.getElementById("svg");
            var lineLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(lineLayer);
            this._pointLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(this._pointLayer);
            this._lineManager = new LineManager(lineLayer);
            this.resize();
        }
        ViewManager.prototype.enterFrame = function () {
            this._lineManager.enterFrame();
            var n = this._redPointList.length;
            for (var i = 0; i < n; i++) {
                var redPoint = this._redPointList[i];
                redPoint.enterFrame();
            }
        };
        ViewManager.prototype.resize = function () {
            var n = this._dragPointList.length;
            for (var i = 0; i < n; i++) {
                var dragPoint = this._dragPointList[i];
                dragPoint.remove();
            }
            this._dragPointList = [];
            this._redPointList = [];
            this._lineManager.removeAll();
            this.setPoints();
        };
        ViewManager.prototype.setPoints = function () {
            var _this = this;
            var handler = function (eventData) {
                _this.mouseDown(eventData);
            };
            this._redPointList = [];
            this._dragPointList = [];
            var dragPoint;
            var svg = document.getElementById("svg");
            var width = document.body.clientWidth;
            var height = document.body.clientHeight;
            ViewManager.countX = Math.floor((width - 100) / ViewManager.DISTANCE);
            ViewManager.countY = Math.floor((height - 100) / ViewManager.DISTANCE);
            var marginX = 50 + (width - (ViewManager.countX * ViewManager.DISTANCE)) * 0.5;
            var marginY = 50 + (height - (ViewManager.countY * ViewManager.DISTANCE)) * 0.5;
            svg.setAttribute("width", width.toString());
            svg.setAttribute("height", height.toString());
            var n = ViewManager.countX * ViewManager.countY;
            for (var i = 0; i < n; i++) {
                if (Math.floor(i / ViewManager.countX) == 0 || Math.floor(i / ViewManager.countX) == ViewManager.countY - 1 || i % ViewManager.countX == 0 || i % ViewManager.countX == ViewManager.countX - 1) {
                    dragPoint = new BlackPoint(this._pointLayer);
                    dragPoint.x = marginX + ViewManager.DISTANCE * (i % ViewManager.countX);
                    dragPoint.y = marginY + ViewManager.DISTANCE * Math.floor(i / ViewManager.countX);
                }
                else {
                    dragPoint = new RedPoint(this._pointLayer);
                    if (dragPoint instanceof RedPoint) {
                        this._redPointList.push(dragPoint);
                    }
                    dragPoint.x = 10 - 20 * Math.random() + marginX + ViewManager.DISTANCE * (i % ViewManager.countX);
                    dragPoint.y = 10 - 20 * Math.random() + marginY + ViewManager.DISTANCE * Math.floor(i / ViewManager.countX);
                }
                dragPoint.addListener("mousedown", handler);
                this._dragPointList.push(dragPoint);
            }
            var left;
            var right;
            var top;
            var bottom;
            n = this._dragPointList.length;
            for (var i = 0; i < n; i++) {
                dragPoint = this._dragPointList[i];
                if (Math.floor(i / ViewManager.countX) != 0) {
                    top = this._dragPointList[i - ViewManager.countX];
                }
                if (Math.floor(i / ViewManager.countX) != ViewManager.countY - 1) {
                    bottom = this._dragPointList[i + ViewManager.countX];
                }
                if (i % ViewManager.countX != ViewManager.countX - 1) {
                    right = this._dragPointList[i + 1];
                }
                if (i / ViewManager.countX != 0) {
                    left = this._dragPointList[i - 1];
                }
                dragPoint.setPoints(top, bottom, right, left);
            }
            this._lineManager.setPointList(this._dragPointList);
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
            this._dragPoint.mouseUp();
        };
        ViewManager.prototype.mousemoveHandler = function (e) {
            var dx = e.screenX - this._preX;
            var dy = e.screenY - this._preY;
            this._dragPoint.x += dx;
            this._dragPoint.y += dy;
            this._preX = e.screenX;
            this._preY = e.screenY;
        };
        ViewManager.DISTANCE = 100;
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
        var resize = function () {
            console.log("rezie fhoge 2");
            _this.resize();
        };
        this._viewManager = new ViewManager();
        window.addEventListener('resize', resize);
        var fps = 60 / 1000;
        setInterval(interval, fps);
    }
    Main.prototype.enterFrame = function () {
        this._viewManager.enterFrame();
    };
    Main.prototype.resize = function () {
        this._viewManager.resize();
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
                this._g = g;
                this._path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                this._path.setAttribute("stroke", "#FFF");
                this._path.setAttribute("fill", "none");
                this._path.setAttribute("stroke-width", "2");
                this._path.setAttribute("stroke-linejoin", "round");
                this._path.setAttribute("pointer-events", "none");
                this._g.appendChild(this._path);
                this._startPoint = startPoint;
                this._endPoint = endPoint;
                this.draw();
            }
            LineObject.prototype.remove = function () {
                this._g.removeChild(this._path);
            };
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