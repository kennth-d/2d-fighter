import * as roundStates from "../states/round/RoundsStates.js";

export class RoundManager {
    constructor(scene) {
        this.scene = scene;
        this.roundState = new roundStates.RoundStart(this);

    }//end ctor
    transition(newState) {
        this.roundState.exit();
        this.roundState = new roundStates[newState](this);
        this.roundState.enter();
    }//end transition
    update(dt) {
        this.roundState.update(dt);
    }//end update
    draw() {
        this.roundState.draw();
    }//end draw
    startNewRound() {
        this.transition("RoundStart");
    }//end startRound
}//end RoundManager