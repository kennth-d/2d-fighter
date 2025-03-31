/**module imports all state modules so the can be used under one module..
 * @module states
 * @exports Idle,
 * @exports WalkFwd,
 * @exports WalkBwd,
 * @exports Crouch,
 * @exports JumpBack,
 * @exports JumpForward,
 * @exports LightAttack,
 * @exports HeavyAttack,
 * @exports SP_1,
 * @exports SP_2,
 * @exports Hurt
 * @exports characterStates a list of all the states as strings.
 * 
 */ 

import { Idle, WalkFwd, WalkBwd, Jump, JumpBack, JumpForward, Crouch } from "./MoveStates.js";
import { LightAttack, HeavyAttack, SP_1, SP_2 } from "./AttackStates.js";
import { Hurt } from "./HurtStates.js";

export const characterStates = ["IDLE", "CROUCH", "WALK_FWD", "WALK_BWD", "JUMP", "LIGHT_ATTACK", "HEAVY_ATTACK", "JUMP_FWD", "JUMP_BWD", "SP_1", "SP_2", "HURT"];

export {
    Idle,
    WalkFwd,
    WalkBwd,
    Crouch,
    Jump,
    JumpBack,
    JumpForward,
    LightAttack,
    HeavyAttack,
    SP_1,
    SP_2,
    Hurt,
};