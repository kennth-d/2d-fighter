import { AiState } from "../states/ai/AiState.js";
import * as aiStates from "../states/AIStates.js";
import { MAX_HEALTH } from "../utils/const.js";

const MAX_HEALTH_FACTOR = 0.3;
export class AiStateManager {
    constructor(fighter) {
        this.fighter = fighter;
        this.state = new aiStates.OBSERVE();
        this.lastState = this.state;
        this.nextAction;
        this.lastAttack = undefined;
        this.healthFactor = 1 - this.fighter.health / MAX_HEALTH;
        this.blockChance = .75;
    }//end ctor
    update() {
        if (this.fighter.input.isDisabled()) return;
        this.healthFactor = Math.max(0.2, 1 - (this.fighter.health / MAX_HEALTH));

        this.state.update(this);
    }//end update
    /**Changes currentState to newState and calls newState.enter()
     * @param {AiState} newState desired ai state to enter.
     * */
    transition(newState) {
        let validState = aiStates[newState];
        if (!validState) throw new Error("desired state is not an AI state: ", newState);
        if (this.state.name === newState) return;

        this.state.exit(this);
        this.lastState = this.state;
        this.state = new aiStates[newState]();
        this.state.enter(this);
    }//end transition
}//end FighterStateManger.