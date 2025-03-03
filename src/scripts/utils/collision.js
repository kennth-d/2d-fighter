import { LEFT_BOUNDARY, RIGHT_BOUNDARY } from "./global.js";

//returns true if the 1st rectangle overlaps the 2nd false otherwise.
export function isColliding(fighter) {
    let [x1, y1, w1, h1] = Object.values(fighter.pushBox);
    let [x2, y2, w2, h2] = Object.values(fighter.opponent.pushBox);
            //       (check x-axis)                 (check y-axis)
    return ((x1 + w1 >= x2 && x1 <= x2 + w2) && (y1 + h1 >= y2) && (y1 <= y2 + h2))
}//end checkCollision

//handles players colliding with eachother.
//and handles players colliding with the border of the screen.
export function resolveCollision(fighter) {
    let opponent = fighter.opponent;
    
    if (isColliding(fighter)) {
        // resolve left side of collision
        if (fighter.pos.x <= opponent.pos.x) {
            let xOverlap = fighter.pushBox.x + fighter.pushBox.width - opponent.pushBox.x;
            fighter.pos.x = Math.max((fighter.pos.x - xOverlap), (fighter.pos.x - fighter.origin.x + fighter.pushBox.width))
        }//end if

        //resolve right side of collision
        if (fighter.pos.x >= opponent.pos.x) {
            let xOverlap = opponent.pushBox.x + opponent.pushBox.width - fighter.pushBox.x;
            fighter.pos.x = Math.min((fighter.pos.x + xOverlap), (RIGHT_BOUNDARY + fighter.pos.x - fighter.origin.x - fighter.pushBox.width));
        }
    } 
    ensureOnScreen(fighter)
}//end resolveCollision

//ensure players are unable to move offscreen.
export function ensureOnScreen(fighter) {
    let fighterWidth = fighter.pushBox.width;
    let xPos = fighter.origin.x;
    
    if (xPos <= LEFT_BOUNDARY + fighterWidth) {
        fighter.pos.x = (fighter.pos.x - xPos) + fighterWidth;
    } else if (xPos >= RIGHT_BOUNDARY - fighterWidth) {
       fighter.pos.x = RIGHT_BOUNDARY + (fighter.pos.x - xPos) - fighterWidth;
    }//end if-else if
}//end isAtLeftBoundary