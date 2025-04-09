import { AiState } from "./AiState.js";
/**
 * ENGAGE state
 * in this state the ai will attempt to
 * attack the opponent.
 */
export class ENGAGE extends AiState {
    constructor(stateName="ENGAGE") {
        super(stateName);
    }//end ctor
    enter() {}
    update() {}
    exit() {}
}//end ENGAGE