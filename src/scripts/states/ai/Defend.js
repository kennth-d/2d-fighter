import { OBSERVE } from "./Observe.js";

/**
 * DEFEND state
 * in this state the ai will attempt to
 * defend against the opponents attack.
 */
export class DEFEND extends OBSERVE {
    constructor(stateName="DEFEND") {
        super(stateName);
    }//end ctor
    enter(manager) {
        manager.fighter.input.setInput("backward", true);
    }
    update(manager, context) {
        super.update(manager, context);
    }
    exit(manager) {
        manager.fighter.input.setInput("backward", false);
    }
}//end DEFEND