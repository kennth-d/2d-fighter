/**
 * @module AttackStates
 * @description Contains Fighter states that relate to Fighter Attacks.
 * States in this File: LIGHT_ATTACK, HeavyAttack, SP_1, SP_2.
 */
import { IDLE } from "./MoveStates.js";

/** Base State class for an attack
 * @extends {Idle}
 */
export class ATTACK extends IDLE {
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
 * @extends {ATTACK}
 */
export class LIGHT_ATTACK extends ATTACK {
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
 * @extends {ATTACK}
 */
export class HEAVY_ATTACK extends ATTACK {
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
 * @extends {ATTACK}
 */
export class SP_1 extends ATTACK {
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
 * @extends {ATTACK}
 */
export class SP_2 extends ATTACK {
    constructor() {
        super("SP_2", "projectile");
        this.shotsFired = 0;
    }//end ctor
    enter(manager) {
        if (manager.fighter.projectileCooldown > 0) {
            manager.transition("IDLE");
            return;
        }
        manager.fighter.addProjectile();
        this.shotsFired++;
    }
    update(manager, input) {
        let currentFrame = manager.fighter.spriteManager.currentFrame;
        if (currentFrame < 9) {
            return;
        } 
        if (this.shotsFired === 3) {
            manager.transition("IDLE");
        }
        if (input.isSP_2() && this.shotsFired < 3) {
            manager.fighter.spriteManager.setCurrentFrame(2);
            manager.fighter.addProjectile();
            this.shotsFired++;
        } else {
            manager.transition("IDLE");
        }
    }//end update
    exit(manager) {
        manager.fighter.projectileCooldown = 1;
    }//end exit
}//end SP_2