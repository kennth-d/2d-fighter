import { OpponentDirection } from "./global.js";

//changes fighters direction when they cross over the opponent.
export function correctDirection(fighter, opponent) {
    if (fighter.origin.x > opponent.pushBox.x + opponent.pushBox.width) {
        fighter.direction = OpponentDirection.LEFT;
    } else if (fighter.origin.x < opponent.pushBox.x) {
        fighter.direction = OpponentDirection.RIGHT;
    }//end if-else
}// end getDirection