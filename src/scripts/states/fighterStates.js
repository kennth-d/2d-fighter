/**module imports all state modules so the can be used under one module..
 * @module states
 * @exports ATTACK,
 * @exports Idle,
 * @exports WALK_FWD,
 * @exports WALK_BWD,
 * @exports CROUCH,
 * @exports JUMP,
 * @exports JUMP_BWD,
 * @exports JUMP_FWD,
 * @exports LIGHT_ATTACK,
 * @exports HEAVY_ATTACK,
 * @exports SP_1,
 * @exports SP_2,
 * @exports HURT,
 * @exports BLOCK,
 * @exports KO,
 * @exports KNOCKBACK,
 * @exports FALLING,
 * @exports JUMP_ATTACK
 * @exports characterStates a list of all the states as strings.
 * 
 */ 

import { IDLE, WALK_FWD, WALK_BWD, JUMP, JUMP_BWD, JUMP_FWD, CROUCH, FALLING } from "./fighter/MoveStates.js";
import { ATTACK, LIGHT_ATTACK, HEAVY_ATTACK, SP_1, SP_2, JUMP_ATTACK } from "./fighter/AttackStates.js";
import { HURT, KO, KNOCKBACK } from "./fighter/HurtStates.js";
import { BLOCK } from "./fighter/DefendStates.js";

export const fighterStates = [
    "IDLE", "CROUCH", "WALK_FWD", "WALK_BWD", "JUMP", 
    "LIGHT_ATTACK", "HEAVY_ATTACK", "JUMP_FWD", "JUMP_BWD", 
    "SP_1", "SP_2", "HURT", "KO", "BLOCK",
    "JUMP_ATTACK", "KNOCKBACK", "FALLING",
];

export {
    IDLE,
    WALK_FWD,
    WALK_BWD,
    CROUCH,
    JUMP,
    JUMP_BWD,
    JUMP_FWD,
    ATTACK,
    LIGHT_ATTACK,
    HEAVY_ATTACK,
    SP_1,
    SP_2,
    HURT,
    BLOCK,
    KO,
    FALLING,
    KNOCKBACK,
    JUMP_ATTACK,
};