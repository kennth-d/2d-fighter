import { isInStartup } from "../../../utils/isInStartup.js";
import { isInRangeOfAttack } from "../../../utils/isInRangeOfAttack.js";
import { getEnergyFactor, getHealthFactor } from "../../../utils/AiUtils.js";
import { HURT, ATTACK, BLOCK, JUMP_ATTACK } from "../../fighterStates.js";
import { STAGE } from "../../../utils/const.js";

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

        //position - threat status.
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
        isBlocking   : n instanceof BLOCK,
        isAttacking  : s instanceof ATTACK || s instanceof JUMP_ATTACK,
        isInStartup  : isInStartup(fighter),
        isHurt       : s instanceof HURT,
        attack       : s instanceof ATTACK ? s: null,
    }//end return
}//end getFighterStatus