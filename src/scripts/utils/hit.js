import * as attacks from "./attackData.js";
import { isAtBoundary } from "../utils/collision.js";
import { playSound } from "./playSound.js";
import { HURT, KNOCKBACK } from "../states/HurtStates.js";

/**Applies damage to health if fighter is not blocking or is out of energy,
 * or to energy if the fighter is blocking. chains into applyKnockback().
 * @param { FighterBaseClass } reciever Fighter recieving the attack.
 * @param { String } attack name of the Fighter attack state.
 */
export function applyhit(reciever, attack) {

    if (reciever.physics.isAirborne()) {
        applyAerialHit(reciever, attack);
        return;
    };

    let attackData = attacks[attack];
    let damage = attackData.dmg;
    let knockbackX = attackData.knockback;
    let knockbackY = 0;
    
    if (reciever.isBlocking() && reciever.hasEnergy()) {
        
        playSound(attacks.SOUNDS["BLOCK"].hit);
        reciever.applyDamage(0, damage * 2);
        knockbackX *= .5;
        reciever.applyBlockStun(attackData.hitstun * .5);
    } else {
        playSound(attacks.SOUNDS[attack].hit, 0.1);
        reciever.applyDamage(damage, 0);
        reciever.applyHitStun(attackData.hitstun);
        reciever.stateManager.transition("HURT");
    };
    
    applyKnockback(reciever, attack, knockbackX, knockbackY);   
};//end applyDamage

function applyAerialHit(reciever, attack) {
    let attackData = attacks[attack];
    let damage = attackData.dmg;
    let knockbackX = attackData.knockback*2;
    let knockbackY = -150;
    playSound(attacks.SOUNDS[attack].hit, 0.1);

    reciever.applyDamage(damage, 0);
    reciever.applyHitStun(attackData.hitstun);
    reciever.stateManager.transition("KNOCKBACK");
    applyKnockback(reciever, attack, knockbackX, knockbackY);
}//end ApplyArialHit

/**Applies knockback velocity to a Fighter's physics component. If 
 * the reciever is backed against a boundary the knockback force is transfered
 * to the opponent.
 * @param { FighterBaseClass } reciever fighter recieving the knockback
 * @param {Number} strengthX strength of the knockback on the x-axis
 * @param {Number} strengthY strength of the knockback on the y-axis
 */
function applyKnockback(reciever, attack, strengthX, strengthY) {
     reciever.physics.applyKnockback(strengthX * reciever.opponent.direction, strengthY);
};//end applyKnockback