import { FighterBaseClass } from "../fighters/FighterBaseClass.js";
import { MAX_HEALTH, MAX_ENERGY, STAGE } from "./const.js";
import { HURT, ATTACK} from "../states/fighterStates.js";
import { FighterState } from "../states/fighter/FighterState.js";
import { AiState } from "../states/ai/AiState.js";
import { Projectile } from "../components/Projectile.js";
import { isInStartup } from "./isInStartup.js";
import { isInRangeOfAttack } from "./isInRangeOfAttack.js";
/**
 * 
 * @param {p1} p1 - x or y coordinate
 * @param {p2} p2 - a coordinate of the same plane as p1 
 * @returns {{dx: Number, dy: Number}} the distance between p1 and p2.
 */
export function getDistance(p1, p2) {
    if (!p1) throw new Error("p1 is undefined");
    if (!p2) throw new Error("p2 is undefined");
    return Math.sqrt((p1 - p2) * (p1 - p2));
};

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Picks a decision from a set of decisions with weights.
 * @param {[{action:AiState, weight: Number}]} decisions 
 * @returns {AiState} decision made.
 */
export function getWeightedRandom(decisions) {
    const totalWeight = decisions.reduce((sum, decision) => sum += decision.weight, 0);
    const r = Math.random() * totalWeight;

    let acc = 0; //accumulator

    for (const decision of decisions) {
        acc += decision.weight;
        if (r <= acc) return decision.action;
    }//end for

    return null;
}//getWeightedRandom

export function getOpponentDistance(fighter) {
    if (!fighter) throw new Error("fighter is undefined");
    const opp = fighter.opponent;
    const oppClosest = opp.pos.x + (opp.boxes.push[0] * opp.direction);
    const fClosest = fighter.pos.x + (fighter.boxes.push[0] * fighter.direction);
    return getDistance(fClosest, oppClosest);
}

//works with getWeightedRandom to return a value.
export const attacksByRange = {
    close: [
        {action: "LIGHT_ATTACK" , weight: 15},
        {action: "HEAVY_ATTACK" , weight: 6},
        {action: "SP_1",          weight: 4},
        {action: "SP_2",          weight: 2},
    ],
    mid: [
        {action: "HEAVY_ATTACK" , weight: 5},
        {action: "SP_1",          weight: 8},
    ],
    far: [
        {action: "SP_2",          weight: 1},
    ]
}//end attacksByRange

export function getAttack(range) {
    var attacks = attacksByRange.close;

    if (range > 25 && range < 48) {
        attacks = attacksByRange.mid;
    } else {
        attacks = attacksByRange.far;
    }
    return getWeightedRandom(attacks);
}

/**
 * @param {FighterBaseClass} fighter
 * @param {Number} min minimum factor that can be produced. 
 * @param {Number} max maximum factor that can be produced.
 * @returns {Number} a number where: min <= number <= max.
 */
export function getHealthFactor(fighter, min = 0, max = 1) {

    const percent = fighter.health / MAX_HEALTH;
    const factor = 1 - percent;
    
    const adjustCurve = factor * factor * (3 - 2 * factor); //makes the output non-linear.
    return min + adjustCurve * (max - min);
}

/**
 * @param {FighterBaseClass} fighter
 * @param {Number} min minimum factor that can be produced. 
 * @param {Number} max maximum factor that can be produced.
 * @returns {Number} a number where: min <= number <= max.
 */
export function getEnergyFactor(fighter, min = 0, max = 1) {

    const percent = fighter.energy / MAX_ENERGY;
    const factor = 1 - percent;
    
    const adjustCurve = factor * factor * (3 - 2 * factor); //makes the output non-linear.
    return min + adjustCurve * (max - min);
}

/**
 * Gets a snapshot a fighter's status and their opponent's status.
 * @param {FighterBaseClass} fighter 
 * @returns {{healthFactor: Number,
 * energyFactor: Number,
 * currentState: FighterState,
 * isLowHealth: boolean,
 * isLowEnergy: boolean,
 * isCornered: boolean,
 * isAirborne: boolean,
 * hasProjectiles: boolean,
 * projectiles: [Projectile],
 * }}
 */
export function getFighterStatus(fighter) {
    const s = fighter.stateManager.getState();
    const n = s.getName();

    return {
        posX: fighter.pos.x,
        isFacingLeft: fighter.direction === 1,
        isFacingRight: fighter.direction === -1,
        healthFactor: getHealthFactor(fighter),
        energyFactor: getEnergyFactor(fighter),
        currentState: fighter.stateManager.getState(),
        isLowHealth: fighter.health <= 30,
        isLowEnergy: fighter.energy <= 30,
        isCornered: fighter.pos.x < 32 || fighter.pos.x > STAGE.WIDTH - 32,
        isAirborne: fighter.physics.isAirborne(),
        hasProjectiles: fighter.hasProjectiles(),
        projectiles: fighter.projectiles,
        projectileCooldown: fighter.projectileCooldown,
        isInAttackRange: isInRangeOfAttack(fighter, fighter.opponent),

        //state status
        state        : s,
        isIdling     : n === "IDLE",
        isCrouching  : n === "CROUCH",
        isWalkingFwd : n === "WALK_FWD",
        isWalkingBwd : n === "WALK_BWD",
        isBlocking   : n === "BLOCK",
        isAttacking  : s instanceof ATTACK,
        isInStartup  : isInStartup(fighter),
        isHurt       : s instanceof HURT,
        attack       : s instanceof ATTACK ? s: null,
    }//end return
}//end getFighterStatus

