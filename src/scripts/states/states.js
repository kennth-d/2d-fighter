// --- Base state class and Fighter states classes are defined here -- //
export const characterStates = ["IDLE", "WALK_FWD", "WALK_BWD", "JUMP", "LIGHT_ATTACK"];

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

export class IdleState extends State {
    constructor() {
        super("IDLE");
    }
    enter(fighter) {
        fighter.velocity.x = 0;
        fighter.velocity.y = 0;
    }
    update(manager, inputComponent) {
        if (inputComponent.isKeyDown('KeyD')) manager.transition("WALK_FWD");
        if (inputComponent.isKeyDown("KeyA")) manager.transition("WALK_BWD");
        if (inputComponent.isKeyDown("KeyW")) manager.transition("JUMP");
        if (inputComponent.isKeyDown("KeyJ")) manager.transition("LIGHT_ATTACK");
    }
}//end IdleState

export class WalkFwdState extends State {
    constructor() {
        super("WALK_FWD");
    }
    enter(fighter) {
        fighter.velocity.x = 150 * fighter.direction;
    }
    update(manager, inputComponent) {
        if (inputComponent.isKeyUp("KeyD")) manager.transition("IDLE");
    }
    
}//end WalkFwd

export class WalkBwdState extends State {
    constructor() {
        super("WALK_BWD");
    }
    enter(fighter) {
        fighter.velocity.x = -150 * fighter.direction;
    }
    update(manager, inputComponent) {
        if (inputComponent.isKeyUp("KeyA")) manager.transition("IDLE");
    }
}//end WalkFwd

export class JumpState extends State {
    constructor() {
        super("JUMP");
        this.frameTimer = 0;
    }
    update(manager, inputComponent) {
        this.frameTimer++;
        if (this.frameTimer == 2) { this.frameTimer = 0; manager.transition("IDLE"); }
    }
    
}//end WalkFwd

export class LightAttackState extends State {
    constructor() {
        super("LIGHT_ATTACK");
        this.combo = 0;
    }
    update(manager) {
        this.combo++;
        if (this.combo == 2) { this.combo = 0; manager.transition("IDLE"); }
    }
}