import { AiState } from "./AiState.js";
import { getDistance, getAttack, getWeightedRandom } from "../../utils/AiUtils.js";
import { TIME } from "../../utils/const.js";

export const attackToInput = {
    "LIGHT_ATTACK": "light",
    "HEAVY_ATTACK": "heavy",
    "SP_1": "sp1",
    "SP_2": "sp2",
    "JUMP_ATTACK": "light",
}
export const nextAttack = {
    null: "LIGHT_ATTACK",
    "undefiend": "LIGHT_ATTACK",
    "LIGHT_ATTACK" : "HEAVY_ATTACK",
    "HEAVY_ATTACK" : "SP_1",
    "SP_1": "SP_2",
    "SP_2": "SP_2",
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
        const distance = getDistance(manager.fighter.pos.x, manager.fighter.opponent.pos.x);
        this.attack = getAttack(distance);

        if (attack) this.attack = attack;
        
        if (manager.fighter.physics.isAirborne()) this.attack = "LIGHT_ATTACK";
        if (this.attack === "SP_2" && distance < 25) this.attack = "LIGHT_ATTACK";
        manager.fighter.input.setInput(attackToInput[this.attack], true);
    }//end enter
    update(manager, context) {
        const {self, opponent, distance} = context;

        //setup attack chain.
        const attackSuccessful = (opponent.isBlocking || opponent.isHurt);
        let next = nextAttack[manager.lastAttack];
           
        if (attackSuccessful) {
            this.enter(manager, next)
        } else {
            manager.transition("OBSERVE");
        }//end if-else
    }
    exit(manager) {
        manager.fighter.input.setInput(attackToInput[this.attack], false);
        manager.lastAttack = this.attack;
    }
}//end ENGAGE

export class ANTI_AIR extends ENGAGE {
    constructor(stateName="ANTI_AIR") {
        super(stateName);
        this.timer = 0.1;
    }
    enter(manager) {
        manager.fighter.input.setInput("forward", true);
        manager.fighter.input.setInput("jump", true);
        
    }
    update(manager, context) {
        this.timer -= TIME.delta;

        if (this.timer < 0.005) manager.fighter.input.setInput("light", true);

        if (this.timer <= 0) manager.transition("OBSERVE");
    }//end update
    exit(manager) {
        manager.fighter.input.setInput("light", false);
        manager.fighter.input.setInput("jump", false);
    }//end exit
}//end ANTI_AIR

export class SHOOT extends ENGAGE {
    constructor(stateName="SHOOT") {
        super(stateName);
        this.attack = "SP_2";
    }
    enter(manager) {
        manager.fighter.input.setInput(attackToInput[this.attack], true);
    }//end enter
    update(manager, context) {
        const {self, opponent, distance } = context;

        if (self.projectileCooldown > 0) manager.transition("OBSERVE");
    }//end update
    exit(manager) {
        manager.fighter.input.setInput(attackToInput[this.attack], false);
        manager.lastAttack = "SP_2";
    }
}
