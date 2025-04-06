import { RoundState } from "./RoundState.js";
import { drawRoundStatus, drawTransparencyMask } from "../../utils/drawRoundStatus.js";

export class RoundOver extends RoundState {
    constructor(manager) {
        super(manager);
        this.timer = 2;
        this.status = "KO";
        this.winner = -1;
    }//end ctor
    enter() {
        const p1 = this.manager.scene.fighters[0];
        const p2 = this.manager.scene.fighters[1];

        if (p1.health <=0 || p2.health <= 0) {
            this.status = "KO";
        } else {
            this.status = "TIMESUP"
        }//end if-else

        if (p1.health > p2.health) this.winner = p1.playerId;
        if (p1.health < p2.health) this.winner = p2.playerId;

        for (const fighter of this.manager.scene.fighters) {
            fighter.input.disable();
        }
    }//end enter
    update(dt) {
        this.timer -= dt;
        if (this.timer > 0) return;
        if (this.manager.scene.currentRound === this.manager.scene.rounds.length) {
    
            this.manager.transition("RoundsComplete");
            return;
        } else  {
            this.manager.scene.startNewRound();
        }//end if-else

    }//end update
    draw() {
        const ctx = this.manager.scene.game.ctxHigh;
        
        drawTransparencyMask(ctx, 0.25);
        drawRoundStatus(ctx, this.status, 2);
    }//end draw
    exit() {
        const ctx = this.manager.scene.game.ctxHigh;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.manager.scene.rounds[this.manager.scene.currentRound-1] = this.winner;
        console.log();
    }//end exit
}//end InProgress