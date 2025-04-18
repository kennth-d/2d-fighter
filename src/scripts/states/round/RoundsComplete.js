import { RoundState } from "./RoundState.js";
import { drawGameOver, drawTransparencyMask} from "../../utils/drawRoundStatus.js";
import { GameOverScene } from "../../scenes/scenes.js";

export class RoundsComplete extends RoundState {
    constructor(manager) {
        super(manager);
        this.winner = null;
        this.timer = 2;
    }//end ctor
    enter() {
        const winCounts = this.manager.scene.rounds.reduce((win, cur) => {
            win[cur] = (win[cur] || 0) + 1;
            return win;
        }, {});
        const p1 = winCounts["0"] || 0;
        const p2 = winCounts["1"] || 0;
        if (p1 === p2) {
            this.winner = "DRAW";
        } else {
            this.winner = (p1 > p2) ? "P1WIN" : "P2WIN";
        }//end if-else
    }//end enter
    update(dt) {
        this.timer -= dt;
        if (this.timer > 0) return;

        this.manager.scene.game.addScene(new GameOverScene(this.manager.scene.game));
    }//end update
    draw() {
        const ctx = this.manager.scene.game.ctxHigh;
        drawTransparencyMask(ctx, .50);
        drawGameOver(ctx, this.winner, 2);
    }//end draw
    exit() {

    }
}//end InProgress
