///<reference path="DragPoint.ts"/>
namespace View.Points
{
    export class MovePoint extends DragPoint{
        private readonly K:number = 0.00001;
        private readonly U:number = 0.0001;
        private _vx:number = 0;
        private _vy:number = 0;
        constructor(g:SVGElement) {
            super(g);
            this._circle.setAttributeNS(null, "fill", "#FFF");
        }
        enterFrame(): void {
            super.enterFrame();
            let dx:number;
            let dy:number;
            if(!this.isMouseDown)
            {
                if(this._leftPoint)
                {
                    dx = this._leftPoint.x - this.x;
                    this._vx += dx * this.K - this.U * this._vx;
                    this.x += this._vx;
                    dy = this._leftPoint.y - this.y;
                    this._vy += dy * this.K - this.U * this._vy;
                    this.y += this._vy
                }
                if(this._rightPoint)
                {
                    dx = this._rightPoint.x - this.x;
                    this._vx += dx * this.K - this.U * this._vx;
                    this.x += this._vx;
                    dy = this._rightPoint.y - this.y;
                    this._vy += dy * this.K - this.U * this._vy;
                    this.y += this._vy
                }

                if(this._topPoint)
                {
                    dx = this._topPoint.x - this.x;
                    this._vx += dx * this.K - this.U * this._vx;
                    this.x += this._vx;
                    dy = this._topPoint.y - this.y;
                    this._vy += dy * this.K - this.U * this._vy;
                    this.y += this._vy
                }
                if(this._bottomPoint)
                {
                    dx = this._bottomPoint.x - this.x;
                    this._vx += dx * this.K - this.U * this._vx;
                    this.x += this._vx;
                    dy = this._bottomPoint.y - this.y;
                    this._vy += dy * this.K - this.U * this._vy;
                    this.y += this._vy
                }
            }
        }

    }
}