import { AiState } from "./AiState.js";
/**
 * OBSERVE state
 * in this state the ai will attempt to get information
 * about the opponent and produce intent.
 */
export class OBSERVE extends AiState {
    constructor(stateName="OBSERVE") {
        super(stateName);
    }//end ctor
    enter() {}
    update() {}
    exit() {}
}//end OBVSERVE