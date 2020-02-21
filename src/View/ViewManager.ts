///<reference path="Points/MovePoint.ts"/>
///<reference path="Data/EventData.ts"/>
///<reference path="Points/PinPoint.ts"/>
///<reference path="Line/LineManager.ts"/>
namespace View {
    import MovePoint = View.Points.MovePoint;
    import DragPoint = View.Points.DragPoint;
    import EventData = View.Data.EventData;
    import PinPoint = View.Points.PinPoint;
    import LineManager = View.Line.LineManager;

    export class ViewManager {
        private _movePointList: MovePoint[];
        private _lineManager: LineManager;
        private _dragPoint: DragPoint;
        private _preX: number;
        private _preY: number;
        public static DISTANCE:number = 100;
        //
        private _dragPointList:DragPoint[] = [];
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
            let n:number = this._movePointList.length;
            for(let i:number = 0;i<n;i++)
            {
                let movePoint:MovePoint = this._movePointList[i];
                movePoint.enterFrame();
            }
        }
        public resize():void
        {
            let n:number = this._dragPointList.length;
            for(let i:number = 0;i<n;i++)
            {
                let dragPoint:DragPoint = this._dragPointList[i];
                dragPoint.remove();
            }
            this._dragPointList = [];
            this._movePointList = [];
            //
            this._lineManager.removeAll();
            //
            this.setPoints();
        }
        //
        private setPoints():void
        {
            const handler = (eventData: EventData) => {
                this.mouseDown(eventData);
            };
            this._movePointList = [];
            this._dragPointList = [];
            let dragPoint: DragPoint;
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
                    dragPoint = new PinPoint(this._pointLayer);

                    dragPoint.x = marginX + ViewManager.DISTANCE * (i % ViewManager.countX);
                    dragPoint.y = marginY + ViewManager.DISTANCE * Math.floor(i / ViewManager.countX);
                } else {
                    dragPoint = new MovePoint(this._pointLayer);
                    if (dragPoint instanceof MovePoint) {
                        this._movePointList.push(dragPoint);
                    }
                    dragPoint.x = 10 - 20 * Math.random() + marginX + ViewManager.DISTANCE * (i % ViewManager.countX);
                    dragPoint.y = 10 - 20 * Math.random() + marginY + ViewManager.DISTANCE * Math.floor(i / ViewManager.countX);
                }
                dragPoint.addListener("mousedown", handler);
                this._dragPointList.push(dragPoint);
            }
            let left: DragPoint;
            let right: DragPoint;
            let top: DragPoint;
            let bottom: DragPoint;
            n = this._dragPointList.length;
            for (let i: number = 0; i < n; i++) {
                dragPoint = this._dragPointList[i];
                if(Math.floor(i/ViewManager.countX) != 0)
                {
                    top = this._dragPointList[i - ViewManager.countX];
                }
                if(Math.floor(i/ViewManager.countX) != ViewManager.countY-1)
                {
                    bottom = this._dragPointList[i + ViewManager.countX];
                }
                if(i%ViewManager.countX != ViewManager.countX-1)
                {
                    right = this._dragPointList[i + 1];
                }
                if(i/ViewManager.countX != 0)
                {
                    left = this._dragPointList[i - 1];
                }
                dragPoint.setPoints(top,bottom,right,left);
            }
            //Line
            this._lineManager.setPointList(this._dragPointList);
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