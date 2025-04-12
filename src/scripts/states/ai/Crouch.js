import { AiState } from "./AiState.js";

/**
 * JumpIn state
 * the ai will jump
 * attack the opponent.
 */
export class CROUCHAI extends AiState {
    constructor(stateName="CROUCHAI") {
        super(stateName);
    }//end ctor
    enter(manager) {
        const dodge = Math.random() > 0.4 - (manager.healthFactor);
        if (dodge) manager.fighter.input.setInput("crouch", true);
    }
    update(manager) {
        const opp = manager.fighter.opponent;
        const state = opp.stateManager.getState();
        if (state.name != "SP_2") manager.transition("OBSERVE");
    }
    exit(manager) {
        manager.fighter.input.setInput("crouch", false);
    }
}//end JUMP