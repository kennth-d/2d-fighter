import { OBSERVE } from "./Observe.js";
import {isIncoming} from "../../utils/AiUtils.js";

/**
 * JumpIn state
 * the ai will jump
 * attack the opponent.
 */
export class CROUCHAI extends OBSERVE {
    constructor(stateName="CROUCHAI") {
        super(stateName);
        this.timer = .5;
    }//end ctor
    enter(manager) {
        manager.fighter.input.setInput("crouch", true);
    }
    update(manager, context) {
        // const opponent = context.opponent;
        // if(opponent.state.getName() === "SP_2") {
        //     for (const proj of opponent.projectiles)  {
        //         if (isIncoming(proj)) {
        //             return;
        //         } 
        //     }
        // } else {
        //     super.update(manager, context);
        //     return;
        // }//end if-else
       super.update(manager, context);
    }
    exit(manager) {
        manager.fighter.input.setInput("crouch", false);
    }
}//end JUMP