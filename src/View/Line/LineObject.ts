namespace View.Line
{
    import DragPoint = View.Points.DragPoint;

    export class LineObject {
        private _startPoint:DragPoint;
        private _endPoint:DragPoint;

        private _path:SVGElement;
        constructor(g:SVGElement,startPoint:DragPoint, endPoint:DragPoint) {

            this._path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            this._path.setAttribute("stroke", "#0F3");
            this._path.setAttribute("fill", "none");
            this._path.setAttribute("stroke-width", "2");
            this._path.setAttribute("stroke-linejoin", "round");
            this._path.setAttribute("pointer-events", "none");

            g.appendChild(this._path);

            this._startPoint = startPoint;
            this._endPoint = endPoint;
            this.draw();
        }

        public draw()
        {
            const value: string = "M " + this._startPoint.x + "," + this._startPoint.y + " L " + this._endPoint.x + "," + this._endPoint.y + " Z";
            this._path.setAttribute("d", value);
        }

    }
}