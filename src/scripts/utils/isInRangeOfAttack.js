export function isInRangeOfAttack(fighter, attacker) {
    let isInRange;

    let attackX = attacker.pos.x + attacker.getAttackRange() * attacker.direction;

    let fighterFront = fighter.pos.x - (fighter.boxes.push[0] * fighter.direction) + fighter.boxes.push[2] * fighter.direction;

    if (fighter.direction === 1) {
        isInRange = attackX < fighterFront;
    }
    if (fighter.direction < 1) isInRange = attackX > fighterFront;

    return isInRange;
}