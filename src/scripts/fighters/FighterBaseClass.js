
//class for maintaining the characters
export class FighterBaseClass {
    constructor(x, y, playerId) {
        this.playerId= playerId;
        this.debug = false;
        this.health = 100;
        this.energy = 100;
        this.direction = 1;
        this.pos = {x: x, y: y}
        this.velocity = {x: 0, y: 0};
        this.origin;
        this.animationTimer = 0;
        //this.currentFrame = 0;    
    }//end ctor

    update(ctx) {
        throw new Error("update method must be implemented.");
    }//end update

    debug(ctx) {
        throw new Error("debug method must be implemented.");
    }
}//end ctor