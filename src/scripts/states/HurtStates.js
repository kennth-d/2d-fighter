import { Idle } from "./MoveStates.js";
import { TIME } from "../utils/const.js";
/**Fighter hurt state, prevents other actions from being taken
 * while the fighter is in hitstun.
 */
export class Hurt extends Idle {
    constructor() {
        super("HURT");
    }
    enter(manager) {
        manager.fighter.spriteManager.setCurrentFrame(0);
        manager.fighter.physics.changeVelocity("x", 0);
    }//end  enter
    update(manager, input) {
        if (manager.fighter.hitstun > 0) {
            manager.fighter.hitstun -= TIME.delta;
            return;
        }
        manager.transition("IDLE");
        
    }//end update
    exit() {
    }
}//end Hurt
export class KO extends Idle {
    constructor() {
        super("KO");
    }
}// end KO