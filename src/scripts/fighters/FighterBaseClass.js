
//class for maintaining the characters
export class FighterBaseClass {
    constructor(x, y) {
        this.debug = false;
        this.active = false;
        this.health = 100;
        this.energy = 100;
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.origin;
        this.inputComponent;
        this.animationTimer = 0;
        this.currentFrame = 0;    
    }//end ctor

    update(ctx) {
        throw new Error("update method must be implemented.");
    }//end update

    debug(ctx) {
        throw new Error("debug method must be implemented.");
    }
}//end ctor