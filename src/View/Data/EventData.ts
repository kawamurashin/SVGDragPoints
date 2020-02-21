///<reference path="../Points/DragPoint.ts"/>
namespace View.Data
{
    import DragPoint = View.Points.DragPoint;

    export class EventData {
        public dragPoint:DragPoint;
        public mouseX:number;
        public mouseY:number;

    }
}