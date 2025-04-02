import { BOUNDARIES, TIME } from "../utils/const.js";
import { PhysicsComponent } from "./PhysicsComponent.js";

export class Projectile {
    constructor(id, projectileId, x, y, direction) {
        this.id = id;
        this.projectileId = projectileId;
        this.image = document.querySelector('img[alt="projectiles"]');
        this.pos = {x: x, y: y};
        this.box = {x: x, y: y, width: 16, height: 8};
        this.direction = direction;
        this.speed = 300;
        this.currentFrame = 0;
        this.physics = new PhysicsComponent(this, false);
        this.physics.changeVelocity("x", this.speed * this.direction);
    }//end ctor
    update() {
        this.currentFrame = (this.currentFrame + 1) % 4;
        this.physics.update(); 
    }//end update
    draw(ctx) {
        ctx.save();

        ctx.scale(this.direction, 1);

        ctx.drawImage(
            this.image,
            this.currentFrame * this.box.width,
            this.id * this.box.height,
            this.box.width,
            this.box.height,
            this.pos.x * this.direction,
            this.pos.y,
            this.box.width,
            this.box.height,
        );
        ctx.setTransform(1, 0, 0, 1, 0,  0);
    }//end draw
    isOffScreen() {
        return (this.pos.x < BOUNDARIES.LEFT || this.pos.x > BOUNDARIES.RIGHT);
    }//end isOffScreen
 }//end Projectile