///<reference path="DragPoint.ts"/>
namespace View.Points
{
    export class PinPoint extends DragPoint{
        constructor(g:SVGElement) {
            super(g);
            this._circle.setAttributeNS(null, "fill", "#CCC");
        }
        enterFrame(): void {
            super.enterFrame();
        }
    }
}