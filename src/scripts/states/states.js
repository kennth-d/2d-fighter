// --- Base state class and Fighter states classes are defined here -- //
import { ATTACK_TYPE } from "../utils/battle.js";
import { ensureOnFLoor } from "../utils/collision.js";
import { TIME, GRAVITY, FLOOR, WALK_VELOCITY_FWD, WALK_VELOCITY_BWD, JUMP_VELOCITY } from "../utils/global.js"; 
export const characterStates = ["IDLE", "CROUCH", "WALK_FWD", "WALK_BWD", "JUMP", "LIGHT_ATTACK", "HEAVY_ATTACK", "JUMP_FWD", "JUMP_BWD"];

//--- State Infterface ---//
export class State {
    constructor(state) {
        this.name = state;
    }//end ctor
    enter() {
        console.log(`Entering: ${this.name} state.`);
    }//end enter
    exit() {
        console.log(`Exiting: ${this.name} state.`);
    }//end exit
    update() {
        console.log(`Updating: ${this.name} state.`);
    }//end update
    getName() {return this.name;}
}//end class State

//  -------------------------------  //
//  ---- Fighter State Classes ----  //
//  -------------------------------  //
export class Idle extends State {
    constructor(state="IDLE") {
        super(state);
    }
    enter(manager) {
        manager.fighter.velocity.x = 0;
        manager.fighter.velocity.y = 0;
        ensureOnFLoor(manager.fighter);
    }
    update(manager, input) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        
        if (input.isLight()) {
            manager.transition("LIGHT_ATTACK"); 
            return; }
        if (input.isHeavy())  {
            manager.transition("HEAVY_ATTACK");
            return;
        };
        
        if (input.isCrouch(manager.fighter)) manager.transition("CROUCH");
        if (input.isForward(manager.fighter)) manager.transition("WALK_FWD");
        if (input.isBackward(manager.fighter)) manager.transition("WALK_BWD");
        if (input.isJump()) manager.transition("JUMP");
    }
}//end Idle

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

export class WalkFwd extends Idle {
    constructor() {
        super("WALK_FWD");
    }//end ctor
    enter(manager) {
        manager.fighter.velocity.x = WALK_VELOCITY_FWD * manager.fighter.direction;
    }//end enter
    update(manager,input) {
        if (!input.isForward(manager.fighter)) manager.transition("IDLE");
        super.update(manager, input);
    }//end update
}//end WalkFwd

export class WalkBwd extends Idle {
    constructor() {
        super("WALK_BWD");
    }//end ctor
    enter(manager) {
        manager.fighter.velocity.x = -WALK_VELOCITY_BWD * manager.fighter.direction;
    }//end enter
    update(manager, input) {
        if (!input.isBackward(manager.fighter)) manager.transition("IDLE");
        super.update(manager, input);
    }//end update
}//end WalkFwd

export class Jump extends State {
    constructor(state="JUMP") {
        super(state);
    }
    enter(manager) {
        manager.fighter.velocity.y = -JUMP_VELOCITY;
    }
    update(manager, input) {
        if (input.isForward(manager.fighter)) manager.transition("JUMP_FWD");
        if (input.isBackward(manager.fighter)) manager.transition("JUMP_BWD");

        manager.fighter.pos.y += (manager.fighter.velocity.y * TIME.delta);
        manager.fighter.velocity.y += (GRAVITY * TIME.delta);

        if (manager.fighter.pos.y > FLOOR) manager.transition("IDLE");
    }
}//end JumpState

export class JumpForward extends Jump {
    constructor() {
        super("JUMP_FWD");
    }
    enter(manager) {
        manager.fighter.velocity.x = WALK_VELOCITY_FWD * manager.fighter.direction;
    }//end enter
    update(manager, input) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        manager.fighter.pos.y += (manager.fighter.velocity.y * TIME.delta);
        manager.fighter.velocity.y += (GRAVITY * TIME.delta);

        if (manager.fighter.pos.y > FLOOR) manager.transition("IDLE");
    }//end update
}//end JumpState
export class JumpBack extends Jump {
    constructor(manager) {
        super("JUMP_BWD");
    }//end ctor
    enter(manager) {
        manager.fighter.velocity.x = -WALK_VELOCITY_BWD * manager.fighter.direction;
    }//end enter
    update(manager, input) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        manager.fighter.pos.y += (manager.fighter.velocity.y * TIME.delta);
        manager.fighter.velocity.y += (GRAVITY * TIME.delta);

        if (manager.fighter.pos.y > FLOOR) manager.transition("IDLE");
    }//end update
}//end JumpState


export class LightAttack extends Idle {
    constructor() {
        super("LIGHT_ATTACK");
        this.attack = ATTACK_TYPE.LIGHT;
    }//end ctor
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        let lastFrame = manager.fighter.spriteManager.currentSprite.frames-1;
        let lastActiveFrame = lastFrame - 1;

        if (currentFrame != lastActiveFrame) {
            return;
        } else {
            manager.transition("IDLE");
        }//end if-else
    }//end update
}//end Light Attack

export class HeavyAttack extends Idle {
    constructor() {
        super("HEAVY_ATTACK");
        this.attack = ATTACK_TYPE.HEAVY;
    }
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        let lastFrame = manager.fighter.spriteManager.currentSprite.frames-1;
        if (currentFrame != lastFrame) {
            return;
        } else {
            manager.transition("IDLE");
        }
    }
}//end Heavy Attack
