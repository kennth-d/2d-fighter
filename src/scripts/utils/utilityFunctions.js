import { LEFT_BOUNDARY, RIGHT_BOUNDARY, FIGHTER_WIDTH } from "./global.js";

//Utility Functions
export function EnsureOnScreen(fighter) {
    let xPos = fighter.pos.x;
    
    if (xPos <= LEFT_BOUNDARY - FIGHTER_WIDTH) {
        fighter.pos.x = LEFT_BOUNDARY - FIGHTER_WIDTH;
    } else if (xPos >= RIGHT_BOUNDARY - FIGHTER_WIDTH*2) {
       fighter.pos.x = RIGHT_BOUNDARY - FIGHTER_WIDTH*2;
    }
}//end isAtLeftBoundary
