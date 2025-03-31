import { getBoxes } from "../utils/getBoxes.js";
import { OPPONENT_DIRECTION } from "../utils/const.js";
import { PhysicsComponent } from "../components/PhysicsComponent.js";
//class for maintaining the characters
export class FighterBaseClass {
    constructor(x, y, playerId) {
        this.playerId = playerId;
        this.direction = (!playerId) ? OPPONENT_DIRECTION.RIGHT : OPPONENT_DIRECTION.LEFT;
        this.debug = false;
        this.health = 100;
        this.energy = 100;
        this.pos = {x: x, y: y};
        this.origin = {x: this.pos.x, y: this.pos.y};
        this.boxes = {push:[], hurt:[], hit:[]};  
        this.spriteManager;
        this.stateManager;
        this.physics = new PhysicsComponent(this);
        this.input;
        this.hasHit;        
    }//end ctor
    update() {
        throw new Error("update method must be implemented.");
    }//end update
    draw(ctx) {
        throw new Error("Draw method must be implemented.")
    }//end draw
    animationIsComplete() {
        return this.spriteManager.currentFrame === this.spriteManager.getCurrentSpriteFrameCount()-1;
    }//end animationIsComplete
    updateOrigin() {
        let offsetX = this.spriteManager.currentSprite.originOffset.x;
        let offsetY = this.spriteManager.currentSprite.originOffset.y;

        this.origin.x = this.pos.x + offsetX;
        this.origin.y = this.pos.y + offsetY;
    }
    updateBoxes() {
            let currentFrame = this.spriteManager.currentFrame;
            let state = this.spriteManager.currentSprite.name;
            
            this.boxes.push = getBoxes(this.name, state, "push", currentFrame);
            this.boxes.hurt = getBoxes(this.name, state, "hurt", currentFrame);
            this.boxes.hit = getBoxes(this.name, state, "hit", currentFrame);
    }
    isAttacking() {
        return this.stateManager.activeState.getType() === "attack";
    }
    setHasHit(value) {
        this.hasHit = value;
    }
    getHasHit() {
        return this.hasHit;
    }
    applyhit(damage, hitstun, knockback) {
        this.health = Math.max(this.health - damage, 0);
        this.stateManager.hurtTransition(hitstun, knockback);
    }
}//end ctor