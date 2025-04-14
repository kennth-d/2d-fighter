import { isIncoming } from "../../../utils/AiUtils.js";

export function getSituationKey(context) {
    const {self, opponent, distance} = context;

    if (self.isBlocking || self.isHurt || self.isLowEnergy) return "SELF_RETREAT";
    if (opponent.isBlocking || opponent.isHurt) return "PRESSURE";
    if (self.isCrouching && opponent.projectiles.some(proj => isIncoming(self, proj)));
    if (opponent.hasProjectiles && opponent.projectiles.some(proj => isIncoming(self, proj))) return "PROJECTILE";
    if (self.isHurt || self.isBlocking) return "HURT_OR_BLOCKING";
    if (opponent.isAirborne) return "ANTI_AIR";
    if (opponent.isAttacking) return "DEFENSE";
    if (opponent.isIdling) return "IDLE_OPPONENT";
    if (opponent.isCrouching) return "CROUCHING";
    if (opponent.isWalkingBwd || self.isWalkingFwd) return "FOOTSIES";
    if (opponent.isWalkingFwd || self.isWalkingBwd) return "FOOTSIES";
    if (self.isAirborne) return "AIRBORNE";
    
    return "DEFAULT";
}
