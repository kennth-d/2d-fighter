import { LEFT_BOUNDARY, RIGHT_BOUNDARY } from "./global.js";

//Utility Functions
export function EnsureOnScreen(fighter) {
    let cushion = 10;
    let xPos = fighter.origin.x;
    
    if (xPos <= LEFT_BOUNDARY + cushion) {
        fighter.pos.x = (fighter.pos.x - xPos) + cushion;
    } else if (xPos >= RIGHT_BOUNDARY - cushion) {
       fighter.pos.x = RIGHT_BOUNDARY + (fighter.pos.x - xPos) - cushion;
    }
}//end isAtLeftBoundary
