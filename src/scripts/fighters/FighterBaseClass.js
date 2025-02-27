
//class for maintaining the characters
export class FighterBaseClass {
    constructor(x, y, playerId) {
        this.playerId= playerId;
        this.direction = (playerId) ? -1 : 1; //value 1 = face right, -1 face left.
        this.debug = false;
        this.health = 100;
        this.energy = 100;
        this.pos = {x: x, y: y};
        this.origin = {x: x, y: y};
        this.velocity = {x: 0, y: 0};
        
        //this.currentFrame = 0;    
    }//end ctor

    update(ctx) {
        throw new Error("update method must be implemented.");
    }//end update
    draw(ctx) {
        throw new Error("Draw method must be implemented.")
    }//end draw
}//end ctor