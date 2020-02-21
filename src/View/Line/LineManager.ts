///<reference path="../Points/DragPoint.ts"/>
namespace View.Line
{
    import DragPoint = View.Points.DragPoint;
    export class LineManager {
        private _lineList:LineObject[] = [];
        private readonly _layer:SVGElement;
        constructor(g:SVGElement) {
            this._layer = g;
        }

        public enterFrame():void
        {
            this.draw();

        }
        public setPointList(pointList: DragPoint[]) {
            this._lineList = [];
            let n:number = pointList.length- 1;
            for(let i:number = 0;i<n;i++)
            {
                if(i%ViewManager.countX != ViewManager.countX-1)
                {
                    let startPoint:DragPoint = pointList[i];
                    let endPoint:DragPoint = pointList[i+1];
                    let line:LineObject = new LineObject(this._layer,startPoint,endPoint);
                    this._lineList.push(line);
                }
            }

            n = pointList.length - ViewManager.countX;
            for(let i:number = 0;i<n;i++)
            {
                let startPoint:DragPoint = pointList[i];
                let endPoint:DragPoint = pointList[i+ViewManager.countX];
                let line:LineObject = new LineObject(this._layer,startPoint,endPoint);
                this._lineList.push(line);
            }
            this.draw();
        }
        public removeAll():void
        {
            let n:number = this._lineList.length;
            for(let i:number = 0;i<n;i++)
            {
                let line:LineObject = this._lineList[i];
                line.remove();
            }
            this._lineList = [];
        }

        private draw():void
        {
            let n:number = this._lineList.length;
            for(let i:number = 0;i<n;i++)
            {
                let line:LineObject = this._lineList[i];
                line.draw();
            }
        }
    }
}