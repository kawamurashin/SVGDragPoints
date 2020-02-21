///<reference path="../Points/DragPoint.ts"/>
namespace View.Line
{
    import DragPoint = View.Points.DragPoint;

    export class LineManager {

        private _lineList:LineObject[];
        constructor(g:SVGElement , pointList:DragPoint[]) {


            this._lineList = [];
            let n:number = pointList.length- 1;
            for(let i:number = 0;i<n;i++)
            {
                if(i%ViewManager.COUNT_X != ViewManager.COUNT_X-1)
                {
                    let startPoint:DragPoint = pointList[i];
                    let endPoint:DragPoint = pointList[i+1];
                    let line:LineObject = new LineObject(g,startPoint,endPoint);
                    this._lineList.push(line);
                }
            }

            n = pointList.length - ViewManager.COUNT_X;
            for(let i:number = 0;i<n;i++)
            {
                let startPoint:DragPoint = pointList[i];
                let endPoint:DragPoint = pointList[i+ViewManager.COUNT_X];
                let line:LineObject = new LineObject(g,startPoint,endPoint);
                this._lineList.push(line);
            }



            this.draw();
        }

        public enterFrame():void
        {
            this.draw();

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