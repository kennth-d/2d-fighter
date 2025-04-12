import { FighterBaseClass } from "../fighters/FighterBaseClass.js";

/**
 * @param {FighterBaseClass} fighter - the victim.
 * @param {FighterBaseClass} attacker - the attacker
 * @returns {Boolean} - true if fighter is in range of an attack, false otherwise
 */
export function isInRangeOfAttack(fighter, attacker) {
    if (!fighter) throw new Error("fighter is  undefind");
    if (!attacker) throw new Error("attacker is undefined");
    
    let isInRange = false;
    if (!attacker.isAttacking()) return;

    let attackX = attacker.pos.x + attacker.getAttackRange() * attacker.direction;

    let fighterFront = fighter.pos.x - (fighter.boxes.push[0] * fighter.direction) + fighter.boxes.push[2] * fighter.direction;

    if (fighter.direction === 1) {
        isInRange = attackX < fighterFront;
    }
    if (fighter.direction < 1) isInRange = attackX > fighterFront;

    return isInRange;
}