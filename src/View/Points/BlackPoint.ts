///<reference path="DragPoint.ts"/>
namespace View.Points
{
    export class BlackPoint extends DragPoint{
        constructor(g:SVGElement) {
            super(g);
            this._circle.setAttributeNS(null, "fill", "black");
        }
        enterFrame(): void {
            super.enterFrame();
        }
    }
}