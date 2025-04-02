import * as attacks from "./attackData.js";
import { isAtBoundary } from "../utils/collision.js";

/**Applies damage to health if fighter is not blocking or is out of energy,
 * or to energy if the fighter is blocking. chains into applyKnockback().
 * @param { FighterBaseClass } reciever Fighter recieving the attack.
 * @param { String } attack name of the Fighter attack state.
 */
export function applyhit(reciever, attack) {

    let attackData = attacks[attack];
    let damage = attackData.dmg;
    let knockbackX = attackData.knockback;
    let knockbackY = 0;
    
    if (reciever.isBlocking() && reciever.hasEnergy()) {
        reciever.applyDamage(0, damage * 2);
        knockbackX *= .5;
        reciever.applyBlockStun(attackData.hitstun * .5);
    } else {
        reciever.applyDamage(damage, 0);
        reciever.applyHitStun(attackData.hitstun);
        reciever.stateManager.transition("HURT");
    };
    if (reciever.physics.isAirborne()) {
        knockbackY = 800;
    }
    applyKnockback(reciever, knockbackX, knockbackY);   
};//end applyDamage

/**Applies knockback velocity to a Fighter's physics component. If 
 * the reciever is backed against a boundary the knockback force is transfered
 * to the opponent.
 * @param { FighterBaseClass } reciever fighter recieving the knockback
 * @param {Number} strengthX strength of the knockback on the x-axis
 * @param {Number} strengthY strength of the knockback on the y-axis
 */
function applyKnockback(reciever, strengthX, strengthY) {
    if (!isAtBoundary(reciever)) {
        //not at boundary
        reciever.physics.changeKnockback("x", strengthX * reciever.opponent.direction);
        reciever.physics.changeKnockback("y", strengthY);
    } else {
        //is at a boundary
        //push opponent in the direction the reciever is facing.
        reciever.opponent.physics.changeKnockback("x", strengthX * reciever.direction);
    }//end if else
};//end applyKnockback