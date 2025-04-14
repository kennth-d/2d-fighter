import { OBSERVE } from "./Observe.js";

/**
 * APPROACH state
 * in this state the ai will attempt to
 * attack the opponent.
 */
export class APPROACH extends OBSERVE {
    constructor(stateName="APPROACH") {
        super(stateName);
        this.timer = .5;

    }//end ctor
    enter(manager) {
        manager.fighter.input.setInput("forward", true);
    }//end enter
    update(manager, context) {
        super.update(manager, context);
    }//end update
    exit(manager) {
        manager.fighter.input.setInput("forward", false);
    }
}//end APPROACH