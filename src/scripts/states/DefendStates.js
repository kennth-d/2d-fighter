import { Idle } from "./MoveStates.js";

/**Fighter block state, while in this state
 * any damage taken will be dealt to energy
 * if energy is empty, health is damaged.
 */
export class Block extends Idle {
    constructor() {
        super("BLOCK");
        this.remainingHitstun;
    }
    enter(manager) {

    }
    update(manager, input) {

    }
}