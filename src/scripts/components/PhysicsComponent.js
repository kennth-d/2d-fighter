import { BOUNDARIES, TIME, PHYSICS } from "../utils/const.js";

export class PhysicsComponent {
    constructor(entity, gravityOn=true) {
        this.entity = entity;
        this.velocity = { x: 0, y: 0 };
        this.knockbackVelocity = {x: 0, y: 0};
        this.gravityOn = gravityOn;
    }//end ctor
    update() {
        //apply gravity
        if (this.isAirborne() && this.gravityOn) {
            this.velocity.y += PHYSICS.gravity * TIME.delta;
            this.velocity.x *= 0.95; // air resistance
        } 
        
        //apply knockback
        if (this.knockbackVelocity.x != 0) {
            this.entity.pos.x += this.knockbackVelocity.x * TIME.delta;
            this.knockbackVelocity.x *= PHYSICS.friction;
        }
        if (this.knockbackVelocity.y != 0) {
            this.entity.pos.y -= this.knockbackVelocity.y * TIME.delta;
            this.knockbackVelocity.y *= PHYSICS.friction;
        }

        this.entity.pos.y = Math.min(BOUNDARIES.FLOOR, this.entity.pos.y + this.velocity.y * TIME.delta);
        this.entity.pos.x += this.velocity.x * TIME.delta;
    }//end update
    changeVelocity(axis, velocity) {
        this.velocity[axis] = velocity;
    }
    changeKnockback(axis, velocity) {
        this.knockbackVelocity[axis] = velocity;
    }
    isAirborne() {
        return this.entity.pos.y < BOUNDARIES.FLOOR;
    }//end isAirBorne
}//end PhysicsComponent