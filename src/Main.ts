///<reference path="View/ViewManager.ts"/>
import ViewManager = View.ViewManager;
let main: Main;
class Main {
    private _viewManager:ViewManager;
    constructor() {
        const interval = () => {
            this.enterFrame();
        };
        const resize = () =>
        {
            console.log("rezie fhoge")
            this.resize();
        };
        this._viewManager = new ViewManager();

        window.addEventListener( 'resize',resize );
        let fps = 60 / 1000;
        setInterval(interval, fps);
    }
    private enterFrame() {
        this._viewManager.enterFrame();
    }
    private resize():void
    {
        //this._viewManager.resize();

    }
}
window.addEventListener("load", () => {
    main = new Main();
});