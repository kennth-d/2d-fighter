/**
 * @module AttackStates
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
        this.range = 0;
    }//end ctor
    exit(manager) {
        manager.fighter.setHasHit(false);
    }//end exit
    getRange() {
        return this.range;
    }
}//end AttackState

/** more reach and damage than light attack at the cost of speed.
 * @extends {Attack}
 */
export class LightAttack extends Attack {
    constructor() {
        super("LIGHT_ATTACK");
        this.range = 15;
        this.strikeCount = 0;
    }//end ctor
    enter(manager) {
        this.strikeCount++;
    }
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        
        if (currentFrame < 6) {
            return;
        }
        
        //combo input
        if (input.isHeavy()) {
            manager.transition("HEAVY_ATTACK");
            return;
        }

        //combo input
        if (input.isLight() && this.strikeCount < 2) {
            manager.fighter.setHasHit(false);
            manager.fighter.spriteManager.currentFrame = 3;
            this.strikeCount++;
        }

        if (manager.fighter.animationIsComplete()) {
            manager.transition("IDLE");
        }//end if-else
    }//end update
    exit(manager) {
        this.strikeCount = 0;
        super.exit(manager);
    }
}//end Light Attack

/**Heavy attack, slower, medium damage, can chain into SP_1.
 * @extends {Attack}
 */
export class HeavyAttack extends Attack {
    constructor() {
        super("HEAVY_ATTACK");
        this.range = 25;
    }
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;

        //attack start up
        if (currentFrame < 5) {
            return;
        }

        //combo input
        if (input.isSP_1() && manager.fighter.hasHit) {
            manager.transition("SP_1");
            return;
        }
        if (input.isSP_2() && manager.fighter.hasHit) {
            manager.transition("SP_2");
            return;
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
        this.range = 30;
    }//end ctor
    update(manager, input) {

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
    }//end ctor
    enter(manager) {
        manager.fighter.addProjectile();
    }
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        if (currentFrame < 9) {
            return;
        } 
        if (input.isSP_2()) {
            manager.fighter.spriteManager.setCurrentFrame(2);
            manager.transition("SP_2");
        } else {
            manager.transition("IDLE");
        }//end if-else
    }//end update
}//end SP_2