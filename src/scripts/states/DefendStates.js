import { TIME } from "../utils/const.js";
import { isInRangeOfAttack } from "../utils/isInRangeOfAttack.js";
import { Idle } from "./MoveStates.js";
import { isInStartup } from "../utils/isInStartup.js";
/**Fighter block state, while in this state
 * any damage taken will be dealt to energy
 * if energy is empty, health is damaged.
 */
export class Block extends Idle {
    constructor() {
        super("BLOCK", "block");
    }
    enter(manager) {
        manager.fighter.physics.changeVelocity("x", 0);
    }
    update(manager, input) {
        if (isInStartup(manager.fighter.opponent) && isInRangeOfAttack(manager.fighter, manager.fighter.opponent)) {
            return;
        }
        if (manager.fighter.blockstun > 0) {
            manager.fighter.blockstun -= TIME.delta;
            return;
        }
        manager.transition("IDLE");
    }
    exit(manager) {
        manager.fighter.physics.changeKnockback("x", 0);
        manager.fighter.physics.changeKnockback("y", 0);
    }
}//end block