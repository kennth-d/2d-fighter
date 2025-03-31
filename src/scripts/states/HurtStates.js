import { Idle } from "./MoveStates.js";
import { TIME } from "../utils/const.js";
/**Fighter hurt state, prevents other actions from being taken
 * while the fighter is in hitstun.
 */
export class Hurt extends Idle {
    constructor() {
        super("HURT");
        this.hitstun;
    }
    enter(manager, hitstun, knockback) {
        manager.fighter.spriteManager.setCurrentFrame(0);
        this.hitstun = hitstun;
        manager.fighter.physics.changeVelocity("x", 0);
        //juggle
        if (manager.fighter.physics.isAirBorne()) {
            manager.fighter.physics.changeKnockback("y", knockback);
        }//end if 
        manager.fighter.physics.changeKnockback("x", knockback * manager.fighter.opponent.direction);
    }//end  enter
    update(manager, input) {
        if (this.hitstun > TIME.delta) {
            this.hitstun -= TIME.delta;
            return;
            //manager.transition("IDLE");
        } else {
            manager.transition("IDLE");
        }
        
        //TODO: add escape logic.
        //if input.isleft transition to escapeDir
    }//end update
    exit(manager) {
        manager.fighter.physics.changeKnockback("x", 0);
    }//end exit
}