import { BOUNDARIES, CANVAS_WIDTH, TIME } from "./const.js";
import { getActualBoxDimensions } from "./utils.js";
import { applyhit } from "./hit.js";
import { HIT_STOP } from "./attackData.js";

/** Checks if two rectangles overlap.
 * @param {{x:number, y: number, width: number, height: number}} boxA an object containing x, y, width, height properties
 * @param {{x: number, y: number, width: number, height:number}} boxB an object containing x, y, width, height prooperties
 * @returns {boolean} true the boxes overlap, false otherwise.
 **/
export function rectsOverlap(boxA, boxB) {
    return Math.max(boxA.x, boxB.x) < Math.min(boxA.x + boxA.width, boxB.x + boxB.width) &&
           Math.max(boxA.y, boxB.y) < Math.min(boxA.y + boxA.height, boxB.y + boxB.height)

}
/** Pushes players away from eachother to prevent overlap.
*   @param {Fighter[]} players an array of Fighter objects.
**/
export function resolvePushBoxCollision(players) {
        //players 1
        const boxA = getActualBoxDimensions(players[0].pos, players[0].direction, players[0].boxes.push);

        //player 2
        const boxB = getActualBoxDimensions(players[1].pos, players[1].direction, players[1].boxes.push);
  
        if (!rectsOverlap(boxA, boxB)) return;

        let xOverlap = Math.min(
            (boxA.x + boxA.width) - boxB.x,
            (boxB.x + boxB.width) - boxA.x,
        );

        let pushAmount = xOverlap/2

        let boxAnewX = players[0].pos.x - pushAmount * players[0].direction;

        let boxBnewX = players[1].pos.x - pushAmount * players[1].direction;

        players[0].pos.x = boxAnewX;
        players[1].pos.x = boxBnewX;

}//end resolvePlayerCollision

/** Prevents Fighters from being able to move offscreen on the x-axis.
 * @param {Fighter} fighter a Fighter object. 
 **/
export function ensureOnScreen(fighter, viewport) {
    let playerWidth = fighter.boxes.push[2];
    let xPos = fighter.pos.x - fighter.boxes.push[0];
    
    if (xPos <= viewport.pos.x) {
        let xOverlap = viewport.pos.x - xPos;
        fighter.pos.x = fighter.pos.x + xOverlap;
    } else if (xPos + playerWidth >= viewport.pos.x + CANVAS_WIDTH) {
        let xOverlap = xPos + playerWidth - (viewport.pos.x + BOUNDARIES.RIGHT);
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
export function updateHitBoxCollision(scene, attacker, opponent) {
     if (!attacker.isAttacking() || attacker.getHasHit()) return;
     let frame = attacker.spriteManager.currentFrame+1
     let attack = attacker.stateManager.activeState.name;

     const trueHitBox = getActualBoxDimensions(attacker.pos, attacker.direction, attacker.boxes.hit);
     for (const box of opponent.boxes.hurt) {
        const trueOpponentHurtBox = getActualBoxDimensions(opponent.pos, opponent.direction, box);
    
        if (!rectsOverlap(trueHitBox, trueOpponentHurtBox)) continue;

        let bodyparts = ["head", "body", "legs"]
        const hurtIndex = opponent.boxes.hurt.indexOf(box);
        // console.log(`${attacker.name} has hit ${opponent.name}'s ${bodyparts[hurtIndex]} with frame: ${frame}`);

        attacker.setHasHit(true);
        applyhit(opponent, attack);
        TIME.hitStopTimer = TIME.previous + (HIT_STOP * 1000);
        scene.drawOrder = [opponent.playerId, attacker.playerId];

        const hitLocation = {
            x: (trueHitBox.x + (trueHitBox.width / 2) + trueOpponentHurtBox.x + (trueOpponentHurtBox.width / 2)) / 2,
            y: (trueHitBox.y + (trueHitBox.height / 2) + trueOpponentHurtBox.y + (trueOpponentHurtBox.height / 2)) / 2,
        }
        hitLocation.x -= 4 - Math.random() * 8;
        hitLocation.y -= 4 - Math.random() * 8;
        //TODO generate hit sprite
        //attacker.generateHitSprite(hitLocation);
        return;
     }//end for
}//end checkHitBoxCollision

export function updateProjectileCollision(fighters) {
    const p1 = fighters[0];
    const p2 = fighters[1];
    if (p1.hasProjectiles()) {
        for (const projectile of p1.projectiles) {
            for (const box of p2.boxes.hurt) {
                let truehurtBox = getActualBoxDimensions(p2.pos, p2.direction, box);
                let collided = rectsOverlap(projectile.box, truehurtBox);
                if (collided)  {
                    applyhit(p2, "SP_2");
                    p1.removeProjectile(projectile.projectileId);
                }//end if
            }//end for
        }//end for
    }//end if

    if (p2.hasProjectiles()) {
        for (const projectile of p2.projectiles) {
            for (const box of p1.boxes.hurt) {
                let truehurtBox = getActualBoxDimensions(p1.pos, p1.direction, box);
                let collided = rectsOverlap(projectile.box, truehurtBox);
                if (collided) {
                    applyhit(p1, "SP_2");
                    p2.removeProjectile(projectile.projectileId);
                }//end if
            }//end for
        }//end for
    }//end if
}//end updateProjectileCollision

/** returns a number relating to which boundary a player is at.
 * @param {fighterBaseClass} fighter an instance of FighterBaseClass
 * @returns {Boolean} true if fighter is at a boundary, false otherwise.
 **/
export function isAtBoundary(fighter) {
    let playerWidth = fighter.boxes.push[2];
    let xPos = fighter.pos.x - fighter.boxes.push[0];
    
    let result = false;

    if (xPos <= BOUNDARIES.LEFT) {
        result = true;
    }
    if (xPos + playerWidth >= BOUNDARIES.RIGHT) {
       result = true;
    }//end if-else if

    return result;
}