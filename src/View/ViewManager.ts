///<reference path="Points/RedPoint.ts"/>
///<reference path="Data/EventData.ts"/>
///<reference path="Points/BlackPoint.ts"/>
///<reference path="Line/LineManager.ts"/>
namespace View {
    import RedPoint = View.Points.RedPoint;
    import DragPoint = View.Points.DragPoint;
    import EventData = View.Data.EventData;
    import BlackPoint = View.Points.BlackPoint;
    import LineManager = View.Line.LineManager;

    export class ViewManager {
        private _redPointList: RedPoint[];
        private _lineManager: LineManager;
        private _dragPoint: DragPoint;
        private _preX: number;
        private _preY: number;

        //public static COUNT_X: number = 8;
        //public static COUNT_Y: number = 8;
        public static DISTANCE:number = 100;
        //
        //private _marginX:number;
        //private _marginY:number;
        //private _svg:HTMLElement;
        //private readonly _lineLayer:SVGElement;
        public static countX:number;
        public static countY:number;
        private readonly _pointLayer:SVGElement;
        constructor() {
            let svg:HTMLElement = document.getElementById("svg");
            let lineLayer:SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(lineLayer);
            this._pointLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(this._pointLayer);
            //
            this._lineManager = new LineManager(lineLayer);
            this.resize();
        }

        public enterFrame(): void {

            /**/
            this._lineManager.enterFrame();
            let n:number = this._redPointList.length;
            for(let i:number = 0;i<n;i++)
            {
                let redPoint:RedPoint = this._redPointList[i];
                redPoint.enterFrame();
            }

        }
        public resize():void
        {





            this.setPoints();
        }
        //
        private setPoints():void
        {
            const handler = (eventData: EventData) => {
                this.mouseDown(eventData);
            };
            this._redPointList = [];
            let pointList = [];
            let dragPoint: DragPoint;

            /*
            let dx: number = (400 - (this._marginX * 2)) / (ViewManager.COUNT_X - 1);
            console.log("dx " + dx)
            console.log("dx " + dx)
            let dy: number = (400 - (this._marginY * 2)) / (ViewManager.COUNT_Y - 1);
             */
            let svg:HTMLElement = document.getElementById("svg");
            let width = document.body.clientWidth;
            let height = document.body.clientHeight;
            ViewManager.countX = Math.floor((width -100)/ViewManager.DISTANCE);
            ViewManager.countY = Math.floor((height -100)/ViewManager.DISTANCE);
            let marginX = 50 + (width - (ViewManager.countX * ViewManager.DISTANCE)) * 0.5;
            let marginY = 50 + (height - (ViewManager.countY * ViewManager.DISTANCE)) * 0.5;
            svg.setAttribute("width", width.toString());
            svg.setAttribute("height", height.toString());

            let n: number = ViewManager.countX * ViewManager.countY;
            for (let i = 0; i < n; i++) {

                if (Math.floor(i / ViewManager.countX) == 0 || Math.floor(i / ViewManager.countX) == ViewManager.countY - 1 || i % ViewManager.countX == 0 || i % ViewManager.countX == ViewManager.countX - 1) {
                    dragPoint = new BlackPoint(this._pointLayer);

                    dragPoint.x = marginX + ViewManager.DISTANCE * (i % ViewManager.countX);
                    dragPoint.y = marginY + ViewManager.DISTANCE * Math.floor(i / ViewManager.countX);
                } else {
                    dragPoint = new RedPoint(this._pointLayer);
                    if (dragPoint instanceof RedPoint) {
                        this._redPointList.push(dragPoint);
                    }
                    dragPoint.x = 10 - 20 * Math.random() + marginX + ViewManager.DISTANCE * (i % ViewManager.countX);
                    dragPoint.y = 10 - 20 * Math.random() + marginY + ViewManager.DISTANCE * Math.floor(i / ViewManager.countX);
                }
                dragPoint.addListener("mousedown", handler);
                pointList.push(dragPoint);
            }
            let left: DragPoint;
            let right: DragPoint;
            let top: DragPoint;
            let bottom: DragPoint;
            n = pointList.length;
            for (let i: number = 0; i < n; i++) {
                dragPoint = pointList[i];
                if(Math.floor(i/ViewManager.countX) != 0)
                {
                    top = pointList[i - ViewManager.countX];
                }
                if(Math.floor(i/ViewManager.countX) != ViewManager.countY-1)
                {
                    bottom = pointList[i + ViewManager.countX];
                }
                if(i%ViewManager.countX != ViewManager.countX-1)
                {
                    right = pointList[i + 1];
                }
                if(i/ViewManager.countX != 0)
                {
                    left = pointList[i - 1];
                }
                dragPoint.setPoints(top,bottom,right,left);
            }
            //Line
            //this._lineManager = new LineManager(this._lineLayer, pointList);
            this._lineManager.setPointList(pointList);
        }

        private mouseDown(eventData: EventData): void {
            const mouseup = () => {
                window.removeEventListener("mouseup", mouseup);
                window.removeEventListener("mousemove", mousemove);
                this.mouseUp();
            };
            const mousemove = (e) => {
                this.mousemoveHandler(e);
            };
            this._dragPoint = eventData.dragPoint;
            this._preX = eventData.mouseX;
            this._preY = eventData.mouseY;

            window.addEventListener("mouseup", mouseup);
            window.addEventListener("mousemove", mousemove);
        }

        private mouseUp(): void {
            this._dragPoint.mouseUp();
        }

        private mousemoveHandler(e): void {
            let dx: number = e.screenX - this._preX;
            let dy: number = e.screenY - this._preY;
            this._dragPoint.x += dx;
            this._dragPoint.y += dy;
            this._preX = e.screenX;
            this._preY = e.screenY;
        }
    }
}