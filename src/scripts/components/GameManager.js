import {Fighter_001} from "../fighters/Fighter_001.js";
import {Fighter_002} from "../fighters/Fighter_002.js";
import { KeyboardInputComponent } from "../components/KeyboardInputComponent.js";
import { TIME, PLAYER_ONE_START, PLAYER_TWO_START, CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/global.js";
import { StatusBar } from "../overlays/StatusBar.js";
import { ROUND_STATUS } from "../../assets/data/RoundStatusData.js";
import { Stage } from "../stage/Stage.js";

export class GameManager {
    constructor(debug=false) {
        this.ctx = this.getContext();
        this.ctx.imageSmoothingEnabled = false;

        this.fighters = [
            new Fighter_001(PLAYER_ONE_START.x, PLAYER_ONE_START.y, 0, new KeyboardInputComponent()),
            new Fighter_002(PLAYER_TWO_START.x, PLAYER_TWO_START.y, 1, new KeyboardInputComponent()),
        ];
        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        this.entities = [
            new Stage(),
            ...this.fighters,
            new StatusBar(this.fighters[0], this.fighters[1]),  
        ];

        if (debug){
            this.setupDebug();
        }//end if
        
    }//end ctor
    getContext() {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        return ctx;
    }//end getContext
    update(){

        for (const entity of this.entities) {
            entity.update();
        }//end for
    }//end update
    draw() {

        //draw background
        this.ctx.fillStyle = "#2e2e2e";
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
        //draw entities
        for(const entity of this.entities) {
            entity.draw(this.ctx);

        //this.drawRoundState("FIGHT");
        }//end for            
    }//end draw
    frame(timestamp) {
        window.requestAnimationFrame(this.frame.bind(this));

        //update time
        TIME.delta = (timestamp - TIME.previous) / 1000;
        TIME.previous = timestamp;

        this.update();
        this.draw();
    }//end frame
    setupDebug() {
        window.addEventListener("keypress", (e) => {
            if (e.code === "Space") {
                console.log(this.fighters[0]);
                console.log(this.fighters[1]);
            }//end if
            if (e.code === "KeyV") {
                this.fighters[0].debug = Boolean(Math.abs(this.fighters[0].debug - 1));
                this.fighters[1].debug = Boolean(Math.abs(this.fighters[1].debug - 1));
            }//end if
        });
    }//end setupDebug
    start() {
        window.requestAnimationFrame(this.frame.bind(this));
    }//end start
    drawRoundState(status) {
        this.ctx.drawImage(
            ROUND_STATUS.img,
            ROUND_STATUS[status].x,
            ROUND_STATUS[status].y,
            ROUND_STATUS[status].width,
            ROUND_STATUS[status].height,
            CANVAS_WIDTH/2 - ROUND_STATUS[status].width/2,
            ROUND_STATUS[status].height/2,
            ROUND_STATUS[status].width,
            ROUND_STATUS[status].height,
        );
    }//end drawStatus
}//end GameManager