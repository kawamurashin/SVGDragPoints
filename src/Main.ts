///<reference path="View/ViewManager.ts"/>
import ViewManager = View.ViewManager;

let main: Main;
class Main {
    private _viewManager:ViewManager;
    constructor() {
        const interval = () => {
            this.enterFrame();
        };

        this._viewManager = new ViewManager();


        let fps = 60 / 1000;
        setInterval(interval, fps);
    }
    private enterFrame() {
        this._viewManager.enterFrame();

    }
}

window.addEventListener("load", () => {
    main = new Main();
});