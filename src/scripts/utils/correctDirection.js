import { OPPONENT_DIRECTION } from "./const.js";
import { FighterBaseClass } from "../fighters/FighterBaseClass.js"
/** Flips the direction property of a Fighter when
 *  the fighter crosses its opponent on the x-axis.
 * @param {FighterBaseClass} fighter 
 * @param {FighterBaseClass} opponent 
 */
export function correctDirection(fighter, opponent) {
    if (fighter.pos.x > opponent.pos.x) {
        fighter.direction = OPPONENT_DIRECTION.LEFT;
    } else if (fighter.pos.x < opponent.pos.x) {
        fighter.direction = OPPONENT_DIRECTION.RIGHT;
    }//end if-else
}// end getDirection