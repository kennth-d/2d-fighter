import { getDistance } from "../../utils/AiUtils.js";
import { isInStartup } from "../../utils/isInStartup.js";
import { SP_2 } from "../fighter/AttackStates.js";
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
    enter(manager) {
        manager.fighter.input.setInput("forward", true);
    }
    update(manager) {
        const distance = getDistance(manager.fighter.pos.x, manager.fighter.opponent.pos.x);
        if (distance < 26) manager.transition("OBSERVE");
        const oppState = manager.fighter.opponent.stateManager.getState();
        if (oppState instanceof SP_2) manager.transition("CROUCHAI");
        if (isInStartup(manager.fighter.opponent))  {
            if (distance < 40) {
                manager.transition("DEFEND");
            } else {
                manager.transition("ENGAGE");
            }//end if-else
        }//end if
    }
    exit(manager) {
        manager.fighter.input.setInput("forward", false);
    }
}//end APPROACH