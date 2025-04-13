import { AiState } from "./AiState.js";
import { getWeightedRandom } from "../../utils/AiUtils.js";
import { TIME } from "../../utils/const.js";

/**
 * RETREAT state
 * in this state the ai will attempt create space
 * between it and the opponent.
 */
export class RETREAT extends AiState {
    constructor(stateName="RETREAT") {
        super(stateName);
        this.timer = .5;
    }//end ctor
    enter(manager) {
        manager.fighter.input.setInput("backward", true);
    }//end enter
    update(manager, context) {
        const opponent = context.opponent;
        this.timer -= TIME.delta;
        const threat = opponent.isAttacking;
        const rangedThreat = opponent.state.getName() === "SP_2";
        if (threat) manager.transition("DEFEND");
        if (rangedThreat) manager.transition("CROUCHAI");

        if (context.distance > 45) {
            const action = getWeightedRandom([{action:"APPROACH", weight:70}, {action:"ENGAGE", weight:30}]);
            manager.transition(action);
        } 
    }//end update
    exit(manager) {
        manager.fighter.input.setInput("backward", false);
    }//end exit
}//end RETREAT