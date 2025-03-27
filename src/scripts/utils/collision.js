import { BOUNDARIES } from "./const.js";

/** Checks if two rectangles overlap.
 * @param {{x, y, width, height}} boxA an object containing x, y, width, height properties
 * @param {{x, y, width, height}} boxB an object containing x, y, width, height prooperties
 * @returns {boolean} true the boxes overlap, false otherwise.
 **/
export function rectsOverlap(boxA, boxB) {
    return boxA.x < boxB.x + boxB.width &&
           boxA.x + boxA.width > boxB.x &&
           boxA.y < boxB.y + boxB.height &&
           boxA.y + boxA.height > boxB.y;
}//end rectsOverlap
/** Pushes players away from eachother to prevent overlap.
*   @param {Fighter[]} players an array of Fighter objects.
**/
export function resolvePlayerCollision(players) {
        //players 1
        const boxA = {
            x:      players[0].pos.x + players[0].boxes.push[0],
            y:      players[0].pos.y + players[0].boxes.push[3],
            width:  players[0].boxes.push[2],
            height: players[0].boxes.push[3],
        };
        //players 2
        const boxB = {
            x:      players[1].pos.x + players[1].boxes.push[0],
            y:      players[1].pos.y + players[1].boxes.push[3],
            width:  players[1].boxes.push[2],
            height: players[1].boxes.push[3],
        };

        if (!rectsOverlap(boxA, boxB)) return;

        let xOverlap = Math.min(
            (boxA.x + boxA.width) - boxB.x,
            (boxB.x + boxB.width) - boxA.x,
        );

        let pushAmount = xOverlap/2

        let boxAnewX = players[0].pos.x - pushAmount * players[0].direction;
        let boxAminX = BOUNDARIES.LEFT;
        let boxAmaxX = BOUNDARIES.RIGHT - boxA.width/2;

        let boxBnewX = players[1].pos.x - pushAmount * players[1].direction;
        let boxBminX = BOUNDARIES.LEFT;
        let boxBmaxX = BOUNDARIES.RIGHT - boxB.width/2;

        players[0].pos.x = Math.max(boxAminX, Math.min(boxAmaxX, boxAnewX));
        players[1].pos.x = Math.max(boxBminX, Math.min(boxBmaxX, boxBnewX));
        ensureOnScreen(players[0]);
        ensureOnScreen(players[1]);
}//end resolvePlayerCollision

/** Prevents Fighters from being able to move offscreen on the x-axis.
 * @param {Fighter} fighter a Fighter object. 
 **/
export function ensureOnScreen(fighter) {
    let playerWidth = fighter.boxes.push[2];
    let xPos = fighter.pos.x - fighter.boxes.push[0];
    
    if (xPos <= BOUNDARIES.LEFT) {
        let xOverlap = BOUNDARIES.LEFT - xPos;
        fighter.pos.x = fighter.pos.x + xOverlap;
    } else if (xPos + playerWidth >= BOUNDARIES.RIGHT) {
        let xOverlap = xPos + playerWidth - BOUNDARIES.RIGHT;
        fighter.pos.x = fighter.pos.x - xOverlap;
    }//end if-else if
}//end ensureOnScreen

/** Prevents Fighters from being able to move offscreen on the y-axis.
 * @param {Fighter} fighter a Fighter object. 
 **/
export function ensureOnFLoor(fighter) {
    let posY = fighter.pos.y;
    if (posY > BOUNDARIES.FLOOR) {
        let yOverlap = posY - BOUNDARIES.FLOOR;
        fighter.pos.y = fighter.pos.y - yOverlap;
    }//end if
}//end ensureOnFloor

