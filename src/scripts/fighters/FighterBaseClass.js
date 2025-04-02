import { getBoxes } from "../utils/getBoxes.js";
import { OPPONENT_DIRECTION } from "../utils/const.js";
import { PhysicsComponent } from "../components/PhysicsComponent.js";
import { Projectile } from "../components/Projectile.js";
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
        this.hitstun = 0;
        this.blockstun  = 0;
        this.physics = new PhysicsComponent(this);
        this.spriteManager;
        this.stateManager;   
        this.input;
        this.hasHit;
        this.projectiles = [];
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
    isBlocking() {
        return this.stateManager.activeState.getType() === "block";
    }
    setHasHit(value) {
        this.hasHit = value;
    }
    getHasHit() {
        return this.hasHit;
    }
    getAttackRange() {
        return this.stateManager.activeState.getRange();
    }
    hasHealth() {
        return this.health > 0;
    }
    hasEnergy() {
        return this.energy > 0;
    }
    applyDamage(health, energy) {
        this.health = Math.max(0, this.health - health);
        this.energy = Math.max(-10, this.energy - energy); //-10 adds a slight cooldown after complete depletion.
    }
    applyHitStun(duration) {
        this.hitstun = duration;
    }
    applyBlockStun(duration) {
        this.blockstun = duration;
    }
    getAttackData() {
        return this.boxes.hurt;
    }
    hasBeenStruck() {
        return (this.blockstun > 0 || this.hitstun > 0);
    }
    hasProjectiles() {
        return (this.projectiles.length > 0);
    }
    addProjectile() {
        if (this.projectiles.length > 2) return;
        this.projectiles.push(
            new Projectile(
                this.playerId,
                this.projectiles.length,
                this.pos.x + (15 * this.direction),
                this.pos.y - 27,
                this.direction,
            )
        );
    }
    removeProjectile(id) {
        this.projectiles.splice(id, 1);
        for (const projectile of this.projectiles) {
            projectile.projectileId--;
        }
    }
    setCooldown(value) {
        this.cooldown = value;
    }
}//end ctor