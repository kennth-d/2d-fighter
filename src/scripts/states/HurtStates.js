import { Idle } from "./MoveStates.js";

/**Fighter hurt state, prevents other actions from being taken
 * while the fighter is in hitstun.
 */
export class Hurt extends Idle {
    constructor() {
        super("HURT");
    }
    enter(manager) {
        manager.fighter.spriteManger.setFrameZero();
    }
    update(manager, input) {

    }
}