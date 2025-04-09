import { AiState } from "./AiState.js";

/**
 * DEFEND state
 * in this state the ai will attempt to
 * defend against the opponents attack.
 */
export class DEFEND extends AiState {
    constructor(stateName="DEFEND") {
        super(stateName);
    }//end ctor
    enter() {}
    update() {}
    exit() {}
}//end DEFEND