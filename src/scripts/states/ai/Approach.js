import { AiState } from "./AiState.js";

/**
 * APPROACH state
 * in this state the ai will attempt to
 * attack the opponent.
 */
export class APPROACH extends AiState {
    constructor(stateName="APPROACH") {
        super(stateName);
    }//end ctor
    enter() {}
    update() {}
    exit() {}
}//end APPROACH