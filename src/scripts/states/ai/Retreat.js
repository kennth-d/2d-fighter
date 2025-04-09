import { AiState } from "./AiState.js";

/**
 * RETREAT state
 * in this state the ai will attempt create space
 * between it and the opponent.
 */
export class RETREAT extends AiState {
    constructor(stateName="RETREAT") {
        super(stateName);
    }//end ctor
    enter() {}
    update() {}
    exit() {}
}//end RETREAT