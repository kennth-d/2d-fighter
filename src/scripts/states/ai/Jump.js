import { BOUNDARIES } from "../../utils/const.js";
import { AiState } from "./AiState.js";

/**
 * JumpIn state
 * the ai will jump
 * attack the opponent.
 */
export class JUMP extends AiState {
    constructor(stateName="JUMP") {
        super(stateName);
    }//end ctor
    enter(manager) {
        if (manager.lastAction === undefined) {
            manager.fighter.input.setInput("forward", true);
        } else if (manager.lastAction === "defend") {
            manager.fighter.input.setInpu("backward", true);
        }//end if

        manager.fighter.input.setInput("jump", true);
    }
    update(manager) {
        if (manager.fighter.pos.y > BOUNDARIES.FLOOR - 20) manager.transition("OBSERVE");
    }
    exit(manager) {
        manager.fighter.input.setInput("jump", false);
    }
}//end JUMP