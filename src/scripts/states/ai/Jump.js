import { OBSERVE } from "./Observe.js";
import {APPROACH} from "./Approach.js";
import {RETREAT} from "./Retreat.js";
import {DEFEND} from "./Defend.js";

/**
 * Jump state
 * the ai will jump
 * attack the opponent.
 */
export class JUMP extends OBSERVE {
    constructor(stateName="JUMP") {
        super(stateName);
        this.timer = 0.15;
    }//end ctor
    enter(manager) {
        manager.fighter.input.setInput("jump", true);
        if (manager.lastState instanceof APPROACH) manager.fighter.input.setInput("forward", true);
        if (manager.lastState instanceof DEFEND || manager.lastState instanceof RETREAT) manager.fighter.input.setInput("backward", true); 

    };
    update(manager, context) {
        super.update(manager, context);
    };
    exit(manager) {
        manager.fighter.input.setInput("jump", false);
        manager.fighter.input.setInput("forward", false);
        manager.fighter.input.setInput("backward", false);
    };
};//end JUMP
