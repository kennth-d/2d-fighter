import { getContext2D } from "../utils/utils.js";
import * as scenes from "../scenes/scenes.js";
import { logEntities, toggleDebug } from "../utils/debug.js";
import { updateTime } from "../utils/utils.js";
import { DEFAULT_SETTINGS } from "../utils/global.js";

export class GameManager {
    constructor(debug=false) {
        this.gameSettings = DEFAULT_SETTINGS;
        this.fighters = [];
        this.debug=debug;

        //low-res screen for battle scenes
        this.ctx = getContext2D('#low-res-screen');
        this.ctx.imageSmoothingEnabled = false;

        //high-res screen for menu scenes
        this.ctxHigh = getContext2D("#high-res-screen");
        this.ctxHigh.imageSmoothingEnabled = false;

        this.scenes = [new scenes.MainMenuScene(this)];

        this.numScenes = 1;
        this.scene = this.scenes[this.numScenes - 1];

       this.addListeners();

    }//end ctor

    //Main Loop of the game.
    frame(timestamp) {
        window.requestAnimationFrame(this.frame.bind(this));

        updateTime(timestamp);

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
                
        this.ctxHigh.canvas.addEventListener("click", () => {
            //precondition: this.scene is not undefined.
            this.scene.handleClickEvent();    
        }, false);
        
        this.ctxHigh.canvas.addEventListener("mousedown", () => {
            this.scene.handleMouseDown();
        }, false);
        this.ctxHigh.canvas.addEventListener("mouseup", () => {
            this.scene.handleMouseUp();
        }, false);
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                this.scene.handlePauseEvent();
            }
        });
    }//end addListeners
    setupDebug() {
        window.addEventListener("keypress", (e) => {
            if (e.code === "Space") {
                logEntities(this.scene.fighters);
                console.log(`${TIME.FPS} fps`);
            }//end if
            if (e.code === "KeyV") {
                toggleDebug(this.scene.fighters);
            }//end if
        });
    }//end setupDebug

}//end GameManager