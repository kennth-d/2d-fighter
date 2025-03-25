import { Idle, Crouch, WalkFwd, WalkBwd, Jump, LightAttack, HeavyAttack, JumpForward, JumpBack, SP_1, SP_2 } from "../states/states.js";

export class FighterStateManager {
    constructor(fighter) {
        this.states = {
            IDLE: new Idle(),
            CROUCH: new Crouch(),
            WALK_FWD: new WalkFwd(),
            WALK_BWD: new WalkBwd(),
            JUMP: new Jump(),
            JUMP_FWD: new JumpForward(),
            JUMP_BWD: new JumpBack(),
            LIGHT_ATTACK: new LightAttack(),
            HEAVY_ATTACK: new HeavyAttack(),
            SP_1: new SP_1(),
            SP_2: new SP_2(),
        }//end states
        this.activeState = this.states.IDLE;
        this.fighter = fighter;
    }//end ctor
    transition(newState) {
        this.activeState = this.states[newState];
        this.activeState.enter(this);
        
    }//end changeState
}//end cls