/**
 * @module MoveStates
 * @description Contains Fighter states that relate to moving a Fighter.
 * States in this File: Idle, Crouch, WalkFwd, WalkBwd, Jump, JumpBack, JumpForward
 */
import { State } from "./State.js";
import { PHYSICS } from "../utils/const.js"; 
import { isInRangeOfAttack } from "../utils/isInRangeOfAttack.js";
import { isInStartup } from "../utils/isInStartup.js";

/**Root of all states, decides what state to transition to based on input.
 * @extends { StateInterface }
 */
export class Idle extends State {
    constructor(state="IDLE", type="move") {
        super();
        this.name = state;
        this.type = type;
    }
    enter(manager) {
        manager.fighter.physics.changeVelocity("x", 0);
        manager.fighter.physics.changeVelocity("y", 0);
        manager.fighter.physics.changeKnockback("x", 0);
        manager.fighter.physics.changeKnockback("y", 0);
    }//end enter
    update(manager, input) {
        
        //then check for attacks to give them priority over movement.
        if (input.isLight(manager.fighter)) {manager.transition("LIGHT_ATTACK"); return}
        if (input.isHeavy(manager.fighter)) {manager.transition("HEAVY_ATTACK"); return}
        if (input.isSP_1(manager.fighter)) {manager.transition("SP_1"); return;}
        if (input.isSP_2(manager.fighter)) {manager.transition("SP_2"); return;}

        //check for movement first
        if (input.isForward(manager.fighter)) manager.transition("WALK_FWD");
        if (input.isBackward(manager.fighter)) manager.transition("WALK_BWD");
        if (input.isCrouch(manager.fighter)) {manager.transition("CROUCH")}
        if (input.isJump() && !manager.fighter.physics.isAirborne()){ manager.transition("JUMP"); return}
        
    }//end update
    getName() {
        return this.name;
    }//end getName
    getType() {
        return this.type;
    }//end getType
}//end Idle

/**Crouching state for a fighter, enables fighter to avoid SP_2 (ranged) attacks.
 * but does not allow the fighter to block.
 * @extends {Idle}
 */
export class Crouch extends Idle {
    constructor() {
        super("CROUCH");
    }//end ctor
    enter(manager) {
        super.enter(manager);
    }//end enter
    update(manager, input) {
        if (!input.isCrouch(manager.fighter)) manager.transition("IDLE");
        super.update(manager, input);
    }//end update
}

/** Moves the fighter toward its opponent.
 * @extends {Idle}
 */
export class WalkFwd extends Idle {
    constructor() {
        super("WALK_FWD");
    }//end ctor
    enter(manager) {
        manager.fighter.physics.changeVelocity("x", PHYSICS.walkFwdVelocity * manager.fighter.direction);
    }//end enter
    update(manager,input) {
        if (!input.isForward(manager.fighter)) manager.transition("IDLE");
        super.update(manager, input);
    }//end update
    exit(manager) {
        manager.fighter.physics.changeVelocity("x", 0);
    }
}//end WalkFwd

/**Moves the fighter away from its opponent.
 * @extends {Idle}
 */
export class WalkBwd extends Idle {
    constructor() {
        super("WALK_BWD");
    }//end ctor
    enter(manager) {
           manager.fighter.physics.changeVelocity("x", -PHYSICS.walkBwdVelocity * manager.fighter.direction);
    }//end enter
    update(manager, input) {
        if (!input.isBackward(manager.fighter)) { 
            manager.transition("IDLE"); 
        };

        if ( isInStartup(manager.fighter.opponent) && isInRangeOfAttack(manager.fighter, manager.fighter.opponent) ) {
            manager.transition("BLOCK");
            return;
        }
        super.update(manager, input);
    }//end update
    exit(manager) {
        manager.fighter.physics.changeVelocity("x", 0);
    }
}//end WalkFwd

/**Causes the player to jump.
 *  @extends {Idle}
 */
export class Jump extends Idle {
    constructor(state="JUMP") {
        super(state);
    }
    enter(manager) {
        manager.fighter.physics.changeVelocity("y", -PHYSICS.jumpVelocity);
    }//end enter
    update(manager, input) {

        let currentFrame = manager.fighter.spriteManager.currentFrame;
        if (input.isForward(manager.fighter)) {
            if (currentFrame === 0) {
                manager.transition("JUMP_FWD");
                return;
            }

            manager.fighter.physics.changeVelocity("x", PHYSICS.floatVelocity * manager.fighter.direction);
        }//end if input.isForward
    
        if (input.isBackward(manager.fighter)) {
            if (currentFrame === 0) {
                manager.transition("JUMP_BWD");
                return;
            }

            manager.fighter.physics.changeVelocity("x", -PHYSICS.floatVelocity * manager.fighter.direction);
        }//end if input.isBackward
    }//end update
}//end JumpState

/**Causes the player to jump toward its opponent.
 *  @extends {Jump}
 */
export class JumpForward extends Jump {
    constructor() {
        super("JUMP_FWD");
    }
    enter(manager) {
        manager.fighter.physics.changeVelocity("x", PHYSICS.floatVelocity * manager.fighter.direction);
    }//end enter
}//end JumpState

/**Causes the player to jump away from its opponent.
 *  @extends {Jump}
 */
export class JumpBack extends Jump {
    constructor(manager) {
        super("JUMP_BWD");
    }//end ctor
    enter(manager) {
        manager.fighter.physics.changeVelocity("x", -PHYSICS.floatVelocity * manager.fighter.direction);
    }//end enter
}//end JumpState

export class JumpAttack extends Jump {

}