///<reference path="DragPoint.ts"/>
namespace View.Points
{
    export class RedPoint extends DragPoint{
        constructor(g:SVGElement) {
            super(g);
            this._circle.setAttributeNS(null, "fill", "red");
        }
    }
}