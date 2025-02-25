// --- Base state class and Fighter states classes are defined here -- //

import { TIME, GRAVITY, FLOOR, WALK_VELOCITY, JUMP_VELOCITY } from "../utils/global.js"; 

export const characterStates = ["IDLE", "WALK_FWD", "WALK_BWD", "JUMP", "LIGHT_ATTACK", "HEAVY_ATTACK", "JUMP_FWD", "JUMP_BWD"];

//--- State Infterface ---//
export class State {
    constructor(name) {
        this.name = name;
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
    update(manager, inputComponent) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        if (inputComponent.isKeyDown("KeyJ")) manager.transition("LIGHT_ATTACK");
        if (inputComponent.isKeyDown("KeyK")) manager.transition("HEAVY_ATTACK");
        if (inputComponent.isKeyDown('KeyD')) manager.transition("WALK_FWD");
        if (inputComponent.isKeyDown("KeyA")) manager.transition("WALK_BWD");
        if (inputComponent.isKeyDown("KeyW")) manager.transition("JUMP");
    }
}//end Idle

export class WalkFwd extends Idle {
    constructor() {
        super("WALK_FWD");
    }
    enter(manager) {
        manager.fighter.velocity.x = WALK_VELOCITY;
    }
    update(manager, inputComponent) {
        super.update(manager, inputComponent);
        if (inputComponent.isKeyUp("KeyD")) manager.transition("IDLE");
    }
    
}//end WalkFwd

export class WalkBwd extends Idle {
    constructor() {
        super("WALK_BWD");
    }
    enter(manager) {
        manager.fighter.velocity.x = -WALK_VELOCITY;
    }
    update(manager, inputComponent) {
        super.update(manager, inputComponent);
        if (inputComponent.isKeyUp("KeyA")) manager.transition("IDLE");   
    }
}//end WalkFwd

export class Jump extends State {
    constructor(state="JUMP") {
        super(state);
    }
    enter(manager) {
        manager.fighter.velocity.y = -JUMP_VELOCITY;
    }
    update(manager, inputComponent) {
        if (inputComponent.isKeyDown("KeyD")) manager.transition("JUMP_FWD");
        if (inputComponent.isKeyDown("KeyA")) manager.transition("JUMP_BWD");

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
        manager.fighter.velocity.x = WALK_VELOCITY;
    }
    update(manager, inputComponent) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        manager.fighter.pos.y += (manager.fighter.velocity.y * TIME.delta);
        manager.fighter.velocity.y += (GRAVITY * TIME.delta);
        if (manager.fighter.pos.y > FLOOR) manager.transition("IDLE");
    }
}//end JumpState

export class JumpBack extends Jump {
    constructor() {
        super("JUMP_BWD");
    }
    enter(manager) {
        manager.fighter.velocity.x = -WALK_VELOCITY;
    }
    update(manager, inputComponent) {
        manager.fighter.pos.x += (manager.fighter.velocity.x * TIME.delta);
        manager.fighter.pos.y += (manager.fighter.velocity.y * TIME.delta);
        manager.fighter.velocity.y += (GRAVITY * TIME.delta);
        if (manager.fighter.pos.y > FLOOR) manager.transition("IDLE");
    }
}//end JumpState
export class LightAttack extends Idle {
    constructor() {
        super("LIGHT_ATTACK");
    }
    update(manager, inputComponent) {
        super.update(manager, inputComponent);
    }
}//end Light Attack

export class HeavyAttack extends Idle {
    constructor() {
        super("HEAVY_ATTACK");
    }
    update(manager, inputComponent) {
        super.update(manager, inputComponent);
    }
}//end Light Attack