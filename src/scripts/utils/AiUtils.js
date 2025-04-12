import { FighterBaseClass } from "../fighters/FighterBaseClass.js";
import { MAX_HEALTH } from "./const.js";
import { isInRangeOfAttack } from "./isInRangeOfAttack.js";
import { isInStartup } from "./isInStartup.js";
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

//weighted random see: https://dev.to/jacktt/understanding-the-weighted-random-algorithm-581p
export function getWeightedRandom(values, weights) {
    const totalWeights = weights.reduce((total, current) => total + current, 0);

    let rand = Math.random() * totalWeights;

    for (let i = 0; i < weights.length; i++) {
        if (rand < weights[i]) {
            return values[i];
        }//end if
        rand -= weights[i];
    }//end for
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
    close: { //10 - 20
        values: ["LIGHT_ATTACK", "HEAVY_ATTACK", "SP_1", "SP_2"],
        weights: [8, 6, 4, 2],
    },
    mid : { //21 - 40
        values: ["HEAVY_ATTACK", "SP_1", "SP_2"],
        weights: [5, 8, 2],
    },
    far : { //40 +
        values : ["SP_2"],
        weights : [1],
    },
}

export function getAttack(range) {
    var attacks;
    if (range <= 20) {
        attacks = attacksByRange.close;
    } else if (range <= 40) {
        attacks = attacksByRange.mid;
    } else {
        attacks = attacksByRange.far;
    }
    return getWeightedRandom(attacks.values, attacks.weights);
}

/**
 * @param {FighterBaseClass} fighter 
 * @returns - crouch || jump || engage || defend
 */
export function getNextAction(fighter) {
    const opp = fighter.opponent;

    if (opp.physics.isAirborne()) {
        if (fighter.ai.lastState.name === "ANTI_AIR") {
            return "attack";
        }
        const attack = Math.random() > 0.5;
        if (attack) return "anti-air";
    }
    //dodge projectiles
    if (opp.hasProjectiles()) {
        for (const proj of opp.projectiles) {
            const distance = getDistance(proj.pos.x, fighter.pos.x) 
            if (distance > 60) continue;
            if (distance < 35) {
                return "crouch";
            } else {
                return "jump"
            }//end if 
        }//end for
    }//end if

    //defense
    if (isInStartup(opp) && isInRangeOfAttack(fighter, opp)) {
        return "defend";
    }
    //whiff punish
    if (opp.isAttacking() && !isInRangeOfAttack(fighter, opp)) {
        const whiffPunish = Math.random() > 0.95;
        if (whiffPunish) return "attack";
    }

    //opponent is not attacking
    if (!opp.isAttacking() && getDistance(fighter.pos.x, opp.pos.x) < 35) {
        return "attack";
    }
}
/**
 * 
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