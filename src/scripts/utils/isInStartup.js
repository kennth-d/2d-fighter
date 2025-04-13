import { FighterBaseClass } from "../fighters/FighterBaseClass.js";
import * as boxes from "../../assets/data/boxData.js"
/**checks if a Figher is in the startup of an attack.
 * Startup is defined as the animation frames before the attack has a hitbox.
 * @param { FighterBaseClass } fighter an instance of FighterBaseClass 
 * @returns { Boolean } true if fighter is in startup false otherwise
 */
export function isInStartup(fighter) {
    if(!fighter) {
        throw new Error("fighter is undefined");
    }
    if (!fighter.isAttacking()) return false;
    let attack = fighter.stateManager.activeState.name;
    let hitboxes = boxes[fighter.name].hit[attack];
    let idx = hitboxes.findIndex(arr => Array.isArray(arr) && arr.length > 0);
    let currentFrame = fighter.spriteManager.currentFrame;
    return currentFrame < idx + 1;
}