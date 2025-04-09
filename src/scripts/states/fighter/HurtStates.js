import { IDLE } from "./MoveStates.js";
import { TIME } from "../../utils/const.js";
/**Fighter hurt state, prevents other actions from being taken
 * while the fighter is in hitstun.
 */
export class HURT extends IDLE {

    constructor(state="HURT") {
        super(state);
    }
    enter(manager) {
        this.combo++
        manager.fighter.spriteManager.setCurrentFrame(0);
        manager.fighter.physics.changeVelocity("x", 0);
    };//end  enter
    update(manager, input) {

        if (manager.fighter.hitstun > 0) {
            manager.fighter.hitstun = Math.max(0, manager.fighter.hitstun - TIME.delta);
            return;
        };
        manager.transition("IDLE");
        
    };//end update
};//end Hurt
export class KO extends IDLE {
    constructor() {
        super("KO");
    };//end ctor
};// end KO

export class KNOCKBACK extends HURT { 
    constructor() {
        super("KNOCKBACK");
    }//end ctor
}//end if