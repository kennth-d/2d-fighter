/**module imports all state modules so the can be used under one module..
 * @module states
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
 * @exports characterStates a list of all the states as strings.
 * 
 */ 

import { IDLE, WALK_FWD, WALK_BWD, JUMP, JUMP_BWD, JUMP_FWD, CROUCH } from "./MoveStates.js";
import { LIGHT_ATTACK, HEAVY_ATTACK, SP_1, SP_2 } from "./AttackStates.js";
import { HURT, KO } from "./HurtStates.js";
import { BLOCK } from "./DefendStates.js";

export const characterStates = ["IDLE", "CROUCH", "WALK_FWD", "WALK_BWD", "JUMP", "LIGHT_ATTACK", "HEAVY_ATTACK", "JUMP_FWD", "JUMP_BWD", "SP_1", "SP_2", "HURT", "KO", "BLOCK"];

export {
    IDLE,
    WALK_FWD,
    WALK_BWD,
    CROUCH,
    JUMP,
    JUMP_BWD,
    JUMP_FWD,
    LIGHT_ATTACK,
    HEAVY_ATTACK,
    SP_1,
    SP_2,
    HURT,
    BLOCK,
    KO,
};