/**
 * Determines an ai's action based on a context.
 * @param {{self: {status, state}, opponent: {status, state}, distance: Number}} context the current context
 * @returns {AiState} CROUCHAI, DEFEND, ENGAGE, APPROACH, ANTI_AIR, "RETREAT"
 */
export function getAction(context) {
    const {self, opponent, distance} = context;
    //push decisions into an array
    //pick a decision using a weighted random.
    const decisions = []; // [{action, weight}, ]


    //pressure opponent
    if (opponent.isBlocking || opponent.isHurt) {
        return "ENGAGE";
    }

    //defend projectiles
    if(opponent.hasProjectiles) {
        for (const proj of opponent.projectiles)  {
            if (isIncoming(proj)) {
                decisions.push({action: "CROUCHAI", weight: 45});
                decisions.push({action: "JUMP", weight: 50});
                decisions.push({action: "DEFEND", weight: 5});
                return getWeightedRandom(decisions);
            }//end if
        }//end for
    }//end if

    if (self.isLowEnergy) {
        //retreat
        decisions.push({action: "RETREAT", weight: 70});
        decisions.push({action: "DEFEND", weight: 40});

        //mash
        decisions.push({action: "ENGAGE", weight: 30});
        return getWeightedRandom(decisions);
    }

    //defend/retreat
    if (self.isHurt || self.isBlocking) {
        //defend
        if (opponent.isinStartup && distance < 40) decisions.push({action: "DEFEND", weight: 60});

        //mash, try to engage despite hurt/block status.
        decisions.push({action: "ENGAGE", weight: 40});
        
        if (self.isCornered) decisions.push({action: "JUMP", weight: 40});

        if(!self.isCornered) decisions.push({action: "RETREAT", weight: 80});
        return getWeightedRandom(decisions);
    }//end if 

    //anti-air
    if (opponent.isAirborne && !self.isAirborne) {
        if (distance < 50) {
            decisions.push({action: "RETREAT", weight: 80});
            decisions.push({action: "ANTI_AIR", weight: 10});
        } else {
            decisions.push({action: "ENGAGE", weight: 50});
            decisions.push({action: "APPROACH", weight: 50});
        }//end if-else

        return getWeightedRandom(decisions);
    }//end if

    //defend
    if (opponent.isAttacking) {

        //block
        if (opponent.isInStartup && distance < 40) decisions.push({action: "DEFEND", weight: 150});

        //escape corner
        if (self.isCornered) decisions.push({action: "JUMP", weight: 120});

        //whiff punish
        decisions.push({action: "ENGAGE", weight: 50});

        return getWeightedRandom(decisions);
    }//end if

    //opponent idling
    if (opponent.isIdling) {
        //out of striking range
        if (distance > 40) {
            decisions.push({action: "APPROACH", weight: 70});
            decisions.push({action: "ENGAGE", weight: 30});
        } else {
            decisions.push({action: "ENGAGE", weight: 100});
        }//end if-else
        return getWeightedRandom(decisions);
    }//end if

    //opponent retreating
    if (opponent.isWalkingBwd) {
        decisions.push({action: "APPROACH", weight: 50});
        decisions.push({action: "ENGAGE", weight: 50});
        return getWeightedRandom(decisions);
    }//end if

    //opponent approachiing
    if (opponent.isWalkingFwd) {
        decisions.push({action: "ENGAGE", weight: 50});
        decisions.push({action: "RETREAT", weight: 50});
        return getWeightedRandom(decisions);
    }

    //corner pressure
    if (opponent.isCornered) {
        decisions.push({action: "RETREAT", weight: 60});
        decisions.push({action: "ENGAGE", weight: 40});

        const action = getWeightedRandom(decisions);

        //pressure
        if(opponent.isLowHealth || opponent.isLowEnergy) action = "ENGAGE";
        return action;
    }//end if

    if (opponent.isCrouching) {
        if (distance < 48) decisions.push({action: "ENGAGE", weight: 50});
        decisions.push({action: "APPROACH", weight: 40});
        
        return getWeightedRandom(decisions);
    }

    //failsafe    
    return "OBSERVE";
}//end getAction

/**
 * @param {{healthFactor: Number,
 * energyFactor: Number,
* currentState: FighterState,
* isLowHealth: boolean,
* isLowEnergy: boolean,
* isCornered: boolean,
* isAirborne: boolean,
* hasProjectiles: boolean,
* projectiles: [Projectile],
* }} f fighter context
 * @param {Projectile} p
 * @returns {boolean}
 */
export function isIncoming(f, p) {
    let isThreat = false;
    
    if (p) {
        const distance = getDistance(f.x, p.pos.x);
        //danger-zone
        if (distance < 60) isThreat = true;
        
        //projectile is behind fighter
        if (f.isFacingLeft && p.pos.x < f.x) isThreat = false;
        if (f.isFacingRight && p.pos.x > f.x) isThreat = false;
    }//end if

    return isThreat;
}//end isDangerous