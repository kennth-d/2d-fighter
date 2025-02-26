// --- Base state class and Fighter states classes are defined here -- //

import { TIME, GRAVITY, FLOOR, WALK_VELOCITY, JUMP_VELOCITY } from "../utils/global.js"; 
import { EnsureOnScreen } from "../utils/utilityFunctions.js";
export const characterStates = ["IDLE", "WALK_FWD", "WALK_BWD", "JUMP", "LIGHT_ATTACK", "HEAVY_ATTACK", "JUMP_FWD", "JUMP_BWD"];

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
    }
    update(manager, input) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        if (input.isKeyDown("KeyJ")) {
            manager.transition("LIGHT_ATTACK"); 
            return; }
        if (input.isKeyDown("KeyK"))  {
            manager.transition("HEAVY_ATTACK");
            return;
        };
    
        if (input.isKeyDown('KeyD')) manager.transition("WALK_FWD");
        if (input.isKeyDown("KeyA")) manager.transition("WALK_BWD");
        if (input.isKeyDown("KeyW")) manager.transition("JUMP");
    }
}//end Idle

export class WalkFwd extends Idle {
    constructor() {
        super("WALK_FWD");
    }//end ctor
    enter(manager) {
        manager.fighter.velocity.x = WALK_VELOCITY * manager.fighter.direction;
    }//end enter
    update(manager,input) {
        EnsureOnScreen(manager.fighter);
        if (input.isKeyUp("KeyD")) manager.transition("IDLE");
        super.update(manager, input);
    }//end update
}//end WalkFwd

export class WalkBwd extends Idle {
    constructor() {
        super("WALK_BWD");
    }//end ctor
    enter(manager) {
        manager.fighter.velocity.x = -WALK_VELOCITY * manager.fighter.direction;
    }//end enter
    update(manager, input) {
        EnsureOnScreen(manager.fighter);
        if (input.isKeyUp("KeyA")) manager.transition("IDLE");    
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
        if (input.isKeyDown("KeyD")) manager.transition("JUMP_FWD");
        if (input.isKeyDown("KeyA")) manager.transition("JUMP_BWD");

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
        manager.fighter.velocity.x = WALK_VELOCITY * manager.fighter.direction;
    }//end enter
    update(manager, input) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        manager.fighter.pos.y += (manager.fighter.velocity.y * TIME.delta);
        manager.fighter.velocity.y += (GRAVITY * TIME.delta);

        EnsureOnScreen(manager.fighter);
        if (manager.fighter.pos.y > FLOOR) manager.transition("IDLE");
    }//end update
}//end JumpState
export class JumpBack extends Jump {
    constructor(manager) {
        super("JUMP_BWD");
    }//end ctor
    enter(manager) {
        manager.fighter.velocity.x = -WALK_VELOCITY * manager.fighter.direction;
    }//end enter
    update(manager, input) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        manager.fighter.pos.y += (manager.fighter.velocity.y * TIME.delta);
        manager.fighter.velocity.y += (GRAVITY * TIME.delta);

        EnsureOnScreen(manager.fighter);
        if (manager.fighter.pos.y > FLOOR) manager.transition("IDLE");
    }//end update
}//end JumpState

export class LightAttack extends Idle {
    constructor() {
        super("LIGHT_ATTACK");
    }//end ctor
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        let lastFrame = manager.fighter.spriteManager.currentSprite.frames - 1;
        console.log(`currentFrame: ${currentFrame}, lastFrame: ${lastFrame}`);
        if (currentFrame != lastFrame) {
            return;
        } else {
            manager.transition("IDLE");
        }//end if-else
    }//end update
}//end Light Attack

export class HeavyAttack extends Idle {
    constructor() {
        super("HEAVY_ATTACK");
    }
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        let lastFrame = manager.fighter.spriteManager.currentSprite.frames - 1;
        console.log(`currentFrame: ${currentFrame}, lastFrame: ${lastFrame}`);
        if (currentFrame != lastFrame) {
            return;
        } else {
            manager.transition("IDLE");
        }
    }
}//end Heavy Attack