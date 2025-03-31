import * as states from "../states/states.js";
import { BOUNDARIES } from "../utils/const.js";

export class FighterStateManager {
    constructor(fighter) {
        this.states = {
            IDLE: new states.Idle(),
            CROUCH: new states.Crouch(),
            WALK_FWD: new states.WalkFwd(),
            WALK_BWD: new states.WalkBwd(),
            JUMP: new states.Jump(),
            JUMP_FWD: new states.JumpForward(),
            JUMP_BWD: new states.JumpBack(),
            LIGHT_ATTACK: new states.LightAttack(),
            HEAVY_ATTACK: new states.HeavyAttack(),
            SP_1: new states.SP_1(),
            SP_2: new states.SP_2(),
            HURT: new states.Hurt(),
        }//end states
        this.activeState = this.states.IDLE;
        this.fighter = fighter;
    }//end ctor
    update(input) {
        if (this.activeState instanceof states.Jump && this.fighter.pos.y === BOUNDARIES.FLOOR) {
            this.fighter.physics.changeVelocity("y", 0);
            this.transition("IDLE");
        }
        this.activeState.update(this, input);
    }//end update
    transition(newState) {
        this.activeState.exit(this);
        this.activeState = this.states[newState];
        this.activeState.enter(this);
    }//end transition
    hurtTransition(knockback, hitstun) {
        this.activeState.exit(this);
        this.activeState = this.states.HURT;
        this.activeState.enter(this, knockback, hitstun);
    }
}//end FighterStateManger.