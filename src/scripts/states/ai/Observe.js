import { AiState } from "./AiState.js";
import { getDistance, getHealthFactor, getNextAction} from "../../utils/AiUtils.js";

/**
 * OBSERVE state
 * in this state the ai will attempt to get information
 * about the opponent and produce intent.
 */
export class OBSERVE extends AiState {
    constructor(stateName="OBSERVE") {
        super(stateName);
    }//end ctor
    enter(manager) {
        manager.fighter.input.clear();
    }
    update(manager) {
        const hf = getHealthFactor(manager.fighter, -.1, .5) * 100;
        manager.nextAction = getNextAction(manager.fighter);
        const distance = getDistance(manager.fighter.pos.x, manager.fighter.opponent.pos.x);
        if (distance > 50 + hf && !manager.nextAction) manager.transition("APPROACH");
        
        if (manager.nextAction === "defend") manager.transition("DEFEND");

        if (manager.nextAction === "attack") manager.transition("ENGAGE");

        if (manager.nextAction === "jump") {
            const jump = (Math.random() > 0.999);
            if (jump) manager.transition("JUMP");
            return;
        }
        if (manager.nextAction === "anti-air") {
            manager.transition("ANTI_AIR");
            return;
        } 
        
        if (manager.nextAction === "crouch") {
            manager.transition("CROUCHAI");
            return;
        } 
    }
    exit(manager) {
        super.exit();
    }
}//end OBVSERVE