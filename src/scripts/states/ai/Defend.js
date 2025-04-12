import { AiState } from "./AiState.js";
import { isInStartup } from "../../utils/isInStartup.js";
import { getHealthFactor } from "../../utils/AiUtils.js";

/**
 * DEFEND state
 * in this state the ai will attempt to
 * defend against the opponents attack.
 */
export class DEFEND extends AiState {
    constructor(stateName="DEFEND") {
        super(stateName);
    }//end ctor
    enter(manager) {
        const opp = manager.fighter.opponent;
        
        const blockModifier = getHealthFactor(0, .1)
        const success = (manager.blockChance + blockModifier) > Math.random();
        if (success)
        if (!isInStartup(opp)) {
            manager.transition("OBSERVE");
        }//end if
    }
    update(manager) {
        const opp = manager.fighter.opponent;
        manager.fighter.input.setInput("backward", true);
        if (!opp.isAttacking()) manager.transition("OBSERVE");
    }
    exit(manager) {
        super.exit();
        manager.fighter.input.setInput("backward", false);
    }
}//end DEFEND