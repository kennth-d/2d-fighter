import { AiState } from "./AiState.js";
import { getAction } from "./ai-callbacks/getAction.js";

/**
 * OBSERVE state
 * in this state the ai will attempt to get information
 * about the opponent and produce an action.
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
