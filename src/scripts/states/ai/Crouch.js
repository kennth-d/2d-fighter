import { AiState } from "./AiState.js";
import {isIncoming} from "../../utils/AiUtils.js";

/**
 * JumpIn state
 * the ai will jump
 * attack the opponent.
 */
export class CROUCHAI extends AiState {
    constructor(stateName="CROUCHAI") {
        super(stateName);
        this.timer = .5;
    }//end ctor
    enter(manager) {
        manager.fighter.input.setInput("crouch", true);
    }
    update(manager, context) {
        const opponent = context.opponent;
        if(opponent.state.getName() === "SP_2") {
            for (const proj of opponent.projectiles)  {
                if (isIncoming(proj)) {
                    return;
                } 
            }
        } else {
            manager.transition("OBSERVE");
        }
       
    }
    exit(manager) {
        manager.fighter.input.setInput("crouch", false);
    }
}//end JUMP