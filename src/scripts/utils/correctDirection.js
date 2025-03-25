import { OpponentDirection } from "./global.js";

//changes fighters direction when they cross over the opponent.
export function correctDirection(fighter, opponent) {
    let opponentPushX = opponent.boxes.push[0];
    if (fighter.pos.x > opponent.pos.x + opponentPushX) {
        fighter.direction = OpponentDirection.LEFT;
    } else if (fighter.pos.x < opponent.pos.x - opponentPushX ) {
        fighter.direction = OpponentDirection.RIGHT;
    }//end if-else
}// end getDirection

