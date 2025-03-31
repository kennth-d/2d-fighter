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
    constructor(state, type="attack") {
        super(state, type);
    }//end ctor
    exit(manager) {
        manager.fighter.setHasHit(false);
    }//end exit
}//end AttackState

/** more reach and damage than light attack at the cost of speed.
 * @extends {Attack}
 */
export class LightAttack extends Attack {
    constructor() {
        super("LIGHT_ATTACK");
    }//end ctor
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        
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
    }//end ctor
    update(manager, input) {
        //for debugging
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        //if ((currentFrame === 4 || currentFrame === 5) && manager.fighter.name === "F002") console.log(manager.fighter.boxes.hit);
        if (manager.fighter.animationIsComplete()) {
            manager.transition("IDLE");
        };
    }//end update
}//end SP_1

/** ranged attack option, medium damage.
 * @extends {Attack}
 */
export class SP_2 extends Attack {
    constructor() {
        super("SP_2", "projectile");
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