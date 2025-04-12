import { AiState } from "./AiState.js";
import { getOpponentDistance, getAttack } from "../../utils/AiUtils.js";
import { TIME } from "../../utils/const.js";
import { HURT } from "../fighter/HurtStates.js"
import { BLOCK } from "../fighter/DefendStates.js";

export const attackToInput = {
    "LIGHT_ATTACK": "light",
    "HEAVY_ATTACK": "heavy",
    "SP_1": "sp1",
    "SP_2": "sp2",
    "JUMP_ATTACK": "light",
}
export const nextAttack = {
    "undefined" : "light",
    "LIGHT_ATTACK" : "heavy",
    "HEAVY_ATTACK" : "sp1",
}
/**
 * ENGAGE state
 * in this state the ai will attempt to
 * attack the opponent.
 */
export class ENGAGE extends AiState {
    constructor(stateName="ENGAGE") {
        super(stateName);
        this.attack;
    }//end ctor
    enter(manager, attack) {
        const range = getOpponentDistance(manager.fighter);

        if(attack != undefined) {
            this.attack = attack;
        } else {
            this.attack = getAttack(range);
        }//end if-else
        manager.fighter.input.setInput(attackToInput[this.attack], true);
    }
    update(manager) {
        const opp = manager.fighter.opponent;
        const oppState = opp.stateManager.getState();
        const oppStateType = opp.stateManager.getState();

        const attackSuccessful = (oppState instanceof BLOCK || oppStateType instanceof HURT);
        const next = nextAttack[this.attack];

        if (attackSuccessful) this.enter(manager, next);
        if (manager.fighter.animationIsComplete()) manager.transition("OBSERVE");
    }
    exit(manager) {
        manager.fighter.input.setInput(attackToInput[this.attack], false);
        manager.lastAttack = this.attack;
    }
}//end ENGAGE

export class ANTI_AIR extends ENGAGE {
    constructor(stateName="ANTI_AIR") {
        super(stateName);
        this.attack = "light";
        this.timer = 0.1;
    }
    enter(manager) {
        manager.fighter.input.setInput("forward", true);
        manager.fighter.input.setInput("jump", true);
    }
    update(manager) {
        this.timer -= TIME.delta;
        if (this.timer <= 0.005) manager.fighter.input.setInput("light", true);

        if (this.timer <= 0) manager.transition("OBSERVE");
    }//end update
    exit(manager) {
        manager.fighter.input.setInput("light", false);
        manager.fighter.input.setInput("jump", false);
    }//end exit
}//end ANTI_AIR
