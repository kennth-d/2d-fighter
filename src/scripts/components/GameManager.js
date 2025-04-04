import { getContext2D } from "../utils/utils.js";
import * as scenes from "../scenes/scenes.js";
import { TIME, DEFAULT_SETTINGS, MENU } from "../utils/const.js";
import { toggleDebug, logEntities, drawDebugScreenSize } from "../utils/debug.js";

export class GameManager {
    constructor(debug=false) {
        this.gameSettings = DEFAULT_SETTINGS;
        this.fighters = [];
        this.debug=debug;

        //low-res screen for battle scenes
        this.ctx = getContext2D('#low-res-screen');
        this.ctx.imageSmoothingEnabled = false;
        //high-res screen for menu scenes
        this.ctxHigh = MENU.canvasElement.getContext("2d");
        this.ctxHigh.imageSmoothingEnabled = false;
        this.scenes = [new scenes.MainMenuScene(this)];

        this.numScenes = 1;
        this.scene = this.scenes[this.numScenes - 1];

       this.addListeners();

    }//end ctor

    //Main Loop of the game.
    frame(timestamp) {
        window.requestAnimationFrame(this.frame.bind(this));

        TIME.update(timestamp);

        this.scene.update();
        this.scene.draw();
        
    }//end frame
    
    start() {
        window.requestAnimationFrame(this.frame.bind(this));
    }//end start
    addListeners() {
        this.ctxHigh.canvas.addEventListener("mousemove", (event) => {
            this.scene.handleMouseMove(event);
        }, false);    
        this.ctxHigh.canvas.addEventListener("click", (event) => {
            //precondition: this.scene is not undefined.
            this.scene.handleClickEvent(event);    
        }, false);
        this.ctxHigh.canvas.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.scene.handleClickEvent(event);
        }, false);
        this.ctxHigh.canvas.addEventListener("mousedown", () => {
            this.scene.handleMouseDown();
        }, false);
        this.ctxHigh.canvas.addEventListener("mouseup", () => {
            this.scene.handleMouseUp();
        }, false);
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                this.scene.handlePauseEvent();
            }
            if (event.code == "AltLeft") {
                event.preventDefault();
                return;
            }//end if
        });
    }//end addListeners
    setupDebug() {
        window.addEventListener("keypress", (e) => {
            if (!this.debug) return;

            if (e.code === "Space") {
                logEntities(this.scene.fighters);
                console.log(TIME);
            }//end if
            if (e.code === "KeyV") {
                toggleDebug(this.scene.fighters);
            }//end if
            if (e.code === "KeyZ") {
                drawDebugScreenSize(this.ctx, "blue", 2);
            }
            if (e.code === "KeyX") {
                drawDebugScreenSize(this.ctxHigh, "yellow", 2);
            }
        });
    }//end setupDebug
}//end GameManager