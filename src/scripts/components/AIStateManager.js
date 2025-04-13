import { AiState } from "../states/ai/AiState.js";
import * as aiStates from "../states/AIStates.js";
import { getDistance, getFighterStatus } from "../utils/AiUtils.js";

const MAX_HEALTH_FACTOR = 0.3;
export class AiStateManager {
    constructor(fighter) {
        this.fighter = fighter;
        this.state = new aiStates.OBSERVE();
        this.lastState = this.state;
        this.nextAction; //for debugging
        this.lastAttack = undefined;
        this.blockChance = .75;
    }//end ctor
    update() {
        if (this.fighter.input.isDisabled()) return;

        const context = {
            self: getFighterStatus(this.fighter),
            opponent: getFighterStatus(this.fighter.opponent),
            distance: getDistance(this.fighter.pos.x, this.fighter.opponent.pos.x),
        };

        this.state.update(this, context);
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
}//end FighterStateManger