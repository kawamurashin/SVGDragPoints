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
        private readonly _redPointList: RedPoint[];
        private readonly _lineManager: LineManager;

        private _dragPoint: DragPoint;
        private _preX: number;
        private _preY: number;

        public static COUNT_X: number = 8;
        public static COUNT_Y: number = 8;

        constructor() {
            const handler = (eventData: EventData) => {

                this.mouseDown(eventData);
            };
            let svg: HTMLElement = document.getElementById("svg");
            let g: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(g);
            this._redPointList = [];
            let pointList = [];
            let dragPoint: DragPoint;
            const marginX: number = 20;
            const marginY: number = 20;
            let dx: number = (400 - (marginX * 2)) / (ViewManager.COUNT_X - 1);
            let dy: number = (400 - (marginY * 2)) / (ViewManager.COUNT_Y - 1);
            let n: number = ViewManager.COUNT_X * ViewManager.COUNT_Y;
            for (let i = 0; i < n; i++) {

                if (Math.floor(i / ViewManager.COUNT_X) == 0 || Math.floor(i / ViewManager.COUNT_X) == ViewManager.COUNT_Y - 1 || i % ViewManager.COUNT_X == 0 || i % ViewManager.COUNT_X == ViewManager.COUNT_X - 1) {
                    dragPoint = new BlackPoint(g);

                    dragPoint.x = marginX + dx * (i % ViewManager.COUNT_X);
                    dragPoint.y = marginY + dy * Math.floor(i / ViewManager.COUNT_X);
                } else {
                    dragPoint = new RedPoint(g);
                    if (dragPoint instanceof RedPoint) {
                        this._redPointList.push(dragPoint);
                    }
                    dragPoint.x = 10 - 20 * Math.random() + marginX + dx * (i % ViewManager.COUNT_X);
                    dragPoint.y = 10 - 20 * Math.random() + marginY + dy * Math.floor(i / ViewManager.COUNT_X);
                }
                dragPoint.addListener("mousedown", handler);
                pointList.push(dragPoint);
            }
            //
            let left: DragPoint;
            let right: DragPoint;
            let top: DragPoint;
            let bottom: DragPoint;
            n = pointList.length;
            for (let i: number = 0; i < n; i++) {
                dragPoint = pointList[i];
                if(Math.floor(i/ViewManager.COUNT_X) != 0)
                {
                    top = pointList[i - ViewManager.COUNT_X];
                }
                if(Math.floor(i/ViewManager.COUNT_X) != ViewManager.COUNT_Y-1)
                {
                    bottom = pointList[i + ViewManager.COUNT_X];
                }
                if(i%ViewManager.COUNT_X != ViewManager.COUNT_X-1)
                {
                    right = pointList[i + 1];
                }
                if(i/ViewManager.COUNT_X != 0)
                {
                    left = pointList[i - 1];
                }
                dragPoint.setPoints(top,bottom,right,left);
            }
            //Line
            this._lineManager = new LineManager(g, pointList);
        }

        public enterFrame(): void {
            this._lineManager.enterFrame();
            let n:number = this._redPointList.length;
            for(let i:number = 0;i<n;i++)
            {
                let redPoint:RedPoint = this._redPointList[i];
                redPoint.enterFrame();
            }
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