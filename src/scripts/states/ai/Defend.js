import { AiState } from "./AiState.js";
import { getAction } from "../../utils/AiUtils.js";

/**
 * DEFEND state
 * in this state the ai will attempt to
 * defend against the opponents attack.
 */
export class DEFEND extends AiState {
    constructor(stateName="DEFEND") {
        super(stateName);
    }//end ctor
    enter(manager) {
        manager.fighter.input.setInput("backward", true);
    }
    update(manager, context) {
        const {self, opponent, distance} = context;

        if (!opponent.isAttacking || distance > 48) {
            const action = getAction(context);
            manager.transition(action);
        } 
    }
    exit(manager) {
        manager.fighter.input.setInput("backward", false);
    }
}//end DEFEND