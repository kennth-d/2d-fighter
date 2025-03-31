import * as attacks from "./attackData.js";

export function applyhit(reciever, attack) {
    let attackData = attacks[attack];
    reciever.applyhit(attackData.dmg, attackData.hitstun, attackData.knockback);
}//end applyDamage