///<reference path="Dispatcher.ts"/>
///<reference path="../Data/EventData.ts"/>

namespace View.Points
{
    import EventData = View.Data.EventData;
    export class DragPoint extends Dispatcher{
        get isMouseDown(): boolean {
            return this._isMouseDown;
        }
        get y(): number {
            return this._y;
        }
        get x(): number {
            return this._x;
        }
        set y(value: number) {
            this._y = value;
            this._circle.setAttributeNS(null, "cy", this._y.toString());
        }
        set x(value: number) {
            this._x = value;
            this._circle.setAttributeNS(null, "cx", this._x.toString());
        }
        protected _x:number = 0;
        protected _y:number = 0;
        protected _circle:SVGElement;
        private _isMouseDown:boolean = false;
        protected _topPoint:DragPoint;
        protected _bottomPoint:DragPoint;
        protected _leftPoint:DragPoint;
        protected _rightPoint:DragPoint;
        private _g:SVGElement;
        constructor(g:SVGElement) {
            super();
            this._g = g;
            const mousedown = (e) =>
            {
                this.mouseDownHandler(e);
            };
            this._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this._circle.setAttributeNS(null, "cx", "0");
            this._circle.setAttributeNS(null, "cy", "0");
            this._circle.setAttributeNS(null, "r", "10");
            this._circle.addEventListener("mousedown", mousedown);
            this._g.appendChild(this._circle);
        }
        public enterFrame():void
        {

        }
        public setPoints(top:DragPoint = null , bottom:DragPoint = null, right:DragPoint = null, left:DragPoint = null)
        {
            if(top)
            {
                this._topPoint = top;
            }
            if(bottom)
            {
                this._bottomPoint = bottom
            }
            if(right)
            {
                this._rightPoint = right;
            }
            if(left)
            {
                this._leftPoint = left;
            }
        }

        public remove():void
        {
            this._g.removeChild(this._circle);
            this._topPoint = null;
            this._bottomPoint = null;
            this._rightPoint = null;
            this._leftPoint = null;
        }

        public mouseDown():void
        {

        }
        public mouseUp():void
        {
            this._isMouseDown = false;

        }
        private mouseDownHandler(e)
        {
            this._isMouseDown = true;
            const eventData:EventData = new EventData();
            eventData.dragPoint = this;
            eventData.mouseX = e.screenX;
            eventData.mouseY = e.screenY;
            this.dispatch("mousedown" , eventData);
        }

    }
}