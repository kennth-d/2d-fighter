/**
 * @module MoveStates
 * @description Contains Fighter states that relate to Fighter Attacks.
 * States in this File: LightAttack, HeavyAttack, SP_1, SP_2.
 */
import { Idle } from "./MoveStates.js";

/** Base State class for an attack
 * @extends {Idle}
 */
export class Attack extends Idle {
    constructor(state) {
        super(state, "attack");
        this.damage;
        this.hitstun;
    }//end ctor
}//end AttackState

/** more reach and damage than light attack at the cost of speed.
 * @extends {Attack}
 */
export class LightAttack extends Attack {
    constructor() {
        super("LIGHT_ATTACK");
        this.damage = 3;
        this.hitstun = 2;
    }//end ctor
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        let lastFrame = manager.fighter.spriteManager.currentSprite.frames-1;
        
        //start up
        if (currentFrame < 7) {
            return;
        }

        //combo input
        if (input.isHeavy()) {
            manager.transition("HEAVY_ATTACK");
        }

        //combo input
        if (input.isLight()) {
            manager.fighter.spriteManager.currentFrame = 2;
            manager.transition("LIGHT_ATTACK");
        }

        if (manager.fighter.animationIsComplete()) {
            manager.transition("IDLE");
        }//end if-else
    }//end update
}//end Light Attack

/**Heavy attack, slower, medium damage, can chain into SP_1.
 * @extends {Attack}
 */
export class HeavyAttack extends Attack {
    constructor() {
        super("HEAVY_ATTACK");
        this.damage = 6;
        this.hitstun = 4;
    }
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;

        //attack start up
        if (currentFrame < 5) {
            return;
        }

        //combo input
        if (input.isSP_1()) {
            manager.transition("SP_1");
        }
        if (manager.fighter.animationIsComplete()) {
            manager.transition("IDLE");
        }
    }
}//end Heavy Attack

/** Special attack high damage, must fully complete animation before exiting.
 * @extends {Attack}
 */
export class SP_1 extends Attack {
    constructor() {
        super("SP_1");
        this.damage = 10;
        this.hitstun = 4;
    }//end ctor
    update(manager, input) {
        if (!manager.fighter.animationIsComplete()) {
            return;
        } else {
            manager.transition("IDLE");
        }//end if-else
    }//end update
}//end SP_1

/** ranged attack option, medium damage.
 * @extends {Attack}
 */
export class SP_2 extends Attack {
    constructor() {
        super("SP_2");
        this.damage = 4;
        this.hitstun = 2;
        this.shotsFired =  0;
    }//end ctor
    enter() {
    }
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        
        if (currentFrame < 9) {
            return;
        } 
        if (input.isSP_2() && this.shotsFired < 2) {
            manager.fighter.spriteManager.setCurrentFrame(2);
            this.shotsFired++;
        } else {
            manager.transition("IDLE");
            this.shotsFired = 0;
        }//end if-else
    }//end update
}//end SP_2