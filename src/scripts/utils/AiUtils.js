import { FighterBaseClass } from "../fighters/FighterBaseClass.js";
import { MAX_HEALTH, MAX_ENERGY, STAGE } from "./const.js";
import { AiState } from "../states/ai/AiState.js";
import { Projectile } from "../components/Projectile.js";

/**
 * @param {p1} p1 - x or y coordinate
 * @param {p2} p2 - a coordinate of the same plane as p1 
 * @returns {{dx: Number, dy: Number}} the distance between p1 and p2.
 */
export function getDistance(p1, p2) {
    if (!p1 || !p2) return 1000;   // default for projectiles 
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

export function getAttack(range, lastAttack) {
    const attacks = [];

    attacks.push({action: "LIGHT_ATTACK", weight: 20});

    //bias the decision for attack chaining.
    if (lastAttack === "LIGHT_ATTACK") attacks.push({action: "HEAVY_ATTACK", weight: 75});
    if (lastAttack === "HEAVY_ATTACK") attacks.push({action: "SP_1", weight: 75});

    if (range > 20) {
        attacks.push({action: "HEAVY_ATTACK", weight: 5});
        attacks.push({action: "SP_1", weight: 5});
    }
    if (range > 35) {
        attacks.push({action: "SP_2", weight: 100}); //2x chanace for ranged attack
    }//end if-else
    if (range > 48) {
        attacks.push({action: "SP_2", weight: 1000}); //bias ranged when too far away.
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
 * @param {Object} f FighterStatus Object
 * @param {Projectile} p Projectile
 * @returns {boolean}
 */
export function isIncoming(f, p) {
    //not on screen
    if (!p || p.pos.x > STAGE.WIDTH || p.pos.x < 0) return false;

    let isThreat = false;
    if (p && p.pos.x) {
        const distance = getDistance(f.posX, p.pos.x);
        //danger-zone
        if (distance < 60) isThreat = true;
        
        //projectile is behind fighter
        if (f.isFacingLeft && p.pos.x < f.posX + 5) isThreat = false;
        if (f.isFacingRight && p.pos.x > f.posX - 5) isThreat = false;
    }//end if

    return isThreat;
}//end isDangerous