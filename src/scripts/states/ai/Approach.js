
import { getAction } from "../../utils/AiUtils.js";
import { TIME } from "../../utils/const.js";

import { AiState } from "./AiState.js";

/**
 * APPROACH state
 * in this state the ai will attempt to
 * attack the opponent.
 */
export class APPROACH extends AiState {
    constructor(stateName="APPROACH") {
        super(stateName);
        this.timer = .5;

    }//end ctor
    enter(manager) {
        manager.fighter.input.setInput("forward", true);
    }
    update(manager, context) {
        const opponent = context.opponent;
        this.timer -= TIME.delta;
        const threat = opponent.isAttacking;
        const rangedThreat = opponent.state.getName() === "SP_2";

        if (rangedThreat)  {
            manager.transition("CROUCHAI");
            return;
        }
        if (threat) {
            manager.transition("DEFEND");
            return;
        } 
        
        if (context.distance < 26)  {
            manager.transition("OBSERVE");
            return;
        }

    }
    exit(manager) {
        manager.fighter.input.setInput("forward", false);
    }
}//end APPROACH