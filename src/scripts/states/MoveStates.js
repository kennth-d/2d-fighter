/**
 * @module MoveStates
 * @description Contains Fighter states that relate to moving a Fighter.
 * States in this File: Idle, Crouch, WalkFwd, WalkBwd, Jump, JumpBack, JumpForward
 */
import { StateInterface } from "./StateInterface.js";
import { TIME, PHYSICS, BOUNDARIES } from "../utils/const.js"; 

/**Root of all states, decides what state to transition to based on input.
 * @extends { StateInterface }
 */
export class Idle extends StateInterface {
    constructor(state="IDLE", type="move") {
        super();
        this.name = state;
        this.type = type;
    }
    enter(manager) {
        manager.fighter.velocity.x = 0;
        manager.fighter.velocity.y = 0;
    }
    update(manager, input) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        
        //check for movement first
        if (input.isCrouch(manager.fighter)) manager.transition("CROUCH");
        if (input.isForward(manager.fighter)) manager.transition("WALK_FWD");
        if (input.isBackward(manager.fighter)) manager.transition("WALK_BWD");
        if (input.isJump()) manager.transition("JUMP");

        //then check for attacks
        if (input.isLight(manager.fighter)) manager.transition("LIGHT_ATTACK");
        if (input.isHeavy(manager.fighter)) manager.transition("HEAVY_ATTACK");
        if (input.isSP_1(manager.fighter)) manager.transition("SP_1");
        if (input.isSP_2(manager.fighter)) manager.transition("SP_2");
    }
    getName() {
        return this.name;
    }
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
        manager.fighter.velocity.x = PHYSICS.walkFwdVelocity * manager.fighter.direction;
    }//end enter
    update(manager,input) {
        if (!input.isForward(manager.fighter)) manager.transition("IDLE");
        super.update(manager, input);
    }//end update
}//end WalkFwd

/**Moves the fighter away from its opponent.
 * @extends {Idle}
 */
export class WalkBwd extends Idle {
    constructor() {
        super("WALK_BWD");
    }//end ctor
    enter(manager) {
        manager.fighter.velocity.x = -PHYSICS.walkBwdVelocity * manager.fighter.direction;
    }//end enter
    update(manager, input) {
        if (!input.isBackward(manager.fighter)) manager.transition("IDLE");
        super.update(manager, input);
    }//end update
}//end WalkFwd

/**Causes the player to jump.
 *  @extends {Idle}
 */
export class Jump extends Idle {
    constructor(state="JUMP") {
        super(state);
    }
    enter(manager) {
        manager.fighter.velocity.y = -PHYSICS.jumpVelocity;
    }//end enter
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        if (input.isForward(manager.fighter)) {
            if (currentFrame === 0) {
                manager.transition("JUMP_FWD");
                return;
            }
            manager.fighter.velocity.x = PHYSICS.floatVelocity * manager.fighter.direction;
            manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        }//end if input.isForward
    
        if (input.isBackward(manager.fighter)) {
            if (currentFrame === 0) {
                manager.transition("JUMP_BWD");
                return;
            }
            manager.fighter.velocity.x = -PHYSICS.floatVelocity * manager.fighter.direction;
            manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        }//end if input.isBackward
        
        manager.fighter.pos.y += (manager.fighter.velocity.y * TIME.delta);
        manager.fighter.velocity.y += (PHYSICS.gravity * TIME.delta);

        if (manager.fighter.pos.y > BOUNDARIES.FLOOR) manager.transition("IDLE");
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
        manager.fighter.velocity.x = PHYSICS.floatVelocity * manager.fighter.direction;
    }//end enter
    update(manager, input) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        manager.fighter.pos.y += (manager.fighter.velocity.y * TIME.delta);
        manager.fighter.velocity.y += (PHYSICS.gravity * TIME.delta);

        if (manager.fighter.pos.y > BOUNDARIES.FLOOR) manager.transition("IDLE");
    }//end update
}//end JumpState

/**Causes the player to jump away from its opponent.
 *  @extends {Jump}
 */
export class JumpBack extends Jump {
    constructor(manager) {
        super("JUMP_BWD");
    }//end ctor
    enter(manager) {
        manager.fighter.velocity.x = -PHYSICS.floatVelocity * manager.fighter.direction;
    }//end enter
    update(manager, input) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        manager.fighter.pos.y += (manager.fighter.velocity.y * TIME.delta);
        manager.fighter.velocity.y += (PHYSICS.gravity * TIME.delta);

        if (manager.fighter.pos.y > BOUNDARIES.FLOOR) manager.transition("IDLE");
    }//end update
}//end JumpState