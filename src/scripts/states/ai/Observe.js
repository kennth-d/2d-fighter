import { AiState } from "./AiState.js";
import { getAction } from "../../utils/AiUtils.js";

const actions = new Set(["OBSERVE", "ENGAGE", "ANTI_AIR", "CROUCHAI", "DEFEND", "JUMP", "JUMP_F", "JUMP_B", "RETREAT"]);

/**
 * OBSERVE state
 * in this state the ai will attempt to get information
 * about the opponent and produce intent.
 */
export class OBSERVE extends AiState {
    constructor(stateName="OBSERVE") {
        super(stateName);
    }//end ctor
    enter(manager) {
        manager.fighter.input.clear();
    }//end update
    update(manager, context) {
        const action = getAction(context);

        manager.transition(action);

    }//end update
    exit(manager) {
        manager.fighter.input.clear();
    }//end update
}//end OBVSERVE
