import { CANVAS_WIDTH, TIME } from "../utils/const.js";
import { PhysicsComponent } from "./PhysicsComponent.js";

export class Projectile {
    constructor(id, projectileId, x, y, direction) {
        this.id = id;
        this.projectileId = projectileId;
        this.image = document.querySelector('img[alt="projectiles"]');
        this.direction = direction;
        this.pos = {x: x, y: y};
        this.box = {x: x, y: y, width: 16, height: 8};
        this.speed = 300;
        this.currentFrame = 0;
        this.physics = new PhysicsComponent(this, false);
        this.physics.changeVelocity("x", this.speed * this.direction);
        this.animationTimer = 0;
    }//end ctor
    update(viewport) {
        if (TIME.previous > this.animationTimer + 60 * 3) {
            this.currentFrame = (this.currentFrame + 1) % 4;
            this.animationTimer = TIME.previous;
        }//end if
        
        this.physics.update();
        this.box.x = this.pos.x;
        this.box.y = this.pos.y; 
    }//end update
    draw(ctx, viewport) {
        ctx.save();

        ctx.scale(this.direction, 1);

        ctx.drawImage(
            this.image,
            this.currentFrame * this.box.width,
            this.id * this.box.height,
            this.box.width,
            this.box.height,
            Math.floor(this.pos.x - viewport.pos.x) * this.direction,
            Math.floor(this.pos.y - viewport.pos.y),
            this.box.width,
            this.box.height,
        );
        ctx.setTransform(1, 0, 0, 1, 0,  0);

    }//end draw
    isOffScreen() {
        //off screen for projectiles extends beyond the screen.
        //so they don't get removed before having a chance to be processed
        return (this.pos.x < CANVAS_WIDTH/2 - 1500 || this.pos.x > CANVAS_WIDTH/2 + 1500);
    }//end isOffScreen
 }//end Projectile