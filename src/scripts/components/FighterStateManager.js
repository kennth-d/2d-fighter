import * as states from "../states/fighterStates.js";
import { BOUNDARIES } from "../utils/const.js";

export class FighterStateManager {
    constructor(fighter) {
        this.activeState = new states.IDLE();
        this.lastState = this.activeState;
        this.fighter = fighter;
    }//end ctor
    update(input) {
        if (this.activeState instanceof states.JUMP && this.fighter.pos.y === BOUNDARIES.FLOOR) {
            this.fighter.physics.changeVelocity("y", 0);
            this.transition("IDLE");
        }
        this.activeState.update(this, input);
    }//end update
    transition(newState) {
        if (newState === this.activeState.name) return;
        
        this.lastState = this.activeState;
        
        this.activeState.exit(this);
        this.activeState = new states[newState]();
        this.activeState.enter(this);
    }//end transition
}//end FighterStateManger.