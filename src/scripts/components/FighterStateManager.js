import { IdleState,WalkFwdState,WalkBwdState,JumpState,LightAttackState } from "../states/states.js";

export class FighterStateManager {
    constructor() {
        this.states = {
            IDLE: new IdleState(),
            WALK_FWD: new WalkFwdState(),
            WALK_BWD: new WalkBwdState(),
            JUMP: new JumpState(),
            LIGHT_ATTACK: new LightAttackState(),
        }//end states
        this.activeState = this.states.IDLE;
        this.fighter;
    }//end ctor
    transition(newState) {
        this.activeState.exit(this.fighter);
        this.activeState = this.states[newState];
        this.activeState.enter(this.fighter);
    }//end changeState
}//end cls