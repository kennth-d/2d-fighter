import { OPPONENT_DIRECTION } from "./const.js";
import { FighterBaseClass } from "../fighters/FighterBaseClass.js";
import { isAtBoundary } from "./collision.js";
/** Flips the direction property of a Fighter when
 *  the fighter crosses its opponent on the x-axis.
 * @param {FighterBaseClass} fighter 
 * @param {FighterBaseClass} opponent 
 */
export function correctDirection(p1, p2) {
    if (isAtBoundary(p1) || isAtBoundary(p2)) {
        return;
    }

    if (p1.pos.x > p2.pos.x) {
        p1.direction = OPPONENT_DIRECTION.LEFT;
        p2.direction = OPPONENT_DIRECTION.RIGHT;
    } else if (p1.pos.x < p2.pos.x) {
        p1.direction = OPPONENT_DIRECTION.RIGHT;
        p2.direction = OPPONENT_DIRECTION.LEFT;
    }//end if-else
}// end getDirection