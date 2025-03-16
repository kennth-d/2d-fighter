import { getContext2D } from "../utils/utils.js";
import * as scenes from "../scenes/scenes.js";
import { logEntities, toggleDebug } from "../utils/debug.js";
import { updateTime } from "../utils/utils.js";
import { getMousePos } from "../utils/mouseHandler.js";
import { DEFAULT_SETTINGS } from "../utils/global.js";

export class GameManager {
    constructor(debug=false) {
        this.gameSettings = DEFAULT_SETTINGS;
        this.ctx = getContext2D('#low-res-screen');
        this.ctx.imageSmoothingEnabled = false;

        this.ctxHigh = getContext2D("#high-res-screen");

        this.scenes = [new scenes.MainMenuScene(this)];
        //this.scenes = [new BattleScene(this)];
        this.numScenes = 1;
        this.scene = this.scenes[this.numScenes - 1];

       this.addListeners();

        // if (debug){
        //     this.setupDebug();
        // }//end if
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
            //precondition: this.scene is not undefined.
            if (this.scene.name === "BattleScene") return;

            let mPos = getMousePos(this.ctxHigh.canvas, event);
            this.scene.mousePos.x = mPos.x;
            this.scene.mousePos.y = mPos.y;
        }, false);
                
        this.ctxHigh.canvas.addEventListener("click", () => {
            //precoondition: this.scene is not undefined.
            if (this.scene.name === "BattleScene") return;

            this.scene.handleClickEvent();
            
            // let clickedBtn = getClickedObject(this.scene.buttons, this.scene.mousePos);
            // if (clickedBtn) BUTTON_CALLBACKS[clickedBtn.id](this);
        }, false);
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