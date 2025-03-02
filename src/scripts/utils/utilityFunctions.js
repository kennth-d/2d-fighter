import { LEFT_BOUNDARY, RIGHT_BOUNDARY, OpponentDirection } from "./global.js";

//Utility Functions
export function EnsureOnScreen(fighter) {
    let cushion = 10; // ensures sprite stays within bounds.
    let xPos = fighter.origin.x;
    
    if (xPos <= LEFT_BOUNDARY + cushion) {
        fighter.pos.x = (fighter.pos.x - xPos) + cushion;
    } else if (xPos >= RIGHT_BOUNDARY - cushion) {
       fighter.pos.x = RIGHT_BOUNDARY + (fighter.pos.x - xPos) - cushion;
    }//end if-else if
}//end isAtLeftBoundary

export function correctDirection(player, opponent) {
    if (player.origin.x > opponent.origin.x) {
        player.direction = OpponentDirection.LEFT;
    } else if (player.origin.x < opponent.origin.x) {
        player.direction = OpponentDirection.RIGHT;
    }//end if-else
}// end getDirection