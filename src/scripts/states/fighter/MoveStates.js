/**
 * @module MoveStates
 * @description Contains Fighter states that relate to moving a Fighter.
 * States in this File: IDLE, Crouch, WalkFwd, WalkBwd, Jump, JumpBack, JumpForward
 */
import { PHYSICS } from "../../utils/const.js"; 
import { isInRangeOfAttack } from "../../utils/isInRangeOfAttack.js";
import { isInStartup } from "../../utils/isInStartup.js";
import { moveToward } from "../../utils/moveToward.js";
import { FighterState } from "./FighterState.js";

/**Root of all states, decides what state to transition to based on input.
 * @extends { StateInterface }
 */
export class IDLE extends FighterState {
    constructor(state="IDLE", type="move") {
        super();
        this.name = state;
        this.type = type;
    }
    enter(manager) {
        manager.fighter.physics.changeVelocity("x", 0);
        manager.fighter.physics.applyKnockback(0, 0);
    }//end enter
    update(manager, input) {
        
        //then check for attacks to give them priority over movement.
        if (input.isLight(manager.fighter)) {manager.transition("LIGHT_ATTACK"); return}
        if (input.isHeavy(manager.fighter)) {manager.transition("HEAVY_ATTACK"); return}
        if (input.isSP_1(manager.fighter)) {manager.transition("SP_1"); return}
        if (input.isSP_2(manager.fighter) && manager.fighter.projectileCooldown===0) {manager.transition("SP_2"); return;}

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
}//end IDLE

/**Crouching state for a fighter, enables fighter to avoid SP_2 (ranged) attacks.
 * but does not allow the fighter to block.
 * @extends {IDLE}
 */
export class CROUCH extends IDLE {
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
 * @extends {IDLE}
 */
export class WALK_FWD extends IDLE {
    constructor() {
        super("WALK_FWD");
    }//end ctor
    enter(manager) {
    }//end enter
    update(manager,input) {
        const fighter = manager.fighter;

        if (!input.isForward(fighter)) { 
            manager.transition("IDLE");
            return; 
        };
        const targetVelocity = fighter.direction * PHYSICS.maxWalkspeed;
        const currentVelocity = fighter.physics.velocity.x;

        const newVelocity = moveToward(currentVelocity, targetVelocity, PHYSICS.walkspeed);
        fighter.physics.changeVelocity("x", newVelocity);

        super.update(manager, input);
    }//end update
    exit(manager) {
        manager.fighter.physics.changeVelocity("x", 0);
    }
}//end WalkFwd

/**Moves the fighter away from its opponent.
 * @extends {IDLE}
 */
export class WALK_BWD extends IDLE {
    constructor() {
        super("WALK_BWD");
    }//end ctor
    enter(manager) {
    }//end enter
    update(manager, input) {
        const fighter = manager.fighter;

        if (!input.isBackward(fighter)) { 
            manager.transition("IDLE");
            return; 
        };
        const targetVelocity = fighter.direction * -PHYSICS.maxWalkspeed;
        const currentVelocity = fighter.physics.velocity.x;

        const newVelocity = moveToward(currentVelocity, targetVelocity, PHYSICS.walkspeed);
        fighter.physics.changeVelocity("x", newVelocity);

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
 *  @extends {IDLE}
 */
export class JUMP extends IDLE {
    constructor(state="JUMP") {
        super(state);
    }
    enter(manager) {
        manager.fighter.physics.changeVelocity("y", -PHYSICS.jumpVelocity);
    }//end enter
    update(manager, input) {
        const fighter = manager.fighter
        if (fighter.animationIsComplete() && fighter.physics.isAirborne()) {
            manager.transition("FALLING");
        }
        
        if (
            input.isForward(fighter) && 
            manager.lastState.name != "JUMP_FWD" && 
            manager.activeState.name != "FALLING"
        ) {
            manager.transition("JUMP_FWD");
        } else if (
            input.isBackward(fighter) && 
            manager.lastState.name != "JUMP_BWD" && 
            manager.activeState.name != "FALLING"
        ) {
            manager.transition("JUMP_BWD");
        }//end if-elif


        var targetVelocity; 
        var currentVelocity;
        var newVelocity;
        
        if (input.isForward(fighter)) {
            targetVelocity = fighter.direction * PHYSICS.maxFloatSpeed;
            currentVelocity = fighter.physics.velocity.x;
            newVelocity = moveToward(currentVelocity, targetVelocity, PHYSICS.airAcceleration);
            fighter.physics.changeVelocity("x", newVelocity);
        } else if (input.isBackward(fighter)) {
            targetVelocity = fighter.direction * -PHYSICS.maxFloatSpeed;
            currentVelocity = fighter.physics.velocity.x;
            newVelocity = moveToward(currentVelocity, targetVelocity, PHYSICS.airAcceleration);
            fighter.physics.changeVelocity("x", newVelocity);
        };//end if-elif 

        if (input.isLight(fighter)) {
            manager.transition("JUMP_ATTACK");
        };
    }//end update
}//end JumpState

/**Causes the player to jump toward its opponent.
 *  @extends {JUMP}
 */
export class JUMP_FWD extends JUMP {
    constructor() {
        super("JUMP_FWD");
    }
    enter(manager) {
    }//end enter
    update(manager, input) {
        super.update(manager, input)
    }//end update
}//end JUMPState

/**Causes the player to jump away from its opponent.
 *  @extends {JUMP}
 */
export class JUMP_BWD extends JUMP {
    constructor() {
        super("JUMP_BWD");
    };//end ctor
    enter() {
    };//end enter
    update(manager, input) {
        super.update(manager, input)
    }//end update
    
};//end JUMP_BWD

export class FALLING extends JUMP {
    constructor() {
        super("FALLING");
    }//end ctor
    enter() {}
    update(manager, input) { 
        super.update(manager, input);
    };//end update
};//end FALLING