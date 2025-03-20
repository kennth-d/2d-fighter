import { LEFT_BOUNDARY, RIGHT_BOUNDARY, FLOOR } from "./global.js";

//returns true if the 1st rectangle overlaps the 2nd false otherwise.
export function isColliding(fighter) {
    //x, y width, height
    let [x1, y1, w1, h1] = Object.values(fighter.pushBox);
    let [x2, y2, w2, h2] = Object.values(fighter.opponent.pushBox);
           //       (check x-axis)         |    |        (check y-axis)          |
    return ((x1 + w1 >= x2 && x1 <= x2 + w2) && (y1 + h1 >= y2) && (y1 <= y2 + h2))
}//end isColliding

//handles players colliding with eachother.
//and handles players colliding with the border of the screen.
export function resolveCollision(fighter) {
    let opponent = fighter.opponent;
    
    if (isColliding(fighter)) {
        // resolve left side of collision
        if (fighter.pos.x <= opponent.pos.x) {
            let playerOverlap = fighter.pushBox.x + fighter.pushBox.width - opponent.pushBox.x;
            let leftBoundaryOverlap = LEFT_BOUNDARY - fighter.pushBox.x;

            //take the max value so that player cannot be pushed out of bounds.
            fighter.pos.x = Math.max((fighter.pos.x - playerOverlap), (fighter.pos.x + leftBoundaryOverlap));
        }//end if

        //resolve right side of collision
        if (fighter.pos.x >= opponent.pos.x) {
            let playerOverlap = opponent.pushBox.x + opponent.pushBox.width - fighter.pushBox.x;
            let rightBoundaryOverlap = fighter.pushBox.x + fighter.pushBox.width - RIGHT_BOUNDARY;

            //take the min value so that player cannot be pushed out of bounds.
            fighter.pos.x = Math.min((fighter.pos.x + playerOverlap), (fighter.pos.x - rightBoundaryOverlap));
        }//end if
    }//end if
    ensureOnScreen(fighter);
}//end resolveCollision

//ensure players are unable to move offscreen.
export function ensureOnScreen(fighter) {
    let playerWidth = fighter.pushBox.width;
    let xPos = fighter.pushBox.x;
    
    if (xPos <= LEFT_BOUNDARY) {
        let xOverlap = LEFT_BOUNDARY - xPos;
        fighter.pos.x = fighter.pos.x + xOverlap;
    } else if (xPos + playerWidth >= RIGHT_BOUNDARY) {
        let xOverlap = xPos + playerWidth - RIGHT_BOUNDARY;
       fighter.pos.x = fighter.pos.x - xOverlap;
    }//end if-else if
}//end isAtLeftBoundary

export function ensureOnFLoor(fighter) {
    let posY = fighter.pos.y;
    if (posY > FLOOR) {
        let yOverlap = posY - FLOOR;
        fighter.pos.y = fighter.pos.y - yOverlap;
    }
}

