import { OBSERVE } from "./Observe.js";

/**
 * RETREAT state
 * in this state the ai will attempt create space
 * between it and the opponent.
 */
export class RETREAT extends OBSERVE {
    constructor(stateName="RETREAT") {
        super(stateName);
    }//end ctor
    enter(manager) {
        manager.fighter.input.setInput("backward", true);
    }//end enter
    update(manager, context) {
        super.update(manager, context);
    }//end update
    exit(manager) {
        manager.fighter.input.setInput("backward", false);
    }//end exit
}//end RETREAT