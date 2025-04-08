import { BOUNDARIES, TIME, PHYSICS } from "../utils/const.js";
import { lerp } from "../utils/linearInterpolation.js"

export class PhysicsComponent {
    constructor(entity, gravityOn=true) {
        this.entity = entity;
        this.velocity = { x: 0, y: 0 };
        this.knockback = {x: 0, y: 0};
        this.gravityOn = gravityOn;
        this.knockbackDecay = {x: 0.9, y: 0.99 };
    }//end ctor
    update() {

        //apply knockback
        if (Math.abs(this.knockback.x) > 10 || this.knockback.y > 20) {
            this.velocity.x = lerp(this.velocity.x, this.knockback.x, 0.9);
            this.velocity.y = lerp(this.velocity.y, this.knockback.y, 0.9);
            this.knockback.x *= this.knockbackDecay.x;
            this.knockback.y *= this.knockbackDecay.y;
        }//end if 

        if (this.isAirborne() && this.gravityOn) {
            this.velocity.y = lerp(this.velocity.y, PHYSICS.gravity, .01);
            this.velocity.x = lerp(this.velocity.x, 0, 1 - PHYSICS.airResistance);
        }//end if

        this.entity.pos.y = Math.min(BOUNDARIES.FLOOR, this.entity.pos.y + this.velocity.y * TIME.delta);
        this.entity.pos.x += this.velocity.x * TIME.delta;
    }//end update
    changeVelocity(axis, velocity) {
        this.velocity[axis] = velocity;
    }
    isAirborne() {
        return this.entity.pos.y < BOUNDARIES.FLOOR;
    }//end isAirBorne
    applyKnockback(forceX, forceY) {
        this.knockback.x = forceX;
        this.knockback.y = forceY;
    };      
}//end PhysicsComponent