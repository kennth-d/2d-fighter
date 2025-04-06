import { RoundState } from "./RoundState.js";
import { drawRoundStatus, drawTransparencyMask } from "../../utils/drawRoundStatus.js";

export class RoundStart extends RoundState {
    constructor(manager) {
        super(manager);
        this.timer = 0;
        this.status;
    }//end ctor
    enter() {
        this.timer = 3;
        this.status = this.timer;
    }//end enter
    update(dt) {
        this.timer -= dt;
    
        this.status = Math.trunc(this.timer + 1);
        if (this.timer < 0) {
            this.manager.transition("InProgress");
            return;
        }
    }//end update
    draw() {
        
        const ctx = this.manager.scene.game.ctxHigh;
        drawTransparencyMask(ctx, 0.25);
        drawRoundStatus(ctx, this.status, 2);
    }//end draw
    exit() {
        const ctx = this.manager.scene.game.ctxHigh;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }//end exit
}//end InProgress